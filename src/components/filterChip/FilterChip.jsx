import { useContext } from 'react'
import styles from './FilterChip.module.css'
import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom';
export default
    function FilterChip(props) {

    const { setFilterSelected, setUpdateAvailable } = useContext(UserContext);

    const { name, isSelected } = props;

    const handleClick = () => {
        setFilterSelected(name);
        setUpdateAvailable(true);
    }


    return (
        <div className={`${styles.main} ${isSelected && styles.selected}`} onClick={handleClick}>
            {name}
        </div>
    )
}