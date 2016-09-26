package com.mlps.common.vo;

import java.io.Serializable;

/**
 * 统计结果
 * @author fangpc
 *
 */
public class ResultVO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4357824489851693514L;

	private String key;
	
	private Long value;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Long getValue() {
		return value;
	}

	public void setValue(Long value) {
		this.value = value;
	}
	
	
	
	
	
}
