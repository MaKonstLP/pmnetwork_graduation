<?php

namespace app\modules\graduation\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\widgets\FilterWidget;
use frontend\widgets\PaginationWidget;
// use frontend\modules\graduation\widgets\PaginationWidget;
use frontend\components\ParamsFromQuery;
use frontend\components\QueryFromSlice;
use frontend\modules\graduation\components\Breadcrumbs;
use frontend\modules\graduation\components\FilterManyParamsSeoGenerator;
use common\models\Pages;
use frontend\components\RoomsFilter;
use frontend\components\PremiumMixer;
use common\models\Filter;
use common\models\Slices;
use common\models\GorkoApi;
use common\models\elastic\ItemsFilterElastic;
use frontend\modules\graduation\models\ElasticItems;
use common\models\Seo;
use frontend\modules\pmnbd\models\MediaEnum;
use frontend\modules\graduation\components\UpdateFilterItems;


class ListingController extends Controller
{
	protected $per_page = 12;

	public $filter_model,
		$slices_model;

	public function beforeAction($action)
	{
		Pages::createSiteObjects();
		$this->filter_model = Filter::find()->with('items')->where(['active' => 1])->orderBy(['sort' => SORT_ASC])->all();
		$this->slices_model = Slices::find()->all();

		return parent::beforeAction($action);
	}

	public function actionSlice($slice)
	{
		// if ($slice == 11) $slice = '11-grade';
		// if ($slice == 9) $slice = '9-grade';
		$slice_params_arr = ['9', '11', '15', '15-19', '20-29', '30-39', '40-49', '50-59', '60-79', '80-99', '100-149', '150-199', '200-299', '300'];

		if (in_array($slice, $slice_params_arr)) {
			if ($slice == 9 || $slice == 11) {
				$slice = $slice.'-grade';
			} else {
				$slice = $slice.'-guests';
			}
		}

		$slice_obj = new QueryFromSlice($slice);
		// echo ('<pre>');
		// print_r($slice_obj);
		// exit;
		if ($slice_obj->flag) {
			$this->view->params['menu'] = $slice;
			$params = $this->parseGetQuery($slice_obj->params, Filter::find()->with('items')->orderBy(['sort' => SORT_ASC])->all(), $this->slices_model);
			isset($_GET['page']) ? $params['page'] = $_GET['page'] : $params['page'];

			$canonical = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'], 2)[0];
			if ($params['page'] > 1) {
				$canonical .= $params['canonical'];
			}

			return $this->actionListing(
				$page 			=	$params['page'],
				$per_page		=	$this->per_page,
				$params_filter	= 	$params['params_filter'],
				// $breadcrumbs 	=	Breadcrumbs::get_breadcrumbs(2),
				$breadcrumbs 	=	Breadcrumbs::get_breadcrumbs(2, $slice),
				$canonical 		= 	$canonical,
				$type 			=	$slice
			);
		} else {
			return $this->goHome();
		}
	}

