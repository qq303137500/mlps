package com.mlps.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.mlps.dao.UserDataDao;
import com.mlps.pojo.UserData;
import com.mlps.pojo.UserInfo;
import com.msd.platform.vo.Page;

/**
 * 用户数据
 * @author fangpc
 *
 */
@Repository
public class UserDataDaoImpl extends BaseDao<UserData>  implements UserDataDao {

	@Override
	public List<UserData> retrieveUserDateList(Map<String, String> params ,Page page) {
		StringBuffer sbf = new StringBuffer();
		sbf.append(" SELECT");
		sbf.append(" t.`ID` id,");
		sbf.append(" t.orderNumber orderNumber,");
		sbf.append(" t.`orderTime` orderTime, ");
		sbf.append(" t.beforeData beforeData, ");
		sbf.append(" t.afterData afterData, ");
		sbf.append(" t.longitude longitude, ");
		sbf.append(" t.latitude latitude, ");
		sbf.append(" t.position position, ");
		sbf.append(" t.sysTime sysTime");
		sbf.append(" FROM");
		sbf.append(" t_user_data t");
		sbf.append(" where 1=1");
		if(params!=null){
			if(StringUtils.isNotEmpty(params.get("beginTime"))){
				sbf.append(" and t.sysTime >='"+params.get("beginTime")+"'");
			}
			if(StringUtils.isNotEmpty(params.get("endTime"))){
				sbf.append(" and t.sysTime <='"+params.get("endTime")+"'");
			}
		}
		sbf.append(" ORDER BY t.sysTime asc");
		return this.query(sbf.toString(), UserData.class, new Object[] {},page);
	}

	@Override
	public void createUserDate(UserData userDate) {
		StringBuffer sbf = new StringBuffer();
		sbf.append("INSERT INTO t_user_data (orderNumber,orderTime,beforeData,afterData,sysTime,longitude,latitude,position)");
		sbf.append(" VALUES(:orderNumber,:orderTime,:beforeData,:afterData,NOW(),:longitude,:latitude,:position)");
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
