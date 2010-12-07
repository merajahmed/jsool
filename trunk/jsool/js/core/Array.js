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

//Adding new methods to array
jsool.applyIf(Array.prototype,{
	/**
	 * Shuffles the current array
	 * @return a shuffled version of the array
	 */
	shuffle: function(){
		var r = Math.random;
		this.sort(function(a,b){
			return r() - 0.5;
		});
	},
	/**
	 * Checks is this instance if of the providen type
	 * @param clazz if the type to be checked
	 * @return <code>true</code> if the object if of the providen type
	 */
	instanceOf: function(clazz){
		return clazz===Array;
	},
	/**
	 * Runs a function for every item on the array
	 */
	forEach: function(action){
		var i=0,e;
		while(e=this[i++]){
			action(e);
		}
	},
	/**
	 * Returns true if the provided function returns true for every item on the array
	 */
	every: function(action){
		var i=0,e;
		while(e=this[i++]){
			if(!action(e))return false;
		}
		return true;
	},
	/**
	 * Returns an array only with the items that returns true for the provided function
	 */
	filter: function(action){
		var i=0,e,a=[];
		while(e=this[i++]){
			if(action(e))
				a.push(e);
		}
		return a;
	},
	/**
	 * Retuns a new array with the results of action
	 */
	map: function(action){
		var i=0,e,a=[];
		while(e=this[i++]){
			a.push(action(e));
		}
		return a;
	},
	/**
	 * Returns the index of a element
	 */
	indexOf: function(el){
		var i=0,e;
		if(el == null){
			while(e=this[i++]){
				if(e==null)return i-1;
			}
		}else if(el.equals){
			while(e=this[i++]){
				if(el.equals(e))return i-1;
			}			
		}else{
			while(e=this[i++]){
				if(el==e)return i-1;
			}
		}
		return -1;
	},
	/**
	 * Create a copy of an array
	 */
	clone: function(){
		var result = [];
		for(var i = 0, item; item = this[i++];){
			result.push(item);
		}
		return result;
	},
	/**
	 * Create a new array by concatenating the arguments
	 */
	concat: function(con){
		var arr = [],i;
		for(var j = 0;i=this[j++];)arr.push(i);
		for(var a = 0; i = con[a++];)arr.push(i);
		return arr;
	},
	/**
	 * Removes an item from the array
	 */
	remove: function(s){
		var i = this.indexOf(s);
		if(i >= 0)this.slice(i,1);
	},
	
	contains: function(obj){
		return this.indexOf(obj) >= 0;
	},
	
	equals: function(arr){
		if(!arr)return false;
		if(arr==this)return true;
		if(arr.length != this.length)return false;
		var l = arr.length;
		for(var i=0;i<l;i++){
			if(this[i]!=arr[i])return false;
		}
		return true;
	}
});

jsool.applyIf(Array,{
	/**
	 * Verify if an object is an Array
	 * @param obj is any object to be checked
	 * @return <code>true</code> if the object is an array;
	 */
	isArray: function(obj){
		return obj.constructor===Array;
	},
	/**
	 * Iterates array-like objects
	 */
	iterate: function(a, fn){
		for(var i=0,e;e=a[i++];){
			fn(i,e);
		}
	},
	MAX_LENGTH: 4294967295
});

jsool.namespace("js.core");
js.core.Array = Array;