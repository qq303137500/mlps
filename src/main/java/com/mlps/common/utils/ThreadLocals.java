package com.mlps.common.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 线程变量集合操作类
 * 
 */
public class ThreadLocals {

	public static final ThreadLocal<HttpServletResponse> RESPONSE = new ThreadLocal<HttpServletResponse>();

	public static final ThreadLocal<HttpServletRequest> REQUEST = new ThreadLocal<HttpServletRequest>();

	/** 运营商信息 */
//	public static final ThreadLocal<AccountVO> USERINFO_VO = new ThreadLocal<AccountVO>();
//
//	public static void setUserInfoVO(AccountVO userInfoVO) {
//		USERINFO_VO.set(userInfoVO);
//	}
//
//	public static AccountVO getUserInfoVO() {
//		return USERINFO_VO.get();
//	}

	/**
	 * @return the response
	 */
	public static HttpServletResponse getResponse() {
		return RESPONSE.get();
	}

	public static void setResponse(HttpServletResponse response) {
		RESPONSE.set(response);
	}

	/**
	 * @return the response
	 */
	public static HttpServletRequest getRequest() {
		return REQUEST.get();
	}

	public static void setRequest(HttpServletRequest request) {
		REQUEST.set(request);
	}

}
