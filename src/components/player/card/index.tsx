import Loading from "../../loading";

import type PlayerComponent from "../types";
import type { Text } from "../../loading/types";

  export default function Card({
    label,
    hidable,
    isText,
    isXL,
    fillWidth,
    direction,
    children,
    loading,
  }: PlayerComponent.Card.Props) {
    const loadingText: { text: Text; mdText: Text } | null = isText
      ? { text: 'xl', mdText: '2xl' }
      : null;
    return (
      <div
        className={`
        ${hidable ? 'hidden md:flex' : 'flex'}
        ${fillWidth ? 'md:w-full col-span-full' : 'md:w-auto'}
        ${direction === 'row' ? 'flex-row' : 'flex-col'}
        ${isXL ? 'p-4 md:px-10' : 'p-2 md:px-4'}
        h-20 w-full md:w-auto
        justify-between gap-2 items-center
        rounded-xl whitespace-nowrap
        bg-slate-200 dark:bg-slate-800
        shadow-black/50
        shadow
      `}>
        <span className={`${isXL ? 'text-xl sm:text-2xl' : 'text-sm'}`}>
          {label}
        </span>
        <Loading
          isLoading={Boolean(loading)}
          text={isText ? loadingText?.text : undefined}
          mdText={isText ? loadingText?.mdText : undefined}
          height={!isText ? 'h-10' : undefined}
          align={direction === 'row' ? 'right' : 'center'}
          width='w-14'>
          {isText ? (
            <span
              className={`${isXL ? 'text-2xl sm:text-4xl' : 'text-xl md:text-2xl'}`}>
              {children}
            </span>
          ) : (
            children
          )}
        </Loading>
      </div>
    );
  }