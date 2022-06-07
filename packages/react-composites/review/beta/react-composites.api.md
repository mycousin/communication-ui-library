## API Report File for "@internal/react-composites"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="react" />

import { AudioDeviceInfo } from '@azure/communication-calling';
import { Call } from '@azure/communication-calling';
import { CallAgent } from '@azure/communication-calling';
import { CallState } from '@internal/calling-stateful-client';
import type { ChatMessage } from '@azure/communication-chat';
import type { ChatParticipant } from '@azure/communication-chat';
import { ChatThreadClient } from '@azure/communication-chat';
import { ChatThreadClientState } from '@internal/chat-stateful-client';
import { CommunicationIdentifierKind } from '@azure/communication-common';
import { CommunicationParticipant } from '@internal/react-components';
import { CommunicationTokenCredential } from '@azure/communication-common';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import type { CommunicationUserKind } from '@azure/communication-common';
import { ComponentLocale } from '@internal/react-components';
import { ControlBarButtonProps } from '@internal/react-components';
import { CreateVideoStreamViewResult } from '@internal/react-components';
import { DeviceManagerState } from '@internal/calling-stateful-client';
import { FileDownloadHandler } from '@internal/react-components';
import { FileMetadata } from '@internal/react-components';
import { GroupCallLocator } from '@azure/communication-calling';
import type { MediaDiagnosticChangedEventArgs } from '@azure/communication-calling';
import { MessageProps } from '@internal/react-components';
import { MessageRenderer } from '@internal/react-components';
import type { NetworkDiagnosticChangedEventArgs } from '@azure/communication-calling';
import { PartialTheme } from '@fluentui/react';
import { ParticipantMenuItemsCallback } from '@internal/react-components';
import { PermissionConstraints } from '@azure/communication-calling';
import { PersonaInitialsColor } from '@fluentui/react';
import type { RemoteParticipant } from '@azure/communication-calling';
import { SendMessageOptions } from '@azure/communication-chat';
import { StatefulCallClient } from '@internal/calling-stateful-client';
import { StatefulChatClient } from '@internal/chat-stateful-client';
import { TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { Theme } from '@fluentui/react';
import { VideoDeviceInfo } from '@azure/communication-calling';
import { VideoStreamOptions } from '@internal/react-components';

// @public
export interface AdapterError extends Error {
    innerError: Error;
    target: string;
    timestamp: Date;
}

// @public
export type AdapterErrors = {
    [target: string]: AdapterError;
};

// @public
export interface AdapterState<TState> {
    getState(): TState;
    offStateChange(handler: (state: TState) => void): void;
    onStateChange(handler: (state: TState) => void): void;
}

// @public
export type AvatarPersonaData = {
    text?: string;
    imageUrl?: string;
    imageInitials?: string;
    initialsColor?: PersonaInitialsColor | string;
    initialsTextColor?: string;
};

// @public
export type AvatarPersonaDataCallback = (userId: string) => Promise<AvatarPersonaData>;

// @public
export type AzureCommunicationCallAdapterArgs = {
    userId: CommunicationUserIdentifier;
    displayName: string;
    credential: CommunicationTokenCredential;
    locator: CallAdapterLocator;
};

// @public
export type AzureCommunicationCallWithChatAdapterArgs = {
    endpoint: string;
    userId: CommunicationUserIdentifier;
    displayName: string;
    credential: CommunicationTokenCredential;
    locator: CallAndChatLocator | TeamsMeetingLinkLocator;
};

// @public
export type AzureCommunicationCallWithChatAdapterFromClientArgs = {
    callLocator: CallAdapterLocator | TeamsMeetingLinkLocator;
    callAgent: CallAgent;
    callClient: StatefulCallClient;
    chatClient: StatefulChatClient;
    chatThreadClient: ChatThreadClient;
};

// @public
export type AzureCommunicationChatAdapterArgs = {
    endpoint: string;
    userId: CommunicationUserIdentifier;
    displayName: string;
    credential: CommunicationTokenCredential;
    threadId: string;
};

// @public
export interface BaseCompositeProps<TIcons extends Record<string, JSX.Element>> {
    fluentTheme?: PartialTheme | Theme;
    icons?: TIcons;
    locale?: CompositeLocale;
    onFetchAvatarPersonaData?: AvatarPersonaDataCallback;
    onFetchParticipantMenuItems?: ParticipantMenuItemsCallback;
    rtl?: boolean;
}

// @public
export interface CallAdapter extends AdapterState<CallAdapterState>, Disposable, CallAdapterCallManagement, CallAdapterDeviceManagement, CallAdapterSubscribers {
}

// @public
export interface CallAdapterCallManagement {
    createStreamView(remoteUserId?: string, options?: VideoStreamOptions): Promise<void | CreateVideoStreamViewResult>;
    disposeStreamView(remoteUserId?: string, options?: VideoStreamOptions): Promise<void>;
    joinCall(microphoneOn?: boolean): Call | undefined;
    leaveCall(forEveryone?: boolean): Promise<void>;
    mute(): Promise<void>;
    removeParticipant(userId: string): Promise<void>;
    startCall(participants: string[]): Call | undefined;
    startCamera(options?: VideoStreamOptions): Promise<void>;
    startScreenShare(): Promise<void>;
    stopCamera(): Promise<void>;
    stopScreenShare(): Promise<void>;
    unmute(): Promise<void>;
}

// @public
export type CallAdapterClientState = {
    userId: CommunicationIdentifierKind;
    displayName?: string;
    call?: CallState;
    devices: DeviceManagerState;
    endedCall?: CallState;
    isTeamsCall: boolean;
    latestErrors: AdapterErrors;
};

// @public
export interface CallAdapterDeviceManagement {
    askDevicePermission(constrain: PermissionConstraints): Promise<void>;
    queryCameras(): Promise<VideoDeviceInfo[]>;
    queryMicrophones(): Promise<AudioDeviceInfo[]>;
    querySpeakers(): Promise<AudioDeviceInfo[]>;
    setCamera(sourceInfo: VideoDeviceInfo, options?: VideoStreamOptions): Promise<void>;
    setMicrophone(sourceInfo: AudioDeviceInfo): Promise<void>;
    setSpeaker(sourceInfo: AudioDeviceInfo): Promise<void>;
}

// @public
export type CallAdapterLocator = TeamsMeetingLinkLocator | GroupCallLocator | /* @conditional-compile-remove(teams-adhoc-call) */ CallParticipantsLocator;

// @public
export type CallAdapterState = CallAdapterUiState & CallAdapterClientState;

// @public
export interface CallAdapterSubscribers {
    off(event: 'participantsJoined', listener: ParticipantsJoinedListener): void;
    off(event: 'participantsLeft', listener: ParticipantsLeftListener): void;
    off(event: 'isMutedChanged', listener: IsMutedChangedListener): void;
    off(event: 'callIdChanged', listener: CallIdChangedListener): void;
    off(event: 'isLocalScreenSharingActiveChanged', listener: IsLocalScreenSharingActiveChangedListener): void;
    off(event: 'displayNameChanged', listener: DisplayNameChangedListener): void;
    off(event: 'isSpeakingChanged', listener: IsSpeakingChangedListener): void;
    off(event: 'callEnded', listener: CallEndedListener): void;
    off(event: 'diagnosticChanged', listener: DiagnosticChangedEventListner): void;
    off(event: 'error', listener: (e: AdapterError) => void): void;
    on(event: 'participantsJoined', listener: ParticipantsJoinedListener): void;
    on(event: 'participantsLeft', listener: ParticipantsLeftListener): void;
    on(event: 'isMutedChanged', listener: IsMutedChangedListener): void;
    on(event: 'callIdChanged', listener: CallIdChangedListener): void;
    on(event: 'isLocalScreenSharingActiveChanged', listener: IsLocalScreenSharingActiveChangedListener): void;
    on(event: 'displayNameChanged', listener: DisplayNameChangedListener): void;
    on(event: 'isSpeakingChanged', listener: IsSpeakingChangedListener): void;
    on(event: 'callEnded', listener: CallEndedListener): void;
    on(event: 'diagnosticChanged', listener: DiagnosticChangedEventListner): void;
    on(event: 'error', listener: (e: AdapterError) => void): void;
}

// @public
export type CallAdapterUiState = {
    isLocalPreviewMicrophoneEnabled: boolean;
    page: CallCompositePage;
};

// @public
export interface CallAndChatLocator {
    callLocator: GroupCallLocator | /* @conditional-compile-remove(teams-adhoc-call) */ CallParticipantsLocator;
    chatThreadId: string;
}

// @public
export const CallComposite: (props: CallCompositeProps) => JSX.Element;

// @public
export type CallCompositeIcons = {
    ControlButtonCameraOff?: JSX.Element;
    ControlButtonCameraOn?: JSX.Element;
    ControlButtonEndCall?: JSX.Element;
    ControlButtonMicOff?: JSX.Element;
    ControlButtonMicOn?: JSX.Element;
    ControlButtonOptions?: JSX.Element;
    ControlButtonParticipants?: JSX.Element;
    ControlButtonScreenShareStart?: JSX.Element;
    ControlButtonScreenShareStop?: JSX.Element;
    ErrorBarCallCameraAccessDenied?: JSX.Element;
    ErrorBarCallCameraAlreadyInUse?: JSX.Element;
    ErrorBarCallLocalVideoFreeze?: JSX.Element;
    ErrorBarCallMacOsCameraAccessDenied?: JSX.Element;
    ErrorBarCallMacOsMicrophoneAccessDenied?: JSX.Element;
    ErrorBarCallMicrophoneAccessDenied?: JSX.Element;
    ErrorBarCallMicrophoneMutedBySystem?: JSX.Element;
    ErrorBarCallNetworkQualityLow?: JSX.Element;
    ErrorBarCallNoMicrophoneFound?: JSX.Element;
    ErrorBarCallNoSpeakerFound?: JSX.Element;
    HorizontalGalleryLeftButton?: JSX.Element;
    HorizontalGalleryRightButton?: JSX.Element;
    LobbyScreenConnectingToCall?: JSX.Element;
    LobbyScreenWaitingToBeAdmitted?: JSX.Element;
    LocalDeviceSettingsCamera?: JSX.Element;
    LocalDeviceSettingsMic?: JSX.Element;
    LocalDeviceSettingsSpeaker?: JSX.Element;
    LocalPreviewPlaceholder?: JSX.Element;
    Muted?: JSX.Element;
    NetworkReconnectIcon?: JSX.Element;
    NoticePageAccessDeniedTeamsMeeting?: JSX.Element;
    NoticePageJoinCallFailedDueToNoNetwork?: JSX.Element;
    NoticePageLeftCall?: JSX.Element;
    NoticePageRemovedFromCall?: JSX.Element;
    OptionsCamera?: JSX.Element;
    OptionsMic?: JSX.Element;
    OptionsSpeaker?: JSX.Element;
    ParticipantItemMicOff?: JSX.Element;
    ParticipantItemOptions?: JSX.Element;
    ParticipantItemOptionsHovered?: JSX.Element;
    ParticipantItemScreenShareStart?: JSX.Element;
    VideoTileMicOff?: JSX.Element;
    LocalCameraSwitch?: JSX.Element;
};

// @public
export type CallCompositeOptions = {
    errorBar?: boolean;
    callControls?: boolean | CallControlOptions;
};

// @public
export type CallCompositePage = 'accessDeniedTeamsMeeting' | 'call' | 'configuration' | 'joinCallFailedDueToNoNetwork' | 'leftCall' | 'lobby' | 'removedFromCall';

// @public
export interface CallCompositeProps extends BaseCompositeProps<CallCompositeIcons> {
    adapter: CallAdapter;
    callInvitationUrl?: string;
    formFactor?: 'desktop' | 'mobile';
    options?: CallCompositeOptions;
}

// @public
export interface CallCompositeStrings {
    cameraLabel: string;
    cameraPermissionDenied: string;
    cameraTurnedOff: string;
    close: string;
    complianceBannerNowOnlyRecording: string;
    complianceBannerNowOnlyTranscription: string;
    complianceBannerRecordingAndTranscriptionSaved: string;
    complianceBannerRecordingAndTranscriptionStarted: string;
    complianceBannerRecordingAndTranscriptionStopped: string;
    complianceBannerRecordingSaving: string;
    complianceBannerRecordingStarted: string;
    complianceBannerRecordingStopped: string;
    complianceBannerTranscriptionConsent: string;
    complianceBannerTranscriptionSaving: string;
    complianceBannerTranscriptionStarted: string;
    complianceBannerTranscriptionStopped: string;
    configurationPageCallDetails?: string;
    configurationPageTitle: string;
    defaultPlaceHolder: string;
    failedToJoinCallDueToNoNetworkMoreDetails?: string;
    failedToJoinCallDueToNoNetworkTitle: string;
    failedToJoinTeamsMeetingReasonAccessDeniedMoreDetails?: string;
    failedToJoinTeamsMeetingReasonAccessDeniedTitle: string;
    learnMore: string;
    leftCallMoreDetails?: string;
    leftCallTitle: string;
    lobbyScreenConnectingToCallMoreDetails?: string;
    lobbyScreenConnectingToCallTitle: string;
    lobbyScreenWaitingToBeAdmittedMoreDetails?: string;
    lobbyScreenWaitingToBeAdmittedTitle: string;
    microphonePermissionDenied: string;
    microphoneToggleInLobbyNotAllowed: string;
    mutedMessage: string;
    networkReconnectMoreDetails: string;
    networkReconnectTitle: string;
    privacyPolicy: string;
    rejoinCallButtonLabel: string;
    removedFromCallMoreDetails?: string;
    removedFromCallTitle: string;
    soundLabel: string;
    startCallButtonLabel: string;
}

// @public
export type CallControlDisplayType = 'default' | 'compact';

// @public
export type CallControlOptions = {
    displayType?: CallControlDisplayType;
    cameraButton?: boolean;
    endCallButton?: boolean;
    microphoneButton?: boolean;
    devicesButton?: boolean;
    participantsButton?: boolean | {
        disabled: boolean;
    };
    screenShareButton?: boolean | {
        disabled: boolean;
    };
    onFetchCustomButtonProps?: CustomCallControlButtonCallback[];
};

// @public
export type CallEndedListener = (event: {
    callId: string;
}) => void;

// @public
export type CallIdChangedListener = (event: {
    callId: string;
}) => void;

// @beta
export type CallParticipantsLocator = {
    participantIDs: string[];
};

// @public
export interface CallWithChatAdapter extends CallWithChatAdapterManagement, AdapterState<CallWithChatAdapterState>, Disposable, CallWithChatAdapterSubscriptions {
}

// @public
export interface CallWithChatAdapterManagement {
    askDevicePermission(constrain: PermissionConstraints): Promise<void>;
    // @beta (undocumented)
    cancelFileUpload: (id: string) => void;
    // @beta (undocumented)
    clearFileUploads: () => void;
    createStreamView(remoteUserId?: string, options?: VideoStreamOptions): Promise<void | CreateVideoStreamViewResult>;
    deleteMessage(messageId: string): Promise<void>;
    disposeStreamView(remoteUserId?: string, options?: VideoStreamOptions): Promise<void>;
    fetchInitialData(): Promise<void>;
    joinCall(microphoneOn?: boolean): Call | undefined;
    leaveCall(forEveryone?: boolean): Promise<void>;
    loadPreviousChatMessages(messagesToLoad: number): Promise<boolean>;
    mute(): Promise<void>;
    queryCameras(): Promise<VideoDeviceInfo[]>;
    queryMicrophones(): Promise<AudioDeviceInfo[]>;
    querySpeakers(): Promise<AudioDeviceInfo[]>;
    // @beta (undocumented)
    registerActiveFileUploads: (files: File[]) => FileUploadManager[];
    // @beta (undocumented)
    registerCompletedFileUploads: (metadata: FileMetadata[]) => FileUploadManager[];
    removeParticipant(userId: string): Promise<void>;
    sendMessage(content: string, options?: SendMessageOptions): Promise<void>;
    sendReadReceipt(chatMessageId: string): Promise<void>;
    sendTypingIndicator(): Promise<void>;
    setCamera(sourceInfo: VideoDeviceInfo, options?: VideoStreamOptions): Promise<void>;
    setMicrophone(sourceInfo: AudioDeviceInfo): Promise<void>;
    setSpeaker(sourceInfo: AudioDeviceInfo): Promise<void>;
    startCall(participants: string[]): Call | undefined;
    startCamera(options?: VideoStreamOptions): Promise<void>;
    startScreenShare(): Promise<void>;
    stopCamera(): Promise<void>;
    stopScreenShare(): Promise<void>;
    unmute(): Promise<void>;
    // @beta (undocumented)
    updateFileUploadErrorMessage: (id: string, errorMessage: string) => void;
    // @beta (undocumented)
    updateFileUploadMetadata: (id: string, metadata: FileMetadata) => void;
    // @beta (undocumented)
    updateFileUploadProgress: (id: string, progress: number) => void;
    updateMessage(messageId: string, content: string, metadata?: Record<string, string>): Promise<void>;
}

// @public
export interface CallWithChatAdapterState extends CallWithChatAdapterUiState, CallWithChatClientState {
}

// @public
export interface CallWithChatAdapterSubscriptions {
    // (undocumented)
    off(event: 'callEnded', listener: CallEndedListener): void;
    // (undocumented)
    off(event: 'isMutedChanged', listener: IsMutedChangedListener): void;
    // (undocumented)
    off(event: 'callIdChanged', listener: CallIdChangedListener): void;
    // (undocumented)
    off(event: 'isLocalScreenSharingActiveChanged', listener: IsLocalScreenSharingActiveChangedListener): void;
    // (undocumented)
    off(event: 'displayNameChanged', listener: DisplayNameChangedListener): void;
    // (undocumented)
    off(event: 'isSpeakingChanged', listener: IsSpeakingChangedListener): void;
    // (undocumented)
    off(event: 'callParticipantsJoined', listener: ParticipantsJoinedListener): void;
    // (undocumented)
    off(event: 'callParticipantsLeft', listener: ParticipantsLeftListener): void;
    // (undocumented)
    off(event: 'callError', listener: (e: AdapterError) => void): void;
    // (undocumented)
    off(event: 'messageReceived', listener: MessageReceivedListener): void;
    // (undocumented)
    off(event: 'messageSent', listener: MessageSentListener): void;
    // (undocumented)
    off(event: 'messageRead', listener: MessageReadListener): void;
    // (undocumented)
    off(event: 'chatParticipantsAdded', listener: ParticipantsAddedListener): void;
    // (undocumented)
    off(event: 'chatParticipantsRemoved', listener: ParticipantsRemovedListener): void;
    // (undocumented)
    off(event: 'chatError', listener: (e: AdapterError) => void): void;
    // (undocumented)
    on(event: 'callEnded', listener: CallEndedListener): void;
    // (undocumented)
    on(event: 'isMutedChanged', listener: IsMutedChangedListener): void;
    // (undocumented)
    on(event: 'callIdChanged', listener: CallIdChangedListener): void;
    // (undocumented)
    on(event: 'isLocalScreenSharingActiveChanged', listener: IsLocalScreenSharingActiveChangedListener): void;
    // (undocumented)
    on(event: 'displayNameChanged', listener: DisplayNameChangedListener): void;
    // (undocumented)
    on(event: 'isSpeakingChanged', listener: IsSpeakingChangedListener): void;
    // (undocumented)
    on(event: 'callParticipantsJoined', listener: ParticipantsJoinedListener): void;
    // (undocumented)
    on(event: 'callParticipantsLeft', listener: ParticipantsLeftListener): void;
    // (undocumented)
    on(event: 'callError', listener: (e: AdapterError) => void): void;
    // (undocumented)
    on(event: 'messageReceived', listener: MessageReceivedListener): void;
    // (undocumented)
    on(event: 'messageSent', listener: MessageSentListener): void;
    // (undocumented)
    on(event: 'messageRead', listener: MessageReadListener): void;
    // (undocumented)
    on(event: 'chatParticipantsAdded', listener: ParticipantsAddedListener): void;
    // (undocumented)
    on(event: 'chatParticipantsRemoved', listener: ParticipantsRemovedListener): void;
    // (undocumented)
    on(event: 'chatError', listener: (e: AdapterError) => void): void;
}

// @public
export interface CallWithChatAdapterUiState {
    // @beta
    fileUploads?: FileUploadsUiState;
    isLocalPreviewMicrophoneEnabled: boolean;
    page: CallCompositePage;
}

// @public
export interface CallWithChatClientState {
    call?: CallState;
    chat?: ChatThreadClientState;
    devices: DeviceManagerState;
    displayName: string | undefined;
    isTeamsCall: boolean;
    latestCallErrors: AdapterErrors;
    latestChatErrors: AdapterErrors;
    userId: CommunicationIdentifierKind;
}

// @public
export const CallWithChatComposite: (props: CallWithChatCompositeProps) => JSX.Element;

// @public
export type CallWithChatCompositeIcons = {
    ChevronLeft?: JSX.Element;
    ControlBarChatButtonActive?: JSX.Element;
    ControlBarChatButtonInactive?: JSX.Element;
    ControlBarPeopleButton?: JSX.Element;
    Link?: JSX.Element;
    MoreDrawerMicrophones?: JSX.Element;
    MoreDrawerPeople?: JSX.Element;
    MoreDrawerSelectedMicrophone?: JSX.Element;
    MoreDrawerSelectedSpeaker?: JSX.Element;
    MoreDrawerSpeakers?: JSX.Element;
    ControlButtonCameraOff?: JSX.Element;
    ControlButtonCameraOn?: JSX.Element;
    ControlButtonEndCall?: JSX.Element;
    ControlButtonMicOff?: JSX.Element;
    ControlButtonMicOn?: JSX.Element;
    ControlButtonOptions?: JSX.Element;
    ControlButtonScreenShareStart?: JSX.Element;
    ControlButtonScreenShareStop?: JSX.Element;
    ErrorBarCallCameraAccessDenied?: JSX.Element;
    ErrorBarCallCameraAlreadyInUse?: JSX.Element;
    ErrorBarCallLocalVideoFreeze?: JSX.Element;
    ErrorBarCallMacOsCameraAccessDenied?: JSX.Element;
    ErrorBarCallMacOsMicrophoneAccessDenied?: JSX.Element;
    ErrorBarCallMicrophoneAccessDenied?: JSX.Element;
    ErrorBarCallMicrophoneMutedBySystem?: JSX.Element;
    ErrorBarCallNetworkQualityLow?: JSX.Element;
    ErrorBarCallNoMicrophoneFound?: JSX.Element;
    ErrorBarCallNoSpeakerFound?: JSX.Element;
    HorizontalGalleryLeftButton?: JSX.Element;
    HorizontalGalleryRightButton?: JSX.Element;
    LobbyScreenConnectingToCall?: JSX.Element;
    LobbyScreenWaitingToBeAdmitted?: JSX.Element;
    LocalDeviceSettingsCamera?: JSX.Element;
    LocalDeviceSettingsMic?: JSX.Element;
    LocalDeviceSettingsSpeaker?: JSX.Element;
    LocalPreviewPlaceholder?: JSX.Element;
    Muted?: JSX.Element;
    NetworkReconnectIcon?: JSX.Element;
    NoticePageAccessDeniedTeamsMeeting?: JSX.Element;
    NoticePageJoinCallFailedDueToNoNetwork?: JSX.Element;
    NoticePageLeftCall?: JSX.Element;
    NoticePageRemovedFromCall?: JSX.Element;
    OptionsCamera?: JSX.Element;
    OptionsMic?: JSX.Element;
    OptionsSpeaker?: JSX.Element;
    ParticipantItemMicOff?: JSX.Element;
    ParticipantItemScreenShareStart?: JSX.Element;
    VideoTileMicOff?: JSX.Element;
    LocalCameraSwitch?: JSX.Element;
    EditBoxCancel?: JSX.Element;
    EditBoxSubmit?: JSX.Element;
    MessageDelivered?: JSX.Element;
    MessageEdit?: JSX.Element;
    MessageFailed?: JSX.Element;
    MessageRemove?: JSX.Element;
    MessageSeen?: JSX.Element;
    MessageSending?: JSX.Element;
    SendBoxSend?: JSX.Element;
    SendBoxSendHovered?: JSX.Element;
    SendBoxAttachFile?: JSX.Element;
    ParticipantItemOptions?: JSX.Element;
    ParticipantItemOptionsHovered?: JSX.Element;
};

// @public
export type CallWithChatCompositeOptions = {
    callControls?: boolean | CallWithChatControlOptions;
    fileSharing?: FileSharingOptions;
};

// @public
export interface CallWithChatCompositeProps extends BaseCompositeProps<CallWithChatCompositeIcons> {
    // (undocumented)
    adapter: CallWithChatAdapter;
    fluentTheme?: PartialTheme | Theme;
    formFactor?: 'desktop' | 'mobile';
    joinInvitationURL?: string;
    options?: CallWithChatCompositeOptions;
}

// @public
export interface CallWithChatCompositeStrings {
    chatButtonLabel: string;
    chatButtonNewMessageNotificationLabel: string;
    chatButtonTooltipClose: string;
    chatButtonTooltipClosedWithMessageCount: string;
    chatButtonTooltipOpen: string;
    chatPaneTitle: string;
    copyInviteLinkButtonLabel: string;
    dismissSidePaneButton: string;
    moreDrawerAudioDeviceMenuTitle: string;
    moreDrawerButtonLabel: string;
    moreDrawerButtonTooltip: string;
    moreDrawerMicrophoneMenuTitle: string;
    moreDrawerSpeakerMenuTitle: string;
    peopleButtonLabel: string;
    peopleButtonTooltipClose: string;
    peopleButtonTooltipOpen: string;
    peoplePaneSubTitle: string;
    peoplePaneTitle: string;
    pictureInPictureTileAriaLabel: string;
    removeMenuLabel: string;
    returnToCallButtonAriaDescription: string;
    returnToCallButtonAriaLabel: string;
}

// @public
export interface CallWithChatControlOptions {
    cameraButton?: boolean;
    chatButton?: boolean;
    displayType?: CallControlDisplayType;
    endCallButton?: boolean;
    microphoneButton?: boolean;
    peopleButton?: boolean;
    screenShareButton?: boolean | {
        disabled: boolean;
    };
}

// @public
export type CallWithChatEvent = 'callError' | 'chatError' | 'callEnded' | 'isMutedChanged' | 'callIdChanged' | 'isLocalScreenSharingActiveChanged' | 'displayNameChanged' | 'isSpeakingChanged' | 'callParticipantsJoined' | 'callParticipantsLeft' | 'messageReceived' | 'messageSent' | 'messageRead' | 'chatParticipantsAdded' | 'chatParticipantsRemoved';

// @public
export type ChatAdapter = ChatAdapterThreadManagement & AdapterState<ChatAdapterState> & Disposable & ChatAdapterSubscribers & FileUploadAdapter;

// @public
export type ChatAdapterState = ChatAdapterUiState & ChatCompositeClientState;

// @public
export interface ChatAdapterSubscribers {
    off(event: 'messageReceived', listener: MessageReceivedListener): void;
    off(event: 'messageSent', listener: MessageSentListener): void;
    off(event: 'messageRead', listener: MessageReadListener): void;
    off(event: 'participantsAdded', listener: ParticipantsAddedListener): void;
    off(event: 'participantsRemoved', listener: ParticipantsRemovedListener): void;
    off(event: 'topicChanged', listener: TopicChangedListener): void;
    off(event: 'error', listener: (e: AdapterError) => void): void;
    on(event: 'messageReceived', listener: MessageReceivedListener): void;
    on(event: 'messageSent', listener: MessageSentListener): void;
    on(event: 'messageRead', listener: MessageReadListener): void;
    on(event: 'participantsAdded', listener: ParticipantsAddedListener): void;
    on(event: 'participantsRemoved', listener: ParticipantsRemovedListener): void;
    on(event: 'topicChanged', listener: TopicChangedListener): void;
    on(event: 'error', listener: (e: AdapterError) => void): void;
}

// @public
export interface ChatAdapterThreadManagement {
    deleteMessage(messageId: string): Promise<void>;
    fetchInitialData(): Promise<void>;
    loadPreviousChatMessages(messagesToLoad: number): Promise<boolean>;
    removeParticipant(userId: string): Promise<void>;
    sendMessage(content: string, options?: SendMessageOptions): Promise<void>;
    sendReadReceipt(chatMessageId: string): Promise<void>;
    sendTypingIndicator(): Promise<void>;
    setTopic(topicName: string): Promise<void>;
    updateMessage(messageId: string, content: string, metadata?: Record<string, string>, options?: {
        attachedFilesMetadata?: FileMetadata[];
    }): Promise<void>;
}

// @public
export type ChatAdapterUiState = {
    error?: Error;
    fileUploads?: FileUploadsUiState;
};

// @public
export const ChatComposite: (props: ChatCompositeProps) => JSX.Element;

// @public
export type ChatCompositeClientState = {
    userId: CommunicationIdentifierKind;
    displayName: string;
    thread: ChatThreadClientState;
    latestErrors: AdapterErrors;
};

// @public
export type ChatCompositeIcons = {
    EditBoxCancel?: JSX.Element;
    EditBoxSubmit?: JSX.Element;
    MessageDelivered?: JSX.Element;
    MessageEdit?: JSX.Element;
    MessageFailed?: JSX.Element;
    MessageRemove?: JSX.Element;
    MessageSeen?: JSX.Element;
    MessageSending?: JSX.Element;
    ParticipantItemOptions?: JSX.Element;
    ParticipantItemOptionsHovered?: JSX.Element;
    SendBoxSend?: JSX.Element;
    SendBoxSendHovered?: JSX.Element;
    SendBoxAttachFile?: JSX.Element;
};

// @public
export type ChatCompositeOptions = {
    errorBar?: boolean;
    participantPane?: boolean;
    topic?: boolean;
    autoFocus?: 'sendBoxTextField';
    fileSharing?: FileSharingOptions;
};

// @public
export interface ChatCompositeProps extends BaseCompositeProps<ChatCompositeIcons> {
    adapter: ChatAdapter;
    formFactor?: 'desktop' | 'mobile';
    onRenderMessage?: (messageProps: MessageProps, defaultOnRender?: MessageRenderer) => JSX.Element;
    onRenderTypingIndicator?: (typingUsers: CommunicationParticipant[]) => JSX.Element;
    options?: ChatCompositeOptions;
}

// @public
export interface ChatCompositeStrings {
    chatListHeader: string;
}

// @public
export const COMPOSITE_LOCALE_DE_DE: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_EN_GB: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_EN_US: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_ES_ES: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_FR_FR: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_IT_IT: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_JA_JP: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_KO_KR: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_NL_NL: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_PT_BR: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_RU_RU: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_TR_TR: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_ZH_CN: CompositeLocale;

// @public
export const COMPOSITE_LOCALE_ZH_TW: CompositeLocale;

// @public
export const COMPOSITE_ONLY_ICONS: CompositeIcons;

// @public
export type CompositeIcons = ChatCompositeIcons & CallCompositeIcons & CallWithChatCompositeIcons;

// @public
export interface CompositeLocale {
    component: ComponentLocale;
    strings: CompositeStrings;
}

// @public
export interface CompositeStrings {
    call: CallCompositeStrings;
    callWithChat: CallWithChatCompositeStrings;
    chat: ChatCompositeStrings;
}

// @public
export const createAzureCommunicationCallAdapter: ({ userId, displayName, credential, locator }: AzureCommunicationCallAdapterArgs) => Promise<CallAdapter>;

// @public
export const createAzureCommunicationCallAdapterFromClient: (callClient: StatefulCallClient, callAgent: CallAgent, locator: CallAdapterLocator) => Promise<CallAdapter>;

// @public
export const createAzureCommunicationCallWithChatAdapter: ({ userId, displayName, credential, endpoint, locator }: AzureCommunicationCallWithChatAdapterArgs) => Promise<CallWithChatAdapter>;

// @public
export const createAzureCommunicationCallWithChatAdapterFromClients: ({ callClient, callAgent, callLocator, chatClient, chatThreadClient }: AzureCommunicationCallWithChatAdapterFromClientArgs) => Promise<CallWithChatAdapter>;

// @public
export const createAzureCommunicationChatAdapter: ({ endpoint: endpointUrl, userId, displayName, credential, threadId }: AzureCommunicationChatAdapterArgs) => Promise<ChatAdapter>;

// @public
export const createAzureCommunicationChatAdapterFromClient: (chatClient: StatefulChatClient, chatThreadClient: ChatThreadClient) => Promise<ChatAdapter>;

// @beta
export type CustomCallControlButtonCallback = (args: CustomCallControlButtonCallbackArgs) => CustomCallControlButtonProps;

// @beta
export interface CustomCallControlButtonCallbackArgs {
    displayType?: CallControlDisplayType;
}

// @beta
export type CustomCallControlButtonPlacement = 'first' | 'last' | 'afterCameraButton' | 'afterEndCallButton' | 'afterMicrophoneButton' | 'afterDevicesButton' | 'afterParticipantsButton' | 'afterScreenShareButton';

// @beta
export interface CustomCallControlButtonProps extends ControlBarButtonProps {
    placement: CustomCallControlButtonPlacement;
}

// @public
export const DEFAULT_COMPOSITE_ICONS: {
    EditBoxCancel: JSX.Element;
    EditBoxSubmit: JSX.Element;
    MessageDelivered: JSX.Element;
    MessageEdit: JSX.Element;
    MessageFailed: JSX.Element;
    MessageRemove: JSX.Element;
    MessageSeen: JSX.Element;
    MessageSending: JSX.Element;
    ParticipantItemOptions: JSX.Element;
    ParticipantItemOptionsHovered: JSX.Element;
    SendBoxSend: JSX.Element;
    SendBoxSendHovered: JSX.Element;
    SendBoxAttachFile?: JSX.Element | undefined;
    ControlButtonCameraOff: JSX.Element;
    ControlButtonCameraOn: JSX.Element;
    ControlButtonEndCall: JSX.Element;
    ControlButtonMicOff: JSX.Element;
    ControlButtonMicOn: JSX.Element;
    ControlButtonOptions: JSX.Element;
    ControlButtonParticipants: JSX.Element;
    ControlButtonScreenShareStart: JSX.Element;
    ControlButtonScreenShareStop: JSX.Element;
    ErrorBarCallCameraAccessDenied: JSX.Element;
    ErrorBarCallCameraAlreadyInUse: JSX.Element;
    ErrorBarCallLocalVideoFreeze: JSX.Element;
    ErrorBarCallMacOsCameraAccessDenied: JSX.Element;
    ErrorBarCallMacOsMicrophoneAccessDenied: JSX.Element;
    ErrorBarCallMicrophoneAccessDenied: JSX.Element;
    ErrorBarCallMicrophoneMutedBySystem: JSX.Element;
    ErrorBarCallNetworkQualityLow: JSX.Element;
    ErrorBarCallNoMicrophoneFound: JSX.Element;
    ErrorBarCallNoSpeakerFound: JSX.Element;
    HorizontalGalleryLeftButton: JSX.Element;
    HorizontalGalleryRightButton: JSX.Element;
    LobbyScreenConnectingToCall?: JSX.Element | undefined;
    LobbyScreenWaitingToBeAdmitted?: JSX.Element | undefined;
    LocalDeviceSettingsCamera?: JSX.Element | undefined;
    LocalDeviceSettingsMic?: JSX.Element | undefined;
    LocalDeviceSettingsSpeaker?: JSX.Element | undefined;
    LocalPreviewPlaceholder?: JSX.Element | undefined;
    Muted?: JSX.Element | undefined;
    NetworkReconnectIcon?: JSX.Element | undefined;
    NoticePageAccessDeniedTeamsMeeting?: JSX.Element | undefined;
    NoticePageJoinCallFailedDueToNoNetwork?: JSX.Element | undefined;
    NoticePageLeftCall?: JSX.Element | undefined;
    NoticePageRemovedFromCall?: JSX.Element | undefined;
    OptionsCamera: JSX.Element;
    OptionsMic: JSX.Element;
    OptionsSpeaker: JSX.Element;
    ParticipantItemMicOff: JSX.Element;
    ParticipantItemScreenShareStart: JSX.Element;
    VideoTileMicOff: JSX.Element;
    LocalCameraSwitch?: JSX.Element | undefined;
    ChevronLeft?: JSX.Element | undefined;
    ControlBarChatButtonActive?: JSX.Element | undefined;
    ControlBarChatButtonInactive?: JSX.Element | undefined;
    ControlBarPeopleButton?: JSX.Element | undefined;
    Link?: JSX.Element | undefined;
    MoreDrawerMicrophones?: JSX.Element | undefined;
    MoreDrawerPeople?: JSX.Element | undefined;
    MoreDrawerSelectedMicrophone?: JSX.Element | undefined;
    MoreDrawerSelectedSpeaker?: JSX.Element | undefined;
    MoreDrawerSpeakers?: JSX.Element | undefined;
    ChatMessageOptions: JSX.Element;
    CancelFileUpload: JSX.Element;
    DownloadFile: JSX.Element;
    MessageResend: JSX.Element;
};

// @public
export type DiagnosticChangedEventListner = (event: MediaDiagnosticChangedEvent | NetworkDiagnosticChangedEvent) => void;

// @public
export type DisplayNameChangedListener = (event: {
    participantId: CommunicationIdentifierKind;
    displayName: string;
}) => void;

// @public
export interface Disposable {
    dispose(): void;
}

// @beta
export interface FileSharingOptions {
    accept?: string;
    downloadHandler?: FileDownloadHandler;
    multiple?: boolean;
    uploadHandler: FileUploadHandler;
}

// @beta (undocumented)
export interface FileUploadAdapter {
    // (undocumented)
    cancelFileUpload: (id: string) => void;
    // (undocumented)
    clearFileUploads: () => void;
    // (undocumented)
    registerActiveFileUploads: (files: File[]) => FileUploadManager[];
    // (undocumented)
    registerCompletedFileUploads: (metadata: FileMetadata[]) => FileUploadManager[];
    // (undocumented)
    updateFileUploadErrorMessage: (id: string, errorMessage: string) => void;
    // (undocumented)
    updateFileUploadMetadata: (id: string, metadata: FileMetadata) => void;
    // (undocumented)
    updateFileUploadProgress: (id: string, progress: number) => void;
}

// @beta
export type FileUploadError = {
    message: string;
    timestamp: number;
};

// @beta
export type FileUploadHandler = (userId: string, fileUploads: FileUploadManager[]) => void;

// @beta
export interface FileUploadManager {
    file?: File;
    id: string;
    notifyUploadCompleted: (metadata: FileMetadata) => void;
    notifyUploadFailed: (message: string) => void;
    notifyUploadProgressChanged: (value: number) => void;
}

// @beta
export interface FileUploadState {
    error?: FileUploadError;
    filename: string;
    id: string;
    metadata?: FileMetadata;
    progress: number;
}

// @beta
export type FileUploadsUiState = Record<string, FileUploadState>;

// @public
export type IsLocalScreenSharingActiveChangedListener = (event: {
    isScreenSharingOn: boolean;
}) => void;

// @public
export type IsMutedChangedListener = (event: {
    identifier: CommunicationIdentifierKind;
    isMuted: boolean;
}) => void;

// @public
export type IsSpeakingChangedListener = (event: {
    identifier: CommunicationIdentifierKind;
    isSpeaking: boolean;
}) => void;

// @public
export type MediaDiagnosticChangedEvent = MediaDiagnosticChangedEventArgs & {
    type: 'media';
};

// @public
export type MessageReadListener = (event: {
    message: ChatMessage;
    readBy: CommunicationUserKind;
}) => void;

// @public
export type MessageReceivedListener = (event: {
    message: ChatMessage;
}) => void;

// @public
export type MessageSentListener = MessageReceivedListener;

// @public
export type NetworkDiagnosticChangedEvent = NetworkDiagnosticChangedEventArgs & {
    type: 'network';
};

// @public
export type ParticipantsAddedListener = (event: {
    participantsAdded: ChatParticipant[];
    addedBy: ChatParticipant;
}) => void;

// @public
export type ParticipantsJoinedListener = (event: {
    joined: RemoteParticipant[];
}) => void;

// @public
export type ParticipantsLeftListener = (event: {
    removed: RemoteParticipant[];
}) => void;

// @public
export type ParticipantsRemovedListener = (event: {
    participantsRemoved: ChatParticipant[];
    removedBy: ChatParticipant;
}) => void;

// @public
export type TopicChangedListener = (event: {
    topic: string;
}) => void;

// @public
export const useAzureCommunicationCallAdapter: (args: Partial<AzureCommunicationCallAdapterArgs>, afterCreate?: ((adapter: CallAdapter) => Promise<CallAdapter>) | undefined, beforeDispose?: ((adapter: CallAdapter) => Promise<void>) | undefined) => CallAdapter | undefined;

// @public
export const useAzureCommunicationCallWithChatAdapter: (args: Partial<AzureCommunicationCallWithChatAdapterArgs>, afterCreate?: ((adapter: CallWithChatAdapter) => Promise<CallWithChatAdapter>) | undefined, beforeDispose?: ((adapter: CallWithChatAdapter) => Promise<void>) | undefined) => CallWithChatAdapter | undefined;

// @public
export const useAzureCommunicationChatAdapter: (args: Partial<AzureCommunicationChatAdapterArgs>, afterCreate?: ((adapter: ChatAdapter) => Promise<ChatAdapter>) | undefined, beforeDispose?: ((adapter: ChatAdapter) => Promise<void>) | undefined) => ChatAdapter | undefined;

// @internal
export const _useCompositeLocale: () => CompositeLocale;

// (No @packageDocumentation comment for this package)

```