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

jsool.namespace("js.util");

js.util.StringBuilder = $extends(js.core.Object, {
	cons: function(object){
		this.buffer = new Array();
		if(object)this.append(object);
	},
	_length: 0,
	buffer: null,
	append: function(object){
		var string = object.toString();
		this.buffer.push(string);
		this._length += string.length;

		return this;
	},
	clear: function(){
		this.buffer = [];
	},
	toString: function(){
		return this.buffer.join("");
	},
	deleteCharAt: function(pos){
		if(typeof pos != 'number')
			throw new js.core.Exception('Invalid argument type',this, arguments);
		
		if(pos > this._length || pos < 0)
			throw new js.core.Exception('Array out of bounds',this, arguments);
		
		var string = this.buffer.join("");
		this.clear();
		
		if(pos == 0){
			this.append(string.substring(1));
		}else if(pos == this._length){
			this.append(string.substring(0, this._length-1));
		}else{
			this.append(string.substring(0,pos));
			this.append(string.substring(pos+1));
		}
	},
	length: function(){
		return this._length;
	}
}, 'js.util.StringBuilder');