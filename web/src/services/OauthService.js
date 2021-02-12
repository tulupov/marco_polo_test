import http from "../http-oauth";

class OauthService {
  login(data) {
    return http.post("/login", data);
  }

  accessToken(data) {
    return http.post("/token", data)
  }
}

export default new OauthService();
