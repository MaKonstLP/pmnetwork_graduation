'use strict';

import Inputmask from 'inputmask';

export default class Filter {
	constructor($filter) {
		let self = this;
		this.$filter = $filter;
		this.state = {};

		this.init(this.$filter);

		self.getFilterAvalable();

		//КЛИК ПО БЛОКУ С СЕЛЕКТОМ
		this.$filter.find('[data-filter-select-current]').on('click', function () {
			let $parent = $(this).closest('[data-filter-select-block]');
			self.selectBlockClick($parent);
		});

		//КЛИК ПО СТРОКЕ В СЕЛЕКТЕ
		this.$filter.find('[data-filter-select-item]').on('click', function () {
			$(this).toggleClass('_active');

			self.selectStateRefresh($(this).closest('[data-filter-select-block]'));
			self.reloadTotalCount();

			self.getFilterAvalable();
		});

		//КЛИК ПО ЧЕКБОКСУ
		this.$filter.find('[data-filter-checkbox-item]').on('click', function () {
			$('[data-filter-checkbox-item]').not(this).removeClass('_checked'); // Снимаем чекбокс со всех остальных чекбоксов, кроме выбранного
			$(this).toggleClass('_checked');

			let typeLoft = $('[data-filter-select-item][data-value="loft"]');
			let typeNightClub = $('[data-filter-select-item][data-value="night-club"]');

			// if ($('[data-filter-checkbox-item][data-type="9-grade"]').hasClass('_checked')) {
			if ($('[data-value="9"]').closest('[data-type="grade"]').hasClass('_checked')) {
				typeLoft.hide();
				typeNightClub.hide();
			} else {
				typeLoft.show();
				typeNightClub.show();
			}

			self.checkboxStateRefresh($(this));

			self.reloadTotalCount();
		});

		//КЛИК ВНЕ БЛОКА С СЕЛЕКТОМ
		$('body').click(function (e) {
			if (!$(e.target).closest('.filter_select_block').length) {
				self.selectBlockActiveClose();
			}
		});

		//КЛИК ПО КНОПКЕ СБРОСИТЬ
		this.$filter.find('[data-filter-cancel]').on('click', function () {
			$(this).closest('[data-filter-wrapper]').find('[data-filter-select-item]._active').removeClass('_active');
			$(this).closest('[data-filter-wrapper]').find('[data-filter-checkbox-item]._checked').removeClass('_checked');

			let selectBlocks = $('[data-filter-select-block]');
			let checkboxes = $('[data-filter-checkbox-item]');

			//сброс всех данных из селектов
			selectBlocks.each(function () {
				delete self.state[$(this).data('type')];
			});
			//сброс всех данных из чекбоксов
			checkboxes.each(function () {
				delete self.state[$(this).data('type')];
			});

			self.selectStateRefresh($('[data-filter-select-block]'));
			// self.state = {};

			// self.reloadTotalCount();
		});

		//ИНПУТ
		this.$filter.find('[data-filter-input-block] input').on("keyup", function (event) {
			var selection = window.getSelection().toString();
			if (selection !== '') {
				return;
			}
			if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
				return;
			}
			var $this = $(this);
			var input = $this.val();
			input = input.replace(/[\D\s\._\-]+/g, "");
			input = input ? parseInt(input, 10) : 0;

			self.inputStateRefresh($(this).attr('name'), input);
			$this.val(function () {
				return (input === 0) ? "" : input.toLocaleString("ru-RU");
			});
		});
	}

	init() {
		let self = this;

		this.$filter.find('[data-filter-select-block]').each(function () {
			self.selectStateRefresh($(this));
		});

		this.$filter.find('[data-filter-checkbox-item]').each(function () {
			self.checkboxStateRefresh($(this));
		});
	}

	filterListingSubmit(page = 1) {
		let self = this;
		self.state.page = page;

		let data = {
			'filter': JSON.stringify(self.state)
		}

		this.promise = new Promise(function (resolve, reject) {
			self.reject = reject;
			self.resolve = resolve;
		});

		$.ajax({
			type: 'get',
			url: '/ajax/filter/',
			data: data,
			success: function (response) {
				response = $.parseJSON(response);
				self.resolve(response);
			},
			error: function (response) {

			}
		});
	}

	filterCountItemsRefresh(page = 1) {
		let self = this;
		self.state.page = page;

		let data = {
			'filter': JSON.stringify(self.state)
		}

		this.promise = new Promise(function (resolve, reject) {
			self.reject = reject;
			self.resolve = resolve;
		});

		$.ajax({
			type: 'get',
			url: '/ajax/get-total/',
			data: data,
			success: function (response) {
				response = $.parseJSON(response);
				self.resolve(response);
			},
			error: function (response) {

			}
		});
	}

	filterMainSubmit() {
		let self = this;
		let data = {
			'filter': JSON.stringify(self.state)
		}

		this.promise = new Promise(function (resolve, reject) {
			self.reject = reject;
			self.resolve = resolve;
		});

		$.ajax({
			type: 'get',
			url: '/ajax/filter-main/',
			data: data,
			success: function (response) {
				if (response) {
					//console.log(response);
					// self.resolve('/ploshhadki/' + response);

					self.resolve('/catalog/' + response);
				}
				else {
					//console.log(response);
					self.resolve(self.filterListingHref());
				}
			},
			error: function (response) {

			}
		});
	}

	selectBlockClick($block) {
		if ($block.hasClass('_active')) {
			this.selectBlockClose($block);
		}
		else {
			this.selectBlockOpen($block);
		}
	}

	selectBlockClose($block) {
		$block.removeClass('_active');
	}

	selectBlockOpen($block) {
		this.selectBlockActiveClose();
		$block.addClass('_active');
	}

	selectBlockActiveClose() {
		this.$filter.find('[data-filter-select-block]._active').each(function () {
			$(this).removeClass('_active');
		});
	}

	selectStateRefresh($block) {
		let self = this;
		let blockType = $block.data('type');
		let $items = $block.find('[data-filter-select-item]._active');
		let selectText = '-';

		if ($items.length > 0) {
			self.state[blockType] = '';
			$items.each(function () {
				if (self.state[blockType] !== '') {
					self.state[blockType] += ',' + $(this).data('value');
					selectText = 'Выбрано (' + $items.length + ')';
				}
				else {
					self.state[blockType] = $(this).data('value');
					selectText = $(this).text();
				}
			});
		}
		else {
			delete self.state[blockType];
		}

		$block.find('[data-filter-select-current] p').text(selectText);
	}

	checkboxStateRefresh($item) {
		// let blockType = $item.closest('[data-type]').data('type');

		// if ($item.hasClass('_checked')) {
		// 	this.state[blockType] = $item.find('[data-value]').data('value');
		// }
		// else {
		// 	delete this.state[blockType];
		// }
		// console.log(this.state);

		let self = this;
		let blockType = $item.closest('[data-type]').data('type');

		// if (blockType == '9-grade' && $item.hasClass('_checked')) {
		// 	delete self.state['11-grade'];
		// 	self.state[blockType] = $item.find('[data-value]').data('value');
		// } else if (blockType == '11-grade' && $item.hasClass('_checked')) {
		// 	delete self.state['9-grade'];
		// 	self.state[blockType] = $item.find('[data-value]').data('value');
		// } else {
		// 	delete self.state[blockType];
		// }

		let grade = $item.find('.filter_check_item').data('value');

		if (grade == '9' && $item.closest('[data-type]').hasClass('_checked')) {
			delete self.state['11-grade'];
			self.state[blockType] = grade;
		} else if (grade == '11' && $item.closest('[data-type]').hasClass('_checked')) {
			delete self.state['9-grade'];
			self.state[blockType] = grade;
		} else {
			delete self.state[blockType];
		}
		// console.log(this.state);
	}

	inputStateRefresh(type, val) {
		if (val > 0) {
			this.state[type] = val;
		}
		else {
			delete this.state[type];
		}
	}

	filterListingHref() {
		if (Object.keys(this.state).length > 0) {
			// var href = '/ploshhadki/?';

			var href = '/catalog/?';
			$.each(this.state, function (key, value) {
				href += '&' + key + '=' + value;
			});
		}
		else {
			// var href = '/ploshhadki/';

			var href = '/catalog/';
		}
		return href;
	}

	//ОБНОВЛЕНИЕ КОЛИЧЕСТВА ПЛОЩАДОК В КНОПКЕ "ПОКАЗАТЬ __ ПЛОЩАДОК"
	reloadTotalCount(page = 1) {

		function declOfNum(n, text_forms) {
			n = Math.abs(n) % 100;
			var n1 = n % 10;
			if (n > 10 && n < 20) { return text_forms[2]; }
			if (n1 > 1 && n1 < 5) { return text_forms[1]; }
			if (n1 == 1) { return text_forms[0]; }
			return text_forms[2];
		}

		this.filterCountItemsRefresh(page);

		this.promise.then(
			response => {
				// $('[data-filter-button]').html('Показать ' + response.total + ' ' + declOfNum(response.total, ['площадку', 'площадки', 'площадок']));

				if (response.total == 0) {
					$('[data-filter-button]').html('Показать 0 площадок');
					$('[data-filter-button]').addClass('_disabled');

				} else {
					$('[data-filter-button]').html('Показать ' + response.total + ' ' + declOfNum(response.total, ['площадку', 'площадки', 'площадок']));
					$('[data-filter-button]').removeClass('_disabled');
				}
			}
		);
	}




	refreshFilterItems(disabledItemsList) {
		var self = this;

		// $('[data-filter-wrapper] [data-filter-select-item]._disabled').removeClass('_disabled');

		for (var filter in disabledItemsList) {
			$(`[data-filter-select-block][data-type='${filter}'] [data-filter-select-item]`).addClass('_disabled');
			var currentArray = disabledItemsList[filter];
			if (typeof currentArray === 'string') {
				currentArray = currentArray.split(',');
				for (var item in currentArray) {
					$(`[data-value='${currentArray[item]}']`).removeClass('_disabled');
				}
			}
		}
	}

	getFilterAvalable() {
		var self = this;

		var data = {
			'filter': JSON.stringify(self.state),
		}

		$.ajax({
			type: 'get',
			url: '/ajax/ajax-update-filter/',
			data: data,
			success: function (response) {
				self.refreshFilterItems(JSON.parse(response));
				console.log(JSON.parse(response));
			},
			error: function (response) {
				console.log('error');
			}
		});
	}
}