/**
 * 添加和编辑产品
 */
var addProduct = {

	id : null,

	initPage : function() {
		addProduct.initStyle();
		addProduct.initOperator();
		addProduct.initLoad();
	},

	initStyle : function() {

	},

	initOperator : function() {

		$('#saveBT').click(function() {
			if (addProduct.id) {
				addProduct.editProductInfo();
			} else {
				addProduct.addProductInfo();
			}
		});

		$('#cancelBT').click(function() {
			$(".main").load(sys.contextPath+"/mp/contentManage/appManage/productList.html");
		});
		// 上传缩略图
		$('#bizLicenseFile').change(function(){
			if($(this).val()=='')return;
			if(addProduct.photoValidate($(this).val())){
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
		if (mp_index.id) {
			addProduct.id = mp_index.id;
			// if(mp_index.opt && mp_index.opt == 'look'){
	// $('#cpName').attr('readonly','readonly');
	// $('#saveBT').hide();
	// }
	        addProduct.getProductById();
		}
	},

	/**
	 * 根据ID查找产品信息
	 */
	getProductById : function() {
		manage.getProductById( {
			'id' : addProduct.id
		}, function(data) {
			if (data && data.retCode == 0) {
				var _info = data.data;
				$('#cpName').val(_info.name);
				$('input[name="tagType"][value="' + _info.tagType + '"]').attr("checked", "checked");
				var  arr=_info.parCarType.split(',');
				for ( var i = 0; i < arr.length; i++) {
					$('input[name="parCarType"][value="' + arr[i] + '"]').attr("checked", "checked");
				}
				//$('input[name="parCarType"][value="' + _info.parCarType + '"]').attr("checked", "checked");
				$('#parShoufu').val(_info.parShoufu);
				$('#parBond').val(_info.parBond);
				$('#parTail').val(_info.parTail);
				$('#parPoundage').val(_info.parPoundage);
				$('#parTenancy').val(_info.parTenancy);
				$('#parLease').val(_info.parLease);
				$('#selling').val(_info.selling);
				$('#customer').val(_info.customer);
				$('#customerChara').val(_info.customerChara);
				$('#saleWords').val(_info.saleWords);
				$('#parBrief').val(_info.parBrief);
				$('#parAdvantage').val(_info.parAdvantage);
				if(_info.picture){
					$('#imgInfo').attr("src",_info.picture);
				}
				$('#financeAmount').val(_info.financeAmount);
				$('#financeScope').val(_info.financeScope);
				$('#repayMethod').val(_info.repayMethod);
				$('#insurance').val(_info.insurance);
				$('#leastFinance').val(_info.leastFinance);
				$('#leastShoufu').val(_info.leastShoufu);
				if (mp_index.opt && mp_index.opt == 'look') {
					$('.addCar input').attr('disabled', 'disabled');
					$('.addCar textarea').attr('disabled', 'disabled');
					//$('#bizLicenseFile').attr('disabled', 'disabled');
					//$('#parBrief').attr('disabled', 'disabled');
					//$('#parAdvantage').attr('disabled', 'disabled');
					$('#saveBT').hide();
				}
				mp_index.id = null;
				mp_index.opt = null;
			}
		}, function() {
			utils.errorTip("系统繁忙,请稍候再试!");
		});
	},

	/**
	 * 添加产品信息
	 */
	addProductInfo : function() {
		if (!addProduct.validateInput()) {
			return;
		}	
		var params = {};
		params['name'] = $.trim($('#cpName').val());
		params['tagType'] = $.trim($('input[name="tagType"]:checked').val());
		if(!params['tagType']){
			params['tagType'] = 0;
		}
		var obj = document.getElementsByName('parCarType');
		var chk_value = [];
		$('input[name="parCarType"]:checked').each(function() {
			chk_value.push($(this).val());
		});
		params['parCarType'] = chk_value.join(',');
		params['parShoufu'] = $.trim($('#parShoufu').val());
		params['parBond'] = $.trim($('#parBond').val());
		params['parTail'] = $.trim($('#parTail').val());
		params['parPoundage'] = $.trim($('#parPoundage').val());
		params['parTenancy'] = $.trim($('#parTenancy').val());
		params['parLease'] = $.trim($('#parLease').val());
		params['selling'] = $.trim($('#selling').val());
		params['customer'] = $.trim($('#customer').val());
		params['customerChara'] = $.trim($('#customerChara').val());
		params['saleWords'] = $.trim($('#saleWords').val());
		params['parBrief'] = $.trim($('#parBrief').val());
		params['parAdvantage'] = $.trim($('#parAdvantage').val());
		params['financeAmount'] = $.trim($('#financeAmount').val());
		params['financeScope'] = $.trim($('#financeScope').val());
		params['repayMethod'] = $.trim($('#repayMethod').val());
		params['insurance'] = $.trim($('#insurance').val());
		//params['leastFinance'] = $.trim($('#leastFinance').val());
		//params['leastShoufu'] = $.trim($('#leastShoufu').val());


		var _img = $('#imgInfo').attr("src");
		if(_img.indexOf('http')>=0){
			params['picture'] = _img;
		}
		params['status'] = 1;
		params['top'] = 0;
		params['operatorId'] = mp_index.userInfo.userId;
		manage.addProductInfo(params, function(data) {
			if (data && data.retCode == 0) {
				utils.succeedTip('操作成功');
				$(".main").load(sys.contextPath+"/mp/contentManage/appManage/productList.html");
			}
		}, function() {
			utils.errorTip("系统繁忙,请稍候再试!");
		});
	},

	/**
	 * 编辑产品信息
	 */
	editProductInfo : function() {
		if (!addProduct.validateInput()) {
			return;
		}
		var params = {};
		params['id'] = addProduct.id;
		params['name'] = $.trim($('#cpName').val());
		params['tagType'] = $.trim($('input[name="tagType"]:checked').val());
		if(!params['tagType']){
			params['tagType'] = 0;
		}
		var obj = document.getElementsByName('parCarType');
		var chk_value = [];
		$('input[name="parCarType"]:checked').each(function() {
			chk_value.push($(this).val());
		});
		params['parCarType'] = chk_value.join(',');
		params['parShoufu'] = $.trim($('#parShoufu').val());
		params['parBond'] = $.trim($('#parBond').val());
		params['parTail'] = $.trim($('#parTail').val());
		params['parPoundage'] = $.trim($('#parPoundage').val());
		params['parTenancy'] = $.trim($('#parTenancy').val());
		params['parLease'] = $.trim($('#parLease').val());
		params['selling'] = $.trim($('#selling').val());
		params['customer'] = $.trim($('#customer').val());
		params['customerChara'] = $.trim($('#customerChara').val());
		params['saleWords'] = $.trim($('#saleWords').val());
		params['parBrief'] = $.trim($('#parBrief').val());
		params['parAdvantage'] = $.trim($('#parAdvantage').val());
		params['financeAmount'] = $.trim($('#financeAmount').val());
		params['financeScope'] = $.trim($('#financeScope').val());
		params['repayMethod'] = $.trim($('#repayMethod').val());
		params['insurance'] = $.trim($('#insurance').val());
		//params['leastFinance'] = $.trim($('#leastFinance').val());
		//params['leastShoufu'] = $.trim($('#leastShoufu').val());

		var _img = $('#imgInfo').attr("src");
		if(_img.indexOf('http')>=0){
			params['picture'] = _img;
		}

		//params['picture'] = $.trim($('#picture').val());
		params['operatorId'] = mp_index.userInfo.userId;
	manage.editProductInfo(params, function(data) {
		if (data && data.retCode == 0) {
			utils.succeedTip('操作成功');
			$(".main").load(sys.contextPath+"/mp/contentManage/appManage/productList.html");
		}
	}, function() {
		utils.errorTip("系统繁忙,请稍候再试!");
	});
	},

	/**
	 * 验证输入
	 */
	validateInput : function() {
		var _cpNameLen = utils.getBytesLength($.trim($('#cpName').val()));
		var _tagTypeVal = $('input:radio[name="tagType"]:checked').val();
		var _parCarTypeVal = $('input[name="parCarType"]:checked').val();
		var _parShoufuLen = utils.getBytesLength($.trim($('#parShoufu').val()));
		var _parBondLen = $.trim($('#parBond').val());
		var _parTailLen = $.trim($('#parTail').val());
		var _parPoundageLen = $.trim($('#parPoundage').val());
		var _parTenancyLen = utils.getBytesLength($.trim($('#parTenancy').val()));
		var _parLeaseLen = utils.getBytesLength($.trim($('#parLease').val()));
		var _sellingLen = utils.getBytesLength($.trim($('#selling').val()));
		var _customerLen = utils.getBytesLength($.trim($('#customer').val()));
		var _customerCharaLen = utils.getBytesLength($.trim($('#customerChara').val()));
		var _saleWordsLen = utils.getBytesLength($.trim($('#saleWords').val()));
		var _parBriefLen = utils.getBytesLength($.trim($('#parBrief').val()));
		var _parAdvantageLen = utils.getBytesLength($.trim($('#parAdvantage').val()));
		var _financeAmountLen = utils.getBytesLength($.trim($('#financeAmount').val()));
		var _financeScopeLen = utils.getBytesLength($.trim($('#financeScope').val()));
		var _repayMethodLen = utils.getBytesLength($.trim($('#repayMethod').val()));
		var _insuranceLen = utils.getBytesLength($.trim($('#insurance').val()));
		//var _leastFinanceLen = utils.getBytesLength($.trim($('#leastFinance').val()));
		//var _leastShoufuLen = utils.getBytesLength($.trim($('#leastShoufu').val()));
		if (_cpNameLen == 0) {
			utils.warningTip('请输入产品名称');
			return false;
		} else {
			if (_cpNameLen > 100) {
				utils.warningTip('名称不能超过100字符');
				return false;
			}
		}

		var _pictureLen = utils.getBytesLength($.trim($('#imgInfo').attr("src")));
		var _pictureSrc=sys.contextPath+"/images/default_img.png";
		var _pictureSrc1=$.trim($('#imgInfo').attr("src"));//获取上传图片路径

		if (!_parCarTypeVal) {
			utils.warningTip('请选择车辆类型');
			return false;
		}


	/*
	if (_parBondLen && _parBondLen == 0) {
		utils.warningTip('请输入保证金比例');
		return false;
	} else {
		if (_parBondLen > 100) {
			utils.warningTip('保证金比例不能超过100字符');
			return false;
		}
	}
		
	    if (_parTailLen && _parTailLen == 0) {
			utils.warningTip('请输入尾款比例');
			return false;
		} else {
			if (_parTailLen > 100) {
				utils.warningTip('尾款比例不能超过100字符');
				return false;
			}
		}
	   
		if (_parPoundageLen && _parPoundageLen == 0) {
			utils.warningTip('请输入手续费比例');
			return false;
		} else {
			if (_parPoundageLen > 100) {
				utils.warningTip('手续费比例不能超过100字符');
				return false;
			}
		}
	  */
	if (_parTenancyLen > 100) {
		utils.warningTip('租期不能超过100字符');
		return false;
	}
	
	if (_parLeaseLen > 100) {
		utils.warningTip('租期类型不能超过100字符');
		return false;
	}
//	if ((_pictureLen == 0)||(_pictureSrc==_pictureSrc1)){
// 		utils.warningTip('请输入图片');
// 		return false;
// 	}
	
	
	
	if (_financeScopeLen==0) {
		utils.warningTip('请输入融资范围');
		return false;
	}
	if (_parShoufuLen == 0) {
		utils.warningTip('请输入首付比例');
		return false;
	} else {
		if (_parShoufuLen > 100) {
			utils.warningTip('首付比例不能超过100字符');
			return false;
		}
	}
	if (_financeAmountLen==0) {
		utils.warningTip('请输入融资比例');
		return false;
	}
	if (_repayMethodLen==0) {
		utils.warningTip('请输入还款方式');
		return false;
	}
	if (_parTenancyLen == 0) {
		utils.warningTip('请输入租期');
		return false;
	}
	if (_parLeaseLen == 0) {
		utils.warningTip('请输入租期类型');
		return false;
	}
	if (_insuranceLen==0) {
		utils.warningTip('请输入保险要求');
		return false;
	}
	/*
	  if (_leastFinanceLen==0) {
		utils.warningTip('请输入最低融资额');
		return false;
	}
	
	if (_leastShoufuLen==0) {
		utils.warningTip('请输入最低首付');
		return false;
	}
	*/
   /*
	if(!_tagTypeVal){
		 utils.warningTip('请选择标题标签');
		 return false;
		 }
	
	if ((_sellingLen > 0)||(_customerLen > 0)||(_customerCharaLen > 0)||(_saleWordsLen > 0)){
	  if (_sellingLen == 0) {
		  utils.warningTip('请输入产品卖点');
		  return false;
	  } else {
		  if (_sellingLen > 3000) {
		   	utils.warningTip('产品卖点不能超过3000字符');
			return false;
		 }
	  }

	  if (_customerLen == 0) {
		  utils.warningTip('请输入适用客户群');
		  return false;
	  } else {
	 	  if (_customerLen > 100) {
			  utils.warningTip('适用客户群不能超过100字符');
			  return false;
		  }
	  }

	  if (_customerCharaLen == 0) {
		  utils.warningTip('请输入类型客户特点');
		  return false;
	  } else {
		  if (_customerCharaLen > 3000) {
			  utils.warningTip('类型客户特点不能超过3000字符');
			  return false;
		  }
	  }

	  if (_saleWordsLen == 0) {
		  utils.warningTip('请输入销售话术');
		  return false;
	  } else {
		  if (_saleWordsLen > 3000) {
			  utils.warningTip('销售话术不能超过3000字符');
			  return false;
		  }
	  }
	  
	  return true;
   }
   */
	
//      if ((_parBriefLen > 0)||((_pictureLen > 0)&&(_pictureSrc!=_pictureSrc1))||(_parAdvantageLen > 0)){
//    	  if (_parBriefLen==0) {
//    		 utils.warningTip('请输入产品简介');
//    		 return false;
//    	 	}
//	     	if (_parAdvantageLen==0) {
//	     		utils.warningTip('请输入产品优势');
//	     		return false;
//	     	}
//	     	if ((_pictureLen == 0)||(_pictureSrc==_pictureSrc1)) {
//	     		utils.warningTip('请输入图片');
//	     		return false;
//	     	}
//	     	return true;
//      	}
//      else {
//      	   if(!_tagTypeVal){
//      		  utils.warningTip('请输入仅APP显示的内容或者仅微信服务号显示的内容');
//      		  return false;
//      	    }
//      			
//      	}
      return true;
	},

	/*
	 * 图片验证
	 */				
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