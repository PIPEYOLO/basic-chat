import { arrow, autoPlacement, autoUpdate, flip, FloatingPortal, offset, shift, useFloating, useHover, useInteractions, useRole } from "@floating-ui/react"
import { useMemo, useState } from "react"



export default function Tooltip({reference, toolTipContent}) {

    const [open, setOpen] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [
            // autoPlacement({""}), 
            offset(0), // n px away from reference elem
            flip(), // adjust the elem position if its away from screen
            shift()// sets the padding of the screen where the element must not be
        ],
        placement: "right",
        whileElementsMounted: autoUpdate, // updates the tooltip position
    });


    // Actions and role
    const hover = useHover(context, {
        delay: 50, // delay till open
        restMs: 100, // delay till close
        
    });

    const role = useRole(context, {
        role: "tooltip",
    });

    const { getFloatingProps, getItemProps, getReferenceProps} = // we get the props of the tooltip
    useInteractions([ // we merge the actions asd roles here
        hover, role
    ])

    

    return (
        <>  
            <div 
                ref={refs.setReference} // set this as reference
                {...getReferenceProps()} // apply the reference props
            
            >
                {reference}
            </div>
            

            {
                open ? 
                <div 
                    className="z-50"
                    ref={refs.setFloating} // set this as the floating
                    style={floatingStyles} // aply the floating styles forthe tooltip
                    {...getFloatingProps()} // and the floating props

                >
                    {toolTipContent}
                </div>
                : ""
            }





        </>
    )
}