import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Short from '../../features/short'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Short Signal"}))
      }, [])
      
    return(
        <Short />
    )
}

export default InternalPage