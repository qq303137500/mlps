/**
 * 在线申请列表
 */
var onlineAppList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	_tdLen : 0,
	
		
	initPage : function() {
		onlineAppList.initStyle();
		onlineAppList.initOperator();
		onlineAppList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#inTitle').val()));
	    	if(_titleLen > 10){
        		utils.warningTip('名称不能超过100字符');
        		return;
        	}
	    	var _selType = $('#selType').val();
	    	if(_selType == 1){
	    		$('#personalTR').show();
	    		$('#companyTR').hide();
	    		onlineAppList._tdLen = 9;
	    	}else{
	    		$('#personalTR').hide();
	    		$('#companyTR').show();
	    		onlineAppList._tdLen = 11;
	    	}
	    	onlineAppList.getApplyList(0);
	    });
	},
	initLoad : function() {
		onlineAppList.getApplyList(0);
	},
	
	/**
     * 查询资料列表
     */
	getApplyList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = onlineAppList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['contactName'] = $.trim($('#inTitle').val());
    	params['buyType'] = $.trim($('#selType').val());
    	onlineAppList.currentPage = parseInt(pageIndex+1);
    	manage.getApplyList(params , onlineAppList.getApplyList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询资料列表_成功
     */
    getApplyList_successcb : function(data){
		var container = $('#onlineAppBody');
		var tmp = null;
		container.html('');
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var _info = list[key];
					var _selType = $('#selType').val();
					if(_selType == 1){
						tmp = $('<tr>'+
								'<td>'+ _info.contactName +'</td>'+
								'<td>'+ _info.brand +'</td>'+
								'<td>'+ _info.carType +'</td>'+ 
								'<td>'+ _info.province +'</td>'+
								'<td>'+ _info.cityName +'</td>'+
								'<td>'+ _info.phone +'</td>'+ 
								'<td>'+ _info.email +'</td>'+
								'<td>'+ _info.qq +'</td>'+
								'<td>'+ (_info.buyType==1?'个人':'企业') +'</td>'+
								'</tr>'
							);
					}else{
						tmp = $('<tr>'+
								'<td>'+ _info.companyName +'</td>'+
								'<td>'+ _info.brand +'</td>'+
								'<td>'+ _info.carType +'</td>'+ 
								'<td>'+ _info.buyCount +'</td>'+
								'<td>'+ _info.useDes +'</td>'+
								'<td>'+ _info.contactName +'</td>'+
								'<td>'+ _info.phone +'</td>'+ 
								'<td>'+ _info.email +'</td>'+
								'<td>'+ _info.qq +'</td>'+
								'<td>'+ _info.portraiture +'</td>'+
								'<td>'+ (_info.buyType==1?'个人':'企业') +'</td>'+
								'</tr>'
							);
					}
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="'+ onlineAppList._tdLen +'" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				utils.paginationPage($('#onlineAppListPage'), data.page.totalPage, parseInt(data.page.curPage-1), onlineAppList.getApplyList,true);
				
			}
		}
    }
};