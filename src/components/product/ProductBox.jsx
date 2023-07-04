import { useContext, useEffect, useState } from 'react'
import styles from './ProductBox.module.css'
import { addComment, addLike } from '../../actions/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
export default
    function ProductBox(props) {

    const [displayChips, setDisplayChips] = useState();
    const [displayComments, setDisplayComments] = useState();
    const [showCommentBox, setShowCommentBox] = useState();
    const [comment, setComment] = useState('');
    const [likeCount, setLikeCount] = useState();
    const [commentCount, setCommentCount] = useState();
    const { userLoggedIn, setModalToShow, setShowModal, setProductToEdit } = useContext(UserContext);

    useEffect(() => {
        const tempDisplayChips = props.tags.map((item) => {
            return (
                <span className={styles.chipItems}>{item}</span>
            )
        })

        const tempDisplayComments = props.comments.map((item) => {
            return (
                <span className={styles.comments}>{item}</span>
            )
        })

        setDisplayComments(tempDisplayComments);
        setDisplayChips(tempDisplayChips);
        setShowCommentBox(false);
        setLikeCount(props.likes);
        setCommentCount(props.comments_count);
    }, [])


    const handleCommentBox = () => {
        setShowCommentBox(showCommentBox ? false : true);
    }

    const writeComment = (e) => {
        setComment(() => {
            return e.target.value

        })
    }

    const handleComment = async () => {
        const result = await addComment({
            id: props.id,
            comment: comment
        })
        if (result.success) {
            setCommentCount(commentCount + 1);
            const newCommentsArray = displayComments.map(item => item)
            newCommentsArray.push(<span className={styles.comments}>{comment}</span>)
            setDisplayComments(newCommentsArray);
        }
        else {
            toast.error(result.message, { autoClose: 3000 })
        }
    }

    const handleLikes = async () => {
        const result = await addLike(props.id);
        if (result.success) {
            setLikeCount(likeCount + 1);
        }
        else {
            toast.error(result.message, { autoClose: 3000 })
        }
    }

    const handleEdit = () => {
        if (userLoggedIn) {
            setModalToShow('AddProductsEdit');
            setShowModal(true);
            setProductToEdit(props);
        }

    }


    return (
        <>
            <div className={styles.main}>
                <img src={props.logo} className={styles.image1}></img>
                <div className={styles.box2}>
                    <span className={styles.text1}>{props.name}</span>
                    <span className={styles.text2}> {props.description}</span>
                    <div className={styles.box21}>
                        {displayChips}
                        <img src="../../Images/comment2.png" alt="" className={styles.image3} onClick={handleCommentBox} />
                        <span className={styles.text4} onClick={handleCommentBox}>Comment</span>
                        {userLoggedIn && <span className={`${styles.button1} `} onClick={handleEdit}>Edit</span>}
                    </div>
                </div>
                <div className={styles.box3}>
                    <div className={styles.box31} onClick={handleLikes}>
                        <img src='../../Images/likes.png' className={styles.image2}></img>
                        <span className={styles.text3}>{likeCount}</span>
                    </div>
                    <div className={styles.box32}>
                        <span className={styles.text5}>{commentCount}</span>
                        <img src="../../Images/comment.png" alt="" className={styles.image5} />
                    </div>
                </div>

            </div>
            {showCommentBox && <div className={styles.main2}>
                <div className={styles.top}>
                    <input className={styles.commentBox} placeholder='Add a comment...' onChange={writeComment}></input>
                    <img src="../../Images/send.png" alt="" className={styles.image4} onClick={handleComment} />
                </div>
                <div className={styles.bottom}>
                    {displayComments}
                </div>
            </div>}
        </>
    )
}