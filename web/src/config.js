class Config {
  client_id() {
    return process.env.CLIENT_ID || "product"
  }

  client_secret() {
    return process.env.CLIENT_SECRET || "product"
  }

  callback() {
    return process.env.CALLBACK_URL || "http://localhost:8080/callback"
  }

  grantType() {
    return "authorization_code"
  }
}

export default new Config()
