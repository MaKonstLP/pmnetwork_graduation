'use strict';
import Filter from './filter';
import YaMapAll from './map';
import Swiper from 'swiper';

export default class Index{
	constructor($block){
		var self = this;
		this.block = $block;
		this.filter = new Filter($('[data-filter-wrapper]'));
		this.yaMap = new YaMapAll(this.filter);

		self.initSwiperListingGallery();

		//КЛИК ПО КНОПКЕ "ПОДОБРАТЬ"
		$('[data-filter-button]').on('click', function(){
			self.redirectToListing();
			// gtag('event', 'filter', {'event_category' : 'Search', 'event_action' : 'Filter'});
		});

		//КЛИК ПО КНОПКЕ АДРЕСА В КАРТОЧКЕ РЕСТОРАНА
		$('.item_address').on('click', function(){
			self.redirectToListing();
		});

		//КЛИК ПО КНОПКЕ СБРОСИТЬ
		$('[data-filter-cancel]').on('click', function () {
			$('html,body').animate({ scrollTop: $('.items_list').offset().top - 160 }, 400);
			self.filter.reloadTotalCount();

			if ($('[data-filter-button]').hasClass('_disabled')) {
				$('[data-filter-button]').removeClass('_disabled');
			}
		});

		//клик по кнопке "Позвонить" в листинге
		// $('[data-listing-list]').on('click', '.item-info__btn_call', function () {
		// 	ym(86538649, 'reachGoal', 'show_number');
		// 	// ==== Gorko-calltracking ====
		// 	let phone = $(this).attr('href');
		// 	if (typeof ym === 'function') {
		// 		self.sendCalltracking(phone);
		// 	} else {
		// 		setTimeout(function () {
		// 			self.sendCalltracking(phone);
		// 		}, 3000);
		// 	}
		// })

		var topSlider = new Swiper('.swiper_top', {

			// width: 1136,
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
				// 	width: 768,
				// },
			},

		});
	}

	redirectToListing(){
		this.filter.filterMainSubmit();
		this.filter.promise.then(
			response => {
				// ym(66603799,'reachGoal','filter');
				// dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Search', 'eventAction' : 'Filter'});
				window.location.href = response;
			}
		);
	}

	initSwiperListingGallery() {
		let swiper = new Swiper('[data-item-gallery]', {
			slidesPerView: 1,
			spaceBetween: 0,
			initialSlide: 1,
			// loop: true,
			pagination: {
				el: '.item-gallery-pagination',
				type: 'bullets',
				dynamicBullets: true,
				dynamicMainBullets: 1,
			},
		});
	}

	// sendCalltracking(phone) {
	// 	let clientId = '';
	// 	if (typeof ga !== 'undefined') {
	// 		ga.getAll().forEach((tracker) => {
	// 			clientId = tracker.get('clientId');
	// 		})
	// 	}

	// 	let yaClientId = '';
	// 	ym(86538649, 'getClientID', function (id) {
	// 		yaClientId = id;
	// 	});

	// 	const data = new FormData();

	// 	if (this.mobileMode) {
	// 		data.append('isMobile', 1);
	// 	}

	// 	data.append('phone', phone);
	// 	data.append('clientId', clientId);
	// 	data.append('yaClientId', yaClientId);

	// 	$.ajax({
	// 		type: 'post',
	// 		url: '/ajax/send-calltracking/',
	// 		data: data,
	// 		processData: false,
	// 		contentType: false,
	// 		success: function (response) {
	// 			// response = $.parseJSON(response);
	// 			// response = JSON.parse(response);
	// 			// self.resolve(response);
	// 			console.log('calltracking sent');
	// 		},
	// 		error: function (response) {
	// 			console.log('calltracking ERROR');
	// 		}
	// 	});
	// }
}