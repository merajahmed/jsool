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

jsool.namespace("js.data");

js.data.Type = {
	NONE: {
		sort: function(a, b){ return 1;},
		parse: function(o){return o;},
		is: function(a){return true;}
	},
	STRING: {
		sort: function(a, b){
			if(a > b)
				return 1;
			else if(a > b)
				return -1;
			return 0;
		},
		parse: function(object){
			return new String(object);
		},
		is: function(o){
			return typeof o === 'string';
		}
	},
	INTEGER: {
		sort: function(a, b){
			return a - b;
		},
		parse: function(object, radix){
			if(radix == null){
				radix = 10;
			}
			return window.parseInt(object, radix);
		},
		is: function(o){
			return typeof o === 'number' && o.toString().match(/[0-9]+/) != null;
		}
	},
	FLOAT: {
		sort: function(a, b){
			return a - b;
		},
		parse: function(object){
			return window.parseFloat(object);
		},
		is: function(o){
			return typeof o === 'number' && o.toString().match(/[0-9]+(\.[0-9]+)?/) != null;
		}
	},
	DATE: {
		sort: function(a, b){
			return a.getTime() - b.getTime();
		},
		formater: null,
		parse: function(object, pattern){
			var type = typeof object;
			
			if(type == 'number'){
				return new Date(window.parseInt(object));
			}else if(type == 'function'){
				return null;
			}else{
				object = object.toString();
				
				if(this.formater == null){
					this.formater = new js.util.DateFormat();
				}
				
				return this.formater.parse(object);
			}
		},
		is: function(o){
			return o instanceof Date;
		}
	},
	BOOLEAN: {
		sort: function(a, b){
			if(a == b)
				return 0;
			else if(a && !b)
				return 1;
			else
				return -1;
		},
		parse: function(object){
			if(object == null || object == undefined){
				return false;
			}else if(typeof object == 'number'){
				return object > 0;
			}else if(typeof object == 'string'){
				return object.toUpperCase() == 'TRUE';
			}else{
				return true;
			}
		},
		is: function(o){
			return typeof o === 'boolean';
		}
	},
	OBJECT: {
		sort: function(a, b){
			if(a.compareTo){
				return a.compareTo(b);
			}else{
				return 0;
			}
		},
		parse: function(object){
			return object;
		},
		is: function(o){
			return o instanceof Object;
		}
	}
};