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
        <div className="relative border-2 group overflow-hidden">
            <Image alt="" width={600} height={0} src={source}></Image>
            <div className="h-full absolute -bottom-[calc(100%)] group-hover:bottom-0 flex w-full justify-between items-end px-4 pb-4 bg-gradient-to-t from-black via-[#00000044] to-[#00000000] transition-all">
                <Button
                    className="bg-lime-800 text-white hover:bg-[white] border hover:border-lime-800 hover:text-black h-14"
                    onClick={onImageEdit}
                >
                    Edit
                </Button>
                <Button
                    className="bg-red-500 text-white hover:bg-[white] border hover:border-red-500 hover:text-black h-14"
                    onClick={onRequestEdit}
                >
                    Request Edit
                </Button>
            </div>
        </div>
    )
}

export default ImageContainer;