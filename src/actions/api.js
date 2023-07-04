import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:8000"
    baseURL: "https://feedback-backend-new.vercel.app/"
    // baseURL: "https://feedback-h6w1.onrender.com"
});

const getUserRegistered = async (UserDetails) => {
    try {
        const { name, email, mobile, password } = UserDetails;
        const response = await api.post('/user/register', {
            name, mobile, email, password
        })
        return (
            {
                success: response.data.success,
                message: response.data.message
            }
        );

    }
    catch (err) {
        return ({
            success: false,
            message: 'Error in registering user, try again'
        })
    }
}

const getUserLoggedIn = async (UserDetails) => {

    const { email, password } = UserDetails;
    const response = await api.post('/user/login', {
        email, password
    })
    if (response.data.token) {
        localStorage.setItem('feedbackUser', JSON.stringify(response.data.token));
    }
    return (
        {
            success: response.data.success,
            message: response.data.message,
            token: response.data.token
        }
    );

}

const addProduct = async (productDetails) => {
    try {
        const token = JSON.parse(localStorage.getItem('feedbackUser'));
        const product_category = productDetails.category.split(/\s*,\s*/);
        const response = await api.post('/product/add', {
            product_name: productDetails.name,
            logo_url: productDetails.logoUrl,
            product_link: productDetails.productLink,
            product_description: productDetails.productDescription,
            product_category
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return ({
            success: response.data.success,
            message: response.data.message
        });
    }
    catch (err) {
        return ({
            success: false,
            message: 'Network error! try again'
        })
    }
}

const getAllProducts = async (query) => {
    try {
        let queryData = '';
        if (query) {
            queryData = '?';
            queryData += query;
        }
        const response = await api.get(`/product/view${queryData}`);
        return ({
            success: response.data.success,
            data: response.data.data
        })
    }
    catch (err) {
        return ({
            success: false,
            message: 'Network error, try again'
        })
    }
}

const getAllFilters = async () => {
    try {
        const response = await api.get(`/product/view`);
        if (response.data.success) {
            const distinctTags = new Set();
            distinctTags.add('All');
            for (const key in response.data.data) {
                const object = response.data.data[key];
                const tags = object.product_category;
                for (const tag of tags) {
                    distinctTags.add(tag);
                }
            }
            const distinctTagsArray = Array.from(distinctTags);

            return ({
                success: true,
                data: distinctTagsArray
            });
        }
        else {
            return ({
                success: true,
                data: [
                    'All'
                ]
            })
        }
    }
    catch (err) {
        return ({
            success: false,
        })
    }

}

const addLike = async (ObjId) => {
    try {
        const response = await api.patch(`/product/like/${ObjId}`);
        return ({
            success: response.data.success,
            message: response.data.message
        });
    }
    catch (err) {
        return ({
            success: false,
            message: 'Could not add like, try again'
        })
    }
}

const addComment = async (productObj) => {
    try {
        const response = await api.patch(`/product/comment/${productObj.id}`, {
            comment: productObj.comment
        })
        return ({
            success: response.data.success,
            message: response.data.message
        });

    }
    catch (err) {
        return ({
            success: false,
            message: 'Could not add comment, try again'
        })

    }
}

const editProduct = async (productDetails, id) => {
    try {
        const token = JSON.parse(localStorage.getItem('feedbackUser'));
        const product_category = productDetails.category.split(/\s*,\s*/);
        const response = await api.patch(`/product/edit/${id}`, {
            product_name: productDetails.name,
            logo_url: productDetails.logoUrl,
            product_link: productDetails.productLink,
            product_description: productDetails.productDescription,
            product_category
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return ({
            success: response.data.success,
            message: response.data.message
        });
    }
    catch (err) {
        return ({
            success: false,
            message: 'Network error! try again'
        })
    }
}

export {
    getUserRegistered,
    getUserLoggedIn,
    addProduct,
    getAllProducts,
    getAllFilters,
    addLike,
    addComment,
    editProduct
}