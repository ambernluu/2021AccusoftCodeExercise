
//appends paint interface to the DOM element
function createPaint(parent) {

  const canvas1 = createDomElement("canvas", {width: 900, height: 500});
  const canvas2 = createDomElement("canvas", {width: 900, height: 500});
  canvas1.setAttribute("id", "canvas1");
  canvas2.setAttribute("id", "canvas2");

  const cx = canvas1.getContext("2d");
  const cx2 = canvas2.getContext("2d");

  const toolbar1 = createDomElement("div", {class: "toolbar"});
  const toolbar2 = createDomElement("div", {class: "toolbar"});

  for (let name in controls){
    toolbar1.appendChild(controls[name](cx));
    toolbar2.appendChild(controls[name](cx2));
  }


  const panel1 = createDomElement("div", {class: "picturepanel1"}, canvas1);
  const panel2 = createDomElement("div", {class: "picturepanel2"}, canvas2);
  parent.appendChild(createDomElement("div", null, panel1, toolbar1));
  parent.appendChild(createDomElement("div", null, panel2, toolbar2));
  panel1.appendChild(toolbar1);
  $(panel2).append($(toolbar2));

  $(document).ready(function() {   
  $("#tab1C").append($(panel1));
  $("#tab2C").append($(panel2));
});
}
