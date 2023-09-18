// Status Code: 401
export default interface MisskeyCredentialRequiredError {
    error: {
        message: string;
        code: string;
        id: string;
    };
}
