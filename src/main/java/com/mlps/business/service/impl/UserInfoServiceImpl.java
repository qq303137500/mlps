/**
 * 
 */
package com.mlps.business.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlps.business.service.UserInfoService;
import com.mlps.dao.UserInfoDao;
import com.mlps.pojo.UserInfo;
import com.msd.platform.util.Md5Util;

/**
 * 用户信息服务层
 * @author fangpc
 *
 */
@Service
@Transactional
public class UserInfoServiceImpl implements UserInfoService {

	@Resource
	private UserInfoDao userInfoDao;

	@Override
	public List<UserInfo> retrieveUserInfoList() {
		return userInfoDao.retrieveUserInfoList();
	}

	@Override
	public void createUserInfo(UserInfo userInfo) {
		userInfo.setPassword(Md5Util.MD5(userInfo.getPassword()));
		userInfoDao.createUserInfo(userInfo);
	}

	@Override
	public void deleteUserInfo(UserInfo userInfo) {
		if(userInfo!=null && userInfo.getId()!=null)
			userInfoDao.deleteUserInfo(userInfo);
	}

	@Override
	public void updateUserInfo(UserInfo userInfo) {
		userInfoDao.updateUserInfo(userInfo);
	}
	
	
}
