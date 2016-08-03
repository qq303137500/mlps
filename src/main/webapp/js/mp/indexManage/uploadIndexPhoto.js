var upindexPhoto={
	
    initPage : function(){
    	upindexPhoto.initBtn();
    	upindexPhoto.initLoad();
    },
    
    initBtn : function(){
		// 上传缩略图
		$('#indexPhoto').change(function(){
			if($(this).val()=='')return;
			if(upindexPhoto.photoValidate($(this).val())){
				utils.uploadFile("upload_photo_form","w_pxzl_file",function(dataObj){
					if(!dataObj.url){
						utils.errorTip("上传失败！");
						return;
					}
					$("#imgInfo").attr("src",dataObj.url);
				},function(){},"http://fileservice.365car.com.cn:88/fileService/");
			}
		});
		
		
		$("#saveBT").click(function(){
			upindexPhoto.addPhoto();
		});
 
    	
    },
    
    initLoad : function(){
    	
    	
    },
    
    
    addPhoto : function(){
    	var param={};
    	var _tit=$("#cpName").val();
    	var _imgurl=$("#imgInfo").attr("src");
    	var _httpUrl=$("#httpUrl").val();
    	param["title"]=_tit;
    	param["imageUrl"]=_imgurl;
    	param["httpUrl"]=_httpUrl;
    	indexmanage.addIndexPhoto(param,function(data){
    		if(data && data.retCode=="0"){
    			utils.succeedTip('添加成功');
    			$(".main").load(sys.contextPath+"/mp/idnexManage/indexPhotoList.html");
    		}
    	},null);
    },
    
    photoValidate : function(url){
		var sc = url;
		url = $.trim(url.substr(url.lastIndexOf(".")+1)).toLocaleLowerCase();
		if(url=="jpg" || url=="png" || url=="jpeg"){
			return true;
		}else{
			utils.errorTip("上传图片格式不对！请重新上传");
			return false;
		}
	}
};