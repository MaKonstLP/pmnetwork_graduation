<?php

namespace frontend\modules\graduation\components;

use Yii;

class Breadcrumbs {
	public static function get_breadcrumbs($level) {
		switch ($level) {
			case 1:	
				$breadcrumbs=[
					'/' => 'Новый год '.(date("Y")+1),
				];
				break;
			case 2:
				$breadcrumbs=[
					'/' => 'Новый год '.(date("Y")+1),
					'/ploshhadki/' => 'Рестораны для корпоратива',
				];
				break;
			case 3:
				$breadcrumbs=[
					'/' => 'Новый год '.(date("Y")+1),
					'/ploshhadki/' => 'Рестораны для корпоратива',
				];
				break;
		}
		return $breadcrumbs;
	}
}