let line = "'''text''' becomes <b>text</b> (three single quotes)";
let regexName = /'''(.*)'''/g;


console.log(line.replace(regexName, m=> "<i> " + Array.from(m).splice(3, m.length-6).join('') + " <\\i>"));
