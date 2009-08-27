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

jsool.applyIf(String.prototype,{
	replaceAll: function(search, replacement){
		var str = this;
		var pos = str.indexOf(search);	
		while (pos > -1){
			str = str.replace(search, replacement);
			pos = str.indexOf(search); 
		}	
		return (str);
	},
	
	
	toCharArray: function(){
		var chars = new Array();
		var str = new String(this);
		var l = str.length;
		for(var i = 0; i < l; i++){
			chars.push(str[i]);
		}
		return chars;
	},
	
	
	trim: function(){
		return this.replace(/^\s*([\S\s]*?)\s*$/, '$1');
	},
	
	
	hash: 0,
	hashCode: function(){
		var h = this.hash;	
		if(h == 0){
			var offset = 0;
			var len = this.length;
			
			for(var i = 0; i < len; i++){
				h = 31*h + this.charCodeAt(offset++);
			}
			
			this.hash = h;
		}
		
		return h;
	},
	
	
	
	instanceOf: function(clazz){
		return clazz == String || clazz == js.core.Object;
	},
	
	
	substr: function(s, l){
		if (l == null){
			l = this.length - s;
		}
		return(substring(this, s+1, l));
	},
	
	
	lastIndexOf: function(sub, i){
		size = sub.length;
		i == null ? i = this.length - size + 1 : ++i;
		if (sub.length == 0) return i-1;  
		while ((i >= 0) && (substring(this, i--, size) != sub));  
		return (i == -1 ? -1 : (i));  
	}  
});

String.isString = function(obj){
	return typeof obj == 'string';
};

String.decodeHTML = function(string){
	var code = new RegExp("&#[0-9]{1,3};",'g');
	var matches = string.match(code);
	
	if(matches){
		var getChar = function(code){
			code = code.substring(2);
			code = code.substring(0, code.length - 1);
			var charNum = window.parseInt(code, 10);
			return String.fromCharCode(charNum);
		};
		
		for(var i = 0; i < matches.length; i++){
			var newChar = getChar(matches[i]);
			string = string.replace(matches[i],newChar);
		}
	}
	
	return string;
};

String.encodeHTML = function(string){
	var charBuffer = [];
	
	for(var pos = 0; pos < string.length; pos++){
		var chr = string.charAt(pos);
		
		if(chr >= 'a' && chr <= 'z' || chr >= 'A' && chr <= 'Z' || chr >= '0' && chr <= '9'){
			charBuffer.push(chr);
		}else{
			charBuffer.push("&#"+string.charCodeAt(pos)+";");
		}
	}
	return charBuffer.join('');
};