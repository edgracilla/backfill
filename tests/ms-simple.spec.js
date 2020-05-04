const should = require('should')


const Broker = require('./mock-microservice/broker')
const UserSvc = require('./mock-microservice/svc-users')
const PostsSvc = require('./mock-microservice/svc-posts')
const CommentsSvc = require('./mock-microservice/svc-comments')

const broker = new Broker()

const usersSvc = new UserSvc(broker)
const postsSvc = new PostsSvc(broker)
const commentsSvc = new CommentsSvc(broker)

describe(`backfire test`, () => {
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

    it(`should - expand 'createdBy.subDocArr*post.comments'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy.subDocArr*post.comments'})
        .then(ret => {
          expect(ret.createdBy.subDocArr[0].post.comments[0]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'createdBy.connections*connections'`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy.connections*connections'})
        .then(ret => {
          expect(ret.createdBy.connections[0].connections[0]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand combined above expands`, (done) => {
      commentsSvc.read('comment1', {}, { expand: 'createdBy,createdBy.connections,createdBy.nested.user,createdBy.subDoc.post,createdBy.subDocArr*post,createdBy.subDocArr*post.createdBy,createdBy.subDocArr*post.comments,createdBy.connections*connections'})
        .then(ret => {
          expect(ret.createdBy._id).toBeDefined()
          expect(ret.createdBy.connections[0]._id).toBeDefined()
          expect(ret.createdBy.nested.user._id).toBeDefined()
          expect(ret.createdBy.subDoc.post._id).toBeDefined()
          expect(ret.createdBy.subDocArr[0].post._id).toBeDefined()
          expect(ret.createdBy.subDocArr[0].post.createdBy._id).toBeDefined()
          expect(ret.createdBy.subDocArr[0].post.comments[0]._id).toBeDefined()
          expect(ret.createdBy.connections[0].connections[0]._id).toBeDefined()
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

    it(`should - expand 'comments*createdBy.nested.user.connections`, (done) => {
      postsSvc.read('post2', {}, { expand: 'comments*createdBy.nested.user.connections'})
        .then(ret => {
          expect(ret.comments[0].createdBy.nested.user.connections[0]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'comments*createdBy.nested.user.connections*.nested.user`, (done) => {
      postsSvc.read('post1', {}, { expand: 'comments*createdBy.nested.user.connections*.nested.user'})
        .then(ret => {
          expect(ret.comments[0].createdBy.nested.user.connections[0].nested.user._id).toBeDefined()
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

    it(`should - expand 'subDocArr*post.comments*.createdBy'`, (done) => {
      usersSvc.read('user1', {}, { expand: 'subDocArr*post.comments*.createdBy'})
        .then(ret => {
          expect(ret.subDocArr[0].post._id).toBeDefined()
          expect(ret.subDocArr[0].post.comments[0].createdBy._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    it(`should - expand 'subDocArr*post.comments*.createdBy.connections'`, (done) => {
      usersSvc.read('user1', {}, { expand: 'subDocArr*post.comments*.createdBy.connections'})
        .then(ret => {
          expect(ret.subDocArr[0].post._id).toBeDefined()
          expect(ret.subDocArr[0].post.comments[0].createdBy.connections[0]._id).toBeDefined()
          done()
        })
        .catch(err => {
          should.ifError(err)
        })
    })

    
  })
})