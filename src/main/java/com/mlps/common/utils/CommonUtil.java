package com.mlps.common.utils;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Date;
import java.util.Enumeration;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

import com.msd.platform.crypto.Encrypter;
import com.msd.platform.util.DateUtils;


/**
 * 通用方法类
 * @author wugy
 *
 */
public class CommonUtil {
	
	/**
	 * 移动号码段
	 */
	private static String cms0="";
	
	/**
	 * 联通号码段
	 */
	private static String cms1="";
	
	/**
	 * 电信号码段
	 */
	private static String cms2="";
	
	static {
		initMobileRange();
	}
	
	
	/**
	 * 手机号码检测方法
	 * 13(老)号段：130、131、132、133、134、135、136、137、138、139
	 * 15(新)号段：150、151、152、153、154、155、156、157、158、159
	 * 18(3G)号段：180、181、182、183、184、185、186、187、188、189
	 * 
	 * 130：中国联通，GSM
	 * 131：中国联通，GSM
	 * 132：中国联通，GSM
	 * 133：中国联通转给中国电信，CDMA
	 * 134：中国移动，GSM
	 * 135：中国移动，GSM
	 * 136：中国移动，GSM
	 * 137：中国移动，GSM
	 * 138：中国移动，GSM
	 * 139：中国移动，GSM
	 * 
	 * 145：中国联通GSM
	 * 147：中国移动GSM
	 * 
	 * 150：中国移动，GSM
	 * 151：中国移动，GSM
	 * 152：中国移动
	 * 153：中国联通转给中国电信，CDMA
	 * 154：154号段暂时没有分配，估计是因为154的谐音是“要吾死”，这样的手机号码谁敢要啊？
	 * 155：中国联通，GSM
	 * 156：中国联通，GSM
	 * 157：中国移动，GSM
	 * 158：中国移动，GSM
	 * 159：中国移动，GSM
	 * 
	 * 180：中国电信，3G，尚未开始对外放号
	 * 181：中国电信，3G
	 * 182：中国移动
	 * 183：中国移动
	 * 184：中国移动
	 * 185：中国联通，3G，尚未开始对外放号
	 * 186：中国联通，3G，尚未开始对外放号
	 * 187：中国移动，3G，尚未开始对外放号
	 * 188：中国移动，3G，目前TD测试服务在部分城市对外放号
	 * 189：中国电信，3G，CDMA，天翼189，2008年底开始对外放号
	 * 
	 * @param mobiles
	 * @return
	 */
	public static boolean isMobileNO(String mobiles) {
		if(mobiles==null || mobiles.equals("")){
			return false;
		}
		Pattern p = Pattern.compile("^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\\d{8}$");  
        Matcher m = p.matcher(mobiles);  
        return m.matches();  
	}
	
	/**
	 * 返回手机号的所属运营商
	 * 移动号码段：134,135,136,137,138,139,150,151,152,157,158,159,182,183,184,187,188,147
	 * 联通号码段：130,131,132,145,155,156,185,186
	 * 电信号码段：133,153,180,181,189
	 * @param mobiles
	 * @return 0:移动；1：联通；2：电信
	 */
	public static int getMobileType(String mobiles) {
		String m=mobiles.substring(0, 3);
		int ret=0;
		if(cms0.contains(m)){
			ret=0;
		}
		else if(cms1.contains(m)){
			ret=1;
		}
		else if(cms2.contains(m)){
			ret=2;
		}
		return ret;
	}
	
