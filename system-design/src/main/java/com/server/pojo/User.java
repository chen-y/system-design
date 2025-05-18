package com.server.pojo;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
public class User {
    private Integer id;
    private String createdAt;
    private String updatedAt;
    private String name;
    private String mobile;
    private String email;
    private String avatar;
    private String nickName;
    private String password;
    private List<Role> roles;
    private List<Integer> roleIds;
}
