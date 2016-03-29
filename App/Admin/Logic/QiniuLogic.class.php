<?php
	/**
	 * Created by PhpStorm.
	 * User: tianwen
	 * Date: 2015/8/13
	 * Time: 10:27
	 */

	namespace Admin\Logic;
	use Think\Upload\Driver\Qiniu;

	class QiniuLogic{

		public function savefiles($files){

			$qiniuModel = new \Api\Model\QiniuModel();
			foreach($files as $key=>$value){
				$qiniuModel->SaveOrUpdate($value);
			}
		}

		public function filelist(){
			$qiniuconf = C("QINIU");
			$qiniuconnect = new Qiniu\QiniuStorage($qiniuconf);

			$res = $qiniuconnect->getList();
			$filearr = array();
			foreach($res["items"] as $key=>$value){
				$url = $qiniuconnect->downLink($value["key"]);

				$filearr[] = array(
					"key"       => $value["key"],
					"fsize"     => $value["fsize"],
					"mimetype"  => $value["mimeType"],
					"url"       => $url,
					"createon"  => doputTime($value["putTime"]),
				);
			}
			return $filearr;
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
