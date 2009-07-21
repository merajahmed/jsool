js.widget.Button = $extends(js.widget.Component,{
	constructor: function(text){
		js.widget.Component.apply(this, arguments);
		
		this.element = new js.html.Element('button');
		
		if(js.core.Browser.isIE())
			this.element.addClass('ie');
		
		this.element.addClass('wgt-button');
		
		if(String.isString(text)){
			this.text = text;
		}
		this.element.setText(this.text);
		
		this.fireEvent({type:'render',target:this});
	},
	text: 'button',
	setText: function(text){
		if(String.isString(text)){
			this.text = text;
			this.element.setText(text);
		}
	}
},'js.widget.Button');