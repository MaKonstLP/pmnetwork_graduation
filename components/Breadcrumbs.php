<?php

namespace frontend\modules\graduation\components;

use Yii;

class Breadcrumbs {
	public static function get_breadcrumbs($level) {
		switch ($level) {
			case 1:	
				$breadcrumbs=[
					'/' => 'Выпускной вечер '.(date("Y")+1),
				];
				break;
			case 2:
				$breadcrumbs=[
					'/' => 'Новый год '.(date("Y")+1),
					'/ploshhadki/' => 'Рестораны',
				];
				break;
		}
		return $breadcrumbs;
	}
}