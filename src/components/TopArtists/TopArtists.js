import React, { useState,useEffect } from 'react'
import { Link } from'react-router-dom';
import Artist from './Artist'
import './TopArtists.css'

export default function TopArtists({spotify, timeRange}) {

    const [userTopArtists, setUserTopArtists] = useState([]);

    useEffect(() => {
    /* Get a User’s Top Artists*/
    // Limit divisible by 3 
    spotify.getMyTopArtists({time_range: timeRange, limit: 50})
    .then(function(data) {
        setUserTopArtists([])
        data.body.items.forEach(artist => {
        setUserTopArtists(old => [...old, artist])
      })
    }, function(err) {
        console.log('Something went wrong!', err);
    }); }, [spotify, timeRange])

    const data = []

    const render = () => {

    for (var i = 0; i < userTopArtists.length; i++) {

        if (i % 3 === 0 ) {
            if (i + 2 < userTopArtists.length) {
            data.push(
            <div className='container-sm artist'>
                <div className='row'>
                    <Artist data={userTopArtists[i]} id={i}/>
                    <Artist data={userTopArtists[i + 1]} id={i + 1}/>
                    <Artist data={userTopArtists[i + 2]} id={i + 2}/>
                </div>
            </div>)
            }
            else if (i + 2 === userTopArtists.length) {
            data.push(
            <div className='container-sm artist'>
                <div className='row'>
                    <Artist data={userTopArtists[i]} id={i}/>
                    <Artist data={userTopArtists[i + 1]} id={i + 1}/>
                </div>
            </div>)
            }
            else if (i + i === userTopArtists.length) {
            data.push(
            <div className='container-sm artist'>
                <div className='row'>
                    <Artist data={userTopArtists[i]} id={i}/>
                </div>
            </div>)
            }
        }
    }}

    render()

    return (
    <>
    <div className='page-info'> Top Artists </div>
        <div className='container time-frame'> 
        <div className='row'>
        <div className='col-lg-4'>
            <Link to= "/top-artists/short-term">
            <button className="btn btn-pink btn-block" type="button">
                Last Month
            </button>
            </Link>
        </div>
        <div className='col-lg-4'>
            <Link to= "/top-artists/medium-term">
            <button className="btn btn-pink btn-block" type="button">
                Last 6 Months
            </button>
            </Link>
        </div>
        <div className='col-lg-4'>
            <Link to= "/top-artists/long-term">
            <button className="btn btn-pink btn-block" type="button">
                Last 12 Months
            </button>
            </Link>
        </div>
        </div>
    </div>
        {data}
    </>
    )

 }  
