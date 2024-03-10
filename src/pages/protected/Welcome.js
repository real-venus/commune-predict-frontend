import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import {Link} from 'react-router-dom'
import IMG from './earth.gif'
import { CSSTransition } from 'react-transition-group';
import Welcome from "../../features/welcome";

function InternalPage(){

    const dispatch = useDispatch();
    const [enterEarth, setEnterEarth] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
        setEnterEarth(true)
        window.scrollTo(0, 0);
      }, [])

    return(
      <div className="">
        <Welcome />
      </div>
    )
}

export default InternalPage