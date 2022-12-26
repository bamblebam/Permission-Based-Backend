## Steps to run the application:

1. Clone the repository.
2. Run `npm i`
3. Run `npm run dev`

Or

1. Clone the repository.
2. Run `docker-compose build   `
3. Run `docker-compose up server `

---

## API Docs

https://documenter.getpostman.com/view/12462704/2s8Z6vZuXf

1. The User model is the base User.
2. The permissions model contains the permissions for the users.
3. The Employee model consists of the employees made on top of the user.

---

# Write a paragraph on how you would design a better permissions-based system for our backend

Currently we are using a permission based system where each permision is custom which creates lots of issues when creating validators. We need a different validator for each table that we want to put the permissions on and having multiple permission validations for a single API route is complex and messy.

We can only have either resource-id based or user-id based permissions right now which is a problem.

```
http://localhost:3000/api/employee/delete/2
```

In the above route we can only check the users permission on the basis of whether he has the permission to delete the employees from the company that employee with the id 2 belongs to. We also need to provide the column as a middleware parameter to check whether the user has permission or not.

An alternative to that would be to just go through all the permissions of the user but it would slow down our response times.

A better alternative to the current solution would be to use Role Based Access control where we predefine some permissions and attach it to a specific role which can then be assigned to a user. Each table could have a set of permissions pertaining to the GET, POST, PUT and DELETE method and one could define roles on the basis of this.

The roles could also be linked to an indexed resource-id (right now we are just using the id field as a resource-id) like the Company column in the Employee Table.

So for example we can have an Employee table with employees belonging to various companies and for each company we can have the permissions.

The permissions wouldn't be completely dynamic and customizable but it will be much more standardized.
