import type Table from '../table/types';

export type LoadingType =
  | 'spinner'
  | TextType
  | null;

export type TextType = 
| 'text-sm'
| 'text-md'
| 'text-lg'
| 'text-xl'
| 'text-2xl'

export interface LoadableProps {
  isLoading: boolean;
  type?: LoadingType;
  width: string;
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface LoadableGenericProps {
  height: string;
  width: string;
}

export interface LoadableTextProps {
  type: TextType;
  width: string;
}

export interface LoadableSpinnerProps {
  height: string;
  width: string;
}