	/**
	 * 
	* 取配置文件初始化号码段
	* @return void 返回类型
	 */
	public static void initMobileRange() {
		cms0 =  "134,135,136,137,138,139,150,151,152,157,158,159,182,183,184,187,188,147";
		cms1 =  "130,131,132,145,155,156,185,186";
		cms2 =  "133,153,180,181,189";
	}

	
	/**
	 * 数字检测
	 * @param val
	 * @return
	 */
	public static boolean isNumber(String val) {
		if(val==null || val.equals("")){
			return false;
		}
		if(Pattern.matches("^-{0,1}\\d*\\.{0,1}\\d+$",val)){
			return   true;  
		}
		else{
			return false;
		}
	}
	
	
	/**
	 * 车友号验证规则特殊保留号
	 * 1、弃尾号4的号码；2、连号；如：123456、234567、3、	全重复号；888888；
	 * @param num
	 * @return 正常：0;	尾号4：-1；	全重复号：-2；	连号:-3、-4
	 */
	public static int validNumber(String num){
		int ret=0;
		int iNum = num.length();
		int[] Numbuf=new int[iNum] ;
		for( int j= 0; j < iNum ; j++)
		{
			Numbuf[j]=Integer.parseInt(num.substring(j,j+1));
		}
		
		if(Numbuf[iNum - 1] == 4)  //弃号处理
		{
			ret=-1;
		}
		else
		{
			//全重复号处理
			for( int j= 0; j < iNum ; ++j)
			{
				if(Numbuf[j] != Numbuf[0])
					break;
				if(j == iNum - 1)
				{
					ret=-2;
				}
			}

			//连号处理
			if(ret == 0)
			{
				for(int j = 0;j< iNum ; ++j)
				{
					if(Numbuf[j] !=  Numbuf[0] + j)
						break;
					if(j == iNum - 1)  //升序连号
					{
						ret=-3;
					}
				}
				
				if(ret == 0)
				{
					for(int j = 0;j< iNum;++j)
					{
						if(Numbuf[j] != Numbuf[0] - j)
							break;
						if(j == iNum - 1)//降序连号
						{
							ret=-4;
						}
					}
				}
			}
		}
		return ret;
	} 
	
    
    /**
     * 取得指定长度的随机数字
     * @param length
     * @return
     */
	public static String getRandomCode(int length)
    {
    	char[] codeList= {'0','1', '2', '3', '4', '5', '6', '7', '8', '9' };
    	StringBuilder sb = new StringBuilder();
        Random random = new Random();
        int len=codeList.length;
        for (int i = 0; i < length; i++)
        {
            sb.append(codeList[random.nextInt(len)]);
        }
        return sb.toString();
    }
	
    /**
     * 取得指定范围的随机数字
     * @param length
     * @return
     */
	public static String getRandomNO(int length)
    {
    	int[] codeList= {10,11, 12, 13, 14, 15, 16, 17, 18, 19,20,21, 22, 23, 24, 25, 26, 27, 28, 29,30,31, 32, 33, 34, 35, 36, 37, 38, 39,40,41,42,43,44 };
    	StringBuilder sb = new StringBuilder();
        Random random = new Random();
        sb.append(codeList[random.nextInt(codeList.length)]);
        return sb.toString();
    }
	
	/**
	 * 取得本机IP地址
	 * @return
	 */
	public static String getIPaddr(){
		String ip="";
		try{
			InetAddress addr = InetAddress.getLocalHost();
			ip=addr.getHostAddress();//获得本机IP
			//String address=addr.getHostName();//获得本机名称			
		}
		catch(Exception e){
			System.out.println("getIPaddr() error."+e);
		}
		return ip;
	} 
	
	 /**
     * 生成用户UserToken
     * 根据用户id+当前时间+随机数生成userToken
     * @param length
     * @return
     */
	public static String createUserToken(String userId)
    {
		//按yyyyMMdd格式取当前时间
		String curDate=DateUtils.formatDate(new Date(), "yyyyMMdd");
		//根据用户id+当前时间+随机数生成userToken
        return Encrypter.md5s(userId+curDate+CommonUtil.getRandomCode(6));
    }
	
	 /**
     * 取得http请求的参数字符串
     * 返回格式：p1=xxx&p2=xxx&p3=xx
     * @return
     */
    @SuppressWarnings("unchecked")
	public static String getParameters(HttpServletRequest request){
    	String ret="",key="";
    	Enumeration enu = request.getParameterNames();
        while (enu.hasMoreElements()) {
            key = (String) enu.nextElement();
            ret+="&"+key+"="+request.getParameter(key);            
        }
        if(ret.length()>0){
        	ret=ret.substring(1);
        }
        return ret+" method:"+request.getMethod();
    }    
    
    /**
	 * 字符串转码
	 * @param content
	 * @param encoding
	 * @return
	 */
	public static String encodingString(String content,String encoding) {
		String result = "";
		try {
			if (StringUtils.isNotEmpty(content)) {
				encoding=(StringUtils.isEmpty(encoding))? "utf-8":encoding;
				result = new String(content.getBytes("iso8859-1"), encoding);
            }
				
		} catch (Exception e) {
			result=content;
			e.printStackTrace();
		}
		return result;
	}
	

    /**
     * 特殊字符转HTML编码
     * @param s
     * @return
     */
	public static String htmlEncode(String s) {
		String ret=s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">",
				"&gt;").replaceAll("\"", "&quot;");
		return ret;
    }
    
    /**
     * HTML编码解释转码
     * @param s
     * @return
     */
	public static String htmlDecode(String s) {
		String ret = s.replaceAll("&amp;", "&").replaceAll("&lt;", "<")
				.replaceAll("&gt;", ">").replaceAll("&quot;", "\"");
		return ret;
	}
    
	public static void main(String[] args) throws IOException {
	   /* System.out.println(getMobileType("13728823757"));
	    System.out.println(getMobileType("18628823757"));
	    System.out.println(getMobileType("18128823757"));*/
	}
}
