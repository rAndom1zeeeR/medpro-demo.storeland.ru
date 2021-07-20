// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000
function addSpaces(nStr){
	return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
	if(cnt>13) { return false; }
	$(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
	num = (num==6)?0:num;
	setTimeout(function () {
		RefreshImageAction(img, num+1, cnt+1)
	}, 50);
}

// Товар. Карточка товара
function pageGoods() {
	// Слайдер доп. изображений
	$('.thumblist .owl-carousel').owlCarousel({
		items: 4,
		margin: 16,
		loop: false,
		rewind: true,
		lazyLoad: true,
		dots: false,
		nav: false,
		navText: [ , ],
		autoplay: true,
		autoplayHoverPause: true,
		autoHeight: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:2},
			480:{items:3},
			641:{items:4},
			768:{items:4},
			992:{items:3},
			1200:{items:4}
		}
	});
	// Сопутствующие товары Слайдер
	$('.related__goods .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.related__goods .owl-nav',
		navText: [ , ],
		dots: false,
		dotsContainer: '.related__goods .owl-dots',
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1},
			320:{items:1},
			481:{items:2},
			641:{items:2},
			768:{items:3},
			992:{items:3},
			1200:{items:4}
		}
	});
	// С этим товаром смотрят Слайдер
	$('.related__views .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '.related__views .owl-nav',
		navText: [ , ],
		dots: false,
		dotsContainer: '.related__views .owl-dots',
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1},
			320:{items:1},
			481:{items:2},
			641:{items:2},
			768:{items:3},
			992:{items:3},
			1200:{items:4}
		}
	});

	// Функция показать больше для Отзывов
	var opinionContent = $('.productView__opinion');
	var opinionCount = opinionContent.find('.opinion__item').length;
	if(opinionCount<=3){ opinionContent.find('.opinion__buttons').hide(); }
	opinionContent.find('.opinion__buttons .showAll').on('click',function(event){
		event.preventDefault();
		if($(this).hasClass('active')){
			$(this).removeClass('active').find('span').text("Все отзывы");
			opinionContent.find('.opinion__item').removeClass('show');
		}else{
			$(this).addClass('active').find('span').text("Скрыть все");
			opinionContent.find('.opinion__item').addClass('show');
		}
	});
	// Переключение для Положительный и Отрицательный отзыв
	$('.generally label').on('click', function(event){
		event.preventDefault();
		$('.generally label').removeClass('active');
		$('.generally input').attr('checked', false);
		$(this).addClass('active');
		$(this).next('input').attr('checked', true);
	});
	// Добавление отзыва о товаре. Рейтинг
	if($('.goodsOpinionRating').length){
		$('.goodsOpinionRating').rating();
	}
	// Ссылка на отображение формы для добавление отзыва о товаре
	$('.opinion__add').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.opinion__addForm').slideUp(600);
		}else{
			$(this).addClass('active');
			$('.opinion__addForm').slideDown(600);
			$('html, body').animate({scrollTop : jQuery('.opinion__addForm').offset().top}, 500);
		}
	});
	// Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
	$(".opinion__form .button").on('click', function(){
		var form = $(".opinion__form");
		form.validate({
			errorPlacement: function(error, element) { }
		});
		form.submit();
		return false;
	});
	// Иконка для обновления изображение капчи
	$('.captcha__refresh').click(function(){
		RefreshImageAction(this,1,1);
		$('.captcha__image').attr('src',$('.captcha__image').attr('src')+'&rand'+Math.random(0,10000));
		return false;
	});
	// Переключение табов
	function tabSwitch() {
		var tabs = $('.productView__tabs');
		var tab = tabs.find('.tab');
		var block = $('.tabs__content > div');
		tab.first().addClass('active');
		block.first().addClass('active');
		// Табы в карточке
		tab.on('click', function(){
			var id = $(this).data('tab');
			var content = tabs.find('.tabs__content > div[data-tab="'+ id +'"]');
			tab.removeClass('active');
			block.removeClass('active');
			$(this).addClass('active');
			content.addClass('active')
		});
	}
	tabSwitch();

	// Открытие зон доставки
	$('.zone__open').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.zone__list').slideUp(600);
		}else{
			$(this).addClass('active');
			$('.zone__list').slideDown(600);
		}
	});

	// Свернуть и Развернуть дополнительное описание
	$('.opinion__more').on('click', function(event) {
		event.preventDefault();
		// Старый текст ссылки
		var txtOld = $(this).text();
		// Новый текст ссылки
		var txtNew = $(this).attr('rel');
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('mask').removeClass('active');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}else{
			$(this).addClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('active').removeClass('mask');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}
	});
	// Свернуть и Развернуть отображение кнопок
	$('.opinion__text.comment').each(function (){
		var contentHeight = $(this).height();
		if(contentHeight >= 90){
			$(this).parent().find('.opinion__more').show();
			$(this).parent().find('.opinion__text.comment').addClass('mask');
		}else{
			$(this).parent().find('.opinion__more').hide();
			$(this).parent().find('.opinion__text.comment').removeClass('mask');
		}
	});
}

// Изменение кол-ва в карточке
function prodQty(){
	$('.productView__qty .quantity').change(function(){
		// Если вводят 0 то заменяем на 1
		if($(this).val() < 1){
			$(this).val(1);
		}
		// Обновление кол-ва для функций "Добавить"
		$('.goodsDataMainModificationId').val($(this).val());
		// Количество
		var val = parseInt($(this).val());
		// Цена товара без изменений
		var price = parseInt($('.productView__price .price__now').attr('content'));
		var newPrice = 0;
		// Проверяем наличие добавленных товаров вместе с основным
		if ($('.productView__form [class^="goodsID-"]').length) {
			$('.productView__form [class^="goodsID-"]').each(function(){
				// Сумма всех добавленных товаров
				newPrice += parseInt($(this).attr('data-price'))
			});
		}
		// Считаем новую сумму товара с учетом добавленных
		var multi = String(val * price + newPrice);
		// Обновляем новую сумму
		$('.productView__price .price__now').attr('data-price', multi);
		$('.productView__price .price__now').find('.num').text(addSpaces(multi));
	});
}

// Переименование названий Месяца
function monthNames() {
	if ($('.month').length){
		$('.month').each(function (){
			if ($(this).text() === 'Jan') {
				$(this).text('Января')
			}else if ($(this).text() === 'Feb') {
				$(this).text('Февраля')
			}else if ($(this).text() === 'Mar') {
				$(this).text('Марта')
			}else if ($(this).text() === 'Apr') {
				$(this).text('Апреля')
			}else if ($(this).text() === 'May') {
				$(this).text('Мая')
			}else if ($(this).text() === 'Jun') {
				$(this).text('Июня')
			}else if ($(this).text() === 'Jul') {
				$(this).text('Июля')
			}else if ($(this).text() === 'Aug') {
				$(this).text('Августа')
			}else if ($(this).text() === 'Sep') {
				$(this).text('Сентября')
			}else if ($(this).text() === 'Oct') {
				$(this).text('Октября')
			}else if ($(this).text() === 'Nov') {
				$(this).text('Ноября')
			}else if ($(this).text() === 'Dec') {
				$(this).text('Декабря')
			}
		});
	}
}

// Загрузка основных функций шаблона
$(document).ready(function(){
	pageGoods();
	goodsModification();
	prodQty();
	monthNames();
});