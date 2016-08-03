/*
 * @fileName：AuthorityService.java    2011-3-24 下午01:11:43
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
package com.mlps.business.utils;

import java.util.Date;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.oro.text.perl.Perl5Util;
import org.springframework.stereotype.Service;

import com.mlps.common.constants.Constants;
import com.msd.platform.common.constants.ConfigConstants;
import com.msd.platform.common.constants.LogModule;
import com.msd.platform.component.config.AppConfig;
import com.msd.platform.component.config.CommonConfigUtils;
import com.msd.platform.util.Logs;
import com.msd.platform.util.Md5Util;

/**
 * <P>
 * Description：权限管理
 * </P>
 * 
 * @author huchao
 * @version 1.0
 */
@Service
public class AuthorityUtils {
	/**
	 * IP地址鉴权
	 * 
	 * @param ipAddress
	 *            String
	 * @return boolean
	 */
	public static boolean grantIP(String ipAddress) {
		String[] ipList = CommonConfigUtils.getString(ConfigConstants.ITEM_IP_LIST).split(",");
		if (ArrayUtils.isEmpty(ipList)) {
			// 严格鉴权机制，直接返回false
			return false;
		}
		for (int i = 0; i < ipList.length; i++) {
			String ip = ipList[i];
			String pattern = StringUtils.replace(ip, "*", "\\d{1,3}");
			pattern = StringUtils.replace(pattern, ".", "\\.");
			Perl5Util util = new Perl5Util();
			if (util.match("/" + pattern + "/", ipAddress)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 
	 * 方法描述：验证签名
	 * 
	 * @param content
	 * @return
	 */
	public static boolean verifySign(String content, String sign) {
		String appKey = CommonConfigUtils.getString(Constants.ITEM_KEY);
		if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(content)
				|| StringUtils.isEmpty(sign)) {
			return false;
		}
		return sign.equals(Md5Util.MD5(content + Md5Util.MD5(appKey)));
	}
	
	/**
	 * 验证时间戳
	 * @param content
	 * @param sign
	 * @return
	 */
	public static boolean verifyTimestamp(Long timestamp) {
			Integer timestampValid = Integer.parseInt(CommonConfigUtils.getString(Constants.TIMESTAMP_VALID));
			Long differTime = (new Date().getTime() -timestamp)/1000;
			if(differTime<timestampValid){
				return true;
			}
			return false;
	}
	

//	public static void main(String[] args) {
//		AuthorityUtils auth = new AuthorityUtils();
//		System.out.println(auth.grantIP("192.168.0.44"));
//	}
}
