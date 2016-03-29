/**
 * Created by Administrator on 2015/7/22.
 */

/**********************************************************************
 *init the all the scroll control
***********************************************************************/
!function(){
	var isdown = false,
		y1 = 0,
		y2 = 0,
		top = 0,
		parent,
		scroll =document.getElementsByClassName("scroll-list")[0];

	var listsdetail = document.getElementsByClassName("list_detail"),
		listbody = document.getElementsByClassName("list_body_song")[0],
		scrollbar = scroll.parentNode,
		listscount = listsdetail.length,
		listitemheight = listsdetail[0].offsetHeight,
		listbodyheight = listbody.offsetHeight;

	adjust();

	scroll.onmousedown = function (e) {
		y1 = e.clientY;
		isdown = true;
		parent = this.parentNode;

		document.onmousemove= function(e){
			if (!isdown) {
				return;
			}
			y2 = e.clientY;

			var relatemove = y2 - y1;
			var top;
			top = parseInt(scroll.style.top);

			if(isNaN(top) || top <=0){
				top =0;
			}


			var maxupmove = scroll.offsetTop,
				maxdownmove = parent.offsetHeight-scroll.offsetTop-scroll.offsetHeight;

			if(relatemove>=0){
				relatemove = Math.min(relatemove,maxdownmove);
			}else{
				relatemove = -Math.min(Math.abs(relatemove),maxupmove);
			}

			scroll.style.top = top + relatemove + "px";

			relatebody(relatemove);

			y1=y2;
			e.preventDefault();
		};

		document.onmouseup = function(e){
			isdown = false;
			console.log("mouse is up");
		};
	};

	/*****************************************************************************
	 *the scroll of the relate div
	 *****************************************************************************/
	function relatebody (relatemove){
		var bodytotalheight = listitemheight * listscount;
		var bodymovedis = relatemove/(scrollbar.offsetHeight-scroll.offsetHeight)*(bodytotalheight-listbodyheight);

		listbody.scrollTop += bodymovedis;
	}

	/*****************************************************************************
	 * adjust the scroll's height
	 *****************************************************************************/

	function adjust(){
		listscount = listsdetail.length;
		listitemheight = listsdetail[0].offsetHeight;
		listbodyheight = listbody.offsetHeight;
		if(listbodyheight>=listitemheight*listscount){
			if(scroll.style.visibility != "hidden" && scroll.style.display != "none") {
				scroll.style.visibility = "hidden";
			}
		}else{
			if(scroll.style.visibility == "hidden" || scroll.style.display == "none") {
				scroll.style.visibility = "visible";
			}
			var scrollheight = listbodyheight/(listitemheight*listscount)*scrollbar.offsetHeight;
			scroll.style.height = scrollheight + "px";
		}
	}

	var deleteitems = document.getElementsByClassName("trace_delete");
	for(var i=0;i<deleteitems.length;i++){
		deleteitems[i].onclick = function(){
			this.parentNode.parentNode.remove();
			adjust();
		}
	}

	var test = document.getElementsByClassName("play_btn")[0];
	test.onclick = function () {
		var listbody = document.getElementsByClassName("list_body_song")[0];

		var template = '<div class="list_detail"> <div class="list_checkbox"> <input type="checkbox" /> </div> <div class="list_index"><em>1</em></div> <div class="list_detail_body"> <div class="list_column">勇气</div> <div class="list_column">梁静茹</div> <div class="list_column">勇气</div> <div class="list_other"></div> </div> <div class="trace_control"> <a class="trace_faved"></a> <a class="trace_more"></a> <a class="trace_delete"></a> </div> </div>';

		$(template).insertChildAfter(listbody);
		adjust();
	}
}();

$(".list_detail").on("click",function(){
	var songname = $(this).find(".songname").text(),
		singername = $(this).find(".singername").text(),
		albumname = $(this).find(".albumname").text(),
		url =$(this).attr('data-url'),
		albummid = $(this).attr("data-albummid");

	$(".player_info").find(".player_track_info").text(singername+"-"+songname);
	$("audio").attr("src",url);
	$("audio")[0].play();

	$.get(
		"/Api/QQMusic/albumpic/",
		{"albummid":albummid},
		function(res){
			if(res.status == "success"){
				$(".album-cover").find("img").attr("src",res.data);
				console.log(res.data);
			}else{
				console.log("cover load fail");
			}
		}
	);
	$.get(
		"/Api/QQMusic/lyric/",
		{"songname":songname},
		function(res){
			if(res.status == "success"){
				$(".lyccontent").text(res.data[0].content);
				console.log(res.data);
			}else{
				console.log("lyric load fail");
			}
		}
	)
});


