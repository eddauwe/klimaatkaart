var prevproj="WGS 84 / Pseudo-Mercator";
//epsg code woordenboek
var epsg={"EPSG:3857":"WGS 84 / Pseudo-Mercator","EPSG:31370":"Lambert 72"}

//get key by value
function getKeyByValue(object,value){
    return Object.keys(object).find(key=>object[key] === value);
}


var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            
            
            proj=document.getElementsByClassName("select-selected")[0].innerHTML;
            console.log("projectie: " + proj);
            console.log("previous projectie: " + prevproj);

            if (proj!=prevproj){
            

            
            //epsg code
            var code =getKeyByValue(epsg,proj)
            var prevcode=getKeyByValue(epsg,prevproj)
            
            centerview = map.getView().getCenter();
            prevzoom=map.getView().getZoom();
            
            console.log(centerview);
            
            //herprojecteer kaart
            var tempsource = new ol.source.Vector({
                features:(new ol.format.GeoJSON()).readFeatures(klimaat,{
                  dataProjection: 'EPSG:3857',
                  featureProjection: code
                })
            });
            
            
            projection= new ol.proj.Projection({
              code: code,
              extent: [
                -18019909.21177587,
                -9009954.605703328,
                18019909.21177587,
                9009954.605703328 ],
              worldExtent: [-179, -89.99, 179, 89.99]
            });            
           
            
            
            //new source of klimdata layer
            klimdata.setSource(tempsource);
            klimaatfilter();
            //new map view
            var view= new ol.View({
              center: ol.proj.transform(centerview,prevcode,code),
              projection:projection,
              zoom: prevzoom,
              minZoom:4
            })
            
            map.setView(view);
            
            //maak van nieuwe projectie oude projectie
            prevproj = proj;
            
            }
            

            
            
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);