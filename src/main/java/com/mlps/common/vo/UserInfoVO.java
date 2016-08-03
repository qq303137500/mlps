/*
 * @fileName：UserInfo.java    2013-7-23 下午03:09:47
 *
 * Copyright (c) 2011 MSD Technologies, Inc. All rights reserved.
 * <P>Title：<P>
 * <P>Description：<P>
 * <P>Copyright: Copyright (c) 2011 <P>
 * <P>Company: MSD <P>
 * @author guwm
 * @version 1.0
 *
 */
package com.mlps.common.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * <P>
 * Description：
 * </P>
 * 
 * @author guwm
 * @version 1.0
 */
public class UserInfoVO implements Serializable
{

    private static final long serialVersionUID = -4631635443400973352L;

    private Long userId;

    private String userName;

    private String userCname;

    private String userPwd;

    private String email;

    private String phone;

    private String mobile;

    private Long IsActive;

    private String isadmin;

    private Long deptId;

    private String deptName;

    private String roles;

    private String abateDate;

    private List list;

    private Long operatorId;

    private Integer accountType;

    private String companyName;
    
    private String accountTypeName;

    private Date createTime;
    
    private Long merchantId;
    
    private Integer operatorType;
    
    private String operatorTypeDesc;
    
    private String  levelName;
    

    public Long getUserId()
    {
        return userId;
    }

    public void setUserId(Long userId)
    {
        this.userId = userId;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getUserPwd()
    {
        return userPwd;
    }

    public void setUserPwd(String userPwd)
    {
        this.userPwd = userPwd;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getPhone()
    {
        return phone;
    }

    public void setPhone(String phone)
    {
        this.phone = phone;
    }

    public String getMobile()
    {
        return mobile;
    }

    public void setMobile(String mobile)
    {
        this.mobile = mobile;
    }

    public Long getIsActive()
    {
        return IsActive;
    }

    public void setIsActive(Long isActive)
    {
        IsActive = isActive;
    }

    public Long getDeptId()
    {
        return deptId;
    }

    public void setDeptId(Long deptId)
    {
        this.deptId = deptId;
    }

    public String getAbateDate()
    {
        return abateDate;
    }

    public void setAbateDate(String abateDate)
    {
        this.abateDate = abateDate;
    }

    public String getIsadmin()
    {
        return isadmin;
    }

    public void setIsadmin(String isadmin)
    {
        this.isadmin = isadmin;
    }

    public String getRoles()
    {
        return roles;
    }

    public void setRoles(String roles)
    {
        this.roles = roles;
    }

    /**
     * @return the userCname
     */
    public String getUserCname()
    {
        return userCname;
    }

    /**
     * @param userCname
     *            the userCname to set
     */
    public void setUserCname(String userCname)
    {
        this.userCname = userCname;
    }

    public String getDeptName()
    {
        return deptName;
    }

    public void setDeptName(String deptName)
    {
        this.deptName = deptName;
    }

    public List getList()
    {
        return list;
    }

    public void setList(List list)
    {
        this.list = list;
    }

    public Long getOperatorId()
    {
        return operatorId;
    }

    public void setOperatorId(Long operatorId)
    {
        this.operatorId = operatorId;
    }

    public Date getCreateTime()
    {
        return createTime;
    }

    public void setCreateTime(Date createTime)
    {
        this.createTime = createTime;
    }

    /**
     * @return the accountType
     */
    public Integer getAccountType()
    {
        return accountType;
    }

    /**
     * @param accountType
     * the accountType to set
     */
    public void setAccountType(Integer accountType)
    {
        this.accountType = accountType;
    }
   
    /**
     * @return the companyName
     */
    public String getCompanyName()
    {
        return companyName;
    }

    /**
     * @param companyName
     * the companyName to set
     */
    public void setCompanyName(String companyName)
    {
        this.companyName = companyName;
    }
    /**
     * @return the accountTypeName
     */
    public String getAccountTypeName()
    {
        return accountTypeName;
    }

    /**
     * @param accountTypeName
     * the accountTypeName to set
     */
    public void setAccountTypeName(String accountTypeName)
    {
        this.accountTypeName = accountTypeName;
    }

	public Long getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Long merchantId) {
		this.merchantId = merchantId;
	}

    public void setOperatorType(Integer operatorType) {
        this.operatorType = operatorType;
    }

    public Integer getOperatorType() {
        return operatorType;
    }

    
    /**
     * @return the operatorTypeDesc
     */
    public String getOperatorTypeDesc()
    {
        return operatorTypeDesc;
    }

    /**
     * @param operatorTypeDesc the operatorTypeDesc to set
     */
    public void setOperatorTypeDesc(String operatorTypeDesc)
    {
        this.operatorTypeDesc = operatorTypeDesc;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getLevelName() {
        return levelName;
    }
    

}
