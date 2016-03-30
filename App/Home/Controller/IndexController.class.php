<?php
namespace Home\Controller;
use Think\Controller;
use Org\Net;

class IndexController extends \Lib\Controller\BaseController
{
    public function index()
    {
        $ch =curl_init();
        curl_setopt($ch,CURLOPT_URL,'http://www.xiami.com/playersong/getgradesong');

        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_HEADER,false);
        curl_setopt($ch,CURLOPT_HTTPHEADER,0);
        curl_setopt($ch,CURLOPT_COOKIE,'member_auth=2G3IE44Y4z1l06fEGI0yIiMesOGCEjPUx4QChrMrtAUnco9cZ4P9x6uVRAJP3yCSoGHKiRRJSaKYuVk7; user=46977018');

        $content = curl_exec($ch);
        curl_close($ch);
        $content = json_decode($content,true);

        $this->assign("xiamisongs",$content["data"]["songs"]);
        $this->display("index_2");
    }

    public function signate(){
        $this->display();
    }

    public function weixin(){
        $wxservice = new \Service\WxService\WxService();
        $userlist = $wxservice->userlist();
        $this->assign("userlist",$userlist);
        $this->display();
    }

    public function sendtplmsg($openid,$tplid){

        $this->checkparam($openid,"openid can not be null");
        $this->checkparam($tplid,"tplid can not be null");

        $wxservice = new \Service\WxService\WxService();
        $userinfo = $wxservice->userinfo($openid);

        $tpl = "";

        $tpl1 = array(
            "touser"      => "ok18rwGhXlSJ0t3IBiF8iSbt5y90",
            "template_id" => "G2Uo0JPDiwPZXIFyI9jsuYtzYrNd4WdJTLJBqp_12gs",
            "url"         => "http://www.baidu.com",
            "topcolor"    => "#FF0000",
            "data"        => array(
                "username"    => array(
                    "value" => "孙天文",
                    "color" => "#173177"
                ),
                "time"  => array(
                    "value" => timenow(),
                    "color" => "#173177"
                )
            )
        );

        $tpl2 = array(
            "touser"      => $openid,
            "template_id" => "7fzX7TSJVeW2TNP2ZvQSeYqnvsRq6O5hwLUlzdrRpOc",
            "url"         => "http://www.baidu.com",
            "topcolor"    => "#FF0000",
            "data"        => array(
                "nickname"    => array(
                    "value" => $userinfo["nickname"],
                    "color" => "#173177"
                ),
                "sex"  => array(
                    "value" => $userinfo["sex"],
                    "color" => "#173177"
                ),
                "openid"  => array(
                    "value" => $userinfo["openid"],
                    "color" => "#173177"
                ),
                "language"  => array(
                    "value" => $userinfo["language"],
                    "color" => "#173177"
                ),
                "city"  => array(
                    "value" => $userinfo["city"],
                    "color" => "#173177"
                ),
                "province"  => array(
                    "value" => $userinfo["province"],
                    "color" => "#173177"
                ),
                "country"  => array(
                    "value" => $userinfo["country"],
                    "color" => "#173177"
                ),
                "headimgurl"  => array(
                    "value" => $userinfo["headimgurl"],
                    "color" => "#173177"
                ),
                "subscribe_time"  => array(
                    "value" => $userinfo["subscribe_time"],
                    "color" => "#173177"
                ),
            )
        );

        switch($tplid){
            case "G2Uo0JPDiwPZXIFyI9jsuYtzYrNd4WdJTLJBqp_12gs" : {
                $tpl = $tpl1;break;
            }
            case "7fzX7TSJVeW2TNP2ZvQSeYqnvsRq6O5hwLUlzdrRpOc" : {
                $tpl = $tpl2;break;
            }
            default : break;
        }

        $this->checkparam($tpl,"模板不存在");

        $res = $wxservice->sendtemplatemsg($tpl);

        if($res.errCode!=0){
            $this->apiFail($res->errMsg);
        }

        $this->apiSuccess("ok");
    }

    public function bazou(){

        $mainurl = "http://baozouxapi.ibaozou.com/categories";
        $detailurl = "http://baozouxapi.ibaozou.com/images?category_id={id}";

        $sorts = geturl($mainurl);
        $version = $sorts["version"];
        $categories = $sorts["categories"];
        foreach($categories as $key=>$value){
            $realurl = str_replace("{id}", $value["id"], $detailurl);
            $coverurl = $value["url"];
            $covername =  $value["name"];

            $details = geturl($realurl);
            dosave($covername,$details["images"]);
        }
    }

    public function xiami($keyword="",$pageindex=1,$pagesize=20){
        $ch =curl_init();
        curl_setopt($ch,CURLOPT_URL,'http://www.xiami.com/playersong/getgradesong');

        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_HEADER,false);
        curl_setopt($ch,CURLOPT_HTTPHEADER,0);
        curl_setopt($ch,CURLOPT_COOKIE,'member_auth=2G3IE44Y4z1l06fEGI0yIiMesOGCEjPUx4QChrMrtAUnco9cZ4P9x6uVRAJP3yCSoGHKiRRJSaKYuVk7; user=46977018');

        $content = curl_exec($ch);
        curl_close($ch);
        $content = json_decode($content,true);
        $this->apiSuccess($content["data"]);
    }

    public function test($str){
       // $responLogic = new \Home\Logic\WxResponseLogic(array("ss"));
        //$responLogic->textResponse();
$songModel = new \Home\Model\SongModel();
$res = $songModel->getSongByName($str);
$this->apiSuccess($res);
    }

    public function ceshi(){
//        $this->display();
        $qqmusicservice = new \Service\QQMusicService\QQMusicService();
        $list = $qqmusicservice->getsonglist(12);
        $this->apiSuccess($list);
    }

    public function qqmusicinfo(){
        $qqmusicService = new \Service\QQMusicService\QQMusicService();
        $this->apiSuccess($qqmusicService->info());
    }

    public function testweather(){
//        $weatherService = new \Service\WeatherService\WeatherService();
//        $res = $weatherService->getWeather(101150301);
//        echo json_encode($res);
    }
}
