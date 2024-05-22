# books-backend-task-hossain-shariar-akash

## Description

This task has given by RoseTech Solutions Ltd. to develop a book management system in purpose of interview exam.

## Application Details

- The API will provide a list of books and authors that can be created
  using an endpoint. It will also show only one book/author and their
  details.
- The details of the books and authors will include names, publication
  dates, and other relevant information.
- Each book will have a list of genres it belongs to.
- Authentication is required. Some authenticated users will be able to
  create a book/author entry. Other guest users or logged-in normal users
  will only be able to see the list or an individual detail of a book/author.

## Application Analysis

Here is my Properties and Use Case analysis link in eraser.io -> [URL](https://app.eraser.io/workspace/nP1Ags6eMW4Jpx4b3WYV?origin=share)

## Prerequisites

- Node.js
- Prisma
- Apollo Server
- Express Js

## How to use

- Run `yarn install` to install the dependencies
- Run `npx prisma generate` to generate the database schema
- Run `npx prisma db push` to push the database schema
- Run `yarn dev` to start the development server
- Run `yarn start` to start the production server
- Go to `http://localhost:4000/` to view Apollo Graphql UI. Or you can use Insomia/Postman to play with data.

## GraphQL Operational endpoints

Server - http://localhost:4000/ [You can change the port in .env file]

Queries - login, getauthors, getauthor [for indivisual author], getbooks, getbook [for individual book]

Mutations - register, addauthor, addbook

## Flow

- To view any data, user should be able to login.
- For authentication, user should be logged in with email and password in login query.
- For registration, user should be register with email, password, name and role in register mutation. There are two roles -> Normal and Special
- To add author or book, user should be logged in and role should be SPECIAL.
- To add book user need to pick an ISO date format in addbook mutation. but the field is optional.

## Security Implementation

- In register mutation, password is hashed using argon2.
- In login query, password is compared using argon2.
- Used JWT for authentication.
- Added middleware context to verify token for each query and mutation.

## Consideration

- Added .env file in the github for making easy setup.
- Made many fields optional.
