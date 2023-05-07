interface Props {
    placeholderText: string;
    onDataRequest: () => void;
}

function TextInput({ placeholderText, onDataRequest }: Props) {
    return <input type="text" placeholder={placeholderText}></input>;
}

export default TextInput;
