js.util.Map = $extends(js.core.Object,{
	containsKey: jsool.emptyFn,
	containsValue: jsool.emptyFn,
	size: jsool.emptyFn,
	clear: jsool.emptyFn,
	put: jsool.emptyFn,
	get: jsool.emptyFn,
	isEmpty: function(){return this.size() <= 0;}
},'js.util.Map');