/*
 * @fileName：Constants.java    2011-11-1 上午11:45:09
 *
 * Copyright (c) 2011 MSD Technologies, Inc. All rights reserved.
 * <P>Title：<P>
 * <P>Description：<P>
 * <P>Copyright: Copyright (c) 2011 <P>
 * <P>Company: MSD <P>
 * @author zengzp
 * @version 1.0
 *
 */
package com.mlps.common.constants;

import java.util.HashMap;
import java.util.Map;

/**
 * <P>
 * Description：
 * </P>
 * 
 * @author zengzp
 * @version 1.0
 */
public class Constants {
	/**
	 * 验证码在session中的key
	 */
	public static final String SESSION_CAPTCHA_KEY = "session.captcha.key";

	/**
	 * 生成随机种子
	 */
	public static final String NAME_SEED = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	/** 数据库批量操作基数 */
	public static final Integer BATCH_DB_OPEAR_CARDINAL = 20;

	/**
	 * 用户信息在session中的key
	 */
	public static final String SESSION_USER_KEY = "session.user.key";

	public static final String SESSION_OPERATOR_KEY = "session.operator.key";

	public static final String SESSION_MENUS_KEY = "session.menus.key";

	public static final String ISADMIN_Y = "Y";

	public static final String ITEM_KEY = "itemKey";
	
	public static final String TIMESTAMP_VALID = "timestampValid";
	
	public static final String ITEM_TIMESTAMP_RIGHT_SWITCH = "timestampRightSwitch";
	
	
	
}
