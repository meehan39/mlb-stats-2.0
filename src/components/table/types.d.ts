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
export interface Cell {
  display: number | string | JSX.Element;
  value: number | string;
}
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
