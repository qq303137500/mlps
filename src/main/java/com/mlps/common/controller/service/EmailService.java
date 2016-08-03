package com.mlps.common.controller.service;

/**
 * 发邮件接口
 * 
 * @author
 * 
 */
public interface EmailService
{
    /**
     * 发送邮件
     * 
     * @param to
     *                接收人邮箱
     * @param subject
     *                邮件主题
     * @param content
     *                邮件内容
     */
    public Integer[] send(String[] to, String subject, String content)
            throws Exception;

    /**
     * 发送邮件
     * 
     * @param from
     *                发件人邮箱
     * @param fromName
     *                发件人姓名
     * @param to
     *                接收人邮箱
     * @param subject
     *                邮件主题
     * @param content
     *                邮件内容
     */
    public Integer[] send(String from, String fromName, String[] to,
            String subject, String content) throws Exception;
}
