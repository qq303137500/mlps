package com.mlps.common.controller.service.impl;

import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.StringUtils;

import com.mlps.common.controller.service.EmailService;
import com.msd.platform.common.constants.ConfigConstants;
import com.msd.platform.component.config.AppConfig;
import com.msd.platform.service.email.EmailWebService;
import com.msd.platform.service.email.MailInfo;


public class EmailServiceImpl implements EmailService
{
    private static Logger logger = Logger.getLogger(EmailServiceImpl.class);

    private JavaMailSender mailSender;

    private EmailWebService emailWebService;

    private String defaultFrom;

    private String defaultFromName;

    /**
     * Web Service API是中新龙提供的邮件发送数据接口:用户名
     */
    private String userName;

    /**
     * Web Service API是中新龙提供的邮件发送数据接口:密码
     */
    private String password;

    /**
     * 邮件发送使用webservice发送
     */
    public static String EMAIL_SEND_WS_API = AppConfig.getItemValue(
            ConfigConstants.MODULE_EMAIL, ConfigConstants.ITEM_EMAILSENDWSAPI);

    public Integer[] send(String[] to, String subject, String content)
            throws Exception
    {
        logger.info("mail send begin......");
        if (EMAIL_SEND_WS_API.equals("1"))
        {
            return this.execute(defaultFrom, defaultFromName, to, subject,
                    content);
        }
        else
        {
            return this.execute_old(defaultFrom, defaultFromName, to, subject,
                    content);
        }
    }

    public Integer[] send(String from, String fromName, String[] to,
            String subject, String content) throws Exception
    {
        logger.info("mail send begin......");
        if (EMAIL_SEND_WS_API.equals("1"))
        {
            return this.execute(from, fromName, to, subject, content);
        }
        else
        {
            return this.execute_old(from, fromName, to, subject, content);
        }
    }

    private Integer[] execute(final String from, final String fromName,
            final String[] to, final String subject, final String content)
            throws Exception
    {
        Integer[] result = new Integer[to.length];
        logger.info("mail execute begin......");
        String toStr = StringUtils.arrayToCommaDelimitedString(to);
        logger.info("send email to user: " + toStr);

        for (int i = 0; i < to.length; i++)
        {
            try
            {
                MailInfo mi = new MailInfo();
                mi.setFrom(from);
                mi.setFromName(fromName);
                mi.setReplayTo(from);
                mi.setReplayToName(fromName);
                mi.setSubject(subject);
                mi.setContent(content);
                mi.setTo(to[i]);
                mi.setToName(org.apache.commons.lang.StringUtils
                        .substringBefore(to[i], "@"));
                int retVal = emailWebService
                        .sendMessage(userName, password, mi);
                if (retVal == 1)
                {
                    result[i] = 1;
                }
                else
                {
                    result[i] = 0;
                }
                logger.info("send mail: " + to[i] + " retVal: " + retVal);
            }
            catch (Exception e)
            {
                logger.error("send mail error: " + toStr, e);
            }
            logger.info("send mail end: " + toStr);
        }
        logger.info("send mail end: " + toStr);
        logger.info("mail execute end......");
        return result;
    }

    private Integer[] execute_old(String from, String fromName,
            final String[] to, String subject, String content) throws Exception
    {
        Integer[] result = new Integer[to.length];
        logger.info("old: mail execute begin......");
        final MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "GBK");

        helper.setFrom(from, fromName);
        helper.setTo(to);

        helper.setSubject(subject);
        helper.setText(content, true);

        String toStr = StringUtils.arrayToCommaDelimitedString(to);
        logger.info("old: send email to user:" + toStr);
        mailSender.send(message);
        logger.info("old: send mail success:" + toStr);
        for (int i = 0; i < result.length; i++)
        {
            result[i] = 1;
        }
        return result;
    }

    public String getDefaultFrom()
    {
        return defaultFrom;
    }

    public void setDefaultFrom(String defaultFrom)
    {
        this.defaultFrom = defaultFrom;
    }

    public String getDefaultFromName()
    {
        return defaultFromName;
    }

    public void setDefaultFromName(String defaultFromName)
    {
        this.defaultFromName = defaultFromName;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public EmailWebService getEmailWebService()
    {
        return emailWebService;
    }

    public void setEmailWebService(EmailWebService emailWebService)
    {
        this.emailWebService = emailWebService;
    }

    public JavaMailSender getMailSender()
    {
        return mailSender;
    }

    public void setMailSender(JavaMailSender mailSender)
    {
        this.mailSender = mailSender;
    }
}
