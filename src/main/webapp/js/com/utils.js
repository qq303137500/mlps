var utils = {
		token : "9f7114be4c351b0610e14310f3226d88",
		
		/**
		 * 错误提示
		 */
		errorTip : function(content){
			art.dialog({
				title : '错误',
				content : content,
				icon : 'error',
				drag: false,
				time : 3
			});
		},
		
		/**
		 * 警告提示
		 */
		 warningTip : function(content){
			art.dialog({
				title : '提示',
				content : content,
				icon : 'warning',
				drag: false,
				time : 3
			});
		},
		
		/**
		 * 成功提示
		 */
		succeedTip :function(content){
			art.dialog({
				title : '提示',
				content : content,
				icon : 'succeed',
				drag: false,
				time : 2
			});
		},
		
		/**
		 * 通用提示
		 */
		generalTip :function(title,content,icon,time){
			
			art.dialog({
				title : title,
				content : content,
				icon : icon,
				drag: false,
				time : time
			});
		},
		
		/**
		 * 获取地址栏参数
		 */
		getQueStr : function(name , url) {
			var u = url ? url : window.location.search, r = u.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"));
			return ((null != r) ? (decodeURIComponent(r[2]) || '') : (''));
		},
		
		/**
		 * 自动填充页面数据
		 * dataKeyT : 数据ID与页面ID
		 * data : 正式数据对象
		 */
		autoFillData : function(dataKeyT , data){
			for(var key in data){
				$('#'+dataKeyT[key]).html(data[key]);
			}
		},
		
		/**
		 * 根据当前省对应指定area
		 */
		ProvincesToAreas : function(prov , area , cb){
			area.html('').append($('<option>').attr('value','0').html('请选择城市'));
			utils.ajax(sys.contextPath + '/common/getCities4Car',{pShortName:prov.val()},function(data){
				for(var i in data.data)
					area.append($('<option>').attr('value',data.data[i].cId).attr('cNum',data.data[i].cNum).attr('cName',data.data[i].cName).html(data.data[i].cNum));
				if(cb)
					cb();
			});
			$(".chzn-select").trigger("chosen:updated");
		},
		
		/**
		 * 获取城市对应信息
		 * prov
		 */
		ProvincesCitys : function(prov , city  , parent , cityCb , completeCb){
			// 省市互联
			$.getJSON(sys.contextPath + '/common/getProvinces',function(data){
				prov.html('').append($('<option>').attr('value','').html('请选择省份'));
				    for(var i=0; i<data.data.length;i++){
				        prov.append($('<option>').attr('value',data.data[i].pId).html(data.data[i].pName));
				    }
				    $(".chzn-select").trigger("chosen:updated");
				if(completeCb){
					completeCb();
				}
			});
			prov.change(function(){
				city.html('').append($('<option>').attr('value','').html('请选择城市'));
				$.getJSON(sys.contextPath + '/common/getCities',{pId:prov.val()},function(data){
					    for(var i=0;i<data.data.length; i++)
						city.append($('<option>').attr('value',data.data[i].cId).html(data.data[i].cName));
					    $(".chzn-select").trigger("chosen:updated");
					if(completeCb){
						completeCb();
					}
				});
			});
			city.change(function(){
				if(cityCb){
					cityCb();
				}
			});
		},
		
		/**
		 * 获取省份对应信息
		 * prov
		 */
		Provinces : function(prov ,completeCb){
			$.getJSON(sys.contextPath + '/common/getProvinces',function(data){
				prov.html('').append($('<option>').attr('value','0').html('全国'));
				    for(var i=0; i<data.data.length;i++){
				        prov.append($('<option>').attr('value',data.data[i].pId).html(data.data[i].pName));
				    }
				if(completeCb){
					completeCb();
				}
			});
		},
		
		/**
		 * 根据当前省对应指定city
		 */
		ProvincesToCity : function(prov , area , cb){
			area.html('').append($('<option>').attr('value','').html('请选择城市'));
			$.getJSON(sys.contextPath + '/common/getCities',{pId:prov.val()},function(data){
			    for(var i=0;i<data.data.length; i++){
			     area.append($('<option>').attr('value',data.data[i].cId).html(data.data[i].cName));
			    }
			    $(".chzn-select").trigger("chosen:updated");
			    if(cb){
					cb();
				}
			});
			
		},
		
		/**
		 * 获得车型信息根据商户id
		 */
		CarFactoryTypeByMerId : function(merId,fac,carType,facCB,cartypeCB){
			// 省市互联
			utils.ajax(sys.contextPath + '/common/getCarFacNoList',{"merchantId":merId},function(data){
				fac.html('').append($('<option>').attr('value','').html('--品牌--'));
			    for(var i=0; i<data.data.length;i++){
			    	fac.append($('<option>').attr('value',data.data[i]).html(data.data[i]));
			    }
			    $(".chzn-select").trigger("chosen:updated");
				if(facCB)
					facCB();
			});
			if(carType){
				fac.change(function(){
					carType.html('').append($('<option>').attr('value','').html('--车系--'));
					utils.ajax(sys.contextPath + '/common/getCarList',{"facName":fac.val()},function(data){
						    for(var i=0;i<data.data.length; i++)
						    	carType.append($('<option>').attr('value',data.data[i].carId).html(data.data[i].carName));
						    $(".chzn-select").trigger("chosen:updated");
						if(cartypeCB){
							cartypeCB();
						}
					});
				});
				
				carType.change(function(){
					if(carType){
						carType();
					}
				});
			}
		},
		
		getSalesTypeList : function(facCB,cartypeCB){
			$.getJSON(sys.contextPath + '/sales/getSalesTypeList',function(data){
				if(facCB){
					facCB(data);
				}
			});
		},
		
		/**
		 * 获取省份对应车牌
		 * prov
		 */
		ProvincesAreas : function(prov , area, provincesCb,cityCb, completeCb){
			// 省市互联
			$.getJSON(sys.contextPath + '/common/getProvinces4Car',function(data){
				prov.html('').append($('<option>').attr('value','').html('请选择区域'));
				for(var i in data.data)
					prov.append($('<option>').attr('value',data.data[i].pShortName)
							.attr('pSname',data.data[i].pShortName)
							.attr('pName',data.data[i].pName)
							.html(data.data[i].pShortName));
				if(completeCb)
					completeCb();
			});
			prov.change(function(){

				area.html('').append($('<option>').attr('value','0').html('请选择城市'));
				utils.ajax(sys.contextPath + '/common/getCities4Car',{pShortName:prov.val()},function(data){
					for(var i in data.data)
						area.append($('<option>').attr('value',data.data[i].cId).attr('cNum',data.data[i].cNum).attr('cName',data.data[i].cName).html(data.data[i].cNum));
					if(provincesCb)
						provincesCb();
				});
			});		
			area.change(function(){
				if(cityCb){
					cityCb();
				}
			});
		},
		
		
		
		/**
		 *  服务应用数据
		 */
		ServiceList : function(cont,cb){
			// 获取应用服务
			$.getJSON(sys.contextPath + '/district_getProvinces.action',function(data){
				cont.html('').append($('<option>').attr('value','').html('全部应用'));
				for(var i in data.provinces)
					cont.append($('<option>').attr('value',data.provinces[i].pId).html(data.provinces[i].pName));
			});
		},
		
		/**
		 * input_query : 输入框jquery对象
		 * querySelectCb : 获取数据方法
		 * selectCb : 选择数据回调
		 */
		suggest : function(input_query , querySelectCb , selectCb , className){
			var key = input_query.attr('id'); 
			input_query.wrap('<span style="position:relative;z-index:10;" class="' + (className?className:'') + '"></span>');
			input_query.before('<input type="hidden" name="'+key+'_3word" id="'+key+'_3word" value="" />');
			input_query.after('<div id="'+key+'suggest" class="beginTxtSub"></div>');
			input_query.suggest([],{hot_list:null,dataContainer:'#'+key+"_3word",onSelect:function(data){
				    	if(selectCb)
				    		selectCb(data);
		        }, attachObject:'#'+key+'suggest', ajaxFlag : true , resultsClass : '' , querySelectCb : function(cb){
		        	if(querySelectCb){
		        		querySelectCb(cb);
		        	}
		        }});
		},
		
		/**
		 * 发送ajax请求（以对象形式传参）
		 * @param {Object} args
		 */
		sendAjax : function(args) {
			args.loadSetting = (!args.loadSetting) ? {} : args.loadSetting;
			utils.ajax(args.url, args.param, args.successCB, args.errorCB, args.postType,
					args.dataType, args.cacheType, args.loadSetting,args.async,args.contentType);
		},
		
		
		/**
		 * 发送ajax请求包装
		 * url : 请求方法路径
		 * param : 请求参数 : json对象
		 * successCB : 成功返回时的回调函数  回调函数中返回data　：即后台返回数据 ,  
		 * 			说明 ：在successCB中不负责当前请求后台返回数据是否正确，只保证此次请求是以状态 200 回来的请求
		 * errorCB : 请求错误回调 , 回调函数中返回errorObj
		 * cacheType : 缓存操作 
		 */
		ajax : function(url, param, successCB, errorCB, postType, dataType,
			cacheType, loadSetting,async,contentType) {
			postType = (!postType) ? "POST" : postType;
		    cacheType = (cacheType == null) ? false:cacheType;
		    dataType = (dataType == null)? "json":dataType;
		    async = (async == null)?true:async;
		    $.ajax( {             
		        url : url,
		        data : param,
		        cache : cacheType,
		        type : postType,
		        dataType : dataType,
		        contentType : contentType,
		        async : async,
		        success : function(data){
		        	if (data && data.retCode != 0) {
						if (data.retCode) {
							if (data.retCode == -1003) {
								window.parent.location.href = "/";
							}
							else if(data.retCode == -1000)
							{
								art.dialog( {
									title : '提示',
									content : data.message,
									icon : 'warning',
									time : 3
								});
								return;
							}
						}
					}
		    		if(successCB){
		    			successCB(data);
		    		}
		    	},
		        error : function(errorObj){
		    		if(errorCB){
		    			errorCB(errorObj);
		    		}else{
		    			//alert("请求数据失败，请稍候再试。("+errorObj['statusText']+")");
		    		}
		    	},
		    	beforeSend : function(){
		    		if(loadSetting){
		    			artDialog({
		    				id: 'Tips',
		    				title: false,
		    				cancel: false,
		    				fixed: true,
		    				lock: true
		    			}).content('<div style="padding: 0 1em;">' + loadSetting + '</div>');
		    		}
		    	},
		    	complete: function(){
		    		if(loadSetting){
		    			var list = art.dialog.list;
		    			for (var i in list) {
		    				list[i].close();
		    			};
		    		}
		    	}
		    });
		},
		
		/**
		 * 跨域ajax请求
		 * @param url
		 * @param param
		 * @param successCB
		 * @param errorCB
		 * @param loadSetting
		 */
		ajaxJSONP : function(url, param, successCB, errorCB,loadSetting) {
			$.ajax( {
				url : url+ '?randomCode=' + (Math.random()),
				data : param,
				cache : false,
				type : 'post',
				method: "POST",
				dataType : 'jsonp',
				async : true,
				success : function(data) {
					if (successCB) {
						successCB(data);
					}
				},
				error : function(errorObj) {
					if (errorCB) {
						errorCB(errorObj);
					} else {
						alert("请求数据失败，请稍候再试");
					}
				}
			});
		},
		
		ajaxForm : function(url,param,successCB,errorCB){
		   if($.type(param) != 'string'){
		       alert("参数错误(标准参数格式：key=val&key=value)");
		   }else{
		       if(param.length==0){
		           param="";
		       }else{
		           param="?"+param;
		       }
	          var _body = $('body');
	            if(_body){
	                _body.append('<form action="" id="findTrackForm"></form>');
	                setTimeout(function(){
	                    $("#findTrackForm").attr('action', url+param);
	                    var options = {
	                            success : function(data) {
	                                data = eval("(" + data + ")");
	                                successCB(data);
	                                $("#findTrackForm").remove();
	                                       },
	                            resetForm : false
	                     };
	                    $('#findTrackForm').ajaxSubmit(options);
	                },200);
	            }
		   }
		},
		
		/**
		 * 文件上传formId：form表单的ID
		 * fid ：fid文件ID	
		 * cb回调函数
		 */
	    uploadFile : function(fromId,fid,cb,errorCB,cdnFile){
			    var userId = "9512635719";
				var key = $.trim($.trim(userId)+sys.fileKey);
		        var options = {
		            url : ($.trim(cdnFile)?cdnFile:ipConfig.fileService)+"/upload.action?sign="+key.MD5(32)+"&fid="+fid+"&uid="+userId,
		            type : 'POST',
		            cache:true,
		            contentType : "application/x-www-form-urlencoded; charset=utf-8", 
		            mitType : "uplaodFile",
		            dataType : "json",
		            success : function(data) {
		            	if(!data){
		            		utils.warningTip("文件上传失败，请重新上传！");
	                    	if(errorCB)
	                    		errorCB();
		            	}else{
		            		if(data.retCode == 0){
		                        if(cb)
		                        	cb(data);
		                    }else if(data.retCode==2){
		                    	utils.warningTip("文件大小超过了指定大小");
		                    	if(errorCB)
		                    		errorCB();
		                    }else {
		                    	utils.warningTip("文件服务器错误，请重新上传");
		                    	if(errorCB)
		                    		errorCB();
		                    }
		            	}
		            },
		            error : function(data){
		            	utils.warningTip("上传文件错误！");
                    	if(errorCB)
                    		errorCB();
		            }
		        };
		      $('#'+fromId).ajaxSubmit(options);
	    },
	   
		/**
		 * dest : 装载分页容器 $对象
		 * pageCount : 页总记录数
		 * pageNo : 当前页数  第一页下标为 0 , 以此类推
		 * cb : 分页完成后回调函数
		 * pageBar : TRUE OR FLASE 是否需要指定跳转功能
		 * preNum : 中心页前显示页数
		 * allNum ：总显示页数
		 */
		paginationPage : function(dest , pageCount , pageNo , cb ,pageBar, preNum , allNum){
			if(utils.paginationSys){
				if(!dest){
					utils.errorTip('请设置分页装载容器！');
					return false;
				}
				
				if(isNaN(pageCount)){
					utils.errorTip('请设置分页总数！');
					return false;
				}
				
				if(isNaN(pageNo)){
					utils.errorTip('请设置当前页数！');
					return false;
				}
				
				if(!cb){
					utils.errorTip('请设置翻页回调函数！');
					return false;
				}
				if(!pageBar){
					pageBar = false;
				}
				if(pageCount==0){
					dest.html('暂无数据');
					return;
				}
				utils.paginationSys.turnPage(dest , pageCount , pageNo , cb , pageBar, preNum , allNum);
			}
		},
		/**
		 * BASE64加密
		 */
		base64encode : function(str){
			return utils.base64.encode(str);
		},
		base64decode : function(str){
			return utils.base64.decode(str);
		},
		formateDate : function(date, formate) {
			if(date =="" || date==null) return "";
			// 年月日处理
			var year = 1900 + date.year;
			var month = date.month + 1;
			var day = date.date;
			if (month < 10)
				month = "0" + month;
			if (day < 10)
				day = "0" + day;
			// 时间处理
			var hours = date.hours;
			var minutes = date.minutes;
			var seconds = date.seconds;
			if (hours < 10)
				hours = "0" + hours;
			if (minutes < 10)
				minutes = "0" + minutes;
			if (seconds < 10)
				seconds = "0" + seconds;
			if (formate == 'y-m-d') {
				return year + "-" + month + "-" + day;
			}
			if (formate == 'y-m-d h:i:s') {
				return year + "-" + month + '-' + day + ' ' + hours + ':' + minutes
						+ ":" + seconds;
			}
			// 默认
			return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
		},
		
	     /**
	     * 毫秒数转成时间格式
	     */
	    dateFormatStr:function(num){
	        var month=(num.getMonth()+1)>=10?(num.getMonth()+1):("0"+(num.getMonth()+1));
	        var date=(num.getDate())>=10?(num.getDate()):("0"+(num.getDate()));
	        var hour=(num.getHours())>=10?(num.getHours()):("0"+(num.getHours()));
	        var minutes=(num.getMinutes())>=10?(num.getMinutes()):("0"+(num.getMinutes()));
	        var seconds=(num.getSeconds())>=10?(num.getSeconds()):("0"+(num.getSeconds()));
	        
	        return num.getFullYear()+"-"+month+"-"+date+" "+hour+":"+minutes+":"+seconds;
	         
	    },
	    
	    /**
	     * 格式化时间
	     * 2000-10-10
	     * @param {} curDate
	     * @return {}
	     */
	    formatDateYMD : function(curDate) {
	        if (curDate) {
	            var month = curDate.getMonth() + 1;
	            var day = curDate.getDate();
	            var year = curDate.getFullYear();
	            if (month < 10)
	                month = "0" + month;
	            if (day < 10)
	                day = "0" + day;
	            return year + "-" + month + "-" + day;
	        } else {
	            return "";
	        }
	    },
	    
	    dateFormatSec : function(date,splitStr,type){
	        if (date) {
	            if(!splitStr){
	                splitStr = "/";
	            }
	            var month = parseInt(date.month)<9?"0"+(date.month+1):date.month+1;
	            var day = parseInt(date.date)<10?"0"+date.date:date.date;
	            var year = 1900 + date.year;
	            var hours = parseInt(date.hours)<10?"0"+date.hours:date.hours;
	            var minutes = parseInt(date.minutes)<10?"0"+date.minutes:date.minutes;
	            var seconds = parseInt(date.seconds)<10?"0"+date.seconds:date.seconds;
	            if(type == "time")
	            	return year + splitStr + month + splitStr + day + ' ' + hours + ':' + minutes + ':' + seconds;
	            else
	            	return year + splitStr + month + splitStr + day + ' ' ;//+ hours + ':' + minutes + ':' + seconds;
	        } else {
	            return "未知";
	        }
	    },
		initContorlRemoveErrorStyle :function(contorl,promptText,group){
			$(contorl).focus(function(){
				utils.removeErrorStyle(contorl,promptText,group);
			}).click(function(){
				utils.removeErrorStyle(contorl,promptText,group);
			});
		},
		/**
    * 取出相应的request过来的值,val是设置值的名称
    */ 
	QueryString : function(val) {
		var uri = window.location.search;
		var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
		return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1))
				: null);
	},
	/**
	 * 获取全部参数，并返回数组
	 */
	QueryStrings : function() {
		var uri = window.location.search;
		var re = /\w*\=([^\&\?]*)/ig;
		var retval = [];
		while ((arr = re.exec(uri)) != null)
			retval.push(arr[0]);
		return retval;
	},
	/**
	 * 如果当前地址栏有此参数，那么将更新此参数，否则返回一个新的地址栏参数字符串。
	 */ 
	setQuery : function(val1, val2) {
		var a = this.QueryStrings();
		var retval = "";
		var seted = false;
		var re = new RegExp("^" + val1 + "\=([^\&\?]*)$", "ig");
		for ( var i = 0; i < a.length; i++) {
			if (re.test(a[i])) {
				seted = true;
				a[i] = val1 + "=" + val2;
			}
		}
		retval = a.join("&");
		return "?" + retval
				+ (seted ? "" : (retval ? "&" : "") + val1 + "=" + val2);
	},
    
	/**
	 * 截取字符串
	 */
	interceptString : function(str, length) {
		if(!length)
			length = 15;
		if (str) {
			if (str.length > length) {
				str = str.substr(0, length) + "...";
			}
			return str;
		}
		return "";
	},
	
	/**
	 * HTMLEncode方法编码
	 */
	HTMLEnCode : function(str) {
		var s = "";
		if (str.length == 0)
			return "";
		s = str.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/  /g, "&nbsp;");
		s = s.replace(/\'/g, "&apos;");
		s = s.replace(/\"/g, "&quot;");
		s = s.replace(/\n/g, "<br>");
		return s;
	},

	/**
	 * HTMLDeCode方法解码
	 */
	HTMLDeCode : function(str) {
		var s = "";
		str = str ? str : '';
		if (str.length == 0)
			return "";
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, "  ");
		s = s.replace(/&apos;/g, "\'");
		s = s.replace(/&quot;/g, "\"");
		s = s.replace(/<br>/g, "\n");
		return s;
	},
	
	/**
	 * 截取字符串（按字节）
	 * str ： 原字符串
	 * length : 指定字节长度
	 */
	subStrByCharCode : function(str, length){
//		return str.replace(/([\u0391-\uffe5])/ig,'$1a').substring(0,length).replace(/([\u0391-\uffe5])a/ig,'$1')
		var retText = "";
		if(str && $.trim(str).length > 0){
    		var text = str.replace(/([\u0391-\uffe5])/ig,'$1a');
            retText = text.substring(0,length).replace(/([\u0391-\uffe5])a/ig,'$1');
            if(text.length > length){
                retText += '...';
            }
		}
        return retText;
    },
    
    /**
     * 获得字符串的长度
     */
    getStrLength : function(str){
    	if(str && $.trim(str).length > 0){
    		var text = str.replace(/([\u0391-\uffe5])/ig,'$1a');
            retText = text.replace(/([\u0391-\uffe5])a/ig,'$1');
            return retText.length;
		}else{
			return 0;
		}
    	
    },
    
    /**
	 * 计算字符串长度,中文按2计算
	 */
	getBytesLength : function(str) {
		var len = 0;
		if(str){
			len = str.replace(/[^\x00-\xff]/g,"xx").length;
		}
		return len;
	},
    
	/**
	 * 字符串转byte数组
	 */
	stringToBytes : function(str) {  
		var ch, st, re = [];  
		for (var i = 0; i < str.length; i++) {  
		    ch = str.charCodeAt(i);  // get char   
		    st = [];                 // set up "stack"  
		    do {  
		      st.push( ch & 0xFF );  // push byte to stack  
		      ch = ch >> 8;          // shift value down by 1 byte  
		    }    
		    while (ch);  
		    // add stack contents to result  
		    // done because chars have "wrong" endianness  
		    re = re.concat(st.reverse());  
		}  
		// return an array of bytes  
		return re;  
	},  
	
    /**
     * 获取表格数据加载中的HTML
     */
    getTbodyLoadingHtml : function(rowNum){
    	if(!rowNum){
    		rowNum = 1;
    	}
    	var loadHtml = $('<tr align="center"><td colspan="'+rowNum+'"><image style="display:none" src="/clb/images/car_loading.gif"/>');
    	loadHtml.append('</td></tr>');
    	setTimeout(function(){
    		if(loadHtml.find('img')){
    			loadHtml.find('img').show();
    		}
    	},1000);
    	return loadHtml;
    },
    
	/**
     * 验证手机号码
     */
    validationMobile : function(mobile){
    	return /^1\d{10}$/g.test(mobile) || (/^15[0-35-9]\d{8}$/g.test(mobile)) || (/^14[0-35-9]\d{8}$/g.test(mobile))
		|| (/^18\d{9}$/g.test(mobile));
    },
    /**
     * 验证数字
     */ 
    validationMileage : function(mileage){
    	return /^[0-9]\d*$/g.test(mileage) && parseInt(mileage)<100000 && parseInt(mileage)>=0;
    },
    /**
     * 验证邮箱
     * @param email
     */
    validationEmail : function(email){
    	var emailReg=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    	return emailReg.test(email);
    },
    /**
     * 验证身份证
     * @param isCardId
     */
    isCardId : function(cardId){
	 // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
	   return reg.test(cardId);
    },
    /**
     * 银行卡号验证
     * @param bandCard
     * @returns
     */
    isBandCard : function(bandCard){
   	  // 银行卡号验证  
       var reg = /^(\d{16}|\d{19})$/; 
   	   return reg.test(bandCard);
       },
    
    /**
     * 构造下拉框
     * @auth huchao
     * @param {Object} obj 下拉框ID
     * @param {Object} source 数据源
     * @param {Object} all 是否构造全部选项
     */
    buildSelect : function(objId, source, all) {
		var obj = $('#' + objId + '');
		if (obj) {
			if (all == true) {
				obj.append($('<option value="" selected="selected">全部</option>'));
			}
			for (var key in source) {
				var desc = source[key];
				obj.append($('<option value="' + key + '">' + desc
						+ '</option>'));
			}
			$(".chzn-select").trigger("chosen:updated");
		}
	},
	 /**
     * 构造下拉框
     * @auth huchao
     * @param {Object} obj 下拉框ID
     * @param {Object} source 数据源
     * @param {Object} all 是否构造全部选项
     */
	buildCombobox : function(objId, source, keyName, valueName, all) {
		var select = $('#' + objId + '');
		if (select) {
			if (all == true) {
				select.append($('<option value="" selected="selected">全部</option>'));
			}
			for (var key in source) {
				var obj = source[key];
				var id = obj[valueName];
				var desc = obj[keyName];
				select.append($('<option value="' + id + '">' + desc
						+ '</option>'));
			}
		}
	},
	
	download : function(objId, downURL, getQueryStr)
	{
		if(objId && downURL)
		{
			var obj = $('#' + objId + '');
			if(obj)
			{
				obj.click(function(){
					var queryString = '';
					if(getQueryStr){
						queryString = getQueryStr();				
					}
					var paramStr = '';
					if(queryString && queryString.length>0)
					{
						paramStr = '?' + queryString;
					}
					var downloadFullURL = sys.contextPath + downURL + paramStr;
					//导出excel
					location.href = downloadFullURL;
				});
			}
		}
	},
	
	/**
	 * 弹出居中的窗口
	 * @param {Object} url
	 * @param {Object} name
	 * @param {Object} iWidth
	 * @param {Object} iHeight
	 */
	openWindow : function(url, name, iWidth, iHeight)
	{
		var url; //转向网页的地址;
		var name; //网页名称，可为空;
		var iWidth; //弹出窗口的宽度;
		var iHeight; //弹出窗口的高度;
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
		window
				.open(
						url,
						name,
						'height='
								+ iHeight
								+ ',,innerHeight='
								+ iHeight
								+ ',width='
								+ iWidth
								+ ',innerWidth='
								+ iWidth
								+ ',top='
								+ iTop
								+ ',left='
								+ iLeft
								+ ',toolbar=no,menubar=no,scrollbars=auto,resizeable=yes,location=no,status=no');
	},
	
	
	
	
	
	 //浮点数加法运算
	floatAdd : function(arg1, arg2) {
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		return (arg1 * m + arg2 * m) / m;
	},

	//浮点数减法运算
	floatSub : function(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		//动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	},

	//浮点数乘法运算
	floatMul : function(arg1, arg2) {
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch (e) {
		}
		try {
			m += s2.split(".")[1].length;
		} catch (e) {
		}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
				/ Math.pow(10, m);
	},

	//浮点数除法运算
	floatDiv : function(arg1, arg2) {
		var t1 = 0, t2 = 0, r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch (e) {
		}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch (e) {
		}
		with (Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return (r1 / r2) * pow(10, t2 - t1);
		}
	},
	/**
	 * 数字转为中文
	 * @param num
	 * @returns {String}
	 */
	getChinese : function (num)
	{
	     
		if (!/^\d*(\.\d*)?$/.test(num)) { alert("Number is wrong!"); return "Number is wrong!"; }
		var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
		var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", "");
		var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
		for (var i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
		case 0: re = BB[7] + re; break;
		case 4: if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
		re = BB[4] + re; break;
		case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
		if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++;
		}

		if (a.length > 1) //加上小数部分(如果有小数部分)
		{
		re += BB[6];
		for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
		}
		return re; 
	},
	/**
	 * 
	 * @param {Object} 构造列表
	 */
	buildList : function(args) {
		var errMsg = args.errMsg ? args.errMsg : '系统异常，请稍后再试！';
		var isUrl = typeof args.urlOrData == "string";
		var url = isUrl ? args.urlOrData : null;
		var data = isUrl ? null : args.urlOrData;
		if (data) {
			utils.doBuildList(args, data);
		} else {
			utils.ajax(url, args.params, function(data) {
				utils.doBuildList(args, data);
			}, function() {

				//失败回调
					art.dialog( {
						title : '错误',
						content : errMsg,
						icon : 'error',
						time : 3
					});
				}, "POST", "json", false,{});
		}

	},
	
	doBuildList : function(args,data) {
		var container = $('#' + args.id);
		var errMsg = args.errMsg ? args.errMsg : '系统异常，请稍后再试！';
		if (data && data.retCode == 0) {
			container.html('');
			if (data.data) {
				// 设置模板   
				container.setTemplateURL(args.tmpl, null, {
					filter_data : true
				});
				container.setParam('contextPath', sys.contextPath);
				container.setParam('currentPage', args.currentPage);
				// 给模板加载数据
				container.processTemplate(data.data);
				//设置单双行数据
				publicUtility.tableClass(args.id);
				if(data.page){
					
					utils.paginationPage($('#'+args.pid), data.page.totalPage, parseInt(data.page.curPage-1), args.resFun,true);
				}
			}
			//返回记录为空
			if (!(data.data) || data.data.length == 0) {
				var thColums = container.prev().find('th').size();
				container.append('<tr><td colspan="' + thColums + '" style="height:30px;line-height:30px;">没有数据显示</td></tr>');
			}
		} else {
			//服务器返回失败
			art.dialog( {
				title : '错误',
				content : errMsg,
				icon : 'error',
				time : 3
			});
		}
	},
    
	param : function(params){
		var s=[];
		for (var j in params){
				s[s.length]=encodeURIComponent(j)+'='+encodeURIComponent(params[j]);
		}
		return s.join('&');
		
	},
	
	/**
	 * 设置控件的隐藏和显示,可用不可用
	 * @param {Object} ctls 控件ID或Class集合 如:['#submit','#cancle','.display']
	 * @param {Object} op 操作类型1:显示,2:隐藏,3:可用,4:不可用
	 */
	setCtlDisplay:function(ctls,op){
		if(ctls&&ctls.length>0){
			switch(op){
				case 1:
				for(var i=0;i<ctls.length;i++){
					$(ctls[i]).show();
				}
				break;
				case 2:
				for(var i=0;i<ctls.length;i++){
					$(ctls[i]).hide();
				}
				case 3:
				for(var i=0;i<ctls.length;i++){
					$(ctls[i]).attr('disabled',false);
				}
				break;
				case 4:
				for(var i=0;i<ctls.length;i++){
					$(ctls[i]).attr('disabled',true);
				}
				break;
				default:
				for(var i=0;i<ctls.length;i++){
					$(ctls[i]).show();
				}
				break;
			}
			
		}
	},
    
	/**
	 * 保存或获取数据
	 */
	data : function(k, v){
		if(arguments){
			if(!utils.cache){
				utils.cache = {};
			}
			if(arguments.length == 1 && typeof arguments[0] === "string"){
				var value = utils.cache[arguments[0]];
				delete utils.cache[arguments[0]];
				return value;
			}else if(arguments.length == 2 && typeof arguments[0] === "string"){
				utils.cache[arguments[0]] = arguments[1];
			}
		}
	},
	
	/**
	 * 图表无数据显示
	 */
	showNodataChart : function(obj){
		obj.html('<div class="tac pt20"><img src="'+sys.contextPath+'/images/load.gif" style="vertical-align:middle;" />&nbsp;正在加载...</div>');
	},
	/**设置以post方式提交
	 * @param URL 提交地址
	 * @param PARAMS 参数,数组{key:value,key:value}
	 */
	 postform : function(URL, PARAMS) {        
        var temp = document.createElement("form");        
        temp.action = URL;        
        temp.method = "post";
        temp.style.display = "none";        
        for (var x in PARAMS) {        
            var opt = document.createElement("input");        
            opt.name = x;        
            opt.value = PARAMS[x];               
            temp.appendChild(opt);        
        }        
        document.body.appendChild(temp);        
        temp.submit();        
        return temp;        
    }
	
};


	

