var coopNetWorkDetail={
	  oldPoint : "",
	  pointaddress : "",
	  pointlat: "",
	  pointlng: "",
	  editId : 0,
	  dotype :  "add",
		
	  initPage : function(id){
		coopNetWorkDetail.initBtn();
		coopNetWorkDetail.initLoad(id);
		
	  },
	  
	  initBtn : function(){
		  $("#showmap").click(function(){
			  coopNetWorkDetail.initMap();
		  });
		  
			$("#provinceEdit_select").change(function(){
				coopNetWorkDetail.getCityList();
			});
		  
		    $("#sumit_a").click(function(){
		    	coopNetWorkDetail.addCoopNetWork();
		    });
		    
		    $("#submitgoon_a").click(function(){
		    	coopNetWorkDetail.dotype="addgoon";
		    	coopNetWorkDetail.addCoopNetWork();
		    });
		    
		    $("#edit_a").click(function(){
		    	coopNetWorkDetail.dotype="edit";
		    	coopNetWorkDetail.addCoopNetWork();
		    });
		    
		    $("#back_a").click(function(){
		    	$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/coopNetWorkList.html");
		    });
	  },
	  
	  initLoad : function(id){
		  if(id){
			  coopNetWorkDetail.initEditPage(id);
		  } 
	  },
	  
	  /**
	   * 初始化编辑页面
	   */
	  initEditPage : function(id){
				var params={};
				params["id"]=id;
				sitesFunction.getCoopNetWork(params,function(data){
					var _data=data.data;
					
					$("#merchantName_input").html(_data.companyName);
					$("#merchantAddress_input").html(_data.address);
					$("#companyPhone_input").html(_data.companyPhone);
					coopNetWorkDetail.pointlat=_data.lat;
					coopNetWorkDetail.pointlng=_data.lng;
					sitesFunction.getCityBycid({'cityId':_data.cityId},function(citydata){
						var _citydata=citydata.data;
						$("#provinceEdit_select").html(_citydata.province);
						 coopNetWorkDetail.getCityList(_data.cityId); 
					});
				},null);
	  },
	  
	  initMap : function(){
			art.dialog({
			    content: ' <div  id="map_wrap" style="height:500px;width:500px;"></div>  ',
			    fixed: true,
			    id: 'Fm7',
				okVal: '确定',
				cancelVal : '取消',
				title:'地图标注',
				cancel: true,
				ok: function () {
					coopNetWorkDetail.pointlat=coopNetWorkDetail.oldPoint.point.lat;
					coopNetWorkDetail.pointlng=coopNetWorkDetail.oldPoint.point.lng;
					coopNetWorkDetail.showText();
			    }
			});
			// 百度地图API功能
			var _lat=22.559583;
			var _lng=113.952973;
			var map = new BMap.Map("map_wrap");    // 创建Map实例
		  	if(coopNetWorkDetail.pointlat!="" &&coopNetWorkDetail.pointlng!=""){
		  		_lat=coopNetWorkDetail.pointlat;
		  		_lng=coopNetWorkDetail.pointlng;
		  	}
			map.centerAndZoom(new BMap.Point(_lng,  _lat), 15);  // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
			map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		  	if(coopNetWorkDetail.pointlat!="" &&coopNetWorkDetail.pointlng!=""){
		  		var _point=new BMap.Point( coopNetWorkDetail.pointlng,coopNetWorkDetail.pointlat);//点
		  		var _marker=new BMap.Marker(_point);  //标记物
		  		map.addOverlay(_marker);
		  		coopNetWorkDetail.oldPoint=_marker;
		  	}
	  },
	  
	  showText : function(){
		  $("#merchantAddress_input").val(coopNetWorkDetail.pointaddress);
	  },
		/**
		 * 获取城市列表
		 */
		getCityList : function(cityid){
			var params={};
			params["provincename"]=$("#provinceEdit_select").html();
			sitesFunction.getCityList(params, function(data){
				var _option="";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if(cityid && cityid==_data[i].cityId){
						 $("#cityEdit_select").html(_data[i].cityName);
					} 
				}
			}, null);
			
			
			
		}
		
};