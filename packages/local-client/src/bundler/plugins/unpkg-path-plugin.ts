import * as esbuild from "esbuild-wasm"

export const unpkgPathPlugin = () => {
	/* 'name:' is used for debugging in the event of multiple plugins
    it will be easier to trace back what is doing what. The setup() 
    however calls build as an argment automatically which will start 
    the bundling process.*/
	return {
		name: "unpkg-path-plugin",
		setup(build: esbuild.PluginBuild) {
			/* onResolve lets us intercept ESBundle's search for initial file 
      to bundle and lets us put in our own.  onLoad lets us load our 
      file path and in effect we hijack or overide the ESBundles search
      for it, which it would not find.  It will then repeat the step as 
      needed for any import/require/exports it may find in any of the 
      following files.  */
			/* onResolve and onLoad are critical to bypassing ESBuild's search 
			for files on our file system to bundle. */

			/* Handle root entry file of 'index.js' */
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: 'index.js', namespace: 'a' }
			})

			/*if the file isn't index.js it will assume we are trying to
			import a package in which case we will use unpkg.com to find it. */
			/* this if statement is where the resolution of relative files
			is handled. The resolveDir helps account for nested file structures 
			as well as the redirect that unpkg.com does*/
			

			/* Handle relative paths in a module. regex will find if we have 
			a ./ or ../ and if so run this function */
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: "a",
					path: new URL(
						args.path,
						"https://unpkg.com" + args.resolveDir + "/"
					).href,
				}
			})
      
			/* Handle main file of a module.  Regex fliter for finding a 
			root pacakge */
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`,
				}
			})

			
		},
	}
}
