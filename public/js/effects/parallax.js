(function(){

  var parallax = document.querySelectorAll(".parallax img"),
      speed = 0.15,
      BOTTOM_OFFSET = 0;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var window_y_offset = window.pageYOffset,
          image_pos = (window_y_offset * speed);
      
      el.style.bottom = BOTTOM_OFFSET - image_pos + 'px';
    });
  };

})();