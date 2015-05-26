$(document).on('ready', start);
function start(){
    
	var $submit = $('#input-form');
	var $input = $('#form-line');
	var $list = $('#todo-list');
	var todoArray=[];

	$.get('http://tiny-pizza-server.herokuapp.com/collections/marina/', 
		function (data) { 
			if(data instanceof Array == true ) {
				todoArray = data; 
				render(todoArray);
				console.log(todoArray); 
				var innerHtml = render(todoArray);
				$list.html(innerHtml);
				$('ul li').on('click', clickHandler)
			} 
		}
	);

	var innerHtml = render(todoArray);
	$list.html(innerHtml);

	function onPost (e) {
		e.preventDefault();
		$.post('http://tiny-pizza-server.herokuapp.com/collections/marina/',
		{
			todo: $input.val(),
			completed: false,
			deleted: false
		})
		
		$.get('http://tiny-pizza-server.herokuapp.com/collections/marina/', 
			function (data) { 
				var thisId;
				for(var id in data[0]) {
					thisId = data[0]._id;
				}
					todoArray.push({_id: thisId, todo: $input.val(), completed: false, deleted: false});
				var innerHtml = render(todoArray);
				$input.val('');
				$list.html(innerHtml);
				$('ul li').on('click', clickHandler);
			}
		);
	}

	function render(todo) {
		var array = [];
		for (var i=0; i<todoArray.length; i++) {
			var listId = todoArray[i]['_id'];
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

	$submit.on('submit', onPost);
    $('ul li').on('click', clickHandler);

	function clickHandler (e) {
    	e.target.style.textDecoration = 'line-through';
    	for(var i=0; i<todoArray.length; i++){
    		if (todoArray[i]['_id'] == $(this).attr('id')) {
    			todoArray[i]['completed'] = true; 
    			$.put ('http://tiny-pizza-server.herokuapp.com/collections/marina/'+ todoArray[i]['_id'] , 
				{
					completed: true,
				});
    		}
    	}
    	render(todoArray);
    }
}