import { onlineStatus } from './MisskeyUser';

export default interface MisskeyUserLite {
    id: string;
    name: string | null;
    username: string;
    host: string | null;
    avatarUrl: string | null;
    avatarBlurhash: string | null;
    isAdmin: boolean;
    isModerator: boolean;
    isBot: boolean;
    isCat: boolean;
    onlineStatus: onlineStatus | null;
}
