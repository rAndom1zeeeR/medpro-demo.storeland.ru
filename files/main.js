///////////////////////////////////////////////////////
/* Общие функции */
//////////////////////////////////////////////////////
// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {
  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();
  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);
  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Считает сумму  33 599,65 + 2000 - 1910-41,6
function GetSum(val,precision) {
  if(typeof (precision) == "undefined" || precision < 0) { precision = 0; }
  // Возводим в степень точности 10 для округления
  var p = Math.pow(10,precision);
  try {return Math.round(parseFloat(eval(val.toString().replace(/\s/gi, "").replace(/,/gi, ".")))*p)/p;} catch (e) {return 0;}
}

// Форматирует цену
function number_format(n,e,t,r){var i=n,a=e,o=function(n,e){var t=Math.pow(10,e);return(Math.round(n*t)/t).toString()};i=isFinite(+i)?+i:0,a=isFinite(+a)?Math.abs(a):0;var u,d,f="undefined"==typeof r?",":r,h="undefined"==typeof t?".":t,l=a>0?o(i,a):o(Math.round(i),a),s=o(Math.abs(i),a);s>=1e3?(u=s.split(/\D/),d=u[0].length%3||3,u[0]=l.slice(0,d+(0>i))+u[0].slice(d).replace(/(\d{3})/g,f+"$1"),l=u.join(h)):l=l.replace(".",h);var c=l.indexOf(h);return a>=1&&-1!==c&&l.length-c-1<a?l+=new Array(a-(l.length-c-1)).join(0)+"0":a>=1&&-1===c&&(l+=h+new Array(a).join(0)+"0"),l}

// Функция определения ширины экрана пользователя
function getClientWidth() {return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;}

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
  if (ua.browser.family === 'Safari') {
    $('body').addClass('Safari');
  }
  if (ua.browser.family === 'IE') {
    $('body').addClass('IE');
  }
  if (ua.browser.family === 'Edge') {
    $('body').addClass('Edge');
  }
  if (ua.browser.family === 'Firefox') {
    $('body').addClass('Firefox');
  }
  if (ua.browser.family === 'Opera') {
    $('body').addClass('Opera');
  }
  if (ua.browser.family === 'Chrome') {
    $('body').addClass('Chrome');
  }
  if (ua.os.family === 'iOS') {
    $('body').addClass('iOS');
  }
  if (ua.os.family === 'Android') {
    $('body').addClass('Android');
  }
}

// Наверх
function toTop() {
  $("#toTop").hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $('.toTop').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}

// Предзагрузчик
function preload() {
  var preloader = $('.preloader');
  var spinner = preloader.find('.loading');
  spinner.fadeOut();
  preloader.delay(1000).fadeOut('slow');
}


