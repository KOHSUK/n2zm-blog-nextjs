import React from 'react';
import { IconProps } from '../type';
import Icon from './github.svg';

export const GitHubIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'currentColor',
}) => {
  return <Icon width={width} height={height} color={color} />;
};
