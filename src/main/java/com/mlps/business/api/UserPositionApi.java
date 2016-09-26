package com.mlps.business.api;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mlps.business.service.UserPositionService;
import com.mlps.common.vo.Response;
import com.mlps.pojo.UserPosition;
import com.msd.platform.util.Logs;

/**
 * 用户位置点
 * @author fangpc
 *
 */
@Controller
@RequestMapping("/api/userPosition")
public class UserPositionApi {
	
	@Resource
	private UserPositionService userPositionService;

	/**
	 * 保存用户位置点
	 * @return
	 */
	@RequestMapping(value = "/saveUserPosition")
	@ResponseBody
	public Object saveUserPosition(UserPosition userPosition){
		Response<Object> response = new Response<Object>();
		try {
			userPositionService.createUserPosition(userPosition);
		} catch (Exception e) {
			Logs.error("saveUserPosition()", e);
			response.setRetCode(9009);
		}
		return response;
	}
	
}
