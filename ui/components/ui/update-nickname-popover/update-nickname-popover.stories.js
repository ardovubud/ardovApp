import { useArgs } from '@storybook/client-api';
import React from 'react';
import Button from '../button';
import README from './README.mdx';
import UpdateNicknamePopover from '.';

export default {
  title: 'Components/UI/UpdateNicknamePopover',
  parameters: { docs: { page: README } },
  argTypes: {
    address: { control: 'text' },
    showPopover: { control: 'boolean' },
    onAdd: { action: 'onAdd' },
    onClose: { action: 'onClose' },
  },
  args: {
    address: '0xdeDbcA0156308960E3bBa2f5a273E72179940788',
    showPopover:false,
  }
};

const Template = (args) => {
  const [{ showPopover }, updateArgs] = useArgs();
  const togglePopover = () => updateArgs({ showPopover : !showPopover });
  
  return (
    <div style={{ width:'600px' }}>
      <Button onClick={togglePopover}>{args.buttonText}</Button>
      {showPopover && (
        <UpdateNicknamePopover {...args} onClose={togglePopover} />
      )}
    </div>
  );
};

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  buttonText:'Open Update Nickname Popover',
  nickname:"user_nickname",
  memo:"This is a memo",
};
DefaultStory.storyName = "UpdateNickname";

export const AddNickname = Template.bind({});
AddNickname.args = {
   buttonText:'Open Add Nickname Popover'
};
