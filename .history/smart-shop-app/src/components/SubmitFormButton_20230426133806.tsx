interface Props {
    buttonText: string;
    idList: string[];
    onClick: () => void;
}

function retrieveFormData({ idList }: Props) {
    idList.forEach();
}

function SubmitFormButton({ buttonText, idList, onClick }: Props) {
    return (
        <button type="button" className="submit-form-button">
            {buttonText}
        </button>
    );
}

export default SubmitFormButton;
