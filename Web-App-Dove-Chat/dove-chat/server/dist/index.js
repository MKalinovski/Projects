"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var db_1 = require("./db/db");
var app = (0, express_1.default)();
var corsOpts = {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOpts));
// Endpoint to get assistance data
app.get("/v2/assistance", function (req, res) {
    // res.status(500).end();
    // return;
    var sampleAssistanceResponse = (0, db_1.readJsonFile)("./db/assistance.json");
    res.json(sampleAssistanceResponse);
});
// Endpoint to suppress assistance
app.post("/v2/assistance/suppress", function (req, res) {
    // res.status(500).end();
    // return;
    // Do whatever logic you need to suppress assistance
    var assistanceData = (0, db_1.readJsonFile)("./db/assistance.json");
    assistanceData.supressed = true;
    (0, db_1.writeToJson)("./db/assistance.json", assistanceData);
    res.status(200).end();
});
app.post('/v1/register', function (req, res) {
    var registerPayload = req.body;
    var registeredUsers = (0, db_1.readJsonFile)("./db/users.json");
    var validationUsername = registeredUsers.data.find(function (validation) { return validation.username === registerPayload.username; });
    var validationEmail = registeredUsers.data.find(function (validation) { return validation.email === registerPayload.email; });
    if (validationUsername || validationEmail) {
        if (validationUsername && validationEmail) {
            console.log("Error: User with that username and email already exists");
            res.json({ success: false, validationfailed: 'both' });
            res.status(200).end();
        }
        else if (validationUsername) {
            console.log("Error: User with that username already exists");
            res.json({ success: false, validationfailed: 'username' });
            res.status(200).end();
        }
        else if (validationEmail) {
            console.log("Error: User with that email already exists");
            res.json({ success: false, validationfailed: 'email' });
            res.status(200).end();
        }
    }
    else {
        registerPayload.userID = registeredUsers.nextUserID;
        registeredUsers.nextUserID += 1;
        registeredUsers.data.push(registerPayload);
        (0, db_1.writeToJson)("./db/users.json", registeredUsers);
        res.json({ success: true });
        res.status(200).end();
    }
});
app.post('/v1/login', function (req, res) {
    var loginPayload = req.body;
    var registeredUsers = (0, db_1.readJsonFile)("./db/users.json");
    var loginValidation = registeredUsers.data.find(function (validation) { return validation.username === loginPayload.username && validation.password === loginPayload.password; });
    if (loginValidation) {
        var token = {
            userID: loginValidation.userID,
            token: Math.random()
        };
        var tokens = (0, db_1.readJsonFile)("./db/tokens.json");
        tokens.data.push(token);
        console.log(tokens);
        (0, db_1.writeToJson)("./db/tokens.json", tokens);
        res.json({ success: true, token: token.token });
        res.status(200).end();
    }
    else if (registeredUsers.data.find(function (validation) { return validation.username === loginPayload.username && validation.password !== loginPayload.password; })) {
        res.json({ success: false, validationfailed: 'password' });
    }
    else {
        res.json({ success: false, validationfailed: 'username' });
    }
});
// Start the server
app.listen(4000, function () {
    console.log("Server listening on port 4000");
});
//# sourceMappingURL=index.js.map