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
		nav: false,
		navText: [ , ],
		navContainer: '',
		dots: true,
		dotsContainer: '',
		dotsData: false,
		dotsSpeed: 400,
		smartSpeed: 500,
		URLhashListener: true,
		autoplay: false,
		autoplayHoverPause: true,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		onInitialized: counter,
		onChanged: counter
	});
	function counter(event) {
		var items = event.item.count;
		var item = event.item.index + 1;
		var dotsCont = $('.slider > .owl-dots').html();
		// Удаляем счетчик слайдов
		$('#slideshow .count').remove();
		// Добавляем счетчик слайдов
		$('#slideshow .owl-count').append('<span class="count">0'+ item + '/0' + items +'</span>')

		// Удаляем старую навигацию
		$('.slider__nav .owl-dot').remove();
		// Добавляем клонированную навигацию
		$('.slider__nav .owl-dots').append(dotsCont);
		// Навигация при клике на кнопку
		$('.slider__nav .owl-dot').on('click', function () {
			owlS.trigger('to.owl.carousel', [$(this).index(), 300]);
		});
	}
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


// Загрузка основных функций шаблона
$(document).ready(function(){
	counterDate();
	slideShow();
	newsCarousel();
	pdtSlider();
});