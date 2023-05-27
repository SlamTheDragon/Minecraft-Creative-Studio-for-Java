interface Props {
    htmlContent: string;
    wrapperClass?: string
}

export default function ButtonRaw({ htmlContent, wrapperClass }: Props) {
    return (
        <div className={wrapperClass} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};
