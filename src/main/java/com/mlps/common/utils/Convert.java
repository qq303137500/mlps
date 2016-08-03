/**  
 * @Description: TODO(用一句话描述该文件做什么)
 * @author yangzx
 * @date 2013-11-25 上午11:14:52
*/
package com.mlps.common.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.msd.utils.CommonUtil;
import com.msd.utils.ErrorCodeUtil;

/**
 * xml格式转换类 注意：关键字为content的类无法正常转换，需要规避。
 * 
 * @author yangzx
 * 
 */
public class Convert {

	//private static String isReturnErrDesc=ConfigUtils.getString("isReturnErrDesc"); //是否返回错误信息描述
	private static String isReturnErrDesc="true"; //是否返回错误信息描述
	
	/**
	 * 
	 * @Description: 对象转化为xml格式 
	 * @param object java对象
	 * @param alias  转换后对象的别名
	 * @return 参数
	 * @return String 返回类型
	 */
	public static String objToXml(Object object,String alias)
	{
		String ret = "";
        if(object==null)
        {
        	return "";
        }
        try
        {   
        	alias=(alias==null || alias.equals(""))? "info":alias;
        	ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
				+"<root>"
				+	"<resultCode>0</resultCode>"
				+	"<msg></msg>"
				+   "<data>"
				+   	"<"+alias+">"
				+ 	 		getXmlString(object)
				+   	"</"+alias+">"
				+"	</data>"
				+"</root>";      
        	ret =  new String(ret.getBytes("UTF-8"));
        } catch (Exception e)
        {   
            e.printStackTrace();               
        } 
		return ret;   
	}
	/**
	 * 
	 * @Description: 对象转化为xml格式 
	 * @param object java对象(包含list对象 此方法适用于bean里面包含list对象)
	 * @param alias  转换后对象的别名
	 * @param listName  list名称
	 * @return 参数
	 * @return String 返回类型
	 */
	public static String objToXml(Object object,String alias,String listName)
	{
		String ret = "";
		if(object==null)
		{
			return "";
		}
		try
		{   
			alias=(alias==null || alias.equals(""))? "info":alias;
			ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
				+"<root>"
				+	"<resultCode>0</resultCode>"
				+	"<msg></msg>"
				+   "<data>"
				+   	"<"+alias+">"
				+ 	 		getXmlString(object,listName)
				+   	"</"+alias+">"
				+"	</data>"
				+"</root>";      
			ret =  new String(ret.getBytes("UTF-8"));
		} catch (Exception e)
		{   
			e.printStackTrace();               
		} 
		return ret;   
	}
	
	
	public static String getXmlString(Object object, String listName) throws Exception{
		String key="",val="";
    	StringBuffer ret=new StringBuffer();
        if(object==null){
        	return "";
        }
        JSONObject json=JSONObject.fromObject((object));
        Field[] f=object.getClass().getDeclaredFields();
        for(int i=0;i<f.length;i++){
        	key=f[i].getName();
        	if("List".equals(f[i].getType().getSimpleName())){
        		ret.append("<"+listName+">");
        		f[i].setAccessible(true);
        	    ArrayList list=(ArrayList)f[i].get(object);
        	    if(null!=list){
        		for(int j =0;j<list.size();j++)
        		{
        			ret.append("<rec>");
        			ret.append(getXmlString(list.get(j)));
        			ret.append("</rec>");
        		}}
        		ret.append("</"+listName+">");
        		continue;
        	}
        	if(!"serialVersionUID".equalsIgnoreCase(key)){
        		String obj = json.get(key)==null?"null":json.get(key).toString();
        		val=("null".equalsIgnoreCase(obj))? "":CommonUtil.htmlEncode(obj);
        		ret.append("<"+key+">"+val+"</"+key+">");
        	}
        }
		return ret.toString();
	}
	/**
     * 按对像的属性顺序转成xml
     * @param object
     * @return
     * @throws Exception
     */
    public static String getXmlString(Object object) throws Exception{
    	String key="",val="";
    	StringBuffer ret=new StringBuffer();
        if(object==null){
        	return "";
        }
        JSONObject json=JSONObject.fromObject((object));
        Field[] f=object.getClass().getDeclaredFields();
        for(int i=0;i<f.length;i++){
        	key=f[i].getName();
        	if(!"serialVersionUID".equalsIgnoreCase(key)){
        		String obj = json.get(key)==null?"null":json.get(key).toString();
        		val=("null".equalsIgnoreCase(obj))? "":CommonUtil.htmlEncode(obj);
        		ret.append("<"+key+">"+val+"</"+key+">");
        	}
        }
		return ret.toString();
    };
	 
	
    /**
     * ArrayList对象转化为xml格式 
     * @param list
     * @return
     * @throws Exception 
     */
    @SuppressWarnings("unchecked")
	public static String listToXml(List list,int total) {   
        String ret = "";        
        try {
        	if(list==null)
        	{
            	return "";
            }
        	
        	StringBuffer recXml=new StringBuffer();
        	for(int i=0;i<list.size();i++){
        		recXml.append("<rec>"+ getXmlString(list.get(i))+ "</rec>");
        	}
        	String totalStr=(total==-1)? "":" total=\""+total+"\"";
        	ret="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
					+"<root>"
					+	"<resultCode>0</resultCode>"
					+	"<msg></msg>"
					+   "<data rows=\""+list.size()+"\" "+totalStr+">"
					+		recXml.toString()
					+"	</data>"
					+"</root>";
        	ret = new String(ret.getBytes("UTF-8"));
        } catch (Exception e) {   
            e.printStackTrace();               
        } 
		return ret; 
    }
	
