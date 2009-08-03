js.net.HttpProxy = $extends(js.net.Proxy,{
	constructor: function(){
		js.net.Proxy.apply(this, arguments);
		this.dispatcher = new js.net.HttpRequestDispatcher();
	},
	doRequest: function(request){
		if(request.instanceOf(js.net.HttpRequest)){
			try{
				var that = this;
				var reFire = function(event){
					that.fireEvent(event);
				};
				this.dispatcher.addListeners({
					success: reFire,
					failure: reFire,
					start: reFire,
					complete: function(event){
						reFire(event);
						that.dispatcher.destroyListeners();
					},
					error: reFire
				});
				this.dispatcher.dispatch(request);
			}catch(e){
				throw new js.core.Exception('Error while dispatching request'+request, this, arguments, e);
			}
		}else{
			throw new js.core.Exception('Invalid argument type: '+request, this, arguments);
		}
	}
},'js.net.HttpProxy');