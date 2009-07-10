js.canvas = {};
// DESENVOLVIDO DE ACORDO COM O TUTORIAL
// https://developer.mozilla.org/En/Canvas_tutorial
// CANVAS=============================================================
js.canvas.Canvas = js.Extends(Object, {
	constructor : function(c) {
		Object.apply(this, arguments);
		if (typeof c == 'string')
			this.dom = document.getElementById(c);
		else if (typeof c == 'object')
			this.dom = c;
		this.canvas = this.dom.getContext('2d');
	},
	canvas : null,
	dom : null,
	clear: function(){
		this.canvas.clearRect(0,0,this.getWidth(), this.getHeight());
	},
	getWidth : function() {
		return this.dom.getAttribute('width');
	},
	setWidth : function(width) {
		return this.dom.setAttribute('width', width);
	},
	getHeight : function() {
		return this.dom.getAttribute('height');
	},
	setHeight : function(height) {
		return this.dom.setAttribute('height', height);
	},
	fillRect : function(x, y, width, height) {
		this.canvas.fillRect(x, y, width, height);
	},
	strokeRect : function(x, y, width, height) {
		this.canvas.strokeRect(x, y, width, height);
	},
	clearRect : function(x, y, width, height) {
		this.canvas.clearRect(x, y, width, height);
	},
	fillCircle : function(x, y, radius) {
		this.beginPath();
		this.arc(x, y, radius, 0, Math.PI * 2, false);
		this.fill();
	},
	beginPath : function() {
		this.canvas.beginPath();
	},
	closePath : function() {
		this.canvas.closePath();
	},
	stroke : function() {
		this.canvas.stroke();
	},
	fill : function() {
		this.canvas.fill();
	},
	moveTo : function(x, y) {
		this.canvas.moveTo(x, y);
	},
	lineTo : function(x, y) {
		this.canvas.lineTo(x, y);
	},
	arc : function(x, y, radius, startAngle, endAngle, anticlockwise) {
		this.canvas.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	},
	quadraticCurveTo : function(cp1x, cp1y, x, y) {
		this.canvas.quadraticCurveTo(cp1x, cp1y, x, y);
	},
	bezierCurveTo : function(cp1x, cp1y, cp2x, cp2y, x, y) {
		this.canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
	},
	rect : function(x, y, width, height) {
		this.canvas.rect(x, y, width, height);
	},
	drawImage : function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth,
			dHeight) {
		if (!sWidth)
			this.canvas.drawImage(image, this.fixedX(sx), sy);
		else if (!dx)
			this.canvas.drawImage(image, sx, sy, sWidth, sHeight);
		else
			this.canvas.drawImage(image, sx, sy, sWidth, sHeight, dx, dy,
					dWidth, dHeight);
	},
	setStrokeStyle : function(style) {
		this.canvas.strokeStyle = style;
	},
	setFillStyle : function(style) {
		this.canvas.fillStyle = style;
	},
	setLineWidth : function(width) {
		this.canvas.lineWidth = width;
	},
	setLineCap : function(type) {
		this.canvas.lineCap = type;
	},
	setLineJoin : function(type) {
		this.canvas.lineJoin = type;
	},
	setMiterLimit : function(value) {
		this.canvas.miterLimit = value;
	},
	createLinearGradient : function(x1, y1, x2, y2) {
		return this.canvas.createLinearGradient(x1, y1, x2, y2);
	},
	createRadialGradient : function(x1, y1, r1, x2, y2, r2) {
		return this.canvas.createRadialGradient(x1, y1, r1, x2, y2, r2);
	},
	createPattern : function(image, type) {
		return this.canvas.createPattern(image, type);
	},
	globalAlpha : function(alpha) {
		this.canvas.globalAlpha = alpha;
	},
	setShadowOffsetX : function(number) {
		this.canvas.shadowOffsetX = number;
	},
	setShadowOffsetY : function(number) {
		this.canvas.shadowOffsetY = number;
	},
	setShadowBlur : function(number) {
		this.canvas.shadowBlur = number;
	},
	setShadowColor : function(color) {
		this.canvas.shadowColor = color;
	},
	setFont : function(font) {
		this.canvas.font = font;
	},
	write : function(text, x, y, maxWidth) {
		if(maxWidth != null){
			this.canvas.fillText(text, x, y, maxWidth);
		}else{
			this.canvas.fillText(text, x, y);
		}
	},
	measureText: function(text){
		return this.canvas.measureText(text);
	},
	saveState : function() {
		this.canvas.save();
	},
	restoreState : function() {
		this.canvas.restore();
	},
	translateOrigin : function(x, y) {
		this.canvas.translate(x, y);
	},
	rotate : function(angle) {
		this.canvas.rotate(angle);
	},
	scale : function(x, y) {
		if (!y)
			y = x;
		this.canvas.scale(x, y);
	},
	setComposition : function(type) {
		this.canvas.globalCompositeOperation = type;
	}
	//DRAWING TEXT https://developer.mozilla.org/en/Drawing_text_using_a_canvas
}, 'js.canvas.Canvas');

