// Отсчет даты до окончания акции
function counterDate() {
	// Устанавливаем дату обратного отсчета ММ-ДД-ГГ
	var end = $('.counter').attr('end');
	var countDownDate = new Date(end).getTime();
	// Обновление счетчика каждую секунду
	var x = setInterval(function() {
		var now = new Date().getTime();
		var distance = countDownDate - now;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		// Вывод
		$('.counter .days span').text(days);
		$('.counter .hours span').text(hours);
		$('.counter .minutes span').text(minutes);
		$('.counter .seconds span').text(seconds);
		// Счетчик завершен
		if (distance < 0) {
			clearInterval(x);
			$('.counter').hide();
		}
	}, 1000);
}

// Функция слайдеров на главной
function pdtSlider() {
	// Функция слайдер для "Акции" на главной странице
	$('#pdt__sales .products__grid.owl-carousel').owlCarousel({
		items: 1,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '#pdt__sales .owl-nav',
		navText: [ , ],
		dots: false,
		dotsContainer: '',
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100
	});

	// Функция слайдера для "Лидеры продаж" на главной странице
	$('#pdt__best .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '#pdt__best .owl-nav',
		navText: [ , ],
		dots: false,
		dotsContainer: '',
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
			0:{items:1, autoHeight: true},
			540:{items:2},
			768:{items:3},
			1200:{items:4}
		}
	});

	// Функция слайдера для Новинок на главной странице
	$('#pdt__new .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '#pdt__new .owl-nav',
		navText: [ , ],
		dots: false,
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
			0:{items:1, autoHeight: true},
			540:{items:2},
			768:{items:3},
			1200:{items:4}
		}
	});

	// Функция слайдера для Хитов продаж на главной странице
	$('#pdt__sale .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '#pdt__sale .owl-nav',
		navText: [ , ],
		dots: false,
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
			0:{items:1, autoHeight: true},
			540:{items:2},
			768:{items:3},
			1200:{items:4}
		}
	});

	// Функция слайдера для Хитов продаж на главной странице
	$('#popular .owl-carousel').owlCarousel({
		items: 3,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: false,
		navContainer: '',
		navText: [ , ],
		dots: true,
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
			540:{items:2},
			768:{items:3}
		}
	});

	// Функция слайдера для Хитов продаж на главной странице
	$('#advantages .owl-carousel').owlCarousel({
		items: 3,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: false,
		navContainer: '',
		navText: [ , ],
		dots: true,
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
			320:{items:1, autoHeight: true},
			480:{items:1},
			641:{items:2},
			768:{items:3},
			992:{items:3},
			1200:{items:3}
		}
	});

}

// Слайдер для главной страницы
function slideShow() {
	// Слайдер на главной
	var owlS = $('#slideshow .owl-carousel');
	owlS.owlCarousel({
		items: 1,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navText: [ , ],
		navContainer: '',
		dots: true,
		dotsContainer: '',
		URLhashListener: true,
		autoplay: false,
		autoplayHoverPause: true,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		smartSpeed: 500,
		dotsSpeed: 400,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true
	});
}

// Новости
function newsCarousel() {
	$("#news .owl-carousel").owlCarousel({
			items: 2,
			margin: 32,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: '#news .owl-nav',
			navText: [ , ],
			dots: false,
			autoHeight: true,
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
				0:{items:1, autoHeight: true},
				540:{items:2},
				768:{items:3}
			}
		});
}

function verticalCarousel() {
	$('#pdt__sales .product__item').each(function (){
		var t = $(this);
		var items = t.find('.product__thumblist-items')
		var item = t.find('.product__thumblist-item')

		// Атрибуты по умолчанию
		items.attr('data-prev', '1')
		items.attr('data-cur', '2')
		items.attr('data-next', '3')
		items.attr('data-length', item.length)

		// Следующий
		t.find('.product__thumblist-nav--bottom').on('click', function (){
			var cur = parseInt(items.attr('data-cur'));
			var next = cur + 1;
			var prev = cur - 1;
			// Если След слайд последний то показываем первый
			if(next > item.length) {
				next = 1;
			}
			// Если Пред. первый то показываем последний
			if(prev < 1) {
				prev = item.length;
			}
			// Обновляем атрибуты
			items.attr('data-prev', prev);
			items.attr('data-cur', next);
			items.attr('data-next', cur);
			// Добавляем класс видимости
			item.removeClass('show')
			items.find('.product__thumblist-item[data-index="'+ prev +'"]').removeClass('show');
			items.find('.product__thumblist-item[data-index="'+ cur +'"]').addClass('show');
			items.find('.product__thumblist-item[data-index="'+ next +'"]').addClass('show');
		});

		// Предыдущий
		t.find('.product__thumblist-nav--top').on('click', function (){
			var cur = parseInt(items.attr('data-prev'));
			var next = cur + 1;
			var prev = cur - 1;
			// Если След слайд последний то показываем первый
			if(next > item.length) {
				next = 1;
			}
			// Если Пред. первый то показываем последний
			if(prev < 1) {
				prev = item.length;
			}
			// Обновляем атрибуты
			items.attr('data-prev', prev);
			items.attr('data-cur', cur);
			items.attr('data-next', next);
			// Добавляем класс видимости
			item.removeClass('show')
			items.find('.product__thumblist-item[data-index="'+ prev +'"]').addClass('show');
			items.find('.product__thumblist-item[data-index="'+ cur +'"]').addClass('show');
			items.find('.product__thumblist-item[data-index="'+ next +'"]').removeClass('show');
		});
	})
}

// Загрузка основных функций шаблона
$(document).ready(function(){
	counterDate();
	slideShow();
	newsCarousel();
	pdtSlider();
	verticalCarousel();
});