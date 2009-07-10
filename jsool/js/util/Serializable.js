js.util.Serializable = Extends(js.core.Object,{
	serialize: function(){
		var proto = this.class.prototype;
		var builder = new js.util.StringBuilder();
		var type;
		
		builder.append('{');
		
		for(var prop in proto){
			type = typeof proto[prop];
			if(type == 'string'){
				builder.append(prop).append(': "').append(proto[prop]).append('",');
			}else if(type == 'number'){
				builder.append(prop).append(': ').append(proto[prop]).append(',');
			}else if(type == 'boolean'){
				builder.append(prop).append(': ').append(proto[prop] ? 'TRUE' : 'FALSE').append(',');
			}
		}
		builder.deleteCharAt(builder.length());
		builder.append('}');
		
		return builder.toString();
	}
},'js.util.Serializable');