var wxUserDetail={
	
		
		initPage : function(id){
			
			wxUserDetail.initLoad(id);
		},
		
		initLoad : function(id){
			wxUserDetail.initUserInfo(id);
			
		},
		
		
		initUserInfo : function(openId){
			var params={};
			
			params["openId"]=openId;
			manage.getUserInfo(params,function(data){
				var user=data.data;
				
				$("#headimgurl").attr("src",user.headImgUrl);
				$("#nickNameDetail").html(user.nickName);
				 var sex = user.sex=="1"?"男":"女";
				 $("#sexDetail").html(sex);
				
				 $("#cityDetail").html(user.city); 
				
				 $("#countryDetail").html(user.country);
				  
				
				 $("#provinceDetail").html(user.province); 
				
				 $("#subscribeTimeDetail").html(user.subscribeTime);
				
				 $("#remarkDetail").html(user.remark); 
				
				 $("#groupDetail").html(user.groupName); 
				 
				 $("#createTime").html(user.createTime);
				 var bindState="未绑定";
				 if(user.bindState =="1")
				 {
					 bindState="已经绑定"
				 }
				 $("#bindState").html(bindState);

			},null);
		}

};