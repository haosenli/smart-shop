import TextInput from "../components/TextInput";
import SubmitFormButton from "../components/SubmitFormButton";

function LogIn() {
    return (
        <>
            <h1>Log In</h1>
            <TextInput
                placeholderText="Username"
                textInputId="login-username"
            />
            <TextInput
                placeholderText="Password"
                textInputId="login-password"
            />
        </>
    );
}

export default LogIn;