js.canvas.Canvas.BUTT = 'butt';
js.canvas.Canvas.ROUND = 'round';
js.canvas.Canvas.SQUARE = 'square';
js.canvas.Canvas.CAP = {
	BUTT : js.canvas.Canvas.BUTT,
	ROUND : js.canvas.Canvas.ROUND,
	SQUARE : js.canvas.Canvas.SQUARE
};

js.canvas.Canvas.BEVEL = 'bevel';
js.canvas.Canvas.MITER = 'miter';
js.canvas.Canvas.JOIN = {
	ROUND : js.canvas.Canvas.ROUND,
	BEVEL : js.canvas.Canvas.BEVEL,
	MITER : js.canvas.Canvas.MITER
};

js.canvas.Canvas.REPEAT = 'repeat';
js.canvas.Canvas.REPEAT_X = 'repeat-x';
js.canvas.Canvas.REPEAT_Y = 'repeat-y';
js.canvas.Canvas.NO_REPEAT = 'no-repeat';

js.canvas.Canvas.PATTERN = {
	REPEAT : js.canvas.Canvas.REPEAT,
	REPEAT_X : js.canvas.Canvas.REPEAT_X,
	REPEAT_Y : js.canvas.Canvas.REPEAT_Y,
	NO_REPEAT : js.canvas.Canvas.NO_REPEAT
};

//COMPOSITE OPERATION================================================
//https://developer.mozilla.org/en/Canvas_tutorial/Compositing
js.canvas.CompositeOperation = {
	DEFAULT : 'source-over',
	SOURCE_OVER : 'source-over',
	SOURCE_IN : 'source-in',
	SOURCE_OUT : 'source-out',
	SOURCE_ATOP : 'source-atop',
	DESTINATION_OVER : 'destination-over',
	DESTINATION_IN : 'destination-in',
	DESTINATION_OUT : 'destination-out',
	DESTINATION_ATOP : 'destination-atop',
	LIGHTER : 'lighter',
	DARKER : 'darker',
	XOR : 'xor',
	COPY : 'copy'
};

