try {
    throw new RangeError("Invalid range.");
    console.log("This will not be executed.");
} catch (ex) {
    console.log("---------------");
    console.log("Exception object: " + ex);
    console.log("Type: " + ex.name);
    console.log("Message: " + ex.message);
    console.log("Stack: " + ex.stack);
    console.log("---------------");
}