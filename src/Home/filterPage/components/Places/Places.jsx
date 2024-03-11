import React, { useEffect, useState } from 'react';
import cl from './Places.module.css';
import MySelectedButton from '../UI/MySelectedButton/MySelectedButton.jsx';
import { useFetch } from '../../../../components/hooks/useFetchB.js';
import axios from 'axios';
import MyLine from "../UI/MyLine/MyLine.jsx";
import SubPlaces from "../SubPlaces/SubPlaces.jsx";

const Places = ({ activeCategory }) => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [data, setData] = useState({});
    const [fetching, isDataLoading, dataError] = useFetch(async () => {
        const response = await axios.get(
            `https://places-test-api.danya.tech/api/categories/${activeCategory}?populate=sub-sub-categories,image,subcategories,subcategories.image,subsubcategories.image`
        );
        setData(response.data || {});
        return response;
    });

    console.log(data)
    useEffect(() => {
        fetching();
    }, [activeCategory]);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

    const handleButtonClick = (subcategory,index) => {
        setSelectedButton(index);
        setSelectedSubcategoryId(subcategory?.id);

    };

    return (
        <>
        <div className={cl.button__select}>
            <div className={cl.button__select__row}>
                {Array.isArray(data?.data?.attributes?.subcategories?.data) &&
                    data?.data?.attributes?.subcategories?.data.map((subcategory, index) => (
                        <MySelectedButton
                            isRed={selectedButton === index}
                            onClick={() => handleButtonClick(subcategory,index)}
                            key={index + 1}
                        >
                            <img
                                className={cl.button__image}
                                src={`https://places-test-api.danya.tech${subcategory?.attributes?.image?.data?.attributes?.url}`}
                                alt={`Изображение ${index}`}
                            />
                            {subcategory?.attributes?.title}
                        </MySelectedButton>
                    ))}
            </div>
        </div>
            <MyLine/>
            <SubPlaces classname={cl.sintol} activeCategory={activeCategory} subcategoryId={selectedSubcategoryId} />
        </>

    );
};

export default Places;
