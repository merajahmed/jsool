js.canvas.Canvas = $extends(js.html.Element,{
	ccons: function(){
		this.$super('canvas');
		//js.html.Element.apply(this,['canvas']);
	},
	getContext: function(){
		return new js.canvas.CanvasRenderingContext(this.dom.getContext('2d'));
	}
},'js.canvas.Canvas');

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