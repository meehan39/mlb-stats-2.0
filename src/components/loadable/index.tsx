import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseball } from '@fortawesome/free-solid-svg-icons';
import type { LoadableGenericProps, LoadableProps, LoadableSpinnerProps, LoadableTextProps } from "./types";

const textConfig = {
  'text-sm': 'h-3 my-1',
  'text-md': 'h-5 my-1',
  'text-lg': 'h-4 my-1',
  'text-xl': 'h-4 my-1.5',
  'text-2xl': 'h-6 my-1',
};

export default function Loadable({
  isLoading,
  type,
  height,
  width,
  className,
  children,
}: LoadableProps) {
  let component = <></>;
  switch (type) {
    case 'spinner':
      component = <Spinner height={height ?? width} width={width} />;
      break;
    case 'text-sm':
    case 'text-md':
    case 'text-lg':
    case 'text-xl':
    case 'text-2xl':
      component = <LoadableText type={type} width={width} />;
      break;
    default:
      component = <LoadableGeneric height={height ?? width} width={width} />;
      break;
  }
  return (
    <div className={className}>
      {isLoading ? (
      <div className={`w-full h-full${type}`}>
        {component}
      </div>
    ) : (
      children
    )}
    </div>
  );
}

export function LoadableGeneric({height, width}: LoadableGenericProps) {
  return (
    <div
    className={`
    animate-pulse
    rounded-full
    bg-slate-300 dark:bg-slate-700
    ${height}
    ${width}
  `}
  />
  )
}


function LoadableText({type, width}: LoadableTextProps) {
  return (
    <div
    className={`
    animate-pulse
    rounded-full
    bg-slate-300 dark:bg-slate-700
    ${textConfig[type]}
    ${width}
  `}
  />
  )
}

function Spinner({height, width}: LoadableSpinnerProps) {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <FontAwesomeIcon icon={faBaseball} className={`animate-spin bg-red-600 ${height} ${width} rounded-full text-white opacity-50`} />
    </div>
  )
}
