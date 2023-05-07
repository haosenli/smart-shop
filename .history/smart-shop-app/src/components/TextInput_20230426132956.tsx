interface Props {
    placeholderText: string;
    textInputId: string;
    onDataRequest: () => void;
}

function TextInput({ placeholderText, textInputId, onDataRequest }: Props) {
    return (
        <input
            type="text"
            id={textInputId}
            placeholder={placeholderText}
        ></input>
    );
}

export default TextInput;
