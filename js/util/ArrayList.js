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

js.util.ArrayList = $extends(js.util.List,{
	cons: function(arg){
		this.data = new Array();
		
		if(arg != null){
			if(Array.isArray(arg)){
				this.addAll(arg);
			}else if(typeof arg == 'object' && arg.instanceOf(js.util.Collection)){
				this.addAll(arg);
			}
		}
	},
	data: null,
	_size: 0,
	indexOf: function(object){
		if(typeof object == 'object'){
			for(var i = 0; i < this._size; i++){
				if(object.equals(this.data[i])){
					return i;
				}
			}
		}else{
			return this.data.indexOf(object);
		}
		return -1;
	},
	lastIndexOf: function(object){
		if(object == null){
			for(var i = this._size - 1; i >= 0; i--){
				if(this.data[i] == null){
					return i;
				}
			}
		}else if(typeof object == 'object'){
			for(var i = this._size - 1; i >= 0; i--){
				if(object.equals(this.data[i])){
					return i;
				}
			}
		}else{
			for(var i = this._size - 1; i >= 0; i--){
				if(object == this.data[i]){
					return i;
				}
			}
		}
		
		return -1;
	},
	clone: function(){
		var clone = new js.util.ArrayList();
		clone.addAll(this.data);
		return clone;
	},
	toArray: function(){
		return this.data.clone();
	},
	get: function(index){
		if(index >= this._size){
			throw new js.core.Exception("Array Index Out Of Bounds", this, arguments);
		}
		
		return this.data[index];
	},
	add: function(object, index){
		if(index == null){
			this.data.push(object);
			this._size++;
		}else{
			if(typeof index != 'number')
				throw new js.core.Exception("Invalid argument type: "+ typeof number, this, arguments);
			if(index >= this._size)
				throw new js.core.Exception("Array index out of bounds: "+ number, this, arguments);
			
			//this.data[index];
			this.data.splice(index, 0, object);
		}
	},
	remove: function(index){
		if(index >= this.length || index < 0){
			throw new js.core.Exception("Array index out of bounds: "+index, this, arguments);
		}
		this.data.splice(index, 1);
	},
	clear: function(){
		delete this.data;
		this.data = new Array();
		this._size = 0;
	},
	addAll: function(collection){
		if(collection.instanceOf && collection.instanceOf(js.util.Collection)){
			var iterator = collection.iterator();
			
			while(iterator.hasNext()){
				this.data.push(iterator.next());
				this._size++;
			}
		}else{
			var that = this;
			Array.iterate(collection, function add(i,el){
				that.data.push(el);
				that._size += 1;
			});
		}
	},
	size: function(){
		return this._size;
	},
	iterator: function(){
		return new js.util.ArrayList.Iterator(this.data); 
	},
	contains: function(object){
		return this.indexOf(object) >= 0;
	}
},'js.util.ArrayList');

js.util.ArrayList.Iterator = $extends(js.core.Object,{
	cons: function(list){
		js.core.Object.apply(this,arguments);
		this.size = list.length;
		this.list = list;
	},
	size: 0,
	index: 0,
	list: null,
	hasNext: function(){				
		return this.index < this.size;
	},
	next: function(){
		if(!this.hasNext())
			throw new js.core.Exception('Array Index Out Of Bounds: '+this.index, this, arguments);
		
		var val = this.list[this.index];
		this.index ++;
		return val;
	},
	nextIndex: function(){
		return this.index;
	}
},'js.util.ArrayList.Iterator');