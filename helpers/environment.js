const environment = {};
environment.Production = {
    port: 4000,
    envName: "Production"
};
environment.Developer = {
    port: 4500,
    envName: "Developer"
};

const environmentVariable = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "Developer";
console.log("Type of environment[environmentVariable]:", environmentVariable);
console.log("Value of environment[environmentVariable]:", environment[environmentVariable]);

let environmentExport = environment[environmentVariable] || environment['Developer'];

module.exports = environmentExport;
