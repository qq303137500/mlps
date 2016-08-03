/**
 * 
 */
package com.mlps.business.service;

import com.mlps.business.vo.AppVersionVO;

/**
 * @author fangpc
 *
 */
public interface AppVersionService {
	
	/**
	 * 检查更新
	 * @return
	 */
	public AppVersionVO checkUpdateVerion();

}
