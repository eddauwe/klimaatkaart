var previouslowp = 0;
var previoushighp=5000;
var previouslowt=-45;
var previoushight=45;

function LowerBound(x) {
    //temp of prec variabele mapping
    switch (x) {
        case "temp":
            id="mint";
            bst=tgem;
            json=tmax_gem;
            previouslow=previouslowt;
            break;
        case "prec":
            id="minp";
            bst=ptot;
            json=prectot;
            previouslow=previouslowp;
            break;            
    }
    
    
    
    var val = Number(document.getElementById(id).value);
    //toevoegen van features bij verlagen minwaarde
    if (val < previouslow) {
        var features=new ol.format.GeoJSON().readFeatures(json);
        features.forEach(function (feature) {
                if ((feature.get('DN')) < previouslow && (feature.get('DN')) > val) {
                    //just add feature
                    bst.getSource().addFeature(feature);
                }
                
            })
            }
    //verwijderen van features bij verhogen minwaarde
    else if (previouslow < val) {
        bst.getSource().getFeatures().forEach(function (feature) {
                if ((feature.get('DN')) < val) {
                    //just add feature
                    bst.getSource().removeFeature(feature);
                }
                
            })
            }
            
    if (x=="temp") {
        previouslowt=val;       
    }
    else if (x=="prec"){
        previouslowp=val;
    }
};


function UpperBound(y) {   
    //temp of prec variabele mapping
    switch (y) {
        case "temp":
            id="maxt";
            bst=tgem;
            json=tmax_gem;
            previoushigh=previoushight;
            break;
        case "prec":
            id="maxp";
            bst=ptot;
            json=prectot;
            previoushigh=previoushighp;
            break;            
    }
    
    var val = Number(document.getElementById(id).value);
    //verwijderen van features bij verlagen maxwaarde
    if (val < previoushigh) {
        bst.getSource().getFeatures().forEach(function (feature) {
                if ((feature.get('DN')) > val) {
                    //just remove feature
                    bst.getSource().removeFeature(feature);
                }
                
            })
            }
    //toevoegen van features bij verhogen maxwaarde
    else if (previoushigh < val) {
        var features=new ol.format.GeoJSON().readFeatures(json);
        features.forEach(function (feature) {
                if ((feature.get('DN')) > previoushigh && (feature.get('DN')) < val) {
                    //just add feature
                    bst.getSource().addFeature(feature);
                }
                
            })
            }
            
            
    if (y=="temp") {
        previoushight=val;       
    }
    else if (y=="prec"){
        previoushighp=val;
    }
}









function Bounds(){
    LowerBound("prec");
    UpperBound("prec");
    LowerBound("temp");
    UpperBound("temp");
}






