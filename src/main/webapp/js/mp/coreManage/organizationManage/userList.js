/**
 * 用户列表
 */
var userList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	dataMap : {},
		
	initPage : function() {
		userList.initStyle();
		userList.initOperator();
		userList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#userName').val()));
	    	if(_titleLen > 10){
        		utils.warningTip('用户名不能超过100字符');
        		return;
        	}
	    	userList.querySecurUserList(0);
	    });
	    
	    $('#linkSave').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/coreManage/organizationManage/addUser.html");
	    });
	    
	  //列表操作绑定事件
        $('#userBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
//                	mp_index.opt = "edit";
                	$(".main").load(sys.contextPath+"/mp/coreManage/organizationManage/addUser.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该用户信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	userList.delSecurUser(_id.split("_")[1]);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		userList.querySecurUserList(0);
	},
	
	/**
     * 查询公告列表
     */
	querySecurUserList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = userList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['userName'] = $.trim($('#userName').val());
    	userList.currentPage = parseInt(pageIndex+1);
    	org_interface.querySecurUserList(params , userList.querySecurUserList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询公告列表_成功
     */
    querySecurUserList_successcb : function(data){
		var container = $('#userBody');
		var tmp = null;
		container.html('');
		userList.dataMap = {};
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var user = list[key];
//					userList.dataMap[user.id] = user;
					tmp = $('<tr>'+
							'<td>'+ user.userName +'</td>'+
							'<td>'+ user.userCname +'</td>'+
							'<td>'+ (user.isadmin == 'Y'?'是':'否') +'</td>'+
							'<td>'+ user.mobile +'</td>'+
							'<td>'+ user.lastUpdate +'</td>'+
							'<td>' +'<a id="edit_'+ user.userId +'" href="#">编辑</a><a id="del_'+ user.userId +'" href="#">删除</a></td>'+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="6" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				utils.paginationPage($('#userListPage'), data.page.totalPage, parseInt(data.page.curPage-1), userList.querySecurUserList,true);
				
			}
		}
    },
    
    /**
     * 删除公告
     */
    delSecurUser : function(id){
    	org_interface.delSecurUser({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				userList.querySecurUserList(userList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};