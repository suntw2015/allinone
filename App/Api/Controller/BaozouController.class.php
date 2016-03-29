<?php
/**
 * Date:        2015/6/18
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:BaozouController.class.php
 */

namespace Api\Controller;
use Think\Controller;
use Vendor\Http;

class BaozouController extends \Lib\Controller\BaseController{

    public function SyncRecenthot(){
        $baozou_account = C("BAOZOU_ACCOUNT");
        $baozou_api     = C("BAOZOU_API");
        $recent_hot     = $baozou_api["recent_hot"];
        $recent_hot     = str_replace(array("{pageindex}","{pagesize}"),array("1","100"),$recent_hot);
        $http_request = new Http\HttpRequest();
        $res = $http_request->send(Http\HttpMethod::GET,$recent_hot);
        if(empty($res))
            $res = $http_request->send(Http\HttpMethod::GET,$recent_hot);
        $baozouLogic = new \Api\Logic\BaozouLogic();
        return $baozouLogic->SaveArticle($res["articles"]);
    }

    public function index(){
        echo "aaa";
    }

    public function SyncAll(){
        $baozou_account = C("BAOZOU_ACCOUNT");
        $baozou_api     = C("BAOZOU_API");
        $recent_hot     = $baozou_api["recent_hot"];
        $recent_hot     = str_replace(array("{pageindex}","{pagesize}"),array("1","1"),$recent_hot);
        $http_request = new Http\HttpRequest();
        $res = $http_request->send(Http\HttpMethod::GET,$recent_hot);
        if(empty($res))
            $res = $http_request->send(Http\HttpMethod::GET,$recent_hot);

        $totalcount = $res["total_count"];
        $pagesize = 100;
        $pageindex = 0;
        $totalpage   = ceil($totalcount/$pagesize);
        while($pageindex++<$totalpage){
            $recent_hot     = $baozou_api["recent_hot"];
            $recent_hot     = str_replace(array("{pageindex}","{pagesize}"),array($pageindex,$pagesize),$recent_hot);
            $res = $http_request->send(Http\HttpMethod::GET,$recent_hot);
            $baozouLogic = new \Api\Logic\BaozouLogic();
            $baozouLogic->SaveArticle($res["articles"]);
            $temp = sprintf("Complete:  %d/%d  %.2f\n",$pageindex*$pagesize,$totalcount,$pageindex/$totalpage);
            echo $temp;
        }
    }

}