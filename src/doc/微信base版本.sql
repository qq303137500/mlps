/*
SQLyog v10.2 
MySQL - 5.5.36-log : Database - testmopaas
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`testmopaas` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

/*Table structure for table `d_wx_group` */

DROP TABLE IF EXISTS `d_wx_group`;

CREATE TABLE `d_wx_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `groupId` bigint(20) DEFAULT NULL COMMENT '分组id，由微信分配 ',
  `name` varchar(200) DEFAULT NULL COMMENT '分组名字，UTF8编码',
  `count` int(11) DEFAULT NULL COMMENT '分组内用户数量',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1243 DEFAULT CHARSET=utf8;

/*Table structure for table `d_wx_kf_info` */

DROP TABLE IF EXISTS `d_wx_kf_info`;

CREATE TABLE `d_wx_kf_info` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `kf_account` varchar(100) NOT NULL COMMENT '完整客服账号，格式为：账号前缀@公众号微信号 ',
  `kf_nick` varchar(100) DEFAULT NULL COMMENT '客服昵称',
  `kf_headimgurl` varchar(300) DEFAULT NULL COMMENT '头像',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COMMENT='微信多客服';

/*Table structure for table `d_wx_menu` */

DROP TABLE IF EXISTS `d_wx_menu`;

CREATE TABLE `d_wx_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) DEFAULT NULL COMMENT '菜单标题，不超过16个字节，子菜单不超过40个字节',
  `type` varchar(8) DEFAULT NULL COMMENT '菜单类型[click,view]',
  `menu_key` varchar(10) DEFAULT NULL COMMENT '菜单KEY值，用于消息接口推送，不超过128字节',
  `url` varchar(300) DEFAULT NULL COMMENT '网页链接，用户点击菜单可打开链接，不超过256字节',
  `grade` int(2) DEFAULT NULL COMMENT '等级[1:一级菜单,2:二级菜单]',
  `createTime` datetime DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级ID',
  `state` int(2) DEFAULT NULL COMMENT '菜单状态(0停用，1启用并向微信服务器发送添加菜单)',
  `menu_index` int(2) DEFAULT NULL COMMENT '菜单序号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=313 DEFAULT CHARSET=utf8;

/*Table structure for table `d_wx_message_send_log` */

DROP TABLE IF EXISTS `d_wx_message_send_log`;

CREATE TABLE `d_wx_message_send_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `group_id` bigint(20) DEFAULT NULL COMMENT '群发到的分组的group_id',
  `msgtype` varchar(255) DEFAULT NULL COMMENT '群发的消息类型，图文消息为mpnews，文本消息为text，语音为voice，音乐为music，图片为image，视频为video',
  `content` varchar(600) DEFAULT NULL COMMENT '文本消息内容',
  `media_id` varchar(100) DEFAULT NULL COMMENT '图文消息，语音，图片，视频用于群发的消息的media_id ',
  `create_time` datetime DEFAULT NULL COMMENT '消息发送时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

/*Table structure for table `d_wx_receive_log` */

DROP TABLE IF EXISTS `d_wx_receive_log`;

CREATE TABLE `d_wx_receive_log` (
  `id` bigint(25) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ToUserName` varchar(25) DEFAULT NULL COMMENT '接收方',
  `FromUserName` varchar(25) DEFAULT NULL COMMENT '发送方',
  `CreateTime` varchar(30) DEFAULT NULL COMMENT '创建时间',
  `MsgType` varchar(10) DEFAULT NULL COMMENT '消息类型',
  `Event` varchar(20) DEFAULT NULL COMMENT '事件名称',
  `EventKey` varchar(40) DEFAULT NULL COMMENT '事件key',
  `Ticket` varchar(50) DEFAULT NULL COMMENT '二维码的ticket',
  `Content` varchar(1000) DEFAULT NULL COMMENT '内容',
  `MsgId` varchar(25) DEFAULT NULL COMMENT '消息ID',
  `Location_X` varchar(15) DEFAULT NULL COMMENT '地理位置维度',
  `Location_Y` varchar(15) DEFAULT NULL COMMENT '地理位置经度',
  `Scale` varchar(10) DEFAULT NULL COMMENT '地图缩放大小',
  `Label` varchar(80) DEFAULT NULL COMMENT '地理位置信息',
  `Latitude` varchar(15) DEFAULT NULL COMMENT '地理位置纬度(自动上报地理位置)',
  `Longitude` varchar(15) DEFAULT NULL COMMENT '地理位置经度(自动上报地理位置)',
  `Precision` varchar(10) DEFAULT NULL COMMENT '地理位置精度',
  `PicUrl` varchar(80) DEFAULT NULL COMMENT '图片链接',
  `MediaId` varchar(25) DEFAULT NULL COMMENT '图片消息媒体id，可以调用多媒体文件下载接口拉取数据',
  `Format` varchar(20) DEFAULT NULL COMMENT '语音格式，如amr，speex等',
  `ThumbMediaId` varchar(25) DEFAULT NULL COMMENT '视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据。',
  `Title` varchar(40) DEFAULT NULL COMMENT '消息标题',
  `Description` varchar(1000) DEFAULT NULL COMMENT '消息描述',
  `Url` varchar(50) DEFAULT NULL COMMENT '消息链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `d_wx_reply` */

