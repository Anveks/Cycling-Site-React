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

                <div className="body">
                    {/* image */}
                    <div className="image">
                        <img src={imageUrl} alt="route" />
                    </div>

                    {/* date */}
                    <div className="dateCountdown">
                        <p>STARTS IN</p>
                        <div>
                            <CountdownTimer className="timer" date={date}></CountdownTimer>
                            <div>days hours minutes seconds</div>
                        </div>

                        {/* map */}
                        <div className="map">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps/embed/v1/place?q=${startingPoint}&key=AIzaSyCt-sC6cQvHOzRPWZzlYRhJp-zEnBlNBFQ`}
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="distance">
                            Distance: {distance} km
                        </div>
                    </div>
                </div>

                <div className="description">
                    {description}
                </div>
            </div>

        </div>
    );
}

export default RouteDetails;