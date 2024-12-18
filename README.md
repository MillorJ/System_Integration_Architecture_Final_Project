
# System Integration Architecture Final Project

This project designs, implements, and secures an integrated platform that enables secure data sharing between a CRM system, an inventory management system, and a customer support application in a simulated enterprise environment. It emphasizes robust systems integration, secure data flow, and architectural best practices.

## Key Features
- **API Gateway**: Manages all system interactions securely.
- **CRM System**: Handles customer relationship data.
- **Inventory System**: Manages inventory and product details.
- **Customer Support System**: Facilitates customer support operations.
- **Monitoring**: Tracks system health and performance.

## Technologies Used
- Node.js (JavaScript)
- Docker for containerization
- RESTful APIs for integration
- Secure communication between services

## Setup
1. Clone the repository:  
   ```bash
   git clone https://github.com/MillorJ/System_Integration_Architecture_Final_Project.git
   ```
2. Navigate into the project folder:
   ```bash
   cd System_Integration_Architecture_Final_Project
   ```
3. Build and start services using Docker:
   ```bash
   docker-compose up --build
   ```

## Starting the services
1. API-Gateway
   - cd api-gateway
   - node api-gateway/server.js
3. CRM System
   - cd crm-system
   - node app.js
4. Inventory-system
   - cd inventory-system
   - node app.js
5. Support-system
   - cd support-system
   - node app.js
   

## License
This project is licensed under the MIT License.