(function($) {    
    // the code of this function is from     
    // http://lucassmith.name/pub/typeof.html    
    $.type = function(o) {    
        var _toS = Object.prototype.toString;    
        var _types = {    
            'undefined': 'undefined',    
            'number': 'number',    
            'boolean': 'boolean',    
            'string': 'string',    
            '[object Function]': 'function',    
            '[object RegExp]': 'regexp',    
            '[object Array]': 'array',    
            '[object Date]': 'date',    
            '[object Error]': 'error'    
        };    
        return _types[typeof o] || _types[_toS.call(o)] || (o ? 'object' : 'null');    
    };    
    // the code of these two functions is from mootools    
    // http://mootools.net    
    var $specialChars = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };    
    var $replaceChars = function(chr) {    
        return $specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);    
    };    
    $.toJSON = function(o) {    
        var s = [];    
        switch ($.type(o)) {    
            case 'undefined':    
                return '""';    
                break;    
            case 'null':    
                return 'null';    
                break;    
            case 'number':    
            case 'boolean':    
            case 'date':    
            case 'function':    
                return o.toString();    
                break;    
            case 'string':    
                return '"' + o.replace(/[\x00-\x1f\\"]/g, $replaceChars) + '"';    
                break;    
            case 'array':    
                for (var i = 0, l = o.length; i < l; i++) {    
                    s.push($.toJSON(o[i]));    
                }    
                return '[' + s.join(',') + ']';    
                break;    
            case 'error':    
            case 'object':    
                for (var p in o) {    
                    s.push('"'+p+'"' + ':' + $.toJSON(o[p]));    
                }    
                return '{' + s.join(',') + '}';    
                break;    
            default:    
                return '';    
                break;    
        }    
    };    
    $.evalJSON = function(s) {    
        if ($.type(s) != 'string' || !s.length) return null;    
        return eval('(' + s + ')');    
    };    
})(jQuery);


