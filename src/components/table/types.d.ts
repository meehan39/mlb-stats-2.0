namespace Table {
    interface Props {
        hideHeader?: boolean;
        headers: Header[];
        rows: Row[];
    }
    namespace TBody {
        interface Props {
            rows: Row[];
            alignments: Alignment[];
        }
    }
    namespace THead {
        interface Props {
            headers: Header[];
        }
    }
    interface Header {
        text: string;
        align?: Alignment;
        sort?: () => void;
    }
    interface Row {
        cells: Cell[];
        link?: string;
    }
    type Cell = number | string | JSX.Element;
    type Alignment = 'left' | 'right' | 'center';
}

export default Table;
