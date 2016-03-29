<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/7/10
 * Time: 9:41
 */


namespace Api\Controller;
use Think\Controller;
use Vendor\Http;

class TTPodController extends \Lib\Controller\BaseController{

	public function index(){
	}

	public function search($data){
		$ttpod_api =C("TTPOD_API");
		$search_all =$ttpod_api["search_all"];
		$search_all =str_replace(array("{search}"),array($data),$search_all);
		$http_request = new Http\HttpRequest();
		$res=$http_request->send(Http\HttpMethod::GET,$search_all);
		if(empty($res)){
			$this->apiFail("faild");
		}
		$this->apiSuccess($res);
	}

	public function searchmusic($musicname,$pagesize=10,$pageindex=1){
		$res = $this->_search($musicname,$pagesize,$pageindex);
		if(empty($res)){
			$this->apiFail("faild");
		}
		$this->apiSuccess($res);
	}

	public function syncmusic($musicname){
		$res = $this->_search($musicname,20,1);
		if(empty($res)){
			printf("Get result faild\n");
		}
		foreach($res as $key => $song){
			$songinfo =array();
			$copyitems = array(
				"song_id"       =>  "song_id",
				"singer_id"     =>  "singer_id",
				"album_id"      =>  "album_id",
				"song_name"     =>  "song_name",
				"singer_name"   =>  "singer_name",
				"album_name"    =>  "album_name",
			);
			qcopy($songinfo,$song,$copyitems);

			$urlinfo    = array();
			$mvinfo  = array();
			//make sure the sorce audio and mv
			foreach($song["url_list"] as $k =>$v){
				$urlinfo[] = array(
					"song_id"           =>  $songinfo["song_id"],
					"song_name"         =>  $songinfo["song_name"],
					"singer_name"       =>  $songinfo["singer_name"],
					"duration"          =>  $v["duration"],
					"format"            =>  $v["format"],
					"bitrate"           =>  $v["bitrate"],
					"type_description"  =>  $v["type_description"],
					"url"               =>  $v["url"],
					"size"              =>  $v["size"],
					"type"              =>  $v["type"],
				);
			}

			if(isset($song["mv_list"])){
				foreach($song["mv_list"] as $k=>$v){
					$mvinfo[] = array(
						"song_id"           =>  $songinfo["song_id"],
						"song_name"         =>  $songinfo["song_name"],
						"singer_name"       =>  $songinfo["singer_name"],
						"format"            =>  $v["format"],
						"bitrate"           =>  $v["bitrate"],
						"type_description"  =>  $v["type_description"],
						"size"              =>  $v["size"],
						"lsize"             =>  $v["lSize"],
						"url"               =>  $v["url"],
						"duration"          =>  $v["duration"],
						"duration_second"   =>  $v["durationMilliSecond"],
						"pic_url"           =>  $v["pic_url"],
						"video_id"           =>  $v["videoId"],
						"type"              =>  $v["type"],
					);
				}
			}

			//store
			$songModel = new \Api\Model\SongModel();
			$res = $songModel->getByCondition(array("song_id"=>$songinfo["song_id"]));
			if(empty($res)){
				$songModel->doAdd($songinfo);

				$audioMdoel =new \Api\Model\AudioModel();
				$audioMdoel->doAdds($urlinfo);

				if(!empty($mvinfo)){
					$videoMdoel =new \Api\Model\VideoModel();
					$videoMdoel->doAdds($mvinfo);
				}
			}
		}
	}

	public function _search($musicname,$pagesize=20,$pageindex=1){
		$ttpod_api = C("TTPOD_API");
		$search_music = $ttpod_api["search_music"];
		$musicname =urlencode($musicname);
		$search_music = str_replace(array("{pagesize}","{pageindex}","{search}"),array($pagesize,$pageindex,$musicname),$search_music);
		$http_request = new Http\HttpRequest();
		$res = $http_request->send(Http\HttpMethod::GET,$search_music);
		return $res["data"];
	}
}