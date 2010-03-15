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

js.flux.SpringLayout = $extends(js.flux.Layout,{
	constraints: null,
	cyclicReference: null,
	cyclicSprings: null,
	acyclicSprings: null,
	cons: function(){
		this.constraints = new js.util.HashMap();
		this.cyclicReference = js.flux.Spring.constant(Number.MIN_VALUE);
		this.cyclicSprings = {};
		this.acyclicSprings = {};
	},
	resetCyclicStatuses: function(){
		this.cyclicSprings = {};
		this.acyclicSprings = {};
	},
	setParent: function(container){
		this.resetCyclicStatuses();
		
		var constraints = this.getConstraints(container);
		
		constraints.setX(js.flux.Spring.constant(0));
		constraints.setY(js.flux.Spring.constant(0));
		
		var width = constraints.getWidth();
		
		if(width && width.instanceOf(js.flux.WidthSpring) && width.component == container){
			constraints.setWidth(js.flux.Spring.constant(0,0,Number.MAX_VALUE));
		}
		
		var height = constraints.getHeight();
		if(height && height.instanceOf(js.flux.HeightSpring) && height.component == container){
			constraints.setHeight(js.flux.Spring.constant(0,0,Number.MAX_VALUE));
		}
	},
	isCyclic: function(spring){
		if(spring){
			if(this.cyclicSprings[spring.hashCode()]){
				return true;
			}
			
			if(this.acyclicSprings[spring.hashCode()]){
				return false;
			}
			
			this.cyclicSprings[spring.hashCode()] = spring;
			var result = spring.isCyclic(this);
			
			if(!result){
				this.acyclicSprings[spring.hashCode()] = spring;
				delete this.cyclicSprings[spring.hashCode()];
			}
			
			return result;
		}else{
			return null;
		}
	},
	abandonCycles: function(spring){this.cyclicReference
		return this.isCyclic(spring) ? this.cyclicReference : s;
	},
	removeLayoutComponent: function(component){
		this.constraints.remove(component);
	}
},'js.flux.SpringLayout');