var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_dalles_1 = new ol.format.GeoJSON();
var features_dalles_1 = format_dalles_1.readFeatures(json_dalles_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_dalles_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_dalles_1.addFeatures(features_dalles_1);
var lyr_dalles_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_dalles_1, 
                style: style_dalles_1,
                interactive: true,
                title: '<img src="styles/legend/dalles_1.png" /> dalles'
            });
var lyr_RGEALTI_FXX_0855_6520_MNT_LAMB93_IGN69_2 = new ol.layer.Image({
                            opacity: 1,
                            title: "RGEALTI_FXX_0855_6520_MNT_LAMB93_IGN69",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/RGEALTI_FXX_0855_6520_MNT_LAMB93_IGN69_2.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [555932.036411, 5740817.316133, 557399.909413, 5742290.004732]
                            })
                        });
var lyr_test2_3 = new ol.layer.Image({
                            opacity: 1,
                            title: "test2",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/test2_3.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [555932.036411, 5740817.316133, 557399.909413, 5742290.004732]
                            })
                        });
var lyr_RGEALTI_FXX_0855_6521_MNT_LAMB93_IGN69_4 = new ol.layer.Image({
                            opacity: 1,
                            title: "RGEALTI_FXX_0855_6521_MNT_LAMB93_IGN69",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/RGEALTI_FXX_0855_6521_MNT_LAMB93_IGN69_4.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [555968.198933, 5742253.600778, 557436.316799, 5743726.533490]
                            })
                        });

lyr_OSMStandard_0.setVisible(true);lyr_dalles_1.setVisible(true);lyr_RGEALTI_FXX_0855_6520_MNT_LAMB93_IGN69_2.setVisible(true);lyr_test2_3.setVisible(true);lyr_RGEALTI_FXX_0855_6521_MNT_LAMB93_IGN69_4.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_dalles_1,lyr_RGEALTI_FXX_0855_6520_MNT_LAMB93_IGN69_2,lyr_test2_3,lyr_RGEALTI_FXX_0855_6521_MNT_LAMB93_IGN69_4];
lyr_dalles_1.set('fieldAliases', {'NOM_DALLE': 'NOM_DALLE', 'SRC': 'SRC', 'SRV': 'SRV', 'DATE_DEBUT': 'DATE_DEBUT', 'DATE_FIN': 'DATE_FIN', 'PARTENAIRE': 'PARTENAIRE', 'LITTO3D': 'LITTO3D', 'PAS': 'PAS', 'CAPTEUR': 'CAPTEUR', 'Z_MIN': 'Z_MIN', 'Z_MAX': 'Z_MAX', 'NB_CORREL': 'NB_CORREL', 'NB_LIDAR_T': 'NB_LIDAR_T', 'NB_LIDAR_B': 'NB_LIDAR_B', 'NB_SMF': 'NB_SMF', 'NB_RADAR': 'NB_RADAR', 'NB_NODATA': 'NB_NODATA', 'CGU': 'CGU', });
lyr_dalles_1.set('fieldImages', {'NOM_DALLE': 'TextEdit', 'SRC': 'TextEdit', 'SRV': 'TextEdit', 'DATE_DEBUT': 'TextEdit', 'DATE_FIN': 'TextEdit', 'PARTENAIRE': 'TextEdit', 'LITTO3D': 'TextEdit', 'PAS': 'Range', 'CAPTEUR': 'TextEdit', 'Z_MIN': 'TextEdit', 'Z_MAX': 'TextEdit', 'NB_CORREL': 'Range', 'NB_LIDAR_T': 'Range', 'NB_LIDAR_B': 'Range', 'NB_SMF': 'Range', 'NB_RADAR': 'Range', 'NB_NODATA': 'Range', 'CGU': 'TextEdit', });
lyr_dalles_1.set('fieldLabels', {'NOM_DALLE': 'no label', 'SRC': 'no label', 'SRV': 'no label', 'DATE_DEBUT': 'no label', 'DATE_FIN': 'no label', 'PARTENAIRE': 'no label', 'LITTO3D': 'no label', 'PAS': 'no label', 'CAPTEUR': 'no label', 'Z_MIN': 'no label', 'Z_MAX': 'no label', 'NB_CORREL': 'no label', 'NB_LIDAR_T': 'no label', 'NB_LIDAR_B': 'no label', 'NB_SMF': 'no label', 'NB_RADAR': 'no label', 'NB_NODATA': 'no label', 'CGU': 'no label', });
lyr_dalles_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});