package com.server.pojo;

import lombok.Data;

import java.util.List;

@Data
public class RolePermission {
    private Integer id;
    private String permissionIds;
    private Integer roleId;
}
