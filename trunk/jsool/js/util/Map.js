js.util.Map = Extends(js.core.Object,{
	containsKey: emptyFn,
	containsValue: emptyFn,
	size: emptyFn,
	clear: emptyFn,
	put: emptyFn,
	get: emptyFn,
	isEmpty: function(){return this.size() <= 0;}
},'js.util.Map');