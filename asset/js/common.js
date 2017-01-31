/*
 * library.js 1.0
 * 2016/07/28
 */

$(function() {

  //headerNav(sp)
  if($('.js-headernav').length) { spHeaderNav(); }

  //pagetop
  if($('.js-scrolltop').length) { pagetop(); }

  //tab
  if($('.js-tabs').length) { tabs(); }

  //toggle open > close
  if($('.js-toggle-btn-open').length) { toggleOpen(); }
  //toggle close > open
  if($('.js-toggle-btn-close').length) { toggleClose(); }
  //toggle inner closeButton
  if($('.js-toggle-close-parent').length) { toggleCloseParent(); }

  //guide navigation (sp only)
  if($('.js-guide-nav').length) { guideNav(); }

  //js-sticky-contents (desktop only)
  if($('.js-sticky-contents').length) { stickyContents(); }

  //gameinfo floating
  if($('.js-gameinfo-fixed').length) { gameinfoFixed(); }


  //ticket selectauto select
  if($('.js-ticket-selectauto-selectseat').length) { checkSelectAutoSeatData(); }


  //settlement
  if($('.js-settlement-select').length) { settlementSelect(); }
  if($('.js-customeremail').length) { customerEmail(); }

  //changeimg
  if($('.js-changeimg').length) { changeImg(); }

});


/* guideNav
==============================================================*/
function guideNav(){

  var winW = $(window).innerWidth();
  var scrollTop = $(window).scrollTop();

  var target = $('.p-guide--nav');
  var openClass = 'is-open';

  var openBtn = $('<div class="p-guide--nav-btn">カテゴリー</div>');
  var closeBtn = $('<div class="p-guide--nav-btn-close">CLOSE<span></span></div>');
  var closeBtn2 = $('.p-guide--nav-head');

  var flag = false;

  if (winW>768){

    //要素を削除
    if($('.p-guide--nav-btn').length){ $('.p-guide--nav-btn').remove(); }
    if($('.p-guide--nav-btn-close').length){ $('.p-guide--nav-btn-close').remove(); }

    reset();

  }else{

    //無ければ必要な要素を追加
    if(!($('.p-guide--nav-btn').length)){ target.before(openBtn); }
    if(!($('.p-guide--nav-btn-close').length)){ target.append(closeBtn); }

    openBtn.on('click',function(){ navOpen(); });
    closeBtn.on('click',function(){ navClose(); });
    closeBtn2.on('click', function(){ navClose(); });

  }

  function navOpen() {
    target.addClass(openClass);
    $('.l-wrapper').css({'position':'fixed','top':-scrollTop});
    flag = true;
  }

  function navClose() {
    target.removeClass(openClass);
    $('.l-wrapper').css({'position':'static','top':'0'});
    $('html,body').scrollTop(scrollTop);
    flag = false;
  }

  function reset() {
    $('.l-wrapper').removeAttr('style');
  }

}

/* stickyContents
==============================================================*/
function stickyContents(){

  //コンテンツの高さが足りない場合
    var target = $('.js-sticky-contents');
    var winW = $(window).innerWidth();
    var winH = $(window).innerHeight();
    var contentsH = $('.l-wrapper').outerHeight();

    if(contentsH < winH){
      var size = winH - contentsH;
      target.css({'padding-bottom': size+'px'});
    }
}


/* check select data
==============================================================*/
function checkSelectAutoSeatData(){
  var $target = $('.js-ticket-selectauto-selectseat');
  var checkNum = 0;

  $target.each(function(){
    var $targetSelect = $(this).find('select');
    var $targetButton = $(this).children('.c-selectauto--button').children('button');

    $targetSelect.on('change',function(){

      checkVal();

      if(!checkNum) {
        $targetButton.addClass('is-disabled');
      }else{
        $targetButton.removeClass('is-disabled');
      }
      checkNum = 0;
    });

    //changeしたselect以外の値を調べる
    function checkVal() {
      for (var i=0; i<$targetSelect.length; i++) {
        var targetCheckVal = Number( $targetSelect.eq(i).val() );    //val()を数値に変換
        checkNum += targetCheckVal;
      }
      return checkNum
    }

  });



}



/* settlementSelect
==============================================================*/
function settlementSelect(){

  var $target = $('.js-settlement-select tbody tr');

  //:checkedはis-active
  $target.each(function(){
     if( $(this).children('.td-input').children('input').is(':checked') ){
       $(this).addClass('is-select');
     }
  })

  $target.on('click',function(){
    $(this).children('.td-input').children('input').prop('checked',true);
    active();
  });

  function active() {
    $('.js-settlement-select input').each(function(){
      if($(this).is(':checked')) {
          $(this).parents('tr').addClass('is-select');
      }else{
          $(this).parents('tr').removeClass('is-select');
      }
    });
  }

}

