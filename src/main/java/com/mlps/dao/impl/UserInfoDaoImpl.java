/**
 * 
 */
package com.mlps.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mlps.dao.UserInfoDao;
import com.mlps.pojo.UserInfo;

/**
 * 用户信息数据层
 * @author fangpc
 *
 */
@Repository
public class UserInfoDaoImpl extends BaseDao<UserInfo> implements UserInfoDao {

	@Override
	public List<UserInfo> retrieveUserInfoList() {
		StringBuffer sbf = new StringBuffer();
		sbf.append(" SELECT");
		sbf.append(" t.`ID` id,");
		sbf.append(" t.groupId,");
		sbf.append(" t.`name`, ");
		sbf.append(" t.count, ");
		sbf.append(" t.create_time ");
		sbf.append(" FROM");
		sbf.append(" T_user_info t");
		sbf.append(" ORDER BY groupId asc");
		return this.query(sbf.toString(), UserInfo.class, new Object[] {});

	}

	@Override
	public void createUserInfo(UserInfo userInfo) {
		StringBuffer sbf = new StringBuffer();
		sbf.append("INSERT INTO T_user_info (name,account,password,systemTime)");
		sbf.append(" VALUES(:name,:account,:password,NOW())");
		this.update(sbf.toString(), userInfo);
	}

	@Override
	public void deleteUserInfo(UserInfo userInfo) {
		String sql = "DELETE FROM T_user_info WHERE id = ?";
		this.update(sql, new Object[] {userInfo.getId()});
	}

	@Override
	public void updateUserInfo(UserInfo userInfo) {
		StringBuffer sbf = new StringBuffer();
		sbf.append("UPDATE T_user_info SET name =:name, account =:account WHERE id = :id");
		this.update(sbf.toString(), userInfo);
	}

}
