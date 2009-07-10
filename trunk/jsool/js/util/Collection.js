js.util.Collection = Extends(js.core.Object,{
	add: js.core.Util.emptyFn,
	addAll: function(collection){
		var iterator = collection.iterator();
		while(iterator.hasNext())
			this.add(iterator.next());
	},
	contains: js.core.Util.emptyFn,
	isEmpty: function(){return this.size() == 0;},
	size: js.core.Util.emptyFn,
	iterator: js.core.Util.emptyFn,
	remove: js.core.Util.emptyFn,
	toArray: js.core.Util.emptyFn
},'js.util.Collection');