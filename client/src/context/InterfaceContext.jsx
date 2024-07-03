import { createContext, useState, useEffect } from "react";

export const InterfaceContext = createContext();


const InterfaceProvider = ({ children }) => {
    const [sidebarOption, setSidebarOption] = useState("board");
    const [LogOutModalContext, setLogOutModal] = useState(false);
    const [taskCreateModal,setTaskCreateModal] = useState(false);
    return (
        <InterfaceContext.Provider value={{ sidebarOption, setSidebarOption, LogOutModalContext, setLogOutModal, taskCreateModal, setTaskCreateModal }}>
            {children}
        </InterfaceContext.Provider>
    )
}

export default InterfaceProvider;