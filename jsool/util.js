js.util = {};
//LINKEDLIST=========================================================
js.util.LinkedList = js.Extends(Object, {
	constructor: function(){
		Object.apply(this, arguments);
		this.header = {element: null, next: null, previous: null};
		this.header.next = this.header.previous = this.header;
	},
	header: null,
	last: null,
	_size: 0,
	_newEntry: function(el, nex, prev){
		return {element: el, next: nex, previous: prev};
	},
	_addBefore: function(entry, before){
		var node = this._newEntry(entry, before, before.previous);
		node.previous.next = node;
		node.next.previous = node;
		this._size++;
	},
	_entry: function(index){
		if(index < 0 || index >= this._size)
			throw new Exception('Index Out Of Bounds: '+index, this);
		
		var e = this.header;
		if (index < (this._size >> 1)) {
            for (var i = 0; i <= index; i++)
                e = e.next;
        } else {
            for (var j = this._size; j > index; j--)
                e = e.previous;
        }
        return e;
	},
	_remove: function(entry){
		if(entry == this.header)
			throw new Exception('No Such Element',this);
		
        var result = entry.element;
        entry.previous.next = entry.next;
        entry.next.previous = entry.previous;
        entry.next = entry.previous = null;
        entry.element = null;
        this._size--;
	},
	add: function(object){
		this._addBefore(object, this.header);
	},
	get: function(index){
		return this._entry(index).element;
	},
	set: function(obj, index){
		var e = this._entry(index);
		e.element = obj;
	},
	remove: function(obj){
		if(typeof obj == 'number')
			this._remove(this._entry(obj));
		else if(typeof obj == 'object')
			for (var e = this.header.next; e != this.header; e = e.next) {
                if (obj == e.element) {
                    this._remove(e);
                }
            }
	},
	isEmpty: function(){
		return this._size == 0;
	},
	clear: function(){
		var e = this.header.next;
        while (e != this.header) {
            var next = e.next;
            e.next = e.previous = null;
            e.element = null;
            e = next;
        }
        this.header.next = this.header.previous = this.header;
        this._size = 0;
	},
	addAll: function(array){
		if(array.iterator){
			var i = array.iterator();
			while(i.hasNext()){
				this.add(i.next());
			}
		}else{
			for(var j = 0; j < array.length; k++)
				this.add(array[j]);
		}
	},
	toArray: function(){
		var arr = new Array();
		for(var e = this.header.next; e != this.header; e = e.next)
			arr.push(e.element);
		return arr;
	},
	indexOf: function(object){
		var index = 0;
        for (var e = this.header.next; e != this.header; e = e.next) {
            if (object  == e.element)
                return index;
            index++;
        }
        return -1;
	},
	contains: function(object){
		return this.indexOf(object) != -1;
	},
	iterator: function(){
		var list = this;
		return {
			size: list._size,
			nextNode: list.header.next,
			index: 0,
			hasNext: function(){				
				return this.nextNode != list.header;
			},
			next: function(){
				if(!this.hasNext())
					throw new Exception('No Such Element', {type: 'LinkedListIterator'});
				
				var node = this.nextNode;
				this.nextNode = node.next;
				this.index ++;
				return node.element;
			},
			nextIndex: function(){
				return this.index + 1;
			}
		};
	},
	size: function(){
		return this._size;
	},
	clone: function(){
		var copy = new js.util.LinkedList();
		copy.addAll(this);
		return copy;
	},
	every: function(fn){
		var list = (this);
		var i = list.iterator();
		while(i.hasNext()) fn(i.next());
	}
}, 'js.util.LinkedList');
//HASH SET===========================================================
js.util.HashSet = js.Extends(Object, {
	constructor: function(){
		Object.apply(this,arguments);
		this.set = {};
	},
	set: null,
	_size: 0,
	add: function(obj){
		var type = typeof obj;
		
		if(type != 'number' && type != 'string'){
			if(type != 'object' && !obj.hashCode){
				throw new Exception("Invalid argument type: "+obj.toString(), this);
			}
		}
		
		var hash = this.mapCode(obj);
		if(!this.set[hash])
			this._size++;
		
		this.set[hash] = obj;
		
		return true;
	},
	addAll: function(collection){
		var i = collection.iterator();
		while(i.hasNext())this.add(i.next());
	},
	mapCode: function(key){
		if(key.hash)
			return key.hash;
		else
			return key.toString();
	},
	contains: function(obj){
		if(obj == 'toString') return null;
		var hash = this.mapCode(obj);
		return this.set[hash] != null;
	},
	clear: function(){
		this._size = 0;
		this.set = {};
	},
	remove: function(obj){
		this._size--;
		delete this.set[this.mapCode(obj)];
	},
	size: function(){
		return this._size;
	},
	toArray: function(){
		var arr = new Array();
		for(var p in this.set) arr.add(this.set[p]);
		return arr;
	},
	iterator: function(){
		return this.toArray().iterator();
	},
	join: function(separator){
		var result = [];
		for(var p in this.set){
			result.push(p);
		}
		return result.join(separator);
	}
}, 'js.util.HashSet');
//HASHMAP============================================================
js.util.HashMap = js.Extends(Object,{
	constructor: function(){
		Object.apply(this, arguments);
		this.keys = new js.util.HashSet();
		this.values = new js.util.HashSet();
		this.map = {};
	},
	keys: null,
	values: null,
	map: null,
	_size: 0,
	put: function(key, value){
		var type = typeof key;
		
		if(type != 'number' && type != 'string'){
			if(type != 'object' && !key.hash){
				throw new Exception("Invalid key element: "+key.toString(), this);
			}
		}
		
		var hash = this.mapCode(key);
		
		if(this.keys.contains(key)){
			this.remove(key);
			this._size--;
		}
		
		this.keys.add(key);
		this.values.add(value);
		this._size++;
		
		this.map[hash] = value;
		
		return true;
	},
	containsKey: function(key){
		return this.keys.contains(key);
	},
	containsValue: function(value){
		return this.values.contains(value);
	},
	get: function(key){
		return this.map[this.mapCode(key)];		
	},
	size: function(){
		return this._size;	
	},
	remove: function(key){
		var el = this.get(key);
		if(el == null) return false;
		
		this.keys.remove(key);
		this.values.remove(el);
		
		delete this.map[this.mapCode(key)];
		
		this._size--;
		
		return true;
	},
	mapCode: function(key){
		if(key.propertyIsEnumerable('hash'))
			return key.hash;
		else
			return key.toString();
	},
	isEmpty: function(){
		return this._size == 0;
	}
}, "js.util.HashMap");
//LINKEDMAP==========================================================
js.util.LinkedMap = js.Extends(Object,{
	constructor: function(){
		Object.apply(this, arguments);
		this.keys = new js.util.LinkedList();
		this.values = new js.util.LinkedList();
	},
	keys: null,
	values: null,
	_size: 0,
	put: function(key, value){
		var i = this.keys.indexOf(key);
		
		if(i > -1){
			this.values.set(value, i);
		}else{
			this.values.add(value);
			this.keys.add(key);
			this._size++;
		}
	},
	containsKey: function(key){
		return this.keys.indexOf(key) != -1;
	},
	containsValue: function(value){
		return this.values.indexOf(value) != -1;
	},
	get: function(key){
		var i = this.keys.indexOf(key);
		if(i < 0)
			return null;
		
		return this.values.get(i);
	},
	size: function(){
		return this._size;
	},
	remove: function(key){		
		var i = this.keys.indexOf(key);
		if(i < 0)
			return;
		
		this.values.remove(i);
		this.keys.remove(i);
		this._size--;
	},
	isEmpty: function(){
		return this._size == 0;
	}
}, "js.util.LinkedMap");
//EVENT==============================================================
js.util.Event = js.Extends(Object, {
	constructor: function(config){
		if(!config.type || !config.source)
			throw new Exception('Invalid Argument Exception: The Event configuration must have at least the type and the source.',this);
		this.when = js.getTime();
		if(config != null){
			for(var p in config){
				this[p] = config[p];
			}
		}
	},
	source: null,
	when: 0,	
	type: ''
}, 'js.util.Event');
//NATIVE EVENT========================================================
js.util.NativeEvent = js.Extends(js.util.Event, {
	constructor: function(nativeEvent, config){
		var event = nativeEvent || window.event;
		for(var p in event) this[p] = event[p];
		if(config) for(var q in config) this[q] = config[q];
	}
}, 'js.util.NativeException');
//MOUSE EVENT========================================================
js.util.MouseEvent = js.Extends(js.util.NativeEvent, {
	constructor: function(nativeEvent, config){		
		nativeEvent = nativeEvent || window.event;
		this.type = nativeEvent.type;
		this.alt = nativeEvent.altKey;
		this.ctrl = nativeEvent.ctrlKey;
		this.shift = nativeEvent.shiftKey;
		this.x = nativeEvent.pageX || nativeEvent.clientX + document.body.scrollLeft;
		this.y = nativeEvent.pageY || nativeEvent.clientY + document.body.scrollTop;
		nativeEvent.cancelBubble = true;
		if(config != null){
			for(var p in config){
				this[p] = config[p];
			}
		}
	},	
	alt: false,
	shift: false,
	ctrl: false,
	button: 0,
	x: 0,
	y: 0
}, 'js.util.MouseEvent');
//KEY EVENT==========================================================
js.util.KeyEvent = js.Extends(js.util.NativeEvent, {
	constructor: function(event, config){		
		event = event || window.event;
		this.type = event.type;
		this.alt = event.altKey;
		this.ctrl = event.ctrlKey;
		this.shift = event.shiftKey;
		this.key = event.keyCode || event.which;
		event.cancelBubble = true;
		
		if(config != null){
			for(var p in config){
				this[p] = config[p];
			}
		}
	},	
	alt: false,
	shift: false,
	ctrl: false,
	key: null
}, 'js.util.KeyEvent');
//STRING BUILDER=====================================================
js.util.StringBuilder = js.Extends(Object, {
	constructor: function(object){
		this.buffer = new Array();
		if(object)this.append(object);
	},
	buffer: null,
	append: function(object){
		if(typeof object == 'string'){
			this.buffer.add(object);
		}else{
			this.buffer.add(object.toString());
		}
	},
	clear: function(){
		this.buffer.clear();
	},
	toString: function(){
		return this.buffer.join("");
	}
}, 'js.util.StringBuilder');
//TIME ITERATOR======================================================
js.util.TimeIterator = js.Extends(Object, {
	constructor: function(interval){
		this.superclass.apply(this, arguments);
		if(interval) this.setInterval(interval);
		this.state = this.READY;
	},
	READY: 0,
	RUN: 1,
	STOP: 2,
	interval: 10,
	timer: null,		
	state: null,
	setInterval: function(interval){
		if(typeof interval != 'number'){
			throw new Exception("Invalid argument type: "+ typeof interval, this);
		}
		this.interval = interval;
	},
	start: function(){
		var that = this;
		if(this.state == this.READY){
			this.state = this.RUN;
			this.timer = window.setInterval(function(){that.run();return null;}, this.interval);
		}
	},
	run: function(){
		switch(this.state){
			case 2:
				this.stop();
				this.state = this.READY;
				break;
			case 1:
				this.state = this.iterate();
				break;
		}
	},
	stop: function(){
		window.clearInterval(this.timer);
	},
	iterate: function(){return 2;},
	setIteration: function(fn){
		this.iterate = fn;
	}
}, "js.util.TimeIterator");