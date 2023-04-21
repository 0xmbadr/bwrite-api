<h1 align="center">bWrite API</h1>



### Usage

The API provides the following endpoints:

**Auth**: 

| Description |  Method   |   endpoint  | 
| --- | --- | --- | 
| allow users to signup | `POST` | `/api/v1/signup/basic` | 
| allow users to login | `POST` | `/api/v1/login/basic` | 
| allow users to logout | `DELETE` | `/api/v1/logout` | 
| allow users to refersh their tokens | `POST` | `/api/v1/refersh` |

**Profile**
| Description |  Method   |   endpoint  | 
| --- | --- | --- | 
| allow users to get their private profiles details | `GET` | `/api/v1/profile` | 
| allow users to update their private profile detials | `POST` | `/api/v1/profile` | 

**Blog**


| Description |  Method   |   endpoint  | 
| --- | --- | --- | 
| allow writers to add their blog | `POST` | `/api/v1/blog/` | 
| allow writers to update their blog | `PUT` | `/api/v1/blog/:id` | 









