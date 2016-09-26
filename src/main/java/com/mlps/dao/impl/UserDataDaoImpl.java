package com.mlps.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mlps.dao.UserDataDao;
import com.mlps.pojo.UserData;
import com.mlps.pojo.UserInfo;

/**
 * 用户数据
 * @author fangpc
 *
 */
@Repository
public class UserDataDaoImpl extends BaseDao<UserData>  implements UserDataDao {

	@Override
	public List<UserData> retrieveUserDateList() {
		StringBuffer sbf = new StringBuffer();
		sbf.append(" SELECT");
		sbf.append(" t.`ID` id,");
		sbf.append(" t.orderNumber orderNumber,");
		sbf.append(" t.`orderTime` orderTime, ");
		sbf.append(" t.beforeData beforeData, ");
		sbf.append(" t.afterData afterData, ");
		sbf.append(" t.sysTime sysTime");
		sbf.append(" FROM");
		sbf.append(" t_user_data t");
		sbf.append(" ORDER BY t.sysTime asc");
		return this.query(sbf.toString(), UserData.class, new Object[] {});
	}

	@Override
	public void createUserDate(UserData userDate) {
		StringBuffer sbf = new StringBuffer();
		sbf.append("INSERT INTO t_user_data (orderNumber,orderTime,beforeData,afterData,sysTime)");
		sbf.append(" VALUES(:orderNumber,:orderTime,:beforeData,:afterData,NOW())");
		this.update(sbf.toString(), userDate);
	}

	@Override
	public void deleteUserDate(UserData userDate) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateUserDate(UserData userDate) {
		// TODO Auto-generated method stub
		
	}
	
	
}
