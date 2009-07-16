js.net.Proxy = $extends(js.util.Observable,{
	constructor: function(){
		js.util.Observable.apply(this, arguments);
		this.addEvent(['success','failure','start','complete','error']);
	},
	doRequest: emptyFn
},"js.net.Proxy");