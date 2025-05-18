"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router();

var fs = require("fs/promises");

var path = require("path"); //get all users


router.get("/", function _callee(req, res) {
  var filePath, data, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          filePath = path.resolve(__dirname, "../routes/users.json");
          _context.next = 4;
          return regeneratorRuntime.awrap(fs.readFile(filePath, "utf-8"));

        case 4:
          data = _context.sent;
          users = JSON.parse(data);
          res.json(users);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Error reading users file:", _context.t0);
          res.status(500).send("Error reading users file");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //get user by id

router.get("/:id", function _callee2(req, res) {
  var userId, filePath, data, users, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.params.id;
          filePath = path.resolve(__dirname, "../routes/users.json");
          _context2.next = 5;
          return regeneratorRuntime.awrap(fs.readFile(filePath, "utf-8"));

        case 5:
          data = _context2.sent;
          users = JSON.parse(data);
          user = users.find(function (u) {
            return u.id == userId;
          });

          if (user) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(404).send("User not found"));

        case 10:
          res.json(user);
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error("Error getting user by ID:", _context2.t0);
          res.status(500).send("Server error");

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //create user

router.post("/", function (req, res) {}); //edit user by id0

router.patch("/:id", function (req, res) {
  var userId = req.params.id;
  var user = req.body;
  var filePath = path.resolve(__dirname, "../routes/users.json");
  fs.readFile(filePath, "utf-8").then(function (data) {
    var users = JSON.parse(data);
    var userIndex = users.findIndex(function (u) {
      return u.id == userId;
    });

    if (userIndex === -1) {
      return res.status(404).send("User not found");
    }

    users[userIndex] = _objectSpread({}, users[userIndex], {}, user);
    return fs.writeFile(filePath, JSON.stringify(users, null, 2));
  }).then(function () {
    res.status(200).json(user);
  })["catch"](function (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
  });
}); //delete user by id

router["delete"]("/:id", function _callee3(req, res) {
  var userId, filePath, data, users, userexists, updatedUsers;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.params.id;
          filePath = path.resolve(__dirname, "../routes/users.json");
          _context3.next = 5;
          return regeneratorRuntime.awrap(fs.readFile(filePath, "utf-8"));

        case 5:
          data = _context3.sent;
          users = JSON.parse(data);
          userexists = users.find(function (u) {
            return u.id == userId;
          });

          if (userexists) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(404).send("User not found"));

        case 10:
          updatedUsers = users.filter(function (u) {
            return u.id != userId;
          });
          _context3.next = 13;
          return regeneratorRuntime.awrap(fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2)));

        case 13:
          res.status(200).send("User deleted successfully");
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.error("Error getting user by ID:", _context3.t0);
          res.status(500).send("Server error");

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
module.exports = router; // const express=require('express');