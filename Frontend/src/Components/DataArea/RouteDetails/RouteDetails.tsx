import React from 'react';
import "./RouteDetails.css";
import RouteModel from '../../../Models/RouteModel';
import DateFormatter from '../../../Services/DateFormatter';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CountdownTimer from './CountdownTimer';

interface RouteDetailsProps {
    route: RouteModel;
}

function RouteDetails({ route }: RouteDetailsProps): JSX.Element {

    // create an array of 5 stars
    const stars = [...Array(5)];

    const { imageUrl, name, date, description, difficultyId, distance, endPoint, startingPoint, isFavorite, time } = route;

    return (
        <div className="RouteDetails">

            <div className="card">
                <div className="head">
                    <div className="title">
                        <p>Choose your race {'>'} {name}</p>
                        <h2>{name}</h2>
                        <div className="difficulty">
                            <p>Difficulty:</p>
                            {stars.map((s, index: number) =>
                                index < difficultyId
                                    ? (<StarIcon key={index} />)
                                    : (<StarOutlineIcon key={index} />)
                            )}
                        </div>
                    </div>

                    <div className="date-time">
                        <div className="date">{DateFormatter(date)}</div>
                        <div className="time">
                            <p>AVG: {time}:00:00</p>
                            <p>REC: {+time - 0.45}:00</p>
                        </div>
                    </div>
                </div>

                <hr></hr>

                <div className="body">
                    <div className="image-slider">
                        <img src={imageUrl} alt="route" />
                    </div>

                    <div className="dateCountdown">
                        <p>STARTS IN</p>
                        <div>
                            <CountdownTimer date={date}></CountdownTimer>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="card">
                <div className="image">
                    <img src={imageUrl} alt="route" />
                </div>
                <div className="details">

                    <p className="dates">{DateFormatter(date)}</p>
                    <p className="description">{description}</p>
                </div>
            </div> */}
        </div>
    );
}

export default RouteDetails;