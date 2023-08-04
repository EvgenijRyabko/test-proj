import express from 'express';
import { MainRouter } from './shared/main.router';
import { InitConnection } from '../dbConnection';

export const App = async () => {
	const app = express();

	app.use(express.json());

	await InitConnection();

	MainRouter(app, '/test');

	app.use((_, res) => {
		res.status(404).json({
			message: 'Страницы не найдена'
		});
	});

	return app;
}