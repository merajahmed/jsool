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

js.juif.Combo = $extends(js.juif.TextField,{
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
	displayField:null,
	valueField:null,
	store: null,
	listVisible: false,
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
		var dh = js.dom.Helper;
		this.input = dh.createDom({
			tag: "input",
			value: this.value || this.emptyText,
			type:"text",
			name: this.name||"",
			maxlength: this.max
		});
		
		this.trigger = dh.createDom({
			tag: "img",
			className: "juif-trigger",
			src:"images/s.gif"
		});
		
		this.list = dh.createDom({
			tag: "div",
			className: "juif-combo-list",
			style: {
				visibility: "hidden"
			}
		});
		
		this.element.setClass("juif juif-field juif-text-field juif-wrapper juif-no-select");
		this.element.append(this.input);
		this.element.append(this.trigger);
		this.element.append(this.list);
		
		if(!this.store)return;
		
		var list = jsool.get(this.list);
		var it = this.store.records.iterator();
		
		while(it.hasNext()){
			var rec = it.next();
			list.append(dh.createDom({
				tag: "div",
				html: rec.data[this.displayField]
			}));
		}
	},
	setWidth: function(w){
		this.width = w;
		this.elStyle.width = w + this.defaultUnit;
		this.input.style.width = w - 16 + this.defaultUnit; 
	},
	/**
	 * just to set the input attribute
	 */
	onafterrender: function(){
		var dh = js.dom.Helper; 
		this.input = this.element.query("input")[0];
		this.setWidth(this.width);
		
		var b = this.element.getBox();
		
		dh.applyStyle(this.list,{
			top: b.y + b.h + 1 + this.defaultUnit,
			left: b.x+ this.defaultUnit,
			width: b.w+ this.defaultUnit
		});
		
		js.core.EventManager.on(this.trigger,"click",function(ev){
			var vis;
			if(this.listVisible){
				vis = "hidden";
				this.listVisible = false;
			}else{
				vis = "visible";
				this.listVisible = true;
			}
			dh.applyStyle(this.list,{
				visibility: vis
			});
		},this);
	}
},'js.juif.Combo');