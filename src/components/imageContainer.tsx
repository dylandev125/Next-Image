import Image from "next/image";
import Button from "./button";

interface PropsType {
    source: string;
    handleOpen: () => void;
    handleRequestOpen: () => void;
}

const ImageContainer = ({
    source,
    handleOpen,
    handleRequestOpen,
}: PropsType) => {
    const onImageEdit = () => {
        handleOpen();
    }

    const onRequestEdit = () => {
        handleRequestOpen();
    }
    return (
        <div className="relative">
            <Image alt="" width={600} height={960} src={source}></Image>
            <div className="h-[60px] absolute bottom-0 flex w-full justify-between px-4 pb-4">
                <Button
                    className="bg-lime-800 text-white hover:bg-[white] border hover:border-lime-800 hover:text-black"
                    onClick={onImageEdit}
                >
                    Edit
                </Button>
                <Button
                    className="bg-red-500 text-white hover:bg-[white] border hover:border-red-500 hover:text-black"
                    onClick={onRequestEdit}
                >
                    Request Edit
                </Button>
            </div>
        </div>
    )
}

export default ImageContainer;