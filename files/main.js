///////////////////////////////////////
/* Общие функции */
///////////////////////////////////////
// Функция определения ширины экрана пользователя
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

// Работа с cookie файлами.
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Функция определения браузера
function userAgent(){
  var ua = detect.parse(navigator.userAgent);
  $('body').addClass(ua.browser.family);
}

// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000
function addSpaces(nStr){
  nStr = String(nStr)
	return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Предзагрузчик
function preload() {
  var preloader = $('.preloader');
  var spinner = preloader.find('.loading');
  spinner.fadeOut();
  preloader.delay(1000).fadeOut('slow');
}

// Наверх
function toTop() {
  $("#toTop").hide();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $('.toTop').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.text(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  //LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel
  //LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Показать пароль
function showPass() {
  $('.showPassBlock').on('click', function(event){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    ChangePasswordFieldType(this, $('.sites_client_pass'));
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
    return false;
  });
}

// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}


///////////////////////////////////////
/* Валидаторы */
///////////////////////////////////////
// Валидаторы для Имени
function validName(id){
  var name = $(id).find('.form__person');
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

// Валидаторы для телефона
function validPhone(id){
  var phone = $(id).find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(phone.val());
  if(check == true && check != ''){
    phone.removeClass('error');
    phone.parent().removeClass('error');
    phone.attr('placeholder','Введите номер');
    return true;
  }
  else{
    phone.addClass('error');
    phone.parent().addClass('error');
    phone.attr('placeholder','Вы не ввели номер');
    return false;
  }
}

// Валидаторы для почты
function validEmail(id){
  var email = $(id).find('.form__email');
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


///////////////////////////////////////
/* Аякс Отправка формы без обновления страницы */
///////////////////////////////////////
function ajaxForms(id,flag,successMessage,errorMessage){
  var flag = false;
  console.log('ajaxForms id - ', id)
  var form = $(id).find('.form__callback');
  form.on('submit',function(event){
    event.preventDefault();
    if(!flag){
      t = $(this);
      var url = t.prop('action');
      var formData = t.serializeArray();
      formData.push({name: 'ajax_q', value: 1});
      formData.push({name: 'only_body', value: 1});
      $.ajax({
        method: 'POST',
        cache: false,
        url: url,
        data: formData,
        success: function(d){
          var serverCall = JSON.parse(d).status;
          if(serverCall == "ok"){
            $.fancybox.close();
            t.hide();
            t.find('.form__input').val(' ');
            t.parent().append('<div class="form__text">'+ errorMessage +'</div>');
            new Noty({
              text: '<div class="noty__addto"><i class="icon-check"></i><div class="noty__message">' + successMessage + '</div></div>',
              layout:"bottomRight",
              type:"success",
              easing:"swing",
              animation: {
                open: 'animated fadeInUp',
                close: 'animated fadeOutDown',
                easing: 'swing',
                speed: 400
              },
              timeout:"2000",
              progressBar:true
            }).show();
            flag = true;
          }
        }
      });
    }else{
      function callBackError(type) {
        t.find('.form__input').val(' ');
        t.parent().find('.form__text').hide();
        new Noty({
          text: '<div class="noty__addto"><i class="icon-close"></i><div class="noty__message">' + errorMessage + '</div></div>',
          layout:"bottomRight",
          type:"warning",
          easing:"swing",
          animation: {
            open: 'animated fadeInUp',
            close: 'animated fadeOutDown',
            easing: 'swing',
            speed: 400
          },
          timeout:"2000",
          progressBar:true
        }).show();
      }
      callBackError();
    }
  });

  // Валидация при клике
  form.on('click',function(event){
    console.log('click - ', id)
    validName(form);
    validPhone(form);
    validEmail(form);
  });
}

// "Обратный звонок".
ajaxForms('#callback','callbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// "Обратный звонок" в модальном окне.
ajaxForms('#fancybox__callback','fancyCallbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// "Обратная связь" в модальном окне.
ajaxForms('#fancybox__feedback','fancyFeedbackFlag','Спасибо за обращение! Мы свяжемся с вами в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Обратная связь".
ajaxForms('.form__feedback','feedbackFlag','Спасибо за обращение! Мы свяжемся с вами в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Подписаться".
ajaxForms('#subscribe','subscribeFlag','Спасибо за обращение! Вы подписались на наши уведомления','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Уведомить" в модальном окне.
ajaxForms('#fancybox__notify','notifyFlag','Спасибо за обращение! Вы подписались на уведомления о поступлении товара','Вы уже отправляли запрос. Пожалуйста ожидайте.')


///////////////////////////////////////
/* Действия */
///////////////////////////////////////
// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из Избранного?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.favorites__count').attr('data-count');
    var goodsModId = e.attr('data-goods-mod-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.favorites__count').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__favorites .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.favorites').removeClass("hasItems");
          $('.favorites__count').attr('data-count', '0').text('0');
        }
        var obj = $('.add-favorites[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}

// Удаление ВСЕХ товаров из Избранного без обновлении страницы
function removeFromFavoritesAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить Избранное?')){
    // Предзагрузчик анимации
    $('.addto__favorites').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.favorites').removeClass("hasItems");
        $('.favorites__count').attr('data-count', '0').text("0");
        $('.addto__favorites .addto__item').remove();
        $('.addto__favorites .preloader').hide();
        $('.add-favorites').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.compare__count').attr('data-count');
    var goodsModId = e.attr('data-goods-mod-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.compare__count').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__compare .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.compare').removeClass("hasItems");
          $('.compare__count').attr('data-count', '0').text('0');
        }
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить сравнение?')){
    // Предзагрузчик анимации
    $('.addto__compare').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.compare').removeClass("hasItems");
        $('.compare__count').attr('data-count', '0').text("0");
        $('.addto__compare .addto__item').remove();
        $('.addto__compare .preloader').hide();
        $('.add-compare').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из корзины?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var qty = e.data('qty');
    var oldCount = $('.cart__count').attr('data-count');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        var newCount = oldCount - qty;
        $('.cart__count').attr('data-count', newCount).text(newCount);
        $('.cartSumNow').html($(d).find('.cartSumNow').html());
        $('.cart__word').html($(d).find('.cart__word').html());
        var flag = 0;
        if(newCount != 0){
          $('.addto__cart .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          })
        }else{
          $('.cart').removeClass("hasItems");
          $('.cart__count').attr('data-count', '0').text("0");
          $('.addto__cart .addto__item').remove();
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
    // Предзагрузчик анимации
    $('.addto__cart').prepend('<div class="preloader small"><div class="loading"></div></div>');
    e.parent().fadeOut().remove();
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.totalSum').html($(d).find('.totalSum').html());
        $('.cart').removeClass("hasItems");
        $('.cart__count').attr('data-count', '0').text("0");
        $('.addto__cart .addto__item').remove();
        $('.addto__cart .preloader').hide();
      }
    });
  }
}


///////////////////////////////////////
// Закрытие элементов
///////////////////////////////////////
function closeMenu() {
  // Закрытие всего при нажатии на темную часть
  $('#overlay').on('click', function(e){
    event.preventDefault();
    if($(this).hasClass('opened')){
      $('div, a, form, span').removeClass('opened');
      $('.overflowMenu').removeClass('active');
      $('.search__reset').click();
      setTimeout(function () {
        $('#overlay').removeClass('transparent');
        $('.search__reset').click();
      },100)
    }
  });

  // Закрытие элементов
  $('.dropdown__close, .addto__close').on('click', function(event){
    event.preventDefault();
    $('div, a, form').removeClass('opened');
    $('.dropdown__open').removeClass('opened');
    $('.dropdown__content').removeClass('opened');
    $('#overlay').removeClass('opened');
  });
}

// Открытие Контактов, Меню, Сравнения, Избранного
function openMenu() {
  // Открытие элементов
  $('.dropdown__open').on('click', function(event){
    event.preventDefault();
    $('div, a, form').removeClass('opened');
    var value = $(this).data('open');
    if ($('.dropdown__content[data-content="'+ value +'"]').hasClass('opened')){
      $(this).removeClass('opened');
      $(this).parent().removeClass('opened');
      $('.sidebar__links').removeClass('opened');
      $('#overlay').removeClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').removeClass('opened');
    }else{
      $(this).addClass('opened');
      $(this).parent().addClass('opened');
      $('.sidebar__links').addClass('opened');
      $('#overlay').addClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').addClass('opened');
    }
  });

  // Открытие каталога с сохранением вложенности
  $('.catalog__item .open').on('click', function(event){
    event.preventDefault();
    var parent = $(this).closest('.parent');
    var sub = $(this).parent().next('.sub');
    var open = $(this).closest('.open');
    if (parent.hasClass('opened')) {
      sub.slideUp(600);
      parent.removeClass('opened');
      open.removeClass('opened');
    } else {
      sub.slideDown(600);
      parent.addClass('opened');
      open.addClass('opened');
    }
  });

  //Открытие каталога
  $('.catalog--icon').on('click', function (event){
    event.preventDefault();
    $('#addtoMenu').hide();
    $('#addtoCatalog').show();
    button.removeClass('active');
    $('.dropdown__label [data-open="catalog"]').addClass('active');
  });

  //Открытие поиска
  $('.search__icon.button').on('click', function (event) {
    event.preventDefault();
    $(this).parent().toggleClass('opened');
    $('#overlay').addClass('opened');
  });

  // "Еще" в выпадающем каталоге
  function catalogItemsMore(){
    // Определяем главные категории
    var item = $('.addto__catalog .catalog__item[data-level="0"]');
    // Удаляем скрытые категории
    item.find('.hide').remove();
    // Проверяем категории
    item.each(function (event){
      var t = $(this);
      var item1 = t.find('.catalog__item[data-level="1"]');
      var href = t.find('a').attr('href');
      // Добавляем порядок главных категорий
      var count = event + 1;
      t.css('order', count)
      // Добавляем кнопку "Еще" если больше 4 подкатегорий
      if(item1.length > 4) {
        t.find('.sub').append('<div class="catalog__more"><a href="'+ href +'" class="catalog__link">Еще...</a></div>');
      }
      // Если в категории нет подкатегорий, переносим ее в конец
      if(item1.length == 0) {
        t.css('order', item.length + 1)
      }
    });
  }
  catalogItemsMore();

  // Имитация клика по каталогу в меню
  $('.mainnav__catalog').on('click', function (event){
    event.preventDefault();
    $('.catalog__icon').click();
  });
}

// Дополнительные пункты меню в шапке Перенос пунктов меню
function mainnav(id,rows){
  var mainnav = $(id);
  var overMenuExist = mainnav.find('.overflowMenu li').length;
  if(overMenuExist){
    mainnav.find('.overflowMenu li').removeClass('mainnav__replaced');
    mainnav.find('.mainnav__more').remove();
    mainnav.find('.overflowMenu li').each(function(){
      mainnav.find('.mainnav__list').append($(this));
    });
  }
  var menuHeight = rows;
  var menuWidth = mainnav.width() * menuHeight;
  var menuCount = mainnav.find('.mainnav__list li').length + 1;
  var nextCheck = 0;
  for(var i=1; i < menuCount;  i++){
    var currentWidth = parseInt(Math.ceil(mainnav.find('.mainnav__list li:nth-child('+i+')').width())) + 16;
    nextCheck += currentWidth;
    if(nextCheck > menuWidth){
      var a = i;
      for(a;a < menuCount;a++){
        mainnav.find('.mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
      }
      mainnav.find('.mainnav__replaced').each(function(){
        mainnav.find('.overflowMenu').append($(this));
      });
      mainnav.find('.mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="mainnav__list-link"><span>Ещё</span><i class="icon-arrow_drop_down"></i></a></li>');
      mainnav.find('.mainnav__more').on('click',function(){
        mainnav.find('.overflowMenu').hasClass('opened') ? mainnav.find('.overflowMenu').removeClass('opened') : mainnav.find('.overflowMenu').addClass('opened');
        mainnav.hasClass('opened') ? mainnav.removeClass('opened') : mainnav.addClass('opened');
      });
      $(function($){
        $(document).mouseup(function (e){
          var div =  mainnav.find('.overflowMenu.opened');
          var btn =  mainnav.find('.mainnav__more');
          if (!div.is(e.target) && div.has(e.target).length === 0 && !btn.is(e.target)) {
            div.removeClass('opened');
            mainnav.removeClass('opened');
          }
        });
      });
      return false;
    }
  }
}

///////////////////////////////////////
// Функция + - для товара
///////////////////////////////////////
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty__plus').off('click').on('click', function(){
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty__minus').off('click').on('click', function(){
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal - 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
}


///////////////////////////////////////
// Уведомления
///////////////////////////////////////
function notyStart(text, type) {
  new Noty({
    text: text,
    layout: "bottomCenter",
    type: type,
    theme: "",
    textAlign: "center",
    animation: {
      open: 'animated fadeInUp',
      close: 'animated fadeOutDown',
      easing: 'swing',
      speed: 400
    },
    timeout: "2000",
    progressBar: true,
    closable: true,
    closeOnSelfClick: true,
    modal: false,
    dismissQueue: false,
    onClose: true,
    killer: false
  }).show();
}

///////////////////////////////////////
// Загрузка основных функций шаблона
///////////////////////////////////////
$(document).ready(function(){
  userAgent();
  openMenu();
  closeMenu();
  showPass();
  quantity();
  mainnav('header .mainnav', '1');
  mainnav('footer .mainnav', '1');
  toTop();

  // Ленивая загрузка
  $(function(){
    var observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  });
  
  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
    // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });

  // Маска ввода телефона
  $(".form__phone").mask("+7 (999) 999-9999");

  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);
});

// Запуск основных функций для разных разрешений экрана
$(document).ready(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
});

// Запуск функций при изменении экрана
$(window).resize(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
});


/*
//Функции для удобства
function addActive(obj){obj.addClass('active');}
function removeActive(obj){obj.removeClass('active')}
//if (addOpened(t));
function addOpened(obj){obj.hasClass('opened') ? obj.removeClass('opened') : obj.addClass('opened')}*/

function addActive(obj){obj.hasClass('active') ? obj.removeClass('active') : obj.addClass('active')}



///////////////////////////////////////
/* Скрипты для главной */
///////////////////////////////////////
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
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
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

	// Функция слайдера для "Лидеры продаж" на главной странице
	$('#pdt__best .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
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
		navContainer: '',
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
		navContainer: '',
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

	// Табы в товарах на главной
  $('#pdt .nav__tab').on('click', function (event) {
    event.preventDefault();
    var content = $(this).attr('data-open');
    $('#pdt [data-content]').prepend('<div class="preloader"><div class="loading"></div></div>');
    preload();
    $('#pdt .nav__tab').removeClass('active')
    $('#pdt [data-content]').removeClass('active');
    $(this).addClass('active');
    $('#pdt [data-content="'+ content +'"').addClass('active');
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

	// Навигация при клике НАЗАД
	$('.slider__nav .owl-prev').on('click', function () {
		owlS.trigger('prev.owl.carousel');
	});

	// Навигация при клике ВПЕРЕД
	$('.slider__nav .owl-next').on('click', function () {
		owlS.trigger('next.owl.carousel');
	});
}

// Новости
function newsCarousel() {
	// Функция слайдера для всех Новостей
	$('.news_list_all .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
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

	// Функция слайдера для Новостей
	$('.news_list_shop .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
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

	// Функция слайдера для Статьи
	$('.news_list_articles .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
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

	// Функция слайдера для Медиа
	$('.news_list_mass_media .owl-carousel').owlCarousel({
		items: 4,
		margin: 32,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
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

	// Табы в товарах на главной
	$('#news .nav__tab').on('click', function (event) {
		event.preventDefault();
		var content = $(this).attr('data-open');
		$('#news [data-content]').prepend('<div class="preloader"><div class="loading"></div></div>');
		preload();
		$('#news .nav__tab').removeClass('active')
		$('#news [data-content]').removeClass('active');
		$(this).addClass('active');
		$('#news [data-content="'+ content +'"').addClass('active');
	});
}


///////////////////////////////////////
/* Скрипты для товаров */
///////////////////////////////////////
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
		// Быстрый заказ
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
		console.log('formData', formData)
		var t = $(this);
		console.log('t', t)
		var id = t.find('input[name="form[goods_mod_id]"]').val()
		console.log('id', id)
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
					// Добавляем активный класс если товар успешно добавился в корзину
					t.addClass("inCart");
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

// Загрузка основных функций шаблона Товаров
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
