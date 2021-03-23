<?php

namespace app\modules\graduation\widgets;

use Yii;
use yii\bootstrap\Widget;
use backend\models\Filter;

class FilterWidget extends Widget
{
    public $filter_active;
    public $filter_model;

    public function run()
    {
        $filter = [];
        $required_filters = [];
    	$filter_model = $this->filter_model;
        foreach ($filter_model as $filter_row) {
            $alias = $filter_row->alias;
            $filter[$alias] = [];
            $filter[$alias]['type'] = $filter_row->type;
            $filter[$alias]['sort'] = $filter_row->sort;
            $filter[$alias]['name'] = $filter_row->name;
            $filter[$alias]['active'] = null;
            foreach ($filter_row->items as $filter_item) {
                $filter[$alias]['items'][$filter_item->value] = $filter_item->text;
            }
        }

        foreach ($this->filter_active as $key => $value_arr) {
            foreach ($value_arr as $value) {
                $filter[$key]['active'][$value] = 1;
            }
        }

        return $this->render('//components/filter/filter.twig', [
        	'filters' => $filter,
            'filter_active' => $this->filter_active
        ]);
    }
} 