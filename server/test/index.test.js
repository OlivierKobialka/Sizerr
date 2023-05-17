const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

const app = require("../server/index.js");
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

describe("Server", () => {
	let dbStub;

	before(() => {
		dbStub = sinon.stub(db, "query");
	});
	after(() => {
		dbStub.restore();
	});

	it("should return 200 status code", done => {
		
        
    });
});
