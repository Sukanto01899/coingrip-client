import { useDisclosure } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";

export const ToastContext = createContext();

export const ToastContextProvider = ({children})=> {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [toastDetails, setToastDetails] = useState({ text: '', status: null});
    let timeOutID;

    const viewToast = (text, status)=>{
        clearTimeout()
        setToastDetails({text: text, status: status});
        toggle();
    }

    useEffect(()=>{
        if(opened){
            timeOutID = setTimeout(toggle, 2000)
        }
    }, [opened])

    const value ={
        viewToast: viewToast,
        opened: opened,
        close: close,
        text: toastDetails.text,
        status: toastDetails.status
    }

    return <ToastContext.Provider value={value}>
        {children}
    </ToastContext.Provider>
}