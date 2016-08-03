/**
 * 首页照片列表
 */
var indexPhotoList={
		
		// 每页显示条数
		perPageSize : 10,
		//当前页数
		currentPage : 0,	
	
	initPage : function(){
		indexPhotoList.initBtn();
		indexPhotoList.initLoad();
	},
	
	initBtn : function(){
		
		 $('#linkSave').click(function(){
		    	$(".main").load(sys.contextPath+"/mp/idnexManage/uploadIndexphoto.html");
		 });
		 
		 $("#indexBody").bind("click",function(e){
			 var _cell=$(e.target);
			 var _id=_cell.attr("id");
			 if(_id){
				 
				 if(_id.indexOf("look_")!=-1){
					 mp_index.id=_id.split("_")[1];
					 $(".main").load(sys.contextPath+"/mp/idnexManage/findIndexPhoto.html");
				 }else if(_id.indexOf("top_")!=-1){
	                	art.dialog({
						    content: '<p>是否置顶该条记录！</p>',
						    fixed: true,
						    id: 'Fm7',
						    icon: 'question',
						    okVal: '确定',
						    cancelVal : '取消',
						    ok: function () {
						    	indexPhotoList.indexPhotoToTop(_id.split("_")[1]);
							},
						    cancel: true
						});
				 }else if(_id.indexOf("del_")!=-1){
					 	art.dialog({
						    content: '<p>是否删除该条记录！</p>',
						    fixed: true,
						    id: 'Fm7',
						    icon: 'question',
						    okVal: '确定',
						    cancelVal : '取消',
						    ok: function () {
						    	indexPhotoList.delIndexPhoto(_id.split("_")[1]);
							},
						    cancel: true
						});
				 }
			 }
			 
		 });
	},
	
	initLoad : function(){
		indexPhotoList.queryIdnexPhotoList(0);
	},
	
	
	queryIdnexPhotoList :function(pageIndex){
		var param={};
		param['pageSize'] = indexPhotoList.perPageSize;
		param['curPage'] = parseInt(pageIndex+1);
		indexPhotoList.currentPage=parseInt(pageIndex+1);
		
		indexmanage.queryIdnexPhotoList(param,function(data){
			if(data && data.retCode=="0"){
				var _data=data.data;
				var container = $('#indexBody');
				var tmp = null;
				container.html('');
				if(_data.length>0){
					for(var i=0;i<_data.length;i++){
						var indexphoto=_data[i];
						tmp = $('<tr>'+
								'<td title="'+indexphoto.title+'" >'+ utils.interceptString(indexphoto.title) +'</td>'+
								'<td>'+ indexphoto.operatorName +'</td>'+
								'<td>'+ indexphoto.updateTime +'</td>'+ 
								'<td><a id="look_'+ indexphoto.id +'" href="javascript:;">查看内容</a><a id="del_'+ indexphoto.id +'" href="javascript:;">删除</a><a id="top_'+ indexphoto.id +'" href="javascript:;">置顶</a></td>'+
								'</tr>');
						tmp.appendTo(container);
					}
				}else{
					tmp = $('<tr><td colspan="4" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
					tmp.appendTo(container);
				}
				
				if(data.page){
					utils.paginationPage($('#indexBodyPage'), data.page.totalPage, parseInt(data.page.curPage-1), indexPhotoList.queryIdnexPhotoList,true);
				}
			}
		},null);
	},
	
	delIndexPhoto : function(id){
		var params={};
		params["id"]=id;
		indexmanage.delIndexPhoto(params,function(data){
			if(data && data.retCode=="0"){
				utils.succeedTip('操作成功');
				indexPhotoList.queryIdnexPhotoList(indexPhotoList.currentPage-1);
			}else{
				utils.errorTip("请求失败!");
			}
		},null);
		
	},
	
	indexPhotoToTop : function(id){
		var params={};
		params["id"]=id;
		indexmanage.indexPhotoToTop(params,function(data){
			if(data && data.retCode=="0"){
				utils.succeedTip('置顶成功');
				indexPhotoList.queryIdnexPhotoList(indexPhotoList.currentPage-1);
			}else{
				utils.errorTip("请求失败!");
			}
		},null);
		
	}
};