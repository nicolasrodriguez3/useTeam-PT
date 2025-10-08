db = db.getSiblingDB('kanban');
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "kanban-mongodb:27017" }
  ]
});