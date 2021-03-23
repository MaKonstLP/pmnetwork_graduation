<?php
namespace app\modules\graduation\controllers;

use Yii;
use yii\web\Controller;

class PostController extends Controller
{

  public function actionIndex(){
    return $this->render('index.twig');
  }

}