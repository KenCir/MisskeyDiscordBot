export default interface MisskeyRateLimitError {
    error: {
        message: string;
        code: string;
        id: string;
    };
}
