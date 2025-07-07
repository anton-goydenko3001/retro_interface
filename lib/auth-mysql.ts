export class AuthService {
  static async signUp(
    email: string,
    password: string,
    username: string,
    fullName: string
  ) {
    return {
      user: {
        id: 1,
        email,
        username,
        full_name: fullName,
        role: "user",
      },
      token: "mock-auth-token",
    };
  }
}
