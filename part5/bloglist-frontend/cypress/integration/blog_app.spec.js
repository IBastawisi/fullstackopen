/* eslint-disable no-undef */
describe('Blog app', function () {
  Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedinUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  Cypress.Commands.add('createBlog', (blog) => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: blog,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedinUser')).token}`
      }
    })
    cy.visit('http://localhost:3000')
  })

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Ibrahim El-bastawisi',
      username: 'ibastawisi',
      password: 'itisme'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('login form can be opened', function () {
    cy.contains('Login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('input[name="username"]').type('ibastawisi')
      cy.get('input[name="password"]').type('itisme')
      cy.get('.login-container button').click()

      cy.contains('Ibrahim El-bastawisi logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('input[name="username"]').type('ibastawisi')
      cy.get('input[name="password"]').type('wrong')
      cy.get('.login-container button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ibastawisi', password: 'itisme' })
    })

    it('a new blog can be created', function () {
      cy.contains('Add new Blog').click()
      cy.get('input[name="title"]').type('React patterns')
      cy.get('input[name="author"]').type('Michael Chan')
      cy.get('input[name="url"]').type('https://reactpatterns.com/')
      cy.contains('Add').click()

      cy.contains('React patterns')
    })

    describe('and several Blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ 'likes': 7, 'title': 'React patterns', 'author': 'Michael Chan', 'url': 'https://reactpatterns.com/' })
        cy.createBlog({ 'likes': 5, 'title': 'Go To Statement Considered Harmful', 'author': 'Edsger W. Dijkstra', 'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' })
        cy.createBlog({ 'likes': 12, 'title': 'Canonical string reduction', 'author': 'Edsger W. Dijkstra', 'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html' })
      })

      it('one of those can be liked', function () {
        cy.contains('React patterns').parent()
          .contains('View').click()
        cy.contains('React patterns').parent()
          .contains('Add like')
          .click()

        cy.contains('Likes')
          .contains('8')
      })

      it('one of those can be deleted', function () {
        cy.contains('Go To Statement Considered Harmful').parent()
          .contains('DELETE Blog').click()
        cy.get('html').should('not.contain', 'Go To Statement Considered Harmful')
      })

      it('blogs are ordered by likes', function () {
        cy.get('.blog').then(($blog) => {
          $blog.each(function(index) {
            cy.wrap($blog[index]).contains('View').click()

          })
        })
        cy.get('.blog').then(($blog) => {
          $blog.each(function() {
            cy.expect(+this.querySelector('.like-count').textContent).to.be.greaterThan(this.nextElementSibling && +this.nextElementSibling .querySelector('.like-count').textContent || -1)
          })
        })
      })
    })
  })
})