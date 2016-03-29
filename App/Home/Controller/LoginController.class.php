<?php
	/**
	 * Created by PhpStorm.
	 * User: tianwen
	 * Date: 2015/8/14
	 * Time: 19:41
	 */

namespace Home\Controller;
use Think\Controller;

class LoginController extends \Lib\Controller\BaseController{

	protected $needlogin = false;

	public function index(){
		$this->display();
	}
}