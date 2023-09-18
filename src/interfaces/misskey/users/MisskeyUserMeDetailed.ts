import { twoFactorBackupCodesStock } from './MisskeyUser';
import MisskeyUserDetailedNotMe from './MisskeyUserDetailedNotMe';

export default interface MisskeyUsertMeDetailed extends MisskeyUserDetailedNotMe {
    avatarId: string | null;
    bannerId: string | null;
    injectFeaturedNote: boolean | null;
    receiveAnnouncementEmail: boolean | null;
    alwaysMarkNsfw: boolean | null;
    autoSensitive: boolean | null;
    carefulBot: boolean | null;
    autoAcceptFollowed: boolean | null;
    noCrawle: boolean;
    preventAiLearning: boolean;
    isExplorable: boolean;
    isDeleted: boolean;
    twoFactorBackupCodesStock: twoFactorBackupCodesStock;
    hideOnlineStatus: boolean;
    hasUnreadSpecifiedNotes: boolean;
    hasUnreadMentions: boolean;
    hasUnreadAnnouncement: boolean;
    hasUnreadAntenna: boolean;
    hasUnreadNotification: boolean;
    hasPendingReceivedFollowRequest: boolean;
    mutedWords: Array<string>;
    mutedInstances: Array<string> | null;
    mutingNotificationTypes: Array<string> | null;
    emailNotificationTypes: Array<string> | null;
    email: string | null;
    emailVerified: boolean | null;
    securityKeysList: Array<unknown>;
}
