package com.mlps.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mlps.dao.UserPositionDao;
import com.mlps.pojo.UserPosition;

/**
 * 用户位置点
 * @author fangpc
 *
 */
@Repository
public class UserPositionDaoIpml extends BaseDao<UserPosition>  implements UserPositionDao {

	@Override
	public List<UserPosition> retrieveUserPositionList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void createUserPosition(UserPosition userPosition) {
		StringBuffer sbf = new StringBuffer();
		sbf.append("INSERT INTO t_user_position (longitude,Latitude,position,sysTime)");
		sbf.append(" VALUES(:longitude,:Latitude,:position,NOW())");
		this.update(sbf.toString(), userPosition);
	}

	@Override
	public void deleteUserPosition(UserPosition userPosition) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateUserPosition(UserPosition userPosition) {
		// TODO Auto-generated method stub
		
	}

}
