import {
  CallParticipant,
  FluentThemeProvider,
  ParticipantsButton,
  ParticipantListProps,
  ParticipantsButtonStylesProps
} from '@azure/communication-react';
import React from 'react';

const mockParticipants: CallParticipant[] = [
  {
    userId: 'user1',
    displayName: 'You',
    state: 'Connected',
    isMuted: true,
    isScreenSharing: false
  },
  {
    userId: 'user2',
    displayName: 'Hal Jordan',
    state: 'Connected',
    isMuted: true,
    isScreenSharing: true
  },
  {
    userId: 'user3',
    displayName: 'Barry Allen',
    state: 'Idle',
    isMuted: false,
    isScreenSharing: false
  },
  {
    userId: 'user4',
    displayName: 'Bruce Wayne',
    state: 'Connecting',
    isMuted: true,
    isScreenSharing: false
  }
];

const mockParticipantsProps: ParticipantListProps = {
  participants: mockParticipants,
  myUserId: 'user1',
  excludeMe: true
};

const mockCallLink = 'URL to invite new participants to the current call (https://...)';

const onMuteAll = () => {
  // your implementation to mute all participants
};

const mockStyles: ParticipantsButtonStylesProps = {
  root: { background: 'blue', color: 'white' },
  rootHovered: { background: 'crimson', color: 'white' },
  rootExpanded: { background: 'dimgrey', color: 'white' },
  label: { color: 'white', fontStyle: 'italic' },
  participantListContainerStyle: { border: 'solid 1px red' }
};

export const ParticipantsButtonWithCustomStylesExample: () => JSX.Element = () => {
  return (
    <FluentThemeProvider>
      <ParticipantsButton
        showLabel={true}
        participantListProps={mockParticipantsProps}
        callInvitationURL={mockCallLink}
        onMuteAll={onMuteAll}
        styles={mockStyles}
      />
    </FluentThemeProvider>
  );
};