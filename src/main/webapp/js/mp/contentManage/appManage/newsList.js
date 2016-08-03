/**
 * 新闻列表
 */
var newsList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	dataMap : {},
		
	initPage : function() {
		newsList.initStyle();
		newsList.initOperator();
		newsList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#newsTitle').val()));
	    	if(_titleLen > 10){
        		utils.warningTip('标题不能超过100字符');
        		return;
        	}
	    	newsList.queryNewsList(0);
	    });
	    
	    $('#linkSave').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addNews.html");
	    });
	    
	  //列表操作绑定事件
        $('#newsBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('look_') != -1){//查看
            		mp_index.opt = "look";
            		window.open(sys.contextPath+"/mp/contentManage/appManage/proxy.html?showType=news&id="+_id.split("_")[1]);
                }else if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
                	mp_index.opt = "edit";
                	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addNews.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该新闻信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	newsList.delNews(_id.split("_")[1]);
						},
					    cancel: true
					});
                }else if(_id.indexOf('top_') != -1){//置顶
                	var _noticeId = _id.split("_")[1];
                	var _notice = newsList.dataMap[_noticeId];
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
					    content: '<p>是否'+ _html +'该新闻信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	newsList.topNews(_noticeId,_setTop);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		newsList.queryNewsList(0);
	},
	
	/**
     * 查询新闻列表
     */
	queryNewsList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = newsList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['title'] = $.trim($('#newsTitle').val());
    	newsList.currentPage = parseInt(pageIndex+1);
    	manage.queryNewsList(params , newsList.queryNewsList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询新闻列表_成功
     */
    queryNewsList_successcb : function(data){
		var container = $('#newsBody');
		var tmp = null;
		container.html('');
		newsList.dataMap = {};
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var notice = list[key];
					newsList.dataMap[notice.id] = notice;
					tmp = $('<tr>'+
							'<td title="'+notice.title+'" >'+ utils.interceptString(notice.title) +'</td>'+
							'<td>'+ notice.operatorName +'</td>'+
							'<td>'+ notice.fmt_updateTime +'</td>'+ 
							'<td>' +'<a id="look_'+ notice.id +'" href="#">查看内容</a><a id="edit_'+ notice.id +'" href="#">编辑</a><a id="del_'+ notice.id +'" href="#">删除</a>'+(notice.top==0?'<a id="top_'+ notice.id +'" href="#">置顶</a></td>':'<a id="top_'+ notice.id +'" href="#">取消置顶</a></td>')+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="4" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				
				utils.paginationPage($('#newsListPage'), data.page.totalPage, parseInt(data.page.curPage-1), newsList.queryNewsList,true);
			}
		}
    },
    
    /**
     * 删除新闻
     */
    delNews : function(id){
    	manage.delNews({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				newsList.queryNewsList(newsList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 置顶或取消置顶新闻
     */
    topNews : function(id,top){
    	manage.topNews({'id':id,'top':top} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				newsList.queryNewsList(newsList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};