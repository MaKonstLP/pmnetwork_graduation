<?php

namespace frontend\modules\graduation\widgets;

use Yii;
use yii\bootstrap\Widget;

class LoadmoreWidget extends Widget
{

	public $total;
	public $current;
	public $current_page;
	public $per_page;


	public function run()
	{
		$buttons = '<div class="short_listing_button_wrapper">';
		if ($this->total > 1) {

			if ($this->current < $this->total) {
				if(($this->total - $this->current) < $this->per_page) {
					$buttons .= $this->renderPageButton($this->current_page + 1, $this->current);
				} else {
					$buttons .= $this->renderPageButton($this->current_page + 1, $this->current);
				}
			}
			$buttons .= '</div>';
			return $buttons;
		} else {
			return '';
		}
	}

	private function renderPageButton($page, $test)
	{
		return '<a href="?page='.$page.'" class="short_listing_button" data-page-id="' . $page . '" data-listing-pagitem="' . $test . '"><span>Показать ещё</span></a>';
	}

}
