import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useEffect, useState } from "react";
import RouteModel from "../../../Models/RouteModel";
import { authStore } from "../../../Redux/AuthState";
import { RoutesActionType, routesStore } from "../../../Redux/RoutesState";
import dataService from "../../../Services/DataService";
import "./RouteCard.css";
import { Modal } from '@mui/material';
import RouteDetails from '../RouteDetails/RouteDetails';
import DateFormatter from '../../../Services/DateFormatter';

function RouteCard(props: { route: RouteModel }): JSX.Element {

    const [loggedIn, setIsLoggedIn] = useState<boolean>(authStore.getState().token !== null ? true : false);
    const [isFavorite, setIsFavorite] = useState<boolean>(props.route.isFavorite === 1 ? true : false);

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(authStore.getState().isLoggedIn);
        });

        return () => unsubscribe();
    }, []);

    // for modal window:
    const [open, setOpen] = useState(false);
    // open/close modal:
    function handleModal() {
        open
            ? setOpen(false)
            : setOpen(true);
    };

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
            <img
                src={props.route.imageUrl}
                alt="cyclists-photo"
                style={{ cursor: loggedIn ? 'pointer' : '' }}
                onClick={handleModal}
            />
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
                <p className="date">{DateFormatter(props.route.date)}</p>
                <div className="duration-distance">
                    <p> <AccessTimeIcon /> Duration: {props.route.time} h</p>
                    <p> <MapIcon /> Distance: {props.route.distance} km</p>
                    <p className="location"> <LocationOnIcon /> Location: {props.route.startingPoint}</p>
                </div>
            </div>

            {loggedIn &&
                <Modal open={open} onClose={handleModal} className='modal'>
                    <div className="modal-content">
                        <RouteDetails route={props.route} />
                    </div>
                </Modal>}
        </div>
    );
}

export default RouteCard;
