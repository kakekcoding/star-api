const httpStatus = require('http-status');
const { chai, chaiHttp, server, should } = require('../test_config');
const UserModel = require('../../model/user_model');

setTimeout(() => {
    run()
}, 5000);

describe('Authentication', () => {
    // before all clear database
    before(async () => {
        await UserModel.deleteMany({});
    });

    const testData = {
        full_name: 'Bad Cat',
        username: 'badcat',
        email: 'bad.cat@meow.com',
        phone_num: '62895000000',
        password: 'freshfish'
    };

    describe('POST /register', () => {
        it('should send validation error', (done) => {
            chai.request(server).post('/api/v1/auth/user/register')
                .send({ email: testData.email })
                .end((err, res) => {
                    res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                });
        });

        it('should register user', (done) => {
            chai.request(server).post('/api/v1/auth/user/register')
                .send(testData)
                .end((err, res) => {
                    res.should.have.status(httpStatus.CREATED);
                    done();
                });
        });
    });

    describe('POST /authorize', () => {
        it('should send validation error', (done) => {
            chai.request(server).post('/api/v1/auth/user/authorize')
                .send({ username: testData.username })
                .end((err, res) => {
                    res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                });
        });

        it('should send login failed', (done) => {
            chai.request(server).post('/api/v1/auth/user/authorize')
                .send({ username: 'john.doe', password: 'johnsecret' })
                .end((err, res) => {
                    res.should.have.status(httpStatus.UNAUTHORIZED);
                    done();
                });
        });

        it('should user logged', (done) => {
            chai.request(server).post('/api/v1/auth/user/authorize')
                .send({ username: testData.username, password: testData.password })
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    done();
                });
        });
    });
});