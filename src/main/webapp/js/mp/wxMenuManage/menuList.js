/**
 * 添加和编辑新闻
 */
var menuList = {
	id : null,
	firstMenuNum:null,
	keyWordNum:null,
	keyWordList:null,
	initPage : function() {
		menuList.initStyle();
		menuList.initOperator();
		menuList.initLoad();
	},

	initStyle : function() {
		
	},

	initOperator : function() {
		$('#addWxMenu').click(function(){
	    	if(menuList.firstMenuNum >=3)
	    	{
	    		utils.errorTip("公众号最多只能同时启用3个一级菜单！当前一级菜单数已经达到上限！");
	    	}
	    	else
	    	{   
	    		$(".wx_addMenu").show();
	    		$(".wx_tip").hide();
	    		$("#wx_menu_manege_right #wx_add_sub_menu").remove();
	    		
	    		$('#wx_menu_manege_right #wx_upMenu').remove();
	    		//$('#wx_add_sub_menu').hide();
	    	}
	    });
		
		
		
		
		$('#addSaveMenu').click(function(){
			menuList.addSaveMenu();
	    });
		
		$('#changeMenuStateId').click(function(){
			
			if(menuList.firstMenuNum>0)
			{				
				menuList.toChangeMenuState();				
			}
			else
			{
				utils.errorTip("暂无一级菜单，请添加");
			}
	    });
		
       $('#addSubMenuNext').click(function(){
    	   menuList.addToSubMenu();
	    });
		
		
		
		$('#wx_menu_manege_right').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            
            if(_id){
            	if(_id.indexOf('changeMenu_') != -1){//改变启用状态           		
            		var id = _id.split("_")[1];
                    var state = _id.split("_")[2];
                    
            		menuList.changeMenuState(id,state);
                }
            	
          	
            }
        });
		
		$('#wx_menu_ul_id').bind("click", function(e){
            var _cell = $(e.target);
            var _id = _cell.attr("id");
            
            if(_id){
            	
            	if(_id.indexOf('updateMenu_') != -1){//改变启用状态           		
            		var id = _id.split("_")[1];
           		  menuList.queryMenuById(id);
                }
          	
            }
        });
		
		
	},
	/**
	 * 点击新增一级菜单时选择关键字
	 * @returns {Boolean}
	 */
	keyWordSelect:function()
	{
		if(menuList.keyWordNum == 0)
	    {
	    	utils.errorTip("暂无可以选择的关键字,请添加关键字!");
	    	$("#keyOrUrl").text("网页链接：");
	    	$("#menuTypeId").val("2");
	    	return false;
	    }
		
		
		var container = $('#keyOrUrlChangeId');
		var tmp = null;
		container.html('');
		    		
		
	   var temp =	'<select name="keySelect" id="keySelect">';
		for(var key in menuList.keyWordList)
		{
			temp=temp+'<option value="'+menuList.keyWordList[key].replyContent+'">'+menuList.keyWordList[key].replyContent+'</option>';
		}
		
		temp=temp+'</select>';
		$(temp).appendTo(container);
		
	},
	//查询关键字
	queryKeyWord:function()
	{
		var params = {};
		manage.queryKeyWord(params ,
	    		function(data){
	    		
			    var list = data.data;
			    
			     menuList.keyWordList = list;
			     menuList.keyWordNum=list.length;
	        		
	    		},
				function(){
	    			menuList.keyWordNum=0;
				}
			);
	},
	
	
	queryMenuById : function(menuId)
	{
        var params = {};		
		params['id'] = menuId;
      	manage.queryMenuById(params ,
    		function(data){
      		
      		var wxMenu = data.data;
    		var container = $('#wx_menu_manege_right');
    		$(".wx_addMenu").hide();
    		$(".wx_tip").hide();
    		var tmp = null;
    		//container.html('');
    		$('#wx_menu_manege_right #wx_upMenu').remove();
    		var strHtml = '<div class="wx_addMenu" id="wx_upMenu"><table>'
				            +'<tr><th>菜单名称：</th><td><input id="upMenuName" type="text" class="input-txt w200" value="'+wxMenu.name+'"/>'
				            +'</td></tr>';
    		var strState = "";
    		var strBt="";
    		if(wxMenu.grade == "1")
    		{
    			strHtml = strHtml+'<tr><th>菜单排序序号：</th><td><select name="menuIndex" id="upMenuIndexId">'
    			
    			var isSelected_1 = wxMenu.index=="1"?"selected":null;
    			var isSelected_2 = wxMenu.index=="2"?"selected":null;
    			var isSelected_3 = wxMenu.index=="3"?"selected":null;
    			strHtml = strHtml+'<option value="1" '+isSelected_1+'>1</option>'
                +'<option value="2" '+isSelected_2+'>2</option>'
	            +'<option value="3" '+isSelected_3+'>3</option></select></td></tr>';
    			
    			strState = '<tr><th>菜单状态：</th><td><select name="menuState" id="upMenuStateId">';
	              var isStateSelected_1 = wxMenu.state=="1"?"selected":null;
    			  var isStateSelected_0 = wxMenu.state=="0"?"selected":null;
    			  strState=strState +'<option value="1" '+isStateSelected_1+'>启用</option>'
	                +'<option value="0" '+isStateSelected_0+'>停用</option></select></td></tr>';
    			
    			  strBt='<p><a href="#" class="btn-upload" id="addNextMenu" onclick="menuList.addNextMenu('+wxMenu.id+')">添加下一级菜单</a></p>';
    		}
    		else
    		{
    			
    			strHtml = strHtml+'<tr><th>菜单类型：</th><td><select name="menuType" id="upMenuTypeId">';
        		var isTypeSelected_1 = wxMenu.type=="1"?"selected":null;
        		var isTypeSelected_2 = wxMenu.type=="2"?"selected":null;
        		strHtml = strHtml+'<option value="1" '+isTypeSelected_1+'>点击类型</option>'    
          		                +'<option value="2" '+isTypeSelected_2+'>浏览类型</option></select></td></tr>'
          		               var keyOrUrlVal=  wxMenu.type=="1"?wxMenu.key:wxMenu.url;
        		var upSecondMenuStr = "";
        		if(wxMenu.type == "2")
        		{
        			upSecondMenuStr=upSecondMenuStr+'<tr><th id="upKeyOrUrl">网页链接：</th><td id="upKeyOrUrlChangeId"><input id="upMenuKeyOrUrl" type="text" class="input-txt w200" value="'+wxMenu.url+'"/></td></tr>'	
        		}
        		else
        		{
        			
        			var temp =	'<tr><th id="upKeyOrUrl">KEY值为：</th><td id="upKeyOrUrlChangeId"><select name="upkeySelect" id="upkeySelect">';
    	    		for(var key in menuList.keyWordList)
    	    		{
    	    			if(wxMenu.key == menuList.keyWordList[key].replyContent)
    	    			{
    	    				temp=temp+'<option value="'+menuList.keyWordList[key].replyContent+'" selected>'+menuList.keyWordList[key].name+'('+menuList.keyWordList[key].replyContent+')</option>';	
    	    			}
    	    			else
    	    			{
    	    				temp=temp+'<option value="'+menuList.keyWordList[key].replyContent+'">'+menuList.keyWordList[key].name+'('+menuList.keyWordList[key].replyContent+')</option>';
    	    			}
    	    			
    	    		}
    	    		
    	    		temp=temp+'</select></td></tr>';
    	    		upSecondMenuStr=upSecondMenuStr+temp;
        		}
        		
        		strHtml = strHtml+upSecondMenuStr;
    		}
    		
    		
    		
      		              
    		strHtml = strHtml+strState;
    		strHtml = strHtml+'<tr id="createDate"><th>创建时间：</th><td><label for="">'+wxMenu.createTime+'</label></td></tr>';
    		strHtml = strHtml+'<tr><td style="height: 45px; text-align: center;" colspan="2"><p><a href="#" class="btn-upload" id="addSaveMenu" onclick="menuList.updateMenu('+wxMenu.id+')">保存</a></p>'             
      		                +'<p><a href="#" class="btn-upload" id="backMenu" onclick="menuList.returnMenuList()">返回</a></p>'
      		                +'<p><a href="#" class="btn-upload" id="delMenu" onclick="menuList.delMenu('+wxMenu.id+','+wxMenu.grade+')">删除</a></p>'  		
      		                +strBt
      		                +'</td></tr>'	
      		                +'</table>';
    		$(strHtml).appendTo(container);
    		
    		$("#upMenuTypeId").change(function(){
    			var typeSelected=$(this).children('option:selected').val();
    	        
    	        if(typeSelected == "2")
    	        {
    	        	$("#upKeyOrUrl").text("网页链接：");
    	        	
    	        	var container = $('#upKeyOrUrlChangeId');
    	    		var tmp = null;
    	    		container.html('');
    	    		var temp =	'<input id="upMenuKeyOrUrl" type="text" class="input-txt w200" value="'+wxMenu.url+'"/>';
    	    		$(temp).appendTo(container);
    	        }
    	        else
    	        {
    	        	$("#upKeyOrUrl").text("KEY值为：");
    	        	
    	        	menuList.upMenuType(wxMenu.key);
    	        }
    		});
    		
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
	},
	
	
	//同时添加一级和二级菜单的事件绑定
	upMenuType :function(menuKey)
	{
		        
	    		var container = $('#upKeyOrUrlChangeId');
	    		var tmp = null;
	    		container.html('');
	    		    		
	    		var list = menuList.keyWordList;
	    	   var temp =	'<select name="upkeySelect" id="upkeySelect">';
	    	  
	    		for(var key in list)
	    		{
	    			if(menuKey == list[key].replyContent)
	    			{
	    				temp=temp+'<option value="'+list[key].replyContent+'" selected>'+list[key].replyContent+'</option>';	    				
	    			}
	    			else
	    			{
	    				temp=temp+'<option value="'+list[key].replyContent+'">'+list[key].replyContent+'</option>';
	    			}
	    		}
	    		
	    		temp=temp+'</select>';
	    		$(temp).appendTo(container);
				
	        		
	    		
	},
	
	/**
	 * 点击新增一级菜单-->添加下一级菜单
	 * @param parentId
	 * @returns {Boolean}
	 */
	addToSubMenu :function(parentId)
	{
		
		var container = $('#wx_menu_manege_right');
		var check =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		
	  //  var menuType= $.trim($("#menuTypeId").find("option:selected").val());
	    
	    if(!$("#menuName").val())
	    {
	    	utils.errorTip("菜单名称不能为空!");
    		return false;
	    }
	    
	    
		
		$(".wx_tip").hide();
		
		$(".wx_addMenu").hide();
		$('#wx_menu_manege_right #wx_upMenu').remove();
		$('#wx_menu_manege_right .wx_tip').remove();
		//$('#wx_menu_manege_right .wx_addMenu').remove();
		var strHtml = '<div class="wx_addMenu" id="wx_add_sub_menu"><table>'
		+'<tr><th>菜单名称：</th><td><input id="firstAndSubMenuName" type="text" class="input-txt w200" /></td></tr>'	
		+'<tr><th>菜单类型：</th><td><select name="menuType" id="firstAndSubMenuTypeId"><option value="2" selected>浏览类型</option>'
		+'<option value="1" >点击类型</option></select></td></tr>'
		+'<tr><th id="firstkeyOrUrl">网页链接：</th><td id="firstkeyOrUrlChangeId"><input id="firstAndSubMenuKeyOrUrl" type="text" class="input-txt w200" /></td></tr>'
		+'<tr><td style="height: 45px; text-align: center;" colspan="2"><p><a href="#" class="btn-upload" id="addSaveMenu" onclick="menuList.addFirstAndSubMenu()">保存</a></p>'
		+'<p><a href="#" class="btn-upload" id="backMenu" onclick="menuList.returnMenuList()">返回</a></p></td></tr>'
		+'</table></div>';
		$(strHtml).appendTo(container);
		
		$("#firstAndSubMenuTypeId").change(function(){
			var typeSelected=$(this).children('option:selected').val();
	        
	        if(typeSelected == "2")
	        {
	        	$("#firstkeyOrUrl").text("网页链接：");
	        	
	        	var container = $('#firstkeyOrUrlChangeId');
	    		var tmp = null;
	    		container.html('');
	    		var temp =	'<input id="firstAndSubMenuKeyOrUrl" type="text" class="input-txt w200" />';
	    		$(temp).appendTo(container);
	        }
	        else
	        {
	        	$("#firstkeyOrUrl").text("KEY值为：");
	        	
	        	menuList.firstAndSubMenuType();
	        }
		});
		
	},
	//同时添加一级和二级菜单的事件绑定
	firstAndSubMenuType :function()
	{

		if(menuList.keyWordNum == 0)
	    {
	    	utils.errorTip("暂无可以选择的关键字,请添加关键字!");
	    	$("#firstkeyOrUrl").text("网页链接：");
	    	$("#firstAndSubMenuTypeId").val("2");
	    	return false;
	    }
	    		var container = $('#firstkeyOrUrlChangeId');
	    		var tmp = null;
	    		container.html('');
	    		    		
	    		
	    	   var temp =	'<select name="firstkeySelect" id="firstkeySelect">';
	    		for(var key in menuList.keyWordList)
	    		{
	    			temp=temp+'<option value="'+menuList.keyWordList[key].replyContent+'">'+menuList.keyWordList[key].replyContent+'</option>';
	    		}
	    		
	    		temp=temp+'</select>';
	    		$(temp).appendTo(container);
				
	        		
	    		
	},
	

	addNextMenu:function(parentId)
	{
		var container = $('#wx_menu_manege_right');
		
		$(".wx_tip").hide();
		
		//$(".wx_addMenu").html());
		$('#wx_menu_manege_right #wx_upMenu').remove();
		$('#wx_menu_manege_right .wx_tip').remove();
		//$('#wx_menu_manege_right .wx_addMenu').remove();
		var strHtml = '<div class="wx_addMenu" id="wx_add_sub_menu"><table>'
		+'<tr><th>菜单名称：</th><td><input id="subMenuName" type="text" class="input-txt w200" /></td></tr>'	
		+'<tr><th>菜单类型：</th><td><select name="menuType" id="subMenuTypeId"><option value="2" selected>浏览类型</option>'
		+'<option value="1" >点击类型</option></select></td></tr>'
		+'<tr><th id="addNextKeyOrUrl">网页链接：</th><td id="addNextKeyOrUrlChangeId"><input id="subMenuKeyOrUrl" type="text" class="input-txt w200" /></td></tr>'
		+'<tr><td style="height: 45px; text-align: center;" colspan="2"><p><a href="#" class="btn-upload" id="addSaveMenu" onclick="menuList.addSubMenu('+parentId+')">保存</a></p>'
		+'<p><a href="#" class="btn-upload" id="backMenu" onclick="menuList.returnMenuList()">返回</a></p></td></tr>'
		+'</table></div>';
		$(strHtml).appendTo(container);
		
		
		$("#subMenuTypeId").change(function(){
			var typeSelected=$(this).children('option:selected').val();
	        
	        if(typeSelected == "2")
	        {
	        	$("#addNextKeyOrUrl").text("网页链接：");
	        	
	        	var container = $('#addNextKeyOrUrlChangeId');
	    		var tmp = null;
	    		container.html('');
	    		var temp =	'<input id="subMenuKeyOrUrl" type="text" class="input-txt w200" />';
	    		$(temp).appendTo(container);
	        }
	        else
	        {
	        	$("#addNextKeyOrUrl").text("KEY值为：");
	        	
	        	menuList.addNextMenuType();
	        }
		});
		
	},
	
	

	/**
	 * 修改一级菜单时添加二级菜单
	 */
	addNextMenuType :function()
	{

		if(menuList.keyWordNum == 0)
	    {
	    	utils.errorTip("暂无可以选择的关键字,请添加关键字!");
	    	$("#addNextKeyOrUrl").text("网页链接：");
	    	$("#subMenuTypeId").val("2");
	    	return false;
	    }
	    		var container = $('#addNextKeyOrUrlChangeId');
	    		var tmp = null;
	    		container.html('');
	    		    		
	    		
	    	   var temp =	'<select name="addNextKeySelect" id="addNextKeySelect">';
	    		for(var key in menuList.keyWordList)
	    		{
	    			temp=temp+'<option value="'+menuList.keyWordList[key].replyContent+'">'+menuList.keyWordList[key].replyContent+'</option>';
	    		}
	    		
	    		temp=temp+'</select>';
	    		$(temp).appendTo(container);
				
	        		
	    		
	},
	
	changeMenuState : function(menuId,state){
		var params = {};
		
		params['id'] = menuId;
		
		if(state =="1")
		{
			params['state'] = 0;	
		}
		else
		{
			params['state'] = 1;
		}
    	
    	manage.changeMenuState(params ,
    		function(data){   		  
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');    				
    			}
    			else
    			{
    				utils.errorTip("系统繁忙,请稍候再试!");
    			}
    			var idTemp = 'changeMenu_'+menuId+'_'+state;
    			
    					
    			$(".main").load(sys.contextPath+"/mp/wxMenuManage/menuList.html");
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    returnMenuList:function()
    {
    	$(".main").load(sys.contextPath+"/mp/wxMenuManage/menuList.html");
    },
	initLoad : function() {		   
			menuList.queryWxMenu();
			menuList.queryKeyWord();
		},
		
		
	
	
		
		//改变一级菜单状态
	toChangeMenuState:function()
	{
		
		$(".wx_addMenu").hide();
		$(".wx_tip").hide();
		
		var params = {};
		
		manage.queryWxMenu(params ,
		function(data){
		    		
		    		var container = $('#wx_menu_manege_right');
		    		var tmp = null;
		    		
		    			var firstMenuList = data.data;
		    			//一级菜单数量
		    			var firstMenuNum = firstMenuList.length; 		
		    			menuList.firstMenuNum=firstMenuNum;
		    			if(firstMenuNum ==0)
		    			{
		    				tmp = $('<span class="sp">暂无菜单,请添加。</span>'    					  						
		    					);
		    				tmp.appendTo(container);
		    			}
		    			else
		    			{
		    				var strHtml ='<div class="wx_tip" style="margin-left: auto;margin-right: auto;">';
		    				for(var key in firstMenuList){
		        				var firstMenu = firstMenuList[key];
		        				
		        				for(var menuKey in firstMenu)
		        				{
		        					var wxMenu = firstMenu[menuKey];
		        					var changeMenuHtml = ''
		        					if(wxMenu.grade == 1 || wxMenu.grade == "1")
		            				{
		        						var stateStr = null;
		        						if(wxMenu.state == "1")
		        						{
		        							stateStr ="停用";
		        						}
		        						else
		        						{
		        							stateStr ="启用";
		        						}
		        						strHtml = strHtml+'<p>'+wxMenu.name+'<a href="#" id="changeMenu_'+wxMenu.id+'_'+wxMenu.state+'">&nbsp;&nbsp;'+stateStr+'</a></p>';
		            				
		            				}
		            				
		        				
		        				}
		        				   				
		        			}
		    				
		    				strHtml=strHtml+'</div>';
		    				$(strHtml).appendTo(container);
		    				
		    			}
		        		
		        		
		    		},
					function(){
		    			utils.errorTip("系统繁忙,请稍候再试!");
					}
				);
	},
     delMenu : function(menuId,grade){
		var params = {};
		params['grade'] = grade;
		params['id'] = menuId;
    	
    	manage.delMenu(params ,
    		function(data){   		  
    			if(data && data.retCode == 0){
    				utils.succeedTip('操作成功');    				
    			}
    			else
    			{
    				utils.errorTip("删除失败,请稍候再试!");
    			}
    			
    			$(".main").load(sys.contextPath+"/mp/wxMenuManage/menuList.html");
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
	
	/**
     * 查询菜单
     */
    queryWxMenu : function(){
		
		var params = {};
    	
    	manage.queryWxMenu(params ,
    		function(data){
    		
    		var container = $('#wx_menu_ul_id');
    		var tmp = null;
    		container.html('');
    			var firstMenuList = data.data;
    			//一级菜单数量
    			var firstMenuNum = firstMenuList.length; 		
    			menuList.firstMenuNum=firstMenuNum;
    			if(firstMenuNum ==0)
    			{
    				tmp = $('<span class="sp">暂无菜单,请添加。</span>'    					  						
    					);
    				tmp.appendTo(container);
    			}
    			else
    			{
    				
    				for(var key in firstMenuList){
        				var firstMenu = firstMenuList[key];
        				var strHtml ='<li>';
        				for(var menuKey in firstMenu)
        				{
        					var wxMenu = firstMenu[menuKey];
        					
        					if(wxMenu.grade == 1 || wxMenu.grade == "1")
            				{
        						var menuState = null;
        						if(wxMenu.state =="1")
        						{
        							menuState = "启用";
        						}else
        						{
        							menuState = "停用";
        						}
            				
        						var firstHtml = '<div><span class="Darrow"></span><a id="updateMenu_'+wxMenu.id+'">'+wxMenu.name+'</a>'+'<a>'+menuState+'</a></div><dl>';
        						strHtml = strHtml+firstHtml;        						
        						
            				}
            				else
            				{
            					strHtml=strHtml+'<dd><a id="updateMenu_'+wxMenu.id+'">'+wxMenu.name+'</a></dd>';
            				}
        				
        				}
        				strHtml=strHtml+'</dl></li>';
        				$(strHtml).appendTo(container);
        				
        			}
    			}
        		
        		
    		},
			function(){
    			utils.errorTip("系统繁忙,请稍候再试!");
			}
		);
    },
    addSaveMenu:function()
    {
    	var params = {};
		params['name'] = $.trim($('#menuName').val());
		params['index'] = $.trim($("#menuIndexId").find("option:selected").val());
		params['type'] = $.trim($("#menuTypeId").find("option:selected").val());
		
		params['state'] = $.trim($("#menuStateId").val());
		
		if($("#menuTypeId").find("option:selected").val() == "1")
		{
			params['key'] = $.trim($("#menuKeyOrUrl").val());
			params['url'] ="";
		}else
		{			
			params['key'] = "";
			params['url'] =$.trim($("#menuKeyOrUrl").val());
		}
		
		manage.addSaveMenu(params ,
	    		function(data){   		  
	    			if(data && data.retCode == 0){
	    				utils.succeedTip('操作成功');    				
	    			}
	    			else
	    			{
	    				utils.errorTip("系统繁忙,请稍候再试!");
	    			}
	    			
	    			$(".main").load(sys.contextPath+"/mp/wxMenuManage/menuList.html");
	    		},
				function(){
	    			utils.errorTip("系统繁忙,请稍候再试!");
				}
			);
		
    },
    
    

    //添加一级和二级菜单
    addFirstAndSubMenu:function()
    {
    	var params = {};
    	
    	
		params['name'] = $.trim($('#menuName').val());
		params['index'] = $.trim($("#menuIndexId").find("option:selected").val());
		params['type'] = "";
		
		params['state'] = $.trim($("#menuStateId").val());
	    params['key'] = "";
		params['url'] ="";
		params['subName'] =$.trim($('#firstAndSubMenuName').val());
		params['subType'] =$.trim($("#firstAndSubMenuTypeId").find("option:selected").val());
		params['subState'] = $.trim($("#menuStateId").val());
		
		if($("#firstAndSubMenuTypeId").find("option:selected").val() == "1")
		{
			params['subKey'] = $("#firstkeySelect").find("option:selected").val();
			params['subUrl'] ="";
		}
		else
		{			
			params['subKey'] = "";
			params['subUrl'] =$.trim($("#firstAndSubMenuKeyOrUrl").val());
			
			var check =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			if(!check.test($("#firstAndSubMenuKeyOrUrl").val()))
			{
				utils.errorTip("网址不正确!");
				return false;
			}
			
		}
		
		
		manage.addSaveMenuAndSub(params ,
	    		function(data){   		  
	    			if(data && data.retCode == 0){
	    				utils.succeedTip('操作成功');    				
	    			}else
	    			{
	    				utils.errorTip("系统繁忙,请稍候再试!");
	    			}
	    			
	    			
	    			$(".main").load(sys.contextPath+"/mp/wxMenuManage/menuList.html");
	    		},
				function(){
	    			utils.errorTip("系统繁忙,请稍候再试!");
				}
			);
		
    },
    /**
     * 修改一级菜单时添加二级菜单
     */
    addSubMenu:function(parentId)
    {
    	var params = {};
    	
    	params['name'] = $.trim($("#subMenuName").val());
		params['parentId'] = parentId;
		params['index'] = 0;
		params['type'] = $.trim($("#subMenuTypeId").find("option:selected").val());
		
		params['state'] = 1;
		
		if($("#subMenuTypeId").find("option:selected").val() == "1")
		{
			params['key'] = $.trim($("#addNextKeySelect").find("option:selected").val());
			params['url'] ="";
		}else
		{			
			params['key'] = "";
			params['url'] =$.trim($("#subMenuKeyOrUrl").val());
			
			var check =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			if(!check.test($("#subMenuKeyOrUrl").val()))
			{
				utils.errorTip("网址不正确!");
				return false;
			}
		}
		
		manage.addSubMenu(params ,
	    		function(data){   		  
	    			if(data && data.retCode == 0){
	    				utils.succeedTip('操作成功');    				
	    			}
	    			else
	    			{
	    				utils.errorTip("系统繁忙,请稍候再试!");
	    			}
	    			
	    			$(".main").load(sys.contextPath+"/mp/wxMenuManage/menuList.html");
	    		},
				function(){
	    			utils.errorTip("系统繁忙,请稍候再试!");
				}
			);
		
    },
   
    /**
     * 修改一级菜单
     * @param menuId
     */
    updateMenu:function(menuId)
    {
    	var params = {};
    	params['id'] = menuId;
    	
		params['name'] = $.trim($('#upMenuName').val());
		params['index'] = $.trim($("#upMenuIndexId").find("option:selected").val());
		params['type'] = $.trim($("#upMenuTypeId").find("option:selected").val());
		
		params['state'] = $.trim($("#upMenuStateId").val());
		
		
		params['key'] = $.trim($("#upkeySelect").find("option:selected").val());
		params['url'] =$.trim($('#upMenuKeyOrUrl').val());
		
		
		manage.updateMenu(params ,
	    		function(data){   		  
	    			if(data && data.retCode == 0){
	    				utils.succeedTip('操作成功');    				
	    			}
	    			else
	    			{
	    				utils.errorTip("系统繁忙,请稍候再试!");
	    			}
	    			
	    			$(".main").load(sys.contextPath+"/mp/wxMenuManage/menuList.html");
	    		},
				function(){
	    			utils.errorTip("系统繁忙,请稍候再试!");
				}
			);
		
    },
     
    
   
    
    /**
     * 验证输入
     */
    validateInput : function(){
    	
    	var _replyTextLen = utils.getBytesLength($.trim($('#replyTextId').val()));
    	    	  
    	if(_replyTextLen == 0){
    		utils.warningTip('请输入回复内容');
    		return false;
    	}else{
    		if(_replyTextLen > 2000){
        		utils.warningTip('正文内容不能超过2000字符');
        		return false;
        	}
    	}
    	return true;
    }
};