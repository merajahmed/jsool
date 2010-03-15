js.flux.SpringProxy = $extends(js.flux.Spring,{
	edgeName: null,
	component: null,
	layout: null,
	cons: function(edgeName, component,  layout){
		this.edgeName = edgeName;
		this.component = component;
		this.layout = layout;
	},
	getConstraint: function(){
		return this.layout.getConstraints(this.component).getConstraint(this.edgeName);
	},
	getMinimumValue: function(){
		return this.getConstraint().getMinimumValue();
	},
	getPreferredValue: function(){
		return this.getConstraint().getPreferredValue();
	},
	getMaximumValue: function(){
		return this.getConstraint().getMaximumValue();
	},
	getValue: function(){
		return this.getConstraint().getValue();
	},
	setValue: function(val){
		return this.getConstraint().setValue(val);
	},
	isCyclic: function(l){
		return l.isCyclic(this.getConstraint());
	},
	toString: function(){
		return "SpringProxy for " + this.edgeName + " edge of " + this.component.getName() + "."; 
	}
},"js.flux.SpringProxy");