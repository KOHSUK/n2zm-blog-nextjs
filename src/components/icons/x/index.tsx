import React from 'react';
import { IconProps } from '../type';
import Icon from './x.svg';

export const XIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'currentColor',
}) => {
  return <Icon width={width} height={height} color={color} />;
};

export default XIcon;
