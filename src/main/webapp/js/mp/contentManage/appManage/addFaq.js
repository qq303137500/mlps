/**
 * 添加和编辑FAQ
 */
var addFaq = {

	id : null,
	
	initPage : function() {
		addFaq.initStyle();
		addFaq.initOperator();
		addFaq.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#saveBT').click(function(){
	    	if(addFaq.id){
	    		addFaq.editFaqInfo();
	    	}else{
	    		addFaq.addFaq();
	    	}
	    });
	    
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/faqList.html");
	    });
	    
	},
	initLoad : function() {
		if(mp_index.id){
			addFaq.id = mp_index.id;
			addFaq.getFaqById();
		}
	},
	
	/**
     * 根据ID查找FAQ信息
     */
	getFaqById : function(){
    	manage.getFaqById({'id':addFaq.id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				var _info = data.data;
    				$('#inTitle').val(_info.title);
    				$('#content').val(_info.content);
    				$('#faqType').val(_info.type);
    				mp_index.id = null;
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	/**
     * 添加FAQ信息
     */
    addFaq : function(){
		if(!addFaq.validateInput()){
			return;
		}
		var params = {};
    	params['title'] = $.trim($('#inTitle').val());
    	params['content'] = $.trim($('#content').val());
    	params['type'] = $.trim($('#faqType').val());
    	manage.addFaq(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/contentManage/appManage/faqList.html");
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 编辑FAQ信息
     */
    editFaqInfo : function(){
    	if(!addFaq.validateInput()){
			return;
		}
		var params = {};
		params['id'] = addFaq.id;
		params['title'] = $.trim($('#inTitle').val());
    	params['content'] = $.trim($('#content').val());
    	params['type'] = $.trim($('#faqType').val());
    	manage.editFaqInfo(params ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				$(".main").load(sys.contextPath+"/mp/contentManage/appManage/faqList.html");
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
    	var _contentLen = utils.getBytesLength($.trim($('#content').val()));
    	var _type = $.trim($('#faqType').val());
    	
    	if(_inTitleLen == 0){
    		utils.warningTip('请输入标题');
    		return false;
    	}else{
    		if(_inTitleLen > 100){
        		utils.warningTip('标题不能超过100字符');
        		return false;
        	}
    	}
    	
    	if(_contentLen == 0){
    		utils.warningTip('请输入内容');
    		return false;
    	}else{
    		if(_contentLen > 1000){
        		utils.warningTip('内容不能超过1000字符');
        		return false;
        	}
    	}
    	
    	if(!_type){
    		utils.warningTip('请选择类型');
    		return false;
    	}
    	
    	return true;
    }
};