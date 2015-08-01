;(function($) {
	'use strict';

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

	$(close).click(function () {
		$(modal).hide();
	})

	for (var i = galleryItem.length - 1; i >= 0; i--) {
		$(galleryItem[i]).click(function () {
			$(modal).show();
		});
		
	};

	$(document).ready(function() {
		if ($(window).height() > 800){
			$('.gallery__box').css('height', '668px');
		}
	});

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

	

	
}(jQuery));

