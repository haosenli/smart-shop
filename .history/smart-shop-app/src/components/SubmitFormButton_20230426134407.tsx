import React, { MouseEvent } from "React";

interface Props {
    buttonText: string;
    idList: string[];
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function retrieveFormData({ idList }: Props) {
    idList.forEach((elem) => console.log(elem));
}

function SubmitFormButton({ buttonText }: Props) {
    return (
        <button
            type="button"
            className="submit-form-button"
            onClick={retrieveFormData}
        >
            {buttonText}
        </button>
    );
}

export default SubmitFormButton;
