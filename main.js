
//canada projectie
proj4.defs("EPSG:3978","+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");


ol.proj.proj4.register(proj4);

// Configure the Sphere Mollweide projection object with an extent,
// and a world extent. These are required for the Graticule.


var canadaProjection = new ol.proj.Projection({
  code: 'EPSG:3978',
  extent: [
    -18019909.21177587,
    -9009954.605703328,
    18019909.21177587,
    9009954.605703328 ],
  worldExtent: [-179, -89.99, 179, 89.99],
});


var osmlayer=new ol.layer.Tile({
name:'osmlayer',
className:'bw',
source: new ol.source.OSM({
    
})
});


var stamen = new ol.layer.Tile({
    name:'basemap',
      source: new ol.source.Stamen({
        layer: 'toner-lite',
      }),
    })




var unit = '°C';
var parameter = 'tgem';
var parameters={'tgem':'°C','tzomer':'°C','twinter':'°C','ptot':'mm','pzomer':'mm','pwinter':'mm'};


var projection = new ol.proj.Projection({
    code:'EPSG:4326',
    extent:[-180,-90,180,90]
})



var tmax01=new ol.layer.Image({
//geef naam om later lagen te kunnen filteren bij weergave van attributen
name:'tmax01raster',
source: new ol.source.ImageStatic({
    url:'tmax_01.png',
    projection: projection,
    imageExtent:[-180,-90,180,90],
    visible:false
}),
})



//geojson sources

var tempsource = new ol.source.Vector({
    features:(new ol.format.GeoJSON()).readFeatures(klimaat,{
      dataProjection: 'EPSG:3857',
      featureProjection: 'EPSG:3978'
    })
});


//zet temperatuurwaarden om in kleurenschaal
/*
function tempconverter(number){
    //Rood waarde
    if (number>=0){var r=(3*number) + 3}
    else
    {r=0}
    //Groen waarde
    if (number <=40)
    {var g=(number+45)*3}
    else {g=255}
    //Blauw waarde
    var b={}
    e=0
    for (i = -45;i<=45;i++){
        b[i]=255-e;
        if (e<255){
        e+=3;}
    }
    var color='rgb('+r+','+g+','+b[number]+')'
    return color  
}
*/


function tempconverter(number){
    var getal = number;
    
    switch (true) {
        case (getal >= 25):
            r=255;
            g=0;
            b=0; 
            break;
        case (getal >= 20):
            r=229;
            g=9;
            b=0;
            break;
        case (getal >= 15):
            r=224;
            g=84;
            b=0;
            break;
        case (getal >= 12):
            r=220;
            g=156;
            b=0;      
            break;
        case (getal >= 9):
            r=206;
            g=216;
            b=0;
            break;
        case (getal >= 6):
            r=131;
            g=212;
            b=0;
            break;
        case (getal >= 3):
            r=59;
            g=207;
            b=0;
            break;
        case (getal >= 0):
            r=0;
            g=203;
            b=9;
            break;
        case (getal >= -5):
            r=0;
            g=199;
            b=75;
            break;
        case (getal >= -10):
            r=0;
            g=195;
            b=139;
            break;
        case (getal >= -15):
            r=0;
            g=181;
            b=191;  
            break;
        case (getal < -15):
            r=0;
            g=168;
            b=220;
    }
    
    var color='rgb('+r+','+g+','+b+')';
    return color  
}




function precconverter(number){    
    var getal = number;
    //rood waarde     
    switch (true){
        case (getal<50):
            r=255;
            g=249;
            b=163;
            break;
        case (getal<100):
            r=220;
            g=249;
            b=144;
            break;    
        case (getal<200):
            r=172;
            g=243;
            b=127;
            break;   
        case (getal<400):
            r=117;
            g=237;
            b=110;
            break;    
        case (getal<600):
            r=94;
            g=231;
            b=133;
            break;
        case (getal<800):
            r=78;
            g=225;
            b=170;
            break;
        case (getal<1000):
            r=63;
            g=220;
            b=213;
            break;
        case (getal<1200):
            r=49;
            g=165;
            b=214;
            break;
        case (getal<1400):
            r=36;
            g=99;
            b=208;
            break;
        case (getal<1800):
            r=23;
            g=28;
            b=202;
            break;
        case (getal<2500):
            r=68;
            g=11;
            b=196;
            break;
        case (getal>=2500):
            r=92;
            g=0;
            b=182;
            break;
    }
    var color='rgb('+r+','+g+','+b+')';
    return color;
}


