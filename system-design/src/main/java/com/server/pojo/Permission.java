package com.server.pojo;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Getter
public class Permission {
    private Integer id;
    private String name;
    private String value;
    private String type;
    private String parentId;
    private String description;
    private String createdAt;
    private String updatedAt;
    private List<Permission> subs;
}
