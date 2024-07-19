import _ from "lodash";
import { useState } from "react";
import { useCallback } from "react";
import { MdContentCopy } from "react-icons/md";
import { useFloating } from "@floating-ui/react";
import { useMemo } from "react";

export default function CopyButton({ toCopy, onSuccess, onError, className }) {

    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles } = useFloating({
        open: isOpen,
        placement: "top"
    });

    const debouncedSetIsOpen = useMemo( () => (
        _.debounce((isOpen)=> {
            setIsOpen(isOpen);
        }, 3000)
    ), [])

    const onClick = useCallback((ev) => {
        const promise = navigator.clipboard.writeText(toCopy);
        promise.then(()=> {
            setIsOpen(true);
            debouncedSetIsOpen(false);
        });

        if(onSuccess)
            promise.then(onSuccess);
        if(onError)
            promise.then(onError);

    }, [toCopy, onSuccess, onError]);

    return (
        <>
            {
                isOpen &&
                <div
                    ref={refs.setFloating} // Our popover
                    style={floatingStyles} // our popover sstyles
                    className="p-3 rounded-lg font-semibold text-black bg-white">
                        Copied Succcessfully
                </div>
            }

            
            <button 
              ref={refs.setReference}
              className={"h-full w-full " + (className ?? "")} onClick={onClick}>
                <MdContentCopy fill="#aaa"/>
            </button>
        </>
    )
}