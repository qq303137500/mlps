/**
 * 编辑
 */
var upNews = {
	id : null,
	replyText:null,
	replyContent:null,
	upNewsList:[],
	name:null,
	msgType:null,
	event:null,
	replyContent:null,
	xheditor: null,
	newsList:[],
	msgTypeDetail:null,
	initPage : function() {
		upNews.initStyle();
		upNews.initOperator();
		upNews.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
	     //同步修改到左边
        $("a[name='editToList']").bind("click", function(e){
        	  
        	  upNews.editToList();
            
		});
        
        //新添加
        $('#addToList').click(function(){
			
			upNews.addToList();
	    });
        //不同修改到数据库
		$('#upNewsList').click(function(){
			
			upNews.upNews();
	    });
		
	    $('#cancelBT').click(function(){
	    	$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/keyWordList.html");
	    });
	    
	 // 上传缩略图
		$('#bizLicenseFile').change(function(){
			if($(this).val()=='')return;
			if(upNews.photoValidate($(this).val())){
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
		upNews.queryReplyById(mp_index.id);
	},
	
	/**
	 * 新添加的
	 */
	addToList:function()
	{
	
		if(!upNews.validateInput()){
			return;
		}
		
		if(upNews.upNewsList.length>10)
		{
			utils.errorTip("消息不能超过10个!");
			return;
		}
		upNews.name=$.trim($('#nameId').val());
		upNews.msgType="text";
		upNews.event="click";
		upNews.replyContent=$.trim($('#replyContentId').val());
		
		var id = upNews.upNewsList.length;
		var detail = {};
		detail.title=$("#replyTitle").val();
		detail.picUrl=$('#imgInfo').attr("src");
		
		detail.description=$("#description").val();
		
		if(upNews.msgTypeDetail=="newsTwo")
		{
			detail.content=$("#area-czzs").val();
			detail.originalUrl=$("#newsUrl").val();
			
		}
		else
		{
			detail.content="";
			detail.url=$("#newsUrl").val();
		}
		upNews.upNewsList.push(detail);
		
		//更新左边的显示
		upNews.updateShowNews();
	},
	/**
	 * 同步修改到左边
	 * @returns {Boolean}
	 */
	editToList : function()
	{
		
		if(!upNews.validateInput()){
			return;
		}
		
		var _id=$("a[name='editToList']").attr("id");
		var id = _id.split("_")[1];
		
		upNews.name=$.trim($('#nameId').val());
		upNews.msgType="text";
		upNews.event="click";
		upNews.replyContent=$.trim($('#replyContentId').val());
		
		
		upNews.upNewsList[id].title=$("#replyTitle").val();
		upNews.upNewsList[id].picUrl=$('#imgInfo').attr("src");
		
		upNews.upNewsList[id].description=$("#description").val();
		
		if(upNews.msgTypeDetail=="newsTwo")
		{
			upNews.upNewsList[id].content=$("#area-czzs").val();
			upNews.upNewsList[id].originalUrl=$("#newsUrl").val();
			
		}
		else
		{
			upNews.upNewsList[id].content="";
			upNews.upNewsList[id].url=$("#newsUrl").val();
		}
		
		
		//更新左边的显示
		upNews.updateShowNews();
		
		
	},
	
	/**
	 * 修改图文消息
	 */
	upNews : function(){
		
		if(!upNews.validateInput()){
			return;
		}
		
		if(upNews.upNewsList.length>10)
		{
			utils.errorTip("消息不能超过10个!");
			return;
		}
		
		for(var key in upNews.upNewsList)
		{
			var detail = {};
			detail.msgType="news";
			detail.description=upNews.upNewsList[key].description;
			detail.title=upNews.upNewsList[key].title;
			
			detail.picUrl=upNews.upNewsList[key].picUrl;
			detail.content=upNews.upNewsList[key].content;
			detail.url=upNews.upNewsList[key].url;
			detail.originalUrl=upNews.upNewsList[key].originalUrl;
			detail.detailId=upNews.upNewsList[key].detailId;
			upNews.newsList.push(detail);
		}
		
		var params = {};
		
		params['id']=mp_index.id;
		params['name'] = $.trim($('#nameId').val());		
		params['replyContent'] = $.trim($('#replyContentId').val());
		params['newsList']=upNews.newsList
		
		
		//修改前和修改后的关键字对比
    	if($.trim($('#replyContentId').val()) != upNews.replyContent)
    	{
    		params['isFlag'] = 1;
    	}
    	else
    	{
    		params['isFlag'] = 0;
    	}
		
		if(upNews.newsList.length == 0){
			utils.errorTip("请添加图文消息后再做保存操作!");
			return;
		}
		if(upNews.newsList.length > 10){
			utils.errorTip("图文消息长度不能大于10!");
			return;
		}
		
    	
    	manage.upNewsList(JSON.stringify(params),
    		function(data){   		  
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');    				
    			}
    			if(data && data.retCode == 9050){
    				utils.succeedTip('记录已存在');    				
    			}
    			
    			$(".main").load(sys.contextPath+"/mp/wxReplyManage/keywordManage/keyWordList.html");
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    
    //同步修改显示
    updateShowNews:function()
    {
        
		var wxReplyModel = upNews.upNewsList[0];
		var newList = upNews.upNewsList;
		
		
		$("#nameId").val(wxReplyModel.name);
		$("#replyContentId").val(wxReplyModel.replyContent);
		$("#replyTextId").val(wxReplyModel.replyText);
		upNews.replyContent = wxReplyModel.replyContent;
		
		//构造页面
		
		$(".pic_msg img").attr("src",wxReplyModel.picUrl);          
		$(".first_pre h4").text(wxReplyModel.title);
		$(".pic_msg img").attr("id","edit_"+0); 
		$(".appendHtml").remove();
		var temp =	'<div class="appendHtml" >';
		
		for(var key in newList)
		{
			if(key !=0)
			{
				var news = newList[key];
				temp = temp+'<div class="add_pre">';
				//alert(news.picUrl);
				temp = temp+'<img class="litimg" name="editNewsPic" style="display:block;" alt="" src="'+news.picUrl+'" id="edit_'+key+'"></img>';
				temp = temp+'<h4 class="pic_title">'+news.title+'</h4>'
				temp = temp+'<div style="margin-left: 68px;margin-right: 8px;text-align: center;"><a class="icon18_common del_gray js_del" href="javascript:void(0);" onclick="upNews.delNews('+key+')">删除</a></div>'
				temp = temp+'</div>';
			}
		}
		temp = temp+'<div>';
		
		$(temp).appendTo($(".pic_preview"));
		upNews.editNews();
    },
    queryReplyById : function(id){		
		var params = {}; 
		params['id'] = id;
    	manage.queryReplyById(params ,
    		function(data){
    		var wxReplyModel = data.data[0];
    		
    		//显示第一个的内容    		
    		upNews.showFirstNews(wxReplyModel);
    		
    		var newList = data.data;
    		upNews.upNewsList = data.data;
    		
    		$("#nameId").val(wxReplyModel.name);
    		$("#replyContentId").val(wxReplyModel.replyContent);
    		$("#replyTextId").val(wxReplyModel.replyText);
    		
    		if(!wxReplyModel.content)
    		{
    			$("input[name=msgTypeReply]:eq(0)").attr("checked",'checked');
    			//$("input[name=msgTypeReply]:eq(1)").attr("checked",'');
    			$("#radioSpan2").hide();
    		}
    		else
    		{
    			upNews.msgTypeDetail="newsTwo";
    			$("input[name=msgTypeReply]:eq(1)").attr("checked",'checked');
    			//$("input[name=msgTypeReply]:eq(0)").attr("checked",'');
    			$("#radioSpan1").hide();
    			upNews.initXheditor();
            	$("#contentLi").show();
            	$("#area-czzs").val(wxReplyModel.content);
            	$("#newsUrl").val(wxReplyModel.originalUrl);
    		}
    		upNews.replyContent = wxReplyModel.replyContent;
    		
    		//构造页面
    		
    		$(".pic_msg img").attr("src",wxReplyModel.picUrl);          
    		$(".first_pre h4").text(wxReplyModel.title);
    		$(".pic_msg img").attr("id","edit_"+0); 
    		//左边部分
    		var temp =	'<div class="appendHtml" >';
			for(var key in newList)
			{
				if(key !=0)
				{
					var news = newList[key];
					temp = temp+'<div class="add_pre">';
					//alert(news.picUrl);
					temp = temp+'<img class="litimg" name="editNewsPic" style="display:block;" alt="" src="'+news.picUrl+'" id="edit_'+key+'"></img>';
					temp = temp+'<h4 class="pic_title">'+news.title+'</h4>'
					temp = temp+'<div style="margin-left: 68px;margin-right: 8px;text-align: center;"><a class="icon18_common del_gray js_del" href="javascript:void(0);" onclick="upNews.delNews('+key+')">删除</a></div>'
					temp = temp+'</div>';
				}
			}
			temp = temp+'<div>';
			
			$(temp).appendTo($(".pic_preview"));
			upNews.editNews();
    		
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    /**
     * 删除一个图文
     * @param obj
     */
    delNews:function(obj)
    {
    	if(confirm("确定删除吗?"))
    	{   		
    		var list = upNews.upNewsList;
    		
    		var tempList=[];
    		for(var key in list)
    		{
    			if(key !=obj)
    			{
    				var detail = {};
    				
    				detail=list[key];   			
    				tempList.push(detail);
    			}
    		}
    		upNews.upNewsList=tempList;
    		
    		upNews.consList();
    	}
    },
    /**
     * 重新构建左边显示页面
     */
    consList:function()
    {
     $(".add_pre").remove();
		var wxReplyModel = upNews.upNewsList[0];
		var newList = upNews.upNewsList;
		
		
		$("#nameId").val(wxReplyModel.name);
		$("#replyContentId").val(wxReplyModel.replyContent);
		$("#replyTextId").val(wxReplyModel.replyText);
		
		
		
		if(!wxReplyModel.content)
		{
			$("input[name=msgTypeReply]:eq(0)").attr("checked",'checked');
			//$("input[name=msgTypeReply]:eq(1)").attr("checked",'');
			$("#radioSpan2").hide();
		}
		else
		{
			upNews.msgTypeDetail="newsTwo";
			$("input[name=msgTypeReply]:eq(1)").attr("checked",'checked');
			//$("input[name=msgTypeReply]:eq(0)").attr("checked",'');
			$("#radioSpan1").hide();
		}
		//保存关键字
		upNews.replyContent = wxReplyModel.replyContent;
		
		//构造页面		
		$(".pic_msg img").attr("src",wxReplyModel.picUrl);          
		$(".first_pre h4").text(wxReplyModel.title);
		$(".pic_msg img").attr("id","edit_"+0); 
		//左边部分
		var temp =	'<div class="appendHtml" >';
		for(var key in newList)
		{
			if(key !=0)
			{
				var news = newList[key];
				temp = temp+'<div class="add_pre">';
				//alert(news.picUrl);
				temp = temp+'<img class="litimg" name="editNewsPic" style="display:block;" alt="" src="'+news.picUrl+'" id="edit_'+key+'"></img>';
				temp = temp+'<h4 class="pic_title">'+news.title+'</h4>'
				temp = temp+'<div style="margin-left: 68px;margin-right: 8px;text-align: center;"><a class="icon18_common del_gray js_del" href="javascript:void(0);" onclick="upNews.delNews('+key+')">删除</a></div>'
				temp = temp+'</div>';
			}
		}
		temp = temp+'<div>';
		
		$(temp).appendTo($(".pic_preview"));
		upNews.editNews();
    },
    /**
     * 显示首条消息
     */
    showFirstNews:function(obj)
    {
    	
    	$("#replyTitle").val(obj.title);
        $("#imgInfo").attr("src",obj.picUrl);
        $("#description").val(obj.description);
        
        if(upNews.msgTypeDetail=="newsTwo")
        {
        	
        	upNews.initXheditor();
        	$("#contentLi").show();
        	$("#area-czzs").val(obj.content);
        	$("#newsUrl").val(obj.originalUrl);
        }
        else
        {
        	
        	$("#newsUrl").val(obj.url);
        }
        
        $("a[name='editToList']").attr("id","editToList_"+0);
    },
    
    /**
     * 点击之后显示
     */
   editNews:function()
   {	   		
		$("img[name='editNewsPic']").bind("click", function(e){
			
			var _cell = $(e.target);
            var _id = _cell.attr("id");
            var id = _id.split("_")[1];
            var list = upNews.upNewsList;
            var news = list[id];
            
            $("#replyTitle").val(news.title);
            $("#imgInfo").attr("src",news.picUrl);
            $("#description").val(news.description);
            
            if(upNews.msgTypeDetail=="newsTwo")
            {
            	
            	upNews.initXheditor();
            	$("#contentLi").show();
            	$("#area-czzs").val(news.content);
            	$("#newsUrl").val(news.originalUrl);
            }
            else
            {
            	
            	$("#newsUrl").val(news.url);
            }
            
            $("a[name='editToList']").attr("id","editToList_"+id);
            
		});
	   
   },
   
   /**
    * 初始化页面
    */
    initXheditor:function()
    {
    	
    	upNews.xheditor = $('#area-czzs').xheditor( {
//			tools : 'Cut,Copy,Paste,Pastetext,|,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,|,Align,List,Outdent,Indent,|,Link,Img,Flash,Media,Hr,Table,|,Source,Fullscreen,Preview',
			tools : 'full',
			urlType:'abs',
			urlBase:'/osp/upload/resize/',
			skin : 'nostyle',
			width : '430px',
			height : '250',
//			readonly : true,
//			readonly:false,
			upMultiple : true,
			upImgUrl : sys.contextPath+'/commonHttp/fileUpload?fid=c_clbImage',
			upImgExt : 'jpg,gif,png',
			html5Upload : false,
			onUpload : function(data) {
//			  appAdvertisingAdd.images[data[0].url] = {width:data[0].reWidth+"px", height:data[0].reHeight+"px"};
			}
		});
    },
    /**
     * 验证输入
     */
    validateInput : function(){
    	
    	var _replyTextLen = utils.getBytesLength($.trim($('#area-czzs').val()));
    	var _nameTextLen = utils.getBytesLength($.trim($('#nameId').val())); 
    	var _replyContentTextLen = utils.getBytesLength($.trim($('#replyContentId').val()));
    	var reg = new RegExp("^[a-za-z0-9]+$");
    	if(_nameTextLen == 0){
    		utils.warningTip('请输入命令字名称');
    		return false;
    	}else{
    		if(_nameTextLen > 40){
        		utils.warningTip('命令字名称长度不能超过40个字符');
        		return false;
        	}
    	}
    	
    	if(_replyContentTextLen == 0){
    		utils.warningTip('请输入命令字');
    		return false;
    	}else{
    		if(_replyContentTextLen > 40){
        		utils.warningTip('输入命令字长度不能超过40个字符');
        		return false;
        	}
    		
    		if(!reg.test($.trim($('#replyContentId').val())))
    		{
    			utils.warningTip('输入命令字只能为英文和数字的组合');
        		return false;
    		}
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