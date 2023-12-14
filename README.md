# Simple Fintech Portal
This is a simple fintech portal system that uses the data from Financial Modeling Prep api. You can search the ticker from the trading platform and view their company profile and company quotes.

# Setting up the system
1. Clone the repository by opening your terminal and run the 
> git clone git@github.com:joseph-bautista/fintech-portal.git 
2. Go to the directory of the project by running
> cd fintech-portal 
3. Create your .env file to the root of the project and update necessary details such as database details.
> You may refer to the .env.example file
4. Create a Financial Modeling Prep Account and get your API key
5. In the env file find the FINANCIAL_MODEL_API_KEY and paste your API key there.
6. Go back to the terminal and run 
> composer install
7. Install Laravel Sail by running the command bellow and just follow the configuration after.
> php artisan sail:install 
8. Open your docker and run
> ./vendor/sail up
9. After that, we can run the migration
> ./vendor/sail artisan migrate
10. Now that the backend is set up. We can now begin setting up the front end by running
> npm install \n
> npm run dev

And viola! We have set up our simple fintech portal. 

# Technologies Used
1. Laravel
2. MySQL
3. Inertia
4. ReactJS
5. PHP 8.2
6. Redis

# References
1. https://laravel.com/docs/10.x
2. https://site.financialmodelingprep.com/developer/docs
3. https://inertiajs.com/
4. https://react.dev/
5. https://redis.io/docs/