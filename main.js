define(function (require) {
    "use strict";

    var CommandManager  = brackets.getModule("command/CommandManager"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        Menus           = brackets.getModule("command/Menus"),
        fsImpl          = brackets.getModule("fileSystemImpl");


    // Function to run when the menu item is clicked
    function handleHelloWorld() {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange("Hello, world!", insertionPos);
        }
    }

    function wrapFs() {
        // TODO: Wrap the native file system and bind socket-io-fs.
    }


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "helloworld.writehello";   // package-style naming to avoid collisions
    CommandManager.register("Hello World 2", MY_COMMAND_ID, handleHelloWorld);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(MY_COMMAND_ID);

    if (fsImpl._setDialogs) {
        // This means we are running in hosted Brackets and socket-io-fs is already bound.
        // We still have to set the dialogs.
        fsImpl._setDialogs(require("./lib/open-dialog"), require("./lib/save-dialog"));
    } else {
        // We are running on native OS shell.

        wrapFs();
    }
});
