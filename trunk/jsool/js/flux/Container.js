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

js.flux.Container = $extends(js.flux.Component,{
	cons: function(parent){
		this.childrenSet = new js.util.HashSet();
		this.children = [];
	},
	width:200,
	height:80,
	children: null,
	childrenSet: null,
	layout: null,
	paint: function(ctx){
		var x = this.x,
			y = this.y,
			w = this.width,
			h = this.height,
			laf = js.flux.UIManager.getLookAndFeel();
		
		ctx.save();
		
		ctx.fillStyle = laf.CONTAINER_BODY_COLOR;
		ctx.strokeStyle = laf.CONTAINER_BORDER_COLOR;
		ctx.lineWidth = laf.CONTAINER_BORDER_WIDTH;
		ctx.strokeRoundRect(x+1,y+1,w-2,h-2,laf.CONTAINER_BORDER_RADIUS);
		ctx.fillRoundRect(x+1,y+1,w-2,h-2,laf.CONTAINER_BORDER_RADIUS);
		
		ctx.restore();
	},
	add: function(component,prop){
		if(component == this)return;
		if(!this.childrenSet.contains(component)){
			js.flux.UIManager.update();
			this.children.push(component);
			this.childrenSet.add(component);
			component.setParent(this);
		}
		if(this.layout){
			this.layout.addLayoutComponent(component, prop);
		}
	},
	updateUI: function(ctx){
		this.paint(ctx);
		
		if(this.children.length > 0){
			if(this.layout)this.layout.layoutContainer(this);
			
			//CLIPS THE AREA THAT THE COMPONENTS WILL BE DRAWN
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.clip();
			
			//CHANGES THE ORIGIN POSITION
			ctx.translate(this.x, this.y);
			
			for(var i=0,c;c=this.children[i++];){
				ctx.save();
				c.updateUI(ctx);
				ctx.restore();
			}
		}
	},
	setLayout: function(layout){
		this.layout = layout;
	},
	getComponentAt: function(x , y){
		/*
		 * copied from js.flux.Component.contains(x,y) to better performance
		 */
		if((x > this.x && x < this.x + this.width) && (y > this.y && y < this.y + this.height)){
			x -= this.x;
			y -= this.y;
			var at;
			for(var i=0,c;c=this.children[i++];){
				at = c.getComponentAt(x,y);
				if(at){
					return at;
				}
			}
			return this;
		}else{
			return null;
		}
	},
	getComponents: function(){
		return this.children.clone();
	}
},'js.flux.Container');