<?php
	/**
	 * Created by PhpStorm.
	 * User: sunti
	 * Date: 2016/6/30
	 * Time: 14:25
	 */

namespace Service\QQService;

use Org\Net\Http;
use Vendor\Http\HttpMethod;
use Vendor\Http\HttpRequest;

class QQService{

	protected $qrcodeUrl                = 'https://ssl.ptlogin2.qq.com/ptqrshow?appid=501004106&e=0&l=M&s=5&d=72&v=4&t=0.1';

	protected $qrcodestatusUrl          = 'https://ssl.ptlogin2.qq.com/ptqrlogin?webqq_type=10&remember_uin=1&login2qq=1&aid=501004106%20&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10%20&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert%20&action=0-0-157510&mibao_css=m_webqq&t=1&g=1&js_type=0&js_ver=10143&login_sig=&pt_randsalt=0';

	protected $qrcodestatusReferer      = 'https://ui.ptlogin2.qq.com/cgi-bin/login?daid=164&target=self&style=16&mibao_css=m_webqq&appid=501004106&enable_qlogin=0&no_verifyimg=1 &s_url=http%3A%2F%2Fw.qq.com%2Fproxy.html&f_url=loginerroralert &strong_login=1&login_state=10&t=20131024001';

	protected $ptwebqqUrl               = 'http://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1';

	protected $vfwebqqUrl               = 'http://s.web2.qq.com/api/getvfwebqq?ptwebqq=#{ptwebqq}&clientid=53999199&psessionid=&t=0.1';

	protected $vfwebqqReferer           = 'http://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1';

	protected $psessionidUrl            = 'http://d1.web2.qq.com/channel/login2';

	protected $psessionidReferer        = 'http://d1.web2.qq.com/proxy.html?v=20151105001&callback=1&id=2';

	protected $cookie                   = array();

	public function __construct() {
		$cookie = '';

		foreach ($_COOKIE as $key=>$value){
			$cookie .= $key."=".$value.";";
		}

		$this->cookie = $cookie;
	}

	public function getLoginQrcode(){
		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$this->qrcodeUrl);

		$respone = $res['resHeader'];

		$cookie_reg = '/Set-Cookie:\s?[\w-=*]+/i';

		preg_match($cookie_reg,$respone,$cookie);
		
		if(!empty($cookie)){
//			$cookie = explode(':', $cookie[0])[1];
//			$this->cookie .= $cookie;

			header($cookie[0]);
		}

		return $res['body'];
	}

	public function getQrcodeStatus(){
		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$this->qrcodestatusUrl,array(),array('cookie'=> $this->$cookie));
		$res['body'] = preg_replace("/'/","",$res['body']);
		$res['body'] = explode(",",substr($res['body'], 7, -4));

		return $res['body'];
	}

	public function getptwebqq(){
		$status = $loginstatus = $this->getQrcodeStatus();

		if(empty($status) || $status[0] != 0){
			return $status[4];
		}

		$url = $status[2];

		$httprequest = new HttpRequest();

		$res = $httprequest->send(HttpMethod::GET,$url,array(),array('referer'=>$this->ptwebqqUrl,'cookie'=>$this->cookie));

		$cookie_reg = '/Set-Cookie:\s?[\w-=*]+/i';
		preg_match_all($cookie_reg,$res['resHeader'],$cookie);
		foreach($cookie[0] as $key=>$value){
			header($value,false);
		}

		return $res;
	}

	public function getvfwebqq(){}

	public function getpsessionid(){}
}