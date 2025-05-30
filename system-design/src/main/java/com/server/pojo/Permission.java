package com.server.pojo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class Permission {
    private Integer id;
    private String name;
    private String value;
    private String type;
    private Integer parentId;
    private String description;
    private String createdAt;
    private String updatedAt;
    private List<Permission> subs;
}
