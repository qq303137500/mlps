package com.mlps.common.utils;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.msd.platform.util.ReflectionUtil;
import com.msd.platform.util.StringUtil;

/**
 * xml解析工具 自用
 * 
 * @author fangpc
 * 
 */
public final class XmlUtil {
	/**
	 * 把一段String的XML解析得到对应VO
	 * @param param
	 * @param clas
	 * @param object
	 */
	@SuppressWarnings("unchecked")
	public static void getObj(String param, Class clas, Object object) {
		try {
			Field[] Fields = clas.getDeclaredFields();
			if (Fields.length > 0) {// 可以匹配
				/*-开始解析-*/
				SAXReader reader = new SAXReader();
				InputStream sbs = new ByteArrayInputStream(param.getBytes());
				Document document = reader.read(sbs);
				Element placard = document.getRootElement();
				String strVal = null;
				Element element = null;
				Method method = null;
				for (Field field : Fields) {
					element = placard.element(field.getName());
					if (element != null) {
						strVal = element.getText();
						if (strVal != null) {
							method = ReflectionUtil
									.getMethodFromMyByMethodName(clas, "set"
											+ StringUtil.toUpFirstChar(field
													.getName()));
							if (method != null) {
								method.invoke(object, strVal);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 把一段String的XML解析得到对应VO
	 * 升级版本
	 * @param param
	 * @param clas
	 * @param object
	 */
	@SuppressWarnings("unchecked")
	public static Object getObj2(Element placard, Class clas) {
		Object object = null;
		try {
			object = Class.forName(clas.getName()).newInstance();//new Object();
			Field[] Fields = clas.getDeclaredFields();
			if (Fields.length > 0) {// 可以匹配
				/*-开始解析-*/
				String strVal = null;
				Element element = null;
				Method method = null;
				for (Field field : Fields) {
					element = placard.element(field.getName());
					if (element != null) {
						strVal = element.getText();
						if (strVal != null) {
							method = ReflectionUtil
									.getMethodFromMyByMethodName(clas, "set"
											+ StringUtil.toUpFirstChar(field
													.getName()));
							if (method != null) {
								method.invoke(object, strVal);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return object;
	}
	
	/**
	 * 把一段String的XML解析根目录得到Element的MAP
	 * @param str
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String , List<Element>>  transfoString(String str){
		Map<String , List<Element>> map = new HashMap<String, List<Element>>();
		List<Element> elements = null;
		SAXReader reader = new SAXReader();
		InputStream sbs = new ByteArrayInputStream(str.getBytes());
		Document document;
		try {
			document = reader.read(sbs);
			Element placard = document.getRootElement();
			Iterator<Element> iter = placard.elementIterator();
			Element el = null;
			while(iter.hasNext()){
				el = (Element)iter.next();
				elements =map.get(el.getName());
				if(elements==null){
					elements = new ArrayList<Element>();
				}
				elements.add(el);					
				map.put(el.getName(), elements);
			}		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 把element对象解析成对应的VO
	 * 包含二层element
	   * 　<data rows="3" total="0"><rec><字段A></字段A><字段B></字段B></rec><rec><字段A></字段A><字段B></字段B></rec></data>
	 * @param element
	 * @param clas
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static List transfoElementList(Element element, Class clas){
		List list = new ArrayList();
		try {
			Object object = null;
			String strVal = null;
			Method method = null;
			Iterator<Element> iter = element.elementIterator();
			while (iter.hasNext()) {
				Element el = (Element) iter.next();
				object = Class.forName(clas.getName()).newInstance();//new Object();
				List<Element> el2 = el.elements();
				Field[] Fields = clas.getDeclaredFields();
				for (Element element2 : el2) {
					for (Field field : Fields) {
						if (element2.getName().equals(field.getName())) {
							strVal = element2.getText();
							if (strVal != null) {
								method = ReflectionUtil
										.getMethodFromMyByMethodName(clas, "set"
												+ StringUtil.toUpFirstChar(field
														.getName()));
								if (method != null) {
									method.invoke(object, strVal.trim());
								}
							}
						}
					}
				}
				list.add(object);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 把element对象解析成对应的VO
	 * 包含一层element
	   * 　<data rows="3" total="0"><字段A></字段A><字段B></字段B></data>
	 * @param element
	 * @param clas
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static List transfoElementList2(Element element, Class clas){
		List list = new ArrayList();
		try {
			Object object = null;
			String strVal = null;
			Method method = null;
			object = Class.forName(clas.getName()).newInstance();//new Object();
			List<Element> el2 = element.elements();
			Field[] Fields = clas.getDeclaredFields();
			for (Element element2 : el2) {
				for (Field field : Fields) {
					if (element2.getName().equals(field.getName())) {
						strVal = element2.getText();
						if (strVal != null) {
							method = ReflectionUtil
									.getMethodFromMyByMethodName(clas, "set"
											+ StringUtil.toUpFirstChar(field
													.getName()));
							if (method != null) {
								method.invoke(object, strVal.trim());
							}
						}
					}
				}
				list.add(object);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
//	public static void main(String[] args) throws DocumentException {
//		StringBuffer sb = new StringBuffer();
//		sb.append("<?xml version=\"1.0\" ?>");
//		sb.append(" <root>");
//		sb.append(" <resultCode>0</resultCode>");
//		sb.append(" <msg/>");
//		sb.append(" <data rows=\"3\" total=\"0\">");
//		sb.append(" <rec>");
//		sb.append(" <id>87</id>");
//		sb.append(" <userId>12282</userId>");
//		sb.append(" <carName>小型汽车</carName>");
//		sb.append(" <province>广东</province>");
//		sb.append(" <city>深圳</city>");
//		sb.append(" <queryType>0</queryType>");
//		sb.append(" <carNum>2123321</carNum>");
//		sb.append(" <engNum>21231213</engNum>");
//		sb.append(" <vin>21210</vin>");
//		sb.append(" <driverLicense/>");
//		sb.append(" <voucherNum/>");
//		sb.append(" <registratioNnum/>");
//		sb.append(" <owner/>");
//		sb.append(" <archiveNum/>");
//		sb.append(" <sortNum>0</sortNum>");
//		sb.append(" <identifyCard></identifyCard>");
//		sb.append(" </rec>");
//		sb.append(" <rec>");
//		sb.append(" <id>60</id>");
//		sb.append(" <userId>12282</userId>");
//		sb.append(" <carName>小型汽车</carName>");
//		sb.append(" <province>河南</province>");
//		sb.append(" <city>南阳</city>");
//		sb.append(" <queryType>0</queryType>");
//		sb.append(" <carNum>豫R66666</carNum>");
//		sb.append(" <engNum/>");
//		sb.append(" <vin/>");
//		sb.append(" <driverLicense/>");
//		sb.append(" <voucherNum/>");
//		sb.append(" <registratioNnum/>");
//		sb.append(" <owner/>");
//		sb.append(" <archiveNum/>");
//		sb.append(" <sortNum/>");
//		sb.append(" <identifyCard> </identifyCard>");
//		sb.append(" </rec>");
//		sb.append(" </data>");
//		sb.append(" </root>");
//		SAXReader reader = new SAXReader();
//		InputStream sbs = new ByteArrayInputStream(sb.toString().getBytes());
//		Document document = reader.read(sbs);
//		Element placard = document.getRootElement();
//		List<UserCarInfoVO> list = transfoElementList(document.getRootElement()
//				.element("data"), UserCarInfoVO.class);
//		System.out.println(list);
//	}
//	public static void main(String[] args) {
//		StringBuffer sb = new StringBuffer();
//		sb.append("<records>");
//		sb.append("<errorCode>0</errorCode>");
//	    sb.append("<record>");
//		sb.append("<time>2010-12-01 10:10:10</time>");
//		sb.append("<location>深南大道999号</location>");
//		sb.append("<reason>违章占道</reason>");
//		sb.append("</record>");
//		sb.append("<record>");
//		sb.append("<time>2010-12-01 10:10:10</time>");
//		sb.append("<location>深南大道999号</location>");
//		sb.append("<reason>违章占道</reason>");
//		sb.append("</record>");
//		sb.append("</records>");
//		Map<String, List<Element>> map = transfoString(sb.toString());
//		Collection<List<Element>> elements = map.values();
//		for (List<Element> list : elements) {
//			for (Element element : list) {
//				System.out.println(element.getName());
//			}
//		}
//	}
}
