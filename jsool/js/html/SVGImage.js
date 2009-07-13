/* SVG IMPLEMENTATION
 * 
 * <object data="image-svg.svg" type="image/svg+xml" height="48" width="48">
 * <img src="image-png.png" height="48" width="48" alt="this is a PNG" />
 * </object> 
 * 
 */

js.html.SVGImage = Extends(js.html.Element,{
	constructor: function(image){
		js.html.Element.apply(this, ['object']);
		this.setAttribute('type','image/svg+xml');
		this.setImageUrl(image);
	},
	image: null,
	setImageUrl: function(image){
		if(!String.isString(image))
			throw new js.core.Exception('Invalid argument type: '+typeof image, this, arguments);
		
		this.image = image;
		
		this.updateImage();
	},
	updateImage: function(){
		var timestamp = (new Date()).getTime();
		this.setAttribute('data',image+'?_ts='+timestamp);
	}
},'js.html.SVGImage');