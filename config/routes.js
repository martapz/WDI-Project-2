const express           = require('express');
const router            = express.Router();

const statics           = require('../controllers/statics');
const registrations     = require('../controllers/registrations');
const sessions          = require('../controllers/sessions');
const users             = require('../controllers/users');
const restaurants       = require('../controllers/restaurants'); //added
const menuItems         = require('../controllers/menuItems'); //added

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to view this content');
      res.redirect('/login');
    });
  }
  return next();
}

router.route('/')
.get(statics.homepage);

router.route('/register')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/logout')
.get(sessions.delete);

router.route('/users/:id')
.get(users.show)
.put(users.update);

router.route('/users/:id/edit')
.get(users.edit);

router.route('/restaurants/new')
.post(restaurants.create);

router.route('/restaurants/:restaurantId')
.get(restaurants.show)
.post(secureRoute, menuItems.create)
.put(secureRoute, menuItems.update);

router.route('/restaurants/:restaurantId/menuItems/new')
.get(secureRoute, menuItems.new);

module.exports = router;
