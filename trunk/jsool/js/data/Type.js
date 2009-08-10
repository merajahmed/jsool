jsool.onSystemReady(function(){
	js.data.Type = {
		STRING: {
			sort: function(a, b){
				if(a > b)
					return 1;
				else if(a > b)
					return -1;
				return 0;
			},
			parse: function(object){
				return new String(object);
			}
		},
		INTEGER: {
			sort: function(a, b){
				return a - b;
			},
			parse: function(object, radix){
				if(radix == null){
					radix = 10;
				}
				return window.parseInt(object, radix);
			}
		},
		FLOAT: {
			sort: function(a, b){
				return a - b;
			},
			parse: function(object){
				return window.parseFloat(object);
			}
		},
		DATE: {
			sort: function(a, b){
				return a.getTime() - b.getTime();
			},
			formater: null,
			parse: function(object, pattern){
				var type = typeof object;
				
				if(type == 'number'){
					return new Date(window.parseInt(object));
				}else if(type == 'function'){
					return null;
				}else{
					object = object.toString();
					
					if(this.formater == null){
						this.formater = new js.util.DateFormat();
					}
					
					return this.formater.parse(object);
				}
			}
		},
		BOOLEAN: {
			sort: function(a, b){
				if(a == b)
					return 0;
				else if(a && !b)
					return 1;
				else
					return -1;
			},
			parse: function(object){
				if(object == null || object == undefined){
					return false;
				}else if(typeof object == 'number'){
					return object > 0;
				}else if(typeof object == 'string'){
					return object.toUpperCase() == 'TRUE';
				}else{
					return true;
				}
			}
		},
		OBJECT: {
			sort: function(a, b){
				if(a.compareTo){
					return a.compareTo(b);
				}else{
					return 0;
				}
			},
			parse: function(object){
				return object;
			}
		}
	};
});