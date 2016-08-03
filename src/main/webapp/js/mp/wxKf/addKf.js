/**
 * 添加和编辑客服
 */
var addKf = {
	id : null,
	xheditor: null,
	initPage : function() {
		addKf.initStyle();
		addKf.initOperator();
		addKf.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#saveBT').click(function(){
	    	if(addKf.id){
	    		addKf.editKfInfo();
	    	}
	    	else
	    	{	    		
	    		addKf.addKfInfo();
	    	}
	    	
	    });
	    
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/wxKf/kfList.html");
	    });
	    
	   
	},
	initLoad : function() {
		if(mp_index.id){
			addKf.id = mp_index.id;
			
			addKf.getKfById();
		}
	},
	/**
	 * 查询客服信息
	 */
	getKfById : function(){
    	manage.getKfById({'id':addKf.id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				var _info = data.data;
    				$('#kf_account').val(_info.kfAccount);
    				$('#kf_nick').val(_info.kfNick);
    				$('#passWord').val(_info.passWord);
    				$('#kf_account').attr("readOnly","true");
    				$('#kf_account').attr("disabled","true");
    				
    				mp_index.id = null;
    		    	mp_index.opt = null;
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    editKfInfo : function(){
    	if(!addKf.validateInput()){
			return;
		}
		var params = {};
		params['id'] = addKf.id;
		params['kfAccount'] = $.trim($('#kf_account').val());
    	params['kfNick'] = $.trim($('#kf_nick').val());   	
    	params['passWord'] = $.trim($('#passWord').val());
    	
    	manage.editKfInfo(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/wxKf/kfList.html");
    			}
    			else
    			{
    				utils.errorTip("操作失败,请稍候再试!");	
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	/**
     * 添加客服
     */
	addKfInfo : function(){
		if(!addKf.validateInput()){
			return;
		}
		
		//校验账号是否重复
		if(addKf.validateAccount())
		{		
			return ;
		}
		var params = {};
    	params['kfAccount'] = $.trim($('#kf_account').val());
    	params['kfNick'] = $.trim($('#kf_nick').val());   	
    	params['passWord'] = $.trim($('#passWord').val());
    	
    	
    	manage.addKfInfo(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/wxKf/kfList.html");
    			}
    			else
    			{
    				utils.errorTip("添加失败,请稍候再试!");
    				$(".main").load(sys.contextPath+"/mp/wxKf/kfList.html");
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 校验账号是否存在
     */
    
    validateAccount:function()
    {
    	var params = {};
    	params['account'] = $.trim($('#kf_account').val());
    	var flag = true;
    	manage.getKfByAccount(params ,
        		function(data){
    		  var list = data.data;
    		  
        			if(list.length>0)
        			{
        				utils.warningTip("该工号已经存在!");
        				flag = true;
        			}
        			else
        			{
        				flag= false;       				
        			}
        		},
    			null
    		);
    	
    	return flag;
    },
    
    /**
     * 验证输入
     */
    validateInput : function(){
    	
    	var _kfAccount = utils.getBytesLength($.trim($('#kf_account').val()));
    	var _kfNick = utils.getBytesLength($.trim($('#kf_nick').val()));
    	var _passWord = utils.getBytesLength($.trim($('#passWord').val()));
    	var reg = new RegExp("^[a-za-z0-9]+$");
    	if(_kfAccount == 0){
    		utils.warningTip('请输入工号');
    		return false;
    	}else{
    		if(_kfAccount > 10){
        		utils.warningTip('工号不能超过10字符');
        		return false;
        	}
    		if(!reg.test($.trim($('#kf_account').val())))
    		{
    			utils.warningTip('输入工号只能为英文和数字的组合');
        		return false;
    		}
    		
    	}
    	if(_kfNick == 0){
    		utils.warningTip('请输入昵称');
    		return false;
    	}else{
    		if(_kfNick > 12){
        		utils.warningTip('昵称不能超过12字符');
        		return false;
        	}
    	}
    	
    	if(_passWord == 0){
    		utils.warningTip('请输入密码');
    		return false;
    	}else{
    		if(_passWord > 16){
        		utils.warningTip('密码长度不能超过16字符');
        		return false;
        	}
    		if(_passWord < 6){
        		utils.warningTip('密码长度不能小于6字符');
        		return false;
        	}
    	}
    	return true;
    }
};