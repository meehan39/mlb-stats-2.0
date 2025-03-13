export interface Header {
  text?: string;
  align?: Alignment;
  className?: string;
  loadingWidth?: string;
}
export interface Row {
  cells: Cell[];
  link?: string;
}
export type Cell = number | string | JSX.Element;
export type Alignment = 'left' | 'right' | 'center';

export interface TableProps {
  headers: Header[];
  rows: Row[];
  loadingRows: number;
  defaultSortIndex?: number;
}

export interface TableHeaderProps {
  headers: Header[];
}

export interface TableBodyProps {
  rows: Row[];
  loadingRows: number;
  headers: Header[];
}
