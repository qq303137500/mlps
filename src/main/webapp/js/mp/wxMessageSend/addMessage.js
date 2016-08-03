/**
 * 添加群消息
 */
var addMessage = {
	
	sendNum:null,
	surplusNum:null,
	initPage : function() {
		addMessage.initStyle();
		addMessage.initOperator();
		addMessage.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
	
		$('#sendMessageForGroup').click(function(){
			
			addMessage.sendMessage();
	    });
        $('#queryAllSendLog').click(function(){
			
			addMessage.queryAllSendLog();
	    });
		
		
	    
	},
	initLoad : function() {
		addMessage.queryGroup();
		addMessage.querySendLog();
	},
	
	
	
	
	
	sendMessage : function(){
		if(addMessage.sendNum>=4)
		{
			utils.warningTip('本月群发消息数已经用完。');
    		return false;
		}
		
		
		var _sendMessageLen = utils.getBytesLength($.trim($('#sendMessageId').val()));
		
		if(_sendMessageLen == 0){
    		utils.warningTip('请输入消息内容');
    		return false;
    	}else{
    		if(_sendMessageLen > 600){
        		utils.warningTip('消息长度不能超过600个字符');
        		return false;
        	}
    	}
		
		utils.succeedTip('消息群发中...'); 
		var params = {}; 
		params['groupId'] = $.trim($("#groupSelectId").find("option:selected").val());
		
		
		params['messageType'] = $.trim($('input[name=messageType][checked]').val());
		params['content'] = $.trim($("#sendMessageId").val());
    	manage.sendMessage(params ,
    		function(data){
    		if(data && data.retCode == 0){
    			utils.succeedTip('发送成功');    				
			}
    		else
    		{
    			utils.errorTip("发送失败,已经超过了发送次数!");
    		}
    		
    		
    		$(".main").load(sys.contextPath+"/mp/wxMessageSend/addMessage.html");
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    /**
     * 查询所有的发送记录
     */
    queryAllSendLog: function(){		
    	$(".main").load(sys.contextPath+"/mp/wxMessageSend/sendLogList.html");
    },
    /**
     * 查询当月的发送记录
     */
    querySendLog : function(){		
		var params = {};   	
    	manage.querySendLog(params ,
    		function(data){
    		var list = data.data;
    		addMessage.sendNum=list.length;
    		addMessage.surplusNum=4-list.length;
    		
    		$("#surplusNum").text("本月剩余发送次数为："+addMessage.surplusNum);
    		var container = $('#sendLogBody');
    		container.html('');
    		if(list.length>0)
    		{
    			for(var key in list){
    				var log = list[key];
    				var groupNameTemp = "";
    				if(!log.groupName)
    				{
    					groupNameTemp ="未知分组";
    				}
    				else
    				{
    					groupNameTemp=log.groupName+'('+log.countNum+')';
    				}
    				$('<tr><td>'+log.content+'</td><td>'+groupNameTemp+'</td><td>'+log.createTime+'</td><tr>').appendTo(container);
    				
    			}
    			
    		}
    		else
    		{
    			var tmp = $('<tr><td colspan="4" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
    		}
    			
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    queryGroup : function(){		
		var params = {};   	
    	manage.queryGroup(params ,
    		function(data){
    		var list = data.data;
    		
    		var container = $('#groupSelectId');
    		container.html('');
    		
    		for(var key in list){
				var group = list[key];
				if(key == 0)
				{
					$('<option selected value="'+group.groupId+'">'+group.name+'</option>').appendTo(container);
					
				}else
				{
					$('<option value="'+group.groupId+'">'+group.name+'</option>').appendTo(container);
				}
				
			}
    			
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};