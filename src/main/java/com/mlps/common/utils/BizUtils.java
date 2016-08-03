package com.mlps.common.utils;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.msd.commons.ParamsMap;
import com.msd.platform.crypto.Encrypter;
import com.msd.utils.ConfigUtils;
import com.msd.utils.HttpUtils;
/**
 * bizservice用户相关操作类
 * @author wugy
 */

public class BizUtils {
	private static Logger logger=Logger.getLogger(BizUtils.class);

    /**
     * 刷新biz用户缓存
     * @param userId
     */
    public static void refreshUserMemcachInfo(String userId){
        try {
        	new HttpUtils().post(ConfigUtils.getString("bizservice.host") + "bizservice/biss!refreshUserMemcachInfo.action", new ParamsMap<String, String>()
                    .add("userId",userId)
                    .add("sign", Encrypter.md5s(userId+ConfigUtils.getString("tokenKey.messageSign"))));
        } catch (Exception e) {
        	logger.error("refreshUserMemcachInfo() failure.", e);
        }
    }
    
    /**
     *调用更新biz用户信息
     */
    public static void bizUpdateUserInfo(String userId, JSONObject json){
        try {
            new HttpUtils().post(ConfigUtils.getString("bizservice.host") + "bizservice/biss!updateUserInfoByUserId.action", 
            		new ParamsMap<String, String>()
                    .add("userId", userId).add("params",json.toString())
                    .add("sign", Encrypter.md5s(userId+ConfigUtils.getString("tokenKey.messageSign"))));
        } catch (Exception e) {
        	logger.error("bizUpdateUserInfo() failure.", e);
        }
    }
    

    /**
     * 发送邮件接口（多个email用","号隔开）
     * @param title
     * @param contentHtml
     * @param emails
     */
    public static void sendEmailByBiz(String title, String contentHtml,String emails){
	    try {
	        new HttpUtils().post(ConfigUtils.getString("bizservice.host") + "bizservice/common/sendEmail.action", new ParamsMap<String, String>()
	            .add("title", title)
	            .add("contentHtml", contentHtml)
	            .add("emails", emails)
	            .add("sign", Encrypter.md5s(emails+ConfigUtils.getString("tokenKey.messageSign"))));
	    } catch (Exception e) {
	    	logger.error("sendEmail() failure.", e);
	    }
    }

}
