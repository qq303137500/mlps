/**
 * 添加和编辑公告
 */
var addNotice = {

	id : null,
	
	initPage : function() {
		addNotice.initStyle();
		addNotice.initOperator();
		addNotice.initLoad();
	},

	initStyle : function() {
		addNotice.xheditor = $('#area-czzs').xheditor( {
			tools : 'full',
			urlType:'abs',
			urlBase:'/osp/upload/resize/',
			skin : 'nostyle',
			width : '430px',
			height : '250',
			upMultiple : true,
			upImgUrl : sys.contextPath+'/commonHttp/fileUpload?fid=c_clbImage',
			upImgExt : 'jpg,gif,png',
			html5Upload : false,
			onUpload : function(data) {
//			  appAdvertisingAdd.images[data[0].url] = {width:data[0].reWidth+"px", height:data[0].reHeight+"px"};
			}
		});
	},

	initOperator : function() {
		
	    $('#saveBT').click(function(){
	    	if(addNotice.id){
	    		addNotice.editNoticeInfo();
	    	}else{
	    		addNotice.addNoticeInfo();
	    	}
	    });
	    
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/noticeList.html");
	    });
	    
		// 上传缩略图
		$('#bizLicenseFile').change(function(){
			if($(this).val()=='')return;
			if(addNotice.photoValidate($(this).val())){
				utils.uploadFile("upload_photo_form","w_pxzl_file",function(dataObj){
					if(!dataObj.url){
						utils.errorTip("上传失败！");
						return;
					}
					$("#imgInfo").attr("src",dataObj.url);
				},function(){},"http://fileservice.365car.com.cn:88/fileService/");
			}
		});
	},
	initLoad : function() {
		if(mp_index.id){
			addNotice.id = mp_index.id;
			if(mp_index.opt && mp_index.opt == 'look'){
				$('#cpName').attr('readonly','readonly');
//				$('#area-czzs').attr('readonly','readonly');
				$('#saveBT').hide();
				$('#bizLicenseFile').hide();
			}
			addNotice.getNoticeById();
		}
	},
	
	/**
     * 根据ID查找信息
     */
	getNoticeById : function(){
    	manage.getNoticeById({'id':addNotice.id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				var _info = data.data;
    				$('#cpName').val(_info.title);
    				$('#area-czzs').val(_info.content);
    				if(_info.picture){
    					$('#imgInfo').attr("src",_info.picture);
    				}
    				if(mp_index.opt && mp_index.opt == 'look'){
    					$('#cpName').attr('disabled','disabled');
        				$('#area-czzs').attr('disabled','disabled');
        				$('#saveBT').hide();
    				}
    				mp_index.id = null;
    		    	mp_index.opt = null;
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	/**
     * 添加公告信息
     */
	addNoticeInfo : function(){
		if(!addNotice.validateInput()){
			return;
		}
		var params = {};
    	params['title'] = $.trim($('#cpName').val());
    	params['content'] = $.trim($('#area-czzs').val());
    	params['status'] = 1;
    	params['top'] = 0;
    	var _img = $('#imgInfo').attr("src");
    	if(_img.indexOf('http')>=0){
    		params['picture'] = _img;
    	}
    	params['operatorId'] = mp_index.userInfo.userId;
    	manage.addNoticeInfo(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/contentManage/appManage/noticeList.html");
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 编辑公告信息
     */
    editNoticeInfo : function(){
    	if(!addNotice.validateInput()){
			return;
		}
		var params = {};
		params['id'] = addNotice.id;
    	params['title'] = $.trim($('#cpName').val());
    	params['content'] = $.trim($('#area-czzs').val());
    	var _img = $('#imgInfo').attr("src");
    	if(_img.indexOf('http')>=0){
    		params['picture'] = _img;
    	}
    	params['operatorId'] = mp_index.userInfo.userId;
    	manage.editNoticeInfo(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/contentManage/appManage/noticeList.html");
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 验证输入
     */
    validateInput : function(){
    	var _cpNameLen = utils.getBytesLength($.trim($('#cpName').val()));
    	var _areaLen = utils.getBytesLength($.trim($('#area-czzs').val()));
    	var _pictureLen = utils.getBytesLength($.trim($('#imgInfo').attr("src")));
    	var _pictureSrc=sys.contextPath+"/images/default_img.png";
    	var _pictureSrc1=$.trim($('#imgInfo').attr("src"));//获取上传图片路径
    	
    	if(_cpNameLen == 0){
    		utils.warningTip('请输入标题');
    		return false;
    	}else{
    		if(_cpNameLen > 100){
        		utils.warningTip('标题不能超过100字符');
        		return false;
        	}
    	}
    	if(_areaLen == 0){
    		utils.warningTip('请输入正文内容');
    		return false;
    	}else{
    		if(_areaLen > 2500){
        		utils.warningTip('正文内容不能超过2500字符');
        		return false;
        	}
    	}
    	if((_pictureLen == 0)||(_pictureSrc==_pictureSrc1)){
    		utils.warningTip('请输入图片');
    		return false;
    	}
    	
    	return true;
    },
    
    photoValidate : function(url){
		var sc = url;
		url = $.trim(url.substr(url.lastIndexOf(".")+1)).toLocaleLowerCase();
		if(url=="jpg" || url=="png" || url=="jpeg"){
			return true;
		}else{
			utils.errorTip("上传图片格式不对！请重新上传");
			return false;
		}
	}
};