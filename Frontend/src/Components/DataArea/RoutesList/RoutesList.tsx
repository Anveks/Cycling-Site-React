import { useEffect, useState } from "react";
import RouteModel from "../../../Models/RouteModel";
import "./RoutesList.css";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import RouteCard from "../RouteCard/RouteCard";

function RoutesList(): JSX.Element {

    const [routes, setRoutes] = useState<RouteModel[]>([]);
    useEffect(() => {
        dataService.getAllRoutes()
            .then((res) => { setRoutes(res) })
            .catch((err) => notifyService.error(err));
    }, []);

    return (
        <div className="RoutesList">
            {routes.map((r) => (<RouteCard route={r} key={r.routeId}></RouteCard>))}
        </div>
    );
}

export default RoutesList;
