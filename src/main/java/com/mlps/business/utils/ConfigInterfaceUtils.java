package com.mlps.business.utils;

import java.util.Properties;

import org.springframework.stereotype.Component;

/**
 * 获取配置属性
 * 
 */
@Component
public class ConfigInterfaceUtils
{
    private static Properties p = new Properties();

//    @PostConstruct
    public void init() throws Exception
    {
        p.load(this.getClass().getClassLoader().getResourceAsStream(
                "configInterface.properties"));
    }

    public static String getString(String key)
    {
        return p.getProperty(key);
    }
    
//  public static void main(String[] args) {
//	ConfigSQLUtils configUtils = new ConfigSQLUtils();
//	try {
//		configUtils.init();
//	} catch (Exception e) {
//		e.printStackTrace();
//	}
//	System.out.println(ConfigSQLUtils.getString("UserDataServiceImpl.getLogGeneral"));
//	System.out.println(getString("UserDataServiceImpl.getLogGeneral"));
//}
}
