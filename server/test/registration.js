var chai = require('chai');  
var expect = chai.expect;    
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

// First Title
describe('API /registration',() => {
    // Sign Up
    describe('test /signup',() => {
        it('create user', function (done) {
            this.timeout(10000)
            chai.request('http://localhost:3000')
            .post('/registration/signup')
            .send({
                username: 'yosuasugiarto',
                email: 'yosuasugiarto@gmail.com',
                password: 'yosua12345'
            })
            .end((err,res) => {
                if(!err){
                    expect(res).to.have.status(200)
                }
                done()
            })
        })
    })

    // describe('test /login',()=>{
    //     it('login user', function(done){
    //         this.timeout(10000)
    //         chai.request('http://localhost:3000')
    //         .post('/registration/login')
    //         .send({
    //             username: 'Erwin',
    //             password: '12345'
    //         })
    //         .end((err,res)=>{
    //             if(!err){
    //                 expect(res).to.have.status(200)
    //                 expect(res.body).to.have.property('token')
    //             }else{
    //                 console.log(err)
    //             }
    //             done()
    //         })
    //     })
    // })
})
