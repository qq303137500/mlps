package com.mlps.business.service;

import java.util.List;

import com.mlps.pojo.UserPosition;

public interface UserPositionService {
	
	
	/**
	 * 保存用户数据
	 * @param userDate
	 */
	public void createUserPosition(UserPosition userPosition);

	/**
	 * 查询用户数据
	 * @return
	 */
	public List<UserPosition> retrieveUserPositionList();
	
}
