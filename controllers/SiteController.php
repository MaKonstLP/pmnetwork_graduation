<?php

namespace app\modules\graduation\controllers;

use Yii;
use yii\base\InvalidArgumentException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use common\widgets\FilterWidget;
use frontend\components\Declension;
use frontend\components\PremiumMixer;
use common\models\Pages;
use common\models\Filter;
use common\models\Slices;
use common\models\elastic\ItemsFilterElastic;
use frontend\modules\graduation\models\ElasticItems;
use common\models\Seo;
use frontend\modules\pmnbd\models\MediaEnum;
use frontend\modules\graduation\components\UpdateFilterItems;

class SiteController extends Controller
{
	//public function getViewPath()
	//{
	//    return Yii::getAlias('@app/modules/svadbanaprirode/views/site');
	//}

	public function actionIndex()
	{
		//ElasticItems::refreshIndex();
		//exit;

		$filter_model = Filter::find()->with('items')->where(['active' => 1])->orderBy(['sort' => SORT_ASC])->all();
		$slices_model = Slices::find()->all();
		// $seo = $this->getSeo('index');
		// $this->setSeo($seo);


		$elastic_model = new ElasticItems;
		// $items = new ItemsFilterElastic([], 10, 1, false, 'restaurants', $elastic_model);
		$items = PremiumMixer::getItemsWithPremium([], 10, 1, false, 'restaurants', $elastic_model, false, false, false, false, false, true);

		$itemsAllPages = new ItemsFilterElastic([], $items->total, 1, false, 'restaurants', $elastic_model);

		$minPrice = 999999;
		foreach ($itemsAllPages->items as $item) {
			if ($item->restaurant_price < $minPrice && $item->restaurant_price !== 250) { // второе условие - костыль под опечатку в инфе из горько
				$minPrice = $item->restaurant_price;
			}
		}

		if ($minPrice === 999999) {
			$minPrice = 2100;
		}

		$seo = $this->getSeo('index', 1, $items->total, $minPrice);
		$this->setSeo($seo);

		// $seo_texts = [];
		// array_push($seo_texts, isset($seo['text_1']) ? $seo['text_1'] : '', isset($seo['text_2']) ? $seo['text_2'] : '', isset($seo['text_3']) ? $seo['text_3'] : '');
		// shuffle($seo_texts);
		// $random_seo_text = array_slice($seo_texts, 0, 1);
		$random_seo_text = isset($seo['text_1']) ? $seo['text_1'] : '';

		// echo "<pre>";
		// print_r($items);
		// exit;


		$newFilterItemState = UpdateFilterItems::getFilter([]);

		$filter = FilterWidget::widget([
			'filter_active' => [],
			'filter_model' => $filter_model,
			'total' => $items->total,
			'subdomen_filter_active' 	=> $newFilterItemState
		]);

		$mainWidget = $this->renderPartial('//components/generic/profitable_offer.twig', [
			'items' => $items->items,
			'city_rod' => Yii::$app->params['subdomen_rod'],
		]);

		// echo ('<pre>');
		// print_r($items->items);
		// exit;

		return $this->render('index.twig', [
			'items' => $items->items,
			'filter' => $filter,
			'count' => $items->total,
			'mainWidget' => '$mainWidget',
			'seo' => $seo,
			'subid' => isset(Yii::$app->params['subdomen_id']) ? Yii::$app->params['subdomen_id'] : false,
			'city_dec' => Yii::$app->params['subdomen_dec'],
			'random_seo_text' => $random_seo_text,
			'cur_year' => Yii::$app->params['cur_year'],
			'next_year' => Yii::$app->params['next_year'],
		]);
	}

	public function actionError()
	{
		return $this->render('error.twig');
	}

	public function actionRobots()
	{
		header('Content-type: text/plain');
		if (Yii::$app->params['subdomen_alias']) {
			$subdomen_alias = Yii::$app->params['subdomen_alias'] . '.';
		} else {
			$subdomen_alias = '';
		}
		echo "User-agent: *\n";
		echo "Sitemap: https://".$subdomen_alias."vypusknoy-vecher.ru/sitemap/\n";
		echo "Sitemap: https://".$subdomen_alias."vypusknoy-vecher.ru/sitemap-images.xml\n";
		echo "User-agent: Yandex\n";
		echo "Clean-param: __cf_chl_tk\n";
		echo "Clean-param: __cf_chl_f_tk\n";
		echo "Clean-param: __cf_chl_rt_tk\n";
		exit;
	}



	// private function getSeo($type, $page = 1, $count = 0)
	// {
	// 	// $seo = new Seo($type, $page, $count);
	// 	$seo = (new Seo($type, $page, $count))->withMedia([MediaEnum::ADVANTAGES]);

	// 	return $seo->seo;
	// }

	private function getSeo($type, $page = 1, $count = 0, $min_price)
	{
		$seo = (new Seo($type, $page, $count, $item = false, $item_type = 'room', $rest_item = null, $min_price))->withMedia([MediaEnum::ADVANTAGES]);

		return $seo->seo;
	}

	private function setSeo($seo)
	{
		$this->view->title = $seo['title'];
		$this->view->params['desc'] = $seo['description'];
		$this->view->params['kw'] = $seo['keywords'];
	}
}
