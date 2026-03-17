import httpInstance from "@/lib/httpInterceptors";

class AuthService {
    async login(email: string, password: string) {
        const response = await httpInstance.post(`/auth/login`, {
            email,
            password,
        });
        return response.data;
    }

    async me() {
        const response = await httpInstance.get(`/auth/me`);
        return response.data;
    }
}

export default AuthService;