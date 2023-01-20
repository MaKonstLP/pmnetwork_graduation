<?php

namespace frontend\modules\graduation\models;

use Yii;

/**
 * This is the model class for table "slices".
 *
 * @property int $table_id
 * @property int $id
 * @property string $name
 * @property string $alias
 */
class RestaurantSpecFilterRel extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'restaurant_spec_filter_rel';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            // [['id', 'name'], 'required'],
            [['name', 'alias'], 'string'],
            [['id', 'table_id'], 'integer']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [

        ];
    }
}