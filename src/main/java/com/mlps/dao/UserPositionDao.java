package com.mlps.dao;

import java.util.List;

import com.mlps.pojo.UserData;
import com.mlps.pojo.UserPosition;

/**
 * 用户操作层(标准的crud,请按照此方式命名)
 * @author fangpc
 *
 */
public interface UserPositionDao {
	/**
	 * 查询列表
	 * @return
	 */
	public List<UserPosition> retrieveUserPositionList();
	/**
	 * 添加
	 * @param UserData
	 */
	public void createUserPosition(UserPosition userPosition);
	/**
	 * 删除
	 */
	public void deleteUserPosition(UserPosition userPosition);
	/**
	 * 更新ID
	 * @param UserData
	 */
	public void updateUserPosition(UserPosition userPosition);
}