DROP TABLE IF EXISTS `d_wx_reply`;

CREATE TABLE `d_wx_reply` (
  `id` bigint(25) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(40) DEFAULT NULL COMMENT '指令名称(如查还款)',
  `MsgType` varchar(10) DEFAULT NULL COMMENT '消息类型',
  `Event` varchar(20) DEFAULT NULL COMMENT '事件名称',
  `create_time` datetime DEFAULT NULL COMMENT '操作时间',
  `state` int(11) DEFAULT '1' COMMENT '状态[0:删除,1正常]',
  `reply_content` varchar(100) DEFAULT NULL COMMENT '指令内容(如1,2,3)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8;

/*Table structure for table `d_wx_reply_details` */

DROP TABLE IF EXISTS `d_wx_reply_details`;

CREATE TABLE `d_wx_reply_details` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `reply_id` bigint(20) DEFAULT NULL COMMENT '回复ID',
  `msg_type` varchar(10) DEFAULT NULL COMMENT '回复类型[text,image,voice,music,news]',
  `reply_text` longtext COMMENT '回复文本',
  `reply_mediaId` varchar(25) DEFAULT NULL COMMENT '通过上传多媒体文件，得到的id。',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `description` longtext COMMENT '描述',
  `content` longtext COMMENT '正文',
  `music_URL` varchar(80) DEFAULT NULL COMMENT '链接',
  `HQMusicUrl` varchar(80) DEFAULT NULL COMMENT '高质量音乐链接，WIFI环境优先使用该链接播放音乐',
  `articles` varchar(200) DEFAULT NULL COMMENT '多条图文消息信息',
  `PicUrl` varchar(200) DEFAULT NULL COMMENT '图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200',
  `Url` varchar(200) DEFAULT NULL COMMENT '点击图文消息跳转链接',
  `original_url` varchar(200) DEFAULT NULL COMMENT '原文URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=utf8;

/*Table structure for table `d_wx_user` */

DROP TABLE IF EXISTS `d_wx_user`;

CREATE TABLE `d_wx_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '表主键',
  `openid` varchar(100) NOT NULL COMMENT '用户的标识，对当前公众号唯一 ',
  `subscribe` int(2) DEFAULT NULL COMMENT ' 	用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。',
  `nickname` mediumblob COMMENT '用户的昵称',
  `sex` int(2) DEFAULT NULL COMMENT '用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 ',
  `city` varchar(50) DEFAULT NULL COMMENT '用户所在城市 ',
  `country` varchar(50) DEFAULT NULL COMMENT '用户所在国家',
  `province` varchar(50) DEFAULT NULL COMMENT '用户所在省份',
  `language` varchar(50) DEFAULT NULL COMMENT '用户的语言，简体中文为zh_CN',
  `headimgurl` varchar(250) DEFAULT NULL COMMENT '用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。',
  `subscribe_time` varchar(200) DEFAULT NULL COMMENT ' 	用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间 ',
  `unionid` varchar(100) DEFAULT NULL COMMENT '只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。详见：获取用户个人信息（UnionID机制）',
  `remark` varchar(100) DEFAULT NULL COMMENT ' 	公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注 ',
  `groupid` bigint(20) DEFAULT NULL COMMENT '用户所在的分组ID ',
  `createTime` datetime DEFAULT NULL COMMENT '用户在本地数据库的创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16014 DEFAULT CHARSET=utf8;

/*Table structure for table `d_wx_user_informa` */

DROP TABLE IF EXISTS `d_wx_user_informa`;

CREATE TABLE `d_wx_user_informa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ToUserName` varchar(30) DEFAULT NULL COMMENT '接收方',
  `FromUserName` varchar(30) DEFAULT NULL COMMENT '发送方',
  `CreateTime` varchar(13) DEFAULT NULL COMMENT '发送时间',
  `MsgType` varchar(10) DEFAULT NULL COMMENT '消息类型',
  `Event` varchar(15) DEFAULT NULL COMMENT '事件类型',
  `EventKey` varchar(10) DEFAULT NULL COMMENT '事件标志',
  `Ticket` varchar(10) DEFAULT NULL,
  `Content` varchar(2000) DEFAULT NULL COMMENT '内容',
  `MsgId` varchar(15) DEFAULT NULL COMMENT '消息ID',
  `Location_X` varchar(15) DEFAULT NULL,
  `Location_Y` varchar(15) DEFAULT NULL,
  `Scale` varchar(5) DEFAULT NULL,
  `Label` varchar(25) DEFAULT NULL,
  `Latitude` varchar(15) DEFAULT NULL,
  `Longitude` varchar(15) DEFAULT NULL,
  `Precision` varchar(80) DEFAULT NULL,
  `KfAccount` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
