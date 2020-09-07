export declare class agentValidators {
    static login(): import("express-validator").ValidationChain[];
    static getByid(): import("express-validator").ValidationChain[];
    static signup(): import("express-validator").ValidationChain[];
    static verifyAgent(): import("express-validator").ValidationChain[];
    static resendVerificationEmail(): import("express-validator").ValidationChain[];
    static editAgent(): import("express-validator").ValidationChain[];
}
