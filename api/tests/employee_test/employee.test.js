const httpStatus = require('http-status');
const { chai, server } = require('../test_config');
const EmployeeModel = require('../../model/employee_model');

// after all clear database
after(async () => {
	await EmployeeModel.deleteMany({});
});

describe('Employee', () => {
	const userData = {
		username: 'badcat',
		password: 'freshfish'
	};

	const testData = {
		full_name: 'John Doe',
		email: 'john.doe@test.net',
		phone_num: '62878331232',
		address: 'Jl. Raya seragi makmur',
		position: 'Directure',
		salary: '1000000'
	};

	describe('POST /authorize', () => {
		it('should user logged for job applicant admin', (done) => {
			chai.request(server).post('/api/v1/auth/user/authorize')
				.send(userData)
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					res.body.should.have.property('message').eql('authorized');
					userData.token = res.body.result.token;
					done();
				});
		});
	});

	describe('POST /employee/create', () => {
		it('should do forbidden if user not logged in', (done) => {
			chai.request(server).post('/api/v1/employee/create')
				.send(testData).end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should do errors if send data not completed', (done) => {
			chai.request(server).post('/api/v1/employee/create')
				.set('x-access-token', userData.token)
				.send({ full_name: testData.full_name, email: testData.email, phone_num: testData.phone_num })
				.end((err, res) => {
					res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY);
					res.body.should.have.property('message').eql('unprocessed');
					done();
				});
		});

		it('should do success create new employee', (done) => {
			chai.request(server).post('/api/v1/employee/create')
				.set('x-access-token', userData.token).send(testData)
				.end((err, res) => {
					res.should.have.status(httpStatus.CREATED);
					res.body.should.have.property('message').eql('employee created');
					testData.id = res.body.result._id;
					done();
				});
		});
	});

	describe('GET /employee', () => {
		it('should do forbidden if user not legged in', (done) => {
			chai.request(server).get('/api/v1/employee')
				.end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should do OK if user logged in', (done) => {
			chai.request(server).get('/api/v1/employee')
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					done();
				});
		});

		it('should do 404 if get by id not found', (done) => {
			chai.request(server).get('/api/v1/employee/70791f77bcf8ccd719439012')
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.NOT_FOUND);
					done();
				});
		});

		it('should do bad request if get by id not found', (done) => {
			chai.request(server).get('/api/v1/employee/12345')
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.BAD_REQUEST);
					res.body.should.have.property('message').eql('something wrong');
					done();
				});
		});

		it('should do OK if get by id is found', (done) => {
			chai.request(server).get('/api/v1/employee/' + testData.id)
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					done();
				});
		});
	});

	describe('PUT /employee/update', () => {
		it('should do forbidden if user not logged in', (done) => {
			chai.request(server).put('/api/v1/employee/update/' + testData.id)
				.send({ full_name: 'Erick' }).end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should send 404 when id not found', (done) => {
			chai.request(server)
				.put('/api/v1/employee/update/70791f77bcf8ccd719439012')
				.set('x-access-token', userData.token)
				.send({ full_name: 'Erick' })
				.end((err, res) => {
					res.should.have.status(httpStatus.NOT_FOUND);
					done();
				});
		});

		it('should send success if id found', (done) => {
			chai.request(server).put('/api/v1/employee/update/' + testData.id)
				.set('x-access-token', userData.token).send({ full_name: 'Erick' })
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					done();
				});
		});
	});

	describe('DELETE /employee/delete', () => {
		it('should do forbidden if user not logged in', (done) => {
			chai.request(server).delete('/api/v1/employee/delete/' + testData.id)
				.send({ full_name: 'Erick' }).end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should do 404 when id not found', (done) => {
			chai.request(server)
				.delete('/api/v1/employee/delete/70791f77bcf8ccd719439012')
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.NOT_FOUND);
					done();
				});
		});

		it('should do 500 if get by id not found', (done) => {
			chai.request(server).delete('/api/v1/employee/delete/12345')
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR);
					res.body.should.have.property('message').eql('a problem occurred');
					done();
				});
		});

		it('should do OK when data by id deleted', (done) => {
			chai.request(server).delete('/api/v1/employee/delete/' + testData.id)
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					done();
				});
		});
	});
});
