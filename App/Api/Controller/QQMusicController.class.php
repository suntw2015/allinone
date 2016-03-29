<?php
	/**
	 * Created by Tianwen Sun.
	 * Date: 2015/8/28
	 * Time: 14:03
	 * Project: allinone
	 */

namespace Api\Controller;
use Lib\Controller\BaseController;

class QQMusicController extends BaseController{


	public function albumpic($albummid){
		$qqmusicservice = new \Service\QQMusicService\QQMusicService();
		$res = $qqmusicservice->getalbumpic($albummid,150);

		$this->apiSuccess($res);
	}

	public function lyric($songname){
		$qqmusicservice = new \Service\QQMusicService\QQMusicService();
		$res = $qqmusicservice->lyric($songname);
		$this->apiSuccess($res);
	}
}