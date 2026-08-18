import KemetCount from "../elements/count";
import KemetInput from "../elements/input";

export enum EnumKeyCodes {
  ESCAPE = 'Escape',
  ENTER = 'Enter',
  SPACE = 'Space',
  BACKSPACE = 'Backspace',
  DELETE = 'Delete'
}

export const directions = ['none','top', 'right', 'bottom', 'left'] as const;
export enum EnumDirections {
  None = 'none',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left'
}
export type TypeDirection = typeof directions[number];

export const appearances = ['neutral', 'brand', 'success', 'warning', 'error'] as const;
export enum EnumAppearances {
  Neutral = 'neutral',
  Brand = 'brand',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
  Link = 'link'
}
export type TypeAppearance = typeof appearances[number];

export const axis = ['horizontal', 'vertical'] as const;
export enum EnumAxis {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}
export type TypeAxis = typeof axis[number];

export const roundedSizes = ['sm', 'md', 'lg', 'xl', 'circle', 'pill'] as const;
export enum EnumRoundedSizes {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  Circle = 'circle',
  Pill = 'pill'
}
export type TypeRoundedSizes = typeof roundedSizes[number];

export interface InterfaceInputDetails {
  status: TypeAppearance;
  validity: ValidityState;
  element: HTMLElement | KemetCount | KemetInput;
  value?: string;
}
