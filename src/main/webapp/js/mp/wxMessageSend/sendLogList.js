/**
 * 添加群消息
 */
var sendLogList = {
		// 每页显示条数
		perPageSize : 10,
		//当前页数
		currentPage : 1,
		
		dataMap : {},
	
	initPage : function() {
		sendLogList.initStyle();
		sendLogList.initOperator();
		sendLogList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
		
		$('#returnBt').bind("click", function(e){
			$(".main").load(sys.contextPath+"/mp/wxMessageSend/addMessage.html");
        });
	},
	initLoad : function() {		
		sendLogList.queryAllSendLog(0);
	},
   
    /**
     * 查询当月的发送记录
     */
	queryAllSendLog : function(pageIndex){		
		
		var params = {};
    	params['pageSize'] = sendLogList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	
    	sendLogList.currentPage = parseInt(pageIndex+1);
    	manage.queryAllSendLog(params ,
    		function(data){
    		var list = data.data;
    		
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
    		
           if(data.page)
           {
				
				utils.paginationPage($('#sendLogPage'), data.page.totalPage, parseInt(data.page.curPage-1), sendLogList.queryAllSendLog,true);
			}
    			
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};