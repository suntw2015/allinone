<?php
namespace Vendor\Http;
class CurlRequest{
    public function __construct(){

    }

    public function _send($HttpMethod,$url,$data=array(),$options=array(),$cookiefile=null){
        $ch = curl_init();
        $extraOpts=$options;

        $datastr="";
        foreach($data as $key=>$d){
            $datastr.=$key."=".$d."&";
        }
        if(!empty($datastr)){
            $datastr=substr($datastr,0,-1);
        }

        if($HttpMethod==HttpMethod::GET&&count($data)>0){
            //get请求重新设置url
            $haspara=strpos($url,"?")>-1;
            if(!$haspara)$url.="?";
            $url.=$datastr;
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        if (isset($extraOpts['header'])) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $extraOpts['header']);
        }

        if (isset($extraOpts['referer'])) {
            curl_setopt($ch, CURLOPT_REFERER, $extraOpts['referer']);
        }

        if (isset($extraOpts['ua'])) {
            curl_setopt($ch, CURLOPT_USERAGENT, $extraOpts['ua']);
        }

        if(isset($extraOpts['cookie'])){
            curl_setopt($ch,CURLOPT_COOKIE,$extraOpts['cookie']);
        }

        curl_setopt($ch, CURLOPT_POST, $HttpMethod==HttpMethod::POST?1:0);
        if($HttpMethod==HttpMethod::POST){
            curl_setopt($ch,CURLOPT_POST,1);
            curl_setopt($ch,CURLOPT_POSTFIELDS,$datastr);
        }
        if(!empty($cookiefile)){
            curl_setopt($ch, CURLOPT_COOKIEJAR, $cookiefile);
            curl_setopt($ch, CURLOPT_COOKIEFILE, $cookiefile);
        }

        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);

        curl_setopt($ch, CURLOPT_ENCODING, "gzip");

        if (0 === stripos($url, 'https://')) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        }
//		print(1);
        $output = curl_exec($ch);
        $requestHeader = curl_getinfo($ch, CURLINFO_HEADER_OUT);
        $info = curl_getinfo($ch);
//		print(2);
//	    exit;

        curl_close($ch);
        // 如果有代理的头, 就去掉
        if (false !== stripos($output, "HTTP/1.1 200 Connection established\r\n\r\n")) {
            $output = str_ireplace("HTTP/1.1 200 Connection established\r\n\r\n", '', $output);
        }
        list($responseHeader, $body) = explode("\r\n\r\n", $output, 2);
        return array(
            'info' => $info,
            'reqHeader' => $requestHeader,
            'reqData'   =>$data,
            'resHeader' => $responseHeader,
            'body' => $body,
        );
    }

}