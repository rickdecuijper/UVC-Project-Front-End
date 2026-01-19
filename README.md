# How to start up the Front and Back end of this application

## Front End

If you're seeing this, you are at the front end repository. Great job!

```sh
# clone the front end using your IDE
git clone https://github.com/rickdecuijper/UVC-Project-Front-End.git

# install dependencies
npm install

# activate the front end
npm run dev
```

## Back End

Now navigate to the accompanying back end at https://github.com/rickdecuijper/UVC-project-Back-End

```sh
# clone the back end using your IDE
git clone https://github.com/rickdecuijper/UVC-project-Back-End.git

# navigate to the code map of the appointments folder
cd appointments/code

#install dependencies
npm install

# run migrations
npx prisma migrate dev --name init

# seed data
npx prisma db seed

# activate the back end
npm run dev
```

## Avatars

Now that the main back end has been activated, you need to activate the avatar back end

```sh
# navigate to the code map inside the avatars folder
cd ../../
cd avatars/code

#install dependencies
npm install

# run migrations
npx prisma migrate dev --name init

# seed data
npx prisma db seed

# activate the avatar back end
npm run dev
```

Now you can enjoy your own copy of the Sustainable Schoolyard Task Organizer

Made using Svelte
