js.graphics.CanvasGraphics = Extends(js.graphics.Graphics,{
	constructor: function(){
		js.graphics.Graphics.apply(this, ['canvas']);
	},
	getContext: function(){
		return new js.graphics.CanvasContext(this.dom.getContext('2d'));
	}
},'js.graphics.CanvasGraphics');