/**
 * 
 */
package com.mlps.service;

import javax.annotation.Resource;

import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.mlps.api.BaseTest;
import com.mlps.common.controller.service.EmailService;

/**
 * @author fangpc
 *
 */
public class EmailServiceImplTest extends BaseTest {

	@Resource
	private EmailService emailService;
	
	@Test
	@Rollback(true)
	public void sendTest(){
		try {
			emailService.send(new String[]{"303137500@qq.com"}, "测试主题", "测试内容");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
