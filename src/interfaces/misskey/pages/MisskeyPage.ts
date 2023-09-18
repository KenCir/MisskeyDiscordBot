import MisskeyUserLite from '../users/MisskeyUserLite';

export default interface MisskeyPage {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    name: string;
    summary: string;
    content: Array<unknown>;
    variables: Array<unknown>;
    userId: string;
    user: MisskeyUserLite;
}
