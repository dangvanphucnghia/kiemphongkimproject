package com.phucnghia.kiemphongkim.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Khi FE gọi /uploads/** → Spring sẽ đọc file từ thư mục "uploads/" ngoài ổ đĩa
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
        // nếu bạn lưu ở chỗ khác, ví dụ D:/data/uploads/ thì sửa thành:
        // .addResourceLocations("file:D:/data/uploads/");
    }
}
