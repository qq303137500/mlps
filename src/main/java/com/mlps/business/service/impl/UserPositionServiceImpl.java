package com.mlps.business.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlps.business.service.UserPositionService;
import com.mlps.dao.UserPositionDao;
import com.mlps.pojo.UserPosition;


/**
 * 用户位置点
 * @author fangpc
 *
 */
@Service
@Transactional
public class UserPositionServiceImpl implements UserPositionService {

	@Resource
	private UserPositionDao userPositionDao;
	
	@Override
	public void createUserPosition(UserPosition userPosition) {
		userPositionDao.createUserPosition(userPosition);
	}

	@Override
	public List<UserPosition> retrieveUserPositionList() {
		return userPositionDao.retrieveUserPositionList();
	}

}
