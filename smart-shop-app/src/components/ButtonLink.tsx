interface Props {
    buttonText: string;
    backgroundColor: string;
    textColor: string;
    textSize?: string;
    padding?: string;
    navigateTo: () => void;
}

function ButtonLink({
    buttonText,
    backgroundColor,
    textColor,
    textSize,
    padding,
    navigateTo,
}: Props) {
    textSize ? textSize : "1.3rem";
    padding ? padding : "0.5rem";
    return (
        <button
            type="button"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                width: "100%",
                padding: padding,
                borderRadius: "5rem",
                fontSize: textSize,
                fontWeight: "500",
                border: "none",
            }}
            onClick={navigateTo}
        >
            {buttonText}
        </button>
    );
}

export default ButtonLink;
