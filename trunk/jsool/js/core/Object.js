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

var global_objects_count = 0;

js.core.Object = function(){
	global_objects_count++;
};

js.core.Object.prototype = {
	hash: 0,
	type: "js.core.Object",
	cls: js.core.Object,
	supercls: js.core.Object,
	hashCode: function(){
		if(this.hash == 0){
			this.hash = (Math.round((Math.random()*1000)) + (new Date()).getTime());
		}
		return this.hash;
	},
	equals: function(object){
		if(object == null) return false;
		if(typeof object != 'object') return false;		
		for(var property in this){
			if(this[property] != object[property]){
				return false;
			}
		}
		return true;
	},
	toString: function(){
		return this.type + "@" + this.hashCode();
	},
	instanceOf: function(clazz){
		if(clazz == js.core.Object){
			return true;
		}else if(this.cls == clazz){
			return true;
		}else{
			var cls = this.cls.prototype.supercls; 

			do{
				if(cls == clazz){
					return true;
				}
				cls = cls.prototype.supercls;
			}while(cls != js.core.Object);
			
			return false;
		}
	},
	clone: function(){
		var c = new this.supercls;
		jsool.apply(c, this);
		//c.hash = 0;
		return c;
	}
};

Object.isObject = function(o){return typeof o === "object";};