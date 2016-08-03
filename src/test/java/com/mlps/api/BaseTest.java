package com.mlps.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.msd.platform.crypto.Encrypter;
import com.msd.utils.ConfigUtils;

/**
 * 测试类示例
 * @author zp
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)  
@WebAppConfiguration  
@ContextConfiguration(locations = { "classpath*:conf/spring/applicationContext*.xml" })  
//声明一个事务管理 每个单元测试都进行事务回滚 无论成功与否  
@TransactionConfiguration(defaultRollback = true)  
//采用注解的方式 声明事务
@Transactional  
public class BaseTest {  
  
    @Autowired  
    private WebApplicationContext wac;  
  
    protected MockMvc mockMvc;  
  
    @Before  
    public void setup() {  
        // webAppContextSetup 注意上面的static import  
        // webAppContextSetup 构造的WEB容器可以添加fileter 但是不能添加listenCLASS  
        // WebApplicationContext context =  
        // ContextLoader.getCurrentWebApplicationContext();  
        // 如果控制器包含如上方法 则会报空指针  
        this.mockMvc = webAppContextSetup(this.wac).build();  
    }  
  
//    @Test  
    //有些单元测试  不回滚  
    @Rollback(false)  
    public void ownerId() throws Exception {  
        mockMvc.perform((get("/api/userInsure/getUserInsurance")
        		.param("userId", "683409")
        		.param("timestamp", "1000")
        		.param("sign", Encrypter.md5s("683409" + Encrypter.md5s(ConfigUtils.getString("tokenKey.hsapi"))+ "1000"))
        		)).andExpect(status().isOk())  
                .andDo(print());  
    }  
  
//    @Test
    public void test() throws Exception {  
        mockMvc.perform((post("/api/userInsure/getUserInsurance")
        		.param("userId", "683409")
        		.param("timestamp", "1000")
        		.param("sign", Encrypter.md5s("683409" + Encrypter.md5s(ConfigUtils.getString("tokenKey.hsapi"))+ "1000"))
        		))
        		.andExpect(status().isOk())  
                .andDo(print())  
                .andExpect(model().attributeHasNoErrors("userId,timestamp,sign"));  //断言给定的模型没有错误
    }  
  
//    @Test  
    public void testb() throws Exception {  
        mockMvc.perform((get("/spring/testb.do"))).andExpect(status().isOk())  
                .andDo(print());  
    }  
  
//    @Test  
    public void getAccount() throws Exception {  
        mockMvc.perform((post("/spring/post.do").param("abc", "def")))  
                .andExpect(status().isOk()).andDo(print());  
    }  
  
}  