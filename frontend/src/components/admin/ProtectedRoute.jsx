import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const navigate = useNavigate()
    const {user} = useSelector(store => store.auth)
    useEffect(() => {
        if(user === null || user?.role !== 'recruiter'){
            navigate('/')      
        }
    }, [navigate,user]);
    return <>
        {children}
    </>
}

export default ProtectedRoute