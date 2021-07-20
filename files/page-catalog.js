// Товары. Категории
function catalog() {
	// Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
	$('.filter__item input').on('click', function(){
		$(this)[0].form.submit();
	});

	$('.filtersActive input').on('click', function(){
		$(this)[0].form.submit();
	});

	// Боковое меню сохранение открытой вложенности
	$('.collapsible:not(".active")').find('.collapsible__content').css('display', 'none');
	$('.collapsible__click').on('click', function(event){
		event.preventDefault();
		if ($(this).closest('.collapsible').hasClass('active')) {
			$(this).parent().find('.collapsible__content').slideUp(600);
			$(this).closest('.collapsible').removeClass('active');
		} else {
			$(this).parent().find('.collapsible__content').slideDown(600);
			$(this).closest('.collapsible').addClass('active');
		}
	});
}

// Фильтр по ценам
function priceFilter() {
	var
			priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text()),  // Минимальное значение цены для фильтра
			priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text()),  // Максимальное значение цены для фильтра
			priceSliderBlock = $('#goods-filter-price-slider'), // Максимальное значение цены для фильтра
			priceInputMin = $("#goods-filter-min-price"), // Поле ввода текущего значения цены "От"
			priceInputMax = $("#goods-filter-max-price"), // Поле ввода текущего значения цены "До"
			priceSubmitButtonBlock = $(".goodsFilterPriceSubmit");  // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.

	// Изменяет размер ячеек с ценой, т.к. у них нет рамок, есть смысл менять размеры полей ввода, чтобы они выглядили как текст
	function priceInputsChangeWidthByChars() {
		// Если есть блок указания минимальной цены
		if(priceInputMin.length) {
			priceInputMin.css('width', (priceInputMin.val().length*8 + 30) + 'px');
			priceInputMax.css('width', (priceInputMax.val().length*8 + 50) + 'px');
		}
	}

	// Слайдер, который используется для удобства выбора цены
	priceSliderBlock.slider({
		range: true,
		min: priceFilterMinAvailable,
		max: priceFilterMaxAvailable,
		values: [
			parseInt($('#goods-filter-min-price').val())
			,parseInt($('#goods-filter-max-price').val())
		],
		slide: function( event, ui ) {
			priceInputMin.val( ui.values[ 0 ] );
			priceInputMax.val( ui.values[ 1 ] );
			priceSubmitButtonBlock.css('display', 'flex');
			priceInputsChangeWidthByChars();
		}
	});
	// При изменении минимального значения цены
	priceInputMin.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal < priceFilterMinAvailable) {
			newVal = priceFilterMinAvailable;
		}
		priceSliderBlock.slider("values", 0, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceInputsChangeWidthByChars();
	});
	// При изменении максимального значения цены
	priceInputMax.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal > priceFilterMaxAvailable) {
			newVal = priceFilterMaxAvailable;
		}
		priceSliderBlock.slider("values", 1, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceInputsChangeWidthByChars();
	});
	// Обновить размеры полей ввода диапазона цен
	priceInputsChangeWidthByChars();

	// Активный фильтр цены
	if (priceInputMin.val() > priceFilterMinAvailable || priceInputMax.val() < priceFilterMaxAvailable) {
		$('.filters-price').addClass('hasFilters');
		$('.toolbar').addClass('hasFilters');
	}else{
		$('.filters-price').removeClass('hasFilters');
		$('.toolbar').removeClass('hasFilters');
	}

}

// Фильтры открыть
function filtersOpen() {
	$('.filters__open').on('click', function () {
		$.fancybox.open({
			src: '#filters',
			type: 'inline',
			smallBtn: true,
			touch: false,
			opts: {
				afterShow: function (instance, current) {
					console.info('done!');
				}
			}
		});
	});
}

// Загрузка основных функций шаблона
$(document).ready(function(){
	catalog();
	priceFilter();
	filtersOpen();
});

