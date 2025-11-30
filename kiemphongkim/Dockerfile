# --- Stage build: build jar ---
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# copy nguyên folder backend vào container
COPY kiemphongkim ./kiemphongkim

# cd vào thư mục có pom.xml rồi mới build
WORKDIR /app/kiemphongkim
RUN mvn clean package -DskipTests

# --- Stage run: chạy app ---
FROM eclipse-temurin:17-jre
WORKDIR /app

# copy file jar đã build ra chạy
COPY --from=build /app/kiemphongkim/target/kiemphongkim-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
