import React, { useEffect, useState } from 'react';
import './admin.css'
import Navbar from '../components/Navbar/Navbar';
// import { db } from '../components/firebase/firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { data } from 'autoprefixer';

function AdminPage() {
    const [artistData, setArtistData] = useState([]);
    const [UserData, setUserData] = useState([]);

    const db = getFirestore();
    const colRef = collection(db, 'artists');
    const colRefUser = collection(db, 'users');

    const getArtistData = async () => {
        try {
            const querySnapshot = await getDocs(colRef);
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setArtistData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getUserData = async () => {
        try {
            const querySnapshot = await getDocs(colRefUser);
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getArtistData();
                await getUserData();
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(artistData);
    console.log(UserData);


    return (
        <>
            <div className="div-body">
                <header className='header'>
                    <Navbar />
                </header>
            </div>


            <div className="body-main">
                <div className="Heading">
                    <h1 className="head-title">
                        Good Morning, Admin
                    </h1>
                    <p className="para-head">
                        Manage users data and preferences
                    </p>
                    <button className="settings">
                        User Settings
                    </button>
                    <button className="settings margin">
                        Artist Settings
                    </button>
                </div>

                <div className="users">
                    <h1 className="user-head">
                        Your Users
                    </h1>


                    <div className='user-group'>
                        {UserData.map((users, index) => (
                            <div className="user-data" key={index}>
                                <h1 className="user-title">{users.displayName}</h1>
                                <p className="user-body">{users.email}</p>
                                <p className="user-body"><img src={users.photoUrl} alt="Artist" width="100" height="100" style={{ borderRadius: '50px' }} /></p>
                                <p className="user-body">Favourite Artists</p>
                                <p className="user-body">Favourite Genre</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-grey">
                        See More
                    </p>

                </div>

                <div className="artists">
                    <div className="artist-main">
                        <h1 className="artist-head">
                            Your Artists
                        </h1>
                    </div>

                    <div className='artist-body'>
                        {artistData.map((artist, index) => (
                            <div className="artist-data" key={index}>
                                <h1 className="artist-title">{artist.displayName}</h1>
                                <p className="user-body"><img src={artist.photoUrl} alt="Artist" width="100" height="100" style={{ borderRadius: '50px' }}/></p>
                                <p className="artist-para">{artist.email}</p>
                                <p className="artist-para">Favourite Artists</p>
                                <p className="artist-para">Favourite Genre</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-grey">
                        See More
                    </p>
                </div>

                <div className="events">
                    <div className="event-header">
                        <h1 className="event-head">
                            Manage Events
                        </h1>
                    </div>
                    <div className="event-group">
                        <table className="table">
                            <thead>
                                <tr className="table-head">
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Revenue</th>
                                    <th>Ticket sold</th>
                                    <th>Attendees</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-main">
                                        Beyonce World Tour
                                    </td>
                                    <td>
                                        Jul 21, 2023
                                    </td>
                                    <td>
                                        $500,000.00
                                    </td>
                                    <td>
                                        5,000
                                    </td>
                                    <td>
                                        5,000
                                    </td>
                                </tr>

                                <tr>
                                    <td className="table-main">
                                        Kanye West Concert
                                    </td>
                                    <td>
                                        Aug 5, 2023
                                    </td>
                                    <td>
                                        $350,000.00
                                    </td>
                                    <td>
                                        3,000
                                    </td>
                                    <td>
                                        3,000
                                    </td>
                                </tr>

                                <tr>
                                    <td className="table-main">
                                        Drake Live Perfomance
                                    </td>
                                    <td>
                                        Sep 1, 2023
                                    </td>
                                    <td>
                                        $562,000.00
                                    </td>
                                    <td>
                                        5,620
                                    </td>
                                    <td>
                                        5,620
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-main">
                                        Arina Grande Concert
                                    </td>
                                    <td>
                                        Oct 10, 2023
                                    </td>
                                    <td>
                                        $425,000.00
                                    </td>
                                    <td>
                                        5,000
                                    </td>
                                    <td>
                                        4,500
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AdminPage;