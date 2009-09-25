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

js.juif.Button = $extends(js.juif.Component,{
	cons: function(config){
		if(String.isString(config)){
			this.text = config	;
		}else{
			jsool.apply(this,config);
			if(this.renderOn){
				this.render(this.renderOn);
				delete this.renderOn;
			}
		}
	},
	text: 'button',
	defaultElement: "span",
	setText: function(text){
		if(String.isString(text)){
			text = String(text);
		}
		this.text = text;
		if(this.rendered){
			jsool.get(this.element.query("button")[0]).setText(text);
		}
	},
	getText: function(){
		return this.text;
	},
	doRender: function(){
		if(!this.template){
			if(!js.juif.Button.template){
				js.juif.Button.template = new js.dom.Template(
					"<table width=\"100%\"><tr><td class=\"bor-t-l\"/><td class=\"bor-t\"/><td class=\"bor-t-r\"/></tr>",
					"<tr><td class=\"bor-l\"/><td align=\"center\"><button>{text}</button></td><td class=\"bor-r\" /></tr>",
					"<tr><td class=\"bor-b-l\"/><td class=\"bor-b\" /><td class=\"bor-b-r\"/></tr></table>"
				);
			}
			this.template = js.juif.Button.template;
		}
		
		this.element.setClass("juif juif-btn");
		this.element.append(this.template.compile({text:this.text}));
	},
	onmouseover: function(event){
		console.info(event);
	}
},'js.juif.Button');