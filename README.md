# Student-books-React

This is my React project for the React course at SoftUni.

The basic idea is for users to be able to see all Student books in one place, to find the ones that they need, to check the prices, to make buying lists.

The project is build using ExpressJS for the back-end server and React for the front-end logic, MongoDB for storing the data and JSON Web Token for authentication and security.

The users are provided with different features, depending on their status:
- Anonymous: 
	- can see all the Student books on the homepage
	- can register or login
- Logged in:
	- can see details for every Student book
	- can create lists and add Student books in them
	- can see all of his/her lists and remove Student books from them
	- can delete his/her lists
- Admin:
	- can create, update and delete Student books

