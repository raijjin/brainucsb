window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function between(min, max) {
  return Math.random() * (max - min) + min;
}

var c = document.getElementById('d');
var ctx = c.getContext('2d');
//context and id of canvas

var extraHeight = 253
var w = window.innerWidth;
var h = window.innerHeight + extraHeight;
//width and height of canvas

c.width = w;
c.height = h;
//setting the width and height for canvas

var partNum = (w * h) / 28800;
//particle number - change it!

var mouse = {
  x: w / 2, 
  y: h / 2,
  r: 60
};

var cursorOpacity = 1;
var cursorTrue = false;
var cursorMinDest = 25;

//mouse position

document.addEventListener('mousemove', function(e){ 
    mouse.x =  e.pageX; 
    mouse.y = e.pageY-70;
}, false);
//finding the mouse position


/*
document.addEventListener('mousedown', function(){ 
  mouse.r = 100;
  cursorOpacity = 0.2;
  cursorTrue = true;
  cursorMinDest = 200;
}, false);
// making implode

document.addEventListener('mouseup', function(){ 
  mouse.r = 60;
  cursorOpacity = 1;
  cursorTrue = false;
  cursorMinDest = 25;
}, false);
// making implode
*/
var particles = [];
for(i = 0; i < partNum; i++) {
  particles.push(new particle);
}
    
//the particle function
function particle() {
  this.x = Math.random() * c.width;
  this.y = Math.random() * c.height;
  //setting the mouse position to the particle x and y
  
  this.vx = 0;
  this.vy = 0;
  
  this.r = Math.random() * 15;
  
  //var r = '#c0392b';
  var o = '#e67e22';
  var y = '#ffe552';
  var array = [o, y];
  this.color = array[Math.floor(Math.random() * 2)];
}

function draw() {
  requestAnimFrame(draw);

  c.width = window.innerWidth;
  c.height = window.innerHeight;
  //setting the width and height for canvas
  
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(0, 0, c.width, c.height);
  
  /*ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, ' + cursorOpacity + ')';
    ctx.arc(mouse.x, mouse.y, mouse.r, Math.PI * 2, false);
    ctx.fill();*/
  
  for(t = 0; t < particles.length; t++) {
    var p = particles[t];
    
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
    ctx.fill();
    //the context of the particle(s)
    
    p.x+=p.vx;
    p.y+=p.vy;
    
    p.vx*=0.95;
    p.vy*=0.95;
    
    if(p.y < 0 + p.r) {
      p.vy *= -1;
    }
    if(p.y > c.height - p.r) {
      p.vy *= -1;
    }
    if(p.x < 0 + p.r) {
      p.vx *= -1;
    }
    if(p.x > c.width - p.r) {
      p.vx *= -1;
    }
    if(p.r < 3) {
      p.color = 'white';
    };
    

    
    for(j = 0; j < particles.length; j++) {
      var pp = particles[j];
      distance(p, pp);
    }
    
    distance(mouse, p);
  }
}

function distance(p1, p2) {
  var dist, 
    dx = p1.x - p2.x,
    dy = p1.y - p2.y;
  
  dist = Math.sqrt(dx*dx + dy*dy);
      
  // Draw the line when distance is smaller
  // then the minimum distance
  var minDist = p1.r + p2.r;
  
  if(dist <= minDist) {
    var ax = dx,
      ay = dy;
    // Some acceleration for the partcles 
    // depending upon their distance
    if(cursorTrue) {
      p2.vx += ax/100;
      p2.vy += ay/100;
    } else {
      p2.vx -= ax/30;
      p2.vy -= ay/30;
    }
  }
}

draw();