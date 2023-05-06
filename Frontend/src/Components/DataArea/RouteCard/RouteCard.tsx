import DifficultyModel from "../../../Models/DifficultyModel";
import "./RouteCard.css";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { authStore } from "../../../Redux/AuthState";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import { RoutesActionType, routesStore } from "../../../Redux/RoutesState";

function RouteCard(props: any): JSX.Element {

    const [loggedIn, setIsLoggedIn] = useState<boolean>(authStore.getState().token !== null ? true : false);
    const [isFavorite, setIsFavorite] = useState<boolean>(props.route.isFavorite === 1 ? true : false);

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(authStore.getState().isLoggedIn);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = routesStore.subscribe(() => {
            const index = routesStore.getState().routes.findIndex((r) => r.routeId === props.route.routeId);
            const isFavoriteState = routesStore.getState().routes[index].isFavorite === 1 ? true : false

            setIsFavorite(isFavoriteState);
        })

        return () => unsubscribe();
    }, [])

    // getting the difficulty string instead of number:
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

    async function handleFav() {
        try {
            // send the data to the server:
            const routeId = props.route.routeId;
            const follow = props.route.isFavorite === 1 ? 0 : 1;
            await dataService.setFavorite(+routeId, +follow);

            // update redux storage:
            routesStore.dispatch({ type: RoutesActionType.UpdateFavorite, payload: { routeId, follow } });

        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className="RouteCard">
            <img src={props.route.imageUrl} alt="" />
            {loggedIn && <b className="fav" onClick={handleFav}>{isFavorite ? <StarIcon style={{ color: 'goldenrod' }} /> : <StarOutlineIcon style={{ color: "white" }} />}</b>}
            <h2 className="title">{props.route.name}</h2>

            <div className="difficulty">
                <p>Difficulty:</p>
                {stars.map((s, index: number) =>
                    index < diff
                        ? (<StarIcon key={index} />)
                        : (<StarOutlineIcon key={index} />)
                )}
            </div>

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
