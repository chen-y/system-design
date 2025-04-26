package com.server;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.KeyAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.apache.tomcat.util.file.ConfigurationSource;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import javax.crypto.SecretKey;
import java.io.IOError;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.*;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

import java.util.HashMap;

@SpringBootTest
public class JwtTest {
    private String secretKey = "Y2hlbnlp";

    @Autowired
    private ResourceLoader resourceLoader;

    @Test
    public void testGenerate() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:system-design");
//        System.out.println();
//        System.out.println(FileSystems.getDefault().getPath("classpath:", "system-design.pub"));

        var dataMap = new HashMap<String, Object>();
        var expires = new Date(System.currentTimeMillis() + 60 * 60 * 1000);
//        Path path = FileSystems.getDefault().getPath("", "~/.ssh/system-design.pub");
        Path path = Paths.get(resource.getURI());
//        Path path = Paths.get("~/.ssh/system-design");
        byte[] bytes = Files.readAllBytes(path);
        SecretKey key = Keys.hmacShaKeyFor(bytes);
        String token = Jwts.builder()
                .header().keyId("a")
                .and()
                .subject("1")
                .expiration(expires)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        System.out.println(token);
    };

    @Test
    public void testParseJwt() throws IOException {
        String token = "eyJraWQiOiJhIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiIxIiwiZXhwIjoxNzQzOTExNTIxfQ.M4am8YXphPKrQrzZiptKOnA5JKy63y5l0VLVhvw3sao";
        Resource resource = resourceLoader.getResource("classpath:system-design");
        Path path = Paths.get(resource.getURI());
        byte[] bytes = Files.readAllBytes(path);
        SecretKey key = Keys.hmacShaKeyFor(bytes);
        String p = Jwts.parser().decryptWith(key).build().parseSignedClaims(token).getPayload().getSubject();
        System.out.println(p);

    }
}
