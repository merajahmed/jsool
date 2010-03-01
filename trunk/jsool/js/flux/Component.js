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

jsool.namespace("js.flux");

js.flux.Component = $extends(js.util.Observable,{
	cons: function(){
		this.addEvent(['click','mouseup','mousedown','mouseover','mouseout', 'keypress','mousemove']);
	},
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	parent: null,
	visible: true,
	canFocus: false,
	contains: function(x, y){
		return (x > this.x && x < this.x + this.width) && (y > this.y && y < this.y + this.height);
	},
	getComponentAt: function(x,y){
		if((x > this.x && x < this.x + this.width) && (y > this.y && y < this.y + this.height))
			return this;
		else
			return null;
	},
	setParent: function(parent){
		if(this.parent)this.parent.remove(this);
		this.parent = parent;
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
	},
	setY: function(y){
		this.y = y;
	},
	setWidth: function(w){
		this.width = w;
	},
	setHeight: function(h){
		this.height = h;
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	setVisible: function(vis){
		this.visible = vis;
	},
	isVisible: function(){
		return this.visible;
	},
	updateUI: function(canvas){
		if(this.visible)this.paint(canvas);
	},
	setSize: function(width, height){
		this.width = width;
		this.height = height;
	},
	setBounds: function(x,y,width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},
	setPosition: function(x,y){
		this.x = x;
		this.y = y;
	},
	getBounds: function(){
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};
	},
	paint: jsool.emptyFn,
	getRealPosition: function(){
		if(this.parent){
			var pos = this.parent.getRealPosition();
			return {
				x: parseInt(this.x) + pos.x,
				y: parseInt(this.y) + pos.y
			};
		}else{
			return {
				x: parseInt(this.x),
				y: parseInt(this.y)
			};
		}
	}
},'js.flux.Component');