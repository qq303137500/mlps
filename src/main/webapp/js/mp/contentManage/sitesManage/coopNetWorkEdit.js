var coopNetWorkEdit={
	  oldPoint : "",
	  pointaddress : "",
	  pointlat: "",
	  pointlng: "",
	  editId : 0,
	  dotype :  "add",
		
	  initPage : function(id){
		coopNetWorkEdit.initBtn();
		coopNetWorkEdit.initLoad(id);
		
		
	  },
	  
	  findlatlngisnull : function(){
			var params={};
			sitesFunction.getCoopNetWorkListlatlng(params,function(data){
				var _data=data.data;
			 //console.log(_data);
				var _id=0;
			 for(var i=0;i<1;i++){
				 _id=_data[i].id;
					var myGeo = new BMap.Geocoder();
					// 将地址解析结果显示在地图上,并调整地图视野
					myGeo.getPoint( _data[i].address, function(point){
						var param={};
						param['lat']=point.lat;
						param['lng']=point.lng;
						param['id']=_id;
						  sitesFunction.addCoopNetWork(param,function(data){
			 
						  },null);
						
					}, "北京市");
			 }
			},null);
		  
		  
	  },
	  
	  
	  initBtn : function(){
		  $("#showmap").click(function(){
			  coopNetWorkEdit.initMap();
		  });
		  
			$("#provinceEdit_select").change(function(){
				coopNetWorkEdit.getCityList();
			});
		  
		    $("#sumit_a").click(function(){
		    	coopNetWorkEdit.dotype="add";
		    	coopNetWorkEdit.addCoopNetWork();
		    });
		    
		    $("#submitgoon_a").click(function(){
		    	coopNetWorkEdit.dotype="addgoon";
		    	coopNetWorkEdit.addCoopNetWork();
		    });
		    
		    $("#edit_a").click(function(){
		    	coopNetWorkEdit.dotype="edit";
		    	coopNetWorkEdit.addCoopNetWork();
		    });
		    
		    $("#back_a").click(function(){
		    	$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/coopNetWorkList.html");
		    });
		    
		    $("#merchantName_input").blur(function(){
		    	coopNetWorkEdit.getCoopNetWorkByname(function(data){
		    		if(data.data!=""){
		    			utils.warningTip("网点名称已存在！");
		    		}
		    	});
		    });
	  },
	  
	  initLoad : function(id){
		  coopNetWorkEdit.loadProInfo(function(){
			  if(id){
				  $("#btn_li").find('p').eq(0).hide();
				  $("#btn_li").find('p').eq(1).hide();
				  $("#btn_li").find('p').eq(2).show();
				  coopNetWorkEdit.initEditPage(id);
			  }else{
				  $("#btn_li").find('p').eq(0).show();
				  $("#btn_li").find('p').eq(1).show();
				  $("#btn_li").find('p').eq(2).hide();
			  }
		  });
		  
	  },
	  
	  /**
	   * 初始化编辑页面
	   */
	  initEditPage : function(id){
				var params={};
				params["id"]=id;
				sitesFunction.getCoopNetWork(params,function(data){
					var _data=data.data;
					
					$("#merchantName_input").val(_data.companyName);
					$("#merchantAddress_input").val(_data.address);
					$("#companyPhone_input").val(_data.companyPhone);
					coopNetWorkEdit.pointlat=_data.lat;
					coopNetWorkEdit.pointlng=_data.lng;
					coopNetWorkEdit.editId=_data.id;
					
					sitesFunction.getCityBycid({'cityId':_data.cityId},function(citydata){
						var _citydata=citydata.data;
						 $("#provinceEdit_select option[value='"+_citydata.province+"']").attr("selected",true); //车牌所在地
						 coopNetWorkEdit.getCityList(_data.cityId); 
					});
				},null);
	  },
	  
	  
	  
	  initMap : function(){
			art.dialog({
			    content: ' <div><input type="text" class="input-txt w200" id="queStr_input"></input><input type="button" id="queStr_button" value="查询"></input></div><div  id="map_wrap" style="height:500px;width:500px;"></div>  ',
			    fixed: true,
			    id: 'Fm7',
				okVal: '确定',
				cancelVal : '取消',
				title:'地图标注',
				cancel: true,
				ok: function () {
					coopNetWorkEdit.pointlat=coopNetWorkEdit.oldPoint.point.lat;
					coopNetWorkEdit.pointlng=coopNetWorkEdit.oldPoint.point.lng;
					coopNetWorkEdit.showText();
			    }
			});
			
			
			var  _cityname="北京";
			// 百度地图API功能
			var map = new BMap.Map("map_wrap");    // 创建Map实例
			if(coopNetWorkEdit.pointlat!="" &&coopNetWorkEdit.pointlng!=""){
				map.centerAndZoom(new BMap.Point( coopNetWorkEdit.pointlng,coopNetWorkEdit.pointlat), 15); 
		  	}else{
		  		 
		  		if($("#cityEdit_select").val()!="" ){
		  			if($("#provinceEdit_select").val()=="台湾"){
		  				map.centerAndZoom(new BMap.Point(121.526659,25.078704), 8);   //特殊处理台湾的
		  			}else{
		  				_cityname=$("#cityEdit_select").find('option:selected').text();
		  				map.centerAndZoom(_cityname);  // 初始化地图,设置中心点坐标和地图级别
		  			}
					
				}
		  		
		  	}
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
		//	map.setCurrentCity("深圳市");          // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		  	map.addEventListener("click", function (e) {
		  		 //console.log('lat: '+e.point.lat+'-----------lng: '+e.point.lng);
		  		var _point=new BMap.Point( e.point.lng,e.point.lat);//点
		  		var _marker=new BMap.Marker(_point);  //标记物
				var mapinfo=new BMap.Geocoder(); 
				mapinfo.getLocation(_point,function(result){
					coopNetWorkEdit.pointaddress=result.address;
				});
		  		map.removeOverlay(coopNetWorkEdit.oldPoint);
				map.addOverlay(_marker);
				coopNetWorkEdit.oldPoint=_marker;
			});
		  	
		  	if(coopNetWorkEdit.pointlat!="" &&coopNetWorkEdit.pointlng!=""){
		  		var _point=new BMap.Point( coopNetWorkEdit.pointlng,coopNetWorkEdit.pointlat);//点
		  		var _marker=new BMap.Marker(_point);  //标记物
		  		map.addOverlay(_marker);
		  		coopNetWorkEdit.oldPoint=_marker;
		  	}
		  	
		  	$("#queStr_button").click(function(){
		  		map.centerAndZoom($("#queStr_input").val());
		  		
		  	});
		  	
		  	
		  	 
		  	
	  },
	  
	  showText : function(){
		  $("#merchantAddress_input").val(coopNetWorkEdit.pointaddress);
	  },
	  
	  
	  getCoopNetWorkByname : function(cb){
		  var param={};
		  param["cname"]= $("#merchantName_input").val();
		  if(coopNetWorkEdit.editId!=0){
				param["id"]=coopNetWorkEdit.editId;
		  }
		  
		  sitesFunction.getCoopNetWorkByname(param,function(data){
			  cb(data);
		  });
		  
	  },
	  
	  
	  addCoopNetWork : function(){
		  coopNetWorkEdit.getParam(function(param){
			  sitesFunction.addCoopNetWork(param,function(data){
				  if(data.retCode==0){
					  if(coopNetWorkEdit.dotype=="add"){
						  utils.succeedTip("添加成功！");
						  window.setTimeout(function(){
								$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/coopNetWorkList.html");
							}, 2000); 
					  }else if(coopNetWorkEdit.dotype=="addgoon"){
						  utils.succeedTip("添加成功！");
						  coopNetWorkEdit.clearForm();
						  
					  }else{
						  utils.succeedTip("编辑成功！");
						  window.setTimeout(function(){
								$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/coopNetWorkList.html");
							}, 2000); 
					  }
						
				  }
			  },null);
		  });
		 
		  
	  },
	  
	  
	  /**
	   * 清空表单
	   */
	  clearForm : function(){
		  $("#merchantName_input").val("");
		  $("#merchantAddress_input").val("");
		  $("#companyPhone_input").val("");
		  coopNetWorkEdit.pointlat="";
		  coopNetWorkEdit.pointlng="";
		  $("#provinceEdit_select option[value='']").attr("selected",true); //车牌所在地
		  $("#cityEdit_select").html('<option value="">--请选择--</option>');
			 
	  },
	  
	  
	  getParam : function(cb){
		var param={};
		
		if(coopNetWorkEdit.editId!=0){
			param["id"]=coopNetWorkEdit.editId;
		}
		
		var _merchantName=$("#merchantName_input").val();
		if($.trim(_merchantName)==""){
			utils.warningTip("请输入网点名称！");
			return false;
		}

		
		param["companyName"]=_merchantName;
		
		var cityEdit_select=$("#cityEdit_select").val();
		if($.trim(cityEdit_select)==""){
			utils.warningTip("请选择所在城市！");
			return false;
		}
		param["cityId"]=cityEdit_select;
		
		var merchantAddress_input=$("#merchantAddress_input").val();
		if($.trim(merchantAddress_input)==""){
			utils.warningTip("请输入公司地址！");
			return false;
		}
		param["address"]=merchantAddress_input;
		
		var companyPhone_input=$("#companyPhone_input").val();
		if($.trim(companyPhone_input)==""){
			utils.warningTip("请输入公司电话！");
			return false;
		}
		var phoneReg= /^\d+$/;
		if(!phoneReg.test(companyPhone_input)){
			utils.warningTip("公司电话格式不正确！");
			return false;
		}
		
		param["companyPhone"]=companyPhone_input;
		if(coopNetWorkEdit.pointlat=="" || coopNetWorkEdit.pointlng==""){
			utils.warningTip("请在地图上标注位置点！");
			return false;
		}
		param["lat"]=coopNetWorkEdit.pointlat;
		param["lng"]=coopNetWorkEdit.pointlng;
		
		
    	coopNetWorkEdit.getCoopNetWorkByname(function(data){
    		if(data.data!=""){
    			utils.warningTip("网点名称已存在！");
    			return false;
    		}else{
    			cb(param);
    		}
    	});
		
		
		
		
		
	  },
		/**
		 * 获取省份列表
		 */
		loadProInfo : function(cb){
			sitesFunction.getProvinceList(null,function(data){
				var _option="<option value=''>--请选择省份--</option>";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if($.trim(_data[i].province)!=""){
						_option+='<option value="'+_data[i].province+'">'+_data[i].province+'</option>';	
					}
					
				}
				 $("#provinceEdit_select").html(_option);
				 cb();
			},null);
		},
		
		
		/**
		 * 获取城市列表
		 */
		getCityList : function(cityid){
			var params={};
			params["provincename"]=$("#provinceEdit_select").val();
			sitesFunction.getCityList(params, function(data){
				var _option="";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if(cityid && cityid==_data[i].cityId){
						_option+='<option value="'+_data[i].cityId+'"  selected="selected" >'+_data[i].cityName+'</option>';
					}else{
						_option+='<option value="'+_data[i].cityId+'"  >'+_data[i].cityName+'</option>';
					}
					
				}
				 $("#cityEdit_select").html(_option);
			}, null);
			
			
			
		}
		
};