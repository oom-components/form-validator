/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.jsm");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/field.jsm":
/*!************************!*\
  !*** ../src/field.jsm ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar errorTypes = {\n  valueMissing: '',\n  typeMismatch: '',\n  tooShort: '',\n  tooLong: '',\n  badInput: '',\n  stepMismatch: '',\n  rangeOverflow: '',\n  rangeUnderflow: '',\n  patternMismatch: ''\n};\n\nvar Field =\n/*#__PURE__*/\nfunction () {\n  function Field(input, form) {\n    var _this = this;\n\n    _classCallCheck(this, Field);\n\n    this.input = input;\n    this.form = form;\n    this.pristine = true;\n    this.messages = Object.assign({}, errorTypes);\n    input.addEventListener('input', function (e) {\n      return _this.checkStatus(e);\n    });\n    input.addEventListener('change', function (e) {\n      return _this.checkStatus(e);\n    });\n    input.addEventListener('focus', function (e) {\n      return _this.pristine = false;\n    });\n    setTimeout(function () {\n      return _this.checkStatus();\n    }, 0);\n  }\n\n  _createClass(Field, [{\n    key: \"isPristine\",\n    value: function isPristine() {\n      return this.pristine;\n    }\n  }, {\n    key: \"isDirty\",\n    value: function isDirty() {\n      return !this.pristine;\n    }\n  }, {\n    key: \"isValid\",\n    value: function isValid() {\n      return this.input.validity.valid;\n    }\n  }, {\n    key: \"getErrorType\",\n    value: function getErrorType() {\n      var validity = this.input.validity;\n\n      if (validity.valid) {\n        return;\n      }\n\n      for (var type in this.messages) {\n        if (validity[type]) {\n          return type;\n        }\n      }\n    }\n  }, {\n    key: \"setErrorMessages\",\n    value: function setErrorMessages() {\n      var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      Object.assign(this.messages, messages);\n      return this;\n    }\n  }, {\n    key: \"getErrorMessage\",\n    value: function getErrorMessage(type) {\n      if (!type) {\n        return '';\n      }\n\n      return this.messages[type] || this.input.validationMessage;\n    }\n  }, {\n    key: \"checkStatus\",\n    value: function checkStatus(e) {\n      var errorType = this.getErrorType();\n\n      if (this.lastErrorType !== errorType) {\n        this.input.dispatchEvent(createEvent('changeStatus', {\n          valid: !errorType,\n          errorType: errorType,\n          originalEvent: e\n        }));\n        this.form.checkStatus();\n      }\n\n      this.lastErrorType = errorType;\n    }\n  }, {\n    key: \"on\",\n    value: function on(event, callback) {\n      this.input.addEventListener(event, callback);\n      return this;\n    }\n  }, {\n    key: \"updateError\",\n    value: function updateError(text) {\n      var message;\n\n      if (!text) {\n        message = this.getErrorMessage(this.getErrorType());\n      } else {\n        message = this.getErrorMessage(text) || text;\n      }\n\n      if (message) {\n        return this.showError(message);\n      }\n\n      this.hideError();\n    }\n  }, {\n    key: \"hideError\",\n    value: function hideError() {\n      if (this.errorLabel) {\n        this.errorLabel.remove();\n        delete this.errorLabel;\n      }\n\n      this.input.dispatchEvent(createEvent('hideError'));\n    }\n  }, {\n    key: \"showError\",\n    value: function showError(message) {\n      if (!this.errorLabel) {\n        this.errorLabel = document.createElement('label');\n        this.errorLabel.for = this.input.id;\n        this.input.parentElement.append(this.errorLabel);\n      }\n\n      this.errorLabel.innerText = message;\n      this.input.dispatchEvent(createEvent('showError', {\n        errorLabel: this.errorLabel\n      }));\n    }\n  }]);\n\n  return Field;\n}();\n\nexports.default = Field;\n\nfunction createEvent(type, data) {\n  if (typeof window.CustomEvent === 'function') {\n    return new CustomEvent(type, {\n      detail: data\n    });\n  }\n\n  var event = document.createEvent('CustomEvent');\n  event.initCustomEvent(type, true, true, data);\n  return event;\n}\n\n//# sourceURL=webpack:///../src/field.jsm?");

/***/ }),

/***/ "../src/form-validator.jsm":
/*!*********************************!*\
  !*** ../src/form-validator.jsm ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _field = _interopRequireDefault(__webpack_require__(/*! ./field.jsm */ \"../src/field.jsm\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar FormValidator =\n/*#__PURE__*/\nfunction () {\n  function FormValidator(form, handler) {\n    var _this = this;\n\n    _classCallCheck(this, FormValidator);\n\n    this.form = form;\n    this.form.setAttribute('novalidate', true);\n    this.form.addEventListener('submit', function (e) {\n      if (!_this.isValid()) {\n        e.preventDefault();\n      }\n    });\n    this.fields = [];\n    this.handler = handler;\n    setTimeout(function () {\n      return _this.checkStatus();\n    }, 0);\n  }\n\n  _createClass(FormValidator, [{\n    key: \"addField\",\n    value: function addField(input) {\n      if (typeof input === 'string') {\n        input = this.form.querySelector(input);\n      }\n\n      if (!input) {\n        throw new Error('No input provided');\n      }\n\n      var field = new _field.default(input, this);\n      this.fields.push(field);\n      return field;\n    }\n  }, {\n    key: \"isPristine\",\n    value: function isPristine() {\n      return this.fields.every(function (field) {\n        return field.isPristine();\n      });\n    }\n  }, {\n    key: \"isDirty\",\n    value: function isDirty() {\n      return this.fields.some(function (field) {\n        return field.isDirty();\n      });\n    }\n  }, {\n    key: \"isValid\",\n    value: function isValid() {\n      return this.fields.every(function (field) {\n        return field.isValid();\n      });\n    }\n  }, {\n    key: \"checkStatus\",\n    value: function checkStatus(forceStatus) {\n      var status = typeof forceStatus === 'boolean' ? forceStatus : this.isValid();\n\n      if (status) {\n        if (!this.wasValid) {\n          this.form.dispatchEvent(createEvent('changeStatus', {\n            valid: true\n          }));\n        }\n\n        this.wasValid = true;\n      } else {\n        if (this.wasValid || this.wasValid === undefined) {\n          this.form.dispatchEvent(createEvent('changeStatus', {\n            valid: false\n          }));\n        }\n\n        this.wasValid = false;\n      }\n    }\n  }, {\n    key: \"on\",\n    value: function on(event, callback) {\n      this.form.addEventListener(event, callback);\n    }\n  }]);\n\n  return FormValidator;\n}();\n\nexports.default = FormValidator;\n\nfunction createEvent(type, data) {\n  if (typeof window.CustomEvent === 'function') {\n    return new CustomEvent(type, {\n      detail: data\n    });\n  }\n\n  var event = document.createEvent('CustomEvent');\n  event.initCustomEvent(type, true, true, data);\n  return event;\n}\n\n//# sourceURL=webpack:///../src/form-validator.jsm?");

/***/ }),

/***/ "./script.jsm":
/*!********************!*\
  !*** ./script.jsm ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _formValidator = _interopRequireDefault(__webpack_require__(/*! ../src/form-validator.jsm */ \"../src/form-validator.jsm\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar el = document.getElementById('my-form');\nvar form = new _formValidator.default(el);\nvar message = document.getElementById('form-message');\nform.on('changeStatus', function (e) {\n  if (e.detail.valid) {\n    message.innerHTML = '';\n  } else {\n    message.innerHTML = 'The form has errors';\n  }\n});\nel.querySelectorAll('input').forEach(function (input) {\n  var field = form.addField(input);\n  field.on('changeStatus', function (e) {\n    field.updateError();\n  });\n});\n\n//# sourceURL=webpack:///./script.jsm?");

/***/ })

/******/ });