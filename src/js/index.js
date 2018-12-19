const INDEX = (function(){

	let _$n_input;

	const _initVars = ()=>{
		_$n_input = $('#name');
	};

	const _initEvents = ()=>{
		_$n_input.focus();
	};

	return {
		init : function(){
			_initVars();
			_initEvents();
		}
	}
})();