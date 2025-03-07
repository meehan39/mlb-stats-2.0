import Loading from "../loading";
import type Stat from './types';

export default function Stat({ isLoading, label, value }: Stat.Props) {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="text-sm">{label}</div>
      <div className="text-xl">
        <Loading
          isLoading={isLoading}
          text="xl"
          align='center'
          width='w-10'>
            {value}
        </Loading>
      </div>
    </div>
  );
}