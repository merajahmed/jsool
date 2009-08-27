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

/**
 * Options:
 * async: boolean
 * reaponseType: string Text/Xml
 * failure: function
 * success: function
 * params: string/object
 * method: string GET/POST
 * url: string (REQUIRED)
 * noCache: boolean
 */
js.net.HttpRequest = $extends(js.util.Observable, {
	cons: function(options){
		if(options == null)
			throw new js.core.Exception('The constructor argument must not be null', this);
		
		if(typeof options == 'string')
			this.url = options;
		else if(typeof options == 'object'){
			if(options.async != null) this.async = options.async;
			
			if(options.responseType){
				if(options.responseType.toUpperCase() == 'TEXT')
					this.responseType = 'Text';
				else if(responseType.toUpperCase() == 'XML')
					this.responseType = 'Xml';
			}
			
			if(options.success) this.success = options.success;
			if(options.failure) this.failure = options.failure;
			if(options.params) this.setParams(options.params);
			if(options.method){
				if(options.method.toUpperCase() != 'GET' && options.method.toUpperCase() != 'POST')
					throw new js.core.Exception('Invalid request method: '+options.method, this);
				else
					this.method = options.method.toUpperCase();
			}
			
			if(options.url) this.url = options.url;
			else throw new js.core.Exception('The request url must not be null', this);
		}
		
		this.addEvent(['start','complete','success','failure','error']);
	},
	async: true,
	responseType: 'Text',
	failure: null,
	success: null,
	params: '',
	paramsLength: 0,
	method: 'GET',
	url: null,
	noCache: false,
	setParams: function(params){
		if(typeof params == 'string' && params.length() > 0){
			var len = 1;
			
			for(var i = 0; i < params.length(); i++){
				len += params.charAt(i) == '&' ? 1 : 0;
			}
			
			this.params = params;
			this.paramsLength = len;
		}else if(typeof params == 'object'){
			var out = new js.util.StringBuilder();
			var len = 0;
			
			for(var p in params){
				out.append(p).append('=').append(params[p]).append('&');
				len++;
			}
			out.deleteCharAt(out.length());
			
			this.params = out.toString();			
			this.paramsLength = len;
		}
	},
	getParams: function(){
		if(this.noCache){
			if(this.paramsLength > 0){
				//add timestamp
				return this.params + '&_ts=' + jsool.time();
			}else{
				return '_ts=' + jsool.time();
			}
		}else{
			return this.params;
		}
	},
	callback: function(status, response){
		if(status == 'success' && this.success){
			this.success(response);
		}else if(status == 'failure' && this.success){
			this.failure(response);
		}
	}
},'js.net.HttpRequest');