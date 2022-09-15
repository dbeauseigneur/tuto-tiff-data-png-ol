import GeoTIFF from 'ol/source/GeoTIFF';
import Map from 'ol/Map';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import proj4 from 'proj4';
import ViewOptions from 'ol/View';
import {get as getProjection, getTransform} from 'ol/proj';
import MousePosition from 'ol/control/MousePosition';
import {register} from 'ol/proj/proj4';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';

proj4.defs("EPSG:2154","+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
register(proj4);

const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:2154',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
});


let lyr_OSMStandard_0 = new TileLayer({
    source: new OSM(),
});

const source = new GeoTIFF({
    sources: [
        {
            url: 'https://www.blog.com/images/range/test1.tif',
        },
    ],
    //normalize: false,
    //wrapX: true,
    interpolate:false,
    sourceOptions: {
        /*forceXHR: true,*/
        allowFullFile: true,
    }
});
let newView = source.getView();

//let essai = null;
//newView.then((tryView) => essai = tryView);
/*let resetView = new View(essai);
console.log (essai);
*/
let tryView = new View( {
    projection: 'EPSG:2154',
    center: [855380.5, 6520041.5],
    zoom: 15,
})
let layer = new WebGLTileLayer({
    source: source,
});
const map = new Map({
    controls: defaultControls().extend([mousePositionControl]),
    target: 'map',
    layers: [
        lyr_OSMStandard_0,
        layer,
    ],
    view: tryView,
});
newView.then((view)=>map.getView().setCenter(view.center));
newView.then((view)=>map.getView().setMaxZoom(view.maxZoom));
newView.then((view)=>map.getView().setMinZoom(view.minZoom));
//newView.then((view)=>console.log(map.getView().setConstrainResolution(false)));
map.getView().setConstrainResolution(false);

let mousePosition = null;
let altitudeLabel = document.getElementById('altitude-label');

map.on('pointermove', (event) => {
    altitudeLabel.innerHTML = layer.getData(event.pixel);
    console.log(layer.getData(event.pixel));
});
