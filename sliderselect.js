var lowerboundprevp=0;
var upperboundprevp=5000;
var lowerboundprevt=-45;
var upperboundprevt=45;

function LowerBound(type,ui) {
    //temp of prec variabele mapping
    switch (type) {
        case "temp":
            previouslow=previouslowt;
            break;
        case "prec":
            previouslow=previouslowp;
            break;            
    }
    
    
    
    var val = Number(ui.values[0]);
    //toevoegen van features bij verlagen minwaarde
    if (val < previouslow) {
        var features=new ol.format.GeoJSON().readFeatures(klimaatjson);
        features.forEach(function (feature) {
                if ((feature.get('DN')) < previouslow && (feature.get('DN')) > val) {
                    //just add feature
                    klimaat.getSource().addFeature(feature);
                }
                
            })
            }
    //verwijderen van features bij verhogen minwaarde
    else if (previouslow < val) {
        klimdata.getSource().getFeatures().forEach(function (feature) {
                if ((feature.get('DN_2')) < val) {
                    //just remove feature
                    klimaat.getSource().removeFeature(feature);
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
            previoushigh=previoushight;
            break;
        case "prec":
            previoushigh=previoushighp;
            break;            
    }
    
    var val = Number(ui.values[1]);
    //verwijderen van features bij verlagen maxwaarde
    if (val < previoushigh) {
        klimaat.getSource().getFeatures().forEach(function (feature) {
                if ((feature.get('DN')) > val) {
                    //just remove feature
                    klimaat.getSource().removeFeature(feature);
                }
                
            })
            }
    //toevoegen van features bij verhogen maxwaarde
    else if (previoushigh < val) {
        var features=new ol.format.GeoJSON().readFeatures(klimaatjson);
        features.forEach(function (feature) {
                if ((feature.get('DN')) > previoushigh && (feature.get('DN')) < val) {
                    //just add feature
                    klimaat.getSource().addFeature(feature);
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



//één laag
function precBounds(ui){
    var lowerbound = Number(ui.values[0]);
    var upperbound = Number(ui.values[1]);
    var lowt = $( "#mint" ).val();
    var hight = $( "#maxt" ).val();

    //LOWERBOUND verandering
    
    //verwijderen features bij verhogen lowerbound
    if (lowerbound>lowerboundprevp)
        {
        klimdata.getSource().getFeatures().forEach(function (feature) {
            if (feature.get('DN_2') < lowerbound) {
                klimdata.getSource().removeFeature(feature);}
        })
        //update lowerboundprevp
        lowerboundprevp=lowerbound
        }
    //toevoegen features bij verlagen lowerbound            
    else if (lowerbound<lowerboundprevp)
        {//add feature if within parameter boundaries
        var features=new ol.format.GeoJSON().readFeatures(klimaat);
        features.forEach(function(feature){
            if (feature.get('DN_2') < lowerboundprevp && feature.get('DN_2') > lowerbound && feature.get('DN') > lowt && feature.get('DN') < hight) {
                //just add feature
                klimdata.getSource().addFeature(feature);}})
        //update lowerboundprevp
        lowerboundprevp=lowerbound
        }

    
    //UPPERBOUND verandering
    
    //verwijderen features bij verlagen upperbound
    if (upperbound<upperboundprevp)
        {
        klimdata.getSource().getFeatures().forEach(function (feature) {
            if (feature.get('DN_2') > upperbound) {
                klimdata.getSource().removeFeature(feature);}
        })
        //update upperboundprevp
        upperboundprevp=upperbound;        
        }
    //toevoegen features bij verhogen upperbound
    else if (upperbound>upperboundprevp)
        {
        //add feature if within parameter boundaries
        var features=new ol.format.GeoJSON().readFeatures(klimaat);
        features.forEach(function(feature){
            if (feature.get('DN_2') < upperbound && feature.get('DN_2')>upperboundprevp && feature.get('DN') > lowt && feature.get('DN')< hight ) {
                //just add feature
                klimdata.getSource().addFeature(feature);}})    
        //update upperboundprevp
        upperboundprevp=upperbound;
        }
    

    
    
    
    } 





function tempBounds(ui){
    var lowerbound = Number(ui.values[0]);
    var upperbound = Number(ui.values[1]);
    var lowp = $( "#minp" ).val();
    var highp = $( "#maxp" ).val();

    //LOWERBOUND verandering
    
    //verwijderen features bij verhogen lowerbound
    if (lowerbound>lowerboundprevt)
        {
        klimdata.getSource().getFeatures().forEach(function (feature) {
            if (feature.get('DN') < lowerbound) {
                klimdata.getSource().removeFeature(feature);}
        })
        //update lowerboundprevp
        lowerboundprevt=lowerbound
        }
    //toevoegen features bij verlagen lowerbound            
    else if (lowerbound<lowerboundprevt)
        {//add feature if within parameter boundaries
        var features=new ol.format.GeoJSON().readFeatures(klimaat);
        features.forEach(function(feature){
            if (feature.get('DN') < lowerboundprevt && feature.get('DN') > lowerbound && feature.get('DN_2') > lowp && feature.get('DN_2') < highp) {
                //just add feature
                klimdata.getSource().addFeature(feature);}})
        //update lowerboundprevp
        lowerboundprevt=lowerbound
        }

    
    //UPPERBOUND verandering
    
    //verwijderen features bij verlagen upperbound
    if (upperbound<upperboundprevt)
        {
        klimdata.getSource().getFeatures().forEach(function (feature) {
            if (feature.get('DN') > upperbound) {
                klimdata.getSource().removeFeature(feature);}
        })
        //update upperboundprevp
        upperboundprevt=upperbound;        
        }
    //toevoegen features bij verhogen upperbound
    else if (upperbound>upperboundprevt)
        {
        //add feature if within parameter boundaries
        var features=new ol.format.GeoJSON().readFeatures(klimaat);
        features.forEach(function(feature){
            if (feature.get('DN') < upperbound && feature.get('DN')>upperboundprevt && feature.get('DN_2') > lowp && feature.get('DN_2')< highp ) {
                //just add feature
                klimdata.getSource().addFeature(feature);}})    
        //update upperboundprevp
        upperboundprevt=upperbound;
        }
    

    
    
    
    } 







