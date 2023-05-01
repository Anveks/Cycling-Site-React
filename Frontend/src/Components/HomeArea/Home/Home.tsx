import RoutesList from "../../DataArea/RoutesList/RoutesList";
import Header from "../../LayoutArea/Header/Header";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <Header />
            <RoutesList />
        </div>
    );
}

export default Home;
