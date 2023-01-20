<?php

namespace frontend\modules\graduation\models;

use Yii;
use common\models\Restaurants;
use common\models\RestaurantsTypes;
use yii\helpers\ArrayHelper;
use common\models\Subdomen;
use common\models\RestaurantsSpec;
use common\models\RestaurantsSpecial;
use common\models\RestaurantsExtra;
use common\models\RestaurantsPremium;
use common\models\RestaurantsLocation;
use common\models\ImagesModule;
use common\models\MetroStationsGlobal;
use common\models\RayoniGlobal;
use common\components\AsyncRenewImages;
use common\models\RestaurantsUniqueId;
use common\widgets\ProgressWidget;

class ElasticItems extends \yii\elasticsearch\ActiveRecord
{
	const MAIN_REST_TYPE_ORDER = [3, 1];

	public function attributes()
	{
		return [
			'id',
			'restaurant_id',
			'restaurant_gorko_id',
			'restaurant_min_capacity',
			'restaurant_max_capacity',
			'restaurant_district',
			'restaurant_district_name',
			'restaurant_parent_district',
			'restaurant_city_id',
			'restaurant_alcohol',
			'restaurant_firework',
			'restaurant_name',
			'restaurant_address',
			'restaurant_cover_url',
			'restaurant_latitude',
			'restaurant_longitude',
			'restaurant_own_alcohol',
			'restaurant_own_alcohol_id',
			'restaurant_cuisine',
			'restaurant_parking',
			'restaurant_extra_services',
			'restaurant_payment',
			'restaurant_special',
			'restaurant_phone',
			'restaurant_images',
			'restaurant_commission',
			'restaurant_types',
			'restaurant_location',
			'restaurant_price',
			'restaurant_spec',
			'restaurant_specials',
			'restaurant_extra',
			'restaurant_slug',
			'restaurant_class',
			'restaurant_rating',
			'restaurant_metro_station',
			'restaurant_unique_id',
			'restaurant_premium',
			'rooms',
			'restaurant_main_type',
		];
	}

	public static function index()
	{
		return 'pmn_graduation_restaurants';
	}

	public static function type()
	{
		return 'items';
	}

