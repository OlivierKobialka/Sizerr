import { TbArrowBigUpLines } from "react-icons/tb";

export default function ScrollTop() {
    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={handleScroll}
            className="bg-primary rounded-full text-white p-2 fixed bottom-3 right-3"
        >
            <TbArrowBigUpLines />
        </button>
    );
}
