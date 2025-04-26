package com.server.controller;

import com.server.mapper.UserMapper;
import com.server.pojo.User;
import com.server.utils.JwtUtils;
import com.server.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

class UserWithToken {
    private String accessToken;
    private String refreshToken;

    private User user;

    UserWithToken() {

    }

    public UserWithToken(User user, String at, String rt) {
        this.user = user;
        this.accessToken = at;
        this.refreshToken = rt;
    }
}

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JwtUtils jwtUtils;

    private String authField = "Authorization";

    public Map<String, Object> getResultMap(User user) {
        Map<String, Object> map = new HashMap<>();
        JwtUtils.TokenEntity accessToken = jwtUtils.genToken(user.getId(), JwtUtils.A_TK);
        JwtUtils.TokenEntity refreshToken = jwtUtils.genToken(user.getId(), JwtUtils.R_TK);
        map.put("user", user);
        map.put(JwtUtils.A_TK, accessToken.token);
        map.put("accessTokenExpires", accessToken.expires.getTime());
        map.put(JwtUtils.R_TK, refreshToken.token);
        map.put("refreshTokenExpires", refreshToken.expires.getTime());
        return map;
    };

    @PostMapping("/login")
    public Result onLogin(@RequestHeader MultiValueMap<String, String> header, @RequestBody HashMap obj) {
        // 1 查看用户信息是否正确
//        userMapper.findById();
        User user = userMapper.findAccount((String) obj.get("account"), (String) obj.get("password"));
        if (user == null) {
            return Result.error(300000, "未找到用户");
        }

        // 生成token

        Map<String, Object> u = getResultMap(user);

        return Result.success(u);
    };

    @PostMapping("/refresh")
    public Result reLogin(@RequestHeader MultiValueMap<String, String> header, @RequestBody HashMap<String, String> body) {
        System.out.println("body--");
        System.out.println(body);

        String refreshToken = body.get(JwtUtils.R_TK);
        System.out.println(JwtUtils.R_TK);
        System.out.println(refreshToken);
//        return refreshToken;
        try {
            Integer uid = jwtUtils.getUidFromToken(refreshToken);
            System.out.println(uid);
            Optional<User> userOrNull = userMapper.findById(uid);
            User user = userOrNull.get();

            Map<String, Object> u = getResultMap(user);
            return Result.success(u);



        } catch (Exception e) {
            System.out.println(e);
            return Result.error(500001, "refresh token 错误");
        }

    }
}
