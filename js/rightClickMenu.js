        $(document).bind("contextmenu", function (event) {       
        // Prevent the default Context Menu from showing
        event.preventDefault();     
        // Show contextmenu to the lower right of the mouse
        const positionOfMenuRelativeToClickPoint = {
            top: event.pageY + "px",
            left: event.pageX + "px"
        }
        $(".custom-menu").finish().toggle(100).css(positionOfMenuRelativeToClickPoint);
    });
    // If the document is clicked somewhere
    $(document).bind("mousedown", function (e) {      
        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-menu").length > 0) {           
            // Hide the context Menu
            $(".custom-menu").hide(100);
        }
    });
    // If the menu element is clicked
        $(document).on("click", ".custom-menu li", function(e) {
            const inactiveTab = $('#tabs li a.inactive').text();
            let idToUse;

            if(inactiveTab === "Canvas1"){
                idToUse = "canvas2";
            }
            else{
                idToUse = "canvas1";
            }

            const canvas = document.getElementById(idToUse);
        const cx = canvas.getContext("2d");
    
    
        switch($(this).attr("data-action")) {  
                // right click for fill background
                case "fillBG":
                    canvas.style.background = cx.fillStyle;        
                break;

                // right click for resetting canvas option
                case "resetCanvas": 
                    cx.clearRect(0, 0, cx.canvas.width,cx.canvas.height);
                    createPaint(document.body);
                break;
        }
        // Hide it AFTER the action was triggered
        $(".custom-menu").hide(100);
      });

    $('#Menu').on( "click", '#button-1', function(e){
        alert('CLICKED 1');
    });

    $('#Menu').on( "click", '#button-2', function(e){
        $('#button-1').trigger('click');
        alert('CLICKED 2');
    });




