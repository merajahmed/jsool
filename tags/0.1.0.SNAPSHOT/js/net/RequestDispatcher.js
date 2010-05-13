jsool.namespace("js.net");

(function creates_RequestDispatcher(){
	js.net.RequestDispatcher = new js.util.Observable();
	
	var RD = js.net.RequestDispatcher,
		dispatcher = null,
		requestQueue = [],
		running = false;
	
	//Prepares the XMLHttpRequest object
	function prepareDispatcher(){
		if(dispatcher) return;
		if(window.XMLHttpRequest){
			try{
				dispatcher = new XMLHttpRequest();
			}catch(e){
				throw new js.core.Exception(e.toString());
			}
		}else{
			try{
				dispatcher = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                try{
                	dispatcher = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(E){
                    throw new js.core.Exception("Could not create XMLHTTP ActiveXObject object");
                }
            }

		}
	}
	
	function doDispatch(request){
		if(!dispatcher) prepareDispatcher();
		
		dispatcher.open(request.method||RD.method, request.url, jsool.isDefined(request.async)?request.async:RD.async);
		//dispatcher.send();
	}
	
	jsool.apply(RD,{
		queueRequests: false,
		type: "js.net.RequestDispatcher",
		method: "GET",
		async: true,
		dispatch: function(request){
			if(!this.dispatcher)this.prepareDispatcher();
			
			if(this.queueRequests){
				this.queue.push(request);
				dispatchQueue();
			}else{
				doDispatch(request);
			}
		}
	});
	
})();