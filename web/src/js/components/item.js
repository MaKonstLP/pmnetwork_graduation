'use strict';
import Swiper from 'swiper';
import 'slick-carousel';
import * as Lightbox from '../../../node_modules/lightbox2/dist/js/lightbox.js';

export default class Item {
	constructor($item) {
		var self = this;
		this.sliders = new Array();
		self.mobileMode = self.getScrollWidth() < 768 ? true : false;

		console.log('self.mobileMode: ', self.mobileMode);

		$('[data-action="show_phone"]').on("click", function () {
			$(".object_book").addClass("_active");
			$(".object_book_hidden").addClass("_active");
			$(".object_book_interactive_part").removeClass("_hide");
			$(".object_book_send_mail").removeClass("_hide");
			ym(86538649, 'reachGoal', 'show_number');
			// dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Search', 'eventAction' : 'ShowPhone'});
			// console.log('data: ' + $(this).data('action'));
			//gtag('event', 'show_number', { 'event_category': 'click' });

			// ==== Gorko-calltracking ====
			let phone = $(this).closest('.object_book_hidden').find('.object_real_phone').text();
			if (typeof ym === 'function') {
				self.sendCalltracking(phone);
			} else {
				setTimeout(function () {
					self.sendCalltracking(phone);
				}, 3000);
			}
		});

		//клик по кнопке "Позвонить"
		$('.item-info__btn_call').on('click', function () {
			// ==== Gorko-calltracking ====
			let phone = $(this).attr('href');
			if (typeof ym === 'function') {
				self.sendCalltracking(phone);
			} else {
				setTimeout(function () {
					self.sendCalltracking(phone);
				}, 3000);
			}
		})

		$('[data-action="show_form"]').on("click", function () {
			$(".object_book_send_mail").addClass("_hide");
			$(".send_restaurant_info").removeClass("_hide");
		});

		$('[data-action="show_mail_sent"]').on("click", function () {
			$(".send_restaurant_info").addClass("_hide");
			$(".object_book_mail_sent").removeClass("_hide");
		});

		$('[data-action="show_form_again"]').on("click", function () {
			$(".object_book_mail_sent").addClass("_hide");
			$(".send_restaurant_info").removeClass("_hide");
		});

		$('[data-title-address]').on('click', function () {
			let map_offset_top = $('.map').offset().top;
			let map_height = $('.map').height();
			let header_height = $('header').height();
			let window_height = $(window).height();
			let scroll_length = map_offset_top - header_height - ((window_height - header_height) / 2) + map_height / 2;
			$('html,body').animate({ scrollTop: scroll_length }, 400);
		});

		$('[data-book-open]').on('click', function () {
			$(this).closest('.object_book_email').addClass('_form');
		})

		$('[data-book-email-reload]').on('click', function () {
			$(this).closest('.object_book_email').removeClass('_success');
			$(this).closest('.object_book_email').addClass('_form');
		})

		var topSlider = new Swiper('.swiper_top', {
			initialSlide: 1,
			spaceBetween: 0,
			loop: true,

			slidesPerView: 'auto',
			centeredSlides: true,

			navigation: {
				nextEl: '.top-swiper-button-next',
				prevEl: '.top-swiper-button-prev',
			},

			pagination: {
				el: '.top-swiper-pagination',
				clickable: true,
			},

			breakpoints: {

				// 1200: {
				// width: 768,
				// },

				// 767: {
				// width: 'auto',
				// slidesPerView: 1,
				// spaceBetween: 0,
				// },
			},

		});



		$('.object_gallery1').each((t, e) => {

			let galleryRoomThumbs = new Swiper($(e).find('.gallery-thumbs'), {
				spaceBetween: 4,
				slidesPerView: 4.2,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,

				on: {

					click: function (e) {

					},

					progress: function () {
						if (this.progress >= 1) {
							this.$el.find('.last_slide_gradient').addClass('_hide');
							this.$el.find('.first_slide_gradient').removeClass('_hide');
						} else if (this.progress <= 0) {
							this.$el.find('.first_slide_gradient').addClass('_hide');
							this.$el.find('.last_slide_gradient').removeClass('_hide');
						} else {
							this.$el.find('.first_slide_gradient').removeClass('_hide');
							this.$el.find('.last_slide_gradient').removeClass('_hide');
						}
					},
				},
			});

			let galleryRoomTop = new Swiper($(e).find('.gallery-top'), {
				slidesPerView: 1,
				spaceBetween: 10,
				watchSlidesProgress: true,
				thumbs: {
					swiper: galleryRoomThumbs,
				},

				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

				pagination: {
					el: '.middle-swiper-pagination',
					clickable: true,
				},

				on: {
					slideNextTransitionStart: function () {
						if (this.activeIndex > 3) {
							this.thumbs.swiper.slideNext(300)
						}

						//optional functions v1 beginning
						// if (this.activeIndex > 3 && this.activeIndex < (this.thumbs.swiper.slides.length - 1)) {
						// 	this.thumbs.swiper.setTranslate(-1 * (252 + ((this.activeIndex - 4) * 180)));
						// }
						// if (this.activeIndex == (this.thumbs.swiper.slides.length - 1)) {
						// 	this.thumbs.swiper.setTranslate((-180 * (this.thumbs.swiper.slides.length - 5)) - 144);
						// }
						//optional functions v1 end

						//optional functions v2 beginning
						if (this.activeIndex > 1 && this.activeIndex < (this.thumbs.swiper.slides.length - 2)) {
							this.thumbs.swiper.setTranslate(-1 * (72 + ((this.activeIndex - 2) * 180)));
						}

						if (this.activeIndex >= (this.thumbs.swiper.slides.length - 2)) {
							this.thumbs.swiper.setTranslate((-144 - ((this.thumbs.swiper.slides.length - 5) * 180)));
						}
						//optional functions v2 end
					},

					slidePrevTransitionStart: function () {
						if (this.activeIndex < this.slides.length - 4) {
							this.thumbs.swiper.slidePrev(300)
						}

						//optional functions v1 beginning
						// if (this.activeIndex > 0 && this.activeIndex < (this.thumbs.swiper.slides.length - 4)) {
						// 	this.thumbs.swiper.setTranslate(-1 * (252 + ((this.activeIndex - 2) * 180)));
						// 	console.log(this.activeIndex);
						// }
						// if (this.activeIndex == 1) {
						// 	this.thumbs.swiper.setTranslate(-72);
						// }
						// if (this.activeIndex == 0) {
						// 	this.thumbs.swiper.setTranslate(0);
						// }
						//optional functions v1 end

						//optional functions v2 beginning
						console.log(this.activeIndex)
						if (this.activeIndex > 1 && this.activeIndex < (this.thumbs.swiper.slides.length - 2)) {
							this.thumbs.swiper.setTranslate(-1 * (72 + ((this.activeIndex - 2) * 180)));
						}

						if (this.activeIndex <= 1) {
							this.thumbs.swiper.setTranslate(0);
						}
						//optional functions v2 end
					},
				},
			});
		});

		var block_show = null;
		function scrollTracking() {
			var wt = $(window).scrollTop();
			var wh = $(window).height();
			var ww = $(window).width();
			var et = $('.item-info__btns').offset().top;
			var eh = $('.item-info__btns').outerHeight();

			if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
				if (block_show == null || block_show == false) {
					$('.display_bottom').removeClass('_active');
					$('.footer_wrap').css('margin-bottom', '0');
				}
				block_show = true;
			} else {
				if (block_show == null || block_show == true) {
					$('.display_bottom').addClass('_active');
					$('.footer_wrap').css('margin-bottom', '50px');
				}
				block_show = false;
			}
		}

		$(window).on('scroll', function () {
			if (self.mobileMode) {
				scrollTracking();
			}
		});

		window.onload = function () {
			if (self.mobileMode) {
				scrollTracking();
			}
		};
	}

	getScrollWidth() {
		return Math.max(
			document.body.scrollWidth, document.documentElement.scrollWidth,
			document.body.offsetWidth, document.documentElement.offsetWidth,
			document.body.clientWidth, document.documentElement.clientWidth
		);
	};

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

			if ($('[data-premium-rest]').length > 0) {
				let data = new FormData();
				data.append('gorko_id', $('[data-premium-rest]').data('premium-rest'));
				data.append('channel', $('[data-channel-id]').data('channel-id'));
				fetch('/premium/premium-click/', {
					method: 'POST',
					body: data,
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error('Error:', error);
					});
			}
		}, 2000);
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


