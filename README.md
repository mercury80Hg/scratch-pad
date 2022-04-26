# scratch-pad

Browser based javascript coding environment

#### Notes:
To Publish Changes: CLI - `lerna publish`

> > lerna was used in this app.

***CLI Installation***: `npm install scratchpadjs -g`

***Initialize***: `npx scratchpadjs serve yourfilename.js`

The app should then run in http://localhost:4005/

### How to Use

**+Code button**: This will add a js code editing environment cell to the screen. You can add as many as you want and organize them with the up/down arrows on the top right of the cell. X will remove the cell.

**+Text button**: You can also add a markdown text cell for notes. Clicking on the cell enters edit mode, clicking outside of the cell box will enter the display mode.

The *+Code* and *+Text* buttons will disappear after initializing the first cell. They will reappear if you *hover* above or below any of the cells.

You can import react as normal as well as most all other npm packages.

A built in `show()` function allows you to execute code to the console.
i.e.

`show(<strong>hello world <strong>)` will display > **Hello World**

**Beautify** is used to cleanup code and is available by clicking the *"Format"* button that appears while hovering in the code box.

## ScratchpadJS

- You can click on any text cell to edit it.

- All of the code in any seperate code cells operate as one. If you declare a variable in one code cell you have access to it in another all the way down.

- You can show any React component, string,number, or anything else by calling the `show` function. This is a function built into this environment. Call `show()` multiple times to show multiple values.

- Re-order or delete cells using the arrow buttons on the top right.

- Additional cells can be created by hovering on the divider between each cell.

All of your changes get saved to the file you opened Scratchpadjs with. So if you ran `npx scratchpadjs serve test.js`, all of the text and code you write will be saved to the **test.js** file.
