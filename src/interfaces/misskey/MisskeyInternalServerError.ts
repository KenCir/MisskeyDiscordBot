// Status Code: 500
export default interface MisskeyInternalServerError {
    error: {
        message: string;
        code: string;
        id: string;
    };
}
