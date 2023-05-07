import TextInput from "../components/TextInput";
import SubmitFormButton from "../components/SubmitFormButton";

function LogIn() {
    const idList: string[] = ["login-username", "login-password"];
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
            <SubmitFormButton label="Log In" idList={} />
        </>
    );
}

export default LogIn;
