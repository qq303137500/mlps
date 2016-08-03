package com.mlps.common.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mlps.common.controller.service.DistrictService;

@Controller
@RequestMapping("/district")
public class DistrictController extends BaseController{

	@Resource
	private DistrictService districtService;
	
//	/**
//	 * 获取省列表，无分页
//	 */
//	@RequestMapping(value = "/findDistrictList")
//    @ResponseBody
//	public Object findDistrictList(DistrictQueryVO districtQueryVO){
//		Response<Object> response = new Response<Object>();
//		response.setData(districtService.findDistrictList(districtQueryVO));
//    	return response;
//	}
	
}
