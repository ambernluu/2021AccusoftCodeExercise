
  //creates an element of name and attributes and appends the below arguments as child nodes. converts strings to text nodes
  createDomElement = function(name, attributes) {
    const node = document.createElement(name);
    if (attributes) {
      for (let attr in attributes)
        if (attributes.hasOwnProperty(attr))
          node.setAttribute(attr, attributes[attr]);
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i];
      if (typeof child == "string")
        child = document.createTextNode(child);
      node.appendChild(child);
    }
    return node;

  }
  //this is the where the element is relative to the top left corner of the screen
  let relativePos = function(event, element) {
    const rect = element.getBoundingClientRect();
    return {x: Math.floor(event.clientX - rect.left),
            y: Math.floor(event.clientY - rect.top)};

  }
  //calls function for when mouse is clicked and registers when mouse is released
  trackDrag = function(onMove, onEnd) {
    function end(event) {
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseup", end);
      if(onEnd){
        onEnd(event);
      }
    }
    addEventListener("mousemove", onMove);
    addEventListener("mouseup", end);

  }
  //function is used to load both URL and local file to canvas
  loadImageURL = function(cx, url) {
    const image = document.createElement("img");
    image.addEventListener("load", function() {
      const color = cx.fillStyle, size = cx.lineWidth;
      cx.canvas.width = image.width;
      cx.canvas.height = image.height;
      cx.drawImage(image, 0, 0);
      cx.fillStyle = color;
      cx.strokeStyle = color;
      cx.lineWidth = size;
    });
    image.src = url;
  }
  //used for spray tool to get the random points within the radius to spray
  randomPointInRadius = function(radius) {
    for (;;) {
      let x = Math.random() * 2 - 1;
      let y = Math.random() * 2 - 1;
      if (x * x + y * y <= 1)
        return {x: x * radius, y: y * radius};
    }

  }
 



