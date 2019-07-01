function main(browser, commands) {
    for (let i = 0; i < commands.length; i++){
        if (commands[i] === "Clear History and Cache"){
            browser["Open Tabs"] = [];
            browser["Recently Closed"] = [];
            browser["Browser Logs"] = [];
        } else{
            let [command, site] = commands[i].split(" ");
            if (command === "Open"){
                browser["Open Tabs"].push(site);
                browser["Browser Logs"].push("Open " + site);
            } else if (command === "Close"){
                let index = browser["Open Tabs"].indexOf(site);
                if (index > -1){
                    browser["Open Tabs"].splice(index, 1);
                    browser["Recently Closed"].push(site);
                    browser["Browser Logs"].push("Close " + site);
                }
            }
        }

    }


    console.log(browser["Browser Name"]);
    console.log(`Open Tabs: ${browser["Open Tabs"].join(", ")}`);
    console.log(`Recently Closed: ${browser["Recently Closed"].join(", ")}`);
    console.log(`Browser Logs: ${browser["Browser Logs"].join(", ")}`);

}

main({"Browser Name":"Google Chrome","Open Tabs":["Facebook","YouTube","Google Translate"],
        "Recently Closed":["Yahoo","Gmail"],
        "Browser Logs":["Open YouTube","Open Yahoo","Open Google Translate","Close Yahoo","Open Gmail","Close Gmail","Open Facebook"]},
    ['Close Facebook', 'Open StackOverFlow', 'Open Google']);