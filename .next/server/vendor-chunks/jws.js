/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/jws";
exports.ids = ["vendor-chunks/jws"];
exports.modules = {

/***/ "(rsc)/./node_modules/jws/index.js":
/*!***********************************!*\
  !*** ./node_modules/jws/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/*global exports*/\nvar SignStream = __webpack_require__(/*! ./lib/sign-stream */ \"(rsc)/./node_modules/jws/lib/sign-stream.js\");\nvar VerifyStream = __webpack_require__(/*! ./lib/verify-stream */ \"(rsc)/./node_modules/jws/lib/verify-stream.js\");\n\nvar ALGORITHMS = [\n  'HS256', 'HS384', 'HS512',\n  'RS256', 'RS384', 'RS512',\n  'PS256', 'PS384', 'PS512',\n  'ES256', 'ES384', 'ES512'\n];\n\nexports.ALGORITHMS = ALGORITHMS;\nexports.sign = SignStream.sign;\nexports.verify = VerifyStream.verify;\nexports.decode = VerifyStream.decode;\nexports.isValid = VerifyStream.isValid;\nexports.createSign = function createSign(opts) {\n  return new SignStream(opts);\n};\nexports.createVerify = function createVerify(opts) {\n  return new VerifyStream(opts);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsc0VBQW1CO0FBQzVDLG1CQUFtQixtQkFBTyxDQUFDLDBFQUFxQjs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQixZQUFZO0FBQ1osY0FBYztBQUNkLGNBQWM7QUFDZCxlQUFlO0FBQ2Ysa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RhaWx5LXJldmlldy8uL25vZGVfbW9kdWxlcy9qd3MvaW5kZXguanM/ZmY5YyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbCBleHBvcnRzKi9cbnZhciBTaWduU3RyZWFtID0gcmVxdWlyZSgnLi9saWIvc2lnbi1zdHJlYW0nKTtcbnZhciBWZXJpZnlTdHJlYW0gPSByZXF1aXJlKCcuL2xpYi92ZXJpZnktc3RyZWFtJyk7XG5cbnZhciBBTEdPUklUSE1TID0gW1xuICAnSFMyNTYnLCAnSFMzODQnLCAnSFM1MTInLFxuICAnUlMyNTYnLCAnUlMzODQnLCAnUlM1MTInLFxuICAnUFMyNTYnLCAnUFMzODQnLCAnUFM1MTInLFxuICAnRVMyNTYnLCAnRVMzODQnLCAnRVM1MTInXG5dO1xuXG5leHBvcnRzLkFMR09SSVRITVMgPSBBTEdPUklUSE1TO1xuZXhwb3J0cy5zaWduID0gU2lnblN0cmVhbS5zaWduO1xuZXhwb3J0cy52ZXJpZnkgPSBWZXJpZnlTdHJlYW0udmVyaWZ5O1xuZXhwb3J0cy5kZWNvZGUgPSBWZXJpZnlTdHJlYW0uZGVjb2RlO1xuZXhwb3J0cy5pc1ZhbGlkID0gVmVyaWZ5U3RyZWFtLmlzVmFsaWQ7XG5leHBvcnRzLmNyZWF0ZVNpZ24gPSBmdW5jdGlvbiBjcmVhdGVTaWduKG9wdHMpIHtcbiAgcmV0dXJuIG5ldyBTaWduU3RyZWFtKG9wdHMpO1xufTtcbmV4cG9ydHMuY3JlYXRlVmVyaWZ5ID0gZnVuY3Rpb24gY3JlYXRlVmVyaWZ5KG9wdHMpIHtcbiAgcmV0dXJuIG5ldyBWZXJpZnlTdHJlYW0ob3B0cyk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/data-stream.js":
/*!*********************************************!*\
  !*** ./node_modules/jws/lib/data-stream.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module, process*/\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar Stream = __webpack_require__(/*! stream */ \"stream\");\nvar util = __webpack_require__(/*! util */ \"util\");\n\nfunction DataStream(data) {\n  this.buffer = null;\n  this.writable = true;\n  this.readable = true;\n\n  // No input\n  if (!data) {\n    this.buffer = Buffer.alloc(0);\n    return this;\n  }\n\n  // Stream\n  if (typeof data.pipe === 'function') {\n    this.buffer = Buffer.alloc(0);\n    data.pipe(this);\n    return this;\n  }\n\n  // Buffer or String\n  // or Object (assumedly a passworded key)\n  if (data.length || typeof data === 'object') {\n    this.buffer = data;\n    this.writable = false;\n    process.nextTick(function () {\n      this.emit('end', data);\n      this.readable = false;\n      this.emit('close');\n    }.bind(this));\n    return this;\n  }\n\n  throw new TypeError('Unexpected data type ('+ typeof data + ')');\n}\nutil.inherits(DataStream, Stream);\n\nDataStream.prototype.write = function write(data) {\n  this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);\n  this.emit('data', data);\n};\n\nDataStream.prototype.end = function end(data) {\n  if (data)\n    this.write(data);\n  this.emit('end', data);\n  this.emit('close');\n  this.writable = false;\n  this.readable = false;\n};\n\nmodule.exports = DataStream;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi9kYXRhLXN0cmVhbS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGFBQWEsNEZBQTZCO0FBQzFDLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixXQUFXLG1CQUFPLENBQUMsa0JBQU07O0FBRXpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFpbHktcmV2aWV3Ly4vbm9kZV9tb2R1bGVzL2p3cy9saWIvZGF0YS1zdHJlYW0uanM/ZGMyMSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbCBtb2R1bGUsIHByb2Nlc3MqL1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbmZ1bmN0aW9uIERhdGFTdHJlYW0oZGF0YSkge1xuICB0aGlzLmJ1ZmZlciA9IG51bGw7XG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcblxuICAvLyBObyBpbnB1dFxuICBpZiAoIWRhdGEpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IEJ1ZmZlci5hbGxvYygwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFN0cmVhbVxuICBpZiAodHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuYnVmZmVyID0gQnVmZmVyLmFsbG9jKDApO1xuICAgIGRhdGEucGlwZSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIEJ1ZmZlciBvciBTdHJpbmdcbiAgLy8gb3IgT2JqZWN0IChhc3N1bWVkbHkgYSBwYXNzd29yZGVkIGtleSlcbiAgaWYgKGRhdGEubGVuZ3RoIHx8IHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgIHRoaXMuYnVmZmVyID0gZGF0YTtcbiAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmVtaXQoJ2VuZCcsIGRhdGEpO1xuICAgICAgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5lbWl0KCdjbG9zZScpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGRhdGEgdHlwZSAoJysgdHlwZW9mIGRhdGEgKyAnKScpO1xufVxudXRpbC5pbmhlcml0cyhEYXRhU3RyZWFtLCBTdHJlYW0pO1xuXG5EYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlKGRhdGEpIHtcbiAgdGhpcy5idWZmZXIgPSBCdWZmZXIuY29uY2F0KFt0aGlzLmJ1ZmZlciwgQnVmZmVyLmZyb20oZGF0YSldKTtcbiAgdGhpcy5lbWl0KCdkYXRhJywgZGF0YSk7XG59O1xuXG5EYXRhU3RyZWFtLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiBlbmQoZGF0YSkge1xuICBpZiAoZGF0YSlcbiAgICB0aGlzLndyaXRlKGRhdGEpO1xuICB0aGlzLmVtaXQoJ2VuZCcsIGRhdGEpO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhU3RyZWFtO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/data-stream.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/sign-stream.js":
/*!*********************************************!*\
  !*** ./node_modules/jws/lib/sign-stream.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module*/\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar DataStream = __webpack_require__(/*! ./data-stream */ \"(rsc)/./node_modules/jws/lib/data-stream.js\");\nvar jwa = __webpack_require__(/*! jwa */ \"(rsc)/./node_modules/jwa/index.js\");\nvar Stream = __webpack_require__(/*! stream */ \"stream\");\nvar toString = __webpack_require__(/*! ./tostring */ \"(rsc)/./node_modules/jws/lib/tostring.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\n\nfunction base64url(string, encoding) {\n  return Buffer\n    .from(string, encoding)\n    .toString('base64')\n    .replace(/=/g, '')\n    .replace(/\\+/g, '-')\n    .replace(/\\//g, '_');\n}\n\nfunction jwsSecuredInput(header, payload, encoding) {\n  encoding = encoding || 'utf8';\n  var encodedHeader = base64url(toString(header), 'binary');\n  var encodedPayload = base64url(toString(payload), encoding);\n  return util.format('%s.%s', encodedHeader, encodedPayload);\n}\n\nfunction jwsSign(opts) {\n  var header = opts.header;\n  var payload = opts.payload;\n  var secretOrKey = opts.secret || opts.privateKey;\n  var encoding = opts.encoding;\n  var algo = jwa(header.alg);\n  var securedInput = jwsSecuredInput(header, payload, encoding);\n  var signature = algo.sign(securedInput, secretOrKey);\n  return util.format('%s.%s', securedInput, signature);\n}\n\nfunction SignStream(opts) {\n  var secret = opts.secret||opts.privateKey||opts.key;\n  var secretStream = new DataStream(secret);\n  this.readable = true;\n  this.header = opts.header;\n  this.encoding = opts.encoding;\n  this.secret = this.privateKey = this.key = secretStream;\n  this.payload = new DataStream(opts.payload);\n  this.secret.once('close', function () {\n    if (!this.payload.writable && this.readable)\n      this.sign();\n  }.bind(this));\n\n  this.payload.once('close', function () {\n    if (!this.secret.writable && this.readable)\n      this.sign();\n  }.bind(this));\n}\nutil.inherits(SignStream, Stream);\n\nSignStream.prototype.sign = function sign() {\n  try {\n    var signature = jwsSign({\n      header: this.header,\n      payload: this.payload.buffer,\n      secret: this.secret.buffer,\n      encoding: this.encoding\n    });\n    this.emit('done', signature);\n    this.emit('data', signature);\n    this.emit('end');\n    this.readable = false;\n    return signature;\n  } catch (e) {\n    this.readable = false;\n    this.emit('error', e);\n    this.emit('close');\n  }\n};\n\nSignStream.sign = jwsSign;\n\nmodule.exports = SignStream;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi9zaWduLXN0cmVhbS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGFBQWEsNEZBQTZCO0FBQzFDLGlCQUFpQixtQkFBTyxDQUFDLGtFQUFlO0FBQ3hDLFVBQVUsbUJBQU8sQ0FBQyw4Q0FBSztBQUN2QixhQUFhLG1CQUFPLENBQUMsc0JBQVE7QUFDN0IsZUFBZSxtQkFBTyxDQUFDLDREQUFZO0FBQ25DLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFpbHktcmV2aWV3Ly4vbm9kZV9tb2R1bGVzL2p3cy9saWIvc2lnbi1zdHJlYW0uanM/MWQ5NiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbCBtb2R1bGUqL1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xudmFyIERhdGFTdHJlYW0gPSByZXF1aXJlKCcuL2RhdGEtc3RyZWFtJyk7XG52YXIgandhID0gcmVxdWlyZSgnandhJyk7XG52YXIgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3Rvc3RyaW5nJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuZnVuY3Rpb24gYmFzZTY0dXJsKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIEJ1ZmZlclxuICAgIC5mcm9tKHN0cmluZywgZW5jb2RpbmcpXG4gICAgLnRvU3RyaW5nKCdiYXNlNjQnKVxuICAgIC5yZXBsYWNlKC89L2csICcnKVxuICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKTtcbn1cblxuZnVuY3Rpb24gandzU2VjdXJlZElucHV0KGhlYWRlciwgcGF5bG9hZCwgZW5jb2RpbmcpIHtcbiAgZW5jb2RpbmcgPSBlbmNvZGluZyB8fCAndXRmOCc7XG4gIHZhciBlbmNvZGVkSGVhZGVyID0gYmFzZTY0dXJsKHRvU3RyaW5nKGhlYWRlciksICdiaW5hcnknKTtcbiAgdmFyIGVuY29kZWRQYXlsb2FkID0gYmFzZTY0dXJsKHRvU3RyaW5nKHBheWxvYWQpLCBlbmNvZGluZyk7XG4gIHJldHVybiB1dGlsLmZvcm1hdCgnJXMuJXMnLCBlbmNvZGVkSGVhZGVyLCBlbmNvZGVkUGF5bG9hZCk7XG59XG5cbmZ1bmN0aW9uIGp3c1NpZ24ob3B0cykge1xuICB2YXIgaGVhZGVyID0gb3B0cy5oZWFkZXI7XG4gIHZhciBwYXlsb2FkID0gb3B0cy5wYXlsb2FkO1xuICB2YXIgc2VjcmV0T3JLZXkgPSBvcHRzLnNlY3JldCB8fCBvcHRzLnByaXZhdGVLZXk7XG4gIHZhciBlbmNvZGluZyA9IG9wdHMuZW5jb2Rpbmc7XG4gIHZhciBhbGdvID0gandhKGhlYWRlci5hbGcpO1xuICB2YXIgc2VjdXJlZElucHV0ID0gandzU2VjdXJlZElucHV0KGhlYWRlciwgcGF5bG9hZCwgZW5jb2RpbmcpO1xuICB2YXIgc2lnbmF0dXJlID0gYWxnby5zaWduKHNlY3VyZWRJbnB1dCwgc2VjcmV0T3JLZXkpO1xuICByZXR1cm4gdXRpbC5mb3JtYXQoJyVzLiVzJywgc2VjdXJlZElucHV0LCBzaWduYXR1cmUpO1xufVxuXG5mdW5jdGlvbiBTaWduU3RyZWFtKG9wdHMpIHtcbiAgdmFyIHNlY3JldCA9IG9wdHMuc2VjcmV0fHxvcHRzLnByaXZhdGVLZXl8fG9wdHMua2V5O1xuICB2YXIgc2VjcmV0U3RyZWFtID0gbmV3IERhdGFTdHJlYW0oc2VjcmV0KTtcbiAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG4gIHRoaXMuaGVhZGVyID0gb3B0cy5oZWFkZXI7XG4gIHRoaXMuZW5jb2RpbmcgPSBvcHRzLmVuY29kaW5nO1xuICB0aGlzLnNlY3JldCA9IHRoaXMucHJpdmF0ZUtleSA9IHRoaXMua2V5ID0gc2VjcmV0U3RyZWFtO1xuICB0aGlzLnBheWxvYWQgPSBuZXcgRGF0YVN0cmVhbShvcHRzLnBheWxvYWQpO1xuICB0aGlzLnNlY3JldC5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMucGF5bG9hZC53cml0YWJsZSAmJiB0aGlzLnJlYWRhYmxlKVxuICAgICAgdGhpcy5zaWduKCk7XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgdGhpcy5wYXlsb2FkLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5zZWNyZXQud3JpdGFibGUgJiYgdGhpcy5yZWFkYWJsZSlcbiAgICAgIHRoaXMuc2lnbigpO1xuICB9LmJpbmQodGhpcykpO1xufVxudXRpbC5pbmhlcml0cyhTaWduU3RyZWFtLCBTdHJlYW0pO1xuXG5TaWduU3RyZWFtLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gc2lnbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgc2lnbmF0dXJlID0gandzU2lnbih7XG4gICAgICBoZWFkZXI6IHRoaXMuaGVhZGVyLFxuICAgICAgcGF5bG9hZDogdGhpcy5wYXlsb2FkLmJ1ZmZlcixcbiAgICAgIHNlY3JldDogdGhpcy5zZWNyZXQuYnVmZmVyLFxuICAgICAgZW5jb2Rpbmc6IHRoaXMuZW5jb2RpbmdcbiAgICB9KTtcbiAgICB0aGlzLmVtaXQoJ2RvbmUnLCBzaWduYXR1cmUpO1xuICAgIHRoaXMuZW1pdCgnZGF0YScsIHNpZ25hdHVyZSk7XG4gICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICB0aGlzLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgcmV0dXJuIHNpZ25hdHVyZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMucmVhZGFibGUgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgdGhpcy5lbWl0KCdjbG9zZScpO1xuICB9XG59O1xuXG5TaWduU3RyZWFtLnNpZ24gPSBqd3NTaWduO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25TdHJlYW07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/sign-stream.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/tostring.js":
/*!******************************************!*\
  !*** ./node_modules/jws/lib/tostring.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module*/\nvar Buffer = (__webpack_require__(/*! buffer */ \"buffer\").Buffer);\n\nmodule.exports = function toString(obj) {\n  if (typeof obj === 'string')\n    return obj;\n  if (typeof obj === 'number' || Buffer.isBuffer(obj))\n    return obj.toString();\n  return JSON.stringify(obj);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi90b3N0cmluZy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGFBQWEsb0RBQXdCOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RhaWx5LXJldmlldy8uL25vZGVfbW9kdWxlcy9qd3MvbGliL3Rvc3RyaW5nLmpzP2I4MDUiXSwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgbW9kdWxlKi9cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9TdHJpbmcob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJylcbiAgICByZXR1cm4gb2JqO1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgQnVmZmVyLmlzQnVmZmVyKG9iaikpXG4gICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/tostring.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/verify-stream.js":
/*!***********************************************!*\
  !*** ./node_modules/jws/lib/verify-stream.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module*/\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar DataStream = __webpack_require__(/*! ./data-stream */ \"(rsc)/./node_modules/jws/lib/data-stream.js\");\nvar jwa = __webpack_require__(/*! jwa */ \"(rsc)/./node_modules/jwa/index.js\");\nvar Stream = __webpack_require__(/*! stream */ \"stream\");\nvar toString = __webpack_require__(/*! ./tostring */ \"(rsc)/./node_modules/jws/lib/tostring.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\nvar JWS_REGEX = /^[a-zA-Z0-9\\-_]+?\\.[a-zA-Z0-9\\-_]+?\\.([a-zA-Z0-9\\-_]+)?$/;\n\nfunction isObject(thing) {\n  return Object.prototype.toString.call(thing) === '[object Object]';\n}\n\nfunction safeJsonParse(thing) {\n  if (isObject(thing))\n    return thing;\n  try { return JSON.parse(thing); }\n  catch (e) { return undefined; }\n}\n\nfunction headerFromJWS(jwsSig) {\n  var encodedHeader = jwsSig.split('.', 1)[0];\n  return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));\n}\n\nfunction securedInputFromJWS(jwsSig) {\n  return jwsSig.split('.', 2).join('.');\n}\n\nfunction signatureFromJWS(jwsSig) {\n  return jwsSig.split('.')[2];\n}\n\nfunction payloadFromJWS(jwsSig, encoding) {\n  encoding = encoding || 'utf8';\n  var payload = jwsSig.split('.')[1];\n  return Buffer.from(payload, 'base64').toString(encoding);\n}\n\nfunction isValidJws(string) {\n  return JWS_REGEX.test(string) && !!headerFromJWS(string);\n}\n\nfunction jwsVerify(jwsSig, algorithm, secretOrKey) {\n  if (!algorithm) {\n    var err = new Error(\"Missing algorithm parameter for jws.verify\");\n    err.code = \"MISSING_ALGORITHM\";\n    throw err;\n  }\n  jwsSig = toString(jwsSig);\n  var signature = signatureFromJWS(jwsSig);\n  var securedInput = securedInputFromJWS(jwsSig);\n  var algo = jwa(algorithm);\n  return algo.verify(securedInput, signature, secretOrKey);\n}\n\nfunction jwsDecode(jwsSig, opts) {\n  opts = opts || {};\n  jwsSig = toString(jwsSig);\n\n  if (!isValidJws(jwsSig))\n    return null;\n\n  var header = headerFromJWS(jwsSig);\n\n  if (!header)\n    return null;\n\n  var payload = payloadFromJWS(jwsSig);\n  if (header.typ === 'JWT' || opts.json)\n    payload = JSON.parse(payload, opts.encoding);\n\n  return {\n    header: header,\n    payload: payload,\n    signature: signatureFromJWS(jwsSig)\n  };\n}\n\nfunction VerifyStream(opts) {\n  opts = opts || {};\n  var secretOrKey = opts.secret||opts.publicKey||opts.key;\n  var secretStream = new DataStream(secretOrKey);\n  this.readable = true;\n  this.algorithm = opts.algorithm;\n  this.encoding = opts.encoding;\n  this.secret = this.publicKey = this.key = secretStream;\n  this.signature = new DataStream(opts.signature);\n  this.secret.once('close', function () {\n    if (!this.signature.writable && this.readable)\n      this.verify();\n  }.bind(this));\n\n  this.signature.once('close', function () {\n    if (!this.secret.writable && this.readable)\n      this.verify();\n  }.bind(this));\n}\nutil.inherits(VerifyStream, Stream);\nVerifyStream.prototype.verify = function verify() {\n  try {\n    var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);\n    var obj = jwsDecode(this.signature.buffer, this.encoding);\n    this.emit('done', valid, obj);\n    this.emit('data', valid);\n    this.emit('end');\n    this.readable = false;\n    return valid;\n  } catch (e) {\n    this.readable = false;\n    this.emit('error', e);\n    this.emit('close');\n  }\n};\n\nVerifyStream.decode = jwsDecode;\nVerifyStream.isValid = isValidJws;\nVerifyStream.verify = jwsVerify;\n\nmodule.exports = VerifyStream;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi92ZXJpZnktc3RyZWFtLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsYUFBYSw0RkFBNkI7QUFDMUMsaUJBQWlCLG1CQUFPLENBQUMsa0VBQWU7QUFDeEMsVUFBVSxtQkFBTyxDQUFDLDhDQUFLO0FBQ3ZCLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixlQUFlLG1CQUFPLENBQUMsNERBQVk7QUFDbkMsV0FBVyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFpbHktcmV2aWV3Ly4vbm9kZV9tb2R1bGVzL2p3cy9saWIvdmVyaWZ5LXN0cmVhbS5qcz8zMjMwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qZ2xvYmFsIG1vZHVsZSovXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgRGF0YVN0cmVhbSA9IHJlcXVpcmUoJy4vZGF0YS1zdHJlYW0nKTtcbnZhciBqd2EgPSByZXF1aXJlKCdqd2EnKTtcbnZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9zdHJpbmcnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIEpXU19SRUdFWCA9IC9eW2EtekEtWjAtOVxcLV9dKz9cXC5bYS16QS1aMC05XFwtX10rP1xcLihbYS16QS1aMC05XFwtX10rKT8kLztcblxuZnVuY3Rpb24gaXNPYmplY3QodGhpbmcpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGluZykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5mdW5jdGlvbiBzYWZlSnNvblBhcnNlKHRoaW5nKSB7XG4gIGlmIChpc09iamVjdCh0aGluZykpXG4gICAgcmV0dXJuIHRoaW5nO1xuICB0cnkgeyByZXR1cm4gSlNPTi5wYXJzZSh0aGluZyk7IH1cbiAgY2F0Y2ggKGUpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxufVxuXG5mdW5jdGlvbiBoZWFkZXJGcm9tSldTKGp3c1NpZykge1xuICB2YXIgZW5jb2RlZEhlYWRlciA9IGp3c1NpZy5zcGxpdCgnLicsIDEpWzBdO1xuICByZXR1cm4gc2FmZUpzb25QYXJzZShCdWZmZXIuZnJvbShlbmNvZGVkSGVhZGVyLCAnYmFzZTY0JykudG9TdHJpbmcoJ2JpbmFyeScpKTtcbn1cblxuZnVuY3Rpb24gc2VjdXJlZElucHV0RnJvbUpXUyhqd3NTaWcpIHtcbiAgcmV0dXJuIGp3c1NpZy5zcGxpdCgnLicsIDIpLmpvaW4oJy4nKTtcbn1cblxuZnVuY3Rpb24gc2lnbmF0dXJlRnJvbUpXUyhqd3NTaWcpIHtcbiAgcmV0dXJuIGp3c1NpZy5zcGxpdCgnLicpWzJdO1xufVxuXG5mdW5jdGlvbiBwYXlsb2FkRnJvbUpXUyhqd3NTaWcsIGVuY29kaW5nKSB7XG4gIGVuY29kaW5nID0gZW5jb2RpbmcgfHwgJ3V0ZjgnO1xuICB2YXIgcGF5bG9hZCA9IGp3c1NpZy5zcGxpdCgnLicpWzFdO1xuICByZXR1cm4gQnVmZmVyLmZyb20ocGF5bG9hZCwgJ2Jhc2U2NCcpLnRvU3RyaW5nKGVuY29kaW5nKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZEp3cyhzdHJpbmcpIHtcbiAgcmV0dXJuIEpXU19SRUdFWC50ZXN0KHN0cmluZykgJiYgISFoZWFkZXJGcm9tSldTKHN0cmluZyk7XG59XG5cbmZ1bmN0aW9uIGp3c1ZlcmlmeShqd3NTaWcsIGFsZ29yaXRobSwgc2VjcmV0T3JLZXkpIHtcbiAgaWYgKCFhbGdvcml0aG0pIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKFwiTWlzc2luZyBhbGdvcml0aG0gcGFyYW1ldGVyIGZvciBqd3MudmVyaWZ5XCIpO1xuICAgIGVyci5jb2RlID0gXCJNSVNTSU5HX0FMR09SSVRITVwiO1xuICAgIHRocm93IGVycjtcbiAgfVxuICBqd3NTaWcgPSB0b1N0cmluZyhqd3NTaWcpO1xuICB2YXIgc2lnbmF0dXJlID0gc2lnbmF0dXJlRnJvbUpXUyhqd3NTaWcpO1xuICB2YXIgc2VjdXJlZElucHV0ID0gc2VjdXJlZElucHV0RnJvbUpXUyhqd3NTaWcpO1xuICB2YXIgYWxnbyA9IGp3YShhbGdvcml0aG0pO1xuICByZXR1cm4gYWxnby52ZXJpZnkoc2VjdXJlZElucHV0LCBzaWduYXR1cmUsIHNlY3JldE9yS2V5KTtcbn1cblxuZnVuY3Rpb24gandzRGVjb2RlKGp3c1NpZywgb3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgandzU2lnID0gdG9TdHJpbmcoandzU2lnKTtcblxuICBpZiAoIWlzVmFsaWRKd3MoandzU2lnKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgaGVhZGVyID0gaGVhZGVyRnJvbUpXUyhqd3NTaWcpO1xuXG4gIGlmICghaGVhZGVyKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHZhciBwYXlsb2FkID0gcGF5bG9hZEZyb21KV1MoandzU2lnKTtcbiAgaWYgKGhlYWRlci50eXAgPT09ICdKV1QnIHx8IG9wdHMuanNvbilcbiAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkLCBvcHRzLmVuY29kaW5nKTtcblxuICByZXR1cm4ge1xuICAgIGhlYWRlcjogaGVhZGVyLFxuICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgc2lnbmF0dXJlOiBzaWduYXR1cmVGcm9tSldTKGp3c1NpZylcbiAgfTtcbn1cblxuZnVuY3Rpb24gVmVyaWZ5U3RyZWFtKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHZhciBzZWNyZXRPcktleSA9IG9wdHMuc2VjcmV0fHxvcHRzLnB1YmxpY0tleXx8b3B0cy5rZXk7XG4gIHZhciBzZWNyZXRTdHJlYW0gPSBuZXcgRGF0YVN0cmVhbShzZWNyZXRPcktleSk7XG4gIHRoaXMucmVhZGFibGUgPSB0cnVlO1xuICB0aGlzLmFsZ29yaXRobSA9IG9wdHMuYWxnb3JpdGhtO1xuICB0aGlzLmVuY29kaW5nID0gb3B0cy5lbmNvZGluZztcbiAgdGhpcy5zZWNyZXQgPSB0aGlzLnB1YmxpY0tleSA9IHRoaXMua2V5ID0gc2VjcmV0U3RyZWFtO1xuICB0aGlzLnNpZ25hdHVyZSA9IG5ldyBEYXRhU3RyZWFtKG9wdHMuc2lnbmF0dXJlKTtcbiAgdGhpcy5zZWNyZXQub25jZSgnY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnNpZ25hdHVyZS53cml0YWJsZSAmJiB0aGlzLnJlYWRhYmxlKVxuICAgICAgdGhpcy52ZXJpZnkoKTtcbiAgfS5iaW5kKHRoaXMpKTtcblxuICB0aGlzLnNpZ25hdHVyZS5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuc2VjcmV0LndyaXRhYmxlICYmIHRoaXMucmVhZGFibGUpXG4gICAgICB0aGlzLnZlcmlmeSgpO1xuICB9LmJpbmQodGhpcykpO1xufVxudXRpbC5pbmhlcml0cyhWZXJpZnlTdHJlYW0sIFN0cmVhbSk7XG5WZXJpZnlTdHJlYW0ucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeSgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgdmFsaWQgPSBqd3NWZXJpZnkodGhpcy5zaWduYXR1cmUuYnVmZmVyLCB0aGlzLmFsZ29yaXRobSwgdGhpcy5rZXkuYnVmZmVyKTtcbiAgICB2YXIgb2JqID0gandzRGVjb2RlKHRoaXMuc2lnbmF0dXJlLmJ1ZmZlciwgdGhpcy5lbmNvZGluZyk7XG4gICAgdGhpcy5lbWl0KCdkb25lJywgdmFsaWQsIG9iaik7XG4gICAgdGhpcy5lbWl0KCdkYXRhJywgdmFsaWQpO1xuICAgIHRoaXMuZW1pdCgnZW5kJyk7XG4gICAgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuICAgIHJldHVybiB2YWxpZDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMucmVhZGFibGUgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgdGhpcy5lbWl0KCdjbG9zZScpO1xuICB9XG59O1xuXG5WZXJpZnlTdHJlYW0uZGVjb2RlID0gandzRGVjb2RlO1xuVmVyaWZ5U3RyZWFtLmlzVmFsaWQgPSBpc1ZhbGlkSndzO1xuVmVyaWZ5U3RyZWFtLnZlcmlmeSA9IGp3c1ZlcmlmeTtcblxubW9kdWxlLmV4cG9ydHMgPSBWZXJpZnlTdHJlYW07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/verify-stream.js\n");

/***/ })

};
;