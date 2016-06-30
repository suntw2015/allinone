<?php
	/**
	 * Created by PhpStorm.
	 * User: sunti
	 * Date: 2016/6/30
	 * Time: 14:23
	 */

namespace Home\Controller;
use Think\Controller;

class ChatController extends \Lib\Controller\BaseController{

	protected $qqService;

	public function __construct() {
		parent::__construct();
		$this->qqService = new \Service\QQService\QQService();
	}

	public function index(){
		$res = $this->qqService->getLoginQrcode();

		header("Content-Type:image/png");
		echo $res;exit;
	}

	public function getQrcodeStatus(){
		$res = $this->qqService->getQrcodeStatus();

		echo json_encode($res);
	}

	public function getptwebqq(){
		$res = $this->qqService->getptwebqq();

		$this->ajaxReturn($res);exit;
	}

	public function test(){
		echo json_encode($_COOKIE);exit;
	}
}