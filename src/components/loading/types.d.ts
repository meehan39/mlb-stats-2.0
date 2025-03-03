import type Table from '../table/types';

namespace Loading {
  interface Props {
    isLoading: boolean;
    width: string;
    height?: string;
    text?: Text;
    mdText?: Text;
    children?: React.ReactNode;
    align?: Table.Alignment;
  }
}

export type Text = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export default Loading;