	/**
	 * @return array This model's mapping
	 */
	public static function mapping()
	{
		return [
			static::type() => [
				'properties' => [
					'id'                            => ['type' => 'integer'],
					'restaurant_id'                 => ['type' => 'integer'],
					'restaurant_gorko_id'           => ['type' => 'integer'],
					'restaurant_min_capacity'       => ['type' => 'integer'],
					'restaurant_max_capacity'       => ['type' => 'integer'],
					'restaurant_district'           => ['type' => 'integer'],
					'restaurant_district_name'      => ['type' => 'text'],
					'restaurant_parent_district'    => ['type' => 'integer'],
					'restaurant_city_id'            => ['type' => 'integer'],
					'restaurant_alcohol'            => ['type' => 'integer'],
					'restaurant_firework'           => ['type' => 'integer'],
					'restaurant_price'              => ['type' => 'integer'],
					'restaurant_name'               => ['type' => 'text'],
					'restaurant_address'            => ['type' => 'text'],
					'restaurant_cover_url'          => ['type' => 'text'],
					'restaurant_latitude'           => ['type' => 'text'],
					'restaurant_longitude'          => ['type' => 'text'],
					'restaurant_own_alcohol'        => ['type' => 'text'],
					'restaurant_own_alcohol_id'     => ['type' => 'integer'],
					'restaurant_rating'             => ['type' => 'integer'],
					'restaurant_cuisine'            => ['type' => 'text'],
					'restaurant_premium'            => ['type' => 'integer'],
					'restaurant_parking'            => ['type' => 'integer'],
					'restaurant_unique_id'          => ['type' => 'integer'],
					'restaurant_extra_services'     => ['type' => 'text'],
					'restaurant_payment'            => ['type' => 'text'],
					'restaurant_special'            => ['type' => 'text'],
					'restaurant_phone'              => ['type' => 'text'],
					'restaurant_main_type'          => ['type' => 'text'],
					'restaurant_commission'         => ['type' => 'integer'],
					'restaurant_class'              => ['type' => 'integer'],
					'restaurant_slug'               => ['type' => 'keyword'],
					'restaurant_metro_station'      => ['type' => 'text'],
					'restaurant_types'              => ['type' => 'nested', 'properties' => [
						'id'                            => ['type' => 'integer'],
						'name'                          => ['type' => 'text'],
					]],
					'restaurant_spec'               => ['type' => 'nested', 'properties' => [
						'id'                            => ['type' => 'integer'],
						'name'                          => ['type' => 'text'],
					]],
					'restaurant_specials'           => ['type' => 'nested', 'properties' => [
						'id'                            => ['type' => 'integer'],
						'name'                          => ['type' => 'text'],
					]],
					'restaurant_extra'           => ['type' => 'nested', 'properties' => [
						'id'                            => ['type' => 'integer'],
						'name'                          => ['type' => 'text'],
					]],
					'restaurant_location'              => ['type' => 'nested', 'properties' => [
						'id'                            => ['type' => 'integer'],
						'name'                          => ['type' => 'text'],
					]],
					'restaurant_images'             => ['type' => 'nested', 'properties' => [
						'id'                            => ['type' => 'integer'],
						'sort'                          => ['type' => 'integer'],
						'realpath'                      => ['type' => 'text'],
						'subpath'                       => ['type' => 'text'],
						'waterpath'                     => ['type' => 'text'],
						'timestamp'                     => ['type' => 'text'],
					]],
					'rooms'                             => ['type' => 'nested', 'properties' => [
						'id'                            => ['type' => 'integer'],
						'gorko_id'                      => ['type' => 'integer'],
						'restaurant_id'                 => ['type' => 'integer'],
						'price'                         => ['type' => 'integer'],
						'capacity_reception'            => ['type' => 'integer'],
						'capacity'                      => ['type' => 'integer'],
						'type'                          => ['type' => 'integer'],
						'rent_only'                     => ['type' => 'integer'],
						'banquet_price'                 => ['type' => 'integer'],
						'bright_room'                   => ['type' => 'integer'],
						'separate_entrance'             => ['type' => 'integer'],
						'type_name'                     => ['type' => 'text'],
						'name'                          => ['type' => 'text'],
						'features'                      => ['type' => 'text'],
						'cover_url'                     => ['type' => 'text'],
						'payment_model'                 => ['type' => 'text'],
						'images'                        => ['type' => 'nested', 'properties' => [
							'id'                            => ['type' => 'integer'],
							'sort'                          => ['type' => 'integer'],
							'realpath'                      => ['type' => 'text'],
							'subpath'                       => ['type' => 'text'],
							'waterpath'                     => ['type' => 'text'],
							'timestamp'                     => ['type' => 'text'],
						]],
					]]
				]
			],
		];
	}

	/**
	 * Set (update) mappings for this model
	 */
	public static function updateMapping()
	{
		$db = static::getDb();
		$command = $db->createCommand();
		$command->setMapping(static::index(), static::type(), static::mapping());
	}

	/**
	 * Create this model's index
	 */
	public static function createIndex()
	{
		$db = static::getDb();
		$command = $db->createCommand();
		$command->createIndex(static::index(), [
			'settings' => [
				'number_of_replicas' => 0,
				'number_of_shards' => 1,
			],
			'mappings' => static::mapping(),
			//'warmers' => [ /* ... */ ],
			//'aliases' => [ /* ... */ ],
			//'creation_date' => '...'
		]);
	}

	/**
	 * Delete this model's index
	 */
	public static function deleteIndex()
	{
		$db = static::getDb();
		$command = $db->createCommand();
		$command->deleteIndex(static::index(), static::type());
	}