	public function actionIndex()
	{
		function transliterate($textcyr = null, $textlat = null)
		{
			$cyr = array(
				'ж',  'ч',  'щ',   'ш',  'ю',  'а', 'б', 'в', 'г', 'д', 'е', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ъ', 'ь', 'я', 'ы',
				'Ж',  'Ч',  'Щ',   'Ш',  'Ю',  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ъ', 'Ь', 'Я', 'Ы'
			);
			$lat = array(
				'zh', 'ch', 'sht', 'sh', 'yu', 'a', 'b', 'v', 'g', 'd', 'e', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'y', 'x', 'q', 'y',
				'Zh', 'Ch', 'Sht', 'Sh', 'Yu', 'A', 'B', 'V', 'G', 'D', 'E', 'Z', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'c', 'Y', 'X', 'Q', 'Y'
			);
			if ($textcyr) return str_replace($cyr, $lat, $textcyr);
			else if ($textlat) return str_replace($lat, $cyr, $textlat);
			else return null;
		}

		$getQuery = $_GET;
		unset($getQuery['q']);
		if (count($getQuery) > 0) {
			$params = $this->parseGetQuery($getQuery, $this->filter_model, $this->slices_model);
			$canonical = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'], 2)[0];
			if ($params['page'] > 1) {
				$canonical .= $params['canonical'];
			}

			return $this->actionListing(
				$page 			=	$params['page'],
				$per_page		=	$this->per_page,
				$params_filter	= 	$params['params_filter'],
				$breadcrumbs 	=	Breadcrumbs::get_breadcrumbs(1),
				$canonical 		= 	$canonical,
				$type = 'all_items'
			);
		} else {
			$canonical = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'], 2)[0];

			return $this->actionListing(
				$page 			=	1,
				$per_page		=	$this->per_page,
				$params_filter	= 	[],
				$breadcrumbs 	= 	Breadcrumbs::get_breadcrumbs(1),
				$canonical 		= 	$canonical,
				$type = 'all_items'
			);
		}
	}

	public function actionListing($page, $per_page, $params_filter, $breadcrumbs, $canonical, $type = false)
	{
		// echo ('<pre>');
		// print_r(Yii::$app->params['subdomen_baseid']);
		// exit;
		$elastic_model = new ElasticItems;
		// $items = new ItemsFilterElastic($params_filter, $per_page, $page, false, 'restaurants', $elastic_model);
		$items = PremiumMixer::getItemsWithPremium($params_filter, $per_page, $page, false, 'restaurants', $elastic_model, false, false, false, false, false, true);

		$itemsAllPages = new ItemsFilterElastic($params_filter, $items->total, $page, false, 'restaurants', $elastic_model);

		$minPrice = 999999;
		foreach ($itemsAllPages->items as $item) {
			if ($item->restaurant_price < $minPrice && $item->restaurant_price !== 250) { // второе условие - костыль под опечатку в инфе из горько
				$minPrice = $item->restaurant_price;
			}
		}

		if ($minPrice === 999999) {
			$minPrice = 2100;
		}

		if ($page > 1) {
			$seo['text_top'] = '';
			$seo['text_bottom'] = '';
		}

		$newFilterItemState = UpdateFilterItems::getFilter([]);

		$filter = FilterWidget::widget([
			'filter_active' 			=> $params_filter,
			'filter_model' 				=> $this->filter_model,
			'total' 					=> $items->total,
			'subdomen_filter_active' 	=> $newFilterItemState
		]);

		$pagination = PaginationWidget::widget([
			'total' => $items->pages,
			'current' => $page,
		]);

		$seo_type = $type ? $type : 'listing';

		if ($seo_type !== 'listing' && $seo_type !== 'all_items') {
			// $seo = $this->getSeo($seo_type, 1, $items->total, $minPrice);
			$seo = $this->getSeo($seo_type, $page, $items->total, $minPrice);
			$seo['breadcrumbs'] = $breadcrumbs;
		} elseif ($seo_type == 'all_items') {
			// $seo = $this->getSeo('listing', 1, $items->total, $minPrice);
			$seo = $this->getSeo('listing', $page, $items->total, $minPrice);
			$seo['breadcrumbs'] = $breadcrumbs;
			$seo['robots'] = true;
		} else {
			$seo = (new FilterManyParamsSeoGenerator($params_filter, $this->filter_model, $page))->seo;
			$seo['breadcrumbs'] = $breadcrumbs;
		}
		$this->setSeo($seo, $page, $canonical);

		// $seo_texts = [];
		// array_push($seo_texts, isset($seo['text_1']) ? $seo['text_1'] : '', isset($seo['text_2']) ? $seo['text_2'] : '', isset($seo['text_3']) ? $seo['text_3'] : '');
		// shuffle($seo_texts);
		// $random_seo_text = array_slice($seo_texts, 0, 1);
		$random_seo_text = isset($seo['text_1']) ? $seo['text_1'] : '';

		// echo ('<pre>');
		// print_r($seo['text_1']);
		// exit;

		if ($seo_type == 'listing' and count($params_filter) > 0) {
			$seo['text_top'] = '';
			$seo['text_bottom'] = '';
		}

		$main_flag = ($seo_type == 'listing' and count($params_filter) == 0);

		// echo ('<pre>');
		// print_r($items->items);
		// exit;

		return $this->render('index.twig', array(
			'items' => $items->items,
			'filter' => $filter,
			'pagination' => $pagination,
			'seo' => $seo,
			'count' => $items->total,
			'menu' => $type,
			'main_flag' => $main_flag,
			'city_dec' => Yii::$app->params['subdomen_dec'],
			'breadcrumbs' => $seo['breadcrumbs'],
			'random_seo_text' => $random_seo_text,
			'cur_year' => Yii::$app->params['cur_year'],
		));
	}

