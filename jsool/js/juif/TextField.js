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

jsool.namespace("js.juif");

js.juif.TextField = $extends(js.juif.Component,{
	cons: function(config){
		jsool.apply(this,config);
		this.empty = this.value.length > 0;
		if(this.renderOn){
			this.render(this.renderOn);
			delete this.renderOn;
		}
	},
	name: "",
	value: "",
	input: null,
	max: 255,
	empty: true,
	width: 150,
	emptyText: "",
	getName: function(){
		return this.input.name || this.name;
	},
	setName: function(name){		
		this.name = name;
		this.input.name = name;
	},
	getValue: function(){
		return this.empty ? "" :this.input.value || "";
	},
	setValue: function(val){		
		this.input.value = val;
	},
	defaultElement: "div",
	doRender: function(){
		this.input = js.dom.Helper.createDom({
			tag: "input",
			value: this.value || this.emptyText,
			type:"text",
			name: this.name||"",
			maxlength: this.max
		});
		
		this.element.setClass("juif juif-field juif-text-field");
		this.element.append(this.input);	
	},
	isEmpty: function(){
		return this.empty ? true :this.input.value ? this.input.value.length <= 0 : true; 
	},
	initComponent: function(){
		js.juif.Component.prototype.initComponent.apply(this, arguments);
		
		if(!this.value || this.value == ""){
			this.element.addClass("empty");
			this.empty = true;
		}
		
		var EM = js.core.EventManager,
			i = this.input,
			that = this;
		
		EM.on(i,"keyup",function(ev){
			var l = this.input.value.length;
			if(l == 0 && !this.empty){
				this.element.addClass("empty");
				this.empty = true;
			}else if(l > 0 && this.empty){
				this.element.removeClass("empty");
				this.empty = false;
			}
		},that);
		
		EM.on(i,"blur",function(ev){
			if(this.empty){
				this.input.value = this.emptyText;
			}
		},that);
		
		EM.on(i,"focus",function(ev){
			if(this.empty){
				this.input.value = "";
			}
		},that);
		
	}
},'js.juif.TextField');