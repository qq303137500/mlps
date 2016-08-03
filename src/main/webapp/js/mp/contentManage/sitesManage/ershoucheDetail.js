var ershoucheDetail={
	//（1::营运 2: 非营运 3:营转非 4:租赁）
    carxz : {"1":"营运","2":"非营运","3":"营转非","4":"租赁"},
    _brand:"",
    _carType:"",
    _pro : "",
    _city: "",
		
	initPage : function(id){
		ershoucheDetail.initBtn();
		ershoucheDetail.initLoad(id);
	},
	
	initBtn : function(){
		    var show = $(".show");
		    show.attr("src",$(".show-list li:first-child img").attr("src"));
		    $(".show-list li").click(function(){
		      var u = $(this).find("img").attr("src");
		      show.attr("src",u);
		      $(this).addClass('current').siblings('li').removeClass('current');
		    });
		    
		    
		    $("#submit_input").click(function(){
		    	ershoucheDetail.addOnlineApp();
		    });
	},
	
	initLoad : function(id){
		ershoucheDetail.loadUsedCarInfo(id);
	},
	
	addOnlineApp : function(){
		var  _online_name=$("#online_name").val();
		if(_online_name==""){
			alert("请输入姓名");
			return false;
		}
		var  _online_phone=$("#online_phone").val();
		if(_online_phone==""){
			alert("请输入手机号");
			return false;
		}
		var phoneReg= /^\d+$/;
		if(!phoneReg.test(_online_phone)){
			alert("手机号格式不正确！");
			return false;
		}
		var  _online_email=$("#online_email").val();
		if(_online_email==""){
			alert("请输入邮箱");
			return false;
		}
		
		var emailReg=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(!emailReg.test(_online_email)){
			alert("请填写正确的邮箱地址");
			return false;
		}
		var  _online_QQ=$("#online_QQ").val();
		if(_online_QQ==""){
			alert("请输入QQ");
			return false;
		}
		var  _online_tc=$("#online_tc").val();
		if(_online_tc==""){
			alert("请输入意向套餐名称");
			return false;
		}
		var param={};
		param["contactName"]=_online_name;
		param["phone"]=_online_phone;
		param["email"]=_online_email;
		param["QQ"]=_online_QQ;
		param["financingName"]=_online_tc;
		param["brand"]=ershoucheDetail._brand;
		param["carType"]=ershoucheDetail._carType;
		param["province"]=ershoucheDetail._pro;
		param["cityName"]=ershoucheDetail._city;
		param["buyType"]=1;
		ershouchemanage.savePersonalApply(param,function(data){
			if(data.retCode==0){
				alert("成功提交申请！");
			}else{
				alert("提交申请失败！");
			}
			
		},null);
		
		
		
	},
	
	loadUsedCarInfo : function(id){
		var param={};
		param["id"]=id;
		ershouchemanage.getOldCarInfowz(param,function(data){
			var _data=data.data;
			var _carphotoarr="";
			var	_carphoto=_data.carPhoto;
				if(_carphoto!=""){
					_carphotoarr=_carphoto.split(',');
				}
			 if(_carphotoarr[0] && _carphotoarr[0]!=""){
				 $("#bigimg_img").attr("src",_carphotoarr[0]);
			 }else{
				 $("#bigimg_img").attr("src",_carphotoarr[0]);
			 }
			
			if(_carphotoarr[0] && _carphotoarr[0]!=""){
				$("#img_ul_show").find('img').eq(0).attr("src",_carphotoarr[0]);
			}else{
				$("#img_ul_show").find('img').eq(0).attr("src",_carphotoarr[0]);
			}
			
			if(_carphotoarr[1] && _carphotoarr[1]!=""){
				$("#img_ul_show").find('img').eq(1).attr("src",_carphotoarr[1]);	
			}else{
				$("#img_ul_show").find('img').eq(1).hide();	
			}
			
			if(_carphotoarr[2] && _carphotoarr[2]!=""){
				$("#img_ul_show").find('img').eq(2).attr("src",_carphotoarr[2]);
			}else{
				$("#img_ul_show").find('img').eq(2).hide();
			}
			
			if(_carphotoarr[3] && _carphotoarr[3]!=""){
				$("#img_ul_show").find('img').eq(3).attr("src",_carphotoarr[3]);
			}else{
				$("#img_ul_show").find('img').eq(3).hide();
			}
			
			
			var _forcTime=_data.createTime.split('.')[0];
			var _html='<h5>'+_data.factoryNO+" "+_data.carTypeName+'</h5>'
			          +'<h6>参考价格：¥ <span style="font-size:36px;color:red;">'+_data.salePrice+'</span> 万</h6>'
			          +'<h6>行驶里程：<span>'+_data.driveMileage+'公里</span></h6>'
			          +'<h6>上牌时间：<span>'+_data.firstCardTime+'</span></h6>'
			          +'<h6>发布人：<span>'+_data.createUserName+'</span></h6>'
			          +'<h6>发布时间：<span>'+_forcTime+'</span></h6>';
			 $("#top_div").html(_html);
			var _html1=' <li>上牌时间：<span>'+_data.firstCardTime+'</span></li>'
		          +'<li>行驶里程：<span>'+_data.driveMileage+'公里</span></li>'
		          +'<li>所在地：<span>'+_data.cityname+'</span></li>'
		          +'<li>发动机：<span>'+_data.engine+'</span></li>'
		          +'<li>变速箱：<span>'+_data.gearBox+'</span></li>'
		          +'<li>颜色：<span>'+_data.carColor+'</span></li>'
		          +'<li>车辆品牌：<span>'+_data.brand+'</span></li>'
		          +'<li>车辆型号：<span>'+_data.carTypeName+'</span></li>'
		          +'<li>车辆级别：<span>'+_data.carLevel+'</span></li>';
			 $("#first_ul").html(_html1);
			
			 
			 ershoucheDetail._brand =_data.brand;
			 ershoucheDetail._carType=_data.carTypeName;
			 ershoucheDetail._pro=_data.province;
			 ershoucheDetail._city=_data.cityname;
		 
			 
		
			var _html2='<li>相关认证：'+_data.relevantauth+'</li>'
		              +'<li>相关质保：'+_data.relevantwar+'</li>';
			$("#sec_ul").html(_html2);
			var _carnature="";
			if(_data.carnature==1){
				_carnature="营运";
			}else if(_data.carnature==2){
				_carnature="非营运";
			}else if(_data.carnature==3){
				_carnature="营转非";
			}else if(_data.carnature==4){
				_carnature="租赁";
			}
			var _html3=' <li>车辆性质：<span>'+_carnature+'</span></li>' 
				          +'<li>车辆状况：<span>'+_data.carStatus+'</span></li>'
				          +'<li>流通次数：<span>'+_data.circulnum+'</span></li>'
				          +'<li>是否有保养记录：<span>'+(_data.ismainrecord==1?"是":"否")+'</span></li>'
				          +'<li>年检到期：<span>'+_data.insexpire+'</span></li>'
				          +'<li>保养到期：<span>'+_data.mainexpire+'</span></li>';
			
			$("#thr_ul").html(_html3);
			
			$("#four_div").html(_data.carreadme);
			
			
			if(_data.financingPackage!=""){
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
			}

			
			
		},null);
	}
};