function StringBuffer()
{
	this._string_=new Array();
}

StringBuffer.prototype.append = function(str)
{
	this._string_.push(str);
};

StringBuffer.prototype.toString = function()
{
	return this._string_.join("");
};

/**
 * 取得cookie中的信息
 * @param name cookie的name
 */    
function getCookie(name) 
{     
   var start = document.cookie.indexOf(name + "=");     
   var len = start + name.length + 1;     
   if ( ( !start ) && ( name != document.cookie.substring(0, name.length))) 
   {         
	 return null;     
   }     
   if ( start == -1 ) 
   {
     return null;   
   }
   var end = document.cookie.indexOf( ';', len );     
   if ( end == -1 ) end = document.cookie.length;     
   return unescape( document.cookie.substring( len, end ) ); 
} 
  
/**
 * 设置cookie中的信息
 * @param name cookie的name
 * @param name cookie的value
 */ 
function setCookie(name, value, expires, path, domain, secure) 
{     
	var today = new Date();     
	today.setTime( today.getTime() );     
	if ( expires ) 
	{         
		expires = expires * 1000 * 60 * 60 * 24;     
	}    
	 
	var expires_date = new Date( today.getTime() + (expires) );     
	document.cookie = name+'='+escape( value ) +         
	( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()         
	( ( path ) ? ';path=' + path : '' ) +         
	( ( domain ) ? ';domain=' + domain : '' ) +         
	( ( secure ) ? ';secure' : '' ); 
}  

/**
 * 删除cookie
 * @param name cookie的name
 */
function deleteCookie(name, path, domain) 
{     
	if (getCookie(name)) 
	{
	 document.cookie = name + '=' +             
	( ( path ) ? ';path=' + path : '') +             
	( ( domain ) ? ';domain=' + domain : '' ) +             
	';expires=Thu, 01-Jan-1970 00:00:01 GMT'; 
	}
} 

function rand(number) {
		var seed= new Date().getTime();
		return Math.ceil((seed*9301+49297) % 233280/(233280.0)*number);
}

/**
 * onmouseover延迟触发事件
 */
var delay=function(t,fn){//接收两个参数 t延迟时间秒为单位，fn要执行的函数
	var _this=this,//请注意还要个免费的this参数可以让这个delay更完美
	d=setInterval(function(){
		fn.apply(_this);
	},t*1000);
//	_this.onmouseout=function(){
//		alert('11');
//        clearInterval(d);
//    };
};

$.fn.outerHTML = function() {

    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
    return (!this.length) ? this : (this[0].outerHTML ||
    (function(el) {
        var div = document.createElement('div');
        div.appendChild(el.cloneNode(true));
        var contents = div.innerHTML;
        div = null;
        return contents;
    })(this[0]));
    
};

/**      
 * 对Date的扩展，将 Date 转化为指定格式的String      
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
 * eg:      
 * (new Date()).formate("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
 * (new Date()).formate("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).formate("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).formate("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).formate("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */
Date.prototype.formate = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, //月份         
		"d+" : this.getDate(), //日         
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
		"H+" : this.getHours(), //小时         
		"m+" : this.getMinutes(), //分         
		"s+" : this.getSeconds(), //秒         
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度         
		"S" : this.getMilliseconds()
	//毫秒         
	};
	var week = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};
