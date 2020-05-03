const should = require('should')


const Broker = require('./mock-microservice/broker')
const UserSvc = require('./mock-microservice/svc-users')
const PostsSvc = require('./mock-microservice/svc-posts')
const CommentsSvc = require('./mock-microservice/svc-comments')

const broker = new Broker()

const usersSvc = new UserSvc(broker)
const postsSvc = new PostsSvc(broker)
const commentsSvc = new CommentsSvc(broker)

describe(`ms simple test`, () => {
  // describe(`comments`, () => {
  //   it(`should - expand 'createdBy'`, (done) => {
  //     commentsSvc.read('comment1', {}, { expand: 'createdBy'})
  //       .then(ret => {
  //         expect(ret.createdBy._id).toBeDefined()
  //         done()
  //       })
  //       .catch(err => {
  //         should.ifError(err)
  //       })
  //   })
  // })

  describe(`posts`, () => {
    // it(`should - expand 'createdBy`, (done) => {
    //   postsSvc.read('post1', {}, { expand: 'createdBy'})
    //     .then(ret => {
    //       expect(ret.createdBy._id).toBeDefined()
    //       done()
    //     })
    //     .catch(err => {
    //       should.ifError(err)
    //     })
    // })

    it(`should - expand 'comments`, (done) => {
      postsSvc.read('post2', {}, { expand: 'comments,createdBy'})
        .then(ret => {
          expect(ret.comments[0]._id).toBeDefined()
          expect(ret.comments[1]._id).toBeDefined()
          expect(ret.createdBy._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })
  })

  // describe(`users`, () => {
  //   it(`should - expand 'nested.user'`, (done) => {
  //     usersSvc.read('user1', {}, { expand: 'nested.user'})
  //       .then(ret => {
  //         expect(ret.nested.user._id).toBeDefined()
  //         done()
  //       })
  //       .catch(err => {
  //         should.ifError(err)
  //       })
  //   })
  // })
})