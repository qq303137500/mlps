/**
 * 添加和编辑新闻
 */
var addSubscribe = {
	id : null,
	replyText:null,
	
	initPage : function() {
		addSubscribe.initStyle();
		addSubscribe.initOperator();
		addSubscribe.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#saveBT').click(function(){
	    		addSubscribe.addSubscribeInfo();
	    });
	    
	    $('#cancelBT').click(function(){
	    	$("#replyTextId").val(addSubscribe.replyText);
	    });
	    
	    
	},
	initLoad : function() {
		addSubscribe.querySubscribeInfo();
	},
	
	
	
	/**
     * 添加关注回复
     */
	addSubscribeInfo : function(){
		if(!addSubscribe.validateInput()){
			return;
		}
		var params = {};
    	params['replyText'] = $.trim($('#replyTextId').val());
    	
    	params['id'] = addSubscribe.id;
    	manage.addSubscribeInfo(params ,
    		function(data){  
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');    				
    			}
    			if(data && data.retCode == 9050){
    				utils.succeedTip('记录已存在');    				
    			}
    			
    			var list = data.data;
        		for(var key in list){
    				var wxReplyModel = list[key];
    				$("#replyTextId").val(wxReplyModel.replyText);
    				addSubscribe.id=wxReplyModel.id;
    				addSubscribe.replyText=wxReplyModel.replyText;
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    querySubscribeInfo : function(){		
		var params = {};   	
    	manage.querySubscribeInfo(params ,
    		function(data){
    		var list = data.data;
    		for(var key in list){
				var wxReplyModel = list[key];
				$("#replyTextId").val(wxReplyModel.replyText);
				addSubscribe.id=wxReplyModel.id;
				addSubscribe.replyText=wxReplyModel.replyText;
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
    	
    	var _replyTextLen = utils.getBytesLength($.trim($('#replyTextId').val()));
    	    	  
    	if(_replyTextLen == 0){
    		utils.warningTip('请输入回复内容');
    		return false;
    	}else{
    		if(_replyTextLen > 2000){
        		utils.warningTip('正文内容不能超过2000字符');
        		return false;
        	}
    	}
    	return true;
    }
};