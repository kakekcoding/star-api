const httpStatus = require('http-status');
const { chai, server } = require('../test_config');
const JAStatusModel = require('../../model/ja_status_model');

// before all clear database
after(async () => {
	await JAStatusModel.deleteMany({});
});

describe('Job Applicant Status', () => {
	const userData = {
		username: 'badcat',
		password: 'freshfish'
	};

	const testData = {
		status: 'reviewing'
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

	describe('POST /ja/status/create', () => {
		it('should do forbidden because user not logged ind', (done) => {
			chai.request(server).post('/api/v1/ja/status/create')
				.send(testData).end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should do success create new job applicant status', (done) => {
			chai.request(server).post('/api/v1/ja/status/create')
				.set('x-access-token', userData.token)
				.send(testData).end((err, res) => {
					res.should.have.status(httpStatus.CREATED);
					res.body.should.have.property('message').eql('status created');
					testData.id = res.body.result._id;
					done();
				});
		});
	});

	describe('GET /ja/status', () => {
		it('should send forbidden when user not logged', (done) => {
			chai.request(server).get('/api/v1/ja/status')
				.end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should success get all job applicant status', (done) => {
			chai.request(server).get('/api/v1/ja/status')
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					done();
				});
		});
	});

	describe('PUT /ja/status/update/:id', () => {
		it('should send forbidden when user not logged in', (done) => {
			chai.request(server).put('/api/v1/ja/status/update/' + testData.id)
				.send({ status: 'success' })
				.end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should send 404 when id not found', (done) => {
			chai.request(server)
				.put('/api/v1/ja/status/update/607f1f77bcf86cd799439011')
				.set('x-access-token', userData.token)
				.send({ status: 'success' })
				.end((err, res) => {
					res.should.have.status(httpStatus.NOT_FOUND);
					done();
				});
		});

		it('should send success', (done) => {
			chai.request(server).put('/api/v1/ja/status/update/' + testData.id)
				.set('x-access-token', userData.token).send({ status: 'success' })
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					done();
				});
		});
	});

	describe('DELETE /ja/status/delete/:id', () => {
		it('should send forbidden when user not logged in', (done) => {
			chai.request(server).delete('/api/v1/ja/status/delete/' + testData.id)
				.end((err, res) => {
					res.should.have.status(httpStatus.FORBIDDEN);
					done();
				});
		});

		it('should send 404 when id not found', (done) => {
			chai.request(server)
				.delete('/api/v1/ja/status/delete/607f1f77bcf86cd799439011')
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.NOT_FOUND);
					done();
				});
		});

		it('should send success when data deleted', (done) => {
			chai.request(server).delete('/api/v1/ja/status/delete/' + testData.id)
				.set('x-access-token', userData.token)
				.end((err, res) => {
					res.should.have.status(httpStatus.OK);
					done();
				});
		});
	});
});