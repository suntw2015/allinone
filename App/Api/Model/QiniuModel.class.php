<?php
	/**
	 * Created by PhpStorm.
	 * User: tianwen
	 * Date: 2015/8/13
	 * Time: 9:36
	 */

namespace Api\Model;
use Think\Model;

class QiniuModel extends \Lib\Model\AppModel{

	protected $trueTableName = "qn_file";

	public function SaveOrUpdate($fileinfo){
		if(empty($fileinfo)){
			return false;
		}

		$conditions = array("key"=>$fileinfo["key"]);

		if($this->Model->where($conditions)->data($fileinfo)->save()){
			return true;
		}

		return $this->Model->data($fileinfo)->add();
	}


	public function GetFileList($pageindex,$pagesize,$mimetype="image/jpeg"){
		$conditions =array("mimetype"=>$mimetype);

		return $this->Model->where($conditions)->order("createon desc")->page($pageindex,$pagesize)->select();
	}

	public function GetCount($mimetype="image/jpeg"){
		$conditions = array("mimetype"=>$mimetype);

		return $this->Model->where($conditions)->count();
	}
}