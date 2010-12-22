jsool.namespace("js.ui");
(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper,
		DOC = window.document,
		offset,
		dialog,
		m = {
			down:false	
		};
	
	/**
	 * Handles the mouse moviment
	 */
	function moveHandler(ev){
		if(dialog && offset && m.down){
			dialog.setPosition(ev.x - offset.x, ev.y - offset.y);
		}
	}
	
	/**
	 * Detach the event listeners from the document after the window is released
	 */
	function upHandler(ev){
		offset = null;
		dialog = null;
		m.down=false;
		EM.un(DOC,"mousemove",moveHandler);
		EM.un(DOC,"mouseup",upHandler);
	}
	
	js.ui.Window = $extends(js.util.Observable,{
		
		cons: function(config){
			var dom;
			//Default configuration
			config = config || {} ;
			
			jsool.applyIf(config,{
				closeable:true,
				title:"Dialog",
				width: 'auto',
				height: 'auto',
				x:"0px",
				y:"0px",
				show: false
			});
			
			dom = DH.createDom({
				className:"js-dialog",
				children:[{
					tag:"h1",
					html: config.title,
					className:'no-select'
				},{
					className:"body",
					html: 'Mensagem'
				}],
				style:{
					width:config.width,
					height:config.height,
					top:config.y,
					left:config.x,
					display:config.show?'block':'none'
				},
				parent: js.dom.BODY
			});
			
			this.style = dom.style;
			EM.on(dom,'mousedown',function(ev){
				
				if(ev.source.tagName && ev.source.tagName=="H1"){

					m.down=true;
					dialog = this;

					var p = this.body.getPosition();
					offset = {
						x: ev.x-p.x,
						y: ev.y-p.y
					};
					
					EM.on(DOC,"mousemove",moveHandler);
					EM.on(DOC,"mouseup",upHandler);
					
				}
				
			},this);
			
			this.body = jsool.get(dom);
		},
		/**
		 * Shows the current window
		 */
		show: function(){
			this.style.display = 'block';
		},
		
		/**
		 * Hides the current window
		 */
		hide: function(){
			this.style.display = 'none';
		},
		
		/**
		 * Sets the position of the window on the screen
		 * 
		 * @param x The x coordinate of the window on the screen
		 * @param y The y coordinate of the window on the screen
		 */
		setPosition: function(x, y){
			this.style.top = y + 'px';
			this.style.left = x + 'px';
		},
		
		/**
		 * Sets the size of the window
		 * 
		 * @param w The width
		 * @param h The heigth
		 */
		setSize: function(w,h){
			this.style.width = w + 'px';
			this.style.height = h + 'px';
		},
		
		/**
		 * Checks it the window is visible
		 */
		isVisible: function(){
			return this.style.display != 'block';
		}
	},"js.ui.Window");
})();