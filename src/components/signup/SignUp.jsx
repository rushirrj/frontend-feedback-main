import { useContext, useState } from 'react';
import styles from './SignUp.module.css'
import { clientSideValidation } from '../../actions/Helper';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { getUserRegistered } from '../../actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default
    function SignUp() {

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {setModalToShow} = useContext(UserContext);

    const handleChange = (e) => {
        setUserDetails((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleSubmit = async () => {
        const userToBeValidated = {
            name: userDetails.name,
            email: userDetails.email,
            mobile: userDetails.mobile,
            password: userDetails.password
        }
        const result = clientSideValidation(userToBeValidated);
        if (result.success) {
            const userRegistration = await getUserRegistered(userToBeValidated);

            if (userRegistration.success) {
                toast.success(userRegistration.message, { autoClose: 3000 });
                setModalToShow('AddProducts');
            }
            else {
                toast.error(userRegistration.message, {autoClose: 3000});
            }
        }
        else {
            setErrors(result.errors);
        }
    }

    const handleLogin = () => {
        setModalToShow('LogIn');
    }

    return (
        

            <div className={styles.mainBox}>
                <span className={styles.text2}>Signup to continue</span>
                <div className={styles.box1}>
                    <img src="../../Images/Name.png" alt="img-1" className={styles.image1} />
                    <input placeholder='Name' className={styles.input1} name='name' onChange={handleChange} ></input>
                </div>
                {errors.name && <span className={styles.error}>{errors.name}</span>}

                <div className={styles.box1}>
                    <img src="../../Images/Email.png" alt="img-1" className={styles.image1} />
                    <input placeholder='Email' className={styles.input1} name='email' onChange={handleChange} ></input>
                </div>
                {errors.email && <span className={styles.error}>{errors.email}</span>}

                <div className={styles.box1}>
                    <img src="../../Images/Mobile.png" alt="img-1" className={styles.image1} />
                    <input type='Number' placeholder='Mobile' className={styles.input1} name='mobile' onChange={handleChange} ></input>
                </div>
                {errors.mobile && <span className={styles.error}>{errors.mobile}</span>}

                <div className={styles.box2}>
                    <img src="../../Images/Password.png" alt="img-2" className={styles.image2} />
                    <input type="password" placeholder='Password' className={styles.input2} name='password' onChange={handleChange} />
                </div>
                {errors.password && <span className={styles.error}>{errors.password}</span>}

                <span className={styles.box3}>Already have an account? <span className={styles.text3} onClick={handleLogin} >Login</span></span>

                <div className={styles.box4}>
                    <span className={styles.button1} onClick={handleSubmit} >Signup</span>
                </div>
            </div>
        
    )
}