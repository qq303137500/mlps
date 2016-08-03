var plandetails = {

	id : null,
	
	initPage : function() {
		plandetails.initStyle();
		plandetails.initOperator();
		plandetails.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		
	   /* $('#saveBT').click(function(){
	    	if(addProduct.id){
	    		addProduct.editProductInfo();
	    	}else{
	    		addProduct.addProductInfo();
	    	}
	    });*/
	    
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/workPlan/planList.html");
	    });
	    
	},
	initLoad : function() {
		if(mp_index.id){
			plandetails.id = mp_index.id;
			plandetails.findWorkPlanDetails(mp_index.id);
		}
	},
	/**
     * 查看计划详情
     */
	findWorkPlanDetails : function(id){
			plan_interface.findWorkPlanDetails({'workId':id},function(data){
    			if(data && data.retCode == 0){
    				var _info = data.data;
    				$("#worktitle").html(_info.worktitle);
    				$("#worktime").html(_info.worktime);
    				$("#shopname").html(_info.shopname);
    				var  customer= _info.customer.replace("|"," ");
    				$("#customer").html(customer);
    				$("#signInTime").html(_info.signInTime);
    				$("#signOutTime").html(_info.signOutTime);
    				$("#workTime").html(_info.hour+'小时'+_info.minute+'分钟');
    				$("#finishTime").html(_info.signOutTime);
    				$("#feedback").html(_info.feedback);
    			    var array=_info.workpic.split(',')
    			    for ( var int = 0; int < array.length; int++) {
    			    	if(array[int]!=''){
    			    		$("#img").after("<img  src="+array[int]+">");
    			    	}
						}
    			    
    			    // 百度地图API功能
    				var map = new BMap.Map("map_wrap");    // 创建Map实例
    				map.centerAndZoom(new BMap.Point(_info.startLng,_info.startLat), 11);  // 初始化地图,设置中心点坐标和地图级别
    				map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    				map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
    				map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    				map.enableDragging();  
    				//map.addControl(new BMap.TrafficControl()); 
    				
    				var pt = new BMap.Point(_info.startLng, _info.startLat);
    				var myIcon1 = new BMap.Icon(sys.contextPath+"/images/sIcon.png", new BMap.Size(35,48));
    				var marker2 = new BMap.Marker(pt,{icon:myIcon1});  // 创建标注
    				marker2.enableDragging();
    				map.addOverlay(marker2);   
    				
    				var pt2 = new BMap.Point(_info.endLng, _info.endLat);
    				var myIcon2 = new BMap.Icon(sys.contextPath+"/images/eIcon.png", new BMap.Size(35,48));
    				var marker3 = new BMap.Marker(pt2,{icon:myIcon2});  // 创建标注
    				marker3.enableDragging();
    				map.addOverlay(marker3);    
    				
    				mp_index.id = null;
    		    	mp_index.opt = null;
    			}
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    }
	
};