var findIndexPhoto={
	
		
		initPage: function(id){
			findIndexPhoto.initBtn();
			findIndexPhoto.initload();
		},
		
		initBtn : function(){
			$('#cancelBT').click(function(){
		    	$(".main").load(sys.contextPath+"/mp/idnexManage/indexPhotoList.html");
		 });
		},
		
		
		initload : function(){
			if(mp_index.id){
				findIndexPhoto.queryDetailInfo(mp_index.id);
			}
		},
		
		
		queryDetailInfo : function(id){
			var params={};
			params["id"]=id;
			indexmanage.queIndexPhoto(params,function(data){
				if(data && data.retCode=="0"){
					var _data=data.data;
						$("#cpName").val(_data.title);
						$("#imgInfo").attr("src",_data.imageUrl);
						$("#httpUrl").val(_data.httpUrl);
				}
			},null);
		}
};