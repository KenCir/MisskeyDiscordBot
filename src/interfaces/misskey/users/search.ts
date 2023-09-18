import MisskeyAuthenticationFailedError from '../MisskeyAuthenticationFailedError';
import MisskeyCredentialRequiredError from '../MisskeyCredentialRequiredError';
import MisskeyIamAIError from '../MisskeyIamAIError';
import MisskeyInternalServerError from '../MisskeyInternalServerError';
import MisskeyUserDetailedNotMe from './MisskeyUserDetailedNotMe';
import MisskeyUserLite from './MisskeyUserLite';
import MisskeyUsertMeDetailed from './MisskeyUserMeDetailed';

export interface MisskeyUserSearchInvalidParamError {
    error: {
        message: string;
        code: string;
        id: string;
    };
}

export type MisskeyUserSearchResult =
    | Array<MisskeyUserLite>
    | Array<MisskeyUserDetailedNotMe | MisskeyUsertMeDetailed>
    | MisskeyUserSearchInvalidParamError
    | MisskeyCredentialRequiredError
    | MisskeyAuthenticationFailedError
    | MisskeyIamAIError
    | MisskeyInternalServerError;
