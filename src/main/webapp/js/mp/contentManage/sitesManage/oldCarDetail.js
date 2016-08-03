var oldCarDetail={
	
		
		initPage : function(id){
			oldCarDetail.initLoad(id);
		},
		
		initLoad : function(id){
			oldCarDetail.initUpdateInfo(id);
			
		},
		
		/**
		 * 初始化编辑信息
		 */
		initUpdateInfo : function(id){
			var params={};
			$("#updateid").val(id);
			params["id"]=id;
			sitesFunction.getOldCarInfo(params,function(data){
				var _data=data.data;
				$("#carEdit_select").html(_data.brand);
				oldCarDetail.getCarList(_data.factoryNO,_data.carType);   //车系
				
				 $("#color_ul").find('li[value="'+_data.carColor+'"]').siblings('li').hide();
				
				
				$("#select_lev").html(_data.carLevel);
				
				 $("#fdj_input").html(_data.engine);//发动机
				
				 $("#bsx_input").html(_data.gearBox); //变速箱
				
				$("#provinceEdit_select").html(_data.province);
				
				oldCarDetail.getCityList(_data.province,_data.carnumCity);    
				
				$("#jxs_input").html(_data.merchantName);  //经销商
				
				 $("#mileage_input").html(_data.driveMileage); //行驶里程
				
				 $("#buyDate_input").html(_data.firstCardTime); //首次上牌
				
				 $("#price_input").html(_data.salePrice); //预售价格
				
				 $("#newPrice_input").html(_data.newCarPrice); //新车价格
				
			     $("#approve_input").html(_data.relevantauth); //相关认证
				
				 $("#assure_input").html(_data.relevantwar); //相关质保
				
				if(_data.carnature==1){    //车辆性质
					$("#select_clxz").html("营运");
				}else if(_data.carnature==2){
					$("#select_clxz").html("非营运");
				}else if(_data.carnature==3){
					$("#select_clxz").html("营转非");
				}else{
					$("#select_clxz").html("租赁");
				}
				
				$("#carStatus").html(_data.carStatus); //车辆状况
				
				$("input[name='isbyjl'][value='"+_data.ismainrecord+"']").attr("checked",true); //是否有保养记录
				if(_data.ismainrecord==0){
					$("#isbyjl").html("否");
				}else if(_data.ismainrecord==1){
					$("#isbyjl").html("是");
				}
				
				
				$("#repairDate").html(_data.mainexpire); //保养到期
				
				$("#annDate").html(_data.insexpire);  //年检到期
				
				$("#num_input").html(_data.circulnum); //流通次数
				
				//$("#car_photo_url").html(_data.carPhoto); //车辆照片
				
				$("#areaczzs").html(_data.carreadme);  //车主自述
				
				
				var  carPhoto=_data.carPhoto;
				var  carPhotoarr=carPhoto.split(',');
				var _htmlimg="";
				for(var i=0;i<carPhotoarr.length;i++){
					  if(carPhotoarr[i] && carPhotoarr[i]!=""){
						  _htmlimg+='<img  src="'+carPhotoarr[i]+'">';
					  }
					   
				}
				
				$("#pic_div").html(_htmlimg);
				
				
				var _rzjson=eval(_data.financingPackage);
				
				for(var i=0;i<_rzjson.length;i++){
					if(i>0){
						var _tr=$('<tr val="'+(i)+'">'
			        			+'<td></td>'
								+'<td></td>'
								+'<td></td>'
								+'<td></td>'
								+'<td></td>'
							+'</tr>');
			        	_tr.appendTo($("#rz_tbody"));
					}
					$("#rz_tbody").find('tr').eq(i).find('td').eq(0).html(_rzjson[i].name);
					$("#rz_tbody").find('tr').eq(i).find('td').eq(1).html(_rzjson[i].prop);
					$("#rz_tbody").find('tr').eq(i).find('td').eq(2).html(_rzjson[i].money);
					$("#rz_tbody").find('tr').eq(i).find('td').eq(3).html(_rzjson[i].time);
					$("#rz_tbody").find('tr').eq(i).find('td').eq(4).html(_rzjson[i].mmoney);
				}
				
				
			},null);
		},
		
		
		getCarList : function(facName,hierarchy){
			var params={};
			params["facName"]=facName;
			sitesFunction.getCarList(params, function(data){
				var _option="";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if(hierarchy && hierarchy==_data[i].hierarchy){
						$("#cartypeEdit_select").html(_data[i].carType);
					} 
				}
			}, null);
			
			
			
		},
		
		/**
		 * 获取城市列表
		 */
		getCityList : function(provincename,cityid){
			var params={};
			params["provincename"]=provincename;
			sitesFunction.getCityList(params, function(data){
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if(cityid && cityid==_data[i].cityId){
						$("#cityEdit_select").html(_data[i].cityName);
					} 
				}
			}, null);
			
			
			
		}


};