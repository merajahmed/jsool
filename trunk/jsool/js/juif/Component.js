/*  JSOOL - JavaScript Object Oriented Library 
 *
 *  Copyright (c) 2009, Mikhail Domanoski.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification,
 *  are permitted provided that the following conditions are met:
 *
 *      * Redistributions of source code must retain the above copyright notice,
 *        this list of conditions and the following disclaimer.
 *
 *      * Redistributions in binary form must reproduce the above copyright notice,
 *        this list of conditions and the following disclaimer in the documentation
 *        and/or other materials provided with the distribution.
 *
 *      * Neither the name of Mikhail Domanoski nor the names of its
 *        contributors may be used to endorse or promote products derived from this
 *        software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

jsool.namespace("js.juif");

/**
 * @class js.widget.Component
 * @extends js.util.Observable
 * 
 * Defines the main methods and behaviors of a UI component to integrate with JSOOL UI Framework.
 */
js.juif.Component = $extends(js.util.Observable,{
	/**
	 * @constructor
	 * Creates a new component an defines the default events
	 */
	cons:function(){
		this.addEvent(["focus","blur","mouseup","mousedown","mouseover","mouseout","click","dblclick"]);
	},
	/**
	 * @property Flags if the component is visible 
	 */
	visible: false,
	/**
	 * @property Stores the component X axis position
	 */
	x: 0,
	/**
	 * @property Stores the component Y axis position
	 */
	y: 0,
	/**
	 * @property Stores the component Z order
	 */
	z: 0,
	/**
	 * @property Stores the component width
	 */
	width: 0,
	/**
	 * @property Stores the component height
	 */
	height: 0,
	/**
	 * @property The current parent of the componenet 
	 */
	parent: null,
	/**
	 * @property The main componenet DOM element 
	 */
	element: null,
	/**
	 * @property The name of the component 
	 */
	name:"",
	/**
	 * @function static and global shared method to provide a new z-order to a component
	 * 
	 * @return a new z-order for the component
	 */
	zSeed: (function(){var zseed = 0;return function(){return zseed++;};})(),
	/**
	 * @property checks if a string is a number with a unit 
	 */
	units: /[0-9]+([\.][0-9]+)?(pt|px|em|pc|in|cm|mm|ex)/,
	/**
	 * @property the component default unit
	 */
	defaultUnit: "px",
	/**
	 * @property Holds the component main element style object 
	 */
	elStyle: null,
	/**
	 * @property Flags if the component has already been rendered
	 */
	rendered: false,
	/**	
	 * @property The component default wraper element that is crated to inserts the component on the document
	 */
	defaultElement: "div",
	/**
	 * @function sets the component parent
	 * 
	 * @param {js.juif.Component}
	 */
	setParent: function(parent){
		if(!parent.instanceOf(js.widget.Component)){
			this.parent = parent;
		}else{
			throw new js.core.Exception('Invalid argument: '+parent, this, arguments);
		}
	},
	/**
	 * @function Gets the current component parent
	 * 
	 * @return {js.juif.Component}the current parent
	 */
	getParent: function(){
		return this.parent;
	},
	/**
	 * @function gets the component x position
	 * 
	 *  @return the current componenet x position
	 */
	getX: function(){
		return this.rendered ?
				this.element.getPosition().x :
				this.x;
	},
	/**
	 * @function gets the component y position
	 * 
	 *  @return the current componenet y position
	 */
	getY: function(){
		return this.rendered ? 
				this.element.getPosition().y : 
				this.y;
	},
	/**
	 * @function sets the component x position
	 * 
	 * @param {number} the new component x position
	 */
	setX: function(x){
		this.x = x;		
		this.elStyle.left = x + this.defaultUnit;
	},
	/**
	 * @function sets the component y position
	 * 
	 * @param {number} the new component y position
	 */
	setY: function(y){
		this.y = y;
		this.elStyle.top = y + this.defaultUnit;
	},
	/**
	 * @function sets the component z order
	 * 
	 * @param {number} the new component z order
	 */
	setZ: function(z){
		this.z = z;
		this.elStyle.zIndex = z;
	},
	/**
	 * @function gets the component z order
	 * 
	 *  @return the current componenet z order
	 */
	getZ: function(){
		return this.z;
	},
	/**
	 * @function sets the component width
	 * 
	 * @param{number} the new component width
	 */
	setWidth: function(w){
		this.width = w;
		this.elStyle.width = w + this.defaultUnit; 
	},
	/**
	 * @function sets the component height
	 * 
	 * @param {number} the new component height
	 */
	setHeight: function(h){
		this.height = h;
		this.elStyle.height  = h + this.defaultUnit;
	},
	/**
	 * @function Gets the component current width
	 * 
	 * @return {number} the component current width
	 */
	getWidth: function(){
		return this.rendered ? 
				this.element.dom.clientWidth : 
				this.width;
	},
	/**
	 * @function Gets the component current height
	 * 
	 * @return {number} the component current height
	 */
	getHeight: function(){
		return this.rendered ? 
				this.element.dom.clientHeight : 
				this.height;
	},
	/**
	 * @function Defines if the component should be visible or not
	 * 
	 * @param {boolean} if the component should be visible
	 */
	setVisible: function(vis){
		this.visible = vis;
		this.elStyle.visibility = vis ? 'visible' : 'hidden';
	},
	/**
	 * @function Returns <code>true</code> if the component is visible
	 * 
	 * @return {boolean} if the component is visible
	 */
	isVisible: function(){
		return this.visible;
	},
	/**
	 * @function Shows up the component
	 */
	show: function(){
		this.setVisible(true);
	},
	/**
	 * @function Hides the component
	 */
	hide: function(){
		this.setVisible(false);
	},
	/**
	 * @function Render the component inside a container
	 * 
	 * @param {DomElement} The components container
	 */
	render: function(container){
		this.fireEvent({type:"beforerender",component:this});
		
		if(this.rendered)return false;
		
		container = jsool.get(container);
		
		if(!this.element){
			this.element = new js.dom.Element(this.defaultElement);
			this.elStyle = this.element.dom.style;
		}
		
		this.fireEvent({type:"render",component:this});
		
		this.doRender();
		this.initEvents();
		
		container.append(this.element);
		
		this.rendered = true;
		this.fireEvent({type:"afterrender",component:this});
	},
	/**
	 * @function Binds the component elements events with the components events  
	 */
	initEvents: function(){
		var cmp = this;
		var el = this.element;
		var addListenerToElement = function(ename){			
			el.on(ename,function(ev){
				cmp.fireEvent(ev);
			},cmp);
		};
		var events = this.events.keys;
		for(var ev in events){
			addListenerToElement(ev);
		}
	} 
},'js.juif.Component');