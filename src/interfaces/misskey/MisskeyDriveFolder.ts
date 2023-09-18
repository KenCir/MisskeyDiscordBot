export default interface MisskeyDriveFolder {
    id: string;
    createdAt: string;
    name: string;
    foldersCount: number;
    filesCount: number;
    parentId: string | null;
    parent: MisskeyDriveFolder;
}
