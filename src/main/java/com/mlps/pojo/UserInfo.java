/**
 * 
 */
package com.mlps.pojo;

import java.io.Serializable;

/**
 * @author fangpc
 *
 */
public class UserInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3423183841667201672L;

	//用户id
	private Long id;
	
	//用户名称
	private String name;
	
	//用户登录账户
	private String account;
	
	//用户登录密码
	private String password;
	
	//系统时间
	private String systemTimeStr;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSystemTimeStr() {
		return systemTimeStr;
	}

	public void setSystemTimeStr(String systemTimeStr) {
		this.systemTimeStr = systemTimeStr;
	}
	
	
}
