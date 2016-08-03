var login = {
	loginURL : "securUser/login",
	initPage : function() {
		login.initStyle();
		login.initOperator();
		login.initLoad();
	},
	initStyle : function() {
	},
	initOperator : function() {
		$('#login-submit').click(function() {
			window.location.href = "mp/index.html";
			return ;
			login.gotoCheckLogin();
		});

		$("#password").keydown(function(event) {
			if (event.keyCode == 13) {
				login.gotoCheckLogin();
				return false;
			}
		});
	},
	initLoad : function() {
	},
	gotoCheckLogin : function() {
		var params = {};
		params["userName"] = $("#userName").val();
		params["pwd"] = $("#password").val().MD5(32);
		$.ajax({
			url : login.loginURL + '?date=' + new Date().getTime(),
			data : params,
			cache : false,
			type : "POST",
			dataType : "json",
			success : login.gotoCheckLogin_CB,
			error : null
		});
	},
	gotoCheckLogin_CB : function(data) {
		if (data.retCode == 0) {
			window.location.href = "mp/index.html";
		} else {
			var dialog = art.dialog({
				title : '提示',
				content : "用户名或密码不正确",
				time : 2,
				icon : 'warning',
				ok : function() {
					return true;
				}
			});
		}
	}
};