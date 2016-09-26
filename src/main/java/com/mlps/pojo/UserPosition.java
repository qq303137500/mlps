package com.mlps.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户位置点信心
 * @author fangpc
 *
 */
public class UserPosition implements Serializable {
	

	//数据ID
	private Long id;
	
	//经度
	private String longitude;
	
	//纬度
	private String Latitude;
	
	//位置点
	private String position;
	
	//系统时间
	private Date sysTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return Latitude;
	}

	public void setLatitude(String latitude) {
		Latitude = latitude;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public Date getSysTime() {
		return sysTime;
	}

	public void setSysTime(Date sysTime) {
		this.sysTime = sysTime;
	}
	
	
}
