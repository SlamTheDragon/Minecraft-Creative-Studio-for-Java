import React from 'react';

interface Props {
    htmlContent: string;
    wrapperClass: string
}

const ButtonRaw: React.FC<Props> = ({ htmlContent, wrapperClass }) => {
    return (
        <div className={wrapperClass} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default ButtonRaw;
