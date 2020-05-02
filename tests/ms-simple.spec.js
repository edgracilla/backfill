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
  it(`should - expand 'createdBy' ref field in 'comment' document`, (done) => {
    // done()

    commentsSvc.read('comment1', {}, { expand: 'createdByxxxxxxx'})
      .then(ret => {
        console.log(ret)
      
        // expect(ret.createdBy._id).toBeDefined()
        done()
      })
      .catch(err => {
        should.ifError(err)
      })
  })

  // it(`should - expand 'xx' ref field in 'user' document`, (done) => {
  //   let doc = _cloneDeep(mockSvc.users[1])

  //   bfUser.expand(doc, 'nested.user')
  //     .then(ret => {
  //       console.log(ret)
      
  //       // expect(ret.createdBy._id).toBeDefined()
  //       done()
  //     })
  //     .catch(err => {
  //       should.ifError(err)
  //     })
  // })
})