// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallComposite } from '@azure/communication-react';
import { Stack } from '@fluentui/react';
import { Meta } from '@storybook/react/types-6-0';
import React, { useMemo } from 'react';
import { v1 as createGUID } from 'uuid';
import { COMPOSITE_FOLDER_PREFIX, compositeExperienceContainerStyle } from '../constants';
import { defaultCallCompositeHiddenControls, controlsToAdd } from '../controlsUtils';
import { compositeLocale } from '../localizationUtils';
import { getDocs } from './CallCompositeDocs';
import { CustomDataModelExampleContainer } from './snippets/CustomDataModelExampleContainer.snippet';
import { ConfigHintBanner } from './snippets/Utils';

const CustomDataModelStory = (args, context): JSX.Element => {
  const {
    globals: { locale }
  } = context;

  const containerProps = useMemo(() => {
    if (args.userId && args.token) {
      const containerProps = {
        userId: args.userId,
        token: args.token,
        locator: createGUID()
      };
      return containerProps;
    }
    return undefined;
  }, [args.userId && args.token]);

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={compositeExperienceContainerStyle}>
      {containerProps ? (
        <CustomDataModelExampleContainer
          fluentTheme={context.theme}
          displayName={args.displayName}
          avatarInitials={args.avatarInitials}
          {...containerProps}
          callInvitationURL={args.callInvitationURL}
          locale={compositeLocale(locale)}
          options={{ mobileView: args.mobileView }}
        />
      ) : (
        <ConfigHintBanner />
      )}
    </Stack>
  );
};

export const CustomDataModelExample = CustomDataModelStory.bind({});

export default {
  id: `${COMPOSITE_FOLDER_PREFIX}-call-customdatamodelexample`,
  title: `${COMPOSITE_FOLDER_PREFIX}/CallComposite/Custom Data Model Example`,
  component: CallComposite,
  argTypes: {
    userId: controlsToAdd.userId,
    token: controlsToAdd.token,
    displayName: controlsToAdd.displayName,
    avatarInitials: controlsToAdd.avatarInitials,
    mobileView: controlsToAdd.mobileView,
    callInvitationURL: controlsToAdd.callInvitationURL,
    // Hiding auto-generated controls
    ...defaultCallCompositeHiddenControls
  },
  parameters: {
    docs: {
      page: () => getDocs()
    }
  }
} as Meta;
