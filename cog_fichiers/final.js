import {mainPrg} from "./main.js";

let altitudeLabel = document.getElementById('altitude-label');
let realAltitudeLabel = document.getElementById('altitude-tif-label');
let mousePosition = document.getElementById('mouse-position');
let targetMap = 'map';
let projectionLabel = document.getElementById('projection-label')
mainPrg(mousePosition,targetMap,realAltitudeLabel,altitudeLabel,projectionLabel).then((test=>{console.log('loaded')}));