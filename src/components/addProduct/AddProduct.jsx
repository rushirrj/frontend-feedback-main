import { useContext, useEffect, useState } from 'react'
import styles from './AddProduct.module.css'
import { UserContext } from '../../App'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addProduct, editProduct } from '../../actions/api';
import { useNavigate } from 'react-router-dom';
export default
    function AddProduct(props) {


    const [productDetails, setProductDetails] = useState({
        name: '',
        category: '',
        logoUrl: '',
        productLink: '',
        productDescription: ''
    })
    const { setShowModal, productToEdit, setUpdateAvailable, setFilterUpdateAvailable } = useContext(UserContext);

    const navigate = useNavigate();


    useEffect(() => {
        if (props.edit) {
            const categoryItems = productToEdit.tags.join(', ');

            setProductDetails({
                name: productToEdit.name,
                category: categoryItems,
                logoUrl: productToEdit.logo,
                productLink: productToEdit.logo,
                productDescription: productToEdit.description
            })
        }
    }, [])
    const handleChange = (e) => {
        setProductDetails((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async () => {
        const { name, category, logoUrl, productDescription, productLink } = productDetails;
        if (!name || !category || !logoUrl || !productDescription || !productLink) {
            toast.error('All fields required', { autoclose: 3000 });

        }
        else {
            let result = '';
            if (props.edit) {
                result = await editProduct(productDetails, productToEdit.id);
            }
            else {
                result = await addProduct(productDetails);
            }

            if (result.success) {
                toast.success(result.message, { autoclose: 3000 });
                setShowModal(false);
                navigate('/');
                setUpdateAvailable(true);
                setFilterUpdateAvailable(true);

            }
            else {
                toast.error(result.message, { autoclose: 3000 });

            }
        }


    }
    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <div className={styles.main}>
            <span className={styles.text1}>
                {props.edit ? 'Edit your product' : 'Add your product '}
            </span>
            <input value={productDetails.name} type="text" placeholder='Name of the company' name='name' className={styles.input1} onChange={handleChange} />
            <input value={productDetails.category} type="text" placeholder='Category' name='category' className={styles.input1} onChange={handleChange} />
            <input value={productDetails.logoUrl} type="text" placeholder='Add logo url' name='logoUrl' className={styles.input1} onChange={handleChange} />
            <input value={productDetails.productLink} type="text" placeholder='Link of product' name='productLink' className={styles.input1} onChange={handleChange} />
            <input value={productDetails.productDescription} type="text" placeholder='Description of product' name='productDescription' className={styles.input1} onChange={handleChange} />
            <div className={styles.box1}>
                <span className={styles.button1} onClick={handleCancel}>Cancel</span>
                <span className={styles.button1} onClick={handleSubmit}>{props.edit ? 'Edit' : '+Add'}</span>
            </div>
        </div>
    )
}
