<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use frontend\modules\graduation\assets\AppAsset;
use common\models\Subdomen;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <link rel="icon" type="image/png" href="/img/ny_ball.png">
    <title><?php echo $this->title ?></title>
    <?php $this->head() ?>
    <?php if (!empty($this->params['desc'])) echo "<meta name='description' content='".$this->params['desc']."'>";?>
    <?php if (!empty($this->params['kw'])) echo "<meta name='keywords' content='".$this->params['kw']."'>";?>
    <?= Html::csrfMetaTags() ?>

</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTTPDSK"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<?php $this->beginBody() ?>

    <div class="main_wrap">
        
        <header>
            <div class="header_wrap">

                <div class="header_menu">

                    <a href="/" class="header_logo">

                        <div class="header_logo_img"></div>
                        <div class="header_logo_text">
                            
                                <div>Выпускной <?php echo date('Y') + 1 ?></div>
                                <div>Подбор площадки для выпускного вечера</div>
                            
                        </div>
                        
                    </a>
                    
                    <!-- <div class="city_select_search_wrapper _hide">
                        
                        <p class="back_to_header_menu">
                            <span>Назад в меню</span>
                        </p>

                        <h4>Выберите город</h4>

                        <div class="city_name_input">
                            <input type="text" placeholder="Название города">
                        </div>

                        <div class="city_select_list">

                            <#?php
                                $subdomen_list = Subdomen::find()
                                    ->where(['active' => 1])
                                    ->orderBy(['name' => SORT_ASC])
                                    ->all();

                                function createCityNameLine($city){
                                    if($city->alias){
                                        $newLine = "<p><a href='https://$city->alias.graduation.ru'>$city->name</a></p>";
                                    }
                                    else{
                                        $newLine = "<p><a href='https://graduation.ru'>$city->name</a></p>";
                                    }
                                    return $newLine;
                                }

                                function createLetterBlock($letter){
                                    $newBlock = "<div class='city_select_letter_block' data-first-letter=$letter>";
                                    return $newBlock;
                                }

                                function createCityList($subdomen_list){
                                    $citiesListResult = "";
                                    $currentLetterBlock = "";

                                    foreach ($subdomen_list as $key => $subdomen){
                                        $currentFirstLetter = substr($subdomen->name, 0, 1);
                                        if ($currentFirstLetter !== $currentLetterBlock){
                                            $currentLetterBlock = $currentFirstLetter;
                                            $citiesListResult .= "</div>";
                                            $citiesListResult .= createLetterBlock($currentLetterBlock);
                                            $citiesListResult .= createCityNameLine($subdomen);
                                        } else {
                                            $citiesListResult .= createCityNameLine($subdomen);
                                        }
                                    }
                                        
                                    $citiesListResult .= "</div>";
                                    echo substr($citiesListResult, 6);
                                }

                                createCityList($subdomen_list);
                            ?>

                        </div>

                    </div> -->

                    <div class="city_select_search_wrapper _hide">
                        
                        <p class="back_to_header_menu">
                            <span>Назад в меню</span>
                        </p>

                        <h4>Выберите город</h4>

                        <div class="city_name_input">
                            <input type="text" placeholder="Название города">
                        </div>

                        <div class="city_select_list">

                            <div class="city_select_letter_block">
                                <div class="capital_letter">А</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Алушта</a>
                                    <a href="#" class="city_name">Артем</a>
                                    <a href="#" class="city_name">Архангельск</a>
                                    <a href="#" class="city_name">Астрахань</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Б</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Барнаул</a>
                                    <a href="#" class="city_name">Белгород</a>
                                    <a href="#" class="city_name">Бийск</a>
                                    <a href="#" class="city_name">Брянск</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">В</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Великий Новгород</a>
                                    <a href="#" class="city_name">Владивосток</a>
                                    <a href="#" class="city_name">Владимир</a>
                                    <a href="#" class="city_name">Волгоград</a>
                                    <a href="#" class="city_name">Волжский</a>
                                    <a href="#" class="city_name">Воронеж</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Г</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Гатчина</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Д</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Дзержинск</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Е</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Екатеринбург</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">И</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Иваново</a>
                                    <a href="#" class="city_name">Ижевск</a>
                                    <a href="#" class="city_name">Иркутск</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">К</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Казань</a>
                                    <a href="#" class="city_name">Калининград</a>
                                    <a href="#" class="city_name">Калуга</a>
                                    <a href="#" class="city_name">Кемерово</a>
                                    <a href="#" class="city_name">Киров</a>
                                    <a href="#" class="city_name">Кострома</a>
                                    <a href="#" class="city_name">Краснодар</a>
                                    <a href="#" class="city_name">Красноярск</a>
                                    <a href="#" class="city_name">Курск</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Л</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Липецк</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">М</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Магнитогорск</a>
                                    <a href="#" class="city_name">Москва</a>
                                    <a href="#" class="city_name">Мурманск</a>
                                    <a href="#" class="city_name">Мытищи</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Н</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Набережные Челны</a>
                                    <a href="#" class="city_name">Нижний Новгород</a>
                                    <a href="#" class="city_name">Нижний Тагил</a>
                                    <a href="#" class="city_name">Новокузнецк</a>
                                    <a href="#" class="city_name">Новороссийск</a>
                                    <a href="#" class="city_name">Новосибирск</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">О</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Омск</a>
                                    <a href="#" class="city_name">Орел</a>
                                    <a href="#" class="city_name">Оренбург</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">П</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Пенза</a>
                                    <a href="#" class="city_name">Пермь</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Р</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Ростов-на-Дону</a>
                                    <a href="#" class="city_name">Рязань</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">С</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Самара</a>
                                    <a href="#" class="city_name">Санкт-Петербург</a>
                                    <a href="#" class="city_name">Саранск</a>
                                    <a href="#" class="city_name">Саратов</a>
                                    <a href="#" class="city_name">Севастополь (Крым)</a>
                                    <a href="#" class="city_name">Симферополь</a>
                                    <a href="#" class="city_name">Смоленск</a>
                                    <a href="#" class="city_name">Сочи</a>
                                    <a href="#" class="city_name">Ставрополь</a>
                                    <a href="#" class="city_name">Стерлитамак</a>
                                    <a href="#" class="city_name">Сургут</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Т</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Таганрог</a>
                                    <a href="#" class="city_name">Тамбов</a>
                                    <a href="#" class="city_name">Тверь</a>
                                    <a href="#" class="city_name">Тольятти</a>
                                    <a href="#" class="city_name">Томск</a>
                                    <a href="#" class="city_name">Тула</a>
                                    <a href="#" class="city_name">Тюмень</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">У</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Улан-Удэ</a>
                                    <a href="#" class="city_name">Ульяновск</a>
                                    <a href="#" class="city_name">Уфа</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Х</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Хабаровск</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Ч</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Чебоксары</a>
                                    <a href="#" class="city_name">Челябинск</a>
                                    <a href="#" class="city_name">Череповец</a>
                                    <a href="#" class="city_name">Чита</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Э</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Энгельс</a>
                                </div>
                            </div>
                            <div class="city_select_letter_block">
                                <div class="capital_letter">Я</div>
                                <div class="city_list">
                                    <a href="#" class="city_name">Ярославль</a>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="header_menu_wrapper">

                        <a class="header_menu_item <?if(!empty($this->params['menu']) and $this->params['menu'] == 'banketnye-zaly')echo '_active';?>" href="/ploshhadki/">Банкетные&ensp; залы</a>
                        <a class="header_menu_item <?if(!empty($this->params['menu']) and $this->params['menu'] == 'restorany')echo '_active';?>" href="/ploshhadki/">Рестораны</a>
                        <a class="header_menu_item <?if(!empty($this->params['menu']) and $this->params['menu'] == 'restorany')echo '_active';?>" href="/ploshhadki/">Лофт</a>
                        <a class="header_menu_item <?if(!empty($this->params['menu']) and $this->params['menu'] == 'restorany')echo '_active';?>" href="/ploshhadki/">11 класс</a>
                        <a class="header_menu_item <?if(!empty($this->params['menu']) and $this->params['menu'] == 'restorany')echo '_active';?>" href="/ploshhadki/">9 класс</a>
                        <a class="header_menu_item <?if(!empty($this->params['menu']) and $this->params['menu'] == 'blog')echo '_active';?>" href="/blog/">Идеи для выпускного</a>
                        <div class="header_callback_button">
                            <p>Подобрать зал</p>
                        </div>
                    </div>

                    <div class="header_phone">
                        <a href="tel:+78462057845">8 (846) 205-78-45</a>
                        <div class="header_city_select _grey_link">

                            <span><?=Yii::$app->params['subdomen_name']?></span>

                        </div>
                    </div>

                    <div class="header_burger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </div>

                <div class="comments" style="display: none;">
                </div>

                <div class="header_form_popup _hide">
                    <div class="content_block form_booking_wrapper">

                    {{ this.render('//components/generic/form_booking1.twig', {'items':other_rooms}) | raw }}

                    </div>
                </div>

            </div>
        </header>

        <div class="content_wrap">
            <?= $content ?>
        </div>

        <footer>
            <div class="footer_container">
                <div class="footer_wrap">
                    <div class="footer_row">
                        <div class="footer_block _left">
                            <div class="footer_phone">
                                <a href="tel:+78462057845">8 (846) 205-78-45</a>
                            </div>
                            <div class="footer_callback_button">
                                <p>Подобрать зал в Санкт-Петербурге</p>
                            </div>
                        </div>
                        <div class="footer_block _right">
                            <div class="footer_logo"></div>
                            <div class="footer_block_logo_text">
                                <div>Выпускной <?php echo date('Y') - 1 ?></div>
                                <div>Подбор площадки для выпускного вечера</div>
                            </div>
                            <div class="footer_block_copyright">
                                <span>© Выпускной <?php echo date('Y') - 1 ?></span>
                                <a href="/privacy/" class="footer_pc _link"><p>Политика конфиденциальности</p></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    </div> 

<?php $this->endBody() ?>
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,600&amp;display=swap&amp;subset=cyrillic" rel="stylesheet">
</body>
</html>
<?php $this->endPage() ?>
