const TASK = (function(){

	let task = {
		id: 'default',
		name: 'default',
		description: 'default',
		completed: false
	}

	const _save = (id, name, description)=>{
		task.id = id;
		task.name = name;
		task.description = description;
		localStorage.setItem(task.id, JSON.stringify(task));
		console.warn('Saved: ', JSON.stringify(task));
		$('.table tbody').append(
			`<tr id="${task.id}">
				<td class="t-id">${task.id}</td>
				<td class="t-name">${task.name}</td>
				<td class="t-description">${task.description}</td>
				<td>
					<a href="#completada" class="button no-color update-this" onClick="INDEX.update(${task.id})">Completada</a>
					<a href="#borrar" class="button is-danger delete-this" onClick="TASK.delete(${task.id})">Borrar</a>
				</td>
			</tr>`
		);
	};

	const _update = (id, obj)=>{
		localStorage.setItem(id, JSON.stringify(obj));
		let $temp = $(`#${id} .update-this`);
		console.warn(`Updated:`, JSON.stringify(obj));
		if($temp.hasClass('no-color')){
			$temp.removeClass('no-color').addClass('is-success');
		} else{
			$temp.removeClass('is-success').addClass('no-color');
		}
	};

	const _delete = (id)=>{
		console.warn('Deleted: ', localStorage.getItem(id));
		$(`#${id}`).remove();
		localStorage.removeItem(id);
	};

	const _getAll = ()=>{
		if(localStorage.length === 0){
			return console.log('Todavía no tienes tareas registradas');
		} else{
			for ( var i = 0; i < localStorage.length; ++i ) {
				let _item = JSON.parse(localStorage.getItem( localStorage.key( i ) ));
				console.log(_item);
				let _date = new Date(_item.id);
				$('.table tbody').append(
					`<tr id="${_item.id}">
						<td>${_date.toLocaleDateString()}</td>
						<td>${_item.name}</td>
						<td>${_item.description}</td>
						<td>
							<a href="#completada" class="button no-color update-this" onClick="INDEX.update(${_item.id})">Completada</a>
							<a href="#borrar" class="button is-danger delete-this" onClick="TASK.delete(${_item.id})">Borrar</a>
						</td>
					</tr>`
				);
			}
		}
	};

	return {
		save : function(id, name, description){
			_save(id, name, description);
		},
		update : function(id, obj){
			_update(id, obj);
		},
		delete: function(id){
			_delete(id);
		},
		getAll: function(){
			_getAll();
		}
	}
})();