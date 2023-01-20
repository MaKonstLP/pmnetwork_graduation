'use strict';

export default class Blog{
	constructor($block){
		self = this;
		this.block = $block;
		
		//КЛИК ПО КНОПКЕ "ПОКАЗАТЬ ЕЩЕ"
		$('body').on('click', '[data-pagination-wrapper] [data-listing-pagitem]', function (e) {
			e.preventDefault();
			self.loadMoreListing($(this).data('page-id'));
		});
	}

	loadMoreListing(page = 1) {
		let self = this;

		self.block.addClass('_loading');
		// self.filter.filterListingSubmit(page);
		// self.filter.promise.then(
		// 	response => {
		// 		$('[data-listing-list]').append(response.listing);
		// 		$('[data-pagination-wrapper]').html(response.pagination);
		// 		self.block.removeClass('_loading');

		// 		history.pushState({}, '', '/' + response.url);

		// 		self.breadcrumbs = new Breadcrumbs();
		// 	}
		// );
	}
}