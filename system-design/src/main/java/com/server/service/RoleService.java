package com.server.service;

import com.server.pojo.Role;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RoleService {
    List<Role> getRoles();

    Boolean createRole(Role role);
    Boolean updateRole(Role role);
    Boolean removeRole(Integer id);
}
