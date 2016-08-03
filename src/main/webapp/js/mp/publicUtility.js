var publicUtility = {
	paramType :{
		"tiredDriveSetting" : 1001,
		"paramSettingTest"  : 9999
	},
		
	getCurAccount : function() {
		var account = $.JSONCookie("accountInfo");
		return account;
	},

	getCurOperator : function() {
		var operator = $.JSONCookie("operatorInfo");
		return operator;
	},

	// table行颜色变化
	tableClass : function(tbodyId){
		$('#'+tbodyId+' tr:even').addClass("one");
		$('#'+tbodyId+' tr:odd').addClass("two");
		$('.tab_list tbody tr').mouseover(function(){
			$(this).addClass('bg');
		}).mouseout(function(){
			$(this).removeClass('bg');
		});

	},
	
	//文本框焦点获得与失去
	inputTxtClass : function(){
		$(".input_txt").placeholder({
            labelMode: true,
            labelStyle: {
                margin: "12px 0 0 3px",
                fontSize: "12px"
            },
            labelAlpha: true,
            labelAcross: true
        });	

		$('.input_txt').focus(function(){
			$(this).addClass('input_txt_hover');
		});
		
		$('.input_txt').blur(function(){
			$(this).removeClass('input_txt_hover');	
		});
	},
	
	buildNavClass : function(){
		var mid = utils.getQueStr('mid');
		if(mid){
			var li = $('#'+mid, parent.document);
			li.addClass('hover').siblings().removeClass('hover');
			$('.contR_poi', parent.document).html('');
			$('<span>当前位置：</span><span >'+ li.attr('namePath') + '</span>').appendTo($('.contR_poi', parent.document));
		}
	},
	
	
	showPlayMusic : function(url,_jPlayer){
		var _html = '<div style="padding-left:25px;padding-top:10px">'
			+ '<a href="javascript:void(0);" class="btn" id="btn_Play">播放</a>  '
			+ '<a href="javascript:void(0);" class="btn" id="btn_Pause">暂停</a></div>';
		art.dialog({
			id : 'playMusic',
			width : 280,
			height : 80,
			drag: false,
			title : '播放音乐',
			content:_html,
			close:function(){
				_jPlayer.jPlayer("destroy");
			}
		});
		
		_jPlayer.jPlayer({
			ready : function() {
					_jPlayer.jPlayer("setMedia", {
							mp3 : url.replace(".wma",".mp3").replace(".wav",".mp3").replace(".amr",".mp3")
						});
			},
			swfPath : sys.contextPath+"/js/lib/",
			supplied : "mp3",
			wmode : "window"
		});
		
		$('#btn_Play').click(function(){
			_jPlayer.jPlayer("play");
		});
		
		$('#btn_Pause').click(function(){
			_jPlayer.jPlayer("pause");
		});
	},

	showPlayMusic2 : function(url,_jPlayer){
		_jPlayer.jPlayer({
			ready : function() {
					_jPlayer.jPlayer("setMedia", {
							mp3 : url.replace(".wma",".mp3").replace(".wav",".mp3").replace(".amr",".mp3")
						});
			},
			swfPath : sys.contextPath+"/js/lib/",
			supplied : "mp3",
			wmode : "window"
		});
		

	},
	
	/**
	 * flash上传图片
	 * _fid key
	 * _imgwidth 需要的图片宽
	 * _imgheight 需要的图片高
	 * cb 回调函数（用字符串）
	 */
	uploadPicFlash : function(_fid,_imgwidth,_imgheight,cb){
		var _html='<div style="width:415px;height:400px;overflow:hidden;"><div id="wrapswf"> <p>请下载最新版本flash播放器。</p><a target="_blank" href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif " alt="Get Adobe Flash player" /></a></div></div>';
        art.dialog({
        	id:'uploadImgArt',
            content: _html,
            title: '上传图片',
            width : 420,
            drag: false,
            height : 410
           
        });
        var flashPath=sys.contextPath+"/js/com/swfupload.swf";
        var flashvars = { 
               // sign :($.trim($.trim(sys.defaultUid)+sys.key)).MD5(32),
                fid :  _fid,
    			uploadurl : "",//ipConfig.fileService+'/upload_flex.action',
    			jsfunc : 'publicUtility.jsAlert',
    			uid : "123123",
    			callbackfun:cb,  //上传图片回调函数
    			uidurl:sys.contextPath+'/js/com/imgCutUpload/default_Bimg.png',
    			imgwidth:_imgwidth,   
    			imgheight:_imgheight 
        }; 
        var params = { 
	            menu: "false",
	            quality:"high",
	            wmode:"transparent",
	            allowScriptAccess:"always"
	          };
	     var attributes = { 
	             id: "imgCutUpload", 
	             name: "imgCutUpload" 
	           }; 
       swfobject.embedSWF(flashPath, "wrapswf", "415", "400", "9.0.0", sys.contextPath+"/js/com/imgCutUpload/expressInstall.swf", flashvars, params,attributes);
	},
	
	//as 调用 js的函数
	jsAlert :function(alertType){
		switch(alertType){
			case "sizeWarning" :
			{
				alert('图片大于5M，请重新选择图片！');
			}
			break;
			case "typeWarning" :
			{
				alert('图片不支持 ！');
			}
			break;
			default :
				return false;
		}		
	},
	
	 /**
     * 违章详情
     */
	queryRecord : function(params){
		 var url = sys.contextPath + '/appManage/violation/violation_record_list.jsp?'+$.param(params);
				art.dialog.open(url, {
					lock: true,
					id : 'violation_record_list',
					width : 800,
					height : 470,
					title : '违章记录' 
				});
	},
	
    /**
     * 违章查询消息
     */
    queryVioMessage : function(params) {
		 var url = sys.contextPath+'/appManage/violation/violation_list_message.jsp?'+$.param(params);
        art.dialog.open(url, {
            id : 'violation_list_message',
            width : 800,
            height : 300,
            title : '消息详情'
        });
    },
	
    /**
     * 违章查询请求明细列表
     */
    queryIllegalReqDetailsList : function(seqId) {
        var url = sys.contextPath + '/appManage/violation/apply_time_list.jsp?reqId='+(seqId?seqId:'');
        art.dialog.open(url, {
            id : 'apply_time_list',
            width : 500,
            height : 500,
            title : '请求明细列表'
        });
    },
    
	/**
	 * 获取服务开通类型描述
	 * 
	 * @param {Object}
	 *            openType
	 * @return {TypeName}
	 */
	getOpenTypeDesc : function(openType) {
		var openTypeDesc = appConfig.openTypeList[openType];
		if (openTypeDesc) {
			return openTypeDesc;
		} else {
			return "未知";
		}
	},

	queryOperatorRelation : function(operatorId, level) {
		var tagDetailUrl = sys.contextPath
				+ '/operator/operatorRelation.jsp?operatorId=' + operatorId
				+ '&level=' + level;
		art.dialog.open(tagDetailUrl, {
			id : 'operatorRelation',
			width : 500,
			height : 550,
			title : '运营商层次'
		});
	},

	/**
	 * 弹出套餐包含服务列表层
	 * 
	 * @param {Object}
	 *            tagcode
	 */
	queryTagDetail : function(tagcode) {

		var tagDetailUrl = sys.contextPath
				+ '/commodity/tag_detail.jsp?tagcode=' + tagcode;
		art.dialog.open(tagDetailUrl, {
			id : 'tag_detail',
			width : 750,
			height : 500,
			drag: false,
			title : '套餐包含服务列表'
		});
	},

	queryPersonalDetail : function(userid) {
		var url = sys.contextPath + '/personal/personalUserDetail.jsp';
		utils.data('userid', userid);
		utils.loadPage({
			'url' : url
		});

	},

	/**
	 * 弹出用户服务详情层
	 * 
	 * @param {Object}
	 *            tagcode
	 */
	queryUserServiceDetail : function(serviceid, code, userid) {
		var url = sys.contextPath
				+ '/personal/userServiceDetail.jsp?serviceid=' + serviceid
				+ '&userid=' + userid + '&code=' + code;
		art.dialog.open(url, {
			id : 'userServiceDetail',
			width : 600,
			height : 500,
			title : '服务详情'
		});
	},

	
	/**
	 * 弹出用户详情层
	 */
	queryPersonalUserDetail : function(userid) {
		var url = sys.contextPath + '/personal/personalUserDetail.jsp?userid='
				+ userid;
		art.dialog.open(url, {
			id : 'PersonalUserDetail',
			width : 1000,
			height : 800,
			title : '用户详情'
		});
	},

	/**
	 * 获取注册类型描述
	 * 
	 * @param {Object}
	 *            regType
	 * @return {TypeName}
	 */
	regTypeDesc : function(regType) {
		var desc = appConfig.regTypeList[regType];
		if (desc) {
			return desc;
		} else {
			return "未知";
		}
	},

	getServiceStatus : function(status) {
		var span = '';
		if (status == 1) {
			span = '<span class="condition" title="有效"></span>';
		} else if (status == 0) {
			span = '<span class="condition2" title="已过期"></span>';
		}
		return span;
	},
	
	getServiceEndTimeOrEnableCount : function(orderRelation) {
		var desc = "";
		if (orderRelation.buytype == 'duration') {
			if (orderRelation.limited == 1) {
				desc = orderRelation.endtime + ' / '
						+ orderRelation.enablecount;
			} else {
				desc = orderRelation.endtime;
			}
		} else if (orderRelation.buytype == 'count') {
			desc = orderRelation.enablecount;
		}
		return desc;
	},
	/**
	 * 弹出用户违章详情记录
	 */
	queryViolationDetail : function(carNum,userId,seq){
		var url = sys.contextPath
				+ '/appManage/violation/violation_DetailList.jsp?carNum=' + (carNum?carNum:'')+'&userId='+(userId?userId:'')+'&seqId='+(seq?seq:'');
		art.dialog.open(url, {
			id : 'ViolationDetailList',
			width : 600,
			height : 500,
			title : '违章详情记录'
		});
	},
	
	/**
     * 驾驶习惯分析
     */
    queryHabitsMessage : function(userId) {
        var url = sys.contextPath + '/dynamicData/dynamic_habits_detail.jsp?userId='+userId;
        art.dialog.open(url, {
            id : 'dynamic_habits_detail',
            width : 800,
            height : 400,
            title : '驾驶习惯分析'
        });
    }
	
};

