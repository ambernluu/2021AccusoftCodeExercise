//this holds the tools for drawing lines, erasing, writing text, and spraying
//mousedown event is handed off to the tool when the use clicks the canvas 
let tools = {} || tools;

tools = (function() {
	const _toolsModule = {};

	//sets getVersion to the string below
	_toolsModule.getVersion = () => ("Amber - version 1.0");

	//for line tool. erase tool calls this function and sets onEnd to function to set cx.globalCompositeOperation back to source-over
	_toolsModule.Line = function(event, cx, onEnd) {
		cx.lineCap = "round";
	  let pos = relativePos(event, cx.canvas);
	  
	  trackDrag(function(event) {
		cx.beginPath();
	    cx.moveTo(pos.x, pos.y);
	    pos = relativePos(event, cx.canvas);
	    cx.lineTo(pos.x, pos.y);
	    cx.stroke();
	  }, onEnd);
	  
	};

	//when user selects the tool erase it changes globalCompositeOperation to destination-out and calls line function
	_toolsModule.Erase = function(event, cx) {
	  $('selector').css( 'cursor', 'pointer' );
		cx.globalCompositeOperation = "destination-out";
	  _toolsModule.Line(event, cx, function() {
	    cx.globalCompositeOperation = "source-over";
	  });
	};
	
	//when user selects text a pop up prompt appears for the user to type in text to display to canvas
	//issue when changing colors and clicking on the canvas first that it doesn't change the color.
	_toolsModule.Text = function(event, cx) {
	  const text = prompt("Text:", "");
	  if (text) {
			let pos = relativePos(event, cx.canvas);
	    cx.font = Math.max(7, cx.lineWidth) + "px sans-serif";
	    cx.fillText(text, pos.x, pos.y);
	  }
	};

	//this function is for when the user selects the spray tool. spray tool displays random dots within the radius of where the user moves the mouse
	_toolsModule.Spray = function(event, cx) {
	  const radius = cx.lineWidth / 2;
	  const area = radius * radius * Math.PI;
	  const dotsPerTick = Math.ceil(area / 30);

	  let currentPos = relativePos(event, cx.canvas);
	  let spray = setInterval(function() {
	    for (let i = 0; i < dotsPerTick; i++) {
	      let offset = randomPointInRadius(radius);
	      cx.fillRect(currentPos.x + offset.x,
	                  currentPos.y + offset.y, 1, 1);
	    }
	  }, 25);

	  trackDrag(function(event) {
	    currentPos = relativePos(event, cx.canvas);
	  }, function() {
	    clearInterval(spray);
	  });

	};

	return _toolsModule;
})();