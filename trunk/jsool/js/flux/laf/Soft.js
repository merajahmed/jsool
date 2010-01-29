jsool.namespace("js.flux.laf");

js.flux.laf.Soft = (function(){
	var FLUX_PACK = js.flux;
	
	var DEGREE = (Math.PI / 180);
	
	var FONT_COLOR = 'rgb(0,0,0)';
	var FONT_FACE = 'Tahoma';
	var FONT_SIZE = 12;
	
	var BUTTON_BODY_COLOR = 'rgb(241,241,237)';
	var BUTTON_BORDER_COLOR = 'rgb(0,60,116)';
	var BUTTON_FOCUS = 'rgb(250,195,88)';
	var BUTTON_PRESSED = 'rgb(153,204,0)';
	
	var BODY_COLOR = 'rgb(236,233,216)';
	
	var BORDER_COLOR = 'rgb(172,168,153)';
	var BORDER_RADIUS = 2;
	var BORDER_WIDTH = 1;
	
	return{
		drawButton: function(ctx, x, y, w, h, text){
			ctx.save();
			
			ctx.fillStyle = BUTTON_BODY_COLOR;
			ctx.strokeStyle = BUTTON_BORDER_COLOR;
			ctx.lineWidth = BORDER_WIDTH;
			ctx.strokeRoundRect(x+1,y+1,w-2,h-2,BORDER_RADIUS);
			ctx.fillRoundRect(x+1,y+1,w-2,h-2,BORDER_RADIUS);
			
			var textW = ctx.measureText(text).width;
			
			var xCenter = Math.max(0, (w-textW)/2);
			var yCenter = Math.max(0, (h-FONT_SIZE)/2);
			
			ctx.textBaseline = js.canvas.TextBaseline.TOP;
			ctx.font = FONT_SIZE+'px '+FONT_FACE;
			ctx.fillStyle = FONT_COLOR;
			ctx.write(text,x+xCenter+1,y+yCenter+1,w-2);
			
			ctx.restore();
		},
		drawButtonFocus: function(ctx, x, y, w, h){
			ctx.save();
			
			ctx.strokeStyle = BUTTON_FOCUS;
			ctx.lineWidth = BORDER_WIDTH;
			ctx.strokeRoundRect(x+2,y+2,w-4,h-4,BORDER_RADIUS);
			
			ctx.restore();
		},
		drawButtonPressed: function(ctx, x, y, w, h){
			ctx.save();
			
			ctx.strokeStyle = BUTTON_PRESSED;
			ctx.lineWidth = BORDER_WIDTH;
			ctx.strokeRoundRect(x+2,y+2,w-4,h-4,BORDER_RADIUS);
			
			ctx.restore();
		},
		drawContainer: function(ctx, x, y, w, h){
			ctx.save();
			
			ctx.fillStyle = BODY_COLOR;
			ctx.strokeStyle = BORDER_COLOR;
			ctx.lineWidth = BORDER_WIDTH;
			ctx.strokeRoundRect(x+1,y+1,w-2,h-2,BORDER_RADIUS);
			ctx.fillRoundRect(x+1,y+1,w-2,h-2,BORDER_RADIUS);
			
			ctx.restore();
		}
	};
})();