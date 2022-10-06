import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createTweetBackend, getOneTweetBackend } from "../../store/tweet";
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import '../CreateCommentInline/CreateCommentInline.css'
import { editTweetBackend, getOne } from '../../store/tweet';


function TweetAddOns({ tweetId, setShowModal, edit }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const refButton = useRef(null);
    const refContainer = useRef(null);

    const user = useSelector(state => state.session);
    const currentTweet = useSelector(state => state.tweets?.currentTweet);


    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState(null);
    const [gif, setGif] = useState(null);
    const [inputClick, setInputClick] = useState(false);
    const [errors, setErrors] = useState([]);
    const [completeTweet, setCompleteTweet] = useState(false);
    const [gifOrImg, setGifOrImg] = useState(false);

    // console.log(currentTweet?.tweet)

    //EMOJI STUFF
    let triggerButton;
    let rootElement;
    let picker4;

    useEffect(() => {
        if (currentTweet && !tweet) {
            setTweet(currentTweet.tweet)
        }
    }, [tweet, currentTweet])

    useEffect(() => {
        if (tweetId) {
            dispatch(getOneTweetBackend(tweetId))
        }
    }, [dispatch, tweetId])

    useEffect(() => {
        triggerButton = refButton.current
        rootElement = refContainer.current;
    }, [inputClick, gifOrImg, tweet, gif, image])

    // Create the picker
    useEffect(() => {
        if (triggerButton && rootElement) {
            picker4 = createPopup({
                animate: false,
                autoFocus: 'auto',
                rootElement
            }, {
                triggerElement: triggerButton,
                referenceElement: triggerButton,
                position: 'bottom-start'
            });

            picker4.addEventListener('emoji:select', event => {
                setTweet(tweet + event.emoji)
            });
        }
    }, [inputClick, gifOrImg, tweet, gif, image])

    useEffect(() => {
        if (tweet) {
            setCompleteTweet(true)
        } else {
            setCompleteTweet(false)
        }
    }, [tweet])


    useEffect(() => {
        if (gif || image) {
            setGifOrImg(true)
        } else {
            setGifOrImg(false)
        }
    }, [gif, image]);


    console.log(tweet)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (edit) {
            const tweetInput = { tweet: tweet }

            const editedTweet = await dispatch(editTweetBackend(tweetId, tweetInput));

            console.log(editedTweet)
            if (editedTweet) {
                setTweet('')
                history.push(`/${currentTweet?.User?.username}/tweets/${currentTweet?.id}`)
            }
        } else {

            setErrors([]);
            const tweetInput = {
                tweet,
                gif,
                image
            }

            const newTweet = await dispatch(createTweetBackend(tweetInput))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                });

            if (!errors.length) {
                setTweet('')
                setImage(null)
                setGif(null)
                setShowModal(false)
                history.push(`/${user?.user?.username}/tweets/${newTweet.id}`)
            }
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleOpenEmoji4 = () => {
        picker4.open()
    }

    const focusInput = (e) => {
        setInputClick(true)
    }
    const removeGif = () => {
        setGif(false)
    }

    return (
        // <div className="comment-inline-container">
        <div className="tweet-comment-container3">
            <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user?.user?.profileImage} />
                )}
            </div>

            <div className='tweet-text-box'>

                <form onSubmit={handleSubmit} className='form comment-form'>
                    <input
                        onClick={focusInput}
                        placeholder="What's happening?"
                        type='text'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}>
                    </input>


                    {gif && (
                        <div className="display-img-gif">
                            <div className="remove-gif-box">
                                <i className="fa-solid fa-circle-xmark" onClick={removeGif}></i>
                            </div>
                            <img src={gif} className='img-gif' width='200' />
                        </div>
                    )}



                    <div className="comment-icons-gif-img">
                        {(!gifOrImg && !edit) && (
                            <>
                                <label className="upload-btn inline" htmlFor='inputTag'>
                                    <i className="fa-regular fa-image blue-icon"></i>
                                    <input id='inputTag' type="file" onChange={updateFile} />
                                </label>

                                <div className="inline">
                                    <GiphyModal setGif={setGif} />
                                </div>
                            </>
                        )}

                        {(gifOrImg || edit) && (
                            <>
                                <div className="inline">
                                    <i className="fa-regular fa-image disabled-blue-icon"></i>
                                </div>
                                <div className="inline">
                                    <i className="fa-solid fa-gift disabled-blue-icon" />
                                </div>
                            </>
                        )}

                        <div ref={refButton} className='inline' id='emoji-button3' onClick={handleOpenEmoji4}>
                            <i className="fa-regular fa-face-smile blue-icon"></i>
                        </div>

                        <div className='emoji-container3' id='inline' ref={refContainer} ></div>

                        {completeTweet && (
                            <button className='btn-float-right' type=' submit'>Tweet</button>
                        )}
                        {!completeTweet && (
                            <button className="disabled-btn btn-float-right">Tweet</button>
                        )}
                    </div>


                </form>
                {errors && (
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                )}
            </div>
        </div>
        // </div >
    )
}

export default TweetAddOns;
