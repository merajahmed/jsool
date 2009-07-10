/**
 * JPMC JS Framework
 * Authors:
 *   ben.x.white@jpmchase.com
 * Version: 1.0.15
 * $Rev$
 * $Date$
 */
/**
 * @fileoverview Core Namespace Initialization
 */

// Base JPMC structure
var jpmc = {app:{},codec:{},crypto:{},external:{},helper:{},lang:{},net:{},ui:{},util:{}};
/**
 * @fileoverview A JavaScript Blowfish 448 Bit implementation (ECB)
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the symmetrical Blowfish (448 Bit) encryption class using the default ECB mode
 * @constructor
 * @class Builds Blowfish encryption class.<br>
 * @extends jpmc.crypto.BlowfishECB
 */
jpmc.crypto.Blowfish = function(key, DataType) {

	jpmc.crypto.BlowfishECB.apply(this, arguments);

};
/**
 * @fileoverview Common methods for encryption
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * A static class that contains useful methods.
 * @class A static class that contains useful methods.<br>
 * @constructor
 */
jpmc.crypto.Util = function() {};

/**
 * Gets random data in the requested format.
 * @param {number} bytes (Optional) The number of bytes to return. (default: 32 = 256 bits)
 * @param {jpmc.lang.Data.format} dataType (Optional) The format to return the random data in. (default: jpmc.lang.Data.format.BINARY)
 * @param {function} onComplete (Optional) Causes the routine to leverage the user's mouse as an input and calls this function once the random data is generated.
 * @param {function} onProgress (Optional) As the random data is being build, this function is called to update current progress (parameter will be in range 0 -> 1.0)
 * @type mixed
 * @returns Random data in the requested format, indicated by the dataType parameter
 */
jpmc.crypto.Util.getRandomData = function(bytes, dataType, onComplete, onProgress) {

	bytes = bytes || 32;
	dataType = dataType || jpmc.lang.Data.format.BINARY;

	var tmp = new jpmc.util.DataBuilder(dataType);
	var hid;

	var handler = function(e) {
		if (Math.random()<0.5) {
			var z = (e.clientX + e.clientY + (new Date()).valueOf()) % 256;
			tmp.appendNumber(z);
		}
		var p = (tmp.getLength() / bytes);
		if (typeof onProgress == 'function') {onProgress(p);}
		if (p>=1) {
			onComplete(tmp.getValue());
			jpmc.ui.Util.detachEvent(hid);
		}
	};

	if (typeof onComplete == 'function') {
		hid = jpmc.ui.Util.attachEvent(document.body,'onmousemove',handler);
	} else {
		for (var x=0; x<bytes; x++) {
			tmp.appendNumber(Math.floor(Math.random()*256));
		}
	}
	return tmp.getValue();
};
/**
 * @fileoverview Methods for altering and managing arrays
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.Array = function(){};


/**
 * Gets a random element from the array.
 * @param {Array} arr The array to use
 * @type mixed
 * @return Random element from the array
 */
jpmc.helper.Array.random = function(arr) {
	return arr[Math.round((Math.random()*arr.length)-0.5)];
};

/**
 * Randomizes an array.
 * @param {Array} arr The array to use
 * @type object
 * @return Randomized Array
 */
jpmc.helper.Array.randomize = function(arr) {
	return arr.sort(
		function (a, b) {
			return (Math.round(Math.random())===0)?1:-1;
		}
	);
};

/**
 * Iterates through an array, applying a callback function to each element.
 * @param {Array} arr The array to use
 * @param {function} handler Callback function applied to each array element. Returned value is put into returned array.
 * @type object
 * @return Updated Array
 */
jpmc.helper.Array.iterate = function(arr, handler) {
	for (var i=0; i<arr.length; i++) {
		arr[i] = handler(arr[i], i);
	}
	return arr;
};

/**
 * Filters an array using a callback function.
 * @param {Array} arr The array to use
 * @param {function} handler Callback function applied to each array element and returns boolean true or false. Removes elements that returns true.
 * @type object
 * @return Filtered Array
 */
jpmc.helper.Array.filter = function(arr, handler) {
	for (var i=0; i<arr.length; i++) {
		if (handler(arr[i], i)) {
			arr.splice(i, 1);
			i--;
		}
	}
	return arr;
};

/**
 * Removes an array element at the given index.
 * @param {Array} arr The array to use
 * @param {number} index The index of the element to remove.
 * @type mixed
 * @return Element removed from the array
 */
jpmc.helper.Array.removeAt = function(arr, index) {
	return arr.splice(index, 1)[0];
};

/**
 * Inserts an element into an array at the given index.
 * @param {Array} arr The array to use
 * @param {number} index The index where the new element will be placed.
 * @param {mixed} obj The element to insert into the array.
 * @type object
 * @return Updated Array
 */
jpmc.helper.Array.insertAt = function(arr, index, obj) {
	arr.splice(index, 0, obj);
	return arr;
};

/**
 * Creates an identical copy of the array.
 * @param {Array} arr The array to use
 * @type object
 * @return Identical Array
 */
jpmc.helper.Array.clone = function(arr) {
	return arr.concat([]);
};

/**
 * Builds a distinct set, i.e. no repeat elements.
 * @param {Array} arr The array to use
 * @type object
 * @return Array with distinct elements
 */
jpmc.helper.Array.distinct = function(arr) {
	for (var i=0; i<arr.length; i++) {
		for(var j=(i+1); j<arr.length; j++) {
			if (arr[i]==arr[j]) {
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr;
};

/**
 * Finds the location of the value in the array.
 * @param {Array} arr The array to use
 * @param {mixed} value The value to search for in the array.
 * @param {number} start (optional) The index to start the search.
 * @type number
 * @return Location of the value in the array, else -1
 */
jpmc.helper.Array.indexOf = function(arr, value, start) {
	for (var x=start||0; x<arr.length; x++) {
		if (value==arr[x]) {return x;}
	}
	return -1;
};

/**
 * Finds the min value contained in the array.
 * @param {Array} arr The array to use
 * @type mixed
 */
jpmc.helper.Array.min = function(arr) {
	var min = arr[0];
	for (var x=1; x<arr.length; x++) {
		min = (arr[x]<min)?arr[x]:min;
	}
	return min;
};

/**
 * Finds the max value contained in the array.
 * @param {Array} arr The array to use
 * @type mixed
 */
jpmc.helper.Array.max = function(arr) {
	var max = arr[0];
	for (var x=1; x<arr.length; x++) {
		max = (arr[x]>max)?arr[x]:max;
	}
	return max;
};

/**
 * Finds the sum of the array elements.
 * @param {Array} arr The array to use
 * @type number
 */
jpmc.helper.Array.sum = function(arr) {
	var sum = arr[0];
	for (var x=1; x<arr.length; x++) {
		sum += arr[x];
	}
	return sum;
};

/**
 * Finds the average value of the array elements.
 * @param {Array} arr The array to use
 * @type number
 */
jpmc.helper.Array.avg = function(arr) {
	return (jpmc.helper.Array.sum(arr)/arr.length);
};

/**
 * Swaps two elements in the array.
 * @param {Array} arr The array to use
 * @param {number} index1 The index of the first element to swap.
 * @param {number} index2 The index of the second element to swap.
 * @type object
 * @return Changed Array
 */
jpmc.helper.Array.swap = function(arr, index1, index2) {
	var holder = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = holder;
	return arr;
};

/**
 * Returns an array of specified length containing the prepopulated data
 * @param {number} length The size of the array to create.
 * @param {mixed} value (optional) The initial value of each element in the array.
 * @param {number} increment (optional) If the value parameter is a number, each element in the array will increase by this number.
 * @type object
 * @return Prepopulated Array
 */
jpmc.helper.Array.build = function(length, value, increment) {
	var i;
	var A=[];
	if (typeof value=='number') {
		if (typeof increment!='number') {increment=0;}
		for(i=0; i<length; i++) {
			A[i] = value + (i*increment);
		}
	} else {
		for(i=0; i<length; i++) {
			A[i] = value;
		}
	}
	return A;
};
/**
 * @fileoverview Methods for managing CSS
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.CSS = function(){};

/**
 * Loads a CSS file from the supplied URL. This has no known cross domain issues.
 * @param {string} url The URL of the CSS file to load
 * @type object
 * @return The Link element that was added
 */
jpmc.helper.CSS.add = function(url) {
	var CSS = document.createElement('LINK');
	CSS.setAttribute('href',url);
	CSS.setAttribute('rel','stylesheet');
	CSS.setAttribute('type','text/css');
	var head = document.getElementsByTagName('HEAD');
	if (head.length>0) {head[0].appendChild(CSS);}
	return CSS;
};
/**
 * @fileoverview Methods for altering and manipulating dates
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.Date = function(){};

/**
 * Get/sets the array of names of the days of a week, starting 'Sunday'. Static property.
 * @type [string]
 */
jpmc.helper.Date.dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/**
 * Get/sets the array of abbreviated names of the days of a week, starting 'Sun'. Static property.
 * @type [string]
 */
jpmc.helper.Date.dayNamesAbbr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/**
 * Get/sets the array of names of the months of the Gregorian calendar. Static property.
 * @type [string]
 */
jpmc.helper.Date.monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/**
 * Get/sets the array of names of the months of the Gregorian calendar. Static property.
 * @type [string]
 */
jpmc.helper.Date.monthNamesAbbr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/**
 * Converts a ISO8601 string to a javascript Date object.
 * Code based on Paul Sowden - http://delete.me.uk/2005/03/iso8601.html
 * @param {string} str The string to convert (If time is specified but timezone is not, UTC is assumed)
 * @type object
 * @return A JavaScript Date object representing the value of the ISO8601 string
 */
jpmc.helper.Date.fromISO8601 = function(str) {
	if (typeof str != 'string') {return null;}
	var regexp = /^([0-9]{4})(?:-?([0-9]{2,3})(?:-?([0-9]{2})(?:[ T]([0-9]{2}):?([0-9]{2})(?::?([0-9]{2})(?:\.?([0-9]+))?)?(?:Z|(?:([-+])([0-9]{2}):?([0-9]{2})?))?)?)?)?$/;
	var d = str.match(regexp);
	if(!d) {return null;}
	var offset;
	var dtm = new Date(d[1], 0, 1);
	if (d[2]) {dtm.setMonth(d[2] - 1);}
	if (d[3]) {dtm.setDate(d[3]);}
	if (d[4]) {dtm.setHours(d[4]);offset=0;}
	if (d[5]) {dtm.setMinutes(d[5]);}
	if (d[6]) {dtm.setSeconds(d[6]); }
	if (d[7]) {dtm.setMilliseconds(Number('0.' + d[7]) * 1000); }
	if (d[8]) {
		offset = parseInt(d[9], 10) * 60;
		if (d[10]) {offset += parseInt(d[10], 10);}
		offset *= ((d[8] == '-')?1:-1);
	}
	if (!isNaN(offset)) {
		dtm.setMinutes(dtm.getMinutes()-dtm.getTimezoneOffset()+offset);
	}
	return dtm;
};

/**
 * Returns a javascript Date object reflecting the time in the requested timezone offset.
 * @param {object} date The JavaScript Date object
 * @param {number} offset (optional) Timezone offset in minutes (default will be UTC)
 * @type object
 * @return A JavaScript Date object representing the date time in the requested timezone.
 */
jpmc.helper.Date.toTimezone = function(date, offset) {
	offset = date.getTimezoneOffset() + (offset || 0);
	return jpmc.helper.Date.addHours(date, 0, offset);
};

/**
 * Returns a javascript Date object with the given units of time added to it.
 * This is is a workaround for the DST bug in the Date.setHours() method.
 * @param {object} date The JavaScript Date object
 * @param {number} hours (optional) The number of hours to be added
 * @param {number} minutes (optional) The number of minutes to be added
 * @param {number} seconds (optional) The number of seconds to be added
 * @param {number} ms (optional) The number of ms to be added
 * @type object
 * @return A JavaScript Date object representing the date time in the requested timezone.
 */
jpmc.helper.Date.addHours = function(date, hours, minutes, seconds, ms) {
	return new Date(date.valueOf() + ((hours||0) * 60 * 60 * 1000) + ((minutes||0) * 60 * 1000) + ((seconds||0) * 1000) + (ms||0));
};

/**
 * Converts a date object to a ISO8601 string.
 * Code based on Paul Sowden - http://delete.me.uk/2005/03/iso8601.html
 * @param {object} date The JavaScript Date object
 * @param {number} format (optional) The formatting style to be applied to the output. (1-6)<br>
 *    1 Year:<br>
 *      YYYY (eg 1997)<br>
 *    2 Year and month:<br>
 *      YYYY-MM (eg 1997-07)<br>
 *    3 Complete date:<br>
 *      YYYY-MM-DD (eg 1997-07-16)<br>
 *    4 Complete date plus hours and minutes:<br>
 *      YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)<br>
 *    5 Complete date plus hours, minutes and seconds:<br>
 *      YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+01:00)<br>
 *    6 Complete date plus hours, minutes, seconds and a decimal<br>
 *      fraction of a second<br>
 *      YYYY-MM-DDThh:mm:ss.msTZD (eg 1997-07-16T19:20:30.45+01:00)<br>
 * @param {number} offset (optional) Timezone offset in minutes -Date.getTimezoneOffset()
 * @type string
 * @return The ISO8601 string representing of the JavaScript date object
 */
jpmc.helper.Date.toISO8601 = function(date, format, offset) {
	var str = '';
	var strOffset = '';
	var dtm = new Date(date.valueOf());
	var zeropad = function (num) { return ((num < 10) ? '0' : '') + num; };

	format = format || 6;
	if (typeof offset != 'number') {
		offset = -dtm.getTimezoneOffset();
	}
	if (offset===0) {
		strOffset = 'Z';
	} else {
		dtm.setMinutes(dtm.getMinutes()+offset);
		strOffset = (offset<0?'-':'+') +
			zeropad(Math.floor(Math.abs(offset/60))) +
			':' +
			zeropad(Math.abs(offset%60));
	}
	str += dtm.getUTCFullYear();
	if (format > 1) { str += '-' + zeropad(dtm.getUTCMonth() + 1); }
	if (format > 2) { str += '-' + zeropad(dtm.getUTCDate()); }
	if (format > 3) {
		str += 'T' + zeropad(dtm.getUTCHours()) +
			   ':' + zeropad(dtm.getUTCMinutes());
	}
	if (format > 5) {
		var secs = Number(dtm.getUTCSeconds() + '.' + ((dtm.getUTCMilliseconds() < 100) ? '0' : '') + zeropad(dtm.getUTCMilliseconds()));
		str += ':' + zeropad(secs);
	} else if (format > 4) { str += ':' + zeropad(dtm.getUTCSeconds()); }

	if (format > 3) { str += strOffset; }
	return str;
};

/**
 * Returns a Date object based on a IETF standard date string. See javascript Date.parse documentation for more details.
 * @param {string} str A string representing a date.
 * @type Date
 * @return A JavaScript Date object representing the value of the IETF standard date string
 */
jpmc.helper.Date.parse = function(str) {
	return new Date(Date.parse(str));
};

/**
 * Formats a date object based on format string passed in.
 * @param {object} date The JavaScript Date object, or milliseconds since Jan 1, 1970
 * @param {string} formatString The formating style to be returned
 * @param {number} offset (optional) The UTC offset in minutes which the time is to be displayed in
 * 	<ul>
 * 	<li>D    - The two-digit day, but with no leading zero for any day that is less than 10.</li>
 * 	<li>DD   - The two-digit day.  A zero precedes single-digit day values.</li>
 * 	<li>DDD  - The abbreviated weekday name.</li>
 * 	<li>DDDD - The full weekday name.</li>
 * 	<li>DDDDD- The two-digit day with proper "st", "nd", "rd" or "th" appended at the end.</li>
 * 	<li>H    - The one-digit or the two-digit hour in 12-hour format.</li>
 * 	<li>HH   - The two-digit hour in 12-hour format.  A zero precedes single-digit values.</li>
 * 	<li>HHH  - The one-digit or the two-digit hour in 24-hour format.</li>
 * 	<li>HHHH - The two-digit hour in 24-hour format.  A zero precedes single-digit values.</li>
 * 	<li>N    - The one-digit or the two-digit minute.</li>
 * 	<li>NN   - The two-digit minute.  A zero precedes single-digit values.</li>
 * 	<li>S    - The one-digit or the two-digit second.</li>
 * 	<li>SS   - The two-digit second.  A zero precedes single-digit values.</li>
 * 	<li>T    - The one-letter A.M. and P.M. Abbreviation (That is, AM is displayed as A)</li>
 * 	<li>TT   - The two-letter A.M. and P.M. abbreviation (that is, AM is displayed as AM)</li>
 * 	<li>M    - The one-digit or the two-digit month number.</li>
 * 	<li>MM   - The two-digit month number.  A zero precedes single-digit values.</li>
 * 	<li>MMM  - The three-character month abbreviation.</li>
 * 	<li>MMMM - The full month name.</li>
 * 	<li>Y    - The year is displayed as the last two digits, but with no leading zero for any year that is less than 10.</li>
 * 	<li>YY   - The last two digits for the year.  For example, 1998 would be displayed as 98</li>
 * 	<li>YYY  - The full year.  For example, 1998 would be displayed as 1998.</li>
 * 	<li>YYYY - The full year.  For example, 1998 would be displayed as 1998.</li>
 * 	<li>Z    - The Local Timezone.  For example, ET.</li>
 * 	</ul><br>
 * 	Example: <br>
 * 		&nbsp;&nbsp;&nbsp;&nbsp;mmm dd, yyy h:nn:ss tt<br>
 * 	would return as<br>
 * 		&nbsp;&nbsp;&nbsp;&nbsp;Jan 02, 2007 4:01:14 PM
 * @type string
 * @return The date object formated as requested
 */
jpmc.helper.Date.format = function(date, formatString, offset) {

	var dtSuffix = function(day) {
		switch (day)
		{
			case 1:
			case 21:
			case 31:
				return day + "st";

			case 2:
			case 22:
				return day + "nd";

			case 3:
			case 23:
				return day + "rd";

			default:
				return day + "th";
		}
	};

	var hr = [12,1,2,3,4,5,6,7,8,9,10,11];
	var pad = jpmc.helper.Number.pad;
	if (typeof date == 'object' && date.constructor == Date) {date = date.valueOf();}
	if (typeof date != 'number') {date = 0;}
	var dtm = new Date(date);
	var localOffset = dtm.getTimezoneOffset();
	dtm = jpmc.helper.Date.addHours(dtm, 0, -localOffset);
	if (typeof offset == 'number') {
		dtm = jpmc.helper.Date.addHours(dtm, 0, localOffset + offset);
	}

	return formatString.replace(/(D{1,5}|H{1,4}|N{1,2}|S{1,2}|S{1,2}|M{1,4}|T{1,2}|Y{1,4}|Z)/gi,function(a) {
			switch(a.toLowerCase()) {
				case 'd': return dtm.getUTCDate();
				case 'dd': return pad(dtm.getUTCDate(),2);
				case 'ddd': return jpmc.helper.Date.dayNamesAbbr[dtm.getUTCDay()];
				case 'dddd': return jpmc.helper.Date.dayNames[dtm.getUTCDay()];
				case 'ddddd': return dtSuffix(dtm.getUTCDate());
				case 'h': return hr[dtm.getUTCHours() % 12];
				case 'hh': return pad(hr[dtm.getUTCHours() % 12],2);
				case 'hhh': return dtm.getUTCHours();
				case 'hhhh': return pad(dtm.getUTCHours(),2);
				case 'n': return dtm.getUTCMinutes();
				case 'nn': return pad(dtm.getUTCMinutes(),2);
				case 's': return dtm.getUTCSeconds();
				case 'ss': return pad(dtm.getUTCSeconds(),2);
				case 't': return dtm.getUTCHours()<12?'A':'P';
				case 'tt': return dtm.getUTCHours()<12?'AM':'PM';
				case 'm': return dtm.getUTCMonth()+1;
				case 'mm': return pad(dtm.getUTCMonth()+1,2);
				case 'mmm': return jpmc.helper.Date.monthNamesAbbr[dtm.getUTCMonth()];
				case 'mmmm': return jpmc.helper.Date.monthNames[dtm.getUTCMonth()];
				case 'y': return dtm.getUTCFullYear()%100;
				case 'yy': return pad(dtm.getUTCFullYear()%100,2);
				case 'yyy':
				case 'yyyy': return dtm.getUTCFullYear();
				case 'z': return dtm.toString().split(' ')[jpmc.ui.Util.isIE?4:5];
				default: return a;
			}
		}
	);
};
/**
 * @fileoverview Methods for managing Functions
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.Function = function(){};

/**
 * Sets a pointer to a function
 * @param {function} func The function to reference
 * @param {object} scope (optional) The object that represents the scope to run the function in
 * @type string
 * @return The string representation of the function
 */
jpmc.helper.Function.getPointer = function(func, scope) {

	var self = scope || this;

	jpmc.helper.Function.cnt++;

	var cnt = jpmc.helper.Function.cnt;

	jpmc.helper.Function['func_' + cnt] = function() {

		var ret =  func.apply(self, arguments);

		//cleanup
		jpmc.helper.Function['func_' + cnt] = null;
		delete jpmc.helper.Function['func_' + cnt];

		return ret;
	};

	return 'jpmc.helper.Function.func_' + cnt;

};

/**
 * @private
 */
jpmc.helper.Function.cnt = 0;
/**
 * @fileoverview Methods for calculating distance between strings
 * @author Ben White (ben.x.white@jpmchase.com)
 */


/**
 * A static class that contains useful methods and properties.
 * @class A static class that contains useful methods and properties.<br>
 * @constructor
 */
jpmc.helper.Levenshtein = function(){};

/**
 * Calculates the number of edits to change one word into another
 * @param {string} string1 The first word to compare
 * @param {string} string2 The second word to compare
 * @type number
 * @returns The number of edits required to change the first work to the second word
 */
jpmc.helper.Levenshtein.distance = function(string1, string2) {

	var i,j;
	var cost_del = 1;
	var cost_ins = 1;
	var cost_sub = 1;

	var n1 = string1.length;
	var n2 = string2.length;

	var p = [];
	var q = [];
	var tmp;

	for (j=0; j<=n2; j++) {p[j] = j * cost_ins;}

	for (i=1; i <= n1; ++i) {
		q[0] = p[0] + cost_del;
		for (j=1; j<=n2; ++j) {
			var d_del = p[j] + cost_del;
			var d_ins = q[j-1] + cost_ins;
			var d_sub = p[j-1] + ( string1.charAt(i-1) == string2.charAt(j-1) ? 0 : cost_sub );
			q[j] = d_del<d_ins?( d_del<d_sub?d_del:d_sub ):( d_ins<d_sub?d_ins:d_sub );
		}
		tmp = p;
		p = q;
		q = tmp;
	}
	return p[n2];
};
/**
 * @fileoverview Methods for formating and manipulating numbers
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.Number = function(){};

/**
 * Calculates the factorial of a number
 * @param {number} num The number to use
 * @type number
 * @return The product of all positive integers less than or equal to number
 */
jpmc.helper.Number.factorial = function(num) {
	if (num-1===0) {return 1;}
	return (jpmc.helper.Number.factorial(num-1) * num);
};

/**
 * Determines if the number is a prime number
 * @param {number} num The number to use
 * @type boolean
 * @return Boolean indicating if the number is only divisible by 1 and the number itself
 */
jpmc.helper.Number.isPrime = function(num) {
	if (num<2 || (num%2===0 && num!==2)) {return false;}
	var i = Math.sqrt(num);
	for (var x=3; x<=i; x+=2) {
		if (num % x === 0) {return false;}
	}
	return true;
};

/**
 * Pads the begining of a number to a specified length.
 * @param {number} num The number to use
 * @param {number} len The length of the output after padding
 * @param {string} chr (Optional) The character to use for padding (Default: "0")
 * @type string
 * @return number padded to the requested length
 */
jpmc.helper.Number.pad = function(num, len, chr) {
	return jpmc.helper.String.pad(num.toString(), len, chr||'0');
};

/**
 * Formats a number American style (Example: 1,000.00)
 * @param {number} num The number to use
 * @param {number} decimalPlaces (Optional) The number of decimal places after the decimal
 * @type string
 * @return Formatted number
 */
jpmc.helper.Number.formatNumber = function(num, decimalPlaces) {
	var x = parseFloat(num).toFixed(decimalPlaces||0).toString().split('.');
	var x1 = x[0];
	var x2 = (x.length>1)?x[1]:'';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1+(x2.length>0?'.'+x2:'');
};


/**
 * Formats a number using binary units, power of 2 (K,M,G,T,...)
 * @param {number} num The number to use
 * @type string
 * @return Formatted number
 */
jpmc.helper.Number.formatBinary = function(num) {
	return jpmc.helper.Number.formatCore(num,2,10);
};

/**
 * Formats a number using metric units, power of 10 (K,M,G,T,...)
 * @param {number} num The number to use
 * @type string
 * @return Formatted number
 */
jpmc.helper.Number.formatMetric = function(num) {
	return jpmc.helper.Number.formatCore(num,10,3);
};

/**
 * Formats a number into common time format (HH:NN:SS.MMM) or (W weeks, D days, HH hours, NN minutes, SS seconds, MM milliseconds)
 * @param {number} ms The number of milliseconds to display as time
 * @param {boolean} lng (optional) Flag that indicates if long or short format should be used. (default: short)
 * @param {number} res (optional) The resolution of the time returned [1=week, 2=day, 3=hour, 4=min, 5=sec (default), 6=ms]
 * @param {number} maxUnit (optional) The largest unit of the time returned [1=week, 2=day (default), 3=hour (largest for short format), 4=min, 5=sec, 6=ms]
 * @type string
 * @return Formatted time
 */
jpmc.helper.Number.formatTime = function(ms, lng, res, maxUnit) {

	ms = Math.abs(ms);    //Lets deal with absolute time here
	res = res||5;         //default to seconds resolution
	maxUnit = maxUnit||2; //default to day unit

	var auto = -res;

	res = res<0?5:res;
	maxUnit = maxUnit>res?res:maxUnit;

	var cnt=0;
	var tm = [];
	var cnst = [
		//   constant,          unit,  shrtSep, shrtPad, shrtReq,
		1000*60*60*24*7,        'week',      '',       1,       0,
		  1000*60*60*24,         'day',      '',       1,       0,
		     1000*60*60,        'hour',      '',       1,       1,
		        1000*60,      'minute',     ':',       2,       1,
		           1000,      'second',     ':',       2,       1,
		              1, 'millisecond',     '.',       3,       1
	];

	for (var x=(maxUnit-1)*5; res>x/5; x+=5) {
		var c = cnst[x];
		var u = lng?cnst[x+1]:'';
		var s = lng?', ':cnst[x+2];
		var p = lng?1:cnst[x+3];
		var r = lng?0:cnst[x+4];

		if ((!lng && r) || (lng && ms>=c) || (!tm.length && res-1==x/5)) {

			var v = Math.floor(ms/c);

			if (tm.length) {tm[tm.length] = s;}
			tm[tm.length] = jpmc.helper.Number.pad(v,p);
			if (u) {tm[tm.length] = ' ' + u + (v!=1?'s':'');}

			ms -= c*v;
			cnt++;
		}

		if (lng && cnt===auto) {break;}

	}

	if (lng && tm.length>3) {tm[tm.length-3] = ' & ';}

	return tm.join('');
};

/**
 * @private
 */
jpmc.helper.Number.formatCore = function(num, b, m) {
	var n=Math.abs(num);
	if (n>999) {
		for (var x=1; x<9; x++) {
			var z = Math.pow(b,x*m);
			for (var y=1; y<4; y++) {
				if (n < z * Math.pow(10,y)) {
					return (num/z).toFixed(3 - y) + ' ' + ['K','M','G','T','P','E','Z','Y'][x - 1];
				}
			}
		}
	}
	return num.toFixed(0);
};
/**
 * @fileoverview Methods for managing complex js objects
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.Object = function(){};

/**
 * Creates an exact copy of an object.
 * @param {object} obj Object to clone.
 * @type object
 * @return Copy of the original object
 */
jpmc.helper.Object.clone = function(obj) {
	var clone = function(o) {
		switch(typeof o) {
			//case 'function' : return obj.toString();
			case 'unknown'  : return null;
			case 'object'   :
				if (o===null) {return null;}
				try {
					switch(o.constructor) {
						case Date  : return new Date(o.valueOf());
						case RegExp: return eval(o.toString()); //new RegExp(o.source, (o.global?'g':'') + (o.ignoreCase?'i':'') + (o.multiline?'m':''));
						case Array :
							var ca = [];
							for (var x=0; x<o.length; x++) {
								if (!x in o) {continue;}
								ca[x] = clone(o[x]);
							}
							return ca;
						default    :
							var co = {};
							for (var p in o){
								if (!o.propertyIsEnumerable(p)) {continue;}
								co[p] = clone(o[p]);
							}
							return co;

					}
				} catch(ex) {
					return null;
				}
				break;
			default: return o;
		}
		return null;
	};
	return clone(obj);
};

/**
 * Deserializes a JSON or XML string into an object.
 * @param {mixed} data A JSON or XML string to be converted.
 * @type object
 * @returns Object representation of JSON or XML string.
 * @throws {@link jpmc.lang.Exception Exception} - An exception is thrown if there is an error deserializing the string.
 */
jpmc.helper.Object.fromString = function(data) {

	var json2obj = function(str) {
		return eval('(' + data + ')');
	};

	var xml2obj = function(node) {
		var a, n;

		var add = function(nm) {
			var v = xml2obj(n);
			if (v !== undefined) {
				if (nm in obj) {
					if (!obj[nm] || obj[nm].constructor != Array) {
						obj[nm] = [obj[nm]];
					}
					var b = obj[nm];
					b[b.length] = v;
				} else {
					obj[nm] = v;
				}
			}
		};

		switch(node.nodeType) {
			case 1:  /* element */
			//case 7:  /* ProcessingInstruction */
			case 9:  /* document */
			case 11: /* document fragment */
				var obj = {};
				//Add attributes
				var attribs = node.attributes;
				for (var x=0; attribs && x<attribs.length; x++) {
					n = attribs[x];
					add('@' + n.nodeName);
				}
				//Add nodes
				for (n=node.firstChild; n!==null; n=n.nextSibling) {
					add(n.nodeName);
				}

				//ensure there is at least 1 property assigned
				for (a in obj) {
					//if #text is the only property return only a string
					if ('#text' in obj) {
						for (a in obj) {
							//if something other than #text return full object
							if (a!='#text'){return obj;}
						}
						//#text only, return text string
						return obj['#text'];
					} else {
						return obj;
					}
				}
				//no properties assigned
				return null;

			case 2: /* attribute*/
			case 3: /* text */
			case 4: /* cdata */
			case 8: /* comment */
				//don't return white space only text
				var v = node.nodeValue;
				return (/^\s*$/).test(v)?undefined:v;
			default:
				//alert([node.nodeType,node.nodeValue]);
				return undefined;
		}
	};

	try {
		if (jpmc.helper.String.isXML(data)) {
			return xml2obj(jpmc.helper.XML.fromString(data));
		} else {
			return json2obj(data);
		}
	} catch (e) {
		throw new jpmc.lang.Exception(this, 'jpmc.helper.Object.fromString', 'Invalid XML or JSON string');
	}

};

/**
 * Serializes an object into a JSON string.
 * @param {object} obj Object to converted to a text string.
 * @param {boolean} readable (Optional) Flag indicating if the string should be padded with &lt;Tab&gt; and &lt;CrLf&gt;  characters for readability.
 * @type string
 * @return JSON string that represents the object
 * @throws {@link jpmc.lang.Exception Exception} - An exception is thrown if there is an error serializing the object.
 */
jpmc.helper.Object.toString = function(obj, readable) {

	var hex_chars = jpmc.lang.Data.characterSet.HEX.split('');

	var strEscape = function(str){
		var m = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\v': '\\v',
			'\r': '\\r',
			'"' : '\\"',
			'\'' : '\\\'',
			'\\': '\\\\'
		};
		return str.replace(/([\'\"\\\x00-\x1f])/g, function(b) {
			var c = m[b];
			if (c) {return c;}
			c = b.charCodeAt();
			return '\\x' + hex_chars[(c&0xF0)>>4] + hex_chars[(c&0x0F)];
		});
	};

	var obj2json = function(obj, level) {
		var A,O,x;
		var pad=[], ar=[];
		var newLevel = (level?level+1:0);
		for (x=0; x<level; x++) {
			pad[pad.length] = '\t';
		}
		var build = function(a,b) {
			return [
				a,
				(level && ar.length)?'\n' + pad.join(''):'',
				ar.join(level?',\n'+pad.join(''):','),
				(level && ar.length)?'\n' + pad.join('').slice(1):'',
				b
			].join('');
		};
		switch(typeof obj) {
			case 'boolean'  : return obj.toString();
			case 'number'   : return isFinite(obj)?obj.toString(10):'null';
			case 'string'   : return ['"', strEscape(obj), '"'].join('');
			case 'function' : return obj.toString();
			case 'undefined': return 'undefined';
			case 'unknown'  : return 'null';
			case 'object'   :
				if (obj===null) {return 'null';}
				if (obj===window) {return 'window';}
				if (obj===document) {return 'document';}
				if (obj.ownerDocument===document) {return 'null';}
				if (obj.toJSON) {return obj.toJSON();}
				try {
					switch(obj.constructor) {
						case Date  : return 'new Date('+ obj.valueOf()+ ')';
						case RegExp: return obj.toString();
						case Array :
							for (x=0; x<obj.length; x++) {
								if (!x in obj) {continue;}
								ar[ar.length] = obj2json(obj[x], newLevel);
							}
							return build('[',']');
						default    :
							O = {};
							for (A in obj){
								if (!obj.propertyIsEnumerable(A)) {continue;}
								if (window.opera) { //some issue with opera here... yet unknown
									if (O[A]) {continue;}
									O[A] = true;
								}
								ar[ar.length] = [obj2json(A), obj2json(obj[A], newLevel)].join(':');
							}
							return build('{','}');

					}
				} catch(ex) {
					return 'null';
				}
				break;
			default: throw new jpmc.lang.Exception(this, 'jpmc.helper.Object.toString', 'Unknown Object Type: ' + typeof obj);
		}
		return 'null';
	};
	return obj2json(obj, (readable?1:0));
};
/**
 * @fileoverview Methods for managing SCRIPT tags
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.Script = function(){};

/**
 * Loads a JavaScript file from the supplied URL. This has no known cross domain issues.
 * @param {string} url The URL of the javascript file to load
 * @param {string} id The the unique id to apply to the script tag
 * @type object
 * @return The script element that was added
 */
jpmc.helper.Script.add = function(url, id) {


	var script = document.createElement('SCRIPT');
	script.type = "text/javascript";
	script.src = url;

	if (id) {
		var src = document.getElementById(id);
		if (src) {
			src.parentNode.removeChild(src);
		}
		script.id = id;
	}

	var head = document.getElementsByTagName("HEAD")[0] || document.documentElement;
	head.insertBefore(script, head.firstChild);
	return script;
};

/**
 * Executes a JavaScript string from the code passed.
 * Original code from jQuery, Inspired by code by Andrea Giammarchi
 * http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
 * @param {string} code The Javascript to be executed
 * @type void
 */
jpmc.helper.Script.eval = function(code) {

	if (jpmc.helper.String.trim(code)) {
		var script = document.createElement('SCRIPT');
		script.type = "text/javascript";

		if (jpmc.ui.Util.isIE) {
			script.text = code;
		} else {
			script.appendChild(document.createTextNode(code));
		}

		var head = document.getElementsByTagName("HEAD")[0] || document.documentElement;
		head.insertBefore(script, head.firstChild);
		head.removeChild(script);
	}
};
/**
 * @fileoverview Methods for altering and validating strings
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * @constructor
 */
jpmc.helper.String = function(){};

//String Manipulation

/**
 * Pads the begining of a string to make it a specified length.
 * @param {string} str The string to use
 * @param {number} len The length of the output after padding
 * @param {string} chr (Optional) The character to use for padding (Default: " ")
 * @type string
 * @return string padded to the requested length
 */
jpmc.helper.String.pad = function(str, len, chr) {
	var l = len-str.length;
	if(l<1){
		return str;
	} else {
		var A = [];
		for(var x=0; x<l; x++){
			A[A.length] = chr||' ';
		}
		A[A.length] = str;
		return A.join('');
	}
};

/**
 * Trims white space from the beginning of a string
 * @param {string} str The string to use
 * @type string
 * @return String with white space removed from the beginning
 */
jpmc.helper.String.trimLeft    = function(str) {return str.replace(/^\s+/g,'');};

/**
 * Trims white space from the end of a string
 * @param {string} str The string to use
 * @type string
 * @return String with white space removed from the end
 */
jpmc.helper.String.trimRight   = function(str) {return str.replace(/\s+$/g,'');};

/**
 * Trims white space from the beginning and end of a string
 * @param {string} str The string to use
 * @type string
 * @return String with white space removed from the beginning and end
 */
jpmc.helper.String.trim        = function(str) {return str.replace(/(^\s+)|(\s+$)/g,'');};

/**
 * Capitalizes all words contained in the string
 * @param {string} str The string to use
 * @type string
 * @return Capitalized string
 */
jpmc.helper.String.toTitleCase = function(str) {return str.toLowerCase().replace(/\b[a-z]|_[a-z]/g, function(s){return s.toUpperCase();});};

/**
 * Encodes a string so that it is safe to use in a url
 * @param {string} str The string to use
 * @type string
 * @return Encoded string
 */
jpmc.helper.String.urlEscape   = function(str) {return encodeURIComponent(str);};

/**
 * Decodes a string from url format
 * @param {string} str The string to use
 * @type string
 * @return Decoded string
 */
jpmc.helper.String.urlUnescape = function(str) {return decodeURIComponent(str.replace(/\+/g,' '));};

/**
 * Encodes a string so that it is safe to use in a web page
 * @param {string} str The string to use
 * @type string
 * @return Escaped string
 */
jpmc.helper.String.htmlEscape  = function(str) {return str.replace(/[<>&]/g,function(a){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[a];});};

/**
 * Tests the string to ensure it contains only alpha characters
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isAlpha     = function(str) {return str.search(/[^a-z]/i)===-1;};

/**
 * Tests the string to ensure it contains only numeric characters
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isNumeric   = function(str) {return str.search(/[^0-9]/i)===-1;};

/**
 * Tests the string to ensure it contains only alpha and numeric characters
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isAlphaNumeric = function(str) {return str.search(/[^a-z0-9]/i)===-1;};

/**
 * Tests the string to ensure it matches a valid email pattern
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isEmail        = function(str) {return str.search(/^[a-z0-9,!#\$%&\'\*\+\/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&\'\*\+\/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$/i)===0;};

/**
 * Tests the string to ensure it matches a valid URL pattern
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isURL          = function(str) {return str.search(/^(file|ftp|http|https):\/\/((.*?)(:(.*?))?@)?([a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,}))?(:([0-9]+))?(\/.+?)?(\?.+?)?(#.+)?$/i)===0;};

/**
 * Tests the string to ensure it is a valid bar code.<br>
 * Supported formats:
 * <ul>
 * <li>UPC-A (Universal Product Code)</li>
 * <li>EAN-8, EAN-13, EAN-14 (European Article Number)</li>
 * <li>UCC-8 UCC-12 (Uniform Commercial Code)</li>
 * <li>ISBN-10 ISBN-13 (International Standard Book Number)</li>
 * <li>SSCC-18 (Serial Shipping Container Code)</li>
 * <li>GTIN (Global Trade Item Number)</li>
 * </ul>
 * Other could be added on request
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isBarCode          = function(str) {
	//Turn string into char array
	var digits = str.toString().replace(/[^\dx]/gi,'').toUpperCase().split('');
	var len = digits.length;
	//init vars
	var even = 0;
	var odd = 0;
	var calc = 0;
	//convert to number characters to real numbers
	//calculate misc things
	for (var x=0; x<len-1; x++) {
		if (!isNaN(digits[x])) {
			digits[x] = parseInt(digits[x],10);
			if (x&1) {
				even+=digits[x];
			} else {
				odd+=digits[x];
			}
			calc += digits[x] * (10-x);
		}
	}
	//capture check digit
	var checksum = digits[len-1];
	//calculate check digit
	switch (len) {
		case 10: // ISBN-10
			calc = calc % 11;
			calc = calc ? 11 - calc : 0;
			calc = calc===10 ? 'X' : calc;
			break;
		case 8: // EAN-8 (UCC-8)
		case 12: // UPC-A (UCC-12)
		case 14: // EAN-14 (SCC-14), GTIN
		case 18: // SSCC-18
			calc = (odd*3 + even) % 10;
			calc = calc ? 10 - calc : 0;
			break;
		case 13: // EAN-13 (UCC-13), ISBN-13
			calc = (even*3 + odd) % 10;
			calc = calc ? 10 - calc : 0;
			break;
		default:
			return false;
	}
	//validate check digit
	return checksum == calc;
};

/**
 * Tests the string to ensure it matches a valid XML pattern
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isXML          = function(str) {return (/^\s*</).test(str) && (/>\s*$/).test(str);};

/**
 * Tests the string to ensure it is a valid state code
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isStateCode    = function(str) {return (str.search(/^(AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|AE|AA|AE|AE|AP)$/i)===0);};

/**
 * Tests the string to ensure it is a valid zip code
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isZipCode      = function(str) {return str.search(/^\d{5}([- ]\d{4})?$/i)===0;};

/**
 * Tests the string to ensure it matches a valid social security number pattern
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isSSN          = function(str) {if (str.search(/^000[ -]?\d{2}[ -]?\d{4}$/) != -1) {return false;}if (str.search(/^\d{3}[ -]?00[ -]?\d{4}$/) != -1) {return false;}if (str.search(/^\d{3}[ -]?\d{2}[ -]?0000$/) != -1) {return false;}return str.search(/^\d{3}[ -]?\d{2}[ -]?\d{4}$/) != -1;};

/**
 * Tests the string to ensure it passes the credit card test algorithm
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isCreditCard   = function(str) {
	//Luhn algorithm
	//Turn string into char array
	var digits = str.toString().replace(/\D/g,'').split('');
	var len = digits.length;
	//Dummy Check
	if (len > 19 || len < 13) {return false;}
	var sum = 0;
	for (var x=1; x<len; x++) {
		var digit = parseInt(digits[len-1-x],10);
		// Double all the odd digits
		if (x%2!==0) {digit *= 2;}
		// Combine digits.  i.e., 16 = (1 + 6) = 7
		if (digit>9) {digit -= 9;}
		// Keep track of sum
		sum += digit;
	}
	//Amount needed to make sum a multiple of 10
	var chkCalc = (10-(sum%10))%10;
	//Get Check Digit
	var chkDigi = parseInt(digits[len-1],10);
	//Validate
	return (chkCalc == chkDigi);
};


/**
 * Tests the string to ensure it passes the ABA number test algorithm
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isABA          = function(str) {
	if (str.search(/^[0-9]{9}$/)===-1) {return false;}
	var n = 0;
	for (var i=0; i<str.length; i+=3) {
		n += parseInt(str.charAt(i),10) * 3 + parseInt(str.charAt(i+1),10) * 7 + parseInt(str.charAt(i+2),10);
	}
	return (n!==0 && n%10===0);
};


/**
 * Tests the string to ensure it passes the VIN test algorithm
 * @param {string} str The string to use
 * @type boolean
 */
jpmc.helper.String.isVIN          = function(str) {
	//VIN Pattern Check
	if (str.search(/^[A-HJ-NPR-Z0-9]{8}[X0-9][A-HJ-NPR-TV-Y0-9][A-HJ-NPR-Z0-9]{7}$/)===-1) {return false;}
	//Initialize Vectors
	var aWeight = [8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];
	var aValue = [0,1,2,3,4,5,6,7,8,9,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,0,7,0,9,2,3,4,5,6,7,8,9];
	var nCheck = 0;
	var sVIN = str.toUpperCase();
	var sCheck = sVIN.charAt(8);
	for (var x=0; x<17; x++) {
		nCheck += aValue[sVIN.charCodeAt(x)-48] * aWeight[x];
	}
	nCheck = nCheck % 11;
	if (sCheck == 'X') {
		return nCheck == 10;
	} else {
		return nCheck == parseInt(sCheck,10);
	}
};
/**
 * @fileoverview Methods and constants for converting from one unit of measure to another
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * @constructor
 */
jpmc.helper.Unit = function(){};


/**
 * Converts a number from one unit of measure to another
 * @param {number} value The number in the from units.
 * @param {number} from The unit constant that represents the current unit of measure for the value passed in.
 * @param {number} to The unit constant that represents the desired output unit of measure.
 * @type number
 * @return Value represented by the the new unit.
 */
jpmc.helper.Unit.convert = function(value, from, to) {

	//Convert Temperature
	if (from < 0 && to < 0) {
		var unit = 0;
		//to kelvin
		switch(from) {
			case jpmc.helper.Unit.temperature.celsius:      unit = value + 273.15; break;
			case jpmc.helper.Unit.temperature.fahrenheit:   unit = (value - 32) / 1.8 + 273.15; break;
			case jpmc.helper.Unit.temperature.rankine:      unit = value / 1.8; break;
			case jpmc.helper.Unit.temperature.reaumur:      unit = value * 1.25 + 273.15; break;
			case jpmc.helper.Unit.temperature.kelvin:       unit = value; break;
			case jpmc.helper.Unit.temperature.electronvolt: unit = value * 11604.5; break;
			default:return 0;
		}
		if (unit<0) {unit=0;}
		//from kelvin
		switch(to) {
			case jpmc.helper.Unit.temperature.celsius:      unit = unit - 273.15; break;
			case jpmc.helper.Unit.temperature.fahrenheit:   unit = (unit - 273.15) * 1.8 + 32; break;
			case jpmc.helper.Unit.temperature.rankine:      unit = unit * 1.8; break;
			case jpmc.helper.Unit.temperature.reaumur:      unit = (unit - 273.15) / 1.25; break;
			case jpmc.helper.Unit.temperature.kelvin:       break;
			case jpmc.helper.Unit.temperature.electronvolt: unit = unit / 11604.5; break;
			default:return 0;
		}
		//nice rounding
		var l = Math.floor(unit);
		var r = unit - l;
		return l + Math.round(r *10000000)/10000000;

	//Convert All Other
	} else if (from > 0 && to > 0) {
		return Math.round(value * from / to * 10000000)/10000000;
	//Unknown
	} else {
		return 0;
	}
};

/**
 * @constructor
 */
jpmc.helper.Unit.angle = function(){};
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.radian             = 1;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.mil                = Math.PI/3200;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.grad               = Math.PI/200;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.degree             = Math.PI/180;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.second             = Math.PI/(180*3600);
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.minute             = Math.PI/(180*60);
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.point              = Math.PI/16;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.angle.circle             = Math.PI*2;


/**
 * @constructor
 */
jpmc.helper.Unit.area = function(){};
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.area.acre                = 0.09290304*43560;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.area.hectare             = 10000;


/**
 * @constructor
 */
jpmc.helper.Unit.distance = function(){};
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.millimeter        = 0.001;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.centimeter        = 0.01;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.meter             = 1;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.kilometer         = 1000;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.nauticalMile      = 1852;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.inch              = 0.3048/12;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.foot              = 0.3048;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.yard              = 0.9144;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.mile              = 0.3048*5280;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.distance.league            = 4828.0417;


/**
 * @constructor
 */
jpmc.helper.Unit.temperature = function(){};
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.temperature.celsius      = -1;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.temperature.fahrenheit   = -2;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.temperature.rankine      = -3;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.temperature.reaumur      = -4;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.temperature.kelvin       = -5;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.temperature.electronvolt = -6;


/**
 * @constructor
 */
jpmc.helper.Unit.time = function(){};
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.millisecond         = 0.001;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.second              = 1;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.minute              = 60;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.hour                = 3600;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.day                 = 86400;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.week                = 604800;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.month               = 2628000;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.time.year                = 31536000;


/**
 * @constructor
 */
jpmc.helper.Unit.volume = function(){};
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.bushel            = 0.0044048838*8;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.cup               = 0.0037854118/16;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.gallon            = 0.0037854118;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.liter             = 0.001;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.peck              = 0.0044048838*2;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.pint              = 0.0037854118/8;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.quart             = 0.0037854118/4;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.tablespoon        = 0.0037854118/128/2;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.volume.teaspoon          = 0.0037854118/128/6;


/**
 * @constructor
 */
jpmc.helper.Unit.weight = function(){};
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.weight.milligram         = 0.000001;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.weight.gram              = 0.001;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.weight.kilogram          = 1;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.weight.tonne             = 1000;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.weight.ounce             = 0.45359237/16;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.weight.pound             = 0.45359237;
/**
 * @final
 * @type number
 */
jpmc.helper.Unit.weight.ton               = 0.45359237*2000;
/**
 * @fileoverview Methods for altering and managing xml data
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Static object
 * @constructor
 */
jpmc.helper.XML = function(){};

/**
 * Escape XML special markup characters: tag delimiter < > and entity
 * reference start delimiter &. The escaped string can be used in XML
 * text portions (i.e. between tags).
 * @param {string} text The string to escape
 * @type string
 * @return An XML friendly version of the string
 */
jpmc.helper.XML.escape = function(text) {
	var esc = {
		'&':'&amp;',
		'<':'&lt;',
		'>':'&gt;',
		'"':'&quot;',
		'\'':'&apos;',
		'\t':'\t',
		'\n':'\n',
		'\r':'\r'
	};
	return text.replace(/[&<>\"\'\x00-\x1F]/g, function(a) {
			if (esc[a]) {
				return esc[a];
			} else {
				return '&#' + a.charCodeAt(0).toString(16) + ';';
			}
		}
	);
};

/**
 * Converts an XML string to an XML document
 * @param {string} xml The string to convert
 * @type object
 * @return An XML document object populated from the string
 */
jpmc.helper.XML.fromString = function(xml) {
	var doc;
	try {
		if (!jpmc.helper.String.isXML(xml)) {
			//no good
		} else if (window.DOMParser) {
			// code for Mozilla, Firefox, Opera, etc.
			var parser = new DOMParser();
			doc = parser.parseFromString(xml, "text/xml");
		} else if (window.ActiveXObject) {
			// code for IE
			doc = jpmc.helper.XML.getXMLDOM();
			doc.async="false";
			doc.loadXML(xml);
		}
	} catch(ex) {}
	return doc;
};

/**
 * Serialize an XML Document or Element and return it as a string.
 * @param {object} node The XML Document or Element to serialize
 * @type string
 * @return An string representation of the XML Document or Element
 */
jpmc.helper.XML.toString = function(node) {
	if (typeof XMLSerializer != "undefined") {
		return (new XMLSerializer()).serializeToString(node);
	} else if (node.xml) {
		return node.xml;
	} else {
		return '';
	}
};

/**
 * Loads a URL into an XML document
 * @param {string} url The url of the XML data
 * @type object
 * @return An XML document object populated from the string
 */
jpmc.helper.XML.fromURL = function(url) {
	var doc;
	try {
		if (window.ActiveXObject) {
			doc = jpmc.helper.XML.getXMLDOM();
			doc.async="false";
			doc.load(url);
		} else {
			//Create ajax object
			var ajax = jpmc.helper.XML.getXMLHTTP();
			//Request XML from URL
			ajax.open('GET', url, false);
			ajax.send(null);
			//Save XML object
			doc = ajax.responseXML;
		}
		/*
		if (document.implementation && document.implementation.createDocument) {
			// code for Mozilla, Firefox, Opera, etc.
			doc = document.implementation.createDocument("","",null);
			doc.onload = function(){};
			doc.load(url);
		}*/
	} catch(ex) {}
	return doc;
};

/**
 * @private
 */
jpmc.helper.XML.xmldom = null;

/**
 * @private
 */
jpmc.helper.XML.getXMLDOM = function() {
	var progids = ['MSXML2.DOMDocument.7.0','MSXML2.DOMDocument.6.0','MSXML2.DOMDocument.5.0','MSXML2.DOMDocument.4.0','MSXML2.DOMDocument.3.0','MSXML2.DOMDocument','MSXML.DOMDocument','Microsoft.XMLDOM',null];
	if (jpmc.helper.XML.xmldom) {
		// code for IE (cached)
		return new ActiveXObject(jpmc.helper.XML.xmldom);
	} else if (window.ActiveXObject) {
		// code for IE
		for (var i=0; i<progids.length; i++) {
			try {
				jpmc.helper.XML.xmldom = progids[i];
				return new ActiveXObject(progids[i]);
			} catch(ex) {}
		}
	}
	return null;
};

/**
 * @private
 */
jpmc.helper.XML.xmlhttp = null;

/**
 * @private
 */
jpmc.helper.XML.getXMLHTTP = function() {
	var progids = ['Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0','Msxml2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP',null];
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.createRequest) {
		return window.createRequest();
	} else if (jpmc.helper.XML.xmlhttp) {
		return new ActiveXObject(jpmc.helper.XML.xmlhttp);
	} else if (window.ActiveXObject) {
		for (var i=0; i<progids.length; i++) {
			try {
				jpmc.helper.XML.xmlhttp = progids[i];
				return new ActiveXObject(progids[i]);
			} catch(ex) {}
		}
	}
	return null;
};


/**
 * Extracts the text from a DOM node, recursing if necessary.
 * @param {object} node The XML Document or Element to serialize
 * @type string
 * @return The text contained within the DOM node.
 */
jpmc.helper.XML.getText = function(node) {
	if (!node) {return '';}
	switch(node.nodeType) {
		case 1: /* element */
		case 9: /* document */
		case 11: /* document fragment */
			var s = [];
			for(var c=node.firstChild; c!==null; c=c.nextSibling) {
				s[s.length] = jpmc.helper.XML.getText(c);
			}
			return s.join('');
		case 2: /* attribute*/
		case 3: /* text */
		case 4: /* cdata */
			return node.nodeValue;
		default:
			return '';
	}
};

/**
 * Evaluates the XPath expression in the specified context.
 * @param {object} context This should be a Document or Element object.
 * @param {string} xpathText The XPath expression to be evaluated on the context object.
 * @param {object} namespaces (optional) If the XPath expression includes any XML namespaces, this must be a JavaScript object that maps namespace prefixes to the URLs that define those namespaces. {prefix1:url1,prefix2:url2,...}
 * @type object[]
 * @return An array or array-like object containing the nodes that match the expression.
 */
jpmc.helper.XML.getNodes = function(context, xpathText, namespaces) {
	try {
		// We need the Document object to specify namespaces
		var doc = context.ownerDocument;
		// If the context doesn't have ownerDocument, it is the Document
		if (doc === null) {doc = context;}

		if (window.XPathResult) {
			// W3C-compliant browser, get node set in original document order
			var result = doc.evaluate(xpathText, context, function(p) {return namespaces[p];}, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			// Copy the results we get into an array.
			var a = [];
			for(var i = 0; i < result.snapshotLength; i++) {
				a[i] = result.snapshotItem(i);
			}
			return a;
		} else {
			var N = [];
			// Convert the namespaces object into the textual form that IE requires.
			if (namespaces) {
				for(var prefix in namespaces) {
					N[N.length] = 'xmlns:' + prefix + '="' + namespaces[prefix] + '"';
				}
			}
			// This is IE-specific magic to specify prefix-to-URL mapping
			doc.setProperty("SelectionLanguage", "XPath");
			doc.setProperty("SelectionNamespaces", N.join(' '));
			// In IE, the context must be an Element not a Document,
			// so if context is a document, use documentElement instead
			if (context == doc) {context = doc.documentElement;}
			// Now use the IE method selectNodes() to evaluate the expression
			return context.selectNodes(xpathText);
		}
	} catch(ex) {
		//alert(ex.message);
		// If the IE API doesn't work, we just give up
		throw {message:"XPath not supported by this browser."};
	}
};

/**
 * Evaluates the XPath expression in the specified context and returns a single matching node (or null if no node matches).
 * @param {object} context This should be a Document or Element object.
 * @param {string} xpathText The XPath expression to be evaluated on the context object.
 * @param {object} namespaces (optional) If the XPath expression includes any XML namespaces, this must be a JavaScript object that maps namespace prefixes to the URLs that define those namespaces. {prefix1:url1,prefix2:url2,...}
 * @type object
 * @return The first node that matches the XPath expression (or null if no node matches).
 */
jpmc.helper.XML.getNode  = function(context, xpathText, namespaces) {
	try {
		// We need the Document object to specify namespaces
		var doc = context.ownerDocument;
		// If the context doesn't have ownerDocument, it is the Document
		if (doc === null) {doc = context;}

		if (window.XPathResult) {
			// W3C-compliant browser, just get first match
			var result = doc.evaluate(xpathText, context, function(p) {return namespaces[p];}, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			return result.singleNodeValue;
		} else {
			var N = [];
			// Convert the namespaces object into the textual form that IE requires.
			if (namespaces) {
				for(var prefix in namespaces) {
					N[N.length] = 'xmlns:' + prefix + '="' + namespaces[prefix] + '"';
				}
			}
			// This is IE-specific magic to specify prefix-to-URL mapping
			doc.setProperty("SelectionLanguage", "XPath");
			doc.setProperty("SelectionNamespaces", N.join(' '));
			// In IE, the context must be an Element not a Document,
			// so if context is a document, use documentElement instead
			if (context == doc) {context = doc.documentElement;}
			// In IE call selectSingleNode instead of selectNodes
			return context.selectSingleNode(xpathText);
		}
	} catch(ex) {
		//alert(ex.message);
		// If the IE API doesn't work, we just give up
		throw {message:"XPath not supported by this browser."};
	}
};

/**
 * This is an XSLT utility function that is useful when a stylesheet is used only once.
 * @param {mixed} node The XML document, XML string or URL that contains the data for the XSL transformation.
 * @param {mixed} stylesheet The XSL stylesheet, XML string or URL to use for the transformation.
 * @param {mixed} element (Optional) The HTML element to use as a parent container for the transformation. May be the string ID of the HTML element, or the actual HTML element.
 * @type string
 * @return The HTML output of the transformation.
 */
jpmc.helper.XML.transform = function(node, stylesheet, element) {

	// Load XML data if necessary.
	if (typeof node == "string") {
		if (jpmc.helper.String.isXML(node)) {
			node = jpmc.helper.XML.fromString(node);
			//if (node.documentElement) {node = node.documentElement;}
		} else {
			node = jpmc.helper.XML.fromURL(node);
		}
	}

	// Load the stylesheet if necessary.
	if (typeof stylesheet == "string") {
		if (jpmc.helper.String.isXML(stylesheet)) {
			stylesheet = jpmc.helper.XML.fromString(stylesheet);
			//if (stylesheet.documentElement) {stylesheet = stylesheet.documentElement;}
		} else {
			stylesheet = jpmc.helper.XML.fromURL(stylesheet);
		}
	}

	var html = '';

	if (typeof XSLTProcessor != "undefined") {
		// In Mozilla-based browsers, create an XSLTProcessor object
		// and tell it about the stylesheet.
		var processor = new XSLTProcessor();
		processor.importStylesheet(stylesheet);
		// If we've created an XSLTProcessor (i.e., we're in Mozilla) use it.
		// Transform the node into a DOM DocumentFragment.
		var fragment = processor.transformToFragment(node, document);
		html = jpmc.helper.XML.toString(fragment);

	} else if ("transformNode" in node) {
		// If the node has a transformNode() function (in IE), use that.
		// Note that transformNode() returns a string.
		html = node.transformNode(stylesheet).replace(/^<\?xml.*?\?>/i,'');

	} else {
		// Otherwise, we're out of luck.
		throw {message:"XSLT is not supported in this browser"};
	}

	if (element) {jpmc.ui.Util.getObject(element).innerHTML = html;}

	return html;

};
/**
 * @fileoverview Common data constants and methods
 * @author Ben White (ben.x.white@jpmchase.com)
 */


/**
 * Data constants used in the framework.<br>
 * @constructor
 */
jpmc.lang.Data = function(){};

/**
 * Enum of different character sets used throught the framework.
 * <ul>
 * <li>HEX - 16 unique characters (0-9a-f)</li>
 * <li>BASE16 - 16 unique characters (0-9A-F) as defined by RFC 3548</li>
 * <li>BASE32 - 32 unique characters (a-z2-7+/) as defined by RFC 3548</li>
 * <li>BASE64 - 64 unique characters (A-Za-z0-9+/) as defined by RFC 3548</li>
 * <li>BASE85 - 85 unique characters as defined by RFC 1924</li>
 * <li>BASE95 - All 95 readable ascii characters</li>
 * </ul>
 * @type enum
 * @final
 */
jpmc.lang.Data.characterSet = {
	HEX: '0123456789abcdef',
	BASE16: '0123456789ABCDEF',
	BASE32: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567+/',
	BASE64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	BASE85: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~',
	BASE95: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
};

/**
 * Enum of data formats used by many classes in the framework.
 * <ul>
 * <li>BINARY - Array of numbers</li>
 * <li>HEX - String of HEX ASCII</li>
 * <li>TEXT - Plain text (ASCII string)</li>
 * <li>BIG_ENDIAN - Array of big-endian multi-byte numbers (32bit)</li>
 * <li>LITTLE_ENDIAN - Array of little-endian multi-byte numbers (32bit)</li>
 * </ul>
 * @type enum
 * @final
 */
jpmc.lang.Data.format = {
	BINARY:           2,
	HEX:             16,
	TEXT:           256,
	BIG_ENDIAN:    1024,
	LITTLE_ENDIAN: 2048
};

/**
 * Deprecated, use {@link jpmc.lang.Data#format}
 * @deprecated
 * @type enum
 * @final
 */
jpmc.lang.Data.Type = jpmc.lang.Data.format;
/**
 * @fileoverview Common exception object
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Basic error class
 * @constructor
 * @class Basic error class
 */
jpmc.lang.Exception = function(thrower, source, description, type){

	/**
	 * Contains the source of the exception
	 * @type string
	 */
	this.source = source;

	/**
	 * Contains the detailed description of the exception
	 * @type string
	 */
	this.description = description;

	/**
	 * Contains the detailed description of the exception
	 * @type string
	 */
	this.message = description;

	/**
	 * Contains the type of the exception that occured
	 * @type string
	 */
	this.type = type;

	/**
	 * Returns a summary of the exception event
	 * @type string
	 * @return string
	 */
	this.toString = function() {
		var className = this.throwerClassName();
		return  (className===''?'':className + '.') + this.source + ' --> ' + (this.type?this.type:'Exception') + ': ' + this.description;
	};

	this.thrower = thrower;

	this.throwerClassName = function() {
		if (typeof jpmc.lang.Util == 'undefined') {return '';}
		return jpmc.lang.Util.getClassName(thrower);
	};

};
/**
 * @fileoverview Common framework specific information
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * A static class that contains informational properties and methods.
 * @constructor
 */
jpmc.lang.Info = function(){};

/**
 * The version of the jpmc framework
 * @type string
 * @final
 */
jpmc.lang.Info.version = '1.0.15';

/**
 * Checks if the framework version is equal or greater than min version
 * @param {string} minVersion The minimum version to compare to
 * @type boolean
 * @returns Flag indicating if the current version is greater than or equal to the min version
 */
jpmc.lang.Info.checkVersion = function(minVersion) {
	var aCur = jpmc.lang.Info.version.split('.');
	var aMin = minVersion.split('.');
	for (var x=0; x<aMin.length && x<aCur.length; x++) {
		if (parseInt(aCur[x],10) < parseInt(aMin[x],10)) {
			return false;
		}
	}
	return true;

};
/**
 * @fileoverview Code for all serializable objects.
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Serializable interface
 * @class Provides the highest level of abstraction for Serializable objects.
 *   Every implementation of the Serializable interface provides the ability
 *   to serialize and deserialize itself.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 */
jpmc.lang.Serializable = function(){

	var m_pri_data = {};

	/**
	 * Gets the object that is directly serialized/deserialized
	 * @type object
	 * @return Object that is serialized/deserialized
	 * @ignore
	 */
	this.getPrivateObject = function() {
		return m_pri_data;
	};

	/**
	 * Serializes the class into a text string.
	 * @type string
	 * @return JSON string that represents this object instance
	 * @throws {@link jpmc.lang.Exception Exception} - An exception is thrown if there is an error serializing the object.
	 */
	this.toString = function() {
		//Find classname
		jpmc.lang.Util.getClassName(this);
		//Create object to serialize
		var pub = {};
		for (var A in this) {if (typeof this[A] != 'function') {pub[A] = this[A];}}
		var obj = {_pub:pub,_pri:m_pri_data};
		//Check for pre-process function
		if (typeof this.before_toString == 'function') {this.before_toString(obj._pri);}
		//Serialize Object
		return jpmc.helper.Object.toString(obj);
	};

	/**
	 * Restores the object instance from a text string.
	 * @param {string} str JSON string to converted to an object.
	 * @type void
	 * @throws {@link jpmc.lang.Exception Exception} - An exception is thrown if there is an error deserializing the string.
	 */
	this.fromString = function(string) {
		//Deserialize the object
		var obj = jpmc.helper.Object.fromString(string);
		//Restore public settings
		for (var A in obj._pub) {this[A] = obj._pub[A];}
		//Restore private settings
		m_pri_data = obj._pri;
		//Check for post-process function
		if (typeof this.after_fromString == 'function') {this.after_fromString(obj._pri);}
	};

};
/**
 * @fileoverview Common framework specific methods
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * A static class that contains useful methods and properties.
 * @class A static class that contains useful methods and properties.<br>
 * @constructor
 */
jpmc.lang.Util = function(){};

/**
 * Imports all of the objects, properties, functions, etc...
 * @param {object} namespace The namespace to be imported
 * @type void
 */
jpmc.lang.Util.imports = function(namespace) {
	for (var A in namespace) {
		if (window[A]) {continue;}
		window[A] = namespace[A];
	}
};

/**
 * Enumerates through every item in a collection (IE Only!)
 * @param {object} collection The collection to be enumerated
 * @param {function} handler The function that will be called for each item in the collection. function(item) {};
 * @type void
 */
jpmc.lang.Util.enumerate = function(collection, handler) {
	var e = new Enumerator(collection);
	for (; !e.atEnd(); e.moveNext()) {
		handler(e.item());
	}
};

/**
 * Converts a marshaled object from a string back into an object
 * @param {string} data The string representation of the object
 * @type mixed
 * @returns An instance of the object represented by the string
 */
jpmc.lang.Util.unmarshal = function(data) {
	var mObj = null;
	var obj = jpmc.helper.Object.fromString(data);
	if (obj._pub && obj._pub.className) {
		mObj = eval('new ' + obj._pub.className + '()');
		if (typeof mObj.fromString == 'function') {
			mObj.fromString(data);
		}
	}
	return mObj;
};

/**
 * Gets the name of an object's property that matches the value passed in
 * @param {object} obj A static enum object.
 * @param {mixed} val The value to identify.
 * @type string
 * @returns The name of the object's property in string format
 */
jpmc.lang.Util.getPropertyName = function(obj, val) {
	for (var A in obj) {
		if (obj[A] == val) {return A;}
	}
	return 'Unknown';
};

/**
 * Gets the className attribute for the object
 * @param {object} object The object who's className is to be determined
 * @type string
 * @returns The name of the class is returned
 */
jpmc.lang.Util.getClassName = function(object) {

	var common = function(object) {
		if (object==window) {return 'window';}
	};

	var jpmcSearch = function(object,path) {
		try{
			//known black hole
			if (path == 'jpmc.ui.Util.attachEvent.handlers') {return undefined;}
			//check for loops
			var css = path.slice(path.lastIndexOf('.'));
			if (path.indexOf(css + '.') !== -1) {return undefined;}
			//search for match
			var obj = eval(path);
			for (var cls in obj) {
				if (obj == obj[cls]) {continue;}
				switch (typeof obj[cls]) {
					case 'function':
						if (object.constructor == obj[cls]) {return path + '.' + cls;}
					case 'object':
						if (object == obj[cls]) {return path + '.' + cls;}
						var str = jpmcSearch(object, path + '.' + cls);
						if (str !== undefined) {return str;}
						break;
					default:break;
				}
			}
		} catch(ex){}
		return undefined;
	};

	var constructorSearch = function(object) {
		if (typeof(object.constructor) == 'undefined') {return undefined;}
		(/function\s+(\w*)\s*\(/ig).exec(object.constructor.toString());
		var name = RegExp.$1;
		return (name.length >0)?name:undefined;
	};

	var unknown = function(object) {
		return 'Unknown';
	};

	var x=0;
	var methods = [common, jpmcSearch, constructorSearch, unknown];
	while (typeof object.className != 'string') {
		object.className = methods[x](object,'jpmc');
		x++;
	}
	return object.className;

};

/**
 * Stores the names of the classes that are dynamically loaded
 * @type string[]
 */
jpmc.lang.Util.loadedClasses = [];


/**
 * Gets the relative url path of the javascript library
 * @param {string} refTagID (Optional) The ID of the script tag to use as the base URL for loading new classes (default: "jpmc_api")
 * @type string
 * @returns The relative url path of the javascript library
 */
jpmc.lang.Util.getBaseURL = function(refTagID) {
	//Get the api core script tag
	var s = document.getElementById(refTagID || 'jpmc_api');
	if (!s) {throw {message:'Please set the script tag\'s "id" attribute to "jpmc_api"'};}
	var url = s.src.replace(/[a-z\-\._?=%0-9]+$/i, '');
	return url;
};


/**
 * Dynamically loads the clases not included in the core release
 * @param {string} className The name of the class to be returned
 * @param {object[]} args The arguments to be passed to the class when instantiated
 * @param {string} refTagID (Optional) The ID of the script tag to use as the base URL for loading new classes (default: "jpmc_api")
 * @type object
 * @returns A new instance of the class
 */
jpmc.lang.Util.loadClass = function(className, args, refTagID) {
	try {

		//Create url to load extended class from
		var packName = className.replace(/\./g,'/');
		var url = jpmc.lang.Util.getBaseURL(refTagID) + packName+'.js';

		//Save original class code
		var orgCode = window;
		className.replace(/(^|\.)([^\.]+)/gi,function(a,b,c) {orgCode = orgCode[c];});

		//Create ajax object
		var ajax = jpmc.helper.XML.getXMLHTTP();

		//Get code for requested class
		ajax.open('GET', url, false);
		ajax.send(null);

		//Load code
		//if (jpmc.ui.Util.isIE) {
		//	jpmc.helper.Script.eval(ajax.responseText);
		//} else {
			eval(ajax.responseText);
		//}

		//Get new class code
		var newCode = window;
		className.replace(/(^|\.)([^\.]+)/gi,function(a,b,c) {newCode = newCode[c];});

		//Ensure class code is new
		if (newCode == orgCode) {throw {message:'Unable to dynamically load ' + className};}

		//Save each class name for reporting and load optimization
		jpmc.lang.Util.loadedClasses[jpmc.lang.Util.loadedClasses.length] = className;

		//Create new instance of the class
		return newCode.apply(this, args);

	} catch(ex) {
		alert('Just in time class loader error:\nClassName: ' + className + '\nArguments:' + Array.apply(this,args).join(',') + '\nDescription: ' +ex.message);
	}
	return null;
};

/**
 * Dynamically loads clases not included in the core release based on last time the page was viewed.
 * @param {number} days (Optional) The number of days to remember the classes to load
 * @type void
 */
jpmc.lang.Util.preloadClasses = function(days) {

	var saveDynamicClasses = function() {
		var cookies = new jpmc.net.Cookie();
		if (jpmc.lang.Util.loadedClasses.length>0) {
			days = isNaN(days)?30:days;
			cookies.create('jpmc_lang_util_classLoad', jpmc.lang.Util.loadedClasses.join(','), days);
		} else {
			cookies.remove('jpmc_lang_util_classLoad');
		}
	};

	var cookies = new jpmc.net.Cookie();
	if (cookies.exists('jpmc_lang_util_classLoad')) {
		var str = unescape(cookies.item('jpmc_lang_util_classLoad'));
		var cls = str.split(',');
		for (var x=0; x<cls.length; x++) {
			try {
				var tmp = eval('new ' + cls[x] + '();');
			} catch(ex) {}
		}
	}

	jpmc.ui.Util.attachEvent(window, 'onunload', saveDynamicClasses);
};
/**
 * @fileoverview Code for a simple box object
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.ui.Box class
 * @class A class that creates an instance of the jpmc.ui.Box class.<br>
 * @constructor
 * @extends jpmc.lang.Serializable
 * @param {number} left (Optional) The X coordinate of the box (default 0).
 * @param {number} top (Optional) The Y coordinate of the box (default 0).
 * @param {number} width (Optional) The width of the box (default 0).
 * @param {number} height (Optional) The height of the box (default 0).
 */
jpmc.ui.Box = function(left, top, width, height) {

	//Extend the jpmc.lang.Serializable class
	jpmc.lang.Serializable.apply(this, arguments);

	/**
	 * Sets or retrieves the Y coordinate of the box.
	 * @type number
	 */
	this.top = top||0;
	/**
	 * Sets or retrieves the X coordinate of the box.
	 * @type number
	 */
	this.left = left||0;
	/**
	 * Sets or retrieves the width of the box.
	 * @type number
	 */
	this.width = width||0;
	/**
	 * Sets or retrieves the height of the box.
	 * @type number
	 */
	this.height = height||0;

};

/**
 * A static class that contains transformation methods.
 * @class A static class that contains transformation methods.<br>
 * @constructor
 */
jpmc.ui.EffectTransform = function(){};

/**
 * This method will return a value that reflects the location based in the percent value passed in.
 * @param {number} p The location the the transformation in percent. (0->1.00)
 * @param {number} s The starting value of the transformation.
 * @param {number} e The ending value of the transformation.
 * @type number
 * @returns A value somewhere between the start and the end values passed in
 */
jpmc.ui.EffectTransform.linear = function(p, s, e) {
	return s + Math.round((e - s) * p);
};

/**
 * This method will return a value that reflects the location based in the percent value passed in.
 * @param {number} p The location the the transformation in percent. (0->1.00)
 * @param {number} s The starting value of the transformation.
 * @param {number} e The ending value of the transformation.
 * @type number
 * @returns A value somewhere between the start and the end values passed in
 */
jpmc.ui.EffectTransform.bounce = function(p, s, e) {

	var diff = e-s;
	var rad = Math.PI/180;
	var peak = diff;
	if (p>0.2) {peak /= 3;}
	if (p>0.6) {peak /= 3;}

	return s + diff - Math.round(peak * Math.abs(Math.cos(450 * p * rad)));
};

/**
 * This method will return a value that reflects the location based in the percent value passed in.
 * @param {number} p The location the the transformation in percent. (0->1.00)
 * @param {number} s The starting value of the transformation.
 * @param {number} e The ending value of the transformation.
 * @type number
 * @returns A value somewhere between the start and the end values passed in
 */
jpmc.ui.EffectTransform.random = function(p, s, e) {
	return s + Math.round(Math.random() * (e - s) * p);
};

/**
 * This method will return a value that reflects the location based in the percent value passed in.
 * @param {number} p The location the the transformation in percent. (0->1.00)
 * @param {number} s The starting value of the transformation.
 * @param {number} e The ending value of the transformation.
 * @type number
 * @returns A value somewhere between the start and the end values passed in
 */
jpmc.ui.EffectTransform.smooth = function(p, s, e) {
	var diff = e-s;
	var rad = Math.PI/180;
	return s + Math.round( diff * (Math.sin( (180 * p - 90) * rad ) / 2 + 0.5) );
};

/**
 * This method will return a value that reflects the location based in the percent value passed in.
 * @param {number} p The location the the transformation in percent. (0->1.00)
 * @param {number} s The starting value of the transformation.
 * @param {number} e The ending value of the transformation.
 * @type number
 * @returns A value somewhere between the start and the end values passed in
 */
jpmc.ui.EffectTransform.bezier = function(p, s, e, t) {
	t = t || {};
	var m = t.m?t.m:(e-s)/2;
	return Math.pow(1-p,2) * s + 2 * p * (1-p) * m + Math.pow(p,2) * e;
};

/**
 * This method will return a value that reflects the location based in the percent value passed in.
 * @param {number} p The location the the transformation in percent. (0->1.00)
 * @param {number} s The starting value of the transformation.
 * @param {number} e The ending value of the transformation.
 * @type number
 * @returns A value somewhere between the start and the end values passed in
 */
jpmc.ui.EffectTransform.snap = function(p, s, e) {
	var diff = e-s;
	var rad = Math.PI/180;
	return s + Math.round(diff * Math.tan(89 * p * rad) / 57.3);
};

/**
 * @deprecated
 * @ignore
 */
jpmc.ui.EffectsTransform = jpmc.ui.EffectTransform;
/**
 * A static class that contains useful methods and properties.
 * @class A static class that contains useful methods and properties.<br>
 * @constructor
 */
jpmc.ui.Effect = function(){};

/**
 * Causes the elements to disappear using a explosion effect.
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {boolean} restore Flag indicating the element should be returned to it's original state when effect completes.
 * @param {function} onComplete (Optional) The function to call when the change is complete (element is the only argument passed to the handler)
 * @param {function} transform (Optional) The function that manages how the transformation progresses
 * @type void
 */
jpmc.ui.Effect.explode = function(element, restore, onComplete, transform) {
	var effects = [
		{opacity:0, zoom:500, anchorX:50, anchorY:50, duration:250}
	];
	if (restore) {
		effects[effects.length] = {zoom:100, anchorX:50, anchorY:50, duration:200};
		effects[effects.length] = {opacity:100, duration:250};
	}
	jpmc.ui.Effect.morph(element, effects, undefined, onComplete, transform);
};

/**
 * Causes the elements tp disappear using a fold effect.
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {boolean} restore Flag indicating the element should be returned to it's original state when effect completes.
 * @param {function} onComplete (Optional) The function to call when the change is complete (element is the only argument passed to the handler)
 * @param {function} transform (Optional) The function that manages how the transformation progresses
 * @type void
 */
jpmc.ui.Effect.fold = function(element, restore, onComplete, transform) {
	element = jpmc.ui.Util.getObject(element);
	var h = element.offsetHeight;
	var w = element.offsetWidth;
	var effects = [
		{height:Math.round(h/5), duration:250},
		{width:0, duration:250}
	];
	if (restore) {
		effects[effects.length] = {opacity:0};
		effects[effects.length] = {height:h, width:w, duration:200};
		effects[effects.length] = {opacity:100, duration:250};
	}
	jpmc.ui.Effect.morph(element, effects, undefined, onComplete, transform);
};

/**
 * Causes the elements to pulse in and out of visability.
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {boolean} restore Flag indicating the element should be returned to it's original state when effect completes.
 * @param {function} onComplete (Optional) The function to call when the change is complete (element is the only argument passed to the handler)
 * @param {function} transform (Optional) The function that manages how the transformation progresses
 * @type void
 */
jpmc.ui.Effect.pulse = function(element, restore, onComplete, transform) {
	var effects = [
		{opacity:0, duration:250},
		{opacity:100, duration:250},
		{opacity:0, duration:250},
		{opacity:100, duration:250}
	];
	jpmc.ui.Effect.morph(element, effects, undefined, onComplete, transform);
};

/**
 * Causes the elements to disappear using a shrink effect.
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {boolean} restore Flag indicating the element should be returned to it's original state when effect completes.
 * @param {function} onComplete (Optional) The function to call when the change is complete (element is the only argument passed to the handler)
 * @param {function} transform (Optional) The function that manages how the transformation progresses
 * @type void
 */
jpmc.ui.Effect.shrink = function(element, restore, onComplete, transform) {
	var effects = [
		{opacity:0, zoom:5, anchorX:50, anchorY:50, duration:250}
	];
	if (restore) {
		effects[effects.length] = {zoom:100, anchorX:50, anchorY:50, duration:200};
		effects[effects.length] = {opacity:100, duration:250};
	}
	jpmc.ui.Effect.morph(element, effects, undefined, onComplete, transform);
};

/**
 * Causes the elements to gradually morph to match parameters passed in.
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {jpmc.ui.EffectConfig} cfg A state object or an array of state objects that will be processed in the order they appear in the array. These objects should indicate the end state of the element.
 * @type void
 */
jpmc.ui.Effect.morph = function(element, cfg) {

	var add = function(a,v) {a[a.length] = v;};

	var process = function(o, x) {
		if (x<cfg.length) {
			var c = cfg[x];
			x++;
			var nxt = (x==cfg.length)?arguments[3]:function(o){process(o,x);};
			if(typeof c.onComplete == 'function') {
				var org = c.onComplete;
				c.onComplete = function(o) {org(o);nxt(o);};
			} else {
				c.onComplete = nxt;
			}
			jpmc.ui.Effect.morph(o, c, undefined, undefined, arguments[4]);
		}
	};

	if (typeof cfg == 'object' && cfg.constructor == Array) {
		return process(element, 0);
	}

	//Initialize morph object
	var obj = {};
	obj.element = jpmc.ui.Util.getObject(element);
	obj.t = [];

	//apply defaults
	cfg.scrollObject   = jpmc.ui.Util.getObject(cfg.scrollObject, document.body);
	cfg.scrollPadding  = isNaN(cfg.scrollPadding) ? 10 : cfg.scrollPadding;
	obj.duration       = cfg.duration || arguments[2] || 0;
	obj.onAfterUpdate  = cfg.onAfterUpdate;
	obj.onBeforeUpdate = cfg.onBeforeUpdate;
	obj.onComplete     = cfg.onComplete || arguments[3];
	obj.onStart        = cfg.onStart;
	obj.remain         = obj.duration;
	obj.step           = isNaN(cfg.fps) ? 20 : 1000/(cfg.fps>100?100:cfg.fps); //default 50fps
	obj.transform      = cfg.transform || arguments[4] || jpmc.ui.EffectTransform.smooth;

	for (var A in cfg) {
		var v = cfg[A];
		if (v===null || v==undefined) {continue;}
		switch(A) {
			case 'left':
			case 'top':
				if (isNaN(v)) {break;}
				cfg[A+'Org'] = obj.element['offset' + jpmc.helper.String.toTitleCase(A)];
				add(obj.t, {
					s:cfg[A+'Org'],
					e:v,
					u:{f:function(val,s) {obj.element.style[s] = Math.round(val) + 'px';},s:A},
					m:cfg[A+'Middle']
				});
				break;
			case 'height':
			case 'width':
				if (isNaN(v)) {break;}
				cfg[A+'Org'] = obj.element['offset' + jpmc.helper.String.toTitleCase(A)];
				add(obj.t, {
					s:cfg[A+'Org'],
					e:v,
					u:{f:function(val,s) {obj.element.style[s] = Math.abs(Math.round(val)) + 'px';},s:A}
				});
				break;

			case 'scrollLeft':
			case 'scrollTop':
				if (isNaN(v)) {break;}
				add(obj.t, {
					s:obj.element[A],
					e:v,
					u:{f:function(val, s) {obj.element[s] = Math.round(val);},s:A}
				});
				break;

			default: //Manage Color changes
				if (!(/color/i).test(A)) {break;}
				var RGBs = new jpmc.ui.Color(jpmc.ui.Util.getStyle(obj.element,A,true));
				var RGBe = new jpmc.ui.Color(cfg[A]);
				var RGBu = new jpmc.ui.Color();
				add(obj.t, {
					s:RGBs.red,
					e:RGBe.red,
					u:function(val) {RGBu.red = val;}
				});
				add(obj.t, {
					s:RGBs.green,
					e:RGBe.green,
					u:function(val) {RGBu.green = val;}
				});
				add(obj.t, {
					s:RGBs.blue,
					e:RGBe.blue,
					u:function(val) {RGBu.blue = val;}
				});
				add(obj.t, {
					s:0,
					e:0,
					u:{f:function(val,s) {obj.element.style[s] = RGBu.toHTML();},s:A}
				});
				break;
		}
	}

	if (!isNaN(cfg.opacity)) {
		add(obj.t, {
			s:jpmc.ui.Util.getOpacity(obj.element),
			e:cfg.opacity,
			u:function(val) {jpmc.ui.Util.setOpacity(obj.element,val);}
		});
	}

	if (!isNaN(cfg.zoom)) {

		if (cfg.zoom<1) {cfg.zoom=1;}

		if (obj.element.tagName == 'IMG') {
			//Manage images
			cfg.heightOrg = obj.element.offsetHeight;
			cfg.widthOrg = obj.element.offsetWidth;

			cfg.orgH = jpmc.ui.Util.getAttribute(obj.element, 'jpmc_ui_util_transform_zoom_h', cfg.heightOrg);
			cfg.orgW  = jpmc.ui.Util.getAttribute(obj.element, 'jpmc_ui_util_transform_zoom_w', cfg.widthOrg);
			cfg.height    = Math.round(cfg.orgH * cfg.zoom / 100);
			cfg.width     = Math.round(cfg.orgW * cfg.zoom / 100);
			obj.element.setAttribute('jpmc_ui_util_transform_zoom_h', cfg.orgH);
			obj.element.setAttribute('jpmc_ui_util_transform_zoom_w', cfg.orgW);

			add(obj.t, {
				s:cfg.heightOrg,
				e:cfg.height,
				u:function(val) {obj.element.style.height = Math.abs(Math.round(val)) + 'px';}
			});
			add(obj.t, {
				s:cfg.widthOrg,
				e:cfg.width,
				u:function(val) {obj.element.style.width = Math.abs(Math.round(val)) + 'px';}
			});

		} else if (jpmc.ui.Util.isIE) {
			//Manage other elements with style.zoom (IE Only)
			var oldZoom = parseInt(obj.element.style.zoom, 10);
			if (isNaN(oldZoom)) {oldZoom = 100;}
			//Set transform

			add(obj.t, {
				s:oldZoom,
				e:cfg.zoom,
				u:function(val) {val=(val<1&&val>-1?1:val);obj.element.style.zoom = Math.abs(Math.round(val)) + '%';}
			});
			//Set variables so anchors will work
			if (cfg.anchorY) {
				var ph = obj.element.offsetHeight;
				cfg.heightOrg = Math.round(ph * oldZoom / 100);
				cfg.height    = Math.round(ph * cfg.zoom / 100);
			}
			if (cfg.anchorX) {
				var pw = obj.element.offsetWidth;
				cfg.widthOrg  = Math.round(pw * oldZoom / 100);
				cfg.width     = Math.round(pw * cfg.zoom / 100);
			}

		} else {
			//just bypass this transform and call onComplete
			add(obj.t, {
				s:0,
				e:0,
				u:function(val) {/*null update*/}
			});
		}

	}

	//AUTO TRANSFORM OPTIONS (anchorY, anchorX, scrollIntoView)

	var pos = (obj.element.style.position == 'relative');

	if (!isNaN(cfg.anchorY) && !isNaN(cfg.height) && !isNaN(cfg.heightOrg) && isNaN(cfg.top)) {
		var py = parseInt(obj.element.style.top, 10);
		var mt = parseInt(obj.element.style.marginTop, 10);
		py = pos?(isNaN(py)?0:py):jpmc.ui.Util.getOffsetY(obj.element);
		add(obj.t, {
			s:py,
			e:Math.round(py - ((cfg.height - cfg.heightOrg) * cfg.anchorY / 100)),
			u:function(val) {obj.element.style.top = val;}
		});
	}

	if (!isNaN(cfg.anchorX) && !isNaN(cfg.width) && !isNaN(cfg.widthOrg) && isNaN(cfg.left)) {
		var px = parseInt(obj.element.style.left, 10);
		px = pos?(isNaN(px)?0:px):jpmc.ui.Util.getOffsetX(obj.element);
		add(obj.t, {
			s:px,
			e:Math.round(px - ((cfg.width - cfg.widthOrg) * cfg.anchorX / 100)),
			u:function(val) {obj.element.style.left = val;}
		});
	}

	if (cfg.scrollIntoView && isNaN(cfg.scrollTop)) {

		if (isNaN(cfg.height)) {cfg.height = obj.element.offsetHeight;}
		if (isNaN(cfg.top)) {cfg.top = jpmc.ui.Util.getOffsetY(obj.element, cfg.scrollObject);}

		var pgH = (cfg.scrollObject.clientHeight?cfg.scrollObject.clientHeight:cfg.scrollObject.offsetHeight)-cfg.scrollPadding;
		var scT = cfg.scrollObject.scrollTop;

		if (cfg.top<scT || cfg.top+cfg.height-scT-pgH>0) {
			add(obj.t, {
				s:scT,
				e:(cfg.top>scT && cfg.height<pgH)?(cfg.top+cfg.height-pgH):(cfg.top-cfg.scrollPadding),
				u:function(val) {cfg.scrollObject.scrollTop = val;}
			});
		}
	}

	if (cfg.scrollIntoView && isNaN(cfg.scrollLeft)) {

		if (isNaN(cfg.width)) {cfg.width = obj.element.offsetWidth;}
		if (isNaN(cfg.left)) {cfg.left = jpmc.ui.Util.getOffsetX(obj.element, cfg.scrollObject);}

		var pgW = (cfg.scrollObject.clientWidth?cfg.scrollObject.clientWidth:cfg.scrollObject.offsetWidth)-cfg.scrollPadding;
		var scL = cfg.scrollObject.scrollLeft;

		if (cfg.left<scL || cfg.left+cfg.width-scL-pgW>0) {
			add(obj.t, {
				s:scL,
				e:(cfg.left>scL && cfg.width<pgW)?(cfg.left+cfg.width-pgW):(cfg.left-cfg.scrollPadding),
				u:function(val) {cfg.scrollObject.scrollLeft = val;}
			});
		}
	}
	obj.attribute = 'jpmc_ui_Effect_morph_count';

	//alert(jpmc.helper.Object.toString(obj,true));

	//Here we go...fire onStart handler
	if (typeof obj.onStart == 'function') {
		obj.onStart(obj.element);
	}

	//Process Change
	return jpmc.ui.Effect.processEffect(obj);
};


/**
 * @private
 */
jpmc.ui.Effect.processEffect = function(obj) {

	//Get current tickcount
	var tc = (new Date()).valueOf();

	var build = [];

	//Check if this is first transform call
	if (obj.duration == obj.remain) {
		//set unique transform id
		obj.count = jpmc.ui.Effect.processEffect.count++;
		obj.element.setAttribute(obj.attribute, obj.count);
	} else {
		//check if transform has been canceled
		if (jpmc.ui.Util.getAttribute(obj.element, obj.attribute, obj.count) != obj.count) {
			return;
		}
	}

	var step = obj.step;

	//Adjust step size
	if (obj.tc) {
		step = Math.round(tc - obj.tc);
		if (step > 100) {step=100;}
	}

	//Save current tickcount
	obj.tc = tc;

	//set complete flag (1=done, -1=force complete)
	var done = (obj.remain===0?-1:1);

	//calculate remaing time
	obj.remain -= step;

	//Adjust for overrun
	if (obj.remain<0) {obj.remain=0;}


	//Here we go...fire onStart handler
	if (typeof obj.onBeforeUpdate == 'function') {
		obj.onBeforeUpdate(obj.element);
	}

	//Process each property to update
	for (var x=0; x<obj.t.length; x++) {
		//Check if time is overrun
		if (done === -1) {
			//Force complete
			build[x] = obj.t[x].e;
		} else {
			build[x] = obj.transform((obj.duration-obj.remain)/obj.duration, obj.t[x].s, obj.t[x].e, obj.t[x]);
		}
		//Apply current effects
		if (obj.t[x].u.f) {
			obj.t[x].u.f(build[x],obj.t[x].u.s);
		} else {
			obj.t[x].u(build[x]);
		}
		//Check if transform is complete
		if (build[x] != obj.t[x].e) {
			//set flag incomplete
			done = 0;
		}
	}

	//fire onAfterUpdate handler
	if (typeof obj.onAfterUpdate == 'function') {
		obj.onAfterUpdate(obj.element);
	}

	if (done===0) {
		//Continue transformation
		setTimeout(function() {jpmc.ui.Effect.processEffect(obj);}, obj.step);
	} else if (typeof obj.onComplete == 'function') {
		//We are done...fire onComplete handler
		obj.onComplete(obj.element);
	}

};

/**
 * @private
 */
jpmc.ui.Effect.processEffect.count = 0;

/**
 * @deprecated
 * @ignore
 */
jpmc.ui.Effects = jpmc.ui.Effect;
/**
 * @fileoverview Common methods for event management
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * A class that standardizes the events across browsers, and contains useful methods for event management.
 * @class A class that standardizes the events across browsers, and contains useful methods for event management.<br>
 * Most W3C properties and methods are supported, except; bubbles, cancelable, currentTarget, eventPhase and timeStamp.<br>
 * Additional properties that have been added for convenience; offsetX and offsetY<br>
 * Additional methods have been added for convenience; stopEvent()<br>
 * @constructor
 */
jpmc.ui.Event = function(e) {

	//Get event object
	var n = e||window.event||{};

	//find the button that changed
	var b = jpmc.ui.Event.buttonLast;
	b = [b[1],1,3,0,2][ b[0] ^ n.button ];

	/**
	 * Constant that represents the backspace key.
	 * @final
	 * @type number
	 */
	this.KEY_BACKSPACE =  8;
	/**
	 * Constant that represents the tab key.
	 * @final
	 * @type number
	 */
	this.KEY_TAB       =  9;
	/**
	 * Constant that represents the return key.
	 * @final
	 * @type number
	 */
	this.KEY_RETURN    = 13;
	/**
	 * Constant that represents the esc key.
	 * @final
	 * @type number
	 */
	this.KEY_ESC       = 27;
	/**
	 * Constant that represents the left key.
	 * @final
	 * @type number
	 */
	this.KEY_LEFT      = 37;
	/**
	 * Constant that represents the up key.
	 * @final
	 * @type number
	 */
	this.KEY_UP        = 38;
	/**
	 * Constant that represents the right key.
	 * @final
	 * @type number
	 */
	this.KEY_RIGHT     = 39;
	/**
	 * Constant that represents the down key.
	 * @final
	 * @type number
	 */
	this.KEY_DOWN      = 40;
	/**
	 * Constant that represents the delete key.
	 * @final
	 * @type number
	 */
	this.KEY_DELETE    = 46;
	/**
	 * Constant that represents the home key.
	 * @final
	 * @type number
	 */
	this.KEY_HOME      = 36;
	/**
	 * Constant that represents the end key.
	 * @final
	 * @type number
	 */
	this.KEY_END       = 35;
	/**
	 * Constant that represents the page up key.
	 * @final
	 * @type number
	 */
	this.KEY_PAGE_UP   = 33;
	/**
	 * Constant that represents the page down key.
	 * @final
	 * @type number
	 */
	this.KEY_PAGE_DOWN = 34;
	/**
	 * Constant that represents the left mouse button.
	 * @final
	 * @type number
	 */
	this.MOUSE_LEFT   = 1;
	/**
	 * Constant that represents the middle mouse button.
	 * @final
	 * @type number
	 */
	this.MOUSE_MIDDLE = 2;
	/**
	 * Constant that represents the right mouse button.
	 * @final
	 * @type number
	 */
	this.MOUSE_RIGHT  = 3;
	/**
	 * A value that indicates the state of the ALT key.
	 * @type boolean
	 */
	this.altKey = n.altKey;
	/**
	 * Standardized mouse button event value (0=none, 1=left, 2=middle, 3=right)
	 * @type number
	 */
	this.button = n.which || [0,1,3,b,2,b,b,b][n.button] || 0;
	/**
	 * The x-coordinate of the mouse pointer's position relative to the client area of the window, excluding window decorations and scroll bars.
	 * @type number
	 */
	this.clientX = n.clientX||0;
	/**
	 * The y-coordinate of the mouse pointer's position relative to the client area of the window, excluding window decorations and scroll bars.
	 * @type number
	 */
	this.clientY = n.clientY||0;
	/**
	 * A value that indicates the state of the CTRL key.
	 * @type boolean
	 */
	this.ctrlKey = n.ctrlKey;
	/**
	 * The original event object
	 * @type object
	 */
	this.event = n;
	/**
	 * The Unicode key code associated with the key that caused the event.
	 * @type number
	 */
	this.keyCode = n.keyCode||n.charCode||0;
	/**
	 * A value that indicates the state of the ALT key.
	 * @type boolean
	 */
	this.metaKey = n.metaKey || false;

	/**
	 * Standardized horizontal position in relation to the event container
	 * @type number
	 */
	this.offsetX = n.offsetX || (n.pageX?n.pageX-jpmc.ui.Util.getOffsetX(n.target):0);
	/**
	 * Standardized vertical position in relation to the event container
	 * @type number
	 */
	this.offsetY = n.offsetY || (n.pageY?n.pageY-jpmc.ui.Util.getOffsetY(n.target):0);
	/**
	 * Standardized absolute horizontal position for the event
	 * @type number
	 */
	this.pageX = n.pageX || (n.clientX?n.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft):0);
	/**
	 * Standardized absolute vertical position for the event
	 * @type number
	 */
	this.pageY = n.pageY || (n.clientY?n.clientY+(document.documentElement.scrolltop || document.body.scrollTop):0);
	/**
	 * Standardized element related to the element that triggered the event
	 * @type object
	 */
	this.relatedTarget = n.relatedTarget || {mouseover:n.fromElement,mouseout:n.toElement}[n.type];
	/**
	 * The x-coordinate of the mouse pointer's position relative to the user's screen.
	 * @type number
	 */
	this.screenX = n.screenX||0;
	/**
	 * The y-coordinate of the mouse pointer's position relative to the user's screen.
	 * @type number
	 */
	this.screenY = n.screenY||0;
	/**
	 * A value that indicates the state of the SHIFT key.
	 * @type boolean
	 */
	this.shiftKey = n.shiftKey;
	/**
	 * The element that triggered the event
	 * @type object
	 */
	this.target = n.srcElement || n.target;
	/**
	 * The event name from the event object.
	 * @type string
	 */
	this.type = n.type;
	/**
	 * Standardized mouse wheel delta for scroll wheel events (+ for scroll up, - for scroll down)
	 * @type number
	 */
	this.wheelDelta = {mousewheel:1,DOMMouseScroll:1}[n.type]?n.detail/-3 || n.wheelDelta/120 : 0;

	/**
	 * Only added for backwards compatability
	 * @private
	 */
	this.which = n.which||n.keyCode;
	/**
	 * Prevents the default action for this event from occuring
	 * @type void
	 */
	this.preventDefault = function() {
		n.preventDefault?n.preventDefault():n.returnValue=false;
	};

	/**
	 * Convenience method for stopPropagation + preventDefault
	 * @type void
	 */
	this.stopEvent = function() {
		this.stopPropagation();
		this.preventDefault();
	};

	/**
	 * Stops the event from bubbling up the DOM hierarchy
	 * @type void
	 */
	this.stopPropagation = function() {
		n.stopPropagation?n.stopPropagation():n.cancelBubble=true;
	};

	/**
	 * Save last real and calculated button values
	 * @private
	 */
	jpmc.ui.Event.buttonLast = [n.button,this.button];

};

/**
 * @private
 */
jpmc.ui.Event.buttonLast = [0,0];
/**
 * @fileoverview Common methods for user interface objects
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * A static class that contains useful methods and properties.
 * @class A static class that contains useful methods and properties.<br>
 * @constructor
 */
jpmc.ui.Util = function(){};

/**
 * Flag that indicates the version of Internet Explorer else 0
 * @type boolean
 */
jpmc.ui.Util.isIE = (navigator.userAgent.match(/MSIE ([\d\.]+)/i)||[0,0])[1];

/**
 * Flag that indicates the version of FireFox else 0
 * @type string
 */
jpmc.ui.Util.isFireFox = (navigator.userAgent.match(/FireFox\/([\d\.]+)/i)||[0,0])[1];

/**
 * Flag that indicates the version of Google Chrome else 0
 * @type string
 */
jpmc.ui.Util.isChrome = (navigator.userAgent.match(/Chrome\/([\d\.]+)/i)||[0,0])[1];

/**
 * Flag that indicates the version of Safari else 0
 * @type string
 */
jpmc.ui.Util.isSafari = (navigator.userAgent.match(/Version\/([\d\.]+) Safari/i)||[0,0])[1];

/**
 * Flag that indicates the version of Opera else 0
 * @type string
 */
jpmc.ui.Util.isOpera = (navigator.userAgent.match(/Opera\/([\d\.]+)/i)||[0,0])[1];

/**
 * Flag that indicates the version of Mozilla used
 * @type string
 */
jpmc.ui.Util.isMozilla = (navigator.userAgent.match(/Mozilla\/([\d\.]+)/i)||[0,0])[1];

/**
 * Flag that indicates the version of Gecko used
 * @type string
 */
jpmc.ui.Util.isGecko = (navigator.userAgent.match(/Gecko\/([\d\.]+)/i)||[0,0])[1];

/**
 * Flag that indicates the version of WebKit used
 * @type string
 */
jpmc.ui.Util.isWebKit = (navigator.userAgent.match(/AppleWebKit\/([\d\.]+)/i)||[0,0])[1];

/**
 * Flag that indicates if the browser display mode is W3C compliant.
 * @type boolean
 */
jpmc.ui.Util.isW3C = !jpmc.ui.Util.isIE || document.compatMode!='BackCompat';

/**
 * Flag that indicates if the DOM has been completely loaded
 * @type boolean
 */
jpmc.ui.Util.isDOMComplete = window.jpmc_ui_Util_isDOMComplete || false;

/**
 * Flag that indicates if the Window.onload event has already been fired
 * @type boolean
 */
jpmc.ui.Util.isWindowLoaded = window.jpmc_ui_Util_isWindowLoaded || false;

/**
 * String that indicates the supports JavaScript version.
 * @type string
 */
jpmc.ui.Util.jsVersion = '1.0';

/**
 * Flag that indicates if the browser running with a non-US configuration
 * @type boolean
 */
jpmc.ui.Util.isInternational = navigator.language ? (navigator.language.toLowerCase() != 'en-us') : (navigator.browserLanguage != 'en' && navigator.browserLanguage != 'en-us');

/**
 * Used for internal functions
 * @private
 */
jpmc.ui.Util.getObject = function(obj, defaultObj) {
	switch (typeof obj) {
		case 'object': break;
		case 'string': obj = document.getElementById(obj); break;
		default: break;//Unknown
	}
	return obj||defaultObj;
};

/**
 * Gets the minimized state of the window
 * @type boolean
 */
jpmc.ui.Util.getMinimized = function() {return (top.screenLeft || top.screenX) <= -31999;};

/**
 * Gets typed attribute value from html element
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to read attribute from.
 * @param {string} attribute The name for the attribute to read.
 * @param {mixed} defaultValue The default value to be returned. The return data type is based on this value's data type
 * @type mixed
 */
jpmc.ui.Util.getAttribute = function(element, attribute, defaultValue) {
	var val;
	var out = defaultValue;
	element = jpmc.ui.Util.getObject(element);
	if (!element) {return defaultValue;}
	try{
		val = element.getAttribute(attribute);
		if(val !== null) {
			val = val.toString();
		}
	} catch(ex) {}
	if (typeof val == 'string') {
		var val2 = val.toLowerCase();
		switch(typeof out) {
			case 'boolean':
				switch(val2.charAt(0)) {
					case '0':
					case 'f':
					case 'n': out=false; break;
					case '1':
					case 't':
					case 'y': out=true;  break;
					default: break;
				}
				break;
			case 'number':
				if (!isNaN(val)) {
					out = parseInt(val,10);
				}
				break;
			case 'string':
				out = val;
				break;
			default: break;
		}
	}
	return out;
};

/**
 * Gets the selected text on the page
 * @type string
 * @returns The text selected on the page
 */
jpmc.ui.Util.getSelection = function() {
	var str = '';
	if (document.getSelection) {
		str = document.getSelection();
	} else if (document.selection && document.selection.createRange) {
		str = document.selection.createRange().text;
	}
	return str;
};

/**
 * Sets the position for a specific html element around the rectangular coordinates passed in. All values should be in relation to the elements's container
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {jpmc.ui.Box} box An object that represents the element to position below
 * @type void
 */
jpmc.ui.Util.setBeside = function(element, box) {

	var nX, nY, padX = 5;

	element = jpmc.ui.Util.getObject(element);

	var oWidth = element.offsetWidth;
	var oHeight = element.offsetHeight;

	var cWidth = document.body.clientWidth;
	var cHeight = document.body.clientHeight;

	var sLeft = document.body.scrollLeft;
	var sTop = document.body.scrollTop;

	if (box.left+box.width+oWidth+padX < cWidth+sLeft) {
		nX = box.left + box.width + padX;
	} else if (box.left-oWidth-padX > sLeft) {
		nX = box.left - oWidth - padX;
	} else {
		nX = sLeft;
	}

	if (box.top+oHeight < cHeight+sTop) {
		nY = box.top;
	} else if (box.top-oHeight+box.height > sTop) {
		nY = box.top-oHeight+box.height;
	} else {
		nY = sTop;
	}

	element.style.left = nX + 'px';
	element.style.top = nY + 'px';
};

/**
 * Deprecated, see {@link jpmc.ui.Util#setBeside}
 * @deprecated
 */
jpmc.ui.Util.setPosition = function(e, x, y, w, h) {jpmc.ui.Util.setBeside(e, {left:x, top:y, width:w, height:h});};

/**
 * Sets the position for a specific html element below the rectangular coordinates passed in. All values should be in relation to the elements's container
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {jpmc.ui.Box} box An object that represents the element to position below
 * @type void
 */
jpmc.ui.Util.setBelow = function(element, box) {

	var nX, nY, padY = 5;

	element = jpmc.ui.Util.getObject(element);

	var oWidth = element.offsetWidth;
	var oHeight = element.offsetHeight;

	var cWidth = document.body.clientWidth;
	var cHeight = document.body.clientHeight;

	var sLeft = document.body.scrollLeft;
	var sTop = document.body.scrollTop;

	if (box.left+oWidth < cWidth+sLeft) {
		nX = box.left;
	} else if (box.left+box.width-oWidth > sLeft) {
		nX = box.left+box.width - oWidth;
	} else if (oWidth < cWidth) {
		nX = cWidth + sLeft - oWidth;
	} else {
		nX = sLeft;
	}

	nY = box.top + box.height + padY;

	element.style.left = nX + 'px';
	element.style.top = nY + 'px';
};

/**
 * Sets the position for a specific html element in the middle of the rectangular coordinates passed in. All values should be in relation to the elements's container
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {jpmc.ui.Box} box An object that represents the element to position below
 * @type void
 */
jpmc.ui.Util.setCentered = function(element, box) {
	var eBox = jpmc.ui.Util.getConstraints(element);
	element.style.left = (box.left + box.width/2 - eBox.width/2)+ 'px';
	element.style.top = (box.top + box.height/2 - eBox.height/2)+ 'px';
};

/**
 * Gets the opacity for a specific html element
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @type void
 */
jpmc.ui.Util.getOpacity = function(element) {
	element = jpmc.ui.Util.getObject(element);
	var op = 100;
	var ieOpacity = new RegExp('alpha\\(opacity=(\\d)','i');
	try {
		if (typeof element.style.opacity == 'number') {
			op = element.style.opacity * 100;
		} else if (typeof element.style.MozOpacity == 'number') {
			op = element.style.MozOpacity * 100;
		} else if (typeof element.style.KhtmlOpacity == 'number') {
			op = element.style.KhtmlOpacity * 100;
		} else if (ieOpacity.test(element.style.filter)) {
			element.style.filter.replace(ieOpacity, function(){op=arguments[1];});
		}
	} catch (ex) {}
	return Math.round(op);
};

/**
 * Sets the opacity for a specific html element
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {number} opacity The opacity of the element (0-100)
 * @type void
 */
jpmc.ui.Util.setOpacity = function(element, opacity) {

	element = jpmc.ui.Util.getObject(element);

	//Only work in IE if element has height or width set
	try {
		element.style.opacity = (opacity / 100);
		element.style.MozOpacity = (opacity / 100);
		element.style.KhtmlOpacity = (opacity / 100);
		element.style.filter = 'alpha(opacity=' + opacity + ')';
		//element.filters['alpha'].opacity = opacity;
	} catch (ex) {}
};

/**
 * @private
 */
jpmc.ui.Util.getBackgroundColor = function(element) {
	return new jpmc.ui.Color(jpmc.ui.Util.getStyle(element,'backgroundColor',true));
};

/**
 * Determins the style of an element
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to find the style value for.
 * @param {string} styleName The name of the style to find.
 * @param {boolean} inherited Search parent objects for the style until found.
 * @type string
 * @returns style applied to an object, or it's parent
 */
jpmc.ui.Util.getStyle = function(element, styleName, inherited) {
	var obj = jpmc.ui.Util.getObject(element);
	var val = '';
	while (obj.parentNode && val==='') {
		val = obj.style[styleName];
		obj = obj.parentNode;
		if (!inherited) {break;}
	}
	return val;
};

/**
 * Sets the style attributes of the element to match the attributes of the object
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to apply the styles to.
 * @param {object} styles An object that contains the stylenames as properties, and the style values as the property values. example: { fontWeight:'bold', backgroundColor:'#ffff00' }
 * @type void
 */
jpmc.ui.Util.setStyle = function(element, styles) {
	var obj = jpmc.ui.Util.getObject(element);
	for (var s in styles) {
		var v = styles[s];
		switch(s) {
			case 'opacity': jpmc.ui.Util.setOpacity(element, v);break;
			default: obj.style[s] = v;break;
		}
	}
};

/**
 * Gets the X offset of the object in reference to the container object
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to find the offset for
 * @param {mixed} reference (optional) &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to use as a reference.
 * @type number
 */
jpmc.ui.Util.getOffsetX = function(element, reference) {
	return jpmc.ui.Util.getOffset(element, reference)[0];
};

/**
 * Gets the Y offset of the object in reference to the container object
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to find the offset for
 * @param {mixed} reference (optional) &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to use as a reference.
 * @type number
 */
jpmc.ui.Util.getOffsetY = function(element, reference) {
	return jpmc.ui.Util.getOffset(element, reference)[1];
};

/**
 * Gets the X and Y offset of the object in reference to the container object
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to find the offset for
 * @param {mixed} reference (optional) &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to use as a reference.
 * @type number[]
 */
jpmc.ui.Util.getOffset = function(element, reference) {
	var obj = jpmc.ui.Util.getObject(element);
	var x=0,y=0;
	do {
		x += obj.offsetLeft;
		y += obj.offsetTop;
		obj = obj.offsetParent;
	} while (obj)
	var ref = reference?jpmc.ui.Util.getOffset(reference):[0,0];
	return [x-ref[0],y-ref[1]];
};

/**
 * Gets the size and position of the object in reference to the container object (defaults to the visible window area)
 * @param {mixed} element (optional) &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to find the offset for
 * @param {object} container (optional) The HTML element to use as a reference.
 * @type {@link jpmc.ui.Box}
 * @returns A {@link jpmc.ui.Box} object that represents the contraints of the element
 */
jpmc.ui.Util.getConstraints = function(element, container) {
	var obj = jpmc.ui.Util.getObject(element);
	if (obj) {
		var xy = jpmc.ui.Util.getOffset(obj, container);
		return new jpmc.ui.Box(xy[0], xy[1], obj.offsetWidth, obj.offsetHeight);
	} else {
		obj = document.body;
		return new jpmc.ui.Box(obj.scrollLeft, obj.scrollTop, obj.clientWidth, obj.clientHeight);
	}
};

/**
 * Determins if an element is a descendant of another element
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to use as the descendant
 * @param {mixed} container &lt;string&gt; ID or an &lt;object&gt; reference of the  HTML element use as the container of the HTML element.
 * @type number
 */
jpmc.ui.Util.isDescendant = function(element, container) {
	var objC = jpmc.ui.Util.getObject(element);
	var objP = jpmc.ui.Util.getObject(container);
	if (objP.contains) {return objP.contains(objC);}
	while (objC.parentNode && objC!=container) {
		objC = objC.parentNode;
	}
	return (objC==container);
};

/**
 * Gets the first parent element of the tagName supplied
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to use as the descendant
 * @param {object} tagName The tagName of the HTML container element.
 * @type element
 */
jpmc.ui.Util.getParent = function(element, tagName) {
	tagName = tagName.toUpperCase();
	var obj = jpmc.ui.Util.getObject(element);
	while (obj.parentNode && obj.tagName!=tagName) {
		obj = obj.parentNode;
	}
	return obj;
};

/**
 * Sets the Z-Index of the element to make it topmost
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to set the z-index for
 * @type void
 */
jpmc.ui.Util.setTopmost = function(element) {
	element = jpmc.ui.Util.getObject(element);
	element.style.zIndex = jpmc.ui.Util.setTopmost.count++;
};
/**
 * This variable is the counter for the setTopmost function
 * @private
 */
jpmc.ui.Util.setTopmost.count = 2000;

/**
 * Sets the Z-Index of the element to make it bottommost
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to set the z-index for
 * @type void
 */
jpmc.ui.Util.setBottommost = function(element) {
	element = jpmc.ui.Util.getObject(element);
	element.style.zIndex = jpmc.ui.Util.setBottommost.count--;
};
/**
 * This variable is the counter for the setBottommost function
 * @private
 */
jpmc.ui.Util.setBottommost.count = -2000;

/**
 * Event called when the DOM is fully loaded (not images)
 */
jpmc.ui.Util.onDOMComplete = function() {};

/**
 * Event called when the Window and all it's content is fully loaded
 */
jpmc.ui.Util.onWindowLoad = function() {};

/**
 * Assigns events to elements, and allows multiple handlers to run for a single event.
 * This also automatically cleans up event handlers on page unload to prevent memory leaks.
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {string} eventName The name of the event (ie: onclick)
 * @param {function} handler The function to be called when the event fires. The parameter passed to the function is a {@link jpmc.ui.Event} object.
 * @type string
 * @returns Event handler ID that can be used with the {@link jpmc.ui.Util#detachEvent} method
 */
jpmc.ui.Util.attachEvent = function(element, eventName, handler) {
	var el = jpmc.ui.Util.getObject(element);
	var obj;

	//Define special events
	var specials = {
		onmousewheel:['DOMMouseScroll',window]/*,
		ondragstart:['ondraggesture',el], //untested
		ondragleave:['ondragexit',el], //untested
		ondrop:['ondragdrop',el]*/ //untested
	};

	if (element == jpmc.ui.Util) {
		var missed = false;
		switch(eventName) {
			case 'onDOMComplete': missed = window.jpmc_ui_Util_isDOMComplete; break;
			case 'onWindowLoad': missed = window.jpmc_ui_Util_isWindowLoaded; break;
			default: break;
		}
		if (missed) {setTimeout(handler,15);}
	}

	//Manage special events
	var special = !window.opera && el.addEventListener && specials[eventName];
	if (special) {
		var h = handler;
		var eo = el;
		handler = function(e) {if (e.target==eo || jpmc.ui.Util.isDescendant(e.target,eo)) {h.call(this,e);}};
		el = specials[eventName][1];
		eventName = specials[eventName][0];
	}

	var eventId = jpmc.ui.Util.attachEvent.getEventId(el);
	var tag = (el.tagName?el.tagName:'');
	var fullId = tag + eventId + '_' + eventName;
	var handleId = fullId + '_' + jpmc.ui.Util.attachEvent.getId();

	//Check if this object has this events assigned
	if (!jpmc_ui_Util_attachEvent_handlers[fullId]) {

		//create event array
		jpmc_ui_Util_attachEvent_handlers[fullId] = {o:el,e:eventName,f:{},h:[]};

		//add current handler to array if exists
		if (typeof el[eventName] == 'function') {
			obj = jpmc_ui_Util_attachEvent_handlers[fullId];
			obj.h[obj.h.length] = 'org';
			obj.f['org'] = el[eventName];
		}

		var f = function() {
			//Get standardized event object
			var n = new jpmc.ui.Event(arguments[0]);
			//Account for special events
			var eventName = n.type;
			switch(eventName) {
				case 'DOMMouseScroll': break;
				default: eventName = 'on' + eventName; break;
			}
			//Calculate fullID
			var eventId = jpmc.ui.Util.attachEvent.getEventId(this);
			var tag = (this.tagName?this.tagName:'');
			var fullId = tag + eventId + '_' + eventName;

			//Get event handler object
			var obj = jpmc_ui_Util_attachEvent_handlers[fullId];

			if (!obj) {
				//alert(fullId);
			} else {
				//Process each event
				for (var x=0; x<obj.h.length; x++) {
					var handleId = obj.h[x];
					try {
						var ret = obj.f[handleId].call(obj.o, n);
						if (ret !== undefined) {return ret;}
					} catch(ex){}
				}
			}
			//return undefined;//fix for BEA's pathetic attempt to write javascript (appendToHandler)
			1;//fix for BEA's pathetic attempt to write javascript (appendToHandler)
		};

		//Manage special events
		special ? el.addEventListener(eventName, f, false) : el[eventName] = f;

	}
	//add event handler to event array
	obj = jpmc_ui_Util_attachEvent_handlers[fullId];
	obj.h[obj.h.length] = handleId;
	obj.f[handleId] = handler;

	return handleId;
};

/**
 * Removes a single event handler from an element, based on the event handleID returned by the {@link jpmc.ui.Util#attachEvent} method.
 * @param {string} handlerId Event handler ID returnd from the {@link jpmc.ui.Util#attachEvent} method
 * @type void
 */
jpmc.ui.Util.detachEvent = function(handlerId) {
	var fullId;
	handlerId.replace(/^(.*_on.*)_\d$/,function() {fullId = arguments[1];});
	var obj = jpmc_ui_Util_attachEvent_handlers[fullId];
	if (obj) {
		for (var x=0; x<obj.h.length; x++) {
			if (obj.h[x]==handlerId) {
				obj.h.splice(x,1);
				break;
			}
		}
		delete obj.f[handlerId];
		if (obj.h.length===0) {
			jpmc.ui.Util.attachEvent.remove(fullId);
		}
	}
};

/**
 * Removes events that were attached to an element using the {@link jpmc.ui.Util#attachEvent} method.
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {string} eventName (optional) The name of the event (ie: onclick). Default: all events attached to the element are removed.
 * @type void
 */
jpmc.ui.Util.detachEvents = function(element, eventName) {
	element = jpmc.ui.Util.getObject(element);
	var eventId = jpmc.ui.Util.attachEvent.getEventId(element);
	var tag = (element.tagName?element.tagName:'');
	var partId = tag + eventId + '_';

	if (element && eventName) {
		jpmc.ui.Util.attachEvent.remove(partId + eventName);
	} else if (element) {
		for (var A in jpmc_ui_Util_attachEvent_handlers) {
			if (A.substr(0,partId.length) == partId) {
				jpmc.ui.Util.attachEvent.remove(A);
			}
		}
	}
};

/**
 * Fires a specific event on any object
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
 * @param {string} eventName The name of the event (ie: onclick)
 * @type void
 */
jpmc.ui.Util.fireEvent = function(element, eventName) {
	var el = jpmc.ui.Util.getObject(element);
	if( document.createEvent ) {
		var ev = document.createEvent('Events');
		ev.initEvent( eventName.slice(2), true, true );
		el.dispatchEvent(ev);
	} else if( document.createEventObject ) {
		el.fireEvent(eventName);
		/*
		var newEvt = document.createEventObject();
		el.fireEvent(eventName, newEvt);
		*/
	}
};

/**
 * This function prevents memory leaks due to events handlers
 * @private
 */
jpmc.ui.Util.attachEvent.cleanup = function() {
	for (var A in jpmc_ui_Util_attachEvent_handlers) {
		jpmc.ui.Util.attachEvent.remove(A);
	}
};
/**
 * This function prevents memory leaks due to events handlers
 * @private
 */
jpmc.ui.Util.attachEvent.remove = function(fullId) {
	if (!jpmc_ui_Util_attachEvent_handlers[fullId]) {return;}
	var hnd = jpmc_ui_Util_attachEvent_handlers[fullId];
	hnd.o[hnd.e] = null;
	hnd.o = null;
	delete jpmc_ui_Util_attachEvent_handlers[fullId];
};

/**
 * This function gets the uniquie element number for the element
 * @private
 */
jpmc.ui.Util.attachEvent.getEventId = function(element) {
	var eventId = -1;
	switch(element) {
		case document:      eventId = 'd'; break;
		case window:        eventId = 'w'; break;
		case jpmc.ui.Util:  eventId = 'u'; break;
		default:            eventId = jpmc.ui.Util.getAttribute(element, 'jpmc_ui_Util_attachEvent_id', -1); break;
	}
	if (eventId === -1) {
		eventId = jpmc.ui.Util.attachEvent.getId();
		if (element.setAttribute) {
			element.setAttribute('jpmc_ui_Util_attachEvent_id', eventId);
		} else {
			element.jpmc_ui_Util_attachEvent_id = eventId;
		}
	}
	return eventId;
};
/**
 * This function return a uniquie number every time it's called
 * @private
 */
jpmc.ui.Util.attachEvent.getId = function() {
	return jpmc_ui_Util_attachEvent_count++;
};

//Initialize internals
if (!jpmc_ui_Util_attachEvent_loaded) {
	//internal counter
	var jpmc_ui_Util_attachEvent_count = 0;
	//Storage for event handler objects
	var jpmc_ui_Util_attachEvent_handlers = {};
	//Cleanup Events when page unloads
	setTimeout(function(){jpmc.ui.Util.attachEvent(window,'onunload',jpmc.ui.Util.attachEvent.cleanup);},10);
	//Mark internals as loaded
	var jpmc_ui_Util_attachEvent_loaded = true;


	/**
	 * Based on DOMComplete - Load Event
	 * @Author: Diego Perini (diego.perini@gmail.com)
	 * @Updated: 31/07/2006
	 * @Version: 0.99.2-mini
	 * @private
	 */
	new function() {
		var domLoad = function(e) {
			if (!window.jpmc_ui_Util_isDOMComplete) {
				window.jpmc_ui_Util_isDOMComplete = true;
				jpmc.ui.Util.isDOMComplete = true;

				//IE is a little quirky
				setTimeout(function() {
					if(typeof jpmc.ui.Util.onDOMComplete=='function'){
						jpmc.ui.Util.onDOMComplete({type:'DOMComplete'});
					}
					if ((/loaded|complete/).test(document.readyState)) {
						winLoad();
					} else {
						jpmc.ui.Util.attachEvent(window, 'onload', function() {
							winLoad();
						});
					}
				}, 25);
			}
		};
		var winLoad = function() {
			if (!window.jpmc_ui_Util_isWindowLoaded) {
				window.jpmc_ui_Util_isWindowLoaded = true;
				jpmc.ui.Util.isWindowLoaded = true;
				if(typeof jpmc.ui.Util.onWindowLoad=='function'){
					jpmc.ui.Util.onWindowLoad({type:'WindowLoad'});
				}
			}
		};
		var poll = function() {
			if ((/loaded|complete/).test(document.readyState)) {domLoad('readyState');}
			if (!window.jpmc_ui_Util_isDOMComplete) { setTimeout(function () {poll();}, 10); }
		};
		var wait =function() {
			if (typeof document.addEventListener == 'function') {
				document.addEventListener('DOMContentLoaded', domLoad, false);
			} else {
				//IE Respects the defer tag
				document.write('<script id="jpmc_ui_Util_ie_onload" defer src=javascript:void(0)><\/script>');
				var script = document.getElementById('jpmc_ui_Util_ie_onload');
				if(script.readyState=='loading') {
					script.onreadystatechange = function() {
						if (this.readyState == "complete") {
							domLoad();
							//prevent memory leak
							script.onreadystatechange = null;
						}
					};
				} else {
					poll();
				}
			}
		};
		if ((/WebKit|KHTML/i).test(navigator.userAgent)) {
			poll();
		} else {
			wait();
		}
	}();

}

/**
 * @private
 */
new function() {

	/**
	 * Determine the JavaScript version the old fashioned way
	 */
	for (var x=1; x<10; x++) {
		document.write('<script language="JavaScript1.' + x + '">jpmc.ui.Util.jsVersion = "1.' + x + '";<\/script>');
	}

}();

/**
 * @fileoverview Default Logging Class
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Logging namespace
 * @class
 */
jpmc.util.logging = {};

/**
 * A static class that contains useful methods and properties.
 * @class A static class that contains useful methods and properties.<br>
 * @constructor
 */
jpmc.util.logging.Level = function() {};

/**
 * OFF is a special level that can be used to turn off logging
 * @Final
 * @type number
 */
jpmc.util.logging.Level.OFF     = 0;
/**
 * SEVERE is a message level indicating a serious failure
 * @Final
 * @type number
 */
jpmc.util.logging.Level.SEVERE  = 1;
/**
 * WARNING is a message level indicating a potential problem
 * @Final
 * @type number
 */
jpmc.util.logging.Level.WARNING = 2;
/**
 * INFO is a message level for informational messages
 * @Final
 * @type number
 */
jpmc.util.logging.Level.INFO    = 3;
/**
 * CONFIG is a message level for static configuration messages
 * @Final
 * @type number
 */
jpmc.util.logging.Level.CONFIG  = 4;
/**
 * FINE is a message level providing tracing information
 * @Final
 * @type number
 */
jpmc.util.logging.Level.FINE    = 5;
/**
 * FINER indicates a fairly detailed tracing message
 * @Final
 * @type number
 */
jpmc.util.logging.Level.FINER   = 6;
/**
 * FINEST indicates a highly detailed tracing message
 * @Final
 * @type number
 */
jpmc.util.logging.Level.FINEST  = 7;
/**
 * ALL indicates that all messages should be logged (Default)
 * @Final
 * @type number
 */
jpmc.util.logging.Level.ALL     = 8;
/**
 * Gets the name of the level
 * @param {jpmc.util.logging.Level} level One of the {@link jpmc.util.logging.Level Level} constants.
 * @type string
 * @returns The name of the level in string format (ie: INFO, ALL, etc...)
 */
jpmc.util.logging.Level.getName = function(level) {
	var names = ['OFF','SEVERE','WARNING','INFO','CONFIG','FINE','FINER','FINEST','ALL'];
	if (level in names) {
		return names[level];
	} else {
		return 'Unknown';
	}
};


/**
 * A Handler object takes log messages from a Logger and exports them. It might for example, write them to a console or write them to a file, or send them to a network logging service, or forward them to an OS log, or whatever.
 * @constructor
 * @param {jpmc.util.logging.Level} level (Optional) The minimum logging message level to be logged by this Handler.
 *			Defaults to jpmc.util.logging.Level.ALL if no level is provided.
 * @param {function} handler (Optional) The function that will accept a string parameter
 * @type void
 */
jpmc.util.logging.Logger = function(level, handler) {
	var m_handler = (typeof handler == 'function') ? handler : jpmc.util.logging.DefaultLogHandler;
	var m_level = (typeof level == 'number') ? level : jpmc.util.logging.Level.ALL;

	/**
	 * Sets/Gets if logging for this handler is enabled (default true)
	 * @type boolean
	 */
	this.enabled = true;

	/**
	 * Calls the function that will handle the logging message
	 * @param {jpmc.util.logging.Level} level (Optional) Logging level for this message.
	 *        Defaults to jpmc.util.logging.Level.ALL if no level is provided.
	 * @param {string} msg The string message
	 * @param {object} caller (Optional) The object that called the loggin function
	 * @type void
	 */
	this.log = function(level, msg, caller) {
		if(typeof level != 'number') {level = jpmc.util.logging.Level.ALL;}
		if (!this.enabled) {return;}
		if (level>m_level) {return;}
		m_handler(level, msg, caller||this);
	};

	/**
	 * Set the value for this level
	 * @param {jpmc.util.logging.Level} level Set the minimum logging message level to be logged by this Handler.
	 * @type void
	 */
	this.setLevel = function(level) {m_level = level;};

	/**
	 * Get the {@link jpmc.util.logging.Level Level} for this logger
	 * @type Level
	 * @returns {@link jpmc.util.logging.Level Level}
	 */
	this.getLevel = function() {return m_level;};
};


/**
 * A Handler object takes log messages from a Logger and exports them. It might for example, write them to a console or write them to a file, or send them to a network logging service, or forward them to an OS log, or whatever.
 * @constructor
 * @type void
 * @requires jpmc.lang.Exception
 */
jpmc.util.logging.Proxy = function() {

	var self = this;

	var m_loggers = [];

	/**
	 * Sets/Gets if logging is enabled (default true)
	 * @type boolean
	 */
	this.enabled = true;

	/**
	 * Add a log Handler to receive logging messages
	 * @param {jpmc.util.logging.Logger} logger Logging object to add to the proxy
	 * @type void
	 */
	this.addLogger = function(logger) {
		if (logger.constructor != jpmc.util.logging.Logger) {
			throw new jpmc.lang.Exception(self, 'abort', 'Expected type jpmc.util.logging.Logger', 'Object type mismatch');
		}
		m_loggers[m_loggers.length] = logger;
	};

	/**
	 * Remove a log Handler
	 * @param {jpmc.util.logging.Logger} logger Logging object to remove from the proxy
	 * @type void
	 */
	this.removeLogger = function(logger) {
		var aTmp = [];
		for (var x=0; x<m_loggers.length; x++) {
			if (logger != m_loggers[x]) {
				aTmp[aTmp.length] = m_loggers[x];
			}
		}
		m_loggers = aTmp;
		aTmp = null;
	};

	/**
	 * Log a message, with no arguments
	 * @param {jpmc.util.logging.Level} level (Optional) Logging level for this message.
	 *			Defaults to jpmc.util.logging.Level.ALL if no level is provided.
	 * @param {string} msg The string message
	 * @param {object} caller (Optional) The object that called the loggin function
	 * @type void
	 */
	this.log = function(level, msg, caller) {
		if(typeof level != 'number') {level = jpmc.util.logging.Level.ALL;}
		if (!this.enabled) {return;}
		for (var x=0; x<m_loggers.length; x++) {
			m_loggers[x].log(level, msg, caller);
		}
	};
};


/**
 * A static class that contains useful methods and properties.
 * @class A static class that contains useful methods and properties.<br>
 * @constructor
 */
jpmc.util.logging.Util = function() {};

/**
 * Provides a standard text log formater
 * @param {jpmc.util.logging.Level} level One of the {@link jpmc.util.logging.Level Level} constants.
 * @param {string} msg The string message
 * @param {object} caller (Optional) The object that called the loggin function
 * @type string
 */
jpmc.util.logging.Util.formatText = function(level, msg, caller) {
	var src = 'Unknown';
	if (caller!==undefined && typeof jpmc.lang.Util != 'undefined') {
		src = jpmc.lang.Util.getClassName(caller);
	}
	return jpmc.util.logging.Util.formatTime()+'|'+src+'|'+jpmc.util.logging.Level.getName(level)+'|'+msg;
};

/**
 * Provides a standard HTML log formater
 * @param {jpmc.util.logging.Level} level One of the {@link jpmc.util.logging.Level Level} constants.
 * @param {string} msg The string message
 * @param {object} caller (Optional) The object that called the loggin function
 * @type object
 * @returns HTML object with color formatting
 */
jpmc.util.logging.Util.formatHTML = function(level, msg, caller) {
	var src = 'Unknown';
	if (caller!==undefined && typeof jpmc.lang.Util != 'undefined') {
		src = jpmc.lang.Util.getClassName(caller);
	}
	var colorText = function(txt, color) {
		var spn = document.createElement("span");
		spn.style.color = color;
		spn.appendChild(document.createTextNode(txt));
		return spn;
	};
	var logP = document.createElement("pre");
	var spnClass = colorText(src, '#009900');
	spnClass.style.padding = '0px 7px';
	var spnMsg = colorText(msg, '#333333');
	spnMsg.style.padding = '0px 7px';
	logP.appendChild(colorText(jpmc.util.logging.Util.formatTime(), '#000099'));
	logP.appendChild(spnClass);
	logP.appendChild(colorText(jpmc.util.logging.Level.getName(level), '#000099'));
	logP.appendChild(spnMsg);
	logP.style.margin = '0px';
	return logP;
};

/**
 * Provides a standard time formater
 * @param {date} date (Optional) The date to format
 * @type string
 */
jpmc.util.logging.Util.formatTime = function(date) {
	var padLeft = function(str,c,n){
		var s = str.toString();
		while (s.length < n) {s = c + s;}
		return s;
	};
	var dtm = date?date:new Date();
	var yr = dtm.getFullYear();
	var mo = padLeft(dtm.getMonth()+1,'0',2);
	var dy = padLeft(dtm.getDate(),'0',2);
	var hr = padLeft(dtm.getHours(),'0',2);
	var mn = padLeft(dtm.getMinutes(),'0',2);
	var se = padLeft(dtm.getSeconds(),'0',2);
	var ms = padLeft(dtm.getMilliseconds(),'0',3);
	return yr+'-'+mo+'-'+dy+' '+hr+':'+mn+':'+se+':'+ms;
};


/**
 * A default log handler for the Logger
 * @param {jpmc.util.logging.Level} level (Optional) Logging level for this message.
 *        Defaults to jpmc.util.logging.Level.ALL if no level is provided.
 * @param {string} msg The string message
 * @param {object} caller (Optional) The object that called the loggin function
 * @private
 */
jpmc.util.logging.DefaultLogHandler = function(level, msg, caller) {
	msg+='';
	var child = jpmc.util.logging.Util.formatHTML(level, msg.replace(/[\r\n]/g,' '), caller);
	try {
		//Get the target object
		var target;
		var win = jpmc.util.logging.DefaultLogHandler.window;
		switch (typeof win) {
			case 'string':
				target = document.getElementById(win);
				break;
			case 'object':
				target = win;
				break;
			default: return;
		}
		if (!target) {target = document.body;}
		//Process event queue
		for (var x=0; x<jpmc.util.logging.DefaultLogHandler.queue.length; x++) {
			target.appendChild(jpmc.util.logging.DefaultLogHandler.queue[x]);
		}
		jpmc.util.logging.DefaultLogHandler.queue = [];
		//Add new event
		if (!target.appendChild) {throw {};}
		target.appendChild(child);
		//Manage log size
		if (jpmc.util.logging.DefaultLogHandler.size>0) {
			while (target.childNodes.length > jpmc.util.logging.DefaultLogHandler.size) {
				target.removeChild(target.childNodes[0]);
			}
		}
	} catch(ex) {
		jpmc.util.logging.DefaultLogHandler.queue[jpmc.util.logging.DefaultLogHandler.queue.length] = child;
		//alert(jpmc.util.logging.Util.formatText(level, msg, caller).replace(/\|/g,'\n'));
	}
};

/**
 * The number of log events the default log handler will display before truncating begins (default 0 = no truncating)
 * @type number
 */
jpmc.util.logging.DefaultLogHandler.size = 0;

/**
 * HTML Element or Element ID where the default log handler will place log events (default undefined = document.body)
 * @type mixed
 */
jpmc.util.logging.DefaultLogHandler.window = null;

/**
 * Array used to save queue'd log entries
 * @type object[]
 * @private
 */
jpmc.util.logging.DefaultLogHandler.queue = [];
/**
 * @fileoverview Object used for configuring sort orders
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * An object used for configuring sort orders
 * @constructor
 * @class jpmc.util.SortParam
 * @param {string} prop The name of the object property to use for comparison.
 * @param {boolean} asc A flag indicating the sort order (true:asc, false:dsc).
 */

jpmc.util.SortParam = function(prop, asc) {

	/**
	 * The name of the object property to use for comparison.
	 * @type string
	 */
	this.prop = prop;

	/**
	 * A flag indicating the sort order (true:ascending, false:descending).
	 * @type boolean
	 */
	this.asc = asc;
};
/**
 * @fileoverview Object for building large strings
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the StringBuilder object.
 * @class Provides an string buiulder for javascript.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 * @version 1.0 2006-07-24
 * @since Javascript 1.2
 */
jpmc.util.StringBuilder = function() {
	var A=[], B=[];

	/**
	 * Appends the specified string to the end of this character sequence
	 *
	 * Note:  Although Javascript is not strongly typed, the parameter must
	 *        be a string in order to guarantee the expected results.
	 *
	 * @param {string} value String to be added to the sequence
	 * @type void
	 */
	this.append = function(value) {A[A.length]=value;};

	/**
	 * Clears the string buffer
	 * @type void
	 */
	this.clear = function() {A=[];B=[];};

	/**
	 * Determins there is data in the buffer string buffer
	 * @type boolean
	 * @return True if there is data in the string buffer
	 */
	this.isClear = function() {return ((A.length + B.length)===0);};

	/**
	 * Adds the specified string to the begining of this character sequence
	 *
	 * Note:  Although Javascript is not strongly typed, the parameter must
	 *        be a string in order to guarantee the expected results.
	 *
	 * @param {string} value String to be added to the sequence
	 * @type void
	 */
	this.insert = function(value) {B[B.length]=value;};

	/**
	 * Returns a string representing the data in this sequence.
	 * A new String object is allocated and initialized to contain
	 * the character sequence currently represented by this object.
	 * This String is then returned. Subsequent changes to this
	 * sequence do not affect the contents of the String.<br>
	 *
	 * @type string
	 * @return A string representation of this sequence of characters
	 */
	this.toString = function() {return B.reverse().concat(A).join('');};
};
/**
 * @fileoverview Object for measuring time related events
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Timer class
 * @class Helps manage timing events.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-08-07
 */
jpmc.util.Timer = function() {

	var m_time = (new Date()).valueOf();

	/**
	 * Returns the number in milliseconds since Jan 1st, 1970.
	 * @type number
	 * @return Number indicating the number of milliseconds since Jan 1st, 1970.
	 */
	this.getTickCount = function() {
		return (new Date()).valueOf();
	};

	/**
	 * Returns the number in milliseconds in the timer, and resets the timer.
	 * @type number
	 * @return Number in milliseconds.
	 */
	this.getInterval = function() {
		var dtm = (new Date()).valueOf();
		var diff = dtm - m_time;
		m_time = dtm;
		return diff;
	};

	/**
	 * Returns a number per milliseconds in the timer, and resets the timer.
	 * @param {number} count A number that equates to units in the amount of time passed.
	 * @type number
	 * @return Number per milliseconds.
	 */
	this.getRate = function(count) {
		var dtm = (new Date()).valueOf();
		var diff = dtm - m_time;
		m_time = dtm;
		if (diff===0) {return count;}
		return count/diff;
	};

	/**
	 * Returns the number of milliseconds in the timer.
	 * @type number
	 * @return Number in milliseconds.
	 */
	this.poke = function() {
		var dtm = (new Date()).valueOf();
		var diff = dtm - m_time;
		return diff;
	};

};
/**
 * @fileoverview Base16 data encoding object.
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Base16 data encoding class
 * @constructor
 * @class Encodec and decodes date with Base16
 * @extends jpmc.codec.BaseCodec
 */
jpmc.codec.Base16 = function() {

	jpmc.codec.BaseCodec.apply(this, arguments);

	var str_char = jpmc.lang.Data.characterSet.BASE16;
	var arr_char = str_char.split('');
	var mimeencode = function(intIn) {return (intIn>=0)?arr_char[intIn]:'=';};
	var mimedecode = function(strIn) {return (strIn.length !== 1)?-1:str_char.indexOf(strIn);};

	/**
	 * Gets the character string used to encode and decode the data
	 * @type string
	 * @returns The characters used in the encoding and decoding of the data
	 */
	this.getCharacters = function() {
		return str_char;
	};

	/**
	 * Sets the character string used to encode and decode the data
	 * @param {string} str Character string used to encode and decode the data
	 * @type boolean
	 * @returns Boolean indicating if the character string was set
	 */
	this.setCharacters = function(str) {
		if (str.length!=str_char.length) {return false;}
		str_char = str;
		arr_char = str_char.split('');
		return true;
	};

	/**
	 * Encodes the data using Base16 logic
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Encoded data in the requested format, indicated by the outDataType parameter
	 */
	this.encode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		for (var x=0; x<len; x++) {
			var bits = helpers.DataReader.charCodeAt(x);
			helpers.DataBuilder.appendChar(mimeencode(bits >> 4 & 0x0F));
			helpers.DataBuilder.appendChar(mimeencode(bits & 0x0F));
		}

		return helpers.DataBuilder.getValue();

	};

	/**
	 * Decodes the Base16 encoded data
	 * @param {object} data Data to be decoded (string, binary array)
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Decoded data in the requested format, indicated by the outDataType parameter
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if a decoder encounters a failure condition during the decode process.
	 */
	this.decode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		if (len & 0x01) {
			throw new jpmc.lang.Exception(this, 'jpmc.codec.Base16.decode', 'Incorrect data length','Data Corruption');
		}

		for (var x=0; x<len; x+=2) {
			var bits = mimedecode(helpers.DataReader.charAt(x)) << 4;
			bits |= mimedecode(helpers.DataReader.charAt(x+1));
			helpers.DataBuilder.appendNumber(bits);
		}

		return helpers.DataBuilder.getValue();

	};
};
/**
 * @fileoverview Base32 data encoding object.
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Base32 data encoding class
 * @constructor
 * @class Encodec and decodes date with Base32
 * @extends jpmc.codec.BaseCodec
 */
jpmc.codec.Base32 = function() {

	jpmc.codec.BaseCodec.apply(this, arguments);

	var str_char = jpmc.lang.Data.characterSet.BASE32;
	var arr_char = str_char.split('');
	var mimeencode = function(intIn) {return (intIn>=0)?arr_char[intIn]:'=';};
	var mimedecode = function(strIn) {return (strIn.length !== 1)?-1:str_char.indexOf(strIn);};

	/**
	 * Gets the character string used to encode and decode the data
	 * @type string
	 * @returns The characters used in the encoding and decoding of the data
	 */
	this.getCharacters = function() {
		return str_char;
	};

	/**
	 * Sets the character string used to encode and decode the data
	 * @param {string} str Character string used to encode and decode the data
	 * @type boolean
	 * @returns Boolean indicating if the character string was set
	 */
	this.setCharacters = function(str) {
		if (str.length!=str_char.length) {return false;}
		str_char = str;
		arr_char = str_char.split('');
		return true;
	};

	/**
	 * Encodes the data using Base32 logic
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Encoded data in the requested format, indicated by the outDataType parameter
	 */
	this.encode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		var bits = 0;
		var bitCount = 0;
		var ip = 0;

		while (true) {
			// get bits if we don't have enough
			if (bitCount < 5) {
				if (ip >= len) {break;}
				// get another input
				bits <<= 8;
				bits = bits | helpers.DataReader.charCodeAt(ip++);
				bitCount += 8;
			}
			// emit and remove them
			bitCount -= 5;
			helpers.DataBuilder.appendChar(mimeencode(bits >> bitCount));
			bits &= ~(0x1F << bitCount);
		}
		// add padding and output if necessary
		if (bitCount > 0) {
			helpers.DataBuilder.appendChar(mimeencode(bits << (5 - bitCount)));
		}
		return helpers.DataBuilder.getValue();

	};

	/**
	 * Decodes the Base32 encoded data
	 * @param {object} data Data to be decoded (string, binary array)
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Decoded data in the requested format, indicated by the outDataType parameter
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if a decoder encounters a failure condition during the decode process.
	 */
	this.decode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		var inputCheck = len & 0x0F;
		if (inputCheck === 1 || inputCheck === 3 || inputCheck === 6) {
			throw new jpmc.lang.Exception(this, 'jpmc.codec.Base32.decode', 'Incorrect data length','Data Corruption');
		}
		var bits = 0;
		var bitCount = 0;
		var ip = 0;
		var val;
		while (ip < len) {
			// get more bits
			val = mimedecode(helpers.DataReader.charAt(ip++));
			//non Base32 Character
			if (val===-1) {
				throw new jpmc.lang.Exception(this, 'jpmc.codec.Base32.decode', 'Invalid Base32 character','Data Corruption');
			}
			bits <<= 5;
			bits = bits | val;
			bitCount += 5;
			// emit & remove if we can
			if (bitCount >= 8) {
				bitCount -= 8;
				helpers.DataBuilder.appendNumber(bits >> bitCount);
				bits &= ~(0xFF << bitCount);
			}
		}

		if (bits !==0) {
			throw new jpmc.lang.Exception(this, 'jpmc.codec.Base32.decode', 'Padding not all 0s','Data Corruption');
		}

		return helpers.DataBuilder.getValue();
	};
};
/**
 * @fileoverview Base64 data encoding object.
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Base64 data encoding class
 * @constructor
 * @class Encodec and decodes date with Base64
 * @extends jpmc.codec.BaseCodec
 */
jpmc.codec.Base64 = function() {

	jpmc.codec.BaseCodec.apply(this, arguments);

	var str_char = jpmc.lang.Data.characterSet.BASE64;
	var arr_char = str_char.split('');
	var mimeencode = function(intIn) {return (intIn>=0)?arr_char[intIn]:'=';};
	var mimedecode = function(strIn) {return (strIn.length !== 1)?-1:str_char.indexOf(strIn);};

	/**
	 * Gets the character string used to encode and decode the data
	 * @type string
	 * @returns The characters used in the encoding and decoding of the data
	 */
	this.getCharacters = function() {
		return str_char;
	};

	/**
	 * Sets the character string used to encode and decode the data
	 * @param {string} str Character string used to encode and decode the data
	 * @type boolean
	 * @returns Boolean indicating if the character string was set
	 */
	this.setCharacters = function(str) {
		if (str.length!=str_char.length) {return false;}
		str_char = str;
		arr_char = str_char.split('');
		return true;
	};

	/**
	 * Encodes the data using Base64 logic
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Encoded data in the requested format, indicated by the outDataType parameter
	 */
	this.encode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		if (window.btoa) { //Mozilla
			helpers.DataBuilder.appendString(window.btoa(helpers.DataReader.toString()));
		} else {
			for (var x=0; x<len; x+=3) {
					var c1 = helpers.DataReader.charCodeAt(x);
					var c2 = helpers.DataReader.charCodeAt(x+1) || 0;
					var c3 = helpers.DataReader.charCodeAt(x+2) || 0;
					helpers.DataBuilder.appendChar(mimeencode(c1 >> 2));
					helpers.DataBuilder.appendChar(mimeencode((c1 & 3) * 16 + (c2 >> 4)));
					helpers.DataBuilder.appendChar(mimeencode((x+2>len)? -1: (c2 & 0x0F) * 4 + (c3 >> 6)));
					helpers.DataBuilder.appendChar(mimeencode((x+3>len)? -1: (c3 & 0x3F)));
			}
		}
		return helpers.DataBuilder.getValue();
	};

	/**
	 * Decodes the Base64 encoded data
	 * @param {object} data Data to be decoded (string, binary array)
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Decoded data in the requested format, indicated by the outDataType parameter
	 */
	this.decode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		if (window.atob) { //Mozilla
			helpers.DataBuilder.appendString(window.atob(helpers.DataReader.toString()));
		} else {
			for (var x=0; x<len; x+=4) {
				var w1 = mimedecode(helpers.DataReader.charAt(x));
				var w2 = mimedecode(helpers.DataReader.charAt(x+1));
				var w3 = mimedecode(helpers.DataReader.charAt(x+2));
				var w4 = mimedecode(helpers.DataReader.charAt(x+3));
				if (w2 >= 0) {helpers.DataBuilder.appendNumber(((w1 * 4 + (w2 >> 4)) & 0xFF));}
				if (w3 >= 0) {helpers.DataBuilder.appendNumber(((w2 * 16 + (w3 >> 2)) & 0xFF));}
				if (w4 >= 0) {helpers.DataBuilder.appendNumber(((w3 * 64 + w4) & 0xFF));}
			}
		}
		return helpers.DataBuilder.getValue();
	};
};
/**
 * @fileoverview Code for all {@link jpmc.codec.BaseCodec} implementations.
 * @author Ben White (ben.x.white@jpmchase.com)
 */


/**
 * Creates an instance of the BaseCodec interface
 * @class Provides the highest level of abstraction for codecs.
 *   Every implementation of BaseCodec provides this common generic
 *   interface which allows a user to pass a generic Object to any
 *   BaseCodec implementation in the codec package.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-07-19
 */
jpmc.codec.BaseCodec = function(){
	/**
	 * Encode Interface
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type object
	 * @return object
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if a encoder encounters a failure condition during the encode process.
	 */
	this.encode = function(data, outDataType, inDataType) {
		throw new jpmc.lang.Exception(this, 'jpmc.codec.BaseCodec.encode', 'This method must be overwritten');
	};

	/**
	 * Decode Interface
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type object
	 * @return object
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if a decoder encounters a failure condition during the decode process.
	 */
	this.decode = function(data, outDataType, inDataType) {
		throw new jpmc.lang.Exception(this, 'jpmc.codec.BaseCodec.decode', 'This method must be overwritten');
	};

	/**
	 * Initializes the internal settings for the requested conversion
	 * @param {object} data Data to be used in the encode/decode process
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type void
	 * @return void
	 */
	this.init = function(data, outDataType, inDataType) {
		var obj = {};
		obj.DataReader = new jpmc.util.DataReader(data, inDataType);
		var m_outDataType = ((outDataType===undefined) ? obj.DataReader.getDataType() : outDataType);
		obj.DataBuilder = new jpmc.util.DataBuilder(m_outDataType);
		return obj;
	};
};
/**
 * @fileoverview Convert data from one format to another (ascii, binary, hex, etc...)
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Null data encoding class
 * @constructor
 * @class Convert data from one format to another with no data content changes
 * @extends jpmc.codec.BaseCodec
 */
jpmc.codec.Null = function() {

	jpmc.codec.BaseCodec.apply(this, arguments);

	/**
	 * Converts data from one format to another
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Data in the requested format, indicated by the outDataType parameter
	 */
	this.encode = function(data, outDataType, inDataType) {
		var helpers = this.init(data, outDataType, inDataType);

		var dtIn = helpers.DataReader.getDataType();
		var dtOut = helpers.DataBuilder.getDataType();

		switch(dtOut) {
			//Bypass DataReader if possible
			case dtIn:                               return data;
			//Bypass DataBuilder if possible
			case jpmc.lang.Data.format.TEXT:          return helpers.DataReader.toString();
			case jpmc.lang.Data.format.BINARY:        return helpers.DataReader.toBinary();
			case jpmc.lang.Data.format.BIG_ENDIAN:    return helpers.DataReader.toBigEndian();
			case jpmc.lang.Data.format.LITTLE_ENDIAN: return helpers.DataReader.toLittleEndian();
			default:
				switch (dtIn) {
					//Use optimized DataBuilder functions if possible
					case jpmc.lang.Data.format.TEXT:          helpers.DataBuilder.appendString(data);       break;
					case jpmc.lang.Data.format.BINARY:        helpers.DataBuilder.appendBinary(data);       break;
					case jpmc.lang.Data.format.BIG_ENDIAN:    helpers.DataBuilder.appendBigEndian(data);    break;
					case jpmc.lang.Data.format.LITTLE_ENDIAN: helpers.DataBuilder.appendLittleEndian(data); break;
					default:
						//The ole standby
						var bin = helpers.DataReader.toBinary();
						helpers.DataBuilder.appendBinary(bin);
						break;
				}
		}

		return helpers.DataBuilder.getValue();
	};

	/**
	 * Converts data from one format to another
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Data in the requested format, indicated by the outDataType parameter
	 */
	this.decode = function(data, outDataType, inDataType) {
		return this.encode(data, outDataType, inDataType);
	};

};
/**
 * @fileoverview Basic RLE (Run Length Encoding) data compression object. Useful for compressing binary files.
 * String compressed as frequency of each byte in sucession
 * @author Ben White (ben.x.white@jpmchase.com)
 */


/**
 * RLE (Run Length Encoding) data compression.
 * Useful for compressing binary files
 * @constructor
 * @class Encodec and decodes date with Run Length Encoding
 * @extends jpmc.codec.BaseCodec
 */
jpmc.codec.RLE = function(){

	jpmc.codec.BaseCodec.apply(this, arguments);

	/**
	 * Character used to indicate repeditive characters.
	 * @type number
	 */
	this.controlCharacter = 255;


	var processBuffer = function(bufferIn, ctrlChar) {
		var bufferOut = [];
		if (bufferIn.length>3 || ctrlChar==bufferIn[0]) {
			bufferOut[bufferOut.length] = ctrlChar;
			bufferOut[bufferOut.length] = bufferIn.length;
			bufferOut[bufferOut.length] = bufferIn[0];
		} else {
			bufferOut = bufferIn;
		}
		return bufferOut;
	};

	/**
	 * Encodes the data using RLE data compression
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Encoded data in the requested format, indicated by the outDataType parameter
	 */
	this.encode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		if (len>0) {
			var characterBuffer = [helpers.DataReader.charCodeAt(0)];
			for (var i=1; i<len; i++) {
				var character = helpers.DataReader.charCodeAt(i);
				if (characterBuffer[0]!=character || characterBuffer.length===255) {
					helpers.DataBuilder.appendBinary(processBuffer(characterBuffer, this.controlCharacter));
					characterBuffer = [];
				}
				characterBuffer[characterBuffer.length] = character;
			}
			helpers.DataBuilder.appendBinary(processBuffer(characterBuffer, this.controlCharacter));
		}
		return helpers.DataBuilder.getValue();
	};

	/**
	 * Decodes the RLE compressed data
	 * @param {object} data Data to be decoded (string, binary array)
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Decoded data in the requested format, indicated by the outDataType parameter
	 */
	this.decode = function(data, outDataType, inDataType) {

		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength();

		for (var i=0; i<len; i++) {
			var isControl = (helpers.DataReader.charCodeAt(i)==this.controlCharacter);
			var freq = isControl?helpers.DataReader.charCodeAt(i+1):1;
			var character = helpers.DataReader.charCodeAt( (isControl?i+2:i));
			if (isControl) {i+=2;}
			for (var cnt=0; cnt<freq; cnt++) {
				helpers.DataBuilder.appendNumber(character);
			}
		}
		return helpers.DataBuilder.getValue();
	};

};
/**
 * @fileoverview Soundex data representation object.
 * @author Ben White (ben.x.white@jpmchase.com)
 *
 *
 * v 1.0c  TESTED-OK  20060112
 * -----------------------
 *
 * The following SoundEx function is:
 *
 *    (C) Copyright 2002 - 2006, Creativyst, Inc.
 *               ALL RIGHTS RESERVED
 *
 * For more information go to:
 *           http://www.Creativyst.com
 * or email:
 *           Support@Creativyst.com
 *
 * Redistribution and use in source and binary
 * forms, with or without modification, are
 * permitted provided that the following conditions
 * are met:
 *
 *   1. Redistributions of source code must
 *      retain the above copyright notice, this
 *      list of conditions and the following
 *      disclaimer.
 *
 *   2. Redistributions in binary form must
 *      reproduce the above copyright notice,
 *      this list of conditions and the
 *      following disclaimer in the
 *      documentation and/or other materials
 *      provided with the distribution.
 *
 *   3. All advertising materials mentioning
 *      features or use of this software must
 *      display the following acknowledgement:
 *      This product includes software developed
 *      by Creativyst, Inc.
 *
 *   4. The name of Creativyst, Inc. may not be
 *      used to endorse or promote products
 *      derived from this software without
 *      specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY CREATIVYST CORPORATION ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Adapted by BenWhite@jpmchase.com for use with the jpmc framework 2006-09-18
 *
 */


/**
 * Creates an instance of the Soundex word indexing class
 * @constructor
 * @class Creates a Soundex index from any word
 * @extends jpmc.codec.BaseCodec
 */
jpmc.codec.Soundex = function() {

	jpmc.codec.BaseCodec.apply(this, arguments);

	var m_length = 10; //10 digit accuracy

	/**
	 * Sets the length of the Soundex result
	 * @param {number} len A number indicating the length of the Soundex result (valid 4-10)
	 * @type void
	 */
	this.setLength = function(len) {
		if (len > 10) {len = 10;}
		if (len < 4) {len = 4;}
		m_length = len;
	};

	/**
	 * Gets the length of the Soundex result
	 * @type number
	 */
	this.getLength = function() {
		return m_length;
	};

	/**
	 * Sets the census mode of the Soundex function.<br>0=Enhanced (Default) (Improved over original census code)<br>1=Normal (Used in most censuses)<br>2=Special (Used intermittently)
	 * @type number
	 */
	this.mode = 0;

	/**
	 * Creates a Soundex index value for any word
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Soundex value in the requested format, indicated by the outDataType parameter
	 */
	this.encode = function(data, outDataType, inDataType) {
		var helpers = this.init(data, outDataType, inDataType);

		var WordStr = helpers.DataReader.toString().toUpperCase();

		var TmpStr;
		var CurChar;
		var LastChar;
		var WSLen;
		var FirstLetter;

		if(WordStr.length!==0) {

			var SoundExLen = (this.mode?4:m_length);

			WordStr = WordStr.replace(/[^A-Z]/gi, ' '); // rpl non-chars w space
			WordStr = WordStr.replace(/^\s*/g,    '' ); // remove leading space
			WordStr = WordStr.replace(/\s*$/g,    '' ); // remove trailing space

			if(this.mode===0) {
			/* Non-standard improvements */
				WordStr = WordStr.replace(/DG/g,        'G');   // Change DG to G
				WordStr = WordStr.replace(/GH/g,        'H');   // Change GH to H
				WordStr = WordStr.replace(/GN/g,        'N');   // Change GN to N
				WordStr = WordStr.replace(/KN/g,        'N');   // Change KN to N
				WordStr = WordStr.replace(/PH/g,        'F');   // Change PH to F
				WordStr = WordStr.replace(/MP([STZ])/g, 'M$1'); // MP if fllwd by ST|Z
				WordStr = WordStr.replace(/^PS/g,       'S');   // Chng leadng PS to S
				WordStr = WordStr.replace(/^PF/g,       'F');   // Chng leadng PF to F
				WordStr = WordStr.replace(/MB/g,        'M');   // Chng MB to M
				WordStr = WordStr.replace(/TCH/g,       'CH');  // Chng TCH to CH
			}

			// The above improvements may change this first letter
			FirstLetter = WordStr.substr(0,1);

			// in case 1st letter is an H or W and we're in this.mode = 1
			if(FirstLetter == 'H' || FirstLetter == 'W') {
				TmpStr = WordStr.substr(1);
				WordStr = '-';
				WordStr += TmpStr;
			}

			// In properly done census SoundEx the H and W will be squezed out before
			// performing the test for adjacent digits (this differs from how 'real' vowels are handled)
			if(this.mode === 1) {
				WordStr = WordStr.replace(/[HW]/g, '');
			} else {
				WordStr = WordStr.replace(/[HW]/g, '0');
			}

			// Begin Classic SoundEx
			WordStr = WordStr.replace(/[AEIOUY]/g,   '0');
			WordStr = WordStr.replace(/[BPFV]/g,     '1');
			WordStr = WordStr.replace(/[CSGJKQXZ]/g, '2');
			WordStr = WordStr.replace(/[DT]/g,       '3');
			WordStr = WordStr.replace(/[L]/g,        '4');
			WordStr = WordStr.replace(/[MN]/g,       '5');
			WordStr = WordStr.replace(/[R]/g,        '6');

			// Remove extra equal adjacent digits
			WSLen = WordStr.length;
			LastChar = '';
			TmpStr = '';
			for(var i = 0; i < WSLen; i++) {
				CurChar = WordStr.charAt(i);
				if(CurChar == LastChar) {
					TmpStr += ' ';
				} else {
					TmpStr += CurChar;
					LastChar = CurChar;
				}
			}
			WordStr = TmpStr;


			WordStr = WordStr.substr(1);          // Drop first letter code
			WordStr = WordStr.replace(/\s/g, ''); // remove spaces
			WordStr = WordStr.replace(/0/g, '');  // remove zeros
			WordStr += '0000000000';              // pad with zeros on right

			WordStr = FirstLetter + WordStr;      // Add first letter of word

			WordStr = WordStr.substr(0,SoundExLen); // size to taste

			helpers.DataBuilder.appendString(WordStr);

		}
		return helpers.DataBuilder.getValue();
	};

	/**
	 * Creates a Soundex index value for any word
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Data in the requested format, indicated by the outDataType parameter
	 */
	this.decode = function(data, outDataType, inDataType) {
		return this.encode(data, outDataType, inDataType);
	};

};
/**
 * @fileoverview Code for all {@link jpmc.crypto.BaseCrypto} implementations.
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the BaseCrypto interface
 * @class Provides the highest level of abstraction for codecs.
 *   Every implementation of BaseCrypto provides this common generic
 *   interface which allows a user to pass a generic Object to any
 *   BaseCrypto implementation in the crypto package.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-07-19
 */
jpmc.crypto.BaseCrypto = function(){
	/**
	 * Encrypt Interface
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type object
	 * @return object
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if a encrypter encounters a failure condition during the encrypt process.
	 */
	this.encrypt = function(data, outDataType, inDataType) {
		throw new jpmc.lang.Exception(this, 'jpmc.crypto.BaseCrypto.encrypt', 'This method must be overwritten');
	};

	/**
	 * Decrypt Interface
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type object
	 * @return object
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if a decrypter encounters a failure condition during the decrypt process.
	 */
	this.decrypt = function(data, outDataType, inDataType) {
		throw new jpmc.lang.Exception(this, 'jpmc.crypto.BaseCrypto.decrypt', 'This method must be overwritten');
	};

	/**
	 * Initializes the internal settings for the requested conversion
	 * @param {object} data Data to be used in the encrypt/decrypt process
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type void
	 * @return void
	 */
	this.init = function(data, outDataType, inDataType) {
		var obj = {};
		obj.DataReader = new jpmc.util.DataReader(data, inDataType);
		var m_outDataType = ((outDataType===undefined) ? obj.DataReader.getDataType() : outDataType);
		obj.DataBuilder = new jpmc.util.DataBuilder(m_outDataType);
		return obj;
	};
};
/**
 * @fileoverview Code for all {@link jpmc.crypto.BaseHash} implementations.
 * @author Ben White (ben.x.white@jpmchase.com)
 */


/**
 * Creates an instance of the BaseHash interface
 * @class Provides the highest level of abstraction for hashes.
 *   Every implementation of BaseHash provides this common generic
 *   interface which allows a user to pass a generic Object to any
 *   BaseHash implementation in the crypto package.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-07-19
 */
jpmc.crypto.BaseHash = function(){
	/**
	 * Encode Interface
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type object
	 * @return object
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if a encoder encounters a failure condition during the encode process.
	 */
	this.hash = function(data, outDataType, inDataType) {
		throw new jpmc.lang.Exception(this, 'jpmc.crypto.BaseHash.hash', 'This method must be overwritten');
	};


	/**
	 * Initializes the internal settings for the requested conversion
	 * @param {object} data Data to be used in the encode/decode process
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type void
	 * @return void
	 */
	this.init = function(data, outDataType, inDataType) {
		var obj = {};
		obj.DataReader = new jpmc.util.DataReader(data, inDataType);
		var m_outDataType = ((outDataType===undefined) ? obj.DataReader.getDataType() : outDataType);
		obj.DataBuilder = new jpmc.util.DataBuilder(m_outDataType);
		return obj;
	};
};
/**
 * @fileoverview A JavaScript BlowfishCBC 448 Bit implementation
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the symmetrical BlowfishCBC (448 Bit) encryption class
 * @constructor
 * @class Builds BlowfishCBC encryption class.<br>
 * @extends jpmc.crypto.BlowfishECB
 * @param {mixed} key Data of any type supported by the {@link jpmc.util.DataReader} class
 * @param {jpmc.lang.Data.format} DataType (Optional) Data format of the key parameter (Auto-detects: TEXT & BINARY)
 */
jpmc.crypto.BlowfishCBC = function(key, DataType) {

	jpmc.crypto.BlowfishECB.apply(this, arguments);

	var m_ivHi = 0;
	var m_ivLo = 0;

	/**
	 * Sets the initialization vector (IV). The key must be set before the IV can be set.
	 * @param {mixed} data Data containing the new IV material of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} DataType (Optional) Data format of the data parameter (Auto-detects: TEXT & BINARY)
	 * @type void
	 */
	this.setIV = function(data, DataType) {

		var dr = new jpmc.util.DataReader(data, DataType);

		var unHiLo = dr.toBigEndian();

		m_ivHi = unHiLo[0];
		m_ivLo = unHiLo[1];
	};

	/**
	 * Gets the current IV material (of the size of one block).
	 * @param {jpmc.lang.Data.format} DataType (Optional) Output format
	 * @type mixed
	 * @returns Current IV material (of the size of one block)
	 */
	this.getIV = function(DataType) {

		var df = (typeof DataType == 'undefined')?jpmc.lang.Data.format.HEX:DataType;

		var db = new jpmc.util.DataBuilder(df);

		db.appendBigEndian([m_ivHi,m_ivLo]);

		return db.getValue();
	};

	/**
	 * Encrypts the data using the symmetrical BlowfishCBC algorithm
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Encrypted data in the requested format, indicated by the outDataType parameter
	 */
	this.encrypt = function(data, outDataType, inDataType) {
		//init
		var helpers = this.init(data, outDataType, inDataType);

		var beDataIn = helpers.DataReader.toBigEndian();
		var beDataOut = [];

		encryptCBC.call(this, beDataIn, beDataOut);

		helpers.DataBuilder.appendBigEndian(beDataOut);

		return helpers.DataBuilder.getValue();
	};

	/**
	 * Decrypts the data using the symmetrical BlowfishCBC algorithm
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Decrypted data in the requested format, indicated by the outDataType parameter
	 */
	this.decrypt = function(data, outDataType, inDataType) {
		//init
		var helpers = this.init(data, outDataType, inDataType);

		var beDataIn = helpers.DataReader.toBigEndian();
		var beDataOut = [];

		decryptCBC.call(this, beDataIn, beDataOut);

		helpers.DataBuilder.appendBigEndian(beDataOut);

		return helpers.DataBuilder.getValue();
	};

	var encryptCBC = function(dataIn, dataOut) {

		var box = this.getBox();

		var pbox = box[0];
		var sbox1 = box[1];
		var sbox2 = box[2];
		var sbox3 = box[3];
		var sbox4 = box[4];

		var unHi,unLo,nRound;
		var x=0;
		var y=0;

		while(x<dataIn.length) {

			nRound = 1;

			unHi = m_ivHi ^ dataIn[x++];
			unLo = m_ivLo ^ dataIn[x++];

			unHi ^= pbox[0];
			while (nRound<17) {
				unLo ^= (((sbox1[(unHi >> 24) & 0xFF] + sbox2[((unHi >> 16) & 0xFF)]) ^ sbox3[((unHi >> 8) & 0xFF)]) + sbox4[(unHi & 0xFF)]) ^ pbox[nRound++];
				unHi ^= (((sbox1[(unLo >> 24) & 0xFF] + sbox2[((unLo >> 16) & 0xFF)]) ^ sbox3[((unLo >> 8) & 0xFF)]) + sbox4[(unLo & 0xFF)]) ^ pbox[nRound++];
			}
			unLo ^= pbox[17];

			dataOut[y++] = unLo;
			dataOut[y++] = unHi;

			m_ivHi = unLo;
			m_ivLo = unHi;

		}
		return dataOut;
	};

	var decryptCBC = function(dataIn, dataOut) {

		var box = this.getBox();

		var pbox = box[0];
		var sbox1 = box[1];
		var sbox2 = box[2];
		var sbox3 = box[3];
		var sbox4 = box[4];

		var unHi,unLo,unHiBak,unLoBak,nRound;
		var x=0;
		var y=0;

		while(x<dataIn.length) {

			nRound = 16;

			unHi = unHiBak = dataIn[x++];
			unLo = unLoBak = dataIn[x++];

			unHi ^= pbox[17];
			while (nRound>0) {
				unLo ^= (((sbox1[(unHi >> 24) & 0xFF] + sbox2[((unHi >> 16) & 0xFF)]) ^ sbox3[((unHi >> 8) & 0xFF)]) + sbox4[(unHi & 0xFF)]) ^ pbox[nRound--];
				unHi ^= (((sbox1[(unLo >> 24) & 0xFF] + sbox2[((unLo >> 16) & 0xFF)]) ^ sbox3[((unLo >> 8) & 0xFF)]) + sbox4[(unLo & 0xFF)]) ^ pbox[nRound--];
			}
			unLo ^= m_ivHi ^ pbox[0];
			unHi ^= m_ivLo;

			dataOut[y++] = unLo;
			dataOut[y++] = unHi;

			m_ivHi = unHiBak;
			m_ivLo = unLoBak;

		}
		return dataOut;
	};

};
/**
 * @fileoverview A JavaScript BlowfishECB 448 Bit implementation
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the symmetrical BlowfishECB (448 Bit) encryption class
 * @constructor
 * @class Builds BlowfishECB encryption class.<br>
 * @extends jpmc.crypto.BaseCrypto
 * @param {mixed} key Data of any type supported by the {@link jpmc.util.DataReader} class
 * @param {jpmc.lang.Data.format} DataType (Optional) Data format of the key parameter (Auto-detects: TEXT & BINARY)
 */
jpmc.crypto.BlowfishECB = function(key, DataType) {

	jpmc.crypto.BaseCrypto.apply(this, arguments);

	//  Maximum (and recommended) key size in bytes.
	var MAX_KEY_LENGTH = 56;

	var PBOX_ENTRIES = 18;
	var SBOX_ENTRIES = 256;

	var m_nIsWeakKey = -1;

	var m_pbox = [];
	var m_sbox1 = [];
	var m_sbox2 = [];
	var m_sbox3 = [];
	var m_sbox4 = [];

	if (typeof key != 'undefined') {
		this.setKey(key, DataType);
	}

	/**
	 * Determins if the assigned key causes possible encryption weaknesses
	 * @type boolean
	 * @returns Boolean indicating if the assigned key is weak
	 */
	this.isWeakKey = function() {
		if (m_nIsWeakKey==-1) {
			var nI,nJ;
			for (nI = 0; nI < SBOX_ENTRIES - 1; nI++) {
				for (nJ = nI + 1; nJ < SBOX_ENTRIES; nJ++) {
					if ((m_sbox1[nI] == m_sbox1[nJ]) || (m_sbox2[nI] == m_sbox2[nJ]) || (m_sbox3[nI] == m_sbox3[nJ]) || (m_sbox4[nI] == m_sbox4[nJ])) {
						m_nIsWeakKey = 1;
						return true;
					}
				}
			}
			m_nIsWeakKey = 0;
		}
		return (m_nIsWeakKey==1);
	};

	/**
	 * Gets the pbox and sbox data
	 * @private
	 */
	this.getBox = function() {
		return [m_pbox,m_sbox1,m_sbox2,m_sbox3,m_sbox4];
	};

	/**
	 * Resets the instance with a key material. Allows the switch of keys at runtime without any object allocation.
	 * @param {mixed} key Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} DataType (Optional) Data format of the key parameter (Auto-detects: TEXT & BINARY)
	 * @type void
	 */
	this.setKey = function(key, DataType) {

		var dr = new jpmc.util.DataReader(key, DataType);

		var bKey = dr.toBinary();

		var nI, nJ, nKeyPos, nKeyEnd;
		var unBuild, unHi, unLo;

		m_nIsWeakKey = -1;

		m_pbox = boxes.p.concat([]);
		m_sbox1 = boxes.s1.concat([]);
		m_sbox2 = boxes.s2.concat([]);
		m_sbox3 = boxes.s3.concat([]);
		m_sbox4 = boxes.s4.concat([]);

		if (bKey.length===0) {return;}
		if (bKey.length>MAX_KEY_LENGTH) {return;}

		nKeyPos = 0;
		nKeyEnd = bKey.length;
		unBuild = 0;

		for (nI = 0; nI < PBOX_ENTRIES; nI++) {
			for (nJ = 0; nJ < 4; nJ++) {
				unBuild = (unBuild << 8) | bKey[nKeyPos++];
				if (nKeyEnd === nKeyPos) {nKeyPos = 0;}
			}
			m_pbox[nI] ^= unBuild;
		}

		var hl = [0,0];

		for (nI = 0; nI < PBOX_ENTRIES;) {
			encryptECB(hl, hl);
			m_pbox[nI++] = hl[0];
			m_pbox[nI++] = hl[1];
		}
		for (nI = 0; nI < SBOX_ENTRIES;) {
			encryptECB(hl, hl);
			m_sbox1[nI++] = hl[0];
			m_sbox1[nI++] = hl[1];
		}
		for (nI = 0; nI < SBOX_ENTRIES;) {
			encryptECB(hl, hl);
			m_sbox2[nI++] = hl[0];
			m_sbox2[nI++] = hl[1];
		}
		for (nI = 0; nI < SBOX_ENTRIES;) {
			encryptECB(hl, hl);
			m_sbox3[nI++] = hl[0];
			m_sbox3[nI++] = hl[1];
		}
		for (nI = 0; nI < SBOX_ENTRIES;) {
			encryptECB(hl, hl);
			m_sbox4[nI++] = hl[0];
			m_sbox4[nI++] = hl[1];
		}

	};

	/**
	 * Encrypts the data using the symmetrical BlowfishECB algorithm
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Encrypted data in the requested format, indicated by the outDataType parameter
	 */
	this.encrypt = function(data, outDataType, inDataType) {
		//init
		var helpers = this.init(data, outDataType, inDataType);

		var beDataIn = helpers.DataReader.toBigEndian();
		var beDataOut = [];

		encryptECB(beDataIn, beDataOut);

		helpers.DataBuilder.appendBigEndian(beDataOut);

		return helpers.DataBuilder.getValue();
	};

	/**
	 * Decrypts the data using the symmetrical BlowfishECB algorithm
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Decrypted data in the requested format, indicated by the outDataType parameter
	 */
	this.decrypt = function(data, outDataType, inDataType) {
		//init
		var helpers = this.init(data, outDataType, inDataType);

		var beDataIn = helpers.DataReader.toBigEndian();
		var beDataOut = [];

		decryptECB(beDataIn, beDataOut);

		helpers.DataBuilder.appendBigEndian(beDataOut);

		return helpers.DataBuilder.getValue();
	};

	var encryptECB = function(dataIn, dataOut) {

		var pbox = m_pbox;
		var sbox1 = m_sbox1;
		var sbox2 = m_sbox2;
		var sbox3 = m_sbox3;
		var sbox4 = m_sbox4;

		var unHi,unLo,nRound;
		var x=0;
		var y=0;

		while(x<dataIn.length) {

			nRound = 1;

			unHi = dataIn[x++];
			unLo = dataIn[x++];

			unHi ^= pbox[0];
			while (nRound<17) {
				unLo ^= (((sbox1[(unHi >> 24) & 0xFF] + sbox2[((unHi >> 16) & 0xFF)]) ^ sbox3[((unHi >> 8) & 0xFF)]) + sbox4[(unHi & 0xFF)]) ^ pbox[nRound++];
				unHi ^= (((sbox1[(unLo >> 24) & 0xFF] + sbox2[((unLo >> 16) & 0xFF)]) ^ sbox3[((unLo >> 8) & 0xFF)]) + sbox4[(unLo & 0xFF)]) ^ pbox[nRound++];
			}
			unLo ^= pbox[17];

			dataOut[y++] = unLo;
			dataOut[y++] = unHi;

		}
		return dataOut;
	};

	var decryptECB = function(dataIn, dataOut) {

		var pbox = m_pbox;
		var sbox1 = m_sbox1;
		var sbox2 = m_sbox2;
		var sbox3 = m_sbox3;
		var sbox4 = m_sbox4;

		var unHi,unLo,nRound;
		var x=0;
		var y=0;

		while(x<dataIn.length) {

			nRound = 16;

			unHi = dataIn[x++];
			unLo = dataIn[x++];

			unHi ^= pbox[17];
			while (nRound>0) {
				unLo ^= (((sbox1[(unHi >> 24) & 0xFF] + sbox2[((unHi >> 16) & 0xFF)]) ^ sbox3[((unHi >> 8) & 0xFF)]) + sbox4[(unHi & 0xFF)]) ^ pbox[nRound--];
				unHi ^= (((sbox1[(unLo >> 24) & 0xFF] + sbox2[((unLo >> 16) & 0xFF)]) ^ sbox3[((unLo >> 8) & 0xFF)]) + sbox4[(unLo & 0xFF)]) ^ pbox[nRound--];
			}
			unLo ^= pbox[0];

			dataOut[y++] = unLo;
			dataOut[y++] = unHi;

		}
		return dataOut;
	};

	var boxes = {
		p:[
			0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822, 0x299f31d0,
			0x082efa98, 0xec4e6c89, 0x452821e6, 0x38d01377, 0xbe5466cf, 0x34e90c6c,
			0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5, 0xb5470917, 0x9216d5d9, 0x8979fb1b
		],
		s1:[
			0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed, 0x6a267e96, 0xba7c9045, 0xf12c7f99,
			0x24a19947, 0xb3916cf7, 0x0801f2e2, 0x858efc16, 0x636920d8, 0x71574e69, 0xa458fea3, 0xf4933d7e,
			0x0d95748f, 0x728eb658, 0x718bcd58, 0x82154aee, 0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013,
			0xc5d1b023, 0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e, 0x6c9e0e8b, 0xb01e8a3e,
			0xd71577c1, 0xbd314b27, 0x78af2fda, 0x55605c60, 0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440,
			0x55ca396a, 0x2aab10b6, 0xb4cc5c34, 0x1141e8ce, 0xa15486af, 0x7c72e993, 0xb3ee1411, 0x636fbc2a,
			0x2ba9c55d, 0x741831f6, 0xce5c3e16, 0x9b87931e, 0xafd6ba33, 0x6c24cf5c, 0x7a325381, 0x28958677,
			0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193, 0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032,
			0xef845d5d, 0xe98575b1, 0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5, 0x0f6d6ff3, 0x83f44239,
			0x2e0b4482, 0xa4842004, 0x69c8f04a, 0x9e1f9b5e, 0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0,
			0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3, 0x6eef0b6c, 0x137a3be4, 0xba3bf050, 0x7efb2a98,
			0xa1f1651d, 0x39af0176, 0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3, 0x3b8b5ebe,
			0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6, 0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d,
			0x37d0d724, 0xd00a1248, 0xdb0fead3, 0x49f1c09b, 0x075372c9, 0x80991b7b, 0x25d479d8, 0xf6e8def7,
			0xe3fe501a, 0xb6794c3b, 0x976ce0bd, 0x04c006ba, 0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
			0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f, 0x9b30952c, 0xcc814544, 0xaf5ebd09,
			0xbee3d004, 0xde334afd, 0x660f2807, 0x192e4bb3, 0xc0cba857, 0x45c8740f, 0xd20b5f39, 0xb9d3fbdb,
			0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279, 0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8,
			0x3c7516df, 0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760, 0x53317b48, 0x3e00df82,
			0x9e5c57bb, 0xca6f8ca0, 0x1a87562e, 0xdf1769db, 0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573,
			0x695b27b0, 0xbbca58c8, 0xe1ffa35d, 0xb8f011a0, 0x10fa3d98, 0xfd2183b8, 0x4afcb56c, 0x2dd1d35b,
			0x9a53e479, 0xb6f84565, 0xd28e49bc, 0x4bfb9790, 0xe1ddf2da, 0xa4cb7e33, 0x62fb1341, 0xcee4c6e8,
			0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4, 0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0,
			0xd08ed1d0, 0xafc725e0, 0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64, 0x8888b812, 0x900df01c,
			0x4fad5ea0, 0x688fc31c, 0xd1cff191, 0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1,
			0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299, 0xb4a84fe0, 0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9,
			0x165fa266, 0x80957705, 0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5, 0xfb9d35cf,
			0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49, 0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af,
			0x2464369b, 0xf009b91e, 0x5563911d, 0x59dfa6aa, 0x78c14389, 0xd95a537f, 0x207d5ba2, 0x02e5b9c5,
			0x83260376, 0x6295cfa9, 0x11c81968, 0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
			0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5, 0x571be91f, 0xf296ec6b, 0x2a0dd915,
			0xb6636521, 0xe7b9f9b6, 0xff34052e, 0xc5855664, 0x53b02d5d, 0xa99f8fa1, 0x08ba4799, 0x6e85076a
		],
		s2:[
			0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623, 0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266,
			0xecaa8c71, 0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29, 0xa0591340, 0xe4183a3e,
			0x3f54989a, 0x5b429d65, 0x6b8fe4d6, 0x99f73fd6, 0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1,
			0x4cdd2086, 0x8470eb26, 0x6382e9c6, 0x021ecc5e, 0x09686b3f, 0x3ebaefc9, 0x3c971814, 0x6b6a70a1,
			0x687f3584, 0x52a0e286, 0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c, 0x8e7d44ec, 0x5716f2b8,
			0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff, 0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd,
			0xd19113f9, 0x7ca92ff6, 0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc, 0xc8b57634, 0x9af3dda7,
			0xa9446146, 0x0fd0030e, 0xecc8c73e, 0xa4751e41, 0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331,
			0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf, 0x2cb81290, 0x24977c79, 0x5679b072, 0xbcaf89af,
			0xde9a771f, 0xd9930810, 0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6, 0x9f84cd87,
			0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c, 0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2,
			0xef1c1847, 0x3215d908, 0xdd433b37, 0x24c2ba16, 0x12a14d43, 0x2a65c451, 0x50940002, 0x133ae4dd,
			0x71dff89e, 0x10314e55, 0x81ac77d6, 0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
			0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570, 0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3,
			0x771fe71c, 0x4e3d06fa, 0x2965dcb9, 0x99e71d0f, 0x803e89d6, 0x5266c825, 0x2e4cc978, 0x9c10b36a,
			0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4, 0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960,
			0x5223a708, 0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883, 0xb17f37d1, 0x018cff28,
			0xc332ddef, 0xbe6c5aa5, 0x65582185, 0x68ab9802, 0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84,
			0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510, 0x13cca830, 0xeb61bd96, 0x0334fe1e, 0xaa0363cf,
			0xb5735c90, 0x4c70a239, 0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7, 0x9cab5cab, 0xb2f3846e,
			0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50, 0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7,
			0x9b540b19, 0x875fa099, 0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77, 0x11ed935f, 0x16681281,
			0x0e358829, 0xc7e61fd6, 0x96dedfa1, 0x7858ba99, 0x57f584a5, 0x1b227263, 0x9b83c3ff, 0x1ac24696,
			0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128, 0x58ebf2ef, 0x34c6ffea, 0xfe28ed61, 0xee7c3c73,
			0x5d4a14d9, 0xe864b7e3, 0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15, 0xfacb4fd0,
			0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105, 0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250,
			0xcf62a1f2, 0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3, 0x7f1524c3, 0x69cb7492, 0x47848a0b, 0x5692b285,
			0x095bbf00, 0xad19489d, 0x1462b174, 0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
			0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759, 0xcbee7460, 0x4085f2a7, 0xce77326e,
			0xa6078084, 0x19f8509e, 0xe8efd855, 0x61d99735, 0xa969a7aa, 0xc50c06c2, 0x5a04abfc, 0x800bcadc,
			0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9, 0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340,
			0xc5c43465, 0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a, 0xe6e39f2b, 0xdb83adf7
		],
		s3:[
			0xe93d5a68, 0x948140f7, 0xf64c261c, 0x94692934, 0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068,
			0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af, 0x1e39f62e, 0x97244546, 0x14214f74, 0xbf8b8840,
			0x4d95fc1d, 0x96b591af, 0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785, 0x7fac6dd0, 0x31cb8504,
			0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a, 0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb,
			0x68dc1462, 0xd7486900, 0x680ec0a4, 0x27a18dee, 0x4f3ffea2, 0xe887ad8c, 0xb58ce006, 0x7af4d6b6,
			0xaace1e7c, 0xd3375fec, 0xce78a399, 0x406b2a42, 0x20fe9e35, 0xd9f385b9, 0xee39d7ab, 0x3b124e8b,
			0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2, 0x3a6efa74, 0xdd5b4332, 0x6841e7f7, 0xca7820fb,
			0xfb0af54e, 0xd8feb397, 0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7, 0xd096954b,
			0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33, 0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c,
			0xfdf8e802, 0x04272f70, 0x80bb155c, 0x05282ce3, 0x95c11548, 0xe4c66d22, 0x48c1133f, 0xc70f86dc,
			0x07f9c9ee, 0x41041f0f, 0x404779a4, 0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
			0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2, 0x02e1329e, 0xaf664fd1, 0xcad18115,
			0x6b2395e0, 0x333e92e1, 0x3b240b62, 0xeebeb922, 0x85b2a20e, 0xe6ba0d99, 0xde720c8c, 0x2da2f728,
			0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0, 0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e,
			0x0a476341, 0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8, 0x991be14c, 0xdb6e6b0d,
			0xc67b5510, 0x6d672c37, 0x2765d43b, 0xdcd0e804, 0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b,
			0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3, 0xbb132f88, 0x515bad24, 0x7b9479bf, 0x763bd6eb,
			0x37392eb3, 0xcc115979, 0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b, 0x12754ccc, 0x782ef11c,
			0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350, 0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9,
			0x44421659, 0x0a121386, 0xd90cec6e, 0xd5abea2a, 0x64af674e, 0xda86a85f, 0xbebfe988, 0x64e4c3fe,
			0x9dbc8057, 0xf0f7c086, 0x60787bf8, 0x6003604d, 0xd1fd8346, 0xf6381fb0, 0x7745ae04, 0xd736fccc,
			0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f, 0x77a057be, 0xbde8ae24, 0x55464299, 0xbf582e61,
			0x4e58f48f, 0xf2ddfda2, 0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255, 0x46fcd9b9,
			0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2, 0x466e598e, 0x20b45770, 0x8cd55591, 0xc902de4c,
			0xb90bace1, 0xbb8205d0, 0x11a86248, 0x7574a99e, 0xb77f19b6, 0xe0a9dc09, 0x662d09a1, 0xc4324633,
			0xe85a1f02, 0x09f0be8c, 0x4a99a025, 0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
			0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52, 0x50115e01, 0xa70683fa, 0xa002b5c4, 0x0de6d027,
			0x9af88c27, 0x773f8641, 0xc3604c06, 0x61a806b5, 0xf0177a28, 0xc0f586e0, 0x006058aa, 0x30dc7d62,
			0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634, 0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76,
			0x6f05e409, 0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9, 0x1ac15bb4, 0xd39eb8fc,
			0xed545578, 0x08fca5b5, 0xd83d7cd3, 0x4dad0fc4, 0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c,
			0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837, 0xd79a3234, 0x92638212, 0x670efa8e, 0x406000e0
		],
		s4:[
			0x3a39ce37, 0xd3faf5cf, 0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742, 0xd3822740, 0x99bc9bbe,
			0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b, 0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4,
			0x5748ab2f, 0xbc946e79, 0xc6a376d2, 0x6549c2c8, 0x530ff8ee, 0x468dde7d, 0xd5730a1d, 0x4cd04dc6,
			0x2939bbdb, 0xa9ba4650, 0xac9526e8, 0xbe5ee304, 0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
			0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4, 0x83c061ba, 0x9be96a4d, 0x8fe51550, 0xba645bd6,
			0x2826a2f9, 0xa73a3ae1, 0x4ba99586, 0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69, 0x77fa0a59,
			0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593, 0xe990fd5a, 0x9e34d797, 0x2cf0b7d9, 0x022b8b51,
			0x96d5ac3a, 0x017da67d, 0xd1cf3ed6, 0x7c7d2d28, 0x1f9f25cf, 0xadf2b89b, 0x5ad6b472, 0x5a88f54c,
			0xe029ac71, 0xe019a5e6, 0x47b0acfd, 0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
			0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c, 0x15056dd4, 0x88f46dba, 0x03a16125, 0x0564f0bd,
			0xc3eb9e15, 0x3c9057a2, 0x97271aec, 0xa93a072a, 0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb, 0x26dcf319,
			0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb, 0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f,
			0x4de81751, 0x3830dc8e, 0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce, 0x5121ce64, 0x774fbe32,
			0xa8b6e37e, 0xc3293d46, 0x48de5369, 0x6413e680, 0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166,
			0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae, 0x5bbef7dd, 0x1b588d40, 0xccd2017f, 0x6bb4e3bb,
			0xdda26a7e, 0x3a59ff45, 0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb, 0x8d6612ae, 0xbf3c6f47,
			0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370, 0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d,
			0x4040cb08, 0x4eb4e2cc, 0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d, 0x06b89fb4, 0xce6ea048,
			0x6f3f3b82, 0x3520ab82, 0x011a1d4b, 0x277227f8, 0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd,
			0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9, 0xe01cc87e, 0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7,
			0x1a908749, 0xd44fbd9a, 0xd0dadecb, 0xd50ada38, 0x0339c32a, 0xc6913667, 0x8df9317c, 0xe0b12b4f,
			0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c, 0xbf97222c, 0x15e6fc2a, 0x0f91fc71, 0x9b941525,
			0xfae59361, 0xceb69ceb, 0xc2a86459, 0x12baa8d1, 0xb6c1075e, 0xe3056a0c, 0x10d25065, 0xcb03a442,
			0xe0ec6e0e, 0x1698db3b, 0x4c98a0be, 0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
			0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d, 0x9b992f2e, 0xe60b6f47, 0x0fe3f11d,
			0xe54cda54, 0x1edad891, 0xce6279cf, 0xcd3e7e6f, 0x1618b166, 0xfd2c1d05, 0x848fd2c5, 0xf6fb2299,
			0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02, 0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc,
			0xde966292, 0x81b949d0, 0x4c50901b, 0x71c65614, 0xe6c6c7bd, 0x327a140a, 0x45e1d006, 0xc3f27b9a,
			0xc9aa53fd, 0x62a80f00, 0xbb25bfe2, 0x35bdd2f6, 0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b,
			0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0, 0xba38209c, 0xf746ce76, 0x77afa1c5, 0x20756060,
			0x85cbfe4e, 0x8ae88dd8, 0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c, 0x01c36ae4, 0xd6ebe1f9,
			0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f, 0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6
		]
	};

};
/**
 * @fileoverview A JavaScript CRC32 implementation
 * @author Ben White (ben.x.white@jpmchase.com)
 */

 /**
 * Creates an instance of the CRC32 data encoding class
 * @constructor
 * @class Builds CRC32 hash with provided data
 * @extends jpmc.crypto.BaseHash
 */
jpmc.crypto.CRC32 = function() {

	jpmc.crypto.BaseHash.apply(this, arguments);

	/**
	 * Number of bytes to consider in the hash process (default 0=all)
	 * @type number
	 */
	this.count = 0;

	// CRC polynomial - 0xEDB88320
	var crcTable = [
		0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3,
		0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91,
		0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7,
		0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5,
		0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,
		0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59,
		0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f,
		0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d,

		0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433,
		0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
		0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457,
		0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65,
		0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb,
		0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9,
		0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
		0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad,

		0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683,
		0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1,
		0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7,
		0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
		0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b,
		0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79,
		0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f,
		0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d,

		0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713,
		0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21,
		0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777,
		0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45,
		0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db,
		0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
		0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf,
		0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
	];

	/**
	 * Creates a hash of the data using CRC32
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType Ignored, always returns a 32bit number
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type number
	 * @returns Hash representation of the data in numeric format
	 */
	this.hash = function(data, outDataType, inDataType) {
		//init
		var helpers = this.init(data, outDataType, inDataType);

		var k, b;
		var bytes = helpers.DataReader.getLength();
		var crc = 0xFFFFFFFF;
		if (this.count>0 && bytes>this.count) {bytes = this.count;}
		for (var i=0; i<bytes; i++) {
			b = helpers.DataReader.charCodeAt(i);
			k = (crc ^ b) & 0x000000FF;
			crc = ( (crc >> 8) & 0x00FFFFFF ) ^ crcTable[k];
		}
		crc ^= 0xFFFFFFFF;

		//Force to 32-bit unsigned number
		crc = parseInt((0x100000000 + crc).toString(2).slice(-32),2);

		return crc;

	};

};
/**
 * @fileoverview A JavaScript MD5 implementation
 * @author Ben White (ben.x.white@jpmchase.com)
 */

 /**
 * Creates an instance of the MD5 data encoding class
 * @constructor
 * @class Builds MD5 hash with provided data
 * @extends jpmc.crypto.BaseHash
 */
jpmc.crypto.MD5 = function() {

	jpmc.crypto.BaseHash.apply(this, arguments);

	var m_key;

	/**
	 * Sets the key to use for the MD5 hash
	 * @param {mixed} key Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} DataType (Optional) Data format of the key parameter (Auto-detects: TEXT & BINARY)
	 * @type void
	 */
	this.setKey = function(key, DataType) {

		try {
			var dr = new jpmc.util.DataReader(key, DataType);
			m_key = dr.toLittleEndian();
		} catch(ex) {
			m_key = undefined;
		}

	};


	/**
	 * These functions implement the four basic operations the algorithm uses.
	 */
	var safe_add = function(x, y) {var lsw = (x & 0xFFFF) + (y & 0xFFFF);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return (msw << 16) | (lsw & 0xFFFF);};
	var bit_rol = function(num, cnt) {return (num << cnt) | (num >>> (32 - cnt));};
	var md5_cmn = function(q, a, b, x, s, t) {return safe_add(bit_rol(safe_add(safe_add(safe_add(a, q), x), t), s), b);};
	var md5_ff = function(a, b, c, d, x, s, t) {return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);};
	var md5_gg = function(a, b, c, d, x, s, t) {return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);};
	var md5_hh = function(a, b, c, d, x, s, t) {return md5_cmn(b ^ c ^ d, a, b, x, s, t);};
	var md5_ii = function(a, b, c, d, x, s, t) {return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);};

	/**
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	var core_md5 = function (x,len) {
		/* append padding */
		x[len >> 5] |= 0x80 << (len & 0x1F);
		x[(((len + 64) >>> 9) << 4) + 14] = len;

		var a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878;

		for(var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;

			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	};

	/**
	 * Creates a hash of the data using MD5
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Hash representation of the data in the requested format, indicated by the outDataType parameter
	 */
	this.hash = function(data, outDataType, inDataType) {
		//init
		var helpers = this.init(data, outDataType, inDataType);

		var len = helpers.DataReader.getLength();

		var binArray = helpers.DataReader.toLittleEndian();

		if (typeof m_key != 'undefined') {

			var bkey = m_key.concat([]);

			if(bkey.length > 16) {bkey = core_md5(bkey, bkey.length * 8);}

			var ipad = [], opad = [];
			for(var i=0; i<16; i++) {
				ipad[i] = bkey[i] ^ 0x36363636;
				opad[i] = bkey[i] ^ 0x5C5C5C5C;
			}
			var hash = core_md5(ipad.concat(binArray), 512 + len * 8);

			helpers.DataBuilder.appendLittleEndian(core_md5(opad.concat(hash), 512 + 128));

		} else {

			helpers.DataBuilder.appendLittleEndian(core_md5(binArray, len * 8));

		}
		return helpers.DataBuilder.getValue();

	};

};
/**
 * @fileoverview A JavaScript implementation of the Secure Hash Standard
 * Version 0.3 Copyright Angel Marin 2003-2004 - http://anmar.eu.org/
 * Distributed under the BSD License
 * Some bits taken from Paul Johnston's SHA-1 implementation
 * @author ben white (ben.x.white@jpmchase.com)
 * @version 1.0 2006-08-07
 */

/**
 * Creates an instance of the SHA256 data encoding class
 * @constructor
 * @class Builds SHA256 hash with provided data
 * @extends jpmc.crypto.BaseHash
 */
jpmc.crypto.SHA256 = function() {

	jpmc.crypto.BaseHash.apply(this, arguments);

	/*
	 * Calculate the SHA-256 of an array of big-endian words, and a bit length
	 */
	var core_sha256 = function(data, len) {
		var K = [
			0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,
			0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,
			0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,
			0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,
			0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,
			0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,
			0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,
			0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2
		];
		var HASH = [0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19];
		var W = [];//new Array(64);
		var a, b, c, d, e, f, g, h;
		var T1, T2;
		/** These functions implement the basic operations the algorithm uses.*/
		var S = function(X, n) {return ( X >>> n ) | (X << (32 - n));};
		var R = function(X, n) {return ( X >>> n );};
		var Ch = function(x, y, z) {return ((x & y) ^ ((~x) & z));};
		var Maj = function(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));};
		var Sigma0256 = function(x) {return (S(x, 2) ^ S(x, 13) ^ S(x, 22));};
		var Sigma1256 = function(x) {return (S(x, 6) ^ S(x, 11) ^ S(x, 25));};
		var Gamma0256 = function(x) {return (S(x, 7) ^ S(x, 18) ^ R(x, 3));};
		var Gamma1256 = function(x) {return (S(x, 17) ^ S(x, 19) ^ R(x, 10));};
		var safe_add = function(x, y) {var lsw = (x & 0xFFFF) + (y & 0xFFFF);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return (msw << 16) | (lsw & 0xFFFF);};
		/* append padding */
		data[len >> 5] |= 0x80 << (24 - len & 0x1F);
		data[((len + 64 >> 9) << 4) + 15] = len;
		for ( var i = 0; i<data.length; i+=16 ) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
			for ( var j = 0; j<64; j++) {
				if (j < 16) {
					W[j] = data[j + i];
				} else {
					W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
				}
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	};


	/**
	 * Creates a hash of the data using SHA256
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Hash representation of the data in the requested format, indicated by the outDataType parameter
	 */
	this.hash = function(data, outDataType, inDataType) {

		//init
		var helpers = this.init(data, outDataType, inDataType);
		var len = helpers.DataReader.getLength() * 8;
		var mask = (1 << 8) - 1;
		var i;

		// Get an array of big-endian words
		var binArray = helpers.DataReader.toBigEndian();

		//Core SHA256 conversion
		var newBinArray = core_sha256(binArray, len);

		//Build output data
		helpers.DataBuilder.appendBigEndian(newBinArray);

		return helpers.DataBuilder.getValue();
	};

};
/**
 * @fileoverview A JavaScript XOR implementation
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the symmetrical XOR encryption class (weak encryption, but fast)
 * @constructor
 * @class Builds XOR encryption class.<br>
 * @extends jpmc.crypto.BaseCrypto
 * @param {mixed} key Data of any type supported by the {@link jpmc.util.DataReader} class
 * @param {jpmc.lang.Data.format} DataType (Optional) Data format of the key parameter (Auto-detects: TEXT & BINARY)
 */
jpmc.crypto.XOR = function(key, DataType) {

	jpmc.crypto.BaseCrypto.apply(this, arguments);

	var m_key = [];

	if (typeof key != 'undefined') {
		this.setKey(key, DataType);
	}

	/**
	 * Sets the key used for this basic encryption.
	 * @param {mixed} key Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} DataType (Optional) Data format of the key parameter (Auto-detects: TEXT & BINARY)
	 * @type void
	 */
	this.setKey = function(key, DataType) {
		var dr = new jpmc.util.DataReader(key, DataType);
		m_key = dr.toBinary();
	};

	/**
	 * Encrypts the data using the symmetrical XOR algorithm
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Encrypted data in the requested format, indicated by the outDataType parameter
	 */
	this.encrypt = function(data, outDataType, inDataType) {
		//init
		var helpers = this.init(data, outDataType, inDataType);

		var key_len = m_key.length;

		if (key_len>0) {

			var x,y;

			var dataIn = helpers.DataReader.toBinary();
			var dataOut = [];

			y=0;
			for (x=0; x<dataIn.length; x++) {
				dataOut[x] = dataIn[x] ^ m_key[y++];
				if (y===key_len) {y=0;}
			}

			helpers.DataBuilder.appendBinary(dataOut);
		}

		return helpers.DataBuilder.getValue();
	};

	/**
	 * Decrypts the data using the symmetrical XOR algorithm
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class
	 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
	 * @type mixed
	 * @returns Decrypted data in the requested format, indicated by the outDataType parameter
	 */
	this.decrypt = function(data, outDataType, inDataType) {

		return this.encrypt(data, outDataType, inDataType);
	};

};/**
 * @fileoverview AJAXRequest object used for communication
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the AJAXRequest class
 * @class Stores request information to be used with the AJAX class.<br>
 * @constructor
 * @param {string} method (Optional) Type of HTTP request to place (default: GET)
 * @param {string} url (Optional) The location of the HTTP request to be placed.
 * @param {string} formData (Optional) The data to be posted to the server.
 * @author Ben White ben.x.white@jpmchase.com
 * @version 1.0 2006-07-27
 */
jpmc.external.AJAXRequest = function(method, url, formData) {
	var self = this;
	var headers = {};
	//var methods = ['GET','POST','HEAD','PUT','DELETE','OPTIONS','TRACE','CONNECT','PROPFIND','PROPPATCH','MKCOL','COPY','MOVE','LOCK','UNLOCK'];

	/**
	 * The HTTP method used for the request (Default: GET)
	 * @type string
	 */
	this.method = method?method.toUpperCase():'GET';
	//if (methods.join().indexOf(this.method) == -1) {throw new jpmc.lang.Exception(self, 'constructor', 'Invalid request method', 'AJAX Exception');}

	/**
	 * URL to be requested
	 * @type string
	 */
	this.url = url;
	/**
	 * Data sent with post requests
	 * @type string
	 */
	this.formData = formData;
	/**
	 * Request timeout in seconds (Uses default AJAX value unless set otherwise)
	 * @type number
	 */
	this.timeout = undefined;
	/**
	 * Adds a header to be appended to the HTTP request
	 * @param (string) label The label of the header to be added
	 * @param (string) value The value of the header to be added
	 * @type void
	 */
	this.addHeader = function(label, value) {
		headers[label] = value;
	};
	/**
	 * Returns object populated with all the headers to be added to the request
	 * @type object
	 * @returns An object populated with all the headers to be added to the request
	 */
	this.getHeaders = function() {
		return headers;
	};
	/**
	 * Returns the value of requested header
	 * @param (string) label The label of the header to be returned
	 * @type string
	 * @returns Value of the header requested
	 */
	this.getHeader = function(label) {
		return headers[label];
	};
	/**
	 * Username for authentication
	 * @type string
	 */
	this.username = undefined;

	/**
	 * Password for authentication
	 * @type string
	 */
	this.password = undefined;
};

if (jpmc.external.AJAX) {jpmc.external.AJAX.Request = jpmc.external.AJAXRequest;}
/**
 * @fileoverview AJAXResponse object used for communication
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the AJAXResponse class
 * @class Stores response information and status to be used with the AJAX class.<br>
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @version 1.0 2006-07-27
 */
jpmc.external.AJAXResponse = function() {

	var self = this;

	/**
	 * Request was aborted
	 * @type boolean
	 */
	this.aborted = false;
	/**
	 * HTTP connection object
	 * @private
	 */
	this.connection = undefined;
	/**
	 * Date the request was placed
	 * @type date
	 */
	this.dateRequest = new Date();
	/**
	 * Date the response was received
	 * @type date
	 */
	this.dateResponse = undefined;
	/**
	 * Retrieves a specific response header indicated by the label
	 * @param {string} label name of the header value to retrieve
	 * @type string
	 * @returns The string value that cooresponds with the label
	 */
	this.getResponseHeader = function(label) {
		if (label in self.responseHeader) {
			return self.responseHeader[label];
		}
	};
	/**
	 * Flag indicating the success of the request
	 * @type boolean
	 */
	this.error = false;
	/**
	 * The response body
	 * @type string
	 */
	this.responseBody = undefined;
	/**
	 * The response header
	 * @type string
	 */
	this.responseHeaderString = '';
	/**
	 * The response header
	 * @type object
	 */
	this.responseHeader = {};
	/**
	 * The response text
	 * @type string
	 */
	this.responseText = undefined;
	/**
	 * The response xml object
	 * @type object
	 */
	this.responseXML = undefined;
	/**
	 * The status value of the response
	 * @type number
	 */
	this.status = 0;
	/**
	 * The status text of the response
	 * @type string
	 */
	this.statusText = 'uninitialized';
	/**
	 * The unique transaction ID of the request
	 * @type number
	 */
	this.transactionId = jpmc.external.AJAXResponse.transactionCount++;
	/**
	 * The url used in the initial HTTP request
	 * @type string
	 */
	this.url = undefined;
};

/**
 * Transaction ID counter
 * @private
 * @type number
 */
jpmc.external.AJAXResponse.transactionCount = 0;

if (jpmc.external.AJAX) {jpmc.external.AJAX.Response = jpmc.external.AJAXResponse;}/**
 * @fileoverview Object to manage AJAX communications
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the AJAX class
 * @class Returns data from servers using HTTP requests.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-07-27
 * @requires jpmc.lang.Exception
 */
jpmc.external.AJAX = function() {

	var self = this;

	/**
	 * Request timeout in seconds (0 = none, default 120)
	 * @type number
	 */
	this.timeout = 120;

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger} or {@link jpmc.util.logging.Proxy}
	 * @type object
	 */
	this.logHandler = {};

	//Timout timer IDs
	var timers = [];

	/**
	 * Function called to initiate HTTP request
	 * @param {mixed} request A URL string or a {@link jpmc.external.AJAXRequest} object. If this parameter is a URL string, a simple GET method is used.
 	 * @param {function} onSuccess (Optional) Event handler when the AJAX request is succesful
 	 * @param {function} onFailure (Optional) Event handler if the AJAX request throws an error
 	 * @param {mixed} attr (Optional) passthrough object or value send to the onSuccess and onFailure handlers
	 * @type object
	 * @returns returns a populated response object.
	 */
	this.request = function(request, onSuccess, onFailure, attr) {
		var msg;
		var hasData = typeof request.formData == 'string';

		if (typeof request=='string') {
			request = new jpmc.external.AJAXRequest('GET', request);
		}

		var isAsynchronous = (typeof onSuccess == 'function' || typeof onFailure == 'function');

		if (hasData) {
			if (request.method=='POST' && !request.getHeader('Content-Type')) {
				request.addHeader('Content-Type','application/x-www-form-urlencoded');
			}
			if (!request.getHeader('Content-Length')) {
				request.addHeader('Content-Length', request.formData.length);
			}
		}

		//Create response Object
		var response = new jpmc.external.AJAXResponse();
		response.url = request.url;

		//Log event
		if (this.logHandler.enabled) {
			this.logHandler.log(jpmc.util.logging.Level.INFO,'[ID:'+response.transactionId+'] Request: ' + request.method + ' - ' + request.url, this);
			for (var A in request) {
				if (typeof request[A] != 'function') {
					this.logHandler.log(null,'[ID:'+response.transactionId+'] Request.' + A + ': ' + request[A], this);
				} else {
					this.logHandler.log(null,'[ID:'+response.transactionId+'] Request.' + A + ': ' + (typeof request[A]), this);
				}
			}
		}

		//Create connection object
		response.connection = jpmc.helper.XML.getXMLHTTP();

		if (!response.connection) {
			msg = 'Unable to create request object.';
			if (this.logHandler.enabled) {
				this.logHandler.log(jpmc.util.logging.Level.SEVERE, msg, this);
			}
			response.error = true;
			response.status = -4;
			response.statusText = msg;
			if (isAsynchronous) {
				if (typeof onFailure == 'function') {
					onFailure(response, attr);
				}
			}
			return response;
		}

		//Open HTTP object
		try {
			response.connection.open(request.method, request.url, isAsynchronous, request.username, request.password);

			//Set HTTP headers
			var headers = request.getHeaders();
			for (var label in headers){
				if(headers.propertyIsEnumerable(label)){
					//Log event
					if (this.logHandler.enabled) {
						this.logHandler.log(null,'[ID:'+response.transactionId+'] Request.setRequestHeader('+label+', '+headers[label]+')', this);
					}
					response.connection.setRequestHeader(label, headers[label]);
				}
			}
			headers = null;

			//Attach Callback function
			if (isAsynchronous) {
				response.connection.onreadystatechange = function(){handleReadystateChange.call(self, response, onSuccess, onFailure, attr);};
			}

			//Manage timeout
			if (typeof request.timeout != 'number') {
				request.timeout = (typeof this.timeout == 'number')?this.timeout:0;
			}
			if (request.timeout!==0) {
				//Log event
				if (this.logHandler.enabled) {
					this.logHandler.log(null,'[ID:'+response.transactionId+'] Timeout Set: ' + request.timeout + ' seconds', this);
				}
				timers[response.transactionId] = setTimeout(function() {self.abort(response);}, (request.timeout * 1000));
			}

			//Send request
			response.connection.send(hasData?request.formData:null);

			if (isAsynchronous) {
				response.statusText = 'Sending';
			} else {
				//clean up abort timer stuff
				clearTimeout(timers[response.transactionId]);
				delete timers[response.transactionId];
				//capture response info
				populateResponse.call(this, response);
			}

		} catch(ex) {
			//clean up abort timer stuff
			clearTimeout(timers[response.transactionId]);
			delete timers[response.transactionId];
			//Typically security violation errors caught here
			msg = '[ID:'+response.transactionId+'] ' + ((typeof ex.message == 'string')?ex.message:'Unknown AJAX communication error');
			if (this.logHandler.enabled) {
				this.logHandler.log(jpmc.util.logging.Level.SEVERE, msg, this);
			}
			response.error = true;
			response.status = -3;
			response.statusText = msg;
			if (isAsynchronous) {
				if (typeof onFailure == 'function') {
					onFailure(response, attr);
				}
			}
		}

		return response;
	};

	/**
	 * This method evaluates the server response, creates and returns the results via
	 * its properties.  Success and failure cases will differ in the response
	 * object's property values.
	 * @private
	 */
	var populateResponse = function(response) {
		var getAttr = function(conn, attr, val) {
			try{
				return conn[attr];
			} catch(ex) {
				return val;
			}
		};
		/*if (response.constructor != jpmc.external.AJAXResponse) {
			throw new jpmc.lang.Exception(self, 'populateResponse', 'Expected type jpmc.external.AJAXResponse', 'Object type mismatch');
		}*/
		var headerObj = {};
		var headerStr = '';
		try {
			headerStr = response.connection.getAllResponseHeaders() || '';
			var header = headerStr.replace(/\r/g,'').split('\n');
			for(var i=0; i < header.length; i++){
				var pos = header[i].indexOf(':');
				if(pos != -1){
					headerObj[header[i].substring(0,pos)] = header[i].substring(pos+2);
				}
			}
		} catch(ex){}
		//Populate response object
		response.dateResponse = new Date();
		response.responseHeaderString = headerStr;
		response.responseHeader = headerObj;
		response.responseText = getAttr(response.connection,'responseText');
		response.responseBody = getAttr(response.connection,'responseBody');
		response.responseXML = getAttr(response.connection,'responseXML',null);
		response.status = getAttr(response.connection,'status', 0);
		response.statusText = getAttr(response.connection,'statusText');
		//Clean up connection
		response.connection = null;

		var isFileSystem = (response.status===0 && response.responseText!=='' && response.responseHeaderString==='');

		//Fix IE mangled status code
		if (response.status===1223) {
			response.status=204;
			response.statusText = 'No Content';
		}

		//manage response
		if ((response.status>=200 && response.status<300) || isFileSystem) {
			response.error = false;
		} else {
			if (response.aborted) {
				response.statusText = 'Transaction aborted.';
			} else {
				switch (response.status) {
					case 0:
						response.statusText = 'There was an error while communicating with the server.';
						break;
					case 12002:
						response.statusText = 'The operation timed out.';
						break;
					case 12007:
						response.statusText = 'The server name or address could not be resolved.';
						break;
					case 12029:
						response.statusText = 'A connection with the server could not be established.';
						break;
					case 12030:
						response.statusText = 'The connection with the server was terminated abnormally.';
						break;
					case 12031:
						response.statusText = 'Internet connection reset.';
						break;
					case 12152:
						response.statusText = 'There has been a network error.';
						break;
					default:
						break;
				}
			}
			response.error = true;
		}

		//Log event
		if (this.logHandler.enabled) {
			this.logHandler.log(jpmc.util.logging.Level.INFO,'[ID:'+response.transactionId+'] Response: ' + response.status + ' - ' + response.statusText, this);
			for (var A in response) {
				if (typeof response[A] != 'function') {
					this.logHandler.log(null,'[ID:'+response.transactionId+'] Response.' + A + ': ' + response[A], this);
				} else {
					this.logHandler.log(null,'[ID:'+response.transactionId+'] Response.' + A + ': ' + (typeof response[A]), this);
				}
			}
		}
	};

	/**
	 * This method attempts to interpret the server response and
	 * determine whether the transaction was successful, or if an error or
	 * exception was encountered.
	 * @private
	 */
	var handleReadystateChange = function(response, onSuccess, onFailure, attr) {
		/*if (response.constructor != jpmc.external.AJAXResponse) {
			throw new jpmc.lang.Exception(self, 'handleReadystateChange', 'Expected type jpmc.external.AJAXResponse', 'Object type mismatch');
		}*/

		var readyState = response.connection.readyState;

		if (this.logHandler.enabled) {
			/*
				0 = uninitialized
				1 = loading
				2 = loaded
				3 = interactive
				4 = complete
			*/
			this.logHandler.log(null,'[ID:' + response.transactionId + '] readyState:' + readyState,this);
		}
		if (readyState===4) {
			//clean up abort timer stuff
			clearTimeout(timers[response.transactionId]);
			delete timers[response.transactionId];

			//capture response info
			populateResponse.call(this, response);

			//Detect wierd IE bug (error thrown even though readyState is handled ok)
			//var ok = (response.step !== undefined);
			//delete response.step;

			if (response.error) {
				if (typeof onFailure == 'function') {
					onFailure(response, attr);
				}
			} else {
				if (typeof onSuccess == 'function') {
					onSuccess(response, attr);
				}
			}
		} //else {
			//response.step = readyState;
		//}
	};

	/**
	 * Public method to terminate a transaction, if it has not reached readyState 4.
	 * @param {jpmc.external.AJAXResponse} response Response object to abort
	 * @type boolean
	 * @public
	 */
	this.abort = function(response) {
		/*if (response.constructor != jpmc.external.AJAXResponse) {
			throw new jpmc.lang.Exception(self, 'abort', 'Expected type jpmc.external.AJAXResponse', 'Object type mismatch');
		}*/
		var ms=0;
		try {
			ms = (new Date()).valueOf() - response.dateResponse.valueOf();
		} catch(ex) {}
		//Log event
		if (this.logHandler.enabled) {
			this.logHandler.log(jpmc.util.logging.Level.INFO,'[ID:'+response.transactionId+'] Request Aborted: '+ms+' ms', this);
		}
		if (response.connection) {
			if (response.connection.readyState !==4 && response.connection.readyState!==0) {
					response.aborted = true;
					response.connection.abort();
					return true;
			}
		}
		return false;
	};

	/**
	 * Public utility to simplify extension of the AJAX class
	 * @param {string} desc Text used when logging events
	 * @param {object} classBase Instance of the object leveraging the AJAX class
	 * @param {object} classOut (Optional) Class to be returned to the onEvent functions
 	 * @param {function} onSuccess (Optional) Event handler when the AJAX call is successful
 	 * @param {function} onFailure (Optional) Event handler if the AJAX call throws error
	 * @param {mixed} classParam (Optional) Additional parameter to pass to the output class
	 * @type boolean
	 * @public
	 */
	this.wrapper = function(desc, classBase, classOut, onSuccess, onFailure, classParam) {
		return {
			isAsynchronous : (typeof onSuccess == 'function' || typeof onFailure == 'function'),
			onS : (typeof onSuccess != 'function') ? undefined : function(res, attr) {
					if (classBase.logHandler && classBase.logHandler.enabled) {
						classBase.logHandler.log(jpmc.util.logging.Level.INFO, 'Response: ' + desc, classBase);
					}
					if (classOut) {
						onSuccess(new classOut(res, classParam), attr);
					} else {
						onSuccess(res, attr);
					}
				},
			onF : (typeof onFailure != 'function')? undefined : function(res, attr) {
					if (classBase.logHandler && classBase.logHandler.enabled) {
						classBase.logHandler.log(jpmc.util.logging.Level.SEVERE, 'Error: '+desc+'\nDescription: '+res.statusText, classBase);
					}
					if (classOut) {
						onFailure(new classOut(res, classParam), attr);
					} else {
						onFailure(res, attr);
					}
				}
		};
	};

};

/**
 * This method assembles the form label and value pairs and constructs an encoded string.
 * request() will automatically initialize the transaction with
 * a HTTP header Content-Type of application/x-www-form-urlencoded.
 * @public
 * @param {object} form Form object.
 * @type string
 * @return x-www-form-urlencoded string equivelent to the form object
 * @requires jpmc.util.StringBuilder
 */
jpmc.external.AJAX.getFormData = function(form) {
	if (typeof form != 'object') {return '';}
	var oForm = form;
	var oElement, oName, oValue;
	var hasSubmit = false, hasParam = false;
	var formData = new jpmc.util.StringBuilder();

	// Iterate over the form elements collection to construct the label-value pairs.
	for (var i=0; i<oForm.elements.length; i++) {
		oElement = oForm.elements[i];
		// Do not submit fields that are disabled.
		if (!oElement.disabled) {
			// If the name attribute is not populated, the form field's value will not be submitted.
			if(oElement.name !== ''){
				oName = oElement.name;
				oValue = oElement.value;
				switch (oElement.type) {
					case 'select-one':
					case 'select-multiple':
						for (var j=0; j<oElement.options.length; j++) {
							if (oElement.options[j].selected) {
								if (!formData.isClear()) {formData.append('&');}
								formData.append(encodeURIComponent(oName) + '=');
								formData.append(encodeURIComponent(oElement.options[j].value || oElement.options[j].text));
							}
						}
						break;
					case 'radio':
					case 'checkbox':
						if (oElement.checked) {
							if (!formData.isClear()) {formData.append('&');}
							formData.append(encodeURIComponent(oName) + '=');
							formData.append(encodeURIComponent(oValue));
						}
						break;
					case 'file':    // stub for file as XMLHttpRequest can only send the file path as a string.
					case undefined: // stub for fieldset element which returns undefined.
					case 'reset':   // stub for input type reset button.
					case 'button':  // stub for input type button elements.
						break;
					case 'submit':
						if (!hasSubmit) {
							if (!formData.isClear()) {formData.append('&');}
							formData.append(encodeURIComponent(oName) + '=');
							formData.append(encodeURIComponent(oValue));
							hasSubmit = true;
						}
						break;
					default:
						if (!formData.isClear()) {formData.append('&');}
						formData.append(encodeURIComponent(oName) + '=');
						formData.append(encodeURIComponent(oValue));
						break;
				}
			}
		}
	}
	return formData.toString();
};

if (jpmc.external.AJAXResponse) {jpmc.external.AJAX.Response = jpmc.external.AJAXResponse;}
if (jpmc.external.AJAXRequest) {jpmc.external.AJAX.Request = jpmc.external.AJAXRequest;}
/**
 * @fileoverview Objects to manage communications with Google
 * @author Ben White (ben.x.white@jpmchase.com)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 */

/**
 * Creates an instance of the jpmc.external.GoogleItem class
 *
 * January 30, 2007
 * Added array of jpmc.external.GoogleMeta objects to store the meta tag
 * information returned by Google for an item.
 *
 * @class Stores item information from the Google search results.<br>
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 * @version 1.0 2006-10-23
 * @version 1.1 January 30, 2007
 * @extends jpmc.external.ResultSetItem
 */
jpmc.external.GoogleItem = function() {
	//Extend the jpmc.external.ResultSet class
	jpmc.external.ResultSetItem.apply(this, arguments);

	/**
	 * Indicates when the item was published.
	 * @type Date
	 */
	this.dateCrawl = undefined;
	/**
	 * Indicates the language of the search result. The LANG element contains a two-letter language code.
	 * @type string
	 */
	this.language = undefined;
	/**
	 * The recommended indentation level of the results. (Default 1)
	 * @type number
	 */
	this.level = undefined;
	/**
	 * An array of {@link jpmc.external.GoogleMeta} objects holding the
	 * different meta tags associated with this item.
	 * @type object[]
	 */
	this.metas = [];
};
/**
 * @fileoverview Objects to manage communications with Google
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Class to hold KeyMatch content indexed by Google.
 * @constructor
 * @param url The URL of the KeyMatch result.
 * @param desc The description of the KeyMatch result.
 */
jpmc.external.GoogleKeyMatch = function(url, desc) {
	/**
	 * Contains the URL of the KeyMatch result.
	 * @type string
	 */
	this.url = url;
	/**
	 * Contains the description of the KeyMatch result.
	 * @type string
	 */
	this.description = desc;
};
/**
 * @fileoverview Objects to manage communications with Google
 * @author Ben White (ben.x.white@jpmchase.com)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 */

/**
 * Class to hold meta tag content indexed by Google.
 * @constructor
 * @param name the name of the meta tag (name attribute)
 * @param value the value of the meta tag (content attribute)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 * @version 1.1 January 30, 2007
 */
jpmc.external.GoogleMeta = function(n,v) {
	this.name = n;
	this.value = v;
};
/**
 * @fileoverview Objects to manage communications with Google
 * @author Ben White (ben.x.white@jpmchase.com)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 */

/**
 * Creates an instance of the jpmc.external.GoogleResultSet class
 *
 * January 30, 2007
 * Added functionality to parse and expose the meta tag information returned by
 * Google to the resultset.
 *
 * @class Stores result information and status to be used with the Google class.<br>
 * @param {jpmc.external.AJAXResponse} response Response object
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 * @extends jpmc.external.ResultSet
 * @version 1.1 January 30, 2007
 */
jpmc.external.GoogleResultSet = function(response) {
	var x, y;

	//Extend the jpmc.external.ResultSet class
	jpmc.external.ResultSet.apply(this, arguments);

	/**
	 * The estimated total number of results for the search.
	 * @type number
	 */
	this.countEstimate = undefined;
	/**
	 * The index (1-based) of the first search result returned in this result set.
	 * @type number
	 */
	this.indexFirst = undefined;
	/**
	 * The index (1-based) of the last search result returned in this result set.
	 * @type number
	 */
	this.indexLast = undefined;
	/**
	 * An array of {@link jpmc.external.GoogleItem} objects
	 * @type jpmc.external.GoogleItem[]
	 */
	this.items = [];
	/**
	 * An array of {@link jpmc.external.GoogleKeyMatch} objects
	 * @type jpmc.external.GoogleKeyMatch[]
	 */
	this.keyMatches = [];
	/**
	 * The search query terms submitted to the Google search engine to generate these results.
	 * @type string
	 */
	this.query = undefined;
	/**
	 * Total server time to return search results, measured in seconds.
	 * @type number
	 */
	this.queryTime = undefined;
	/**
	 * Alternate spelling suggestions for the submitted query, in HTML format.
	 * @type string[]
	 */
	this.suggestions = undefined;
	/**
	 * Indicates version of the search results output.
	 * @type string
	 */
	this.version = undefined;
	/**
	 * @private
	 */
	this.type = 'Google';

	var getValue = function(xml, xpath, defaultValue) {
		try {
			var node = jpmc.helper.XML.getNode(xml, xpath);
			if (!node) {return defaultValue;}
			return jpmc.helper.XML.getText(node);
		} catch(ex) {
			return defaultValue;
		}
	};

	//Populate data
	try {

		// We need the Document object to specify namespaces
		var doc = this.xml;
		if (!doc) {throw {message:'No XML data'};}
		if (doc.documentElement) {doc = doc.documentElement;}

		//Get resultset info
		this.countEstimate = parseInt(getValue(doc,'/GSP/RES/M',0),10);
		this.indexFirst = parseInt(getValue(doc,'/GSP/RES/@SN',-1),10);
		this.indexLast = parseInt(getValue(doc,'/GSP/RES/@EN',-1),10);
		this.query = getValue(doc,'/GSP/Q','');
		this.queryTime = getValue(doc,'/GSP/TM',-1) * 1;
		this.suggestions = [];
		this.version = getValue(doc,'/GSP/@VER','');

		var keyMatches = jpmc.helper.XML.getNodes(doc, '/GSP/GM');
		for (x=0; x<keyMatches.length; x++) {
			var km_url = getValue(keyMatches[x],'./GL','');
			var km_desc = getValue(keyMatches[x],'./GD','');
			this.keyMatches[x] = new jpmc.external.GoogleKeyMatch(km_url, km_desc);
		}

		var suggestions = jpmc.helper.XML.getNodes(doc, '/GSP/Spelling/Suggestion');
		for (x=0; x<suggestions.length; x++) {
			this.suggestions[x] = getValue(suggestions[x],'./@q','');
		}

		var nodes = jpmc.helper.XML.getNodes(doc, '/GSP/RES/R');

		/**
		 * @private
		 */
		this.count = nodes.length;

		var googleURL = response.url.slice(0,response.url.indexOf('/search?'));

		for (x=0; x<nodes.length; x++) {
			//Create Item Object
			this.items[x] = new jpmc.external.GoogleItem();
			var node = nodes[x];
			this.items[x].dateCrawl = getValue(node,'./CRAWLDATE','');
			this.items[x].index = parseInt(getValue(node,'./@N',-1),10);
			this.items[x].level = parseInt(getValue(node,'./@L',1),10);
			this.items[x].urlView = getValue(node,'./U','');
			var cid = getValue(node,'./HAS/C/@CID','');
			var ue = getValue(node,'./UE','').replace(/^\S*\/\//,'');
			if (cid && ue) {this.items[x].urlCache = googleURL + '/search?q=cache:'+cid+':'+ue;}
			this.items[x].mimeType = getValue(node,'./@MIME','');
			this.items[x].summary = getValue(node,'./S','');
			this.items[x].title = getValue(node,'./T','');
			this.items[x].language = getValue(node,'./LANG','');
			this.items[x].size = getValue(node,'./HAS/C/@SZ','');
			/**
			 * @author Sean J Brown
			 */
			this.items[x].metas = [];
			var metaNodes = jpmc.helper.XML.getNodes(node,'./MT','');
			for(y=0; y<metaNodes.length;y++) {
				this.items[x].metas[y] = new jpmc.external.GoogleMeta(getValue(metaNodes[y],'./@N',''), getValue(metaNodes[y],'./@V',''));
			}
		}

		/**
		 * @private
		 */
		this.status = 1;
		/**
		 * @private
		 */
		this.statusText = 'OK';

	} catch(ex) {
		//Search for error information
		this.status = 0;
		this.statusText = 'Error: ';
		try {
			this.statusText += response.statusText;
		} catch(ex) {
			this.statusText += 'Unknown';
		}
	}

};
/**
 * @fileoverview Objects to manage communications with Google
 * @author Ben White (ben.x.white@jpmchase.com)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 */

/**
 * Creates an instance of the jpmc.external.Google class
 *
 * January 30, 2007
 * Added parameter filter to allow for unfiltered results from Google
 *
 * @class Returns search results from a Google search engine.
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 * @param {jpmc.external.AJAX} ajax (Optional) ajax An instance of the {@link jpmc.external.AJAX AJAX} object
 * @requires jpmc.lang.Exception
 * @version 1.1 January 30, 2007
 */
jpmc.external.Google = function(ajax) {

	var self = this;

	/**
	 * The {@link jpmc.external.AJAX} object used to perform HTTP calls
	 * @type object
	 */
	this.ajax = ajax?ajax:new jpmc.external.AJAX();

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger Logger} or {@link jpmc.util.logging.Proxy Proxy}
	 * @type object
	 */
	this.logHandler = {};

	/**
	 * Gets/Sets the url to the Google search engine.
	 * @type string
	 */
	this.url = '';

	/**
	 * A string that indicates a valid front end.
	 * @type string
	 */
	this.client = '';

	/**
	 * Limits search results to the contents of the specified collection. You can search over multiple collections by including multiple collection names separated by the pipe ( | ) character.
	 * @type string
	 */
	this.site = '';

	/**
	 * Indicates that the names and values of the specified meta tags should be returned with each search result, when available.
	 * Example: keywords.author.title
	 * @type string
	 */
	this.getFields = '';

	/**
	 * Restricts the search results to documents with meta tags whose values contain the specified words or phrases.
	 * <br>Examples:<ul>
	 *   <li>keywords:value - Searches for value in metatag keyword</li>
	 *   <li>keywords:value|author:value - Searches for a match in either keyword or author (OR search)</li>
	 *   <li>keywords:value.author:value - Searches for a match in both keyword or author (AND search)</li></ul>
	 * @type string
	 */
	this.partialFields = '';

	/**
	 * Limits search results to documents in the specified domain, host or web directory.
	 * Example: www.mycompany.com
	 * @type string
	 */
	this.siteLimits = '';

	/**
	 * Excludes search results to documents in the specified domain, host or web directory.
	 * Example: www.mycompany.com
	 * @type string
	 */
	this.siteExclude = '';

	/**
	 * Indicates whether results should be filtered by Google.
	 * false implies that the following message will not be displayed
	 * <pre>
	 * In order to show you the most relevant results, we have omitted some entries very similar to the 2 already displayed.
	* If you like, you can repeat the search with the omitted results included.
	* </pre>
	 * defaults to true
	 * @type boolean
	 */
	this.filter = true;

	/**
	 * Places a request to the Google search engine
 	 * @param {string} query Search query to uset to obtain results.
 	 * @param {number} count (Optional) Maximum number of results to include in the search results. The maximum value of this parameter is 100. (Default 10)
 	 * @param {number} start (Optional) Specifies the index number of the first entry in the result set that is to be returned.
 	 * @param {function} onSuccess (Optional) Event handler when the Google search is succesfully received
 	 * @param {function} onFailure (Optional) Event handler if the Google search cannot be received
 	 * @param {mixed} attr (Optional) passthrough object or value send to the onSuccess and onFailure handlers
	 * @type object
	 * @returns Returns a fully populated {@link jpmc.external.GoogleResultSet} object
	 */
	this.search = function(query, count, start, onSuccess, onFailure, attr)  {

		var ajaxReq, ajaxRes, errorMsg, wrapper;

		try {
			ajaxReq = new jpmc.external.AJAXRequest('GET');

			var m_query = jpmc.helper.String.urlEscape(query);
			//if (this.siteLimits) {m_query+=' site:' + this.siteLimits;}
			//if (this.siteExclude) {m_query+=' -site:' + this.siteExclude;}

			var url = this.url;
			if (url.slice(-1)!='/') {url+='/';}
			var urlRE = /^\S*:\/\/[^\/]*\//;
			if (urlRE.test(url)) {
				this.url = url.match(urlRE)[0];
			} else {
				throw {message:'Invalid Google URL'};
			}

			var s = [];
			s[s.length] = this.url + 'search?output=xml_no_dtd';
			if (m_query) {s[s.length] = 'q=' + m_query;}
			if (count) {s[s.length] = 'num='+count;}
			if (start) {s[s.length] = 'start='+start;}
			if (this.client) {s[s.length] = 'client='+this.client;}

			if (this.site) {s[s.length] = 'site='+this.site;}

			if (this.siteLimits) {
				s[s.length] = 'as_sitesearch='+this.siteLimits;
				s[s.length] = 'as_dt=i';
			}

			if (this.siteExclude) {
				s[s.length] = 'as_sitesearch='+this.siteExclude;
				s[s.length] = 'as_dt=e';
			}

			if (this.getFields) {s[s.length] = 'getfields='+this.getFields;}
			if (this.partialFields) {s[s.length] = 'partialfields='+this.partialFields;}
			s[s.length] = 'filter='+(this.filter?'1':'0');

			var searchURL = s.join('&'); //this.url + 'search?q='+m_query+'&output=xml_no_dtd&client='+this.client+'&site='+this.site+(count?'&num='+count:'')+(start?'&start='+start:'');

			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.INFO, 'Request: '+searchURL, self);
			}

			wrapper = this.ajax.wrapper(searchURL, self, jpmc.external.GoogleResultSet, onSuccess, onFailure);

			ajaxReq.url = searchURL;

			//Request XML not */*
			ajaxReq.addHeader('Accept','text/xml');

			ajaxRes = this.ajax.request(ajaxReq, wrapper.onS, wrapper.onF, attr);

			if (!wrapper.isAsynchronous) {
				if (self.logHandler.enabled) {
					self.logHandler.log(jpmc.util.logging.Level.INFO, 'Response: '+searchURL, self);
				}
			}
		} catch(ex) {
			errorMsg = 'Error: '+searchURL+'\nDescription: '+ex.message;
			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.SEVERE, errorMsg, self);
			}
		}

		if (!wrapper.isAsynchronous) {
			var googleRes = new jpmc.external.GoogleResultSet(ajaxRes);
			if (errorMsg) {googleRes.statusText = errorMsg;}
			return googleRes;
		}

	};
};
/**
 * @fileoverview Objects to manage communications with Livelink
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.LivelinkItem class
 * @class Stores item information from the Livelink search results.<br>
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @version 1.0 2006-10-23
 * @extends jpmc.external.ResultSetItem
 */
jpmc.external.LivelinkItem = function() {

	//Extend the jpmc.external.ResultSet class
	jpmc.external.ResultSetItem.apply(this, arguments);

	/**
	 * Last modification date of the object.
	 * @type Date
	 */
	this.dateMod = undefined;
	/**
	 * The Livelink URL of the search result container.
	 * @type Date
	 */
	this.urlContainer = undefined;
	/**
	 * URL location of object in livelink.
	 * @type Date
	 */
	this.urlFunctions = undefined;
};
/**
 * @fileoverview Objects to manage communications with Livelink
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.LivelinkResultSet class
 * @class Stores result information and status to be used with the Livelink class.<br>
 * @param {jpmc.external.AJAXResponse} response Response object
 * @param {string} url The URL of the Livelink search
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @extends jpmc.external.ResultSet
 */
jpmc.external.LivelinkResultSet = function(response) {

	//Extend the jpmc.external.ResultSet class
	jpmc.external.ResultSet.apply(this, arguments);

	/**
	 * The estimated total number of results for the search.
	 * @type number
	 */
	this.countEstimate = undefined;
	/**
	 * The index (1-based) of the first search result returned in this result set.
	 * @type number
	 */
	this.indexFirst = undefined;
	/**
	 * The index (1-based) of the last search result returned in this result set.
	 * @type number
	 */
	this.indexLast = undefined;
	/**
	 * An array of {@link jpmc.external.LivelinkItem} objects
	 * @type jpmc.external.LivelinkItem[]
	 */
	this.items = [];
	/**
	 * The search query terms submitted to the Livelink search engine to generate these results.
	 * @type string
	 */
	this.query = undefined;
	/**
	 * @private
	 */
	this.type = 'Livelink';

	var getValue = function(xml, xpath, defaultValue) {
		try {
			var node = jpmc.helper.XML.getNode(xml, xpath);
			return jpmc.helper.XML.getText(node);
		} catch(ex) {
			return defaultValue;
		}
	};

	var fixHH = function(str) {
		return str.replace(/\<HH\>/g,'<B>').replace(/\<\/HH\>/g,'</B>');
	};

	//Populate data
	try {

		// We need the Document object to specify namespaces
		var doc = this.xml;
		if (!doc) {throw {message:'No XML data'};}
		if (doc.documentElement) {doc = doc.documentElement;}

		var nodes = jpmc.helper.XML.getNodes(doc, '/Output/SearchResults/SearchResult');

		/**
		 * @private
		 */
		this.countEstimate = parseInt(getValue(doc,'/Output/SearchResultsInformation/RawTotalResults',0),10);

		this.count = nodes.length;

		this.indexFirst = 1 + parseInt(getValue(doc,'/Output/SearchResultsInformation/CurrentStartAt',0),10);

		this.indexLast = this.indexFirst + this.count - 1;

		for (var x=0; x<nodes.length; x++) {
			//Create Item Object
			this.items[x] = new jpmc.external.LivelinkItem();
			var node = nodes[x];
			//Parse Date
			var dtmFormat = getValue(node,'./OTObjectDate/@Mask').split('/');
			var dtmValue = getValue(node,'./OTObjectDate').split('/');
			var dtmYMD = [];
			for (var y=0; y<dtmFormat.length; y++) {
				switch(dtmFormat[y].toUpperCase()) {
					case 'YYYY': dtmYMD[0] = parseInt(dtmValue[y],10); break;
					case 'MM': dtmYMD[1] = parseInt(dtmValue[y],10)-1; break;
					case 'DD': dtmYMD[2] = parseInt(dtmValue[y],10); break;
					default: dtmYMD[3] = 'Unknown'; break;
				}
			}
			if (dtmYMD.length==3) {
				this.items[x].dateMod = new Date(dtmYMD[0],dtmYMD[1],dtmYMD[2]);
			}
			this.items[x].index = this.indexFirst + x;
			//Get URLs
			this.items[x].urlContainer =
				getValue(node,'./OTLocation/@Protocol','') + '://' +
				getValue(node,'./OTLocation/@ServerName','') +
				getValue(node,'./OTLocation/@URL','');
			this.items[x].urlDownload =
				getValue(node,'./OTName/@Protocol','') + '://' +
				getValue(node,'./OTName/@ServerName','') +
				getValue(node,'./OTName/@DownloadURL','');
			this.items[x].urlFunctions =
				getValue(node,'./Functions/@Protocol','') + '://' +
				getValue(node,'./Functions/@ServerName','') +
				getValue(node,'./Functions/@URL','');
			this.items[x].urlIcon =
				getValue(node,'./OTMIMEType/@Protocol','') + '://' +
				getValue(node,'./OTMIMEType/@ServerName','') +
				getValue(node,'./OTMIMEType/@IconURL','');
			this.items[x].urlView =
				getValue(node,'./OTName/@Protocol','') + '://' +
				getValue(node,'./OTName/@ServerName','') +
				getValue(node,'./OTName/@ViewURL','');
			//Get Additional Data
			this.items[x].mimeType = getValue(node,'./OTMIMEType','').replace(/\n/g,'');
			this.items[x].size =
				getValue(node,'./OTObjectSize','').replace(/\n/g,'') +
				getValue(node,'./OTObjectSize/@Suffix','').toLowerCase();

			this.items[x].summary = fixHH(getValue(node,'./OTSummary','').replace(/\n/g,''));
			this.items[x].title = fixHH(getValue(node,'./OTName','').replace(/\n/g,''));
		}

		/**
		 * @private
		 */
		this.status = 1;
		/**
		 * @private
		 */
		this.statusText = 'OK';

	} catch(ex) {
		//Search for error information
		this.status = 0;
		this.statusText = 'Error: ';
		try {
			this.statusText += response.statusText;
		} catch(ex) {
			this.statusText += 'Unknown';
		}
	}

};
/**
 * @fileoverview Objects to manage communications with Livelink
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.Livelink class
 * @class Returns search results from a Livelink search engine.
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @param {jpmc.external.AJAX} ajax (Optional) ajax An instance of the {@link jpmc.external.AJAX AJAX} object
 * @requires jpmc.lang.Exception
 */
jpmc.external.Livelink = function(ajax) {

	var self = this;

	/**
	 * The {@link jpmc.external.AJAX} object used to perform HTTP calls
	 * @type object
	 */
	this.ajax = ajax?ajax:new jpmc.external.AJAX();

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger Logger} or {@link jpmc.util.logging.Proxy Proxy}
	 * @type object
	 */
	this.logHandler = {};

	/**
	 * Gets/Sets the url to the Livelink search engine.
	 * @type string
	 */
	this.url = '';

	/**
	 * Gets/Sets highlighting of terms that have been hit highlighted by Livelink.
	 * @type boolean
	 */
	this.showHitHighlight = false;

	/**
	 * Gets/Sets, by name or by nodeid, a specific Livelink Slice in a given Livelink instance that you're going to search against. Default: Enterprise
	 * @type string
	 */
	this.slice = '';

	/**
	 * Gets/Sets, by nodeid, a specific Livelink folder/container that you're going to search within.
	 * @type number
	 */
	this.fromHere = 0;

	/**
	 * Places a request to the Livelink search engine
 	 * @param {string} query Search query to uset to obtain results.
 	 * @param {number} count (Optional) Maximum number of results to include in the search results. (Default 50)
 	 * @param {number} start (Optional) Specifies the index number of the first entry in the result set that is to be returned. (0 based)
 	 * @param {function} onSuccess (Optional) Event handler when the Livelink search is succesfully received
 	 * @param {function} onFailure (Optional) Event handler if the Livelink search cannot be received
 	 * @param {mixed} attr (Optional) passthrough object or value send to the onSuccess and onFailure handlers
	 * @type object
	 * @returns Returns a fully populated {@link jpmc.external.LivelinkResultSet} object
	 */
	this.search = function(query, count, start, onSuccess, onFailure, attr)  {

		var ajaxReq, ajaxRes, errorMsg, wrapper;

		try {
			ajaxReq = new jpmc.external.AJAXRequest('GET');

			var m_query = jpmc.helper.String.urlEscape(query);

			if (!isNaN(this.fromHere) && this.fromHere!==0) {
				m_query = '"OTLocation":"'+this.fromHere+'" and ('+m_query+')';
			}

			var url = this.url;
/*			if (url.slice(-1)!='/') {url+='/';}
			var urlRE = /^\S*:\/\/[^\/]*\//;
			if (urlRE.test(url)) {
				this.url = url.match(urlRE)[0];
			} else {
				throw {message:'Invalid Livelink URL'};
			}
*/
			var s = [];
			s[s.length] = this.url + '?func=search&outputformat=xml';
			s[s.length] = 'hhterms=' + this.showHitHighlight;
			if (m_query) {s[s.length] = 'where1=' + m_query;}
			if (typeof count == 'number') {s[s.length] = 'gofor='+count;}
			if (typeof start == 'number') {s[s.length] = 'startat='+(start+1);}
			if (this.slice) {s[s.length] = 'slice='+this.slice;}

			var searchURL = s.join('&');

			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.INFO, 'Request: '+searchURL, self);
			}

			wrapper = this.ajax.wrapper(searchURL, self, jpmc.external.LivelinkResultSet, onSuccess, onFailure);

			ajaxReq.url = searchURL;

			//Request XML not */*
			//ajaxReq.addHeader('Accept','text/xml');

			ajaxRes = this.ajax.request(ajaxReq, wrapper.onS, wrapper.onF, attr);

			if (!wrapper.isAsynchronous) {
				if (self.logHandler.enabled) {
					self.logHandler.log(jpmc.util.logging.Level.INFO, 'Response: '+searchURL, self);
				}
			}
		} catch(ex) {
			errorMsg = 'Error: '+searchURL+'\nDescription: '+ex.message;
			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.SEVERE, errorMsg, self);
			}
		}

		if (!wrapper.isAsynchronous) {
			var LivelinkRes = new jpmc.external.LivelinkResultSet(ajaxRes);
			if (errorMsg) {LivelinkRes.statusText = errorMsg;}
			return LivelinkRes;
		}

	};
};
/**
 * @fileoverview Object to store news feeds
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.NewsFeed class
 * @class Stores feed information and status to be used with the News class.<br>
 * @param {jpmc.external.AJAXResponse} response Response object
 * @constructor
 * @extends jpmc.external.ResultSet
 */
jpmc.external.NewsFeed = function(response) {

	//Extend the jpmc.external.ResultSet class
	jpmc.external.ResultSet.apply(this, arguments);

	/**
	 * Copyright notice for content in the channel.
	 * @type string
	 */
	this.copyright = undefined;
	/**
	 * The publication date for the content in the channel.
	 * @type Date
	 */
	this.date = undefined;
	/**
	 * Phrase or sentence describing the channel.
	 * @type string
	 */
	this.description = undefined;
	/**
	 * The date the data is valid until
	 * @type Date
	 */
	this.expires = undefined;
	/**
	 * Specifies a GIF, JPEG or PNG image that can be displayed with the channel.
	 * @type string
	 */
	this.image = undefined;
	/**
	 * An array of {@link jpmc.external.NewsItem} objects
	 * @type jpmc.external.NewsItem[]
	 */
	this.items = [];
	/**
	 * The URL to the HTML website corresponding to the news channel.
	 * @type string
	 */
	this.link = undefined;
	/**
	 * The name of the news channel.
	 * @type string
	 */
	this.title = undefined;
	/**
	 * URL of the feed
	 * @type string
	 */
	this.url = response.url;

	var string2Date = function(str) {
		var dtm;
		if (isNaN(str)) {

			//Try ISO8601 date
			var dtm1 = jpmc.helper.Date.fromISO8601(str);

			//Try IETF date (built in parser)
			var dtm2 = jpmc.helper.Date.parse(str);

			if (dtm1 && dtm2) {
				//if both parse, but difference is less than 24hrs, use iso8601 parser
				dtm = Math.abs(dtm1.valueOf() - dtm2.valueOf()) > 86400000 ? dtm2 : dtm1;
			} else {
				dtm = dtm1 || dtm2;
			}

		} else {
			dtm = new Date();
			dtm.setMinutes(dtm.getMinutes()+parseInt(value,10));
		}
		return dtm;
	};

	//Populate data
	try {

		var attributes = {};
		var items = {};

		// We need the Document object to specify namespaces
		var doc = this.xml;
		if (!doc) {throw {message:'No XML data'};}
		if (doc.documentElement) {doc = doc.documentElement;}

		var tag = doc.tagName.split(':');

		switch(tag[tag.length-1].toLowerCase()) {
			case 'feed':
				/**
				 * @private
				 */
				this.type = 'ATOM'; //Atom Syndication Format
				attributes = {
					title:'/*[local-name()="feed"]/*[local-name()="title"]',
					link:'/*[local-name()="feed"]/*[local-name()="link"][@rel="alternate"][@type="text/html"]/@href | /*[local-name()="feed"]/*[local-name()="link"]/@href',
					date:'/*[local-name()="feed"]/*[local-name()="modified"] | /*[local-name()="feed"]/*[local-name()="updated"]',
					description:'/*[local-name()="feed"]/*[local-name()="tagline"] | /*[local-name()="feed"]/*[local-name()="subtitle"]',
					copyright:'/*[local-name()="feed"]/*[local-name()="copyright"] | /*[local-name()="feed"]/*[local-name()="rights"]',
					image:'/*[local-name()="feed"]/*[local-name()="logo"]'
				};
				items = {
					item:'/*[local-name()="feed"]/*[local-name()="entry"]',
					attributes:{
						title:'./*[local-name()="title"]',
						author:'./*[local-name()="author"]/*[local-name()="name"] | /*[local-name()="feed"]/*[local-name()="author"]/*[local-name()="name"]',
						link:'./*[local-name()="link"][@rel="alternate"][@type="text/html"]/@href | ./*[local-name()="link"]/@href',
						id:'./*[local-name()="id"]',
						date:'./*[local-name()="updated"] | ./*[local-name()="modified"] | ./*[local-name()="issued"] | ./*[local-name()="published"]',
						summary:'./*[local-name()="summary"]',
						detail:'./*[local-name()="content"]'
					}
				};
				break;
			case 'alert':
				/**
				 * @private
				 */
				this.type = 'CAP'; //Common Alerting Protocol
				attributes = {
					title:'/*[local-name()="alert"]/*[local-name()="sender"]',
					link:'/*[local-name()="alert"]/*[local-name()="references"]',
					date:'/*[local-name()="alert"]/*[local-name()="sent"]',
					description:'/*[local-name()="alert"]/*[local-name()="note"]'
				};
				items = {
					item:'/*[local-name()="alert"]/*[local-name()="info"]',
					attributes:{
						title:'./*[local-name()="event"]',
						author:'./*[local-name()="senderName"]',
						link:'./*[local-name()="web"]',
						date:'./*[local-name()="effective"]',
						expires:'./*[local-name()="expires"]',
						summary:'./*[local-name()="headline"]',
						detail:'./*[local-name()="description"]'
					}
				};
				break;
			case 'rdf':
				/**
				 * @private
				 */
				this.type = 'RDF'; //Resource Description Framework
				attributes = {
					title:'/*[local-name()="RDF"]/*[local-name()="channel"]/*[local-name()="title"]',
					link:'/*[local-name()="RDF"]/*[local-name()="channel"]/*[local-name()="link"]',
					date:'/*[local-name()="RDF"]/*[local-name()="channel"]/*[local-name()="date"] | /*[local-name()="RDF"]/*[local-name()="channel"]/*[local-name()="startTime"]',
					description:'/*[local-name()="RDF"]/*[local-name()="channel"]/*[local-name()="description"]',
					copyright:'/*[local-name()="RDF"]/*[local-name()="channel"]/*[local-name()="rights"]',
					image:'/*[local-name()="RDF"]/*[local-name()="image"]/*[local-name()="url"] | /*[local-name()="RDF"]/*[local-name()="channel"]/*[local-name()="image"]'
				};
				items = {
					item:'/*[local-name()="RDF"]/*[local-name()!="channel"]',
					attributes:{
						title:'./*[local-name()="title"]',
						author:'./*[local-name()="creator"]',
						link:'./*[local-name()="link"]',
						id:'./*[local-name()="id"] | ./@*[local-name()="about"]',
						date:'./*[local-name()="date"] | ./*[local-name()="modified"] | ./*[local-name()="issued"] | ./*[local-name()="created"]',
						summary:'./*[local-name()="description"]'
					}
				};
				break;
			case 'rss':
				/**
				 * @private
				 */
				this.type = 'RSS'; //Really Simple Syndication
				attributes = {
					title:'/rss/channel/title',
					link:'/rss/channel/link',
					date:'/rss/channel/lastBuildDate | /rss/channel/pubDate',
					description:'/rss/channel/description',
					copyright:'/rss/channel/copyright',
					image:'/rss/channel/image/url',
					expires:'/rss/channel/ttl'
				};
				items = {
					item:'/rss/channel/item',
					attributes:{
						title:'./title',
						author:'./*[local-name()="creator"]',
						link:'./link',
						id:'./guid',
						date:'./pubDate',
						summary:'./description',
						detail:'./*[local-name()="encoded"]'
					}
				};
				break;
			default: throw {message:'Unknown feed type'};
		}

		var attr = '';
		var node = null;
		var value = null;

		//Populate Global Feed Info
		for (attr in attributes) {
			node = jpmc.helper.XML.getNode(this.xml, attributes[attr]);
			value = (node)?jpmc.helper.XML.getText(node):null;
			if ((attr=='date' || attr=='expires') && value) {value = string2Date(value);}
			if (attr=='date' && !value) {value = new Date();}
			this[attr] = value;
		}

		var nodes = jpmc.helper.XML.getNodes(this.xml, items.item);

		this.items = [];
		/**
		 * @private
		 */
		this.count = nodes.length;

		//Create and Populate Items
		for (var x=0; x<nodes.length; x++) {
			//Create Item Object
			this.items[x] = new jpmc.external.NewsItem();
			//Populate Item Info
			for (attr in items.attributes) {
				node = jpmc.helper.XML.getNode(nodes[x], items.attributes[attr]);
				value = (node)?jpmc.helper.XML.getText(node):null;
				if ((attr=='date' || attr=='expires') && value) {value = string2Date(value);}
				this.items[x][attr] = value;
			}
		}

		/**
		 * @private
		 */
		this.status = 1;
		/**
		 * @private
		 */
		this.statusText = 'OK';

	} catch(ex) {
		//Search for error information
		this.status=0;
		this.statusText = 'Error: ';
		try {
			this.statusText += response.statusText;
		} catch(ex) {
			this.statusText += 'Unknown';
		}
	}

};

/**
 * Deprecated, see {@link jpmc.external.NewsFeed}.
 * @deprecated
 */
jpmc.external.RSSFeed = jpmc.external.NewsFeed;
/**
 * @fileoverview Object to store news feed articles
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.NewsItem class
 * @class Stores item information from a News feed.<br>
 * @constructor
 */
jpmc.external.NewsItem = function() {
	/**
	 * The title of the item.
	 * @type string
	 */
	this.title = undefined;
	/**
	 * The URL to the HTML website corresponding to the item.
	 * @type string
	 */
	this.link = undefined;
	/**
	 * A string that uniquely identifies the item.
	 * @type string
	 */
	this.id = undefined;
	/**
	 * Indicates when the item was published.
	 * @type Date
	 */
	this.date = undefined;
	/**
	 * Indicates when the item is no longer valid.
	 * @type Date
	 */
	this.expires = undefined;
	/**
	 * The item synopsis.
	 * @type string
	 */
	this.summary = undefined;
	/**
	 * The full content of the item.
	 * @type string
	 */
	this.detail = undefined;
	/**
	 * The author of the item.
	 * @type string
	 */
	this.author = undefined;
};

/**
 * Deprecated, see {@link jpmc.external.NewsItem}.
 * @deprecated
 */
jpmc.external.RSSItem = jpmc.external.NewsItem;
/**
 * @fileoverview Objects to manage News feeds
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.News class
 * @class Returns data from a News feed. Supported feed types (ATOM,CAP,RDF&RSS)<br>
 * @constructor
 * @param {jpmc.external.AJAX} ajax (Optional) ajax An instance of the {@link jpmc.external.AJAX} object
 */
jpmc.external.News = function(ajax) {

	var self = this;

	/**
	 * The {@link jpmc.external.AJAX} object used to perform HTTP calls
	 * @type object
	 */
	this.ajax = ajax?ajax:new jpmc.external.AJAX();

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger} or {@link jpmc.util.logging.Proxy}
	 * @type object
	 */
	this.logHandler = {};

	/**
	 * Places a request to the News feed identified by the loaded url
 	 * @param {string} url The URL of the News feed
 	 * @param {function} onSuccess (Optional) Event handler that recieves a fully populated {@link jpmc.external.NewsFeed} object when the News feed is succesfully read
 	 * @param {function} onFailure (Optional) Event handler that recieves a partially populated {@link jpmc.external.NewsFeed} object when the News feed cannot be read
 	 * @param {mixed} attr (Optional) Pass-through object or value send to the onSuccess and onFailure handlers
	 * @type object
	 * @returns If synchronous, this method returns a fully populated {@link jpmc.external.NewsFeed} object
	 */
	this.getFeed = function(url, onSuccess, onFailure, attr)  {
		var ajaxReq, ajaxRes, errorMsg, wrapper;
		try {
			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.INFO, 'Request: '+url, self);
			}
			var desc = url;

			wrapper = this.ajax.wrapper(desc, self, jpmc.external.NewsFeed, onSuccess, onFailure);

			ajaxReq = new jpmc.external.AJAXRequest('GET', url);

			//request xml not */*
			ajaxReq.addHeader('Accept','text/xml');

			ajaxRes = this.ajax.request(ajaxReq, wrapper.onS, wrapper.onF, attr);

			if (!wrapper.isAsynchronous) {
				if (self.logHandler.enabled) {
					self.logHandler.log(jpmc.util.logging.Level.INFO, 'Response: '+url, self);
				}
			}
		} catch(ex) {
			errorMsg = 'Error: '+url+'\nDescription: '+ex.message;
			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.SEVERE, errorMsg, self);
			}
		}
		if (!wrapper.isAsynchronous) {
			var newsRes = new jpmc.external.NewsFeed(ajaxRes);
			if (errorMsg) {newsRes.statusText = errorMsg;}
			return newsRes;
		}
	};

};

/**
 * Deprecated, see {@link jpmc.external.News}.
 * @deprecated
 */
jpmc.external.RSS = jpmc.external.News;
/**
 * @fileoverview Objects to manage communications with PDSearch
 * @author Ben White (ben.x.white@jpmchase.com)
 * @author Sean J Brown (brown_sean@jpmorgan.com)
 */

/**
 * Creates an instance of the jpmc.external.PDSearch class
 *
 * @class Returns search results from a PDSearch search engine.
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @param {jpmc.external.AJAX} ajax (Optional) ajax An instance of the {@link jpmc.external.AJAX AJAX} object
 * @requires jpmc.lang.Exception
 * @version 1.0 2007-09-07
 */
jpmc.external.PDSearch = function(ajax) {

	var self = this;

	/**
	 * The {@link jpmc.external.AJAX} object used to perform HTTP calls
	 * @type object
	 */
	this.ajax = ajax?ajax:new jpmc.external.AJAX();

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger Logger} or {@link jpmc.util.logging.Proxy Proxy}
	 * @type object
	 */
	this.logHandler = {};

	/**
	 * Gets/Sets the url to the PDSearch search engine.
	 * @type string
	 */
	this.url = null;

	/**
	 * Gets/Sets the url to display the detail for each the result.
	 * @type string
	 */
	this.urlTarget = null;

	/**
	 * Gets/Sets the required application ID passed to PDSearch search engine.
	 * @type string
	 */
	this.appID = null;

	/**
	 * Gets/Sets the populated data fields that are returned by the search (default: 255, ALL).
	 * @type number
	 */
	this.dataFormat = 255;

	/**
	 * Gets/Sets the the number of minutes before the page will expire from the browser's cache (default: -1).
	 * @type number
	 */
	this.expire = -1;

	/**
	 * Places a request to the PDSearch search engine
 	 * @param {string} query Search query to uset to obtain results.
 	 * @param {number} count (Optional) Maximum number of results to include in the search results. (Default 10)
 	 * @param {number} start (Optional) Specifies the index number of the first entry in the result set that is to be returned.
 	 * @param {function} onSuccess (Optional) Event handler when the PDSearch search is succesfully received
 	 * @param {function} onFailure (Optional) Event handler if the PDSearch search cannot be received
 	 * @param {mixed} attr (Optional) passthrough object or value send to the onSuccess and onFailure handlers
	 * @type object
	 * @returns Returns a fully populated {@link jpmc.external.PDSearchResultSet} object
	 */
	this.search = function(query, count, start, onSuccess, onFailure, attr)  {

		var ajaxReq, ajaxRes, errorMsg, wrapper;

		try {
			ajaxReq = new jpmc.external.AJAXRequest('GET');

			var m_query = jpmc.helper.String.urlEscape(query);

			var s = [];
			s[s.length] = this.url + '?output=json';
			if (m_query) {s[s.length] = 'q=' + m_query;}
			if (count) {s[s.length] = 'num='+count;}
			if (start) {s[s.length] = 'start='+start;}

			if (this.appID) {s[s.length] = 'appid='+this.appID;}
			if (this.expire) {s[s.length] = 'expire='+this.expire;}
			if (this.dataFormat) {s[s.length] = 'data='+this.dataFormat;}

			var searchURL = s.join('&');

			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.INFO, 'Request: '+searchURL, self);
			}

			wrapper = this.ajax.wrapper(searchURL, self, jpmc.external.PDSearchResultSet, onSuccess, onFailure, self.urlTarget);

			ajaxReq.url = searchURL;

			//Request XML not */*
			ajaxReq.addHeader('Accept','text/xml');

			ajaxRes = this.ajax.request(ajaxReq, wrapper.onS, wrapper.onF, attr);

			if (!wrapper.isAsynchronous) {
				if (self.logHandler.enabled) {
					self.logHandler.log(jpmc.util.logging.Level.INFO, 'Response: '+searchURL, self);
				}
			}
		} catch(ex) {
			errorMsg = 'Error: '+searchURL+'\nDescription: '+ex.message;
			if (self.logHandler.enabled) {
				self.logHandler.log(jpmc.util.logging.Level.SEVERE, errorMsg, self);
			}
		}

		if (!wrapper.isAsynchronous) {
			var PDSearchRes = new jpmc.external.PDSearchResultSet(ajaxRes, self.urlTarget);
			if (errorMsg) {PDSearchRes.statusText = errorMsg;}
			return PDSearchRes;
		}

	};
};

/**
 * Creates an instance of the jpmc.external.PDSearchResultSet class
 *
 * @class Stores result information and status to be used with the PDSearch class.<br>
 * @param {jpmc.external.AJAXResponse} response Response object
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @extends jpmc.external.ResultSet
 * @version 1.0 2007-09-07
 */
jpmc.external.PDSearchResultSet = function(response, urlTarget) {
	var x, y;

	//Extend the jpmc.external.ResultSet class
	jpmc.external.ResultSet.apply(this, arguments);

	/**
	 * The total number of results for the search.
	 * @type number
	 */
	this.countTotal = undefined;
	/**
	 * The index (1-based) of the first search result returned in this result set.
	 * @type number
	 */
	this.indexFirst = undefined;
	/**
	 * The index (1-based) of the last search result returned in this result set.
	 * @type number
	 */
	this.indexLast = undefined;
	/**
	 * An array of {@link jpmc.external.PDSearchItem} objects
	 * @type jpmc.external.PDSearchItem[]
	 */
	this.items = [];
	/**
	 * Total server time to return search results, measured in seconds.
	 * @type number
	 */
	this.queryTime = undefined;
	/**
	 * The type of search that was performed.
	 * @type string
	 */
	this.queryType = undefined;
	/**
	 * @private
	 */
	this.type = 'PDSearch';

	//Populate data
	try {
		var obj = jpmc.helper.Object.fromString(response.responseText);

		//if (obj.errorText) {throw {message:obj.errorText};}

		//Get resultset info
		this.countTotal = obj.count;
		this.count = obj.indexFirst>0 ? obj.indexLast - obj.indexFirst + 1 : 0;
		this.indexFirst = obj.indexFirst;
		this.indexLast = obj.indexLast;
		this.queryTime = obj.queryTime;
		this.queryType = obj.searchType;
		this.errorText = obj.errorText;

		this.items = obj.people;

		for (x=0; x<this.items.length; x++) {
			var item = this.items[x];
			item.index = x + obj.indexFirst;

			//Get Display Name
			var name = [];
			name[name.length] = item.nameLast;
			if (item.nameSuffix) {name[name.length] = item.nameSuffix;}
			name[name.length] = ',';
			name[name.length] = item.nameFirstPrefered;
			if (item.nameMiddle) {name[name.length] = item.nameMiddle;}
			name = name.join(' ').replace(/ ,/,',');

			//Get Unique Identifier
			var info = [];
			if (item.jobTitle) {
				info[info.length] = item.jobTitle;
			} else if (item.officerTitle) {
				info[info.length] = item.officerTitle;
			} else {
				switch(item.type) {
					case 'E': info[info.length] = 'Employee'; break;
					case 'C': info[info.length] = 'Contractor'; break;
					default:break;
				}
			}
			if (item.orgStructure && item.orgStructure.length > 0) {info[info.length] = item.orgStructure[item.orgStructure.length-1];}
			info = info.join(' in ');

			//Assign Title
			item.title = name;

			//Build Summary
			var a = [];
			if (info) {a[a.length] = '<div>'+info+'</div>';}
			if (item.phoneWork) {a[a.length] = '<div>Phone: '+item.phoneWork+'</div>';}
			if (item.phoneCell) {a[a.length] = '<div>Cell: '+item.phoneCell+'</div>';}
			if (item.phonePager) {a[a.length] = '<div>Pager: '+item.phonePager+'</div>';}
			//if (item.phoneFax) {a[a.length] = '<div>Fax: '+item.phoneFax+'</div>';}
			if (item.email) {a[a.length] = '<div><a href="mailto:'+item.email+'">'+item.email+'</a></div>';}
			//if (item.street1) {a[a.length] = '<div>'+item.street1 + (item.floor?', Floor ' + item.floor:'') +'</div>';}
			//if (item.street1) {a[a.length] = '<div>'+item.city + ', ' + item.state + ' ' + item.zipcode +', '+item.country +'</div>';}
			item.summary = a.join('');

			item.mimeType = 'text/html';

			item.urlView = urlTarget.replace(/%(.*?)%/g,function(a,b,c){return jpmc.helper.String.urlEscape(item[b]);});
		}

		//alert(jpmc.helper.Object.toString(this,true));

		/**
		 * @private
		 */
		this.status = 1;
		/**
		 * @private
		 */
		this.statusText = 'OK';

	} catch(ex) {

		//Search for error information
		this.status = 0;
		this.statusText = 'Error: ';
		try {
			if (obj) {
				this.statusText += ex.message;
			} else {
				this.statusText += response.statusText;
			}
		} catch(ex) {
			this.statusText += 'Unknown';
		}
	}

};

/**
 * Creates an instance of the jpmc.external.PDSearchItem class
 *
 * @class Stores item information from the PDSearch search results.<br>
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @version 1.0 2007-09-07
 * @extends jpmc.external.ResultSetItem
 */
jpmc.external.PDSearchItem = function() {

	//Extend the jpmc.external.ResultSet class
	jpmc.external.ResultSetItem.apply(this, arguments);

	/**
	 * @type string
	 */
	this.standardID = null;
	/**
	 * @type string
	 */
	this.managerName = null;
	/**
	 * @type string
	 */
	this.managerSID = null;
	/**
	 * @type string
	 */
	this.nameFirst = null;
	/**
	 * @type string
	 */
	this.nameFirstPrefered = null;
	/**
	 * @type string
	 */
	this.nameMiddle = null;
	/**
	 * @type string
	 */
	this.nameLast = null;
	/**
	 * @type string
	 */
	this.nameLastPrevious = null;
	/**
	 * @type string
	 */
	this.nameSuffix = null;
	/**
	 * @type string
	 */
	this.phoneWork = null;
	/**
	 * @type string
	 */
	this.phoneGDP = null;
	/**
	 * @type string
	 */
	this.phoneFax = null;
	/**
	 * @type string
	 */
	this.phoneCell = null;
	/**
	 * @type string
	 */
	this.phonePager = null;
	/**
	 * @type string
	 */
	this.phoneTemp = null;
	/**
	 * @type string
	 */
	this.email = null;
	/**
	 * @type string
	 */
	this.emailInternal = null;
	/**
	 * @type string
	 */
	this.isManager = null;
	/**
	 * @type string
	 */
	this.jobTitle = null;
	/**
	 * @type string
	 */
	this.jobCode = null;
	/**
	 * @type string
	 */
	this.officerTitle = null;
	/**
	 * @type string
	 */
	this.officerTitleAbbr = null;
	/**
	 * @type string
	 */
	this.status = null;
	/**
	 * @type string
	 */
	this.type = null;
	/**
	 * @type string
	 */
	this.employeeID = null;
	/**
	 * @type string
	 */
	this.mailCode = null;
	/**
	 * @type string
	 */
	this.buildingNumber = null;
	/**
	 * @type string
	 */
	this.buildingName = null;
	/**
	 * @type string
	 */
	this.floor = null;
	/**
	 * @type string
	 */
	this.street1 = null;
	/**
	 * @type string
	 */
	this.street2 = null;
	/**
	 * @type string
	 */
	this.city = null;
	/**
	 * @type string
	 */
	this.state = null;
	/**
	 * @type string
	 */
	this.zipcode = null;
	/**
	 * @type string
	 */
	this.region = null;
	/**
	 * @type string
	 */
	this.regionAbbr = null;
	/**
	 * @type string
	 */
	this.country = null;
	/**
	 * @type string
	 */
	this.countryAbbr = null;
	/**
	 * @type string
	 */
	this.companyName = null;
	/**
	 * @type string
	 */
	this.companyID = null;
	/**
	 * @type string
	 */
	this.companyIDOld = null;
	/**
	 * @type string[]
	 */
	this.orgStructure = [];
	/**
	 * @type string
	 */
	this.costCenterName = null;
	/**
	 * @type string
	 */
	this.costCenterID = null;
	/**
	 * @type string
	 */
	this.costCenterIDOld = null;
	/**
	 * An array of {@link jpmc.external.PDSearchAssociate} objects
	 * @type jpmc.external.PDSearchAssociate[]
	 */
	this.contacts = [];
};

/**
 * Creates an instance of the jpmc.external.PDSearchContact class
 *
 * @class Stores associate information from the PDSearch search results.<br>
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @version 1.0 2007-09-07
 */
jpmc.external.PDSearchAssociate = function() {
	/**
	 * The full name of the associate.
	 * @type string
	 */
	this.name = undefined;
	/**
	 * The standard ID of the associate.
	 * @type string
	 */
	this.standardID = undefined;
	/**
	 * The way the person is associated to the individual.
	 * @type string
	 */
	this.type = undefined;
	/**
	 * The work phone number of the associate.
	 * @type string
	 */
	this.phone = undefined;
};
/**
 * @fileoverview Objects to manage search provider communications
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.ResultSetItem base class
 * @class Stores item information from each search results.<br>
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @version 1.0 2006-09-24
 */
jpmc.external.ResultSetItem = function() {
	/**
	 * The index number (1-based) of this search result.
	 * @type number
	 */
	this.index = undefined;
	/**
	 * The URL to download the search result.
	 * @type string
	 */
	this.urlDownload = undefined;
	/**
	 * The URL to view the search result Icon.
	 * @type string
	 */
	this.urlIcon = undefined;
	/**
	 * The URL of the search result.
	 * @type string
	 */
	this.urlView = undefined;
	/**
	 * The URL to fetch the document from the cache.
	 * @type string
	 */
	this.urlCache = undefined;
	/**
	 * The MIME type of the search result.
	 * @type string
	 */
	this.mimeType = undefined;
	/**
	 * Size of the object.
	 * @type Date
	 */
	this.size = undefined;
	/**
	 * The snippet for the search result.
	 * @type string
	 */
	this.summary = undefined;
	/**
	 * The title of the search result.
	 * @type string
	 */
	this.title = undefined;
};
/**
 * @fileoverview Base object for ResultSets in the jpmc.external namespace
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.ResultSet class
 * @class Base result set interface object.<br>
 * @param {jpmc.external.AJAXResponse} response Response object
 * @param {string} url The URL used to get the result set
 * @constructor
 * @author Ben White ben.x.white@jpmchase.com
 * @extends jpmc.lang.Serializable
 */
jpmc.external.ResultSet = function(response) {

	//Extend the jpmc.lang.Serializable class
	jpmc.lang.Serializable.apply(this, arguments);

	/**
	 * The {@link jpmc.external.AJAXResponse} object
	 * @type object
	 */
	this.response = response || {};
	/**
	 * The number of itmes in the feed
	 * @type number
	 */
	this.count = 0;
	/**
	 * An array of objects
	 * @type object[]
	 */
	this.items = [];
	/**
	 * The xml response data
	 * @type object
	 */
	this.xml = undefined;
	/**
	 * The status value of the response (0:error/1:success)
	 * @type number
	 */
	this.status = 0;
	/**
	 * The status text of the response
	 * @type string
	 */
	this.statusText = '';
	/**
	 * Text name of the feed type (ATOM, RDF, RSS, Google, etc...)
	 * @type string
	 */
	this.type = '';

	try {
		//Results found?
		this.xml = jpmc.helper.XML.fromString(this.response.responseText);
		if (!jpmc.helper.XML.toString(this.xml)) {throw 1;}
	} catch(ex) {
		this.xml = this.response.responseXML;
	}

};
/**
 * @fileoverview Object to support communications with SiteCatalyst
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.SiteCatalyst class
 *
 * @class Parameters for tracking data to SiteCatalyst.
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @param {string} exitLinkURL (Optional) An exit link that should be tracked.
 * @param {string} exitLinkName (Optional) A plain text name for the link.
 * @param {string} exitLinkType (Optional) The type of exit link (download or external).
 * @extends jpmc.external.WebAnalyticsConfig
 */
jpmc.external.SiteCatalyst = function(exitLinkURL, exitLinkName, exitLinkType) {

	//Extend the jpmc.lang.Serializable class
	jpmc.external.WebAnalyticsConfig.apply(this, arguments);

	var self = this;
	var secure = false;
	//Sometimes fails when this is the first URL loaded in an IE window
	try {
		secure = window.location.protocol.search(/https/i)!==-1;
	} catch(ex) {}

	/**
	 * The campaign variable identifies marketing campaigns used to bring visitors to your site.
	 * The value of campaign is usually taken from a query string parameter.
	 * @type string
	 */
	this.campaign = null;

	/**
	 * The channel variable is most often used to identify a section of your site.
	 * For example, a merchant may have sections like Electronics, Toys, or Apparel.
	 * A media site may have sections like News, Sports or Business.
	 * @type string
	 */
	this.channel = null;

	/**
	 * SiteCatalyst uses the charSet variable to translate the character set of the web page into UTF-8.
	 * @type string
	 */
	this.charSet = null;

	/**
	 * The currencyCode variable is used to determine the conversion rate to be applied to revenue as it enters the SiteCatalyst databases.
	 * SiteCatalyst databases store all monetary amounts in a currency of your choice.
	 * If that currency is the same as that specified in currencyCode, or currencyCode is empty, no conversion is applied.
	 * @type string
	 */
	this.currencyCode = null;

	/**
	 * A comma delimited list of events that are used to record common shopping cart success events as well as custom success events.
	 * @type string
	 */
	this.eventList = null;

	/**
	 * A comma delimited list of products that are used for tracking products and product categories as well as purchase quantity and purchase price.
	 * The products variable should always be set in conjunction with a success event.
	 * Optionally, the products variable can track custom incrementor events and Merchandising Evars.
	 * @type string
	 */
	this.productList = null;

	/**
	 * The purchaseID is used to keep an order from being counted multiple times by SiteCatalyst.
	 * Whenever the purchase event is used on your site, you should use the purchaseID variable.
	 * @type string
	 */
	this.purchaseID = null;

	/**
	 * The server variable is used to show either the domain of a web page (to show which domains people come to)
	 * or the server serving the page (for a load balancing quick reference).
	 * @type string
	 */
	this.server = null;

	/**
	 * The state variable captures the state in which a visitor to your site resides.
	 * @type string
	 */
	this.state = null;

	/**
	 * The zip variable captures the zip code in which a visitor to your site resides.
	 * @type string
	 */
	this.zip = null;

	/**
	 * In rare cases, the URL of the page is not the URL that you would like reported in SiteCatalyst.
	 * To accommodate these situations, SiteCatalyst offers the pageURL variable, which overrides the actual URL of the page.
	 * @type string
	 */
	this.pageURL = null;

	/**
	 * The pageName variable contains the name of each page on your site.
	 * If pageName is left blank, the document.title will be used.
	 * @type string
	 */
	this.pageName = null;

	/**
	 * The pageType variable is used only to designate a 404 Page Not Found Error Page.
	 * It only has one possible value, which is "errorPage."
	 * On a 404 Error Page, the pageName variable should not be populated.
	 * @type string
	 */
	this.pageType = null;


	/**
	 * An optional variable used in Link Tracking that determines the name of a custom, download, or exit link.
	 * linkName is not normally needed because an internal function normally replaces it.
	 * @type string
	 */
	this.linkName = exitLinkName || null;

	/**
	 * An optional variable used in link tracking that determines which report a Link Name or URL will appear (Custom, Download or Exit Links).
	 * linkType is not normally needed because an internal function normally replaces it.
	 * @type string
	 */
	this.linkType = null;

	switch(exitLinkType) {
		case 'download': this.linkType = 'lnk_d'; break;
		case 'external': this.linkType = 'lnk_e'; break;
		default: break;
	}

	/**
	 * An required variable for link tracking that indicates the URL of the link.
	 * linkURL is not normally needed because an internal function normally replaces it.
	 * @type string
	 */
	this.linkURL = exitLinkURL || null;


	/**
	 * This variable is used to identify the domain with which cookies are set.
	 * If visitorNamespace changes, all visitors reported in SiteCatalyst may become new visitors.
	 * In short, do not alter this variable without approval from an Omniture Implementation Consultant.
	 * @type string
	 */
	this.visitorNamespace = null;


	/**
	 * The hierarchy array is used to determine the location of a page in your site's hierarchy.
	 * This variable is most useful for sites that have more than three levels in the site structure.
	 * @type string[]
	 */
	this.hierarchy = [null];


	/**
	 * The properties array is used for building custom reports within SiteCatalyst's Traffic Module.
	 * Props may be used as counters (to count the number of times a page view is sent), for pathing reports, or in correlation reports.
	 * @type string[]
	 */
	this.properties = [null];


	/**
	 * The eVars array is used for building custom reports within SiteCatalyst's Conversion Module.
	 * When an eVar is set to a value for a visitor, SiteCatalyst remembers that value until it expires.
	 * Any success events that a visitor encounters while the eVar value is active are counted toward the eVar value.
	 * @type string[]
	 */
	this.eVars = [null];

	var getProp = function(name, defaultConfig) {
		var val = self[name];
		return getValue(val,defaultConfig[name]);
	};

	var getValue = function(val, defaultVal) {
		switch(typeof val) {
			case 'boolean':
			case 'number' :
			case 'string' : return val;
			default: return val || defaultVal;
		}
	};

	var getArray = function(name, defaultConfig) {
		var val = self[name];
		var arr = [];
		if (val && val.constructor==Array) {
			for (var x=0; x<21; x++) {
				arr[x] = getValue(val[x], defaultConfig[name][x]);
			}
			return arr;
		} else {
			return defaultConfig[name];
		}
	};

	/**
	 * Function that returns the URL for tracking activity based on these parameters.
	 * @param {string} reportSuiteID The ID of the report suite this event is related to.
	 * @param {jpmc.external.SiteCatalyst} defaultConfig (Optional) A {@link jpmc.external.SiteCatalyst} object that contains the default parameters.
	 * @type string
	 * @returns The URL representation of this object.
	 */
	this.toURL = function(reportSuiteID, defaultConfig) {

		var A, x, tm = new Date();

		var d = defaultConfig || {};

		var obj = {
			//Systematic
			'ndh'       : 1,
			't'         : jpmc.helper.Date.format(tm, 'DD/MM/YYYY HHHH:NN:SS ')+tm.getDay()+' '+tm.getTimezoneOffset(),
			'bh'        : top.innerHeight || (document.body||{}).offsetHeight || 0,
			'bw'        : top.innerWidth || (document.body||{}).offsetWidth ||0,
			'c'         : screen.pixelDepth || screen.colorDepth,
			'k'         : window.navigator.cookieEnabled?'Y':'N',
			'v'         : window.navigator.javaEnabled()?'Y':'N',
			'j'         : jpmc.ui.Util.jsVersion,
			'pageName'  : getProp('pageName', d) || document.title,
			'g'         : getProp('pageURL', d)  || window.location.href,
			'r'         : document.referrer,
			's'         : screen.width+'x'+screen.height,
			'ct'        : (document.body||{}).connectionType,
			//Optional
			'v0'        : getProp('campaign', d),
			'ch'        : getProp('channel', d),
			'ce'        : getProp('charSet', d),
			'cc'        : getProp('currencyCode', d),
			'events'    : getProp('eventList', d),
			'pev2'      : getProp('linkName', d),
			'pe'        : getProp('linkType', d),
			'pev1'      : getProp('linkURL', d),
			'ns'        : getProp('visitorNamespace', d),
			'pageType'  : getProp('pageType', d),
			'products'  : getProp('productList', d),
			'purchaseID': getProp('purchaseID', d),
			'server'    : getProp('server', d),
			'state'     : getProp('state', d),
			'zip'       : getProp('zip', d)
		};


		var eVars = getArray('eVars', d);
		for (x=1; x<eVars.length && x<21; x++) {
			obj['v' + x] = eVars[x];
		}

		var properties = getArray('properties', d);
		for (x=1; x<properties.length && x<21; x++) {
			obj['c' + x] = properties[x];
		}

		var hierarchy = getArray('hierarchy', d);
		for (x=1; x<hierarchy.length && x<7; x++) {
			obj['h' + x] = hierarchy[x];
		}

		var qs = [];
		qs[qs.length] = '[AQB]';
		for (A in obj) {
			if (obj[A]) {
				qs[qs.length] = A + '=' + jpmc.helper.String.urlEscape(obj[A]);
			}
		}
		qs[qs.length] = '[AQE]';

		//ensures there is no caching
		var sess = 's' + tm.valueOf();

		return 'http'+(secure?'s':'')+'://'+(getProp('visitorNamespace', d)?getProp('visitorNamespace', d):(secure?'102':reportSuiteID.split(',')[0]))+'.112.2o7.net/b/ss/'+reportSuiteID+'/1/H.1-pdv-2/'+sess + '?' + qs.join('&');


	};

};
/**
 * @fileoverview Object to support communications with WebAnalytics
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.WebAnalyticsConfig class
 *
 * @class Base config for Parameters for tracking data for web analytics.
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @param {string} exitLinkURL (Optional) An exit link that should be tracked.
 * @param {string} exitLinkName (Optional) A plain text name for the link.
 * @param {string} exitLinkType (Optional) The type of exit link (download or external).
 * @extends jpmc.lang.Serializable
 */
jpmc.external.WebAnalyticsConfig = function(exitLinkURL, exitLinkName, exitLinkType) {

	//Extend the jpmc.lang.Serializable class
	jpmc.lang.Serializable.apply(this, arguments);

	/**
	 * Flag that indicates if the tracking event should be synchronous of not.
	 * @type boolean
	 */
	this.synchronous = false;

	/**
	 * Function that returns if the URL should be loaded synchronously or not.
	 * @param {jpmc.external.WebAnalyticsConfig} defaultConfig (Optional) A {@link jpmc.external.WebAnalyticsConfig} object that contains the default parameters.
	 * @type boolean
	 * @returns Flag indicating if the URL should be loaded synchronously or not.
	 */
	this.isSynchronous = function(defaultConfig) {
		var val = this.synchronous;
		switch(typeof val) {
			case 'boolean':
			case 'number' :
			case 'string' : return val;
			default: return val || defaultConfig[name];
		}
	};

	/**
	 * Function that must be overwritten that returns the URL for tracking activity based on these parameters.
	 * @param {string} reportSuiteID The ID of the report suite this event is related to.
	 * @param {jpmc.external.WebAnalyticsConfig} defaultConfig (Optional) A {@link jpmc.external.WebAnalyticsConfig} object that contains the default parameters.
	 * @type string
	 * @returns The URL representation of this object.
	 */
	this.toURL = function(reportSuiteID, defaultConfig) {

		throw new jpmc.lang.Exception(this, 'jpmc.external.WebAnalyticsConfig', 'This class must be extended.', '');

	};

};
/**
 * @fileoverview Objects to manage communications with WebAnalytics
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.external.WebAnalytics class
 *
 * @class Manages site activity tracking.
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @param {jpmc.external.WebAnalyticsConfig} configClass A reference to the class used for managing the tracking events.
 * @param {jpmc.external.AJAX} ajax (Optional) ajax An instance of the {@link jpmc.external.AJAX AJAX} object.
 * @requires jpmc.lang.Exception
 */
jpmc.external.WebAnalytics = function(configClass, ajax) {

	var self = this;
	var dtm = new Date();
	var imgs = [];
	var m_ajax = ajax || new jpmc.external.AJAX();
	var img = new Image();
	var src = [];
	var active = 0;

	var defaultConfigClass = configClass || jpmc.external.WebAnalyticsConfig;

	/**
	 * Report suite ID(s) to which to attribute the hit (comma delimited).
	 * @type string
	 */
	this.reportSuiteID = null;

	/**
	 * Flag that indicates if the links on the page should be automatically tagged for tracking (default: false).
	 * Note: Only download and external links will be tracked.
	 * @type boolean
	 */
	this.autoAttach = false;

	/**
	 * Flag that indicates if the current page hit should be automatically tracked (default: false).
	 * @type boolean
	 */
	this.autoLog = false;

	/**
	 * Flag that forces IE to use dynamic image source for tracking (default: false).
	 * @type boolean
	 */
	this.safeMode = false;

	/**
	 * A {@link jpmc.external.WebAnalyticsConfig} object that holds the default logging parameters for the page.
	 * These can be overridden by passing in a {@link jpmc.external.WebAnalyticsConfig} object to the logEvent method.
	 * @type jpmc.external.WebAnalyticsConfig
	 */
	this.defaultConfig = new defaultConfigClass();

	/**
	 * Array of file extensions used to identify download links.
	 * @type string[]
	 */
	this.linkDownloadExtensions = ['doc','pdf','xls','ppt','pps','mdb','vsd','mpp','rtf','txt','bin','zip','wav','mp3','mov','mpg','avi','rm','ram','mpeg','aac','m4a','m4b','dot','ica','wma','wmv','xml','asx'];

	/**
	 * Array of strings that filter external links from being tracked (default: []).
	 * @type string[]
	 */
	this.linkExternalFilters = [];

	/**
	 * Array of strings that filter internal links from being tracked (default: ['javascript:', document.location.hostname]).
	 * Used to determine external links.
	 * @type string[]
	 */
	this.linkInternalFilters = ['javascript:'];
	try {
		this.linkInternalFilters[this.linkInternalFilters.length] = window.location.hostname;
	} catch(ex){}

	/**
	 * Flag that indicates whether or not the query string should be included in the Exit Links and File Download reports (default: false).
	 * @type boolean
	 */
	this.linkLeaveQueryString = false;

	/**
	 * Flag that indicates if download links should be tracked (default: false).
	 * Download links are based on URL matching one of the extent ions in the linkDownloadExtensions array.
	 * @type boolean
	 */
	this.linkTrackDownloads = false;

	/**
	 * Flag that indicates if external links should be tracked (default: false).
	 * External links are based on the URL not matching the strings in the linkInternalFilters array.
	 * @type boolean
	 */
	this.linkTrackExternal = false;

	/**
	 * Sends tracking data to the appropriate URL based on the {jpmc.external.WebAnalyticsConfig} object used.
	 * @param {jpmc.external.WebAnalyticsConfig} config (Optional) A {@link jpmc.external.WebAnalyticsConfig} object that contains parameters to override the values in the {@link jpmc.external.WebAnalytics#defaultConfig defaultConfig} object.
	 * @type boolean
	 * @returns Flag indicating if the data was logged synchronously or not.
	 */
	this.logEvent = function(config) {

		if (!this.reportSuiteID) {throw new jpmc.lang.Exception(this, 'jpmc.external.WebAnalytics', 'reportSuiteID is required before logEvent can be called', '');}

		config = config || this.defaultConfig;

		var sync = config.isSynchronous(this.defaultConfig);

		var url = config.toURL(this.reportSuiteID, this.defaultConfig);

		if (!self.safeMode) {
			var res = m_ajax.request(url, !sync?funcOK:null, !sync?funcFail:null, url);

			if (!res.error) {
				if (sync) {
					if (res.statusText == 'OK') {return true;}
				} else {
					return false;
				}
			}
		}

		//Call was not executed as requested, try old standby
		ajax2(url);
		return false;

	};

	var funcOK = function(res){
		//alert(jpmc.helper.Object.toString(res,true));
	};

	var funcFail = function(res, url){
		//alert(jpmc.helper.Object.toString(res,true));
		ajax2(url);

	};

	var ajax2 = function(url) {
		src[src.length] = url;
		if (active) {return;}
		active = setInterval(function() {
			if (src.length && (img.complete || !img.src)) {
				img.src = src.shift();
			}
		}, 250);
	};

	/**
	 * Function that can determine if a link should be filtered or not.
	 * @param {string} url The URL to test.
	 * @type boolean
	 * @returns Flag indicating if the link is an external link or not.
	 */
	this.isFiltered = function(url) {
		var filters = this.linkExternalFilters.concat(this.linkInternalFilters);
		for (var x=0; x<filters.length; x++) {
			var filter = filters[x];
			if (filter) {
				var rx = new RegExp(filter.replace(/\./g,'\\.'),'i');
				if (rx.test(url)) {return true;}
			}
		}
		return false;
	};

	/**
	 * Function that can determine if a link is a download link or not.
	 * @param {string} url The URL to test.
	 * @type boolean
	 * @returns Flag indicating if the link is a download link or not.
	 */
	this.isDownload = function(url) {
		var matches = url.match(/.*\.([a-z0-9]+)/i);
		if (matches && matches.length===2) {
			if (jpmc.helper.Array.indexOf(self.linkDownloadExtensions, matches[1])!=-1) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Function that tracks appropriate links, and navigates the user afterward.
	 * @param {string} url The URL to navigate to.
	 * @param {string} linkName (Optional) The name associated with the link.
	 * @param {string} windowName (Optional) The name of the window to load the URL into. (default: _self, if _none then URL will not be loaded)
	 * @type void
	 */
	this.navigateTo = function(url, linkName, windowName) {

		var goURL = function() {
			if (windowName == '_none') {return;}
			window.open(url, windowName||'_self');
		};

		var m_URL = new jpmc.net.URI(url).toURL();

		//determine link type
		var linkType = this.isDownload(m_URL)?'download':null;
		linkType = linkType||(!this.isFiltered(m_URL)?'external':null);
		linkType = linkType||'lnk_o';

		//determine if logging required
		switch (linkType) {
			case 'download': if (!this.linkTrackDownloads) {goURL(); return;} break;
			case 'external': if (!this.linkTrackExternal) {goURL(); return;} break;
			default     : goURL(); return;
		}

		//prepare logging
		var obj = new defaultConfigClass(this.linkLeaveQueryString?m_URL:m_URL.split('?')[0], linkName, linkType);
		obj.synchronous = true;

		//log navigation
		if (this.logEvent(obj)) {
			goURL();
		} else {
			setTimeout(goURL, 1000);
		}
	};

	/**
	 * Creates a new instance of the WebAnalyticsConfig used within this object.
	 * @type mixed
	 * @returns An instance of the WebAnalyticsConfig used within this object
	 */
	this.getEmptyConfig = function() {
		return new defaultConfigClass();
	};

	/**
	 * Function that attaches the appropriate events to track anchor tag clicks.
	 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to effect.
	 * @param {string} linkName (Optional) The name to associated with the link. (default: title attribute else innerHTML)
	 * @type void
	 */
	this.attachTracking = function(element, linkName) {
		var el = jpmc.ui.Util.getObject(element);
		var getText = function(el) {
			try {
				return jpmc.helper.XML.getText(el);
			} catch(ex) {
				return null;
			}
		};
		var attach = function(el, linkName) {
			jpmc.ui.Util.attachEvent(el, 'onclick', function(e) {
				var title = (linkName||e.target.title||getText(e.target)||e.target.innerHTML).slice(0,100);
				self.navigateTo(e.target.href, title, e.target.target);
				e.stopEvent();
			});
		};

		if (el.tagName == 'A') {
			attach(el, linkName);
		} else {
			var rxJS = /^javascript:/i;
			var links = el.getElementsByTagName('A');
			for (var x=0; x<links.length; x++) {
				var link = links[x];
				if (rxJS.test(link.href)) {continue;}
				attach(link);
			}
		}

	};

	var auto = function() {

		if (self.autoLog) {
			self.logEvent();
		}

		if (self.autoAttach && (self.linkTrackDownloads || self.linkTrackExternal)) {
			self.attachTracking(document);
		}
	};

	if (!jpmc.ui.Util.isDOMComplete) {
		jpmc.ui.Util.attachEvent(jpmc.ui.Util,'onDOMComplete', auto);
	} else {
		setTimeout(auto,10);
	}

};
/**
 * @fileoverview Object for managing cookies
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an singleton instance of the jpmc.ui.Cookie class
 * @class An object that allows quick access to common cookie functions.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.01 2008-09-09
 */
jpmc.net.Cookie = function(){

	var self = this;

	var ns = 'jpmc_net_Cookie';

	//Singleton
	if (window[ns]) {
		return window[ns];
	}
	window[ns] = this;

	var enc = jpmc.helper.String.urlEscape;
	var dec = jpmc.helper.String.urlUnescape;
	var reg = /(^| )(.+?)=(.+?)(;|$)/g;

	/**
	 * Flag that indicates if cookies are enabled
	 * @type boolean
	 */
	this.enabled = false;

	/**
	 * Creates or updates a cookie
	 * @param {string} name  The name of the cookie
	 * @param {string} value The value of the cookie
	 * @param {number} days (Optional) The number of days before the cookie expires (defaults to end of current session)
	 * @param {string} path (Optional) The path for which the cookie is valid (defaults to path of calling document)
	 * @param {string} domain (Optional) The domain for which the cookie is valid (defaults to domain of calling document)
	 * @param {boolean} secure (Optional) Flag indicating if the cookie transmission requires a secure transmission an argument (default: false)
	 */
	this.create = function(name, value, days, path, domain, secure) {
		var s = [];
		s[s.length] = enc(name) + "=" + enc(value);
		if (!isNaN(days)) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			s[s.length] = 'expires='+date.toGMTString();
		}
		if (path) {s[s.length] = 'path=' + path;}
		if (domain) {s[s.length] = 'domain=' + domain;}
		if (secure) {s[s.length] = 'secure';}
		document.cookie = s.join('; ');
	};

	/**
	 * Deletes a cookie
	 * @param {string} name  The name of the cookie
	 * @param {string} path (Optional) The path for which the cookie is valid (defaults to path of calling document)
	 * @param {string} domain (Optional) The domain for which the cookie is valid (defaults to domain of calling document)
	 */
	this.remove = function(name, path, domain) {
		self.create(name, '', -1, path, domain);
	};

	/**
	 * Determine if a specific cookie exists
	 * @param {string} name The name of the cookie
	 * @type boolean
	 * @return True if cookie exists; false if it does not
	 */
	this.exists = function(name) {
		name = enc(name);
		var ret = false;
		document.cookie.replace(reg, function(a,b,c) {
			ret = ret || c==name;
		});
		return ret;
	};

	/**
	 * Gets a specific cookie value
	 * @param {string} name The name of the cookie
	 * @param {string} defaultValue (Optional) The value to return if the requested cookie does not exist
	 * @type string
	 * @return The string value of the cookie, or the defaultValue if the cookie does not exist
	 */
	this.item = function(name, defaultValue) {
		name = enc(name);
		var val;
		document.cookie.replace(reg, function(a,b,c,d) {
			if (c==name) {val = d;}
		});
		return val?dec(val):defaultValue;
	};

	/**
	 * List the cookie names
	 * @type [string]
	 * @return Array of cookie names
	 */
	this.getKeys = function() {
		var arr = [];
		document.cookie.replace(reg, function(a,b,c,d) {
			arr[arr.length] = dec(c);
		});
		return arr;
	};

	//Determine if cookies are enabled
	var key = ns + '_test_enabled';
	var val = (new Date()).valueOf();
	self.create(key, val);
	self.enabled = this.item(key) == val;
	self.remove(key);

	return self;
};/**
 * @fileoverview Helps manage history in for AJAX applications
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.net.History class
 * @class Helps manage history in for AJAX applications.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @param {string} refTagID (Optional) The ID of the script tag to use as the base URL for IE support (default: "jpmc_api")
 */
jpmc.net.History = function(refTagID) {

	//Singleton
	if (window.jpmc_net_History) {
		return window.jpmc_net_History;
	}
	window.jpmc_net_History = this;

	//Some internal properties/objects
	var self = this;
	var baseURL = jpmc.lang.Util.getBaseURL(refTagID);
	var lastHash;
	var iframe;
	var orgTitle = document.title;
	var map = new jpmc.util.Map();

	/**
	 * A set of functions that will handle the onChange event.<br>
	 * Each function added to this set will be called as follows:<br>
	 * function(&lt;string&gt; key, &lt;string&gt; data, &lt;string&gt; pageTitle);
	 * @type jpmc.util.Set
	 */
	this.onChange = new jpmc.util.Set();

	/**
	 * Adds a New Event to the Browser History
	 * @param {string} data The data required to recreate the current browser state.
	 * @param {string} title (Optional) The new page title that should be associated with the data.
	 * @type void
	 */
	this.add = function(data, title) {

		var obj = {
			d:data,
			t:title
		};

		var hash = jpmc.helper.Object.toString(obj);

		self.processChange('#' + hash);

		updateIFrame(hash);

	};

	/**
	 * Adds a New Event to the Browser History (note: data is gone after navigating away from current page)
	 * @param {string} key The unique key for the current page state.
	 * @param {string} data Additional data required to recreate the current browser state.
	 * @param {string} title (Optional) The new page title that should be associated with the data.
	 * @type void
	 */
	this.addKey = function(key, data, title) {

		map.put(key, {
			k:key,
			d:data,
			t:title
		});

		self.processChange('#' + key);

		updateIFrame(key);

	};

	/**
	 * Returns the string representation of the object
	 * @ignore
	 */
	this.processChange = function(newHash) {

		var obj = {k:null,d:null,t:orgTitle};

		var hash = (newHash || document.location.hash).slice(1);

		if (!jpmc.ui.Util.isFireFox) {
			hash = jpmc.helper.String.urlUnescape(hash);
		}

		if (hash == lastHash) {return;}

		try {
			if (!(/^\{.+\}$/).test(hash)) {throw('');}
			obj = jpmc.helper.Object.fromString(hash);
		} catch(ex) {
			obj = map.get(hash) || obj;
		}

		//Apply Current State
		if (newHash || (jpmc.ui.Util.isFireFox && hash !== '')) {
			document.location.hash = '#' + jpmc.helper.String.urlEscape(hash);
		}
		document.title = obj.t || document.title;

		//Save Current State
		lastHash = hash;

		//Call Each Function Placed in the onChange Set
		fireForEach(self.onChange, obj.k, obj.d, obj.t);
	};

	var updateIFrame = function(hash) {
		if (jpmc.ui.Util.isIE) {
			iframe.src = baseURL + 'jpmc_net_History.htm?' + jpmc.helper.String.urlEscape(hash);
		}
	};

	//Supports Event Code
	var fireForEach = function(eventSet) {

		var args = Array.apply(null,arguments);
		args.shift();

		for (var x=0; x<eventSet.count(); x++) {
			eventSet.item(x).apply(null,args);
		}
	};

	//Attach History Listeners
	jpmc.ui.Util.attachEvent(jpmc.ui.Util, 'onDOMComplete', function() {
		if (jpmc.ui.Util.isIE) {
			//Attatch IFrame for IE Change Events
			iframe = document.createElement('IFRAME');
			iframe.id = 'jpmc_net_History_iframe';
			iframe.style.display = 'none';
			var body = document.getElementsByTagName("BODY")[0] || document.documentElement;
			body.insertBefore(iframe, body.firstChild);
		} else {
			setInterval(function() {self.processChange();}, 250);
		}
		self.processChange();
		if (jpmc.ui.Util.isIE) {updateIFrame(decodeURIComponent(document.location.hash).slice(1));}
	});

	return self;

};
/**
 * @fileoverview Object for managing QueryStrings
 * @author Ben White (ben.x.white@jpmchase.com)
 */


/**
 * Creates an instance of the jpmc.ui.QueryString class
 * @class Makes query string data readily available.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-11-02
 * @extends jpmc.lang.Serializable
 * @param {string} query (Optional) The query part of the url begining with the "?". If not supplied, the default value is the current document location querystring.
 */
jpmc.net.QueryString = function(query){

	//Extend the jpmc.lang.Serializable class
	jpmc.lang.Serializable.apply(this, arguments);

	/**
	 * Array that contains all the keys in the query string
	 * @type string[]
	 */
	this.getKeys = function() {
		var keys = [];
		var obj = this.getPrivateObject();
		for (var A in obj) {
			keys[keys.length] = A;
		}
		return keys;
	};

	/**
	 * Determine if a attribute exists in the querystring
	 * @type boolean
	 */
	this.exists = function(key) {
		var obj = this.getPrivateObject();
		return (key in obj);
	};

	/**
	 * Returns the value from the query string item.
	 * @param {string} key The name of the query string item.
	 * @param {string} defaultValue Default value, if the query string item does not exist.
	 * @type string
	 * @return Value from the cooresponding query string item requested. If not exists, the default value is returned.
	 */
	this.item = function(key, defaultValue) {
		var obj = this.getPrivateObject();
		return (key in obj)?obj[key]:defaultValue;
	};

	var m_query = (typeof query == 'string')?query:document.location.search;

	if (m_query.length > 1) {
		var obj = this.getPrivateObject();
		m_query.replace(/(?:(?:^\?|&)([^&=#]+)=([^&=#]*))/g,
			function(str,attrib,value){
				value = jpmc.helper.String.urlUnescape(value);
				switch (typeof obj[attrib]) {
					case 'undefined':
						//New parameter
						obj[attrib] = value;
						break;
					case 'string':
						//Existing parameter (Make Array)
						var tmp = obj[attrib];
						obj[attrib] = [tmp,value];
						break;
					default:
						//Existing Array
						obj[attrib][obj[attrib].length] = value;
						break;
				}
			}
		);
	}

};/**
 * @fileoverview Object for managing URIs
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.net.URL class
 * @class Parses a url into it's seperate parts.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @extends jpmc.lang.Serializable
 * @param {string} url (Optional) The URL (Uniform Resource Locator) to parse. If not supplied, the default value is the current document location.
 */
jpmc.net.URI = function(url) {

	var self = this;
	var m_url;

	//Extend the jpmc.lang.Serializable class
	jpmc.lang.Serializable.apply(this, arguments);

	/**
	 * Sets or retrieves the subsection of the href property that follows the number sign (#).
	 * @type string
	 */
	this.hash = '';

	/**
	 * Sets or retrieves the hostname and port number of the URL.
	 * @type string
	 */
	this.host = '';

	/**
	 * Sets or retrieves the host name part of the URL.
	 * @type string
	 */
	this.hostname = '';

	/**
	 * Sets or retrieves the entire URL as a string.
	 * @type string
	 */
	this.href = '';

	/**
	 * Sets or retrieves the substring of the href property that indicates the password.
	 * @type string
	 */
	this.password = '';

	/**
	 * Sets or retrieves the file name or path specified by the object.
	 * @type string
	 */
	this.pathname = '';

	/**
	 * Sets or retrieves the port number associated with a URL.
	 * @type number
	 */
	this.port = '';

	/**
	 * Sets or retrieves the protocol portion of a URL.
	 * @type string
	 */
	this.protocol = '';

	/**
	 * Sets or retrieves the substring of the href property that follows the question mark.
	 * @type string
	 */
	this.search = '';

	/**
	 * Sets or retrieves the substring of the href property that indicates the username.
	 * @type string
	 */
	this.username = '';

	/**
	 * Gets a {@link jpmc.net.QueryString} object that represents the substring of the href property that follows the question mark.
	 * @type jpmc.net.QueryString
	 */
	this.getQueryString = function() {
		return new jpmc.net.QueryString(this.search);
	};

	/**
	 * Returns the string representation of the object
	 * @type string
	 */
	this.toURL = function() {

		var s = [];

		if (this.protocol) {
			s[s.length] = this.protocol;
			switch (this.protocol.toLowerCase()) {
				case 'news:': break;
				case 'mailto:': break;
				default: s[s.length] = '//'; break;
			}
		}

		if (this.username) {
			s[s.length] = this.username;
			if (this.password) {
				s[s.length] = ':';
				s[s.length] = this.password;
			}
			s[s.length] = '@';
		}

		if (this.host) {
			s[s.length] = this.host;
		} else if (this.hostname){
			s[s.length] = this.hostname;
			if (this.port) {
				s[s.length] = ':';
				s[s.length] = this.port;
			}
		}

		if (this.pathname) {
			var path = self.pathname;
			while(path.indexOf('../')!==-1) {
				path = path.replace(/(\/[^\/]+?\/)?(\.\.\/)/,'/');
			}
			s[s.length] = path;
		}

		if (this.search) {
			s[s.length] = this.search;
		}

		if (this.hash) {
			s[s.length] = this.hash;
		}

		return s.join('');
	};

	//Get base url
	if (!url || typeof url!='string') {
		//Current URL
		m_url = document.location.href;
	} else {
		if (url.indexOf(':') != -1) {
			//Exact URL
			m_url = url;
		} else if (url.indexOf('/') === 0) {
			//Absolute path
			m_url = document.location.href;
			m_url = m_url.replace(/^([a-z]+:)?(\/\/)?(.*?)(\/)(.*)/i, function(a,c,b,d,e) {return c+b+d;});
			//set absolute path
			m_url += url;
		} else {
			//Relative path
			m_url = document.location.href;
			m_url = m_url.split('?')[0];
			m_url = m_url.replace(/\/[^\/]*$/, '/');
			m_url = m_url + url;
		}

	}

	//Parse base url
	m_url.replace(/^([a-z]+:)?(\/\/)?(?:((.*?)(:(.*?))?@)?([a-z0-9\-\.]+)(:([0-9]+))?)?(\/.*?)?(\?.+?)?(#.+)?$/gi,function(){

			//alert(Array.apply(this,arguments).join('\n'));

			self.href = arguments[0];
			self.hash = arguments[12]||'';
			self.host = (arguments[7]||'') + (arguments[8]||'');
			self.hostname = arguments[7]||'';
			self.password = arguments[6]||'';
			self.pathname = arguments[10]||'';
			self.port = (isNaN(arguments[9])||arguments[9]==='')?'':parseInt(arguments[9],10);
			self.protocol = arguments[1]||'';
			self.search = arguments[11]||'';
			self.username = arguments[4]||'';
		}
	);




};

/**
 * Creates an instance of the jpmc.ui.Color class
 * @class A class that builds color attributes from a string..<br>
 * @constructor
 * @extends jpmc.lang.Serializable
 * @param {mixed} r (Optional) Either the HTML color "#FFFFFF" or RGB array [255,255,255] or the RGB number (0-16777215) or the red component (0-255) of the color.
 * @param {number} g (Optional) The green component of the color. (0-255)
 * @param {number} b (Optional) The blue component of the color. (0-255)
 */
jpmc.ui.Color = function(r,g,b) {

	var self = this;

	//Extend the jpmc.lang.Serializable class
	jpmc.lang.Serializable.apply(this, arguments);

	/**
	 * Sets or retrieves the red component of the color.(0-255)
	 * @type number
	 */
	this.red   = 255;
	/**
	 * Sets or retrieves the green component of the color.(0-255)
	 * @type number
	 */
	this.green = 255;
	/**
	 * Sets or retrieves the blue component of the color.(0-255)
	 * @type number
	 */
	this.blue  = 255;

	/**
	 * Sets the RGB components of the color object.
 	 * @param {number} r The red component of the color. (0-255)
 	 * @param {number} g The green component of the color. (0-255)
 	 * @param {number} b The blue component of the color. (0-255)
	 * @type void
	 */
	this.fromRGB = function(r,g,b) {
		this.red = r;
		this.green = g;
		this.blue = b;
	};

	/**
	 * Gets the RGB components of the color in array form.
	 * @type array
	 */
	this.toRGB = function() {
		return [this.red,this.green,this.blue];
	};

	/**
	 * Gets the value of the color in integer form.
	 * @type number
	 */
	this.toInteger = function() {
		return 256*256*this.red + 256*this.green + this.blue;
	};

	/**
	 * Sets the RGB components of the color using an integer.
 	 * @param {number} val The RGB integer that represents an RGB color.
	 * @type void
	 */
	this.fromInteger = function(val) {
		this.red =   val >> 16 & 0xFF;
		this.green = val >> 8  & 0xFF;
		this.blue =  val       & 0xFF;
	};

	this.toComplementary = function() {
		return [255-this.red, 255-this.green, 255-this.blue];
	};

	/**
	 * Sets the RGB components of the color using a html color string.
 	 * @param {string} rgb The HTML string that represents an RGB color. Examples: #AABBCC, #ABC, rgb(170,187,204)
	 * @type void
	 */
	this.fromHTML = function(rgb) {
		//#112233
		var rxHTML  = new RegExp('^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$','i');

		//#123
		var rxShort = new RegExp('^#?([0-9a-f])([0-9a-f])([0-9a-f])$','i');

		//rgb(123,123,123)
		var rxRGB   = new RegExp('^rgb\\((\\d{1,3})\\, ?(\\d{1,3})\\, ?(\\d{1,3})\\)$','i');

		if (rxHTML.test(rgb)) {
			rgb.replace(rxHTML,
				function(x,r,g,b) {
					self.red   = parseInt(r,16);
					self.green = parseInt(g,16);
					self.blue  = parseInt(b,16);
				}
			);

		} else if (rxRGB.test(rgb)) {
			rgb.replace(rxRGB,
				function(x,r,g,b) {
					self.red   = parseInt(r,10);
					self.green = parseInt(g,10);
					self.blue  = parseInt(b,10);
				}
			);
		} else if (rxShort.test(rgb)) {
			rgb.replace(rxShort,
				function(x,r,g,b) {
					self.red   = parseInt(r+r,16);
					self.green = parseInt(g+g,16);
					self.blue  = parseInt(b+b,16);
				}
			);
		} else {
			//unable to parse color, may be a color name
			//possible support in future versions
		}
	};

	/**
	 * Gets the RGB components of the color in HTML form. (Example: #00ccff)
	 * @type string
	 */
	this.toHTML = function() {
		var db = new jpmc.util.DataBuilder(jpmc.lang.Data.format.HEX);
		db.appendBinary(this.toRGB());
		return '#' + db.getValue();
	};

	/**
	 * Sets the RGB components of the color object using HSL.
 	 * @param {number} h The hue fraction of the color. (0-1)
 	 * @param {number} s The saturation fraction of the color. (0-1)
 	 * @param {number} l The lightness fraction of the color. (0-1)
	 * @type void
	 */
	this.fromHSL = function(h, s, l){

		var hToC = function(x, y, h) {
			var c;
			if(h < 0) {h++;}
			if(h > 1) {h--;}
			if (h<1/6) {
				c=x +(y - x) * h * 6;
			} else {
				if(h < 1/2) {
					c=y;
				} else {
					if(h < 2/3) {
						c=x + (y - x) * (2 / 3 - h) * 6;
					} else {
						c=x;
					}
				}
			}
			return c;
		};

		var	y = (l > 0.5)? l + s - l * s:  l * (s + 1);
		var x = l * 2 - y;
		self.red = Math.round(hToC(x, y, h + 1 / 3) * 255);
		self.green = Math.round(hToC(x, y, h) * 255);
		self.blue = Math.round(hToC(x, y, h - 1 / 3) * 255);
	};

	/**
	 * Gets the HSL components of the color in array form.
	 * returns Array with the following data ranges [0-1, 0-1, 0-1]
	 * @type array
	 */
	this.toHSL = function() {
		var max = Math.max(self.red, self.green, self.blue);
		var min = Math.min(self.red, self.green, self.blue);

		var h = 0;
		var s = 0;
		var l = (max + min) / 510;

		if(max != min) {

			if (l>0.5) {
				s = (max - min) / (510 - max - min);
			} else if (l>0) {
				s = (max - min) / (max + min);
			}

			if (self.red==max) {
				h = (self.green-self.blue)/(max-min);
			} else if (self.green==max) {
				h = (2 + (self.blue-self.red)/(max-min));
			} else if (self.blue==max) {
				h = (4 + (self.red-self.green)/(max-min));
			}

			h /= 6;
			if(h < 0) {h++;}
		}

		return [h, s, l];
	};

	/**
	 * Sets the RGB components of the color object using HSL.
 	 * @param {number} h The hue fraction of the color. (0-1)
 	 * @param {number} s The saturation fraction of the color. (0-1)
 	 * @param {number} v The value or brightness fraction of the color. (0-1)
	 * @type void
	 */
	this.fromHSV = function(h, s, v) {
		var r,g,b;
		v *= 255;
		if( s === 0 ) {
			r = g = b = v; // achromatic (grey)
		} else {
			h *= 6; // sector 0 to 5
			var i = Math.floor(h);
			var f = h - i; // factorial part of h
			var p = v * (1 - s );
			var q = v * (1 - s * f );
			var t = v * (1 - s * (1 - f));
			switch(i) {
				case 0:  r = v; g = t; b = p; break;
				case 1:  r = q; g = v; b = p; break;
				case 2:  r = p; g = v; b = t; break;
				case 3:  r = p; g = q; b = v; break;
				case 4:  r = t; g = p; b = v; break;
				default: r = v; g = p; b = q; break;
			}
		}
		this.red = Math.round(r);
		this.green = Math.round(g);
		this.blue = Math.round(b);
	};

	/**
	 * Gets the HSV components of the color in array form.
	 * returns Array with the following data ranges [0-1, 0-1, 0-1]
	 * @type array
	 */
	this.toHSV = function() {
		var max = Math.max(this.red, this.green, this.blue);
		var min = Math.min(this.red, this.green, this.blue);

		var h = 0;
		var s = 0;
		var v = max / 255;

		var delta = max - min;

		if( max !== 0 ) {
			s = delta / max;
			if(delta===0) {
				h = 0;
			} else if( this.red == max ) {
				h = (this.green - this.blue) / delta;    // between yellow & magenta
			} else if( this.green == max ) {
				h = 2 + (this.blue - this.red) / delta;  // between cyan & yellow
			} else {
				h = 4 + (this.red - this.green) / delta; // between magenta & cyan
			}
			h /= 6;
			if (h < 0) {h++;}
		}
		return [h, s, v];
	};

	if (arguments.length === 1) {
		var arg = arguments[0];
		if (typeof arg == 'string') {
			self.fromHTML(arg);
		} else if (typeof arg == 'number') {
			self.fromInteger(arg);
		} else if (typeof arg == 'object' && arg.constructor == Array) {
			this.red = arg[0];
			this.green = arg[1];
			this.blue = arg[2];
		}
	} else if (arguments.length === 3) {
		self.fromRGB.apply(self,arguments);
	}

};
/**
 * @fileoverview Objects for building Menus
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.ui.ContextMenuItem class
 * @class Item that can be added to a jpmc.ui.ContextMenu object.<br>
 * @constructor
 * @param {string} image The location of a 16x16 image to use.
 * @param {string} text The main text to display on the menu item.
 * @param {string} hotkey The hotkey text to display on the menu item (ie: Ctrl+X).
 * @param {mixed} handler The function that will handle the click event of the item. This may also be an instance of the {@link jpmc.ui.ContextMenu} class
 */
jpmc.ui.ContextMenuItem = function(image, text, hotkey, handler) {

	var self = this;
	var m_id = jpmc.ui.ContextMenuItem.count++;
	var m_menu = null;
	var m_container = null;
	var m_item = null;

	var m_image = image;
	var m_text = text;
	var m_hotkey = hotkey;
	var m_handler = handler;

	var m_visible = true;
	var m_checked = false;
	var m_enabled = true;

	var m_stub = (typeof handler == 'object' && handler.constructor == jpmc.ui.ContextMenu);
	var m_seperator = false;

	if (m_stub) {handler.setParent(this);}

	/**
	 * Gets the {@link jpmc.ui.ContextMenu} object that this Item is a child of
	 * @type object
	 * @returns The {@link jpmc.ui.ContextMenu} object that this Item is a child of
	 */
	this.getMenu = function() {
		return m_menu;
	};

	/**
	 * Gets the location of the image on the menu item.
	 * @type string
	 * @returns The location of the image on the menu item.
	 */
	this.getImage = function() {
		return m_image;
	};

	/**
	 * Sets the location of the image on the menu item.
 	 * @param {string} src The location of a 16x16 image to use.
	 * @type void
	 */
	this.setImage = function(src) {
		m_image = (typeof src=='string' && src.indexOf('.')!==-1)?src:null;
		set('image');
	};

	/**
	 * Gets the main text displayed on the menu item.
	 * @type string
	 * @returns The main text displayed on the menu item.
	 */
	this.getText = function() {
		return m_text;
	};

	/**
	 * Sets the main text displayed on the menu item.
 	 * @param {string} text The main text to display on the menu item.
	 * @type void
	 */
	this.setText = function(text) {
		m_text = (typeof text=='string')?text:'Item ' + m_id;
		set('text');
	};

	/**
	 * Gets the hotkey text displayed on the menu item.
	 * @type string
	 * @returns The hotkey text displayed on the menu item (ie: Ctrl+X).
	 */
	this.getHotkey = function() {
		return m_hotkey;
	};

	/**
	 * Sets the hotkey text displayed on the menu item.
 	 * @param {string} text The hotkey text to display on the menu item (ie: Ctrl+X).
	 * @type void
	 */
	this.setHotkey = function(text) {
		m_hotkey = (typeof text=='string')?text:'';
		set('hotkey');
	};

	/**
	 * Gets the visible state of the menu Item.
	 * @type boolean
	 * @returns The visible state of the menu Item.
	 */
	this.getVisible = function() {
		return m_visible;
	};

	/**
	 * Sets the visible state of the menu Item.
 	 * @param {boolean} visible The visible state of the menu Item. (true=visible, false=hidden)
	 * @type void
	 */
	this.setVisible = function(visible) {
		m_visible = !!visible;
		set('visible');
	};

	/**
	 * Gets the enabled state of the menu Item.
	 * @type boolean
	 * @returns The enabled state of the menu Item.
	 */
	this.getEnabled = function() {
		return m_enabled;
	};

	/**
	 * Sets the enabled state of the menu Item.
 	 * @param {boolean} enabled The enabled state of the menu Item. (true=enabled, false=disabled)
	 * @type void
	 */
	this.setEnabled = function(enabled) {
		m_enabled = !!enabled;
		set('enabled');
	};

	/**
	 * Gets the checked state of the menu Item.
	 * @type boolean
	 * @returns The checked state of the menu Item.
	 */
	this.getChecked = function() {
		return m_checked;
	};

	/**
	 * Sets the checked state of the menu Item.
 	 * @param {boolean} checked The checked state of the menu Item. (true=checked, false=unchecked)
	 * @type void
	 */
	this.setChecked = function(checked) {
		m_checked = !!checked;
		set('checked');
	};

	/**
	 * Checks if the menu item is a seperator.
	 * @type boolean
	 * @returns A boolean indicating if the Item is a seperator
	 */
	this.isSeperator = function() {
		return m_seperator;
	};

	/**
	 * @private
	 */
	this.create = function(menu, container) {
		m_menu = menu;
		m_container = container;
		var TR = document.createElement('TR');
		var TD1 = document.createElement('TD');

		if (typeof m_text!='string' || m_text=='-') {
			var DIV = document.createElement('DIV');
			DIV.className = 'jpmc_ui_ContextMenuItem_Dash';
			TD1.vAlign = 'top';
			TD1.style.height = '6px';
			TD1.style.padding = '1px 0px';
			TD1.colSpan = 3;
			TD1.appendChild(DIV);
			TR.appendChild(TD1);
			m_seperator = true;
		} else {
			var TD2 = document.createElement('TD');
			var TD3 = document.createElement('TD');

			TR.className = 'jpmc_ui_ContextMenuItem';
			TD1.className = 'jpmc_ui_ContextMenuItem_Img';
			TD2.className = 'jpmc_ui_ContextMenuItem_Text';
			TD3.className = 'jpmc_ui_ContextMenuItem_Sub';

			var sub = jpmc.ui.Util.isIE?'<span style="font-family:webdings;">4</span>':'>';
			var hk = (typeof m_hotkey=='string'?m_hotkey:'');
			m_hotkey = m_stub?sub:hk;

			TR.appendChild(TD1);
			TR.appendChild(TD2);
			TR.appendChild(TD3);
		}

		m_container.getElementsByTagName('TBODY')[0].appendChild(TR);


		jpmc.ui.Util.attachEvent(TR, 'onmouseover', function(e) {self.highlight(e, true);e.stopPropagation();return false;});
		jpmc.ui.Util.attachEvent(TR, 'onmousedown', function(e) {self.fire();e.stopPropagation();return false;});
		jpmc.ui.Util.attachEvent(TR, 'onmouseup', function(e) {e.stopPropagation();return false;});
		jpmc.ui.Util.attachEvent(TR, 'onclick', function(e) {e.stopPropagation();return false;});
/*
		TR.onmouseover = function(e) {self.highlight(e, true);e.stopPropagation();return true;};
		TR.onmousedown = function(e) {self.fire();e.stopPropagation();return false;};
		TR.onmouseup = function(e) {e.stopPropagation();return false;};
		TR.onclick = function(e) {e.stopPropagation();return false;};
*/
		m_item = TR;

		set('image');
		set('text');
		set('hotkey');
		set('enabled');
		set('checked');
		set('visible');
	};

	/**
	 * @private
	 */
	this.highlight = function(e, hl) {
		if (hl) {
			if (m_seperator) {return;}
			if (!m_menu.setActive(this)) {return;}
		}
		m_item.className = hl?'jpmc_ui_ContextMenuItem_hover':'jpmc_ui_ContextMenuItem';
		if (m_stub) {
			if (hl) {
				var x,y,h,w;
				var src = jpmc.ui.Util.getParent(e.target, 'TR');
				x = jpmc.ui.Util.getOffsetX(src) + 2;
				y = jpmc.ui.Util.getOffsetY(src) + 3;
				w = m_item.offsetWidth + 4;
				h = m_item.offsetHeight;
				m_handler.show(m_menu.getSource(), x, y, w, h);
			} else {
				m_handler.hide();
			}
		}
	};

	/**
	 * @private
	 */
	this.fire = function() {
		if (m_stub) {return false;}
		if (!m_enabled) {return false;}
		m_menu.hide(true);
		m_handler(this);
		return true;
	};

	/**
	 * @private
	 */
	var set = function(option) {
		if (!m_item) {return;}
		switch(option) {
			case 'visible':
				m_item.style.display = m_visible?'':'none';
				break;
			case 'text':
				if (m_seperator) {m_text='-'; break;}
				m_item.childNodes[1].innerHTML = m_text;
				break;
			case 'hotkey':
				if (m_seperator) {break;}
				m_item.childNodes[2].innerHTML = m_hotkey;
				break;
			case 'enabled':
				if (m_seperator) {break;}
				var x;
				var tds = m_item.getElementsByTagName('TD');
				for (x=0; x<tds.length; x++) {
					tds[x].style.color = (m_enabled?'':'graytext');
				}
				var imgs = m_item.getElementsByTagName('IMG');
				for (x=0; x<imgs.length; x++) {
					imgs[x].style.filter = m_enabled?'':'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1 opacity=.5)';
					imgs[x].style.opacity = m_enabled?1:0.5;
				}
				break;
			case 'checked':
				if (m_seperator) {break;}
				var TD = m_item.getElementsByTagName('TD')[0];
				var chk = TD.childNodes[0];
				var img = (chk.tagName == 'IMG');
				TD.style.border =   (img && m_checked)?'1px inset':'';
				TD.style.padding =  (img && m_checked)?'0px 0px':'';
				chk.style.display = (img || m_checked)?'block':'none';
				break;
			case 'image':
				if (m_seperator) {break;}
				var sImg;
				if (typeof m_image == 'string' && m_image !== '') {
					sImg = '<img src="' + m_image + '" border="0" height="16" width="16">';
				} else if (jpmc.ui.Util.isIE) {
					sImg = '<span style="font-family:webdings;">a</span>';
				} else {
					sImg = '<span style="font-weight:bold;display:none;">&#149;</span>';
				}
				m_item.childNodes[0].innerHTML = sImg;
				set('enabled');
				set('checked');
				break;
			default: break;
		}

	};

};

/**
 * @ignore
 */
jpmc.ui.ContextMenuItem.count = 0;


jpmc.ui.Menu = jpmc.ui.Menu || function(){};

/**
 * Deprecated, see {@link jpmc.ui.ContextMenuItem}.
 * @deprecated
 */
jpmc.ui.Menu.Item = jpmc.ui.ContextMenuItem;/**
 * @fileoverview Objects for building Menus
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.ui.ContextMenu class
 * @class A popup menu that can have unlimited items and submenus.<br>
 * @constructor
 * @param {object} element (Optional) An HTML element to attach to.
 */
jpmc.ui.ContextMenu = function(element) {

	var m_container = null;
	var m_active = null;
	var m_shadow = [];
	var m_parent = element;
	var m_items = [];
	var m_target = null;
	var m_visible = false;

	var self = this;

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger Logger} or {@link jpmc.util.logging.Proxy Proxy}
	 * @type object
	 */
	this.logHandler = {log:function(){}};

	/**
	 * Placeholder for the onShow event handler. This function is called when the menu is displayed. If returned true onShow will be canceled.
 	 * @param {jpmc.ui.ContextMenu} menu The {@link jpmc.ui.ContextMenu} menu being shown.
 	 * @param {object} element The HTML element that triggered the show event.
	 * @type function
	 */
	this.onShow = function(menu, element) {};

	/**
	 * Placeholder for the onHide event handler. This function is called when the menu is hidden.
 	 * @param {jpmc.ui.ContextMenu} menu The {@link jpmc.ui.ContextMenu} menu being hidden.
 	 * @param {object} element The HTML element that triggered the show event.
	 * @type function
	 */
	this.onHide = function(menu, element) {};

	/**
	 * Placeholder for the onAdd event handler. This function is called when an {@link jpmc.ui.ContextMenuItem} is added to the menu.
 	 * @param {jpmc.ui.ContextMenu} menu The {@link jpmc.ui.ContextMenu} that had the item added.
 	 * @param {jpmc.ui.ContextMenuItem} item The {@link jpmc.ui.ContextMenuItem} added to the Context menu.
	 * @type function
	 */
	this.onAdd = function(menu, item) {};

	/**
	 * Gets the number of {@link jpmc.ui.ContextMenuItem} objects contained in this Context menu
	 * @type number
	 */
	this.getLength = function() {
		return m_items.length;
	};

	/**
	 * Gets an {@link jpmc.ui.ContextMenuItem} based on the index
 	 * @param {number} index The index of the {@link jpmc.ui.ContextMenuItem} to be returned.
	 * @type object
	 * @returns The {@link jpmc.ui.ContextMenuItem} object that was requested.
	 */
	this.item = function(index) {
		return m_items[index];
	};

	/**
	 * Adds an {@link jpmc.ui.ContextMenuItem} to this menu
 	 * @param {jpmc.ui.ContextMenuItem} item The {@link jpmc.ui.ContextMenuItem} to be added to this menu.
	 * @type object
	 * @returns The {@link jpmc.ui.ContextMenuItem} object that was added.
	 */
	this.add = function(item) {
		m_items[m_items.length] = item;
		item.create(this, m_container);
		this.fireEvent('onAdd',item);
		return item;
	};

	/**
	 * Causes the menu to become visible
 	 * @param {object} src The HTML object that the menu is being displayed for.
 	 * @param {number} x (optional) The initial x coordinate of the menu.
 	 * @param {number} y (optional) The initial y coordinate of the menu.
 	 * @param {number} w (optional) The initial x offset of the menu.
 	 * @param {number} h (optional) The initial y offset of the menu.
	 * @type boolean
	 * @returns A boolean indicating if the menu was displayed.
	 */
	this.show = function(src, x, y, w, h) {

		if (!src) {return false;}
		if (this.fireEvent('onShow',src)) {return false;}
		if (!fixSeperators()) {return false;}

		m_target = src;

		if (typeof x!='number') {x = jpmc.ui.Util.getOffsetX(src);}
		if (typeof y!='number') {y = jpmc.ui.Util.getOffsetY(src) + 4;}
		if (typeof w!='number') {w = src.offsetWidth+4;}
		if (typeof h!='number') {h = src.offsetHeight;}

		//position menu
		var offsetShadow = 4;
		var offsetX = 4;
		var offsetY = 4;
		var left = 0;
		var top = 0;

		//Find out how close the origin's position is to the corner of the window
		var rightedge =  document.body.clientWidth  - x - w + offsetX;
		var bottomedge = document.body.clientHeight - y - h + offsetY;

		//Does menu fit to the right of the origin location?
		if (rightedge<m_container.offsetWidth+offsetShadow) {
			//Place right edge at origin's horizontal position
			left = document.body.scrollLeft + x - m_container.offsetWidth;
			if (left < 0) {left = 0;}
		} else {
			//Place left edge at the origin's horizontal position
			left = document.body.scrollLeft + x + w - offsetX;
		}
		//Same concept with the vertical position
		if (bottomedge<m_container.offsetHeight+offsetShadow) {
			top = document.body.scrollTop + y + h - m_container.offsetHeight;
			if (top < 0) {top = 0;}
		} else {
			top = document.body.scrollTop + y - offsetY;
		}

		m_container.style.left       = left + 'px';
		m_container.style.top        = top  + 'px';
		m_container.style.visibility = 'visible';
		m_container.focus();

		for (var i=0; i<m_shadow.length; i++) {
			m_shadow[i].style.left    = (left+offsetShadow+i)+ 'px';
			m_shadow[i].style.top     = (top+offsetShadow+i)+ 'px';
			m_shadow[i].style.width   = m_container.offsetWidth - (i*2);
			m_shadow[i].style.height  = m_container.offsetHeight - (i*2);
			m_shadow[i].style.visibility = 'visible';
			jpmc.ui.Util.setTopmost(m_shadow[i]);
		}
		jpmc.ui.Util.setTopmost(m_container);

		m_visible = true;
		return true;
	};

	/**
	 * Causes the menu to become hidden
 	 * @param {boolean} hideAll Boolean indicating if all parent menus should be hidden also.
	 * @type void
	 */
	this.hide = function(hideAll) {

		if (!m_visible) {return;}

		this.fireEvent('onHide',m_target);

		m_container.style.visibility = 'hidden';
		m_container.style.top = -m_container.offsetHeight;
		m_container.style.left = -m_container.offsetWidth;

		for (var x=0; x<m_shadow.length; x++) {
			m_shadow[x].style.visibility = 'hidden';
			m_shadow[x].style.top = -m_shadow[x].offsetHeight;
			m_shadow[x].style.left = -m_shadow[x].offsetWidth;
		}

		if (hideAll && m_parent && m_parent.constructor == jpmc.ui.ContextMenuItem) {
			m_parent.getMenu().hide();
		}
		setTimeout(function() {self.setActive(null);}, 10);
		m_target = null;
		m_visible = false;
	};

	/**
	 * @private
	 */
	this.setParent = function(item) {
		m_parent = item;
	};

	/**
	 * @private
	 */
	this.getSource = function() {
		return m_target;
	};

	/**
	 * @private
	 */
	this.setActive = function(item) {
		if (m_active) {
			if (m_active!=item) {
				m_active.highlight(null,false);
			} else {
				return false;
			}
		}
		m_active = item;
		return true;
	};

	/**
	 * Calls the appropriate event handler based on the event
	 * @private
	 */
	this.fireEvent = function(eventName, param) {
		if (this.logHandler.enabled) {
			var str;
			if (!param) {
				str = '';
			} else if (param.tagName) {
				str = 'tagName(' + param.tagName + ')';
			} else if (param.constructor == jpmc.ui.ContextMenuItem) {
				str = 'Item(' + param.getText() + ')';
			}
			this.logHandler.log(null, eventName + ' ' + str, this);
		}
		switch(eventName) {
			case 'onAdd': return this.onAdd(this, param);
			case 'onShow': return this.onShow(this, param);
			case 'onHide': return this.onHide(this, param);
			default: return null;
		}
	};

	var fixSeperators = function() {
		var bItem = false;
		var bOK = false;
		for (var x=0; x < m_items.length; x++) {
			if (m_items[x].isSeperator()) {
				m_items[x].setVisible(bItem);
				bItem = false;
			} else if (m_items[x].getVisible()) {
				bItem = true;
				bOK = true;
			}
		}
		return bOK;
	};

	/**
	 * Cleanup DOM References
	 * @private
	 */
	this.cleanup = function() {
		m_container = null;
	};

	/**
	 * @private
	 */
	var init = function() {
		if (typeof element == 'object') {
			if (jpmc.ui.Util.isOpera) {
				jpmc.ui.Util.attachEvent(element, 'onclick', function(e) {
						if (!e.ctrlKey) {return;}
						var ret = self.show(e.target, e.clientX, e.clientY, 5, 1);
						if (ret) {e.stopEvent();}
					}
				);
			} else {
				jpmc.ui.Util.attachEvent(element, 'oncontextmenu', function(e) {
						var ret = self.show(e.target, e.clientX, e.clientY, 5, 1);
						if (ret) {e.stopEvent();}
					}
				);
			}
		}
		//Add menu container
		m_container = document.createElement('DIV');
		m_container.className = 'jpmc_ui_ContextMenu';
		document.body.appendChild(m_container);

		//Add menu table
		var tbl = document.createElement('TABLE');
		var tb = document.createElement('TBODY');
		tbl.setAttribute('border',0);
		tbl.setAttribute('cellPadding',0);
		tbl.setAttribute('cellSpacing',0);
		m_container.appendChild(tbl);
		tbl.appendChild(tb);

		//Add shadow objects
		for (var x=0; x<4; x++) {
			m_shadow[x] = document.createElement('DIV');
			document.body.appendChild(m_shadow[x]);
			m_shadow[x].className = 'jpmc_ui_ContextMenu_Shadow';
		}

		if (jpmc.ui.Util.isIE) {
			//tbl.onmousedown = function(e) {return false;};
			jpmc.ui.Util.attachEvent(tbl, 'onmousedown', function(e) {return false;});
		}
		//tbl.onselectstart = function(e) {return false;};
		jpmc.ui.Util.attachEvent(tbl, 'onselectstart', function(e) {return false;});

		//hide when mousedown
		jpmc.ui.Util.attachEvent(document, 'onmousedown', function() {self.hide();});

		//prevent memory leaks
		jpmc.ui.Util.attachEvent(window, 'onunload', self.cleanup);
	};

	init.call(self);

};

/**
 * Deprecated, see {@link jpmc.ui.ContextMenu}.
 * @deprecated
 */
jpmc.ui.Menu = jpmc.ui.Menu || function(){};

/**
 * Deprecated, see {@link jpmc.ui.ContextMenu}.
 * @deprecated
 */
jpmc.ui.Menu.Context = jpmc.ui.ContextMenu;

/**
 * Creates an instance of the jpmc.ui.EffectConfig class.
 * @class An object that contains effect information to be applied to an object.<br>
 * @constructor
 * @extends jpmc.lang.Serializable
 */
jpmc.ui.EffectConfig = function() {

	//Extend the jpmc.lang.Serializable class
	jpmc.lang.Serializable.apply(this, arguments);

	/**
	 * Gets/Sets the X anchor to use for the element (0=left, 100=right, 50=middle, not limited to 0->100)
	 * @type string
	 */
	this.anchorX = null;

	/**
	 * Gets/Sets the Y anchor to use for the element (0=top, 100=bottom, 50=middle, not limited to 0->100)
	 * @type string
	 */
	this.anchorY = null;

	/**
	 * Gets/Sets the new backgroundColor of the element
	 * @type string
	 */
	this.backgroundColor = null;

	/**
	 * Gets/Sets the new text color of the element
	 * @type string
	 */
	this.color = null;

	/**
	 * Gets/Sets the max frames per second (fps) for the morph (default: 50, cannot exceed 100)
	 * @type number
	 */
	this.fps = 50;

	/**
	 * Gets/Sets the new height of the element
	 * @type number
	 */
	this.height = null;

	/**
	 * Gets/Sets the new left position of the element
	 * @type number
	 */
	this.left = null;

	/**
	 * Gets/Sets the new opacity of the element (0-100)
	 * @type number
	 */
	this.opacity = null;

	/**
	 * Gets/Sets if the element will be scrolled into view
	 * @type boolean
	 */
	this.scrollIntoView = null;

	/**
	 * Gets/Sets the new scrollLeft of the element
	 * @type number
	 */
	this.scrollLeft = null;

	/**
	 * Gets/Sets the &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to apply the scrollIntoView on
	 * @type mixed
	 */
	this.scrollObject = null;

	/**
	 * Gets/Sets the padding to use for the scrollIntoView
	 * @type number
	 */
	this.scrollPadding = null;

	/**
	 * Gets/Sets the new scrollTop of the element
	 * @type number
	 */
	this.scrollTop = null;

	/**
	 * Gets/Sets the new top position of the element
	 * @type number
	 */
	this.top = null;

	/**
	 * Gets/Sets the new width of the element
	 * @type number
	 */
	this.width = null;

	/**
	 * Gets/Sets the new zoom percent of the element (1-n)
	 * @type number
	 */
	this.zoom = null;

	/**
	 * Gets/Sets the time in ms the morph should take from start to finish (default: instantaneous)
	 * @type function
	 */
	this.duration = null;

	/**
	 * Gets/Sets the method used to transform the element from start to finish
	 * @type function
	 */
	this.transform = null;

	/**
	 * Gets/Sets the function to execute before the morph begins
	 * @type function
	 */
	this.onStart = null;

	/**
	 * Gets/Sets the function to execute before each time the element is updated
	 * @type function
	 */
	this.onBeforeUpdate = null;

	/**
	 * Gets/Sets the function to execute after each time the element is updated
	 * @type function
	 */
	this.onAfterUpdate = null;

	/**
	 * Gets/Sets the function to execute when the morph completes
	 * @type function
	 */
	this.onComplete = null;

};
/**
 * @fileoverview Objects for building Tabstrips
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the jpmc.ui.TabstripTab class
 * @class A Tab object that is used in conjuction with the {@link jpmc.ui.Tabstrip} object.<br>
 * @constructor
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element to be associated with the Tab.
 * @param {object} text The text to appear on the tab.
 * @type void
 */
jpmc.ui.TabstripTab = function(element, text) {

	var m_tabstrip, m_tab, m_holder;
	var m_id = -1;
	var m_element = jpmc.ui.Util.getObject(element,null);
	var m_text = text;
	var m_pointer = jpmc.ui.Util.getAttribute(m_element, 'id', '');

	var m_namespace = '';

	m_element.style.display = 'none';

	/**
	 * @private
	 */
	this.create = function(tabstrip, container, id, namespace) {
		m_tabstrip = tabstrip;
		m_id = id;
		m_namespace = namespace;

		if (typeof m_text != 'string') {
			text = jpmc.ui.Util.getAttribute(m_element, 'tabName', 'Tab '+id);
		}

		var tab = document.createElement('TD');
		container.appendChild(tab);
		tab.innerHTML = text;
		tab.className = m_namespace + '_Tab_Off';
		tab.noWrap = true;
		tab.setAttribute('tabID',id);

		jpmc.ui.Util.attachEvent(tab, 'onclick', function(e) {tabstrip.select(m_id);return true;});
		jpmc.ui.Util.attachEvent(tab, 'onmousedown', function(e) {if (e.ctrlKey && jpmc.ui.Util.isOpera) {return tabstrip.contextMenu.call(this,e);} else {return tabstrip.trackMouse(e);}});
		jpmc.ui.Util.attachEvent(tab, 'onmousemove', function(e) {return tabstrip.trackMouse(e);});
		jpmc.ui.Util.attachEvent(tab, 'onmouseup', function(e) {return tabstrip.trackMouse(e);});
		jpmc.ui.Util.attachEvent(tab, 'onselectstart', function(e) {e.stopEvent();});
		jpmc.ui.Util.attachEvent(tab, 'oncontextmenu', tabstrip.contextMenu);

		//tab.onclick       = function(e) {tabstrip.select(jpmc.ui.Util.getAttribute(this, 'tabID', -1));return true;};
		//tab.onmousedown   = function(e) {if (e && e.ctrlKey && jpmc.ui.Util.isOpera) {return tabstrip.contextMenu.call(this,e);} else {return tabstrip.trackMouse(e);}};
		//tab.onmousemove   = function(e) {return tabstrip.trackMouse(e);};
		//tab.onmouseup     = function(e) {return tabstrip.trackMouse(e);};
		//tab.onselectstart = function(e) {return false;};
		//tab.oncontextmenu = tabstrip.contextMenu;

		m_tab = tab;
		m_holder = m_tab;
		while(m_holder.parentNode && m_holder.tagName != 'DIV') {m_holder = m_holder.parentNode;}

	};

	/**
	 * Gets the Tab ID
	 * @type number
	 * @returns The Tab ID
	 */
	this.getID = function() {
		return m_id;
	};

	/**
	 * Gets the Tab element ID
	 * @type string
	 * @returns The ID of the element associated with this Tab object
	 */
	this.getPointer = function() {
		return m_pointer;
	};

	/**
	 * Gets the Tab element
	 * @type object
	 * @returns The element associated with this Tab object
	 */
	this.getPanel = function() {
		return m_element;
	};

	/**
	 * Gets the {@link jpmc.ui.Tabstrip} that contains this Tab
	 * @type object
	 * @returns The {@link jpmc.ui.Tabstrip} that contains this Tab
	 */
	this.getTabstrip = function() {
		return m_tabstrip;
	};

	/**
	 * Gets the next Tab on the {@link jpmc.ui.Tabstrip}
	 * @type object
	 * @returns The Tab that is positioned imidiatly after this Tab on the {@link jpmc.ui.Tabstrip Tabstrip}
	 */
	this.getNext = function() {
		var nxt = m_tab.nextSibling;
		var tabID = jpmc.ui.Util.getAttribute(nxt, 'tabID', -1);
		return m_tabstrip.getTab(tabID);
	};

	/**
	 * Gets the previous Tab on the {@link jpmc.ui.Tabstrip}
	 * @type object
	 * @returns The Tab that is positioned imidiatly before this Tab on the {@link jpmc.ui.Tabstrip}
	 */
	this.getPrevious = function() {
		var prev = m_tab.previousSibling;
		var tabID = jpmc.ui.Util.getAttribute(prev, 'tabID', -1);
		return m_tabstrip.getTab(tabID);
	};

	/**
	 * Gets the Tab text
	 * @type string
	 * @returns The text displayed on the Tab
	 */
	this.getText = function() {
		return m_text;
	};

	/**
	 * Gets the object that visually represents the Tab object
	 * @type object
	 * @returns The HTML object that visually represents the Tab object
	 */
	this.getTab = function() {
		return m_tab;
	};

	/**
	 * Sets the Tab text
	 * @param {string} text The text or HTML to be displayed on the Tab.
	 * @type void
	 */
	this.setText = function(text) {
		var prev = this.getText();
		m_tab.innerHTML = text;
		m_tabstrip.resize(true);
		m_tabstrip.fireEvent('onTextChange', this, prev);
	};

	/**
	 * Determines if the Tab is currently selected
	 * @type boolean
	 * @returns The current selection status of the Tab
	 */
	this.selected = function() {
		return (m_id == m_tabstrip.getTabId());
	};

	/**
	 * Removes this Tab from the {@link jpmc.ui.Tabstrip}
	 * @type boolean
	 * @returns Boolean indicated if the Tab was removed
	 */
	this.remove = function() {
		return m_tabstrip.remove(m_id);
	};

	/**
	 * Causes the Tab to be selected
	 * @type void
	 */
	this.select = function() {
		m_tabstrip.select(m_id);
	};

	/**
	 * @private
	 */
	this.cleanup = function() {
		m_element.parentNode.removeChild(m_element);
		m_tab.parentNode.removeChild(m_tab);
		m_tab = null;
		m_element = null;
		m_tabstrip = null;
	};

	/**
	 * @private
	 */
	this.setState = function(state) {
		if(state) {
			m_tab.className = m_namespace + '_Tab_On';
			m_element.style.display = 'block';
		} else {
			m_tab.className = m_namespace + '_Tab_Off';
			m_element.style.display = 'none';
		}
	};

	/**
	 * @private
	 */
	this.scrollIntoView = function() {
		var tbl = m_holder.childNodes[0];
		var hWidth = m_holder.offsetWidth;
		var cWidth = tbl.offsetWidth;
		var tLeft = m_tab.offsetLeft;
		var tWidth = m_tab.offsetWidth;
		if (hWidth >= cWidth) {
			tbl.style.left = '0px';
		} else {
			if (tLeft + tWidth > hWidth) {
				tbl.style.left = (hWidth-(tLeft+tWidth)) + 'px';
			}
			if (tLeft + tbl.offsetLeft < 0) {
				tbl.style.left = (-tLeft) + 'px';
			}
		}
		m_holder.style.borderLeft = (tbl.offsetLeft<0)?'1px solid buttonshadow':'';

	};

	/**
	 * String representation of the Tab object
	 * @type string
	 * @returns Single line of text describing this Tab object
	 */
	this.toString = function() {
		return 'Tab(id:'+m_id+', element:'+m_pointer+', text:'+this.getText()+')';
	};

};

/**
 * @ignore
 */
jpmc.ui.Tabstrip = jpmc.ui.Tabstrip || function(){};

/**
 * @ignore
 */
jpmc.ui.Tabstrip.Tab = jpmc.ui.TabstripTab;
/**
 * @fileoverview Objects for building Tabstrips
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/*
Name: jpmc.ui.Tabstrip v1.0
Date: Aug 28, 2006

Tested OK:
	IE6, FireFox v1.5, Opera 9.0

Tested Fail:

Limitations:
	 FireFox v1.5:
		Drag operations not 100% due to poor mousemove event data
	Opera 9.0:
		Drag operations not 100% due to poor mousemove event data
		Cursor does not display properly during drag operations
		Context Menu required CTRL + Left Mouse Click
*/

/**
 * Creates an instance of the jpmc.ui.Tabstrip class
 * @class Converts an HTML element and it's children into a fully functioning Tabstrip object.<br>
 * @constructor
 * @param {mixed} element &lt;string&gt; ID or an &lt;object&gt; reference of the HTML element that contains the panels for the Tabstrip.
 * @param {string} nameSpace (optional) The namespace for this tabstrip style classnames. (default: jpmc_ui_Tabstrip)
 */
jpmc.ui.Tabstrip = function(element, namespace) {

	var self = this;
	var container = jpmc.ui.Util.getObject(element,null);
	var strip = null;
	var tabStripContainer = null;
	var tabStrip = null;
	var tabButtonsContainer = null;
	var tabButtons = [];
	var tabButtonsWidth = 0;
	var tabButtonsWidth2 = 0;
	var tabHistory = [-1];
	var tabs = [];
	var pointer = {};
	var cnt = 0;
	var dragState = false;
	var dragFrom = -1;
	var m_count = 0;

	if (typeof namespace != 'string') {namespace = 'jpmc_ui_Tabstrip';}

	/**
	 * Gets/Sets the text used for the previous/next/close buttons. HTML code may be used.
	 * @type string[]
	 */
	this.buttonText = jpmc.ui.Util.isIE?['3','4','r']:['< ',' >','X'];

	/**
	 * Gets/Sets the minimum width of the tabstrip in pixels. (default 100)
	 * @type number
	 */
	this.minWidth = 100;

	/**
	 * Gets the object that contains all the tab panels
	 * @type object
	 */
	this.getContainer = function() {
		return container;
	};

	/**
	 * Gets the number of tabs contained in the Tabstrip
	 * @type number
	 */
	this.getLength = function() {
		return m_count;
	};

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger Logger} or {@link jpmc.util.logging.Proxy Proxy}
	 * @type object
	 */
	this.logHandler = {};

	/**
	 * Placeholder for the onAdd event handler. This function is called after a {@link jpmc.ui.TabstripTab} is added to the Tabstrip.
 	 * @param {jpmc.ui.TabstripTab} tab The {@link jpmc.ui.TabstripTab} that was added to the Tabstrip.
	 * @type function
	 */
	this.onAdd = function(tab){};
	/**
	 * Placeholder for the onBeforeRemove event handler. This function is called just before a {@link jpmc.ui.TabstripTab} is removed from the Tabstrip. If the function returns true, the remove event will be canceled.
 	 * @param {jpmc.ui.TabstripTab} tab The {@link jpmc.ui.TabstripTab} that will be removed from the Tabstrip.
	 * @type function
	 */
	this.onBeforeRemove = function(tab){};
	/**
	 * Placeholder for the onRemove event handler. This function is called when a tab is removed.
 	 * @param {jpmc.ui.TabstripTab} tab The {@link jpmc.ui.TabstripTab} that was removed from the Tabstrip.
	 * @type function
	 */
	this.onRemove = function(tab){};
	/**
	 * Placeholder for the onContextMenu event handler. This function is called when a tab's context menu is requested.
 	 * @param {jpmc.ui.TabstripTab} tab The {@link jpmc.ui.TabstripTab} that requested the context menu.
	 * @type function
	 */
	this.onContextMenu = function(tab){return true;};
	/**
	 * Placeholder for the onMove event handler. This function is called when a {@link jpmc.ui.TabstripTab} is moved to a new location on the Tabstrip.
 	 * @param {jpmc.ui.TabstripTab} tab The {@link jpmc.ui.TabstripTab} that was moved.
 	 * @param {jpmc.ui.TabstripTab} tabPrev The {@link jpmc.ui.TabstripTab} that was previously located at this location.
	 * @type function
	 */
	this.onMove = function(tab, tabPrev){};
	/**
	 * Placeholder for the onSelect event handler. This function is called when a {@link jpmc.ui.TabstripTab} is selected.
 	 * @param {jpmc.ui.TabstripTab} tab The {@link jpmc.ui.TabstripTab} that was selected.
 	 * @param {jpmc.ui.TabstripTab} tabPrev The {@link jpmc.ui.TabstripTab} that was previously selected.
	 * @type function
	 */
	this.onSelect = function(tab, tabPrev){};
	/**
	 * Placeholder for the onTextChange event handler. This function is called when a tab's text is changed.
 	 * @param {jpmc.ui.TabstripTab} tab The {@link jpmc.ui.TabstripTab} who's text was changed.
 	 * @param {string} text The previous {@link jpmc.ui.TabstripTab} text.
	 * @type function
	 */
	this.onTextChange = function(tab, text){};


	/**
	 * Gets/Sets the option to allow moving tabs around
	 * @type boolean
	 */
	this.allowMove = jpmc.ui.Util.getAttribute(container, 'tsAllowMove', false);
	/**
	 * Gets/Sets the option to allow closing/removing tabs
	 * @type boolean
	 */
	this.allowClose = jpmc.ui.Util.getAttribute(container, 'tsAllowClose', false);
	/**
	 * Gets/Sets the option to identify the default selected tab. May be the <number> id of the {@link jpmc.ui.TabstripTab} or the <string> id of the panel
	 * @type mixed
	 */
	this.defaultTab = jpmc.ui.Util.getAttribute(container, 'tsDefaultTab', 0);

	/**
	 * Initializes the Tabstrip with options
	 * @type object
	 * @returns The {@link jpmc.ui.Tabstrip} object just initialized
	 */
	this.init = function() {

		var x;

		//insert Tabstrip placeholder
		strip = document.createElement('DIV');
		strip.style.width = this.minWidth+'px';
		container.parentNode.insertBefore(strip, container);
		container.className = namespace + '_Panel';

		var it = [];
		it[it.length] = '<table class="' + namespace + '_Container" border=0 cellpadding=0 cellspacing=0>';
		it[it.length] = '<tr>';
		it[it.length] = '<td class="' + namespace + '_Back ' + namespace + '_Lead">';
		it[it.length] = '&nbsp;';
		it[it.length] = '</td>';
		it[it.length] = '<td>';
		it[it.length] = '<div style="padding:0px 0px;display:block;overflow:hidden">';
		it[it.length] = '<table border=0 cellpadding=0 cellspacing=0 style="padding:0px 0px;position:relative;">';
		it[it.length] = '<tr class="'+ namespace + '" align=middle></tr>';
		it[it.length] = '</table>';
		it[it.length] = '</div>';
		it[it.length] = '</td>';
		it[it.length] = '<td class="' + namespace + '_Back" nowrap style="width:100%;padding-right:2px" align="right">';
		it[it.length] = '<span style="position:relative">&nbsp;</span>';
		it[it.length] = '</td>';
		it[it.length] = '</tr>';
		it[it.length] = '</table>';

		strip.innerHTML = it.join('');

		tabStrip = strip.getElementsByTagName('TR')[1];
		tabStripContainer = strip.getElementsByTagName('DIV')[0];
		tabButtonsContainer = strip.getElementsByTagName('SPAN')[0];

		//create button objects
		var aTitle = ['Previous','Next','Close'];
		for (x=0; x<(this.allowClose?3:2); x++) {
			tabButtons[x] = document.createElement(jpmc.ui.Util.isIE?'A':'BUTTON');
			tabButtonsContainer.appendChild(tabButtons[x]);
			tabButtons[x].className = namespace + '_Button';
			tabButtons[x].innerHTML = this.buttonText[x];
			tabButtons[x].title = aTitle[x];
			tabButtons[x].href = 'javascript:function(){return void();}';
			if (x===0) {
				jpmc.ui.Util.attachEvent(tabButtons[x], 'onclick', function() {this.blur();self.selectPrevious();return false;});
			} else if (x===1) {
				jpmc.ui.Util.attachEvent(tabButtons[x], 'onclick', function() {this.blur();self.selectNext();return false;});
				tabButtonsWidth = tabButtonsContainer.offsetWidth;
				tabButtonsWidth2 = tabStripContainer.parentNode.offsetLeft + 4;
			} else {
				jpmc.ui.Util.attachEvent(tabButtons[x], 'onclick', function() {this.blur();self.remove();return false;});
				tabButtonsWidth2 += tabButtonsContainer.offsetWidth - tabButtonsWidth;
			}
		}
		tabButtonsWidth += tabButtonsWidth2;

		if (container.hasChildNodes) {
			for (x=0; x<container.childNodes.length; x++) {
				if (container.childNodes[x].tagName===undefined) {continue;}

				var tab = this.add(new jpmc.ui.TabstripTab(container.childNodes[x]));

				if (tab.getID() == this.defaultTab || tab.getPointer() == this.defaultTab.toString()) {
					tab.select();
				}
			}
			if (this.getTabId()==-1) {this.select(0);}
		}

		container.style.display = 'block';

		if (jpmc.ui.Util.isIE && container.style.width) {
			jpmc.ui.Util.attachEvent(container, 'onresize', self.resize);
		} else {
			jpmc.ui.Util.attachEvent(window, 'onresize', self.resize);
			setInterval(function() {self.resize();},100);
		}
		//prevent memory leaks
		jpmc.ui.Util.attachEvent(window, 'onunload', self.cleanup);

		return this;
	};

	/**
	 * Adds a new {@link jpmc.ui.TabstripTab} to the Tabstrip
 	 * @param {jpmc.ui.TabstripTab} tab An instance of the {@link jpmc.ui.TabstripTab} class
	 * @type Tab
	 * @returns The {@link jpmc.ui.TabstripTab} object just created
	 */
	this.add = function(tab) {
		var id = cnt;

		tab.create(this, tabStrip, id, namespace);

		tabs[id] = tab;

		var pid = tabs[id].getPointer();
		if (pid!=='') {pointer[pid] = id;}
		m_count++;
		cnt++;
		this.resize(true);

		this.fireEvent('onAdd',tabs[id]);

		return tabs[id];
	};

	/**
	 * Removes a {@link jpmc.ui.TabstripTab} from the Tabstrip
 	 * @param {mixed} identifier (Optional) <number> ID of the {@link jpmc.ui.TabstripTab} or <string> ID of the Panel (Default: Currently selected Tab)
	 * @type boolean
	 * @returns Boolean indicated if the {@link jpmc.ui.TabstripTab} was removed
	 */
	this.remove = function(identifier) {
		identifier = this.getTabId(identifier);
		if (identifier===-1) {return false;}
		if (this.fireEvent('onBeforeRemove',tabs[identifier])) {return false;}
		m_count--;
		this.fireEvent('onRemove',tabs[identifier]);
		tabs[identifier].cleanup();
		var pid = tabs[identifier].getPointer();
		if (pid!=='') {delete pointer[pid];}
		delete tabs[identifier];
		historyRemove(identifier);
		var newID = this.getTabId();
		if (newID!==-1) {
			historyRemove(newID);
		} else {
			newID = jpmc.ui.Util.getAttribute(tabStrip.childNodes[0], 'tabID', -1);
		}
		this.select(newID);
		this.resize(true);
		return true;
	};

	/**
	 * Selects a {@link jpmc.ui.TabstripTab} on the Tabstrip
 	 * @param {mixed} identifier (Optional) <number> ID of the {@link jpmc.ui.TabstripTab} or <string> ID of the Panel (Default: Currently selected Tab)
	 * @type object
	 * @returns The {@link jpmc.ui.TabstripTab} object just selected
	 */
	this.select = function(identifier) {
		identifier = this.getTabId(identifier);
		if (identifier===-1) {return undefined;}
		var last = tabHistory[0];
		var tab = tabs[last];
		if (last!=identifier) {
			if (tab!==undefined) {tab.setState(false);}
			historyAdd(identifier);
			tab = tabs[identifier];
			tab.setState(true);
			tab.scrollIntoView();
			this.fireEvent('onSelect', tab, tabs[last]);
		}
		return tab;
	};

	/**
	 * Selects the previous {@link jpmc.ui.TabstripTab} on the Tabstrip
 	 * @param {mixed} identifier (Optional) <number> ID of the {@link jpmc.ui.TabstripTab} or <string> ID of the Panel (Default: Currently selected Tab)
	 * @type object
	 * @returns The {@link jpmc.ui.TabstripTab} object just selected
	 */
	this.selectPrevious = function(identifier) {
		var tab = this.getTab(identifier);
		if (tab===undefined) {return undefined;}
		var pre = tab.getPrevious();
		if (pre!==undefined) {pre.select();}
		return this.getTab();
	};

	/**
	 * Selects the next {@link jpmc.ui.TabstripTab} on the Tabstrip
 	 * @param {mixed} identifier (Optional) <number> ID of the {@link jpmc.ui.TabstripTab} or <string> ID of the Panel (Default: Currently selected Tab)
	 * @type object
	 * @returns The {@link jpmc.ui.TabstripTab} object just selected
	 */
	this.selectNext = function(identifier) {
		var tab = this.getTab(identifier);
		if (tab===undefined) {return undefined;}
		var next = tab.getNext();
		if (next!==undefined) {next.select();}
		return this.getTab();
	};

	/**
	 * Gets a {@link jpmc.ui.TabstripTab} object on the Tabstrip
 	 * @param {mixed} identifier (Optional) <number> ID of the {@link jpmc.ui.TabstripTab} or <string> ID of the Panel (Default: Currently selected Tab)
	 * @type object
	 * @returns The {@link jpmc.ui.TabstripTab} object requested
	 */
	this.getTab = function(identifier) {
		return tabs[this.getTabId(identifier)];
	};

	/**
	 * Gets the panel associated with a {@link jpmc.ui.TabstripTab} object on the Tabstrip
 	 * @param {mixed} identifier (Optional) <number> ID of the {@link jpmc.ui.TabstripTab} or <string> ID of the Panel (Default: Currently selected Tab)
	 * @type object
	 * @returns The panel associated with a {@link jpmc.ui.TabstripTab} object requested
	 */
	this.getPanel = function(identifier) {
		var tab = this.getTab(identifier);
		if (tab===undefined) {return undefined;}
		return tab.getPanel();
	};

	/**
	 * Gets an ID of a {@link jpmc.ui.TabstripTab} on the Tabstrip
 	 * @param {mixed} identifier (Optional) <number> ID of the {@link jpmc.ui.TabstripTab} or <string> ID of the Panel (Default: Currently selected Tab)
	 * @type number
	 * @returns The ID of the {@link jpmc.ui.TabstripTab} requested
	 */
	this.getTabId = function(identifier) {
		if (identifier === undefined) {return tabHistory[0];}
		if (identifier === -1) {return identifier;}
		switch(typeof identifier) {
			case 'string': identifier = (typeof pointer[identifier] == 'number')?pointer[identifier]:-1; break;
			case 'number': break;
			default:
				identifier = -1;
				break;
		}
		if (typeof tabs[identifier] != 'object' || tabs[identifier].constructor != jpmc.ui.TabstripTab) {
			identifier = -1;
		}
		return identifier;
	};

	/**
	 * Cleanup DOM References
	 * @private
	 */
	this.cleanup = function() {
		tabStripContainer = null;
		tabStrip = null;
		tabButtonsContainer = null;
		container = null;
		tabButtons[0] = null;
		tabButtons[1] = null;
		tabButtons[2] = null;
	};

	/**
	 * Adds ID to the history array
	 * @private
	 */
	var historyAdd = function(identifier) {
		historyRemove(identifier);
		tabHistory = [identifier].concat(tabHistory);
	};

	/**
	 * Removes ID from the history array
	 * @private
	 */
	var historyRemove = function(identifier) {
		for (var x=0; x<tabHistory.length; x++) {
			if (tabHistory[x] == identifier) {
				tabHistory.splice(x,1);
			}
		}
	};

	/**
	 * @private
	 */
	var move = function(id1, id2) {
		var t1 = self.getTab(id1);
		var t2 = self.getTab(id2);
		if (t1===undefined) {return;}
		if (t2===undefined) {return;}
		var ta = t1.getTab();
		var tb = t2.getTab();
		if (ta.offsetLeft < tb.offsetLeft) {
			tb = tb.nextSibling;
		}
		ta.parentNode.insertBefore(ta, tb);
		self.fireEvent('onMove', t1, t2);
	};

	/**
	 * @private
	 */
	this.trackMouse = function(e) {
		if (!self.allowMove) {return jpmc.ui.Util.isIE;}
		var dragTo = -1;
		switch(e.type) {
			case 'mousedown':
				if (!dragState && e.button==1) {
					dragFrom = jpmc.ui.Util.getAttribute(e.target, 'tabID', -1);
					dragTo = dragFrom;
					dragState = true;
				}
				break;
			case 'mousemove':
				dragState = dragState && (e.button==1);
				if (dragState) {
					dragTo = jpmc.ui.Util.getAttribute(e.target, 'tabID', -1);
				}
				break;
			case 'mouseup':
				if (dragState && e.button==1) {
					dragTo = jpmc.ui.Util.getAttribute(e.target, 'tabID', -1);
					if (dragTo != dragFrom) {
						move(dragFrom,dragTo);
					}
					dragState = false;
				}
				break;
			default:break;
		}
		if (!jpmc.ui.Util.isOpera) {
			e.target.style.cursor = (dragState&&dragTo!=dragFrom)?'move':'default';
		}
/*
		var it = [];
		for (var A in e) {
			var C = A.slice(-1);
			if (C!='Y' && C!='X') {
				it[it.length] = A + ' = ';
				try{it[it.length] = e[A];}catch(ex){}
				it[it.length] = '<br>';
			}
		}

		document.getElementById('poo').innerHTML = dragState + '<br>' + it.join('');
*/
		return jpmc.ui.Util.isIE;
	};

	/**
	 * Causes the Tabstrip to resize to the container constraints
	 * @private
	 */
	this.resize = function(force) {
		var cWidth = container.offsetWidth;
		var sWidth = tabStrip.offsetWidth;
		if (cWidth<this.minWidth) {cWidth = this.minWidth;}
		if (sWidth==cWidth && !force) {return;}
		//adjust size of Tabstrip to match container

		strip.style.height = strip.firstChild.offsetHeight + 'px';
		strip.firstChild.style.width = cWidth + 'px';
		if (m_count > 0) {
			//if there are panels, then adjust the tabs as needed
			tabStripContainer.style.display = 'block';
			var min = 4;
			var bWidth = tabButtonsWidth2;
			var tsWidth = tabStrip.offsetWidth;
			if (tsWidth > (cWidth-bWidth)) {
				tsWidth = (cWidth-tabButtonsWidth);
				tabButtons[0].style.display = 'inline';
				tabButtons[1].style.display = 'inline';
				tabStripContainer.style.borderRight = '1px solid buttonshadow';
			} else {
				tabButtons[0].style.display = 'none';
				tabButtons[1].style.display = 'none';
				tabStripContainer.style.borderRight = '';
			}
			if (tsWidth < min) {tsWidth = min;}
			tabStripContainer.style.width = tsWidth + 'px';
			while (strip.firstChild.offsetWidth > cWidth && tsWidth > min) {
				tabStripContainer.style.width = tsWidth + 'px';
				tsWidth-=1;
			}
			var tabID = this.getTabId();
			if (tabID!=-1) {
				tabs[tabID].scrollIntoView();
			}
		} else {
			//no panels, hide tabs strip
			tabStripContainer.style.display='none';
		}
	};

	/**
	 * @private
	 */
	this.contextMenu = function(e) {
		var tab = self.getTab(jpmc.ui.Util.getAttribute(this, 'tabID', -1));
		tab.select();
		var bHide = !self.fireEvent('onContextMenu', tab);
		if (bHide) {e.stopPropagation();}
		return !bHide;
	};

	/**
	 * Calls the appropriate event handler based on the event
	 * @private
	 */
	this.fireEvent = function(eventName, tab) {
		if (this.logHandler.enabled) {
			this.logHandler.log(null, eventName + ' '+tab.toString() + (arguments[2]?' <- '+arguments[2].toString():''), this);
		}
		switch(eventName) {
			case 'onAdd': return this.onAdd(tab);
			case 'onBeforeRemove': return this.onBeforeRemove(tab);
			case 'onRemove': return this.onRemove(tab);
			case 'onContextMenu': return this.onContextMenu(tab);
			case 'onMove': return this.onMove(tab, arguments[2]);
			case 'onSelect': return this.onSelect(tab, arguments[2]);
			case 'onTextChange': return this.onTextChange(tab, arguments[2]);
			default:return undefined;
		}
	};

};

/**
 * Deprecated, see {@link jpmc.ui.Tabstrip}.
 * @deprecated
 */
jpmc.ui.Tabstrip.Container = jpmc.ui.Tabstrip;

/**
 * Deprecated, see {@link jpmc.ui.TabstripTab}.
 * @deprecated
 */
jpmc.ui.Tabstrip.Tab = jpmc.ui.TabstripTab;
/**
 * @fileoverview Object for managing hierarchical data
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Configuration class
 * @class Stores configuration information.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-07-19
 * @extends jpmc.lang.Serializable
 */
jpmc.util.Configuration = function() {

	var self = this;

	jpmc.lang.Serializable.apply(this, arguments);

	var getPath = function(path) {
		return path.replace(/\W+/g,'/').split('/');
	};

	/**
	 * Returns the value from the cooresponding path in the configuration.
	 * @param {string} path Path to the desired configuration setting.
	 * @param {object} defaultValue Default value, if the value has not been set.
	 * @type object
	 * @return Value from the cooresponding path requested. If not set, the default value is set, and returned.
	 */
	this.get = function(path, defaultValue) {
		var p = getPath(path);
		var o = this.getPrivateObject();
		for (var x=0; x<p.length; x++) {
			if (!(p[x] in o)) {
				if (x<p.length-1) {
					o[p[x]] = {'default':null};
				} else {
					o[p[x]] = defaultValue;
				}
			}
			o = o[p[x]];
		}
		return o;
	};

	/**
	 * Sets the value for the cooresponding path in the configuration.
	 * @param {string} path Path to the desired configuration setting.
	 * @param {object} value Value to place in the configuration.
	 * @type void
	 */
	this.put = function(path, value) {
		var p = getPath(path);
		var o = this.getPrivateObject();
		for (var x=0; x<p.length-1; x++) {
			if (!(p[x] in o)) {
				o[p[x]] = {'default':null};
			}
			o = o[p[x]];
		}
		o[p[x]] = value;
	};

	/**
	 * Removes the value for the cooresponding path in the configuration.
	 * @param {string} path Path to the configuration setting to remove.
	 * @type boolean
	 * @return Flag indicating if the method successfuly removed to value.
	 */
	this.remove = function(path) {
		var p = getPath(path);
		var o = this.getPrivateObject();
		for (var x=0; x<p.length-1; x++) {
			if (!(p[x] in o)) {
				return false;
			}
			o = o[p[x]];
		}
		delete o[p[x]];
		return true;
	};

	/**
	 * Deprecated, see get.
	 * @deprecated
	 */
	this.getValue = function(){return self.get.apply(self,arguments);};

	/**
	 * Deprecated, see put.
	 * @deprecated
	 */
	this.setValue = function(){return self.put.apply(self,arguments);};

};
/**
 * @fileoverview Object for creating data in any format
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the dataBuffer object.
 * @class Provides an data buiulder for many data formats
 * This automatically stores the output in the format requested.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-07-19
 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format (default: {@link jpmc.lang.Data#format jpmc.lang.Data.format.BINARY})
 */
jpmc.util.DataBuilder = function(outDataType) {
	var A = [];
	var m_outDataType = outDataType || jpmc.lang.Data.format.BINARY;
	var hex_chars = jpmc.lang.Data.characterSet.HEX.split('');
	var cnt = 0;
	var t = jpmc.lang.Data.format;

	/**
	 * Get's the length of the data in the DataBuilder
	 * @type number
	 * @return The size of the data in the DataBuilder
	 */
	this.getLength = function() {
		return cnt;
	};

	/**
	 * Returns the {@link jpmc.lang.Data#format} of the output data format
	 * @type object
	 */
	this.getDataType = function() {
		return m_outDataType;
	};

	/**
	 * Append the data to the output buffer
	 * @param {object} data Data to be added (string, number, binary array)
	 * @type void
	 * @deprecated
	 * @throws {@link jpmc.lang.Exception} - An exception is thrown if an unsupported data type is passed to the function.
	 */
	this.append = function(data) {
		var dt = typeof data;
		if (dt == 'string') {
			this.appendString(data);
		} else if (dt == 'number') {
			this.appendNumber(data);
		} else if (dt == 'object' && data.constructor == Array) {
			if (data.length===0) {
				this.appendBinary(data);
			} else if (typeof data[0] == 'number') {
				this.appendBinary(data);
			}
		}
		throw new jpmc.lang.Exception(this, 'append', 'Unsupported data type');
	};

	/**
	 * Append a character to the output buffer
	 * @param {string} data Character to be added
	 * @type void
	 */
	this.appendChar = function(data) {
		var i;
		switch(m_outDataType) {
			case t.BINARY:
				A[A.length] = data.charCodeAt(0);
				break;
			case t.TEXT:
				A[A.length] = data.charAt(0);
				break;
			case t.HEX:
				var num = data.charCodeAt(0);
				A[A.length] = hex_chars[(num&0xF0)>>4];
				A[A.length] = hex_chars[(num&0x0F)];
				break;
			case t.BIG_ENDIAN:
				i = cnt * 8;
				A[i>>5] |= (data.charCodeAt(0) & 0xFF) << (24-i&0x1F);
				break;
			case t.LITTLE_ENDIAN:
				i = cnt * 8;
				A[i>>5] |= (data.charCodeAt(0) & 0xFF) << (i&0x1F);
				break;
			default: return;
		}
		cnt++;
	};

	/**
	 * Append a string to the output buffer
	 * @param {string} data String to be added
	 * @type void
	 */
	this.appendString = function(data) {
		var x, i;
		switch(m_outDataType) {
			case t.BINARY:
				for (x=0; x<data.length; x++) {
					A[A.length] = data.charCodeAt(x);
				}
				break;
			case t.TEXT:
				A[A.length] = data;
				break;
			case t.HEX:
				for (x=0; x<data.length; x++) {
					var num = data.charCodeAt(x);
					A[A.length] = hex_chars[(num&0xF0)>>4];
					A[A.length] = hex_chars[(num&0x0F)];
				}
				break;
			case t.BIG_ENDIAN:
				for (x=0; x<data.length; x++) {
					i = (cnt + x) * 8;
					A[i>>5] |= (data.charCodeAt(x) & 0xFF) << (24-i&0x1F);
				}
				break;
			case t.LITTLE_ENDIAN:
				for (x=0; x<data.length; x++) {
					i = (cnt + x) * 8;
					A[i>>5] |= (data.charCodeAt(x) & 0xFF) << (i&0x1F);
				}
				break;
			default: return;
		}
		cnt+=data.length;
	};

	/**
	 * Append a number to the output buffer
	 * @param {number} data Number to be added
	 * @type void
	 */
	this.appendNumber = function(data) {
		var i;
		switch(m_outDataType) {
			case t.BINARY:
				A[A.length] = data;
				break;
			case t.TEXT:
				A[A.length] = String.fromCharCode(data);
				break;
			case t.HEX:
				A[A.length] = hex_chars[(data&0xF0)>>4];
				A[A.length] = hex_chars[(data&0x0F)];
				break;
			case t.BIG_ENDIAN:
				i = cnt * 8;
				A[i>>5] |= (data & 0xFF) << (24-i&0x1F);
				break;
			case t.LITTLE_ENDIAN:
				i = cnt * 8;
				A[i>>5] |= (data & 0xFF) << (i&0x1F);
				break;
			default: return;
		}
		cnt++;
	};

	/**
	 * Append a binary array to the output buffer
	 * @param {number} data Array of numbers to be added
	 * @type void
	 */
	this.appendBinary = function(data) {
		var x, i;
		switch(m_outDataType) {
			case t.BINARY:
				A = A.concat(data);
				break;
			case t.TEXT:
				for (x=0; x<data.length; x++) {
					A[A.length] = String.fromCharCode(data[x]);
				}
				break;
			case t.HEX:
				for (x=0; x<data.length; x++) {
					A[A.length] = hex_chars[(data[x]&0xF0)>>4];
					A[A.length] = hex_chars[(data[x]&0x0F)];
				}
				break;
			case t.BIG_ENDIAN:
				for (x=0; x<data.length; x++) {
					i = (cnt + x) * 8;
					A[i>>5] |= (data[x] & 0xFF) << (24-i&0x1F);
				}
				break;
			case t.LITTLE_ENDIAN:
				for (x=0; x<data.length; x++) {
					i = (cnt + x) * 8;
					A[i>>5] |= (data[x] & 0xFF) << (i&0x1F);
				}
				break;
			default: return;
		}
		cnt+=data.length;
	};

	/**
	 * Append a big-endian array to the output buffer
	 * @param {number} data Array of big-endian numbers to be added
	 * @type void
	 */
	this.appendBigEndian = function(data) {
		var x, i;
		var getNum = function(index) {
			return (data[index>>5] >>> (24-(index&0x1F))) & 0xFF;
		};
		switch(m_outDataType) {
			case t.BINARY:
				for(x = 0; x<data.length * 32; x+=8) {
					A[A.length] = getNum(x);
				}
				break;
			case t.TEXT:
				for(x = 0; x<data.length * 32; x+=8) {
					A[A.length] = String.fromCharCode(getNum(x));
				}
				break;
			case t.HEX:
				for(x = 0; x<data.length * 32; x+=8) {
					var num = getNum(x);
					A[A.length] = hex_chars[(num&0xF0)>>4];
					A[A.length] = hex_chars[(num&0x0F)];
				}
				break;
			case t.BIG_ENDIAN:
				for(x = 0; x<data.length * 32; x+=8) {
					i = cnt* 8 + x ;
					A[i>>5] |= (getNum(x) << (24-x&0x1F));
				}
				break;
			case t.LITTLE_ENDIAN:
				for(x = 0; x<data.length * 32; x+=8) {
					i = cnt* 8 + x ;
					A[i>>5] |= (getNum(x) << (x&0x1F));
				}
				break;
			default: return;
		}
		cnt+=(data.length*4);
	};

	/**
	 * Append a little-endian array to the output buffer
	 * @param {number} data Array of little-endian numbers to be added
	 * @type void
	 */
	this.appendLittleEndian = function(data) {
		var x, i;
		var getNum = function(index) {
			return (data[index>>5] >>> (index&0x1F)) & 0xFF;
		};
		switch(m_outDataType) {
			case t.BINARY:
				for(x = 0; x<data.length * 32; x+=8) {
					A[A.length] = getNum(x);
				}
				break;
			case t.TEXT:
				for(x = 0; x<data.length * 32; x+=8) {
					A[A.length] = String.fromCharCode(getNum(x));
				}
				break;
			case t.HEX:
				for(x = 0; x<data.length * 32; x+=8) {
					var num = getNum(x);
					A[A.length] = hex_chars[(num&0xF0)>>4];
					A[A.length] = hex_chars[(num&0x0F)];
				}
				break;
			case t.BIG_ENDIAN:
				for(x = 0; x<data.length * 32; x+=8) {
					i = cnt* 8 + x ;
					A[i>>5] |= (getNum(x) << (24-x&0x1F));
				}
				break;
			case t.LITTLE_ENDIAN:
				for(x = 0; x<data.length * 32; x+=8) {
					i = cnt* 8 + x ;
					A[i>>5] |= (getNum(x) << (x&0x1F));
				}
				break;
			default: return;
		}
		cnt+=(data.length*4);
	};

	/**
	 * Returns the output data in the format requested by the original encode/decode call
	 * @type mixed
	 * @return the output data in the format requested by the original encode/decode call
	 */
	this.getValue = function() {
		switch (m_outDataType) {
			case jpmc.lang.Data.format.TEXT:
			case jpmc.lang.Data.format.HEX:
				return A.join('');
			default:
				return A;
		}
	};

	/**
	 * Clears the output buffer
	 * @type void
	 */
	this.clear = function() {
		A = [];
		cnt = 0;
	};
};/**
 * @fileoverview Object for reading data in any format
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the DataReader object.
 * @class Provides an data reader for many data formats.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-07-20
 * @param {object} data Data to be read (String, Binary Array, HEX Array)
 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format
 * @throws {@link jpmc.lang.Exception} - An exception is thrown if an unsupported data type is passed to the constructor.
 * @requires jpmc.lang.Exception
 */
jpmc.util.DataReader = function(data, inDataType) {
	var m_Data = data;
	var m_inDataType = inDataType;
	var t = jpmc.lang.Data.format;

	var m_chars = [];
	//build chars array
	for (var x=0; x<256; x++) {m_chars[x]=String.fromCharCode(x);}

	if (m_inDataType===undefined && data !== null) {
		if (typeof data == 'string') {
			m_inDataType = t.TEXT;
		} else if (typeof data == 'object' && data.constructor == Array) {
			if (data.length===0) {
				m_inDataType = t.BINARY;
			} else if (typeof data[0] == 'number' && data[0] < 256) {
				m_inDataType = t.BINARY;
			}
		}
	}
	if (m_inDataType===undefined) {
		throw new jpmc.lang.Exception(this, 'constructor', 'Unsupported data type');
	}

	/**
	 * Returns the length of the data in bytes
	 * @type number
	 */
	this.getLength = function() {
		var last;
		var len = m_Data.length;
		if (len===0) {return len;}
		switch(m_inDataType) {
			case t.HEX: return (len/2);
			case t.BIG_ENDIAN:
				last = m_Data[len-1];
				if (last & 0xFF) {return len*4;}
				if (last & 0xFF00) {return len*4-1;}
				if (last & 0xFF0000) {return len*4-2;}
				return len*4-3;
			case t.LITTLE_ENDIAN:
				last = m_Data[len-1];
				if (last & 0xFF000000) {return len*4;}
				if (last & 0xFF0000) {return len*4-1;}
				if (last & 0xFF00) {return len*4-2;}
				return len*4-3;
			default: return len;
		}
	};

	/**
	 * Returns the {@link jpmc.lang.Data#format} of the data
	 * @type object
	 */
	this.getDataType = function() {
		return m_inDataType;
	};

	/**
	 * Returns the character at the requested location
	 * @param {number} index Location of the character to return
	 * @type string
	 * @return string
	 */
	this.charAt = function(index) {
		var i;
		switch(m_inDataType) {
			case t.TEXT:          return m_Data.charAt(index);
			case t.BINARY:        return m_chars[m_Data[index] & 0xFF];
			case t.HEX:           return m_chars[parseInt(m_Data.slice(index*2,index*2+2),16) & 0xFF];
			case t.BIG_ENDIAN:    i=index*8; return m_chars[(m_Data[i>>5] >>> (24 - i&0x1F)) & 0xFF];
			case t.LITTLE_ENDIAN: i=index*8; return m_chars[(m_Data[i>>5] >>> (i&0x1F)) & 0xFF];
			default:              return '';
		}
	};

	/**
	 * Returns the binary value at the requested location
	 * @param {number} index Location of the value to return
	 * @type number
	 * @return number
	 */
	this.charCodeAt = function(index) {
		var i;
		switch(m_inDataType) {
			case t.TEXT:          return m_Data.charCodeAt(index);
			case t.BINARY:        return m_Data[index] & 0xFF;
			case t.HEX:           return parseInt(m_Data.slice(index*2,index*2+2),16);
			case t.BIG_ENDIAN:    i=index*8; return ((m_Data[i>>5] >>> (24 - i&0x1F)) & 0xFF);
			case t.LITTLE_ENDIAN: i=index*8; return ((m_Data[i>>5] >>> (i&0x1F)) & 0xFF);
			default:              return 0;
		}
	};

	/**
	 * Returns the big-endian value at the requested location
	 * @param {number} index Location of the character to return (value indicates a 4 byte block, max index = data length / 4)
	 * @type number
	 * @return big-endian value
	 */
	this.bigEndianAt = function(index) {
		switch(m_inDataType) {
			case t.BIG_ENDIAN: return m_Data[index];
			default:
				var result = 0;
				var start = index*4;
				for (var x = start; x<start+4; x++) {
					result |= (this.charCodeAt(x) & 0xFF) << (24-(x*8)&0x1F);
				}
				return result;

		}
	};

	/**
	 * Returns the little-endian value at the requested location
	 * @param {number} index Location of the character to return (value indicates a 4 byte block, max index = data length / 4)
	 * @type number
	 * @return little-endian value
	 */
	this.littleEndianAt = function(index) {
		switch(m_inDataType) {
			case t.LITTLE_ENDIAN: return m_Data[index];
			default:
				var result = 0;
				var start = index*4;
				for (var x = start; x<start+4; x++) {
					result |= (this.charCodeAt(x) & 0xFF) << ((x*8)&0x1F);
				}
				return result;
		}
	};

	/**
	 * Returns a string representation of the data
	 * @type string
	 * @return The entire data string
	 */
	this.toString = function() {
		var i, x, A=[];
		switch(m_inDataType) {
			case t.TEXT: A[A.length] = m_Data; break;
			default: for (x=0; x<this.getLength(); x++) {A[A.length] = this.charAt(x);} break;
		}
		return A.join('');
	};

	/**
	 * Returns a binary array representation of the data
	 * @type string
	 * @return The entire data string
	 */
	this.toBinary = function() {
		var i, x, A=[];
		switch(m_inDataType) {
			case t.BINARY: A = m_Data; break;
			default:
				i = this.getLength();
				for (x=0; x<i; x++) {
					A[x] = this.charCodeAt(x);
				}
				break;
		}
		return A;
	};

	/**
	 * Returns a big endian array representation of the data
	 * @type string
	 * @return The entire data string
	 */
	this.toBigEndian = function() {
		var i, x, A=[];
		switch(m_inDataType) {
			case t.BIG_ENDIAN: A = m_Data; break;
			default:
				i = Math.ceil(this.getLength() / 4);
				for (x=0; x<i; x++) {
					A[x] = this.bigEndianAt(x);
				}
				break;
		}
		return A;
	};

	/**
	 * Returns a little endian array representation of the data
	 * @type string
	 * @return The entire data string
	 */
	this.toLittleEndian = function() {
		var i, x, A=[];
		switch(m_inDataType) {
			case t.LITTLE_ENDIAN: A = m_Data; break;
			default:
				i = Math.ceil(this.getLength() / 4);
				for (x=0; x<i; x++) {
					A[x] = this.littleEndianAt(x);
				}
				break;
		}
		return A;
	};

};/**
 * @fileoverview Object that mimics the map/dictionary object
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * The ole Map object
 * @constructor
 * @class Level
 */
jpmc.util.Map = function() {

	var C = 0;
	var D = {};

	this.clear = function() {
		C=0;
		D={};
		return true;
	};

	this.containsKey = function(strKey) {
		return (strKey in D);
	};

	this.get = function(strKey) {
		return D[strKey];
	};

	this.keySet = D;

	this.put = function(strKey, varValue) {
		adj(strKey, true);
		D[strKey]=varValue;
		return true;
	};

	this.remove = function(strKey) {
		adj(strKey, false);
		return delete D[strKey];
	};

	this.rename = function(strKey, strNewKey) {
		this.put(strNewKey, D[strKey]);
		return this.remove(strKey);
	};

	this.size = function() {
		return C;
	};

	//Support Function
	var adj = function(strKey, inc) {
		if (!inc ^ (strKey in D) == 0) {
			C += inc?1:-1;
		}
	};
};
/**
 * @fileoverview Object similar to the Java Set object and the .NET System.Collection object
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Similar to the Java Set object and the .NET System.Collection object
 * @constructor
 * @class jpmc.util.Set
 */
jpmc.util.Set = function() {

	var self = this;
	var A = Array.apply(this, arguments);

	var sortCFG = function(a,b) {
		var av,bv,cmp;
		for (var x=0; x<sortParam.length; x++) {
			cmp = sortParam[x];
			av = a[cmp.prop];
			bv = b[cmp.prop];
			if (av<bv) {return cmp.asc?-1:1;}
			if (av>bv) {return cmp.asc?1:-1;}
		}
		return 0;
	};

	var sortBLN = function(a,b) {
		if (a<b) {return sortParam?-1:1;}
		if (a>b) {return sortParam?1:-1;}
		return 0;
	};

	var sortParam;
	var sortFunc;

	var sortInit = function(sortBy) {
		sortParam = sortBy;
		switch(typeof sortParam) {
			case 'boolean' : sortFunc = sortBLN; break;
			case 'function': sortFunc = sortParam;    break;
			case 'object'  : sortFunc = sortCFG;
				if (sortParam.constructor!=Array) {sortParam = [sortParam];}
				break;
			default        : sortFunc = sortBLN; sortParam = true; break;
		}
	};


	/**
	 * Placeholder for the event handler function that is called when an item is about to be added to the Set.
 	 * @param {number} index The index where the new item will be added into the Set.
 	 * @param {object} item The item being added to the Set.
	 * @type function
	 * @returns boolean indicating if the action should be canceled.
	 */
	this.onBeforeAdd    = function(index, item) {};
	/**
	 * Placeholder for the event handler function that is called after an item is added to the Set.
 	 * @param {number} index The index where the new item was added into the Set.
 	 * @param {object} item The item added to the Set.
	 * @type function
	 */
	this.onAfterAdd    = function(index, item) {};

	/**
	 * Placeholder for the event handler function that is called when the Set object is about to be cleared.
	 * @type function
	 * @returns boolean indicating if the action should be canceled.
	 */
	this.onBeforeClear  = function() {};
	/**
	 * Placeholder for the event handler function that is called after the Set object has been cleared.
	 * @type function
	 */
	this.onAfterClear  = function() {};

	/**
	 * Placeholder for the event handler function that is called when an item is about to be removed from the Set.
 	 * @param {number} index The index where the new item is located in the Set.
 	 * @param {object} item The item being removed from the Set.
	 * @type function
	 * @returns boolean indicating if the action should be canceled.
	 */
	this.onBeforeRemove = function(index, item) {};
	/**
	 * Placeholder for the event handler function that is called after an item has been removed from the Set.
 	 * @param {number} index The index where the item was removed from the Set.
 	 * @param {object} item The item removed from the Set.
	 * @type function
	 */
	this.onAfterRemove = function(index, item) {};

	/**
	 * Placeholder for the event handler function that is called when the Set object is about to be sorted.
	 * @type function
	 * @returns boolean indicating if the action should be canceled.
	 */
	this.onBeforeSort = function() {};
	/**
	 * Placeholder for the event handler function that is called after the Set object has been sorted.
	 * @type function
	 */
	this.onAfterSort = function() {};

	/**
	 * Adds an object to the end of the Set.
	 * @param {object} item The object to add to the Set.
	 * @type boolean
	 * @returns true if item was successfully added to the Set; otherwise, false.
	 */
	this.add = function(item) {
		var x=0;
		if (sortFunc) {
			while (x<A.length && sortFunc(item, A[x]) !== -1) {x++;}
		} else {
			x = A.length;
		}
		return this.insert(item, x);
	};

	/**
	 * Removes all elements from the Set.
	 * @type boolean
	 * @returns true if the Set was successfully cleared; otherwise, false.
	 */
	this.clear = function() {
		if (this.onBeforeClear()) {return false;}
		A = [];
		this.onAfterClear();
		return true;
	};

	/**
	 * Determines whether an element is in the Set.
	 * @param {object} item The object to locate in the Set.
	 * @type boolean
	 * @return true if item is found in the Set; otherwise, false.
	 */
	this.contains = function(item) {
		return this.indexOf(item) !== -1;
	};

	/**
	 * Gets the number of elements actually contained in the Set.
	 * @type number
	 */
	this.count = function() {
		return A.length;
	};

	/**
	 * Gets the element at the specified index.
	 * @param {number} index The zero-based index of the element to retrieve.
	 * @type object
	 * @returns The element at the specified index.
	 */
	this.item = function(index) {
		return A[index];
	};

	/**
	 * Searches for the specified object and returns the zero-based index of the first occurrence within the entire Set.
	 * @param {object} item The object to locate in the Set.
	 * @type number
	 * @return The zero-based index of the first occurrence of item within the entire Set, if found; otherwise, -1.
	 */
	this.indexOf = function(item) {
		return jpmc.helper.Array.indexOf(A, item);
	};

	/**
	 * Inserts an element into the Set at the specified index.
	 * @param {object} item The object to insert.
	 * @param {number} index The zero-based index at which item should be inserted.
	 * @type boolean
	 * @returns true if item was successfully added to the Set; otherwise, false.
	 */
	this.insert = function(item, index) {

		if (this.onBeforeAdd(index, item)) {return false;}

		A.splice(index, 0, item);

		this.onAfterAdd(index, item);

		return true;
	};

	/**
	 * Removes the first occurrence of a specific object from the Set.
	 * @param {object} item The object to insert.
	 * @type boolean
	 * @returns true if item is successfully removed; otherwise, false. This method also returns false if item was not found in the original Set.
	 */
	this.remove = function(item) {
		return this.removeAt(this.indexOf(item));
	};

	/**
	 * Removes the element at the specified index of the Set.
	 * @param {number} index The zero-based index of the element to remove.
	 * @type boolean
	 * @returns true if item is successfully removed; otherwise, false. This method also returns false if item was not found in the original Set.
	 */
	this.removeAt = function(index) {

		var v = A[index];

		if (!(index in A) || this.onBeforeRemove(index, v)) {return false;}

		A.splice(index, 1);

		this.onAfterRemove(index, v);

		return true;
	};

	/**
	 * Gets the number of elements actually contained in the Set.
	 * @type number
	 */
	this.size = function() {
		return A.length;
	};

	/**
	 * Sorts every element in the Set according to the sort parameters.
	 * @param {mixed} sortBy (optional) Indicates sort order by any of the following:<ul><li>boolean - true: ascending, false: descending</li><li>{@link jpmc.util.SortParam}</li><li>{@link jpmc.util.SortParam}[]</li><li>function - see javascript Array.sort documentation</li></ul>
	 * @type boolean
	 * @returns true if items are successfully sorted; otherwise, false.
	 */
	this.sort = function(sortBy) {

		if (this.onBeforeSort()) {return false;}

		sortInit(sortBy);

		A.sort(sortFunc);

		this.onAfterSort();

		return true;
	};

	/**
	 * Returns an array containing all of the elements in this Set.
	 * @type object[]
	 * @returns an array containing all of the elements in this Set.
	 */
	this.toArray = function() {
		return A.concat([]);
	};

};
/**
 * @fileoverview Object for managing client computer actions (fso/registry/etc...)
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the Shell class<br>
 * @class Manages windows shell operations.<br>
 * <br>Known limitations: Works in IE only!<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @version 1.0 2006-10-06
 */
jpmc.util.Shell = function() {

	var wshShell, oShell, fso, stream, objwbemLocator;

	//Used to correct weird binary data
	var binaryMap = {
		8364:128,
		8218:130,
		402:131,
		8222:132,
		8230:133,
		8224:134,
		8225:135,
		710:136,
		8240:137,
		352:138,
		8249:139,
		338:140,
		381:142,
		8216:145,
		8217:146,
		8220:147,
		8221:148,
		8226:149,
		8211:150,
		8212:151,
		732:152,
		8482:153,
		353:154,
		8250:155,
		339:156,
		382:158,
		376:159
	};

	/**
	 * Flag that indicates if this class has sufficient privileges to run
	 * @type boolean
	 */
	this.enabled = false;

	/**
	 * PRIVATE CONSTANTS
	 */

	var wbemAuthenticationLevelDefault = 0;
	var wbemAuthenticationLevelNone = 1;
	var wbemAuthenticationLevelConnect = 2;
	var wbemAuthenticationLevelCall = 3;
	var wbemAuthenticationLevelPkt = 4;
	var wbemAuthenticationLevelPktIntegrity = 5;
	var wbemAuthenticationLevelPktPrivacy = 6;

	var wbemImpersonationLevelAnonymous = 1;
	var wbemImpersonationLevelIdentify = 2;
	var wbemImpersonationLevelImpersonate = 3;
	var wbemImpersonationLevelDelegate = 4;

	var wbemFlagBidirectional = 0x00;
	var wbemFlagReturnWhenComplete = 0x00;
	var wbemQueryFlagPrototype = 0x02;
	var wbemFlagReturnImmediately = 0x10;
	var wbemFlagForwardOnly = 0x20;
	var wbemFlagUseAmendedQualifiers = 0x20000;

	/**
	 * PUBLIC PROPERTIES
	 */

	/**
	 * Gets/Sets the logging object {@link jpmc.util.logging.Logger} or {@link jpmc.util.logging.Proxy}
	 * @type object
	 */
	this.logHandler = {log:function(){}};

	/**
	 * PUBLIC METHODS
	 */

	/**
	 * Gets the value of a registry entry.
	 * @param {string} path Path of the registry entry. (example: HKCU\Software\ACME\Product\)
	 * @type mixed
	 * @return The value of the requested registry entry.
	 */
	this.regRead = function(path, defaultValue) {
		try {
			getWSHShell.call(this);
			defaultValue = wshShell.RegRead(path);
		} catch (ex) {
			this.logHandler.log(null, 'regRead('+ex.message+')', this);
		}
		return defaultValue;
	};

	/**
	 * Sets a registry entry to the requested value.
	 * @param {string} path Path of the registry entry. (example: HKCU\Software\ACME\Product\)
	 * @param {mixed} value The value to assign to the registry entry (supports: number, string, boolean)
	 * @type boolean
	 * @return Flag indicating the success of the call
	 */
	this.regWrite = function(path, value) {
		var defaultValue = false;
		var sType;
		switch (typeof value) {
			case 'string': sType='REG_SZ'; break;
			case 'number': sType = (Math.abs(value)<2147483648)?'REG_DWORD':'REG_SZ'; break;
			case 'boolean': sType='REG_SZ'; value=value.toString(); break;
			default: return false;
		}
		try {
			getWSHShell.call(this);
			wshShell.RegWrite(path, value, sType);
			defaultValue = true;
		} catch (ex) {
			this.logHandler.log(null, 'regWrite('+ex.message+')', this);
		}
		return defaultValue;

	};

	/**
	 * Deletes the registry entry.
	 * @param {string} path Path of the registry entry. (example: HKCU\Software\ACME\Product\)
	 * @type boolean
	 * @return Flag indicating the success of the call
	 */
	this.regDelete = function(path) {
		var defaultValue = false;
		try {
			getWSHShell.call(this);
			wshShell.RegDelete(path);
			defaultValue = true;
		} catch (ex) {
			this.logHandler.log(null, 'regDelete('+ex.message+')', this);
		}
		return defaultValue;
	};

	/**
	 * Minimizes all windows on the desktop
	 * @type boolean
	 * @return Flag indicating the success of the call
	 */
	this.minimizeAll = function() {
		var defaultValue = false;
		try {
			getShell.call(this);
			oShell.MinimizeAll();
			defaultValue = true;
		} catch (ex) {
			this.logHandler.log(null, 'minimizeAll('+ex.message+')', this);
		}
		return defaultValue;
	};


	/**
	 * Sets text in the clipboard
	 * @param {string} data The data to be saved to the clipboard
	 * @type boolean
	 * @return Flag indicating the success of the operation
	 */
	this.setClipboard = function(data) {
		try {
			if (window.clipboardData) {
				//IE
				window.clipboardData.setData('Text', data);
			} else {
				// This is importent but it's not noted anywhere
				netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
				// create interface to the clipboard
				var clip = Components.classes['@mozilla.org/widget/clipboard;[[[[1]]]]'].createInstance(Components.interfaces.nsIClipboard);
				// create a transferable
				var trans = Components.classes['@mozilla.org/widget/transferable;[[[[1]]]]'].createInstance(Components.interfaces.nsITransferable);
				// specify the data we wish to handle. Plaintext in this case.
				trans.addDataFlavor('text/unicode');
				// To get the data from the transferable we need two new objects
				var str = Components.classes["@mozilla.org/supports-string;[[[[1]]]]"].createInstance(Components.interfaces.nsISupportsString);
				str.data=data;
				trans.setTransferData("text/unicode", str, data.length*[[[[2]]]]);
				var clipid = Components.interfaces.nsIClipboard;
				clip.setData(trans, null, clipid.kGlobalClipboard);
			}
			return true;
		} catch(ex) {
			return false;
		}
	};


	/**
	 * Get text stored in the clipboard
	 * @type string
	 * @return The clipboard text data
	 */
	this.getClipboard = function() {
		try {
			if (window.clipboardData) {
				//IE
				return window.clipboardData.getData('Text');
			} else {
				// This is importent but it's not noted anywhere
				netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
				// create interface to the clipboard
				var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
				// create a transferable
				var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
				// specify the data we wish to handle. Plaintext in this case.
				trans.addDataFlavor('text/unicode');
				// get the data
				clip.getData(trans,clip.kGlobalClipboard);
				// to get the data from the transferable we have to create 2 new objects
				var str = {};
				var len = {};
				// do not get the data and data length on in the new objects; here catch I errors on as a type-conversion succeeds
				trans.getTransferData('text/unicode', str, len);

				// If the data object contains something, converteer it to a string object
				if (str) {
					if (Components.interfaces.nsISupportsWString) {
						// these worked with me only in NS7
						str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
					} else if (Components.interfaces.nsISupportsString) {
						// and this only in Mozilla 1.2
						str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
					} else {
						str = null;
					}
				}
				// get the text from the data segment
				// the length is the half of the length as raised from the transferable
				return str.data.substring(0, len.value/2);
			}
		} catch(ex) {
			return '';
		}
	};

	/**
	 * Gets the path to a local system folder.
	 * @param {string} info Text displayed in the BFF doalog window
	 * @param {string} rootPath (Optional) Top path in the BFF dialog window
	 * @type string
	 * @return The local folder selected or an empty string if no folder was selected
	 */
	this.browseForFolder = function(info, rootPath) {
		var defaultValue = '';
		try {
			getShell.call(this);
			var oFolder = oShell.BrowseForFolder(0, info, 0, rootPath);
			if (oFolder) {defaultValue = oFolder.Items().Item().Path;}
		} catch (ex) {
			this.logHandler.log(null, 'browseForFolder('+ex.message+')', this);
		}
		return defaultValue;
	};

	/**
	 * Runs an executable file on the local machine
	 * @param {string} path Path of the file to run
	 * @param {number} windowState Optional. Integer value indicating the appearance of the program's window.
	 * <ul>
	 * <li>0 - Hides the window and activates another window.</li>
	 * <li>1 - Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time.</li>
	 * <li>2 - Activates the window and displays it as a minimized window. </li>
	 * <li>3 - Activates the window and displays it as a maximized window. </li>
	 * <li>4 - Displays a window in its most recent size and position. The active window remains active.</li>
	 * <li>5 - Activates the window and displays it in its current size and position.</li>
	 * <li>6 - Minimizes the specified window and activates the next top-level window in the Z order.</li>
	 * <li>7 - Displays the window as a minimized window. The active window remains active.</li>
	 * <li>8 - Displays the window in its current state. The active window remains active.</li>
	 * <li>9 - Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when restoring a minimized window.</li>
	 * <li>10 - Sets the show-state based on the state of the program that started the application.</li>
	 * </ul>
	 * @param {boolean} waitOnReturn Optional. Boolean value indicating whether the script should wait for the program to finish executing before continuing to the next statement in your script.
	 * @type boolean
	 * @return Flag indicating the success of the call
	 */
	this.fileExec = function(path, windowState, waitOnReturn) {
		var defaultValue = -1;
		try {
			getWSHShell.call(this);
			defaultValue = wshShell.Run(path, windowState, waitOnReturn);
		} catch (ex) {
			this.logHandler.log(null, 'fileExec('+path+') '+ex.message, this);
		}
		return (defaultValue===0);
	};

	/**
	 * Opens a file using the associated program on the local machine
	 * @param {string} path Path of the file to open
	 * @param {number} windowState Optional. Integer value indicating the appearance of the program's window.
	 * <ul>
	 * <li>0 - Hides the window and activates another window.</li>
	 * <li>1 - Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time.</li>
	 * <li>2 - Activates the window and displays it as a minimized window. </li>
	 * <li>3 - Activates the window and displays it as a maximized window. </li>
	 * <li>4 - Displays a window in its most recent size and position. The active window remains active.</li>
	 * <li>5 - Activates the window and displays it in its current size and position.</li>
	 * <li>6 - Minimizes the specified window and activates the next top-level window in the Z order.</li>
	 * <li>7 - Displays the window as a minimized window. The active window remains active.</li>
	 * <li>8 - Displays the window in its current state. The active window remains active.</li>
	 * <li>9 - Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when restoring a minimized window.</li>
	 * <li>10 - Sets the show-state based on the state of the program that started the application.</li>
	 * </ul>
	 * @param {boolean} waitOnReturn Optional. Boolean value indicating whether the script should wait for the program to finish executing before continuing to the next statement in your script.
	 * @type boolean
	 * @return Flag indicating the success of the call
	 */
	this.fileOpen = function(path, windowState, waitOnReturn) {
		var defaultValue = false;
		try {
			getWSHShell.call(this);
			//Get command line
			var ext = path.slice(path.lastIndexOf('.')).toLowerCase();
			if (ext.indexOf('.') === -1 || ext.indexOf('\\') !== -1) {
				throw {message:'Invalid document path "' + path + '"'};
			}
			var cls = this.regRead('HKCR\\' + ext + '\\', '');
			if (cls === '') {
				throw {message:'No file type association for extension ' + ext};
			}
			var cmd = this.regRead("HKCR\\" + cls + "\\shell\\open\\command\\", '');
			if (cmd === '') {
				throw {message:'Unable to find command line for ' + cls};
			}
			//Populate Environment Variables like %SystemRoot%
			cmd = wshShell.ExpandEnvironmentStrings(cmd);

			//Insert path into command line
			cmd = cmd.replace(/"?%1"?|"?%L"?/i,'"' + path + '"');
			cmd = cmd.replace(/"?%[\x00-\xFF]"?/g,'');
			if (cmd.indexOf(path)==-1) {cmd += ' "' + path + '"';}
			//Execute command line
			defaultValue = this.fileExec(cmd, windowState, waitOnReturn);
		} catch (ex) {
			this.logHandler.log(null, 'fileOpen('+path+') '+ex.message, this);
		}
		return defaultValue;
	};

	/**
	 * Executes a DOS command on the local machine
	 * @param {string} cmd The DOS command to be executed
	 * @type string
	 * @return The output of the DOS command, upon completion
	 */
	this.commandPrompt = function(cmd) {
		var val = [];
		try {
			getWSHShell.call(this);
			var e = wshShell.Exec("%comspec% /c " + cmd);
			do {
				if (!e.StdOut.AtEndOfStream) {
					val[val.length] =  e.StdOut.ReadAll();
				} else if (!e.StdErr.AtEndOfStream) {
					val[val.length] =  e.StdErr.ReadAll();
				}
			} while (e.Status === 0);

		} catch (ex) {
			this.logHandler.log(null, 'commandPrompt('+cmd+') '+ex.message, this);
		}
		return val.join('');
	};

	/**
	 * Determines if a specified file exists.
	 * @param {string} path The path of the file to look for. (C:\subfolder1\file.txt)
	 * @type boolean
	 * @return Flag indicating if the file exists
	 */
	this.fileExists = function(path) {
		var defaultValue = false;
		try {
			getFSO.call(this);
			defaultValue = fso.FileExists(path);
		} catch (ex) {
			this.logHandler.log(null, 'fileExists('+path+') '+ex.message, this);
		}
		return defaultValue;
	};

	/**
	 * Determines if a specified folder exists.
	 * @param {string} path The path of the folder to look for. (C:\subfolder1)
	 * @type boolean
	 * @return Flag indicating if the folder exists
	 */
	this.folderExists = function(path) {
		var defaultValue = false;
		try {
			getFSO.call(this);
			defaultValue = fso.FolderExists(path);
		} catch (ex) {
			this.logHandler.log(null, 'folderExists('+path+') '+ex.message, this);
		}
		return defaultValue;
	};

	/**
	 * Creates a folder with the provided path
	 * @param {string} path The path of the folder to be created. (C:\subfolder1\subfolder2)
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.folderCreate = function(path) {
		var ret = false;
		try {
			getFSO.call(this);
			var folders = path.split('\\');
			var tmpPath = folders[0];
			for (var x=1; x<folders.length; x++) {
				tmpPath += '\\' + folders[x];
				if (!fso.FolderExists(tmpPath)) {
					fso.CreateFolder(tmpPath);
				}
			}
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'folderCreate('+path+') '+ex.message, this);
		}
		return ret;
	};

	/**
	 * Creates a text file that is populated with the text provided
	 * @param {string} path The path of the file to be created. (C:\subfolder1\file.txt)
	 * @param {string} text (Optional) Text to be placed in the file
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.fileCreate = function(path, text) {
		var ret = false;
		try {
			getFSO.call(this);
			var file = fso.CreateTextFile(path, true);
			if (typeof text == 'string') {
				file.Write(text);
			}
			file.Close();
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'fileCreate('+path+') '+ex.message, this);
			if (file) {file.Close();}
		}
		return ret;
	};

	/**
	 * Creates a binary file that is populated with the data provided
	 * @param {string} path The path of the file to be created. (C:\subfolder1\file.txt)
	 * @param {string} data (Optional) Data to be placed in the file
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.fileCreateBinary = function(path, data) {
		var ret = false;
		try {
			getStream.call(this);
			stream.Open();
			stream.Position = 0;
			stream.SetEOS();
			if (typeof data == 'string') {
				stream.WriteText(data);
			}
			stream.SaveToFile(path, 2); //adSaveCreateOverwrite
			stream.Close();
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'fileCreateBinary('+path+') '+ex.message, this);
			if (stream && stream.State!==0) {stream.Close();}
		}
		return ret;
	};

	/**
	 * Gets the binary data found in the requested file.
	 * @param {string} path The path to the file to be retrieved. (C:\subfolder1\file.txt)
	 * @param {string} defaultValue The default value returned if the file does not exist
	 * @type string
	 * @return Binary data found in the file
	 */
	this.fileReadBinary = function(path, defaultValue) {
		try {
			getStream.call(this);
			stream.Open();
			stream.Position = 0;
			stream.SetEOS();
			stream.LoadFromFile(path);
			defaultValue = stream.ReadText(-1).replace(/[^\u0000-\u00FF]/g, function(c){
				return String.fromCharCode(binaryMap[c.charCodeAt(0)] || 0);
			});
			stream.Close();
		} catch (ex) {
			this.logHandler.log(null, 'fileReadBinary('+path+') '+ex.message, this);
			if (stream && stream.State!==0) {stream.Close();}
		}
		return defaultValue;
	};

	/**
	 * Gets the value of a registry entry.
	 * @param {string} path File path of the shortcut to create.
	 * @param {object} detail (Optional) Object that contains the attributes to apply to the shortcut.
	 * <ul>
	 * <li>Arguments<sup>*</sup> - Command-line arguments for the target file.</li>
	 * <li>Description<sup>*</sup> - A string value describing a shortcut.</li>
	 * <li>FullName  - A read-only string value indicating the fully qualified path to the shortcut's target.</li>
	 * <li>Hotkey<sup>*</sup> - A string representing the key-combination to assign to the shortcut. (example: "ALT+CTRL+F")</li>
	 * <li>IconLocation<sup>*</sup> - A string that locates the icon. The string should contain a fully qualified path and an index associated with the icon. (example: "notepad.exe, 0")</li>
	 * <li>TargetPath - The path to the shortcut's executable.</li>
	 * <li>WindowStyle<sup>*</sup> - Assigns a window style to a shortcut, or identifies the type of window style used by a shortcut. (1 - Normal, 3 - Maximized, 7 - Minimized)</li>
	 * <li>WorkingDirectory<sup>*</sup> - A working directory to a shortcut, or identifies the working directory used by a shortcut.</li>
	 * </ul>
	 * <sub>* Not available on internet resource shortcuts</sub>
	 * @type object
	 * @return The WshShortcut object located at the specified path.
	 */
	this.fileCreateShortcut = function(path, detail) {
		var link;
		try {
			getWSHShell.call(this);
			link = wshShell.CreateShortcut(path);
			if (detail) {
				for (var A in detail) {
					link[A] = detail[A];
				}
				link.Save();
			}
		} catch (ex) {
			this.logHandler.log(null, 'regRead('+ex.message+')', this);
		}
		return link;
	};

	/**
	 * @ignore
	 */
	 this.shortcutCreate = this.fileCreateShortcut;

	/**
	 * Appends text to the end of a file.
	 * @param {string} path The path of the file to append data to. (C:\subfolder1\file.txt)
	 * @param {string} text Text to be added to the end of the file.
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.fileAppend = function(path, text) {
		var ret = false;
		try {
			getFSO.call(this);
			var file = fso.OpenTextFile(path, 8, true);
			file.Write(text);
			file.Close();
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'fileAppend('+path+') '+ex.message, this);
			if (file) {file.Close();}
		}
		return ret;
	};

	/**
	 * Gets the data found in the requested file.
	 * @param {string} path The path to the file to be retrieved. (C:\subfolder1\file.txt)
	 * @param {string} defaultValue The default value returned if the file does not exist
	 * @type string
	 * @return Data found in the file
	 */
	this.fileRead = function(path, defaultValue) {
		try {
			getFSO.call(this);
			var file = fso.OpenTextFile(path, 1, false);
			defaultValue = (file.AtEndOfStream?'':file.ReadAll()).replace(/[^\u0000-\u00FF]/g, function(c){
				return String.fromCharCode(binaryMap[c.charCodeAt(0)] || 0);
			});
			file.Close();
		} catch (ex) {
			this.logHandler.log(null, 'fileRead('+path+') '+ex.message, this);
			if (file) {file.Close();}
		}
		return defaultValue;
	};

	/**
	 * Gets a file name that may be used for a temporary file.
	 * @type string
	 * @return A valid local path that may be used for a temporary file.
	 */
	this.getTempName = function() {
		var ret = (new Date()).valueOf() + '_' + Math.round(Math.random() * 1000) + '.tmp';
		try {
			getFSO.call(this);
			ret = fso.GetTempName();
		} catch (ex) {
			this.logHandler.log(null, 'getTempName('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * Gets a full valid path that may be used for a temporary file.
	 * @type string
	 * @return A valid local path that may be used for a temporary file.
	 */
	this.getTempPath = function() {
		return this.getSpecialFolder('temp') + '\\' + this.getTempName();
	};

	/**
	 * Gets the expanded value for the special variable name.
	 * @param {string} name The name of the special variable to expand.
	 * <div>Discrete value variables</div>
	 * <ul>
	 * <li><u>CD</u> - This variable points to the current directory. Equivalent to the output of the command cd when called without arguments.</li>
	 * <li><u>Date</u> - This variable expands to the current date. The date is displayed according to the current user's date format preferences.</li>
	 * <li><u>ErrorLevel</u> - This variable points to the current error level. If there was an error in the previous command, this is what you need to check against to find out about that.</li>
	 * <li><u>Random</u> - This variable returns a random number between 0 and 32767</li>
	 * <li><u>Time</u> - This variable points to the current time. The time is displayed according to the current user's time format preferences.</li>
	 * </ul><br>
	 * <div>System path variables</div>
	 * <ul>
	 * <li><u>AllUsersDesktop</u> - Path to the desktop folder, visible to all users on the local system.</li>
	 * <li><u>AllUsersStartMenu</u> - Path to the root start menu folder, visible to all users on the local system.</li>
	 * <li><u>AllUsersPrograms</u> - Path to the program folder located in the start menu, visible to all users on the local system.</li>
	 * <li><u>AllUsersStartup</u> - Path to the startup folder located in the start menu, visible to all users on the local system.</li>
	 * <li><u>AppData</u> - Contains the full path to the Application Data folder of the logged-in user. Does not work on Windows NT 4.0 SP6 UK.</li>
	 * <li><u>CommonProgramFiles</u> - This variable points to Common Files directory. The default is C:\Program Files\Common Files.</li>
	 * <li><u>ComSpec</u> - This variable contains the full path to the Windows NT command processor, cmd.exe.</li>
	 * <li><u>Desktop</u> - Path to the desktop folder of the current user.</li>
	 * <li><u>Favorites</u> - Path to the IE favorites of the current user.</li>
	 * <li><u>Fonts</u> - Path to the system font folder</li>
	 * <li><u>HomeDrive</u> - </li>
	 * <li><u>HomePath</u> - Special system-wide environment variable that points to the location of the current user's profile directory, in which is found that user's HKCU registry hive (NTUSER).</li>
	 * <li><u>MyDocuments</u> - Path to the "My Documents" folder of the current user.</li>
	 * <li><u>NetHood</u></li>
	 * <li><u>Path</u> - This variable contains a semicolon-delimited list of directories in which the command interpreter will search for executable files. Equivalent to the UNIX $PATH variable.</li>
	 * <li><u>PathExt</u> - This environment variable contains executable file extensions that do not have to be specified for any file in a directory given in the "Path" variable.</li>
	 * <li><u>PrintHood</u></li>
	 * <li><u>Prompt</u> - Code for current command prompt format. Code is usually $P$G</li>
	 * <li><u>Programs</u> - Path to the program folder located in the start menu for the current user.</li>
	 * <li><u>ProgramFiles</u> - This variable points to Program Files directory, which stores all the installed program of Windows and others. The default is C:\Program Files.</li>
	 * <li><u>Recent</u> - Path to the "Recent Documents" folder of the current user.</li>
	 * <li><u>SendTo</u> - Path to the "Send To" folder of the current user.</li>
	 * <li><u>StartMenu</u> - Path to the root start menu folder for the current user.</li>
	 * <li><u>Startup</u> - Path to the startup folder located in the start menu for the current user.</li>
	 * <li><u>System</u> - This folder contains libraries, fonts, and device drivers.</li>
	 * <li><u>SystemDrive</u> - Special system-wide environment variable that points to the drive upon which the system folder was placed.
	 * <li><u>SystemRoot</u> - Special system-wide environment variable that points to the location of the system folder, including the drive and path.
	 * <li><u>Temporary, Temp & Tmp</u> - These variables contain the path to the directory where temporary files should be stored.</li>
	 * <li><u>Templates</u></li>
	 * <li><u>WinDir</u> - This variable points to the Windows directory.</li>
	 * <li><u>Windows</u> - This folder contains files installed by the Windows operating system.</li>
	 * </ul><br>
	 * <div>User management variables</div>
	 * <ul>
	 * <li><u>AllUsersProfile</u> - This variable expands to the full path to the All Users profile directory.
	 *     This profile contains resources and settings that are used by all system accounts.
	 *     Shortcut links copied to the All Users' Start menu or Desktop folders will appear in every user's Start menu or Desktop, respectively.</li>
	 * <li><u>ComputerName</u> - This variable can be used to determine the name of the computer.</li>
	 * <li><u>LogonServer</u> - This variable holds the hostname of the server that authenticated the current user's logon credentials (name and password).
	 *     For Home PCs, and PCs in a Workgroup, the authenticating server is usually the PC itself.
	 *     For PCs in a Windows Domain, the authenticating server is a domain controller (a primary domain controller, or PDC, in Windows NT 4-based domains).</li>
	 * <li><u>UserDomain</u> - The variable holds the name of the Workgroup or Windows Domain to which the current user belongs.</li>
	 * <li><u>UserName</u> - This variable can be used to determine the active users login identification.</li>
	 * <li><u>UserProfile</u> - Special system-wide environment variable that points to the location of the current user's profile directory, in which is found that user's HKCU registry hive (NTUSER).</li>
	 * </ul>
	 * @type string
	 * @return The expanded value of the special system string requested.
	 */
	this.expandString = function(name) {
		var ret = '';
		try {
			switch(name.toLowerCase()) {
				case 'windows':
					getFSO.call(this);
					ret = fso.GetSpecialFolder(0).Path;
					break;
				case 'system':
					getFSO.call(this);
					ret = fso.GetSpecialFolder(1).Path;
					break;
				case 'temp':
				case 'temporary':
					getFSO.call(this);
					ret = fso.GetSpecialFolder(2).Path;
					break;
				default:
					getWSHShell.call(this);
					ret = wshShell.SpecialFolders(name)|| wshShell.ExpandEnvironmentStrings('%'+name+'%');
					break;
			}
		} catch (ex) {
			this.logHandler.log(null, 'expandString('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * deprecated, see {@link jpmc.util.Shell.expandString()}.
	 * @ignore
	 */
	this.getSpecialFolder = this.expandString;

	/**
	 * deprecated, see {@link jpmc.util.Shell.expandString()}.
	 * @ignore
	 */
	this.expandEnvironmentStrings = function(name) {return this.expandString(name.replace(/\%/g,''));};

	/**
	 * Gets the local current active directory of the application.
	 * @type string
	 * @return The local path to the current working folder.
	 */
	this.getActiveFolder = function() {
		var ret = '';
		try {
			getWSHShell.call(this);
			ret = wshShell.CurrentDirectory;
		} catch (ex) {
			this.logHandler.log(null, 'getActiveFolder('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * Gets the local current active directory of the application.
	 * @param {string} path The path to set the current active directory to
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.setActiveFolder = function(path) {
		var ret = false;
		try {
			getWSHShell.call(this);
			wshShell.CurrentDirectory = path;
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'setActiveFolder('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * Copies a specified file or folder from one location to another.
	 * @param {string} path The path to the file or files to be copied. (C:\subfolder1\file.txt)
	 * @param {string} newPath Destination where the file or folder is to be copied. Wildcard characters are not allowed.
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.fsoCopy = function(path, newPath) {
		var ret = false;
		try {
			getFSO.call(this);
			var obj = getFileFolder(path);
			obj.Copy(newPath, true);
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'fsoCopy('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * Moves a specified file or folder from one location to another.
	 * @param {string} path The path to the file or files to be moved. (C:\subfolder1\file.txt)
	 * @param {string} newPath Destination where the file or folder is to be moved. Wildcard characters are not allowed.
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.fsoMove = function(path, newPath) {
		var ret = false;
		try {
			getFSO.call(this);
			var obj = getFileFolder(path);
			obj.Move(newPath);
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'fsoMove('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * Renames a specified file or folder.
	 * @param {string} path The path of the file or folder to renamed.
	 * @param {string} newName The new name of the specified object.
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.fsoRename = function(path, newName) {
		var ret = false;
		try {
			getFSO.call(this);
			var obj = getFileFolder(path);
			obj.Name = newName;
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'fsoRename('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * Deletes a specified file or folder.
	 * @param {string} path The path of the file or folder to deleted. (C:\subfolder1\file.txt)
	 * @type boolean
	 * @return Flag indicating the success of the method
	 */
	this.fsoDelete = function(path) {
		var ret = false;
		try {
			getFSO.call(this);
			var obj = getFileFolder(path);
			obj.Delete();
			ret = true;
		} catch (ex) {
			this.logHandler.log(null, 'fsoDelete('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * Gets an authenticated connection to a WMI namespace on a target computer.
	 * @param {string} computer The name of the computer ("." = local computer)
	 * @param {string} namespace The wmi namespace to connect to (Example: "root\CIMV2")
	 * @param {string} username (optional) The user to impersonate
	 * @param {string} password (optional) The password for the user
	 * @param {string[]} privileges (optional) An array of privilage strings to be appliad to the connection
	 *    <table border=1 style="border-collapse:collapse;margin:10px 0px 0px 15px;width:85%;">
	 *    <tr><th nowrap>Privilage String Constant</th><th>Description</th></tr>
	 *    <tr><td valign=top>SeAssignPrimaryTokenPrivilege</td><td>Required to replace a process-level token.</td></tr>
	 *    <tr><td valign=top>SeAuditPrivilege</td><td>Required to generate audit entries in the NT Security log. Only secure servers should have this privilege.</td></tr>
	 *    <tr><td valign=top>SeBackupPrivilege</td><td>Required to backup files and directories, regardless of the ACL specified for the file.</td></tr>
	 *    <tr><td valign=top>SeChangeNotifyPrivilege</td><td>Required to receive notifications of changes to files or directories and bypass traversal access checks. This privilege is enabled by default for all users.</td></tr>
	 *    <tr><td valign=top>SeCreatePagefilePrivilege</td><td>Required to create a pagefile.</td></tr>
	 *    <tr><td valign=top>SeCreatePermanentPrivilege</td><td>Required to create permanent shared objects.</td></tr>
	 *    <tr><td valign=top>SeCreateTokenPrivilege</td><td>Required to create a primary token object.</td></tr>
	 *    <tr><td valign=top>SeDebugPrivilege</td><td>Required to debug and adjust the memory of a process owned by another account.</td></tr>
	 *    <tr><td valign=top>SeEnableDelegationPrivilege</td><td>Required to enable computer and user accounts to be trusted for delegation.</td></tr>
	 *    <tr><td valign=top>SeIncreaseBasePriorityPrivilege</td><td>Required to increase scheduling priority.</td></tr>
	 *    <tr><td valign=top>SeIncreaseQuotaPrivilege</td><td>Required to adjust memory quotas for a process.</td></tr>
	 *    <tr><td valign=top>SeLoadDriverPrivilege</td><td>Required to load or unload a device driver.</td></tr>
	 *    <tr><td valign=top>SeLockMemoryPrivilege</td><td>Required to lock pages in memory.</td></tr>
	 *    <tr><td valign=top>SeMachineAccountPrivilege</td><td>Required to add workstations to a domain.</td></tr>
	 *    <tr><td valign=top>SeManageVolumePrivilege</td><td>Required to managed the files on a volume.</td></tr>
	 *    <tr><td valign=top>SeProfileSingleProcessPrivilege</td><td>Required to gather profile information for a single process.</td></tr>
	 *    <tr><td valign=top>SeRemoteShutdownPrivilege</td><td>Required to shut down a remote computer.</td></tr>
	 *    <tr><td valign=top>SeRestorePrivilege</td><td>Required to restore files and directories, regardless of the ACL specified for the file.</td></tr>
	 *    <tr><td valign=top>SeSecurityPrivilege</td><td>Required to manage auditing and the NT security log.</td></tr>
	 *    <tr><td valign=top>SeShutdownPrivilege</td><td>Required to shut down the local system.</td></tr>
	 *    <tr><td valign=top>SeSyncAgentPrivilege</td><td>Required to synchronize directory service data.</td></tr>
	 *    <tr><td valign=top>SeSystemEnvironmentPrivilege</td><td>Required to modify the nonvolatile RAM of systems that use this type of memory to store configuration data.</td></tr>
	 *    <tr><td valign=top>SeSystemProfilePrivilege</td><td>Required to gather profile information about system performance.</td></tr>
	 *    <tr><td valign=top>SeSystemtimePrivilege</td><td>Required to change the system time.</td></tr>
	 *    <tr><td valign=top>SeTakeOwnershipPrivilege</td><td>Required to assume ownership of files or other objects without having an Access Control Entry (ACE) in the discretionary access control list (DACL).</td></tr>
	 *    <tr><td valign=top>SeTcbPrivilege</td><td>Required to act as part of the operating system. The holder is part of the trusted computer base.</td></tr>
	 *    <tr><td valign=top>SeUndockPrivilege</td><td>Required to remove a laptop from a docking station.</td></tr>
	 *    </table>
	 * @type object
	 * @return If successful, this function returns an SWbemServices object that is bound to the namespace on the computer specified
	 */
	this.getWMIConnection = function(computer, namespace, username, password, privileges) {
		var ret = undefined;
		try {
			getWMI.call(this);
			if (typeof username != 'string' || typeof password != 'string' || username.length===0) {
				ret = objwbemLocator.ConnectServer(computer, namespace);
			} else {
				objwbemLocator.Security_.ImpersonationLevel = wbemImpersonationLevelImpersonate;
				objwbemLocator.Security_.AuthenticationLevel = wbemAuthenticationLevelPktPrivacy;
				if (privileges) {
					for (var x=0; x<privileges.length; x++) {
						objwbemLocator.Security_.Privileges.AddAsString(privileges[x]);
					}
				}
				ret = objwbemLocator.ConnectServer(computer, namespace, username, password, '', '', 128);
			}
		} catch (ex) {
			this.logHandler.log(null, 'getWMIConnection('+ex.message+')', this);
		}
		return ret;
	};

	/**
	 * INTERNAL METHODS
	 */

	/**
	 * Returns a WScript.Shell instance
	 * @private
	 */
	var getWSHShell = function() {
		if (!window.ActiveXObject) {throw {message:'ActiveXObject unavailable'};}
		if (!wshShell) {
			try {
				wshShell = new ActiveXObject("WScript.Shell");
			} catch(ex) {
				throw {message:'ActiveX object WScript.Shell ['+ex.message+']'};
			}
		}
		return wshShell;
	};

	/**
	 * Returns a Shell.Application instance
	 * @private
	 */
	var getShell = function() {
		if (!window.ActiveXObject) {throw {message:'ActiveXObject unavailable'};}
		if (!oShell) {
			try {
				oShell = new ActiveXObject("Shell.Application");
			} catch(ex) {
				throw {message:'ActiveX object Shell.Application ['+ex.message+']'};
			}
		}
		return oShell;
	};

	/**
	 * Returns a Scripting.FileSystemObject instance
	 * @private
	 */
	var getFSO = function() {
		if (!window.ActiveXObject) {throw {message:'ActiveXObject unavailable'};}
		if (!fso) {
			try {
				fso = new ActiveXObject("Scripting.FileSystemObject");
			} catch(ex) {
				throw {message:'ActiveX object Scripting.FileSystemObject ['+ex.message+']'};
			}
		}
		return fso;
	};

	/**
	 * Returns a ADODB.Stream instance
	 * The following registry key will prevent this object from being created in IE
	 * HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\ActiveX Compatibility\{00000566-0000-0010-8000-00AA006D2EA4}
	 * @private
	 */
	var getStream = function() {
		if (!window.ActiveXObject) {throw {message:'ActiveXObject unavailable'};}
		if (!stream) {
			try {
				stream = new ActiveXObject("ADODB.Stream");
				stream.Type = 2; //adTypeText
				stream.Mode = 3; //adModeReadWrite
				stream.Charset = 'Latin1'; //Latin1, Windows-1252, utf-8, ISO-8859-1
			} catch(ex) {
				throw {message:'ActiveX object ADODB.Stream ['+ex.message+']'};
			}
		}
		return stream;
	};

	/**
	 * Returns a WbemScripting.SWbemLocator instance
	 * @private
	 */
	var getWMI = function() {
		if (!window.ActiveXObject) {throw {message:'ActiveXObject unavailable'};}
		if (!objwbemLocator) {
			try {
				objwbemLocator = new ActiveXObject("WbemScripting.SWbemLocator");
			} catch(ex) {
				throw {message:'ActiveX object WbemScripting.SWbemLocator ['+ex.message+']'};
			}
		}
		return objwbemLocator;
	};

	/**
	 * Returns a file or folder object based on path provided
	 * @private
	 */
	var getFileFolder = function(path) {
		if (fso.FileExists(path)) {
			return fso.GetFile(path);
		} else if (fso.FolderExists(path)) {
			return fso.GetFolder(path);
		} else {
			throw {message:'File/Folder not found "'+path+'"'};
		}
	};

	try {
		this.enabled = !!getFSO.call(this);
	} catch(ex){}

};
/**
 * @fileoverview Object for building large strings
 * @author Ben White (ben.x.white@jpmchase.com)
 */

/**
 * Creates an instance of the XMLBuilder object.
 * @class Provides an XML builder for javascript.<br>
 * @constructor
 * @author Ben White (ben.x.white@jpmchase.com)
 * @param {jpmc.lang.Data.format} outDataType (Optional) Output format (default: {@link jpmc.lang.Data#format jpmc.lang.Data.format.TEXT}).
 * @version 1.0 2007-08-28
 */
jpmc.util.XMLBuilder = function(outDataType) {

	var self = this;
	var indent = 0;
	var openTags = [];
	var openTag = false;
	var openAtrib = false;
	var openData = false;
	var m_outDataType = outDataType || jpmc.lang.Data.format.TEXT;

	var A = new jpmc.util.DataBuilder(m_outDataType);

	/**
	 * Gets or sets the character string to use when indenting.
	 * If set to null or an empty string, no indenting will occur. The default is \t (tab).
	 * @type string
	 */
	this.indentChars = '\t';

	/**
	 * Gets or sets the character string to use for line breaks.
	 * If set to null or an empty string, no line breaks will occur. The default is \r\n (carriage return, new line).
	 * @type string
	 */
	this.newLineChars = '\r\n';

	/**
	 * Gets or sets the character to use to quote attribute values.
	 * This must be a single quote (&#39;) or a double quote (&#34;). The default is a double quote.
	 * @type string
	 */
	this.quoteChar = '"';

	/**
	 * Writes the XML declaration
	 * @type void
	 */
	this.writeStartDocument = function() {
		A.appendString('<?xml version=' + this.quoteChar + '1.0' + this.quoteChar + ' encoding=' + this.quoteChar + 'UTF-8' + this.quoteChar + '?>');
	};

	/**
	 * Closes any open elements or attributes.
	 * @type void
	 */
	this.writeEndDocument = function() {
		this.writeEndAttribute();
		while(openTags.length>0) {
			this.writeEndElement();
		}
	};

	/**
	 * Writes the start of an attribute.
	 * @param {string} attributeName The local name of the attribute.
	 * @type void
	 */
	this.writeStartAttribute = function(attributeName) {
		if (!openTag) {throw new jpmc.lang.Exception(this, 'jpmc.util.XMLBuilder', 'There must be an open element to call writeStartAttribute', '');}
		A.appendString(' ' + attributeName + '=' + this.quoteChar);
		openAtrib = true;
	};

	/**
	 * Closes the previous WriteStartAttribute call.
	 * @type void
	 */
	this.writeEndAttribute = function() {
		if (!openAtrib) {return;}
		A.appendString(this.quoteChar);
		openAtrib = false;
	};

	/**
	 * Writes an attribute with the specified value.
	 * @param {string} attributeName The local name of the attribute.
	 * @param {string} value The value of the attribute.
	 * @type void
	 */
	this.writeAttributeString = function(attributeName, value) {
		this.writeStartAttribute(attributeName);
		this.writeString(value);
		this.writeEndAttribute();
	};

/*BLOCK WRITE METHODS*/

	/**
	 * Writes the specified start tag.
	 * @param {string} tagName The local name of the element.
	 * @type void
	 */
	this.writeStartElement = function(tagName) {
		prepareBlock();
		A.appendString('<' + tagName);

		openTags[openTags.length] = tagName;
		openTag = true;
		indent++;
	};

	/**
	 * Closes the previous writeStartElement call.
	 * @type void
	 */
	this.writeEndElement = function() {
		if (openTags.length===0) {return;}
		indent--;
		var tagName = openTags.pop();

		if (openTag) {
			this.writeEndAttribute();
			A.appendString(' />');
		} else {
			if (!openData) {writeIndent();}
			A.appendString('</' + tagName + '>');
		}

		openTag = false;
		openData = false;
	};

	/**
	 * Writes an element containing a string value.
	 * @param {string} tagName The local name of the element.
	 * @param {string} value The value of the attribute.
	 * @type void
	 */
	this.writeElementString = function(tagName, value) {
		this.writeStartElement(tagName);
		this.writeString(value);
		this.writeEndElement();
	};

	/**
	 * Writes out a &lt;![CDATA[...]]> block containing the specified text.
	 * @param {string} value The text to place inside the CDATA block.
	 * @type void
	 */
	this.writeCData  = function(value) {
		prepareBlock();
		A.appendString('<![CDATA[');
		A.appendString(value.toString());
		A.appendString(']]>');
		openData = false;
	};

	/**
	 * Writes out a comment &lt;!--...--> block containing the specified text.
	 * @param {string} value The text to place inside the comment block.
	 * @type void
	 */
	this.writeComment = function(value) {
		prepareBlock();
		A.appendString('<!--');
		A.appendString(value.toString().replace(/--/g,'- -'));
		A.appendString('-->');
		openData = false;
	};

/*DATA WRITE METHODS*/

	/**
	 * Encodes the specified data as Base64 and writes out the resulting text.
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class.
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format.
	 * @type void
	 */
	this.writeBase64  = function(data, inDataType) {
		prepareData();
		var B64 = new jpmc.codec.Base64();
		A.appendString(B64.encode(data, jpmc.lang.Data.format.TEXT, inDataType));
	};

	/**
	 * Encodes the specified data as BinHex and writes out the resulting text.
	 * @param {mixed} data Data of any type supported by the {@link jpmc.util.DataReader} class.
	 * @param {jpmc.lang.Data.format} inDataType (Optional) Input format.
	 * @type void
	 */
	this.writeBinHex  = function(data, inDataType) {
		prepareData();
		var N = new jpmc.codec.Null();
		A.appendString(N.encode(data, jpmc.lang.Data.format.HEX, inDataType));
	};

	/**
	 * Writes the given text content.
	 * @param {string} value The text to write.
	 * @type void
	 */
	this.writeString  = function(value) {
		prepareData();
		A.appendString(jpmc.helper.XML.escape(value.toString()));
	};

/*MISC*/

	/**
	 * Writes raw markup manually from a string.
	 * @param {string} value String containing the text to write.
	 * @type void
	 */
	this.writeRaw  = function(value) {
		A.appendString(value);
	};

	/**
	 * Returns the complete XML data.
	 * @type mixed
	 * @return the complete XML data.
	 */
	this.getXML = function() {return A.getValue();};


	var prepareData = function() {
		if (!openTag && !openData) {throw new jpmc.lang.Exception(this, 'jpmc.util.XMLBuilder', 'Writing data now will produce an invalid XML document', '');}
		closeTag();
	};

	var prepareBlock = function() {
		if (!openTag && openData) {throw new jpmc.lang.Exception(this, 'jpmc.util.XMLBuilder', 'Writing data now will produce an invalid XML document', '');}
		self.writeEndAttribute();
		closeTag();
		writeIndent();
	};

	var closeTag = function() {
		if (openTag && !openAtrib) {
			A.appendString('>');
			openTag = false;
			openData = true;
		}
	};

	var writeIndent = function() {
		if (A.getLength()===0) {return;}
		var I = [self.newLineChars||''];
		for (var x=0; x<indent; x++) {
			I[I.length] = self.indentChars||'';
		}
		A.appendString(I.join(''));
	};

};