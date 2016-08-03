package com.mlps.common.utils;

import org.apache.commons.lang3.StringUtils;

/**
 * 空判断工具
 * @author fangpc
 *
 */
public final class NullStrUtils {

	/**
	 * 判断String都为空
	 * @param obj
	 * @return
	 */
	public static boolean judgeStrNull(String... obj){
		for (String str : obj) {
			if(StringUtils.isEmpty(str)){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 判断Long都为空
	 * @param obj
	 * @return
	 */
	public static boolean judgeObjNull(Object... obj){
		for (Object lon : obj) {
			if(lon==null){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 判断Long都为空
	 * @param obj
	 * @return
	 */
	public static boolean judgeLongNull(Long... obj){
		for (Long lon : obj) {
			if(lon==null){
				return true;
			}
		}
		return false;
	}
	
}
