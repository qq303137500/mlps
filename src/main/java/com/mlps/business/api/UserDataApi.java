package com.mlps.business.api;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mlps.business.service.UserDataService;
import com.mlps.common.vo.Response;
import com.mlps.pojo.UserData;
import com.msd.platform.util.Logs;

/**
 * 用户数据接口
 * @author fangpc
 *
 */
@Controller
@RequestMapping("/api/userData")
public class UserDataApi {
	
	@Resource
	private UserDataService userDataService;

	/**
	 * 保存用户数据
	 * @return
	 */
	@RequestMapping(value = "/saveUserData")
	@ResponseBody
	public Object saveUserData (UserData userData){
		Response<Object> response = new Response<Object>();
		try {
			userDataService.createUserInfo(userData);
		} catch (Exception e) {
			Logs.error("saveUserData()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
}
