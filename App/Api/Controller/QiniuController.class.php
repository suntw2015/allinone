<?php
	/**
	 * Created by PhpStorm.
	 * User: tianwen
	 * Date: 2015/8/13
	 * Time: 10:34
	 */

namespace Api\Controller;
use Think\Controller;
use Think\Upload\Driver\Qiniu;

class QiniuController extends \Lib\Controller\BaseController{

	public function syncfile(){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);
		$res = $qiniuconnect->getList();
		$filearr = array();

		foreach($res["items"] as $key=>$value){
			$url = $qiniuconnect->downLink($value["key"]);

			$filearr[] = array(
				"key"       => $value["key"],
				"hash"      => $value["hash"],
				"fsize"     => $value["fsize"],
				"mimetype"  => $value["mimeType"],
				"url"       => $url,
				"createon"  => doputTime($value["putTime"]),
			);
		}

		$qiniuLogic = new \Api\Logic\QiniuLogic();
		$qiniuLogic->savefiles($filearr);

		$this->apiSuccess("sync success");
	}

	public function filelist($pageindex=1,$pagesize=10,$mimetype="image/jpeg"){

		$pageindex = $pageindex<=0? 1 : $pageindex;

		$qiniuLogic = new \Api\Logic\QiniuLogic();
		$res = $qiniuLogic->filelist($pageindex,$pagesize,$mimetype);

		$this->apiSuccess($res);
	}

	public function imagelist($pageindex=1,$pagesize=10,$mimetype="image/jpeg"){
		$pageindex = $pageindex<=0? 1 : $pageindex;

		$qiniuLogic = new \Api\Logic\QiniuLogic();
		$res = $qiniuLogic->imageViewList($pageindex,$pagesize,$mimetype);

		$this->apiSuccess($res);
	}

	public function update($file){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);

		$res = $qiniuconnect->upload($qiniuconf,$file);
		$this->apiSuccess($res);
	}

	public function rename($file,$newfile){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);

		$res = $qiniuconnect->rename($file,$newfile);

		$this->apiSuccess($res);
	}

	public function delete($file){

		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);

		$res = $qiniuconnect->del($file);

		$this->apiSuccess($res);
	}

	public function buckets(){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);
		$res = $qiniuconnect->getBuckets();
		$this->apiSuccess($res);
	}

	public function move($from_buckets,$fromkey,$to_buckets,$tokey){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);
		$res = $qiniuconnect->move($from_buckets,$fromkey,$to_buckets,$tokey);
		$this->apiSuccess($res);
	}

	public function changemime($buckets,$key,$mime){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);
		$res = $qiniuconnect->changeMime($buckets,$key,$mime);
		$this->apiSuccess($res);
	}
}