import { useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { id } = useParams();
    return <p>{id}</p>;
};

export default CategoryPage;
