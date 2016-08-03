var mapFunUtils={
	
		
		createPoint : function(map,lat,lng){
			var _point=new BMap.Point(lng,lat);//点
	  		var _marker=new BMap.Marker(_point);  //标记物
	  		map.addOverlay(_marker);
		},
		
		/**
		 *  container : 容器名
		 *  lat		  ：默认纬度
		 *  lng       : 默认经度
		 *  lev		  : 地图高度 1到100...  越小地图拉得越高
		 *  wz        : 是否开启鼠标滚轮缩放  默认true
		 *  
		 *   return map 地图对象
		 */
		createMap : function(container,lat,lng,lev,wz){
			var map = new BMap.Map(container);    // 创建Map实例
			map.centerAndZoom(new BMap.Point(lng||113.952973,  lat||22.559583), 15);  // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
			map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(wz||true);     //开启鼠标滚轮缩放
			return map;
		},
		
		/**
		 * map   ：地图对象
		 * lat   ：纬度
		 * lng   ：经度
		 * 
		 *    return _marker标记物对象
		 */
		createMarker : function(map,lat,lng){
			var _point=new BMap.Point(lng,lat);//点
	  		var _marker=new BMap.Marker(_point);  //标记物
	  		map.addOverlay(_marker);
	  		return _marker;
		},
		
		
		/**
		 * point 点对象
		 * 
		 * return 点地址
		 */
		getLocation : function(_point){
			var mapinfo=new BMap.Geocoder(); 
			mapinfo.getLocation(_point,function(result){
				return result;
			});
		}
};