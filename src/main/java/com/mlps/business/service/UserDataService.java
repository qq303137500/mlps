package com.mlps.business.service;

import java.util.List;

import com.mlps.pojo.UserData;
import com.msd.platform.vo.Page;

/**
 * 用户数据(体检?)
 * @author fangpc
 *
 */
public interface UserDataService {
	
	
	/**
	 * 保存用户数据
	 * @param userDate
	 */
	public void createUserInfo(UserData userData);

	/**
	 * 查询用户数据
	 * @return
	 */
	public List<UserData> retrieveUserDateList(String beginTime,String endTime,Page page);
	
}
