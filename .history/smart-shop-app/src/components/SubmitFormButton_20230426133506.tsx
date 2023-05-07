interface Props {
    idList: string[];
    onClick: () => void;
}

function SubmitFormButton({ idList, onClick }) {
    return <button type="button" className="submit-form-button"></button>;
}

export default SubmitFormButton;
