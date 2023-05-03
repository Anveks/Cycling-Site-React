import DifficultyModel from "../../../Models/DifficultyModel";
import "./RouteCard.css";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function RouteCard(props: any): JSX.Element {

    // getting the difficulty string instead of number:
    // const difficulty = DifficultyModel[props.route.difficultyId];
    const diff = +props.route.difficultyId;

    // create an array of 5 stars
    const stars = [...Array(5)];

    // date formatter:
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="RouteCard">
            <img src={props.route.imageUrl} alt="" />
            <h2 className="title">{props.route.name}</h2>

            <p className="difficulty">
                Difficulty:
                {stars.map((s, index: number) =>
                    index < diff
                        ? (<StarIcon key={index} />)
                        : (<StarOutlineIcon key={index} />)
                )}
            </p>

            <div className="details">
                <p className="date">{formatDate(props.route.date)}</p>
                <div className="duration-distance">
                    <p> <AccessTimeIcon /> Duration: {props.route.time} h</p>
                    <p> <MapIcon /> Distance: {props.route.distance} km</p>
                    <p className="location"> <LocationOnIcon /> Location: {props.route.startingPoint}</p>
                </div>
            </div>
        </div>
    );
}

export default RouteCard;
