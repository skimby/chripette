import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteFollowBackend } from '../../store/follow'

function FollowingButton2({ userId, userPageId, isOwnPage }) {
    const dispatch = useDispatch();

    console.log(userId, userPageId, isOwnPage)

    const handleUnfollow = async () => {
        await dispatch(deleteFollowBackend(parseInt(userId), parseInt(userPageId), isOwnPage));
    }
    return (
        <button onClick={handleUnfollow}>Following</button>
    )
}
export default FollowingButton2;
