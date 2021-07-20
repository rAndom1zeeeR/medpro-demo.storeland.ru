// Сравнение товаров
function compare() {
	var owlCompare = $('.CompareGoodsTableTbody .owl-carousel');
	owlCompare.owlCarousel({
		items: 4,
		margin: 16,
		loop: false,
		rewind: false,
		lazyLoad: true,
		dots: false,
		nav: false,
		navContainer: '',
		navText: [ , ],
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:2},
			481:{items:2},
			641:{items:3},
			768:{items:3},
			992:{items:4},
			1200:{items:4}
		},
		onInitialized: carouselInitialized,
		onChanged: carouselInitialized
	});
	function carouselInitialized(event){
		if (event.item.count > event.page.size) {
			$('.CompareGoods__nav .owl-nav').css('display', 'block');
		}else{
			$('.CompareGoods__nav .owl-nav').css('display', 'none');
		}
	}
	$('.CompareGoods__nav .owl-nav .owl-prev').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('prev.owl.carousel');
	});
	$('.CompareGoods__nav .owl-nav .owl-next').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('next.owl.carousel');
	});
	// Сравнение товаров. Фильтр в верхней навигации. Отображение всех и различающихся характеристик товара
	$('.CompareGoods__switch').on('click', function(){
		$(this).toggleClass('switch-on');
		if ($(this).hasClass('switch-on')) {
			$(this).trigger('on.switch');
			$('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
			$('.CompareGoodsTableTbodyComparisonLine.same').hide();
		} else {
			$(this).trigger('off.switch');
			$('.CompareGoodsTableTbodyComparisonLine:hidden').show();
		}
	});
}

// Загрузка основных функций шаблона
$(document).ready(function(){
	compare()
});