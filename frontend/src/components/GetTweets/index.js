import TweetSettingsModal from './TweetSettingsModal';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Likes from '../Likes';
import CreateCommentModal from '../CreateCommentModal';
import './GetTweets.css'


function GetTweets({ tweets }) {
    const history = useHistory();


    console.log(tweets)
    // useEffect(() => {
    //     tweets = Object.values(tweets).sort((a, b) => {
    //         return new Date(b.createdAt1) - new Date(a.createdAt1)
    //     })
    // })
    return (
        <>
            {tweets && (
                Object.values(tweets).map((tweet, index) => {
                    return (
                        <div className='tweet-container' key={index} >

                            <div className='tweet-profile-img' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>

                                <img className='profile-img' src={tweet?.User?.profileImage} />


                            </div>

                            <div className='tweet-text-box'>

                                <div className='tweet-user-header'>
                                    <div className='username-name-box'>
                                        <h5 className='name-username' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>
                                            {tweet?.User?.firstName}

                                            <span className='thin-styling'> @{tweet?.User?.username} · {tweet?.updatedAt?.[1]} {tweet?.updatedAt?.[2]}</span></h5>
                                    </div>


                                    <div className='settings-btn' >
                                        <TweetSettingsModal tweet={tweet} />
                                    </div>



                                </div>

                                <div className='tweet-tweet-box'>
                                    <p onClick={() => { history.push(`/${tweet?.User?.username}/tweets/${tweet.id}`) }}>
                                        {tweet?.tweet}
                                    </p>
                                </div>

                                <div className='tweet-img-gif'>
                                    {tweet?.image !== null && (
                                        <img className='img-gif' src={tweet?.image} />
                                    )}
                                    {tweet?.gif !== null && (
                                        <img className='img-gif' src={tweet?.gif} />
                                    )}
                                </div>



                                <div className='tweet-icons-box'>

                                    <div className='tweet-icon'>
                                        <CreateCommentModal commentCount={tweet?.commentCount} tweet={tweet} />
                                    </div>
                                    <div className='tweet-icon'>
                                        <i className="fa-solid fa-retweet gray-icon"></i>
                                        <p className='gray-p'></p>
                                    </div>
                                    <div className='tweet-icon'>
                                        <Likes likeCount={tweet?.likeCount} tweet={tweet} />
                                    </div>
                                    {/* <i onClick={handleLike(tweet)} className="fa-regular fa-heart"></i>{tweet?.likeCount} */}

                                </div>
                            </div>
                        </div>

                    )
                })
            )}
        </>
    )
}

export default GetTweets;