	public function actionAjaxGetTotal()
	{
		$params = $this->parseGetQuery(json_decode($_GET['filter'], true), $this->filter_model, $this->slices_model);
		$elastic_model = new ElasticItems;
		$items = new ItemsFilterElastic($params['params_filter'], 1, $params['page'], false, 'restaurants', $elastic_model);
		return json_encode([
			'total' => $items->total,
			// 'filter' => $_POST['filter']
		]);
	}

	public function actionAjaxFilter()
	{
		$params = $this->parseGetQuery(json_decode($_GET['filter'], true), $this->filter_model, $this->slices_model);

		$elastic_model = new ElasticItems;
		// $items = new ItemsFilterElastic($params['params_filter'], $this->per_page, $params['page'], false, 'restaurants', $elastic_model);
		$items = PremiumMixer::getItemsWithPremium($params['params_filter'], $this->per_page, $params['page'], false, 'restaurants', $elastic_model, false, false, false, false, false, true);

		$itemsAllPages = new ItemsFilterElastic($params['params_filter'], $items->total, 1, false, 'restaurants', $elastic_model);

		$minPrice = 999999;
		foreach ($itemsAllPages->items as $item) {
			if ($item->restaurant_price < $minPrice && $item->restaurant_price !== 250) { // второе условие - костыль под опечатку в инфе из горько
				$minPrice = $item->restaurant_price;
			}
		}

		if ($minPrice === 999999) {
			$minPrice = 2100;
		}

		$pagination = PaginationWidget::widget([
			'total' => $items->pages,
			'current' => $params['page'],
		]);

		// substr($params['listing_url'], 0, 1) == '?' ? $breadcrumbs = Breadcrumbs::get_breadcrumbs(1) : $breadcrumbs = Breadcrumbs::get_breadcrumbs(2);
		$slice_url = ParamsFromQuery::isSlice(json_decode($_GET['filter'], true));

		!$slice_url ? $breadcrumbs = Breadcrumbs::get_breadcrumbs(1) : $breadcrumbs = Breadcrumbs::get_breadcrumbs(2, $slice_url);

		$seo_type = $slice_url ? $slice_url : 'listing';


		if ($_GET['filter'] == '{"page":1}')
			$seo_type = 'all_items';

		// echo "<pre>";
		// print_r($params['listing_url']);
		// exit;

		// if ($seo_type !== 'listing' && $seo_type !== 'all_items') {
		// 	echo 1;exit;
		// 	$seo = $this->getSeo($seo_type, 1);
		// 	$seo['breadcrumbs'] = $breadcrumbs;
		// } elseif ($seo_type == 'all_items') {
		// 	echo 2;exit;
		// 	$seo = $this->getSeo('listing', 1);
		// 	$seo['breadcrumbs'] = $breadcrumbs;
		// } else {
		// 	echo 3;exit;
		// 	$seo = (new FilterManyParamsSeoGenerator($params['params_filter'], $this->filter_model, $params['page']))->seo;
		// 	$seo['breadcrumbs'] = $breadcrumbs;
		// }


		if ($seo_type !== 'listing' && $seo_type !== 'all_items') {
			// echo 1;exit;
			// $seo = $this->getSeo($seo_type, 1, $items->total, $minPrice);
			$seo = $this->getSeo($seo_type, $params['page'], $items->total, $minPrice);
			$seo['breadcrumbs'] = $breadcrumbs;
		} elseif (strripos($params['listing_url'], '&', 0) !== false || $slice_url) {
			// echo 3;exit;
			$seo = (new FilterManyParamsSeoGenerator($params['params_filter'], $this->filter_model, $params['page']))->seo;
			$seo['breadcrumbs'] = $breadcrumbs;
		} else {
			// echo 2;exit;
			$seo = $this->getSeo('listing', 1, $items->total, $minPrice);
			$seo['breadcrumbs'] = $breadcrumbs;
		}

		$text_bottom = $seo['text_bottom'];
		$seo['breadcrumbs'] = $breadcrumbs;

		$title = $this->renderPartial('//components/generic/title.twig', array(
			'seo' => $seo,
			'count' => $items->total,
			'breadcrumbs' => $seo['breadcrumbs'],
		));

		if ($params['page'] == 1) {
			$text_top = $this->renderPartial('//components/generic/text.twig', array('text' => $seo['text_top']));
			$text_bottom = $this->renderPartial('//components/generic/text.twig', array('text' => $seo['text_bottom']));
		} else {
			$text_top = '';
			$text_bottom = '';
		}

		if ($seo_type == 'listing' and count($params['params_filter']) > 0) {
			$text_top = '';
			$text_bottom = '';
		}

		return  json_encode([
			'listing' => $this->renderPartial('//components/generic/listing.twig', array(
				'items' => $items->items,
				'img_alt' => $seo['img_alt'],
			)),
			'pagination' => $pagination,
			'url' => $params['listing_url'],
			'title' => $title,
			'text_top' => $text_top,
			'text_bottom' => $text_bottom,
			'seo_title' => $seo['title'],
			'seo_type' => $seo_type,
			'total' => $items->total,
			'seo' => $seo,
		]);
	}

