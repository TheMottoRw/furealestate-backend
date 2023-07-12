CREATE TABLE users(
    id int primary key auto_increment,
    email  varchar(255),
    user_type  enum("Admin","Client"),
    password varchar(255),
    is_deleted boolean,
    updated_at datetime default current_timestamp on update current_timestamp,
    created_at datetime default current_timestamp

);

CREATE TABLE properties(
    id int primary key auto_increment,
    name  varchar(255),
    property_type enum("Residential","Commercial"),
    description text,
    photos text,
    rooms int,
    bathroom int,
    parking_slots int,
    sqm varchar(255),
    year_built year,
    price int,
    address text,
    status enum("Occupied","Sold","For sale","For Rent"),
    is_deleted boolean,
    updated_at datetime default current_timestamp on update current_timestamp,
    created_at datetime default current_timestamp

);


CREATE TABLE sales(
    id int primary key auto_increment,
    property_id  int,
    client_id int,
    sale_type enum("Sold","Rent"),
    payment_mode enum("Once","Monthly"),
    price text,
    contract_start date,
    contract_end date,
    status varchar(50),
    is_deleted boolean,
    updated_at datetime default current_timestamp on update current_timestamp,
    created_at datetime default current_timestamp,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (client_id) REFERENCES users(id)
);


CREATE TABLE bid(
    id int primary key auto_increment,
    property_id  int,
    client_id int,
    sale_type enum("Sold","Rent"),
    payment_mode enum("Once","Monthly"),
    price text,
    contract_start date,
    contract_end date,
    status enum("Accepted","Rejected"),
    is_deleted boolean,
    updated_at datetime default current_timestamp on update current_timestamp,
    created_at datetime default current_timestamp,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (client_id) REFERENCES users(id)
);
