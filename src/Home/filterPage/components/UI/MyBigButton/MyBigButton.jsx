import React from 'react';
import cl from "./MyBigButton.module.css"
import {useNavigate} from "react-router-dom";

const MyBigButton = ({ onSelectCategory, handleFilterPageClose, categoryId, children, ...props }) => {
    const navigate = useNavigate();



    return (
        <a href={`/page2/${categoryId}`} >
        <button {...props} className={cl.myBtn}>
            {children}
        </button>
        </a>
    );
};
export default MyBigButton
