# scratch-pad
Browser based javascript coding environment


To Publish Changes: CLI - lerna publish
>> lerna was used in this app.

CLI Installation: - npx scratchpadjs serve

should run the app in http://localhost:4005/ 


Use

+Code button: This will add a js code editing environment cell to the screen.  You can add as many as you want and organize them with the up/down arrows on the top right of the cell.  X will remove the cell.

+Text button: You can also add a text cell markdown for notes.  Clicking on the cell enters edit mode, clicking offscreen will put in display mode.

The +Code and +Text buttons will disappear after initializing a cell.  They will reappear if you hover above or below any of the cells.

You can import react as normal as well as most all other npm packages.

A built in show() function allows you to execute code to the console.
 i.e. 
  show(<h1>hello world <h1>)    will  display >    Hello World
  
Beautify code format cleanup is available by clicking the "Format" button that appears while hovering in the code box.

FUTURE IMPROVEMENTS:
