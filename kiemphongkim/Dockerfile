FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# copy project (context đã là thư mục kiemphongkim)
COPY . .

# cho phép chạy mvnw
RUN chmod +x mvnw

# build jar
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/kiemphongkim-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
