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
  describe(`comments`, () => {
    it(`should - expand 'createdBy'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy'})
        .then(ret => {
          expect(ret.createdBy._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'createdBy.connections'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy.connections'})
        .then(ret => {
          expect(ret.createdBy.connections[0]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'createdBy.nested.user'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy.nested.user'})
        .then(ret => {
          expect(ret.createdBy.nested.user._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'createdBy.subDoc.post'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy.subDoc.post'})
        .then(ret => {
          expect(ret.createdBy.subDoc.post._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'createdBy.subDocArr*post'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy.subDocArr*post'})
        .then(ret => {
          expect(ret.createdBy.subDocArr[0].post._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'createdBy.subDocArr*post.createdBy'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy.subDocArr*post.createdBy'})
        .then(ret => {
          expect(ret.createdBy.subDocArr[0].post.createdBy._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })
  })

  describe(`posts`, () => {
    it(`should - expand 'createdBy'`, (done) => {
      postsSvc.read('post2', {}, { expand: 'createdBy'})
        .then(ret => {
          expect(ret.createdBy._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'comments'`, (done) => {
      postsSvc.read('post2', {}, { expand: 'comments'})
        .then(ret => {
          expect(ret.comments[0]._id).toBeDefined()
          expect(ret.comments[1]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'comments,createdBy'`, (done) => {
      postsSvc.read('post2', {}, { expand: 'comments,createdBy'})
        .then(ret => {
          expect(ret.createdBy._id).toBeDefined()
          expect(ret.comments[0]._id).toBeDefined()
          expect(ret.comments[1]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'comments*createdBy`, (done) => {
      postsSvc.read('post2', {}, { expand: 'comments*createdBy'})
        .then(ret => {
          expect(ret.comments[0].createdBy._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'comments*createdBy.nested.user`, (done) => {
      postsSvc.read('post2', {}, { expand: 'comments*createdBy.nested.user'})
        .then(ret => {
          expect(ret.comments[0].createdBy.nested.user._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })
  })

  describe(`users`, () => {
    it(`should - expand 'connections'`, (done) => {
      usersSvc.read('user1', {}, { expand: 'connections'})
        .then(ret => {
          expect(ret.connections[0]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'nested.user'`, (done) => {
      usersSvc.read('user1', {}, { expand: 'nested.user'})
        .then(ret => {
          expect(ret.nested.user._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'subDoc.post'`, (done) => {
      usersSvc.read('user1', {}, { expand: 'subDoc.post'})
        .then(ret => {
          expect(ret.subDoc.post._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'subDocArr*post'`, (done) => {
      usersSvc.read('user1', {}, { expand: 'subDocArr*post'})
        .then(ret => {
          expect(ret.subDocArr[0].post._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'subDocArr*post.comments'`, (done) => {
      usersSvc.read('user1', {}, { expand: 'subDocArr*post.comments'})
        .then(ret => {
          expect(ret.subDocArr[0].post._id).toBeDefined()
          expect(ret.subDocArr[0].post.comments[0]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })
  })
})