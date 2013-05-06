steal('can/construct','can/observe',function(Construct,Observe){
	
	var isObserve = function(obj) {
		return obj !== null && can.isFunction(obj.attr) && obj.constructor && !!obj.constructor.canMakeObserve;
	}
	
	
	var Scope = Construct({
		init: function(data, parent){
			this._data = data;
			this._parent = parent;
		},
		get: function(attr){
			var names = attr.split('.'),
				namesLength = names.length,
				defaultObserve,
				defaultObserveName,
				j,
				lastValue,
				isHelper,
				ref;
			
			var scope = this;
			while(scope){
				
				value = scope._data
				
				if (typeof value !== 'undefined' && value !== null) {
					var isHelper //= Mustache.getHelper(ref, options);
					for (j = 0; j < namesLength; j++) {
						// Keep running up the tree while there are matches.
						if (typeof value[names[j]] !== 'undefined' && value[names[j]] !== null) {
							lastValue = value;
							value = value[name = names[j]];
						}
						// if there's a name conflict between property and helper
						// property wins
						else if(isHelper) {
							return ref;
						}
						// If it's undefined, still match if the parent is an Observe.
						else if ( isObserve(value) ) {
							defaultObserve = value;
							defaultObserveName = names[j];
							lastValue = value = undefined;
							break;
						}
						else {
							lastValue = value = undefined;
							break;
						}
					}
				}
				// Found a matched reference.
				if (value !== undefined ) {
					return {
						scope: scope,
						parent: lastValue || scope._data,
						value: value,
						name: name
					}; // Mustache.resolve(value, lastValue, name, isArgument);
				} else {
					
				}
				
				// move up to the next scope
				scope = scope._parent;
			}
			
			if( defaultObserve && 
			// if there's not a helper by this name and no attribute with this name
				/*!Mustache.getHelper(ref) &&*/ can.inArray(defaultObserveName, can.Observe.keys(defaultObserve)) === -1 ) {
				{
					return {
						scope: scope,
						parent: defaultObserve,
						name: defaultObserveName,
						value: undefined
					}
				}
			}
		},
		attr: function(attr, value){
			if(arguments.length){
				this._data.attr(attr, value)
				return this;
			} else {
				return this.get(attr).value
			}
			
		},
		add: function(data){
			return new Scope( new can.Observe(data), this );
		},
		bind: function(){
			
		}
	});
	
	return Scope;
	
})