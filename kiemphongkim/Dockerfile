# --- Stage build: build jar ---
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# copy toàn bộ project vào container
COPY . .

# build jar (dùng mvnw nếu repo có mvnw)
RUN ./mvnw clean package -DskipTests

# --- Stage run: chạy app ---
FROM eclipse-temurin:17-jre
WORKDIR /app

# copy file jar đã build từ stage build sang
COPY --from=build /app/target/kiemphongkim-0.0.1-SNAPSHOT.jar app.jar

# render sẽ set env PORT, spring boot sẽ đọc ở application.properties
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
