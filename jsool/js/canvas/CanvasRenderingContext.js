js.canvas.CanvasRenderingContext = $extends(js.core.Object,{
	cons: function(canvas2dContext){
		this.context = canvas2dContext;
	},
	context: null,
	clear: function(){
		this.context.clearRect(0,0,this.getWidth(), this.getHeight());
	},
	getWidth : function() {
		return this.context.canvas.getAttribute('width');
	},
	getHeight : function() {
		return this.context.canvas.getAttribute('height');
	},
	fillRect : function(x, y, width, height) {
		this.context.fillRect(x, y, width, height);
	},
	strokeRect : function(x, y, width, height) {
		this.context.strokeRect(x, y, width, height);
	},
	clearRect : function(x, y, width, height) {
		this.context.clearRect(x, y, width, height);
	},
	fillCircle : function(x, y, radius) {
		this.beginPath();
		this.arc(x, y, radius, 0, Math.PI * 2, false);
		this.fill();
	},
	beginPath : function() {
		this.context.beginPath();
	},
	closePath : function() {
		this.context.closePath();
	},
	stroke : function() {
		this.context.stroke();
	},
	fill : function() {
		this.context.fill();
	},
	moveTo : function(x, y) {
		this.context.moveTo(x, y);
	},
	lineTo : function(x, y) {
		this.context.lineTo(x, y);
	},
	arc : function(x, y, radius, startAngle, endAngle, anticlockwise) {
		this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	},
	quadraticCurveTo : function(cp1x, cp1y, x, y) {
		this.context.quadraticCurveTo(cp1x, cp1y, x, y);
	},
	bezierCurveTo : function(cp1x, cp1y, cp2x, cp2y, x, y) {
		this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
	},
	rect : function(x, y, width, height) {
		this.context.rect(x, y, width, height);
	},
	drawImage : function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
		if (!sWidth)
			this.context.drawImage(image, sx, sy);
		else if (!dx)
			this.context.drawImage(image, sx, sy, sWidth, sHeight);
		else
			this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	},
	setStrokeStyle : function(style) {
		if(!String.isString(style))
			throw new js.core.Exception('Invalid argument type: '+ typeof style, this, arguments);
		
		this.context.strokeStyle = style;
	},
	setFillStyle : function(style) {
		if(!String.isString(style))
			throw new js.core.Exception('Invalid argument type: '+ typeof style, this, arguments);
		
		this.context.fillStyle = style;
	},
	setLineWidth : function(width) {
		if(!Number.isNumber(width))
			throw new js.core.Exception('Invalid argument type: '+ typeof width, this, arguments);
		
		this.context.lineWidth = width;
	},
	setLineCap : function(type) {
		if(!String.isString(type))
			throw new js.core.Exception('Invalid argument type: '+ typeof type, this, arguments);
		
		this.context.lineCap = type;
	},
	setLineJoin : function(type) {
		if(!String.isString(type))
			throw new js.core.Exception('Invalid argument type: '+ typeof type, this, arguments);
		
		this.context.lineJoin = type;
	},
	setMiterLimit : function(value) {
		this.context.miterLimit = value;
	},
	createLinearGradient : function(x1, y1, x2, y2) {
		return this.context.createLinearGradient(x1, y1, x2, y2);
	},
	createRadialGradient : function(x1, y1, r1, x2, y2, r2) {
		return this.context.createRadialGradient(x1, y1, r1, x2, y2, r2);
	},
	createPattern : function(image, type) {
		return this.context.createPattern(image, type);
	},
	globalAlpha : function(alpha) {
		this.context.globalAlpha = alpha;
	},
	setShadowOffsetX : function(number) {
		this.context.shadowOffsetX = number;
	},
	setShadowOffsetY : function(number) {
		this.context.shadowOffsetY = number;
	},
	setShadowBlur : function(number) {
		this.context.shadowBlur = number;
	},
	setShadowColor : function(color) {
		this.context.shadowColor = color;
	},
	setFont : function(font) {
		if(!String.isString(font))
			throw new js.core.Exception('Invalid argument type: '+ typeof font, this, arguments);
		
		this.context.font = font;
	},
	write : function(text, x, y, maxWidth) {
		if(!String.isString(text))
			throw new js.core.Exception('Invalid argument type: '+ typeof text, this, arguments);
		
		//The text is painted tow times because of the default smoothness
		if(maxWidth != null){
			this.context.fillText(text, x, y, maxWidth);
			this.context.fillText(text, x, y, maxWidth);
		}else{
			this.context.fillText(text, x, y);
			this.context.fillText(text, x, y);
		}
	},
	measureText: function(text){
		if(!String.isString(text))
			throw new js.core.Exception('Invalid argument type: '+ typeof text, this, arguments);
		
		return this.context.measureText(text);
	},
	saveState : function() {
		this.context.save();
	},
	restoreState : function() {
		this.context.restore();
	},
	translateOrigin : function(x, y) {
		this.context.translate(x, y);
	},
	rotate : function(angle) {
		this.context.rotate(angle);
	},
	scale : function(x, y) {
		if (!y)
			y = x;
		this.context.scale(x, y);
	},
	setComposition : function(type) {
		this.context.globalCompositeOperation = type;
	}
},'js.canvas.CanvasRenderingContext');