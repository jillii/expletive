$(".draggable").mousedown(function(e) {
    // only drag musics if user clicks top bar
    if ($(this).is("label")) {
      draggy = $(this).parent();
    } else {
      draggy = $(this);
    }

  var el = draggy[0],
      pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    draggy.css("animation-play-state", "paused");
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    function elementDrag(e) {
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      console.log("pos1 = " + pos1);
      console.log("pos2 = " + pos2);
      console.log("pos3 = " + pos3);
      console.log("pos4 = " + pos4);

      console.log("el.offsetTop = " + el.offsetTop);
      console.log("el.offsetLeft = " + el.offsetLeft);
      // set the element's new position:
      el.style.top = (el.offsetTop - pos2) + "px";
      el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      draggy.css("animation-play-state", "paused");
      document.onmouseup = null;
      document.onmousemove = null;
    }

});