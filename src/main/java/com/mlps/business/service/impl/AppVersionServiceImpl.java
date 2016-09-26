/**
 * 
 */
package com.mlps.business.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlps.business.service.AppVersionService;
import com.mlps.business.vo.AppVersionVO;

/**
 * @author fangpc
 *
 */
@Service
@Transactional
public class AppVersionServiceImpl implements AppVersionService {

	@Override
	public AppVersionVO checkUpdateVerion() {
		return null;
	}

}
