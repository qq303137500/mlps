var oldCarList = {
	pageIdx : 0,
	pageSize : 10,
	initPage : function() {
		oldCarList.initStyle();
		oldCarList.initOperator();
		oldCarList.initLoad();
	},

	initStyle : function() {
	},

	initOperator : function() {
		$("#price_ul").click(
				function(e) {
					if (e.target.nodeName == 'A') {
						$(e.target).parents('li').addClass("hover").siblings()
								.removeClass('hover');
					}
				});
		$("#mileage_ul").click(
				function(e) {
					if (e.target.nodeName == 'A') {
						$(e.target).parents('li').addClass("hover").siblings()
								.removeClass('hover');
					}
				});
		$("#age_ul").click(
				function(e) {
					if (e.target.nodeName == 'A') {
						$(e.target).parents('li').addClass("hover").siblings()
								.removeClass('hover');
					}
				});

		$("#car_select").change(function() {
			oldCarList.getCarList();
		});

		$("#province_select").change(function() {
			oldCarList.getCityList();
		});
		$("#t_body").click(function(e) {
			if (e.target.nodeName == 'A') {
				if ($(e.target).text() == "查看") {
					$("#add_div").hide();
					$("#edit_div")
					.load(
							sys.contextPath+"/mp/contentManage/sitesManage/oldCarDetail.html",
							function() {
								oldCarDetail.initPage($(e.target).parent().attr("ocId"));
								$("#back_a").click(function() {
									$("#add_div").show();
									$("#edit_div").hide();
								});
							}).show();
					
				}

				if ($(e.target).text() == "编辑") {
					//
					$("#add_div").hide();
					$("#edit_div")
							.load(
									sys.contextPath+"/mp/contentManage/sitesManage/oldCarEdit.html",
									function() {
										oldCarEdit.initPage($(e.target).parent().attr("ocId"));
										$("#back_a").click(function() {
											$("#add_div").show();
											$("#edit_div").hide();
										});
									}).show();
				}

				if ($(e.target).text() == "删除") {
					art.dialog({
					    content: '<p>是否删除该二手车数据</p>',
					    fixed: true,
					    id: 'Fm7',
					    icon: 'question',
					    okVal: '确定',
					    cancelVal : '取消',
					    ok: function () {
							sitesFunction.delOldCarById({'id':$(e.target).parent().attr("ocId")}, function(data){
								if(data && data.retCode == 0){
									utils.succeedTip('删除成功');
									oldCarList.loadusedCarList(oldCarList.pageIdx-1);
								}
							}, null);
							true;
						},
					    cancel: true
					});
				}
			}
		});
		$("#add_a")
				.click(
						function() {
							$("#add_div").hide();
							$("#edit_div")
									.load(
											sys.contextPath+"/mp/contentManage/sitesManage/oldCarEdit.html",
											function() {
												oldCarEdit.initPage();
												$("#back_a").click(function() {
													$("#add_div").show();
													$("#edit_div").hide();
												});
											}).show();
						});
		$("#add_f").click(function() {
			oldCarList.loadusedCarList(0);
		});
	},
	initLoad : function() {
		oldCarList.loadCarinfo();
		oldCarList.loadProInfo();
		oldCarList.loadusedCarList(0);
	},
	/**
	 * 加载列表
	 */
	loadusedCarList : function(pageIndex) {
		oldCarList.pageIdx = parseInt(pageIndex + 1);
		var params = {};
		if(jQuery.trim($('#province_select').val()))
			params['province']=$('#province_select').val();
		if($('#city_select').val())
			params['carRnumCityName']=$('#city_select').val();
		if(jQuery.trim($('#car_select').val()))
			params['brandpy']=$('#car_select').val();
		if($('#cartype_select').val())
			params['carTypeName']=$('#cartype_select').val();
		/*-价格-*/
		var SEprice = $('#price_ul').find('.hover').find('a').attr('SEprice').split('|');
		if(jQuery.trim($('#sprice').val())){
			SEprice[0]=$('#sprice').val();
		}
		if(jQuery.trim($('#dprice').val())){
			SEprice[1]=$('#dprice').val();
		}
		params['sPrice'] = SEprice[0];
		params['ePrice'] = SEprice[1];
		/*-里程-*/
		var SEmileage = $('#mileage_ul').find('.hover').find('a').attr('SEmileage').split('|');
		params['sMileage'] = SEmileage[0];
		params['eMileage'] = SEmileage[1];
		/*-车龄-*/
		var SEage = $('#age_ul').find('.hover').find('a').attr('SEage').split('|');
		params['sAge'] = SEage[0];
		params['eAge'] = SEage[1];
		
		params['pageSize'] = oldCarList.pageSize;
		params['curPage'] = oldCarList.pageIdx;
		sitesFunction.getOldCarList(params, oldCarList.loadList_CB, null);
	},

	loadList_CB : function(data) {
		if (data && data.retCode == 0) {
			var _html = '';
			var _counCar = 0;
			if (data.data.length > 0) {
				var list = data.data;
				for ( var i = 0; i < list.length; i++) {
					_html += '<tr '
							+ (i % 2 == 0 ? '' : 'class="bg"')
							+ '><td>'
							+ list[i].brand
							+ '</td><td>'
							+ list[i].carTypeName
							+ '</td>'
							+ '<td>'
							+ list[i].carRnumCityName
							+ '</td>'
							+ '<td>'
							+ list[i].carLevel
							+ '</td>'
							+ '<td>'
							+ list[i].driveMileage
							+ '</td>'
							+ '<td>'
							+ list[i].firstCardTime
							+ '</td>'
							+ '<td>'
							+ list[i].salePrice
							+ '</td>'
							+ '<td>'
							+ list[i].newCarPrice
							+ '</td><td>'+list[i].createUserName+'</td><td ocId="'+list[i].id+'"><a>查看</a><a>编辑</a><a>删除</a></td></tr>';
				}
				_counCar = data.page.counts;
			} else {
				_html += '<tr><td colspan="10" >暂无数据.</td></tr>';
			}
			if(data.page){
				utils.paginationPage($('#oldCarListPage'), data.page.totalPage, parseInt(data.page.curPage-1), oldCarList.loadusedCarList,true);
			}
			$('#counCar').html(_counCar);
			$('#t_body').html(_html);
		}
	},

	/**
	 * 获取省份列表
	 */
	loadProInfo : function() {
		sitesFunction.getProvinceList(null, function(data) {
			var _option = '<option value="">--省份--</option>';
			var _data = data.data;
			for ( var i = 0; i < _data.length; i++) {
				if (_data[i].province != "") {
					_option += '<option value="' + _data[i].province + '">'
							+ _data[i].province + '</option>';
				}
			}
			$("#province_select").html(_option);
		}, null);
	},

	loadCarinfo : function() {
		sitesFunction.getCarFacList(null, function(data) {
			var _option = '<option value="">--品牌--</option>';
			var _data = data.data;
			for ( var i = 0; i < _data.length; i++) {
				if($.trim(_data[i].brand)!=""){
					_option += '<option value="' + _data[i].brandpy + '">'
							+ _data[i].brand + '</option>';
				}
			}
			$("#car_select").html(_option);
		}, null);
	},

	getCarList : function() {
		var params = {};
		if($("#car_select").val()!=""){
			params["facName"] = $("#car_select").val();
			sitesFunction.getCarList(params, function(data) {
				var _option = '<option value=""></option>';
				var _data = data.data;
				for ( var i = 0; i < _data.length; i++) {
					_option += '<option value="' + _data[i].carType + '">'
							+ _data[i].carType + '</option>';
				}
				$("#cartype_select").html(_option);
			}, null);
		}else{
			$("#cartype_select").html('<option value="">--车系--</option>');
		}

	},

	/**
	 * 获取城市列表
	 */
	getCityList : function() {
		var params = {};
		params["provincename"] = $("#province_select").val();
		sitesFunction.getCityList(params, function(data) {
			var _option = '<option value=""></option>';
			var _data = data.data;
			for ( var i = 0; i < _data.length; i++) {
				_option += '<option value="' + _data[i].cityName + '">'
						+ _data[i].cityName + '</option>';
			}
			$("#city_select").html(_option);
		}, null);
	}
};