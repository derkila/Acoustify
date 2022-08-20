import React, { useState,useEffect } from 'react'
import SavedSong from './SavedSong'
import Playlist from './Playlist'
import './Library.css'

export default function Library({spotify}) {

  // const [userId, setUserId] = useState('')
  const [userSongs, setUserSongs] = useState([])
  const [userPlaylists, setUserPlaylists] = useState([])

  useEffect(() => {
    if (!spotify) return
    // Get tracks in the signed in user's Your Music library
    spotify.getMySavedTracks({ limit : 50 })
    .then(function(data) {
      setUserSongs([])
      data.body.items.forEach(library => {
        setUserSongs(old => [...old, library])
      })
    }, function(err) {
      console.log('Something went wrong!', err);
    }); 
    // Get the authenticated user
    spotify.getMe()
      .then(function(data) {
        // console.log(data.body.id)
        return data.body.id;
      }).then(function(user) {
        // Get a user's playlists
        spotify.getUserPlaylists({user, limit: 24})
        .then(function(data) {
          // console.log('Retrieved playlists', data.body.items);
          setUserPlaylists([])
          data.body.items.forEach(library => {
            setUserPlaylists(old => [...old, library])
          });
         });
      });
  }, [spotify])

    const data = []

    const render = () => {

    for (var i = 0; i < userPlaylists.length; i++) {

        if (i % 4 === 0 ) {
            if (i + 3 < userPlaylists.length) {
            data.push(
            <div className='container-lg playlist'>
                <div className='row'>
                    <Playlist data={userPlaylists[i]} id={userPlaylists[i].id} key={userPlaylists[i].id} index={i}/>
                    <Playlist data={userPlaylists[i + 1]} id={userPlaylists[i + 1].id} key={userPlaylists[i + 1].id} index={i + 1}/>
                    <Playlist data={userPlaylists[i + 2]} id={userPlaylists[i + 2].id} key={userPlaylists[i + 2].id} index={i + 2}/>
                    <Playlist data={userPlaylists[i + 3]} id={userPlaylists[i + 3].id} key={userPlaylists[i + 3].id} index={i + 3}/>
                </div>
            </div>)
            }
            else if (i + 3 === userPlaylists.length) {
            data.push(
            <div className='container-lg playlist'>
                <div className='row'>
                    <Playlist data={userPlaylists[i]} id={userPlaylists[i].id} key={userPlaylists[i].id} index={i}/>
                    <Playlist data={userPlaylists[i + 1]} id={userPlaylists[i + 1].id} key={userPlaylists[i + 1].id} index={i + 1}/>
                    <Playlist data={userPlaylists[i + 2]} id={userPlaylists[i + 2].id} key={userPlaylists[i + 2].id} index={i + 2}/>
                </div>
            </div>)
            }
            else if (i + 2 === userPlaylists.length) {
            data.push(
            <div className='container-lg playlist'>
                <div className='row'>
                    <Playlist data={userPlaylists[i]} id={userPlaylists[i].id} key={userPlaylists[i].id} index={i}/>
                    <Playlist data={userPlaylists[i + 1]} id={userPlaylists[i + 1].id} key={userPlaylists[i + 1].id} index={i + 1}/>
                </div>
            </div>)
            }
            else if (i + 1 === userPlaylists.length) {
            data.push(
            <div className='container-lg playlist'>
                <div className='row'>
                    <Playlist data={userPlaylists[i]} id={userPlaylists[i].id} key={userPlaylists[i].id} index={i}/>
                </div>
            </div>)
            }
        }
    }}

    render()

  return (
    <>
    <div className='container'>
      <div className='library-label'> Liked Songs </div>
      <div className='table-scroll'>
        <table className="table table-dark table-striped table-hover align-middle saved-songs">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Album</th>
              <th scope="col">Date Added</th>
              <th scope="col"> &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg> </th>
            </tr>
          </thead>
            {userSongs.map((data, i) => { 
              return <SavedSong data={data} index={i} key={data.track.id}/>
            })}
        </table>
      </div>
    </div>
    <div className='container'>
      <div className='library-playlist-label'> Your Playlists </div>
          {data}
    </div>
    </>
  )
}
