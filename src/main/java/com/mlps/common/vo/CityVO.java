/*
 * @fileName：CityVO.java    2011-6-8 上午10:52:34
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

import org.apache.commons.lang3.StringUtils;

/**
 * <P>
 * Description：城市VO
 * </P>
 * 
 * @author huchao
 * @version 1.0
 */
public class CityVO implements Serializable
{
    /**
     * 
     */
    private static final long serialVersionUID = 9032968464965293108L;

    private int cId;

    private String cNum;

    private String cName;

    private String longi;

    private String late;

    private double x;

    // 纬度
    private double y;

    public int getcId()
    {
        return cId;
    }

    public void setcId(int cId)
    {
        this.cId = cId;
    }

    public String getcNum()
    {
        return cNum;
    }

    public void setcNum(String cNum)
    {
        this.cNum = cNum;
    }

    public String getcName()
    {
        return cName;
    }

    public void setcName(String cName)
    {
        this.cName = cName;
    }

    public String getLongi()
    {
        return longi;
    }

    public void setLongi(String longi)
    {
        this.longi = longi;
        this.x = Double.parseDouble(StringUtils.removeStart(this.longi, "E"));
    }

    public String getLate()
    {
        return late;
    }

    public void setLate(String late)
    {
        this.late = late;
        this.y = Double.parseDouble(StringUtils.removeStart(this.late, "N"));
    }

    /**
     * @return the x
     */
    public double getX()
    {
        return x;
    }

    /**
     * @param x
     *            the x to set
     */
    public void setX(double x)
    {
        this.x = x;
    }

    /**
     * @return the y
     */
    public double getY()
    {
        return y;
    }

    /**
     * @param y
     *            the y to set
     */
    public void setY(double y)
    {
        this.y = y;
    }

}
