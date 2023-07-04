
export
    const clientSideValidation = (userObj) => {
        const { name, email, mobile, password } = userObj;
        const error = {};

        if (!name) {
            error.name = 'Name is required';
        }

        if (!email) {
            error.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = 'Email is invalid';
        }

        if (!password) {
            error.password = 'Password is required';
        }
        else if (password.length < 6) {
            error.password = 'Password must be of 6 characters';
        }

        if (!mobile) {
            error.mobile = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/.test(mobile)) {
            error.mobile = 'Mobile number is invalid';
        }

        let allOK;
        if (Object.keys(error).length == 0)
            allOK = true;
        else
            allOK = false;
        return {
            success: allOK,
            errors: error
        }
    }