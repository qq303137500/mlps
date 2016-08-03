/**
 * 添加和编辑新闻
 */
var keyWordList = {
	id : null,
	replyText:null,
	
	initPage : function() {
		keyWordList.initStyle();
		keyWordList.initOperator();
		keyWordList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
		$('.keyWordList').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('keyWord_') != -1){//点击关键字查看           		
            		var id = _id.split("_")[1];
            		keyWordList.queryReplyById(id);
                }
            	
            	if(_id.indexOf('editBT_')!=-1)
            	{
            		var id = _id.split("_")[1];
            		var type = _id.split("_")[2];
            		
            		mp_index.id=id;
            		if(type =="news")
            		{
            			
            			$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/upNews.html"); 	
            		}
            		else
            		{
            			$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/upKeyWord.html");          			
            		}
            	}
            	if(_id.indexOf('delBT_')!=-1)
            	{
            		var id = _id.split("_")[1];
            		
            		keyWordList.delKeyWordInfo(id);
            	}
            }
        });
		
		

	},
		initLoad : function() {
			keyWordList.queryKeyWord();
		},
		toAddReply: function()
		{
			$(".main").html('');
			$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/addKeyWord.html");
		},
	
       delKeyWordInfo : function(replyId){
		var params = {};
		params['state'] = 0;
		params['id'] = replyId;
    	
    	manage.delKeyWordInfo(params ,
    		function(data){   		  
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');    				
    			}
    			
    			$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/keyWordList.html");
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	/**
     * 查询关键字
     */
	queryKeyWord : function(){
		
		var params = {};
    	
    	manage.queryKeyWord(params ,
    		function(data){
    		
    		var container = $('.keyWordList');
    		var tmp = null;
    		container.html('');
    		    		
    			var list = data.data;
    			if(list.length ==0)
    			{
    				tmp = $('<span class="sp">暂无关键字,在此添加。</span><p class="btn ml120"><a href="#" class="btn-submit" onclick="keyWordList.toAddReply()" id="saveBT">添加命令</a></p>'    					  						
    					);
    				tmp.appendTo(container);
    			}
    			else
    			{
    				var spanHtml='<div class="wx_menu"><h4>关键字</h4><ul id="keyWordUl">';
    				for(var key in list){
        				var wxReplyModel = list[key];
        				spanHtml=spanHtml+'<li><dl><dd><a class="" id="keyWord_'+ wxReplyModel.id +'">'+ wxReplyModel.name +'</a></dd></dl></li>';
        				
        				
        			}
    				spanHtml=spanHtml+'</ul></div>';
    				
    				$(spanHtml).appendTo(container);
    				var wxReplyModel = list[0];
    				var replyState = wxReplyModel.state=="1"?"正常":"删除";
    				var strHtml ='<div style="display: inline-block;vertical-align: top;"><table id="keyWordLookTable">'+
    						'<tr><td>命令字</td><td>'+wxReplyModel.replyContent+'</td>'+
    						'<td>命令名称</td><td>'+wxReplyModel.name+'</td></tr>'+ 
    						'<tr><td>命令类型</td><td>'+wxReplyModel.msgType+'</td>'+
    						'<td>返回信息类型</td><td>'+wxReplyModel.msgTypeDetail+'</td></tr>'+ 
    						'<tr><td>创建时间</td><td>'+wxReplyModel.createTime+'</td>'+
    						'<td>状态</td><td>'+replyState+'</td></tr></table>';    						
    						strHtml=strHtml+'<p class="btn ml120" id="btn_p_id"><a href="#" class="btn-submit" onclick="keyWordList.toAddReply()" id="addReplyBt">添加命令</a>&nbsp;';
    						if(wxReplyModel.replyContent !="KF")
    						{
    							
    							strHtml=strHtml+'<a href="#" class="btn-submit" name="editBtName" id="editBT_'+wxReplyModel.id+'_'+wxReplyModel.msgTypeDetail+'">编辑</a>&nbsp;';
    							strHtml=strHtml+'<a href="#" class="btn-submit" name="delBtName" id="delBT_'+wxReplyModel.id+'">删除</a>';
    						}
    						strHtml=strHtml+'</p></div>';
    				
    				$(strHtml).appendTo($('.keyWordList'));
    				
    			}
        		
        		
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
     queryReplyById : function(id){
		var params = {};
		params['id'] = parseInt(id);
		
    	manage.queryReplyById(params ,
    		function(data){
    		
    		var container = $('#keyWordLookTable');
    		var tmp = null;
    		container.html('');
    		    		
    			var wxReplyModel = data.data[0];
    			
    			if(!wxReplyModel)
    			{
    				tmp = $('<span class="sp">暂无数据。</span>'    					  						
    					);
    				tmp.appendTo(container);
    			}
    			else
    			{
    				var replyState = wxReplyModel.state=="1"?"正常":"删除";
    			$('<table>'+
    						'<tr><td>命令字</td><td>'+wxReplyModel.replyContent+'</td>'+
    						'<td>命令名称</td><td>'+wxReplyModel.name+'</td></tr>'+ 
    						'<tr><td>命令类型</td><td>'+wxReplyModel.msgType+'</td>'+
    						'<td>回复信息类型</td><td>'+wxReplyModel.msgTypeDetail+'</td></tr>'+ 
    						'<tr><td>创建时间</td><td>'+wxReplyModel.createTime+'</td>'+
    						'<td>状态</td><td>'+replyState+'</td></tr>'+ 
    					'</table>').appendTo(container);
    				$("a[name=editBtName]").attr("id","editBT_"+id+"_"+wxReplyModel.msgTypeDetail);
    				$("a[name=delBtName]").attr("id","delBT_"+id);
    				var editBT ="#editBT_"+id+"_"+wxReplyModel.msgTypeDetail;
    				var delBT_ ="#delBT_"+id;
    				if(wxReplyModel.replyContent =="KF")
    				{
    					$(editBT).hide();
    					$(delBT_).hide();
    				}
    				else
    				{
    					$(editBT).show();
    					$(delBT_).show();
    				}
    				
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