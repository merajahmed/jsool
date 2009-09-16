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

jsool.namespace("js.canvas");

js.canvas.Canvas = $extends(js.dom.Element,{
	ccons: function(){
		this.$super('canvas');
	},
	getContext: function(){
		return new js.canvas.CanvasRenderingContext(this.dom.getContext('2d'));
	}
},'js.canvas.Canvas');

js.canvas.Canvas.BUTT = 'butt';
js.canvas.Canvas.ROUND = 'round';
js.canvas.Canvas.SQUARE = 'square';
js.canvas.Canvas.CAP = {
	BUTT : js.canvas.Canvas.BUTT,
	ROUND : js.canvas.Canvas.ROUND,
	SQUARE : js.canvas.Canvas.SQUARE
};

js.canvas.Canvas.BEVEL = 'bevel';
js.canvas.Canvas.MITER = 'miter';
js.canvas.Canvas.JOIN = {
	ROUND : js.canvas.Canvas.ROUND,
	BEVEL : js.canvas.Canvas.BEVEL,
	MITER : js.canvas.Canvas.MITER
};

js.canvas.Canvas.REPEAT = 'repeat';
js.canvas.Canvas.REPEAT_X = 'repeat-x';
js.canvas.Canvas.REPEAT_Y = 'repeat-y';
js.canvas.Canvas.NO_REPEAT = 'no-repeat';

js.canvas.Canvas.PATTERN = {
	REPEAT : js.canvas.Canvas.REPEAT,
	REPEAT_X : js.canvas.Canvas.REPEAT_X,
	REPEAT_Y : js.canvas.Canvas.REPEAT_Y,
	NO_REPEAT : js.canvas.Canvas.NO_REPEAT
};

js.canvas.TextBaseline = {
	TOP:'top',
	HANGING:'hanging',
	MIDDLE:'middle',
	ALPHABETIC:'alphabetic',
	IDEOGRAPHIC:'ideographic',
	BOTTON:'bottom'
};

//COMPOSITE OPERATION================================================
//https://developer.mozilla.org/en/Canvas_tutorial/Compositing
js.canvas.CompositeOperation = {
	DEFAULT : 'source-over',
	SOURCE_OVER : 'source-over',
	SOURCE_IN : 'source-in',
	SOURCE_OUT : 'source-out',
	SOURCE_ATOP : 'source-atop',
	DESTINATION_OVER : 'destination-over',
	DESTINATION_IN : 'destination-in',
	DESTINATION_OUT : 'destination-out',
	DESTINATION_ATOP : 'destination-atop',
	LIGHTER : 'lighter',
	DARKER : 'darker',
	XOR : 'xor',
	COPY : 'copy'
};