import { App } from "./app"

const Start = () => {
    App()
    .then((app) => {
        app.listen(8001, async () => {
            console.log("Сервер запущен на http://localhost:8001");
        });
    });
}

Start();