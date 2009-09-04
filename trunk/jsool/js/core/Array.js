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
		var newArray = new Array();
		for(var i = 0; i < length; i++){
			if(action(this[i])){
				newArray.push(this[i]);
			}
		}
		return newArray;
	},
	map: function(action){
		var length = this.length;
		var newArray = new Array();		
		for(var i = 0; i < length; i++){			
			newArray.push(action(this[i]));
		}
		return newArray;
	},
	indexOf: function(elt /*, from*/){
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;
		for (; from < len; from++){
			if (from in this && this[from] === elt) return from;
		}
		return -1;
	},
	clone: function(){
		var result = [];
		for(var i = 0, item; item = this[i++];){
			result.push(item);
		}
		return result;
	},
	concat: function(){
		var result = this.clone();
		for(var a = 0, arr; arr = arguments[a++];){
			var arr = arguments[a];
			for(var b = 0, item; item = arr[b++];){
				result.push(item);
			}
		}
		return result;
	},
	remove: function(s){
		for (var i=0; i < this.length; i++){
			if (s == this[i]) this.splice(i, 1);
		}
	}
	
});

Array.MAX_LENGTH = 4294967295;//At least on firefox