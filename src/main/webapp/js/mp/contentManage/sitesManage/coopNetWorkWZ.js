var coopNetWorkWZ={
	
		  oldPoint : "",
		  pointaddress : "",
		  pointlat: "",
		  pointlng: "",
		  _map : null,
		  _markerList : [],
		  queType : 0, //0代表全部  1代表按条件查询
		  
		initPage : function(){
			coopNetWorkWZ.initBtn();
			coopNetWorkWZ.initLoad();
		},
		
		initBtn : function(){
			$("#province_select").change(function(){
				coopNetWorkWZ.getCityList();
			});
			
			$("#sub_a").click(function(){
				coopNetWorkWZ.queType=1;
				coopNetWorkWZ.getCoopNetWorkList();
				coopNetWorkWZ.clearMap();
			});
			$("#result_div").click(function(e){
				if(e.target.nodeName=='SPAN'){
					//点击右边信息打开地图的窗口
					coopNetWorkWZ._markerList[$(e.target).parent().attr("unum")].openInfoWindow(coopNetWorkWZ._markerList[$(e.target).parent().attr("unum")].infowiw);
				}
			});
		},
		
		initLoad : function(){
			coopNetWorkWZ.loadProInfo();
			coopNetWorkWZ.initMap(function(){
				coopNetWorkWZ.getCoopNetWorkList();
			});
		},
		
		
		clearMap : function(){
			coopNetWorkWZ._map.clearOverlays();
		},
		  
		initMap : function(cb){
				// 百度地图API功能
				var map = new BMap.Map("map_wrap");    // 创建Map实例
				map.centerAndZoom(new BMap.Point(113.952973,  22.559583), 4);  // 初始化地图,设置中心点坐标和地图级别
				map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
				map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
				map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
				coopNetWorkWZ._map=map;
				cb();
		  },
		  
		 createPoint : function(lat,lng,companyName,companyPhone,address){
				var _point=new BMap.Point( lng,lat);//点
		  		var _marker=new BMap.Marker(_point);  //标记物
				var mapinfo=new BMap.Geocoder(); 
				coopNetWorkWZ._map.addOverlay(_marker);
				var _html="<div style='height:100px;width:200px;'>联系电话："+companyPhone+"<br/>公司地址："+address+"</div>";
				 var opts = {
					      width : 180,     // 信息窗口宽度
					      height: 80,     // 信息窗口高度
					      enableMessage:false,//设置允许信息窗发送短息
					      title : '<p title="'+companyName+'">'+companyName+'</p>'  // 信息窗口标题
					    };
					    var infoWindow = new BMap.InfoWindow(_html, opts);  // 创建信息窗口对象 
					    
					    _marker.infowiw=infoWindow;//缓存marker的弹出框信息
					    _marker.addEventListener("click", function(){          
					    	coopNetWorkWZ._map.openInfoWindow(infoWindow,_point); //开启信息窗口
					    });
					    coopNetWorkWZ._markerList.push(_marker);
					    
		 },
		 
		 
		 
		  
		getCoopNetWorkList : function(){
				var param={};
				param['pageSize'] = 100000;
				param['curPage'] = 1;		
				var _cityId=$('#city_select').val();
				param["cityId"]=_cityId;
				
				var province_select=$("#province_select").val();
				param["provinceId"]=province_select;
				if(province_select=="" && _cityId=="" && coopNetWorkWZ._map==1){
					alert("请选择合作商区域!");
				}else{
					ershouchemanage.getCoopNetWorkList(param,function(data){
						if(data.retCode==0){
							if(_cityId!=""){
								coopNetWorkWZ._map.centerAndZoom($('#city_select').text());
							}else{
								coopNetWorkWZ._map.centerAndZoom($("#province_select").text());
							}
							coopNetWorkWZ._markerList=[];
							var _data=data.data;
							var _html="<p>查询结果</p><ul>";
							var _lat="";
							var _lng="";
							for(var i=0;i<_data.length;i++){
								_lat=_data[i].lat;
								_lng=_data[i].lng;
							   _html+='<li unum="'+i+'">'
							         + '<img src=sys.contextPath+"/templets/default/images/u47.png" alt="" />'
									     + '<span>合作商名称：'+_data[i].companyName+'</span>'
									     + '<span>联系方式：'+(_data[i].companyPhone||"暂无")+'</span>'
								         + '<span>公司地址：'+_data[i].address+'</span>'
									   + '</li>';                               
							   coopNetWorkWZ.createPoint(_lat,_lng,_data[i].companyName,_data[i].companyPhone,_data[i].address);
							   if(i==0){
								   var _point=new BMap.Point( _lng,_lat);//点
							  		if(coopNetWorkWZ.queType==1){
							  			if(_cityId!=""){
											coopNetWorkWZ._map.centerAndZoom($('#city_select').text());
											coopNetWorkWZ._map.centerAndZoom(_point, 12);
										}else{
											coopNetWorkWZ._map.centerAndZoom($("#province_select").text());
											coopNetWorkWZ._map.centerAndZoom(_point, 8);
										}
									}
								}
							}
							$("#result_div").html(_html+'</ul>');
						}
					},null);
				}

			  
		 },
		/**
		 * 获取省份列表
		 */
		loadProInfo : function(){
			 ershouchemanage.getProvinceList(null,function(data){
				var _option="<option value=''>--请选择省份--</option>";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if($.trim(_data[i].province)!=""){
						_option+='<option value="'+_data[i].provinceId+'">'+_data[i].province+'</option>';	
					}
				}
				 $("#province_select").html(_option);
			},null);
		},
		
		/**
		 * 获取城市列表
		 */
		getCityList : function(){
			var params={};
			params["provinceId"]=$("#province_select").val();
			ershouchemanage.getCityList(params, function(data){
				var _option='<option value="">--请选择--</option>';
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
						_option+='<option value="'+_data[i].cityId+'"  >'+_data[i].cityName+'</option>';
				}
				 $("#city_select").html(_option);
			}, null);
			
			
			
		}
		 
};