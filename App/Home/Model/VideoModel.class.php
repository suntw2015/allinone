<?php
/**
 * Created by Tianwen.Sun.
 * Mail: suntw@miot.cn
 * Date: 2015/7/10 12:32
 * Description:allinone
 */

namespace Home\Model;
use Think\Model;

class VideoModel extends \Lib\Model\AppModel{
	protected $trueTableName = "ttpod_video";

	public function getVideoBySongID($songid){
		$conditions = array("song_id"=>$songid);
		return $this->Model->where($conditions)->select();
	}
}