//GRAPHICAL CONTEXT==================================================
js.canvas.GraphicalContext = js.Extends(js.canvas.Canvas, {
	constructor : function(canvas) {
		Object.apply(this, arguments);
		this.canvas = canvas;
	},
	width : null,
	height : null,
	x : null,
	y : null,
	fixedX : function(x) {
		if (x > this.width)
			return null;

		return x + this.x;
	},
	fixedY : function(y) {
		if (y > this.height)
			return null;

		return y + this.y;
	},
	checkWidth : function(x, width) {
		var max = this.width - x;
		if (width > max)
			return null;
		return width;
	},
	checkHeight : function(y, height) {
		var max = this.height - y;
		if (height > max)
			return null;
		return height;
	},
	clear: function(){
		this.canvas.clear();
	},
	getWidth : function() {
		return this.width;
	},
	setWidth : function(x){
		this.width = x;
	},
	getHeight : function() {
		return this.height;
	},
	setHeight : function(x){
		this.height = x;
	},
	setX: function(x){
		this.x = x;
	},
	setY: function(x){
		this.y = x;
	},
	setCanvas: function(canvas){
		this.canvas = canvas;
	},
	fillRect : function(x, y, width, height) {
		this.canvas.fillRect(this.fixedX(x), this.fixedY(y), this.checkWidth(x,
				width), this.checkHeight(y, height));
	},
	strokeRect : function(x, y, width, height) {
		this.canvas.strokeRect(this.fixedX(x), this.fixedY(y), this.checkWidth(
				x, width), this.checkHeight(y, height));
	},
	clearRect : function(x, y, width, height) {
		this.canvas.clearRect(this.fixedX(x), this.fixedY(y), this.checkWidth(
				x, width), this.checkHeight(y, height));
	},
	beginPath : function() {
		this.canvas.beginPath();
	},
	closePath : function() {
		this.canvas.closePath();
	},
	stroke : function() {
		this.canvas.stroke();
	},
	fill : function() {
		this.canvas.fill();
	},
	moveTo : function(x, y) {
		this.canvas.moveTo(this.fixedX(x), this.fixedY(y));
	},
	lineTo : function(x, y) {
		this.canvas.lineTo(this.fixedX(x), this.fixedY(y));
	},
	arc : function(x, y, radius, startAngle, endAngle, anticlockwise) {
		this.canvas.arc(this.fixedX(x), this.fixedY(y), radius, startAngle,
				endAngle, anticlockwise);
	},
	quadraticCurveTo : function(cp1x, cp1y, x, y) {
		this.canvas.quadraticCurveTo(this.fixedX(cp1x), this.fixedY(cp1y), this
				.fixedX(x), this.fixedY(y));
	},
	bezierCurveTo : function(cp1x, cp1y, cp2x, cp2y, x, y) {
		this.canvas.bezierCurveTo(this.fixedX(cp1x), this.fixedY(cp1y), this
				.fixedX(cp2x), this.fixedY(cp2y), this.fixedX(x), this
				.fixedY(y));
	},
	rect : function(x, y, width, height) {
		this.canvas.rect(this.fixedX(x), this.fixedY(y), this.checkWidth(x,
				width), this.checkHeight(y, height));
	},
	drawImage : function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth,
			dHeight) {
		if (!sWidth)
			this.canvas.drawImage(image, this.fixedX(sx), this.fixedY(sy));
		else if (!dx)
			this.canvas.drawImage(image, this.fixedX(sx), this.fixedY(sy), this
					.checkWidth(sx, sWidth), this.checkHeight(sy, sHeight));
		else
			this.canvas.drawImage(image, sx, sy, sWidth, sHeight, this
					.fixedX(dx), this.fixedY(dy), this.checkWidth(dx, dWidth),
					this.checkHeight(dy, dHeight));

	},
	setStrokeStyle : function(style) {
		this.canvas.setStrokeStyle(style);
	},
	setFillStyle : function(style) {
		this.canvas.setFillStyle(style);
	},
	setLineWidth : function(width) {
		this.canvas.setLineWidth(width);
	},
	setLineCap : function(type) {
		this.canvas.setLineCap(type);
	},
	setLineJoin : function(type) {
		this.canvas.setLineJoin(type);
	},
	setMiterLimit : function(value) {
		this.canvas.setMiterLimit(value);
	},
	createLinearGradient : function(x1, y1, x2, y2) {
		return this.canvas.createLinearGradient(x1, y1, x2, y2);
	},
	createRadialGradient : function(x1, y1, r1, x2, y2, r2) {
		return this.canvas.createRadialGradient(x1, y1, r1, x2, y2, r2);
	},
	createPattern : function(image, type) {
		return this.canvas.createPattern(image, type);
	},
	globalAlpha : function(alpha) {
		this.canvas.globalAlpha(alpha);
	},
	setShadowOffsetX : function(number) {
		this.canvas.setShadowOffsetX(number);
	},
	setShadowOffsetY : function(number) {
		this.canvas.setShadowOffsetY(number);
	},
	setShadowBlur : function(number) {
		this.canvas.setShadowBlur(number);
	},
	setShadowColor : function(color) {
		this.canvas.setShadowColor(color);
	},
	setFont : function(font) {
		this.canvas.setFont(font);
	},
	write : function(text, x, y, maxWidth) {
		x = this.fixedX(x);
		y = this.fixedY(y);
		if(maxWidth)
			this.canvas.write(text, x, y, maxWidth);
		else
			this.canvas.write(text, x, y);
	},
	saveState : function() {
		this.canvas.saveState();
	},
	restoreState : function() {
		this.canvas.restoreState();
	},
	translateOrigin : function(x, y) {
		this.canvas.translateOrigin(this.fixedX(x), this.fixedY(y));
	},
	rotate : function(angle) {
		this.canvas.rotate(angle);
	},
	scale : function(x, y) {
		if (!y)
			y = x;
		this.canvas.scale(x, y);
	},
	setComposition : function(type) {
		this.canvas.setComposition(type);
	}
}, 'js.canvas.GraphicalContext');