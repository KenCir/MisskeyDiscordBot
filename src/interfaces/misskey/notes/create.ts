import MisskeyAuthenticationFailedError from '../MisskeyAuthenticationFailedError';
import MisskeyCredentialRequiredError from '../MisskeyCredentialRequiredError';
import MisskeyIamAIError from '../MisskeyIamAIError';
import MisskeyInternalServerError from '../MisskeyInternalServerError';
import MisskeyRateLimitError from '../MisskeyRateLimitError';
import MisskeyNote from './MisskeyNote';

export interface MisskeyNoteCreateResponse {
    createdNote: MisskeyNote;
}

export interface MisskeyNoteCreateNoSuchRenoteTargetError {
    error: {
        message: string;
        code: string;
        id: string;
    };
}

export type MisskeyNoteCreateResult =
    | MisskeyNoteCreateResponse
    | MisskeyNoteCreateNoSuchRenoteTargetError
    | MisskeyCredentialRequiredError
    | MisskeyAuthenticationFailedError
    | MisskeyIamAIError
    | MisskeyRateLimitError
    | MisskeyInternalServerError;
