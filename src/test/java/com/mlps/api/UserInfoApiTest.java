package com.mlps.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.junit.Ignore;
import org.junit.Test;

import com.mlps.common.constants.Constants;
import com.msd.commons.Configuration;
import com.msd.platform.common.constants.ConfigConstants;
import com.msd.platform.component.config.CommonConfigUtils;
import com.msd.platform.crypto.Encrypter;
import com.msd.utils.ConfigUtils;
import com.msd.utils.HttpUtils;

public class UserInfoApiTest extends BaseTest {

	@Test
	public void retrieveUserInfoListTest() throws Exception {
		Long timestamp = new Date().getTime();
		mockMvc.perform((post("/api/userInfo/register")
				.param("name","683409")
				.param("account","683409")
				.param("password","683409")
				.param("timestamp", timestamp+"")
				.param("sign", Encrypter.md5s("683409" + timestamp +
						Encrypter.md5s(CommonConfigUtils.getString(Constants.ITEM_KEY))))))
				.andExpect(status().isOk())
				.andDo(print())
				.andExpect(model().attributeHasNoErrors("userId,timestamp,sign")); // 断言给定的模型没有错误
	}
	
//	@Test
//	public void getUserCarInfo() throws Exception {
//		Configuration ConfigUtils = new Configuration();
//		String cybTokenkey = ConfigUtils.getString("tokenKey.hsapi");
//		int userId = 683409;
//		long timestamp = 1000;
//		Map<String, String> params = new HashMap<String, String>();
//		String sign = Encrypter.md5s(userId + Encrypter.md5s(cybTokenkey)
//				+ timestamp);
//		params.put("userID", String.valueOf(userId));
//		params.put("sign", sign);
//		params.put("timestamp", String.valueOf(timestamp));
//		String url = "src/main/webapp/api/userInsure/getUserInsurance";
//		HttpUtils httpUtils = new HttpUtils();
//		String result = httpUtils.post(url, params, 30);
//		System.out.println(result);
//	}

}
