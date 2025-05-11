package com.server.service.impl;

import com.google.gson.Gson;
import com.server.mapper.PermissionMapper;
import com.server.mapper.RoleMapper;
import com.server.mapper.RolePermissionMapper;
import com.server.pojo.Permission;
import com.server.pojo.Role;
import com.server.pojo.RolePermission;
import com.server.service.PermissionService;
import com.server.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RolePermissionMapper rolePermissionMapper;
    @Autowired
    private PermissionMapper permissionMapper;

    public List<Permission> getPermissionTreeByArray(List<Permission> perms) {
        if (perms.size() > 0) {
            Map<Integer, Permission> permMap = new HashMap<>();
            for (Permission p: perms) {
                permMap.put(p.getId(), p);
            }
            for (Permission p: perms) {
                if (p.getParentId() != null) {
                    Permission parent = permMap.get(p.getParentId());
                    List<Permission> children = parent.getSubs();
                    if (children == null) {
                        children = new ArrayList<>();
                    }
                    children.add(p);
                    parent.setSubs(children);
                }
            }
            List<Permission> array = perms.stream().filter((p) -> p.getParentId() == null).toList();
            System.out.println("'array'");
            System.out.println(array);

            return array;
        }

        return perms;
    };

    @Override
    public List<Role> getRoles() {
        List<Role> roles = roleMapper.getRoles();
        for (Role role: roles) {
            RolePermission rolePermission = rolePermissionMapper.getRolePermission(role.getId());
            if (rolePermission != null) {
                String ids = rolePermission.getPermissionIds();
                Gson gson = new Gson();
                List<Integer> pIds = gson.fromJson(ids, ArrayList.class);
                if (pIds.size() > 0) {
                    List<Permission> rolePermissions = permissionMapper.getPermissionByIds(pIds);
                    role.setPermissions(getPermissionTreeByArray(rolePermissions));
                }
            }
        }
        return roles;
    }

    @Override
    public Boolean createRole(Role role) {
        roleMapper.createRole(role);
        RolePermission rolePerm = new RolePermission();
        rolePerm.setRoleId(role.getId());
//        List<Integer> permIds = role.getPermissionIds();
        Gson gson = new Gson();
        String pIds = gson.toJson(role.getPermissionIds());
        rolePerm.setPermissionIds(pIds);
        rolePermissionMapper.createRolePermission(rolePerm);
        return true;
    }

    @Override
    public Boolean updateRole(Role role) {
        // 应该使用事务
        roleMapper.updateRole(role);
        RolePermission rolePerm = new RolePermission();
        rolePerm.setRoleId(role.getId());
        Gson gson = new Gson();
        String pIds = gson.toJson(role.getPermissionIds());
        rolePerm.setPermissionIds(pIds);
        Boolean isUpdated = rolePermissionMapper.updateRolePermission(rolePerm);
        if (!isUpdated) {
            rolePermissionMapper.createRolePermission(rolePerm);
        }

        return true;
    }

    @Override
    public Boolean removeRole(Integer id) {
        return roleMapper.removeRole(id);
    }
}
