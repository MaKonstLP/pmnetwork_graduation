<?php

namespace app\modules\graduation\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\helpers\Html;
use common\components\GorkoLeadApi;

class FormController extends Controller
{
	public function beforeAction($action)
	{
		$this->enableCsrfValidation = false;
		return parent::beforeAction($action);
	}

	public function actionSend()
	{
		$payload = [];

		if (!isset($_POST['phone']) || !isset($_POST['cityID']))
			return 1;

		if (isset($_POST['name']))
			$payload['name'] = $_POST['name'];
		if (isset($_POST['phone']))
			$payload['phone'] = $_POST['phone'];
		if (isset($_POST['guests']))
			$payload['guests'] = $_POST['guests'];
		if (isset($_POST['cityID']))
			$payload['city_id'] = $_POST['cityID'];
		if (isset($_POST['event_type']))
			$payload['event_type'] = $_POST['event_type'];
		if (isset($_POST['date_hidden']))
			$payload['date'] = $_POST['date_hidden'];
		if (isset($_POST['count']))
			$payload['email'] = $_POST['count'];
		$payload['details'] = '';
		if (isset($_POST['coment_text']))
			$payload['details'] .= $_POST['coment_text'] . '';
		if (isset($_POST['url']))
			$payload['details'] .= 'Заявка отправлена с ' . $_POST['url'];
		if (isset($_POST['restName']))
			$payload['details'] .= ', название ресторана: ' . $_POST['restName'];
		if (isset($_POST['restUrl']))
			$payload['details'] .= ', url ресторана: ' . $_POST['restUrl'];
		if (isset($_POST['venue_id']))
			$payload['venue_id'] = $_POST['venue_id'];

		// $resp = GorkoLeadApi::send_lead('v.gorko.ru', 'vypusknoy-vecher.ru', $payload);
		$resp = GorkoLeadApi::send_lead('v.gorko.ru', 'graduation', $payload);

		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		return $resp;
	}
}
