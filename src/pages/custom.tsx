import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { toast } from "react-toastify";
import ImageContainer from "@/components/imageContainer";
import ImageEditor from "@/components/imageEditor";
import EditModal from "@/components/editModal";

const CustomPage = () => {
    const [imageEdit, setImageEdit] = useState<string>("");
    const [originRequest, setOriginRequest] = useState<string>("");
    const [editText, setEditText] = useState<string>("");
    const [imageList, setImageList] = useState<string[]>([]);
    const [originalList, setOriginalList] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [openRequest, setOpenRequest] = useState<boolean>(false);
    const imgUrl: any = trpc.getImageSource.useQuery();
    const data: any = trpc.saveRequest.useQuery({ text: editText, url: originRequest } as any);

    useEffect(() => {
        imgUrl?.data?.imgSource.map((item: any, key: number) => {
            setImageList(prev => [...prev, item.urls.regular])
            setOriginalList(prev => [...prev, item.urls.regular])
        });
    },[imgUrl?.data?.imgSource])

    const onChangeImage = (source:string, url: string) => {
        const index = imageList.indexOf(source)
        let temp:string[] = imageList;
        temp[index] = url;
        setImageList(temp);
    }

    const onRequestSave = (editText: string) => {
        setEditText(editText);
        toast('Your edit requested', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    }

    return (
        <div className="min-h-[100vh]">
            <div
                className={`${open || openRequest ? "block" : "hidden"} fixed top-0 left-0 z-50 h-full w-full bg-[#000529]/50`}
                onClick={() => {
                    setOpen(false);
                    setOpenRequest(false);
                }}
            ></div>

            <ImageEditor
                open={open}
                handleClose={() => setOpen(false)}
                source={imageEdit}
                onChangeImage={(source, url) => onChangeImage(source, url)}
            />

            <EditModal
                open={openRequest}
                onRequestSave={(editText: string) => onRequestSave(editText)}
                onRequestClose={() => setOpenRequest(false)}
            />

            <div className="flex items-end flex-wrap">
            {imageList.map((item: any, key: number) => 
                <ImageContainer
                    key={key}
                    source={item}
                    handleOpen={() => {setOpen(true), setImageEdit(item)}}
                    handleRequestOpen={() => {setOpenRequest(true), setOriginRequest(originalList[key])}}
                />
            )}
            </div>
        </div>
    )
}

export default CustomPage;