/**
 * 添加多图文
 */
var addNews = {

		id : null,
		name:null,
		msgType:null,
		event:null,
		replyContent:null,
		xheditor: null,
		newsList:[],
		obj:null,
		initPage : function(obj) {
			addNews.obj=obj;
			addNews.initStyle(obj);
			addNews.initOperator();
			addNews.initLoad();
		},

		initStyle : function(obj) {
			if(obj==2)
			{
				$("#contentLi").show();
				$("#promptSpan").html("原文链接<p>(选填)</p>");
			}
			addNews.xheditor = $('#area-czzs').xheditor( {
//				tools : 'Cut,Copy,Paste,Pastetext,|,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,|,Align,List,Outdent,Indent,|,Link,Img,Flash,Media,Hr,Table,|,Source,Fullscreen,Preview',
				tools : 'full',
				urlType:'abs',
				urlBase:'/osp/upload/resize/',
				skin : 'nostyle',
				width : '430px',
				height : '250',
//				readonly : true,
//				readonly:false,
				upMultiple : true,
				upImgUrl : sys.contextPath+'/commonHttp/fileUpload?fid=c_clbImage',
				upImgExt : 'jpg,gif,png',
				html5Upload : false,
				onUpload : function(data) {
//				  appAdvertisingAdd.images[data[0].url] = {width:data[0].reWidth+"px", height:data[0].reHeight+"px"};
				}
			});
		},

		initOperator : function() {
			
			
            $('#addToList').click(function(){
            	addNews.addToList();
		    });
			
		    $('#saveNewsList').click(function(){
		    	addNews.addNewsList();
		    });
		    
		    $('#cancelBT').click(function(){
		    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/newsList.html");
		    });
		    
		    // 上传缩略图
			$('#bizLicenseFile').change(function(){
				if($(this).val()=='')return;
				if(addNews.photoValidate($(this).val())){
					utils.uploadFile("upload_photo_form","w_pxzl_file",function(dataObj){
						if(!dataObj.url){
							utils.errorTip("上传失败！");
							return;
						}
						$("#imgInfo").attr("src",dataObj.url);
					},function(){},"http://fileservice.365car.com.cn:88/fileService/");
				}
			});
		},
		initLoad : function() {
			
		},
		/**
		 * 添加图文消息
		 */
		addNewsList : function(){
			
			
			if(addNews.newsList.length == 0){
				utils.errorTip("请添加图文消息后再做保存操作!");
				return;
			}
			if(addNews.newsList.length > 10){
				utils.errorTip("图文消息长度不能大于10!");
				return;
			}
			var params = {};
			
			
			params['name'] = addNews.name;
			params['msgType'] = addNews.msgType;
			params['state'] = 1;
			params['event']=addNews.event;
			
	    	params['replyContent'] = addNews.replyContent;
	    	params['newsList']=addNews.newsList
	    	
	    	
	    	
	    	manage.addNewsList(JSON.stringify(params),
	    		function(data){   		  
	    			if(data && data.retCode == 0){
	    				utils.succeedTip('操作成功');    				
	    			}
	    			else if(data && data.retCode == 9050){
	    				utils.succeedTip('记录已存在');    				
	    			}
	    			else
	    			{
	    				utils.errorTip("系统繁忙,请稍候再试!");
	    			}
	    			
	    			
	    			$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/keyWordList.html");
	    		},
				function(){
	    			utils.errorTip("系统繁忙,请稍候再试!");
				}
			);
	    },
		addToList: function(){
			if(!addNews.validateInput()){
				return;
			}
			if(addNews.newsList.length>10)
			{
				utils.errorTip("图文消息不能超过10个!");
				return;
			}
			
			var _replyTitle = utils.getBytesLength($.trim($('#replyTitle').val()));
			var _description = utils.getBytesLength($.trim($('#description').val()));
			if(_replyTitle == 0){
	    		utils.warningTip('标题不能为空!');
	    		return false;
	    	}else{
	    		if(_replyTitle > 64){
	        		utils.warningTip('标题不能超过64字符');
	        		return false;
	        	}
	    	}
			
			if(_description == 0){
	    		utils.warningTip('摘要不能为空!');
	    		return false;
	    	}else{
	    		if(_description > 120){
	        		utils.warningTip('摘要不能超过120字符');
	        		return false;
	        	}
	    	}
			
			if($('#imgInfo').attr("src")==sys.contextPath+"/images/default_img.png")
			{
				utils.warningTip("图片上传中，请稍候......");
				return;				
			}
			var detail = {};
			
			if(addNews.obj==2)
			{
				
				if(!$("#area-czzs").val())
				{
					utils.errorTip("正文不能为空!");
					return;
				}
				
				detail.originalUrl=$("#newsUrl").val();
			}
			else
			{
			
				detail.url=$("#newsUrl").val();
			}
			
			addNews.name=$.trim($('#nameId').val());
			addNews.msgType="text";
			addNews.event="click";
			addNews.replyContent=$.trim($('#replyContentId').val());
			detail.msgType="news";
			detail.description=$("#description").val();
			detail.content=$("#area-czzs").val();
			detail.title=$("#replyTitle").val();
			//detail.articles="1";
			detail.picUrl=$('#imgInfo').attr("src");			
			addNews.newsList.push(detail);
			
			
			if(addNews.newsList.length == 1)
			{
				$(".pic_preview h4").text(addNews.newsList[0].title);
				$(".pic_preview img").attr("src",addNews.newsList[0].picUrl);
			}
			else
			{
				$(".appendHtml").remove();
			 var temp =	'<div class="appendHtml" >';
			
				for(var key in addNews.newsList)
				{
					if(key !=0)
					{
						var news = addNews.newsList[key];
						temp = temp+'<div class="add_pre">';						
						temp = temp+'<img class="litimg" style="display:block;" alt="" src="'+news.picUrl+'"></img>';
						temp = temp+'<h4 class="pic_title">'+news.title+'</h4>'
						temp = temp+'</div>';
					}
				}
				temp = temp+'<div>';
				
				$(temp).appendTo($(".pic_preview"));
			}
				
	    	
	    	
	    },
		
		
	    
	    /**
	     * 验证输入
	     */
	    validateInput : function(){
	    	var _nameId = utils.getBytesLength($.trim($('#nameId').val()));
	    	var _replyContentId = utils.getBytesLength($.trim($('#replyContentId').val()));
	    	var reg = new RegExp("^[a-za-z0-9]+$");
	    	if(_replyContentId == 0){
	    		utils.warningTip('请输入命令字');
	    		return false;
	    	}else{
	    		if(_replyContentId > 40){
	        		utils.warningTip('命令字不能超过40字符');
	        		return false;
	        	}
	    		if(!reg.test($.trim($('#replyContentId').val())))
	    		{
	    			utils.warningTip('输入命令字只能为英文和数字的组合');
	        		return false;
	    		}
	    	}
	    	if(_nameId == 0){
	    		utils.warningTip('请输入关键字名称');
	    		return false;
	    	}else{
	    		if(_nameId > 40){
	        		utils.warningTip('关键字名称不能超过40字符');
	        		return false;
	        	}
	    	}
	    	return true;
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