import express from 'express';

export const App = async () => {
	const app = express();

	app.use(express.json());

	app.use((_, res) => {
		res.status(404).json({
			message: 'Страницы не найдена'
		});
	});

	return app;
}