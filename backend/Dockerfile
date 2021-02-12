FROM adoptopenjdk/openjdk11:jdk-11.0.5_10-alpine
ADD . /src
WORKDIR /src
CMD ["./gradlew", "bootRun"]
EXPOSE 9090