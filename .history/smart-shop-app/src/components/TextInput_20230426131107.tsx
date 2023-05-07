interface Props {
    placeholderText: string;
}

function TextInput({ placeholderText }: Props) {
    return (
        <>
            <input type="text" placeholder={placeholderText}></input>
        </>
    );
}
