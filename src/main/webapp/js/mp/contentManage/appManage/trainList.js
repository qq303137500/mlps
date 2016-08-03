/**
 * 培训资料
 */
var trainList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	dataMap : {},
		
	initPage : function() {
		trainList.initStyle();
		trainList.initOperator();
		trainList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#inTitle').val()));
	    	if(_titleLen > 10){
        		utils.warningTip('标题不能超过100字符');
        		return;
        	}
	    	trainList.queryTrainList(0);
	    });
	    
	    $('#linkSave').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addTrain.html");
	    });
	    
	  //列表操作绑定事件
        $('#trainBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('look_') != -1){//查看
            		mp_index.id = _id.split("_")[1];
            		mp_index.opt = "look";
            		$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addTrain.html");
                }else if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
                	mp_index.opt = "edit";
                	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addTrain.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该资料信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	trainList.delTrain(_id.split("_")[1]);
						},
					    cancel: true
					});
                }else if(_id.indexOf('top_') != -1){//置顶
                	var _noticeId = _id.split("_")[1];
                	var _notice = trainList.dataMap[_noticeId];
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
					    content: '<p>是否'+ _html +'该资料信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	trainList.topTrain(_noticeId,_setTop);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		trainList.queryTrainList(0);
	},
	
	/**
     * 查询资料列表
     */
	queryTrainList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = trainList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['title'] = $.trim($('#inTitle').val());
    	trainList.currentPage = parseInt(pageIndex+1);
    	manage.queryTrainList(params , trainList.queryTrainList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询资料列表_成功
     */
    queryTrainList_successcb : function(data){
		var container = $('#trainBody');
		var tmp = null;
		container.html('');
		trainList.dataMap = {};
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var train = list[key];
					trainList.dataMap[train.id] = train;
					tmp = $('<tr>'+
							'<td>'+ train.title +'</td>'+
							'<td>'+ train.operatorName +'</td>'+
							'<td>'+ train.fmt_updateTime +'</td>'+ 
							'<td>' +'<a id="look_'+ train.id +'" href="#">查看内容</a><a id="edit_'+ train.id +'" href="#">编辑</a><a id="del_'+ train.id +'" href="#">删除</a>'+(train.top==0?'<a id="top_'+ train.id +'" href="#">置顶</a></td>':'<a id="top_'+ train.id +'" href="#">取消置顶</a></td>')+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="4" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				utils.paginationPage($('#trainListPage'), data.page.totalPage, parseInt(data.page.curPage-1), trainList.queryTrainList,true);
				
			}
		}
    },
    
    /**
     * 删除资料
     */
    delTrain : function(id){
    	manage.delTrain({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				trainList.queryTrainList(noticeList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 置顶或取消置顶资料
     */
    topTrain : function(id,top){
    	manage.topTrain({'id':id,'top':top} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				trainList.queryTrainList(noticeList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};