interface Props {
    buttonText: string;
    idList: string[];
    onClick: () => void;
}

function retrieveFormData({ idList }: Props) {
    idList.forEach((elem) => console.log(elem));
}

function SubmitFormButton({ buttonText, onClick }: Props) {
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
