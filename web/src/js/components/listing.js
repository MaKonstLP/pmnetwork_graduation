'use strict';
import Filter from './filter';
import YaMapAll from './map';

export default class Listing {
	constructor($block) {
		self = this;
		this.block = $block;
		this.filter = new Filter($('[data-filter-wrapper]'));
		this.yaMap = new YaMapAll(this.filter);

		//КЛИК ПО КНОПКЕ "ПОДОБРАТЬ"
		$('[data-filter-button]').on('click', function () {
			self.reloadListing();

			self.burgerHandler();
		});

		//КЛИК ПО КНОПКЕ "СБРОСИТЬ"
		$('[data-filter-cancel]').on('click', function () {
			self.reloadListing();

			if ($('[data-filter-button]').hasClass('_disabled')) {
				$('[data-filter-button]').removeClass('_disabled');
			}
			if ($('.header_menu_item').hasClass('_active')) {
				$('.header_menu_item').removeClass('_active');
			}

			self.burgerHandler();
		});

		//КЛИК ПО ПАГИНАЦИИ
		$('body').on('click', '[data-pagination-wrapper] [data-listing-pagitem]', function () {
			self.reloadListing($(this).data('page-id'));
		});

		//map START
		$('[data-listing-list]').on('click', '.item_address', function (e) {

			let restaurantCoordinates = [$(this).closest('.item').attr("data-restaurant-mapDotX"), $(this).closest('.item').attr("data-restaurant-mapDotY")];
			let restaurantMyBalloonHeader = $(this).closest('.item').attr("data-restaurant-name");
			let restaurantMyBalloonBody = $(this).closest('.item').attr("data-restaurant-address");
			let restaurantMyBalloonCapacity = $(this).closest('.item').attr("data-capacity");
			let restaurantMyBalloonImage = $(this).closest('.item').attr("data-image");
			let restaurantMyBalloonLowestPrice = $(this).closest('.item').attr("data-lowest-price");
			// let restaurantId = $(this).closest('.item').attr('data-restaurant-id');
			let restaurantSlug = $(this).closest('.item').attr('data-restaurant-slug');
			let restaurantId = $(this).closest('.item').attr('data-restaurant-id');

			self.yaMap.showRestaurantOnMap(restaurantCoordinates, restaurantMyBalloonHeader, restaurantMyBalloonBody, restaurantMyBalloonCapacity, restaurantMyBalloonImage, restaurantMyBalloonLowestPrice, restaurantSlug, restaurantId);

			let map_offset_top = $('.map').offset().top;
			let map_height = $('.map').height();
			let header_height = $('header').height();
			let window_height = $(window).height();
			let scroll_length = map_offset_top - header_height - ((window_height - header_height) / 2) + map_height / 2;
			// $('html,body').animate({ scrollTop: scroll_length }, 400);
			setTimeout(function () {
				$('html,body').animate({ scrollTop: scroll_length }, 400);
			}, 100);
		});
		//map END
	}

	reloadListing(page = 1) {
		let self = this;

		self.block.addClass('_loading');
		self.filter.filterListingSubmit(page);
		
		// self.filter.getFilterAvalable();
		// self.filter.reloadTotalItems(page);

		self.filter.promise.then(
			response => {
				console.log(response);
				console.log(111);
				//ym(66603799,'reachGoal','filter');
				//dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Search', 'eventAction' : 'Filter'});
				$('[data-listing-list]').html(response.listing);
				$('[data-listing-title]').html(response.title);
				// if (response.text_top !== '') {
				// 	$('[data-listing-text-top]').html('<p>В&nbsp;случае непогоды по периметру закрываются шторы, которые не пропускают воду и ветер, и предоставляются газовые и электронные обогреватели. Понтон содержит отдельный подъезд и личную парковку на 20 машиномест, собственно что выделяет ему превосходство перед другими площадками.</p>');
				// } else {
				// 	$('[data-listing-text-top]').html('');
				// }
				// $('[data-listing-text-top]').html(response.text_top);
				$('[data-listing-text-bottom]').html(response.text_bottom);
				$('[data-pagination-wrapper]').html(response.pagination);
				$('.listing_title h1').html(response.seo['h1']);

				self.block.removeClass('_loading');
				$('html,body').animate({ scrollTop: $('.items_list').offset().top - 160 }, 400);

				//обновление количества площадок в кнопке "ПОКАЗАТЬ __ ПЛОЩАДОК"
				function declOfNum(n, text_forms) {
					n = Math.abs(n) % 100;
					var n1 = n % 10;
					if (n > 10 && n < 20) { return text_forms[2]; }
					if (n1 > 1 && n1 < 5) { return text_forms[1]; }
					if (n1 == 1) { return text_forms[0]; }
					return text_forms[2];
				}
				$('[data-filter-button]').html('Показать ' + response.total + ' ' + declOfNum(response.total, ['площадку', 'площадки', 'площадок']));

				// history.pushState({}, '', '/ploshhadki/' + response.url);
				history.pushState({}, '', '/catalog/' + response.url);

				// let restaurantCoordinates = [$('[data-page-type="listing"] .item').attr("data-restaurant-mapDotX"), $('[data-page-type="listing"] .item').attr("data-restaurant-mapDotY")];
				// let restaurantMyBalloonHeader = $('[data-page-type="listing"] .item').attr("data-restaurant-name");
				// let restaurantMyBalloonBody = $('[data-page-type="listing"] .item').attr("data-restaurant-address");
				// let restaurantMyBalloonCapacity = $('[data-page-type="listing"] .item').attr("data-capacity");
				// let restaurantMyBalloonImage = $('[data-page-type="listing"] .item').attr("data-image");
				// let restaurantMyBalloonLowestPrice = $('[data-page-type="listing"] .item').attr("data-lowest-price");
				// let restaurantId = $('[data-page-type="listing"] .item').attr('data-restaurant-id');
				// self.yaMap.showRestaurantOnMap(restaurantCoordinates, restaurantMyBalloonHeader, restaurantMyBalloonBody, restaurantMyBalloonCapacity, restaurantMyBalloonImage, restaurantMyBalloonLowestPrice, restaurantId);

				this.yaMap.refresh(this.filter);
			}
		);
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
}