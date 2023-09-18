import MisskeyDriveFolder from '../MisskeyDriveFolder';
import MisskeyUserLite from '../users/MisskeyUserLite';

export default interface MisskeyNote {
    id: string;
    createdAt: string;
    deletedAt: string | null;
    text: string | null;
    cw: string | null;
    userId: string;
    user: MisskeyUserLite;
    replyId: string | null;
    renoteId: string | null;
    reply: unknown;
    renote: unknown;
    isHidden: boolean;
    visibility: string;
    mentions: Array<string>;
    visibleUserIds: Array<string>;
    fieldIds: Array<string>;
    files: Array<{
        id: string;
        createdAt: string;
        name: string;
        type: string;
        md5: string;
        size: number;
        isSensitive: boolean;
        blurhash: string | null;
        properties: {
            width: number;
            height: number;
            duration: number;
            avgColor: string;
        };
        url: string | null;
        thumbnailUrl: string | null;
        comment: string | null;
        folderId: string | null;
        folder: MisskeyDriveFolder;
        userId: string;
    }>;
    tags: Array<string>;
    poll: unknown;
    channelId: string | null;
    localOnly: boolean;
    reactionAcceptance: string | null;
    reactions: unknown;
    renoteCount: number;
    repliesCount: number;
    url: string;
    uri: string;
    myReaction: unknown;
}
