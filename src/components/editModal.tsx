import { useState } from 'react';
import Button from "./button";

interface PropsType {
    open: boolean;
    onRequestSave: (editText: string) => void;
}

const EditModal = ({
    open=false,
    onRequestSave
}: PropsType) => {
    const [editText, setEditText] = useState<string>("");
    const [isValid, setValid] = useState<boolean>(true);

    const onHandleRequest = () => {
        if (!editText) {
            setValid(false);
            return;
        }
        onRequestSave(editText);
    }

    return (
    <div className={`${open ? "block" : "hidden"} min-w-[400px] fixed top-[50%] left-[50%] bottom-auto !-translate-x-[50%] !-translate-y-[50%] -mr-[50%] z-50`}>
        <div className="flex flex-col bg-[#e0c5c5] py-10 px-10 rounded-md">
            <div className="mb-4">
                <label>Request Text: </label>
                <input
                    onChange={(e) => {
                        if(e.target.value) setValid(true);
                        setEditText(e.target.value);
                    }}
                    className="h-[36px] pl-1 border border-[#7e80d4] hover:border-[#2b2dbd] transition-all duration-300 rounded-md"/>
                <p className='text-center text-red-600'>{isValid ? "" : "Please fill the Text"}</p>
            </div>

            <Button
                onClick={onHandleRequest}
                className="bg-[#2b2dbd] text-white text-xl font-bold border border-[#2b2dbd] hover:bg-white hover:text-[#2b2dbd]"
            >Save
            </Button>
        </div>

        
    </div>
    )
}

export default EditModal;