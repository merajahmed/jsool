var js = {
	util:{},
	core:{},
	html:{}
};

js.core.Object = function(){
	this.hash = 0;
	this.type = '';
	this.hashCode = function(){return 0;};
	this.instanceOf = function(cls){return false;};
};

js.core.Exception = function(){
	js.core.Object.apply(this, arguments);
};

js.util.Collection = function(){
	js.core.Object.apply(this, arguments);
	this.add = function(object){};
	this.addAll = function(object){};
	this.contains = function(object){return false;};
	this.isEmpty = function(){return false;};
	this.size = function(){return 0;};
	this.iterator = function(){};
	this.remove = function(object){};
	this.toArray = function(){return new Array();};
};

js.util.List = function(){
	js.util.Collection.apply(this, arguments);
	this.add = function(object){};
	this.addAll = function(object){};
	this.contains = function(object){return false;};
	this.isEmpty = function(){return false;};
	this.size = function(){return 0;};
	this.iterator = function(){};
	this.remove = function(object){};
	this.toArray = function(){return new Array();};
	this.get = function(index){return new Object();};
	this.clear = function(){};
	this.indexOf = function(object){return -1;};
};

js.util.ArrayList = function(){
	js.util.List.apply(this, arguments);
	this.add = function(object){};
	this.addAll = function(object){};
	this.contains = function(object){return false;};
	this.isEmpty = function(){return false;};
	this.size = function(){return 0;};
	this.iterator = function(){};
	this.remove = function(object){};
	this.toArray = function(){return new Array();};
	this.get = function(index){return new Object();};
	this.clear = function(){};
	this.indexOf = function(object){return -1;};
};

js.util.LinkedList = function(){
	js.util.List.apply(this, arguments);
	this.add = function(object){};
	this.addAll = function(object){};
	this.contains = function(object){return false;};
	this.isEmpty = function(){return false;};
	this.size = function(){return 0;};
	this.iterator = function(){};
	this.remove = function(object){};
	this.toArray = function(){return new Array();};
	this.get = function(index){return new Object();};
	this.clear = function(){};
	this.indexOf = function(object){return -1;};
};

js.util.HashSet = function(){
	js.util.Collection.apply(this, arguments);
	this.add = function(object){};
	this.addAll = function(object){};
	this.contains = function(object){return false;};
	this.isEmpty = function(){return false;};
	this.size = function(){return 0;};
	this.iterator = function(){};
	this.remove = function(object){};
	this.toArray = function(){return new Array();};
};

js.util.HashMap = function(){
	js.util.Collection.apply(this, arguments);
	this.add = function(object){};
	this.addAll = function(object){};
	this.contains = function(object){return false;};
	this.isEmpty = function(){return false;};
	this.size = function(){return 0;};
	this.iterator = function(){};
	this.remove = function(object){};
	this.toArray = function(){return new Array();};
	this.put = function(key, value){return false;};
	this.containsKey = function(key){return false;};
	this.containsValue = function(value){return false;};
};

js.util.DatePatterns = function(){
	js.core.Object.apply(this, arguments);
	this.weekdays = new Array();
	this.months = new Array();
	this.longYear = function(date){return new String();};
	this.shortYear = function(date){return new String();};
	this.longMonth = function(date){return new String();};
	this.shortMonth = function(date){return new String();};
	this.longNumericMonth = function(date){return new String();};
	this.shortNumericMonth = function(date){return new String();};
	this.longDay = function(date){return new String();};
	this.shortDay = function(date){return new String();};
	this.longWeekday = function(date){return new String();};
	this.shortWeekday = function(date){return new String();};
	this.patterns = new Array();
};


js.util.Locale = function(language){
	js.core.Object.apply(this, arguments);
	this.language = '';
	this.patterns = new js.util.DatePatterns();
};

js.util.Locale.DEFAULT = new js.util.Locale();
js.util.Locale.USA = new js.util.Locale();
js.util.Locale.BRAZIL = new js.util.Locale();

js.util.DateFormat = function(pattern){
	js.core.Object.apply(this, arguments);
	this.format = function(date){new String();};
	this.setLocale = function(locale){};
	this.parse = function(date){return new Date();};
};


js.util.Observable = function(){
	js.core.Object.apply(this, arguments);
	this.addEvent = function(string){};
	this.addListener = function(listener){};
	this.fireEvent = function(event){};
	this.destroyListeners = function(){};
};

js.util.Serializable = function(){
	js.core.Object.apply(this, arguments);
	this.serialize = function(){return new String();};
};

js.util.StringBuilder = function(object){
	js.core.Object.apply(this, arguments);
	this.append = function(string){return new StringBuilder();};
	this.clear = function(){};
	this.deleteCharAt = function(index){};
	this.length = function(){return 0;};
};

js.html.Element = function(){
	js.util.Observable.apply(this,arguments);
	this.append = function(element){};
	this.setAttribute = function(name, value){};
	this.getAttribute = function(name){return new String();};
	this.id = function(){return new String();};
	this.tag = function(){return new String();};
	this.remove = function(element){};
	this.addListener = function(listener){};
};