interface Props {
    buttonText: string;
    idList: string[];
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
