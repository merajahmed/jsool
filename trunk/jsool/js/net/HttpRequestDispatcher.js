/*  JSOOL - JavaScript Object Oriented Library 
 *
 *  Copyright (c) 2009, Mikhail Domanoski.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification,
 *  are permitted provided that the following conditions are met:
 *
 *      * Redistributions of source code must retain the above copyright notice,
 *        this list of conditions and the following disclaimer.
 *
 *      * Redistributions in binary form must reproduce the above copyright notice,
 *        this list of conditions and the following disclaimer in the documentation
 *        and/or other materials provided with the distribution.
 *
 *      * Neither the name of Mikhail Domanoski nor the names of its
 *        contributors may be used to endorse or promote products derived from this
 *        software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

//REFERENCE http://code.google.com/p/mikhas/source/browse/trunk/mikhas/mikhas-script/net/Request.js?r=133
js.net.HttpRequestDispatcher = $extends(js.util.Observable,{
	cons: function(){
		//js.util.Observable.apply(this, arguments);
		this.addEvent(['success','failure','start','complete','error']);
	},
	dispatcher: null,
	dispatch: function(request){
		if(!request){
			throw new js.core.Exception('Null request', this, arguments);
		}
		
		if(!request.instanceOf(js.net.HttpRequest)){
			throw new js.core.Exception('Invalid argument type: '+ request.type, this, arguments);
		}
		
		if(!this.dispatcher){
			try{
				this.prepareDispatcher();
			}catch(e){
				throw new js.core.Exception('Could not prepare the dispatcher object.', this, arguments, e);
			}
		}
		
		try{
			if(request.method == 'GET'){
				if(request.async)
					this.doAsyncGet(request);
				else
					this.doSyncGet(request);
			}else if(request.method == 'POST'){
				if(request.async)
					this.doAsyncPost(request);
				else
					this.doSyncPost(request);
			}
		}catch(e){
			throw new js.core.Exception('An error occured while executing request', this, arguments, e);
		}
	},
	prepareDispatcher: function(){
		if(this.dispatcher)return;
		if(window.XMLHttpRequest){
			try{
				this.dispatcher = new XMLHttpRequest();
			}catch(e){
				throw new js.core.Exception(e.toString(),this, arguments, e);
			}
		}else{
			try{
				this.dispatcher = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                try{
                	this.dispatcher = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(E){
                    throw new js.core.Exception("Could not create XMLHTTP ActiveXObject object", this, arguments, E);
                }
            }

		}
	},
	doAsyncGet: function(request){
		var url = request.url + '?' + request.getParams();

		try{
			this.fireEvent({type:'start', request: this.dispatcher});
			this.dispatcher.open(request.method, url, true);
			var that = this;
			this.dispatcher.onreadystatechange = function(){
				var state = that.dispatcher.readyState;
				/* * * * * * * * * * * * * * * * *
				 * Ready states                  *
				 * 0 = not initialized           *
				 * 1 = setted up                 *
				 * 2 = sent                      *
				 * 3 = in process                *
				 * 4 = complete                  *
				 * * * * * * * * * * * * * * * * */
				if(state == 4){
					try{
						that.doCallback(request);
					}catch(e){
						that.fireEvent({type:'error', request: that.dispatcher});
						throw new js.core.Exception('Error while executing callback', that, null, e);
					}
					that.fireEvent({type:'complete', request: that.dispatcher});
				}
			};
			this.dispatcher.send(null);
		}catch(e){
			this.fireEvent({type:'error', request: that.dispatcher});
			throw new js.core.Exception(e.toString(), this, arguments);
		}
	},
	doSyncGet: function(request){
		var url = request.url + '?' + request.getParams();
		
		try{
			this.fireEvent({type:'start', request: this.dispatcher});
			this.dispatcher.open(request.method, url, false);
			this.dispatcher.send(null);
		}catch(e){
			this.fireEvent({type:'error', request: this.dispatcher});
			throw new js.core.Exception(e.toString(), this, arguments);
		}
		
		try{
			this.doCallback(request);
		}catch(e){
			this.fireEvent({type:'error', request: this.dispatcher});
			throw new js.core.Exception('Error while executing callback', this, arguments, e);
		}
		this.fireEvent({type:'complete', request: this.dispatcher});
	},
	doAsyncPost: function(request){
		var url = request.url;

		try{
			this.fireEvent({type:'start', request: this.dispatcher});
			this.dispatcher.open(request.method, url, true);
			
			this.dispatcher.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            this.dispatcher.setRequestHeader("Content-length", request.length);
            this.dispatcher.setRequestHeader("Connection", "close");

			
			var that = this;
			this.dispatcher.onreadystatechange = function(){
				var state = that.dispatcher.readyState;
				/* * * * * * * * * * * * * * * * *
				 * Ready states                  *
				 * 0 = not initialized           *
				 * 1 = setted up                 *
				 * 2 = sent                      *
				 * 3 = in process                *
				 * 4 = complete                  *
				 * * * * * * * * * * * * * * * * */
				if(state == 4){
					try{
						that.doCallback(request);
					}catch(e){
						that.fireEvent({type:'error', request: that.dispatcher});
						throw new js.core.Exception('Error while executing callback', that, null, e);
					}
					that.fireEvent({type:'complete', request: that.dispatcher});
				}
			};
			this.dispatcher.send(request.getParams());
		}catch(e){
			this.fireEvent({type:'error', request: that.dispatcher});
			throw new js.core.Exception(e.toString(), this, arguments);
		}
	},
	doSyncPost: function(request){
		var url = request.url + '?' + request.getParams();
		
		try{
			this.fireEvent({type:'start', request: this.dispatcher});
			this.dispatcher.open(request.method, url, false);
			
			this.dispatcher.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            this.dispatcher.setRequestHeader("Content-length", request.length);
            this.dispatcher.setRequestHeader("Connection", "close");
			
			this.dispatcher.send(request.getParams());
		}catch(e){
			this.fireEvent({type:'error', request: this.dispatcher});
			throw new js.core.Exception(e.toString(), this, arguments);
		}
		
		try{
			this.doCallback(request);
		}catch(e){
			this.fireEvent({type:'error', request: this.dispatcher});
			throw new js.core.Exception('Error while executing callback', this, arguments, e);
		}
		this.fireEvent({type:'complete', request: this.dispatcher});
	},
	doCallback: function(request){
		if(this.dispatcher.status < 400){
			request.callback('success', this.dispatcher['response'+request.responseType]);			
			this.fireEvent({type:'success', request: this.dispatcher});
		}else{
			request.callback('failure', this.dispatcher['response'+request.responseType]);			
			this.fireEvent({type:'failure', request: this.dispatcher});
		}
	}
},'js.net.HttpRequestDispatcher');