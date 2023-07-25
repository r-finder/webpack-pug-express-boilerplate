import HomeController from "./controllers/homeController.js";


const registerRoutes = (app) => {
    const homeController = new HomeController(app.staticPath);

    app.get('/', homeController.getIndex);
    app.get('/getdata', homeController.getData);
}

export default registerRoutes;