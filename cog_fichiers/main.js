import GeoTIFF from 'ol/source/GeoTIFF';
import Map from 'ol/Map';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import proj4 from 'proj4';
import MousePosition from 'ol/control/MousePosition';
import {register} from 'ol/proj/proj4';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';
import {fromBlob, fromUrl} from "geotiff";

export let mainPrg = async function (mousePosition, targetMap, realAltitudeLabel, altitudeLabel, projectionLabel) {
    proj4.defs("EPSG:2154", "+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    register(proj4);

    const mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(3),
        projection: 'EPSG:2154',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
    });

    let lyr_OSMStandard_0 = new TileLayer({
        source: new OSM(),
    });

    let response = await fetch('https://www.blog-db.fr/images/range/test-sud.tif')
    const blob20 = await response.blob()
    const sourceSud = new GeoTIFF({
        sources: [
            {
                blob: blob20,
            },
        ],
    });
    const urlNord = 'https://www.blog-db.fr/images/range/test-nord.tif';
    const source = new GeoTIFF({
        sources: [
            {
                url: urlNord,
            },
        ],
        interpolate: false,
        sourceOptions: {
            allowFullFile: true,
        }
    });
    let layerSud = new WebGLTileLayer({
        source: sourceSud
    });
    let layer = new WebGLTileLayer({
        source: source,
    });

    let tryView = new View({
        projection: 'EPSG:2154',
        center: [855500, 6520000],
        zoom: 15,
    });
    const map = new Map({
        controls: defaultControls().extend([mousePositionControl]),
        target: targetMap,
        layers: [
            lyr_OSMStandard_0,
            layer,
            layerSud,
        ],
        view: tryView
    });

    /***données sud***/
    const tiff = await fromBlob(blob20);
    const image = await tiff.getImage();
    const origin = image.getOrigin();
    const resolution = image.getResolution();
    const data = await image.readRasters();
    const geoKeys = image.getGeoKeys();

    const projection = geoKeys.ProjectedCSTypeGeoKey+ ' : ' + geoKeys.GTCitationGeoKey;

    const {width} = await data;
    const originRefX = origin[0] + resolution[0] / 2;
    const originRefY = origin[1] + resolution[1] / 2;

    /***données nord***/
    const tiffNord = await fromUrl(urlNord);
    const imageNord = await tiffNord.getImage();
    const originNord = imageNord.getOrigin();
    const resolutionNord = imageNord.getResolution();
    let geoKeysNord = imageNord.getGeoKeys();

    const projectionNord = geoKeysNord.ProjectedCSTypeGeoKey + ' : ' + geoKeysNord.GTCitationGeoKey;
    const originNordRefX = originNord[0] + resolutionNord[0] /2;
    const originNordRefY = originNord[1] + resolutionNord[1] /2;

    map.on('pointermove', async (event) => {
        let x = event.coordinate[0];
        let y = event.coordinate[1];

        let chooseLayer = layerSud;
        projectionLabel.innerHTML = '';
        if (layer.getData(event.pixel) && layer.getData(event.pixel)[0]) {
            chooseLayer = layer;
            let coordXImage = Math.round((x - originNordRefX) / resolutionNord[0]);
            let coordYImage = Math.round((y - originNordRefY) / resolutionNord[1]);
            let int4 = new Intl.NumberFormat("fr-FR", {maximumFractionDigits: 2, minimumFractionDigits: 2});
            let options;
            projectionLabel.innerHTML = projectionNord;
            options = {
                window: [coordXImage, coordYImage, coordXImage+1, coordYImage+1],
                width:1,
                height:1
            };
            let dataPixel = await imageNord.readRasters(options);
            realAltitudeLabel.innerHTML = int4.format(dataPixel[0][0]).toString();
        } else if (layerSud.getData(event.pixel) && layerSud.getData(event.pixel)[0]) {
            let coordXImage = Math.round((x - originRefX) / resolution[0]);
            let coordYImage = Math.round((y - originRefY) / resolution[1]);
            projectionLabel.innerHTML = projection;
            let int4 = new Intl.NumberFormat("fr-FR", {maximumFractionDigits: 2, minimumFractionDigits: 2});
            realAltitudeLabel.innerHTML = int4.format(data[0][width * coordYImage + coordXImage]).toString();
        } else {
            realAltitudeLabel.innerHTML = 'no data';
            altitudeLabel.innerHTML = 'no data';
        }
        /** Données avec les valeurs des pixels **/
        if (chooseLayer.getData(event.pixel)) {
            let maximum = chooseLayer.getSource().metadata_[0][0].STATISTICS_MAXIMUM;
            let minimum = chooseLayer.getSource().metadata_[0][0].STATISTICS_MINIMUM;
            let rapport = (maximum - minimum) / 255;
            let altitudeCalc = rapport * chooseLayer.getData(event.pixel)[0] + (1.0 * minimum);
            altitudeLabel.innerHTML = altitudeCalc.toFixed(2).toString();
        }
    });
}
