import devLogger from "./devLogger";
import buildLogger from "./buildLogger";

let logger = null;

if(process.env.NODE_ENV === "development"){
    logger = devLogger();
}else{
    logger = buildLogger();
}

module.exports = logger;