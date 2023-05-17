const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const dotenv = require("dotenv").config();

Enzyme.configure({ adapter: new Adapter() });

//? ==============================================
const app = require("../index");
const db = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	options: {
		encrypt: true,
		trustServerCertificate: true,
	},
};
//? ==============================================

describe("Tests for server/index.js", () => {
	let dbStub;

	beforeEach(() => {
		dbStub = sinon.stub(db, "query");
	});
});
