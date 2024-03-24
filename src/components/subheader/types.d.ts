namespace Subheader {
    interface Props {
        text: string;
        showBack?: boolean;
    }
    namespace Icon {
        interface Props {
            path: string;
            children: JSX.Element;
        }
    }
}

export default Subheader;
