namespace Subheader {
    interface Props {
      text: string | null;
    }
    namespace Icon {
        interface Props {
            path: string;
            children: JSX.Element;
        }
    }
}

export default Subheader;
