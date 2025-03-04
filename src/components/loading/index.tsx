import type Table from '../table/types';
import type Loading from './types';

const textConfig = {
  sm: 'h-3 my-1',
  md: 'h-5 my-1',
  lg: 'h-4 my-1',
  xl: 'h-4 my-1.5',
  '2xl': 'h-6 my-1',
};

const mdTextConfig = {
  sm: 'md:h-3 md:my-1',
  md: 'md:h-5 md:my-1',
  lg: 'md:h-4 md:my-1',
  xl: 'md:h-4 md:my-1.5',
  '2xl': 'md:h-6 md:my-1',
};

export default function Loading({
  isLoading,
  text,
  mdText,
  height,
  width,
  align,
  children,
}: Loading.Props) {
  const alignments = {
    right: 'justify-end',
    left: 'justify-start',
    center: 'justify-center',
  };
  return isLoading ? (
    <div
      className={`w-full flex justify-start ${(align && alignments[align]) || 'justify-start'}`}>
      <div
        className={`
        animate-pulse
        rounded-full
        bg-slate-300 dark:bg-slate-700
        ${text && textConfig[text]}
        ${mdText && mdTextConfig[mdText]}
        ${!text && height}
        ${width}
      `}
      />
    </div>
  ) : (
    children
  );
}
