var communityDet={
		
		_mid : 0,
		
		initPage : function(id){
			communityDet.initBtn();
			communityDet.initLoad(id);
		},
		
		initBtn : function(){
			$("#reply_ul").click(function(e){
				if (e.target.nodeName == 'A') {
					if ($(e.target).text() == "删除") {
						art.dialog({
						    content: '<p>是否删除该条回复！</p>',
						    fixed: true,
						    id: 'Fm7',
						    icon: 'question',
						    okVal: '确定',
						    cancelVal : '取消',
						    ok: function () {
							manage.delCommunityReply({'id':$(e.target).parent().attr("ocId")}, function(data){
									if(data && data.retCode == 0){
										utils.succeedTip('删除成功');
										communityDet.getCommunity(communityDet._mid);
										communityDet.getCommunityReply(communityDet._mid);
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
				art.dialog({
				    content: ' <div  id="map_wrap"><textarea cols="70" rows="5" id="reply_textarea"></textarea></div>',
				    fixed: true,
				    id: 'Fm7',
					okVal: '确定',
					cancelVal : '取消',
					cancel: true,
					ok: function () {
						communityDet.addreply($("#reply_textarea").val());
				    }
				});
				
			});
			
			  $("#back_a").click(function(){
			    	$(".main").load(sys.contextPath+"/mp/contentManage/appManage/communityManageList.html");
			    });
			
		},
		
		initLoad : function(id){
			communityDet._mid=id;
			communityDet.getCommunity(id);
			communityDet.getCommunityReply(id);
		},
		
		/**
		 * 添加回复
		 */
		addreply : function(content){
			var param={};
			  param['content']=content;
			  param['topicid']=communityDet._mid;
			  manage.addCommunityReply(param,function(data){
				  if(data.retCode==0){
					  utils.succeedTip('回复成功');
					  communityDet.getCommunity(communityDet._mid);
					  communityDet.getCommunityReply(communityDet._mid);
				  }
			  },null);
			
		},
		/**
		 * 获取主题详情
		 */
		getCommunity : function(id){
			var param={};
			  param['id']=id;
			  manage.getCommunity(param,function(data){
				  if(data.retCode==0){
					  var _data=data.data;
					  var _html='<h2>论坛主题：'+_data.title+'</h2>'
								+'<span>账号：'+_data.username+'</span><span>回复数：'+_data.topicCount+'</span><span>'+_data.createTime+'</span>'
								+'<p>'+_data.content+'</p>';
						$("#sq_title").html(_html);
				  }
			  },null);
			
		},
		
		/**
		 * 获取回复列表
		 */
		getCommunityReply : function(id){
			var param={};
			  param['topicid']=id;
			  manage.getCommunityReplyList(param,function(data){
				  if(data.retCode==0){
					  var _data=data.data;
					  var _html='';
					  for(var i=0;i<_data.length;i++){
						  _html+='<li ocId="'+_data[i].id+'">'
									+'<span>'+_data[i].username+'</span>'
									+'<span>'+_data[i].createTime+'</span>'
									+'<a>删除</a>'
									+'<p>'+_data[i].content+'</p>'
								+'</li>';
					  }
					  
						$("#reply_ul").html(_html);
				  }
			  },null);
			
		}
		
		
 
};