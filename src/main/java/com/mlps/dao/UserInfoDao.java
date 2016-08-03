/**
 * 
 */
package com.mlps.dao;

import java.util.List;

import com.mlps.pojo.UserInfo;

/**
 * 用户操作层(标准的crud,请按照此方式命名)
 * @author fangpc
 *
 */
public interface UserInfoDao {
	/**
	 * 查询用户列表
	 * @return
	 */
	public List<UserInfo> retrieveUserInfoList();
	/**
	 * 添加用户
	 * @param userInfo
	 */
	public void createUserInfo(UserInfo userInfo);
	/**
	 * 删除用户
	 */
	public void deleteUserInfo(UserInfo userInfo);
	/**
	 * 更新用户ID
	 * @param userInfo
	 */
	public void updateUserInfo(UserInfo userInfo);
}
