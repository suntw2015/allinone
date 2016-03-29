<?php
/**
 * Date:        2015/12/3
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:WxService.class.php
 */

namespace Service\WxService;

class WxService{
    protected $wxclass = "";

    public function __construct(){
        $this->wxclass = new \Org\Wechat\Wechat(C("WECHAT_OPTIONS"));
    }

    public function userinfo($openid){
        $userinfo = $this->wxclass->getUserInfo($openid);

        return $userinfo;
    }

    public function userlist(){

        $userlist = $this->wxclass->getUserList();
        $openidlist = $userlist["data"]["openid"];

        $userinfo = array();
        foreach($openidlist as $key=>$value){
            $userinfo[] = $this->wxclass->getUserInfo($value);
        }

        return $userinfo;
    }

    public function sendtemplatemsg($data){
         return $this->wxclass->sendTemplateMessage($data);
    }
}