$(document).ready(function(){

	$('#description').css('min-height', $(window).height() - 50);

	$(window).on('resize', function(){
		$('#description').css('min-height', $(window).height() - 50);
	});

	$('#startSurvey').on('click', function(e){
		e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#typevisform").offset().top
    }, 500);
	});

	$('#typevisform input').on('change', function(){
		showAnswers();
	});

	$('#typevisform input').on('keyup', function(){
		showAnswers();
	});

	$('.thumbnail').on('click', function(e){
		$(this).find('input[type="radio"]').prop('checked', true);
		$(this).find('input[type="radio"]').change();
	});
});

function showAnswers(){
	var allAnswers = '';

	var radionames = [];
	var textnames = []
	$('#typevisform input').each(function(){
		var name = $(this).attr('name');
		switch($(this).attr('type')){
			case 'text':
			if(!textnames.includes(name)){
				textnames[ textnames.length ] = name;
			}
			break;
			case 'radio':
			if(!radionames.includes(name)){
				radionames[ radionames.length ] = name;
			}
			break;
		}
	});

	for(var i = 0; i < radionames.length; ++i){
		var name = radionames[i];
		var elem = '#typevisform input[name="' + name + '"]';
		$(elem).each(function(){
			if($(this).prop('checked')){
				allAnswers += $(this).attr('name') + ': ' + $(this).val() + '\n';
			}
		});
	}

	for(var i = 0; i < textnames.length; ++i){
		var name = textnames[i];
		var elem = '#typevisform input[name="' + name + '"]';
		allAnswers += name + ': ';
		var count = $(elem).length -1;
		console.log(count);
		$(elem).each(function(){
			allAnswers += $(this).val();
			if(count){
				allAnswers += '-';
			}
			count--;
		});
		allAnswers += '\n';
	}

	$('#allAnswers').html(allAnswers);

	//color checked ones
	$('#typevisform input[type="radio"]').each(function(){
		if($(this).prop('checked')){
			$(this).closest('.thumbnail').addClass('selected-img');
		}else{
			$(this).closest('.thumbnail').removeClass('selected-img');
		}
	});
}
