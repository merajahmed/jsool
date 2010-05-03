jsool.namespace("js.net");

(function creates_RequestDispatcher(){
	js.net.RequestDispatcher = new js.util.Observable();
	
	jsool.apply(js.net.RequestDispatcher,{
		queueRequests: false,
		queue: [],
		type: "js.net.RequestDispatcher",
		dispatch: function(request){
			if(!this.dispatcher)this.prepareDispatcher();
			
			if(this.queueRequests){
				this.queue.push(request);
			}
		},
		doDispatch: function(request){
			 
		},
		prepareDispatcher: function(){
			if(this.dispatcher)return;
			if(window.XMLHttpRequest){
				try{
					this.dispatcher = new XMLHttpRequest();
				}catch(e){
					throw new js.core.Exception(e.toString());
				}
			}else{
				try{
					this.dispatcher = new ActiveXObject("Msxml2.XMLHTTP");
	            }catch(e){
	                try{
	                	this.dispatcher = new ActiveXObject("Microsoft.XMLHTTP");
	                }catch(E){
	                    throw new js.core.Exception("Could not create XMLHTTP ActiveXObject object");
	                }
	            }

			}
			
			delete this.prepareDispatcher;
		},
		serialize: function(obj){
			var b = new js.util.StringBuilder();
			
			jsool.iterate(obj,function(name, value){
				
			});
		}
	});
	
})();