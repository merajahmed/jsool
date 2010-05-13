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

js.flux.RowLayout = $extends(js.flux.Layout,{
	hSpace:4,
	vSpace:4,
	ltr: true,
	layoutContainer: function(cont){
		var prev = null,
			curr = null,
			height = cont.height - (2 * this.vSpace),
			components = cont.children;
		
		if(components.length > 0){
			curr = components[0];
			if(this.ltr){
				curr.x = this.hSpace;
				prev = curr.x + curr.width; 
			}else{
				curr.x = cont.width - this.hSpace - curr.width;
				prev = curr.x - this.hSpace;
			}	
			curr.y = this.vSpace;
			curr.height = height;
		}
		
		for(var i=1;(curr=components[i++]);){
			if(this.ltr){
				curr.x = prev + this.hSpace;
				prev = curr.x + curr.width;
			}else{
				curr.x = prev - curr.width;
				prev = curr.x - this.hSpace;
			}
			curr.y = this.vSpace;
			curr.height = height;
		}
	},
	setVSpace: function(x){
		this.vSpace = x;
	},
	setHSpace: function(x){
		this.hSpace = x;
	},
	setLtr: function(bool){
		if(bool !== this.lrt && typeof bool === "boolean"){
			this.ltr = bool;
			js.flux.UIManager.update();
		}
	}
},'js.flux.RowLayout');