// style functie
var tgemstyleFunction = function (feature,resolution) {
    return new ol.style.Style({
            fill:new ol.style.Fill ({color:tempconverter(feature.get('tgem'))}),
            stroke: new ol.style.Stroke({
                color: tempconverter(feature.get('tgem')),
                width: 0
                }),
            text:new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({
                    color:'#000'
                }),
                stroke: new ol.style.Stroke({
                    color:'#fff',
                    width:3
                    }),
                text:feature.get(toString('tgem'))             
            })              
        });
};

// style functie
var tzomerstyleFunction = function (feature,resolution) {
    return new ol.style.Style({
            fill:new ol.style.Fill ({color:tempconverter(feature.get('tzomer')-9)}),
            stroke: new ol.style.Stroke({
                color: tempconverter(feature.get('tzomer')-9),
                width: 0
                }),
            text:new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({
                    color:'#000'
                }),
                stroke: new ol.style.Stroke({
                    color:'#fff',
                    width:3
                    }),
                text:feature.get(toString('tzomer'))             
            })              
        });
};




// style functie
var twinterstyleFunction = function (feature,resolution) {
    return new ol.style.Style({
            fill:new ol.style.Fill ({color:tempconverter(feature.get('twinter')+9)}),
            stroke: new ol.style.Stroke({
                color: tempconverter(feature.get('twinter')+9),
                width: 0
                }),
            text:new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({
                    color:'#000'
                }),
                stroke: new ol.style.Stroke({
                    color:'#fff',
                    width:3
                    }),
                text:feature.get(toString('twinter'))             
            })              
        });
};



var ptotstyleFunction= function (feature,resolution){
    return new ol.style.Style({
        fill:new ol.style.Fill({color:precconverter(feature.get('ptot'))}),
        stroke: new ol.style.Stroke({
            color: precconverter(feature.get('ptot')),
            width: 0
            }),
        text:new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color:'#000'
            }),
            stroke: new ol.style.Stroke({
                color:'#fff',
                width:3
                }),
            text:feature.get(toString('ptot'))             
            })          
    })
}

var pzomerstyleFunction= function (feature,resolution){
    return new ol.style.Style({
        fill:new ol.style.Fill({color:precconverter(feature.get('pzomer')*4)}),
        stroke: new ol.style.Stroke({
            color: precconverter(feature.get('pzomer')*4),
            width: 0
            }),
        text:new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color:'#000'
            }),
            stroke: new ol.style.Stroke({
                color:'#fff',
                width:3
                }),
            text:feature.get(toString('pzomer'))             
            })          
    })
}




var pwinterstyleFunction= function (feature,resolution){
    return new ol.style.Style({
        fill:new ol.style.Fill({color:precconverter(feature.get('pwinter')*4)}),
        stroke: new ol.style.Stroke({
            color: precconverter(feature.get('pwinter')*4),
            width: 0
            }),
        text:new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color:'#000'
            }),
            stroke: new ol.style.Stroke({
                color:'#fff',
                width:3
                }),
            text:feature.get(toString('pwinter'))             
            })          
    })
}



var standaardstijl = new ol.style.Style({
    fill:new ol.style.Fill({color:"5500EE"}),
    stroke: new ol.style.Stroke({
            color: "5500EE",
            width: 0
            })
})






var klimdata=new ol.layer.Vector({
    name:'tmax01',
    source: tempsource,
    style:tgemstyleFunction,
    opacity:0.6
});




var lagen=new ol.layer.Group({
    layers:[stamen,klimdata,new ol.layer.Graticule()]
});


