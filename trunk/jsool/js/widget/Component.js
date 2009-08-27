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
js.widget.Component = $extends(js.util.Observable,{
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
		var element;
		if(typeof toRender == 'string'){
			element = js.html.Element.get(toRender);
		}else if(typeof toRender == 'object' && toRender.instanceOf(js.html.Element)){
			element = toRender;
		}else{
			throw new js.core.Exception('Invalid argument: '+ toRender, this);
		}
		element.append(this.element);
	}
},'js.widget.Component');