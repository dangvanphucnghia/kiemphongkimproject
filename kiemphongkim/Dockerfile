# --- Stage build: build jar ---
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# copy toàn bộ code backend (context đã là thư mục kiemphongkim)
COPY . .

# build jar dùng Maven trong image, không dùng mvnw nữa
RUN mvn clean package -DskipTests

# --- Stage run: chạy app ---
FROM eclipse-temurin:17-jre
WORKDIR /app

# copy file jar đã build từ stage build sang
COPY --from=build /app/target/kiemphongkim-0.0.1-SNAPSHOT.jar app.jar

# Render sẽ set env PORT, Spring Boot đọc trong application.properties
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
