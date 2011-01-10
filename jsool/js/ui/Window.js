jsool.namespace("js.ui");
(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper,
		DOC = window.document,
		// Offset between the mouse pointer and the 0x0 of the window
		offset,
		// The current moving dialog
		dialog,
		// Flags if the mouse is down
		mouseDown = false,
		// Stores the browser window size
		WS = jsool.windowSize(),
		// Keeps a value inside a range
		range = function(min, val, max){
			return Math.max(Math.min(val,min),max);
		};


	/*
	 * Handles when the window is resized setting the window size variable 
	 */
	var resizeHandler = EM.on.wrap(window,'resize',function(){
		WS = jsool.windowSize();
	});
	
	/*
	 * When the document is ready, append the resize handler
	 */
	jsool.onReady(resizeHandler);
	
	/*
	 * Handles the mouse moviment
	 */
	function moveHandler(ev){
		if(dialog && offset && mouseDown){
			
			var x = ev.x - offset.x,//Calculated X position
				//Calculated Y position
				y = ev.y - offset.y,
				// Max X position
				mx = WS.width - dialog.size.width - 2,
				// Max Y position
				my = WS.height - dialog.size.height - 2;
			
			dialog.setPosition(
						range(mx,x,0),
						range(my,y,0)
					);
		}
	}
	
	/*
	 * Detach the event listeners from the document after the window is released
	 */
	function upHandler(ev){
		moveHandler(ev);
		offset = null;
		dialog = null;
		mouseDown=false;
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
			
			// Created the window DOM
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
			
			// shortcut for the style
			this.style = dom.style;
			
			// add event listener for the dragger
			EM.on(dom,'mousedown',function(ev){
				
				if(ev.source.tagName && ev.source.tagName=="H1"){

					mouseDown=true;
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
			
			// The wrapped window body
			this.body = jsool.get(dom);
			// The window box
			this.size = this.body.getSize();
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
			this.size = this.body.getSize();
		},
		
		/**
		 * Checks it the window is visible
		 */
		isVisible: function(){
			return this.style.display != 'block';
		}
	},"js.ui.Window");
})();