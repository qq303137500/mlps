package com.mlps.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户数据
 * @author fangpc
 *
 */
public class UserData implements Serializable  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5865472461888462410L;

	//数据ID
	private Long id;
	
	//交易编号
	private String orderNumber;
	
	//交易时间
	private String orderTime;
	
	//前数据
	private String beforeData;
	
	//后数据
	private String afterData;
	
	//系统时间
	private Date sysTime;
	
	//经度
	private String longitude;
	
	//维度
	private String latitude;
	
	//POI位置点
	private String position;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public Date getSysTime() {
		return sysTime;
	}

	public void setSysTime(Date sysTime) {
		this.sysTime = sysTime;
	}

	public String getBeforeData() {
		return beforeData;
	}

	public void setBeforeData(String beforeData) {
		this.beforeData = beforeData;
	}

	public String getAfterData() {
		return afterData;
	}

	public void setAfterData(String afterData) {
		this.afterData = afterData;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}
	
	
}
