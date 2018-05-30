class Circle{
	constructor(x,y,dx,dy,radius,color){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.color = color;
		this.gravity = 1;
		this.friction = 0.8;
	}

	draw(){
		var c = this.ctx;
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.strokeStyle = this.color;
		//c.strokeStyle=`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()*1})`;
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}

	update(){

		var cw = this.canvas.width;
		var ch = this.canvas.height;


		if( (this.dx>0 && this.x+this.radius+this.dx >= cw) || (this.dx<0 && this.x-this.radius-this.dx <= 0) ){
			this.dx = -this.dx*0.3;
		}

		if( this.dy>0 && this.y+this.radius > ch ){
			this.dy = - this.dy*this.friction;
		}else{
			this.dy += this.gravity;
		}


		if(Math.abs(this.dx) < 0.5){
			this.dx = 0;
		}
		
		this.x += this.dx;
		
		//console.log(Math.abs(this.dx))
		if(Math.abs(this.dy) <= 1 && this.y + this.radius > ch){
			//console.log(Math.abs(this.dy))
			this.y = ch - this.radius;
		}else{
			this.y += this.dy;
		}

		//console.log(this.dy)
		this.draw();
	}
}



class Motion{
	constructor(){
		//初始化
		this.init();
	}

	init(){
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.circle = null;
		this.group = [];
		this.mouse = {x: 0,y: 0,dis:80,maxr: 50,minr: 2};

		//初始化画布
		this.initCanvas();

		//初始化事件
		this.initEvenets();
	}

	initCanvas(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		
		//初始化所有圆
		this.initGroup();

		//绘制形状
		this.drawCircle();
	}

	initGroup(){
		var x = 0,y = 0,dx = 0,dy = 0,radius = 0,color = '';
		this.group = [];
		for(var i=0;i<200;i++){
			x = Math.random()*this.canvas.width;
			y = Math.random()*this.canvas.height - 100;
			dx = (Math.random()-0.5) * 8;
			dy = (Math.random()-0.5) * 8;
			radius = (Math.random()*50);
			color = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()*1})`;
			this.group.push(new Circle(x,y,dx,dy,radius,color));
		}
	}

	initEvenets(){
		window.addEventListener('mousemove',(ev)=>{
			this.mouse.x = ev.x;
			this.mouse.y = ev.y;
		});
		window.addEventListener('resize',(ev)=>{
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			this.initGroup();
		});
	}

	drawCircle(){

		//var c = this.ctx;
		var ctx = this.ctx;
		var cw = this.canvas.width;
		var ch = this.canvas.height;
		var This = this;
		
		function draw(){
			requestAnimationFrame(draw);
			ctx.clearRect(0,0,cw,ch);
			for(var i=0;i<This.group.length;i++){
				This.group[i].update();
			}
		}

		draw();
	}
}

new Motion();