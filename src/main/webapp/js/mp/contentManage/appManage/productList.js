/**
 * 产品列表
 */
var productList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	dataMap : {},
		
	initPage : function() {
		productList.initStyle();
		productList.initOperator();
		productList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#productName').val()));
	    	if(_titleLen > 10){
        		utils.warningTip('产品名称不能超过100字符');
        		return;
        	}
	    	productList.queryProductList(0);
	    });
	    
	    $('#linkSave').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addProduct.html");
	    });
	    
	  //列表操作绑定事件
        $('#productBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('look_') != -1){//查看
            		mp_index.id = _id.split("_")[1];
            		mp_index.opt = "look";
            		$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addProduct.html");
                }else if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
                	mp_index.opt = "edit";
                	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/addProduct.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该产品信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	productList.delProduct(_id.split("_")[1]);
						},
					    cancel: true
					});
                }else if(_id.indexOf('top_') != -1){//置顶
                	var _productId = _id.split("_")[1];
                	var _product = productList.dataMap[_productId];
                	var _top = _product.top;
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
					    content: '<p>是否'+ _html +'该产品信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	productList.topProduct(_productId,_setTop);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		productList.queryProductList(0);
	},
	
	/**
     * 查询产品列表
     */
	queryProductList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = productList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['name'] = $.trim($('#productName').val());
    	productList.currentPage = parseInt(pageIndex+1);
    	manage.queryProductList(params , productList.queryProductList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询产品列表_成功
     */
    queryProductList_successcb : function(data){
		var container = $('#productBody');
		var tmp = null;
		container.html('');
		productList.dataMap = {};
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var product = list[key];
					productList.dataMap[product.id] = product;
					tmp = $('<tr>'+
							'<td title="'+product.name+'" >'+ utils.interceptString(product.name) +'</td>'+
							'<td>'+ product.operatorName +'</td>'+
							'<td>'+ product.fmt_updateTime +'</td>'+ 
							'<td>' +'<a id="look_'+ product.id +'" href="#">查看内容</a><a id="edit_'+ product.id +'" href="#">编辑</a><a id="del_'+ product.id +'" href="#">删除</a>'+(product.top==0?'<a id="top_'+ product.id +'" href="#">置顶</a></td>':'<a id="top_'+ product.id +'" href="#">取消置顶</a></td>')+
							'</tr>'
						);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="4" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				utils.paginationPage($('#productListPage'), data.page.totalPage, parseInt(data.page.curPage-1), productList.queryProductList,true);
				
			}
		}
    },
    
    /**
     * 删除产品
     */
    delProduct : function(id){
    	manage.delProduct({'id':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				productList.queryProductList(productList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    /**
     * 置顶或取消置顶产品
     */
    topProduct : function(id,top){
    	manage.topProduct({'id':id,'top':top} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				productList.queryProductList(productList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};