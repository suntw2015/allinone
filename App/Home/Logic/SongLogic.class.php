<?php
/**
 * Created by Tianwen.Sun.
 * Mail: suntw@miot.cn
 * Date: 2015/7/10 12:35
 * Description:allinone
 */

namespace Home\Logic;

class SongLogic{

	public function getSong($name){

		$songModel =new \Home\Model\SongModel();
		$res = $songModel->getSongByName($name);

		if(empty($res)) {
			$ttpod = new \Api\Controller\TTPodController();
			$ttpod->syncmusic($name);
		}

		foreach($res as $key=>$value){
			$songid=$value["song_id"];
			$audioModel =new \Home\Model\AudioModel();
			$audiolist = $audioModel->getAudioBySongID($songid);

			$videoModel = new \Home\Model\VideoModel();
			$videolist = $videoModel->getVideoBySongID($songid);

			$res[$key]["audiolist"]=$audiolist;
			$res[$key]["videolist"]=$videolist;
		}
		return $res;
	}

	public function getSongByPage($name="",$index=1,$size=10){
		$songModel = new \Home\Model\SongModel();
		$count = $songModel->getCount();
		$res = $songModel->getSongByPage($name,$index,$size);
		if(empty($res)) {
			$ttpod = new \Api\Controller\TTPodController();
			$ttpod->syncmusic($name);
		}

		foreach($res as $key=>$value){
			$songid=$value["song_id"];
			$audioModel =new \Home\Model\AudioModel();
			$audiolist = $audioModel->getAudioBySongID($songid);

			$videoModel = new \Home\Model\VideoModel();
			$videolist = $videoModel->getVideoBySongID($songid);

			$res[$key]["audiolist"]=$audiolist;
			$res[$key]["videolist"]=$videolist;
		}

		if(!empty($res)){
			$res["count"] = ceil($count/$size);
			$res["size"] =$size;
			$res["index"] = $index;
		}
		return $res;
	}

	public function getCount(){}
}