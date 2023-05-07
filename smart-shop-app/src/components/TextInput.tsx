interface Props {
    placeholderText: string;
    textInputId: string;
}

function TextInput({ placeholderText, textInputId }: Props) {
    return (
        <input
            type="text"
            id={textInputId}
            placeholder={placeholderText}
        ></input>
    );
}

export default TextInput;
