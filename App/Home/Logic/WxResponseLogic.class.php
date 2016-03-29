<?php
/**
 * Date:        2015/10/26
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:WxResponseLogic.class.php
 */

namespace Home\Logic;

class WxResponseLogic{

    //用户openid
    private $fromuser = "";

    //服务号id
    private $touser   = "";

    //消息类型
    private $msgtype  = "";

    //消息内容
    private $content  = "";

    public function __construct($msgobj) {
        if(empty($msgobj)){
            E("微信消息不能为空");
        }

        $this->fromuser = $msgobj->FromUserName;
        $this->touser   = $msgobj->ToUserName;
        $this->msgtype  = $msgobj->MsgType;
        $this->content  = $msgobj->Content;
    }

    public function doResponse(){
        $msgType = $this->msgtype;

        $dealfunction = $msgType."Response";
        $dealfunction = method_exists($this,$dealfunction) ? $dealfunction : "defaultResponse";

        $this->$dealfunction();
    }

    public function textResponse(){
        $content = $this->content;
        $matchs  = array();
        $cmd     = "";
        $params  = array();

        $regexp = "/^#[\d\w]+#/";
        if(preg_match($regexp,$content,$matchs)!=0){
            $cmd = substr($matchs[0],1,-1);

            $params = explode(" ",$content);
            array_shift($params);
        }

        if(!empty($cmd)){
            $this->cmdResponse($cmd,$params);
        }

        switch($content){
            default:
                $this->msgresponse($str);
                break;
        }
        exit;
    }

    private function imageResponse($msgobj){
        $imageTpl = "<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]]></MsgType>
                        <Content><![CDATA[%s]]></Content>
                        <FuncFlag>0</FuncFlag>
                    </xml>";

        $fromUsername   = $msgobj->FromUserName;
        $toUsername     = $msgobj->ToUserName;
        $picUrl         = $msgobj->PicUrl;
        $mediaId        = $msgobj->MediaId;
        $msgType        = "text";
        $timeNow        = time();
        $contentStr     = sprintf("您输入了一张图片,MediaId为：%s,链接为:%s",$mediaId,$picUrl);
        $resultStr      = sprintf($imageTpl,$fromUsername,$toUsername,$timeNow,$msgType,$contentStr);
        echo $resultStr;
        exit;
    }

    private function vioceResponse($msgobj){

    }

    private function locationResponse($msgobj){
        $imageTpl = "<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]]></MsgType>
                        <Content><![CDATA[%s]]></Content>
                        <FuncFlag>0</FuncFlag>
                    </xml>";

        $fromUsername   = $msgobj->FromUserName;
        $toUsername     = $msgobj->ToUserName;
        $locationx      = $msgobj->Location_X;
        $locationy      = $msgobj->Location_Y;
        $locationinfo   = $msgobj->Label;
        $msgType        = "text";
        $timeNow        = time();
        $contentStr     = sprintf("您发送了一个位置信息,经度为：%s,维度为:%s,具体为:%s",$locationx,$locationy,$locationinfo);
        $resultStr      = sprintf($imageTpl,$fromUsername,$toUsername,$timeNow,$msgType,$contentStr);
        echo $resultStr;
        exit;
    }

    private function defaultResponse($msgobj){
        $this->msgresponse("");
        exit;
    }

    private function newsResponse($msgobj){
        $newTpl= " <xml>
                    <ToUserName><![CDATA[%s]]></ToUserName>
                    <FromUserName><![CDATA[%s]]></FromUserName>
                    <CreateTime>%s</CreateTime>
                    <MsgType><![CDATA[%s]]></MsgType>
                    <ArticleCount>%s</ArticleCount>
                    <Articles>
                    %s
                    </Articles>
                </xml>";

        $acticlesTpl = "<item>
                        <Title><![CDATA[%s]]></Title>
                        <Description><![CDATA[%s]]></Description>
                        <PicUrl><![CDATA[%s]]></PicUrl>
                        <Url><![CDATA[%s]]></Url>
                        </item>";

        $newsList = array(
            array(
                "title" => "韩国一家独大引热议 LOL或成下个星际2",
                "description" => "韩国一家独大引热议 LOL或成下个星际2",
                "picurl" => "http://img3.dwstatic.com/lol/1510/309868457485/309868607646.jpg",
                "url" => "http://lol.duowan.com/1510/309868457485.html",
            ),
            array(
                "title" => "10月25日半决赛综述：KOO横扫FNC晋级决赛",
                "description" => "10月25日半决赛综述：KOO横扫FNC晋级决赛",
                "picurl" => "http://ossweb-img.qq.com/upload/webplat/info/lol/201510/1445794185_1436653066_2830_imageAddr.jpg",
                "url" => "http://lol.qq.com/webplat/info/news_version3/152/4579/4580/m3106/201510/391189.shtml",
            ),
            array(
                "title" => "韩国一家独大引热议 LOL或成下个星际2",
                "description" => "韩国一家独大引热议 LOL或成下个星际2",
                "picurl" => "http://img3.dwstatic.com/lol/1510/309868457485/309868607646.jpg",
                "url" => "http://lol.duowan.com/1510/309868457485.html",
            ),
        );

        $fromUsername = $msgobj->FromUserName;
        $toUsername = $msgobj->ToUserName;
        $msgType    = "news";
        $contentStr = "";
        $timeNow    = time();
        $acticlecount = count($newsList);

        foreach($newsList as $key=>$value){
            $contentStr .= sprintf($acticlesTpl,$value["title"],$value["description"],$value["picurl"],$value["url"]);
        }
        $resultStr  = sprintf($newTpl,$fromUsername,$toUsername,$timeNow,$msgType,$acticlecount,$contentStr);
        echo $resultStr;
        exit;
    }

    public function cmdResponse($cmd,$params){
        $fromuser = $this->fromuser;

        switch($cmd){
            case "bd":
                $phone = $params[0];
                if(empty($phone)){
                    $this->msgresponse("绑定的手机号不能为空");
                }

                $wechat = new \Org\Wechat\Wechat(C("WECHAT_OPTIONS"));
                $wxinfo = $wechat->getUserInfo($fromuser);

                if(empty($wxinfo)){
                    $this->msgresponse("获取不到您的微信信息，请稍后再试");
                }

                $wxuserModel = new \Home\Model\WxuserModel();
                $userinfo = $wxuserModel ->findUser($fromuser);
                if(!empty($userinfo)){
                    $res = $wxuserModel->doUpdate(array("id"=>$userinfo["id"]),array("phone"=>$phone,"updateon"=>timenow()));
                    $this->msgresponse("绑定成功");
                }

                $res = $wxuserModel->doAdd(array("openid"=>$fromuser,"phone"=>$phone,"nickname"=>$wxinfo["nickname"],"status"=>1,"createon"=>timenow()));
                if(!empty($res)){
                    $this->msgresponse("绑定成功");
                }

                $this->msgresponse("绑定失败");
                break;
            default :
                $this->msgresponse("");
                break;
        }
    }

    private function msgresponse($str){
        $textTpl    = C("WECHAT_MSGTPL.text");

        $fromuser   = $this->fromuser;
        $touser     = $this->touser;
        $msgtype    = "text";
        $contentstr = sprintf($str);
        $timenow    = time();
        $resultstr  = sprintf($textTpl,$fromuser,$touser,$timenow,$msgtype,$contentstr);

        echo $resultstr;exit;
    }
}