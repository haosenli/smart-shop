import TextInput from "../components/TextInput";
import SubmitFormButton from "../components/SubmitFormButton";

function LogIn() {
    const name = "Aho";
    return (
        <>
            <h1>Hello World {name}</h1>
            <TextInput placeholderText="Username" />
        </>
    );
}

export default LogIn;
