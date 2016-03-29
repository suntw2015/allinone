<?php
/**
 * Date:        2015/10/23
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:WxController.class.php
 */

namespace Home\Controller;

class WxController extends \Lib\Controller\BaseController{

    protected $wxclass = "";

    public function _initialize(){
        parent::_initialize();
        $this->wxclass = new \Org\Wechat\Wechat(C("WECHAT_OPTIONS"));
    }

    public function valid()
    {
        $echoStr = $_GET["echostr"];

        if(empty($echoStr)){
            $this->responseMsg();
        }else{
            if($this->checkSignature()){
                echo $echoStr;
                exit;
            }

        }
    }

    public function responseMsg()
    {
        //get post data, May be due to the different environments
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        libxml_disable_entity_loader(true);
        $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
        $wxResponseLogic = new \Home\Logic\WxResponseLogic($postObj);
        $wxResponseLogic->doResponse();
    }

    private function checkSignature()
    {
        // you must define TOKEN by yourself

        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = C("WXTOKEN");
        $tmpArr = array($token, $timestamp, $nonce);
        // use SORT_STRING rule
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );

        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }
}