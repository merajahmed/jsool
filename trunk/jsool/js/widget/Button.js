js.widget.Button = $extends(js.widget.Component,{
	constructor: function(text){
		js.widget.Component.apply(this, arguments);
		
		this.element = new js.html.Element('button');
		this.element.addClass('wgt-button');
		
		if(String.isString(text)){
			this.text = text;
		}
		
		this.element.setText(this.text);
	},
	text: 'button',
	setText: function(text){
		if(String.isString(text)){
			this.text = text;
			this.element.setText(text);
		}
	}
},'js.widget.Button');