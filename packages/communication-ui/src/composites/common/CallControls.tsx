// © Microsoft Corporation. All rights reserved.

import { IContextualMenuProps } from '@fluentui/react';
import React, { useCallback } from 'react';
import {
  ControlBar,
  ControlButton,
  videoButtonProps,
  audioButtonProps,
  optionsButtonProps,
  hangupButtonProps
} from '../../components';
import { ControlBarProps, screenShareButtonProps } from '../../components/ControlBar';
import {
  connectFuncsToContext,
  LocalDeviceSettingsContainerProps,
  MapToLocalDeviceSettingsProps
} from '../../consumers';
import { CallControlBarContainerProps, MapToCallControlBarProps } from '../common/consumers/MapToCallControlBarProps';
import { ErrorHandlingProps } from '../../providers';
import { isLocalScreenShareSupportedInBrowser, propagateError } from '../../utils';

const CallOptionsButton = (props: LocalDeviceSettingsContainerProps): JSX.Element => {
  const {
    videoDeviceInfo,
    videoDeviceList,
    audioDeviceInfo,
    audioDeviceList,
    updateLocalVideoStream,
    updateAudioDeviceInfo
  } = props;
  const callOptionsMenu: IContextualMenuProps = {
    items: [
      {
        key: '1',
        name: 'Choose Camera',
        iconProps: { iconName: 'LocationCircle' },
        subMenuProps: {
          items: videoDeviceList.map((item) => ({
            key: item.id,
            text: item.name,
            title: item.name,
            canCheck: true,
            isChecked: videoDeviceInfo?.id === item.id,
            onClick: () => updateLocalVideoStream(item)
          }))
        }
      },
      {
        key: '2',
        name: 'Choose Microphone',
        iconProps: { iconName: 'LocationCircle' },
        subMenuProps: {
          items: audioDeviceList.map((item) => ({
            key: item.id,
            text: item.name,
            title: item.name,
            canCheck: true,
            isChecked: audioDeviceInfo?.id === item.id,
            onClick: () => updateAudioDeviceInfo(item)
          }))
        }
      }
    ]
  };
  return <ControlButton {...optionsButtonProps} menuProps={callOptionsMenu} />;
};

const CallOptionsButtonComponent = connectFuncsToContext(CallOptionsButton, MapToLocalDeviceSettingsProps);

interface HangupButtonProps extends CallControlBarContainerProps, ErrorHandlingProps {
  onEndCallClick(): void;
}

const HangupButton = (props: HangupButtonProps): JSX.Element => {
  const {
    muteMicrophone,
    stopScreenShare,
    localVideoEnabled,
    stopLocalVideo,
    leaveCall,
    onEndCallClick,
    onErrorCallback
  } = props;

  const hangup = useCallback(async (): Promise<void> => {
    await muteMicrophone();
    await stopScreenShare();
    await (localVideoEnabled && stopLocalVideo());
    await leaveCall({ forEveryone: false });
    onEndCallClick();
  }, [muteMicrophone, stopScreenShare, localVideoEnabled, stopLocalVideo, leaveCall, onEndCallClick]);

  return (
    <ControlButton
      {...hangupButtonProps}
      isToggled={false}
      onClick={() => {
        hangup().catch((error) => {
          propagateError(error, onErrorCallback);
        });
      }}
    />
  );
};

export const HangupButtonComponent = connectFuncsToContext(HangupButton, MapToCallControlBarProps);

export interface OutgoingCallControlBarProps extends ControlBarProps, CallControlBarContainerProps {
  /** Callback when call ends */
  onEndCallClick(): void;
}

