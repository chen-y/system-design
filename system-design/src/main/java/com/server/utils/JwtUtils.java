package com.server.utils;

import com.server.pojo.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.el.parser.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtils {
    @Value("${spring.jwt.secret}")
    private String secretKey;

    private long accessTKExpireMS = 2 * 60 * 60 * 1000;
    private long refreshTKRefreshMS = 15L * 24 * 60 * 60 * 1000;

    private String uidKey = "uid";

    public static final String A_TK = "accessToken";
    public static final String R_TK = "refreshToken";

    public class TokenEntity {
        public String token;
        public Date expires;

        public TokenEntity(String t, Date e) {
            token = t;
            expires = e;
        }
    }

    public TokenEntity genToken(Integer userId, String sub) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        long expires = sub.equals(JwtUtils.R_TK) ? refreshTKRefreshMS : accessTKExpireMS;
        Date expireDate = new Date(System.currentTimeMillis() + expires);
        String jwt = Jwts.builder()
                .subject(sub)
                .claim(uidKey, userId)
                .expiration(expireDate)
                .signWith(key)
                .compact();
        return new TokenEntity(jwt, expireDate);
    }

    public Integer getUidFromToken(String token) throws JwtException {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return (Integer)Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get(uidKey);
    }

    public Integer getUidFromHeader(Map<String, String> header) {
        String authorization = header.get("authorization");
        String jwt = authorization.substring(7);
        System.out.println(jwt);
        Integer uid = getUidFromToken(jwt);
        return uid;
    }
}