	public static function refreshIndex($params)
	{
		$res = self::deleteIndex();
		$res = self::updateMapping();
		$res = self::createIndex();
		$res = self::updateIndex($params);
	}

	public static function updateIndex($params)
	{
		$connection = new \yii\db\Connection($params['main_connection_config']);
		$connection->open();
		Yii::$app->set('db', $connection);

		$restaurants_types = RestaurantsTypes::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_types = ArrayHelper::index($restaurants_types, 'value');

		$restaurants_specials = RestaurantsSpecial::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_specials = ArrayHelper::index($restaurants_specials, 'value');

		$restaurants_extra = RestaurantsExtra::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_extra = ArrayHelper::index($restaurants_extra, 'value');

		$restaurants_spec = RestaurantsSpec::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_spec = ArrayHelper::index($restaurants_spec, 'id');

		$restaurants_location = RestaurantsLocation::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_location = ArrayHelper::index($restaurants_location, 'value');

		$restaurants_metro_global = MetroStationsGlobal::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_metro_global = ArrayHelper::index($restaurants_metro_global, 'gorko_id');

		$restaurants_rayoni_global = RayoniGlobal::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_rayoni_global = ArrayHelper::index($restaurants_rayoni_global, 'id');

		$restaurants = Restaurants::find()
			->with('rooms')
			->with('imagesext')
			->with('subdomen')
			// ->where(['active' => 1, 'commission' => 2])
			->limit(100000)
			->all();

		$connection = new \yii\db\Connection($params['site_connection_config']);
		$connection->open();
		Yii::$app->set('db', $connection);

		$restaurants_unique_id = RestaurantsUniqueId::find()
			->limit(100000)
			->asArray()
			->all();
		$restaurants_unique_id = ArrayHelper::index($restaurants_unique_id, 'id');

		$images_module = ImagesModule::find()
			->limit(500000)
			->asArray()
			->all();
		$images_module = ArrayHelper::index($images_module, 'gorko_id');

		$restaurants_premium = RestaurantsPremium::find()
			->where(['>', 'finish', time()])
			->limit(100000)
			->asArray()
			->all();
		$restaurants_premium = ArrayHelper::index($restaurants_premium, 'gorko_id');

		$rest_count = count($restaurants);
		$rest_iter = 0;
		foreach ($restaurants as $restaurant) {
			$res = self::addRecord($restaurant, $restaurants_types, $restaurants_spec, $restaurants_specials, $restaurants_extra, $restaurants_location, $images_module, $params, $restaurants_metro_global, $restaurants_rayoni_global, $restaurants_unique_id, $restaurants_premium);
			// echo ProgressWidget::widget(['done' => $rest_iter++, 'total' => $rest_count]);
		}
		echo 'Обновление индекса ' . self::index() . ' ' . self::type() . ' завершено' . "\n";
	}

