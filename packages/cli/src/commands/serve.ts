import path from "path"
import { Command } from "commander"
import { serve } from "@scratchpadjs/local-api"

/* isProduction boolean flag will scan the js file for 
'process.env.NODE_ENV' and replace it with 'production'.  This will
tell our CLI which build file to use dependingon if in development or 
on a users computer */
const isProduction = process.env.NODE_ENV === "production"

/* using commander library the <> indicate a required value, 
[] indicate an optional value */
export const serveCommand = new Command()
	.command("serve [filename]")
	.description("Open a file for editing")
	.option("-p, --port <number>", "port to run server on", "4005")
	.action(async (filename = "scratches.js", options: { port: string }) => {
		try {
			const dir = path.join(process.cwd(), path.dirname(filename))
			await serve(
				parseInt(options.port),
				path.basename(filename),
				dir,
				!isProduction
			)
			console.log(
				`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
			)
		} catch (err: any) {
			if (err.code === "EADDRINUSE") {
				console.log("Port is already in use.  Try running on different port.")
			} else {
				console.log("Here is the problem:", err.message)
			}
			process.exit(1)
		}
	})
