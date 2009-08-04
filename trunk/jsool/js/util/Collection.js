js.util.Collection = $extends(js.core.Object,{
	add: jsool.emptyFn,
	addAll: function(collection){
		var iterator = collection.iterator();
		while(iterator.hasNext())
			this.add(iterator.next());
	},
	contains: jsool.emptyFn,
	isEmpty: function(){return this.size() == 0;},
	size: jsool.emptyFn,
	iterator: jsool.emptyFn,
	remove: jsool.emptyFn,
	toArray: jsool.emptyFn
},'js.util.Collection');