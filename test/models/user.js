module.exports = function (db) {
    describe('Creating a user', function () {
        'use strict';

        it('should insert and read a user', function (done) {
            var user = db.User.build({
                email: 'test@hh.fi'
            });
            user.save().then(function (obj) {
                db.User.find({ where: { email: 'test@hh.fi' }})
                    .then(function (user) {
                        user.should.have.property('email', 'test@hh.fi');
                        done();
                    });
            })
        });
    });
};