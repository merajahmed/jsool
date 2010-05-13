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

js.util.MixedCollection = $extends(js.util.Collection,{
	cons:function(){
		this.map = {};
		this.data = [];
		this.keys = []; 
	},
	map: null,
	data: null,
	keys: null,
	add: function(name, value){
		if(!String.isString(name)){
			throw new js.core.Exception('Illegal argument: '+name,this,arguments);
		}
		this.map[name] = value;
		this.data.push(value); 
		this.keys.push(name);
	},
	get: function(key){
		if(typeof key === 'number'){
			return this.map[this.keys[key]];
		}else if(typeof key === 'string'){
			return this.map[key];
		}
		return null;
	},
	addAll: function(collection){
		var iterator = collection.iterator();
		while(iterator.hasNext())
			this.add(iterator.next());
	},
	contains: function(object){
		return this.data.indexOf(object) != -1;
	},
	isEmpty: function(){return this.size() == 0;},
	size: function(){return this.data.length;},
	iterator: function(){
		return new js.util.ArrayList.Iterator(this.data);
	},
	remove: function(object){
		var i = this.data.indexOf(object);
		this.keys.remove(this.keys[i]);
		this.data.remove(object);
		
		for(var item in this.map){
			if(this.map[item] == object){
				delete this.map[item];
				return;
			}
		}
	},
	toArray: function(){
		return this.data.clone();
	}
},'js.util.MixedCollection');

