<?php
	/**
	 * Created by PhpStorm.
	 * User: tianwen
	 * Date: 2015/8/13
	 * Time: 10:27
	 */

namespace Api\Logic;
use Think\Upload\Driver\Qiniu;

class QiniuLogic{

	public function savefiles($files){

		$qiniuModel = new \Api\Model\QiniuModel();
		foreach($files as $key=>$value){
			$qiniuModel->SaveOrUpdate($value);
		}
	}

	public function filelist($pageindex=1,$pagesize=20,$mimrtype="image/jpeg"){
		$pageindex = $pageindex<=0? 1 : $pageindex;

		$qiniuModel = new \Api\Model\QiniuModel();

		$count      = $qiniuModel->GetCount($mimrtype);
		$pagetotal  = floor($count/$pagesize)+1;

		$res["pagecount"] = $pagetotal;
		$res["pageindex"] = $pageindex;
		$res["totalcount"] = $count;
		$res["files"] = $qiniuModel->GetFileList($pageindex,$pagesize,$mimrtype);

		return $res;
	}

	public function imageViewList($pageindex=1,$pagesize=10,$width=240,$height=160,$flag=0){
		$res = $this->filelist($pageindex,$pagesize,"image/jpeg");

		foreach($res["files"] as $key=>$value){
			$res["files"][$key]["smallurl"] = $value["url"]."?imageView2/1/w/240/h/160";
		}

		return $res;
	}

	public function update($file){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);

		$res = $qiniuconnect->upload($qiniuconf,$file);
		return $res;
	}

	public function rename($file,$newfile){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);

		$res = $qiniuconnect->rename($file,$newfile);

		return $res;
	}

	public function delete($file){

		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);

		$res = $qiniuconnect->del($file);

		return $res;
	}

	public function buckets(){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);
		$res = $qiniuconnect->getBuckets();
		return $res;
	}

	public function move($from_buckets,$fromkey,$to_buckets,$tokey){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);
		$res = $qiniuconnect->move($from_buckets,$fromkey,$to_buckets,$tokey);
		return $res;
	}

	public function changemime($buckets,$key,$mime){
		$qiniuconf = C("QINIU");
		$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);
		$res = $qiniuconnect->changeMime($buckets,$key,$mime);
		return $res;
	}

}
