import MisskeyNote from '../notes/MisskeyNote';

export default interface MisskeyChannelMessage {
    type: 'channel';
    body: {
        id: string;
        type: 'note';
        body: MisskeyNote;
    };
}
