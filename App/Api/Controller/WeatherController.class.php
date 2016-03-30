<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/3/30
 * Time: 17:15
 */

namespace Api\Controller;
use Think\Controller;

class WeatherController extends \Lib\Controller\BaseController{

    public function asyncProvence(){
        $weatherService = new \Service\WeatherService\WeatherService();
        $weatherModel = new \Api\Model\WeatherModel();
        $provence = $weatherService->getProvenceList();
        foreach($provence as $key=>$value){
            $city = $weatherService->getCityList($value['pid']);
            foreach($city as $k=>$v){
                $town = $weatherService->getTownList($v['cid']);
                foreach($town as $tk=>$tv){
                    $tmparr = array(
                        "pid"   => $value['pid'],
                        "pname" => $value['pname'],
                        "cid"   => $v['cid'],
                        "cname" => $v['cname'],
                        "tid"   => $tv['tid'],
                        "tname" => $tv['tname'],
                    );
                    $weatherModel->add($tmparr);
                }
            }
        }
    }
}