var previouslowp = 0;
var previoushighp=5000;
var previouslowt=-45;
var previoushight=45;

function LowerBound(type,ui) {
    //temp of prec variabele mapping
    switch (type) {
        case "temp":
            bst=tgem;
            json=tmax_gem;
            previouslow=previouslowt;
            break;
        case "prec":
            bst=ptot;
            json=prectot;
            previouslow=previouslowp;
            break;            
    }
    
    
    
    var val = Number(ui.values[0]);
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
                    //just remove feature
                    bst.getSource().removeFeature(feature);
                }
                
            })
            }
            
    if (type=="temp") {
        previouslowt=val;       
    }
    else if (type=="prec"){
        previouslowp=val;
    }
};


function UpperBound(type,ui) {   
    //temp of prec variabele mapping
    switch (type) {
        case "temp":
            bst=tgem;
            json=tmax_gem;
            previoushigh=previoushight;
            break;
        case "prec":
            bst=ptot;
            json=prectot;
            previoushigh=previoushighp;
            break;            
    }
    
    var val = Number(ui.values[1]);
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
            
            
    if (type=="temp") {
        previoushight=val;       
    }
    else if (type=="prec"){
        previoushighp=val;
    }
}









function Bounds(type,ui){
    LowerBound(type,ui);
    UpperBound(type,ui);
}






