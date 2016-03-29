<?php
	/**
	 * Created by Tianwen Sun.
	 * Date: 2015/12/13
	 * Time: 21:28
	 * Project: allinone
	 */

namespace Service\DouyuService;
use Org\Net\Http;
use Vendor\Http\HttpMethod;
use Vendor\Http\HttpRequest;

class DouyuService{

	protected $cookie = "";
	protected $douservice = "";

	public function __construct(){
		$this->douservice = C("DOUYUSERVICE");
		$this->cookie     = $this->douservice["cookie"];
	}

	public function getFollowList(){

		$followurl  = $this->douservice["follow"];
		$followlist = get($followurl,$this->cookie);

		return $followlist;
	}
}