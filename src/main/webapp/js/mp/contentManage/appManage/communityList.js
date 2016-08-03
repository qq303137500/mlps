/**
 * 社区主题列表
 */
var communityList={
		
		pageIdx : 0,
		pageSize : 5,
		
	  initPage : function(){
		communityList.initBtn();
		communityList.initLoad();
	  },
	  
	  initBtn : function(){
			$("#t_body").click(function(e) {
				if (e.target.nodeName == 'A') {
					if ($(e.target).text() == "查看") {
						$(".main").load(sys.contextPath+"/mp/contentManage/appManage/communityDet.html",function(){
							communityDet.initPage($(e.target).parent().attr("ocId"));
						});
					}
					if ($(e.target).text() == "置顶") {
						art.dialog({
						    content: '<p>确定要置顶这条记录吗？</p>',
						    fixed: true,
						    id: 'Fm7',
						    icon: 'question',
						    okVal: '确定',
						    cancelVal : '取消',
						    ok: function () {
							manage.toTopCommunity({'id':$(e.target).parent().attr("ocId")}, function(data){
									if(data && data.retCode == 0){
										utils.succeedTip('置顶成功');
										communityList.loadCommunList(communityList.pageIdx-1);
									}
								}, null);
								true;
							},
						    cancel: true
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
							manage.delCommunity({'id':$(e.target).parent().attr("ocId")}, function(data){
									if(data && data.retCode == 0){
										utils.succeedTip('删除成功');
										communityList.loadCommunList(communityList.pageIdx-1);
									}
								}, null);
								true;
							},
						    cancel: true
						});
					}
				}
			});
			
			$("#query_a").click(function(){
				  communityList.loadCommunList(0);
			});
	  },
	  
	  initLoad : function(){
		  communityList.loadCommunList(0);
	  },
	  
	  loadCommunList : function(pageIndex){
		  communityList.pageIdx = parseInt(pageIndex + 1);
		  var param={};
		  param['pageSize'] = communityList.pageSize;
		  param['curPage'] = communityList.pageIdx;		
		  var _title=$("#title_input").val();
		  if(_title && _title!=""){
			  param['title'] = _title;  
		  }
		  
		  var _type=$("#type_sel").val();
		  if(_type && _type!=""){
			  param['type'] = _type;
		  }
		  manage.getCommunityList(param,function(data){
			  if(data.retCode==0){
				  var _data=data.data;
				  var _html='';
				  if(_data.length>0){
				  for(var i=0;i<_data.length;i++){
					  _html+='<tr>'
							+'<td>'+_data[i].type+'</td>'
							+'<td>'+_data[i].title+'</td>'
							+'<td>'+(_data[i].username||"暂无")+'</td>'
							+'<td>'+_data[i].createTime+'</td>'
							+'<td>'+(_data[i].topicCount||0)+'</td>'
							+'<td>'+(_data[i].hitCount||0)+'</td>'
							+'<td ocId="'+_data[i].id+'"><a>查看</a><a>删除</a><a>置顶</a></td></tr>';
				  }
				  }else{
						_html='<tr><td colspan="7">暂无数据</td></tr>';
				  }
				  
					$("#t_body").html(_html);
					$("#counCar").html(data.page.counts);
					if(data.page){
						utils.paginationPage($('#CommunListPage'), data.page.totalPage, parseInt(data.page.curPage-1), communityList.loadCommunList,true);
					}
				  
			  }
		  },null);
	  }
};