# CarCar

Team:

* Person 1 - Nesh Sharma - Service Microservice
* Person 2 - Mick Preston - Sales Microservice

## Design

## Service microservice

The Django microservice powering our service comprises of three models, namely Appointment, AutomobileVO, and Technicians. The Appointment model serves a critical function in scheduling appointments for our customers to service their cars. It is worth noting that each car need not have a VIN that has been sold from inventory, thereby making it unnecessary to establish a foreign key relationship to AutomobileVO. However, there is a foreign key relationship to Technicians since each appointment must be serviced by a technician. The Technicians model is a straightforward model that creates technicians, including their first and last names and employee ID.

Finally, we have the AutomobileVO model, which stores data collected from the poller.py file linked directly to the automobile inventory microservice. Whenever there is an update to this inventory, such as a newly added or sold car, the data is polled from our service microservice's poller.py file every 60 seconds. Additionally, I have incorporated an if statement that creates an instance in AutomobileVO only if the sold property is true, as we require only the VIN of sold cars. The AutomobileVO model has only one field, the VIN field. The reason for this is that the front-end column checks if the VIN of an appointment is a VIP, meaning if the VIN was sold from the dealership. If it is sold from the dealership, that appointment receives VIP service.

The Appointment and Technicians models constitute the aggregates in our models. The Appointment model is fundamental to creating appointments for our customers, and the Technicians model is self-contained and has no major dependencies, making it entirely independent.

## Sales microservice

The sales microservice is responsible for keeping track of automobile sales that come from the inventory microservice. There is cross communication between the sales microservice and inventory microservice, which allows us to ensure that sales are only being generated by vehicles that come from inventory's microservice. This is done by pulling data from the "Automobiles" model that lives within the inventory microservice's models. The sales microservice polls the "sold" and "vin" properties from the inventory microservice every 60 seconds to stay as up-to-date as possible with the current list of automobiles.

Since data is polled from the inventory microservice, there is an AutomobileVO (automobile value object) that lives within the sales microservice and holds the data for the fields "sold" and "vin". In addition to AutomobileVO, there are Salesperson, Customer, and Sale models within the sales microservice. These models, in conjunction with the API endpoints, are ultimately set up to handle requests from users, allowing them to add a customer, salesperson, and sale to their collection. In addition to creating, the user can retrieve a list of all of the customers, salespeople, and sales if they click on links that are provided in the navbar. The database is set up using PostgresSQL, which is updated whenever a user creates a new instance within one of the models. The view functions were added to send out data based on the API endpoint in a JSON-formatted string, with Insomnia as the UI for backend testing. The Sale model, in particular, has a foreign key relationship with Customer, Salesperson, and AutomobileVO, so that when a user creates a sale, they can assign that sale to an existing customer, salesperson, and automobile.

Once all of the backend models were set up, and view functions were created to handle the requests, the frontend was built using React and JavaScript. As previously mentioned, the user can click on a link that will display either a list page or a create page for one of the models (Customer, Salesperson, or Sale). The fields within the create forms, once submitted, are reset, which allows the user to stay on the form and continue adding people without having to refresh or switch back to the create page. Additionally, there is a page set up for sales history, which allows the user to view all of the sales that were made by a particular salesperson.


## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create beta-data
4. Run docker compose build
5. Run docker compose up
6. Explore CarCar!