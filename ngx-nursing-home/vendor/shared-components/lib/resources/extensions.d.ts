export interface ExtensionIcon {
    extension: string;
    icon: string;
    color?: string;
}
export interface ExtensionType {
    extension: string;
    type: string;
}
export declare const KNOWN_EXTENSIONS: ExtensionIcon[];
export declare const PREVIEWABLE_EXTENSIONS: ExtensionType[];
export declare const UNKNOWN_EXTENSION: ExtensionIcon;
