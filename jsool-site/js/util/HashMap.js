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

/**
 * Map that may store a key-value pair where the key is a number, string or a object that have the hashCode method
 */
js.util.HashMap = $extends(js.util.Map,{
	/**
	 * @constructor
	 * Default contructor
	 */
	cons: function(){
		this.map = {};
		this.keys = {};
	},
	values: null,
	map: null,
	_size: 0,
	keys: null,
	put: function(key, value){
		var type = typeof key;
		
		var hash;
		
		if((type == 'object' && key.hashCode)){
			hash = key.hashCode();
		}else if(type == 'number' || type == 'string'){
			hash = key.toString();
		}else{
			throw new js.core.Exception("Invalid argument type: "+key.toString(), this, arguments);
		}
		
		if(hash in this.keys){
			this._size--;
		}
		this._size++;
		this.keys[hash] = hash;
		this.map[hash] = value;
		return true;
	},
	containsKey: function(key){
		return (this.mapCode(key) in this.keys);
	},
	containsValue: function(value){
		for(var p in this.map){
			if(this.map[p] == value){
				return true;
			}
		}
		return false;
	},
	get: function(key){
		return this.map[this.mapCode(key)];		
	},
	size: function(){
		return this._size;	
	},
	remove: function(key){
		var el = this.get(key);
		if(el == null) return false;
		
		delete this.map[this.mapCode(key)];
		
		this._size--;
		
		return true;
	},
	mapCode: function(obj){
		if(typeof obj == 'object' && obj.hashCode)
			return obj.hashCode();
		else
			return obj.toString();
	},
	contains: function(object){
		return this.containsValue(object);
	},
	clear: function(){
		this._size = 0;
		this.map = {};
	}
},'js.util.HashMap');