<?php
/**
 * Date:        2015/4/24
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:BaseController.class.php
 */

namespace Lib\Controller;
use Think\Controller;

class BaseController extends Controller{
    protected $user=null;

    protected $uid=0;

    protected $blogs=null;

    protected $userauth=null;

    protected $data=array();

    protected $needlogin=true;

    protected  $ajaxdata=array("status"=>"success","msg"=>"");

    public function _initialize(){
//        $this->_authenticate();
        G('begin');
    }

    public function __destruct(){
    }

    private function _authenticate(){
        if($this->needlogin!==false) {
            $authenticateLogic = new \Home\Logic\AuthenticateLogic();
            $res = $authenticateLogic->checkLogin();
            if (!$res) {
                $this->redirect("/Home/Login/index");
                exit;
            }
            $this->user = $res;
            $this->uid = $this->user["id"];
            $this->blogs = $this->user["blogs"];
        }
    }

    protected function apiInvalid($msg=""){
        if(strlen($msg)==0){
            $msg="接口参数错误";
        }
        $this->ajaxdata["status"]="notvalid";
        $this->ajaxdata["msg"]=$msg;
        $this->ajaxReturn($this->ajaxdata);
        exit;
    }

    protected function apiFail($msg=""){
        if(strlen($msg)==0){
            $msg = "系统发生错误，青稍后再试";
        }

        $this->ajaxdata["status"]="fail";
        $this->ajaxdata["msg"]=$msg;
        $this->ajaxReturn($this->ajaxdata);
        exit;
    }

    protected function apiLoginRequired($msg = '')
    {
        $this->ajaxdata['status'] = 'notlogin';
        $this->ajaxdata['msg'] = empty($msg) ? '需要登录' : $msg;
        $this->ajaxReturn($this->ajaxdata);
        exit;
    }

    protected function apiSuccess($data = array())
    {
        $this->ajaxdata['status'] = 'success';
        $this->ajaxdata['msg'] = '';
        $this->ajaxdata['data'] = $data;
        $this->ajaxReturn($this->ajaxdata);
        exit;
    }

    public function locationredirect($url){
        header("Location: ".$url);exit;
    }

    public function checkparam($param,$errmsg){
        if(empty($param)){
            $this->apiFail($errmsg);
        }
    }
}