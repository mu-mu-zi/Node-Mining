import Box, { Typography } from 'components/BaseElement'
import Flex from 'components/BaseElement/Flex'
import { Icon } from 'components/BaseElement/Icon'
import { MsgStatus } from 'components/messageBox/MessageBox';
import React, { ReactNode } from 'react'
import { Notice } from 'utils/tools';
import { EmptyStr } from '../../utils/global';
import useTheme from '../../hooks/useTheme';


interface Iprops {
  icon?: string, 
  children: ReactNode | undefined
}

export default function CopyTypography(props:Iprops) {
  const { theme } = useTheme()
  const copy = () => {
    const text = `${props.children}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '0.1rem';
      textarea.value = text;
      textarea.select();
      document.execCommand('copy', true);
      document.body.removeChild(textarea);
    }
    Notice("Replication success.",MsgStatus.success)
  }

  return (props.children ? <Flex
    alignItems={'center'}
  >
    <Typography marginRight={'8px'}>{props.children}</Typography>
    <Icon 
      style={{
        width: theme.isH5 ? '12px' : '' ,
        height: theme.isH5 ? '12px' : '',
      }}
      cursor={'pointer'} onClick={copy} src={ props.icon || require('assets/images/icon_copy.png')} />
  </Flex> : <Typography>{EmptyStr}</Typography>)

}