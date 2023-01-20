<?php

namespace frontend\modules\graduation\components;

use Yii;
use yii\helpers\ArrayHelper;
use common\models\Filter;
use common\models\Slices;
use common\models\MetroStations;
use common\models\Okruga;
use common\models\Rayoni;
use common\models\elastic\ItemsFilterElastic;
use frontend\components\ParamsFromQuery;
use frontend\modules\graduation\models\ElasticItems;
use frontend\modules\graduation\models\RestaurantSpecFilterRel;

use Elasticsearch\ClientBuilder;


class UpdateFilterItems
{
	public static function parseGetQuery($getQuery, $filter_model, $slices_model)
	{
		$return = [];
		$temp_params = new ParamsFromQuery($getQuery, $filter_model, $slices_model);
		$return['params_filter'] = $temp_params->params_filter;

		return $return;
	}

	public static function getAggregateResult($filterState)
	{
		$filter_model = Filter::find()->with('items')->orderBy(['sort' => SORT_ASC])->all();
		$slices_model = Slices::find()->all();
		$params = UpdateFilterItems::parseGetQuery($filterState, $filter_model, $slices_model);
		$elastic_model = new ElasticItems;
		$items = new ItemsFilterElastic($params['params_filter'], 1, 1, false, 'restaurants', $elastic_model);

		$query = $items->query
			->addAggregate('capacity_group', [
				'nested' => [
					'path' => 'rooms'
				],
				'aggs' => [
					//  'lyudey' => [
					'guests' => [
						'range' => [
							'field' => 'rooms.capacity',
							'ranges' => [
								['to' => 15],
								['from' => 15, 'to' => 19],
								['from' => 20, 'to' => 29],
								['from' => 30, 'to' => 39],
								['from' => 40, 'to' => 49],
								['from' => 50, 'to' => 59],
								['from' => 60, 'to' => 79],
								['from' => 80, 'to' => 99],
								['from' => 100, 'to' => 149],
								['from' => 150, 'to' => 199],
								['from' => 200, 'to' => 299],
								['from' => 300]
							],
						]
					]
				]
			])

			->addAggregate('rest_type', [
				'nested' => [
					'path' => 'restaurant_types'
				],
				'aggs' => [
					'type' => [
						'terms' => [
							'field' => 'restaurant_types.id',
							'size' => 10000,
						]
					]
				]
			])

			->addAggregate('price_group', [
				'nested' => [
					'path' => 'rooms'
				],
				'aggs' => [
					'cheque' => [
						'range' => [
							'field' => 'rooms.price',
							'ranges' => [
								['to' => 1200],
								['from' => 1200, 'to' => 1599],
								['from' => 1600, 'to' => 1999],
								['from' => 2000, 'to' => 2499],
								['from' => 2500]
							],
						]
					]
				]
			])


			->addAggregate('feature_location_group', [
				'nested' => [
					'path' => 'restaurant_location'
				],
				'aggs' => [
					'feature_location' => [
						'terms' => [
							'field' => 'restaurant_location.id',
							'size' => 10000,
						]
					]
				]
			])

			->addAggregate('feature_s_edoy_group', [
				'nested' => [
					'path' => 'rooms'
				],
				'aggs' => [
					'feature_s_edoy' => [
						'terms' => [
							'field' => 'rooms.rent_only',
							'size' => 10000,
						]
					]
				]
			])

			->addAggregate('feature_alko', [
				'terms' => [
					'field' => 'restaurant_alcohol',
					'size' => 10000,
				]
			])

			->addAggregate('feature_fejerverk', [
				'terms' => [
					'field' => 'restaurant_firework',
					'size' => 10000,
				]
			])

			->addAggregate('feature_podarok', [
				'terms' => [
					'field' => 'restaurant_commission',
					'size' => 10000,
				]
			]);


		return $query->search();
	}

