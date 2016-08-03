/*
 * @fileName：ProvinceVO.java    2011-6-8 上午10:52:06
 *
 * Copyright (c) 2011 MSD Technologies, Inc. All rights reserved.
 * <P>Title：<P>
 * <P>Description：<P>
 * <P>Copyright: Copyright (c) 2011 <P>
 * <P>Company: MSD <P>
 * @author huchao
 * @version 1.0
 *
 */
package com.mlps.common.vo;

import java.io.Serializable;

/**
 * <P>
 * Description：省份VO
 * </P>
 * 
 * @author huchao
 * @version 1.0
 */
public class ProvinceVO implements Serializable
{
    /**
     * 
     */
    private static final long serialVersionUID = -7213421218672812116L;

    private int pId;
    
    private String pShortName;

    private String pName;

    public int getpId()
    {
        return pId;
    }

    public void setpId(int pId)
    {
        this.pId = pId;
    }

    public String getpShortName()
    {
        return pShortName;
    }

    public void setpShortName(String pShortName)
    {
        this.pShortName = pShortName;
    }

    public String getpName()
    {
        return pName;
    }

    public void setpName(String pName)
    {
        this.pName = pName;
    }
}
