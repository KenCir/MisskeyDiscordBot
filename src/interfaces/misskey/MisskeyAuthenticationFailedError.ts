// Status Code: 403
export default interface MisskeyAuthenticationFailedError {
    error: {
        message: string;
        code: string;
        id: string;
    };
}
