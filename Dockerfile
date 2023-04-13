FROM debian:bullseye

ARG NODE_VERSION=16.17.0

RUN apt-get update; apt install -y curl
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION}
RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production

COPY . .

CMD [ "sleep", "100000" ]