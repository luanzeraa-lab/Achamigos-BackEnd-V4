export const AuthConfig = {
    jwt: {
        secret: process.env.JWT_SECRET || "default_secret_key",
        expiresIn: "1d"
    }
}