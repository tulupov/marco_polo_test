FROM adoptopenjdk/openjdk11:jdk-11.0.5_10-alpine
ADD . /src
WORKDIR /src
RUN chmod a+x ./gradlew
CMD ["./gradlew", "bootRun"]
EXPOSE 9090