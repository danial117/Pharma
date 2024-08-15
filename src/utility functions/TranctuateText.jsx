import { useState } from "react";




export const TruncateText=({ text, maxLength, onClick, className })=> {
    const [isTruncated, setIsTruncated] = useState(true);
     
    if(text == null){
        return <p className={className}></p>
    }

    if (text !== undefined && text.length <= maxLength) {
        return <p className={className}>{text}</p>
    }

    return (
        <p className={className} onClick={onClick}>
            {isTruncated ? `${text !==undefined && text.slice(0, maxLength)}...` : text}
        </p>
    );
}

