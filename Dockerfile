
FROM nexus.eoc.ch:5001/ptf/serverfrontend:master
WORKDIR /usr/app
COPY --from=nodebuilder /usr/src/app/build /usr/app/build
ENV SERVERPATH /autoanamnesi-client