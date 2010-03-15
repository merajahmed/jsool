//(function(){
js.flux.Spring = $extends(js.core.Object,{
	UNSET: Number.MIN_VALUE,
	range: function(contract){
		return contract ?
				(this.getPreferredValue() - this.getMinimumValue()) :
					(this.getMaximumValue() - this.getPreferredValue()); 
	},
	getStrain: function(){
		var delta = (this.getValue() - this.getPreferredValue());
		return delta / this.range(this.getValue() < this.getPreferredValue());
	},
	setStrain: function(strain){
		this.setValue(this.getPreferredValue() + (strain * this.range(strain < 0)));
	},
	getValue: function(){
		return this.size != this.UNSER ? this.size : this.getPreferredValue();
	},
	setValue: function(val){
		if(this.size == val){
			return;
		}
		
		if(val == this.UNSET){
			this.clear();
		}else{
			this.setNonClearValue(val);
		}
	},
	clear: function(){
		this.size = this.UNSET;
	},
	setNonClearValue: function(val){
		this.size = val;
	},
	isCyclic: function(springLayout){
		return false;
	}
},"js.flux.Spring");

js.flux.StaticSpring = $extends(js.flux.Spring,{
	cons: function(min, pref, max){
		this.min = min;
		this.pref = pref;
		this.max = max;
	},
	toString: function(){
		return "StaticSpring [" + this.min + ", " + this.pref + ", " + this.max + "]";
	},
	getMinimumValue: function(){
		return this.min;
	},
	getMaximumValue: function(){
		return this.max;
	},
	getPreferredValue: function(){
		return this.pref;
	}
},"js.flux.StaticSpring");

js.flux.NegativeSpring = $extends(js.flux.Spring,{
	cons: function(spring){
		this.spring = spring;
	},
	getMinimumValue: function(){
		return -this.spring.getMinimumValue();
	},
	getMaximumValue: function(){
		return -this.spring.getMaximumValue();
	},
	getPreferredValue: function(){
		return -this.spring.getPreferredValue();
	},
	getValue: function(){
		return -this.spring.getValue();
	},
	setValue: function(val){
		this.spring.setValue(-val);
	},
	isCyclic: function(springLayout){
		return this.spring.isCyclic(springLayout);
	}
},"js.flux.NegativeSpring");


js.flux.ScaleSpring = $extends(js.flux.Spring,{
	cons: function(spring, factor){
		this.spring = spring;
		this.factor = factor;
	},
	getMinimumValue: function(){
		return Math.round((this.factor < 0 ? this.spring.getMaximumValue() : this.spring.getMinimumValue()) * this.factor);
	},
	getMaximumValue: function(){
		return Math.round((this.factor < 0 ? this.spring.getMinimumValue() : this.spring.getMaximumValue()) * this.factor);
	},
	getPreferredValue: function(){
		return Math.round(this.spring.getPreferredValue() * this.factor);
	},
	getValue: function(){
		return Math.round(this.spring.getValue() * this.factor);
	},
	setValue: function(val){
		if (val == this.UNSET) {
            this.spting.setValue(this.UNSET);
        } else {
        	this.spting.setValue(Math.round(val / this.factor));
        }
	},
	isCyclic: function(springLayout){
		return this.spring.isCyclic(springLayout);
	}
},"js.flux.ScaleSpring");

js.flux.WidthSpring = $extends(js.flux.Spring,{
	component:null,
	cons: function(component){
		this.component = component;
	},
	getMinimumValue: function(){
		return this.component.width; 
	},
	getMaximumValue: function(){
		return this.component.width;
	},
	getPreferredValue: function(){
		return this.component.width;
	}
},"js.flux.WidthSpring");

js.flux.HeightSpring = $extends(js.flux.Spring,{
	component:null,
	cons: function(component){
		this.component = component;
	},
	getMinimumValue: function(){
		return this.component.height; 
	},
	getMaximumValue: function(){
		return this.component.height;
	},
	getPreferredValue: function(){
		return this.component.height;
	}
},"js.flux.HeightSpring");

