class AppConfig {
    // data url:
    public routesURL = 'http://localhost:4000/api/routes/';

    // auth URL's
    public registerUrl = "http://localhost:4000/api/auth/register"
    public loginUrl = "http://localhost:4000/api/auth/login"

    // favorites URL:
    public favURL = "http://localhost:4000/api/routes/set-favorite/"
     
}

const appConfig = new AppConfig();

export default appConfig;
