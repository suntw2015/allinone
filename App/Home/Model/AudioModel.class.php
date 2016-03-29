<?php
/**
 * Created by Tianwen.Sun.
 * Mail: suntw@miot.cn
 * Date: 2015/7/10 12:30
 * Description:allinone
 */

namespace Home\Model;
use Think\Model;

class AudioModel extends \Lib\Model\AppModel{
	protected $trueTableName = "ttpod_audio";

	public function getAudioBySongID($songid){
		$conditions = array("song_id"=>$songid);
		return $this->Model->where($conditions)->select();
	}
}