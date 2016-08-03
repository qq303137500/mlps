/*** Eclipse Class Decompiler plugin, copyright (c) 2012 Chao Chen (cnfree2000@hotmail.com) ***/
package com.mlps.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import com.msd.platform.vo.Page;

public abstract class BaseDao<T> extends NamedParameterJdbcDaoSupport {
	protected final String PAGE_SQL_PREFIX = "select * from(select m.*,rownum num from (";
	protected final String PAGE_SQL_END = ") m where rownum<=?) where num>?";

	
	@Resource(name = "canBoxDataSource")
	public void setSuperDataSource(DataSource dataSource) {
		super.setDataSource(dataSource);
	}

	protected int update(String sql, Object[] paramValue) {
		return getJdbcTemplate().update(sql, paramValue);
	}

	protected int update(String namedSql, Object javaBean) {
		SqlParameterSource paramSource = new BeanPropertySqlParameterSource(
				javaBean);

		return getNamedParameterJdbcTemplate().update(namedSql, paramSource);
	}

	protected int update(String namedSql, List list) {
		return update(namedSql, list.toArray());
	}

	protected int update(String sql, Map map) {
		return getNamedParameterJdbcTemplate().update(sql, map);
	}

	protected long queryForLong(String sql, Map<String, Object> paramMap) {
		return getNamedParameterJdbcTemplate().queryForLong(sql, paramMap);
	}

	protected int queryForInt(String sql, Map<String, Object> paramMap) {
		return getNamedParameterJdbcTemplate().queryForInt(sql, paramMap);
	}

	protected T getBean(String sql, RowMapper<T> rowMapper, Object[] paramValue) {
		try {
			return getJdbcTemplate().queryForObject(sql, rowMapper, paramValue);
		} catch (Exception ex) {
		}
		return null;
	}

	protected List<T> getList(String sql, RowMapper<T> rowMapper,
			Object[] paramValue) {
		return getJdbcTemplate().query(sql, rowMapper, paramValue);
	}

	protected List<T> getList(String sql, RowMapper<T> rowMapper) {
		return getJdbcTemplate().query(sql, rowMapper);
	}

	protected List<T> query(String sql, Class<T> cla, Object[] args) {
		List list = super.getJdbcTemplate().query(sql.toString(), args,
				new BeanPropertyRowMapper(cla));

		return list;
	}

	protected List<T> query(String sql, Class<T> cla, List<T> args) {
		return query(sql, cla, args.toArray());
	}
 
	protected List<T> query(String sql, Class<T> cla, Object[] args, Page page) {
		if (page != null && page.getPageSize()!=0) {
			String countSql = "select count(1) from ( " + sql + " ) t";
			int counts = getJdbcTemplate().queryForInt(countSql, args);
			page.setCounts(counts, page.getPageSize());
			int beginPos = (page.getCurPage() - 1) * page.getPageSize();
			sql = sql + " LIMIT " + beginPos + "," + page.getPageSize();
		}
		return query(sql, cla, args);
	}
	/**
	protected List<T> query(String sql, Class<T> cla, Object[] args, Page page) {
		if (page != null) {
			String countSql = "select count(1) from ( " + sql + " ) t";
			int counts = getJdbcTemplate().queryForInt(countSql, args);
			page.setCounts(counts, page.getPageSize());
			// int beginPos = (page.getCurPage() - 1) * page.getPageSize();
			int endIndex=page.getCurPage() * page.getPageSize();
			int startIndex=(page.getCurPage()-1) *page.getPageSize();
			sql = "select * from(select m.*,rownum num from ( "+ sql + " ) m where rownum<="+endIndex+") where num >"+startIndex;
		}
		return query(sql, cla, args);
	}
	*/
	

	protected List<T> query(String sql, Class<T> cla, List<T> args, Page page) {
		return query(sql, cla, args.toArray(), page);
	}

	protected T getBean(String sql, Class cla, Object[] args) {
		List list = super.getJdbcTemplate().query(sql.toString(), args,
				new BeanPropertyRowMapper(cla));

		Object t = null;
		if (CollectionUtils.isNotEmpty(list)) {
			t = list.get(0);
		}
		return (T) t;
	}

	protected T getObject(String sql, Class cla, Object[] paramValue) {
		try {
			return (T)super.getJdbcTemplate().queryForObject(sql,
					new BeanPropertyRowMapper(cla), paramValue);
		} catch (Exception ex) {
		}
		return null;
	}

	protected int getCount(String countSQL, List paramValue) {
		int result;
		try {
			result = getJdbcTemplate().queryForInt(countSQL,
					paramValue.toArray());
		} catch (EmptyResultDataAccessException e) {
			return 0;
		}
		return result;
	}

	protected int getCount(String countSQL, Object[] paramValue) {
		int result;
		try {
			result = getJdbcTemplate().queryForInt(countSQL, paramValue);
		} catch (EmptyResultDataAccessException e) {
			return 0;
		}
		return result;
	}
	
	protected String getSqlByPage(StringBuffer sql,Page page){
		StringBuilder SqlPage = new StringBuilder(sql);
		if(page!=null && page.getPageSize()!=0){
			StringBuilder sbCount = new StringBuilder();
			sbCount.append("select count(*) from ( ").append(sql).append(" ) ta ");
			page.setCounts(this.getJdbcTemplate().queryForInt(sbCount.toString()), page.getPageSize());
			SqlPage.append(" LIMIT ").append((page.getCurPage() - 1) * page.getPageSize());
			SqlPage.append(" , ").append(page.getPageSize());
		}
		return SqlPage.toString();
	}
}