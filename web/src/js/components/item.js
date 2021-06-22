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

			// width: 1136,
			initialSlide: 1,
			spaceBetween: 0,
			loop: true,

			slidesPerView: 'auto',
			centeredSlides: true,
			// spaceBetween: 30,

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

		// $('.object_gallery1').each((t,e) => {
			
		// 	let galleryRoomThumbs = new Swiper($(e).find('.gallery-thumbs'), {
		// 		spaceBetween: 4,
		// 		slidesPerView: 4.2,
		// 		watchSlidesVisibility: true,
		// 		watchSlidesProgress: true,

		// 		on: {

		// 			click: function (e) {

		// 				var $thisThumbGalleryCurrentImage = ($(e.target))
		// 				var $thisMainGallery = $thisThumbGalleryCurrentImage.closest(".swiper-container.gallery-thumbs").siblings(".swiper-container.gallery-top")
		// 				var $thisMainGalleryCollection = $thisMainGallery.children(".swiper-wrapper").children();

		// 				let clickedThumbIndex = this.clickedIndex;

		// 				let thumbsWrapperStyles = this.$el[0].previousElementSibling.querySelector('.swiper-wrapper').style;
		// 				let sliderOnClickOffset = this.$el[0].previousElementSibling.swiper.slidesGrid[clickedThumbIndex];

		// 				var $thisMainGalleryPrev = $thisMainGalleryCollection[clickedThumbIndex-1];
		// 				var $thisMainGalleryActive = $thisMainGalleryCollection[clickedThumbIndex];
		// 				var $thisMainGalleryNext = $thisMainGalleryCollection[clickedThumbIndex+1];

		// 				if ($thisMainGallery.find(".swiper-slide-prev")) {
		// 					$thisMainGallery.find(".swiper-slide-prev").removeClass("swiper-slide-prev");
		// 				}

		// 				$thisMainGallery.find(".swiper-slide-active").removeClass("swiper-slide-active");

		// 				if ($thisMainGallery.find(".swiper-slide-next")) {
		// 					$thisMainGallery.find(".swiper-slide-next").removeClass("swiper-slide-next");
		// 				}
						

		// 				if ($thisMainGalleryPrev) {
		// 					$thisMainGalleryPrev.classList.add("swiper-slide-prev");
		// 				}

		// 				$thisMainGalleryActive.classList.add("swiper-slide-active");

		// 				if ($thisMainGalleryNext) {
		// 					$thisMainGalleryNext.classList.add("swiper-slide-next");
		// 				}

		// 				if(clickedThumbIndex != 0) {
		// 					$thisMainGallery.find(".swiper-button-prev").removeClass("swiper-button-disabled")
		// 				}

		// 				if(clickedThumbIndex < ($thisMainGalleryCollection.length-1)) {
		// 					$thisMainGallery.find(".swiper-button-next").removeClass("swiper-button-disabled")
		// 				}

		// 				$thisMainGallery[0].swiper.activeIndex = clickedThumbIndex;

		// 				thumbsWrapperStyles.transform = 'translate3d(-' + sliderOnClickOffset  + 'px, 0px, 0px)';

		// 			},

		// 			progress: function () {
		// 				if (this.progress >= 1) {
		// 					this.$el.find('.last_slide_gradient').addClass('_hide');
		// 					this.$el.find('.first_slide_gradient').removeClass('_hide');
		// 				} else if (this.progress <= 0) {
		// 					this.$el.find('.first_slide_gradient').addClass('_hide');
		// 					this.$el.find('.last_slide_gradient').removeClass('_hide');
		// 				} else {
		// 					this.$el.find('.first_slide_gradient').removeClass('_hide');
		// 					this.$el.find('.last_slide_gradient').removeClass('_hide');
		// 				}
		// 			},

		// 		},

		// 	});
			
		// 	let galleryRoomTop = new Swiper($(e).find('.gallery-top'), {
		// 		slidesPerView: 1,
		// 		spaceBetween: 10,

		// 		navigation: {
		// 			nextEl: '.swiper-button-next',
		// 			prevEl: '.swiper-button-prev',
		// 		},

		// 		pagination: {

		// 			el: '.middle-swiper-pagination',
		// 			clickable: true,
		// 		},

		// 		on: {

		// 			slideNextTransitionStart: function () {

		// 				let sliderCurrentSlideIndex = this.realIndex;
		// 				let numberOfSlides = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').childElementCount;

		// 				let thumbsWrapperStyles = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').style;
		// 				let thumbsLastSlideIndex = this.$el[0].nextElementSibling.swiper.imagesLoaded - 1;
		// 				let thumbsCommonOffset = this.$el[0].nextElementSibling.querySelector('.swiper-slide').offsetWidth + this.$el[0].nextElementSibling.swiper.passedParams.spaceBetween;
		// 				let thumbsSlidesPerView = this.$el[0].nextElementSibling.swiper.passedParams.slidesPerView;
		// 				let thumbsLastSlideOffsetReducingCoeff = +(thumbsSlidesPerView - Math.floor(thumbsSlidesPerView)).toFixed(3);
		// 				let thumbsNextSlideOffsetStart = Math.floor(this.$el[0].nextElementSibling.swiper.passedParams.slidesPerView) - 1;
		// 				let thumbsNextOffsetMultiplier= sliderCurrentSlideIndex - thumbsNextSlideOffsetStart;

		// 				if (numberOfSlides > thumbsSlidesPerView) {

		// 					if ((thumbsNextSlideOffsetStart < sliderCurrentSlideIndex) && (sliderCurrentSlideIndex < thumbsLastSlideIndex)) {
		// 						this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.remove('_hide');
		// 						thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * thumbsNextOffsetMultiplier)  + 'px, 0px, 0px)';
		// 					} else if (sliderCurrentSlideIndex == thumbsLastSlideIndex) {
		// 						this.$el[0].nextElementSibling.querySelector('.last_slide_gradient').classList.add('_hide');
		// 						this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.remove('_hide');
		// 						thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * (thumbsNextOffsetMultiplier - thumbsLastSlideOffsetReducingCoeff))  + 'px, 0px, 0px)';
		// 					}

		// 				}

		// 			},

		// 			slidePrevTransitionStart: function () {



		// 				let sliderCurrentSlideIndex = this.realIndex;

		// 				let numberOfSlides = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').childElementCount;
		// 				let thumbsWrapperStyles = this.$el[0].nextElementSibling.querySelector('.swiper-wrapper').style;
		// 				let thumbsCommonOffset = this.$el[0].nextElementSibling.swiper.snapGrid[1];
		// 				let thumbsSlidesPerView = this.$el[0].nextElementSibling.swiper.passedParams.slidesPerView;
		// 				let thumbsPrevSlideOffsetStart = (numberOfSlides - 1) - Math.floor(thumbsSlidesPerView);
		// 				let thumbsPrevOffsetMultiplier = thumbsPrevSlideOffsetStart - sliderCurrentSlideIndex;

		// 				if (sliderCurrentSlideIndex == thumbsPrevSlideOffsetStart) {
		// 					this.$el[0].nextElementSibling.querySelector('.last_slide_gradient').classList.remove('_hide');
		// 					thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * thumbsPrevSlideOffsetStart)  + 'px, 0px, 0px)';

		// 					if (sliderCurrentSlideIndex == 0) {
		// 						this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.add('_hide');
		// 					}
		// 				} else if (sliderCurrentSlideIndex < thumbsPrevSlideOffsetStart) {
		// 					thumbsWrapperStyles.transform = 'translate3d(-' + (thumbsCommonOffset * sliderCurrentSlideIndex)  + 'px, 0px, 0px)';
							
		// 					if (sliderCurrentSlideIndex == 0) {
		// 						this.$el[0].nextElementSibling.querySelector('.first_slide_gradient').classList.add('_hide');
		// 					}
		// 				}

		// 			},

		// 		},
		// 	});

		// });


		// $('.object_gallery1').each((t,e) => {
			
		// 	let galleryRoomThumbs = new Swiper($(e).find('.gallery-thumbs'), {
		// 		spaceBetween: 4,
		// 		slidesPerView: 4.2,
		// 		watchSlidesVisibility: true,
		// 		watchSlidesProgress: true,

		// 		on: {

		// 			click: function (e) {

		// 				var $clickedThumbsSlide = $(this)[0].clickedIndex;
		// 				var $mainSwiper = $(e.target).closest('[data-gallery]').find(".swiper-container.gallery-top")[0].swiper;
		// 				var $mainSwiperMovingWrapper = $(e.target).closest('[data-gallery]').find(".swiper-container.gallery-top").find(".swiper-wrapper");

		// 				// var $mainSwiperPrevButton = $(e.target).closest('[data-gallery]').find(".swiper-container.gallery-top").find(".swiper-button-next");
		// 				// var $mainSwiperNextButton = $(e.target).closest('[data-gallery]').find(".swiper-container.gallery-top").find(".swiper-button-prev");
		// 				// console.log($mainSwiperNextButton);
		// 				// console.log($mainSwiperPrevButton);

		// 				$mainSwiperMovingWrapper[0].style.transform = "translate3d(-" + $mainSwiper.slidesGrid[$clickedThumbsSlide] + "px, 0px, 0px";

		// 				// $mainSwiper.navigation.$prevEl.removeClass(".swiper-button-disabled"); //if else
		// 				// $mainSwiper.navigation.prevEl.ariaDisabled = "false"; //if else
		// 				// $mainSwiper.navigation.$nextEl.removeClass(".swiper-button-disabled"); //if else
		// 				// $mainSwiper.navigation.nextEl.ariaDisabled = "false"; //if else

		// 				// $mainSwiperPrevButton.removeClass("swiper-button-disabled"); //if else
		// 				// $mainSwiper.navigation.prevEl.ariaDisabled = "false"; //if else
		// 				// $mainSwiper.allowSlidePrev = true;
		// 				// $mainSwiperNextButton.removeClass("swiper-button-disabled"); //if else
		// 				// $mainSwiper.navigation.nextEl.ariaDisabled = "false"; //if else
		// 				// $mainSwiper.allowSlideNext = true;

						
		// 				$mainSwiper.activeIndex = $clickedThumbsSlide;
		// 				$mainSwiper.activeSlide = $clickedThumbsSlide;
		// 				$mainSwiper.clickedIndex = $clickedThumbsSlide;
		// 				$mainSwiper.clickedSlide = $clickedThumbsSlide;
		// 				$mainSwiper.realIndex = $clickedThumbsSlide;
		// 				$mainSwiper.previousIndex = $clickedThumbsSlide - 1; //if else
		// 				$mainSwiper.snapIndex = $clickedThumbsSlide;
		// 				$mainSwiper.isBeginning = false; //if else
		// 				$mainSwiper.isEnd = false;
		// 				$mainSwiper.progress = $clickedThumbsSlide * (1 / $mainSwiper.slides.length);
		// 				$mainSwiper.previousTranslate = -$mainSwiper.slidesGrid[$clickedThumbsSlide]; //if else
						
		// 				// console.log($mainSwiper.navigation.prevEl.ariaDisabled);
		// 				// console.log($mainSwiper.navigation.$prevEl);

		// 				// $mainSwiper.translate = $mainSwiper.slidesGrid[$clickedThumbsSlide];

						
		// 				console.log($mainSwiper);
		// 				// console.log($clickedThumbsSlide)	
						
		// 			},

		// 			progress: function () {
		// 				if (this.progress >= 1) {
		// 					this.$el.find('.last_slide_gradient').addClass('_hide');
		// 					this.$el.find('.first_slide_gradient').removeClass('_hide');
		// 				} else if (this.progress <= 0) {
		// 					this.$el.find('.first_slide_gradient').addClass('_hide');
		// 					this.$el.find('.last_slide_gradient').removeClass('_hide');
		// 				} else {
		// 					this.$el.find('.first_slide_gradient').removeClass('_hide');
		// 					this.$el.find('.last_slide_gradient').removeClass('_hide');
		// 				}
		// 			},

		// 		},

		// 	});
			
		// 	let galleryRoomTop = new Swiper($(e).find('.gallery-top'), {
		// 		slidesPerView: 1,
		// 		spaceBetween: 10,

		// 		navigation: {
		// 			nextEl: '.swiper-button-next',
		// 			prevEl: '.swiper-button-prev',
		// 		},

		// 		pagination: {

		// 			el: '.middle-swiper-pagination',
		// 			clickable: true,
		// 		},

		// 		on: {

		// 			slideNextTransitionStart: function () {
		// 			},

		// 			slidePrevTransitionStart: function () {
		// 			},

		// 		},
		// 	});

		// 	// $(".swiper-button-prev").on('click', function(){
		// 	// 	var $buttonsSwiperMovingWrapper = $(this).siblings(".swiper-wrapper");
		// 	// 	var $buttonsMainSwiper = $(this).closest(".swiper-container.gallery-top")[0].swiper;
		// 	// 	var $prevSlideIndex = $buttonsMainSwiper.activeSlide - 1;

		// 	// 	$buttonsSwiperMovingWrapper[0].style.transform = "translate3d(-" + $buttonsMainSwiper.slidesGrid[$prevSlideIndex] + "px, 0px, 0px";

		// 	// 	$buttonsMainSwiper.activeIndex = $prevSlideIndex;
		// 	// 	$buttonsMainSwiper.activeSlide = $prevSlideIndex;
		// 	// 	$buttonsMainSwiper.clickedIndex = $prevSlideIndex;
		// 	// 	$buttonsMainSwiper.clickedSlide = $prevSlideIndex;
		// 	// 	$buttonsMainSwiper.realIndex = $prevSlideIndex;
		// 	// 	$buttonsMainSwiper.previousIndex = $prevSlideIndex - 1; //if else
		// 	// 	$buttonsMainSwiper.snapIndex = $prevSlideIndex;
		// 	// 	$buttonsMainSwiper.isBeginning = false; //if else
		// 	// 	$buttonsMainSwiper.isEnd = false;
		// 	// 	$buttonsMainSwiper.progress = $prevSlideIndex * (1 / $buttonsMainSwiper.slides.length);
		// 	// 	$buttonsMainSwiper.previousTranslate = -$buttonsMainSwiper.slidesGrid[$prevSlideIndex]; //if else
		// 	// });

		// 	// $(".swiper-button-next").on('click', function(){
		// 	// 	var $buttonsSwiperMovingWrapper = $(this).siblings(".swiper-wrapper");
		// 	// 	var $buttonsMainSwiper = $(this).closest(".swiper-container.gallery-top")[0].swiper;
		// 	// 	var $nextSlideIndex = $buttonsMainSwiper.activeSlide + 1;

		// 	// 	$buttonsSwiperMovingWrapper[0].style.transform = "translate3d(-" + $buttonsMainSwiper.slidesGrid[$nextSlideIndex] + "px, 0px, 0px";

		// 	// 	$buttonsMainSwiper.activeIndex = $nextSlideIndex;
		// 	// 	$buttonsMainSwiper.activeSlide = $nextSlideIndex;
		// 	// 	$buttonsMainSwiper.clickedIndex = $nextSlideIndex;
		// 	// 	$buttonsMainSwiper.clickedSlide = $nextSlideIndex;
		// 	// 	$buttonsMainSwiper.realIndex = $nextSlideIndex;
		// 	// 	$buttonsMainSwiper.previousIndex = $nextSlideIndex - 1; //if else
		// 	// 	$buttonsMainSwiper.snapIndex = $nextSlideIndex;
		// 	// 	$buttonsMainSwiper.isBeginning = false; //if else
		// 	// 	$buttonsMainSwiper.isEnd = false;
		// 	// 	$buttonsMainSwiper.progress = $nextSlideIndex * (1 / $buttonsMainSwiper.slides.length);
		// 	// 	$buttonsMainSwiper.previousTranslate = -$buttonsMainSwiper.slidesGrid[$nextSlideIndex]; //if else
		// 	// });

		// });

		$('.object_gallery1').each((t,e) => {
			
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

	}
}


