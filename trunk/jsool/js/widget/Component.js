js.widget.Component = $extends(js.util.Observable,{
	constructor: function(){
		js.util.Observable.apply(this, arguments);
		this.addEvent(['click','mousedown','mouseup','mousein','mouseout','keypress','keyup','keudown','focus','blur','render']);
		this.addListener({
			render:function(event){
				this.prepareEvents();
			}
		});
	},
	visible: false,
	x: 0,
	y: 0,
	z: 0,
	width: 0,
	height: 0,
	parent: null,
	element: null,
	zSeed: (function(){var zseed = 0;return function(){return zseed++;};})(),
	setParent: function(parent){
		if(!parent.instanceOf(js.widget.Component)){
			this.parent = parent;
		}else{
			throw new js.core.Exception('Invalid argument: '+parent, this, arguments);
		}
	},
	getParent: function(){
		return this.parent;
	},
	getX: function(){
		return this.x;
	},
	getY: function(){
		return this.y;
	},
	setX: function(x){
		this.x = x;
		this.element.applyStyle('left',x);
	},
	setY: function(y){
		this.y = y;
		this.element.applyStyle('top',y);
	},
	setZ: function(z){
		this.z = z;
		this.element.applyStyle('zIndex',z);
	},
	setWidth: function(w){
		this.width = w;
		this.element.applyStyle('width',w+'px');
	},
	setHeight: function(h){
		this.height = h;
		this.element.applyStyle('height',h+'px');
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	setVisible: function(vis){
		this.visible = vis;
		if(vis)
			this.element.applyStyle('visibility','visible');
		else
			this.element.applyStyle('visibility','hidden');
	},
	isVisible: function(){
		return this.visible;
	},
	updateUI: function(canvas){
		this.paint(canvas);
	},
	show: function(){
		this.setVisible(true);
	},
	hide: function(){
		this.setVisible(false);
	},
	renderOn: function(toRender){
		if(typeof toRender == 'string'){
			element = js.html.Element.get(toRender);
		}else if(typeof toRender == 'object' && toRender.instanceOf(js.html.Element)){
			element = toRender;
		}else{
			throw new js.core.Exception('Invalid argument: '+ toRender, this);
		}
		element.append(this.element);
	},
	prepareEvents: function(){
		var that = this;
		var fireMyEvent = function(event){that.fireEvent(event);};
				
		this.element.addListener('click',fireMyEvent);
		this.element.addListener('mousedown',fireMyEvent);
		this.element.addListener('mouseup',fireMyEvent);
		this.element.addListener('mousein',fireMyEvent);
		this.element.addListener('mousemout',fireMyEvent);
		
		this.element.addListener('keypress',fireMyEvent);
		this.element.addListener('keyup',fireMyEvent);
		this.element.addListener('keydown',fireMyEvent);
	}
},'js.widget.Component');