	public static function getFilter($filterState)
	{
		$enabledFilterItemsList = [];
		$aggregateResult = UpdateFilterItems::getAggregateResult($filterState);


		if ($aggregateResult['aggregations']['capacity_group']['doc_count'] > 0 && !isset($filterState['guests'])) {
			$map = [
				'*-15.0' => '15',
				'15.0-19.0' => '15-19',
				'20.0-29.0' => '20-29',
				'30.0-39.0' => '30-39',
				'40.0-49.0' => '40-49',
				'50.0-59.0' => '50-59',
				'60.0-79.0' => '60-79',
				'80.0-99.0' => '80-99',
				'100.0-149.0' => '100-149',
				'150.0-199.0' => '150-199',
				'200.0-299.0' => '200-299',
				'300.0-*' => '300',
			];
			$tmp = '';
			foreach ($aggregateResult['aggregations']['capacity_group']['guests']['buckets'] as $key => $value) {
				if (array_key_exists($value['key'], $map) && $value['doc_count'] > 0) {
					$tmp .= $map[$value['key']] . ',';
				}
			}
			$enabledFilterItemsList['guests'] = substr($tmp, 0, -1);
		}

		if ($aggregateResult['aggregations']['rest_type']['doc_count'] > 0 && !isset($filterState['type'])) {
			$map = [
				'2' => 'banquet-hall',
				'1' => 'restaurant',
				'25' => 'hotel',
				'3' => 'cafe',
				'36' => 'loft',
				'27' => 'assembly-hall',
				'28' => 'anticafe',
				'31' => 'art-space',
				'13' => 'recreation-base',
				'9' => 'banquet-complex',
				'30' => 'terrace',
				'11' => 'country-complex',
				'35' => 'concert-hall',
				'15' => 'cottage',
				'12' => 'cultural-complex',
				'17' => 'summer-ground',
				'16' => 'night-club',
				'10' => 'entertainment-complex',
				'8' => 'restaurant-complex',
				'37' => 'dancing-hall',
			];
			$tmp = '';
			foreach ($aggregateResult['aggregations']['rest_type']['type']['buckets'] as $key => $value) {
				if (array_key_exists($value['key'], $map) && $value['doc_count'] > 0) {
					$tmp .= $map[$value['key']] . ',';
				}
			}
			$enabledFilterItemsList['type'] = substr($tmp, 0, -1);
		}

		if ($aggregateResult['aggregations']['price_group']['doc_count'] > 0 && !isset($filterState['cheque'])) {
			$map = [
				'*-1200.0' => '1200',
				'1200.0-1599.0' => '1200-1599',
				'1600.0-1999.0' => '1600-1999',
				'2000.0-2499.0' => '2000-2499',
				'2500.0-*' => '2500',
			];
			$tmp = '';
			foreach ($aggregateResult['aggregations']['price_group']['cheque']['buckets'] as $key => $value) {
				if (array_key_exists($value['key'], $map) && $value['doc_count'] > 0) {
					$tmp .= $map[$value['key']] . ',';
				}
			}
			$enabledFilterItemsList['cheque'] = substr($tmp, 0, -1);
		}




		// Features filter START
		if ($aggregateResult['aggregations']['feature_location_group']['doc_count'] > 0 && !isset($filterState['feature_location'])) {
			$map = [
				'6' => 'za-gorodom',
				'1' => 'ryadom-s-vodoemom',
				'2' => 'ryadom-s-vodoemom',
				'7' => 'ryadom-s-vodoemom',
			];
			$tmp = '';
			foreach ($aggregateResult['aggregations']['feature_location_group']['feature_location']['buckets'] as $key => $value) {
				if (array_key_exists($value['key'], $map) && $value['doc_count'] > 0) {
					$tmp .= $map[$value['key']] . ',';
				}
			}
			// $enabledFilterItemsList['feature_location'] = substr($tmp, 0, -1);
			$enabledFilterItemsList['feature'] = $tmp;
		}

		foreach ($aggregateResult['aggregations']['feature_s_edoy_group']['feature_s_edoy']['buckets'] as $key => $edaItem) {
			if ($edaItem['key'] === 1 && $edaItem['doc_count'] > 0 && !isset($filterState['feature_s_edoy_group'])) {
				// $enabledFilterItemsList['feature_s_edoy'] = 'so-svoej-edoj';
				$enabledFilterItemsList['feature'] .= 'so-svoej-edoj' . ',';
			}
		}

		foreach ($aggregateResult['aggregations']['feature_alko']['buckets'] as $key => $alkoItem) {
			if ($alkoItem['key'] === 1 && $alkoItem['doc_count'] > 0 && !isset($filterState['feature_alko'])) {
				// $enabledFilterItemsList['feature_alko'] = 'so-svoim-alkogolem';
				$enabledFilterItemsList['feature'] .= 'so-svoim-alkogolem' . ',';
			}
		}

		foreach ($aggregateResult['aggregations']['feature_fejerverk']['buckets'] as $key => $fejerverkItem) {
			if ($fejerverkItem['key'] === 1 && $fejerverkItem['doc_count'] > 0 && !isset($filterState['feature_fejerverk'])) {
				// $enabledFilterItemsList['feature_fejerverk'] = 's-fejerverkom';
				$enabledFilterItemsList['feature'] .= 's-fejerverkom' . ',';
			}
		}

		foreach ($aggregateResult['aggregations']['feature_podarok']['buckets'] as $key => $podarokItem) {
			if ($podarokItem['key'] === 2 && $podarokItem['doc_count'] > 0 && !isset($filterState['feature_podarok'])) {
				// $enabledFilterItemsList['feature_podarok'] = 's-podarkom-ot-ploshchadki-za-bron';
				$enabledFilterItemsList['feature'] .= 's-podarkom-ot-ploshchadki-za-bron';
			}
		}
		// Features filter END




		// return $aggregateResult;
		return $enabledFilterItemsList;
	}
}
