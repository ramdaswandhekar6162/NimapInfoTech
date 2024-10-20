import { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import axios from 'axios';
import { GET_CATEGORIES } from '../constants/api';

const CategoriesHome = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [categoriesDataLoading, setCategoriesDataLoading] = useState(false);

    useEffect(() => {
        setCategoriesDataLoading(true);
        axios
            .get(GET_CATEGORIES)
            .then((response) => {
                console.log(response.data);

                setCategoriesData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setCategoriesDataLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-wrap justify-evenly gap-8">
            {categoriesDataLoading ? (
                <p>Loading</p>
            ) : (
                categoriesData?.map((categoryData, index) => {
                    return (
                        <CategoryCard key={index} categoryData={categoryData} />
                    );
                })
            )}
        </div>
    );
};

export default CategoriesHome;
