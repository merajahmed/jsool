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
		this.addEvent(['click','mouseup','mousedown','mousein','mouseout', 'keypress','mousemove']);
		this.z = this.seed();
	},
	x: 0,
	y: 0,
	z: 0,
	width: 0,
	height: 0,
	parent: null,
	changed: false,
	visible: true,
	seed:(function(){var seed=0;return function(){seed++;};})(),
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
		if(this.parent)this.parent.remove(this);
		this.parent = parent;
		js.flux.UIManager.update();
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
		js.flux.UIManager.update();
	},
	setY: function(y){
		this.y = y;
		js.flux.UIManager.update();
	},
	setZ: function(z){
		this.z = z;
		js.flux.UIManager.update();
	},
	setWidth: function(w){
		this.width = w;
		js.flux.UIManager.update();
	},
	setHeight: function(h){
		this.height = h;
		js.flux.UIManager.update();
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	setVisible: function(vis){
		this.visible = vis;
		js.flux.UIManager.update();
	},
	isVisible: function(){
		return this.visible;
	},
	updateUI: function(canvas){
		this.paint(canvas);
	},
	paint: jsool.emptyFn
},'js.flux.Component');