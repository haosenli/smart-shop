import React, { MouseEvent } from "React";

interface Props {
    label: string;
    idList: string[];
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function retrieveFormData(idList: string[]) {
    idList.forEach((elem) => console.log(elem));
}

function SubmitFormButton({ label, onClick, idList }: Props) {
    return (
        <button
            type="button"
            className="submit-form-button"
            onClick={retrieveFormData(idList)}
        >
            {label}
        </button>
    );
}

export default SubmitFormButton;
