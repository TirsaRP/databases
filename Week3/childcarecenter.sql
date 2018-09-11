DROP database IF EXISTS childcarecenter;
CREATE database childcarecenter;
USE childcarecenter;

create table Location(
LocationID int not null, 
LocationName varchar(255),
Address varchar(255),
City varchar(255),
Zip int not null,
Phone int not null,
primary key(LocationID)
);
create table Classrooms(
ClassroomNumber int not null,
ClassroomName varchar(255),
LocationID int not null,
primary key(ClassroomNumber),
foreign key(LocationID) references Location(LocationID)
);
create table Employees(
EmployeeID int not null,
LastName varchar(255),
FirstName varchar(255),
Phone int not null,
SSN int not null,
ClassroomNumber int not null,
LocationID int not null,
primary key(EmployeeID),
foreign key(ClassroomNumber) references Classrooms(ClassroomNumber),
foreign key(LocationID) references Location(LocationID)
); 
create table Children(
ChildID int not null,
LastName varchar(255),
FirstName varchar(255),
LocationID int not null,
ClassroomNumber int not null,
primary key(ChildID),
foreign key(ClassroomNumber) references Classrooms(ClassroomNumber),
foreign key(LocationID) references Location(LocationID)
);
create table Parents(
ParentID varchar(255),
ChildID int not null, 
LocationID int not null,
LastName varchar(255),
FirstName varchar(255),
Phone int not null,
Address varchar(255),
Email varchar(255),
primary key(ParentID),
foreign key(ChildID) references Children(ChildID),
foreign key(LocationID) references Location(LocationID)
); 

use childcarecenter;
ALTER TABLE Location MODIFY Phone BIGINT;
ALTER TABLE Employees MODIFY Phone BIGINT;
ALTER TABLE Parents MODIFY Phone BIGINT;


use childcarecenter;
Insert into Location
values(12345, 'AngelsPlayTime', '12 Hemming Way', 'Paramount City', 91765, 9095463458);
Insert into Classrooms
values(5, 'Butterflies', 12345);
insert into Employees
values(987, 'Smith', 'Valerie', 9517865994, 786957886, 5, 12345);
Insert into Children
values (023, 'Johnson', 'Timmy', 12345, 5);
Insert into Parents
values (023, 023, 12345, 'Johnson', 'Rebecca', 9098763597, '34 Maple Drive', 'r.johnson@gmail.com');




















