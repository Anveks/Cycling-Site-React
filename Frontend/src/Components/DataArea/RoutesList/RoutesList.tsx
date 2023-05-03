import { useEffect, useState } from "react";
import RouteModel from "../../../Models/RouteModel";
import "./RoutesList.css";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import RouteCard from "../RouteCard/RouteCard";
import SearchIcon from '@mui/icons-material/Search';
import { routesStore } from "../../../Redux/RoutesState";

function RoutesList(): JSX.Element {

    const [routes, setRoutes] = useState<RouteModel[]>([]);
    useEffect(() => {
        dataService.getAllRoutes()
            .then((res) => { setRoutes(res) })
            .catch((err) => notifyService.error(err));
    }, []);

    function handleSearch(e: any): any {
        const searchText = e.target.value.toLowerCase();
        let searchResult: RouteModel[] = routesStore.getState().routes;
        if (searchText !== "") searchResult = searchResult.filter((r) => r.name.toLowerCase().includes(searchText));
        setRoutes(searchResult);
    }

    function handleFilter(e: any): any {
        console.log(e.target.value);
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
                    {/* <label htmlFor="">Filter:</label> */}
                    <select onChange={(e) => handleFilter(e)}>
                        <option selected disabled>Difficulty</option>
                        {routes.map((r) => (<option value={r.difficulty} key={r.difficulty}>{r.difficulty}</option>))}
                    </select>
                </div>

            </div>

            <div className="RoutesList">
                {routes.map((r) => (<RouteCard route={r} key={r.routeId}></RouteCard>))}
            </div>
        </>
    );
}

export default RoutesList;
