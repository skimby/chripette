import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreateTweet from '../CreateTweet';
import GetTweets from '../GetTweets';
import { getFeedTweetsBackend } from '../../store/tweet'

import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState();

    const sessionUser = useSelector(state => state.session);
    const tweets = useSelector(state => state.tweets)
    const likes = useSelector(state => state.likes)
    const follows = useSelector(state => state.follows)

    useEffect(() => {
        dispatch(getFeedTweetsBackend())
    }, [dispatch, likes, sessionUser, follows])

    useEffect(() => {
        if (sessionUser?.user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    return (
        <>

            <div className='home-div'>
                <h2>Home</h2>
            </div>


            <CreateTweet />


            <div>
                <GetTweets tweets={tweets?.feedTweets} />
            </div>

        </>

    )
}

export default HomePage;