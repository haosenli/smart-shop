import React, { MouseEvent } from "React";

interface Props {
    label: string;
    idList: string[];
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function retrieveFormData({ idList }: Props) {
    idList.forEach((elem) => console.log(elem));
}

function SubmitFormButton({ label }: Props) {
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
