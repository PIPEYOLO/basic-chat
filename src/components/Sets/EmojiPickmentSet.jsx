import { useCallback, useState } from "react"
import EmojiPicker from "emoji-picker-react";
export default function EmojiPickmentSet({referenceElem, onEmojiClick}) {
    const [open, setOpen] = useState(false);

    const button_onClick = useCallback(ev => {
        setOpen(!open)
    }, []);

    return (
        <>
            <button 
              className="h-full w-full"
              onClick={button_onClick}
            >☺</button>
            <EmojiPicker
              open={open}
              onEmojiClick={onEmojiClick}
              lazyLoadEmojis={true}
            />
        </>
    )
}