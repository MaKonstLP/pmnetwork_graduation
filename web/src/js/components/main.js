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

		$('.popup_form_close').on('click', function(){
			bookingPopupOpenClose();
		});

		$('.footer_callback_button').on('click', function(){
			bookingPopupOpenClose();
		});

		function bookingPopupOpenClose() {
			$('.form_booking_wrapper').toggleClass('popup_form');
			$('.popup_form_close').toggleClass('_hide');
			$('body').toggleClass('overflow')
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
		$(document).mouseup(this.closeCitySelectHandler);
		//$(document).mouseup(this.closeBurgerHandler);
		
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
		}
		
		// console.log(window.innerWidth)

		if (window.innerWidth < 768 && $("body").css("overflow") != "hidden") {
			$("body").css("max-height", "100vh");
			$("body").css("overflow", "hidden");
		}
	}
}