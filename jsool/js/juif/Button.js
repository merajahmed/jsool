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
js.juif.Button = $extends(js.juif.Component,{
	cons: function(text){
		if(String.isString(text)){
			this.text = text;
		}
	},
	text: 'button',
	defaultElement: "div",
	setText: function(text){
		if(String.isString(text)){
			text = String(text);
		}
		this.text = text;
		if(this.rendered){
			js.html.Element.get(this.element.query("button")[0]).setText(text);
		}
	},
	getText: function(){
		return this.text;
	},
	doRender: function(){
		if(!this.template){
			if(!js.juif.Button.template){
				js.juif.Button.template = new js.html.Template(
					"<table><tr><td class=\"wgt-btn-bor-t-l\"/><td class=\"wgt-btn-bor-t\"/><td class=\"wgt-btn-bor-t-r\"/></tr>",
					"<tr><td class=\"wgt-btn-bor-l\"/><td><button>{text}</button></td><td class=\"wgt-btn-bor-r\" /></tr>",
					"<tr><td class=\"wgt-btn-bor-b-l\"/><td class=\"wgt-btn-bor-b\" /><td class=\"wgt-btn-bor-b-r\"/></tr></table>"
				);
			}
			this.template = js.juif.Button.template;
		}
		
		this.element.setClass("jsool wgt-btn");
		this.element.append(this.template.compile({text:this.text}));
	}
},'js.widget.Button');