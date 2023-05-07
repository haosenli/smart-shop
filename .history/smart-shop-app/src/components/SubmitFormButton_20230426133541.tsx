interface Props {
    buttonText: string;
    idList: string[];
    onClick: () => void;
}

function SubmitFormButton({ buttonText, idList, onClick }) {
    return (
        <button type="button" className="submit-form-button">
            {buttonText}
        </button>
    );
}

export default SubmitFormButton;
