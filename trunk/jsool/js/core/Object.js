var global_objects_count = 0;

js.core.Object = function(){
	this.hash = (Math.round((Math.random()*1000)) + (new Date()).getTime());
	global_objects_count++;
};

js.core.Object.prototype = {
	hash: 0,
	type: "js.core.Object",
	cls: js.core.Object,
	supercls: js.core.Object,
	hashCode: function(){
		return this.hash;
	},
	equals: function(object){
		return object == this;
	},
	toString: function(){
		return this.type + "@" + this.hash;
	},
	instanceOf: function(clazz){
		if(clazz == js.core.Object){
			return true;
		}else if(this.cls == clazz){
			return true;
		}else{
			var cls = this.cls.prototype.supercls; 
			
			do{
				if(cls == clazz){
					return true;
				}
				
				cls = cls.prototype.supercls;
			}while(cls != js.core.Object);
			
			return false;
		}
	}
};