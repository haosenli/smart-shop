interface Props {
    src: string;
    size?: string;
    onClick: () => void;
}

function NavIcon({ src, size, onClick }: Props) {
    size ? size : "2rem";
    return (
        <img
            src={src}
            style={{
                height: size,
                width: size,
                objectFit: "cover",
            }}
            onClick={onClick}
        />
    );
}

export default NavIcon;
