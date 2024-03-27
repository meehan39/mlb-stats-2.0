namespace Table {
    interface Props {
        hideHeader?: boolean;
        headers: Header[];
        rows: Row[];
    }
    interface Header {
        text: string;
        align?: 'left' | 'right' | 'center';
        sort?: boolean;
    }
    interface Row {
        cells: Cell[];
        link?: string;
    }
    type Cell = number | string;
}

export default Table;
