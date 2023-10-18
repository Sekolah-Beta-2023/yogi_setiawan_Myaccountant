# MyAccountant

A digital platform designed to assist accountants with activities such as employee data and company inventory data.

To see if there is an update and full source: https://github.com/yogiset/myaccountaN

Link deploy = https://myaccounta-n.vercel.app/


## Tech Stack
1. Frontend : Nuxt.js 2
2. Backend : Java with Spring Framework [https://github.com/yogiset/MyAccountant-BackEnd](https://github.com/yogiset/MyAccountant-BackEnd)
   or check my repo with name "MyAccountant-BackEnd-0.0.1-SNAPSHOT.jar"
   if you want to run jar file dont forget to download and instal java from [https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)
   you can run .jar by typing to your terminal/command prompt "java -jar example.jar". and make sure database configurations for postgres same with mine = username: postgres 
   password: admin database name : myaccountant.
   if you want to run from my repo back end, dont forget to instal maven and java jdk 17 or better version to your text editor and dont forget to changes smtp because my smtp is testing smtp it wont 
   work for your real email,
   also make sure your database name, username and password from postgres.   
4. Database : PostgreSQL

## Features
1. Register with email verification, Login, Logout, ForgotPassword check email,ChangePassword. ( if u want to run Java Back End, dont forget to changes smtp)
2. Show current user login
3. Upload, show data from karyawan, edit, and delete data from karyawan
4. Upload, show data from barang, edit, and delete data from barang
5. Searching & filtering (nama,jabatan,jenis barang)
   

## Setting Deploy Api
```properties
spring_profiles_active=prod
PROD_DB_HOST=HOST_HERE
PROD_DB_PORT=POST_HERE
PROD_DB_NAME=railway
PROD_DB_PASSWORD=PASSWORD_HERE
PROD_DB_USERNAME=postgres
```


## Contacts
1. Linkedin: [https://www.linkedin.com/in/yogi-setiawan-8586b0280/](https://www.linkedin.com/in/yogi-setiawan-8586b0280/)
2. Github: [https://github.com/yogiset](https://github.com/yogiset)

#### Thanks to alkademi, 1000startupdigital, mentor, asisten mentor, dan lainnya
