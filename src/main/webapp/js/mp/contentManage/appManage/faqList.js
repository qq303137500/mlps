/**
 * FAQ
 */
var faqList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	typeMap : {'0':'公共问题','1':'贷前销售','2':'贷前风控','3':'贷中费用','4':'贷后业务','5':'贷后还款'},
		
	initPage : function() {
		faqList.initStyle();
		faqList.initOperator();
		faqList.initLoad();
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
	    	faqList.queryFaqList(0);
	    });
	    
	    $('#linkSave').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addFaq.html");
	    });
	    
	  //列表操作绑定事件
        $('#faqBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
                	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addFaq.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该FAQ信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	faqList.delFaq(_id.split("_")[1]);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		faqList.queryFaqList(0);
	},
	
	/**
     * 查询FAQ列表
     */
	queryFaqList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = faqList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['title'] = $.trim($('#inTitle').val());
    	var _faqType = $('#faqType').val();
    	if(_faqType){
    		params['type'] = _faqType;
    	}
    	faqList.currentPage = parseInt(pageIndex+1);
    	manage.queryFaqList(params , faqList.queryFaqList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询FAQ列表_成功
     */
    queryFaqList_successcb : function(data){
		var container = $('#faqBody');
		var tmp = null;
		container.html('');
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var info = list[key];
					tmp = $('<tr>'+
							'<td>'+ info.title +'</td>'+
							'<td>'+ faqList.showType(info.type) +'</td>'+
							'<td>' +'<a id="edit_'+ info.id +'" href="#">编辑</a><a id="del_'+ info.id +'" href="#">删除</a></td>'+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="3" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				utils.paginationPage($('#faqListPage'), data.page.totalPage, parseInt(data.page.curPage-1), faqList.queryFaqList,true);
				
			}
		}
    },
    
    /**
     * 删除FAQ
     */
    delFaq : function(id){
    	manage.delFaq({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				faqList.queryFaqList(noticeList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    showType : function(type){
    	if(type){
    		return faqList.typeMap[type];
    	}else{
    		return '';
    	}
    }
};