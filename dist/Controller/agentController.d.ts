export declare class agentController {
    static login2(req: any, res: any, next: any): Promise<void>;
    static signup(req: any, res: any, next: any): Promise<void>;
    static verify(req: any, res: any, next: any): Promise<void>;
    static getByid(req: any, res: any, next: any): void;
    static resendVerification(req: any, res: any, next: any): Promise<void>;
    static editAgent(req: any, res: any, next: any): Promise<void>;
    static getAllAgents(req: any, res: any, next: any): Promise<void>;
    static logout(req: any, res: any, next: any): Promise<void>;
    static updateLoginTabel(agent: any, token: any): Promise<void>;
}
