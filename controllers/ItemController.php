<?php

namespace app\modules\graduation\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\elastic\RestaurantElastic;
use frontend\modules\graduation\components\Breadcrumbs;
use common\models\elastic\ItemsWidgetElastic;
use frontend\components\QueryFromSlice;
use frontend\modules\graduation\models\ElasticItems;
use common\models\Seo;
use yii\web\NotFoundHttpException;

class ItemController extends Controller
{

	public function actionIndex($id, $slug)
	{
		$elastic_model = new ElasticItems;
		$item = $elastic_model::find()->query([
			'bool' => [
				'must' => [
					['match' => ['restaurant_slug' => $slug]],
					['match' => ['restaurant_city_id' => \Yii::$app->params['subdomen_id']]],
				],
			]
		])->one();

		if (empty($item)) {
			throw new NotFoundHttpException();
		}

		$seo = new Seo('item', 1, 0, $item, 'rest');
		$seo = $seo->seo;
		$this->setSeo($seo);

		//$item = ApiItem::getData($item->restaurants->gorko_id);
		if (isset($_SERVER['HTTP_REFERER'])) {
			$slice_obj = new QueryFromSlice(basename($_SERVER['HTTP_REFERER']));
		} else {
			$slice_obj = (object)['flag' => false];
		}

		if ($slice_obj->flag) {
			$slice_alias = basename($_SERVER['HTTP_REFERER']);
		} else {
			$type = $item->restaurant_types[0]['id'];
			$types = [
				1 => 'restorany',
				2 => 'banketnye-zaly',
				3 => 'kafe',
				4 => 'bary',
				16 => 'kluby',
			];
			if (isset($types[$item->restaurant_types[0]['id']])) {
				$slice_alias = $types[$item->restaurant_types[0]['id']];
			} else {
				$slice_alias = $types[1];
			}
		}

		$seo['h1'] = $item->restaurant_name;
		// $seo['breadcrumbs'] = Breadcrumbs::get_breadcrumbs(3, false, $item);
		$seo['breadcrumbs'] = Breadcrumbs::get_breadcrumbs(3, $slice_alias, ['id' => $item->id, 'name' => $item->restaurant_name]);
		$seo['desc'] = $item->restaurant_name;
		$seo['address'] = $item->restaurant_address;

		$other_rooms = $item->rooms;

		// echo '<pre>';
		// print_r($other_rooms);
		// exit;

		$other_rests = ElasticItems::find()->limit(20)->query([
			'bool' => [
				'must' => [
					['match' => ['restaurant_district' => $item->restaurant_district]]
				],
				'must_not' => [
					['match' => ['restaurant_id' => $item->restaurant_id]]
				],
			],
		])->all();
		shuffle($other_rests);
		$other_rests = array_slice($other_rests, 0, 2);

		if($item->restaurant_premium) Yii::$app->params['premium_rest'] = true;
		Yii::$app->params['page_rest'] = true;

		// ===== schemaOrg Product START =====
		$this->setSchema($item, $seo);
		// ===== schemaOrg Product END =====

		// echo ('<pre>');
		// print_r($item);
		// exit;

		return $this->render('index.twig', array(
			'item' => $item,
			'queue_id' => $item->restaurant_gorko_id,
			'seo' => $seo,
			'other_rests' => $other_rests,
			'city_dec' => Yii::$app->params['subdomen_dec'],
			'breadcrumbs' => $seo['breadcrumbs'],
		));
	}





	// public function actionAjaxCalltracking()
	// {

	// 	$data = json_decode($_GET['state']);

	// 	if ($data){
	// 		echo ('<pre>');
	// 		print_r(preg_replace('~[^\d\+]~', '', $data->phone));
	// 		echo ('<pre>');
	// 		print_r($data->clientId);
	// 		exit;
	// 	} else {
	// 		echo ('<pre>');
	// 		print_r(22222);
	// 		exit;
	// 	}
			

	// 	return $data;
	// }




	private function setSeo($seo)
	{
		$this->view->title = $seo['title'];
		$this->view->params['desc'] = $seo['description'];
		$this->view->params['kw'] = $seo['keywords'];
	}

	private function setSchema($rest, $seo)
	{
		$name = $rest->restaurant_name;
		$count_rooms = 1;
		if (!empty($rest['rooms'])) {
			$count_rooms = count($rest['rooms']);
		}

		$json_str = '';
		$json_str .= '{
				"@context": "https://schema.org",
				"@type": [
					"LocalBusiness",
					"Product"
				],
				"name": "' . $name . '",
				"description": "' . $seo['description'] . '",
				"image":"' . $rest['restaurant_images'][0]['waterpath'] . '",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "' . $rest['restaurant_address'] . '",
					"addressLocality": "' . Yii::$app->params['subdomen_name'] . '",
					"addressCountry": "RUS"
				},
				"telephone": "' . $rest['restaurant_phone'] . '"';

		if ($rest->restaurant_max_check) {
			$json_str .= ',';
			$json_str .= '
				"offers": {
					"@type": "AggregateOffer",
					"priceCurrency": "RUB",
					"highPrice": "' . $rest['restaurant_max_check'] . '",
					"lowPrice": "' . $rest['restaurant_min_check'] . '",
					"offerCount": "' . $count_rooms . '"
				';

			if (!empty($rest['rooms'])) {
				$json_str .= ',';
				$json_str .= '"offers" : [ ';
				foreach ($rest['rooms'] as $key => $room) {
					$json_str .= '
					{
						"@type": "Offer",
						"price": "' . $room['price'] . '",
						"priceCurrency": "RUB"
					}';
					if (($key + 1) < $count_rooms) {
						$json_str .= ',';
					}
				}
				$json_str .= ']}';
			} else {
				$json_str .= '}';
			}
		}

		$json_str .= '}';

		Yii::$app->params['schema_product'] = $json_str;
	}
}
