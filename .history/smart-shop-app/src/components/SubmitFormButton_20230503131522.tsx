import React, { MouseEvent } from "react";

interface Props {
    label: string;
    idList: string[];
}

function SubmitFormButton({ label, idList }: Props) {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        idList.forEach((elem) => console.log(elem));
    };

    return (
        <button
            type="button"
            className="submit-form-button"
            onClick={handleClick}
        >
            {label}
        </button>
    );
}

export default SubmitFormButton;
