import HomeController from "./controllers/homeController.js";


const registerRoutes = (app) => {
    const homeController = new HomeController();

    app.get('/getdata', homeController.getData);
}

export default registerRoutes;