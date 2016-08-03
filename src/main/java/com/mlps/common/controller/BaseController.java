package com.mlps.common.controller;


import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.mlps.common.utils.ThreadLocals;
import com.mlps.common.vo.UserInfoVO;
import com.msd.platform.common.constants.Constants;
import com.msd.platform.util.ExportExcelUtil;
import com.msd.platform.util.Logs;

/**
 * 
 * <P>
 * Description：基类Action
 * </P>
 * 
 * @author huchao
 * @version 1.0
 */
public class BaseController{

	protected Map<String, String> requestMap = new HashMap<String, String>();

	@Autowired
	private  HttpServletRequest request;  

	protected HttpServletRequest getRequest() {
		return request;
	}

	protected HttpSession getSession() {
		return this.getRequest().getSession();
	}

	protected Object getAttributeBySession(String key) {
		return 	getSession().getAttribute(key);
	}
	
	protected Long getOperatorId()
    {
        return null;
    }
	
    
    // UserInfoVO
    protected UserInfoVO getCurUserInfo(){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        if (null != request.getSession().getAttribute(
                Constants.SESSION_USER_KEY))
        {
            return (UserInfoVO) request.getSession().getAttribute(
                    Constants.SESSION_USER_KEY);
        }
        else
        {
            return new UserInfoVO();
        }
        // return ThreadLocals.getUserInfoVO();
    }

    
	@SuppressWarnings("unchecked")
	protected static  HashMap<String, String> getParams(HttpServletRequest httpRequest){
		HashMap<String, String> params = new HashMap<String, String>();
		String key = "";
		Enumeration enu = httpRequest.getParameterNames();
        while (enu.hasMoreElements()) {
            key = (String) enu.nextElement();
            try {
				params.put(key, new String(httpRequest.getParameter(key).getBytes("iso8859-1"),"utf-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
        }
        return params;
	}
	
	/**
	 * 获取应用路径
	 * 
	 * @return
	 */
	protected String getApplicationPath() {
		HttpServletRequest request = this.getRequest();
		return request.getScheme()
				+ "://"
				+ request.getServerName()
				+ (request.getServerPort() == 80 ? "" : ":"
						+ request.getServerPort()) // 当端口为80时，不需要显示端口
				+ request.getContextPath();
	}

	/**
	 * 获取请求IP
	 * 
	 * @return
	 */
	protected String getIpAddr() {
		HttpServletRequest request = getRequest();
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	
	protected void exportExcel(String fileName, String sheetName,
            String[] headers, String[] properties, List list)
    {
        HttpServletRequest request = ThreadLocals.getRequest();
        HttpServletResponse response = ThreadLocals.getResponse();
        try
        {
            String agent = this.getRequest().getHeader("User-Agent");
            boolean isMSIE = (agent != null && agent.indexOf("MSIE") != -1);
            if (isMSIE)
            {
                fileName = java.net.URLEncoder.encode(fileName, "UTF8");
            }
            else
            {
                fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
            }
        }
        catch (UnsupportedEncodingException e1)
        {
            Logs.error("exportExcel error...", e1);
        }

        response.setContentType("octets/stream");
        response.addHeader("Content-Disposition", "attachment;filename="
                + fileName + ".xls");

        OutputStream out = null;
        ExportExcelUtil exportExcelUtil = new ExportExcelUtil();
        try
        {
            out = response.getOutputStream();
            exportExcelUtil.toExcel(fileName, sheetName, headers, properties,
                    list, out, request.getSession());
        }
        catch (IOException e)
        {
            Logs.error("exportExcel error...", e);
            // e.printStackTrace();
        }
        finally
        {
            try
            {
                if (out != null)
                {
                    out.close();
                }
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
    }
	
	public Map<String, String> getRequestMap() {
		return requestMap;
	}

	public void setRequestMap(Map<String, String> requestMap) {
		this.requestMap = requestMap;
	}
	
	public static List<Long> excel2UserList(InputStream inputStream)
            throws Exception
    {
        List<Long> userList = new ArrayList<Long>();

        POIFSFileSystem fs = new POIFSFileSystem(inputStream);
        HSSFWorkbook wb = new HSSFWorkbook(fs);
        HSSFSheet sheet = wb.getSheetAt(0);// 获取第一个sheet
        // 得到总行数
        int rows = sheet.getLastRowNum() + 1;
        for (int i = 1; i < rows; i++)
        {// 遍历行获得每行信息
            HSSFRow row = sheet.getRow(i);
            row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
            String useridStr = row.getCell(0).getStringCellValue();
            Long userid = Long.parseLong(StringUtils.trim(useridStr));
            userList.add(userid);
        }

        return userList;
    }
	
    /**
     * 取得http请求的参数字符串
     * 返回格式：p1=xxx&p2=xxx&p3=xx
     * @return
     */
    @SuppressWarnings("unchecked")
	protected String getParameters(){
    	String ret="",key="";
    	Enumeration enu = this.getRequest().getParameterNames();
        while (enu.hasMoreElements()) {
            key = (String) enu.nextElement();
            ret+="&"+key+"="+this.getRequest().getParameter(key);            
        }
        if(ret.length()>0){
        	ret=ret.substring(1);
        }
        return ret;
    } 
    
	  protected void writeAjaxResult(HttpServletResponse response,String s) {
	        try {
	        	response.setContentType("text/html;charset=UTF-8");
	        	response.getOutputStream().write(s.getBytes("utf-8"));
	        } catch (Exception e) {
	        }
	    }
}
