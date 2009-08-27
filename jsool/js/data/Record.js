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

js.data.Record = $extends(js.core.Object,{
	cons: function(data, id){
		this.id = id || js.data.Record.id();
		this.data = data || {};
		this.original = jsool.copy(this.data);
	},
	id: null,
	data:null,
	original: null,
	modified: false,
	fields: null,
	error: null,
	set: function(name, value){
		if(name && !this.data[name])return;
		this.data[name]=value;
		this.modified = true;
	},
	reset: function(){
		this.data = this.orgiginal;
	} 
},'js.data.Record');

js.data.Record.MODEL_ID = 0;
js.data.Record.RECORD_ID = 0;
js.data.Record.ID_PREFIX = 'jsool-rec';

js.data.Record.id = function(){
	return [js.data.Record.ID_PREFIX,'-',js.data.Record.RECORD_ID++];
};

js.data.Record.create = function(config){
	var fields = new MixedCollection();
	var field;
	for(var i = 0, field;field = config[i++];){
		field = new js.data.Field(field);
		fields.add(field.name, field);
	}
	var newRec = $extends(js.data.Record,{fields:fields},'js.data.Record$'+(js.data.Record.MODEL_ID++));
	return newRec;
};