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

	
}(jQuery));
