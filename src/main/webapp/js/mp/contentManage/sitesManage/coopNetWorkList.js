var coopNetWorkList={
		
		pageIdx : 0,
		pageSize : 10,
		
		initPage : function(){
			coopNetWorkList.initLoad();
			coopNetWorkList.initBtn();
	
		},
		
		initLoad : function(){
			coopNetWorkList.getCoopNetWork(0);
			coopNetWorkList.loadProInfo();
		},
		
		initBtn : function(){
			$("#province_select").change(function(){
				
				coopNetWorkList.getCityList();
			});
			
			$("#t_body").click(function(e) {
				if (e.target.nodeName == 'A') {
					if ($(e.target).text() == "查看") {
						$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/coopNetWorkDetail.html",function(){
							coopNetWorkDetail.initPage($(e.target).parent().attr("ocId"));
						});
					}
					if ($(e.target).text() == "编辑") {
						$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/coopNetWorkEdit.html",function(){
							coopNetWorkEdit.initPage($(e.target).parent().attr("ocId"));
						});
					}

					if ($(e.target).text() == "删除") {
						art.dialog({
						    content: '<p>是否删除该合作商数据</p>',
						    fixed: true,
						    id: 'Fm7',
						    icon: 'question',
						    okVal: '确定',
						    cancelVal : '取消',
						    ok: function () {
								sitesFunction.delCoopNetWorkById({'id':$(e.target).parent().attr("ocId")}, function(data){
									if(data && data.retCode == 0){
										utils.succeedTip('删除成功');
										coopNetWorkList.getCoopNetWork(oldCarList.pageIdx-1);
									}
								}, null);
								true;
							},
						    cancel: true
						});
					}
				}
			});
			
			$("#add_a").click(function(){
				$(".main").load(sys.contextPath+"/mp/contentManage/sitesManage/coopNetWorkEdit.html",function(){
					coopNetWorkEdit.initPage();
				});
			});
			
			$("#add_f").click(function(){
				coopNetWorkList.getCoopNetWork(0);
			});
			
		},
		
		/**
		 * 获取列表
		 */
		getCoopNetWork : function(pageIndex){
			coopNetWorkList.pageIdx = parseInt(pageIndex + 1);
			var param={};
			param['pageSize'] = coopNetWorkList.pageSize;
			param['curPage'] = coopNetWorkList.pageIdx;		
			var _merchantName=$("#merchantName_input").val();
			param["companyName"]=$.trim(_merchantName); 
			
			var _cityId=$('#city_select').val();
			if(_cityId && _cityId!=""){
				param["cityId"]=_cityId;
			}
			
			var _province=$("#province_select").val();
			if(_province && _province!=""){
				param["province"]=_province;
			}
			
			
			sitesFunction.getCoopNetWorkList(param,function(data){
				if(data.retCode==0){
					var _data=data.data;
					var _html="";
					if(_data.length>0){
					for(var i=0;i<_data.length;i++){
						_html+='<tr>'
									+'<td>'+_data[i].companyName+'</td>'
									+'<td>'+_data[i].province+'</td>'
									+'<td>'+_data[i].cityname+'</td>'
									+'<td>'+(_data[i].companyPhone||"暂无")+'</td>'
									+'<td>'+_data[i].createUserName+'</td>'
									+'<td ocId="'+_data[i].id+'"><a>查看</a><a>编辑</a><a>删除</a></td></tr>';
							
					}
					}else{
						_html='<tr><td colspan="6">暂无数据</td></tr>';
					}
					$("#t_body").html(_html);
					$("#counCar").html(data.page.counts);
					if(data.page){
						utils.paginationPage($('#coopnwListPage'), data.page.totalPage, parseInt(data.page.curPage-1), coopNetWorkList.getCoopNetWork,true);
					}
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
				 $("#province_select").html(_option);
			},null);
		},
		
		
		/**
		 * 获取城市列表
		 */
		getCityList : function(cityid){
			var params={};
			params["provincename"]=$("#province_select").val();
			sitesFunction.getCityList(params, function(data){
				var _option='<option value="">--请选择--</option>';
				var _data=data.data;
				for(var i=0;i<_data.length;i++){
					if(cityid && cityid==_data[i].cityId){
						_option+='<option value="'+_data[i].cityId+'"  selected="selected" >'+_data[i].cityName+'</option>';
					}else{
						_option+='<option value="'+_data[i].cityId+'"  >'+_data[i].cityName+'</option>';
					}
					
				}
				 $("#city_select").html(_option);
			}, null);
			
			
			
		}
};