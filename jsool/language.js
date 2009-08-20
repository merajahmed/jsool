//Mikhas language tools
/*
 * some regular expressions
 * http://d116.com/hacks/emacs/java-flock.el
 */

var emptyFn = function(){};
function Tolken(){}
Tolken.prototype.found = emptyFn;
Tolken.prototype.expression = /^.*/;
Tolken.prototype.validate = function(expression, offset){
	offset = offset || 0;
	while(expression.charAt(offset) == ' ') offset++;
	var fragment = expression.substring(offset);
	var match = fragment.match(this.expression);
	if(!match) return -offset;
	this.found(expression.substring(offset, offset + match[0].length));
	return offset + match[0].length;
};

function SequentialTolken(){}
SequentialTolken.prototype = new Tolken();
SequentialTolken.prototype.tolkens = [];
SequentialTolken.prototype.validate = function(expression, offset){
	offset = offset || 0;
	var currentOffset = offset;
	var valid;
	for(var i = 0; i < this.tolkens.length; i++){
		valid = this.tolkens[i].validate(expression, currentOffset);
		if(valid <= 0) return -currentOffset;
		currentOffset = valid;
	}
	this.found(expression.substring(offset, currentOffset));
	return currentOffset;
};

function CompositeTolken(){}
CompositeTolken.prototype = new Tolken();
CompositeTolken.prototype.tolkens = [];
CompositeTolken.prototype.validate = function(expression, offset){
	offset = offset || 0;
	var valid;
	for(var i = 0; i < this.tolkens.length; i++){
		valid = this.tolkens[i].validate(expression, offset);
		if(valid > 0){
			this.found(expression.substring(offset, valid));
			return valid;
		}
	}
	return -valid;
};