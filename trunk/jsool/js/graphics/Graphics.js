js.graphics.Graphics = Extends(js.html.Element,{
	getContext: emptyFn
},'js.graphics.Graphics');

js.graphics.Graphics.createCanvas = function(){
	var browser = js.core.Browser.browser;
	var version = js.core.Browser.version;
};