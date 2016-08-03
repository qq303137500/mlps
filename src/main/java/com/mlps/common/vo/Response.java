package com.mlps.common.vo;

import com.msd.platform.helper.DataCacheFactory;
import com.msd.platform.vo.Page;

public class Response<T>
{

    private T data;

    private int retCode;

    private String message;

    private Page page;
    
    public Response() {
		super();
	}

	public Response(int retCode, String message) {
		super();
		this.retCode = retCode;
		this.message = message;
	}

	
	public Response(T data, int retCode, String message) {
		super();
		this.data = data;
		this.retCode = retCode;
		this.message = message;
	}

	public int getRetCode()
    {
        return retCode;
    }

    public void setRetCode(int retCode)
    {
        this.retCode = retCode;
        if (retCode != 0)
        {
            this.setMessage(DataCacheFactory.getErrorMsg(retCode));
        }
    }

    public T getData()
    {
        return data;
    }

    public void setData(T data)
    {
        this.data = data;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public Page getPage()
    {
        return page;
    }

    public void setPage(Page page)
    {
        this.page = page;
    }

}
