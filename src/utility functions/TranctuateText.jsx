import { useState } from "react";




export function TruncateText({ text, maxLength, onClick, className }) {
    const [isTruncated, setIsTruncated] = useState(true);

    if(text == null){
        return <p className={className}></p>;

    }

    if (text !== undefined && text.length <= maxLength) {
        return <p className={className}>{text}</p>;
    }

    return (
        <p className={className} onClick={onClick ? onClick : null}>
            {isTruncated ? `${text !==undefined && text.slice(0, maxLength)}...` : text}
        </p>
    );
}

