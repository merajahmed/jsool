jsool.namespace("js.flux.laf");

js.flux.laf.Soft = (function(){
	var FLUX_PACK = js.flux;
	
	var DEGREE = (Math.PI / 180);
	
	var FONT_COLOR = 'rgb(0,0,0)';
	var FONT_FACE = 'Tahoma';
	var FONT_SIZE = 12;
	
	var BUTTON_BODY_COLOR = 'rgb(241,241,237)';
	var BUTTON_BORDER_COLOR = 'rgb(0,60,116)';
	
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
			ctx.strokeRoundRect(x,y,w,h,BORDER_RADIUS);
			ctx.fillRoundRect(x,y,w,h,BORDER_RADIUS);
			
			var textW = ctx.measureText(text).width;
			
			var xCenter = Math.max(0, (w-textW)/2);
			var yCenter = Math.max(0, (h-FONT_SIZE)/2);
			
			ctx.textBaseline = js.canvas.TextBaseline.TOP;
			ctx.font = FONT_SIZE+'px '+FONT_FACE;
			ctx.fillStyle = FONT_COLOR;
			ctx.write(text,x+xCenter,y+yCenter,w);
			
			ctx.restore();
		},
		drawContainer: function(ctx, x, y, w, h){
			ctx.save();
			
			ctx.fillStyle = BODY_COLOR;
			ctx.strokeStyle = BORDER_COLOR;
			ctx.lineWidth = BORDER_WIDTH;
			ctx.strokeRoundRect(x,y,w,h,BORDER_RADIUS);
			ctx.fillRoundRect(x,y,w,h,BORDER_RADIUS);
			
			ctx.restore();
		}
	};
})();