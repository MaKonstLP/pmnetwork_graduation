<?php

namespace app\modules\graduation\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use common\models\Pages;
use common\models\Seo;

class StaticController extends Controller
{

	public function actionPrivacy()
	{
		$page = Pages::find()
			->where([
				'type' => 'privacy',
			])
			->one();

		$seo = new Seo('privacy', 1);
		$this->setSeo($seo->seo);

		// echo ('<pre>');
		// print_r($seo);
		// exit;

		return $this->render('privacy.twig', [
			'page' => $page,
			'seo' => $seo->seo,
			'city_dec' => Yii::$app->params['subdomen_dec'],
		]);
	}

	public function actionRobots()
	{
		return 'User-agent: *
Sitemap:  https://svadbanaprirode.com/sitemap/  ';
	}

	public function actionBrowserconfig()
	{
		Yii::$app->response->format = \yii\web\Response::FORMAT_RAW;
		Yii::$app->response->headers->add('Content-Type', 'text/xml');

		return $this->renderPartial('browserconfig.twig', []);
	}

	public function actionSiteWebmanifest()
	{
		Yii::$app->response->format = \yii\web\Response::FORMAT_RAW;
		Yii::$app->response->headers->add('Content-Type', 'application/manifest+json');

		return $this->renderPartial('site-webmanifest.twig', []);
	}

	private function setSeo($seo)
	{
		$this->view->title = $seo['title'];
		$this->view->params['desc'] = $seo['description'];
		$this->view->params['kw'] = $seo['keywords'];
	}
}