    /**
     * 加节点，将xml的内容按规范化输出
     * @param content 节点内容
     * @param elementName 节点名称
     * @return
     * @throws Exception 
     */
    public static String contentElementToXml(String content,String elementName) {   
        String ret = "";
        if(content==null){
        	return "";
        }
        try { 
        	String dataContent="";
        	if(StringUtils.isNotEmpty(content) && StringUtils.isNotEmpty(elementName))
        	{
        		String startElement = "<"+elementName +">" ;
        		String endElement = "</"+elementName+">";
        		dataContent=startElement+content+endElement;
        	}
        	ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
				+"<root>"
				+	"<resultCode>0</resultCode>"
				+	"<msg></msg>"
				+   dataContent
				+"</root>";   
        	ret = new String(ret.getBytes("UTF-8"));
        } catch (Exception e) {   
            e.printStackTrace();               
        } 
		return ret;   
    } 

    /**
     * 返回XML格式的错误信息
     * @param resultCode
     * @return
     * @throws Exception 
     */
    public static String errorToXml(String resultCode,String extMsg) {   
        String ret = "";      
        String errDes="";
        try {
        	if(resultCode==null){
            	return "";
            }
        	
        	if(isReturnErrDesc!=null && isReturnErrDesc.equals("true")){
        		errDes=ErrorCodeUtil.getErrorCodeDesc(resultCode);
        	}
        	if(extMsg!=null && !extMsg.equals("")){
        		errDes+="("+extMsg+")";
        	}        	
        	ret="<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
					+"<root>"
					+	"<resultCode>"+resultCode+"</resultCode>"
					+	"<msg>"+errDes+"</msg>"
					+"</root>";
        	ret = new String(ret.getBytes("UTF-8"));
        } catch (Exception e) {
            e.printStackTrace();               
        }
		return ret;           
    }
    
    /**
	 * 字符串转码
	 * @param content
	 * @param encoding
	 * @return
	 */
	public static String encodingString(String content,String encoding) {
		String result = "";
		try {
			if (StringUtils.isNotEmpty(content)) {
				encoding=(StringUtils.isEmpty(encoding))? "utf-8":encoding;
				result = new String(content.getBytes("iso8859-1"), encoding);
            }
				
		} catch (Exception e) {
			result=content;
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 
	 * @Description: 给xml添加元素
	 * @param xml
	 * @param params
	 * @return 参数
	 * @return String 返回类型
	 */
    public static String addXmlElement(String xml,HashMap<String,String> params,String fatherAttribute){
    	Document document = null;
    	String ret = "";
        try 
        {
        	if(StringUtils.isEmpty(fatherAttribute))
        	{
        		fatherAttribute = "data";
        	}
        	document = DocumentHelper.parseText(xml);
        	Element rootElement = document.getRootElement();
        	 if (rootElement.element(fatherAttribute) != null) 
        	 {
        		 Element dataElement = rootElement.element(fatherAttribute);
        		 for (Entry<String, String> element : params.entrySet())
        		 {
					String key = element.getKey();//元素名称
					String value = element.getValue();//元素值
					dataElement.addElement(key);
					dataElement.element(key).setText(value);
				}
        	 }
        	 ret = document.asXML();
        	 ret = new String(ret.getBytes("utf-8"));
		} catch (Exception e)
		{
			e.printStackTrace();
		}
        return ret;
    }
    
    /**
     * 将xml的内容按规范化输出
     * @param content
     * @param isData 是否需要date "<data></data>"节点,true:需要；false:不要
     * @return
     * @throws Exception 
     */
    public static String contentToXml(String content,boolean isData) {   
        String ret = "";
        if(content==null){
        	return "";
        }
        try { 
        	String dataContent="";
        	if(isData==true){
        		dataContent="<data>"+content+"</data>";
        	}
        	else{
        		dataContent=content;
        	}
        	ret = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
				+"<root>"
				+	"<resultCode>0</resultCode>"
				+	"<msg></msg>"
				+   dataContent
				+"</root>";   
        	ret = new String(ret.getBytes("utf-8"));
        } catch (Exception e) {   
            e.printStackTrace();               
        } 
		return ret;   
    } 
    
    /**
	 * 
	 * @Description: 给xml添加元素
	 * @param xml
	 * @param params
	 * @return 参数
	 * @return String 返回类型
	 */
    public static String addElement(String xml,HashMap<String,String> params){
    	Document document = null;
    	String ret = "";
        try 
        {
        	
        	document = DocumentHelper.parseText(xml);
        	Element rootElement = document.getRootElement();
        	 for (Entry<String, String> element : params.entrySet())
    		 {
				String key = element.getKey();//元素名称
				String value = element.getValue();//元素值
				rootElement.addElement(key);
				rootElement.element(key).setText(value);
			}      	
        	 ret = document.asXML();
        	 ret = new String(ret.getBytes("utf-8"));
		} catch (Exception e)
		{
			e.printStackTrace();
		}
        return ret;
    }
    
}