	public function actionAjaxFilterSlice()
	{
		$slice_url = ParamsFromQuery::isSlice(json_decode($_GET['filter'], true));

		return $slice_url;
	}

	private function parseGetQuery($getQuery, $filter_model, $slices_model)
	{
		$return = [];
		if (isset($getQuery['page'])) {
			$return['page'] = $getQuery['page'];
		} else {
			$return['page'] = 1;
		}

		$temp_params = new ParamsFromQuery($getQuery, $filter_model, $this->slices_model);

		$return['params_api'] = $temp_params->params_api;
		$return['params_filter'] = $temp_params->params_filter;
		$return['listing_url'] = $temp_params->listing_url;
		$return['canonical'] = $temp_params->canonical;
		return $return;
	}

	// private function getSeo($type, $page, $count = 0)
	// {
	// 	$seo = new Seo($type, $page, $count);

	// 	return $seo->seo;
	// }

	private function getSeo($type, $page = 1, $count = 0, $min_price)
	{
		// echo ('<pre>');
		// print_r($page);
		// exit;
		$seo = (new Seo($type, $page, $count, $item = false, $item_type = 'room', $rest_item = null, $min_price));

		return $seo->seo;
	}

	private function setSeo($seo, $page, $canonical)
	{
		$this->view->title = $seo['title'];
		$this->view->params['desc'] = $seo['description'];
		if (isset($seo['robots'])) {
			$this->view->params['robots'] = $seo['robots'];
		}
		if ($page != 1) {
			$this->view->params['canonical'] = $canonical;
		}
		$this->view->params['kw'] = $seo['keywords'];
	}
}
