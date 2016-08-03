/**
 * 添加关键字
 */
var addKeyWord = {
	id : null,
	replyText:null,
	
	initPage : function() {
		addKeyWord.initStyle();
		addKeyWord.initOperator();
		addKeyWord.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
	
		$('#saveBT').click(function(){
			
			addKeyWord.addKeyWordInfo();
	    });
		
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/keyWordList.html");
	    });
	    
	    $("input[name=msgTypeReply]").click(function(){
	    	
	    	var selectedVal = $('input[name="msgTypeReply"]:checked ').val(); 
	    	if(selectedVal == "news")
	    	{
	    		$("#textReplyLi").hide();
		    	$("#btReplyLi").hide();
		    	$("#addNewsDiv").load(
						sys.contextPath+"/mp/wxReplyManage/keywordManage/addNews.html",
						function() {
							addNews.initPage(1);
						}).show();
	    	}
	    	else if(selectedVal =="newsTwo")
	    	{
	    		$("#textReplyLi").hide();
		    	$("#btReplyLi").hide();
		    	$("#addNewsDiv").load(
						sys.contextPath+"/mp/wxReplyManage/keywordManage/addNews.html",
						function() {
							addNews.initPage(2);
						}).show();
		    	
		    	
	    	}
	    	else
	    	{
	    		$("#textReplyLi").show();
		    	$("#btReplyLi").show();
		    	$("#addNewsDiv").hide();
	    	}
	    	
	     });
	},
	initLoad : function() {
		//addKeyWord.querySubscribeInfo();
	},
	
	
	
	/**
     * 添加关键字回复
     */
	addKeyWordInfo : function(){
		
		
		if(!addKeyWord.validateInput()){
			return;
		}
		var params = {};
		
		
		params['name'] = $.trim($('#nameId').val());
		params['msgType'] = "text";
		params['state'] = 1;
    	params['replyText'] = $.trim($('#replyTextId').val());
    	params['replyContent'] = $.trim($('#replyContentId').val());
    	params['msgTypeDetail'] = $.trim($('input[name=msgTypeReply][checked]').val());
    	//$('table').html('');
    	manage.addKeyWordInfo(params ,
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
    
    querySubscribeInfo : function(){		
		var params = {};   	
    	manage.querySubscribeInfo(params ,
    		function(data){
    		var list = data.data;
    		for(var key in list){
				var wxReplyModel = list[key];
				$("#replyTextId").val(wxReplyModel.replyText);
				addKeyWord.id=wxReplyModel.id;
				addKeyWord.replyText=wxReplyModel.replyText;
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
    	var _nameTextLen = utils.getBytesLength($.trim($('#nameId').val())); 
    	var _replyContentTextLen = utils.getBytesLength($.trim($('#replyContentId').val()));
    	
    	var reg = new RegExp("^[a-za-z0-9]+$");
    	
    	if(_nameTextLen == 0){
    		utils.warningTip('请输入命令名');
    		return false;
    	}else{
    		if(_nameTextLen > 40){
        		utils.warningTip('命令名长度不能超过40个字符');
        		return false;
        	}

    	}
    	
    	if(_replyContentTextLen == 0){
    		utils.warningTip('请输入命令字');
    		return false;
    	}else{
    		if(_replyContentTextLen > 40){
        		utils.warningTip('输入命令字长度不能超过40个字符');
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