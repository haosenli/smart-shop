import React, { MouseEvent } from "react";

interface Props {
    label: string;
    idList: string[];
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function SubmitFormButton({ label, idList, onClick }: Props) {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        idList.forEach((elem) => console.log(elem));
    };

    return (
        <button
            type="button"
            className="submit-form-button"
            onClick={retrieveFormData}
        >
            {label}
        </button>
    );
}

export default SubmitFormButton;
