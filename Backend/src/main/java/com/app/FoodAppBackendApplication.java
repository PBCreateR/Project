package com.app;

import java.io.File;
import java.util.Properties;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@SpringBootApplication
public class FoodAppBackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(FoodAppBackendApplication.class, args);
	}

	@Value("${spring.mail.protocol}")
	private String protocol;
	
	@Value("${spring.mail.username}")
	private String userName;
	
	@Value("${spring.mail.password}")
	private String password;
	
	
	
	 @Bean
	    public JavaMailSender getJavaMailSender() {
	        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	        mailSender.setHost("smtp.gmail.com");
	        mailSender.setPort(587);
	        
	        mailSender.setUsername(userName);
	        mailSender.setPassword(password);
	        
	        Properties props = mailSender.getJavaMailProperties();
	        props.put("mail.transport.protocol", protocol);
	        props.put("mail.smtp.auth", "true");
	        props.put("mail.smtp.starttls.enable", "true");
	        props.put("mail.debug", "true");
	        
	        return mailSender;
	    }

	@Bean
	public ModelMapper mapper()
	{
		System.out.println("In Model Mapper!!!!");
		return new ModelMapper();
	}
	
	@Value("${file.upload.location}")//SpEL
	private String folderName;
	
	@Override
	public void run(String... args) throws Exception {
		System.out.println("In Runner Method : "+folderName);
		//create image folder if it does not exists
		File dir = new File(folderName);
		if(!dir.exists())
		{
			System.out.println("Created Folder/s : "+dir.mkdirs());
			
		}else {
			System.out.println("Folder Exists Already");
		}
	}
	
}
