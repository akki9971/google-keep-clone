import React, {useState, useEffect} from 'react'

export const useWidthHook = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handler(){
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handler )

        return () => {
            window.removeEventListener("resize", handler)
        }
    }, [])
    
    return width
}
