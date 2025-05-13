<?php

namespace frontend\modules\graduation\components;

use Yii;

class Breadcrumbs
{
	public static function get_breadcrumbs($level, $slice_alias = false, $rest = false)
	{
		switch ($level) {
			case 1:
				return 	[
					'crumbs' =>
					[[
						'type' => 'raw',
						'link' => '/',
						'name' => 'Выпускной вечер ' . Yii::$app->params['next_year']
					]]
				];
				break;
				// case 2:
				// 	return 	[
				// 		'crumbs' =>
				// 		array_merge(
				// 			self::get_breadcrumbs(1)['crumbs'],
				// 			[[
				// 				'type' => 'raw',
				// 				'link' => '/ploshhadki/',
				// 				'name' => 'Каталог'
				// 			]]
				// 		)
				// 	];
				// 	break;
			case 2:
				$slice = self::get_slice_crumb($slice_alias);
				// return 	[
				// 	'crumbs' =>
				// 	array_merge(
				// 		self::get_breadcrumbs(2)['crumbs'],
				// 		$slice['crumbs']
				// 	),
				// 	'crumbs_list' => $slice['crumbs_list']

				// ];
				return 	[
					'crumbs' =>
					array_merge(
						self::get_breadcrumbs(1)['crumbs'],
						$slice['crumbs']
					),
					// 'crumbs_list' => $slice['crumbs_list']
				];
				break;
			case 3:
				// return 	[
				// 	'crumbs' =>
				// 	array_merge(
				// 		self::get_breadcrumbs(3, $slice_alias)['crumbs'],
				// 		[[
				// 			'type' => 'raw',
				// 			'link' => '/catalog/' . $rest['id'],
				// 			'name' => $rest['name'],
				// 		]]
				// 	),
				// 	'crumbs_list' => self::get_slice_list()
				// ];
				return	[
					'crumbs' =>
					array_merge(
						// self::get_breadcrumbs(3, $slice_alias)['crumbs'],
						self::get_breadcrumbs(2, $slice_alias)['crumbs'],
						[[
							'type' => 'raw',
							// 'link' => '/catalog/' . $slice_alias,
							'name' => 'Залы'
						]]
					),
					// 'crumbs_list' => self::get_slice_list()
				];
				break;
			case 'ideas':
				return 	[
					'crumbs' =>
					array_merge(
						self::get_breadcrumbs(1)['crumbs'],
						[[
							'type' => 'raw',
							'link' => '/ideas/',
							// 'name' => 'Статьи блога'
						]]
					)
				];
				break;
			case 'post':
				// return 	[
				// 	'crumbs' =>
				// 	array_merge(
				// 		self::get_breadcrumbs('ideas')['crumbs'],
				// 		[[
				// 			'type' => 'raw',
				// 			'link' => '/ideas/' . $slice_alias['link'] . '/',
				// 			'name' => $slice_alias['name']
				// 		]]
				// 	)
				// ];
				// break;
				return 	[
					'crumbs' =>
					array_merge(
						self::get_breadcrumbs(1)['crumbs'],
						[[
							'type' => 'raw',
							'link' => '/ideas/',
							'name' => 'Блог'
						]]
					)
				];
				break;
		}
	}

	private static function get_slice_list()
	{
		return [
			'banquet-hall' => 'Банкетные залы',
			'restaurant' => 'Рестораны',
			'hotel' => 'Отели',
			'cafe' => 'Кафе',
			'loft' => 'Лофт',
			'assembly-hall' => 'Актовые залы',
			'anticafe' => 'Антикафе',
			'art-space' => 'Арт-пространства',
			'recreation-base' => 'Базы отдыха',
			'banquet-complex' => 'Банкетные комплексы',
			'terrace' => 'Террасы',
			'country-complex' => 'Загородные комплексы',
			'concert-hall' => 'Концертные залы',
			'cottage' => 'Коттеджи',
			'cultural-complex' => 'Культурные комплексы',
			'summer-ground' => 'Летние площадки',
			'night-club' => 'Ночные клубы',
			'entertainment-complex' => 'Развлекательные комплексы',
			'restaurant-complex' => 'Ресторанные комплексы',
			'dancing-hall' => 'Танцевальные залы',
			'v-gorode' => 'В городе',
			'na-prirode' => 'На природе'
		];
	}

	private static function get_slice_crumb($slice_alias)
	{
		$breadcrumbs_slices = self::get_slice_list();
		if (isset($breadcrumbs_slices[$slice_alias])) {
			return 	[
				'crumbs' =>
				[[
					'type' => 'slices',
					'link' => '/catalog/' . $slice_alias . '/',
					'name' => $breadcrumbs_slices[$slice_alias]
				]],
				// 'crumbs_list' => $breadcrumbs_slices
			];
		} else {
			// return 	[
			// 	'crumbs' =>
			// 	[[
			// 		'type' => 'slices',
			// 		'link' => '/catalog/banketnye-zaly/',
			// 		'name' => 'Банкетные залы'
			// 	]],
			// 	// 'crumbs_list' => $breadcrumbs_slices
			// ];
			return 	[
				'crumbs' =>
				[[
					'type' => 'slices',
					'link' => '/catalog/',
					'name' => 'Каталог площадок'
				]],
				// 'crumbs_list' => $breadcrumbs_slices
			];
		}
	}
}
