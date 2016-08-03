/*
 * @fileName：RightInterceptor.java    2011-3-24 下午01:08:41
 *
 * Copyright (c) 2011 MSD Technologies, Inc. All rights reserved.
 * <P>Title：<P>
 * <P>Description：<P>
 * <P>Copyright: Copyright (c) 2011 <P>
 * <P>Company: MSD <P>
 * @author huchao
 * @version 1.0
 *
 */
package com.mlps.business.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import com.mlps.business.utils.AuthorityUtils;
import com.mlps.common.constants.Constants;
import com.msd.platform.common.constants.ConfigConstants;
import com.msd.platform.common.constants.ErrorCodeConstants;
import com.msd.platform.common.constants.LogModule;
import com.msd.platform.common.interceptor.BaseHandlerInterceptorAdapter;
import com.msd.platform.component.config.CommonConfigUtils;
import com.msd.platform.helper.DataCacheFactory;
import com.msd.platform.util.Logs;
import com.msd.platform.vo.Response;

/**
 * <P>
 * Description： 鉴权拦截器，
 * </P>
 * 
 * @author huchao
 * @version 1.0
 */
@Component
public class RightInterceptor extends BaseHandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		boolean flag = false;
		String path = request.getServletPath();
		if (StringUtils.isBlank(path)) {
			path = request.getRequestURI();
		}
		// IP鉴权开关
		String ipGrantSwitch = ConfigConstants.SWITCH_ON;
		String str = CommonConfigUtils.getString(ConfigConstants.ITEM_IP_RIGHT_SWITCH);
		if (StringUtils.isNotEmpty(str)) {
			ipGrantSwitch = str;
		}
		// 验证开关
		if (ConfigConstants.SWITCH_ON.equals(ipGrantSwitch)) {
			String ipAddress = this.getIpAddr(request);
			flag = AuthorityUtils.grantIP(ipAddress);
			if (!flag) {
				// IP鉴权失败
				String errMsg = "IP鉴权失败，[ipAddress = " + ipAddress + "]";
				Logs.info(LogModule.SYSTEM, errMsg);
				buildResult(response, errMsg);
				return false;
			}
		}
		
		// 时间戳验证开关
		String timestampRightSwitch = ConfigConstants.SWITCH_ON;
		str = CommonConfigUtils.getString(Constants.ITEM_TIMESTAMP_RIGHT_SWITCH);
		if (StringUtils.isNotEmpty(str)) {
			timestampRightSwitch = str;
		}
		//验证时间戳
		if(ConfigConstants.SWITCH_ON.equals(timestampRightSwitch)){
			Long timestamp = 0l;
			try {
				timestamp = Long.parseLong(request.getParameter("timestamp"));
				flag = AuthorityUtils.verifyTimestamp(timestamp);
			} catch (Exception e) {
				flag = false;
			}
			if(!flag){
				// 验证时间戳失败
				String errMsg = "时间戳验证失败，失效的请求[timestamp = " + timestamp + "]";
				Logs.info(LogModule.SYSTEM, errMsg);
				buildResult(response, errMsg);
				return false;
			}
		}
		
		// 签名验证开关
		String signRightSwitch = ConfigConstants.SWITCH_ON;
		str = CommonConfigUtils.getString(ConfigConstants.ITEM_SIGN_RIGHT_SWITCH);
		if (StringUtils.isNotEmpty(str)) {
			signRightSwitch = str;
		}
		//验证签名
		if (ConfigConstants.SWITCH_ON.equals(signRightSwitch)) {
			List<String> paramNames = DataCacheFactory.getSignFields(path);
			StringBuilder paramValues = new StringBuilder();
			if (CollectionUtils.isNotEmpty(paramNames)) {
				for (String paramName : paramNames) {
					String paramValue = request.getParameter(paramName);
					paramValues.append(paramValue);
				}
				String sign = request.getParameter("sign");
				flag = AuthorityUtils.verifySign(paramValues.toString(), sign);
				if (!flag) {
					// 签名验证失败
					String errMsg = "签名验证失败，[sign = " + sign + "]";
					Logs.info(LogModule.SYSTEM, errMsg);
					buildResult(response, errMsg);
					return false;
				}
			} else {
				Logs.info(LogModule.SYSTEM, "not SignFields...");
			}
		}
		return super.preHandle(request, response, handler);
	}

	public void buildResult(HttpServletResponse response, String errMsg) {
		Logs.warn(LogModule.SYSTEM, errMsg);
		Response<Object> resp = new Response<Object>();
		resp.setRetCode(ErrorCodeConstants.EC_PARAM_FAIL);
		resp.setMessage(errMsg);
		this.writeResp(response, resp);
	}

}
