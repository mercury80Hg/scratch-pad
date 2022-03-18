import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import path from "path"
import { createCellsRouter } from "@scratchpadjs/local-api/src/routes/cells"

export const serve = (
	port: number,
	filename: string,
	dir: string,
	useProxy: boolean
) => {
	const app = express()

	app.use(createCellsRouter(filename, dir))

	/* if statement determines whether we are in development or installed
on a users computer */
	if (useProxy) {
		app.use(
			createProxyMiddleware({
				target: "http://localhost:3000",
				ws: true,
				logLevel: "silent",
			})
		)
	} else {
		/*absoulte path to build file */
		const packagePath = require.resolve(
			"@scratchpadjs/local-client/build/index.html"
		)
		/* path up to the build directory */
		app.use(express.static(path.dirname(packagePath)))
	}

	/* creating custom promise to catch async errors for customized
error handling */
	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on("error", reject)
	})
}
