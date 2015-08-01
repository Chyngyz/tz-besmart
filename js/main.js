;(function($) {
	'use strict';

	// Initial animation
	$(document).ready(function() {
		$('.home').animate({
			opacity: 1
		}, 500);
	});
	setTimeout("$('.fixedtop').animate({'top' : '-20px'},300)",400);
	setTimeout("$('.home .wrapper').animate({'opacity' : '1', top: '50%'},200)",800);

	var animated = false;
	var wh = $(window).height();

	$(document).bind('scroll',function () {
		if ($(document).scrollTop() > wh/2 && !animated) {
			$('.gallery').animate({
				opacity: 1
			}, 500);
			$('.folio__nav .prev').animate({
				'margin-left' : '70px', 
				'opacity': 1
			},300);
			$('.folio__nav .next').animate({
				'margin-right' : '70px', 
				'opacity': 1
			},300);
			animated = true;
			$(this).unbind('scroll');
		};
		
	});

	// Modal toggle function
	function modalFunc (argument) {

		if(argument == 'show') {
			$('.modal').show();
			$('.modal__bg').animate({'opacity': 1}, 200);
			$('.modal__wrapper').animate({'height': '536px'}, 300);
			setTimeout("$('.modal__wrapper-in').animate({'opacity': 1}, 100)",700);
		} 

		if (argument == 'hide') {
			$('.modal__wrapper-in').animate({'opacity': 0}, 100);
			setTimeout("$('.modal__wrapper').animate({'height': '0px'}, 200)",300);
			$('.modal__bg').animate({'opacity': 0}, 200);
			setTimeout("$('.modal').hide()",1000);
			
		}
	}



	//Home page slider
	var dots = $.find('.carousel__pagin-button');
	var carousel = $('.carousel__wrapper');
	for (var i = dots.length - 1; i >= 0; i--) {
			if (i == 2) {
				$(dots[i]).click(function (event) {
					$(carousel).removeClass('slide-active-1 slide-active-2');
					activate(3);
					$(carousel).addClass('slide-active-3');
				});
			} else if(i == 1) {
				$(dots[i]).click(function (event) {
					$(carousel).removeClass('slide-active-1 slide-active-3');
					activate(2);
					$(carousel).addClass('slide-active-2');
				});
			} else {
				$(dots[i]).click(function (event) {
					$(carousel).removeClass('slide-active-2 slide-active-3');
					activate(1);
					$(carousel).addClass('slide-active-1');
				});
			}
		
			function activate (paginNum) {
				$('.carousel__pagin-button.is-active').removeClass('is-active');
				$(dots[--paginNum]).addClass('is-active');
			}
	}

	var galleryItem = $.find('.gallery__item');
	var close = $.find('.close');
	var modal = $.find('.modal');
	var modalBg = $.find('.modal__bg');

	// Close modal on cross icon or modal background
	$(close).click(function () {
		modalFunc('hide');
	});
	$(modalBg).click(function () {
		modalFunc('hide');
	})

	// Open modal window on work item click 
	for (var i = galleryItem.length - 1; i >= 0; i--) {
		$(galleryItem[i]).click(function () {
			modalFunc('show');
		});
		
	};

	// Adjust folio works height according to window height
	$(document).ready(function() {
		if ($(window).height() > 800){
			$('.gallery__box').css('height', '668px');
		}
	});

	// Slide folio works
	var x = 0;
	$('.prev').click(function () {
		if (x == 0) {
			return;
		} else {
			$('.gallery__in').css('left', '0');
			x = 0;
		}
	});
	$('.next').click(function () {
		if (x == 1) {
			return;
		} else {
			$('.gallery__in').css('left', '-100%');
			x = 1;
		}
	});


	// Menu
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      $('.mainnav a.is-active').removeClass('is-active');
	      var target = $(this.hash);
	      $(this).addClass('is-active');
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }

	  });
	});
	
}(jQuery));

