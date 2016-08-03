var oldCarEdit={
		
		imgurlStr : "",
		
		uploadImgId : "", 
		
		imgNum : 0,
		
		dotype: 0,  //0 添加  1  更新
		
		trNum : 0,
	
	    initPage : function(id) {
			oldCarEdit.initLoad(id);
			oldCarEdit.initOperator();
			oldCarEdit.initStyle();
		},
		
		
		initStyle : function() {
	        $('#buyDate_input').focus(function() {
	            WdatePicker({
	            	maxDate : '#F{\'%y-%M-%d\'}',
	                dateFmt:'yyyy-MM-dd'
	            });
	        });
	        
	        $('#repairDate').focus(function() {
	            WdatePicker({
	                dateFmt:'yyyy-MM-dd'
	            });
	        });
	        
	        $('#annDate').focus(function() {
	            WdatePicker({
	                dateFmt:'yyyy-MM-dd'
	            });
	        });
	        
	        
			$("#areaczzs").keyup(function() {
				var curLen = $('#areaczzs').val().length;
				if(curLen>500){
					var num=$("#areaczzs").val().substr(0,499);
					$("#areaczzs").val(num);
					$('.chao').show();
				}else{
					$('#count').text(curLen);
					$('.chao').hide();
				}
			});
			
			$(".carColor li").click(function() {
				$(this).addClass('bg').siblings('li').removeClass('bg');
			});
			
			$("#delimg").click(function(){
				$("#img_"+oldCarEdit.imgNum).attr("src",sys.contextPath+"/images/sh-1.jpg");
				oldCarEdit.imgNum=oldCarEdit.imgNum-1;
			});
			
           
		},
		
		
		initOperator : function() {
			
			$("#carEdit_select").change(function(){
				oldCarEdit.getCarList();
			});
			
			$("#provinceEdit_select").change(function(){
				oldCarEdit.getCityList();
			});
			
			$("#upload_carPhoto").click(function(){
				 $('#file_carPhoto').click();
				 //publicUtility.uploadPicFlash('w_ospphoto',50,50,'addorUpdatePointsLv.uploadPicCb');//w_ospphoto
	          //  $('#file_carPhoto').click();
	        });
			
	        $('#file_carPhoto').change(function(){
	        	oldCarEdit.loadImage(this);
	        });
	        
	        $("#fabu_a").click(function(){
	        	oldCarEdit.addFunction();
	        });
	        
	        $("#update_a").click(function(){
	        	oldCarEdit.updateFunction();
	        });
	        
	        
	        $("#pic_div").click(function(e){
	        	if(e.target.nodeName=="IMG"){
	        		if($(e.target).attr("src")!=sys.contextPath+"/images/sh-1.jpg"){
	            		oldCarEdit.imgNum=$(e.target).attr("id").split('_')[1];
		        		art.dialog({
						    content: '<p>是否删除该照片</p>',
						    fixed: true,
						    id: 'Fm7',
						    icon: 'question',
						    okVal: '确定',
						    cancelVal : '取消',
						    ok: function () {
			        			$("#img_"+oldCarEdit.imgNum).attr("src",sys.contextPath+"/images/sh-1.jpg");
			        			 $("#img_"+oldCarEdit.imgNum+"_input").val("");
			    				oldCarEdit.imgNum=oldCarEdit.imgNum-1;
							},
						    cancel: true
						});
	        		}
	
	        	}
	        	
	        });
	        
	        $("#rz_thead").click(function(e){
	        	if(e.target.nodeName=="IMG"){
	        		oldCarEdit.trNum++;
		        	var _tr=$('<tr val="'+oldCarEdit.trNum+'">'
		        			+'<td><input class="describe" maxlength="20" type="text" style="width:100px" /></td>'
							+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
							+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
							+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
							+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
							+'<td>'
							+'	<a href="javascript:;"><img src=sys.contextPath+"/images/u163.png" alt=""></a>'
							+'</td>'
						+'</tr>');
		        	_tr.appendTo($("#rz_tbody"));
	        	}
	        });
	        $("#rz_tbody").click(function(e){
	        	if(e.target.nodeName=="IMG"){
	        		oldCarEdit.trNum--;
	        		$("#rz_tbody").find('tr[val="'+$(e.target).parents('tr').attr("val")+'"]').remove();
	        	}
	        });
		},
		
		initLoad : function(id) {
			oldCarEdit.loadProInfo();
			oldCarEdit.loadCarinfo(function(){
				if(id){
					oldCarEdit.dotype=1;
					oldCarEdit.initUpdateInfo(id);
					$("#add_p").hide();
					$("#update_p").show();
				}else{
					$("#add_p").show();
					$("#update_p").hide();
				}
			});
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
				
				
				$("#carEdit_select option[value='"+_data.brand+"']").attr("selected",true); //品牌
			   	oldCarEdit.getCarList(_data.carType);   //车系
				
				 $("#color_ul").find('li[value="'+_data.carColor+'"]').addClass('bg').siblings('li').removeClass('bg');
				
				
				$("#select_lev option[value='"+_data.carLevel+"']").attr("selected",true); //车辆级别
				
				 $("#fdj_select option[value='"+_data.engine+"']").attr("selected",true); //发动机
				
				 $("#bsx_select option[value='"+_data.gearBox+"']").attr("selected",true); //变速箱
				
				$("#provinceEdit_select option[value='"+_data.province+"']").attr("selected",true); //车牌所在地
				
				oldCarEdit.getCityList(_data.carnumCity);    
				 
				$("#merchantName_input").val(_data.merchantName); //经销商
				 
				 $("#mileage_input").val(_data.driveMileage); //行驶里程
				
				 $("#buyDate_input").val(_data.firstCardTime); //首次上牌
				
				 $("#price_input").val(_data.salePrice); //预售价格
				
				 $("#newPrice_input").val(_data.newCarPrice); //新车价格
				
			     $("#approve_input").val(_data.relevantauth); //相关认证
				
				 $("#assure_input").val(_data.relevantwar); //相关质保
				
				$("#select_clxz option[value='"+_data.carnature+"']").attr("selected",true); //车辆性质
				
				$("#carStatus").val(_data.carStatus); //车辆状况
				
				$("input[name='isbyjl'][value='"+_data.ismainrecord+"']").attr("checked",true); //是否有保养记录
				
				$("#repairDate").val(_data.mainexpire); //保养到期
				
				$("#annDate").val(_data.insexpire);  //年检到期
				
				$("#num_input").val(_data.circulnum); //流通次数
				
				$("#car_photo_url").val(_data.carPhoto); //车辆照片
				
				$("#areaczzs").val(_data.carreadme);  //车主自述
				$('#count').text(_data.carreadme.length);
				
				var  carPhoto=_data.carPhoto;
				var  carPhotoarr=carPhoto.split(',');
				for(var i=0;i<carPhotoarr.length;i++){
					  if(carPhotoarr[i] && carPhotoarr[i]!=""){
						  $("#img_"+(i+1)).attr("src",carPhotoarr[i]);
				           $("#img_"+(i+1)+"_input").val(carPhotoarr[i]);
					  }
					   
				}
				
				
				
				var _rzjson=eval(_data.financingPackage);
				
				for(var i=0;i<_rzjson.length;i++){
					if(i>0){
						var _tr=$('<tr val="'+(i)+'">'
			        			+'<td><input class="describe" maxlength="20" type="text" style="width:100px" /></td>'
								+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
								+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
								+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
								+'<td><input class="describe" maxlength="10" type="text" style="width:100px" /></td>'
								+'<td>'
								+'	<a href="javascript:;"><img src=sys.contextPath+"/images/u163.png" alt=""></a>'
								+'</td>'
							+'</tr>');
			        	_tr.appendTo($("#rz_tbody"));
					}
					$("#rz_tbody").find('tr').eq(i).find('input').eq(0).val(_rzjson[i].name);
					$("#rz_tbody").find('tr').eq(i).find('input').eq(1).val(_rzjson[i].prop);
					$("#rz_tbody").find('tr').eq(i).find('input').eq(2).val(_rzjson[i].money);
					$("#rz_tbody").find('tr').eq(i).find('input').eq(3).val(_rzjson[i].time);
					$("#rz_tbody").find('tr').eq(i).find('input').eq(4).val(_rzjson[i].mmoney);
				}
				
			},null);
		},
		
		/**
		 * 获取省份列表
		 */
		loadProInfo : function(){
			sitesFunction.getProvinceList(null,function(data){
				var _option="<option value=''>--请选择省份--</option>";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if($.trim(_data[i].province)!=""){
						_option+='<option value="'+_data[i].province+'">'+_data[i].province+'</option>';	
					}
					
				}
				 $("#provinceEdit_select").html(_option);
			},null);
		},
		
		
		loadCarinfo : function(cb){
			sitesFunction.getCarFacList(null,function(data){
				var _option="<option value=''>--请选择品牌--</option>";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if($.trim(_data[i].brand)!=""){
					_option+='<option value="'+_data[i].brandpy+'">'+_data[i].brand+'</option>';
					}
				}
				 $("#carEdit_select").html(_option);
				 cb();
			},null);
		},
		
		getCarList : function(hierarchy){
			var params={};
			params["facName"]=$("#carEdit_select").val();
			sitesFunction.getCarList(params, function(data){
				var _option="";
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if(hierarchy && hierarchy==_data[i].hierarchy){
						_option+='<option value="'+_data[i].hierarchy+'" selected="selected">'+_data[i].carType+'</option>';
					}else{
						_option+='<option value="'+_data[i].hierarchy+'">'+_data[i].carType+'</option>';
					}
					
				}
				 $("#cartypeEdit_select").html(_option);
			}, null);
			
			
			
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
			
			
			
		},
		
		/**
		 * 发布
		 */
		addFunction : function(){
			oldCarEdit.getParam(function(_param){
				sitesFunction.addOldCarInfo(_param,function(data){
					if(data.retCode==0){
						utils.succeedTip("添加成功！");
						$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/oldCarList.html");
					}else{
						utils.errorTip(data.message!=""?data.message:"请求失败！");
					}
				},null);
			});
		},
		
		
		/**
		 * 更新
		 */
		updateFunction : function(){
			oldCarEdit.getParam(function(_param){
				sitesFunction.addOldCarInfo(_param,function(data){
					if(data.retCode==0){
						utils.succeedTip("编辑成功！");
						window.setTimeout(function(){
							$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/oldCarList.html");
						}, 2000); 
						
					}else{
						utils.errorTip(data.message!=""?data.message:"请求失败！");
					}
				},null);
			});
		},
		
		/**
		 * 获取参数
		 */
		getParam : function(cb){
			var param={};
			
			var _id=$("#updateid").val();
			if(_id){
				param["id"]=_id;	
			}
			var _cartypeEdit_select=$("#cartypeEdit_select").val(); //车系
			if($.trim(_cartypeEdit_select)==""){
				utils.warningTip("请选择车系！");
				return false;
			}
			param["carType"]=_cartypeEdit_select;
			
			var _cartypeEditStr_select=$("#cartypeEdit_select").find('option:selected').text(); //车系
			param["carTypeName"]=_cartypeEditStr_select;
			
			var _color_ul=$("#color_ul").find('li[class="bg"]').find('span').text(); //车辆颜色
			if($.trim(_color_ul)==""){
				utils.warningTip("请选择车辆颜色！");
				return false;
			}
			param["carColor"]=_color_ul;
			
			var _select_lev=$("#select_lev").val(); //车辆级别
			if($.trim(_select_lev)==""){
				utils.warningTip("请选择车辆级别！");
				return false;
			}
			param["carLevel"]=_select_lev;
			
			var _fdj_input=$("#fdj_select").val();//发动机
			if($.trim(_fdj_input)==""){
				utils.warningTip("请选择发动机类型！");
				return false;
			}
			param["engine"]=_fdj_input;
			
			var _bsx_input=$("#bsx_select").val(); //变速箱
			if($.trim(_bsx_input)==""){
				utils.warningTip("请选择变速箱类型！");
				return false;
			}
			param["gearBox"]=_bsx_input;
			
			var _cityEdit_select=$("#cityEdit_select").val(); //车牌所在地
			if($.trim(_cityEdit_select)==""){
				utils.warningTip("请选择车牌所在地！");
				return false;
			}
			param["carnumCity"]=_cityEdit_select;
			
			var _merchantName=$("#merchantName_input").val(); //经销商名称
			if($.trim(_merchantName)==""){
				utils.warningTip("请输入经销商名称！");
				return false;
			}
			param["merchantName"]=_merchantName;
			
			var _mileage_input=$("#mileage_input").val(); //行驶里程
			if($.trim(_mileage_input)==""){
				utils.warningTip("请输入行驶里程！");
				return false;
			}else if(isNaN(_mileage_input)){
				utils.warningTip("行驶里程必须为数字类型！");
				return false;
			}else if(_mileage_input<0){
				utils.warningTip("行驶里程必须为正数！");
				return false;
			}else if(_mileage_input>9999999){
				utils.warningTip("行驶里程输入过大！");
				return false;
			}
			param["driveMileage"]=_mileage_input;
			
			var _buyDate_input=$("#buyDate_input").val(); //首次上牌
			if($.trim(_buyDate_input)==""){
				utils.warningTip("请输入首次上牌时间！");
				return false;
			}
			param["firstCardTime"]=_buyDate_input;
			
			var _price_input=$("#price_input").val(); //预售价格
			if($.trim(_price_input)==""){
				utils.warningTip("请输入预售价格！");
				return false;
			}else if(isNaN(_price_input)){
				utils.warningTip("预售价格必须为数字类型！");
				return false;
			}else if(_price_input<0){
				utils.warningTip("预售价格必须为正数！");
				return false;
			}
			param["salePrice"]=_price_input;
			
			var _newPrice_input=$("#newPrice_input").val(); //新车价格
			 if(isNaN(_newPrice_input)){
					utils.warningTip("新车价格必须为数字类型！");
					return false;
			 }else if(_newPrice_input<0){
					utils.warningTip("新车价格必须为正数！");
					return false;
			 }
			param["newCarPrice"]=_newPrice_input;
			
			var _approve_input=$("#approve_input").val(); //相关认证
			if(_approve_input && _approve_input.length>250){
				utils.warningTip("相关认证输入过长 ,请少于250个字符！");
				return false;
			}
			param["relevantauth"]=_approve_input;
			
			var _assure_input=$("#assure_input").val(); //相关质保
			if(_assure_input && _assure_input.length>250){
				utils.warningTip("相关质保输入过长 ,请少于250个字符！");
				return false;
			}
			param["relevantwar"]=_assure_input;
			
			var _select_clxz=$("#select_clxz").val(); //车辆性质
			if($.trim(_select_clxz)==""){
				utils.warningTip("请选择车辆性质！");
				return false;
			}
			param["carnature"]=_select_clxz;
			
			var _carStatus=$("#carStatus").val(); //车辆状况
			if(_carStatus && _carStatus.length>50){
				utils.warningTip("车辆状况输入过长 ,请少于50个字符！");
				return false;
			}
			param["carStatus"]=_carStatus;
			
			var _isbyjl=$("input[name='isbyjl']:checked").val(); //是否有保养记录
			param["ismainrecord"]=_isbyjl;
			
			var _repairDate=$("#repairDate").val(); //保养到期
			if(_repairDate!="" ||oldCarEdit.dotype==1){
				param["mainexpire"]=_repairDate;	
			}
			
			
			var _annDate=$("#annDate").val();  //年检到期
			if(_annDate!="" ||oldCarEdit.dotype==1){
				param["insexpire"]=_annDate;
			}
			
			var _num_input=$("#num_input").val(); //流通次数
			 var reg1 =/^\d+$/;
			 if(_num_input!=""){
				 if(isNaN(_num_input)){
						utils.warningTip("流通次数必须为数字类型！");
						return false;
					}else  if(_num_input.match(reg1) == null){
						utils.warningTip("流通次数必须为正整数！");
						return false;
					} 
			 }
			
			param["circulnum"]=_num_input;
			
			var _car_photo_url=$("#car_photo_url").val(); //车辆照片
			var imgurlStr="";
			var imgurl="";
			for(var i=1;i<=4;i++){
				imgurl=$("#img_"+i+"_input").val();
				if(imgurl!=""){
					imgurlStr+=$("#img_"+i+"_input").val()+",";
				}
			}
			
			if($.trim(imgurlStr)==""){
				utils.warningTip("请上传车辆照片！");
				return false;
			}
			
			param["carPhoto"]=imgurlStr;
			
			var _areaczzs=$("#areaczzs").val();  //车主自述
			param["carreadme"]=_areaczzs;
			
			var _carEdit_select=$("#carEdit_select").val(); //车辆品牌
			param["brand"]=_carEdit_select;
			
			var _provinceEdit_select=$("#provinceEdit_select").val();  //车牌所在省份
			param["province"]=_provinceEdit_select;
			
			
			  oldCarEdit.getrzJson(function(data){
				 param["FinancingPackage"]= $.toJSON(data);
				 cb(param);
			 });
		},
		
		
	    loadImage : function(f){
	        if($.browser.msie){
	            if($.browser.version==6){
	            	 $("#file_carPhoto").val(f.value);
	            }else if($.browser.version==7 || $.browser.version==8){
	              //  $('#imgPreview').css("display","inline-block");
	                $('#file_carPhoto').val(f.value);
	            }
	        }else if($.browser.webkit || $.browser.mozilla){
	            var file = f.files[0];
//	            if(file.size > 5*1024*1024){
//	                utils.warningTip("图片大小不能超过5M");
//	                return;
//	            }
	            var reader = new FileReader();  
	            reader.onload = function(e){
	               // $('#file_carPhoto').attr('src',e.target.result);
	            };
	            reader.readAsDataURL(file);  
	        } 
	        var imgstr= $("#file_carPhoto").val();
	    	url = $.trim(imgstr.substr(imgstr.lastIndexOf(".")+1)).toLocaleLowerCase();
			if(url=="jpg" || url=="png" || url=="jpeg" || url=="jpeg" || url=="jpeg"){
		        utils.uploadFile("upload_photo_form","w_ershouche",function(data){
		        	if(oldCarEdit.imgNum<=4){
		        		oldCarEdit.imgNum=oldCarEdit.imgNum+1;	
		        	}
		        	$("#img_"+oldCarEdit.imgNum).attr("src",data.url);
		            $("#img_"+oldCarEdit.imgNum+"_input").val(data.url);
		        },function(){},sys.fileService);
			}else{
				utils.warningTip("请上传 【.jpg  .png  .jpeg】格式图片！");
				return false;
			}

	    },
	    
	    getrzJson : function(cb){
	    	var _rzJson=[];
	    	var _trStr="";
	    	$("#rz_tbody").each(function(){
	    		var _valArr=null;
	    		$(this).find("tr").each(function(){
	    				_trStr="";
	    				var _trjson={};
			    	    $(this).find("input").each(function(){
			    	    	_trStr+=this.value+",";
//			    	    	if(this.value==""){
//			    	    		alert("请填写完整的融资套餐信息！");
//			    	    		cb(false);
//			    	    	}
			    	    });
			    	    _valArr=_trStr.split(',');
			    	 
			    	    if(_valArr[0]!="" || _valArr[1]!=""|| _valArr[2]!=""|| _valArr[3]!=""|| _valArr[4]!=""){
				    	    _trjson["name"]=_valArr[0];
				    	    _trjson["prop"]=_valArr[1];
				    	    _trjson["money"]=_valArr[2];
				    	    _trjson["time"]=_valArr[3];
				    	    _trjson["mmoney"]=_valArr[4];
				    	    _rzJson.push(_trjson);
			    	    }
	    	    
	    		  });
	    	   
	    	});
	    	cb(_rzJson);
	    }
};