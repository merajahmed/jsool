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
	cons: function(){
		this.constraints = new js.util.HashMap();
	},
	constraints: null,
	layoutContainer: function(cont){
		var cs = cont.children,
			cons;
		
		for(var i=0,c;c=cs[i++];){
			cons = this.getConstraints(c);
			c.x = cons.left.getValue();
			c.y = cons.top.getValue();
			//c.width = cons.RIGHT.getValue() - c.x;
			//c.height = cons.BOTTOM.getValue() - c.y;
		}
	},
	putConstraint: function(comp1, side1, pad, comp2, side2){
		if(comp1 == comp2){
			throw new js.core.Exception("Illegal operation",this,arguments);
		}
		
		var cons1 = this.getConstraints(comp1),
			cons2 = this.getConstraints(comp2);
		
		pad = new js.flux.Spring(pad);
		delete cons1[side1];
		cons1[side1] = this.sum(pad,cons2[side2]); 
	},
	getConstraints: function(component){
		var cons = this.constraints.get(component);
		if(!cons){
			cons = {
				left:new js.flux.Spring(0),
				right:new js.flux.Spring(0),
				top:new js.flux.Spring(0),
				bottom:new js.flux.Spring(0)
			};
			this.constraints.put(component,cons);
		}
		return cons;
	},
	sum: function(s1, s2){
		return new js.flux.SumSpring(s1,s2);
	}
},'js.flux.SpringLayout');

js.flux.SpringLayout.LEFT = "left";
js.flux.SpringLayout.RIGHT = "right";
js.flux.SpringLayout.TOP = "top";
js.flux.SpringLayout.BOTTOM = "bottom";

js.flux.Spring = function(val){
	var value = val | 0;
	
	this.getValue = function(){
		return value;
	};
	
	this.setValue = function(val){
		value = typeof val === "number" ? val : 0 ;
	};
};

js.flux.SumSpring = function(s1,s2){
	var spring1 = s1,
		spring2 = s2;
	
	this.getValue = function(){
		return spring1.getValue() + spring2.getValue();
	};
	
	this.setValue = function(val){
		value = typeof val === "number" ? val : 0 ;
	};
};