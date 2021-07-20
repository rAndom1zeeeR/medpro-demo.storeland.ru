// Корзина
function cartQuantity(){
	$('.cartqty').change($.debounce(300, function(){
		var quantity = $(this);
		var qVal = $(this).val();
		if(qVal >= '1'){
			var id = $(this).closest('.cart__item').data('id');
			var qty = $(this).val();
			var data = $('.cartForm').serializeArray();
			data.push({name: 'only_body', value: 1});
			$.ajax({
				data: data,
				cache:false,
				success:function(d){
					quantity.val($(d).find('.cart__item[data-id="' + id + '"] .cartqty').val());
					item = $('.cart__item[data-id="' + id + '"]');
					item.find('.cartPriceTotal span').html($(d).find('.cart__item[data-id="' + id + '"] .cartPriceTotal span').html());
					$('.cartTotal').html($(d).find('.cartTotal').html());
					c = $(d).find('.cart__item[data-id="' + id + '"] .cartqty').val();
					// Вызов функции быстрого заказа в корзине
					$('#startOrder').on('click', function() {
						startOrder();
						return false;
					});
					if(qty > c){
						$('.cart__error').remove();
						$('.cartTable').before('<div class="cart__error warning">Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div>');
						$('.cart__error').fadeIn(500).delay(2500).fadeOut(500, function(){$('.cartErr').remove();});
						$('.cartqty').removeAttr('readonly');
					}
				}
			});
		}else{
			$(this).val('1');
			$(this).trigger('change');
		}
	}));
	quantity();
}

// Удаление товара из корзины
function cartDelete(s){
	var yep = confirm('Вы точно хотите удалить товар из корзины?');
	if(yep == true){
		s.closest('.cart__item').fadeOut();
		url = s.data('href');
		$.ajax({
			url:url,
			cache:false,
			success:function(d){
				$('.cartTable').html($(d).find('.cartTable').html());
				cartQuantity();
				$('#startOrder').on('click', function() {
					startOrder();
					return false;
				});
			}
		});
	}else{
		return false;
	}
}

// Функция быстрого оформления заказа в корзине
function startOrder(){
	var globalOrder = $('#globalOrder');
	var cartTable = $('.cartTable');
	var closeOrder = $('#closeOrder');
	var startOrder = $('#startOrder');
	//объект блока куда будет выводиться форма быстрого заказа
	var OrderAjaxBlock = $('#OrderAjaxBlock');
	var urlQuickForm = '/cart/add'; // адрес страницы с формой
	// данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
	var quickFormData = [
		{name: 'ajax_q', value: 1},
		{name: 'fast_order', value: 1}
	];
	cartTable.addClass('disable');
	globalOrder.show('slow');
	closeOrder.show();
	startOrder.hide();
	$.ajax({
		type: "POST",
		cache: false,
		url: urlQuickForm,
		data: quickFormData,
		success: function(data) {
			OrderAjaxBlock.html($(data).find('.fastOrderContent').wrap('<div></div>').html());
			OrderAjaxBlock.show('slow');
			$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
			showPass();
			orderScripts();
			orderScriptsSelect();
			coupons();
			// Стили для новых селектов
			$(".form__phone").mask("+7 (999) 999-9999");
			$("#sites_client_phone").mask("+7 (999) 999-9999");
			$('#closeOrder').on('click', function() {
				cartTable.removeClass('disable');
				globalOrder.hide();
				closeOrder.hide();
				startOrder.show();
				$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
				return false;
			});
			// Валидация формы на странице оформления заказа
			$(".total__buttons button, #makeOrder").on('click', function(){
				console.log('start')
				var form = $(".fastOrder__form");
				form.validate({
					errorPlacement: function(error, element) { }
				});
				form.submit();
				return false;
			});
			// Выключение кнопки оформления заказа если не все поля заполнены
			$(".fastOrder__form [required]").blur(function(){
				if($('.fastOrder__form').valid()) {
					$(".total__buttons button").removeClass('disabled');
					$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
					$("#makeOrder").removeClass('disabled');
					$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
				} else {
					$(".total__buttons button").addClass('disabled');
					$(".total__buttons button").attr('data-tooltip', 'Заполните все поля');
					$("#makeOrder").addClass('disabled');
					$("#makeOrder").attr('data-tooltip', 'Заполните все поля');
				}
			});
			// Выключение кнопки оформления заказа если не все поля заполнены
			$(function(){
				if($('.fastOrder__form').valid()) {
					$(".total__buttons button").removeClass('disabled');
					$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
					$("#makeOrder").removeClass('disabled');
					$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
				}else{
					$(".fastOrder__form input, .fastOrder__form textarea, .fastOrder__form select").removeClass('error');
				}
			});
		}
	});
	return false;
}

// Загрузка основных функций шаблона
$(document).ready(function(){
	cartQuantity();
	// Вызов функции быстрого заказа в корзине
	$('#startOrder').on('click', function() {
		startOrder();
		return false;
	});
});