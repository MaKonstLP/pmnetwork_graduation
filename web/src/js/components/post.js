'use strict';
import Swiper from 'swiper';

export default class Post{
	constructor($block){
		self = this;
		this.block = $block;
		this.swipers_gal = [];
		this.swipers_rest = [];
		

		$('[data-action="show_phone"]').on("click", function(){
			let $object_book = $(this).closest(".object_book");
			$object_book.addClass("_active");
			$object_book.find(".object_book_hidden").addClass("_active");
			$object_book.find(".object_book_interactive_part").removeClass("_hide");
			$object_book.find(".object_book_send_mail").removeClass("_hide");
			ym(66603799,'reachGoal','showphone');
			dataLayer.push({'event': 'event-to-ga', 'eventCategory' : 'Search', 'eventAction' : 'ShowPhone'});
		});

		$('[data-action="show_form"]').on("click", function(){
			$(".object_book_send_mail").addClass("_hide");
			$(".send_restaurant_info").removeClass("_hide");
		});

		$('[data-action="show_mail_sent"]').on("click", function(){
			let $object_book = $(this).closest(".object_book");
			$object_book.find(".send_restaurant_info").addClass("_hide");
			$object_book.find(".object_book_mail_sent").removeClass("_hide");
		});

		$('[data-action="show_form_again"]').on("click", function(){
			let $object_book = $(this).closest(".object_book");
			$object_book.find(".object_book_mail_sent").addClass("_hide");
			$object_book.find(".send_restaurant_info").removeClass("_hide");
		});

		$('[data-book-open]').on('click', function(){
            $(this).closest('.object_book_email').addClass('_form');
        })

        $('[data-book-email-reload]').on('click', function(){
            $(this).closest('.object_book_email').removeClass('_success');
            $(this).closest('.object_book_email').addClass('_form');
        })
		
		$('.post_gallery_wrap').each(function(iter,object){
			let postGalleryThumbs = new Swiper($(this).find('.post-gallery-thumbs'), {
		        spaceBetween: 5,
		        slidesPerView: 7,
		        slidesPerColumn: 1,
		        freeMode: true,
		        watchSlidesVisibility: true,
		        watchSlidesProgress: true,

		        breakpoints: {
		            1440: {
		              	slidesPerView: 5,
		            },

		            767: {
		              	slidesPerView: 4,
		            }
		        }
		     });
			let postGalleryTop = new Swiper($(this).find('.post-gallery-top'), {
				spaceBetween: 0,
				thumbs: {
					swiper: postGalleryThumbs
				}
			});

			self.swipers_gal.push({
				postGalleryThumbs,
				postGalleryTop
			});
		});

		$('.post_item_gallery_wrap').each(function(iter,object){
			let postGalleryThumbs = new Swiper($(this).find('.post-item-gallery-thumbs'), {
		        spaceBetween: 5,
		        slidesPerView: 4,
		        slidesPerColumn: 1,
		        freeMode: true,
		        watchSlidesVisibility: true,
		        watchSlidesProgress: true,

		        breakpoints: {
		            1440: {
		              	slidesPerView: 3,
		            },

		            767: {
		              	slidesPerView: 2,
		            }
		        }
		     });
			let postGalleryTop = new Swiper($(this).find('.post-item-gallery-top'), {
				spaceBetween: 0,
				thumbs: {
					swiper: postGalleryThumbs
				}
			});

			self.swipers_rest.push({
				postGalleryThumbs,
				postGalleryTop
			});
		});

		

		//НОВЫЙ СЛАЙДЕР НАЧАЛО

		$('.post_gallery_wrapper').each((t,e) => {
			
			let postSliderThumbs = new Swiper($(e).find('.gallery-thumbs'), {
				spaceBetween: 4,
				slidesPerView: 7.2,
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

			let postSlider = new Swiper($(e).find('.post_gallery'), {
				spaceBetween: 10,

				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

				pagination: {
					el: '.post-swiper-pagination',
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

		const swiper = new Swiper('.post_images', {
			slidesPerView: 2,
			spaceBetween: 16,

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			pagination: {
				el: '.post-swiper-pagination',
				clickable: true,
			},

			breakpoints: {
				767: {
					  slidesPerView: 1,
				}
			}
		});


		//НОВЫЙ СЛАЙДЕР КОНЕЦ

		
	}
}