/**
 * 用户管理
 */
var userList = {
		// 每页显示条数
		perPageSize : 10,
		//当前页数
		currentPage : 1,
		
		dataMap : {},
	groupId:null,
	groups:null,
	initPage : function() {
		userList.initStyle();
		userList.initLoad();
		userList.initOperator();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
		$('#groupListId').bind("click", function(e){
            var _cell = $(e.target);            
            var _id = _cell.attr("id");           
            if(_id){           	
            	if(_id.indexOf('group_look_') != -1){//点击查看分组信息           		
            		$("#groupListId li").removeClass("current");
            		var id = _id.split("_")[2];
            		$("#"+_id).parent().attr("class","current");
            		userList.groupId = id;           		
            		userList.queryUserByGroupId(0);
                }
               if(_id.indexOf('del_group_') != -1){//点击删除分组
            		            		
            		var groupId = _id.split("_")[2];          		           		
            		userList.delGroupByGroupId(groupId);
                }            	
            }
        });
		
		$('#userListPage a').bind("click", function(e)
				{
					var _cell = $(e.target);   		            
		            var _id = _cell.attr("id");
		            if(_id.indexOf('unbind_') != -1)
		            {
		            	var id = _id.split("_")[2];
		            	alert(id);
		            }
				});
		
		
		$('#queryNickNameBt').bind("click", function(e){
			userList.queryByInput(0);
        });
		
		$('#addWxGroup').bind("click", function(e){
			
			$(".main").load(sys.contextPath+"/mp/wxUserManage/addUserGroup.html");
        });
		
		
		$('#updateDataFromServer').bind("click", function(e){
			userList.updateData();
        });
		
	},
		initLoad : function() {			
			userList.queryGroup();
			
		},
		
		
		/**
		 * 删除分组
		 * @param groupId
		 */
		delGroupByGroupId:function(groupId)
		{
			var params = {};
			params['groupId'] = groupId;			
			manage.delGroupByGroupId(params ,
		    		function(data){		    		
				   if(data && data.retCode == 0){
    				   utils.succeedTip('删除分组成功');  
    				   $(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
    			     }else
    			     {
    			    	 utils.errorTip("删除分组失败,请稍候再试!"); 
      				   $(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html"); 
    			     }
		        		
		    		},
					function(){
		    			utils.errorTip("系统繁忙,请稍候再试!");
					}
				);						
		},
		
	/**
	 * 从微信同步更新分组和用户数据
	 */
	updateData : function(){	    	
		    utils.generalTip('提示','开始更新,请耐心等待......','succeed',3);
			var params = {};			
	    	manage.updateData(params ,
	    		function(data){
	    		
	    		if(data && data.retCode == 0){
	    			setTimeout(function(){
	    				utils.succeedTip('更新数据成功');  
	    				$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
	    			},4000);   				
    			}
	    		else
	    		{
	    			utils.errorTip("更新失败,请稍候再试!");
	    		}
	        		
	    		},
				function(){
	    			utils.errorTip("系统繁忙,请稍候再试!");
				}
			);
	    },
		/**
		 * 查看用户详情
		 * @param openId
		 */
	    lookUserDetail:function(openId)
	    {	    	
	    	$("#listDiv").hide();
			$("#detailDiv").load(
					sys.contextPath+"/mp/wxUserManage/wxUserDetail.html",
					function() {
						wxUserDetail.initPage(openId);	
						$("#back_to_list").click(function() {
							$("#listDiv").show();
							$("#detailDiv").hide();
						});
					}).show();
	    },	
	    //根据输入查询用户
	  queryByInput : function(pageIndex){
	    	
			var params = {};
			params['pageSize'] = userList.perPageSize;
	    	params['curPage'] = parseInt(pageIndex+1);
	    	
	    	userList.currentPage = parseInt(pageIndex+1);
			params['groupId'] = userList.groupId;
			params['nickName'] = $.trim($("#queryNickNameId").val());
	    	manage.queryByInput(params ,
	    		function(data){	    		
	    		var container = $('#userListBody');
	    		var tmp = null;
	    		container.html('');
	    		$('#userListPage').html(''); 		
	    			var list = data.data;
	    			if(list.length ==0)
	    			{
	    				tmp = $('<li>暂无用户。</li>'    					  						
	    					);
	    				tmp.appendTo(container);
	    			}
	    			else
	    			{
	    				var spanHtml='';
	    				for(var key in list){
	        				var user = list[key];
	        				    spanHtml=spanHtml+'<tr>';
	        				    spanHtml=spanHtml+'<td><img src="'+ user.headImgUrl+'" alt="" style="vertical-align: middle;width: 30px;"></td>';
	        					spanHtml=spanHtml+'<td style="width:100px;word-wrap:break-word;">'+ user.nickName+'</td>';
	        					spanHtml=spanHtml+'<td><input onchange="userList.changeUserRemark('+user.id+',&quot;'+user.openId+'&quot;,&quot;'+user.remark+'&quot;)" id="upUserRemark_'+user.id+'" value="'+ user.remark+'"></td>';
	        					var bindState = "未绑定";
	        					if(user.bindState == "1")
	        					{
	        						bindState="已绑定";
	        						spanHtml=spanHtml+'<td>'+ bindState+'|<a id="unbind_'+user.openId+'">解绑定</a></td>';
	        					}
	        					else
	        					{
	        						spanHtml=spanHtml+'<td>'+ bindState+'</td>';        						
	        					}
	        					spanHtml=spanHtml+'<td>'+ new Date(parseInt(user.subscribeTime) * 1000).toLocaleString().substr(0,20)+'</td>';
	        					
	        					var temp = '<select style="width:100px;" onchange="userList.selectGroupsChange(&quot;'+user.openId+'&quot;)" id="selectGroups_'+user.openId+'">';
	        					var groupList = userList.groups;
	        					for(var key1 in groupList)
	        					{
	        						var group = groupList[key1];
	        						
	        						if(group.name !="全部")
	        						{	        							
	        							if(user.groupId == group.groupId)
	        							{
	        								temp= temp+'<option selected value="'+group.groupId+'">'+group.name+'</option>';	
	        							}
	        							else
	        							{
	        								temp= temp+'<option value="'+group.groupId+'">'+group.name+'</option>';
	        							}
	        						}
	        					}
	        					
	        					temp= temp+'</select>';
	        					spanHtml=spanHtml+'<td>'+ temp+'</td>';
	        					spanHtml=spanHtml+'<td><a onclick="userList.lookUserDetail(&quot;'+user.openId+'&quot;)">'+ "查看"+'</a></td>';
	        					spanHtml=spanHtml+'</tr>';
	        			}
	    				
	    				$(spanHtml).appendTo(container);
	    				$('#userListDivId a').bind("click", function(e)
	    	    				{
	    					var _cell = $(e.target);   		            
	    		            var _id = _cell.attr("id");
	    		            if(_id.indexOf('unbind_') != -1)
	    		            {
	    		            	var id = _id.split("_")[1];
	    		            	$(this).parent().text("未绑定");
	    		            	var params = {};
	    		            	params['openId'] = id;
	    		            	manage.delAuthen(params,null,null);
	    		            }
	    	    				});
	    				if(data.page){
	    					
	    					utils.paginationPage($('#userListPage'), data.page.totalPage, parseInt(data.page.curPage-1), userList.queryByInput,true);
	    				}
	    				
	    			}
	    		},
				function(){
	    			utils.errorTip("系统繁忙,请稍候再试!");
				}
			);
	    },
	/**
	 * 查询分组信息
	 */
    queryGroup : function(){
    	userList.groupId=1000;
		var params = {};
		
    	manage.queryGroup(params ,
    		function(data){
    		
    		var container = $('#groupListId');
    		var tmp = null;
    		container.html('');
    		    		
    			var list = data.data;
    			userList.groups = list;
    			
    			if(list.length ==0)
    			{
    				tmp = $('<li>暂无分组,请添加。</li>'    					  						
    					);
    				tmp.appendTo(container);
    			}
    			else
    			{
    				var spanHtml="";
    				for(var key in list){
        				var group = list[key];
        				if(group.groupId == 1000)
        				{       					
        					spanHtml=spanHtml+'<li class="current"><a id="group_look_'+group.groupId+'">'+ group.name+'('+group.count+')' +'</a></li>';	
        				}
        				else
        				{
        					spanHtml=spanHtml+'<li><a id="group_look_'+group.groupId+'">'+ group.name+'('+group.count+')' +'</a>';
        					if(group.name !="全部" && group.name !="未分组")
        					{
        						spanHtml=spanHtml+'<!--&nbsp;&nbsp;&nbsp;<a class="userdel" id="del_group_'+group.groupId+'">删除</a>-->';	
        					}
        					spanHtml=spanHtml+'</li>';
        				}       				        				        				
        			}    				   				
    				$(spanHtml).appendTo(container);   				 				
    				userList.queryUserAll(0);
    			}
    			
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    
    /**
     * 根据分组查询用户
     * @param queryGroupId
     */
     queryUserByGroupId : function(pageIndex){
    	
		var params = {};
		params['groupId'] = userList.groupId;
		params['pageSize'] = userList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['title'] = $.trim($('#newsTitle').val());
    	userList.currentPage = parseInt(pageIndex+1);
    	
    	manage.queryUserAll(params ,
    		function(data){
    		
    		var container = $('#userListBody');
    		var tmp = null;
    		container.html('');
    		
    		$('#userListPage').html('');
    		    		
    			var list = data.data;
    			if(list.length ==0)
    			{
    				tmp = $('<li>暂无用户。</li>'    					  						
    					);
    				tmp.appendTo(container);
    			}
    			else
    			{
    				
    				var spanHtml='';
    				for(var key in list){
        				var user = list[key];
        				    spanHtml=spanHtml+'<tr>';
        				    spanHtml=spanHtml+'<td><img src="'+ user.headImgUrl+'" alt="" style="vertical-align: middle;width: 30px;"></td>';
        					spanHtml=spanHtml+'<td style="width:100px;word-wrap:break-word;">'+ user.nickName+'</td>';
        					spanHtml=spanHtml+'<td><input onchange="userList.changeUserRemark('+user.id+',&quot;'+user.openId+'&quot;,&quot;'+user.remark+'&quot;)" id="upUserRemark_'+user.id+'" value="'+ user.remark+'"></td>';
        					var bindState = "未绑定";
        					if(user.bindState == "1")
        					{
        						bindState="已绑定";
        						spanHtml=spanHtml+'<td>'+ bindState+'|<a id="unbind_'+user.openId+'">解绑定</a></td>';
        					}
        					else
        					{
        						spanHtml=spanHtml+'<td>'+ bindState+'</td>';        						
        					}
        					spanHtml=spanHtml+'<td>'+ new Date(parseInt(user.subscribeTime) * 1000).toLocaleString().substr(0,20)+'</td>';
        					
        					var temp = '<select style="width:100px;" onchange="userList.selectGroupsChange(&quot;'+user.openId+'&quot;)" id="selectGroups_'+user.openId+'">';
        					var groupList = userList.groups;
        					for(var key1 in groupList)
        					{
        						var group = groupList[key1];
        						
        						if(group.name !="全部")
        						{
        						if(user.groupId == group.groupId)
        						{
        							temp= temp+'<option selected value="'+group.groupId+'">'+group.name+'</option>';	
        						}
        						else
        						{
        							temp= temp+'<option value="'+group.groupId+'">'+group.name+'</option>';
        						}
        						}
        					}
        					
        					temp= temp+'</select>';
        					
        					spanHtml=spanHtml+'<td>'+ temp+'</td>';
        					spanHtml=spanHtml+'<td><a id="userLook_'+user.openId+'" onclick="userList.lookUserDetail(&quot;'+user.openId+'&quot;)">'+ "查看"+'</a></td>';
        					spanHtml=spanHtml+'</tr>';
        			}
    				
    				$(spanHtml).appendTo(container);
    				$('#userListDivId a').bind("click", function(e)
    	    				{
    					var _cell = $(e.target);   		            
    		            var _id = _cell.attr("id");
    		            if(_id.indexOf('unbind_') != -1)
    		            {
    		            	var id = _id.split("_")[1];
    		            	$(this).parent().text("未绑定");
    		            	var params = {};
    		            	params['openId'] = id;
    		            	manage.delAuthen(params,null,null);
    		            }
    	    				});
    				if(data.page){
    					
    					utils.paginationPage($('#userListPage'), data.page.totalPage, parseInt(data.page.curPage-1), userList.queryUserByGroupId,true);
    				}
    			}        		
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    changeUserRemark:function(id,openId,remark)
    {
    	var upRemarkId= "#upUserRemark_"+id;
    	
    	if($(upRemarkId).val() != remark)
    	{  		
    		art.dialog({
			    content: '<p>确定修改该用户备注吗?</p>',
			    fixed: true,
			    id: 'Fm7',
			    icon: 'question',
			    okVal: '确定',
			    cancelVal : '取消',
			    ok: function () {
			    	var params = {};
	    			params['openId'] = openId;
	    			var upRemarkId= "#upUserRemark_"+id;
	    			params['remark'] = $(upRemarkId).val();
	    			
	    			manage.changeUserRemark(params ,
	    					function(data){
	    				
	    				if(data && data.retCode == 0){
	    					utils.succeedTip('更新数据成功');  
	    					$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
	    				}
	    				else
	    				{
	    					utils.errorTip("更新失败,请稍候再试!");
	    					$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
	    				}
	    				
	    			},
	    			function(){
	    				utils.errorTip("系统繁忙,请稍候再试!");
	    				$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
	    			}
	    			);
				},
			    cancel: function()
			    {
			    	$(upRemarkId).val(remark);
			    }
			});    			
    	}
    	
    },
     queryUserAll : function(pageIndex){
		
		var params = {};
		params['pageSize'] = userList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	
    	userList.currentPage = parseInt(pageIndex+1);
		params['groupId'] = 1000;
    	manage.queryUserAll(params ,
    		function(data){
    		
    		var container = $('#userListBody');
    		var tmp = null;
    		container.html('');
    		    		
    			var list = data.data;
    			if(list.length ==0)
    			{
    				tmp = $('<li>暂无用户。</li>'    					  						
    					);
    				tmp.appendTo(container);
    			}
    			else
    			{
    				var spanHtml='';
    				for(var key in list){
        				var user = list[key];
        				    spanHtml=spanHtml+'<tr>';
        				    spanHtml=spanHtml+'<td><img src="'+ user.headImgUrl+'" alt="" style="vertical-align: middle;width: 30px;"></td>';
        					spanHtml=spanHtml+'<td style="width:100px;word-wrap:break-word;">'+ user.nickName+'</td>';
        					spanHtml=spanHtml+'<td><input onchange="userList.changeUserRemark('+user.id+',&quot;'+user.openId+'&quot;,&quot;'+user.remark+'&quot;)" id="upUserRemark_'+user.id+'" value="'+ user.remark+'"></td>';
        					var bindState = "未绑定";
        					if(user.bindState == "1")
        					{
        						bindState="已绑定";
        						spanHtml=spanHtml+'<td>'+ bindState+'|<a id="unbind_'+user.openId+'">解绑定</a></td>';
        					}
        					else
        					{
        						spanHtml=spanHtml+'<td>'+ bindState+'</td>';        						
        					}
        					spanHtml=spanHtml+'<td>'+ new Date(parseInt(user.subscribeTime) * 1000).toLocaleString().substr(0,20)+'</td>';
        					var temp = '<select style="width:100px;" onchange="userList.selectGroupsChange(&quot;'+user.openId+'&quot;)" id="selectGroups_'+user.openId+'">';
        					var groupList = userList.groups;
        					for(var key1 in groupList)
        					{
        						var group = groupList[key1];
        						
        						if(group.name !="全部")
        						{
        						if(user.groupId == group.groupId)
        						{
        							temp= temp+'<option selected value="'+group.groupId+'">'+group.name+'</option>';	
        						}
        						else
        						{
        							temp= temp+'<option value="'+group.groupId+'">'+group.name+'</option>';
        						}
        						}
        					}
        					
        					temp= temp+'</select>';
        					spanHtml=spanHtml+'<td>'+temp+'</td>';
        					spanHtml=spanHtml+'<td><a onclick="userList.lookUserDetail(&quot;'+user.openId+'&quot;)">'+ "查看"+'</a></td>';
        					spanHtml=spanHtml+'</tr>';
        			}
    				
    				$(spanHtml).appendTo(container);
    				$('#userListDivId a').bind("click", function(e)
    				{
    					var _cell = $(e.target);   		            
    		            var _id = _cell.attr("id");
    		            if(_id.indexOf('unbind_') != -1)
    		            {
    		            	var id = _id.split("_")[1];
    		            	$(this).parent().text("未绑定");
    		            	var params = {};
    		            	params['openId'] = id;
    		            	manage.delAuthen(params,null,null);
    		            }
    				});   				
    			}
        		
    			if(data.page){
    				$('#userListPage').html('');
    				utils.paginationPage($('#userListPage'), data.page.totalPage, parseInt(data.page.curPage-1), userList.queryUserAll,true);
    			}
    			//userList.selectGroupsChange();
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
     
    
    selectGroupsChange:function(openId)
    {
    	var groupSelected = "#selectGroups_"+openId;
   			art.dialog({
				    content: '<p>确定要修改该用户分组吗?</p>',
				    fixed: true,
				    id: 'Fm7',
				    icon: 'question',
				    okVal: '确定',
				    cancelVal : '取消',
				    ok: function () {
				    	var to_groupid = $(groupSelected).children('option:selected').val();
		    			
		    			var openid = openId;
		    			
		    			var params = {};
		    			params['to_groupid'] = to_groupid;
		    			params['openId'] = openId;
		    			manage.changeUserGroup(params ,
		    					function(data){
		    				
		    				if(data && data.retCode == 0){
		    					utils.succeedTip('更改分组成功');  
		    					$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
		    				}
		    				else
		    				{
		    					utils.errorTip("更改分组失败,请稍候再试!");
		    					$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
		    				}
		    				
		    			},
		    			function(){
		    				utils.errorTip("系统繁忙,请稍候再试!");
		    				$(".main").load(sys.contextPath+"/mp/wxUserManage/wxUserList.html");
		    			}
		    			);
				    	
					},
				    cancel: true
				});		
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