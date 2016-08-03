/**
 * 
 */
package com.mlps.business.api;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mlps.business.service.AppVersionService;
import com.mlps.common.controller.BaseController;
import com.mlps.common.vo.Response;
import com.mlps.pojo.UserInfo;
import com.msd.platform.util.Logs;

/**
 * app版本信息	
 * @author fangpc
 *
 */
@Controller
@RequestMapping("/api/appVersion")
public class AppVersionApi extends BaseController {

	@Resource
	private AppVersionService appVersionService;
	
	/**
	 * 检查用户app版本
	 * @param userInfo
	 * @return
	 */
	@RequestMapping(value = "/checkUpdateVerion")
	@ResponseBody
	public Object checkUpdateVerion(UserInfo userInfo) {
		Response<Object> response = new Response<Object>();
		try {
			appVersionService.checkUpdateVerion();
		} catch (Exception e) {
			Logs.error("checkUpdateVerion()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
}
