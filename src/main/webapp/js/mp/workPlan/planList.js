/**
 * 计划列表
 */
var planList = {

	// 每页显示条数
	perPageSize : 10,
	//当前页数
	currentPage : 1,
	
	dataMap : {},
	
	timeStr : '',
		
	initPage : function() {
		planList.initStyle();
		planList.initOperator();
		planList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	    $('#queryBT').click(function(){
	    	var _titleLen = utils.getBytesLength($.trim($('#worktitle').val()));
	    	if(_titleLen > 100){
        		utils.warningTip('标题不能超过100字符');
        		return;
        	}
	    	planList.queryWorkPlanList(0);
	    });
	    
	    $('#time_all').click(function(){
	    	$('#beginDate').val('');
	    	$('#endDate').val('');
	    	planList.queryWorkPlanList(0);
	    });
	    
	    $('#time_d').click(function(){
	    	planList.timeStr = "day";
	    	var date = new Date();
	    	var _date = utils.formatDateYMD(date);
	    	$('#beginDate').val(_date);
	    	$('#endDate').val(_date);
	    	planList.queryWorkPlanList(0);
	    });
	    
	    $('#time_m').click(function(){
	    	planList.timeStr = "thisMonth";
	    	var date = new Date();
	    	var _date = utils.formatDateYMD(date);
	    	$('#beginDate').val(_date.substr(0,8)+'01');
	    	$('#endDate').val(_date);
	    	planList.queryWorkPlanList(0);
	    });
	    
	  //列表操作绑定事件
        $('#planListBody').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            if(_id){
            	if(_id.indexOf('look_') != -1){
            		mp_index.id = _id.split("_")[1];
            		mp_index.opt = "look";
            		$(".main").load(sys.contextPath+"/mp/workPlan/plandetails.html");
            	}else if(_id.indexOf('edit_') != -1){//编辑
                	mp_index.id = _id.split("_")[1];
//                	mp_index.opt = "edit";
                	$(".main").load(sys.contextPath+"/mp/coreManage/organizationManage/addUser.html");
                }else if(_id.indexOf('del_') != -1){//删除
                	art.dialog({
					    content: '<p>是否删除该计划信息</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
					    	planList.delWorkPlan(_id.split("_")[1]);
						},
					    cancel: true
					});
                }
            }
        });
	},
	initLoad : function() {
		planList.queryWorkPlanList(0);
	},
	
	/**
     * 查询公告列表
     */
	queryWorkPlanList : function(pageIndex){
    	var params = {};
    	params['pageSize'] = planList.perPageSize;
    	params['curPage'] = parseInt(pageIndex+1);
    	params['worktitle'] = $.trim($('#worktitle').val());
    	var beginDate = $('#beginDate').val();
    	var endDate = $('#endDate').val();
    	var _beginDate = new Date(beginDate);
    	var _endDate = new Date(endDate);
    	if(_beginDate.getTime() > _endDate.getTime()){
    		alert("开始时间不能大于结束时间");
    		return;
    	}
    	if(beginDate){
    		params['beginDate'] = beginDate+' 00:00:00';
    	}
    	if(endDate){
    		params['endDate'] = endDate+' 23:59:59';
    	}
    	var _isurgency = $('#isurgency').val();
    	if(planList.timeStr){
    		params['timeStr'] = planList.timeStr;
    	}
    	if(_isurgency){
    		params['isurgency'] = _isurgency;
    	}
    	planList.currentPage = parseInt(pageIndex+1);
    	plan_interface.queryWorkPlanList(params , planList.queryWorkPlanList_successcb,
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	
	/**
     * 查询公告列表_成功
     */
    queryWorkPlanList_successcb : function(data){
		var container = $('#planListBody');
		var tmp = null;
		container.html('');
		planList.dataMap = {};
		if(data && data.retCode == 0){
			var list = data.data;
			if(list.length > 0){
				for(var key in list){
					var _plan = list[key];
//					planList.dataMap[user.id] = user;
					var _html = '<tr>'+
					'<td>'+ (_plan.isurgency==0?'一般':'紧急') +'</td>'+
					'<td>'+ _plan.worktitle +'</td>'+
					'<td>'+ _plan.worktime +'</td>'+
					'<td>'+ _plan.username +'</td>'+
					'<td>' +'<a id="look_'+ _plan.workid +'" href="#">查看</a><a id="del_'+ _plan.workid +'" href="#">删除</a></td>'+
					'</tr>';
					tmp = $(_html);
					tmp.appendTo(container);
				}
			}else{
				tmp = $('<tr><td colspan="5" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
				tmp.appendTo(container);
			}
			if(data.page){
				utils.paginationPage($('#planListPage'), data.page.totalPage, parseInt(data.page.curPage-1), planList.queryWorkPlanList,true);
				
			}
		}
    },
    
    /**
     * 删除公告
     */
    delWorkPlan : function(id){
    	plan_interface.delWorkPlan({'workId':id} ,
    		function(data){
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');
    				planList.queryWorkPlanList(planList.currentPage - 1);
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
};