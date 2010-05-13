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

js.util.HashSet = $extends(js.util.Collection,{
	cons: function(){
		this.set = {};
	},
	set: null,
	_size: 0,
	add: function(obj){
		var type = typeof obj;
		
		var hash;
		
		if((type == 'object' && obj.hashCode)){
			hash = obj.hashCode();
		}else if(type == 'number' || type == 'string'){
			hash = obj.toString();
		}else{
			throw new js.core.Exception("Invalid argument type: "+obj.toString(), this, arguments);
		}
		
		if(!this.set[hash])
			this._size++;
		
		this.set[hash] = obj;
	},
	mapCode: function(obj){
		if(typeof obj == 'object' && obj.hashCode)
			return obj.hashCode();
		else
			return obj.toString();
	},
	addAll: function(collection){
		if(collection.instanceOf(js.util.Collection)){
			var i = collection.iterator();
			while(i.hasNext()){
				this.add(i.next());
			}
		}else if(Array.isArray(collection)){
			for(var j = 0; j < collection.length; j++)
				this.add(collection[j]);
		}
	},
	contains: function(obj){
		if(obj == 'toString') return null;
		var hash = this.mapCode(obj);
		return this.set[hash] != null;
	},
	clear: function(){
		this._size = 0;
		this.set = {};
	},
	remove: function(obj){		
		if(delete this.set[this.mapCode(obj)])
			this._size--;
	},
	size: function(){
		return this._size;
	},
	toArray: function(){
		var arr = new Array();
		for(var p in this.set) arr.push(this.set[p]);
		return arr;
	},
	iterator: function(){		 
		return new js.util.HashSet.Iterator(this.set);
	}
},'js.util.HashSet');

js.util.HashSet.Iterator = $extends(js.core.Object,{
	constructor: function(set){
		js.core.Object.apply(this,arguments);
		this.data = new Array();
		
		for(var item in set){
			this.data.push(item);
			this.size++;
		}
	},
	data: null,
	index: 0,
	size: 0,
	hasNext: function(){
		return this.index < this.size;
	},
	next: function(){
		if(!this.hasNext())
			throw new js.core.Exception('Array Index Out of Bounds: '+this.index, this, arguments);
		
		var val = this.data[this.index];
		this.index++;
		return val;
	},
	nextIndex: function(){
		if(this.hasNext())
			return this.index + 1;
		else
			return -1;
	}
},'js.util.HashSet.Iterator');