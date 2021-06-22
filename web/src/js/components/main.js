'use strict';

export default class Main{
	constructor(){
		let self = this;
		$('body').on('click', '[data-seo-control]', function(){
			$(this).closest('[data-seo-text]').addClass('_active');
		});
		var fired = false;

		window.addEventListener('click', () => {
		    if (fired === false) {
		        fired = true;
	        	load_other();
			}
		}, {passive: true});
 
		window.addEventListener('scroll', () => {
		    if (fired === false) {
		        fired = true;
	        	load_other();
			}
		}, {passive: true});

		window.addEventListener('mousemove', () => {
	    	if (fired === false) {
	        	fired = true;
	        	load_other();
			}
		}, {passive: true});

		window.addEventListener('touchmove', () => {
	    	if (fired === false) {
	        	fired = true;
	        	load_other();
			}
		}, {passive: true});

		$('.header_callback_button').on('click', function(){
			bookingPopupOpenClose();
		});

		$('.object_reserve').on('click', function(){
			bookingPopupOpenClose();
		});

		$('.popup_form_close').on('click', function(){
			bookingPopupOpenClose();
		});

		$('.footer_callback_button').on('click', function(){
			bookingPopupOpenClose();
		});





		// city search
		$('.city_name_input input').on('keyup', function() {
			var value = $(this).val().toLowerCase();

			$('.city_name').filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) == 0)
			});

			$('.city_select_letter_block').filter(function() {
				// $(this).toggle(value.indexOf($(this).find('.capital_letter').text().toLowerCase()) == 0 && $(this).find('.city_name:visible').length > 0);

				$(this).toggle(value.indexOf($(this).find('.capital_letter').text().toLowerCase()) == 0);
			});

			if(value.length < 1) {
				$('.city_select_letter_block').show();
			};

			if ($('.city_select_letter_block').find('.city_name:visible').length == 0) {
				$('.city_select_letter_block').hide();
			};
		});

		// $('[class*="islets_icon-with-caption__caption-block"]').on('click', function(){
		// 	mapPopupOpenClose();
		// })

		//Filter
		let windowWidth = window.innerWidth;
		let scrollPrevPosition = 0;
	
		$('.filter_wrapper').on('scroll', function() {
			var $listingFilterWrap = $('.listing_and_filter_wrapper');
			var scroll = $(window).scrollTop() + $(window).height();
			//Если скролл до конца елемента
			var offset = $listingFilterWrap.offset().top + $listingFilterWrap.height();
			var heightFromFilterToBot = scroll - offset;

			// filterButtonFixed();
				if (this.scrollTop == this.scrollHeight-this.clientHeight) {
					$(".filter").removeClass("submit_cancel_fixed");
					$(".filter").addClass("submit_cancel_static");
					$(".filter").addClass("_static");

					$(".filter_submit").removeClass("filter_submit_fixed");
					$(".filter_submit").addClass("filter_submit_static");
					$(".filter_submit").addClass("_static");

					$(".filter_cancel").removeClass("fiter_cancel_fixed");
					$(".filter_cancel").addClass("fiter_cancel_static");
					$(".filter_cancel").addClass("_static");

					if (windowWidth < 1441 && windowWidth > 1200) {
						if (scroll > offset) {

							if ($(".filter").hasClass("submit_cancel_fixed")) {
								$(".filter_submit").css("bottom", heightFromFilterToBot);
								$(".filter_submit").addClass("filter_submit_fixed_pad");

								$(".filter_cancel").css("bottom", heightFromFilterToBot);
								$(".filter_cancel").addClass("filter_cancel_fixed_pad");
			
							} else {
								$(".filter_submit").css("bottom", "unset");
								$(".filter_submit").removeClass("filter_submit_fixed_pad");

								$(".filter_cancel").css("bottom", "unset");
								$(".filter_cancel").removeClass("filter_cancel_fixed_pad");
							}
			
						} else {
							$(".filter_submit").css("bottom", "unset");
							$(".filter_submit").removeClass("filter_submit_fixed_pad");

							$(".filter_cancel").css("bottom", "unset");
							$(".filter_cancel").removeClass("filter_cancel_fixed_pad");		
						}
					}
				}

				if ($(this).scrollTop() < scrollPrevPosition) {
					$(".filter").removeClass("submit_cancel_static");
					$(".filter").removeClass("_static");
					$(".filter").addClass("submit_cancel_fixed");


					$(".filter_submit").removeClass("filter_submit_static");
					$(".filter_submit").removeClass("_static");
					$(".filter_submit").addClass("filter_submit_fixed");

					$(".filter_cancel").removeClass("fiter_cancel_static");
					$(".filter_cancel").removeClass("_static");
					$(".filter_cancel").addClass("fiter_cancel_fixed");

					if (windowWidth < 1441 && windowWidth > 1200) {
						if (scroll > offset) {

							if ($(".filter").hasClass("submit_cancel_fixed")) {
								$(".filter_submit").css("bottom", heightFromFilterToBot);
								$(".filter_submit").addClass("filter_submit_fixed_pad");

								$(".filter_cancel").css("bottom", heightFromFilterToBot);
								$(".filter_cancel").addClass("filter_cancel_fixed_pad");
			
							} else {
								$(".filter_submit").css("bottom", "unset");
								$(".filter_submit").removeClass("filter_submit_fixed_pad");

								$(".filter_cancel").css("bottom", "unset");
								$(".filter_cancel").removeClass("filter_cancel_fixed_pad");
							}
			
						} else {
							$(".filter_submit").css("bottom", "unset");
							$(".filter_submit").removeClass("filter_submit_fixed_pad");

							$(".filter_cancel").css("bottom", "unset");
							$(".filter_cancel").removeClass("filter_cancel_fixed_pad");		
						}
					}
				}

				scrollPrevPosition = $(this).scrollTop();
		});

		function bookingPopupOpenClose() {
			$('.form_booking_wrapper').toggleClass('popup_form');
			$('.popup_form_close').toggleClass('_hide');
			$('body').toggleClass('overflow')

			if($(".form_booking_wrapper").hasClass("overflow-y_scroll")) {
				$(".form_booking_wrapper").removeClass("overflow-y_scroll");
				$(".form_booking_wrapper").removeClass("overflow");
			}
		}

		if (windowWidth < 1441 && windowWidth > 1200) {

			var $listingFilterWrap = $('.listing_and_filter_wrapper');
			var offsetFilter = $listingFilterWrap.offset().top;

			$(document).ready(function () {
				if ($(window).height() < (offsetFilter + 250) && $(".filter").hasClass('submit_cancel_fixed')) {
					
					$(".filter").removeClass("submit_cancel_fixed");
					$(".filter").addClass("submit_cancel_static");

					$(".filter_submit").removeClass("filter_submit_fixed");
					$(".filter_submit").addClass("filter_submit_static");

					$(".filter_cancel").removeClass("fiter_cancel_fixed");
					$(".filter_cancel").addClass("fiter_cancel_static");
				} else if ($(window).height() > (offsetFilter + 250) && $(".filter").hasClass('submit_cancel_static')) {
					
					$(".filter").removeClass("submit_cancel_static");
					$(".filter").addClass("submit_cancel_fixed");

					$(".filter_submit").removeClass("filter_submit_static");
					$(".filter_submit").addClass("filter_submit_fixed");

					$(".filter_cancel").removeClass("fiter_cancel_static");
					$(".filter_cancel").addClass("fiter_cancel_fixed");
				};
			 });

			$(window).scroll(function() {
				var scroll = $(window).scrollTop() + $(window).height();
				//Если скролл до конца елемента
				var offset = $listingFilterWrap.offset().top + $listingFilterWrap.height();
				var heightFromFilterToBot = scroll - offset;

				if (scroll < (offsetFilter + 250) && $(".filter").hasClass('submit_cancel_fixed')) {
					$(".filter").removeClass("submit_cancel_fixed");
					$(".filter").addClass("submit_cancel_static");

					$(".filter_submit").removeClass("filter_submit_fixed");
					$(".filter_submit").addClass("filter_submit_static");

					$(".filter_cancel").removeClass("fiter_cancel_fixed");
					$(".filter_cancel").addClass("fiter_cancel_static");
				} else if (scroll > (offsetFilter + 250) && $(".filter").hasClass('submit_cancel_static')) {
					$(".filter").removeClass("submit_cancel_static");
					$(".filter").addClass("submit_cancel_fixed");

					$(".filter_submit").removeClass("filter_submit_static");
					$(".filter_submit").addClass("filter_submit_fixed");

					$(".filter_cancel").removeClass("fiter_cancel_static");
					$(".filter_cancel").addClass("fiter_cancel_fixed");
				};

				if (scroll > offset) {

					if ($(".filter").hasClass("submit_cancel_fixed")) {
						$(".filter_submit").css("bottom", heightFromFilterToBot);
						$(".filter_submit").addClass("filter_submit_fixed_pad");

						$(".filter_cancel").css("bottom", heightFromFilterToBot);
						$(".filter_cancel").addClass("filter_cancel_fixed_pad");

					} else {
						$(".filter_submit").css("bottom", "unset");
						$(".filter_submit").removeClass("filter_submit_fixed_pad");

						$(".filter_cancel").css("bottom", "unset");
						$(".filter_cancel").removeClass("filter_cancel_fixed_pad");
					}

				} else {
					$(".filter_submit").css("bottom", "unset");
					$(".filter_submit").removeClass("filter_submit_fixed_pad");

					$(".filter_cancel").css("bottom", "unset");
					$(".filter_cancel").removeClass("filter_cancel_fixed_pad");
				};
			});
		}

		if (window.innerWidth < 1440) {
			$(".filter").addClass("submit_cancel_fixed");
			$(".filter_submit").addClass("filter_submit_fixed");
			$(".filter_cancel").addClass("fiter_cancel_fixed");
		}

		// function bookingPopupClose() {
		// 	$('.form_booking_wrapper').removeClass('popup_form');
		// 	$('.popup_form_close').addClass('_hide');
		// 	$('body').removeClass('overflow')
		// }

		function load_other() {
			setTimeout(function() {
				self.init();
			}, 100);
		}
		function citySelectListBlockHeight() {
			let windowHeight = +window.innerHeight;
			let windowWidth = +window.innerWidth;

			if (windowWidth < 1651) {
				let height = windowHeight - 250;

				if (windowWidth < 1441 && windowWidth > 1024) {
					height = windowHeight - 244;
				}

				if (windowWidth < 1025 && windowWidth > 767) {
					height = windowHeight - 220;
				}

				if (windowWidth < 768) {
					height = windowHeight - 212; //(30)
				}

				document.querySelector(".city_select_list").style.height = height + 'px';
			}			
		}
		citySelectListBlockHeight();
	}

	init() {
		//setTimeout(function() {
		//	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		//	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		//	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		//	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		//	})(window,document,'script','dataLayer','GTM-PTTPDSK');
		//}, 100);

		$(".header_phone_button").on("click", this.helpWhithBookingButtonHandler);
		$(".footer_phone_button").on("click", this.helpWhithBookingButtonHandler);
		$(".header_form_popup").on("click", this.closePopUpHandler);
		$('.header_burger').on('click', this.burgerHandler);
		$(".header_city_select").on("click", this.citySelectHandler);

		$(document).on("click", this.closeCitySelectHandler);
		//$(document).mouseup(this.closeCitySelectHandler); если использовать mouseup то при клике на область слайдреа на главном экране меню выбора городов не закрывается
		//$(document).mouseup(this.closeBurgerHandler);

		$(".back_to_header_menu").on("click", function() {
			var $button = $(".header_city_select");
			var $cityList = $(".city_select_search_wrapper");

			$cityList.addClass("_hide");
			$button.removeClass("_active");
		});
		
		$(".show_filter_button").on("click", this.showFilterButtonHandler);
	
		/* Настройка формы в окне popup */
		var $inputs = $(".header_form_popup .input_wrapper");

		for (var input of $inputs){
			if( $(input).find("[name='email']").length !== 0
			||  $(input).find("[name='question']").length !== 0 ) {
				$(input).addClass("_hide");
			}
		}

		$(".header_form_popup .form_title_main").text("Помочь с выбором зала?");
		$(".header_form_popup .form_title_desc").addClass("_hide");
	}

	helpWhithBookingButtonHandler() {
		var $popup = $(".header_form_popup");
		var body = document.querySelector("body");
		if ($popup.hasClass("_hide")) {

			body.dataset.scrollY = self.pageYOffset;
			body.style.top = `-${body.dataset.scrollY}px`;

			$popup.removeClass("_hide");
			$(body).addClass("_modal_active");
			ym(66603799,'reachGoal','headerlink')
		}
	}

	closePopUpHandler(e) {
		var $popupWrap = $(".header_form_popup");
		var $target = $(e.target);
		var $inputs = $(".header_form_popup input");
		var body = document.querySelector("body");

		if( $target.hasClass("close_button")
		 || $target.hasClass("header_form_popup") 
		 || $target.hasClass("header_form_popup_message_close") ) {
			$inputs.prop("value", "");
			$inputs.attr("value", "");
			$('.fc-day-number.fc-selected-date').removeClass('fc-selected-date')
			$popupWrap.addClass("_hide");
			$("body").removeClass("_modal_active");
			window.scrollTo(0, body.dataset.scrollY);
		}	
	}

	burgerHandler(e) {
		if($('header').hasClass('_active') || $('header').hasClass('filter_active')){
			$('header').removeClass('_active');
		}
		else{
			$('header').addClass('_active');
		}

		if($('header').hasClass('filter_active')){
			$('header').removeClass('filter_active');
		}

		$(".filter_wrapper").removeClass("active");

		$(".header_menu_item").css("pointer-events", "auto");

		if (window.innerWidth < 768 && $("body").css("overflow") != "hidden") {
			$("body").css("max-height", "100vh");
			$("body").css("overflow", "hidden");
		} else if (window.innerWidth < 768 && $("body").css("overflow") == "hidden") {
			$("body").css("max-height", "none");
			$("body").css("overflow", "visible");
		}
	}

	closeBurgerHandler(e){
		var $target = $(e.target);
		var $menu = $(".header_menu");

		if( !$menu.is($target)
		&& $menu.has($target).length === 0) {

			if($('header').hasClass('_active')){
				$('header').removeClass('_active');
			}
		}

	}

	citySelectHandler(e){
		var $target = $(e.target);
		var $button = $(".header_city_select");
		var $cityList = $(".city_select_search_wrapper");

		if( $button.is($target)
		 || $button.has($target).length !== 0) {
			$cityList.toggleClass("_hide");
			$button.toggleClass("_active");
		}

		if (window.innerWidth > 1650) {
			let buttonWidth = +$(e.target).css("width").slice(0, -2);
			let citySelectRightOffset = (323 - buttonWidth) + "px";


			$(".city_select_search_wrapper").css("right", citySelectRightOffset);
		}
	}

	closeCitySelectHandler(e){
		var $target = $(e.target);
		var $button = $(".header_city_select");
		var $cityList = $(".city_select_search_wrapper");
		var $backButton = $(".back_to_header_menu");

		if( !$button.is($target)
		&& $button.has($target).length === 0
		&& !$cityList.is($target)
		&& $cityList.has($target).length === 0){
			if ( !$cityList.hasClass("_hide") ){
				$cityList.addClass("_hide");
				$button.removeClass("_active");
			}
		}

		if ( $backButton.is($target)){
			$cityList.addClass("_hide");
			$button.removeClass("_active");
		}
	}

	showFilterButtonHandler() {
		$(".filter_wrapper").toggleClass("active");

		if(!$("header").hasClass("_active")) {
			$("header").toggleClass("filter_active")

			if (window.innerWidth < 1200) {
				$(".filter").addClass("submit_cancel_fixed");

				$(".filter_submit").addClass("filter_submit_fixed");
				$(".filter_cancel").addClass("fiter_cancel_fixed");

			}

			// if (window.innerWidth < 768) {
			// 	$(".filter").addClass("submit_cancel_fixed");

			// 	$(".filter_submit").addClass("filter_submit_fixed");
			// 	$(".filter_cancel").addClass("fiter_cancel_fixed");

			// }
		}

		if (window.innerWidth < 768 && $("body").css("overflow") != "hidden") {
			$("body").css("max-height", "100vh");
			$("body").css("overflow", "hidden");
		}
	}

	// mapPopupOpenClose() {
	// 	console.log('lalalalala')
	// }

	// filterButtonFixed() {
	// 	console.log(1);
	// }

}