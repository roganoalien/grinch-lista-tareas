const INDEX = (function(){

	let _$n_input,
		_$save,
		_$update;

	const _initVars = ()=>{
		_$n_input = $('#name');
		_$save = $('.save');
	};

	const _initEvents = ()=>{
		/******************
		 * FOCUS ON INPUT *
		 ******************/
		_$n_input.focus();
		/*****************
		 * CLICK ON SAVE *
		 *****************/
		_$save.on('click', function(e){
			e.preventDefault();
			let _input = $('.input').val();
			let _textarea = $('.textarea').val();
			if(_input.length > 3){
				if(_textarea.length > 3){
					$('.progress-container').removeClass('hide');
					_$save.attr('disabled', true);
					setTimeout(function(){
						TASK.save(Date.now(), _input, _textarea);
						$('.progress-container').addClass('hide');
						_$save.attr('disabled', false);
						$('.input').val('');
						$('.textarea').val('');
					}, 500);
				}
			} else{
				alert('Por favor revisa que tanto el nombre como la descripción tengan más de 3 carácteres cada uno.');
			}
		});
	};
	const _getItemsToUpdate = (id)=>{
		let _this = JSON.parse(localStorage.getItem(id));
		_this.completed = !_this.completed;
		TASK.update(id, _this);
	};

	return {
		init : function(){
			_initVars();
			_initEvents();
			TASK.getAll();
		},
		update: function(id){
			_getItemsToUpdate(id);
		}
	}
})();