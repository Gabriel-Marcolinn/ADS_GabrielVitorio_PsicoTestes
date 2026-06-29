package com.psicotestes;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
<<<<<<< HEAD
                .allowedOriginPatterns("https://ads-gabriel-vitorio-psico-testes.vercel.app")
=======
                .allowedOriginPatterns("*")
>>>>>>> c9c6b43f6067201af85fc2cec52f21ab58c902e4
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*");
    }
}