(function($) {    
    // the code of this function is from     
    // http://lucassmith.name/pub/typeof.html    
    $.type = function(o) {    
        var _toS = Object.prototype.toString;    
        var _types = {    
            'undefined': 'undefined',    
            'number': 'number',    
            'boolean': 'boolean',    
            'string': 'string',    
            '[object Function]': 'function',    
            '[object RegExp]': 'regexp',    
            '[object Array]': 'array',    
            '[object Date]': 'date',    
            '[object Error]': 'error'    
        };    
        return _types[typeof o] || _types[_toS.call(o)] || (o ? 'object' : 'null');    
    };    
    // the code of these two functions is from mootools    
    // http://mootools.net    
    var $specialChars = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };    
    var $replaceChars = function(chr) {    
        return $specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);    
    };    
    $.toJSON = function(o) {    
        var s = [];    
        switch ($.type(o)) {    
            case 'undefined':    
                return '""';    
                break;    
            case 'null':    
                return 'null';    
                break;    
            case 'number':    
            case 'boolean':    
            case 'date':    
            case 'function':    
                return o.toString();    
                break;    
            case 'string':    
                return '"' + o.replace(/[\x00-\x1f\\"]/g, $replaceChars) + '"';    
                break;    
            case 'array':    
                for (var i = 0, l = o.length; i < l; i++) {    
                    s.push($.toJSON(o[i]));    
                }    
                return '[' + s.join(',') + ']';    
                break;    
            case 'error':    
            case 'object':    
                for (var p in o) {    
                    s.push(p + ':' + $.toJSON(o[p]));    
                }    
                return '{' + s.join(',') + '}';    
                break;    
            default:    
                return '';    
                break;    
        }    
    };    
    $.evalJSON = function(s) {    
        if ($.type(s) != 'string' || !s.length) return null;    
        return eval('(' + s + ')');    
    };    
    
})(jQuery);

	
	