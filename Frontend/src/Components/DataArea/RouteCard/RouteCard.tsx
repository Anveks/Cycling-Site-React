import DifficultyModel from "../../../Models/DifficultyModel";
import "./RouteCard.css";

function RouteCard(props: any): JSX.Element {

    // getting the difficulty string instead of number:
    const difficulty = DifficultyModel[props.route.difficultyId];

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
            <h2>{props.route.name}</h2>
            <p>Difficulty: {difficulty}</p>

            <div className="details">
                <p>{formatDate(props.route.date)}</p>
                <p>{props.route.time} h</p>
                <p>{props.route.distance} km</p>
            </div>
        </div>
    );
}

export default RouteCard;
