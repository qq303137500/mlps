/**
 * 添加和编辑用户
 */
var addUser = {

	id : null,
	
	initPage : function() {
		addUser.initStyle();
		addUser.initOperator();
		addUser.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#saveBT').click(function(){
	    	if(addUser.id){
	    		addUser.editSecurUser();
	    	}else{
	    		addUser.addSecurUser();
	    	}
	    });
	    
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/coreManage/organizationManage/userList.html");
	    });
	    
	},
	initLoad : function() {
		if(mp_index.id){
			addUser.id = mp_index.id;
			addUser.getSecurUserById();
		}
	},
	
	/**
     * 根据ID查找产品信息
     */
	getSecurUserById : function(){
    	org_interface.getSecurUserById({'id':addUser.id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				var _info = data.data;
    				$('#userName').val(_info.userName);
    				$('#userCname').val(_info.userCname);
    				$('#userPwd').val(_info.userPwd);
    				$('#mobile').val(_info.mobile);
    				$('#isadmin').val(_info.isadmin);
    				mp_index.id = null;
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	/**
     * 添加产品信息
     */
    addSecurUser : function(){
		if(!addUser.validateInput()){
			return;
		}
		var params = {};
    	params['userName'] = $.trim($('#userName').val());
    	params['userCname'] = $.trim($('#userCname').val());
    	params['userPwd'] = $.trim($('#userPwd').val());
    	params['mobile'] = $.trim($('#mobile').val());
    	params['isadmin'] = $.trim($('#isadmin').val());
    	params['status'] = 1;
    	org_interface.addSecurUser(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/coreManage/organizationManage/userList.html");
    			}else{
    				utils.errorTip("错误："+data.message);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 编辑产品信息
     */
    editSecurUser : function(){
    	if(!addUser.validateInput()){
			return;
		}
		var params = {};
		params['userId'] = addUser.id;
		params['userName'] = $.trim($('#userName').val());
    	params['userCname'] = $.trim($('#userCname').val());
    	params['userPwd'] = $.trim($('#userPwd').val());
    	params['mobile'] = $.trim($('#mobile').val());
    	params['isadmin'] = $.trim($('#isadmin').val());
    	org_interface.editSecurUser(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/coreManage/organizationManage/userList.html");
    			}else{
    				utils.errorTip("错误："+data.message);
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
    	var _userNameLen = utils.getBytesLength($.trim($('#userName').val()));
    	var _userCnameLen = utils.getBytesLength($.trim($('#userCname').val()));
    	var _userPwd = $.trim($('#userPwd').val());
    	var _mobile = $.trim($('#mobile').val());
    	var _isadmin = $.trim($('#isadmin').val());
    	
    	if(_userNameLen == 0){
    		utils.warningTip('请输入用户名');
    		return false;
    	}else{
    		if(_userNameLen > 100){
        		utils.warningTip('用户名不能超过100字符');
        		return false;
        	}
    	}
    	
    	if(_userCnameLen == 0){
    		utils.warningTip('请输入用户全名');
    		return false;
    	}else{
    		if(_userCnameLen > 200){
        		utils.warningTip('用户全名不能超过200字符');
        		return false;
        	}
    	}
    	var reg = /^[0-9a-zA-Z_]{3,15}$/;
    	if(!_userPwd){
    		utils.warningTip('请输入密码');
    		return false;
    	}else{
    		if(!reg.test(_userPwd)){
        		utils.warningTip('密码不符合规则');
        		return false;
        	}
    	}
    	
    	if(!utils.validationMobile(_mobile)){
    		utils.warningTip('请输入正确的手机号码');
    		return false;
    	}
    	
    	if(!_isadmin){
    		utils.warningTip('请选择是否管理员');
    		return false;
    	}
    	
    	return true;
    }
};