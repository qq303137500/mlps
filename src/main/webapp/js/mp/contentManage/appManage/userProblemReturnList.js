/**
 * 反馈列表
 */
var userProblemReturnList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
		
	initPage : function() {
		userProblemReturnList.initStyle();
		userProblemReturnList.initOperator();
		userProblemReturnList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#noticeTitle').val()));
	    	if(_titleLen > 10){
        		utils.warningTip('标题不能超过10字符');
        		return;
        	}
	    	userProblemReturnList.queryuserProblemReturnList(0);
	    });
	    //列表操作绑定事件
        $('#noitceBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该意见反馈信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	userProblemReturnList.delUserProblemReturn(_id.split("_")[1]);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		userProblemReturnList.queryuserProblemReturnList(0);
	},
	
	/**
     * 查询意见反馈列表
     */
	queryuserProblemReturnList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = userProblemReturnList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['title'] = $.trim($('#noticeTitle').val());
    	userProblemReturnList.currentPage = parseInt(pageIndex+1);
    	manage.findUserProblemReturnList(params , userProblemReturnList.queryuserProblemReturnList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询意见反馈列表_成功
     */
    queryuserProblemReturnList_successcb : function(data){
		var container = $('#noitceBody');
		var tmp = null;
		container.html('');
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var notice = list[key];
					tmp = $('<tr>'+
							'<td title="'+notice.userName+'">'+ utils.interceptString(notice.userName) +'</td>'+
							'<td>'+ notice.fmt_createtime +'</td>'+
							'<td>'+ userProblemReturnList.retUrl(notice.imageUrl)+'</td>'+
							'<td>'+ userProblemReturnList.retUrl(notice.voiceUrl)+'</td>'+
							'<td title="'+notice.content+'">'+ utils.interceptString(notice.content) +'</td>'+ 
							'<td>' +'<a id="del_'+ notice.id +'" href="#">删除</a></td>'+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="6" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				$('#counCar').html(data.page.counts);
				utils.paginationPage($('#userProblemReturnListPage'), data.page.totalPage, parseInt(data.page.curPage-1), userProblemReturnList.queryuserProblemReturnList,true);
			}
		}
    },
    
    /**
     * 删除意见反馈
     */
    delUserProblemReturn : function(id){
    	manage.delUserProblemReturn({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				userProblemReturnList.queryuserProblemReturnList(userProblemReturnList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    retUrl : function(url){
    	if(url){
    		return ('<a href="'+url+'" target="_blank">下载</a>'+url.substr(url.lastIndexOf('/')+1));
    	}else{
    		return '';
    	}
    }
};