import type Table from '../table/types';

namespace Stat {
  interface Props {
    isLoading: boolean;
    label: string;
    value: string;
  }
}

export type Text = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export default Loading;
