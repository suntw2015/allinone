<?php
	/**
	 * Created by Tianwen Sun.
	 * Date: 2015/12/14
	 * Time: 11:29
	 * Project: allinone
	 */

namespace Home\Model;

class WxuserModel extends \Lib\Model\AppModel{

	protected $trueTableName = "a_wxuser";

	public function findUser($openid){
		$conditions = array("openid" => $openid);

		return $this->Model->where($conditions)->find();
	}

	public function isExist($openid){
		$conditions = array("openid" => $openid,"status"=>1);

		return $this->Model->where($conditions)->find();
	}
}