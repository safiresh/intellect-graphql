# Graphql-API Server Intellect Design

## Install 
install require dependecy with below commend
```sh
npm install
```
##Run

```sh
npm start
```

## Testing Graphql 

Host : http://localhost:3000/graphql

Method : POST 

Request Body

### 1.Get User Details (Given Id)

```json
{ "query": "{user(id:\"2\"){id,fName,lName,todos{text,targetDate}}}" }
```
### 2.Get Todo Details (Given Id)

```json
{ "query": "{todo(id:\"2\"){id,done,text,targetDate,user{id,fName,lName}}}" }
```
### 3.Get All Active Users 

```json
{ "query": "{users{id,fName,lName,pinCode,birthDate,todos{text,targetDate}}}" }
```
### 4.Get Active Todo  which has targetDate Today and Tommorow By UserId

```json
{  "query": "{activeTodoByUser(userId:\"2\"){id,done,text,targetDate,user{id,fName,lName}}}" }
```