export const OutgoingCallControlBar = (props: OutgoingCallControlBarProps & ErrorHandlingProps): JSX.Element => {
  const {
    localVideoEnabled,
    onEndCallClick,
    cameraPermission,
    micPermission,
    localVideoBusy,
    toggleLocalVideo,
    toggleMicrophone,
    isMicrophoneActive,
    onErrorCallback
  } = props;
  const cameraDisabled = cameraPermission === 'Denied';
  const micDisabled = micPermission === 'Denied';

  return (
    <ControlBar {...props}>
      <ControlButton
        {...videoButtonProps}
        isToggled={!localVideoEnabled}
        disabled={cameraDisabled || localVideoBusy}
        onClick={() => {
          toggleLocalVideo().catch((error) => {
            propagateError(error, onErrorCallback);
          });
        }}
      />
      <ControlButton
        {...audioButtonProps}
        isToggled={!isMicrophoneActive}
        disabled={micDisabled}
        onClick={() => {
          toggleMicrophone().catch((error) => {
            propagateError(error, onErrorCallback);
          });
        }}
      />
      <CallOptionsButtonComponent />
      <HangupButtonComponent onEndCallClick={onEndCallClick} />
    </ControlBar>
  );
};

export const OutgoingCallControlBarComponent = connectFuncsToContext(OutgoingCallControlBar, MapToCallControlBarProps);

export const IncomingCallControlBar = (
  props: ControlBarProps & CallControlBarContainerProps & ErrorHandlingProps
): JSX.Element => {
  const {
    localVideoEnabled,
    cameraPermission,
    micPermission,
    localVideoBusy,
    toggleLocalVideo,
    toggleMicrophone,
    isMicrophoneActive,
    onErrorCallback
  } = props;
  const cameraDisabled = cameraPermission === 'Denied';
  const micDisabled = micPermission === 'Denied';

  return (
    <ControlBar {...props}>
      <ControlButton
        {...videoButtonProps}
        isToggled={!localVideoEnabled}
        disabled={cameraDisabled || localVideoBusy}
        onClick={() => {
          toggleLocalVideo().catch((error) => {
            propagateError(error, onErrorCallback);
          });
        }}
      />
      <ControlButton
        {...audioButtonProps}
        isToggled={!isMicrophoneActive}
        disabled={micDisabled}
        onClick={() => {
          toggleMicrophone().catch((error) => {
            propagateError(error, onErrorCallback);
          });
        }}
      />
      <CallOptionsButtonComponent />
    </ControlBar>
  );
};

export const IncomingCallControlBarComponent = connectFuncsToContext(IncomingCallControlBar, MapToCallControlBarProps);

export interface CallControlBarProps extends CallControlBarContainerProps {
  /** Callback when call ends */
  onEndCallClick(): void;
}

/**
 * An Azure Calling Services Call Control Bar with built in call handling.
 * @param props CallControlBarProps & ErrorHandlingProps & LocalDeviceSettingsContainerProps
 */
export const CallControlBar = (props: ControlBarProps & CallControlBarProps & ErrorHandlingProps): JSX.Element => {
  const {
    localVideoEnabled,
    onEndCallClick,
    cameraPermission,
    micPermission,
    isRemoteScreenShareActive,
    localVideoBusy,
    toggleLocalVideo,
    toggleMicrophone,
    isMicrophoneActive,
    toggleScreenShare,
    isLocalScreenShareActive,
    onErrorCallback
  } = props;
  const cameraDisabled = cameraPermission === 'Denied';
  const micDisabled = micPermission === 'Denied';
  const screenShareDisabled = isRemoteScreenShareActive;

  return (
    <ControlBar {...props}>
      <ControlButton
        {...videoButtonProps}
        isToggled={!localVideoEnabled}
        disabled={cameraDisabled || localVideoBusy}
        onClick={() => {
          toggleLocalVideo().catch((error) => {
            propagateError(error, onErrorCallback);
          });
        }}
      />
      <ControlButton
        {...audioButtonProps}
        isToggled={!isMicrophoneActive}
        disabled={micDisabled}
        onClick={() => {
          toggleMicrophone().catch((error) => {
            propagateError(error, onErrorCallback);
          });
        }}
      />
      {isLocalScreenShareSupportedInBrowser() && (
        <ControlButton
          {...screenShareButtonProps}
          isToggled={isLocalScreenShareActive}
          disabled={screenShareDisabled}
          onClick={() => {
            toggleScreenShare().catch((error) => {
              propagateError(error, onErrorCallback);
            });
          }}
        />
      )}
      <CallOptionsButtonComponent />
      <HangupButtonComponent onEndCallClick={onEndCallClick} />
    </ControlBar>
  );
};

export const CallControlBarComponent = connectFuncsToContext(CallControlBar, MapToCallControlBarProps);
