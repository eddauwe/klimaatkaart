


var osmlayer=new ol.layer.Tile({
name:'osmlayer',
className:'bw',
source: new ol.source.OSM({
    
})
});


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
    features:(new ol.format.GeoJSON()).readFeatures(klimaat)
});





/*var kleurenschaal={'0':'red',
'1':'blue'};
var style={}
for (item in kleurenschaal) {
    style[item] = new ol.style.Style({
            fill:new ol.style.Fill ({color:kleurenschaal[item]}),
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 1
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
                text:kleurenschaal[item]                 
            })              
        });
}*/

//zet temperatuurwaarden om in kleurenschaal
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





function precconverter(number){    
    var getal = number;
    //rood waarde     
    switch (true){
        case (getal<200):
            r=100;
            break;
        case (getal<400):
            r=50;
            break;
        case (getal<600):
            r=25;
            break;
        case (getal<800):
            r=5;
            break;
        default:
            r=0;      
    }   
    //groen waarde   
    switch (true){
        case (getal<200):
            g=105;
            break;
        case (getal<400):
            g=105;
            break;
        case (getal<600):
            g=80;
            break;
        case (getal<800):
            g=50;
            break;
        default:
            g=5;      
    }
    //blauw waarde
    var b;
    switch (true){
        case (getal<200):
            b=50;
            break;
        case (getal<400):
            b=100;
            break;
        case (getal <600):
            b=150;
            break;
        case (getal <800):    
            b=200
            break;
        default:
            b=250;
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
            fill:new ol.style.Fill ({color:tempconverter(feature.get('tzomer'))}),
            stroke: new ol.style.Stroke({
                color: tempconverter(feature.get('tzomer')),
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
            fill:new ol.style.Fill ({color:tempconverter(feature.get('twinter'))}),
            stroke: new ol.style.Stroke({
                color: tempconverter(feature.get('twinter')),
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
        fill:new ol.style.Fill({color:precconverter(feature.get('pzomer'))}),
        stroke: new ol.style.Stroke({
            color: precconverter(feature.get('pzomer')),
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
        fill:new ol.style.Fill({color:precconverter(feature.get('pwinter'))}),
        stroke: new ol.style.Stroke({
            color: precconverter(feature.get('pwinter')),
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
    layers:[osmlayer,klimdata,new ol.layer.Graticule()]
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


var map = new ol.Map({
target: 'map',
layers:
  lagen
,
overlays:[overlay],
view: new ol.View({
  center: ol.proj.fromLonLat([3, 50]),
  zoom: 6
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


