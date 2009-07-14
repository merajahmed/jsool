js.graphics.SVGGraphics = Extends(js.graphics.Graphics,{
	constructor: function(){
		this.dom = document.createElementNS(this.namespace,'svg');
		js.graphics.Graphics.apply(this, [this.dom]);
	},
	namespace: 'http://www.w3.org/2000/svg'
},'js.graphics.SVGCanvas');