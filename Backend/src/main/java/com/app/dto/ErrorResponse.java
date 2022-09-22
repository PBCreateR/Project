package com.app.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ErrorResponse {
	private String message;
	private LocalDateTime timeStamp;
	public ErrorResponse(String message) {
		super();
		this.message = message;
		this.timeStamp=LocalDateTime.now();
	}
	public ErrorResponse(String message,LocalDateTime timestamp) {
        super();
        this.message = message;
        this.timeStamp = timestamp;
    }

}
