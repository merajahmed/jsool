js.widget.Button = $extends(js.widget.Component,{
	constructor: function(text){
		js.widget.Component.apply(this, arguments);
		
		this.element = new js.html.Element('button');
		
		if(js.core.Browser.isIE())
			this.element.addClass('ie');
		
		this.element.addClass('wgt-button');
		
		if(String.isString(text))
			this.element.setText(text);
		
		this.fireEvent({type:'render',target:this});
	}
},'js.widget.Button');