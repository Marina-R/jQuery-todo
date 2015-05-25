$(document).on('ready', start);
function start(){
	// localStorage.clear();
    
	var $submit = $('#input-form');
	var $input = $('#form-line');
	var $list = $('#todo-list');
	var todoArray=[];

	if (localStorage.getItem('list') === null) {
		todoArray = [];
	} else {
		todoArray = JSON.parse(localStorage.getItem('list'));
	}
	render(todoArray);

	var counter = 0;
	console.log(counter);

	if (localStorage.getItem('counter') == null) {
		counter = 0;
	} else {
		counter = JSON.parse(localStorage.getItem('counter'));
	}

	var innerHtml = render(todoArray);
	$list.html(innerHtml);

	function onPost (e) {
		e.preventDefault();
		todoArray.push({id: counter, todo: $input.val(), completed: false, deleted: false});
		counter++;
		$input.val('');
		var innerHtml = render(todoArray);
		$list.html(innerHtml);
		$('ul li').on('click', clickHandler);
		storage('list', todoArray);
		storage ('counter', counter);
	}

	function render(todo) {
		var array = [];
		for (var i=0; i<todoArray.length; i++) {
			var listId = todoArray[i]['id'];
			console.log(listId);
			var myTodo = todoArray[i]['todo'];
			if (todoArray[i]['completed'] == true) {	
				array.push('<li id="' + listId + '" style = "text-decoration:line-through">' + myTodo);
				console.log(array);
			} 
			else if (todoArray[i]['deleted'] == true) {
				array.push('<li id="' + listId + '" style = "display:none">' + myTodo);
			} else {
			array.push('<li id="' + listId + '">' + myTodo);
			}
		}
		return '<ul>' + array.join('</li>') + '</li></ul>';
	}

    function storage (key, elem) {
		localStorage.setItem(key, JSON.stringify(elem));
	}

	$submit.on('submit', onPost);
    $('ul li').on('click', clickHandler);

	function clickHandler (e) {
    	e.target.style.textDecoration = 'line-through'
    	for(var i=0; i<todoArray.length; i++){
    		if (todoArray[i]['id'] == $(this).attr('id'))
    			{todoArray[i]['completed'] = true; break;}
    	}
    	console.log(todoArray);
    	storage('list', todoArray);
    }
}