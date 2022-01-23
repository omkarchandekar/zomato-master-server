FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . ./

ENV MONGO_URL=mongodb+srv://OmkarChandekar:OmkarChandekar@zomato-master.piiv8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV GOOGLE_CLIENT_ID=307329934829-q46j967vmc0hj5c02h8fu3unt143pra3.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV AWS_S3_ACCESS_KEY=AKIAY6R75U365T5DDZGJ
ENV AWS_S3_SECRET_KEY=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
ENV NODE_ENV=production
ENV PORT=4000


CMD ["npm", "run", "start"]