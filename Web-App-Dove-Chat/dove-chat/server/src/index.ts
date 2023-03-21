import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import { readJsonFile, writeToJson } from "./db/db";
import { StringLiteral } from "typescript";

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(express.json());
app.use(cors(corsOpts));

export interface Assistance {
  key: "profile" | "services" | "availability";
  fulfilled: boolean;
}

export interface AssistanceResponse {
  items: Assistance[] | null;
  supressed: boolean;
}

// Endpoint to get assistance data
app.get("/v2/assistance", (req: Request, res: Response) => {
  // res.status(500).end();
  // return;
  const sampleAssistanceResponse = readJsonFile<AssistanceResponse>(
    "./db/assistance.json"
  );

  res.json(sampleAssistanceResponse);
});

// Endpoint to suppress assistance
app.post("/v2/assistance/suppress", (req: Request, res: Response) => {
  // res.status(500).end();
  // return;
  // Do whatever logic you need to suppress assistance
  const assistanceData = readJsonFile<AssistanceResponse>(
    "./db/assistance.json"
  );
  assistanceData.supressed = true;
  writeToJson("./db/assistance.json", assistanceData);
  res.status(200).end();
});


interface RegisterForm {
  userID: number;
  username: string;
  password: string;
  email: string;
}

interface RegisteredUsers {
  nextUserID: number;
  data: RegisterForm[];
}

interface RegisterResponse {
  success: boolean;
  validationfailed?: 'username' | 'email' | 'both';
}

app.post('/v1/register',(req: Request, res: Response<RegisterResponse>) => {
  const registerPayload = req.body as RegisterForm;
  const registeredUsers = readJsonFile<RegisteredUsers>("./db/users.json");
  const validationUsername = registeredUsers.data.find((validation) => validation.username === registerPayload.username);
  const validationEmail = registeredUsers.data.find((validation) => validation.email === registerPayload.email);
  if (validationUsername || validationEmail) {
    if (validationUsername && validationEmail) {
      console.log("Error: User with that username and email already exists")
      res.json({success: false, validationfailed: 'both'})
      res.status(200).end();
    } else if (validationUsername) {
      console.log("Error: User with that username already exists")
      res.json({success: false, validationfailed: 'username'})
      res.status(200).end();
    } else if (validationEmail) {
      console.log("Error: User with that email already exists")
      res.json({success: false, validationfailed: 'email'})
      res.status(200).end();
    }
  } else {
    registerPayload.userID = registeredUsers.nextUserID;
    registeredUsers.nextUserID += 1;
    registeredUsers.data.push(registerPayload);
    writeToJson("./db/users.json", registeredUsers);
    res.json({success: true})
    res.status(200).end();
  }
});

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: number;
  validationfailed?: 'username' | 'password'
}

interface Token {
  userID: number;
  token: number;
}

interface Tokens {
  data: Token[];
}


app.post('/v1/login',(req, res: Response<LoginResponse>) => {
  const loginPayload = req.body as LoginRequest;
  const registeredUsers = readJsonFile<RegisteredUsers>("./db/users.json");
  const loginValidation = registeredUsers.data.find(validation => validation.username === loginPayload.username && validation.password === loginPayload.password)
  if (loginValidation) {
    const token = {
      userID: loginValidation.userID,
      token: Math.random()};
    const tokens = readJsonFile<Tokens>("./db/tokens.json");
    tokens.data.push(token);
    console.log(tokens);
    writeToJson("./db/tokens.json", tokens);
    res.json({success: true, token: token.token});
    res.status(200).end();
  } else if (registeredUsers.data.find(validation => validation.username === loginPayload.username && validation.password !== loginPayload.password)){
    res.json({success: false, validationfailed: 'password'})
  } else {
    res.json({success: false, validationfailed: 'username'})
  }
})

// Start the server
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
