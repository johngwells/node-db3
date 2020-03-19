const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove,
}

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function findSteps() {
  return db('schemes as s')
    .join('steps as st', 's.id', 'st.scheme_id')
    .select('st.id', 's.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
    .orderBy('st.step_number')
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(([id]) => findById(id))
}

function addStep(newStep, id) {
  return db('steps')
    .where({ scheme_id: id })
    .insert(newStep)
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes)
    .then(id => findById(id));
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}
