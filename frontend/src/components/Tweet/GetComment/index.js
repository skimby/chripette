import { Redirect, useHistory, Link } from 'react-router-dom';
import CommentSettingsModal from "../../GetTweets/CommentSettingsModal";
import giphyTag from '../../../images/powered-by-giphy.png'

function GetComment({ comment, tweetId, isOwnComment }) {
    const history = useHistory();

    return (
        <>
            <div className='tweet-profile-img' onClick={() => { history.push(`/${comment?.User?.username}/${comment?.User?.id}`) }}>

                <img className='profile-img' src={comment?.User?.profileImage} />
            </div>







            <div className='tweet-text-box'>
                <div>
                    <Link to={`/${comment?.User?.username}/${comment?.User?.id}/tweets/${comment?.tweetId}`}>
                        <h5>
                            {comment?.User?.firstName}</h5>
                    </Link>

                    <h5><span className='thin-styling'>@{comment?.User?.username} • {comment?.updatedAt?.[1]} {comment?.updatedAt?.[2]}</span></h5>
                </div>

                <div>
                    <p>{comment?.comment}</p>
                    <img className='img-gif' src={comment?.image} width='200' />
                    <img className='img-gif' src={comment?.gif} width='200' />
                    <img className="padding-top " src={giphyTag} width='110px' />
                </div>

                {isOwnComment && (
                    <div className='settings-btn' >
                        <CommentSettingsModal comment={comment} />
                    </div>
                )}

            </div>
        </>
    )
}
export default GetComment;
