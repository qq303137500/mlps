var ershouche={
		
	pageIdx : 0,
	pageSize : 10,
	queCityId : "",
	queCarTypeId : "",
		
	initPage : function(){
		ershouche.initBtn();
		ershouche.initLoad();
		ershouche.initStyle();
	},
	
	initStyle : function(){
		$("#price_ul").click(
				function(e) {
					if (e.target.nodeName == 'A') {
						$(e.target).parents('li').addClass("selected").siblings()
								.removeClass('selected');
						ershouche.loadCarInfoList(0);
					}
				});
		$("#mileage_ul").click(
				function(e) {
					if (e.target.nodeName == 'A') {
						$(e.target).parents('li').addClass("selected").siblings()
								.removeClass('selected');
						ershouche.loadCarInfoList(0);
					}
				});
		$("#age_ul").click(
				function(e) {
					if (e.target.nodeName == 'A') {
						$(e.target).parents('li').addClass("selected").siblings()
								.removeClass('selected');
						ershouche.loadCarInfoList(0);
					}
				});
	},
	
	
	initBtn : function(){
		$("#carlist_ul").click(function(e){
			if (e.target.nodeName == 'IMG') {
				 window.location.href=sys.contextPath+"/mp/contentManage/sitesManage/ershoucheDetail.html?id="+$(e.target).parents('li').attr("val");
			}
			
		});
		
		
		$("#city_all_li").click(function(){
			$("#city_hide_li").show();
			$("#city_all_li").hide();
			$("#citypy_div").show();
			$("#citypyStr_div").show();
			ershouche.initCityListBypy('A');
		});
		
		$("#city_hide_li").click(function(){
			$("#city_hide_li").hide();
			$("#city_all_li").show();
			$("#citypy_div").hide();
			$("#citypyStr_div").hide();
		});
		
		$("#car_hide_li").click(function(){
			$("#car_hide_li").hide();
			$("#car_all_li").show();
			$("#carpy_div").hide();
			$("#carpyStr_div").hide();
		});
		
		$("#car_all_li").click(function(){
			$("#car_hide_li").show();
			$("#car_all_li").hide();
			$("#carpy_div").show();
			$("#carpyStr_div").show();
			ershouche.initCarListBypy('A');
		});
		
		$("#citypy_div").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				ershouche.initCityListBypy($('#citypy_div').find('.selected').find('a').text());	
			}
		});
		
		$("#carpy_div").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				ershouche.initCarListBypy($('#carpy_div').find('.selected').find('a').text());
			}
			
		});
		
		$("#carpyStr_div").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				$(".brand").find('li').removeClass('selected');
				ershouche.initCarTypeList($('#carpyStr_div').find('.selected').find('a').attr("val"));
			}
		});
		
		$("#citypyStr_div").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				$(".city-hot").find('li').removeClass('selected');
				ershouche.loadCarInfoList(0);
			}
		});
		
		
		$("#carpyStr_div").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				
				$("#cartype_div").find('li').eq(0).addClass("selected").siblings()
				.removeClass('selected');
				ershouche.loadCarInfoList(0);
			}
		});
		
		$("#cartype_div").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				ershouche.loadCarInfoList(0);
			}
		});
		
		$(".city-hot").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				$("#citypyStr_div").find('li').removeClass('selected');
				
				if($(e.target).text()!="全部城市" && $(e.target).text()!="收起"){
					$("#city_hide_li").hide();
					$("#city_all_li").show();
					$("#citypy_div").hide();
					$("#citypyStr_div").hide();
				}
				
				
				ershouche.loadCarInfoList(0);
			}
		});
		
		$(".brand").click(function(e){
			if(e.target.nodeName == 'A'){
				$(e.target).parents('li').addClass("selected").siblings()
				.removeClass('selected');
				$("#carpy_div").find('li').removeClass('selected');
				$("#carpyStr_div").find('li').removeClass('selected');
				
				ershouche.initCarTypeList($('.brand').find('.selected').find('a').attr("val"));
				
				if($(e.target).text()!="全部品牌"){
					$("#car_hide_li").hide();
					$("#car_all_li").show();
					$("#carpy_div").hide();
					$("#carpyStr_div").hide();
				}
				
				
				ershouche.loadCarInfoList(0);
			}
		});
		
		
 
	},
	
	initLoad : function(){
		ershouche.loadCarInfoList(0);
	},
	
	
	/**
	 * 根据城市拼音获取列表
	 */
	initCityListBypy : function(py){
		var param={};
		param["citypy"]=py;
		ershouchemanage.getCityListBypy(param,function(data){
			if(data.retCode==0){
				var _data=data.data;
				var _html="";
				for(var i=0;i<_data.length;i++){
					_html+='<li><a href="javascript:;" val="'+_data[i].cityId+'">'+_data[i].cityName+'</a></li>';
				}
				$("#citypyStr_div").find('ul').html(_html);
			}
			
		},null);
	},
	
	
	/**
	 * 根据品牌拼音获取列表
	 */
	initCarListBypy : function(py){
		var param={};
		param["carpy"]=py;
		ershouchemanage.getCarListBypy(param,function(data){
			if(data.retCode==0){
				var _data=data.data;
				var _html="";
				for(var i=0;i<_data.length;i++){
					_html+='<li><a href="javascript:;" val="'+_data[i].brandpy+'">'+_data[i].brand+'</a></li>';
				}
				$("#carpyStr_div").find('ul').html(_html);
			}
			
		},null);
	},
	
	
	/**
	 * 根据品牌获取车系列表
	 */
	initCarTypeList : function(bn){
		if(bn && bn!=""){
			var param={};
			param["carbn"]=bn;
			ershouchemanage.getCarListBybn(param,function(data){
				if(data.retCode==0){
					var _data=data.data;
					var _html='<li class="selected"><a>不限</a></li>';
					for(var i=0;i<_data.length;i++){
						_html+='<li><a href="javascript:;" val="'+_data[i].hierarchy+'">'+_data[i].carType+'</a></li>';
					}
					$("#cartype_div").find('ul').html(_html);
				}
				
			},null);
		}

	},
	
	
	loadCarInfoList : function(pageIndex){
		ershouche.getParam(function(param){
			ershouche.pageIdx = parseInt(pageIndex + 1);
			param['pageSize'] = ershouche.pageSize;
			param['curPage'] = ershouche.pageIdx;		
			ershouchemanage.getOldCarListwz(param,function(data){
				if(data.retCode==0){
					var _data=data.data;
					var _counts=data.page.counts;
					$("#carnum_span").html(_counts);
					var _html="";
					var _carphoto="";
					var _carphotoarr="";
					for(var i=0;i<_data.length;i++){
						_carphoto=_data[i].carPhoto;
						if(_carphoto!=""){
							_carphotoarr=_carphoto.split(',');
						}
						_html+='<li val="'+_data[i].id+'">'
					               + '<a href="javascript:;"><img   src="'+(_carphotoarr[0]||"")+'" ></a>'
					               + '<h3>'+_data[i].brand+" "+_data[i].carTypeName+'</h3>'
					               + '<div class="price">¥<span>'+_data[i].salePrice+'</span>万<i>'+_data[i].driveMileage+'公里</i></div>'
					               + '<p class="car-time">上牌时间：<span>'+_data[i].firstCardTime+'</span></p>'
					               + '<p class="car-add">所在地：<span>'+_data[i].carRnumCityName+'</span></p>'
					               + '<p class="car-sale">经销商：<span>'+(_data[i].merchantName!=""?_data[i].merchantName:"暂无")+'</span></p>'
					              +'</li>';
					}
					$("#carlist_ul").html(_html);
					if(data.page){
						utils.paginationPage($('#ershouchePage'), data.page.totalPage, parseInt(data.page.curPage-1), ershouche.loadCarInfoList,true);
					}
					
				}
				
			},null);
		});

		
	},
	
	getParam : function(cb){
		var params={};
		var _cityhot=$(".city-hot").find('.selected').find('a').attr("val");
		if(!_cityhot || _cityhot==""){
			_cityhot=$("#citypyStr_div").find('.selected').find('a').attr("val");
		}
		
		if(_cityhot && _cityhot!=""){
			if(_cityhot==10 ||_cityhot==11 ||_cityhot==12 ||_cityhot==13){
				params['provinceId']=$(".city-hot").find('.selected').find('a').attr("val");
			}else{
				params['carnumCity']=_cityhot;
			}
			
		}
		
		var _brand=$(".brand").find('.selected').find('a').attr("val");
		if(!_brand ||_brand==""){
			_brand=$("#carpyStr_div").find('.selected').find('a').attr("val");
		}
		if(_brand && _brand!=""){
			params['brandpy']=_brand;	
		}
		
		
		var _cartype=$("#cartype_div").find('.selected').find('a').attr("val");
		if(_cartype && _cartype!=""){
			params['carTypeName']=_cartype;
		}
		
		/*-价格-*/
		var SEprice = $('#price_ul').find('.selected').find('a').attr('SEprice').split('|');
		params['sPrice'] = SEprice[0];
		params['ePrice'] = SEprice[1];
		/*-里程-*/
		var SEmileage = $('#mileage_ul').find('.selected').find('a').attr('SEmileage').split('|');
		params['sMileage'] = SEmileage[0];
		params['eMileage'] = SEmileage[1];
		/*-车龄-*/
		var SEage = $('#age_ul').find('.selected').find('a').attr('SEage').split('|');
		params['sAge'] = SEage[0];
		params['eAge'] = SEage[1];
		
		cb(params);
		
	}
};