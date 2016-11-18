var c = document.getElementById('light'),
ctx = c.getContext('2d'),
cw = c.width = window.innerWidth,
ch = c.height = window.innerHeight,
rand = function(a,b){return ~~((Math.random()*(b-a+1))+a);},
crawlers = [],
crawlCount = 100,
Crawler = function(arg){
  this.x = arg.x || cw / 2;
  this.y = arg.y || ch / 2;
  this.lx = arg.x || cw / 2;
  this.ly = arg.y || ch / 2;
  this.vx = arg.vx || 0;
  this.vy = arg.vy || 0;
  this.hue = arg.hue || 0;
  this.saturation = arg.saturation || 75;
  this.lightness = arg.lightness || 30;
  this.alpha = arg.alpha || .5;
  this.width = arg.width || .5;
},
updateCrawlers = function(){
  var i = crawlers.length;
  while(i--){crawlers[i].update()}
},
renderCrawlers = function(){
	var i = crawlers.length;
  while(i--){crawlers[i].render()}
},
clear = function(){
  ctx.clearRect(0, 0, cw, ch);  
},
loop = function(){
	clear();
  updateCrawlers();
  renderCrawlers();
}
    
Crawler.prototype = {
	update: function(){
    this.lx = this.x;
    this.ly = this.y;
  	this.vx += (rand(0, 1000) - 500) / 10000;
  	this.vy += (rand(0, 1000) - 500) / 1000;
    this.x += this.vx;
    this.y += this.vy;
    if(this.x >= cw || this.x <= 0){
      this.vx = -this.vx;
    }
    if(this.y >= ch || this.y <= 0){
      this.vy = -this.vy;
    }
	},
  render: function(){    
		ctx.beginPath();
    ctx.moveTo(this.x, this.y);    
    ctx.lineTo(this.x, ch);
    ctx.lineWidth = this.width;
   	ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
    ctx.stroke();
    
  }       
}
while(crawlCount--){
  crawlers.push(new Crawler({
    y: ch,
    hue: rand(60, 180),
    saturation: 75,
    lightness: rand(1, 30),
    alpha: rand(5, 10)/100,
    width: rand(50, 200)/100
 }));
}
//$(window).click(clear);
ctx.globalCompositeOperation = 'lighter';
//document.body.appendChild(c);
setInterval(loop, 16);