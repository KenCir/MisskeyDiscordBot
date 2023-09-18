import MisskeyAuthenticationFailedError from '../MisskeyAuthenticationFailedError';
import MisskeyCredentialRequiredError from '../MisskeyCredentialRequiredError';
import MisskeyIamAIError from '../MisskeyIamAIError';
import MisskeyInternalServerError from '../MisskeyInternalServerError';
import MisskeyUserDetailedNotMe from './MisskeyUserDetailedNotMe';
import MisskeyUsertMeDetailed from './MisskeyUserMeDetailed';

export interface MisskeyUserShowInvalidParamError {
    error: {
        message: string;
        code: string;
        id: string;
        kind: string;
    };
}

export type MisskeyUserShowResult =
    | MisskeyUserDetailedNotMe
    | MisskeyUsertMeDetailed
    | Array<MisskeyUserDetailedNotMe | MisskeyUsertMeDetailed>
    | MisskeyUserShowInvalidParamError
    | MisskeyCredentialRequiredError
    | MisskeyAuthenticationFailedError
    | MisskeyIamAIError
    | MisskeyInternalServerError;
