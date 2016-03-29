<?php
	/**
	 * Created by PhpStorm.
	 * User: tianwen
	 * Date: 2015/8/14
	 * Time: 19:35
	 */

namespace Admin\Controller;
use Think\Controller;

class IndexController extends \Lib\Controller\BaseController{

	protected $needlogin = true;

	public function index(){
		$qiniLogic =new \Api\Logic\QiniuLogic();
		$buckets = $qiniLogic->buckets();
		$filelist = $qiniLogic->filelist();

		$this->assign("buckets",$buckets);
		$this->assign("filelist",$filelist);
		$this->assign("files",$filelist["files"]);
		$this->display();
	}

}