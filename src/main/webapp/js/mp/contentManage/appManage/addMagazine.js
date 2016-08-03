/**
 * 添加和编辑资料
 */
var addMagazine = {

	id : null,
	
	initPage : function() {
		addMagazine.initStyle();
		addMagazine.initOperator();
		addMagazine.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#saveBT').click(function(){
	    	if(addMagazine.id){
	    		addMagazine.editMagazineInfo();
	    	}else{
	    		addMagazine.addMagazineInfo();
	    	}
	    });
	    
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/magazineList.html");
	    });
	    
		// 上传文件
		$('#bizLicenseFile').change(function(){
			if($(this).val()=='')return;
			if(addMagazine.photoValidate($(this).val())){
				utils.uploadFile("upload_photo_form","w_pxzl_file",function(dataObj){
					if (dataObj.fileSize) {
		                var _fileSize = Math.round(dataObj.fileSize / 1024 * 100) /100;
		                if (_fileSize >= 15*1024) {
		                	utils.warningTip("文件大小不能超过15M");
							return;
		                }
		            }else if(!dataObj.url){
						utils.errorTip("上传失败！");
						return;
					}
					$("#fileInfo").attr("href",dataObj.url).html(dataObj.originalName);
					$("#fileName").val(dataObj.originalName);
				},function(){},sys.fileService);
			}
		});
	},
	initLoad : function() {
		if(mp_index.id){
			addMagazine.id = mp_index.id;
//			if(mp_index.opt && mp_index.opt == 'look'){
//				$('#saveBT').hide();
//				$('#bizLicenseFile').hide();
//				$('#fileInfo').show();
//			}
			addMagazine.getMagazineById();
		}
	},
	
	/**
     * 根据ID查找信息
     */
	getMagazineById : function(){
    	manage.getMagazineById({'id':addMagazine.id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				var _info = data.data;
    				$('#inTitle').val(_info.title);
    				$('#fileName').val(_info.fileName);
    				if(_info.dateUrl){
    					$("#fileInfo").attr("href",_info.dateUrl).html(_info.fileName);
    				}
    				if(mp_index.opt && mp_index.opt == 'look'){
    					$('#inTitle').attr('readonly','readonly');
    					$('#saveBT').hide();
    					$('#bizLicenseFile').hide();
    					$('#fileName').hide();
    					$('#pf1').hide();
    					$('#pf2').hide();
    					$('#fileInfo').show();
    					$('.uploadFile').hide();
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
	addMagazineInfo : function(){
		if(!addMagazine.validateInput()){
			return;
		}
		var params = {};
    	params['title'] = $.trim($('#inTitle').val());
    	params['status'] = 1;
    	params['top'] = 0;
    	var _file = $('#fileInfo').attr("href");
    	if(_file.indexOf('http')>=0){
    		params['dateUrl'] = _file;
    	}
    	params['fileName'] = $.trim($('#fileName').val());
    	params['operatorId'] = mp_index.userInfo.userId;
    	manage.addMagazineInfo(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/contentManage/appManage/magazineList.html");
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
    editMagazineInfo : function(){
    	if(!addMagazine.validateInput()){
			return;
		}
		var params = {};
		params['id'] = addMagazine.id;
    	params['title'] = $.trim($('#inTitle').val());
    	var _file = $('#fileInfo').attr("href");
    	if(_file.indexOf('http')>=0){
    		params['dateUrl'] = _file;
    	}
    	params['fileName'] = $.trim($('#fileName').val());
    	params['operatorId'] = mp_index.userInfo.userId;
    	manage.editMagazineInfo(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/contentManage/appManage/magazineList.html");
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
    	var _inTitleLen = utils.getBytesLength($.trim($('#inTitle').val()));
    	var _fileLen = utils.getBytesLength($.trim($('#bizLicenseFile').val()));
    	
    	if(_inTitleLen == 0){
    		utils.warningTip('请输入资料名称');
    		return false;
    	}else{
    		if(_inTitleLen > 100){
        		utils.warningTip('资料名称不能超过100字符');
        		return false;
        	}
    	}
    	
    	if(_fileLen == 0){
    		utils.warningTip('请上传培训资料');
    		return false;
    	}
    	
    	return true;
    },
    
    photoValidate : function(url){
		var sc = url;
		url = $.trim(url.substr(url.lastIndexOf(".")+1)).toLocaleLowerCase();
		if(url=="pdf"){
			return true;
		}else{
			utils.errorTip("上传文件格式不对！请重新上传");
			return false;
		}
	}
};