js.flux.SpringMap = $extends(js.flux.Spring,{
	spring:null,
	cons: function(spring){
		this.spring = spring;
	},
	map: jsool.emptyFn,
	inv: jsool.emptyFn,
	getMinimumValue: function(){
		return this.map(this.spring.getMinimumValue()); 
	},
	getMaximumValue: function(){
		return this.map(this.spring.getMaximumValue());
	},
	getPreferredValue: function(){
		return this.map(this.spring.getPreferredValue());
	},
	getValue: function(){
		return this.map(this.spring.getValue());
	},
	setValue: function(val){
		if(val == this.UNSET){
			this.spring.setValue(this.UNSET);
		}else{
			this.spring.setValue(this.inv(val));
		}
	},
	isCyclic: function(springLayout){
		return this.spring.isCyclic(springLayout);
	}
},"js.flux.SpringMap");

js.flux.CompoundSpring = $extends(js.flux.StaticSpring,{
	s1:null,s2:null,
	ccons: function(s1,s2){
		this.$super(this.UNSET);
		this.s1=s1;
		this.s2=s2;
	},
	toString: function(){
		return "CompoundSpring of " + this.s1 + " and " + this.s2;
	},
	clear: function(){
		this.$super.clear();
		this.min = this.max = this.pref = this.UNSET;
		this.s1.setValue(this.UNSET);
		this.s2.setValue(this.UNSET);
	},
	op: jsool.emptyFn,
	getMinimumValue: function(){
		if(this.min == this.UNSET){
			this.min = this.op(this.s1.getMinimumValue(),this.s2.getMinimumValue());
		}
		return this.min;
	},
	getMaximumValue: function(){
		if(this.max == this.UNSET){
			this.max = this.op(this.s1.getMaximumValue(),this.s2.getMaximumValue());
		}
		return this.max;
	},
	getPreferredValue: function(){
		if(this.pref == this.UNSET){
			this.pref = this.op(this.s1.getPreferredValue(),this.s2.getPreferredValue());
		}
		return this.pref;
	},
	getValue: function(){
		if(this.size== this.UNSET){
			this.size = this.op(this.s1.getValue(),this.s2.getValue());
		}
		return this.size;
	},
	isCyclic: function(springLayout){
		return springLayout.isCyclic(this.s1) || springLayout.isCyclic(this.s2); 
	}
},"js.flux.CompoundSpring");

js.flux.SumSpring = $extends(js.flux.CompoundSpring,{
	ccons: function(s1,s2){
		this.$super(s1,s2);
	},
	op: function(x,y){
		return x+y;
	},
	setNonClearValue: function(val){
		this.$super.setNonClearValue(val);
        this.s1.setStrain(this.getStrain());
        this.s2.setValue(val - this.s1.getValue());
	}
},"js.flux.SumSpring");

js.flux.MaxSpring = $extends(js.flux.CompoundSpring,{
	ccons: function(s1,s2){
		this.$super(s1,s2);
	},
	op: function(x,y){
		return Math.max(x,y);
	},
	setNonClearValue: function(val){
		this.$super.setNonClearValue(val);
		this.s1.setValue(val);
        this.s2.setValue(val);
	}
},"js.flux.MaxSpring");

jsool.apply(js.flux.Spring,{
	constrant: function(){
		if(arguments.length > 1){
			return new js.flux.StaticSpring(arguments[0],arguments[1],arguments[2]);
		}else{
			return new js.flux.StaticSpring(arguments[0],arguments[0],arguments[0]);
		}
	},
	minus: function(spring){
		return new js.flux.NegativeSpring(spring);
	},
	sum: function(s1,s2){
		return new js.flux.SumSpring(s1,s2);
	},
	max: function(s1,s2){
		return new js.flux.MaxSpring(s1,s2);
	},
	diferrence: function(s1,s2){
		return new js.flux.SumSpring(s1, new js.flux.NegativeSpring(s2));
	},
	scale: function(s1,s){
		return new js.flux.ScaleSpring(s1,s);
	},
	width: function(comp){
		return new js.flux.WidthSpring(comp);
	},
	height: function(comp){
		return new js.flux.HeightSpring(comp);
	}
});

//})();