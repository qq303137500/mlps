/**
 * 
 */
package com.mlps.business.service;

import java.util.List;

import com.mlps.pojo.UserInfo;

/**
 * @author fangpc
 *
 */
public interface UserInfoService {
	/**
	 * 查询用户列表
	 * 
	 * @return
	 */
	public List<UserInfo> retrieveUserInfoList();

	/**
	 * 添加用户
	 * 
	 * @param userInfo
	 */
	public void createUserInfo(UserInfo userInfo);

	/**
	 * 删除用户
	 */
	public void deleteUserInfo(UserInfo userInfo);

	/**
	 * 更新用户ID
	 * 
	 * @param userInfo
	 */
	public void updateUserInfo(UserInfo userInfo);
}
