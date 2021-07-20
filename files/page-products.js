// Функция выбора модификаций
function quickViewMod() {
	// Получение центральной разметки страницы (для быстрого просмотра)
	$(document).ready(function(){
		$.fn.getColumnContent = function() {
			var block = ($(this).length && $(this).hasClass('productViewBlock') ? $(this).filter('.productViewBlock') : $('.productViewBlock:eq(0)'));
			block.each(function(){
				// Удаляем все блоки, которые не отображаются в быстром просмотре.
				$(this).children().not('.productView').remove();
				$(this).prepend(
			'<div class="modal__title block__title">' +
								'<div class="title">Выбор модификации</div>' +
							'</div>'
				);
			});
			block.removeClass('productViewQuick');
			block.addClass('productViewMod');
			block.addClass('modal');
			return block;
		}
		// Быстрый просмотр товара
		// При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
		$('.product__item.hasMod').mouseover(function() {
			// Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
			var link = $(this).find('a.add-mod');
			if(link.length < 1) {
				return true;
			}
			// Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
			if(typeof(document.quickviewPreload) == 'undefined') {
				document.quickviewPreload = [];
			}
			var href = link.attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			// Если контент по данной ссылке ещё не загружен
			if(typeof(document.quickviewPreload[href]) == 'undefined') {
				// Ставим отметку о том, что мы начали загрузку страницы товара
				document.quickviewPreload[href] = 1;
				// Делаем запрос на загрузку страницы товара
				$.get(href, function(content) {
					// Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
					document.quickviewPreload[href] = $(content).getColumnContent();
					loadFile('page-goods', 'css');
					loadFile('page-goods', 'js');
				})
				// Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
				.fail(function() {
					delete document.quickviewPreload[href];
				});
			}
		});
		// Действие при нажатии на кнопку быстрого просмотра.
		$(document).on('click', 'a.add-mod', function() {
			var href = $(this).attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			quickViewShowMod(href);
			$(function(){
				var observer = lozad(); // lazy loads elements with default selector as '.lozad'
				observer.observe();
			});
			preload();
			return false;
		});
	});
}
// Быстрый просмотр модификаций
function quickViewShowMod(href, atempt) {
	// Если данные по быстрому просмотру уже подгружены
	if(typeof(document.quickviewPreload[href]) != 'undefined') {
		// Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
		if(1 == document.quickviewPreload[href]) {
			// Если попытки ещё не указывались, ставим 0 - первая попытка
			if(typeof(atempt) == 'undefined') {
				atempt = 0;
				// Иначе прибавляем счётчик попыток
			} else {
				atempt += 1;
				// Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
				if(atempt > 500) {
					delete document.quickviewPreload[href];
					// TODO сделать вывод красивой таблички
					alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
					return true;
				}
			}
			// Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится.
			setTimeout('quickViewShowMod("' + href + '", '+ atempt +')', 50);
			return true;
		} else {
			$.fancybox.close();
			$.fancybox.open(document.quickviewPreload[href]);
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
		}
	} else {
		$.get(href, function(content) {
			$.fancybox.close();
			$.fancybox.open($(content).getColumnContent());
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
		});
	}
}

// Разница в цене в процентах %
function priceDiff() {
	var old = parseFloat($('.productView .price__old .num').text().replace(' ',''));
	var now = parseFloat($('.productView .price__now .num').text().replace(' ',''));
	var diff = 0;
	if(old > now){
		diff = (((old - now)/old)*100).toFixed();
		$('.productView .ico__sales').text('-' + diff + '%');
	}else{
		$('.productView .ico__sales').hide();
	}
	$('.product__item').each(function(){
		var old = parseFloat($(this).find('.price__old .num').text().replace(' ',''));
		var now = parseFloat($(this).find('.price__now .num').text().replace(' ',''));
		var diff = 0;
		if(old > now){
			diff = (((old - now)/old)*100).toFixed();
			$(this).find('.ico__sales').text('-' + diff + '%');
		}else{
			$(this).find('.ico__sales').hide();
		}
	});
}

