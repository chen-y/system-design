package com.server.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Role {
    private Integer id;
    private String name;
    private String description;
    private String createdAt;
    private String updatedAt;
    private List<Permission> permissions;
    private List<Integer> permissionIds;
    private Integer userId;
}