function setMapType(newType,style){
    klimdata.setStyle(style);
    parameter=newType;
    unit=parameters[newType];
    var lowt = $( "#mint" ).val();
    var hight = $( "#maxt" ).val();  
    var lowp = $( "#minp" ).val();
    var highp = $( "#maxp" ).val();  
    var lowtzomer=$( "#mintzomer" ).val();
    var hightzomer=$( "#maxtzomer" ).val();
    var lowtwinter=$( "#mintwinter" ).val();
    var hightwinter=$( "#maxtwinter" ).val();
    var lowpzomer=$( "#minpzomer" ).val();
    var highpzomer=$( "#maxpzomer" ).val();
    var lowpwinter=$( "#mintwinter" ).val();
    var highpwinter=$( "#maxpwinter" ).val();
    
    klimdata.getSource().getFeatures().forEach(function (feature){
        if (feature.get('tgem')<=hight && feature.get('tgem')>=lowt 
            && feature.get('tzomer')<=hightzomer && feature.get('tzomer')>=lowtzomer
            && feature.get('twinter')<=hightwinter && feature.get('twinter')>=lowtwinter
            && feature.get('ptot')<=highp && feature.get('ptot')>=lowp
            && feature.get('pzomer')<=highpzomer && feature.get('pzomer')>=lowpzomer
            && feature.get('pwinter')<=highpwinter && feature.get('pwinter')>=lowpwinter
            ){         
            //reset feature style to layer style
            feature.setStyle();
        }
    })
};




/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('coordinaten'),
  undefinedHTML: '',
});


var map = new ol.Map({
controls: ol.control.defaults().extend([mousePositionControl]),
target: 'map',
layers:
  lagen
,
overlays:[overlay],
view: new ol.View({
  center: ol.proj.toLonLat([-90, 45]),
  projection:canadaProjection,
  zoom: 5
})
});






var displayFeatureInfoClick = function (pixel) {
  var features = [];
  var laagoud='';
  map.forEachFeatureAtPixel (pixel, function (feature,layer) {
      if (layer!= laagoud){
      features.push(feature);}
      laagoud=layer;
    });
    if (features.length >0) {
        var info = [];
            info.push(features[0].get(parameter));
        //content.innerHTML = info.join (' mm <br>  ') + ' C'+'<br>';
        //content.innerHTML = feature.get('DN')-50 + ' - ' +feature.get('DN') + ' mm';
        content.innerHTML = parameter + ": " + info[0] + ' '+ unit;
    }
    else {
        content.innerHTML = 'geen waarde';
    }
  };


var displayFeatureInfo = function (pixel) {    
  var features = [];
  var laagoud='';
  map.forEachFeatureAtPixel (pixel,function(feature,layer) {
      if (layer!= laagoud){
      features.push(feature);}
      laagoud=layer;
    });    
    var container = document.getElementById('info');
    if (features.length >0) {
      container.innerHTML='';
      for (var key in parameters){
      container.innerHTML += key + ": " + features[0].get(key) + ' ' + document.getElementById(key).value + '<br>';      
      }
    }
    else {
      container.innerHTML = '&nbsp;';
    }
  };




map.on('pointermove',function(evt){
        if (evt.ragging) {
            return;
        }
        var pixel=map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
});

map.on('click',function(evt){
    //tooon popup
    var coordinate=evt.coordinate;
    overlay.setPosition(coordinate);
    displayFeatureInfoClick(evt.pixel);
});

//geocoder
var geocoder = new Geocoder('nominatim', {
  provider: 'osm',
  //key: 'tHN4kYAyU8q7xHXYTDSlJDFxA6SBYnYh',
  lang: 'en-US', //en-US, fr-FR
  placeholder: 'Search for ...',
  targetType: 'glass-button',
  limit: 5,
  keepOpen: true
});
map.addControl(geocoder);


//toon pixelwaarde bij klik

//functie om uit te voeren wanneer klik gebeurt
//voer functie uit bij klik op pixel
/*map.on('click',function(evt){
    var pixel=evt.pixel;
    console.log(pixel.getcoordinates());
    map.forEachLayerAtPixel(evt.pixel, function(layer,pixel){
        console.log(layer.get('name'));
},{layerFilter: function (layer){return layer.get('name') === 'tmax01'}});

})*/


