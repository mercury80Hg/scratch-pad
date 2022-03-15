import * as esbuild from "esbuild-wasm"
import axios from "axios"
/* localForage is library simplifying interaction with indexedDB which is
a larger cache storage than the localStorage cache */
import localForage from "localforage"

const fileCache = localForage.createInstance({
	name: "filecache",
})

export const fetchPlugin = (inputCode: string) => {
	return {
		name: "fetch-plugin",
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: "jsx",
					contents: inputCode,
				}
			})

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				/* Check to see if we have already fetched this file and if it
      is in the cache   */
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				)

				//if it is in the cache return it immediately
				if (cachedResult) {
					return cachedResult
				}
			})

			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path)

				/* since CSS files have single-quotes they can kick out prematurely
        when inserted in our string.  Regex will remove the the newlines, 
        and escape both the single and double quotes */
				const escaped = data
					.replace(/\n/g, "")
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'")
				/* workaround to insert CSS into the build file getting it
        into the Head tag */
				const contents = `
          const style = document.createElement('style')
          style.innerText = '${escaped}'
          document.head.appendChild(style)
          `

				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents: contents,
					resolveDir: new URL("./", request.responseURL).pathname,
				}
				//store response in cache
				await fileCache.setItem(args.path, result)
				return result
			})

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path)

				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents: data,
					resolveDir: new URL("./", request.responseURL).pathname,
				}
				//store response in cache
				await fileCache.setItem(args.path, result)
				return result
			})
		},
	}
}
