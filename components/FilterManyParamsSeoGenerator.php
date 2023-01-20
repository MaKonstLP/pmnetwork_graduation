<?php

namespace frontend\modules\graduation\components;

use Yii;
use yii\base\BaseObject;
use yii\helpers\ArrayHelper;
use common\models\Filter;

class FilterManyParamsSeoGenerator extends BaseObject
{
	public $seo;

	public function __construct($filter, $filterModel)
	{
		// $this->seo = $filter;
		$this->getSeoFromValues($filter, $filterModel);
	}

	private $typesList = [
		'Банкетный зал' => 'Банкетные залы',
		'Ресторан' => 'Рестораны',
		'Ресторан / Кафе' => 'Рестораны',
		'Отель' => 'Отели',
		'Кафе' => 'Кафе',
		'Лофт' => 'Лофты',
		'Актовый зал' => 'Актовые залы',
		'Антикафе' => 'Антикафе',
		'Арт-пространство' => 'Арт-пространства',
		'База отдыха' => 'Базы отдыха',
		'Банкетный комплекс' => 'Банкетные комплексы',
		'Терраса' => 'Террасы',
		'Загородный комплекс' => 'Загородные комплексы',
		'Концертный зал' => 'Концертные залы',
		'Коттедж' => 'Коттеджи',
		'Культурный комплекс' => 'Культурные комплексы',
		'Летняя площадка' => 'Летние площадки',
		'Ночной клуб' => 'Ночные клубы',
		'Развлекательный комплекс' => 'Развлекательные комплексы',
		'Ресторанный комплекс' => 'Ресторанные комплексы',
		'Танцевальный зал' => 'Танцевальные залы',
	];

