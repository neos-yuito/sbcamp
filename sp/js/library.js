/*
 * library.js 1.5
 * pre-require: jQuery v1.7.1
 * 2012/05/28
 */


$(document).ready(function(){
						   
						   		   
/*--- form decolate ---*/

	/*--- radio ---*/
    $(".switch input").each(function(){
       if($(this).is(":checked")){
            $(this).next("label").addClass("selected");
        }else{
            $(this).next("label").removeClass("selected");
        }
    });
    $(".cb-enable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
    });
    $(".cb-disable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
    });

						   
/*--- toggle ---*/

    $("p.btn-toggle").toggle(function(){
		$(this).html("詳細を閉じる");
		 $(this).addClass("close");
        $(this).next().slideToggle();
		
    },
  function () {
		$(this).html("詳細を開く");
		 $(this).removeClass("close");
	 $(this).next().slideToggle();
  });
});

