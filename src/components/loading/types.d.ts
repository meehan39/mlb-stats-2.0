namespace Loading {
  interface Props {
    isLoading: boolean;
    width: string;
    height?: string;
    text?: Text;
    mdText?: Text;
    children?: React.ReactNode;
  }
}

export type Text =  
  |"sm"
  |"md"
  |"lg"
  |"xl"
  |"2xl"

export default Loading;