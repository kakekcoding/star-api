const httpStatus = require('http-status');
const { chai, server } = require('../test_config');
const JobApplicantModel = require('../../model/job_applicant_model');

// before all clear database
after(async () => {
    await JobApplicantModel.deleteMany({});
});

describe('Job Applicant', () => {
    const userData = {
        username: 'badcat',
        password: 'freshfish'
    };

    const testData = {
        full_name: 'John Doe',
        age: 25,
        email: 'john.doe@test.net',
        phone_num: '62870889911',
        address: 'Jl. Raya ringroad selatan',
        served: 'Office Boy',
        image: 'https://robohash.org/default_image?set=set4'
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

    describe('POST /job_applicant', () => {
        it('should send validation error job applicant', (done) => {
            chai.request(server).post('/api/v1/job_applicant/create')
                .send({ full_name: testData.full_name, age: testData.age })
                .end((err, res) => {
                    res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                });
        });

        it('should do success create new job applicant', (done) => {
            chai.request(server).post('/api/v1/job_applicant/create')
                .send(testData).end((err, res) => {
                    res.should.have.status(httpStatus.CREATED);
                    res.body.should.have.property('message').eql('job applicant created');
                    testData.id = res.body.result._id;
                    done();
                });
        });

        it('should send conflict job applicant', (done) => {
            chai.request(server).post('/api/v1/job_applicant/create')
                .send(testData).end((err, res) => {
                    res.should.have.status(httpStatus.CONFLICT);
                    done();
                });
        });
    });

    describe('GET /job_applicant', () => {
        it('should send forbidden when user not logged', (done) => {
            chai.request(server).get('/api/v1/job_applicant')
                .end((err, res) => {
                    res.should.have.status(httpStatus.FORBIDDEN);
                    done();
                });
        });

        it('should success get all job applicant', (done) => {
            chai.request(server).get('/api/v1/job_applicant')
                .set('x-access-token', userData.token)
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    done();
                });
        });

        it('should success get job applicant by _id', (done) => {
            chai.request(server).get('/api/v1/job_applicant/' + testData.id)
                .set('x-access-token', userData.token)
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    done();
                });
        });
    });

    describe('PUT /job_applicant/update', () => {
        it('should send forbidden when user not logged in', (done) => {
            chai.request(server).put('/api/v1/job_applicant/update/' + testData.id)
                .send({ full_name: 'Joy' })
                .end((err, res) => {
                    res.should.have.status(httpStatus.FORBIDDEN);
                    done();
                });
        });

        it('should send 404 when id not found', (done) => {
            chai.request(server)
                .put('/api/v1/job_applicant/update/607f1f77bcf86cd799439011')
                .set('x-access-token', userData.token)
                .send({ full_name: 'Joy' })
                .end((err, res) => {
                    res.should.have.status(httpStatus.NOT_FOUND);
                    done();
                });
        });

        it('should send success', (done) => {
            chai.request(server).put('/api/v1/job_applicant/update/' + testData.id)
                .set('x-access-token', userData.token).send({ full_name: 'Joy' })
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    done();
                });
        });
    });

    describe('DELETE /job_applicant/delete', () => {
        it('should send forbidden when user not logged in', (done) => {
            chai.request(server).delete('/api/v1/job_applicant/delete/' + testData.id)
                .end((err, res) => {
                    res.should.have.status(httpStatus.FORBIDDEN);
                    done();
                });
        });

        it('should send 404 when id not found', (done) => {
            chai.request(server)
                .delete('/api/v1/job_applicant/delete/607f1f77bcf86cd799439011')
                .set('x-access-token', userData.token)
                .end((err, res) => {
                    res.should.have.status(httpStatus.NOT_FOUND);
                    done();
                });
        });

        it('should send success when data deleted', (done) => {
            chai.request(server).delete('/api/v1/job_applicant/delete/' + testData.id)
                .set('x-access-token', userData.token)
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    done();
                });
        });
    });
});