package com.server.utils;


import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint(value = "/message")
@Component
public class WSServerEndPoint {
    public static final Map<String, Session> sessions = new ConcurrentHashMap<>();
    private Session session;

    @OnOpen
    public void open(Session session) {
        System.out.println("websocket open");
        this.session = session;
        sessions.put(session.getId(), session);
        System.out.println(session.getId());
    }

    @OnMessage
    public void message(String message) throws IOException {
        System.out.println(message);
        this.session.getBasicRemote().sendText("hello from server");
    }

    @OnClose
    public void close(Session session) {
        sessions.remove(session.getId());
    }
}
