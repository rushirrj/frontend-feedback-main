import { useContext, useState } from 'react';
import styles from './Login.module.css'
import { clientSideValidation } from '../../actions/Helper';
import { getUserLoggedIn } from '../../actions/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';


export default
    function Login() {

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const { setUserLoggedIn, setModalToShow } = useContext(UserContext);


    const handleChange = (e) => {
        setUserDetails((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleSubmit = async () => {
        const userToBeLoggedIn = {
            name: '0000000',
            email: userDetails.email,
            mobile: '0000000000',
            password: userDetails.password
        }
        const result = clientSideValidation(userToBeLoggedIn);
        if (result.success) {
            // do the API call
            const userLogIn = await getUserLoggedIn(userToBeLoggedIn);

            if (userLogIn.success) {
                toast.success(userLogIn.message, { autoClose: 3000 });
                setUserLoggedIn(true);
                setModalToShow('AddProducts');
            }
            else {
                toast.error(userLogIn.message, { autoClose: 3000 });
            }

        }
        else {
            setErrors(result.errors);
        }
    }

    const handleSignUp = () => {
        setModalToShow('SignUp');
    }

    return (
       
            <div className={styles.mainBox}>
            <span className={styles.text2}>Log in to continue</span>
            <div className={styles.box1}>
                <img src="../../Images/Email.png" alt="img-1" className={styles.image1} />
                <input placeholder='Email' className={styles.input1} name='email' onChange={handleChange}></input>
            </div>
            {errors.email && <span className={styles.error}>{errors.email}</span>}
            <div className={styles.box2}>
                <img src="../../Images/Password.png" alt="img-2" className={styles.image2} />
                <input type="password" placeholder='Password' className={styles.input2} name='password' onChange={handleChange} />
            </div>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
            <span className={styles.box3}>Don’t have an account? <span className={styles.text3} onClick={handleSignUp}>Sign up?</span></span>
            <div className={styles.box4}>
                <span className={styles.button1} onClick={handleSubmit}>Login</span>
            </div>
        </div>
      

    )
}