/* customerdata email check
==============================================================*/
function customerEmail(){

  var $target = $('.js-customeremail li');
  var $targetMailEdit = $('.js-customeremail-edit');
  var checkData = $targetMailEdit.children('label').children('input[type="text"]').val();
  var errorTxt = '※メールアドレスを入力してください';

  //:checkedはis-active
  $target.each(function(){
     if( $(this).children('label').children('input[type="radio"]').is(':checked') ){
       $(this).addClass('is-select');
     }
  })

  $target.on('click',function(){
    $(this).children('input[type="radio"]').prop('checked',true);
    active();

    if( $targetMailEdit.children('label').children('input[type="radio"]').is(':checked') && checkData == '' ) {
      $targetMailEdit.children('label').children('input[type="text"]').addClass('is-error').attr('placeholder',errorTxt);
    }else{
      $targetMailEdit.children('label').children('input[type="text"]').removeClass('is-error').removeAttr('placeholder');
    }
  });

  function active() {
    $('.js-customeremail input[type="radio"]').each(function(){
      if($(this).is(':checked')) {
          $(this).parents('li').addClass('is-select');
      }else{
          $(this).parents('li').removeClass('is-select');
      }
    });
  }

  $targetMailEdit.children('label').children('input[type="text"]').on('change',function(){
    checkData = $(this).val();
    if( checkData !== '' ) {
        $(this).removeClass('is-error').removeAttr('placeholder');
    }else if( $targetMailEdit.children('label').children('input[type="radio"]').is(':checked') && checkData == '' ) {
        $(this).addClass('is-error').attr('placeholder',errorTxt);
    }
  });

}


/* gameinfoFixed
==============================================================*/
function gameinfoFixed(){

  var winW = $(window).innerWidth();
  var headerH = $('.l-header').outerHeight();
  var target = $('.js-gameinfo-fixed .p-gameinfo--top');
  var targetH = target.outerHeight();
  var flag = false;

  //target.css('top', -targetH+'px');

  $(window).scroll(function(){

    if (winW>768) {
      var changeScrollY = 350;
    }else{
      var changeScrollY = 250;
    }

    if ($(this).scrollTop() > changeScrollY) {
      if (!flag) {
        flag = true;
        target.addClass('is-fixed').stop().animate({'top' : '0px'}, 'swing');
      }
    } else {
      if (flag) {
          flag = false;
          target.stop().animate({'top' : -targetH+'px'}, 'swing', function(){
              target.removeClass('is-fixed');
          });
      }
    }
  });

}

/* tab
==============================================================*/
function tabs(){

  $('.js-tabs-body').hide();
  $('.js-tabs li:first').addClass('is-active');
  $('.js-tabs-body:first').show().addClass('is-open');

  $('.js-tabs li').click(function(){
    $(".js-tabs li").removeClass('is-active');
    $(this).addClass('is-active');
    $('.js-tabs-body').hide();
    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });

}



/* toggle
==============================================================*/
function toggleOpen(){
  $('.js-toggle-btn-open').on('click',function(){
    $(this).toggleClass('is-close');
    $(this).next('.js-toggle-body').slideToggle();
  });
}

function toggleClose(){
  $('.js-toggle-btn-close').next('.js-toggle-body').hide();
  $('.js-toggle-btn-close').on('click',function(){
    $(this).toggleClass('is-open');
    $(this).next('.js-toggle-body').slideToggle();
  });
}

function toggleCloseParent(){
  $('.js-toggle-close-parent').on('click',function(){
    $(this).parents('.js-toggle-body').slideToggle();

    $toggleBtn = $(this).parents('.js-toggle-body').prev();
    if( $toggleBtn.hasClass('.js-toggle-btn-close') ) {
      $toggleBtn.removeClass('is-open');
    }else if( $toggleBtn.hasClass('.js-toggle-btn-open') ) {
      $toggleBtn.addClass('is-close');
    }

  });
}



/* spHeaderNav
==============================================================*/
function spHeaderNav(){

  var conteiner = $('.l-container');
  var navConteiner = $('.l-header--inner');
  var overlay = $('<div class="l-header--nav-overlay"></div>');
  var btn = $('<div class="l-header--nav-btn"><div></div></div>');
  var nav = $('.l-header--nav-sp');
  var openClass = 'headernav-is-open';
  var flag = false;

  var winW = $(window).innerWidth();
  if (winW>768){
    settingPC();
  }else{
    settingSP();

    btn.on('click',function(){
      if(!flag){
        navOpen();
      }else{
        navClose();
      }
    });

    overlay.on('click',function(){
      if(flag){
        navClose();
      }
    });

    $('body,html').on('touchmove',function(e){
      if(flag){
        e.preventDefault();
      }
    });
  }

  function settingPC() {
    $('.l-header--nav-btn').remove();
    $('.l-header--nav-sp').removeClass('l-header--nav-sp').addClass('l-header--nav');
    $('.l-header--nav-overlay').remove();
  }

  function settingSP() {
    if($('.l-header--nav').length){ $('.l-header--nav').removeClass('l-header--nav').addClass('l-header--nav-sp'); }
    if(!($('.l-header--nav-btn').length)){ navConteiner.prepend(btn); }
    if(!($('.l-header--nav-overlay').length)){ conteiner.append(overlay); }
  }

  function navOpen() {
    $('html').addClass(openClass);
    flag = true;
  }

  function navClose() {
    $('html').removeClass(openClass);
    flag = false;
  }
}


/* pagetop
==============================================================*/
function pagetop(){

  /* pagetop scroll */
  var scrollbtn = $('.js-scrolltop a');

  scrollbtn.on('click', function(){
    $('body, html').animate({ scrollTop: 0 }, 500);
    return false;
  });
}



