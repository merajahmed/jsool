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
	focused: false,
	canFocus: true,
	paintOver: false,//Just for visual effect
	setText: function(text){
		if(String.isString(text)){
			this.text = text;
		}
	},
	paint: function(ctx){
		var UIM = js.flux.UIManager,
			laf = UIM.laf.button,
			font = laf.font,
			x = this.x,
			y = this.y,
			w = this.width,
			h = this.height,
			text = this.text;
		
		if(this.pressed){
			ctx.fillStyle = laf.body.pressed;
		}else{
			ctx.fillStyle = laf.body.color;
		}
		ctx.strokeStyle = laf.border.color;
		ctx.lineWidth = 1;

		ctx.drawRect(x+1,y+1,w-2,h-2);
		
		var textW = ctx.measureText(text).width;
		
		var xCenter = Math.max(0, (w-textW)/2);
		var yCenter = Math.max(0, (h-font.size)/2);
		
		ctx.textBaseline = js.canvas.TextBaseline.TOP;
		ctx.font = font.size + "px " + font.face;
		ctx.fillStyle = font.color;
		ctx.fillText(text,x+xCenter+1,y+yCenter+1,w-2);
		
		if(!this.pressed){
			if(this.mouseover||this.paintOver){
				ctx.strokeStyle = laf.border.over;
				ctx.beginPath();
				ctx.rect(x+2,y+2,w-4,h-4);
				ctx.stroke();
				this.paintOver = false;
			}else if(this.focused || this.paintFocus){
				ctx.strokeStyle = laf.border.focus;
				ctx.beginPath();
				ctx.rect(x+2,y+2,w-4,h-4);
				ctx.stroke();
			}
		}
	},
	onmouseover: function(ev, comp){
		if(comp == this && !this.mouseover){
			this.mouseover = true;
			this.paintOver = true;
		}
	},
	onmouseout: function(ev, comp){
		if(comp == this && this.mouseover){
			this.mouseover = false;
			this.pressed = false;
		}
	},
	onmousedown: function(ev, comp){
		if(comp == this && !this.pressed){
			this.pressed = true;
		}
	},
	onmouseup: function(ev, comp){
		if(comp == this && this.pressed){
			this.pressed = false;
		}
	},
	onfocus: function(ev, comp){
		this.focused = true;
	},
	onlostfocus: function(ev, comp){
		this.focused = false;
	}
},'js.flux.Button');