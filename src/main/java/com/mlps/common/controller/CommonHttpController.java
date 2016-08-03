package com.mlps.common.controller;

import java.io.File;
import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.mlps.common.constants.Constants;
import com.msd.platform.helper.ThreadLocals;
import com.msd.platform.util.FileUpload;
import com.msd.platform.util.HttpUtils;
import com.msd.platform.util.JsonUtil;
import com.msd.platform.vo.Response;



@Controller
@RequestMapping("/commonHttp")
public class CommonHttpController extends BaseController {

    /**
     * 
     * 方法描述：获取应用类型列表
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/sendHttp")
	//@ResponseBody
	public Object sendHttp(HttpServletResponse response) throws Exception{
    	HashMap<String, String> params = new HashMap<String, String>();
        String key = "";
        String url = "";
        String charset = "";
        String strResult="";
        Enumeration enu = this.getRequest().getParameterNames();
        while (enu.hasMoreElements()) {
            key = (String) enu.nextElement();
            if ("url".equals(key)) {
                url = this.getRequest().getParameter(key);
            }else if("charset".equals(key)){
                charset = this.getRequest().getParameter(key);
            }else {
                params.put(key, this.getRequest().getParameter(key));
            }
        }
      
        if(charset.equals("")){
                int timeout = 30;
                if(params.get("timeout")!=null && StringUtils.isNotBlank(params.get("timeout"))){
                    timeout = Integer.parseInt(params.get("timeout"));
                }
      	  strResult= HttpUtils.postOutInfo(url, params,timeout);
        }else{
      	  strResult= HttpUtils.get(url, params);
         }
      
        response.getOutputStream().write(strResult.getBytes("utf-8"));
        return null;
	}
    
    /**
     * 
     * 方法描述：获取当前用户信息信息
     * 
     * @return
     */
	@RequestMapping(value = "/getUserInfo")
	@ResponseBody
	public Object getUserInfo(HttpServletRequest request) {
		Response<Object> response = new Response<Object>();
//		AccountVO userInfo = (AccountVO)request.getSession().getAttribute(Constants.SESSION_USER_INFO);
//        response.setData(userInfo);
        return response;
	}
	
	/**
     * 
     * 
     * @return
     */
	@RequestMapping(value = "/fileUpload")
	@ResponseBody
	public Object fileUpload(String fid,MultipartFile filedata,String filedataFileName) throws Exception{
      
		  JSONObject json=new JSONObject();
		  ThreadLocals.getResponse().setHeader("Cache-Control", "no-cache"); 
		  ThreadLocals.getResponse().setContentType("text/html; charset=UTF-8");
		  String res = "";
          try
          {
        	  if(filedata!=null){
        		String path = super.getRequest().getSession().getServletContext().getRealPath("/upload");
      			String fileName = filedata.getOriginalFilename();
      			File targetFile = new File(path, fileName);
      			byte[] bytes = filedata.getBytes();
      			FileCopyUtils.copy(bytes, targetFile);
      			res = FileUpload.upload(fid, "1", targetFile.getName(), filedata.getOriginalFilename(), targetFile) ;
        	  }
        	  String retCode = JsonUtil.getProperty(res, "retCode").toString();
        	  if(retCode.equals("0")){
                  json.put("msg", res);
                  json.put("err", "");
              }else if(retCode.equals("2")){
                  json.put("err", "活动详情存在单张图片大小大于1M,请减小图片大小再提交！");
                
              }else{
            	  json.put("err", "文件上传失败,错误码："+retCode);
              }
          }
          catch (Exception ex)
          {
              json.put("err", "文件服务器错误"+ex.getMessage());
          }
            ThreadLocals.getResponse().getOutputStream().write(json.toString().getBytes("utf-8"));
			return null;
    	 
	}
}
