import { type Request, type Response } from "express";
declare const handleRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const handleLogin: (req: Request, res: Response) => Promise<void>;
export { handleRegister, handleLogin };
//# sourceMappingURL=authController.d.ts.map