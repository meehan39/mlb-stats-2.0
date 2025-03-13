export interface TabProps {
  tabs: SingleTabProps[];
  defaultTab?: number;
}

export interface SingleTabProps {
  name: string;
  onClick: () => void;
}