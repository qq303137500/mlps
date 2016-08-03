/**
 * 编辑关键字回复
 */
var upKeyWord = {
	id : null,
	replyText:null,
	replyContent:null,
	initPage : function() {
		upKeyWord.initStyle();
		upKeyWord.initOperator();
		upKeyWord.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
	
		$('#saveBT').click(function(){
			
			upKeyWord.upKeyWordInfo(mp_index.id);
	    });
		
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/keyWordList.html");
	    });
	    
	    
	},
	initLoad : function() {		
		upKeyWord.queryReplyById(mp_index.id);
	},
	
	
	
	/**
     * 修改关键字回复
     */
	upKeyWordInfo : function(replyId){
		
		
		if(!upKeyWord.validateInput()){
			return;
		}
		var params = {};
		
		
		params['name'] = $.trim($('#nameId').val());
		params['msgType'] = "text";
		params['state'] = 1;
		params['id'] = replyId;
    	params['replyText'] = $.trim($('#replyTextId').val());
    	params['replyContent'] = $.trim($('#replyContentId').val());
    	params['msgTypeDetail'] = $.trim($('input[name=msgTypeReply][checked]').val());
    	//修改前和修改后的关键字对比
    	if($.trim($('#replyContentId').val()) != upKeyWord.replyContent)
    	{
    		params['isFlag'] = 1;
    	}
    	else
    	{
    		params['isFlag'] = 0;
    	}
    	manage.upKeyWordInfo(params ,
    		function(data){   		  
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');    				
    			}
    			if(data && data.retCode == 9050){
    				utils.succeedTip('记录已存在');    				
    			}
    			
    			$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/keyWordList.html");
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    queryReplyById : function(id){		
		var params = {}; 
		params['id'] = id;
    	manage.queryReplyById(params ,
    		function(data){
    		var wxReplyModel = data.data[0];
    		
    		$("#nameId").val(wxReplyModel.name);
    		$("#replyContentId").val(wxReplyModel.replyContent);
    		$("#replyTextId").val(wxReplyModel.replyText);
    		upKeyWord.replyContent = wxReplyModel.replyContent;
    		
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
    	var _nameTextLen = utils.getBytesLength($.trim($('#nameId').val())); 
    	var _replyContentTextLen = utils.getBytesLength($.trim($('#replyContentId').val()));
    	var reg = new RegExp("^[a-za-z0-9]+$");
    	if(_nameTextLen == 0){
    		utils.warningTip('请输入命令字名称内容');
    		return false;
    	}else{
    		if(_nameTextLen > 40){
        		utils.warningTip('命令字名称长度不能超过40个字符');
        		return false;
        	}
    	}
    	
    	if(_replyContentTextLen == 0){
    		utils.warningTip('请输入命令字');
    		return false;
    	}else{
    		if(_replyContentTextLen > 40){
        		utils.warningTip('请输入命令字长度不能超过40个字符');
        		return false;
        	}
    		
    		if(!reg.test($.trim($('#replyContentId').val())))
    		{
    			utils.warningTip('输入命令字只能为英文和数字的组合');
        		return false;
    		}
    	}
    	
    	if(_replyTextLen == 0){
    		utils.warningTip('请输入正文内容');
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