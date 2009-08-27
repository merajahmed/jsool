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

js.core.Exception = $extends(js.core.Object,{
	cons: function(message, sourceObject, sourceMethodArguments, sourceException){
		if(message == null)
			throw new Error('The Exception message must not be null');
		
		this.message = message;
		this.source = sourceObject;
		this.method = sourceMethodArguments;
		this.cause = sourceException;
	},
	message: null,
	source: null,
	method: null,
	cause: null,
	getMethod: function(){
		if(!this.source) return '';
		
		var proto = this.source.cls.prototype;
		var method = this.method.callee;
		var methodName;
		
		for(var p in proto){
			if(proto[p] == method){
				methodName = '.' + p + '(';
			}
		}
		
		var args = new Array();
		
		for(var i = 0; i < this.method.length; i++){
			if(typeof this.method[i] == 'object'){				
				args.push(this.method[i].type || this.method[i]);
			}else{
				args.push(this.method[i]);
			}
		}
		
		return methodName + args.join(',') + ')';
	},
	toString: function(){
		var out;
		
		if(this.source){
			out = this.source.type;
			
			if(this.method){
				out = out + this.getMethod();
			}
		}else{
			out = this.type;
		}
		
		out = out + ': ' + this.message;
		
		if(this.cause){
			out = out + '\n' + this.cause.toString();
		}
		
		return out;
	}
},'js.core.Exception');