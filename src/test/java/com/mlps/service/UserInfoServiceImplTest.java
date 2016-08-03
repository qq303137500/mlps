/**
 * 
 */
package com.mlps.service;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.mlps.api.BaseTest;
import com.mlps.business.service.UserInfoService;
import com.mlps.pojo.UserInfo;

/**
 * @author fangpc
 *
 */
public class UserInfoServiceImplTest extends BaseTest {
	@Resource
	private UserInfoService userInfoService;

	@Test
	@Rollback(true)
	public void retrieveUserInfoListTest() {
		List<UserInfo> userInfos = userInfoService.retrieveUserInfoList();
		System.out.println(JSONObject.fromObject(userInfos).toString());
	}

	@Test
	@Rollback(true)
	public void createUserInfoTest() {
		UserInfo userInfo = new UserInfo();
		userInfoService.createUserInfo(userInfo);
	}

	@Test
	@Rollback(true)
	public void updateUserInfoTest() {
		UserInfo userInfo = new UserInfo();
		userInfoService.updateUserInfo(userInfo);
	}

	@Test
	@Rollback(true)
	public void deleteUserInfoTest() {
		UserInfo userInfo = new UserInfo();
		userInfoService.deleteUserInfo(userInfo);
	}

}
