'use strict';
import Cookies from 'js-cookie';

export default class Main {
	constructor() {
		let self = this;

		// self.init();

		// === записываем в куки данные для отправки Calltracking в БД горько START ===
		//запись в куки только внешнего реферера
		let pageReferrer = '';
		//проверяем что это внешний реферер, а не переход внутри страниц сайта
		// if (document.referrer.indexOf(window.location.origin) != -1) { //в этом случае поддомены (например samara.arendazala.net) тоже считаются внешним реферером
		if (document.referrer.indexOf('vypusknoy-vecher.ru') == -1) { // отсекаем так же поддомена, как внешний реферер
			if (document.referrer) {
				pageReferrer = document.referrer;
			}
			if (Cookies.get('a_ref_0')) {
				Cookies.set('a_ref_1', pageReferrer, { expires: 365 });
			} else {
				Cookies.set('a_ref_0', pageReferrer, { expires: 365 });
			}
		}

		//запись в куки utm_details
		let currentUrl = '';
		if (window.location.href) {
			currentUrl = window.location.href;
		}
		let patternUtm = RegExp('utm_details=([^\&]*)', 'g');
		let utmExist = patternUtm.exec(currentUrl);
		let utm = {};
		if (utmExist) {
			console.log('utmExist');
			let rows = utmExist[1].split('|');

			for (let i = 0; i < rows.length; i++) {
				let a = rows[i].split(':');
				utm[a[0]] = a[1];
			}
		}

		if (Object.keys(utm).length != 0) {
			let utmJson = JSON.stringify(utm);
			console.log('utmJson: ', utmJson);
			if (Cookies.get('a_utm_0') && Cookies.get('a_utm_0') != '{}') {
				Cookies.set('a_utm_1', utmJson, { expires: 365 });
			} else {
				Cookies.set('a_utm_0', utmJson, { expires: 365 });
			}
		}
		// === записываем в куки данные для отправки Calltracking в БД горько END ===

		$('body').on('click', '[data-seo-control]', function () {
			$(this).closest('[data-seo-text]').addClass('_active');
		});

		var fired = false;
		var is_desktop = false;

		window.addEventListener('click', () => {
			if (fired === false) {
				fired = true;
				is_desktop = true;
				load_other();
			}
		}, { passive: true });

		window.addEventListener('scroll', () => {
			if (fired === false) {
				fired = true;
				is_desktop = true;
				load_other();
			}
		}, { passive: true });

		window.addEventListener('mousemove', () => {
			if (fired === false) {
				fired = true;
				is_desktop = true;
				load_other();
			}
		}, { passive: true });

		window.addEventListener('touchmove', () => {
			if (fired === false) {
				fired = true;
				is_desktop = true;
				load_other();
			}
		}, { passive: true });

		// if (is_desktop === false) {
		// 	fired = true;
		// 	is_desktop = true;
		// 	load_other();
		// }

		$('[data-action="click_number"]').on("click", function () {
			gtag('event', 'click_number', { 'event_category': 'click' });
		});

		$('.header_callback_button').on('click', function () {
			bookingPopupOpenClose();
		});

		$('[data-item-book]').on('click', function () {
			bookingPopupOpenCloseReserve();
		});

		$('.popup_form_close').on('click', function () {
			if ($(this).hasClass('_reserve')) {
				bookingPopupOpenCloseReserve();
			} else {
				bookingPopupOpenClose();
			}
		});

		$('[data-success-close-popup]').on('click', function () {
			if ($(this).hasClass('_reserve')) {
				bookingPopupOpenCloseReserve();
			} else {
				bookingPopupOpenClose();
			}
		});

		$('.footer_callback_button').on('click', function () {
			bookingPopupOpenClose();
		});

		//открытие формы на листинге при клике по кнопке забронировать на мобилах
		$('body').on('click', '[data-listing-book]', function () {
			bookingPopupOpenCloseReserve();
			const restName = $(this).closest('.item').attr('data-restaurant-name');
			const restUrl = $(this).closest('.item').attr('href');
			const venueId = $(this).closest('.item').attr('data-venue-id');
			const formReserve = $('.form_booking_popup_reserve');

			formReserve.find('.form_title_main').html(`Хотите выпускной в&nbsp;${restName}`);
			formReserve.find('.form_block').attr('data-type', 'listing-book');
			formReserve.find('.form_block').attr('data-rest-name', restName);
			formReserve.find('.form_block').attr('data-rest-url', 'https://vypusknoy-vecher.ru' + restUrl);
			formReserve.find('input[name="venue_id"]').val(venueId);
		});


		// city search
		$('.city_name_input input').on('keyup', function () {
			var value = $(this).val().toLowerCase();

			$('.city_select_letter_block a').filter(function () {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) == 0)
			});

			$('.city_select_letter_block').filter(function () {
				$(this).toggle(value.indexOf($(this).find('.capital_letter').text().toLowerCase()) == 0);
			});

			if (value.length < 1) {
				$('.city_select_letter_block').show();
			};

			if ($('.city_select_letter_block').find('.city_name:visible').length == 0) {
				$('.city_select_letter_block').hide();
			};
		});

		//добавление класса для выбранного города в списке в зависимости от поддомена
		$('.city_name').each(function () {
			let hostname = $(location).attr('hostname');
			let cityNameHref = $(this).attr('href').replace(/(^\w+:|^)\/\//, ''); //регулярка удаляет из ссылки протоколы http:// и https://

			if (cityNameHref == hostname) {
				$('.city_name').not($(this)).removeClass('_active');
				$(this).closest('p').addClass('_active');
			}
		})


		// $('[class*="islets_icon-with-caption__caption-block"]').on('click', function(){
		// 	mapPopupOpenClose();
		// })

		//Filter
		let windowWidth = window.innerWidth;
		let scrollPrevPosition = 0;

		$('.filter_wrapper').on('scroll', function () {
			var $listingFilterWrap = $('.listing_and_filter_wrapper');
			var offsetFilter = $listingFilterWrap.offset().top;
			var scroll = $(window).scrollTop() + $(window).height();
			//Если скролл до конца елемента
			var offset = $listingFilterWrap.offset().top + $listingFilterWrap.height() - 16;
			var heightFromFilterToBot = scroll - offset;

			// filterButtonFixed();
			if (this.scrollTop == this.scrollHeight - this.clientHeight) {
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
					}
				}
			}

			scrollPrevPosition = $(this).scrollTop();
		});

		function bookingPopupOpenClose() {
			// $('.form_booking_wrapper').toggleClass('popup_form');
			$('.form_booking_popup').toggleClass('popup_form');
			$('.form_booking_popup').toggleClass('_hide');
			// $('.popup_form_close').toggleClass('_hide');
			$('body').toggleClass('overflow');

			if ($(".form_booking_wrapper").hasClass("overflow-y_scroll")) {
				$(".form_booking_wrapper").removeClass("overflow-y_scroll");
				$(".form_booking_wrapper").removeClass("overflow");
			}
		}

		function bookingPopupOpenCloseReserve() {
			// $('.form_booking_wrapper').toggleClass('popup_form');
			$('.form_booking_popup_reserve').toggleClass('popup_form');
			$('.form_booking_popup_reserve').toggleClass('_hide');
			// $('.popup_form_close').toggleClass('_hide');
			$('body').toggleClass('overflow');

			if ($(".form_booking_wrapper").hasClass("overflow-y_scroll")) {
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

			$(window).scroll(function () {
				var scroll = $(window).scrollTop() + $(window).height();
				//Если скролл до конца елемента
				var offset = $listingFilterWrap.offset().top + $listingFilterWrap.height() - 16;
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

		function load_other() {
			console.log('load_other');
			setTimeout(function () {
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

		//стрелки прокрутки страницы вверх-вниз
		let arrowsWrap = $(".nav_arrows");
		let arrowUp = $("#go_top");
		let arrowDown = $("#go_down");

		if ($(window).scrollTop() >= 350) {
			arrowsWrap.fadeIn(200);
		} else {
			arrowsWrap.fadeOut(200);
		}
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= 350) {
				arrowsWrap.fadeIn(200);
			} else {
				arrowsWrap.fadeOut(200);
			}
		})
		arrowUp.on('click', function () {
			$("html, body").animate({ scrollTop: 0 }, "slow");
		})
		arrowDown.on('click', function () {
			$("html, body").animate({ scrollTop: $(document).height() }, "slow");
		})

		//клик по кнопке "Позвонить" в листинге
		$('[data-listing-list]').on('click', '.item-info__btn_call', function () {
			// ==== Gorko-calltracking ====
			let phone = $(this).attr('href');
			if (typeof ym === 'function' && typeof gtag !== 'undefined') {
				ym(86538649, 'reachGoal', 'show_number');
				self.sendCalltracking(phone);
			} else {
				setTimeout(function () {
					ym(86538649, 'reachGoal', 'show_number');
					self.sendCalltracking(phone);
				}, 3000);
			}
		})

		// <!-- Google tag (gtag.js) -->
		var googletagmanager_js = document.createElement('script');
		googletagmanager_js.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-5GC6H8ZG';
		document.body.appendChild(googletagmanager_js);
		// <!-- END Google tag (gtag.js) -->
	}

	init() {
		// setTimeout(function() {
		// 	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		// 	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		// 	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		// 	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		// 	})(window,document,'script','dataLayer','GTM-5GC6H8ZG');
		// }, 100);

		setTimeout(function () {
			// (function (m, e, t, r, i, k, a) {
			// 	m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
			// 	m[i].l = 1 * new Date();
			// 	for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
			// 	k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
			// })
			// 	(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

			// ym(86538649, "init", {
			// 	clickmap: true,
			// 	trackLinks: true,
			// 	accurateTrackBounce: true,
			// 	webvisor: true
			// });

			// <!-- Google tag (gtag.js) -->
			// var googletagmanager_js = document.createElement('script');
			// googletagmanager_js.src = 'https://www.googletagmanager.com/ns.html?id=GTM-5GC6H8ZG';
			// document.body.appendChild(googletagmanager_js);
			// <!-- END Google tag (gtag.js) -->
		}, 100)


		$(".header_phone_button").on("click", this.helpWhithBookingButtonHandler);
		$(".footer_phone_button").on("click", this.helpWhithBookingButtonHandler);
		$(".header_form_popup").on("click", this.closePopUpHandler);
		$('.header_burger').on('click', this.burgerHandler);
		$(".header_city_select").on("click", this.citySelectHandler);

		$(document).on("click", this.closeCitySelectHandler);
		//$(document).mouseup(this.closeCitySelectHandler); если использовать mouseup то при клике на область слайдреа на главном экране меню выбора городов не закрывается
		$(document).on('click', this.closeBurgerHandler);

		//СКРЫТИЕ ФИЛЬТРА ПО КЛИКУ В ЛЮБОЙ ОБЛАСТИ ЭКРАНА
		$(document).on('click', this.closeFilterHandler);

		$(".back_to_header_menu").on("click", function () {
			var $button = $(".header_city_select");
			var $cityList = $(".city_select_search_wrapper");

			$cityList.addClass("_hide");
			$button.removeClass("_active");
		});

		$(".show_filter_button").on("click", this.showFilterButtonHandler);

		/* Настройка формы в окне popup */
		var $inputs = $(".header_form_popup .input_wrapper");

		for (var input of $inputs) {
			if ($(input).find("[name='email']").length !== 0
				|| $(input).find("[name='question']").length !== 0) {
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
			// ym(66603799, 'reachGoal', 'headerlink')
		}
	}

	closePopUpHandler(e) {
		var $popupWrap = $(".header_form_popup");
		var $target = $(e.target);
		var $inputs = $(".header_form_popup input");
		var body = document.querySelector("body");

		if ($target.hasClass("close_button")
			|| $target.hasClass("header_form_popup")
			|| $target.hasClass("header_form_popup_message_close")) {
			$inputs.prop("value", "");
			$inputs.attr("value", "");
			$('.fc-day-number.fc-selected-date').removeClass('fc-selected-date')
			$popupWrap.addClass("_hide");
			$("body").removeClass("_modal_active");
			window.scrollTo(0, body.dataset.scrollY);
		}
	}

	burgerHandler(e) {
		if ($('header').hasClass('_active') || $('header').hasClass('filter_active')) {
			$('header').removeClass('_active');
		}
		else {
			$('header').addClass('_active');
		}

		if ($('header').hasClass('filter_active')) {
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

	closeBurgerHandler(e) {
		var $target = $(e.target);
		var $menu = $(".header_menu");

		if (!$menu.is($target)
			&& $menu.has($target).length === 0) {

			if ($('header').hasClass('_active')) {
				$('header').removeClass('_active');
			}
		}

	}

	citySelectHandler(e) {
		var $target = $(e.target);
		var $button = $(".header_city_select");
		var $cityList = $(".city_select_search_wrapper");

		if ($button.is($target)
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

	closeCitySelectHandler(e) {
		var $target = $(e.target);
		var $button = $(".header_city_select");
		var $cityList = $(".city_select_search_wrapper");
		var $backButton = $(".back_to_header_menu");

		if (!$button.is($target)
			&& $button.has($target).length === 0
			&& !$cityList.is($target)
			&& $cityList.has($target).length === 0) {
			if (!$cityList.hasClass("_hide")) {
				$cityList.addClass("_hide");
				$button.removeClass("_active");
			}
		}

		if ($backButton.is($target)) {
			$cityList.addClass("_hide");
			$button.removeClass("_active");
		}
	}

	showFilterButtonHandler() {
		// console.log('show filter');
		$(".filter_wrapper").toggleClass("active");

		if (!$("header").hasClass("_active")) {
			$("header").toggleClass("filter_active")

			if (window.innerWidth < 1200) {
				$(".filter").addClass("submit_cancel_fixed");

				$(".filter_submit").addClass("filter_submit_fixed");
				$(".filter_cancel").addClass("fiter_cancel_fixed");

			}
		}

		if (window.innerWidth < 768 && $("body").css("overflow") != "hidden") {
			$("body").css("max-height", "100vh");
			$("body").css("overflow", "hidden");
		}
	}

	closeFilterHandler(e) {
		let $target = $(e.target);
		let showFilterButton = $('.show_filter_button');

		let filter = $('.filter_wrapper');

		if ($(".filter_wrapper").hasClass("active")
			&& !showFilterButton.is($target)
			&& showFilterButton.has($target).length === 0
			&& !filter.is($target)
			&& filter.has($target).length === 0
		) {
			$(".filter_wrapper").removeClass("active");
			$("header").removeClass("filter_active")
		}
	}

	sendCalltracking(phone) {
		let clientId = '';
		// if (typeof ga !== 'undefined') {
		// 	ga.getAll().forEach((tracker) => {
		// 		clientId = tracker.get('clientId');
		// 	})
		// }
		if (typeof gtag !== 'undefined') {
			const gtagPromise = new Promise(resolve => {
				gtag('get', 'GTM-5GC6H8ZG', 'client_id', resolve)
			});

			gtagPromise.then((gaClientId) => {
				clientId = gaClientId;
			})
		} else {
			clientId = this.getGaClientId();
		}

		setTimeout(() => {
			let yaClientId = '';
			ym(86538649, 'getClientID', function (id) {
				yaClientId = id;
			});

			const data = new FormData();

			if (this.mobileMode) {
				data.append('isMobile', 1);
			}

			data.append('phone', phone);
			data.append('clientId', clientId);
			data.append('yaClientId', yaClientId);

			$.ajax({
				type: 'post',
				url: '/ajax/send-calltracking/',
				data: data,
				processData: false,
				contentType: false,
				success: function (response) {
					// response = $.parseJSON(response);
					// response = JSON.parse(response);
					// self.resolve(response);
					console.log('calltracking sent');
				},
				error: function (response) {
					console.log('calltracking ERROR');
				}
			});
		}, 2000)
	}

	getGaClientId() {
		let match = document.cookie.match('(?:^|;)\\s*_ga=([^;]*)');
		let raw = (match) ? decodeURIComponent(match[1]) : null;
		if (raw) {
			match = raw.match(/(\d+\.\d+)$/);
		}
		let gacid = (match) ? match[1] : '';

		return gacid;
	}
}