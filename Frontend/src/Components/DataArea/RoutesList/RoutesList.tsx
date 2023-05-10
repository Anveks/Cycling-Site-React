import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import DifficultyModel from "../../../Models/DifficultyModel";
import LocationEnum from "../../../Models/LocationEnumModel";
import RouteModel from "../../../Models/RouteModel";
import { authStore } from '../../../Redux/AuthState';
import { routesStore } from "../../../Redux/RoutesState";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import RouteCard from "../RouteCard/RouteCard";
import "./RoutesList.css";

function RoutesList(): JSX.Element {

    const [routes, setRoutes] = useState<RouteModel[]>([]);
    const [loggedIn, setIsLoggedIn] = useState<boolean>(authStore.getState().token !== null ? true : false);


    useEffect(() => {
        dataService.getAllRoutes()
            .then((res) => { setRoutes(res) })
            .catch((err) => notifyService.error(err));
    }, [loggedIn]);

    let filteredRoutes: RouteModel[] = routesStore.getState().routes; // copy of the main array
    const diffKeys: any[] = Object.values(DifficultyModel).filter(value => typeof value === 'string'); // options for diff selector
    const locationKeys: string[] = Object.values(LocationEnum).filter(value => typeof value === 'string');;

    const [distance, setDistance] = useState<number>(50);
    const distanceArr = Array.from(routesStore.getState().routes.map((r) => { return r.distance }));

    function handleSearch(e: any): any {
        const searchText = e.target.value.toLowerCase();
        if (searchText !== "") {
            filteredRoutes = filteredRoutes.filter((r) => r.name.toLowerCase().includes(searchText));
            setRoutes(filteredRoutes);
        }
        setRoutes(filteredRoutes);
    }

    function handleDiffFilter(e: any): any {
        setRoutes(routesStore.getState().routes)
        const inputVal = e.target.value;
        if (inputVal !== 0) {
            filteredRoutes = filteredRoutes.filter((r) => r.difficultyId === +inputVal);
            setRoutes(filteredRoutes)
        }
    }

    function handleLocationChange(e: any): any {
        const inputVal = e.target.value;
        filteredRoutes = filteredRoutes.filter((r) => r.startingPoint.toLowerCase().includes(inputVal.toLowerCase()));
        setRoutes(filteredRoutes);
    }

    function handleDisChange(e: any) {
        setDistance(e.target.value);
        filteredRoutes = filteredRoutes.filter((r) => r.distance <= distance);
        setRoutes(filteredRoutes);
    }

    return (
        <>
            <h2 className="start-title">Choose your next challenge!</h2>

            <div className="search-filter">
                <div className="search">
                    <SearchIcon />
                    <input type="text" placeholder="search by name..." onChange={(e) => handleSearch(e)} />
                </div>
                |
                <div className="filter">
                    <select onChange={(e) => handleDiffFilter(e)}>
                        <option selected disabled key=''>Difficulty</option>
                        {diffKeys.map((item: string, index: number) =>
                            <option key={index} value={+index + 1} onChange={(e) => handleDiffFilter(e)}>{item}</option>
                        )}
                    </select>

                    <select onChange={(e) => handleLocationChange(e)}>
                        <option selected disabled key=''>Location</option>
                        {locationKeys.map((l, index) => <option key={index} value={l}>{l}</option>)}
                    </select>

                    <div className="dist">
                        <label> Distance: </label>
                        <input
                            type="range"
                            min={Math.min(...distanceArr)}
                            max={Math.max(...distanceArr) + 5}
                            step="1"
                            value={distance}
                            onChange={(e) => { handleDisChange(e) }}></input>
                        {distance} km
                    </div>

                </div>
            </div>

            <div className="RoutesList">
                {routes.length === 0 && "Oops! No routes found... Try changing the filters."}
                {routes.map((r) => (
                    <RouteCard route={r} key={r.routeId} />
                ))}
            </div>
        </>
    );
}

export default RoutesList;