	public static function getTransliterationForUrl($name)
	{
		$latin = array('-', "Sch", "sch", 'Yo', 'Zh', 'Kh', 'Ts', 'Ch', 'Sh', 'Yu', 'ya', 'yo', 'zh', 'kh', 'ts', 'ch', 'sh', 'yu', 'ya', 'A', 'B', 'V', 'G', 'D', 'E', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', '', 'Y', '', 'E', 'a', 'b', 'v', 'g', 'd', 'e', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', '', 'y', '', 'e');
		$cyrillic = array(' ', "Щ", "щ", 'Ё', 'Ж', 'Х', 'Ц', 'Ч', 'Ш', 'Ю', 'я', 'ё', 'ж', 'х', 'ц', 'ч', 'ш', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Ь', 'Ы', 'Ъ', 'Э', 'а', 'б', 'в', 'г', 'д', 'е', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'ь', 'ы', 'ъ', 'э');
		return trim(
			preg_replace(
				"/(.)\\1+/",
				"$1",
				strtolower(
					preg_replace(
						"/[^a-zA-Z0-9-]/",
						'',
						str_replace($cyrillic, $latin, $name)
					)
				)
			),
			'-'
		);
	}

	public static function addRecord($restaurant, $restaurants_types, $restaurants_spec, $restaurants_specials, $restaurants_extra, $restaurants_location, $images_module, $params, $restaurants_metro_global, $restaurants_rayoni_global, $restaurants_unique_id, $restaurants_premium)
	{
		/* $restaurant_spec_white_list = [11];
		$restaurant_spec_rest = explode(',', $restaurant->restaurants_spec);
		if (count(array_intersect($restaurant_spec_white_list, $restaurant_spec_rest)) === 0) {
			return 'Неподходящий тип мероприятия';
		}

		if (!$restaurant->commission) {
			return 'Не платный';
		} */

		$premium = isset($restaurants_premium[$restaurant->gorko_id]);
		if (!$premium) {
			$restaurant_spec_white_list = [11];
			$restaurant_spec_rest = explode(',', $restaurant->restaurants_spec);
			if (count(array_intersect($restaurant_spec_white_list, $restaurant_spec_rest)) === 0) {
				return 'Неподходящий тип мероприятия';
			}

			if (!$restaurant->active) {
				return 'Не активен';
			}

			if (!$restaurant->commission) {
				return 'Не платный';
			}
		}

		$isExist = false;

		try {
			$record = self::get($restaurant->id);
			if (!$record) {
				$record = new self();
				$record->setPrimaryKey($restaurant->id);
			} else {
				$isExist = true;
			}
		} catch (\Exception $e) {
			$record = new self();
			$record->setPrimaryKey($restaurant->id);
		}

		//Св-ва ресторана
		$record->id = $restaurant->id;
		$record->restaurant_commission = $restaurant->commission;
		$record->restaurant_id = $restaurant->id;
		$record->restaurant_gorko_id = $restaurant->gorko_id;
		$record->restaurant_min_capacity = $restaurant->min_capacity;
		$record->restaurant_max_capacity = $restaurant->max_capacity;
		$record->restaurant_district = $restaurant->district;
		$record->restaurant_parent_district = $restaurant->parent_district;
		$record->restaurant_city_id = $restaurant->city_id;
		$record->restaurant_alcohol = $restaurant->alcohol;
		$record->restaurant_firework = $restaurant->firework;
		$record->restaurant_name = $restaurant->name;
		$record->restaurant_address = $restaurant->address;
		$record->restaurant_cover_url = $restaurant->cover_url;
		$record->restaurant_latitude = $restaurant->latitude;
		$record->restaurant_longitude = $restaurant->longitude;
		$record->restaurant_own_alcohol = $restaurant->own_alcohol;
		$record->restaurant_own_alcohol_id = $restaurant->alcohol;
		$record->restaurant_cuisine = $restaurant->cuisine;
		$record->restaurant_parking = $restaurant->parking;
		$record->restaurant_extra_services = $restaurant->extra_services;
		$record->restaurant_payment = $restaurant->payment;
		$record->restaurant_special = $restaurant->special;
		$record->restaurant_phone = $restaurant->phone;
		$restaurant->rating ? $record->restaurant_rating = $restaurant->rating : $record->restaurant_rating = 90;

		//Картинки ресторана
		$images = [];

		$group = array();
		foreach ($restaurant->imagesext as $value) {
			$group[$value['room_id']][] = $value;
		}
		$images_sorted = array();
		$room_ids = array();
		foreach ($group as $room_id => $images_ext) {
			$room_ids[] = $room_id;
			foreach ($images_ext as $image) {
				$images_sorted[$room_id][$image['event_id']][] = $image;
			}
		}
		$specs = [0, 1];
		$image_flag = false;
		foreach ($specs as $spec) {
			for ($i = 0; $i < 20; $i++) {
				foreach ($room_ids as $room_id) {
					if (isset($images_sorted[$room_id]) && isset($images_sorted[$room_id][$spec]) && isset($images_sorted[$room_id][$spec][$i])) {
						$image = $images_sorted[$room_id][$spec][$i];
						$image_arr = [];
						$image_arr['id'] = $image['gorko_id'];
						$image_arr['sort'] = $image['sort'];
						$search = ['lh3.googleusercontent.com', 'nocdn.gorko.ru'];
						// $image_arr['realpath'] = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $image['path']);
						$image_arr['realpath'] = str_replace($search, 'img.vypusknoy-vecher.ru', $image['path']);
						if (isset($images_module[$image['gorko_id']])) {
							// $image_arr['subpath']   = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['subpath']);
							// $image_arr['waterpath'] = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['waterpath']);
							// $image_arr['timestamp'] = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['timestamp']);
							$image_arr['subpath']   = str_replace($search, 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['subpath']);
							$image_arr['waterpath'] = str_replace($search, 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['waterpath']);
							$image_arr['timestamp'] = str_replace($search, 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['timestamp']);
						} else {
							$queue_id = Yii::$app->queue->push(new AsyncRenewImages([
								'gorko_id'      => $image['gorko_id'],
								'params'        => $params,
								'rest_flag'     => true,
								'rest_gorko_id' => $restaurant->gorko_id,
								'room_gorko_id' => false,
								'elastic_index' => static::index(),
								'elastic_type'  => 'rest',
							]));
						}
						array_push($images, $image_arr);
					}
					if (count($images) > 19) {
						$image_flag = true;
						break;
					}
				}
				if ($image_flag) break;
			}
			if ($image_flag) break;
		}
		$record->restaurant_images = $images;


		//Уникальные св-ва для ресторанов в модуле
		if (isset($restaurants_unique_id[$restaurant->gorko_id]) && $restaurants_unique_id[$restaurant->gorko_id]['unique_id']) {
			$record->restaurant_unique_id = $restaurants_unique_id[$restaurant->gorko_id]['unique_id'];
		} else {
			$restaurants_unique_id_upd = new RestaurantsUniqueId();
			$new_id = RestaurantsUniqueId::find()->max('unique_id') + 1;
			$restaurants_unique_id_upd->unique_id = $new_id;
			$restaurants_unique_id_upd->id = $restaurant->gorko_id;
			$restaurants_unique_id_upd->save();
			$record->restaurant_unique_id = $new_id;
		}

		//Локальный премиум
		$record->restaurant_premium = 0;
		if ($premium)
			$record->restaurant_premium = 1;

		//Тип мероприятия
		$restaurant_spec = [];
		$restaurant_spec_rest = explode(',', $restaurant->restaurants_spec);

		foreach ($restaurant_spec_rest as $key => $value) {
			$restaurant_spec_arr = [];
			$restaurant_spec_arr['id'] = $value;
			$restaurant_spec_arr['name'] = isset($restaurants_spec[$value]['name']) ? $restaurants_spec[$value]['name'] : '';
			array_push($restaurant_spec, $restaurant_spec_arr);
		}

		$record->restaurant_spec = $restaurant_spec;

		/* //Тип помещения
		$restaurant_types = [];
		$restaurant_types_rest = explode(',', $restaurant->type);
		foreach ($restaurant_types_rest as $key => $value) {
			$restaurant_types_arr = [];
			$restaurant_types_arr['id'] = $value;
			$restaurant_types_arr['name'] = isset($restaurants_types[$value]['text']) ? $restaurants_types[$value]['text'] : '';
			array_push($restaurant_types, $restaurant_types_arr);
			if ($value == 36 || $value == 16) {
				$record->restaurant_class = 11;
			}
		}
		if (!$record->restaurant_class) {
			$record->restaurant_class = 9;
		}
		$record->restaurant_types = $restaurant_types; */

		//Тип помещения
		$premium_types = [
			1 => 'Ресторан',
			2 => 'Банкетный зал'
		];
		$restaurant_types = [];
		$restaurant_types_rest = explode(',', $restaurant->type);
		foreach ($restaurant_types_rest as $key => $value) {
			$restaurant_types_arr = [];
			$restaurant_types_arr['id'] = $value;
			$restaurant_types_arr['name'] = isset($restaurants_types[$value]['text']) ? $restaurants_types[$value]['text'] : '';
			array_push($restaurant_types, $restaurant_types_arr);
			if ($value == 36 || $value == 16) {
				$record->restaurant_class = 11;
			}
		}
		if (!$record->restaurant_class) {
			$record->restaurant_class = 9;
		}
		if ($premium) {
			foreach ($premium_types as $premium_type => $premium_type_text) {
				if (!in_array($premium_type, $restaurant_types_rest)) {
					$restaurant_types_arr = [];
					$restaurant_types_arr['id'] = $premium_type;
					$restaurant_types_arr['name'] = $premium_type_text;
					array_push($restaurant_types, $restaurant_types_arr);
				}
			}
		}

		$record->restaurant_types = $restaurant_types;


		$restMainTypeIdsOrder = array_combine(self::MAIN_REST_TYPE_ORDER, self::MAIN_REST_TYPE_ORDER);

		foreach ($record->restaurant_types as $key => $type) {
			if (in_array($type['id'], $restMainTypeIdsOrder)) {
				$restMainTypeIdsOrder[intval($type['id'])] = $type;
			} else {
				$restMainTypeIdsOrder[] = $type;
			}
		}

		$record->restaurant_main_type = array_reduce($restMainTypeIdsOrder, function ($acc, $type) {
			return (empty($acc) && isset($type['name']) ? $type['name'] : $acc);
		}, '') ?: 'Ресторан';



		//Особенности
		$restaurant_specials = [];
		$restaurant_specials_rest = explode(',', $restaurant->special_ids);
		foreach ($restaurant_specials_rest as $key => $value) {
			$restaurant_specials_arr = [];
			$restaurant_specials_arr['id'] = $value;
			$restaurant_specials_arr['name'] = isset($restaurants_specials[$value]['text']) ? $restaurants_specials[$value]['text'] : '';
			array_push($restaurant_specials, $restaurant_specials_arr);
		}
		$record->restaurant_specials = $restaurant_specials;

		//Extra
		$restaurant_extra = [];
		$restaurant_extra_rest = explode(',', $restaurant->extra_services_ids);
		foreach ($restaurant_extra_rest as $key => $value) {
			$restaurant_extra_arr = [];
			$restaurant_extra_arr['id'] = $value;
			$restaurant_extra_arr['name'] = isset($restaurants_extra[$value]['text']) ? $restaurants_extra[$value]['text'] : '';
			array_push($restaurant_extra, $restaurant_extra_arr);
		}
		$record->restaurant_extra = $restaurant_extra;

		//Метро
		$restaurant_metro_global = (explode(',', $restaurant->metro_station_id))[0];
		if ($restaurant_metro_global && isset($restaurants_metro_global[$restaurant_metro_global]))
			$record->restaurant_metro_station = $restaurants_metro_global[$restaurant_metro_global]['name'];

		//Районы
		$restaurant_rayoni_global = $restaurant->district;
		if ($restaurant_rayoni_global && isset($restaurants_rayoni_global[$restaurant_rayoni_global]))
			$record->restaurant_district_name = $restaurants_rayoni_global[$restaurant_rayoni_global]['name'];

		//Тип локации
		$restaurant_location = [];
		$restaurant_location_rest = explode(',', $restaurant->location);
		foreach ($restaurant_location_rest as $key => $value) {
			$restaurant_location_arr = [];
			$restaurant_location_arr['id'] = $value;
			$restaurant_location_arr['name'] = isset($restaurants_location[$value]['text']) ? $restaurants_location[$value]['text'] : '';
			array_push($restaurant_location, $restaurant_location_arr);
		}
		$record->restaurant_location = $restaurant_location;

		if ($row = (new \yii\db\Query())->select('slug')->from('restaurant_slug')->where(['gorko_id' => $restaurant->gorko_id])->one()) {
			$record->restaurant_slug = $row['slug'];
		} else {
			$record->restaurant_slug = self::getTransliterationForUrl($restaurant->name);
			\Yii::$app->db->createCommand()->insert('restaurant_slug', ['gorko_id' => $restaurant->gorko_id, 'slug' =>  $record->restaurant_slug])->execute();
		}

		//Св-ва залов
		$rooms = [];
		$restaurant_price = 9999999999;
		foreach ($restaurant->rooms as $key => $room) {
			$room_arr = [];
			$room_arr['id'] = $room->id;
			$room_arr['gorko_id'] = $room->gorko_id;
			$room_arr['restaurant_id'] = $room->restaurant_id;
			$room_arr['capacity_reception'] = $room->capacity_reception;
			$room_arr['capacity'] = $room->capacity;
			$room_arr['type'] = $room->type;
			$room_arr['rent_only'] = $room->rent_only;
			$room_arr['banquet_price'] = $room->banquet_price;
			$room_arr['bright_room'] = $room->bright_room;
			$room_arr['separate_entrance'] = $room->separate_entrance;
			$room_arr['type_name'] = $room->type_name;
			$room_arr['name'] = $room->name;
			$room_arr['restaurant_main_type'] = $record->restaurant_main_type;
			$room_arr['features'] = $room->features;
			$room_arr['cover_url'] = $room->cover_url;
			$room_arr['price'] = $room->price;
			if (($room->price < $restaurant_price) and $room->price)
				$restaurant_price = $room->price;

			switch ($room->payment_model) {
				case 1:
					$room_arr['payment_model'] = 'Только за еду и напитки';
					break;
				case 2:
					$room_arr['payment_model'] = 'За аренду зала + за еду и напитки';
					break;
				case 3:
					$room_arr['payment_model'] = 'Только аренда (без еды)';
					break;
				default:
					$room_arr['payment_model'] = '';
					break;
			}

			//Картинки залов
			$images = [];
			$image_flag = false;
			foreach ($specs as $spec) {
				for ($i = 0; $i < 20; $i++) {
					if (isset($images_sorted[$room->gorko_id]) && isset($images_sorted[$room->gorko_id][$spec]) && isset($images_sorted[$room->gorko_id][$spec][$i])) {
						$image = $images_sorted[$room->gorko_id][$spec][$i];
						$image_arr = [];
						$image_arr['id'] = $image['gorko_id'];
						$image_arr['sort'] = $image['sort'];
						$image_arr['realpath'] = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $image['path']);;
						if (isset($images_module[$image['gorko_id']])) {
							$image_arr['subpath']   = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['subpath']);
							$image_arr['waterpath'] = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['waterpath']);
							$image_arr['timestamp'] = str_replace('lh3.googleusercontent.com', 'img.vypusknoy-vecher.ru', $images_module[$image['gorko_id']]['timestamp']);
						} else {
							$queue_id = Yii::$app->queue->push(new AsyncRenewImages([
								'gorko_id'      => $image['gorko_id'],
								'params'        => $params,
								'rest_flag'     => false,
								'rest_gorko_id' => $restaurant->gorko_id,
								'room_gorko_id' => $room->gorko_id,
								'elastic_index' => static::index(),
								'elastic_type'  => 'rest',
							]));
						}
						array_push($images, $image_arr);
					}
					if (count($images) > 19) {
						$image_flag = true;
						break;
					}
				}
				if ($image_flag) break;
			}
			$room_arr['images'] = $images;

			array_push($rooms, $room_arr);
		}
		$record->rooms = $rooms;

		$record->restaurant_price = $restaurant_price;



		try {
			if (!$isExist) {
				$result = $record->insert();
			} else {
				$result = $record->update();
			}
		} catch (\Exception $e) {
			$result = $e;
		}

		return $result;
	}
}
