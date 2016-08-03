package com.mlps.business.utils;

import java.util.Properties;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

/**
 * 获取配置属性
 * 
 */
@Component
public class ReplyNewsUtils
{
    private static Properties p = new Properties();

//    @PostConstruct
    public void init() throws Exception
    {
        p.load(this.getClass().getClassLoader().getResourceAsStream(
                "replyNews.properties"));
    }

    public static String getString(String key)
    {
        return p.getProperty(key);
    }
}
