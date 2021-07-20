// Валидаторы для телефона на странице обратного звонка page-callback.js
function validNamePC(){
	var name = $('.page-сallback').find('.form__person');
	if(name.val() != ''){
		name.removeClass('error');
		name.parent().removeClass('error');
		name.attr('placeholder','Введите Имя');
		return true;
	}else{
		name.addClass('error');
		name.parent().addClass('error');
		name.attr('placeholder','Вы не ввели Имя');
		return false;
	}
}
function validPhonePC(){
	var tel = $('.page-сallback').find('.form__phone');
	var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel.val());
	if(check == true && check != ''){
		tel.removeClass('error');
		tel.parent().removeClass('error');
		tel.attr('placeholder','Введите номер');
		return true;
	}
	else{
		tel.addClass('error');
		tel.parent().addClass('error');
		tel.attr('placeholder','Вы не ввели номер');
		return false;
	}
}
// Проверка телефона в обратном звонке.
function validSubmitPC(){
	var name = validNamePC();
	var phone = validPhonePC();
	return name && phone;
}
// Проверка отправки формы
$(function(){
	$('.page-сallback .form__callback').submit(validSubmitPC);
});