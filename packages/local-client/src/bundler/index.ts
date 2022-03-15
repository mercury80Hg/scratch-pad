import * as esbuild from "esbuild-wasm"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"
import { fetchPlugin } from "./plugins/fetch-plugin"

let service: esbuild.Service

const bundle = async (rawCode: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		})
	}

	/* entryPoints: refers to the first file we want ESBundle to 
    bundle.  So it tries to find out the path to that file which is
    the onResolve step in unpkg-paths-plugin. This will allow us to
    intercept the search for the path and let us intergect our own.*/
	/* here's were we do the bundling */
	
	try {
	const result = await service.build({
		entryPoints: ["index.js"],
		bundle: true,
		write: false,
		plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
		/* define is accounting for a bundling error popping up when bundling in 
    the browser.  It will replace with 'production' which will help prune 
    some of the bundling code. */
		define: {
			"process.env.NODE_ENV": '"production"',
			/* global is something that apparently when using Webpack it is taken
      care of automatically, but not when using ESBundle */
			global: "window",
		},
		/* accounting for the naming conflicts in the show() function */
		jsxFactory: '_React.createElement', 
		jsxFragment: '_React.Fragment'
	})
	return {
		code: result.outputFiles[0].text,
		err: ''
	}
} catch (err: any) {
	return {
		code: '',
		err: err.message,
	}
}

	
}

export default bundle
