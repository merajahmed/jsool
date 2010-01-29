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

js.flux.Button = $extends(js.flux.Component,{
	cons: function(text){
		if(String.isString(text)){
			this.text = text;
		}
	},
	width: 70,
	height: 20,
	text: 'button',
	mouseover: false,
	pressed: false,
	setText: function(text){
		if(String.isString(text)){
			this.text = text;
			js.flux.UIManager.update();
		}
	},
	paint: function(ctx){
		var laf = js.flux.UIManager.getLookAndFeel();
		laf.drawButton(ctx, this.x, this.y, this.width, this.height,this.text);
		
		if(this.pressed){
			laf.drawButtonPressed(ctx, this.x, this.y, this.width, this.height);
		}else if(this.mouseover){
			laf.drawButtonFocus(ctx, this.x, this.y, this.width, this.height);
		}
	},
	onmouseover: function(ev, comp){
		if(comp == this && !this.mouseover){
			this.mouseover = true;
			js.flux.UIManager.update();
		}
	},
	onmouseout: function(ev, comp){
		if(comp == this && this.mouseover){
			this.mouseover = false;
			this.pressed = false;
			js.flux.UIManager.update();
		}
	},
	onmousedown: function(ev, comp){
		if(comp == this && !this.pressed){
			this.pressed = true;
			js.flux.UIManager.update();
		}
	},
	onmouseup: function(ev, comp){
		if(comp == this && this.pressed){
			this.pressed = false;
			js.flux.UIManager.update();
		}
	}
},'js.flux.Button');