	public function getSeoFromValues($filter, $filterModel)
	{
		$filterModel = ArrayHelper::index($filterModel, 'alias');
		$paramSring = '';
		$itemsTmp = null;

		$type = '';
		$type_plural = '';
		$guests = '';
		$feature = '';

		foreach ($filter as $key => $item) {

			if (
				count($item) > 1
				|| count($filter) > 2
				|| isset($filter['grade'])
				|| isset($filter['cheque'])
				|| (isset($filter['guests']) && isset($filter['feature']))
			) {
				$this->seo['h1'] = 'Каталог площадок для выпускного в ' . Yii::$app->params['subdomen_dec'];
				$this->seo['title'] = 'Каталог площадок для выпускного 9 и 11 классов в ' . Yii::$app->params['subdomen_dec'];
				$this->seo['description'] = 'Посмотреть полный каталог площадок для проведения выпускных 9 и 11 класса в ' . Yii::$app->params['subdomen_dec'] . '. Список залов, кафе и ресторанов для выпускного вечера 2022.';
				$this->seo['keywords'] = 'каталог площадок для выпускного в ' . mb_strtolower(Yii::$app->params['subdomen_dec']) . ', каталог ресторанов на выпускной 2022 ' . mb_strtolower(Yii::$app->params['subdomen_name']);
				$this->seo['text_top'] = '';
				$this->seo['text_bottom'] = '';
				$this->seo['img_alt'] = '';

				if (isset($filter['feature']) && count($filter) == 1 && count($item) == 1) {
					$this->seo['robots'] = false;
				} else {
					$this->seo['robots'] = true;
				}

				return;
			}
		}

		if (isset($filter['type'])) {
			$itemsTmp = ArrayHelper::index($filterModel['type']['items'], 'value');
			// $paramSring .= $this->typesList[$itemsTmp[$filter['type'][0]]['text']] . ' для выпускного ';
			$type = $itemsTmp[$filter['type'][0]]['text'];
			$type_plural = $this->typesList[$itemsTmp[$filter['type'][0]]['text']];
		}

		if (isset($filter['type']) && isset($filter['guests'])) {
			$itemsTmp = ArrayHelper::index($filterModel['guests']['items'], 'value');
			$guestsNumber = preg_replace('/[^–0-9]/', '', $itemsTmp[$filter['guests'][0]]['text']);
			if ($guestsNumber === '15') {
				// $paramSring .= 'от ' . $guestsNumber . ' человек ';
				$guests = 'от ' . $guestsNumber . ' человек';
			} else {
				// $paramSring .= 'на ' . $guestsNumber . ' человек ';
				$guests = 'на ' . $guestsNumber . ' человек';
			}

			$this->seo['h1'] = $type_plural . ' для выпускного ' . $guests . ' в ' . Yii::$app->params['subdomen_dec'];
			$this->seo['title'] = $type_plural . ' для выпускного вечера ' . $guests . ' в ' . Yii::$app->params['subdomen_dec'];
			$this->seo['description'] = $type_plural . ' для выпускного 2022 ' . $guests . '. ' . $type . ' ' . $guests . ' на выпускной вечер в ' . Yii::$app->params['subdomen_dec'] . ' — бронируйте прямо сейчас.';
			$this->seo['keywords'] = mb_strtolower($type_plural) . ' для выпускного вечера ' . $guests . ' в ' . mb_strtolower(Yii::$app->params['subdomen_dec']);
		} elseif (isset($filter['guests'])) {
			$itemsTmp = ArrayHelper::index($filterModel['feature']['items'], 'value');
			// $paramSring .= $itemsTmp[$filter['feature'][0]]['text'] . ' ';
			$feature = $itemsTmp[$filter['feature'][0]]['text'];

			$this->seo['title'] = 'Площадки для выпускного вечера ' . $feature . ' в ' . Yii::$app->params['subdomen_dec'];
			$this->seo['description'] = 'Площадки для выпускного 2022 ' . $feature . '. Площадка ' . $feature . ' на выпускной вечер в ' . Yii::$app->params['subdomen_dec'] . ' — оставьте заявку прямо сейчас.';
			$this->seo['keywords'] = 'площадки для выпускного вечера ' . $feature . ' в ' . mb_strtolower(Yii::$app->params['subdomen_dec']);
		}

		if (isset($filter['type']) && isset($filter['feature'])) {
			$itemsTmp = ArrayHelper::index($filterModel['feature']['items'], 'value');
			$paramSring .= $itemsTmp[$filter['feature'][0]]['text'] . ' ';
			$feature = $itemsTmp[$filter['feature'][0]]['text'];

			$this->seo['h1'] = $type_plural . ' для выпускного ' . $feature . ' в ' . Yii::$app->params['subdomen_dec'];
			$this->seo['title'] = $type_plural . ' для выпускного вечера ' . $feature . ' в ' . Yii::$app->params['subdomen_dec'];
			$this->seo['description'] = $type_plural . ' для выпускного 2022 ' . $feature . '. ' . $type . ' ' . $feature . ' на выпускной вечер в ' . Yii::$app->params['subdomen_dec'] . ' — оставьте заявку прямо сейчас.';
			$this->seo['keywords'] = mb_strtolower($type_plural) . ' для выпускного вечера ' . $feature . ' в ' . mb_strtolower(Yii::$app->params['subdomen_dec']);
		} elseif (isset($filter['feature'])) {
			$itemsTmp = ArrayHelper::index($filterModel['feature']['items'], 'value');
			// $paramSring .= $itemsTmp[$filter['feature'][0]]['text'] . ' ';
			$feature = $itemsTmp[$filter['feature'][0]]['text'];

			$this->seo['h1'] = 'Площадки для выпускного ' . $feature . ' в ' . Yii::$app->params['subdomen_dec'];
			$this->seo['title'] = 'Площадки для выпускного вечера ' . $feature . ' в ' . Yii::$app->params['subdomen_dec'];
			$this->seo['description'] = 'Площадки для выпускного 2022 ' . $feature . '. Площадка ' . $feature . ' на выпускной вечер в ' . Yii::$app->params['subdomen_dec'] . ' — оставьте заявку прямо сейчас.';
			$this->seo['keywords'] = 'площадки для выпускного вечера ' . $feature . ' в ' . mb_strtolower(Yii::$app->params['subdomen_dec']);
		}

		// $this->seo['h1'] = $paramSring . 'в ' . Yii::$app->params['subdomen_dec'];
		$this->seo['text_top'] = '';
		$this->seo['text_bottom'] = '';
		$this->seo['img_alt'] = '';
		$this->seo['robots'] = false;
	}
}
