import GeoTIFF from 'ol/source/GeoTIFF';
//import GeoTIFFOrig, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';

import Map from 'ol/Map';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import proj4 from 'proj4';
//import ViewOptions from 'ol/View';
//import {get as getProjection, getTransform} from 'ol/proj';
import MousePosition from 'ol/control/MousePosition';
import {register} from 'ol/proj/proj4';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';
import {fromBlob} from "geotiff";

proj4.defs("EPSG:2154","+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
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

fetch('https://www.blog-db.fr/images/range/test-20.tif')
    .then( async (response) => {
        const blob20 = await response.blob()
        const sourceSud = new GeoTIFF({
            sources: [
                {
                    blob: blob20,
                },
            ],
        });

        const source = new GeoTIFF({
            sources: [
                {
                    url: 'https://www.blog-db.fr/images/range/test-21.tif',
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
            target: 'map',
            layers: [
                lyr_OSMStandard_0,
                layer,
                layerSud,
            ],
            view: tryView
        });

        let altitudeLabel = document.getElementById('altitude-label');
        let realAltitudeLabel = document.getElementById('altitude-tif-label');
        const tiff = await fromBlob(blob20);
        const image = await tiff.getImage();
        const origin = image.getOrigin();
        const resolution = image.getResolution();
        const data = await image.readRasters();
        const { width } = await data;
        const originRefX = origin[0]+ resolution[0]/2;
        const originRefY = origin[1]+ resolution[1]/2;

        map.on('pointermove', (event) => {

            let chooseLayer = layerSud;
            if (layer.getData(event.pixel) && layer.getData(event.pixel)[0]) {
                chooseLayer = layer;
                realAltitudeLabel.innerHTML = 'non lue';
            } else if (layerSud.getData(event.pixel) && layerSud.getData(event.pixel)[0]){
                let x = event.coordinate[0];
                let y = event.coordinate[1];
                let coordXImage = Math.round((x - originRefX)/resolution[0]);
                let coordYImage = Math.round((y - originRefY)/resolution[1]);
                let int4=new Intl.NumberFormat("fr-FR", {maximumFractionDigits: 2, minimumFractionDigits: 2});
                realAltitudeLabel.innerHTML = int4.format(data[0][width*coordYImage+coordXImage]).toString();
            } else {
                realAltitudeLabel.innerHTML = 'no data';
                altitudeLabel.innerHTML = 'no data';
            }
            if (chooseLayer.getData(event.pixel)) {
                //let test = layer.getSource().metadata_[0][0].STATISTICS_MAXIMUM
                let maximum = chooseLayer.getSource().metadata_[0][0].STATISTICS_MAXIMUM;
                let minimum = chooseLayer.getSource().metadata_[0][0].STATISTICS_MINIMUM;
                let rapport = (maximum - minimum) / 255;
                let altitudeCalc = rapport * chooseLayer.getData(event.pixel)[0] + (1.0 * minimum);
                altitudeLabel.innerHTML = altitudeCalc.toString();
            }

        });

    });
