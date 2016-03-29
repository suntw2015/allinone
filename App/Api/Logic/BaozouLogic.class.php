<?php
/**
 * Date:        2015/6/18
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:BaozouLogic.class.php
 */
namespace Api\Logic;

class BaozouLogic {

    public function SaveArticle($data){
        if(empty($data)){
            return false;
        }

        $temp = array();
        foreach($data as $key=>$value){
            $temp["articleid"]  =   $value["id"];
            $temp["seriesid"]   =   $value["series"];
            $temp["title"]      =   $value["title"];
            $temp["image"]      =   $value["pictures"];
            $temp["height"]     =   $value["height"];
            $temp["width"]      =   $value["width"];
            $temp["smallimage"] =   $value["small_pictures"];
            $temp["group"]      =   $value["group"]["name"];
            $temp["createon"]   =   $value["create_at"];
            $temp["syncon"]     =   date("Y-m-d H:i:s",time());
            $temp["userid"]     =   $value["user_id"];
            $temp["username"]   =   $value["user_login"];
            $temp["useravatar"] =   $value["user_avatar"];

            $baozouModel =  new \Api\Model\BaozouModel();
            $res = $baozouModel->getByArticleid($value["id"]);
            if(empty($res)){
                $baozouModel->doAdd($temp);
            }

        }

        return true;
    }

}