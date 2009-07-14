js.graphics.CanvasContext = Extends(js.graphics.GraphicalContext,{
	constructor: function(canvas2dContext){
		js.graphics.GraphicalContext.apply(this, arguments);
		
		if(canvas2dContext == null)
			throw new js.core.Exception('Null constructor argument', this);
		
		this.canvas = canvas2dContext;
	},
	canvas: null,
	clear: function(){
		var width = this.canvas.canvas.getAttribute('width');
		var height = this.canvas.canvas.getAttribute('height');
		this.canvas.clearRect(0,0,width, height);
	},
	drawArc: function(x, y, width, height, startAngle, arcAngle){},
	drawLine: function(x1,y1,x2,y2){
		this.canvas.beginPath();
		this.canvas.moveTo(x1, y1);
		this.canvas.lineTo(x2, y2);
		this.canvas.stroke();
	},
	drawOval: emptyFn,
	drawPolygon: function(points){
		if(!Array.isArray(points))
			throw new js.core.Exception('Invalid argument type: '+points, this, arguments);		
		
		this.canvas.beginPath();
		this.canvas.moveTo(points[0].x, points[0].y);		
		for(var i = 0; i < points.length; i++){
			this.canvas.lineTo(points[i].x, points[i].y);
		}
		this.canvas.closePath();
		this.canvas.stroke();
	},
	drawPolyline: function(points){
		if(!Array.isArray(points))
			throw new js.core.Exception('Invalid argument type: '+points, this, arguments);
		
		this.canvas.beginPath();
		this.canvas.moveTo(points[0].x, points[0].y);		
		for(var i = 0; i < points.length; i++){
			this.canvas.lineTo(points[i].x, points[i].y);
		}
		this.canvas.fill();
	},
	drawRect: function(x, y, width, height){
		this.canvas.beginPath();
		this.canvas.rect(x, y, width, height);
		this.canvas.stroke();
	},
	drawRoundRect: function(x, y, width, height, arcWidth, arcHeight){
		
	},
	drawShape: emptyFn,
	drawString: function(string, x, y){
		if(!String.isString(string))
			throw new js.core.Exception("Invalid argument type: "+typeof string, this, arguments);
		
		this.canvas.fillText(string, x, y);
	},
	fillOval: emptyFn,
	fillPolygon: function(points){
		this.drawPolygon(points);
		this.canvas.fill();
	},
	fillRect: function(x, y, width, height){
		this.canvas.fillRect(x, y, width, height);
	},
	fillRoundRect: emptyFn,
	fillShape: emptyFn,
	setFont: emptyFn,
	setColor: emptyFn,
	setPaint: emptyFn,
	translate: emptyFn
},'js.graphics.CanvasContext');