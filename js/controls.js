var controls = Object.create(null);

controls = (function() {

	var controlsModule = {};

	controlsModule.tool = function(cx) {
	  var select = createDomElement("select");
	  for (var name in tools) {

	  	if (name == "getVersion") continue;
	    select.appendChild(createDomElement("option", null, name));
	}

	  cx.canvas.addEventListener("mousedown", function(event) {
	    if (event.which == 1) {
	      tools[select.value](event, cx);
	      event.preventDefault();
	    }
	  });

	  return createDomElement("span", null, "Tool: ", select);
	};

	controlsModule.color = function(cx) {
	  var input = createDomElement("input", {type: "color"});
	  input.addEventListener("change", function() {
	    cx.fillStyle = input.value;
	    cx.strokeStyle = input.value;
	  });
	  return createDomElement("span", null, "Color: ", input);
	};

	controlsModule.brushSize = function(cx) {
	  var select = createDomElement("select");
	  var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
	  sizes.forEach(function(size) {
	    select.appendChild(createDomElement("option", {value: size},
	                           size + " pixels"));
	  });
	  select.addEventListener("change", function() {
	    cx.lineWidth = select.value;
	  });
	  return createDomElement("span", null, "Brush size: ", select);
	};

	controlsModule.save = function(cx) {
	  var link = createDomElement("a", {href: "/"}, "Save");
	  function update() {
	    try {
	      link.href = cx.canvas.toDataURL();
	    } catch (e) {
	      if (e instanceof SecurityError)
	        link.href = "javascript:alert(" +
	          JSON.stringify("Can't save: " + e.toString()) + ")";
	      else
	        throw e;
	    }
	  }
	  link.addEventListener("mouseover", update);
	  link.addEventListener("focus", update);
	  return link;
	};

	controlsModule.openFile = function() {
	  var input = createDomElement("input", {type: "file"});
	  input.addEventListener("change", function() {
	    if (input.files.length == 0) return;
	    var reader = new FileReader();
	    reader.addEventListener("load", function() {
	      loadImageURL(cx, reader.result);
	    });
	    reader.readAsDataURL(input.files[0]);
	  });
	  return createDomElement("div", null, "Open file: ", input);
	};

	controlsModule.openURL = function(cx) {
	  var input = createDomElement("input", {type: "text"});
	  var form = createDomElement("form", null,
	                 "Open URL: ", input,
	                 createDomElement("button", {type: "submit"}, "load"));
	  form.addEventListener("submit", function(event) {
	    event.preventDefault();
	    loadImageURL(cx, input.value);
	  });
	  return form;
	};

	return controlsModule;
})();