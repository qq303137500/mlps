package com.mlps.business.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlps.business.service.UserDataService;
import com.mlps.dao.UserDataDao;
import com.mlps.pojo.UserData;
import com.msd.platform.vo.Page;

/**
 * 用户数据
 * @author fangpc
 *
 */
@Service
@Transactional
public class UserDataServiceImpl implements UserDataService {

	@Resource
	private UserDataDao userDataDao;
	
	@Override
	public void createUserInfo(UserData userData) {
		userDataDao.createUserDate(userData);
	}

	@Override
	public List<UserData> retrieveUserDateList(String beginTime,String endTime,Page page) {
		Map<String, String> params  = new HashMap<String, String>();
		params.put("beginTime", beginTime);
		params.put("endTime", endTime);
		return userDataDao.retrieveUserDateList(params,page);
	}

}
