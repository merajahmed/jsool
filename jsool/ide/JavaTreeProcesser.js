function Escope(parent){
	this.parent = parent;
}

Escope.prototype = new Object();

Escope.prototype.type = "root";
Escope.prototype.parent = new Escope();
Escope.prototype.children = new Array();

Escope.ROOT_ESCOPE = Escope.prototype.parent;
Escope.prototype.getParent = function(){
	return this.parent;
};




var JavaTreeProcesser = (function(){
	var stack;
	
	function process(tree){
		stack = [];
		var i = 0, c;
		
		while((c = tree.getChild(i++))){
			console.info("text",c,"type",c.getType());
		}
	}

	return {
		processTree : process
	};
})();