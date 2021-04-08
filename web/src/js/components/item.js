'use strict';
import Swiper from 'swiper';
import 'slick-carousel';
import * as Lightbox from '../../../node_modules/lightbox2/dist/js/lightbox.js';

export default class Item{
	constructor($item){
		var self = this;
		this.sliders = new Array();
		
		$('[data-action="show_phone"]').on("click", function(){
			$(".object_book").addClass("_active");
			$(".object_book_hidden").addClass("_active");
			$(".object_book_interactive_part").removeClass("_hide");
			$(".object_book_send_mail").removeClass("_hide");
			ym(66603799,'reachGoal','showphone');
			dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Search', 'eventAction' : 'ShowPhone'});
		});

		$('[data-action="show_form"]').on("click", function(){
			$(".object_book_send_mail").addClass("_hide");
			$(".send_restaurant_info").removeClass("_hide");
		});

		$('[data-action="show_mail_sent"]').on("click", function(){
			$(".send_restaurant_info").addClass("_hide");
			$(".object_book_mail_sent").removeClass("_hide");
		});

		$('[data-action="show_form_again"]').on("click", function(){
			$(".object_book_mail_sent").addClass("_hide");
			$(".send_restaurant_info").removeClass("_hide");
		});

		$('[data-title-address]').on('click', function(){
            let map_offset_top = $('.map').offset().top;
            let map_height = $('.map').height();
            let header_height = $('header').height();
            let window_height = $(window).height();
            let scroll_length = map_offset_top - header_height - ((window_height - header_height)/2) + map_height/2;
            $('html,body').animate({scrollTop:scroll_length}, 400);
        });

        $('[data-book-open]').on('click', function(){
            $(this).closest('.object_book_email').addClass('_form');
        })

        $('[data-book-email-reload]').on('click', function(){
            $(this).closest('.object_book_email').removeClass('_success');
            $(this).closest('.object_book_email').addClass('_form');
		})

		var topSlider = new Swiper('.swiper_top', {

			width: 1136,
			initialSlide: 1,
			spaceBetween: 0,
			loop: true,

			navigation: {
				nextEl: '.top-swiper-button-next',
				prevEl: '.top-swiper-button-prev',
			},

			pagination: {
				el: '.top-swiper-pagination',
				clickable: true,
			},

			breakpoints: {

				1200: {
					width: 768,
				},

				// 767: {
					// width: 'auto',
					// slidesPerView: 1,
					// spaceBetween: 0,
				// },
			},

		});

		$('.object_gallery1').each((t,e) => {
			
			let galleryRoomThumbs = new Swiper($(e).find('.gallery-thumbs'), {
				spaceBetween: 4,
				slidesPerView: 4.2,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,

				on: {

					click: function () {

						let clickedThumbIndex = this.clickedIndex;
						let thumbsWrapperStyles = this.$el[0].previousElementSibling.querySelector('.swiper-wrapper').style;
						let sliderOnClickOffset = this.$el[0].previousElementSibling.swiper.slidesGrid[clickedThumbIndex];

						thumbsWrapperStyles.transform = 'translate3d(-' + sliderOnClickOffset  + 'px, 0px, 0px)';

						console.log(thumbsWrapperStyles)
						
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

						let sliderCurrentSlideIndex = this.realIndex;
						let numberOfSlides = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').childElementCount;

						let thumbsWrapperStyles = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').style;
						let thumbsLastSlideIndex = this.$el[0].nextElementSibling.swiper.imagesLoaded - 1;
						let thumbsCommonOffset = this.$el[0].nextElementSibling.querySelector('.swiper-slide').offsetWidth + this.$el[0].nextElementSibling.swiper.passedParams.spaceBetween;
						let thumbsSlidesPerView = this.$el[0].nextElementSibling.swiper.passedParams.slidesPerView;
						let thumbsLastSlideOffsetReducingCoeff = +(thumbsSlidesPerView - Math.floor(thumbsSlidesPerView)).toFixed(3);
						let thumbsNextSlideOffsetStart = Math.floor(this.$el[0].nextElementSibling.swiper.passedParams.slidesPerView) - 1;
						let thumbsNextOffsetMultiplier= sliderCurrentSlideIndex - thumbsNextSlideOffsetStart;

						if (numberOfSlides > thumbsSlidesPerView) {

							if ((thumbsNextSlideOffsetStart < sliderCurrentSlideIndex) && (sliderCurrentSlideIndex < thumbsLastSlideIndex)) {
								this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.remove('_hide');
								thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * thumbsNextOffsetMultiplier)  + 'px, 0px, 0px)';
							} else if (sliderCurrentSlideIndex == thumbsLastSlideIndex) {
								this.$el[0].nextElementSibling.querySelector('.last_slide_gradient').classList.add('_hide');
								this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.remove('_hide');
								thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * (thumbsNextOffsetMultiplier - thumbsLastSlideOffsetReducingCoeff))  + 'px, 0px, 0px)';
							}

						}

					},

					slidePrevTransitionStart: function () {



						let sliderCurrentSlideIndex = this.realIndex;

						let numberOfSlides = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').childElementCount;
						let thumbsWrapperStyles = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').style;
						let thumbsCommonOffset = this.$el[0].nextElementSibling.swiper.snapGrid[1];
						let thumbsSlidesPerView = this.$el[0].nextElementSibling.swiper.passedParams.slidesPerView;
						let thumbsPrevSlideOffsetStart = (numberOfSlides - 1) - Math.floor(thumbsSlidesPerView);
						let thumbsPrevOffsetMultiplier = thumbsPrevSlideOffsetStart - sliderCurrentSlideIndex;

						if (sliderCurrentSlideIndex == thumbsPrevSlideOffsetStart) {
							this.$el[0].nextElementSibling.querySelector('.last_slide_gradient').classList.remove('_hide');
							thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * thumbsPrevSlideOffsetStart)  + 'px, 0px, 0px)';

							if (sliderCurrentSlideIndex == 0) {
								this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.add('_hide');
							}
						} else if (sliderCurrentSlideIndex < thumbsPrevSlideOffsetStart) {
							thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * sliderCurrentSlideIndex)  + 'px, 0px, 0px)';
							
							if (sliderCurrentSlideIndex == 0) {
								this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.add('_hide');
							}
						}

					},

				},
			});

		});

	}
}


