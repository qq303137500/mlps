/**
 * 客服列表
 */
var kfList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	dataMap : {},
		
	initPage : function() {
		
		kfList.initStyle();
		kfList.initOperator();
		kfList.initLoad();
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
	    	kfList.querykfList(0);
	    });
	    
	    $('#linkSave').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/wxKf/addKf.html");
	    });
	    
	  //列表操作绑定事件
        $('#kfBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	 if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
                	mp_index.opt = "edit";
                	$(".main").load(sys.contextPath+"/mp/wxKf/addKf.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该客服</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	kfList.delKf(_id.split("_")[1]);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		
		kfList.querykfList(0);
	},
	
	/**
     * 查询客服列表
     */
	querykfList : function(pageIndex){
		
    	var params = {};
    	params['pageSize'] = kfList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['kfAccount'] = $.trim($('#queryKf').val());
    	params['kfNick'] = $.trim($('#queryKf').val());
    	kfList.currentPage = parseInt(pageIndex+1);
    	manage.querykfList(params , kfList.querykfList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询新闻列表_成功
     */
    querykfList_successcb : function(data){
		var container = $('#kfBody');
		var tmp = null;
		container.html('');
		kfList.dataMap = {};
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var kf = list[key];
					
					tmp = $('<tr>'+
							'<td>'+ kf.kfAccount +'</td>'+
							'<td>'+ kf.kfAccountDetail +'</td>'+
							'<td>'+ kf.kfNick +'</td>'+
							'<td>'+ kf.createTime +'</td>'+ 
							'<td>' +'<a id="edit_'+ kf.id +'" href="#">编辑</a><a id="del_'+ kf.id +'" href="#">删除</a><!--<a id="upPic_'+ kf.id +'" href="#">修改头像</a>--></td>'+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="4" style="height:30px;line-height:30px;">没搜索到结果</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				//console.log(data.page);
				utils.paginationPage($('#kfListPage'), data.page.totalPage, parseInt(data.page.curPage-1), kfList.querykfList,true);
			
			}
		}
    },
    
    /**
     * 删除客服
     */
    delKf : function(id){
    	manage.delKf({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				kfList.querykfList(kfList.currentPage - 1);
    			}
    			else
    			{
    				utils.errorTip("删除失败,请稍候再试!");
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};