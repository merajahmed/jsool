js.flow = {};
js.flow.UIManager = js.Extends(Object, {
	constructor: function(){
		Object.apply(this, arguments);
		
		this.components = new Array();
		
		var canvas = document.createElement('canvas');		
		document.body.appendChild(canvas);
		this.canvas = new js.canvas.Canvas(canvas);
		
		this.resizeCanvas();
		
		var that = this;
		js.addEventListener(window, 'resize', function(){
			that.resizeCanvas();
		});
	},
	components: null,
	lookAndFeel: null,
	canvas: null,
	updateUITask: null,
	updateFrequency: 30,//UPDATE RATE FPS
	stopFlag: false,
	currentZSeed: 0,
	queue: true,
	updateTime: 0,
	interrupt: function(){this.stopFlag = true;},
	resume: function(){this.stopFlag = false;},
	focusedElement: null,
	startUpdateUITask: function(){
		var that = this;
		this.updateUITask = window.setInterval(function(){
			that.queueUpdateUITask();
			return null;
		},(1/this.updateFrequency)*1000);
	},
	setLookAndFeel: function(laf){
		this.lookAndFeel = laf;
	},
	queueUpdateUITask: function(){
		if(!this.stopFlag && this.queue){
			this.updateUI();
			this.queue = false;
		}
	},
	updateUI: function(){
		var start = js.getTime();
		this.canvas.clear();

		this.components.sort(function(c1, c2){
			return c1.z - c2.z;
		});
		
		var len = this.components.length;
		
		for(var i = 0; i < len; i++){
			if(this.components[i].isVisible())
				this.components[i].updateUI(this.canvas);
		}
		
		this.updateTime = js.getTime() - start;
	},
	resizeCanvas: function(){
		this.canvas.dom.setAttribute('width', window.innerWidth);
		this.canvas.dom.setAttribute('height', window.innerHeight);
		this.updateUI();
	},
	seed: function(){
		return this.currentZSeed++;
	},
	addComponent: function(component){		
		component.setParent(this);
		this.components.add(component);
	},
	remove: function(component){
		this.components.remove(component);
	},
	queueUpdate: function(){
		this.queue = true;
	},
	setFocus: function(component){
		this.focusedElement = component;
	},
	getFocused: function(){
		return this.focusedElement;
	}
}, "js.flow.UIManager");
//COMPONENT==========================================================
js.flow.Component = js.Extends(js.core.Observable, {
	constructor: function(){	
		Object.apply(this,arguments);
		this.addEvent(['click','mouseup','mousedown','mousein','mouseout', 'keypress']);
		this.z = js.UIManager.seed();
	},
	x: null,
	y: null,
	z: null,
	width: null,
	height: null,
	parent: null,
	stateChange: false,
	visible: true,
	contains: function(x, y){
		var containsX = x > this.x && x < this.x + this.width;
		var containsY = y > this.y && y < this.y + this.height;
		return containsX && containsY;
	},
	getComponentAt: function(x,y){
		if(this.contains(x,y))
			return this;
		else
			return null;
	},
	setParent: function(parent){
		if(this.parent)
			this.parent.remove(this);
		this.parent = parent;
		js.UIManager.queueUpdate();
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
		js.UIManager.queueUpdate();
	},
	setY: function(y){
		this.y = y;
		js.UIManager.queueUpdate();
	},
	setZ: function(z){
		this.z = z;
		js.UIManager.queueUpdate();
	},
	setWidth: function(w){
		this.width = w;
		js.UIManager.queueUpdate();
	},
	setHeight: function(h){
		this.height = h;
		js.UIManager.queueUpdate();
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	setVisible: function(vis){
		this.visible = vis;
		js.UIManager.queueUpdate();
	},
	isVisible: function(){
		return this.visible;
	},
	updateUI: function(canvas){
		this.paint(canvas);
	},
	paint: js.emptyFn
}, 'js.flow.Component');
//CONTAINER==========================================================
js.flow.Container = js.Extends(js.flow.Component, {
	constructor : function(){
		js.flow.Component.apply(this, arguments);
		this.components = new Array();
	},
	components: null,
	DEFAULT_PADDING: 5,
	graphicalContext: null,
	layout: null,
	updateUI: function(canvas){		
		this.paint(canvas);
		
		canvas.saveState();
		canvas.translateOrigin(this.x + this.DEFAULT_PADDING, this.y + this.DEFAULT_PADDING);
		
		var l = this.components.length;
		for(var i = 0; i < l; i++){
			if(this.components[i].isVisible())
				this.components[i].updateUI(canvas);
		}
		
		canvas.restoreState();
	},
	paint: function(canvas){
		var laf = js.UIManager.lookAndFeel;
		laf.container(canvas, this.x, this.y, this.width, this.height);
	},
	add: function(component){
		component.setParent(this);
		this.components.add(component);
		js.UIManager.queueUpdate();
	},
	remove: function(component){
		this.components.remove(component);
		js.UIManager.queueUpdate();
	},
	getComponentAt: function(x,y){
		if(this.contains(x,y)){
			var comp;
			var len = this.components.size();
			
			var offsetX = this.x + this.DEFAULT_PADDING;
			var offsetY = this.y + this.DEFAULT_PADDING;
			
			for(var i = 0; i < len; i++){
				comp = this.components.get(i).getComponentAt(x - offsetX,y - offsetY);
				if(comp) break;
			}			
			
			return comp;
		}else{
			return null;
		}
	},
	fireEvent: function(event){
		js.core.Observable.prototype.fireEvent.call(this,event);
		
		var comp = this.getComponentAt(event.clientX, event.clientY);
		
		if(comp){
			js.UIManager.setFocus(comp);
			comp.fireEvent(event);
		}
	}
}, 'js.flow.Container');
//WINDOW=============================================================
js.flow.Window = js.Extends(js.flow.Component, {
	constructor: function(title){
		js.flow.Component.apply(this, arguments);
		this.contentPane = new js.flow.Container();
		this.addListener({
			scope: this,
			click: function(event){
				this.setZ(js.UIManager.seed());
			}
		});
		
		if(title) this.title = title;
	},
	DEFAULT_PADDING: 5,
	contentPane: null,
	title: 'Window',
	getContentPane: function(){
		return this.contentPane;
	},
	setContentPane: function(container){
		this.contentPane = container;
		js.UIManager.queueUpdate();
	},
	updateUI: function(canvas){		
		this.paint(canvas);
		
		this.contentPane.setX(this.x + this.DEFAULT_PADDING);
		this.contentPane.setY(this.y + 25);
		this.contentPane.setWidth(this.width - (this.DEFAULT_PADDING*2));
		this.contentPane.setHeight(this.height - this.DEFAULT_PADDING - 25);
		this.contentPane.updateUI(canvas);
	},
	paint: function(canvas){
		var laf = js.UIManager.lookAndFeel;
		laf.window(canvas, this.x, this.y, this.width, this.height);
		
		laf.label(canvas, this.x + this.DEFAULT_PADDING, this.y + this.DEFAULT_PADDING, this.title);
	},
	getComponentAt: function(x,y){
		if(this.contentPane.contains(x,y)){
			var comp = this.contentPane.getComponentAt(x,y);
			if(comp)
				return comp;
			else
				return this.contentPane;
		}else if(this.contains(x,y)){
			return this;
		}else{
			return null;
		}
	},
	fireEvent: function(event){
		js.core.Observable.prototype.fireEvent.call(this,event);
		if(this.contentPane.contains(event.clientX,event.clientY)){
			this.contentPane.fireEvent(event);
		}
	}
}, 'js.flow.Window');
//BOOLEAN FIELD======================================================
js.flow.BooleanField = js.Extends(js.flow.Component, {	
	constructor: function(){
		js.flow.Component.apply(this, arguments);
		this.addListener({
			scope: this,
			click: this.toggle
		});
	},
	selected: false,	
	toggle: function(){
		this.setSelected(!this.selected);
		js.UIManager.queueUpdate();
	},
	setSelected: function(sel){
		this.selected = sel;
		js.UIManager.queueUpdate();
	},
	isSelected: function(){
		return this.selected;
	}
}, 'js.flow.BooleanField');
//CHECKBOX===========================================================
js.flow.CheckBox = js.Extends(js.flow.BooleanField, {
	height: 16,
	width: 16,
	paint: function(canvas){
		var laf = js.UIManager.lookAndFeel;
		laf.checkBox(canvas, this.x, this.y, this.width, this.height);
		if(this.selected)
			laf.checkBoxCheck(canvas, this.x, this.y, this.width, this.height);
	}
}, 'js.flow.CheckBox');
//RADIO =============================================================
js.flow.Radio = js.Extends(js.flow.BooleanField, {
	height: 16,
	width: 16,
	constructor: function(){
		js.flow.BooleanField.apply(this, arguments);
		this.addEvent('check');
	},
	paint: function(canvas){
		var laf = js.UIManager.lookAndFeel;
		laf.radio(canvas, this.x, this.y, this.width, this.height);
		if(this.selected)
			laf.radioCheck(canvas, this.x, this.y, this.width, this.height);
	},
	setSelected: function(sel){
		this.selected = sel;
		if(sel){
			this.fireEvent({type:'check',source:this});
		}
		js.UIManager.queueUpdate();
	},
	toggle: function(){
		if(!this.selected){
			this.setSelected(true);
			js.UIManager.queueUpdate();
		}
	}
}, 'js.flow.Radio');
//RADIO GROUP========================================================
js.flow.RadioGroup = js.Extends(Object,{
	radios: null,
	add: function(radio){
		if(!this.radios)
			this.radios = new Array();
		
		this.radios.add(radio);
		
		radio.addListener({
			scope: this,
			check: this.radioChecked
		});
	},
	radioChecked: function(event){
		var radio = event.source;
		var length = this.radios.size();
		
		for(var i = 0; i < length; i++){
			if(this.radios.get(i) != radio)
				this.radios.get(i).setSelected(false);
		}
	}
},'js.flow.RadioGroup');
//TEXT COMPONENT=====================================================
js.flow.TextComponent = js.Extends(js.flow.Component, {
	constructor: function(){
		js.flow.Component.apply(this, arguments);
		this.addListener({
			scope: this,
			keypress: this.keypress,
			click: function(){
				this.cursorX = this.value.length;
			}
		});
	},
	PADDING: 5,
	value: '',
	cursorX: 0,
	cursorY: 0,
	keypress: function(event){
		var start;
		var end;
		if(event.charCode){
			if(this.cursorX == this.value.length)
				this.value += String.fromCharCode(event.charCode);
			else{
				start = this.value.substring(0,this.cursorX);
				end = this.value.substring(this.cursorX);
				
				this.value = start + String.fromCharCode(event.charCode) + end;
			}
			this.cursorX++;
		}else{
			switch (event.keyCode) {
			//BACKSPACE==========================
			case 8:
				if(this.cursorX == this.value.length){
					this.value = this.value.substring(0, this.cursorX - 1);
					this.cursorX = Math.max(this.cursorX-1,0);
				}else if(this.cursorX > 0){
					start = this.value.substring(0,this.cursorX-1);
					end = this.value.substring(this.cursorX);
					
					this.value = start + end;
					this.cursorX = Math.max(this.cursorX-1,0);
				}
				break;
			//END================================
			case 35:
				this.cursorX = this.value.length;
				break;
			//HOME===============================
			case 36:
				this.cursorX = 0;
				break;
			//LEFT ARROW=========================
			case 37:
				this.cursorX = Math.max(this.cursorX-1,0);
				break;
			//RIGHT ARROW========================
			case 39:
				this.cursorX = Math.min(this.cursorX+1, this.value.length);
				break;
			//DELETE=============================
			case 46:
				if(this.cursorX == 0){
					this.value = this.value.substring(1);
				}else if(this.cursorX < this.value.length){
					start = this.value.substring(0,this.cursorX);
					end = this.value.substring(this.cursorX+1, this.value.length);
					
					this.value = start + end;
				}
				break;
			}
		}
		js.UIManager.queueUpdate();
	}
}, 'js.flow.TextComponent');
//TEXT FIELD=========================================================
js.flow.TextField = js.Extends(js.flow.TextComponent, {
	width: 200,
	height: 20,
	paint: function(canvas){
		var laf = js.UIManager.lookAndFeel;
		laf.textField(canvas, this.x, this.y, this.width, this.height);
		
		var start = this.value.substring(0,this.cursorX);
		var end = this.value.substring(this.cursorX);
		
		var length = {width:0};
		
		if(start.length > 0)			
			length = laf.measureText(canvas, start);
		
		if(js.UIManager.getFocused() == this){
			laf.textCursor(canvas, this.x + this.PADDING + length.width, this.y + 2, this.height - 4);
		}
		
		if(start.length > 0){
			laf.textLine(canvas, start, this.x+this.PADDING, this.y + this.height - this.PADDING);
		}
		
		if(end.length > 0){
			laf.textLine(canvas, end, this.x + this.PADDING + length.width, this.y + this.height - this.PADDING);
		}
	}
}, 'js.flow.TextField');