var global_objects_count = 0;

js.core.Object = function(){
	global_objects_count++;
};

js.core.Object.prototype = {
	hash: 0,
	type: "js.core.Object",
	cls: js.core.Object,
	supercls: js.core.Object,
	hashCode: function(){
		if(this.hash == 0){
			this.hash = (Math.round((Math.random()*1000)) + (new Date()).getTime());
		}
		return this.hash;
	},
	equals: function(object){
		if(object == null) return false;
		if(typeof object != 'object') return false;		
		for(var property in this){
			if(this[property] != object[property]){
				return false;
			}
		}
		return true;
	},
	toString: function(){
		return this.type + "@" + this.hashCode();
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