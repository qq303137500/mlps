/**
 * 
 */
package com.mlps.business.api;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mlps.business.service.CloudPushService;
import com.mlps.common.controller.BaseController;
import com.mlps.common.vo.Response;
import com.mlps.pojo.UserInfo;
import com.msd.platform.util.Logs;

/**
 * 云推送
 * @author fangpc
 *
 */
@Controller
@RequestMapping("/api/cloudPushApi")
public class CloudPushApi extends BaseController {

	@Resource
	private CloudPushService cloudPushService;
	
	/**
	 * 注册云推送
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/saveCloudRegisterId")
	@ResponseBody
	public Object saveCloudRegisterId(UserInfo userInfo) {
		Response<Object> response = new Response<Object>();
		try {
			cloudPushService.saveCloudRegisterId();
		} catch (Exception e) {
			Logs.error("saveCloudRegisterId()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
}
