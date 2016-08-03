/**
 * 添加用户组
 */
var addUserGroup = {
	
	
	initPage : function() {
		addUserGroup.initStyle();
		addUserGroup.initOperator();
		addUserGroup.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
	
		$('#saveBT').click(function(){
			
			addUserGroup.addUserGroupInfo();
	    });
		
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
	    });
	    
	    
	},
	initLoad : function() {
		
	},
	
	
	
	/**
     * 添加分组
     */
	addUserGroupInfo : function(){
		
		
		if(!addUserGroup.validateInput()){
			return;
		}
		var params = {};
		
		
		params['name'] = $.trim($('#nameId').val());
		params['count'] = 0;
		
    	manage.addUserGroupInfo(params ,
    		function(data){   		  
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');    				
    			}
    			else
    			{
    				utils.errorTip("系统繁忙,请稍候再试!");
    			}
    			
    			$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
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
    	
    	
    	var _nameLen = utils.getBytesLength($.trim($('#nameId').val()));
    	if(_nameLen == 0){
    		utils.warningTip('请输入分组名称');
    		return false;
    	}else{
    		if(_nameLen > 200){
        		utils.warningTip('命令字长度不能超过200个字符');
        		return false;
        	}
    	}
    	
    	return true;
    }
};