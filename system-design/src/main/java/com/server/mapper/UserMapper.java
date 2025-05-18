package com.server.mapper;

import com.server.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {
    @Select("select * from user")
    List<User> findAll();

    List<User> getUsers();
    Boolean createUser(User user);
    Boolean updateUser(User user);

    Boolean deleteUser(Integer userId);

    @Select("select * from user where id = #{id}")
    Optional<User> findById(@Param("id") long id);

    @Select("select * from user where name = #{name} and password = #{password}")
    @Result(column = "create_time", property = "createTime")
    @Result(column = "update_time", property = "updateTime")
    @Result(column = "nick_name", property = "nickName")
    User findAccount(@Param("name") String name, @Param("password") String password);
}
