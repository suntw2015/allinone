<?php
/**
 * Date:        2015/6/25
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:BaozouModel.class.php
 */

namespace Api\Model;
use Think\Model;

class BaozouModel extends \Lib\Model\AppModel{
    protected $trueTableName="bz_article";

    public function getByArticleid($articleid){
        $conditions = array(
            "articleid"=>$articleid,
        );
        return $this->Model->where($conditions)->find();
    }

    public function getall(){
        return $this->Model->select();
    }
}