package com.server.utils;

import java.io.Serializable;

//enum ResultCodes {
//    SUCCESS("0"),ACCOUNT_NOT_EXIST(100000),PARAMS_ERR(2000000);
//}

public class Result<T extends Object> implements Serializable {
    public Integer code;
    public String message;
    public T data = null;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static Result success() {
        Result result = new Result();
        result.setCode(0);
        return result;
    }

    public static <T> Result<T> success(T data) {
        Result result = new Result();
        result.setData(data);
        result.setCode(0);
        return result;
    }

    public static Result error(Integer code, String message) {
        Result result = new Result();
        result.setCode(code);
        result.setMessage(message);
        return result;
    }
}
