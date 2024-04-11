import React, { useEffect, useState } from 'react';
import './admin.css'
import Navbar from '../components/Navbar/Navbar';
// import { db } from '../components/firebase/firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { data } from 'autoprefixer';

function AdminPage() {
    const [artistData, setArtistData] = useState([]);
    const [UserData, setUserData] = useState([]);
    const favouriteArtists = UserData.flatMap((user) => user['Following'] || []);
    const requestedArtists = UserData.flatMap((user) => user['Requested'] || []);


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

                console.log("Following data for each user:");
                UserData.forEach(user => {
                    console.log("Following:", user.Following);
                });

                const allFollowing = UserData.flatMap(user => user.Following || []);

                // Print the combined "Following" data with duplicates
                console.log("Combined Following data with duplicates:", allFollowing);

                // Alternatively, if you want to remove duplicates, you can use a Set
                const uniqueFollowing = Array.from(new Set(allFollowing));

                // Print the combined "Following" data without duplicates
                console.log("Combined Following data without duplicates:", uniqueFollowing);

                // Count the occurrences of each element
                const countMap = allFollowing.reduce((acc, curr) => {
                    acc[curr] = (acc[curr] || 0) + 1;
                    return acc;
                }, {});

                // Convert the count map into an array of objects
                const countArray = Object.entries(countMap).map(([element, count]) => ({
                    element,
                    count
                }));

                // Print the array with element counts
                console.log("Element counts:", countArray);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // console.log("This is UseLess");
    // console.log(artistFollowCounts);

    // console.log(artistData); 
    // console.log(UserData);


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
                        {UserData.map((user, index) => (
                            <div className="user-data" key={index}>
                                <h1 className="user-title">{user.displayName}</h1>
                                <p className="user-body">{user.email}</p>
                                <p>Artist And There Followers:</p>
                                <p>
                                    {favouriteArtists.map((user, index) => (
                                        <li key={index}>{user}</li>
                                    ))}
                                </p>
                                <p>Requested:</p>
                                <p>
                                    {requestedArtists.map((user, index) => (
                                        <li key={index}>{user}</li>
                                    ))}
                                </p>
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
                                <p className="user-body"><img src={artist.photoUrl} alt="Artist" width="100" height="100" style={{ borderRadius: '50px' }} /></p>
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

                <div className='artists'>
                    <h1 className="user-head">
                        Artist & Followers
                    </h1>
                    <div className='artist-body'>
                        <p>
                            {favouriteArtists.map((user, index) => (
                                <li key={index}>{user}</li>
                            ))}
                        </p>
                        {/* <p>
                            {requestedArtists.map((user, index) => (
                                <li key={index}>{user}</li>
                            ))}
                        </p> */}
                    </div>

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
            </div >

        </>
    );
}

export default AdminPage;