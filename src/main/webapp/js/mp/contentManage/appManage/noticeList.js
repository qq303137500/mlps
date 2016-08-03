/**
 * 公告列表
 */
var noticeList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	dataMap : {},
		
	initPage : function() {
		noticeList.initStyle();
		noticeList.initOperator();
		noticeList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#noticeTitle').val()));
	    	if(_titleLen > 10){
        		utils.warningTip('标题不能超过100字符');
        		return;
        	}
	    	noticeList.queryNoticeList(0);
	    });
	    
	    $('#linkSave').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addNotice.html");
	    });
	    
	  //列表操作绑定事件
        $('#noitceBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('look_') != -1){//查看
            		mp_index.opt = "look";
            		window.open(sys.contextPath+"/mp/contentManage/appManage/proxy.html?showType=notice&id="+_id.split("_")[1]);
                }else if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
                	mp_index.opt = "edit";
                	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addNotice.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该公告信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	noticeList.delNotice(_id.split("_")[1]);
						},
					    cancel: true
					});
                }else if(_id.indexOf('top_') != -1){//置顶
                	var _noticeId = _id.split("_")[1];
                	var _notice = noticeList.dataMap[_noticeId];
                	var _top = _notice.top;
                	var _setTop = null;
                	var _html = '';
                	if(_top == 0){
                		_html = '置顶';
                		_setTop = 1;
                	}else{
                		_html = '取消置顶';
                		_setTop = 0;
                	}
                	art.dialog({
					    content: '<p>是否'+ _html +'该公告信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	noticeList.topNotice(_noticeId,_setTop);
						},
					    cancel: true
					});
                }else if(_id.indexOf('broadcast') != -1){//broadcast 广播
                	var params = {};
                	params['id'] = _id.split("_")[1];
                	params['title'] = _id.split("_")[2];
                	manage.broadcast(params , function(data){
                		if(data && data.retCode == 0){
                			utils.succeedTip('操作成功');
                		}
                	},function(){
                			utils.errorTip("系统繁忙,请稍候再试!");
            			}
            		);
                }
            }
        });
	},
	initLoad : function() {
		noticeList.queryNoticeList(0);
	},
	
	/**
     * 查询公告列表
     */
	queryNoticeList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = noticeList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['title'] = $.trim($('#noticeTitle').val());
    	noticeList.currentPage = parseInt(pageIndex+1);
    	manage.queryNoticeList(params , noticeList.queryNoticeList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询公告列表_成功
     */
    queryNoticeList_successcb : function(data){
		var container = $('#noitceBody');
		var tmp = null;
		container.html('');
		noticeList.dataMap = {};
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var notice = list[key];
					noticeList.dataMap[notice.id] = notice;
					tmp = $('<tr>'+
							'<td title="'+notice.title+'" >'+ utils.interceptString(notice.title) +'</td>'+
							'<td>'+ notice.operatorName +'</td>'+
							'<td>'+ notice.format_updateTime +'</td>'+ 
							'<td>' +'<a id="look_'+ notice.id +'" href="#">查看内容</a><a id="edit_'+ notice.id +'" href="#">编辑</a><a id="broadcast_'+ notice.id + '_' + notice.title +'" href="#">广播</a><a id="del_'+ notice.id +'" href="#">删除</a>'+(notice.top==0?'<a id="top_'+ notice.id +'" href="#">置顶</a></td>':'<a id="top_'+ notice.id +'" href="#">取消置顶</a></td>')+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="4" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				utils.paginationPage($('#noticeListPage'), data.page.totalPage, parseInt(data.page.curPage-1), noticeList.queryNoticeList,true);
			}
		}
    },
    
    /**
     * 删除公告
     */
    delNotice : function(id){
    	manage.delNotice({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				noticeList.queryNoticeList(noticeList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 置顶或取消置顶公告
     */
    topNotice : function(id,top){
    	manage.topNotice({'id':id,'top':top} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				noticeList.queryNoticeList(noticeList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};