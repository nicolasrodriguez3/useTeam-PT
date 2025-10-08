#!/bin/bash

# Espera a que MongoDB acepte conexiones
until mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  echo "Esperando a que MongoDB esté listo..."
  sleep 2
done

echo "MongoDB está listo, inicializando replica set..."

# Intentamos iniciar el replica set (solo si no está inicializado)
mongosh --eval "
try {
  rs.initiate({
    _id: 'rs0',
    members: [{ _id: 0, host: 'localhost:27017' }]
  });
} catch(e) {
  print('Replica set ya inicializado o error no crítico.');
  printjson(e);
}
"

echo "Replica set inicializado."
