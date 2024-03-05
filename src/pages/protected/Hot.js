import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Hot from '../../features/hot'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Hot Signal"}))
      }, [])
      
    return(
        <Hot />
    )
}

export default InternalPage