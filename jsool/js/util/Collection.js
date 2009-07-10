js.util.Collection = Extends(js.core.Object,{
	add: emptyFn,
	addAll: function(collection){
		var iterator = collection.iterator();
		while(iterator.hasNext())
			this.add(iterator.next());
	},
	contains: emptyFn,
	isEmpty: function(){return this.size() == 0;},
	size: emptyFn,
	iterator: emptyFn,
	remove: emptyFn,
	toArray: emptyFn
},'js.util.Collection');