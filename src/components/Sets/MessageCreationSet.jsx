import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DefaultInput from "../Inputs/DefaultInput";
import FilePickmentSet from "./FilePickmentSet";
import { IoIosSend } from "react-icons/io";
import { addFiles, removeAllFiles, selectFilesOrdered, setFileData, setFileError } from "../../store/slices/files";
import DefaultButton from "../Buttons/DefaultButton";
import { useDispatch, useSelector } from "react-redux";
import useMessage from "../../hooks/context/useMessage";
import { readFile } from "../../utils/files/read";


export default function MessageCreationSet() {

    const dispatch = useDispatch();
    const { sendMessage } = useMessage();
    
    const [textMessage, setTextMessage] = useState("");
    const filesSelected = useSelector(selectFilesOrdered);

    const fileIsSendable = useMemo(()=> {
        if(textMessage.length === 0 && filesSelected.length === 0) {
            return false;
        }
        
        else {
            return true;
        }
    }, [textMessage, filesSelected]);

    const textInput_onChange = useCallback((ev) => {
        setTextMessage(ev.target.value);
    }, [])

    const filePickment_onChange = useCallback(ev => {
        const filesReadableArr = [...ev.target.files];
        const filePayloadArr = filesReadableArr.map(file => ({ id: crypto.randomUUID(), name: file.name, type: file.type}));
        dispatch(
            addFiles(filePayloadArr)
        );
        
        filesReadableArr.forEach((fileObj, fileIdx) => {
            const fileId = filePayloadArr[fileIdx].id;
            readFile(fileObj)
            .then(result => {
                dispatch(
                    setFileData({ id: fileId, data: result })
                );
            })
            .catch(error => {
                dispatch(
                    setFileError({ id: fileId, error })
                )
            });
        });

    }, []);

    const sendButton_onClick = useCallback(ev => {
        if(fileIsSendable === false) return;

        const fileContents = filesSelected.map(file => (
            {
                type: file.type,
                content: file.data
            }
        ));

        sendMessage([
            {
                type: "text/plain",
                content: textMessage
            },
            ...fileContents
        ]);

        dispatch( // remove all files
            removeAllFiles()
        );
        setTextMessage("");

    }, [textMessage, filesSelected]);


    return (
        <div className="w-full p-3 flex border-t-2 ">

            <DefaultInput className="p-1 shrink-0 grow" placeholder="write a message...." name="textMessage" value={textMessage} onChange={textInput_onChange} 
                extraElement={
                    <>
                        {/* <div className="h-full aspect-square order-first">
                            <EmojiPickmentSet />
                        </div> */}
                        <FilePickmentSet onChange={filePickment_onChange}/>
                        <DefaultButton onClick={sendButton_onClick} className={"h-full aspect-square p-1 bg-gradient-3 " + (fileIsSendable === false ? "grayscale" : "") }>
                            <IoIosSend className="h-full w-full" fill="#fff"/>
                        </DefaultButton>
                    </>
                }
            />

        </div>
    )
}