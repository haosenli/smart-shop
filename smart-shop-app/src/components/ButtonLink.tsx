interface Props {
    buttonText: string;
    backgroundColor: string;
    textColor: string;
    navigateTo: () => void;
}

function ButtonLink({
    buttonText,
    backgroundColor,
    textColor,
    navigateTo,
}: Props) {
    return (
        <button
            type="button"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                width: "100%",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "1.3rem",
                fontWeight: "500",
            }}
            onClick={navigateTo}
        >
            {buttonText}
        </button>
    );
}

export default ButtonLink;
