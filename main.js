


var osmlayer=new ol.layer.Tile({
className:'bw',
source: new ol.source.OSM({
    
})
});






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
    features:(new ol.format.GeoJSON()).readFeatures(tmax_gem)
});

var precsource = new ol.source.Vector({
    features:(new ol.format.GeoJSON()).readFeatures(prectot)
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
    //rood waarde
    var r=0;       
    //groen waarde
    var g=0; 
    //blauw waarde
    var b;
    const getal=number;
    switch (true){
        case (getal<200):
            b=0;
            break;
        case (getal<400):
            b=100;
            break;
        default:
            b=255;
    }
    var color='rgb('+r+','+g+','+b+')';
    return color;
}


// style functie
var tempstyleFunction = function (feature,resolution) {
    return new ol.style.Style({
            fill:new ol.style.Fill ({color:tempconverter(feature.get('DN'))}),
            stroke: new ol.style.Stroke({
                color: tempconverter(feature.get('DN')),
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
                text:feature.get(toString('DN'))             
            })              
        });
};

var precstyleFunction= function (feature,resolution){
    return new ol.style.Style({
        fill:new ol.style.Fill({color:precconverter(feature.get('DN'))}),
        //stroke: new ol.style.Stroke({
        //    color: tempconverter(feature.get('DN')),
        //    width: 0
        //    }),
        text:new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color:'#000'
            }),
            stroke: new ol.style.Stroke({
                color:'#fff',
                width:3
                }),
            text:feature.get(toString('DN'))             
            })          
    })
}


var tgem=new ol.layer.Vector({
name:'tmax01',
source: tempsource,
style:tempstyleFunction,
opacity:0.6
});

var ptot=new ol.layer.Vector({
name:'ptot',
source: precsource,
style:precstyleFunction,
opacity:0.6
});


var layerst=new ol.layer.Group({
    layers:[osmlayer,tgem]
});

var layersp=new ol.layer.Group({
    layers:[osmlayer,ptot]
});

function setMapType(newType){
    if (newType=='tgem'){
            map.setLayerGroup(layerst);
        }
    else if (newType=='ptot'){
            map.setLayerGroup(layersp);
        }
}



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
  layerst
,
overlays:[overlay],
view: new ol.View({
  center: ol.proj.fromLonLat([3, 50]),
  zoom: 4
})
});




/*var displayFeatureInfo = function (pixel) {
    //indien er geen feature is geef geen waarde terug
    
    
    map.forEachFeatureAtPixel(pixel,function(feature,layer)
    {
    var info=document.getElementById('info');
    if (feature && layer.get('name')=='tmax01') {
        info.innerHTML='Temperatuur: '+feature.get('DN')+ ' °C';
    }
    else if (feature && layer.get('name')=='ptot'){
        info.innerHTML='Neerslag: '+feature.get('DN')+ ' mm';
    }
     else {
        info.innerHTML = '&nbsp;';
    }
    }
    
    
)
}*/

var displayFeatureInfoClick = function (pixel) {
    
  switch(map.getLayerGroup()){
    case (layerst):
        layer=tgem;
        break;
    case (layersp):
        layer=ptot;
  }
  layer.getFeatures(pixel).then(function (features) {
    var feature = features.length ? features[0] : undefined;
    if (features.length && map.getLayerGroup()==layerst) {
      content.innerHTML = feature.get('DN') + ' °C';
    } 
    else if (features.length && map.getLayerGroup()==layersp) {
        content.innerHTML = feature.get('DN')-50 + ' - ' +feature.get('DN') + ' mm';
    }  
    else {
        content.innerHTML = 'geen waarde';
    }
  });
};


var displayFeatureInfo = function (pixel) {
    
  switch(map.getLayerGroup()){
    case (layerst):
        layer=tgem;
        break;
    case (layersp):
        layer=ptot;
  }
  layer.getFeatures(pixel).then(function (features) {
    var feature = features.length ? features[0] : undefined;
    var info = document.getElementById('info');
    if (features.length && map.getLayerGroup()==layerst) {
      info.innerHTML = feature.get('DN') + ' °C';
    } 
    else if (features.length && map.getLayerGroup()==layersp) {
        info.innerHTML = feature.get('DN')-50 + ' - ' +feature.get('DN') + ' mm';
    }  
    else {
      info.innerHTML = '&nbsp;';
    }
  });
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


