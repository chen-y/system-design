package com.server.pojo;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
public class User {
    private Integer id;
    private String createTime;
    private String updateTime;
    private String name;
    private String mobile;
    private String email;
    private String avatar;
    private String nickName;


//    public Integer getId() {
//        return id;
//    }
//
//    public String getCreateTime() {
//        return createTime;
//    }
//
//    public String getUpdateTime() {
//        return updateTime;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getMobile() {
//        return mobile;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public String getAvatar() {
//        return avatar;
//    }
//
//    public String getNickName() {
//        return nickName;
//    }
}