///////////////////////////////////////////////////////
/* Валидаторы */
//////////////////////////////////////////////////////
// Валидаторы для телефона в "консультация"
function validName(){
  var name = $('#callback').find('.form__person');
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
function validPhone(){
  var tel = $('#callback').find('.form__phone');
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
function validSubmit(){
  var name = validName();
  var phone = validPhone();
  return name && phone;
}
// Проверка отправки формы
$(function(){
  $('#callback .form__callback').submit(validSubmit);
});

// Валидаторы для Имени и телефона в "Обратный звонок" модальное окно
function validNameFancy(){
  var name = $('#fancybox__callback').find('.form__person');
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
function validPhoneFancy(){
  var tel = $('#fancybox__callback').find('.form__phone');
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
function validSubmitFancy(){
  var name = validNameFancy();
  var phone = validPhoneFancy();
  return name && phone;
}
// Проверка отправки формы
$(function(){
  $('#fancybox__callback .form__callback').submit(validSubmitFancy);
});

// Валидаторы для Имени и телефона в "Обратная связь" модальное окно
function validNameFeedback(){
  var name = $('#fancybox__feedback').find('.form__person');
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
function validPhoneFeedback(){
  var tel = $('#fancybox__feedback').find('.form__phone');
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
function validSubmitFeedback(){
  var name = validNameFeedback();
  var phone = validPhoneFeedback();
  return name && phone;
}
// Проверка отправки формы
$(function(){
  $('#fancybox__feedback .form__callback').submit(validSubmitFeedback);
});

// Валидаторы для телефона в "Подписаться" в подвале
function validPhoneSubscribe(){
  var tel = $('#subscribe').find('.form__phone');
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
// Подписаться. Валидатор почты в "Подписаться"
function validEmailSubscribe(){
  var email = $('#subscribe').find('.form__email');
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
function validSubmitSubscribe(){
  var email = validEmailSubscribe();
  var phone = validPhoneSubscribe();
  return email || phone;
}
// Проверка отправки формы
$(function(){
  $('#subscribe .form__callback').submit(validSubmitSubscribe);
});


///////////////////////////////////////////////////////
/* Действия */
//////////////////////////////////////////////////////
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
              .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
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
              .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
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

// Закрытие элементов
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
    $('div').removeClass('opened');
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
    if ($(this).closest('.parent').hasClass('opened')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('opened');
      $(this).closest('.open').removeClass('opened');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('opened');
      $(this).closest('.open').addClass('opened');
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
        t.append('<div class="catalog__more"><a href="'+ href +'" class="catalog__link">Еще...</a></div>');
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
function mainnavHeader(){
  var mainnav = $('header .mainnav');
  var overMenuExist = mainnav.find('.overflowMenu li').length;
  if(overMenuExist){
    mainnav.find('.overflowMenu li').removeClass('mainnav__replaced');
    mainnav.find('.mainnav__more').remove();
    mainnav.find('.overflowMenu li').each(function(){
      mainnav.find('.mainnav__list').append($(this));
    });
  }
  var menuWidth = mainnav.width();
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
      mainnav.find('.mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="mainnav__link"><span>Ещё</span><i class="icon-arrow_drop_down"></i></a></li>');
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


// Функция показать больше для Каталога на главной странице
function pdtCatalog() {
  $('#catalog .owl-carousel').owlCarousel({
    items: 6,
    margin: 0,
    loop: false,
    rewind: true,
    lazyLoad: true,
    nav: false,
    navContainer: '',
    navText: [ , ],
    dots: false,
    autoHeight: false,
    autoHeightClass: 'owl-height',
    autoplay: true,
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
      375:{items:2},
      640:{items:3},
      768:{items:4},
      992:{items:5},
      1200:{items:6}
    }
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

// Функция + - для товара
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty__plus').off('click').click(function(){
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
  $('.qty__minus').off('click').click(function(){
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




// Загрузка основных функций шаблона
$(document).ready(function(){
  userAgent();
  openMenu();
  closeMenu();
  showPass();
  quantity();
  mainnavHeader();
  pdtCatalog();
  toTop();
  viewed();
  // Стили для новых селектов
  /*$('.select').styler();*/
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
  $(".form__phone").mask("+7 (999) 999-9999"); // будет грузится в нескольких местах
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


// Загрузчик файлов
function loadFile(fileName, ext, cb){
  if(!fileName){console.error('Не передано имя загружаемого файла');return;}
  if(!ext){console.error('Не передано расширение загружаемого файла');return;}
  if(!(typeof cb === 'function')){cb = function(){}};

  var $file = $('#' + fileName + '-' + ext);
  var attrName = (ext === 'css') ? 'href' : 'src';

  if(!$file.length){
    console.error(fileName + '.' + ext + ' - Файл не найден в разметке и не может быть загружен');
    return;
  }
  // Если файл уже загружен
  if($file.attr(attrName)){
    cb();
    // console.log('Already loaded');
    return (true);
  }
  $file.on('load', cb)
  $file.attr(attrName, $file.data(attrName));
}

// Уведомления
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

// Функция слайдера для "Вы смотрели" на главной странице
function viewed() {
  $('#viewed .owl-carousel').owlCarousel({
    items: 4,
    margin: 32,
    loop: false,
    rewind: true,
    lazyLoad: true,
    nav: true,
    navContainer: '#viewed .owl-nav',
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
}




