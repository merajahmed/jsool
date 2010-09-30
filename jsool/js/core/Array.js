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
 * Verify if an object is an Array
 * @param obj is any object to be checked
 * @return <code>true</code> if the object is an array;
 */
Array.isArray = function(obj){
	return obj.constructor == Array;
};

/**
 * Iterates array-like objects
 */
Array.iterate = function(a, fn){
	for(var i=0,e;e=a[i++];){
		fn(i,e);
	}
};

//Adding new methods to array
jsool.applyIf(Array.prototype,{
	/**
	 * Shuffles the current array
	 * @return a shuffled version of the array
	 */
	shuffle: function(){
		this.sort(function(a,b){
			return (Math.random() > 0.5 ? 1 : -1);
		});
	},
	/**
	 * Checks is this instance if of the providen type
	 * @param clazz if the type to be checked
	 * @return <code>true</code> if the object if of the providen type
	 */
	instanceOf: function(clazz){
		return clazz == Array;
	},
	/**
	 * Runs a function for every item on the array
	 */
	forEach: function(action){
		var length = this.length;
		for(var i = 0; i < length; i++){
			action(this[i]);
		}
	},
	/**
	 * Returns true if the provided function returns true for every item on the array
	 */
	every: function(action){
		for(var i = this.length; i--;){
			if(!action(this[i])){
				return false;
			}
		}
		return true;
	},
	/**
	 * Returns an array only with the items that returns true for the provided function
	 */
	filter: function(action){
		var length = this.length;
		var newArray = [];
		for(var i = 0; i < length; i++){
			if(action(this[i])){
				newArray.push(this[i]);
			}
		}
		return newArray;
	},
	/**
	 * Retuns a new array with the results of action
	 */
	map: function(action){
		var length = this.length;
		var newArray = [];		
		for(var i = 0; i < length; i++){			
			newArray.push(action(this[i]));
		}
		return newArray;
	},
	/**
	 * Returns the index of a element
	 */
	indexOf: function(el){
		if(el.equals){
			for(var i=0,e;e=this[i];i++){
				if(el.equals(e)){
					return i;
				}
			}			
		}else{
			for(var i=0,e;e=this[i];i++){
				if(el == e){
					return i;
				}
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
		for (var i=0; i < this.length; i++){
			if (s == this[i]) this.slice(i, 1);
		}
	},
	
	contains: function(obj){
		return this.indexOf(obj) >= 0;
	}
	
});

Array.MAX_LENGTH = 4294967295;//At least on firefox
jsool.namespace("js.core");
js.core.Array = Array;