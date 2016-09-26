package com.mlps.dao;

import java.util.List;

import com.mlps.pojo.UserData;

/**
 * 用户操作层(标准的crud,请按照此方式命名)
 * @author fangpc
 *
 */
public interface UserDataDao {
	/**
	 * 查询列表
	 * @return
	 */
	public List<UserData> retrieveUserDateList();
	/**
	 * 添加
	 * @param UserData
	 */
	public void createUserDate(UserData userDate);
	/**
	 * 删除
	 */
	public void deleteUserDate(UserData userDate);
	/**
	 * 更新ID
	 * @param UserData
	 */
	public void updateUserDate(UserData userDate);
}
