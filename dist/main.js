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

	var innerHtml = render(todoArray);
	$list.html(innerHtml);

	function onPost (e) {
		e.preventDefault();
		todoArray.push($input.val());
		$input.val('');
		var innerHtml = render(todoArray);
		$list.html(innerHtml);
		storage(todoArray);
	}

	function render(todo) {
		return '<ul><li>' + todoArray.join('</li><li>') + '</li></ul>';
	}

    function storage (elem) {
		localStorage.setItem('list', JSON.stringify(elem));
	}
	
	$submit.on('submit', onPost);
    $('ul li').on('click', function (e) {e.target.style.textDecoration = 'line-through'});
}