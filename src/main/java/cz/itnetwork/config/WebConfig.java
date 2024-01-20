package cz.itnetwork.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // This will enable CORS for all paths.
                .allowedOrigins("*") // This will allow access from all domains.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Allow these HTTP methods.
    }
}





