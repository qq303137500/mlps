/*
 *完全复制album.index.js的代码，因为album.index.js外部不能引用
 * 相册操作类
 * @author WuGuangying
 */
var Album = {
    UserId:"",   //当前用户id
    albumList:null, //用户相册
    photoList:null, //用户照片
    classList:null,    //分类
    perPageWidth:640,   //照片展示分页width
    perPageSize:8,  //照片展示页每页个数
    pageSize:20,    //记录分页条数
    curPageNum:0,   //当前页
    currentAlbumId:null,//当前相册Id
    friendAlbumList:null,//好友的相册list
    curFavoritenList:null,//当前收藏夹list
    curFavoritenInfo:null,
    prevPage:{"name":"","albumId":"","photoId":""},
    /*
     * 相册首页初始化
     */
    initpage:function(){
 
    },
    
    /**
     * 浏览个人主页传过来的相册
     */
    showDefaultAlbum:function(){    	
    	Album.getPhotoList(0,visitorAlbumId,null,1);   
    },
    
    /*
     * @mode 0批量管理;1退出管理
     */
    showEditMode:function(mode){
        if(mode==0){
            $("#edit_mode_btn").html("退出管理");
            $("#photoEdit_toolbar").show();
            $("#album_list_container .album_name").show();
            $("#album_list_container .photo_name,.photo_edit").hide();            
        }
        else if(mode==1){
            $("#edit_mode_btn").html("批量管理");
            $("#photoEdit_toolbar").hide();
            $("#album_list_container .album_name").hide();
            $("#album_list_container .photo_name,.photo_edit").show();            
        }        
    },
    
    /**
     * 添加图片按钮显示、隐藏
     * @param Type :show显示，hide隐藏
     */
    SWFUploadButton:function(Type){
    	if($("#upload_page:visible").length==0){
        	return;
        }
    	if(Type=="show"){
    		 $("#Holder_uploadBtn_disabled").hide();
             $("#SWFUpload_0").show();
    	}
    	else if(Type=="hide"){
    		 $("#Holder_uploadBtn_disabled").show();
    	     $("#SWFUpload_0").hide();
    	}
    	
    },
    /*
     * 创建相册
     */
    addAlbum:function(albumId){
        var title_Str="";
        var url;
        var succfun=null;
        if(albumId==null){
            title_Str="创建相册";
            url = sys.context_path+ "/album/album_addAlbum.action";
            succfun=Album.callback_addAlbum;
        }
        else{
            title_Str="编辑相册";
            url = sys.context_path+ "/album/album_modifyAlbum.action";
            succfun=Album.callback_editAlbum;
        }
        Album.SWFUploadButton("hide");
        $.msgBox.prompt( {
            title:title_Str,
            html : '<div id="albumBlock"><div class="loading_info" style="padding:20px;"><img src="../images/album/loading.gif"/>正在加载数据，请稍候...</div></div>',
            width : 470,
            autoClose:false,
            yesFun:function(){
                var albumId=$("#albumId").val();
                var album_name=$.trim($("#album_name").val());
                var album_desc=web4s.HTMLEnCode($.trim($("#album_desc").val()));
                var album_class=$("#album_class").val();
                var album_userId=$("#album_userId").val();
                var visitRightType=$("input:radio[name='Permission']:checked").val();
                var canComment=($("#canComment").attr("checked")==true)? 1:0;
                var Question=$("#question_input").val();
                var Answer=$("#Answer_Input").val();
                var coverUrl=$("#coverUrl").val();
                var photoTotal=$("#photoTotal").val();
                if($.trim(album_name)==""){
                    $("#name_tips").show().html("相册名称不能为空，请先输入名称");
                    return;
                }
                else if(web4s.checkStr(album_name)==false){
                    $("#name_tips").show().html("相册名称只能输入中文，英文和数字");
                    return;
                }
                else if(visitRightType=="1"){
                    if($.trim(Question)==""){
                        $("#question_tips").show().html("问题不能为空，请先输入问题");
                        return;
                    }
                    else if($.trim(Answer)==""){                     
                        $("#question_tips").show().html("答案不能为空，请先输入答案");
                        return;
                    }
                }
                var myObj={
                    "album.albumId": albumId,    
                    "album.name": album_name,
                    "album.albumDesc": album_desc,
                    "album.classId": album_class,
                    "album.userId": album_userId,
                    "album.visitRightType": visitRightType,
                    "album.canComment": canComment,
                    "album.visitRightQuestion": Question,
                    "album.visitRightAnswer": Answer,
                    "album.coverUrl": coverUrl,
                    "album.photoTotal": photoTotal
                };
                
                Album.sendAjax(url,myObj,succfun,null,"POST");
                Album.SWFUploadButton("show");
            },
            noFun:function(){
            	Album.SWFUploadButton("show");
            },
            beforClose:function(){
            	Album.SWFUploadButton("show");
            }
        });
        $("#albumBlock").load("../album/template_album.jsp", {date: new Date().getTime()}, function(){
            $("#album_name").bind("keyup", function(){
                Album.checkInputLen($(this),$("#name_word"),$("#name_tips"),20);
            }).blur(function(){
                Album.checkInputLen($(this),$("#name_word"),$("#name_tips"),20);
            }); 
            $("#album_desc").bind("keyup", function(){
                Album.checkInputLen($(this),$("#desc_word"),$("#desc_tips"),140);  
            });
            $("input:radio[name='Permission']").change(function(){
               if($(this).val()=="1"){
                   $("#panel_question").show();
               }
               else{
                   $("#panel_question").hide();
               }
            });
            $("#question_input").focus(function(){
                $(this).val("");
                $("#question_tips").hide();
            });
            $("#Answer_Input").focus(function(){
                $("#question_tips").hide();
            });
                        
            try{
                if($("#albumClass_list .highlight").length){
                    classId=$("#albumClass_list .highlight").attr("id").replace("classId_","");
                }
                $('#album_class').empty();
                var index=0,classId;            
                var select = $('#album_class').get(0);
                $.each(Album.classList,function(i,temp){
                    select[i] = new Option(temp.className,temp.classId);
                    if(temp.classId==classId){
                        index=i; 
                    }
                });                
                select.selectedIndex = index;  
            }catch(e){}
            if(albumId!=null){
            	Album.setAlbumValue(albumId);
            }
        });
    },
    
    callback_addAlbum:function(response){
        if(response.returnCode=="0"){
        	Album.AlbumList=response.albumList;
            Album.getAlbumHtml();
            Album.getAlbumSysInfo();
            Album.SWFUploadButton("hide");
            $.msgBox.prompt( {
                title : "提示",
                msg : "相册创建成功。<br />是否马上上传照片到这个相册？",
                icon : "succeed",
                yesFun:function(){
                    if(response.albumList!=null){                        
                        Album.getsel_albumHtml(response.albumId);
                    }
                    if($("#upload_page:visible").length==0){
                    	Album.uploadphoto(response.albumId);
                    }
                    Album.SWFUploadButton("show");
                },
                noFun:function(){
                	//创建完成之后直接进入相册列表
                	Album.getAlbumList();
                	Album.SWFUploadButton("show");
                },                
                beforClose:function(){
                	Album.SWFUploadButton("show");
                }
            });
        }
        else if(response.returnCode=="-1003"){
        	$.msgBox.alert( {title : "提示",msg : "该相册名称已存在。",icon : "warning"});
        	return
        }
    },
    
    callback_editAlbum:function(response){
        if(response.returnCode=="0"){
        	var remarkCount=response.remarkCount;
            Album.getAlbumList();
            $.msgBox.alert( {title : "提示",msg : "相册信息编辑成功。",icon : "succeed"});
        }else if(response.returnCode=="-1003"){
        	$.msgBox.alert( {title : "提示",msg : "该相册名称已存在。",icon : "warning"});
        	return
        }
    },
    
    /**
     * 相册属性，信息编辑
     * @type "name"编辑名称，“desc”编辑描述
     */
    albumInfoEdit:function(type){
    	var id=Album.currentAlbumId;
    	var Obj=Album.getAlbumById(id);
        if(Obj!=null){
            var album_name=Obj.name;
            var album_desc=Obj.albumDesc;
            var album_class=Obj.classId;//$("#album_class").val();
            var visitRightType=Obj.visitRightType;//$("input:radio[name='Permission']:checked").val();
            if(type=="name"){
            	album_name=$.trim($("#albumInfo_name").val());
            	if($.trim(album_name)==""){
                    $.msgBox.alert( {title : "提示",msg : "相册名称不能为空，请先输入名称",icon : "succeed"});
                    return;
                }
                else if(web4s.checkStr(album_name)==false){
                	$.msgBox.alert( {title : "提示",msg : "相册名称只能输入中文，英文和数字",icon : "succeed"});
                    return;
                }
            }
            if(type=="desc"){
            	album_desc=web4s.HTMLEnCode($.trim($("#albumInfo_desc").val()));
            }
            if(type="visitRightType"){
            	visitRightType=$("input:radio[name='view_Permission']:checked").val();
            }
            if(type="albumClass"){
            	album_class=$("#view_album_class").val();
            }
            var url = sys.context_path+ "/album/album_modifyAlbum.action";
            var myObj={
                    "album.albumId": id,    
                    "album.name": album_name,
                    "album.albumDesc": album_desc,
                    "album.classId": album_class,
                    "album.userId": Obj.userId,
                    "album.visitRightType": visitRightType,
                    "album.canComment": Obj.canComment,
                    "album.visitRightQuestion": Obj.visitRightQuestion,
                    "album.visitRightAnswer": Obj.visitRightAnswer,
                    "album.coverUrl": Obj.coverUrl,
                    "album.photoTotal": Obj.photoTotal
                };
                
            Album.sendAjax(url,myObj,Album.callback_albumInfoEdit,null,"POST");
        }
    },
    
    callback_albumInfoEdit:function(response){
        if(response.returnCode=="0"){
            //Album.getAlbumList();
            $.msgBox.alert( {title : "提示",msg : "相册信息编辑成功。",icon : "succeed"});
        	var _parent = $('#view_album_class').parent();
        	//编辑类别
        	var album_class=$('#view_album_class option:selected').text();
        	var album_class_text="类别："+album_class;
        	_parent.siblings().show().find('span').html(album_class_text);
        	_parent.hide().siblings().show().find('span').html(_parent.find('.album_editElement').attr('value'));
        	
        	//编辑权限
        	//$("input:radio[name='view_Permission']:checked").val()   0 2 3
        	var _parent_right=$("input:radio[name='view_Permission']").parent();
        	_parent_right.hide();
        	var right_code=$("input:radio[name='view_Permission']:checked").val();
        	var right_view="";
        	if(right_code==0){
        		right_view="权限：所有人";
        	}else if(right_code==2){
        		right_view="权限：全部好友";
        	}else{
        		right_view="权限：仅主人";
        	}
        	_parent_right.siblings().show().find('span').html(right_view);
        	//_parent_right.siblings().show().find('span').html(_parent_right.find('.album_editElement').attr('value'));
        	
        		
       
        }
    },
    
    /**
     *锁定/解除相册，禁止访问
     * @albumId 相册ID
     * @lockType -1锁定,3解锁
    */
    
    adminModiflyAlbum:function(albumId,lockType){
        var url = sys.context_path+ "/album/album_modifyAlbumByAdmin.action";        
        var myObj={
                "album.albumId": albumId,
                "album.visitRightType": lockType
            };
            
            Album.sendAjax(url,myObj,Album.callback_adminModiflyAlbum,null,"POST");
    },
    callback_adminModiflyAlbum:function(response){
        
        if(response.returnCode=="9001"){
            $.msgBox.alert( {title : "提示",msg : "操作失败，请确认您是否为管理员。",icon : "warning"});        
        }
        else if(response.returnCode=="0"){
            var actStr=(response.lockType==-1)? "锁定":"解除锁定";
            $.msgBox.alert( {title : "提示",msg : actStr+"相册成功。",icon : "succeed"});        
        }
    },

    /*
     *设置相册封面 
    */
    modiflyAlbumCover:function(albumId,coverUrl){
        var url = sys.context_path+ "/album/album_modifyAlbum.action";        
        var myObj={
                "album.albumId": albumId,
                "coverUrl": coverUrl
            };
            
            Album.sendAjax(url,myObj,Album.callback_modiflyAlbumCover,null,"POST");
    },
    callback_modiflyAlbumCover:function(response){
        if(response.returnCode=="0"){
            $.msgBox.alert( {title : "提示",msg : "设置相册封面成功。",icon : "succeed"});
            Album.updateLocalAlbumObj({"albumId":response.albumId,"coverUrl":response.coverUrl});
            Album.viewAlbumInfo(response.albumId);
            
        }
    },
    
    setAlbumValue:function(id){
        var Obj=Album.getAlbumById(id);
        if(Obj!=null){
            var canComment=(Obj.canComment==0)? false:true;
            $("#albumId").val(id);
            $("#album_name").val(Obj.name);
            $("#album_desc").val(web4s.HTMLDeCode(Obj.albumDesc));
            $("#album_class").val(Obj.classId);
            $("#album_userId").val(Obj.userId);
            $("input:radio[name='Permission'][value='"+Obj.visitRightType+"']").attr("checked",true);
            $("#canComment").attr("checked",canComment);
            $("#question_input").val(Obj.visitRightQuestion);
            $("#Answer_Input").val(Obj.visitRightAnswer);            
            $("#coverUrl").val(Obj.coverUrl);
            $("#photoTotal").val(Obj.photoTotal);
            
            $("#name_word").html(Obj.name.length);
            $("#desc_word").html($("#album_desc").val().length);
            if(Obj.visitRightType=="-1"){
                $("#visitRight_Message").html("内容涉嫌违规，已被管理员锁定！仅主人可以查看内容。");
            }
            else if(Obj.visitRightType=="1"){
                $("#panel_question").show();
            }
            else{
                $("#panel_question").hide();
            }
        }
    },
    /**
     * 显示相册内容
     */
    viewAlbumInfo:function(id,albumInfo){
        var Obj=(albumInfo==null)? Album.getAlbumById(id):albumInfo;
        if(Obj!=null){
            var rigthStr="",coverURL="";
            var createDate=(Obj.createDate!="")? Obj.createDate.substring(0,16):"";
            var updateDate=(Obj.updateDate!="")? Obj.updateDate.substring(0,16):createDate;
            var canComment=(Obj.canComment==0)? "允许评论":"不允许评论";
            var albumDesc=(Obj.albumDesc.length>80)? Obj.albumDesc.substring(0,80)+"...":Obj.albumDesc;
            switch(Obj.visitRightType){
            case 0:
                rigthStr="所有人";
                break;
            case 1:    
                rigthStr="回答问题";
                break;
            case 2:    
                rigthStr="全部好友";
                break;
            case 3:    
                rigthStr="仅主人";
                break;
            }
            
            if(Obj.photoTotal>0){
                coverURL=Obj.coverUrl.replace("/largephoto","/smallphoto");
            }            
            else{
                coverURL="../images_3/albumNophoto.gif";
            }
            $("#view_name").html(Obj.name);
            $("#view_desc").html(albumDesc);
            $("#view_className").html("分类："+Album.getClassNameById(Obj.classId));
            $("#view_right").html("权限："+rigthStr);
            $("#view_photoCoutn").html(Obj.photoTotal);
            $("#view_createDate").html(createDate);
            $("#view_updateDate").html(updateDate);
            /*$("#view_coverImg").attr("src",coverURL).unbind("click").bind("click",function(){Album.getPhotoList(0,id);});
            $("#view_coverImg").load(function(){
                Album.resizeImage($(this).get(0),140,140);
            });*/
            if(visitorId!=""){
            	$("#view_delete").parent().hide();
            	$("#view_addFavoriten").parent().show().unbind("click").bind("click", function(){
            		Album.inputFavoritenList(0,Album.currentAlbumId);
                });
            	$("#view_addCommend").parent().show().unbind("click").bind("click", function(){
            		Album.addCommendInfo(Album.currentAlbumId,'201');
                });
            }
            else{
            	$("#view_delete").parent().show();
            	$("#view_addFavoriten").parent().hide();
            	$("#view_addCommend").parent().hide();
            	
            }
            $("#nav").append(" &gt; "+Obj.name);
            $("#curAlbumName").html(Obj.name);
            $("#curpage_Album_name").html(Obj.name);
            
            $("#albumInfo_desc").unbind("keyup").bind("keyup", function(){
                var desc=$(this).val();
                if(desc.length>140){
                    $(this).val(desc.substring(0,140));
                }
            });
        	var select = $('#view_album_class').get(0);
        	var index=0;
        	$.each(Album.classList,function(i,temp){
                select[i] = new Option(temp.className,temp.classId);
                if(temp.classId==Obj.classId){
                    index=i; 
                }
                
            });    
        	select.selectedIndex = index;
        	 $("input:radio[name='view_Permission'][value='"+Obj.visitRightType+"']").attr("checked",true);
            $("#view_album_class").val(Obj.classId);
            if(Obj!=null && Obj.canComment==1){
                $("#add_comment_block").show();
                $("#commentInput_btn").show();
            }
            else{
                $("#add_comment_block").hide();
                $("#commentInput_btn").hide();
            }
        }
    },
    
    /*
     * 编辑相册
     */
    modiflyAlbum:function(id){
        if(id==null){
            return;
        }
        Album.addAlbum(id);
    },

    /*
     * 上传照片
     * @id 选中的相册id
     */
    uploadphoto:function(id){
    	Album.checkFlashInside();
    	if(Album.AlbumList==null){
    		$.msgBox.alert( {title : "提示",msg : '该相册类别目前还没有创建任何相册<br /><a onclick="Album.addAlbum();" href="javascript:void(0);">马上去创建相册</a>',icon : "warning"});
    		return;
    	}
    	$("#nav").html("当前位置：个人主页 &gt; 相册 &gt; 上传照片");
    	id=(id==null)? Album.currentAlbumId:id;
    	Album.showContentPage(4);
    	Album.getsel_albumHtml(id);
    	
        var $sel_album=$("#sel_album");
        $sel_album.sSelect("sel_album");
        
    	var obj=Album.getAlbumObjById(id);
    	var tmp_tips=((obj!=null&&obj.photoTotal>0) || (Album.photoList!=null && Album.photoList.length>0))? '':'相册内还没有照片，';
    	tmp_tips+='现在就添加照片';

    	$("#upload_nonePhoto_Tips").html(tmp_tips);
    	
    	$("#to_create_album").click(function(){
            Album.addAlbum();
        });
    	if(swfu==null){
    		 Album.initSWFUpload($("#sel_album").val());
    	}
    	$("#uploadform1").attr("action",sys.context_path+"/album/photo_uploadPhoto.action");
    	$("#currentUserID").val(currentUserID);
        $("#webToken").val(webToken);
        $("#albumId").val($sel_album.val());

        $("#submitBtn").click(function(){
            var $f=$("input:file[name='Filedata']");
            var flg=false;
            
            if($("#sel_album").val()==null){
                $.msgBox.alert( {title : "提示",msg : "请先选择好相册，再上传。",icon : "warning"});
                return;
            }
            
            $.each($f,function(i,temp){                    
                if (temp.value!=""){
                    flg=true;
                }
            });
            if(flg){
                $("#albumId").val($("#sel_album").val());
                //$form.submit();
                var options = {
                    url: '/web4s/album/photo_uploadPhoto.action',
                    dataType: 'json',
                    success: function(res){Album.callback_uploadphoto(res);}
                };
                $("#uploadform1").ajaxSubmit(options);//使用ajax提交
            }
            else{
                $.msgBox.alert( {title : "提示",msg : "请选择文件，再上传。",icon : "warning"});
            }
        }).attr("disabled",true);       
        $("#sel_album").change(function(){
            $("#albumId").val($(this).val());
        });
        var tmpImg=new Image();
        $("#uploadform1 input").change(function(){
           Album.uploadformInputChang($(this));               
        });
        $("#go_batchUpload").click(function(){
            $("#simpleUpload").hide();
            $("#batchUpload").show();
        });
        $("#go_simpleUpload").click(function(){
            $("#simpleUpload").show();
            $("#batchUpload").hide();
            $("#resetBtn").click();
        });

    },
    
    uploadformInputChang:function($Obj){
        var chk=Album.checkSelectFile($Obj);
        var id=$Obj.attr("id");
        var tip_id=id.replace("file_","simple_tips_");
        if(chk=="-1"){
            $("#"+tip_id).html("<br>文件类型错误，请重新选择。");
            setTimeout(function(){
                $("#"+tip_id).html("");
                //IE无法改变value
                var file = $("#"+id);  
                file.after(file.clone().val(""));  
                file.remove();
                $("#"+id).change(function(){Album.uploadformInputChang($(this));});                
            }, 3000);
            $("#submitBtn").attr("disabled",true).addClass("disabled_minUpPhotoBtn");
        }
        else{
            $("#submitBtn").attr("disabled",false).removeClass("disabled_minUpPhotoBtn");
        }
        
    },
    
    /*
     * 检测选择的文件
     * @$file 正常返回0     
     */    
    checkSelectFile:function($file){
        var result="0";
        var filename=$file.val();
        var ext=web4s.getExtension(filename);
        var TypesArr=AllowedTypes.split(",");
        var flg=false;
        for(var i=0;i<TypesArr.length;i++){
            if(TypesArr[i]==ext.toLowerCase()){
                flg=true;                
                break;
            }
        }
        if(flg){result="1";}
        else{result="-1";}
        return result;
    },
    
    getFullPath:function(obj)
    {
        if (obj) {
            // ie
            if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                obj.select();
                return document.selection.createRange().text;
            }
            // firefox
            else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                if (obj.files) {
                    return obj.files.item(0).getAsDataURL();
                }
                return obj.value;
            }
            return obj.value;
        }
    },
    
    /**
     * 上传完毕方法
     */
    callback_uploadphoto:function(response){
        if(response.returnCode=="2006"){
            $.msgBox.alert( {title : "提示",msg : "您的相册容量已达到限定值，超出的照片无法继续上传。",icon : "warning"});
            return;
        }
        else if(response.returnCode=="2014"){
            $.msgBox.alert( {title : "提示",msg : "您无权限上传照片到该相册。",icon : "warning"});
            return;
        }
        else if(response.returnCode=="0"){
        	Album.addCommendInfo(response.albumId,"202");
        	Album.SWFUploadButton("hide");
            $.msgBox.prompt(
            {
               title: "提示",
               msg: "照片全部上传成功。",
               icon:'succeed',
               textYes:"完成",
               textNo:"继续",
               yesFun:function(){
            		Album.getAlbumList(null,null,null,Album.callback_getOneAlbumListData);
            		Album.getPhotoList(0,response.albumId);
            		Album.SWFUploadButton("show");
            	},
               noFun:function (){
            		Album.uploadphoto(response.albumId);
            		Album.SWFUploadButton("show");
            	},
               noFun:function (){
               		Album.uploadphoto(response.albumId);
               		Album.SWFUploadButton("show");
               },
               beforClose:function(){
            	   Album.SWFUploadButton("show");
               }
             });
            CurActionId="";
        }
    },
    
     /**
     * 检测是否安装flash插件
     */
    checkFlashInside:function(){
    	var f="";
    	var n=navigator;
        if (n.plugins && n.plugins.length) {
            for (var ii=0;ii<n.plugins.length;ii++) {
                if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {
                    f=n.plugins[ii].description.split('Shockwave Flash ')[1].split(' ')[0];
                    break;
                }
            }
        } else if (window.ActiveXObject) {
            for (var ii=10;ii>=2;ii--) {
                try {   
                    var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
                    if (fl) {f=ii + '.0'; break; }
                }
                catch(e) {}
            }
        }

    	
    	if (f=="") {
    		$.msgBox.alert( {title : "提示",msg : "您没有安装Flash插件，无法使用批量上传。<br />请点击<a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>下载安装</a>",icon : "warning"});
    		return false;
    	}
    	else{
    		//$.msgBox.alert( {title : "提示",msg : "你已经安装了Flash插件",icon : "warning"});
    		//return true;
    	}
    },
    
    swfCancelQueue:function(){
    	if(swfu){
    		swfu.cancelQueue();
    	}
    	if(swfu1){
    		swfu1.cancelQueue();
    	}
    },
    
    /**
     * 初始化SWFupload
     * @param albumId
	 */
    initSWFUpload:function(albumId){
    	var getSettings=function(Btnplaceholder){
	        var settings = {
                flash_url : sys.context_path+"/album/swfupload/swfupload.swf",
                upload_url: sys.context_path+"/album/photo_uploadPhoto.action",
                post_params: {"currentUserID" :currentUserID,"webToken":webToken,"postType":"flash","albumId":albumId},
                file_size_limit : "2 MB",
                file_types : "*.jpg;*.jpeg;*.gif;*.png",
                file_types_description : "All Files",
                file_upload_limit : 100,
                file_queue_limit : 0,
                custom_settings : {
                    progressTarget : "fsUploadProgress",
                    cancelButtonId : "btnCancel",
                    startUploadButtonId:"Holder_uploadBtn"
                },
                debug: false,

                // Button settings
                button_image_url: "../images_3/upPhotoBg.gif",
                button_width: "84",
                button_height: "24",
                button_placeholder_id: Btnplaceholder,
                
                button_text: '<span class="theFont">添加照片</span>',
                //button_text_style: ".theFont { font-size: 12; }",
                button_text_left_padding: 12,
                button_text_top_padding: 3,
                
                // The event handler functions are defined in handlers.js
                file_queued_handler : fileQueued,
                file_queue_error_handler : fileQueueError,
                file_dialog_complete_handler : fileDialogComplete,
                upload_start_handler : uploadStart,
                upload_progress_handler : uploadProgress,
                upload_error_handler : uploadError,
                upload_success_handler : uploadSuccess,
                upload_complete_handler : uploadComplete,
                queue_complete_handler : queueComplete  // Queue plugin event
	        };
	
	        return settings;
    	};    	
    	swfu = new SWFUpload(getSettings("spanButtonPlaceHolder"));
    	//swfu1 = new SWFUpload(getSettings("spanButtonPlaceHolder1"));
    },
    
    
    
    swfuStartUpload:function(){
        try{
            var albumId=$("#sel_album").val();
            swfu.setPostParams({"currentUserID" :currentUserID,"webToken":webToken,"postType":"flash","albumId":albumId});
            swfu.startUpload();
        }
        catch(e){}
    },
    
    /*
     * 查询指定用户的相册列表
     */
    getAlbumList : function(page,userid,classId,cb) {
        Album.pageSize=20;
        page=1;
        var cbfun=(cb==null)? Album.callback_getAlbumList:cb;
        var url = sys.context_path+ "/album/album_findAlbumListByUserId.action";
        var myObj={"page.currentPage":page,"page.perPageSize":999999};
        if(classId!=null){
        	myObj["classId"]=classId;
        }        
        if(userid!=null){
        	myObj["visitorUserId"]=userid;
        }
        Album.sendAjax(url,myObj,cbfun,null,"get");
    },

    callback_getOneAlbumListData:function(response){
    	 if(response.returnCode=="0"){            
             if(response.albumList!=null && response.albumList.length>0){
            	 Album.AlbumList=response.albumList;
             }
         }
    },
    
    callback_getAlbumList:function(response){
        Album.showContentPage(1);
        $("#album_list_Pages").html("");
        $("#nav").html("当前位置：个人主页 &gt; 相册 ");
        $("#album_index_toolbar").show();
    	$("#favoriten_toolbar").hide();
    	visitorId="";
        if(response.returnCode=="0"){            
            if(response.albumList!=null && response.albumList.length>0){
                Album.AlbumList=response.albumList;
                if(response.albumList.length==1){ 
                        $("#sort_album_btn").hide(); 
                }
                Album.getAlbumHtml();
                if (response.page.recordCount > Album.pageSize) {
                    $("#album_list_Pages").pagination(response.page.recordCount, {
                        first_text : "首页",
                        prev_text : "上一页",
                        next_text : "下一页",
                        last_text : "尾页",
                        ellipse_text : "...",
                        current_page : Album.curPageNum,
                        num_edge_entries : 2,
                        num_display_entries : 2,
                        items_per_page : Album.pageSize,
                        callback : Album.getAlbumHtml
                    });
                }
            }
            else{
                Album.AlbumList=null;
                if(visitorId!=""){            
                    $("#list_container").html("<div>欢迎光临！<br>目前我的相册还没有上传任何照片，感谢您的关注！</div>");
                }
                else{
                    $("#list_container").html('<div style="line-height:1.6;">您目前还没有创建任何相册，<a href="javascript:void(0);" onclick="Album.addAlbum();">马上去创建相册</a></div>');
                }
            }
            
            var $tmp;
            if(response.albumClassInfo!=null && response.albumClassInfo!=""){
            	var count=0;
                $.each(response.albumClassInfo,function(i,temp){
                	count+=temp.albumCountNum;
                    $tmp=$("#classId_"+temp.classId+" span");
                    $tmp.html(" ("+temp.albumCountNum+")");                    
                });
                $("#myAlbum_count").html("("+count+")");
                $("#albumSys_info_num").html("("+count+")");
            }
            else{
                $.each($("#albumClass_list li"),function(i,temp){                    
                    $(this).find("span").html(" (0)");
                });                
            }
            
            
            /*if(response.classId!=null && response.classId!=""){
                var curClassName=" &gt; "+$("#classId_"+response.classId).attr("title");
                $("#curClassName").html(curClassName);
                $("#list_option").show();
            }
            else{
                $("#list_option").hide();
            }*/
        }
    },
    
    /*
     * 通过li进行分页显示
     * @pageNum 当前页码
     */
    getAlbumHtml:function(pageNum){
        Album.curPageNum=pageNum;
        pageNum=(pageNum==null)? 1:(pageNum+1);
        
        var startNum = Album.pageSize * (pageNum - 1);
        var endNum=((Album.pageSize * pageNum - 1)>=Album.AlbumList.length)? (Album.AlbumList.length-1):(Album.pageSize * pageNum - 1);        
        var listHtml="",tmp,dofun=""; 
        for (var i=startNum; i<=endNum; i++) {            
            tmp=Album.AlbumList[i];
            if(tmp.photoTotal>0){
                coverURL=tmp.coverUrl.replace("/largephoto","/smallphoto");
            }
            else{
                coverURL="../images_3/albumNophoto.gif";
            }

            if(visitorId!="" && tmp.visitRightType=="3"){
                coverURL="../images/album/no_right_s.png";
            }
            else if(visitorId!="" && tmp.visitRightType=="-1"){
                coverURL="../images/album/no_visitAll_s.png";
            }

            if(visitorId!="" && (tmp.visitRightType=="1" || tmp.visitRightType=="2")){
                dofun='Album.getPhotoListByVisitRight('+tmp.albumId+');';
            }
            else{
                dofun='Album.getPhotoList(0,'+tmp.albumId+');';
            }
         listHtml+='<li>'
         +'    <div class="album_list_bg"><a onclick="'+dofun+'" href="javascript:void(0);" title="'+tmp.name+'"><img title="'+tmp.name+'" src="'+coverURL+'" /></a></div>'
         +'    <div class="album_name" title="'+tmp.name+'"><a onclick="'+dofun+'" href="javascript:void(0);">'+web4s.subStr(tmp.name,13)+'</a></div>'
         +'    <span class="album_collect">共'+tmp.photoTotal+'张　评论'+'<span class="remarkCount">'+tmp.remarkCount+'</span>'+'条</span>';
         
         if(visitorId==""){
             listHtml+='<div class="album_operation">'
             +'            <a onclick="Album.modiflyAlbum(\''+tmp.albumId+'\');" title="修改相册信息" href="javascript:;">编辑</a>&nbsp;'
             +'            <a onclick="Album.deleteAlbum(\''+tmp.albumId+'\')" title="删除相册" href="javascript:;">删除</a>'
             +'        </div>';
         }
         
         listHtml+='</li>';
        }                
        $("#list_container").html(listHtml);
        $("#list_container img").load(function(){
            Album.resizeImage($(this).get(0),140,140);
        });
        
        $("#list_container li").hover(
        		function(){
        			$(this).find('.album_operation').show();
        		},
        		function(){
        			$(this).find('.album_operation').hide();
        		}
        ); 
        Album.setMoveToMenu("move_to_ul");
    },

    /**
     * 设置移动菜单
     * @param id
     */
    setMoveToMenu:function(id){
    	if(id==null){
    		return;
    	}
        //设置移动菜单
        var move_to_html="";
        $.each(Album.AlbumList,function(i,temp){
        	if(id=="move_to_ul"){
        		move_to_html+='<li id="moveTo_albumId_'+temp.albumId+'" onclick="Album.photoToolbarAction(\'move\',\''+temp.albumId+'\');">'+temp.name+'</li>';
        	}
        	else {
        		move_to_html+='<li id="moveTo_albumId_'+temp.albumId+'" onclick="Album.photoToolbarAction(\'view_move\',\''+temp.albumId+'\');">'+temp.name+'</li>';
        	}
        });
        $("#"+id).html(move_to_html).find('li').hover(
            function(){
                $(this).css('background','#deeef6');
            },
            function(){
                $(this).css('background','none');
        });
	
    },
    
    /**
     * 相册排序
     * @type 排序类型 : 按相册名称(1↑　2↓)，按创建时间(3↑　4↓)　 
     */
    getSortAlbumList : function(type) {
    	if(type==null){
    		type="1";
    	}
        Album.pageSize=20;
        page=1;
        var classId;
        var url = sys.context_path+ "/album/album_findAlbumListByUserId.action";
        var myObj={"page.currentPage":page,"page.perPageSize":999999,"classId":classId,"visitorUserId":visitorId,"orderType":type};        
        Album.sendAjax(url,myObj,Album.callback_getSortAlbumList,null,"get");
    },
    
    callback_getSortAlbumList:function(response){
    	$("#sort_save_btn").unbind("click").bind("click",function(){Album.sortAlbum_do();});
    	if(response.returnCode=="0"){
	    	var listHtml="",tmp,dofun=""; 
	        for (var i=0; i<response.albumList.length; i++) {            
	            tmp=response.albumList[i];
	            if(tmp.photoTotal>0){
	                coverURL=tmp.coverUrl.replace("/largephoto","/smallphoto");
	            }
	            else{
	                coverURL="../images_3/albumNophoto.gif";
	            }
	            
	           
	         listHtml+='<li albumId="'+tmp.albumId+'" style="cursor: move;">'
	         +'    <div class="album_list_bg"><a class="album_bgImg" title="'+tmp.name+'"><img title="'+tmp.name+'" src="'+coverURL+'" /></a></div>'
	         +'    <div class="album_name" title="'+tmp.name+'">'+web4s.subStr(tmp.name,13)+'</div>'
	         +'</li>';
	        }                
	        $("#albumSort_list_container").html(listHtml);
	        $("#albumSort_list_container").sortable();
			$("#albumSort_list_container").disableSelection();
    	}
		Album.showContentPage(5);
    },    
    
    sortAlbum_do : function() {
    	var ids="";
    	var $it=$("#albumSort_list_container li"); 
		$.each($it,function(i,v){
			ids+=","+i+"_"+$(v).attr("albumId");
		});        
        var url = sys.context_path+ "/album/album_saveSortAlbum.action";
        var myObj={
        	ids:ids.substring(1)	
        };
        Album.sendAjax(url,myObj,Album.callback_sortAlbum_do,null,"POST");
        
    },
    
    callback_sortAlbum_do:function(response){
    	 if(response.returnCode=="0"){
             $.msgBox.alert( {title : "提示",msg : "相册排序保存成功。",icon : "succeed"});
         }
    	 else{
    		 $.msgBox.alert( {title : "提示",msg : "相册排序保存失败，请稍候再试。",icon : "warning"});
    	 }
    },
    
    //取得相册列表的下拉框
    getsel_albumHtml:function(selId){ 
        try{
        	var select = $('#sel_album').get(0);      
            var index =0;
            $.each(Album.AlbumList,function(i,temp){
                var opt = new Option(temp.name,temp.albumId);
                if(selId==temp.albumId){
                    index=i;
                }
                select[i] = opt;               
            });
            select.selectedIndex = index;
            $('#sel_album').sSelect("sel_album");
        }catch(e){}
    },  

    /*
     * 取得相册名称
     * @albumId
     */
     getAlbumNameById:function(Id){              
         var name="";
         try{
             for(var i=0;i<Album.AlbumList.length;i++){
                 temp=Album.AlbumList[i];
                 if(temp.albumId==Id){
                    name=temp.name;
                    break;
                 }
             }
             return name;  
         }catch(e){}
     },
     
     /*
      * 取得相册对象
      * @albumId
      */
      getAlbumObjById:function(Id){              
          var Obj=null;
          try{
              for(var i=0;i<Album.AlbumList.length;i++){
                  temp=Album.AlbumList[i];
                  if(temp.albumId==Id){
                	  Obj=temp;
                     break;
                  }
              }
              return Obj;  
          }catch(e){}
      },     

      /**
       * 查询好友的相册信息
       * @albumId
       * @friendUId 查看好友相册的传入userId
       */
      getAlbumInfo : function(albumId,friendUId) {
          var url = sys.context_path+ "/album/album_findAlbumInfoById.action";
          var myObj={"albumId":albumId,"friendUId":friendUId};          
          Album.sendAjax(url,myObj,Album.callback_getAlbumInfo,null,"get");
      },
      
      callback_getAlbumInfo:function(response,textStatus){        
          if(response.returnCode=="0"){
          	Album.viewAlbumInfo(null,response.albumInfo);          	
          }
      },      
     
    /*
     * 查询指定的照片列表
     * @page
     * @albumId
     * @Answer 
     * @type 0只取数据,其它取数据及显示
     * @friendUId 查看好友相册的传入userId
     */
    getPhotoList : function(page,albumId,Answer,type,friendUId) {
        Album.pageSize=20;
        page=1;
        var cbfun=Album.callback_getPhotoList;
        var url = sys.context_path+ "/album/album_findAlbumPhotoByAlbumId.action";
        var myObj={"albumId":albumId,"page.currentPage":page,"page.perPageSize":999999};
        if(Answer!=null){
            myObj["album.visitRightAnswer"]=Answer.content;
            myObj["validateCode"]=Answer.validateCode;
        }
        if(friendUId!=null){
            myObj["visitorUserId"]=friendUId;
            visitorId=friendUId;
        }
        else{
        	visitorId="";
        }
        if(type!=null&&type==0){
        	cbfun=Album.callback_getDatePhotoList;
        }
        else if(type!=null&&type==1){
        	cbfun=Album.callback_getDefaultPhotoList;
        }
        Album.sendAjax(url,myObj,cbfun,null,"get");
    },
    
    callback_getDefaultPhotoList:function(response,textStatus){        
        if(response.returnCode=="0"){
        	Album.photoList=response.photoList;
        	Album.showPhotoList(visitorAlbumId,Album.photoList[0].photoId);
        }
    },
    callback_getDatePhotoList:function(response,textStatus){        
        if(response.returnCode=="0"){
        	Album.photoList=response.photoList;
        	Album.showCurPhoto($("#photo_view_list .highlight").attr("id").replace("Photo_",""),1);
        }
    },
    
    callback_getPhotoList:function(response,textStatus){
        $("#photo_list_Pages").html("");
        if(response.returnCode=="5003"){
            $("#showMessage_tip").html("验证码错误，请重新输入。");
            return;
        }
        else if(response.returnCode=="5001"){
            $("#showMessage_tip").html("回答问题错误，请重新输入。");
            return;
        }
        else if(response.returnCode=="5002"){
            $.msgBox.alert( {title : "提示",msg : "该相册仅主人可以访问。",icon : "warning"});
            return;
        }
        else if(response.returnCode=="5004"){
            $.msgBox.alert({ title: "提示", msg: "该内容涉嫌违规，已禁止访问。",icon : "warning" });
            return
        }        
        else if(response.returnCode=="0"){
            var albumId=response.albumId;
            Album.currentAlbumId=albumId;
            if(response.visitRight=="true"){
                $.msgBox.close();
            }
            
            if(response.photoList!=null && response.photoList.length){
                Album.photoList=response.photoList;
                Album.getPhotoListHtml();
                
                if (response.page.recordCount > Album.pageSize) {
                    $("#photo_list_Pages").pagination(response.page.recordCount, {
                        first_text : "首页",
                        prev_text : "上一页",
                        next_text : "下一页",
                        last_text : "尾页",
                        ellipse_text : "...",
                        current_page : Album.curPageNum,
                        //num_edge_entries : 2,
                        //num_display_entries : 2,
                        items_per_page : Album.pageSize,
                        callback : Album.getPhotoListHtml
                    });
                }
                
                $("#edit_mode_btn").show();
                Album.updateLocalAlbumObj({"albumId":albumId,"photoTotal":response.photoList.length});
            }
            else{
                Album.photoList=null;
                if(visitorId!=""){            
                    $("#album_list_container").html("<div>欢迎光临！<br>目前我的相册还没有上传任何照片，感谢您的关注！</div>");
                }
                else{
                	Album.uploadphoto();
                	return;
                }
                $("#edit_mode_btn").hide();
            }
            $("#go_back_btn").unbind().bind("click",function(){
                Album.getAlbumList();
                if($("#edit_mode_btn").html()=="退出管理"){
                    $("#edit_mode_btn").click();
                }
            });
        	//编辑相册属性
        	$('.album_editInputBtn').click(function(){
        		var _parent = $(this).parent();
        		_parent.hide().siblings().show().find('.album_editElement').attr('value',_parent.find('span').html()).focus();
        	});
        	$('#albumName_edit_btn,#albumDesc_edit_btn').click(function(){
        		var _parent = $(this).parent();
        		_parent.hide().siblings().show().find('span').html(_parent.find('.album_editElement').attr('value'));
        	});
        	
        	//$('#view_album_class').click(function(){
        		//var _parent = $(this).parent();
        		//alert(_parent.siblings());
        		//var tt=_parent.siblings().show().find('span').html(_parent.find('.album_editElement').attr('value'));
        		//_parent.hide().siblings().show().find('span').html(_parent.find('.album_editElement').attr('value'));
        		
        	//});
        	
        	$('.album_cancelEdit').click(function(){
        		var _parent = $(this).parent();
        		_parent.hide().siblings().show();
        	});	
            //$("#curListName").html(' &gt; <a id="album_'+albumId+'" onclick="Album.getPhotoList(0,'+albumId+')" href="javascript:;"><strong>'+Album.getAlbumNameById(albumId)+'</strong></a>');            
            //$("#list_option").show();
            Album.showContentPage(2);
            Album.viewAlbumInfo(albumId);
            Album.getPhotoFootMarkByCId(albumId);
            $("#Remark_source").val("0");
            $("#Remark_baseId").val(albumId);
            Album.getRemarkList();
            if(visitorId!=""){
            	Album.showAlbumContent(2);
            	Album.getAlbumInfo(albumId,visitorId);
            	var info=Album.getFriendAlbumListById(albumId);
				if(info!=null){
	            	$("#nav").html("当前位置：["+info.nickName+"]的个人主页 &gt; 相册 ");
            	}
            }
            else{
            	Album.showAlbumContent(1);
            }
            
        }
    },

    /*
     * 通过li进行分页显示
     * @pageNum 当前页码
     */
    getPhotoListHtml:function(pageNum){
        Album.curPageNum=pageNum;
        pageNum=(pageNum==null)? 1:(pageNum+1);
        
        //通过li进行分页显示
        var startNum = Album.pageSize * (pageNum - 1);
        var endNum=((Album.pageSize * pageNum - 1)>=Album.photoList.length)? (Album.photoList.length-1):(Album.pageSize * pageNum - 1);        
        var listHtml="",tmp;        
        for (var i=startNum; i<=endNum; i++) {            
             tmp=Album.photoList[i];                                  
             listHtml+='<li>'
             +'    <div class="photo_list_bg"><a onclick="Album.showPhotoList('+tmp.albumId+','+tmp.photoId+');" href="javascript:void(0);" title="'+tmp.photoName+'"><img id="Small_img_'+tmp.photoId+'" src="'+tmp.photoURL.replace("/largephoto","/smallphoto")+'" /></a><div>'
             +'    <div class="album_name" style="display: none;"><input type="checkbox" value="'+tmp.photoId+'" name="pic_checkbox" id="check_photoId_'+tmp.photoId+'">'
             +'    <label for="check_photoId_'+tmp.photoId+'" class="author-display">'+web4s.subStr(tmp.photoName,12)+'</label></div>'
             +'    <div class="photo_name" title="'+tmp.photoName+'">'+web4s.subStr(tmp.photoName,13)+'</div>';
             
             /*if(visitorId==""){
                 listHtml+='<span class="photo_edit">'
                 +'       <a href="javascript:;" title="修改照片信息" class="c_tx" onclick="Album.modiflyPhoto('+tmp.photoId+');">编辑</a>&nbsp;'            
                 +'       <a href="javascript:;" title="删除照片" class="c_tx statistic_albumlist" onclick="Album.deletePhoto('+tmp.photoId+')">删除</a>'        
                 +'    </span>'
             }*/
             listHtml+='</li>';
        }
        
        $("#album_list_container").html(listHtml);
        $("#album_list_container img").load(function(){Album.resizeImage($(this).get(0),140,140);});
        if($("#edit_mode_btn").html()=="退出管理"){
            Album.showEditMode(0);
        }
    },
    
    
    /*
     * 通过权限访问相册
     * @albumId
     */
    getPhotoListByVisitRight : function(albumId) {
        var Obj=Album.getAlbumById(albumId);
        if(Obj.visitRightType=="2"){
            if(BlogMap.checkMyFriend(visitorId)==false){
                $.msgBox.alert({ title: "提示", msg: "该相册仅好友可以访问。" });
            }
            else{
                Album.getPhotoList(0,Obj.albumId);
            }
            return
        }
        var tmp_htm='<div class="update_photo">'
                +'      <input type="hidden" name="user_albumId" id="user_albumId" value="'+albumId+'"/>'
                +'      <p><span class="form_name">问题：</span>'+Obj.visitRightQuestion+'</p>'
                +'      <p class="uc_fill_p"><span class="form_name">回答：</span><input type="text" id="user_Answer" name="user_Answer" class="uc_fillTextMiddling" /></p>'
                +'      <p class="uc_fill_p"><span class="form_name">验证码：</span><input type="text" class="uc_fillTextMin" name="user_validateCode"  id="user_validateCode" maxlength="4" />'
                +'          <img src="'+sys.context_path+'/dync_captcha.jpg" class="home_verify_code" align="absbottom" alt="验证码" id="captchaimg_reply" />' 
                +'          <a href="javascript:web4s.refreshCaptchaImg(\'captchaimg_reply\');">看不清，换一张！</a>'
                +'      </p>'
                +'      <p id="showMessage_tip"></p>'
                +'</div>';
        $.msgBox.prompt(
        {
            title: "回答问题",
            autoClose:false,
            width:420,
            html:tmp_htm ,
            yesFun:function(){Album.visitRight_do();  }
        });
         
         $("#user_validateCode").keydown(function(event)
         {
             if (event.keyCode == 13) 
             {
                 Album.visitRight_do();
                 return false;
             }
         });
    },
    
    visitRight_do : function() {
        var user_Answer=$("#user_Answer").val();
        var validateCode=$("#user_validateCode").val();
        var user_albumId=$("#user_albumId").val();
        var sourceType=1;
        if (user_Answer == null || $.trim(user_Answer)=="") {
            $("#showMessage_tip").html("回答内容不能为空。");
            return;
        }        
        else if (validateCode=="") {
            $("#showMessage_tip").html("请输入验证码。");
            return;
        }
        
        //var url = sys.context_path+ "/album/album_addReply.action";                    
        //Album.sendAjax(url,myObj,Album.callback_addReply_do,null,"POST");
        var Asnwer={"content":user_Answer,"validateCode":validateCode };
        Album.getPhotoList(0,user_albumId,Asnwer);
    },
    
    /*
     * 删除相册
     * @albumId
     */
    deleteAlbum:function(albumId){
        var url = sys.context_path+ "/album/album_deleteAlbum.action";
        var myObj={"albumId":albumId};
        var Obj=Album.getAlbumById(albumId);
        var pCount=0;
        if(Obj!=null){
            pCount=Obj.photoTotal;
        }
        if(pCount>0){
            $.msgBox.prompt(
            {
               title: "提示",
               width:420,
               msg: " 确定删除该相册？相册中有"+pCount+"张照片<br>相册删除后将无法恢复",
               icon:"question",
               yesFun:function(){                           
                   Album.sendAjax(url,myObj,Album.callback_deleteAlbum,null,"get");
               }
             });
        }
        else{
            Album.sendAjax(url,myObj,Album.callback_deleteAlbum,null,"get");
        }
   },
   callback_deleteAlbum:function(response){
       if(response.returnCode=="0"){
           Album.getAlbumList();
           Album.getAlbumSysInfo();
           Album.getClassList(1);
       }
   },
   
   /*
    * 删除照片
    * @photoIds 照片id,多个以“,”分隔
    */
   deletePhoto:function(photoIds){
       if(photoIds==null || photoIds==""){
           $.msgBox.alert({ title: "提示", msg: "请选择需要删除的照片。" });
           return;
       }
       else{
           $.msgBox.prompt(
            {
               title: "提示",
               msg: " 确定删除该照片？<br>照片删除后将无法恢复",
               icon:"question",
               yesFun:function(){
                    var url = sys.context_path+ "/album/album_deletePhoto.action";
                    var myObj={"photoIds":photoIds};
                    Album.sendAjax(url,myObj,Album.callback_deletePhoto,null,"get"); 
               }
             });
       }
   },
   
   callback_deletePhoto:function(data){
       if(data.returnCode=="0"){
    	   Album.getPhotoList(0,Album.currentAlbumId);
    	   //coverUrl=$("#photo_view_list .highlight").find("img").attr("src");
           //Album.modiflyAlbumCover(curAlbumId,coverUrl);
    	   Album.updateViewPhoto();
       }
   },
   
   /**
    * 更新照片预览页面
    */
   updateViewPhoto:function(){
	   if($("#main_photo_show div:visible").length>0){
		   $("#Bphoto_viewBtn_next").click();
		   $("#photo_view_list .highlight").prev().remove();
		   $("#photo_view_total").html($("#photo_view_list span").length);
		  
	   }
	   
	   
   },
   
   /**
    * 编辑照片
    */
   modiflyPhoto:function(photoId){     
           var tmp=Album.getPhotoById(photoId);
           if(tmp==null){
               return;
           }
           var tmp_htm='<div title="'+tmp.photoName+'" class="update_photo"><input type="hidden" name="photoId" id="photoId" value="'+tmp.photoId+'"/>'                   
                   +'      <p><label class="form_name" for="photoName">名称：</label><input type="text" value="'+tmp.photoName+'" maxlength="20" class="uc_fillTextMiddling" name="photoName" id="photoName" value="'+tmp.photoName+'"></p>'
                   +'      <p><label class="form_name" for="photoDesc">描述：</label><textarea rows="6" id="photoDesc" name="photoDesc" class="uc_fillArea">'+web4s.HTMLDeCode(tmp.photoDesc)+'</textarea><span class="count_txt"><span id="count_photoDesc">0</span>/500</span></p>'
                   +'      <p><label class="form_name" for="photoTag">标签：</label><input type="text" maxlength="50" class="uc_fillTextMiddling" name="photoTag" id="photoTag" value="'+tmp.photoTag+'"></p>'
                   +'      <p id="editphto_showTips" class="bg c_tx notice" style=""></p>'
                   +'</div>';
           $.msgBox.prompt(
           {
               title: "编辑照片",
               width:430,
               autoClose:false,
               html:tmp_htm ,
               yesFun:function(){Album.modiflyPhoto_do();  }
           });
           $("#photoDesc").bind("keyup", function(){
               var desc=$(this).val();
               if(desc.length>500){
                   $(this).val(desc.substring(0,500));
               }
               else{
                   $("#count_photoDesc").html(desc.length);
               }                 
           });
           $("#count_photoDesc").html($("#photoDesc").val().length);
   }, 
   
   simpleModiflyPhoto:function(photoId){
	   var tmp=Album.getPhotoById(photoId);
       if(tmp==null){
           return;
       }
       var photoDesc=$.trim($("#simple_photoDesc").val());
       var photoTag=$.trim($("#simple_photoTag").val());
       var photoName=$.trim($("#simple_photoName").val());
       if (photoName == null || $.trim(photoName)=="") {
    	   photoName=tmp.photoName;
       }
       if (photoDesc == null || $.trim(photoDesc)=="") {
    	   photoDesc=tmp.photoDesc;
       }
       if (photoTag == null || $.trim(photoTag)=="") {
    	   photoTag=tmp.photoTag;
       }
       if (photoDesc.length>500) {
           $.msgBox.alert({ title: "提示", msg: "照片描述内容长度不能超过500。" });
           return;
       }
       
       var url = sys.context_path+ "/album/album_modifyPhoto.action";
       var myObj={
               "photo.photoId": tmp.photoId,    
               "photo.photoName": photoName,
               "photo.photoDesc": web4s.HTMLEnCode(photoDesc),
               "photo.photoTag": photoTag
           };
           
       Album.sendAjax(url,myObj,Album.callback_modiflyPhoto,null,"POST"); 
      
   },
   
   modiflyPhoto_do:function(){
       var photoId=$("#photoId").val();
       var photoDesc=$.trim($("#photoDesc").val());
       var photoTag=$.trim($("#photoTag").val());
       var photoName=$.trim($("#photoName").val());
       if (photoName == null || $.trim(photoName)=="") {
           $("#editphto_showTips").html("请输入照片名称。");
           return;
       }
       if (photoDesc == null || $.trim(photoDesc)=="") {
           $("#editphto_showTips").html("请输入照片描述。");
           return;
       }
       
       var url = sys.context_path+ "/album/album_modifyPhoto.action";
       var myObj={
               "photo.photoId": photoId,    
               "photo.photoName": photoName,
               "photo.photoDesc": web4s.HTMLEnCode(photoDesc),
               "photo.photoTag": photoTag
           };
           
       Album.sendAjax(url,myObj,Album.callback_modiflyPhoto,null,"POST"); 
      
   },
   callback_modiflyPhoto:function(data){
       if(data.returnCode=="0"){
           $.msgBox.close();
           if(data.photoId!=null){
    		   Album.getPhotoList(0,Album.currentAlbumId,null,0);    		   
    	   }
       }
   },
   /*
    * 测试
    */
   
   /*
    *批量 移动照片
    */
   movePhotos:function(photoIds,albumId){       
       if (photoIds == null || albumId==null) {
           return;
       }
       var url = sys.context_path+ "/album/album_modifyPhoto.action";
       var myObj={
               "photoIds": photoIds,    
               "albumId": albumId
           };           
       Album.sendAjax(url,myObj,Album.callback_movePhotos,null,"POST"); 
       //Album.getPhotoList(albumId);
   },
   
   callback_movePhotos:function(data){
       if(data.returnCode=="0"){
           $.msgBox.alert({ title: "提示", msg: "照片移动成功，移动数量 "+data.photoIdsCount+" 张。" });
           Album.getPhotoList(0,Album.currentAlbumId);
    	   Album.updateViewPhoto();
           //setTimeout(function(){ Album.updateViewPhoto(); }, 500);           
       }
   },
   
   /**
    * 返回方法
    */
   backLinkAction:function(){
	   if(Album.prevPage.name=="manage_alumlist_page"){
		   Album.getPhotoList(0,Album.prevPage.albumId);
	   }
	   else if(Album.prevPage.name=="visitorUserPage"){		   
		   Album.getPhotoList(0,Album.prevPage.albumId,null,null,visitorId);
	   }
	   else if(Album.prevPage.name=="singleFavoritenPhoto"){
		   Album.getAlbumList();
	   }
	   else{
		   Album.getAlbumList();
	   }
	   Album.prevPage["name"]="";  
	   Album.prevPage["albumId"]="";
	   Album.prevPage["photoId"]="";
   },
   
   /**
    * 照片展示
    * albumId
    * photoId
    * sourcePage
    */
   showPhotoList:function(albumId,photoId,sourcePage){
	   if(visitorId==""){
		   Album.prevPage["name"]=$(".contentTopNoBg:visible").attr("id");
	   }
	   else if(sourcePage!=null){
		   Album.prevPage["name"]=sourcePage;
	   }
	   else{
		   Album.prevPage["name"]="visitorUserPage";
	   }
	   Album.prevPage["albumId"]=albumId;
	   Album.prevPage["photoId"]=photoId;
       Album.showContentPage(6);
       if(visitorId==""){
    	   $("#view_my_toolbar").show();    
    	   $("#view_f_toolbar").hide();
       }
       else{
    	   $("#view_my_toolbar").hide();
    	   $("#view_f_toolbar").show();
       }
       var listHtml="",tmp,Simgurl="",tmp_cls;
       var cur_order;
       for(var i=0;i<Album.photoList.length;i++){
            tmp=Album.photoList[i]; 
            Simgurl=tmp.photoURL.replace("/largephoto","/smallphoto");
            if(photoId==tmp.photoId){
                tmp_cls='class="highlight"';
                $("#big_photo_url").attr("src",tmp.photoURL);
                cur_order=i;
            }
            else{
                tmp_cls="";
            }
            listHtml+='<span name="order_'+i+'" id="Photo_'+tmp.photoId+'" '+tmp_cls+' title="'+tmp.photoName+'"><img id="sPhotoURL_'+tmp.photoId+'" src="'+Simgurl+'" /></span>';
       }
       var albumId=Album.photoList[0].albumId;
       var Lphoto="";
       var click_pid;
       $("#photo_view_list").html(listHtml);
       $("#photo_view_list span").click(function(){
           click_pid=$(this).attr("id").replace("Photo_","");
          $(this).addClass('highlight').siblings().removeClass("highlight");
          Album.showCurPhoto(click_pid);
       });
       $("#photo_view_list img").load(function(){Album.resizeImage($(this).get(0),65,48);});
       
       $("#go_back_btn").unbind().bind("click",function(){Album.getPhotoList(0,albumId);});
       $("#curListName").html(' &gt; <a href="javascript:;"><strong>'+Album.getAlbumNameById(albumId)+'</strong></a>');
       $("#photo_view_total").html(Album.photoList.length);
       //设置当前滚动条的位置
       //$('#photo_view_list').scrollLeft((cur_order/Album.perPageSize)*Album.perPageWidth);  
       Album.showPhotoAction("init");
       var tmp=Album.getAlbumById(albumId);
       if(visitorId!=""){
    	   tmp=Album.getFriendAlbumListById(albumId);
       }
       if(tmp!=null && tmp.canComment==1){
           $("#add_comment_block").show();
           $("#commentInput_btn").show();
       }
       else{
           $("#add_comment_block").hide();
           $("#commentInput_btn").hide();
       }
       Album.showCurPhoto(photoId);
   },
    
   /**
    * @Pid 照片id
    * @Ctype 1仅刷新照片内容及标题
    */
   showCurPhoto:function(Pid,Ctype){       
       var photo=Album.getPhotoById(Pid);
       if(photo==null){return;}      
       var titleEdit='',descEdit='';
       if(visitorId==""){
    	   titleEdit='<a class="editBtn album_editInputBtn" href="javascript:void(0)"></a>';
    	   descEdit='<a class="editBtn album_editInputBtn" href="javascript:void(0)"></a>';
       }
       var tmp_htm=''
       +'<div class="big_photo_date">上传于：'+photo.photoAddDate+'</div>'
     //+'  &nbsp;&nbsp;<a onclick="BlogMap.reportInfo('+photo.photoId+',2)" href="javascript:;" class="date">举报</a>'
       +'<ul class="bigPhotoEditWrap">'
       +'	<li>'
       +'      <span class="photoEditTitle">'+photo.photoName+'</span>'+titleEdit
       +'   </li>'
       +'	<li style="display:none;"><input type="text" id="simple_photoName" class="album_editElement" />　<a href="javascript:void(0)" onclick="Album.simpleModiflyPhoto('+Pid+');"class="minStyleBtn ">确定</a>'
       +'		<a href="javascript:void(0)" class="album_cancelEdit">取消</a></li>'
       +'</ul>'
       +'<ul class="bigPhotoEditWrap">'
       +'	<li><span class="darkGrayFont">'+web4s.HTMLDeCode(photo.photoDesc)+'</span>'+descEdit+'</li>'
       +'	<li style="display:none;"><textarea rows="3" id="simple_photoDesc" class="album_editElement"></textarea>'
       +'	<br />'
       +'		<a href="javascript:void(0)" onclick="Album.simpleModiflyPhoto('+Pid+');" class="minStyleBtn">确定</a><a href="javascript:void(0)" class="album_cancelEdit">取消</a></li>'
       +'</ul>';					
       
       $("#photo_content").html(tmp_htm);
       $('.album_editInputBtn').click(function(){
   		var _parent = $(this).parent();
   		_parent.hide().siblings().show().find('.album_editElement').attr('value',_parent.find('span').html()).focus();
	   	});
	   	$('#albumName_edit_btn,#albumDesc_edit_btn').click(function(){
	   		var _parent = $(this).parent();
	   		_parent.hide().siblings().show().find('span').html(_parent.find('.album_editElement').attr('value'));
	   	});
	   	$('.album_cancelEdit').click(function(){
    		var _parent = $(this).parent();
    		_parent.hide().siblings().show();
    	});
   	
       if(Ctype==null){
	       $("#photoLoading").show();
	       $("#big_photo_url").attr("src",photo.photoURL);             
	       $("#Remark_source").val("1");
	       $("#Remark_baseId").val(photo.photoId);
	       $("#Remark_content").val("");
	       $("#validateCode").val("");
	       $("#photo_view_currentNum").html(parseInt($("#Photo_"+Pid).attr("name").replace("order_",""))+1);
	       Album.getRemarkList(photo.photoId);
	       Album.setMoveToMenu("viewmove_to_ul");
       }
   },
   
   showPhotoAction:function(actid){
       var $photo_view_list=$('#photo_view_list');
       switch(actid){
       case "first":
           $photo_view_list.scrollLeft(0);
           break;
       case "prev":               
           $photo_view_list.scrollLeft($photo_view_list.scrollLeft()-Album.perPageWidth);
           break;
       case "next":               
           $photo_view_list.scrollLeft($photo_view_list.scrollLeft()+Album.perPageWidth);
           break;
       case "last":
           $photo_view_list.scrollLeft($("#photo_view_list span").length*Album.perPageWidth);
           break;    
       case "showPrev":
           var $curphoto=$("#photo_view_list .highlight").prev();
           if($curphoto.length!=0){
               var orderNum=$curphoto.attr("name").replace("order_","");
               var curpage = (orderNum % Album.perPageSize) ? parseInt(orderNum/Album.perPageSize) : (orderNum/Album.perPageSize);
               var leftNum=(orderNum>Album.perPageSize-1)? curpage*Album.perPageWidth:0;
               $curphoto.click();
               $photo_view_list.scrollLeft(leftNum);
           }
           break;
       case "showNext":
           var $curphoto=$("#photo_view_list .highlight").next();
           if($curphoto.length!=0){
               var orderNum=$curphoto.attr("name").replace("order_","");
               var curpage = (orderNum % Album.perPageSize) ? parseInt(orderNum/Album.perPageSize) : (orderNum/Album.perPageSize);
               var leftNum=(orderNum>Album.perPageSize-1)? curpage*Album.perPageWidth:0;
               $curphoto.click();
               $photo_view_list.scrollLeft(leftNum);
           }
           break;
       case "init":
           var $curphoto=$("#photo_view_list .highlight");
           if($curphoto.length!=0){
               var orderNum=$curphoto.attr("name").replace("order_","");
               var curpage = (orderNum % Album.perPageSize) ? parseInt(orderNum/Album.perPageSize) : (orderNum/Album.perPageSize);
               var leftNum=(orderNum>Album.perPageSize-1)? curpage*Album.perPageWidth:0;               
               $photo_view_list.scrollLeft(leftNum);
           }
           break;     
       }
       
   },
   
   
   /**
    * 添加评论
    *
    */
   addRemark : function() {
       var remarkContent=$("#Remark_contentContent").val();
       var validateCode=$("#validateCode").val();
       var Remark_baseId=$("#Remark_baseId").val();
       var sourceType=$("#Remark_source").val();	//0相册、1照片
       if (remarkContent == null || $.trim(remarkContent)=="") {
           $.msgBox.alert({title : "提示", msg : "评论内容不能为空。",icon : "warning"});
           return;
       }
       if (remarkContent.length>150) {
           $.msgBox.alert({title : "提示", msg : "评论内容不能超过150。",icon : "warning"});           
           return;
       }
       /*if (validateCode=="") {
           $.msgBox.alert({title : "提示", msg : "请输入验证码。",icon : "warning"});            
           return;
       }*/
       
       var url = sys.context_path+ "/album/album_addRemark.action";
       var myObj={
               "remark.baseId": Remark_baseId,    
               "remark.content": web4s.HTMLEnCode(remarkContent),
               "remark.sourceType": sourceType,
               "remark.userId": Album.UserId,
               "validateCode":validateCode
               
               
           };
           
       Album.sendAjax(url,myObj,Album.callback_addRemark,null,"POST");                 
   },
   
   callback_addRemark:function(data){
       if(data.returnCode=="0"){
           $("#Remark_contentContent").val("").focus();
           $("#validateCode").val("");
           //Album.callback_getRemarkList(data);
           Album.getRemarkList();
       }
       else if(data.returnCode=="4002"){
           $.msgBox.alert({title : "提示", msg : "验证码错误，请重新输入。",icon : "warning",
               yesFun:function(){$("#validateCode").val("").focus();}
           });            
           return;
       }
       else if(data.returnCode=="4013"){
           $.msgBox.alert({title : "提示", msg : "该相册未开放评论。",icon : "warning"});            
           return;
       }
       else if(data.returnCode=="-1001"){
           $.msgBox.alert({title : "提示", msg : "您的评论次数已达到限制。",icon : "warning"});            
           return;
       }
   },
   
   /*
    * 删除评论，同步删除相应的回复
    * @photoIds 照片id,多个以“,”分隔
    */
   deleteRemark:function(remarkId){
       if(remarkId==null || remarkId==""){
          return;
       }
       else{
           $.msgBox.prompt(
            {
               title: "提示",
               msg: " 确定删除该评论？<br>评论的回复信息将会一并删除。",
               icon:"question",
               yesFun:function(){
                    var url = sys.context_path+ "/album/album_deleteRemark.action";
                    var myObj={"remark.remarkId":remarkId};
                    Album.sendAjax(url,myObj,Album.callback_deleteRemark,null,"get"); 
               }
             });
       }
   },
   
   callback_deleteRemark:function(data){
       if(data.returnCode=="0"){
           Album.getRemarkList();
       }
   },
   
   /*
    * 查询指定内容的评论
    * @baseId 被评论的ID
    */
   getRemarkList : function(baseId,page) {       
       if(baseId==null){
           baseId=$("#Remark_baseId").val();//parseInt($("#photo_view_list .highlight").attr("id").replace("Photo_",""));
       }
       var url = sys.context_path+ "/album/album_findAlbumRemarkByBaseId.action";
       var myObj={"remark.baseId":baseId};
       Album.sendAjax(url,myObj,Album.callback_getRemarkList,null,"get");
   },
   
   callback_getRemarkList:function(data){
       if(data.returnCode=="0"){
           var tmphtml='',datestr='',tmpObj;
           var userphoto='';
           var days=0;
           for(var i=0;i<data.remarkList.length;i++){
               tmpObj=data.remarkList[i];
               userphoto=(tmpObj.userInfo.userPhoto=="")? "user_photo.gif":tmpObj.userInfo.userPhoto;
               days=web4s.daysBetween(tmpObj.createDate.substring(0,10),web4s.getCurrentDate());
               if(days==0){
            	   datestr="今天"+tmpObj.createDate.substring(10);
               }
               else if(days==1){
            	   datestr="昨天"+tmpObj.createDate.substring(10);
               }
               else if(days==2){
            	   datestr="前天"+tmpObj.createDate.substring(10);
               }
               else{
            	   datestr=tmpObj.createDate;
               }
               tmphtml+=''
            	+'<div class="album_commentContWrap">'
            	+'	 <a href="#" class="photo_48pxWrap"><img src="/web4s/photo/userPhoto/mini/'+userphoto+'" /></a>'
            	+'	 <div class="album_commentCont">'
            	+'		 <a href="javascript:void(0);">'+tmpObj.userInfo.nickName+'：</a>'+sys.faceToHtml(tmpObj.content)
            	+'		 <div class="album_commentDate" id="commentDate_'+tmpObj.remarkId+'">'
            	+'			 <span class="gray">'+datestr+'</span> &nbsp;&nbsp;';
            	tmphtml+=(visitorId=="")? '<a onclick="Album.addReply('+tmpObj.remarkId+')" href="javascript:void(0);">回复</a> <span class="compart">|</span> <a onclick="Album.deleteRemark('+tmpObj.remarkId+')" href="javascript:void(0);">删除</a>':"";
            	tmphtml+='    <div class="both"></div>'
            	+'		 </div>'+Album.getReplyHtml(tmpObj.replyList)
            	+'	 </div>'
            	+'</div>';
           }    
           $("#photo_comment_list").html(tmphtml);
           $("#comment_count").html(data.remarkList.length);
           
       }
   },
   
   getReplyHtml:function(List){
       if(List==null || List.length==0){
           return "";
       }
       var tmp_html='';
       for(var i=0;i<List.length;i++){
           tmp_html+='<div id="reId_310" class="commentContWrap album_revertWrap">'
           +'   <img class="commentPhoto" src="/web4s/photo/userPhoto/mini/'+List[i].userInfo.userPhoto+'">'
           +'   <div class="commentTextarea">'
           +'       <div class="commentCont">'
           +'           <a href="#">'+List[i].userInfo.nickName+'：&nbsp;</a>'+sys.faceToHtml(List[i].replyContent)+'<br />'
           +'           <span class="gray">'+List[i].createDate+'</span>'
           +'       </div>'
           +'       <a class="album_revertRemoveBtn" onclick="Album.deleteReply('+List[i].replyId+')" href="javascript:void(0);"></a>'
           +'    </div>'
           +'</div>';
       }
       return tmp_html;
   },
     
   
   
   /*
    * 添加回复
    * @RemarkId 评论ID
    */
   addReply : function(remarkId) {
	   var $tmp=$("#commentDate_"+remarkId);
	   var tmpHtml=''
		  +'<div class="reRemarkBlock_container">'
		  +'  <input type="hidden" name="RemarkId" id="RemarkId" value="'+remarkId+'"/>'
		  +'  <div id="reRemarkBlock" class="album_revertWrap"></div>'
		  +'  <div class="editorBtnWrap">'
		  +'	<input class="minStyleBtn" type="button" onclick="javascript:Album.addReply_do();" value="确定" id="addreRemark_btn" />'
		  +'	<a href="javascript:void(0)" class="gray"  id="cancel_reRemark_btn">取消</a>'
		  +'  </div>'
		  +'<div>';
	   $(".reRemarkBlock_container").remove();
	   $tmp.append(tmpHtml);
	   $('#reRemarkBlock').web4sEditor(150,1);
	   $('#cancel_reRemark_btn').unbind("click").bind("click",function(){$(".reRemarkBlock_container").remove();});	   
   },
   
   addReply_do : function() {
       var replyContent=$("#reRemarkBlockContent").val();
       var validateCode=$("#validateCode_reply").val();
       var RemarkId=$("#RemarkId").val();
       var sourceType=1;
       if (replyContent == null || $.trim(replyContent)=="") {           
           Msg.show({id:"showMessage_tip",msg:"回复内容不能为空。"});
           return;
       }
       if (replyContent.length>500) {
           Msg.show({id:"showMessage_tip",msg:"回复内容不能超过500。"});
           return;
       }
       /*if (validateCode=="") {
    	   Msg.show({id:"showMessage_tip",msg:"请输入验证码。"});           
           return;
       }*/
       
       var url = sys.context_path+ "/album/album_addReply.action";
       var myObj={
               "replyRemark.remarkId": RemarkId,    
               "replyRemark.replyContent": web4s.HTMLEnCode(replyContent),
               "replyRemark.userId": Album.UserId,
               "validateCode":validateCode
           };
           
       Album.sendAjax(url,myObj,Album.callback_addReply_do,null,"POST");
   },
   
   callback_addReply_do:function(data, textStatus){
       if(data.returnCode=="0"){
           $.msgBox.close();
           Album.getRemarkList();
       }
       else if(data.returnCode=="4032"){                       
           $("#validateCode_reply").val("").focus();
           Msg.show({id:"showMessage_tip",msg:"验证码错误，请重新输入。"});
           return;
       }
       else if(data.returnCode=="4035"){
           $.msgBox.alert({title : "提示", msg : "您的回复次数已达到限制。",icon : "warning"});            
           return;
       }
   },
   
   /**
    * 回复内容删除
    * @param replyId
    */
   deleteReply:function(replyId){	   
	   $.msgBox.prompt(
        {
           title: "提示",
           msg: " 确定删除该回复内容？",
           icon:"question",
           yesFun:function(){                           
        	   var url = sys.context_path+ "/album/album_deleteReply.action";
	      	   var myObj={
	      	           "replyId": replyId
	      	       };
	      	       
	      	   Album.sendAjax(url,myObj,Album.callback_deleteReply,null,"POST");
           }
         });
	  
   },
   callback_deleteReply:function(data, textStatus){
       if(data.returnCode=="0"){
    	   $.msgBox.alert({title : "提示", msg : "回复内容删除成功",icon : "warning"});            
           Album.getRemarkList();
       }       
   },
   
   /*
    * 更新缓存AlbumList对象
    */
   updateLocalAlbumObj:function(Obj){              
       if(Obj==null){return;}
       try{
           for(var i=0;i<Album.AlbumList.length;i++){
               if(Album.AlbumList[i].albumId==Obj.albumId){                  
                  if(null!=Obj.photoTotal){
                      Album.AlbumList[i].photoTotal=Obj.photoTotal;
                  }
                  if(Obj.coverUrl){
                      Album.AlbumList[i].coverUrl=Obj.coverUrl;
                  }
                  break;
               }
           }
       }catch(e){}
   },
      
   /*
    * 通过id取得相册对象
    * @albumId
    */
    getAlbumById:function(albumId){              
        var Obj=null;
        try{
            for(var i=0;i<Album.AlbumList.length;i++){
                if(Album.AlbumList[i].albumId==albumId){
                    Obj=Album.AlbumList[i];
                   break;
                }
            }
            return Obj;  
        }catch(e){}
    },

    /*
     * 通过id取得照片对象
     * @photoId
     */
     getPhotoById:function(photoId){              
         var Obj=null;
         try{
             for(var i=0;i<Album.photoList.length;i++){
                 if(Album.photoList[i].photoId==photoId){
                     Obj=Album.photoList[i];
                    break;
                 }
             }
             return Obj;  
         }catch(e){}
     },   
   
    /*
     *计算指定对象的length
     * @$targetObj
     * @$lenObj 显示length
     * @$tipObj tip提示
     * maxLen
     */
    checkInputLen:function($targetObj,$lenObj,$tipObj,maxLen){
        var targetStr=$.trim($targetObj.val());
        if(targetStr.length>maxLen){
            $targetObj.val(targetStr.substring(0,maxLen));
            $lenObj.html(maxLen);
            return;
        }
        if(targetStr!=""){
            $tipObj.html("").hide();
            $lenObj.html(targetStr.length);
        }        
    },
        
    /*
     * 操作工具栏方法
     */
    photoToolbarAction:function(act,moveTo_albumId){
        var $item=$("input:checkbox[name='pic_checkbox']:checked");
        var Pids="",coverUrl="";
        var curAlbumId=Album.currentAlbumId;//$("#curListName a").attr("id").replace("album_","");
        if(act=="albumEdit"){
            Album.modiflyAlbum(curAlbumId);
            return;
        }
        else if(act=="albumDel"){
            Album.deleteAlbum(curAlbumId);
            return;   
        }
        else if(act=="view_setcover"){
            coverUrl=$("#photo_view_list .highlight").find("img").attr("src");
            Album.modiflyAlbumCover(curAlbumId,coverUrl);
            return;
        }
        else if(act=="view_move"){
        	Pids=$("#photo_view_list .highlight").attr("id").replace("Photo_","");
            Album.movePhotos(Pids,moveTo_albumId);
            return;
        }
        else if(act=="view_del"){
        	Pids=$("#photo_view_list .highlight").attr("id").replace("Photo_","");
        	Album.deletePhoto(Pids);
            return;
        }


        $.each($item, function(i, it)
        {
            Pids+=","+$(this).val();
        });
        if(Pids!=""){
            Pids=Pids.substring(1);            
        }
        else{
            $.msgBox.alert({ title: "提示", msg: "请先选择照片再操作。" });
            return;
        }
        if(curAlbumId==moveTo_albumId){
            $.msgBox.alert({ title: "提示", msg: "照片源相册与目标相册不能相同，请重新选择。" });
            return;
        }
        switch(act){
        case "edit":
            if($item.length>1){
                $.msgBox.alert({ title: "提示", msg: "您勾选了多张照片，请勾选一张编辑。" });
                return;
            }
            else{
                Album.modiflyPhoto(Pids);
            }
            break;
        case "cover":
            if($item.length>1){
                $.msgBox.alert({ title: "提示", msg: "您勾选了多张照片，请勾选一张设置为封面。" });
                return;
            }
            else{
                coverUrl=$("#Small_img_"+Pids).attr("src");
                //alert(coverUrl);
                Album.modiflyAlbumCover(curAlbumId,coverUrl);
            }
            break;
        case "del":
            Album.deletePhoto(Pids);
            break;
        case "move":
            Album.movePhotos(Pids,moveTo_albumId);
            break;
        }
        $("#all_select").attr("checked",false);
    },
    
    //添加分类
    addAlbumClass : function(Obj) {
        var title_Str="";
        var act="";
        if(Obj==null){
        	act="add";
            title_Str="创建分类";
            url = sys.context_path+ "/album/album_addAlbumClass.action";
        }
        else{
        	act="edit";
            title_Str="编辑分类";
            url = sys.context_path+ "/album/album_modifyAlbumClass.action";
        }
        var tmp_htm='<div title="" class="update_photo"><input type="hidden" name="classId" id="classId" value=""/>'                   
        +'      <p><label for="photoName">名称：</label><input type="text" value="" maxlength="10" class="int_txt" name="className" id="className" value="">*</p>'
        +'      <p><label for="photoDesc">描述：</label><textarea rows="8" id="classDesc" name="classDesc" class="int_txt"></textarea><span class="count_txt"><span id="count_classDesc">0</span>/500</span></p>'
        +'      <p><label for="photoTag">排序号：</label><input type="text" maxlength="5" class="int_txt" name="orderNum" id="orderNum" value="0"></p>'
        +'      <p><label for="photoTag">启用：</label><select id="sel_active"><option value="1">是</option><option value="0">否</option></select></p>'        
        +'      <p id="editphto_showTips" class="bg c_tx notice" style=""></p>'
        +'</div>';
        $.msgBox.prompt(
        {
            title: title_Str,
            autoClose:false,
            html:tmp_htm ,
            yesFun:function(){Album.addAlbumClass_do(act);  }
        });
        if(Obj!=null){
            $("#classId").val(Obj.classId);
            $("#className").val(Obj.className);
            $("#orderNum").val(Obj.orderNum);
            $("#classDesc").val(web4s.HTMLDeCode(Obj.classDesc));
            $("#sel_active").val(Obj.active);            
        }
        $("#classDesc").bind("keyup", function(){
            var desc=$(this).val();
            if(desc.length>500){
                $(this).val(desc.substring(0,500));
            }
            else{
                $("#count_classDesc").html(desc.length);
            }                 
        });
    },
    
    addAlbumClass_do : function(action) {
        var className=$("#FName").val();
        var classDesc="";//$("#classDesc").val();
        var orderNum=$("#orderNum").val();
        var classId=$("#classId").val();
        var active=$("#sel_active").val();
        var sourceType=1;
        
        if (className == null || $.trim(className)=="") {
            $.msgBox.alert({title : "提示", msg : "分类名称不能为空。",icon : "warning"});
            return;
        }
        if ($.trim(className)=="请输入名称...") {
        	$("#FName").val("").focus();
            return;
        }
        
        var reg=/^[A-Za-z0-9?!,？！，\u4e00-\u9fa5]+$/;
        if(!reg.test(className)){
        	$.msgBox.alert({title : "提示", msg : "您输入的相册类别名称中含有不合法字符，请重新输入！",icon : "warning"});
        	return;
        }
        
        /*if (classDesc.length>500) {
            $.msgBox.alert({title : "提示", msg : "分类描述内容不能超过500。",icon : "warning"});           
            return;
        }*/
        var url ="";
        if(action=="add"){
            url = sys.context_path+ "/album/album_addAlbumClass.action";
        }
        else if(action=="edit"){
            url = sys.context_path+ "/album/album_modifyAlbumClass.action";
        }        
        var myObj={
                "albumClass.classId": classId,
                "albumClass.className": className,    
                "albumClass.classDesc": web4s.HTMLEnCode(classDesc),
                "albumClass.orderNum": orderNum,
                "albumClass.active": active
            };
        //Album.getClassList(3);
        Album.sendAjax(url,myObj,Album.callback_addAlbumClass,null,"POST");                 
    },
    
    renameAlbumClass:function(cId,newName){
    	var Obj=Album.getClassListById(cId);
    	if(Obj==null){
    		return;
    	}
    	else if(Obj.className==newName){
    		Album.getClassList(2);
    		return;
    	}
        var url = sys.context_path+ "/album/album_modifyAlbumClass.action";
        var myObj={
                "classId": Obj.classId,
                "className": newName
            };
            
        Album.sendAjax(url,myObj,Album.callback_addAlbumClass,null,"POST");   
    },
    
    callback_addAlbumClass:function(data){
        if(data!=null){
            if(data.returnCode=="0"){
            	$("#FName").val("请输入名称...");
            	var newName=data.newName;            	
            	var newName1=$("#manageInfo_editor input").val();
            	Album.getClassList(2);
            	var temp;
            	 if (data.newName == null) {
            		 $.msgBox.alert({title : "提示", msg : "保存相册类别成功。",icon : "succeed" });
            	 }else{
            		 $.msgBox.alert({title : "提示", msg : "重命名相册类别成功。",icon : "succeed" });
            	 }
            }
            else if(data.returnCode=="911"){
            	$.msgBox.alert({title : "提示", msg : "您输入的相册类别名已经存在，请重新输入。",icon : "warning" });
    			return;
            }
            else if(data.returnCode=="-1001"){
                $.msgBox.alert({title : "提示", msg : "您的相册类别总数已达到限制。",icon : "warning"});            
                return;
            }
            else{
                $.msgBox.alert({title : "提示", msg : "分类保存失败。("+data.returnCode+")",icon : "warning"});            
                return;
            }
        }
    }, 
    
    /**
     * 删除相册分类
     */
    deleteAlbumClass : function(id) {
    	$.msgBox.prompt(
        {
           title: "提示",
           msg: " 确定删除该相册分类？<br />该分类所属的相册将会自动转移到“其它”类别。",
           icon:"question",
           width:380,
           yesFun:function(){                           
	        	var url = sys.context_path+ "/album/album_deleteAlbumClass.action";               
	            var myObj={"ids": id };            
	            Album.sendAjax(url,myObj,Album.callback_deleteAlbumClass,null,"POST"); 
           }
         });
                        
    },
    
    callback_deleteAlbumClass:function(data){
        if(data!=null){
            if(data.returnCode=="0"){
                Album.getClassList(2);
                $.msgBox.alert({title : "提示", msg : "分类删除成功。",icon : "succeed" });
            }
            
        }
    },     
    
    /*
     *编辑分类 
     */
    modifylyAlbumClass:function(cId){
        return Album.addAlbumClass(Album.getClassListById(cId));
    },
    
    /**
     * 查询分类
     * @param type 1首页显示，2分类管理
     */
    getClassList : function(type) {
    	var cbFun=null;
    	if(type==1){
    		cbFun=Album.callback_getClassList;
    	}
    	else if(type==2){
    		cbFun=Album.callback_ManageAlbumClass;
    	}
        var url = sys.context_path+ "/album/album_findAllAlbumClass.action";
        var myObj={};
        Album.sendAjax(url,myObj,cbFun,null,"get");
    },
    
    
    callback_getClassList:function(data){
    	//alert(data);
        if(data!=null && data.returnCode=="0"){
            Album.classList=data.classList;
            Album.showClassListHtml(Album.classList);
        }
    },
    

    /**
     * 显示相册分类
     */
    showClassListHtml:function(List){
        var tmphtml="",cls="";
        for(var i=0;i<List.length;i++){
            if(i==0){
                //cls='class="highlight"';
            }
            else{
                cls='';                
            }
            tmphtml+='<li onclick="Album.getAlbumList(null,null,'+List[i].classId+');" '+cls+' id="classId_'+List[i].classId+'" title="'+List[i].className+'"><a onclick="" href="javascript:;">'+List[i].className+' <span>(0)</span></a></li>' ;
        }    
        $("#albumClass_list").html(tmphtml);
        $("#albumClass_list li").click(function(){
            $(this).addClass('highlight').siblings().removeClass("highlight");
        }).hover(
    		function(){
    			$(this).addClass('album_typeListOver');
    		},
    		function(){
    			$(this).removeClass('album_typeListOver');
    		}
    	);
    },
    
    callback_ManageAlbumClass:function(data){
    	Album.showContentPage(3);
    	$("#manageInfo_editor").remove();
        if(data!=null && data.returnCode=="0"){
        	Album.classList=data.classList;
        	Album.showClassListHtml(Album.classList);
        	var listHtml="",tmp,dofun="",cls=""; 
            for (var i=0; i<Album.classList.length; i++) {
             tmp=Album.classList[i];
             if(tmp.userId==0){
            	 continue;
             }
             listHtml+='<li classId="'+tmp.classId+'" class="ui-state-default" style="cursor: move;">'
             +'    <div class="f_info">'
             +'        <span class="album_taxisTitle" title="'+tmp.className+'" ><a href="javascript:;" onclick="Album.getAlbumList(null,null,'+tmp.classId+');" '+cls+' id="classId_'+tmp.classId+'" title="'+tmp.className+'">'+web4s.subStr(tmp.className,50)+'</a></span>'
             +'        <span class="album_taxisCount" >'+tmp.albumCount+'&nbsp;</span>'
             +'        <span class="album_taxisDate" >'+tmp.createDate+'</span>'
             +'        <div class="manageInfo_block_save" style="display:none;">&nbsp;&nbsp;<a class="manageInfo_save" href="javascript:void(0);">保存</a>&nbsp;&nbsp; | <a class="manageInfo_cancel"  href="javascript:void(0);">取消</div>'
             +'        <div class="manageInfo_block_rename"><a class="manageInfo_edit" href="javascript:void(0);">重命名</a> | <a onclick="Album.deleteAlbumClass('+tmp.classId+');" href="javascript:void(0);">删除</a></div>'
             +'		   <span class="album_taxisArrowTop">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
             +'        <span class="album_taxisArrowBot">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
             +'    </div>'
             +'</li>';
            }                
            $("#manage_list_container").html(listHtml).removeClass("photo_list");
            $("#manage_list_container").sortable();
    		$("#manage_list_container").disableSelection();
    		
    		var resetHtml=function(){
    			var _infoDiv=$("#manage_list_container li .f_info");
    			_infoDiv.find(".manageInfo_block_save").hide();
    			_infoDiv.find(".manageInfo_block_rename").show();
    			_infoDiv.find(".album_taxisTitle").show();
    			$('#manageInfo_editor').remove();
    		};
    		$("#manage_list_container li").find(".manageInfo_save,.manageInfo_cancel").click(function(){    			
    			var _infoDiv=$(this).parent().parent();
    			if($(this).attr("class")=="manageInfo_save"){
    				var cId=_infoDiv.parent().attr("classid");
    				var newName=$("#manageInfo_editor input").val();
    				if($.trim(newName)==""){
    					$.msgBox.alert({title : "提示", msg : "请输入名称。",icon : "warning"});
    					return;
    				}
    		        var reg=/^[A-Za-z0-9?!,？！，\u4e00-\u9fa5]+$/;
    		        if(!reg.test(newName)){
    		        	$.msgBox.alert({title : "提示", msg : "您输入的相册类别名称中含有不合法字符，请重新输入！",icon : "warning"});
    		        	return;
    		        }
    				Album.renameAlbumClass(cId, newName);
    			}
    			resetHtml();
    		});
    		$("#manage_list_container li").find(".manageInfo_edit").click(function(){
    			resetHtml();
    			var _infoDiv=$(this).parent().parent();
    			_infoDiv.find(".manageInfo_block_save").show();
    			_infoDiv.find(".manageInfo_block_rename").hide();    			
    			var tmp=_infoDiv.find("span").eq(0);
    			tmp.hide().after('<span class="album_taxisTitle" id="manageInfo_editor"><input type="text" value="" maxlength="10"/></span>');
    			$("#manageInfo_editor input").val(tmp.attr("title"));
    		});
    		$("#manage_page_col_title").html("相册类别名称");
        	$("#curManagePage_name").html("相册类别管理");
        	$("#create_addManageInfo_btn").val("新建类别").unbind("click").bind("click",function(){Album.addAlbumClass_do("add");});
        	
        }
        else{
        	$("#manage_list_container").html("");
        }
    },       
    
    /*
     *查询用户相册信息
     */
    getAlbumSysInfo : function() {
        var url = sys.context_path+ "/album/album_findAlbumSysByUserId.action";
        var myObj={};
        Album.sendAjax(url,myObj,Album.callback_getAlbumSysInfo,null,"get");
    },
    
    callback_getAlbumSysInfo:function(data){
        if(data!=null && data.returnCode=="0"){
            var pecent=(data.albumSys.spaceUsed/data.albumSys.spaceMax);
            if(pecent>0 && pecent<0.1){
                pecent=0.01;
            }
            //alert(data.albumSys.albumCount+"**********************");
            $("#albumSys_info_num").html(data.albumSys.albumCount);
            $("#salbumSys_info_space").html("容量"+web4s.formatSpace(data.albumSys.spaceMax)+"，已用"+(pecent).toFixed(2)+"%");
            $("#albumSys_info").show();
            $("#myAlbum_count").html("("+data.albumSys.albumCount+")");
        }
    },
    
    /**
     *添加/编辑 收藏夹
     *
     */
    inputFavoritenInfo : function(fId) {
    	var tmp_htm='<div title="" class="update_photo"><input type="hidden" id="fId" value=""/><input type="hidden" id="orderNum" value=""/>'                   
    	        +'      <p><label for="FavoritenName">名称：</label><input type="text" value="" maxlength="20" class="input_txt" name="FavoritenName" id="FavoritenName" value=""><span class="count_txt"><span id="count_FName">0</span>/20</span></p>'
    	        +'      <p id="showMsgTips" class="bg c_tx notice" style=""></p>'
    	        +'</div>';
	    $.msgBox.prompt(
	    {
	        title: "新建收藏夹",
	        autoClose:false,
	        html:tmp_htm ,
	        yesFun:function(){Album.addFavoritenInfo_do("pop");  }
	    });
	    
	    $("#FavoritenName").bind("keyup", function(){
            var desc=$(this).val();
            if(desc.length>20){
                $(this).val(desc.substring(0,20));
            }
            else{
                $("#count_FName").html(desc.length);
            }                 
        });
	    if(fId){
	    	$("#fId").val(fId);
    	}
	             
    },
    
    addFavoritenInfo_do:function(type){
    	var url = sys.context_path+ "/album/album_saveFavoritenInfo.action";
    	var myObj;
    	var reg=/^[A-Za-z0-9?!,？！，\u4e00-\u9fa5]+$/;
        var FName=$("#FName").val();
        if(type!=null && type=="pop"){
        	FName=$("#FavoritenName").val();
        	if (FName == null || $.trim(FName)=="") {
        		Msg.show({id:"showMsgTips",msg:"收藏夹名称不能为空，请输入名称。"});
                return;
        	}else if(!reg.test(FName)){
        		$.msgBox.alert({title : "提示", msg : "您输入的收藏夹名称中含有不合法字符，请重新输入！",icon : "warning"});
            	return;
        	}else{
        		myObj={
                    "fName": FName
                };
                Album.sendAjax(url,myObj,Album.callback_saveFavoritenInfo,null,"POST");	
                return;
        	}
        }
        if ($.trim(FName)=="请输入名称...") {
        	$("#FName").val("").focus();
            return;
        }
        
        if(!reg.test($("#FName").val())){
        	$.msgBox.alert({title : "提示", msg : "您输入的收藏夹名称中含有不合法字符，请重新输入！",icon : "warning"});
        	return;
        }
        
        if (FName == null || $.trim(FName)=="") {
            $.msgBox.alert({title : "提示", msg : "收藏夹名称不能为空，请输入名称。",icon : "warning"});
            return;
        }
                
        
        myObj={
                "fName": FName
            };
        Album.sendAjax(url,myObj,Album.callback_saveFavoritenInfo,null,"POST");       
    },
    
    renameFavoritenInfo:function(fId,FName,orderNum){
    	var url = sys.context_path+ "/album/album_saveFavoritenInfo.action";
        var myObj={
        		"fId":fId,
                "fName": FName,
                "orderNum": orderNum
            };
        var reg=/^[A-Za-z0-9?!,？！，\u4e00-\u9fa5]+$/;
        if(!reg.test($("#manageInfo_editor input").val())){
        	$.msgBox.alert({title : "提示", msg : "您输入的收藏夹名称中含有不合法字符，请重新输入！",icon : "warning"});
        	return;
        }
        Album.sendAjax(url,myObj,Album.callback_saveFavoritenInfo,null,"POST");        	
    },
    
    callback_saveFavoritenInfo:function(data){
            if(data.returnCode=="0"){
            	if (data.fId==null) {
            		$.msgBox.alert({title : "提示", msg : "保存收藏夹成功！",icon : "succeed"});
            	}else{
            		$.msgBox.alert({title : "提示", msg : "编辑收藏夹成功！",icon : "succeed"});
            	}
            	$("#FName").val("请输入名称...");
            	Album.getFavoritenInfo(1);
            	return;
            }
            if(data.returnCode=="120"){
            	$.msgBox.alert({title : "提示", msg : "您输入的收藏夹名字已经存在，请重新输入！",icon : "warning"});
            	return;
            }
            if(data.returnCode=="4102"){
            	$.msgBox.alert({title : "提示", msg : "已达到收藏夹最大个数限制，无法再创建。",icon : "warning"});
            	return;
            }
            else{
                $.msgBox.alert({title : "提示", msg : "保存信息失败，请稍候再试。",icon : "warning"});            
                return;
            }
    },  
    
    /**
     * 删除 收藏夹
     */
    deleteFavoritenInfo : function(id,name) {
    	$.msgBox.prompt(
        {
           title: "提示",
           msg: " 确定删除\""+name+"\"收藏夹？<br />注：收藏夹里的收藏将会被全部删除。",
           icon:"question",
           yesFun:function(){                           
	        	var url = sys.context_path+ "/album/album_deleteFavoritenInfo.action";               
	            var myObj={"fId": id};            
	            Album.sendAjax(url,myObj,Album.callback_deleteFavoritenInfo,null,"POST"); 
           }
         });    	             
    },
    
    callback_deleteFavoritenInfo:function(data){
    	if(data!=null && data.returnCode=="0"){
    		var temp=data.favoriteInfo;
            $.msgBox.alert({title : "提示", msg : "收藏夹删除成功。",icon : "succeed" });
            Album.getFavoritenInfo(1);
        }
    },     

    
    /**
     *添加到收藏夹
     *@param type 0相册,1照片 
     *@param cId
     */
    inputFavoritenList : function(type,cId) {
    	var tmp_htm='<div title="" class="update_photo"><input type="hidden" id="cId" value=""/><input type="hidden" id="orderNum" value=""/>'                   
    	        +'      <p><label for="FName">选择：</label><select id="sel_FavoritenInfoId"></select>*</p>'
    	        +'      <p class="bg c_tx " style="">&nbsp;&nbsp;&nbsp;&nbsp;收藏的内容将会在“我的收藏”栏目中展示。</p>'
    	        +'      <p id="showMsgTips" class="bg c_tx notice" style=""></p>'
    	        +'</div>';
	    $.msgBox.prompt(
	    {
	        title: "添加到收藏夹",
	        autoClose:false,
	        html:tmp_htm ,
	        yesFun:function(){addFavoritenList_do();  }
	    });	        
	    Album.getFavoritenInfo(2);
	    
	    if(type==1){
	    	var Id=$("#photo_view_list .highlight").attr("id").replace("Photo_","");
	    	$("#cId").val(Id);
	    }
	    else{
	    	$("#cId").val(cId);
    	}
	    var addFavoritenList_do=function(){
	        var fId=$("#sel_FavoritenInfoId").val();
	        var cId=$("#cId").val();
	        var url = sys.context_path+ "/album/album_saveFavoritenList.action";
	        var myObj={
	                "fId": fId,
	                "cId": cId,
	                "type":type,
	                "source": 1
	            };
	        Album.sendAjax(url,myObj,Album.callback_saveFavoritenList,null,"POST");       
        };          
    },
    
    callback_saveFavoritenList:function(data){
        if(data.returnCode=="0"){
        	$.msgBox.alert({title : "提示", msg : "保存信息成功。",icon : "succeed"});
        }else if(data.returnCode=="911"){
        	$.msgBox.alert({title : "提示", msg : "相册已经收藏",icon : "warning"});
        }else{
            $.msgBox.alert({title : "提示", msg : "保存信息失败，请稍候再试。",icon : "warning"});            
            return;
        }
        
    },
    
    /**
     *取消收藏
     *@param id
     */
    cancelFavoritenList:function(id,type){
    	if(type!=null && type=="batch"){
    		var Pids="";
    		var $item=$("input:checkbox[name='f_checkbox']:checked");
    		$.each($item, function(i, it)
	        {
	            Pids+=","+$(this).val();
	        });
	        if(Pids!=""){
	        	id=Pids.substring(1);
	        }
	        else{
	            $.msgBox.alert({ title: "提示", msg: "请先选择内容再操作。" });
	            return;
	        }
    	}
    	$.msgBox.prompt({title : "提示", msg : "确定要取消收藏吗？",icon : "warning",
    		yesFun:function(){
		        var url = sys.context_path+ "/album/album_saveFavoritenList.action";
		        var myObj={
		                "ids": id,
		                "source":0
		            };
		        Album.sendAjax(url,myObj,Album.callback_cancelFavoritenList,null,"POST");       
    		}
    	});
    	
    }, 
    
    callback_cancelFavoritenList:function(data){
        if(data.returnCode=="0"){
        	$.msgBox.alert({title : "提示", msg : "取消收藏成功。",icon : "succeed"});
        	Album.getFavoritenList($("#myfavoriten_list").attr("curfavoritenId"));
        }        
    },
    
    /**
     *查询收藏夹信息
     *@type 0 首面显示，1收藏夹管理，2添加到收藏夹
     */
    getFavoritenInfo : function(type) {
    	var cbFun;
    	if(type==0){
    		cbFun=Album.callback_DispFavoritenInfo;
    	}
    	else if(type==1){
    		cbFun=Album.callback_ManageFavoritenInfo;
    	}
    	else if(type==2){
    		cbFun=Album.callback_getFavoritenInfoHtml;
    	}
    	
        var url = sys.context_path+ "/album/album_findFavoritenInfo.action";
        var myObj={};
        Album.sendAjax(url,myObj,cbFun,null,"get");
    },
    
    callback_DispFavoritenInfo:function(data){
    	$("#album_list_Pages").empty();
        if(data!=null && data.returnCode=="0"){
        	Album.curFavoritenInfo=data.List;
        	var listHtml="",tmp,dofun=""; 
            for (var i=0; i<data.List.length; i++) {
             tmp=data.List[i];
             listHtml+='<li fId="'+tmp.id+'">'
             +'        <a title="'+tmp.fName+'" onclick="Album.getFavoritenList('+tmp.id+');" href="javascript:void(0)">'+web4s.subStr(tmp.fName,16)+'</a>'
             +'</li>';
            }                
            $("#myfavoriten_list").html(listHtml);
            $("#myfavoriten_list li").click(function(){
                //$(this).addClass('highlight').siblings().removeClass("highlight");
            }).hover(
        		function(){
        			$(this).addClass('album_typeListOver');
        		},
        		function(){
        			$(this).removeClass('album_typeListOver');
        		}
        	);
            if (data.page!=null && data.page.recordCount > Album.pageSize) {
                $("#album_list_Pages").pagination(data.page.recordCount, {
                    first_text : "首页",
                    prev_text : "上一页",
                    next_text : "下一页",
                    last_text : "尾页",
                    ellipse_text : "...",
                    current_page : Album.curPageNum,
                    num_edge_entries : 2,
                    num_display_entries : 2,
                    items_per_page : Album.pageSize,
                    callback : Album.getFavoritenInfo
                });
            }
            
        }
    },

    callback_ManageFavoritenInfo:function(data){
    	Album.showContentPage(3);
    	$("#FName").val("请输入名称...");
    	$("#manageInfo_editor").remove();
        if(data!=null && data.returnCode=="0"){
        	var listHtml="",tmp,dofun="";
            for (var i=0; i<data.List1.length; i++) {
             tmp=data.List1[i];
             
             listHtml+='<li classId="'+tmp.id+'" class="ui-state-default" style="cursor: move;">'
             +'    <div class="f_info">'
             +'        <span class="album_taxisTitle" title="'+tmp.fName+'"><a title="'+tmp.fName+'" onclick="Album.getFavoritenList('+tmp.id+');" href="javascript:void(0)">'+web4s.subStr(tmp.fName,16)+'</a></span>'
             +'        <span class="album_taxisCount" >'+tmp.albumCount+'&nbsp;</span>'
             +'        <span class="album_taxisDate" >'+tmp.createDate+'</span>'
             +'        <div class="manageInfo_block_save" style="display:none;">&nbsp;&nbsp;<a class="manageInfo_save" href="javascript:void(0);">保存</a>&nbsp;&nbsp; | <a class="manageInfo_cancel"  href="javascript:void(0);">取消</div>'
             +'        <div class="manageInfo_block_rename"><a class="manageInfo_edit" href="javascript:void(0);">重命名</a> | <a onclick="Album.deleteFavoritenInfo('+tmp.id+',\''+tmp.fName+'\');" href="javascript:void(0);">删除</a></div>'
             +'		   <span class="ui-icon ui-icon-arrowthick-2-n-s">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
             +'    </div>'
             +'</li>';
            }                
            $("#manage_list_container").html(listHtml).removeClass("photo_list");
            $("#manage_list_container").sortable();
    		$("#manage_list_container").disableSelection();
    		var resetHtml=function(){
    			var _infoDiv=$("#manage_list_container li .f_info");
    			_infoDiv.find(".manageInfo_block_save").hide();
    			_infoDiv.find(".manageInfo_block_rename").show();
    			_infoDiv.find(".album_taxisTitle").show();
    			$('#manageInfo_editor').remove();
    		};
    		$("#manage_list_container li").find(".manageInfo_save,.manageInfo_cancel").click(function(){    			
    			var _infoDiv=$(this).parent().parent();
    			if($(this).attr("class")=="manageInfo_save"){
    				var cId=_infoDiv.parent().attr("classid");
    				var newName=$("#manageInfo_editor input").val();
    				
    				var orderNum=0;
    				if($.trim(newName)==""){
    					$.msgBox.alert({title : "提示", msg : "请输入名称。",icon : "warning"});
    					return
    				}
    				Album.renameFavoritenInfo(cId, newName,orderNum);
    			}
    			resetHtml();
    		});
    		
    		$("#manage_list_container li").find(".manageInfo_edit").click(function(){
    			resetHtml();
    			var _infoDiv=$(this).parent().parent();
    			_infoDiv.find(".manageInfo_block_save").show();
    			_infoDiv.find(".manageInfo_block_rename").hide();
    			var tmp=_infoDiv.find("span").eq(0);
    			tmp.hide().after('<span class="album_taxisTitle" id="manageInfo_editor"><input type="text" value="" maxlength="20"/></span>');
    			$("#manageInfo_editor input").val(tmp.attr("title"));
    		});
    		$("#manage_page_col_title").html("收藏夹名称");
    		$("#curManagePage_name").html("收藏夹管理");
    		$("#create_addManageInfo_btn").val("新建收藏夹").unbind("click").bind("click",function(){Album.addFavoritenInfo_do();});
	        var select = $('#sel_FavoritenInfoId').get(0);
	        if(select!=null){
		        $.each(data.List,function(i,temp){
		            select[i] = new Option(temp.fName,temp.id);	           
		        });
		        select.selectedIndex = 0;
	        }
        }
        else{
        	$("#manage_list_container").html("");
        }
    },
    
    callback_getFavoritenInfoHtml:function(data){
    	if(data!=null && data.returnCode=="0"){
    		if(data.List.length==0){
		    	$.msgBox.alert({title : "提示", msg : "请新建收藏夹后再进行收藏操作。",icon : "warning",
		    		yesFun:function(){Album.inputFavoritenInfo();}
		    	});
		    	return;
		    }
            var select = $('#sel_FavoritenInfoId').get(0);
	        if(select!=null){
		        $.each(data.List,function(i,temp){
		            select[i] = new Option(temp.fName,temp.id);	           
		        });
		        select.selectedIndex = 0;
	        }
    	}    
	},
    
    /**
     *查询最近更新的好友相册
     * @param type 0我的首页最近更新的相册,1相册最近更新的好友相册
     */
    getFriendLatelyAlbumList : function(type) {
    	var maxNum=(type==0)? 2:100; //返回记录数
        var url = sys.context_path+ "/album/album_findFriendLatelyAlbumList.action";
        var myObj={"page.currentPage":1,"page.perPageSize":maxNum,"type":type};
        Album.sendAjax(url,myObj,Album.callback_getFriendLatelyAlbumList,null,"get");        
    },
    
    callback_getFriendLatelyAlbumList:function(data){
    	Album.showContentPage(7);
        if(data!=null && data.returnCode=="0"){
        	Album.friendAlbumList=data.List;
        	var listHtml="",tmp,dofun=""; 
            for (var i=0; i<data.List.length; i++) {            
                tmp=data.List[i];
                if(tmp.photoTotal>0){
                    coverURL=tmp.coverUrl.replace("/largephoto","/smallphoto");
                }
                else{
                    coverURL="../images_3/albumNophoto.gif";
                }
                
                if(tmp.visitRightType=="3"){
                    coverURL="../images/album/no_right_s.png";
                }
                else if(tmp.visitRightType=="-1"){
                    coverURL="../images/album/no_visitAll_s.png";
                }
                
                if((tmp.visitRightType=="1" || tmp.visitRightType=="2")){
                    dofun='Album.getPhotoListByVisitRight('+tmp.albumId+');';
                }
                else{
                    dofun='Album.getPhotoList(0,'+tmp.albumId+',null,null,'+tmp.userId+');';
                }
             listHtml+='<li>'
             +'    <div class="album_list_bg"><a onclick="'+dofun+'" href="javascript:void(0);" title="'+tmp.name+'"><img title="'+tmp.name+'" src="'+coverURL+'" /></a></div>'
             +'    <div class="album_name" title="'+tmp.name+'"><a onclick="'+dofun+'" href="javascript:void(0);" title="'+tmp.name+'">'+web4s.subStr(tmp.name,13)+'</a></div>'
             +'    <span class="album_collect">'+tmp.nickName+' (共'+tmp.photoTotal+'张)</span>'         
             +'		<div class="friendAlbum_operation" style="display:none;">'
             +'         <a onclick="Album.inputFavoritenList(0,'+tmp.albumId+');" title="收藏" href="javascript:;">收藏</a>&nbsp;'
             +'         <a onclick="Album.addCommendInfo('+tmp.albumId+',\'201\');" title="推荐" href="javascript:;">推荐</a>'
             +'     </div>';
             
             listHtml+='</li>';
            }                
            $("#friendLatelyAlbum_list_container").html(listHtml);
            $("#friendLatelyAlbum_list_container img").load(function(){
                Album.resizeImage($(this).get(0),140,140);
            });
            $("#friendLatelyAlbum_list_container li").hover(
            		function(){
            			$(this).find('.friendAlbum_operation').show();
            		},
            		function(){
            			$(this).find('.friendAlbum_operation').hide();
            		}
            ); 
            
        }
    },
    
    /**
     * 标注足迹
     */
    showMarkInfoWindow:function(){
    	var longitude = $("#longitude").val();
		var latitude = $("#latitude").val();
		var title=$("#hid_marktitle").val();
    	var temphtml=''
    		+'<div class="album_iofo_map" id="large_map_canvas" style="border:1px solid #A3A3A3;width: 630px;height: 500px;"></div>';
    	$.msgBox.prompt({title : "标注照片拍摄的足迹", html :temphtml ,icon : "false",
    		width:650,
    		autoClose:false,
    		textYes:"保存",
    		yesFun:function(){
    			Album.savePhotoFootMark();
    		}
    	});
    	GoogleMap.albumMakerPostion(longitude,latitude,5,"large_map_canvas",title);            
	},
	
	/**
     *保存照片足迹
     *@param cId
     *@param longitude
     *@param latitude
     *@param title
     */
	savePhotoFootMark:function(){
		var cId = Album.currentAlbumId;
		var longitude = $("#longitude").val();
		var latitude = $("#latitude").val();
		var title = $("#footmark_title").val();
		
        var url = sys.context_path+ "/album/album_savePhotoFootMark.action";
        var myObj={
        		"cId":cId,
                "longitude": longitude,
                "latitude":latitude,
                "title":title
            };
        Album.sendAjax(url,myObj,Album.callback_savePhotoFootMark,null,"POST");   
	},
	callback_savePhotoFootMark:function(data){
        if(data!=null && data.returnCode=="0"){        	
        	$.msgBox.alert({title : "提示", msg : "保存信息成功。",icon : "succeed"});
        	Album.getPhotoFootMarkByCId(data.cId);
        }
    },	

    /**
     *查询照片足迹
     */
    getPhotoFootMarkByCId : function(id) {
        var url = sys.context_path+ "/album/album_queryPhotoFootMarkByCId.action";
        var myObj={"cId":id};
        Album.sendAjax(url,myObj,Album.callback_getPhotoFootMarkByCId,null,"get");
    },
    
    callback_getPhotoFootMarkByCId:function(data){
        if(data!=null && data.returnCode=="0"){
        	if(data.photoFootMark!=null){
	        	var Obj=data.photoFootMark;
	        	$("#longitude").val(Obj.longitude);
	    		$("#latitude").val(Obj.latitude);
	    		$("#hid_marktitle").val(Obj.title);
	        	GoogleMap.albumMakerPostion(Obj.longitude,Obj.latitude,5);
	        	$("#create_mark").hide();
	        	$("#edit_mark").show();
        	}
        	else{
        		$("#longitude").val('');
	    		$("#latitude").val('');
	    		$("#hid_marktitle").val('');
        		GoogleMap.albumMakerPostion('','',5);
        		$("#create_mark").show();
	        	$("#edit_mark").hide();
        	}
        	if(visitorId!=""){
        		$("#create_mark,#edit_mark").hide();
        	}        	
        }
    },
    
    /**
     * 显示操作主页面
     * @num 1相册页面，2相册列表管理页面，3管理收藏夹页面，4上传照片页面，5相册排序页面，6照片展示页面，7好友的相册
     */
    showContentPage:function(num){
    	$(".contentTopNoBg,#comment_page").hide();
    	if(num==1){
    		$("#album_index_page").show();
    	}
    	else if(num==2){
    		$("#manage_alumlist_page").show();
    		$("#comment_page").show();
    		$("#input_comment_title").html("我也来评论下这个相册");
    	}
    	else if(num==3){
    		$("#manage_page").show();
    	}
    	else if(num==4){
    		$("#upload_page").show();
    	}
    	else if(num==5){
    		$("#album_sort_page").show();
    	}
    	else if(num==6){
    		$("#main_photo_show").show();
    		$("#comment_page").show();
    		$("#input_comment_title").html("我也来评论下这张照片");
    	}
    	else if(num==7){
    		$("#friendLately_album_page").show();
    	}
    },
    /**
     * 清空相册评论编辑框里的内容
     */
    clearRemark:function(){
    	$("#Remark_contentContent").val('');
    	//remark_content.val("");
    },
    
    /**
     * 相册、照片操作操作按钮展示
     * @num 1我自己的，2好友的
     */
    showAlbumContent:function(num){
    	if(num==1){
    		$("#albumEdit_toolbar").show();
    		$("#albumInfo_box .album_editInputBtn").show();
    	}
    	else if(num==2){
    		$("#albumEdit_toolbar").hide();
    		$("#create_mark,#edit_mark").hide();
    		$("#albumInfo_box .album_editInputBtn").hide();
    	}
    },

    
    //查询“资料”数据
    getUserDetailInfo:function(userId){
        var url = sys.context_path+ "/user/user_myInfo.action";
        var myObj={};
            
        Album.sendAjax(url,myObj,Album.callback_getUserDetailInfo,null,"get");
    },
    
    callback_getUserDetailInfo:function(data){
        if(null!=data && data.result!=1){           
            var userphto=(data.myUserPhoto=="")? "user_photo.gif":data.myUserPhoto;
            var carphoto=(data.myCarPhoto=="")? "../photo/carPhoto/min/car_photo.jpg":"../photo/carPhoto/min/"+data.myCarPhoto;
            var sign=(data.signature=="")? "&nbsp;&nbsp;":data.signature;
            $("#nickName").html(data.myNickName);
            $("#carName").html(data.myCarName);
            $("#comefrom_city").html(data.myCityName);
            $("#user_carPhoto").attr("src",carphoto);
            $("#myself_sign").html(sign).attr("title",sign);
            $("#user_Photo").attr("src","../photo/userPhoto/normal/"+userphto);
            $("#comment_user_Photo").attr("src","../photo/userPhoto/normal/"+userphto);
        }
    },

    /**
     *查询我的收藏夹内容
     * @param userId
     * @param fId
     */
    getFavoritenList : function(fId) {
    	$("#myfavoriten_list").attr("curfavoritenId",fId);
        var url = sys.context_path+ "/album/album_findAllFavoritenList.action";
        var myObj={"fId":fId};
        Album.sendAjax(url,myObj,Album.callback_getFavoritenList,null,"get");
    },
    
    callback_getFavoritenList:function(data){
    	$("#curFavoritenName").html("我的收藏");
		var curFName="";
    	$.each(Album.curFavoritenInfo,function(i,temp){
    		if(temp.id==data.fId){
    			curFName="&gt; "+temp.fName;
    		}
    	});
    	$("#nav").html("当前位置：个人主页 &gt; 相册 &gt; 我的收藏"+curFName);
    	$("#album_list_Pages").empty();
    	$("#album_index_toolbar").hide();
		$("#favoriten_toolbar").show();    	
    	$("#favoriten_all_select").attr("checked",false);
    	var favoritenMenu=function(_this){
    		$("#favoriten_edit_btn").html("批量管理");
		    $("#favoriten_edit_toolbar").hide();
		    $("#list_container .favoritenEdit").hide();
		    $("#list_container .favoritenDisp").show();
    	};
    	$("#favoriten_edit_btn").toggle(
		  function () {
		    $(this).html("退出管理");
		    $("#favoriten_edit_toolbar").show();
		    $("#list_container .favoritenEdit").show();
		    $("#list_container .favoritenDisp").hide();
		  },
		  function () {
			  favoritenMenu();
		  }
		); 
    	favoritenMenu();
    	
        if(data!=null && data.returnCode=="0"){
        	Album.curFavoritenList=data.List;
        	var listHtml="",coverURL="",dofun="",desc="",fun="",oprHtml="";
        	var tmp;
            for (var i=0; i<data.List.length; i++) {
             tmp=data.List[i];
             if(tmp.type==0){
            	 desc=tmp.nickName+"的相册("+tmp.photoTotal+")";
            	 fun="Album.getPhotoList(0,"+tmp.cId+",null,null,"+tmp.cOwerUserId+");";
            	 if(tmp.photoTotal>0){
                     coverURL=tmp.photoUrl.replace("/largephoto","/smallphoto");
                 }
                 else{
                     coverURL="../images_3/albumNophoto.gif";
                 }
             }
             else{
            	 desc=tmp.nickName+"的照片";
            	 fun="Album.getFavoritenPhoto("+tmp.cId+")";
            	 coverURL=tmp.photoUrl.replace("/largephoto","/smallphoto");
             }
             if(visitorId==""){
            	 oprHtml='<div class="album_operation">'
                 +'            <a onclick="Album.addCommendInfo(\''+tmp.id+'\',\'201\');" title="推荐" href="javascript:;">推荐</a>&nbsp;'
                 +'            <a onclick="Album.cancelFavoritenList(\''+tmp.id+'\')" title="取消收藏" href="javascript:;">取消收藏</a>'
                 +'        </div>';
              }
             listHtml+='<li>'
                 +'    <div class="'+((tmp.type==0)?"album_list_bg":"photo_list_bg")+'"><a onclick="'+fun+'" href="javascript:void(0);" title="'+tmp.title+'"><img title="'+tmp.title+'" src="'+coverURL+'" /></a></div>'
                 +'    <div class="favoritenEdit"  style="display: none;"><input type="checkbox" value="'+tmp.id+'" name="f_checkbox" id="check_fId_'+tmp.id+'">'
                 +'    <label for="check_fId_'+tmp.id+'" class="author-display">'+web4s.subStr(tmp.title,12)+'</label></div>'
                 +'    <div class="favoritenDisp" title="'+tmp.title+'">'+web4s.subStr(tmp.title,13)+'</div>'
                 +'    <span class="album_collect">'+desc+'</span>'+oprHtml;
             	 +'</li>';
            }
            if(data.List.length==0){
            	listHtml="<li><div>暂无任何内容。</div></li>";
            }
            $("#list_container").html(listHtml);
            $("#list_container li").click(function(){
                //$(this).addClass('highlight').siblings().removeClass("highlight");
            }).hover(
        		function(){
        			if($("#favoriten_edit_btn").html()=="批量管理"){
        				$(this).addClass('album_typeListOver');
            			$(this).find('.album_operation').show();	
        			}
        		},
        		function(){
        			$(this).removeClass('album_typeListOver');
        			$(this).find('.album_operation').hide();
        		}
        	);
            
        }
        if(data!=null && data.returnCode=="6011"){
        	
        	var listHtml="",coverURL="",dofun="",desc="",fun="";
        	var tmp;
            for (var i=0; i<data.List.length; i++) {
             tmp=data.List[i];
             if(tmp.type==0){
            	 desc=tmp.nickName+"的相册("+tmp.photoTotal+")";
            	 fun="Album.getPhotoList(0,"+tmp.cId+",null,null,"+tmp.cOwerUserId+");";
            	 if(tmp.photoTotal>0){
                     coverURL=tmp.photoUrl.replace("/largephoto","/smallphoto");
                 }
                 else{
                     coverURL="../images_3/albumNophoto.gif";
                 }
             }
             else{
            	 desc=tmp.nickName+"的照片";
            	 fun="Album.getFavoritenPhoto("+tmp.cId+")";
            	 coverURL=tmp.photoUrl.replace("/largephoto","/smallphoto");
             }
             listHtml+='<li>'
                 +'    <div class="'+((tmp.type==0)?"album_list_bg":"photo_list_bg")+'"><a onclick="'+fun+'" href="javascript:void(0);" title="'+tmp.title+'"><img title="'+tmp.title+'" src="'+coverURL+'" /></a></div>'
                 +'    <div class="favoritenEdit"  style="display: none;"><input type="checkbox" value="'+tmp.id+'" name="f_checkbox" id="check_fId_'+tmp.id+'">'
                 +'    <label for="check_fId_'+tmp.id+'" class="author-display">'+web4s.subStr(tmp.title,12)+'</label></div>'
                 +'    <div class="favoritenDisp" title="'+tmp.title+'">'+web4s.subStr(tmp.title,13)+'</div>'
                 +'    <span class="album_collect">'+desc+'</span>';
             	 +'</li>';
            }
            if(data.List.length==0){
            	listHtml="<li><div>暂无任何内容。</div></li>";
            }
            $("#list_container").html(listHtml);
            $("#list_container li").click(function(){
                //$(this).addClass('highlight').siblings().removeClass("highlight");
            }).hover(
        		function(){
        			$(this).addClass('album_typeListOver');
        		},
        		function(){
        			$(this).removeClass('album_typeListOver');
        		}
        	);
            
        }
        
    },    
    
    /**
     * 显示收藏夹的照片
     */
    getFavoritenPhoto:function(photoId){
        var url = sys.context_path+ "/album/album_findAlbumPhotoById.action";
        var myObj={
        		"photoId":photoId
            };
        Album.sendAjax(url,myObj,Album.callback_getFavoritenPhoto,null,"POST");   
	},
	callback_getFavoritenPhoto:function(data){
        if(data!=null && data.returnCode=="0"){
        	visitorId=data.photoList.userId;
        	Album.photoList=data.photoList;
        	Album.showPhotoList(data.albumId,data.photoId,"singleFavoritenPhoto");
        }
    },	

    /**
     *推荐内容
     *@id 内容id
     *@type  201 推荐相册,202上传照片
     */
    addCommendInfo:function(id,type){
    	if(type=="202"){
    		Album.commendInfo_do({"actionId": id,"actionType":type});
    		return;
    	}
    	var tmp_htm='<div  class="update_photo">'                   
         +'      <p><textarea rows="6" id="commendDesc" name="commendDesc" class="uc_fillArea"></textarea><span class="count_txt"><span id="count_commendDesc">0</span>/140</span></p>'
         +'      <p>温馨提示：<span class="notice">推荐的内容将展示在您的图博动态中，您的好友将在自己推荐中看到这个推荐。<span></p>'
         +'      <p id="editphto_showTips" class="bg c_tx notice" style=""></p>'
         +'</div>';
    	$.msgBox.prompt(
        {
            title: "推荐",
            autoClose:false,
            width:420,
            html:tmp_htm ,
            yesFun:function(){
        		var commendDesc=$("#commendDesc").val();
		        var myObj={
		                "actionId": id,
		                "actionType":type,
		                "desc":commendDesc
		            };
		        Album.commendInfo_do(myObj);
			}
        });
    	$("#commendDesc").unbind("keyup").bind("keyup", function(){
            var desc=$(this).val();
            if(desc.length>140){
                $(this).val(desc.substring(0,140));
                $("#count_commendDesc").html(140);
                Msg.show({id:"showMessage_tip",msg:"内容不能超过140。"});
            }
            else{
            	$("#count_commendDesc").html(desc.length);
            }
        });
    },
    commendInfo_do:function(myObj){
    	var url = sys.context_path+ "/album/album_saveUserAction.action";
    	Album.sendAjax(url,myObj,Album.callback_commendInfo,null,"POST");    
    },
    callback_commendInfo:function(data){
        if(data!=null && data.returnCode=="0" && data.actionType=="201"){
        	$.msgBox.alert({title : "提示", msg : "推荐内容成功。",icon : "succeed"});
        }
    },	

    /*
     * 通过id取得分类对象
     * @photoId
     */
     getClassListById:function(cId){              
         var Num=-1;
         try{
             for(var i=0;i<Album.classList.length;i++){
                 if(Album.classList[i].classId==cId){                     
                     Num=i;
                    break;
                 }
             }
             if(Num!=-1){
            	 return Album.classList[Num];
             }
             else{
            	 return null;
             }
         }catch(e){}
     }, 

     /*
      * 通过id取得分类名称
      * @photoId
      */
      getClassNameById:function(cId){              
          var className=null;
          try{
              for(var i=0;i<Album.classList.length;i++){
                  if(Album.classList[i].classId==cId){
                      className=Album.classList[i].className;
                     break;
                  }
              }
              return className;  
          }catch(e){}
      },
    
      /**
       * 通过id取得好友相册
       * @photoId
       */
       getFriendAlbumListById:function(Id){              
           var temp=null;
           try{
               for(var i=0;i<Album.friendAlbumList.length;i++){
                   if(Album.friendAlbumList[i].albumId==Id){
                	  temp=Album.friendAlbumList[i];
                      break;
                   }
               }
               return temp;  
           }catch(e){}
       },
       
    /**
     * 图片按指定长、宽比例缩放显示
     */  
    resizeImage:function(ImgD,FitWidth,FitHeight){
        var image = new Image();
        image.src = ImgD.src;
        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height >= FitWidth / FitHeight) {
                if (image.width > FitWidth) {
                    ImgD.width = FitWidth;
                    ImgD.height = (image.height * FitWidth) / image.width;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            } else {
                if (image.height > FitHeight) {
                    ImgD.height = FitHeight;
                    ImgD.width = (image.width * FitHeight) / image.height;
                } else {
                    ImgD.width = image.width;
                    ImgD.height = image.height;
                }
            }
        }
    } 
};