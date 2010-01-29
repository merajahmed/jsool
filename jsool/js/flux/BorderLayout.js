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

js.flux.BorderLayout = $extends(js.flux.Layout,{
	hSpace:5,
	vSpace:5,
	layoutContainer: function(cont){
		var c;
		
		if((c = this.TOP)){
			c.x = 0;
			c.y = 0;
			c.width = cont.width;
		}
		if((c = this.BOTTOM)){
			c.x = 0;
			c.y = cont.height-c.height;
			c.width = cont.width;
		}
		
		var h = cont.height - (this.TOP?this.TOP.height:0) - (this.BOTTOM?this.BOTTOM.height:0);
		var y = (this.TOP?this.TOP.height:0);
		if((c = this.LEFT)){
			c.x = 0;
			c.y = y;
			c.height = h;
		}
		
		if((c = this.RIGHT)){
			c.x = cont.width-c.width;
			c.y = y;
			c.height = h;
		}
		
		if((c = this.CENTER)){
			var w = cont.width;
			w -= (this.LEFT?this.LEFT.width:0);
			w -= (this.RIGHT?this.RIGHT.width:0);
			var x = 0 + (this.LEFT?this.LEFT.width:0);
			
			c.x = x;
			c.y = y;
			c.width = w;
			c.height = h;
		}
	},
	addLayoutComponent: function(comp, cons){
		if(cons === js.flux.BorderLayout.TOP){
			this.TOP = comp;
		}
		if(cons === js.flux.BorderLayout.BOTTOM){
			this.BOTTOM = comp;
		}
		if(cons === js.flux.BorderLayout.LEFT){
			this.LEFT = comp;
		}
		if(cons === js.flux.BorderLayout.RIGHT){
			this.RIGHT = comp;
		}
		if(cons === js.flux.BorderLayout.CENTER){
			this.CENTER = comp;
		}
	},
	setVSpace: function(x){
		this.vSpace = x;
	},
	setHSpace: function(x){
		this.hSpace = x;
	}
},'js.flux.BorderLayout');

js.flux.BorderLayout.TOP = "TOP";
js.flux.BorderLayout.BOTTOM = "BOTTOM";
js.flux.BorderLayout.LEFT = "LEFT";
js.flux.BorderLayout.RIGHT = "RIGHT";
js.flux.BorderLayout.CENTER = "CENTER";