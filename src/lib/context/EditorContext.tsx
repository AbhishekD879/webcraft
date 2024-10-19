import { createContext, useEffect, useState } from "react";


export const editingContext =  createContext<{
    previewing: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    previewing: false,
    setState: () => {},  // Placeholder function
})



export const EditingContext = ({children}:{
    children:React.ReactNode
})=>{
    useEffect(()=>{
        
    },)
    const [state, setState] = useState(false)
    return (
        <editingContext.Provider value={{
            previewing: state,
            setState
        }}>
            {children}
        </editingContext.Provider>
    )
}