// Много и Мало вместо точного количества
function goodsModRest() {
	$('.goodsModRestValue').each(function(){
		var value = $(this).data('value');
		if (value > 10) {
			$(this).html('В наличии много');
			$(this).css('opacity', '1');
		}else{
			$(this).html('В наличии мало');
			$(this).css('opacity', '1');
			$(this).parent().addClass('few');
		}
	});
}

// Добавление товара в корзину
function addCart() {
	$('.productView__form, .goodsListForm').off('submit').submit(function() {
		// Выносим функции из шаблонов
		if ($(this).attr('rel') === 'quick') {
			quickOrder(this);
			$('.cart, .addto__cart').addClass("hasItems");
			return (false);
		}
		$('.cart, .addto__cart').addClass("hasItems");
		$('.cart__count').animate({opacity: 0,display: "none"},500);
		$('.cart__count').animate({display: "inline",opacity: 1},500);
		// Находим форму, которую отправляем на сервер, для добавления товара в корзину
		var formBlock = $($(this).get(0));
		var addressCart = '/cart';
		// Проверка на существование формы отправки запроса на добавление товара в корзину
		if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
			alert('Не удалось найти форму добавления товара в корзину');
			return false;
		}
		// Получаем данные формы, которые будем отправлять на сервер
		var formData = formBlock.serializeArray();
		// Сообщаем серверу, что мы пришли через ajax запрос
		formData.push({name: 'ajax_q', value: 1});
		// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
		//formData.push({name: 'fast_order', value: 1});
		// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
		$.ajax({
			type: "POST",
			cache: false,
			url: formBlock.attr('action'),
			data: formData,
			success: function(data) {
				//$.fancybox.open(data);
				// Анализ системного сообщения в коризне
				var str = $(data).html();
				// Проверяем текст сообщения на наличие ошибки
				if (str.indexOf("Не удалось добавить товар") != -1) {
					// Сообщение с ошибкой
					if(typeof(Noty) == "function") {
						new Noty({
							text: '<div class="noty__addto"><i class="icon-close"></i><div class="noty__message">'+ $(data).html() + '</div></div>',
							layout:"bottomRight",
							type:"warning",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}
				} else {
					// Сообщение с успешным добавлением
					if(typeof(Noty) == "function") {
						new Noty({
							text: '<div class="noty__addto"><i class="icon-check"></i><div class="noty__message">'+ $(data).html() + '</div></div>',
							layout:"bottomRight",
							type:"success",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}
				}
				// Скрытое обновление корзины
				$('.hiddenUpdate').html(data);
			}
		});
		return false;
	});
}

// Добавление в сравнение и Сохраненное
function addTo() {
// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-compare').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		var
				a = $(this)
				isAdd = a.attr('data-action-is-add'),
				addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				pageUrl = a.attr('data-action-url'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				aText = a.parent().find('.add-compare'),
				addTooltip = a.attr('data-action-text-add'),
				delTooltip = a.attr('data-action-text-del'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;
		$('.addto__compare .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__compare .addto__items').prepend('' +
								'<div class="addto__item" data-id="'+ pDataid +'">' +
								'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image"><img src="'+ pImg +'" class="goods-image-icon" /></a>' +
								'<div class="addto__shop">' +
								'<a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
								'<div class="addto__price  '+ pDataChar +'">' +
								'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
								'<a href="'+ delUrl +'?id='+ pDataMod +'" data-goods-mod-id="'+ pDataMod +'" class="addto__remove remove" title="Убрать товар из списка сравнения" onclick="removeFromCompare($(this))"><span>Удалить</span></a>' +
								'</div>' +
								'</div>' +
								'</div>' +
								'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.compare_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.compare__count');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.compare_goods_count);
								$('.compare__count').attr('data-count', data.compare_goods_count);
								if(data.compare_goods_count > 0){
									$('.compare').addClass("hasItems");
								}else{
									$('.compare').removeClass("hasItems");
									$('.compare__count').attr('data-count', '0').text("0");
									$('.add-compare').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
								.attr('title', newTitle)
								.attr('data-tooltipOFF', newTooltip)
								.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-action-text-del' : 'data-action-text-add'));
						//}
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-check"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-close"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});
// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-favorites').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		var
				a = $(this)
				addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				isAdd = a.attr('data-action-is-add'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pPrice = a.attr('data-prodprice'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				pDataGoodsid = a.attr('data-goodsid'),
				aText = a.parent().find('.add-favorites'),
				addTooltip = a.attr('data-action-text-add'),
				delTooltip = a.attr('data-action-text-del'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;
		$('.addto__favorites .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__favorites .addto__items').prepend('' +
								'<div class="addto__item" data-id="'+ pDataid +'">' +
								'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image"><img src="'+ pImg +'" class="goods-image-icon" /></a>' +
								'<div class="addto__shop"><a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
								'<div class="addto__price '+ pDataChar +'">' +
								'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
								'<a href="'+ delUrl +'?id='+ pDataMod +'" data-goods-mod-id="'+ pDataMod +'" class="addto__remove remove" title="Убрать товар из списка избранного" onclick="removeFromFavorites($(this))"><span>Удалить</span></a>' +
								'</div>' +
								'</div>' +
								'</div>' +
								'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.favorites_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.favorites__count');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.favorites_goods_count);
								$('.favorites__count').attr('data-count', data.favorites_goods_count);
								if(data.favorites_goods_count > 0){
									$('.favorites').addClass("hasItems");
								}else{
									$('.favorites').removeClass("hasItems");
									$('.favorites__count').attr('data-count', '0').text("0");
									$('.add-favorites').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
								.attr('title', newTitle)
								.attr('data-tooltipOFF', newTooltip)
								.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-action-text-del' : 'data-action-text-add'));
						//}
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-check"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto"><i class="icon-close"></i><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});
}


// Валидаторы для телефона в "Уведомить" в карточке товара
function validPhoneNotify(){
	var tel = $('#fancybox__notify').find('.form__phone');
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
// Подписаться. Валидатор почты в "Уведомить"
function validEmailNotify(){
	var email = $('#fancybox__notify').find('.form__email');
	var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
	if(check == true && check != ''){
		email.removeClass('error');
		email.parent().removeClass('error');
		email.attr('placeholder','Введите Email');
		return true;
	}else{
		email.addClass('error');
		email.parent().addClass('error');
		email.val('');
		email.attr('placeholder','Вы ввели неверный Email');
		return false;
	}
}
function validSubmitNotify(){
	var email = validEmailNotify();
	var phone = validPhoneNotify();
	return email || phone;
}
// Проверка отправки формы
$(function(){
	$('#fancybox__notify .form__callback').submit(validSubmitNotify);
});

// Загрузка основных функций шаблона
$(document).ready(function(){
	quickViewMod();
	goodsModRest();
	priceDiff();
	addCart();
	addTo();
	// Добавление товара в корзину
	$('.add-cart').on('click', function() {
		var form = $(this).closest('form');
		if ($(this).hasClass('quick')) {
			form.attr('rel', 'quick');
		} else {
			var rel = form.attr('rel');
			if (rel) {
				form.attr('rel', rel.replace('quick', ''));
			}
		}
		form.trigger('submit');
		return (false);
	});
	// Уведомить при отсутствии товара
	$('.add-notify').on('click', function(){
		$('#fancy__info').val('Уведомить -- ' + $(this).attr('data-name'));
		$('#fancy__name').val($(this).attr('data-name'));
		$('#fancy__art').val($(this).attr('data-art'));
	});
});