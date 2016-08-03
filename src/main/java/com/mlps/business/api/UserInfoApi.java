/**
 * 
 */
package com.mlps.business.api;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mlps.business.service.UserInfoService;
import com.mlps.common.controller.BaseController;
import com.mlps.common.vo.Response;
import com.mlps.pojo.UserInfo;
import com.msd.platform.util.Logs;

/**
 * 用户基本信息api
 * @author fangpc
 *
 */
@Controller
@RequestMapping("/api/userInfo")
public class UserInfoApi extends BaseController {

	@Resource
	private UserInfoService userInfoService;

	/**
	 * 注册用户
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/register")
	@ResponseBody
	public Object register(UserInfo userInfo) {
		Response<Object> response = new Response<Object>();
		try {
			userInfoService.createUserInfo(userInfo);
		} catch (Exception e) {
			Logs.error("register()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
	/**
	 * 获取个人用户资料
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/getUserInfo")
	@ResponseBody
	public Object getUserInfo(UserInfo userInfo) {
		Response<Object> response = new Response<Object>();
		try {
			userInfoService.createUserInfo(userInfo);
		} catch (Exception e) {
			Logs.error("getUserInfo()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
	/**
	 * 修改个人用户资料
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/updateUserInfo")
	@ResponseBody
	public Object updateUserInfo(UserInfo userInfo) {
		Response<Object> response = new Response<Object>();
		try {
			userInfoService.createUserInfo(userInfo);
		} catch (Exception e) {
			Logs.error("updateUserInfo()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
	
	/**
	 * 修改个人用户资料
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/modifyUserPwd")
	@ResponseBody
	public Object modifyUserPwd(UserInfo userInfo) {
		Response<Object> response = new Response<Object>();
		try {
			userInfoService.createUserInfo(userInfo);
		} catch (Exception e) {
			Logs.error("modifyUserPwd()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
	/**
	 * 修改个人用户资料
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/resetUserPwd")
	@ResponseBody
	public Object resetUserPwd(UserInfo userInfo) {
		Response<Object> response = new Response<Object>();
		try {
			userInfoService.createUserInfo(userInfo);
		} catch (Exception e) {
			Logs.error("resetUserPwd()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
}
