var mp_index={
	
	userInfo : null,
		
    initPage : function() {
		mp_index.initBtn();
		mp_index.initLoad();
	},

	initBtn : function() {
		$("#top_ul").click(function(e){
			if(e.target.nodeName=='A'){
				$(e.target).parents('li').addClass("hover").siblings().removeClass('hover');
				var _text=$(e.target).text();
                if(_text=="管理首页"){
                	$(".side").load(sys.contextPath+"/mp/homeManageMenu.html",function(){
                		mp_index.initContent();
                	});
                }else if(_text=="工作计划"){
                	$(".side").load(sys.contextPath+"/mp/sitesManageMenu.html",function(){
                		mp_index.initContent();
                	});
                }else if(_text=="内容管理"){
                	$(".side").load(sys.contextPath+"/mp/contentManageMenu.html",function(){
                		mp_index.initContent();
                	});
                }else if(_text=="核心管理"){
                	$(".side").load(sys.contextPath+"/mp/coreManageMenu.html",function(){
                		mp_index.initContent();
                	});
                }else if(_text=="网站后台管理"){
                	$(".side").load(sys.contextPath+"/mp/BackstageManageMenu.html",function(){
                		mp_index.initContent();
                	});
                }
			}
		});
		$(".side").click(function(e){
			if(e.target.nodeName=='A'){
				$(e.target).addClass("font-color").parents().siblings().find('A').removeClass('font-color');
				$(".main").load($(e.target).parents('DD').attr("title"));
			}
		});
		$("#outLogin").click(function(e){
			mp_index.outLoginInfo();
		});
	},
	initLoad : function() {
		$(".main").load(sys.contextPath+"/mp/indexBody.html");
	},
	
	initBodyLoad : function(){
		mp_index.initLoginInfo();
		mp_index.noticeList();
		mp_index.trainList();
	},
	
	initContent : function(){
		$(".main").load($(".side").find('dt').eq(0).attr("title"));
	},
	
	//获取用户信息
	initLoginInfo : function(){
		var url = sys.contextPath + "/securUser/getLoginUserInfo";
		utils.ajax(url, {}, function(data){
			if(data.retCode==0 && data.data){
				var _userInfo = data.data;
				mp_index.userInfo = data.data;
				$('#loginName').html(_userInfo.userCname);
			}else{
				window.location.href=sys.contextPath+"/login.html";
			}
		}, null, "POST", "json", false,null);
	},
	//登出
	outLoginInfo : function(){
		var url = sys.contextPath + '/securUser/loginOut';
		utils.ajax(url, {}, function(data){
			window.location.href=sys.contextPath+"/login.html";
		}, null,"POST", "json", false);
	},
	//公告列表
	noticeList : function(){
	  	var params = {};
		params['pageSize'] = 6;
		params['curPage'] = 1;
		var url = sys.contextPath + '/noticeInfo/queryNoticeList';
		utils.ajax(url, params, function(data){
			if(data && data.retCode == 0){
				var tmp = '';
				var list = data.data;
				var _str='';
				if(list.length > 0){
					for(var key in list){
						var notice = list[key];
						if(notice.title.length>24){
							_str=notice.title.substring(0,24)+"...";
						}else{
							_str=notice.title;
						}
						tmp +='<li><span title="'+notice.title+'">'+_str+'</span><span>'+notice.updateTime+'</span></li>';
					}
				}else{
					tmp = '<li><span>暂无数据</span><span>2001-01-01</span></li>';
				}
				$('#noticeList').html(tmp);
			}
		}, function(){
			utils.errorTip("系统繁忙,请稍候再试!");
		},"POST", "json", false);
	},
	
	
	trainList : function(){
	  	var params = {};
		params['pageSize'] =4;
		params['curPage'] = 1;
		var url = sys.contextPath +  '/trainInfo/queryTrainList';
		utils.ajax(url, params, function(data){
			if(data && data.retCode == 0){
				var tmp = '<li class="title">培训</li>';
				var list = data.data;
				var _str='';
				if(list.length > 0){
					for(var key in list){
						var notice = list[key];
						if(notice.title.length>12){
							_str=notice.title.substring(0,12)+"...";
						}else{
							_str=notice.title;
						}
						tmp+='<li>'
	    						+'<span>'+_str+'</span>'
		    					+'<span>'+notice.updateTime+'</span>'
		    				  +'</li>';
					}
				}else{
					tmp = '<li><span>暂无数据</span><span>2001-01-01</span></li>';
				}
				 
				$('#train_ul').html(tmp);
			}
		}, function(){
			utils.errorTip("系统繁忙,请稍候再试!");
		},"POST", "json", false);
		
		
	}
};