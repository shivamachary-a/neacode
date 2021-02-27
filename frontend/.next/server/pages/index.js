module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-device-detect */ \"react-device-detect\");\n/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/home/shivam/isohelapp/frontend/src/pages/index.tsx\";\n\n\n\nconst Index = () => {\n  if (!react_device_detect__WEBPACK_IMPORTED_MODULE_2__[\"isMobile\"]) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Box\"], {\n      h: \"100vh\",\n      w: \"100vw\",\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Grid\"], {\n        columns: 3,\n        rows: 1,\n        gap: 0,\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"GridItem\"], {\n          colStart: 1,\n          rowStart: 1,\n          bg: \"main\",\n          h: \"100vh\",\n          w: \"60vw\",\n          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Center\"], {\n            h: \"100%\",\n            w: \"100%\",\n            overflowX: \"auto\",\n            whiteSpace: \"nowrap\",\n            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Flex\"], {\n              shrink: 0,\n              ml: \"10vh\",\n              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Box\"], {\n                p: 16,\n                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"img\", {\n                  style: {\n                    borderRadius: \"30px\"\n                  },\n                  src: \"https://cdn.discordapp.com/attachments/692861972731002995/812364551227441212/iPhone_X-XS-11_Pro_2.png\"\n                }, void 0, false, {\n                  fileName: _jsxFileName,\n                  lineNumber: 15,\n                  columnNumber: 11\n                }, undefined)\n              }, void 0, false, {\n                fileName: _jsxFileName,\n                lineNumber: 14,\n                columnNumber: 9\n              }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Box\"], {\n                p: 16,\n                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"img\", {\n                  style: {\n                    borderRadius: \"30px\"\n                  },\n                  src: \"https://cdn.discordapp.com/attachments/692861972731002995/812364552457027614/iPhone_X-XS-11_Pro_1.png\"\n                }, void 0, false, {\n                  fileName: _jsxFileName,\n                  lineNumber: 18,\n                  columnNumber: 11\n                }, undefined)\n              }, void 0, false, {\n                fileName: _jsxFileName,\n                lineNumber: 17,\n                columnNumber: 9\n              }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Box\"], {\n                p: 16,\n                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"img\", {\n                  style: {\n                    borderRadius: \"30px\"\n                  },\n                  src: \"https://cdn.discordapp.com/attachments/692861972731002995/812364553459204196/iPhone_X-XS-11_Pro_3.png\"\n                }, void 0, false, {\n                  fileName: _jsxFileName,\n                  lineNumber: 22,\n                  columnNumber: 11\n                }, undefined)\n              }, void 0, false, {\n                fileName: _jsxFileName,\n                lineNumber: 21,\n                columnNumber: 9\n              }, undefined)]\n            }, void 0, true, {\n              fileName: _jsxFileName,\n              lineNumber: 13,\n              columnNumber: 7\n            }, undefined)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 12,\n            columnNumber: 7\n          }, undefined)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 11,\n          columnNumber: 5\n        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"GridItem\"], {\n          colStart: 3,\n          rowStart: 1,\n          bg: \"white\",\n          h: \"100vh\",\n          w: \"40vw\",\n          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Center\"], {\n            h: \"100%\",\n            w: \"100%\",\n            p: \"200px\",\n            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Heading\"], {\n              color: \"black\",\n              children: \"the next wave in personal finance technology\"\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 29,\n              columnNumber: 9\n            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"img\", {\n              src: \"https://media.discordapp.net/attachments/692861972731002995/810216310452781106/logo.png?width=200&height=200\"\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 30,\n              columnNumber: 9\n            }, undefined)]\n          }, void 0, true, {\n            fileName: _jsxFileName,\n            lineNumber: 28,\n            columnNumber: 7\n          }, undefined)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 27,\n          columnNumber: 5\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 10,\n        columnNumber: 3\n      }, undefined)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 3\n    }, undefined);\n  } else {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__[\"Center\"], {\n      h: \"100vh\",\n      w: \"100vw\",\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"img\", {\n        src: \"https://media.discordapp.net/attachments/692861972731002995/810216310452781106/logo.png?width=200&height=200\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 39,\n        columnNumber: 9\n      }, undefined)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 38,\n      columnNumber: 7\n    }, undefined);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Index); //https://cdn.discordapp.com/attachments/692861972731002995/812364553459204196/iPhone_X-XS-11_Pro_3.png//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgudHN4PzQxZTAiXSwibmFtZXMiOlsiSW5kZXgiLCJpc01vYmlsZSIsImJvcmRlclJhZGl1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7QUFDQTs7QUFHQSxNQUFNQSxLQUFLLEdBQUcsTUFBTTtBQUNsQixNQUFJLENBQUNDLDREQUFMLEVBQWU7QUFDYix3QkFDRixxRUFBQyxvREFBRDtBQUFLLE9BQUMsRUFBQyxPQUFQO0FBQWUsT0FBQyxFQUFDLE9BQWpCO0FBQUEsNkJBQ0EscUVBQUMscURBQUQ7QUFBTSxlQUFPLEVBQUUsQ0FBZjtBQUFtQixZQUFJLEVBQUUsQ0FBekI7QUFBNEIsV0FBRyxFQUFFLENBQWpDO0FBQUEsZ0NBQ0UscUVBQUMseURBQUQ7QUFBVSxrQkFBUSxFQUFFLENBQXBCO0FBQXVCLGtCQUFRLEVBQUUsQ0FBakM7QUFBb0MsWUFBRSxFQUFDLE1BQXZDO0FBQThDLFdBQUMsRUFBQyxPQUFoRDtBQUF3RCxXQUFDLEVBQUMsTUFBMUQ7QUFBQSxpQ0FDRSxxRUFBQyx1REFBRDtBQUFRLGFBQUMsRUFBQyxNQUFWO0FBQWlCLGFBQUMsRUFBQyxNQUFuQjtBQUEyQixxQkFBUyxFQUFDLE1BQXJDO0FBQTRDLHNCQUFVLEVBQUMsUUFBdkQ7QUFBQSxtQ0FDQSxxRUFBQyxxREFBRDtBQUFNLG9CQUFNLEVBQUUsQ0FBZDtBQUFpQixnQkFBRSxFQUFFLE1BQXJCO0FBQUEsc0NBQ0UscUVBQUMsb0RBQUQ7QUFBSyxpQkFBQyxFQUFFLEVBQVI7QUFBQSx1Q0FDRTtBQUFLLHVCQUFLLEVBQUU7QUFBQ0MsZ0NBQVksRUFBQztBQUFkLG1CQUFaO0FBQW1DLHFCQUFHLEVBQUM7QUFBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBREYsZUFJRSxxRUFBQyxvREFBRDtBQUFLLGlCQUFDLEVBQUUsRUFBUjtBQUFBLHVDQUNFO0FBQUssdUJBQUssRUFBRTtBQUFDQSxnQ0FBWSxFQUFDO0FBQWQsbUJBQVo7QUFBbUMscUJBQUcsRUFBQztBQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFKRixlQVFFLHFFQUFDLG9EQUFEO0FBQUssaUJBQUMsRUFBRSxFQUFSO0FBQUEsdUNBQ0U7QUFBSyx1QkFBSyxFQUFFO0FBQUNBLGdDQUFZLEVBQUM7QUFBZCxtQkFBWjtBQUFtQyxxQkFBRyxFQUFDO0FBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURGLGVBaUJFLHFFQUFDLHlEQUFEO0FBQVUsa0JBQVEsRUFBRSxDQUFwQjtBQUF1QixrQkFBUSxFQUFFLENBQWpDO0FBQW9DLFlBQUUsRUFBQyxPQUF2QztBQUErQyxXQUFDLEVBQUMsT0FBakQ7QUFBeUQsV0FBQyxFQUFDLE1BQTNEO0FBQUEsaUNBQ0UscUVBQUMsdURBQUQ7QUFBUSxhQUFDLEVBQUMsTUFBVjtBQUFpQixhQUFDLEVBQUMsTUFBbkI7QUFBMEIsYUFBQyxFQUFFLE9BQTdCO0FBQUEsb0NBQ0UscUVBQUMsd0RBQUQ7QUFBUyxtQkFBSyxFQUFDLE9BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBREYsZUFFRTtBQUFLLGlCQUFHLEVBQUM7QUFBVDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBakJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREU7QUEyQkUsR0E1QkosTUE2Qks7QUFDSCx3QkFDRSxxRUFBQyx1REFBRDtBQUFRLE9BQUMsRUFBQyxPQUFWO0FBQWtCLE9BQUMsRUFBQyxPQUFwQjtBQUFBLDZCQUNFO0FBQUssV0FBRyxFQUFDO0FBQVQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREY7QUFLRDtBQUNGLENBckNEOztBQXVDZUYsb0VBQWYsRSxDQUNBIiwiZmlsZSI6Ii4vc3JjL3BhZ2VzL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDZW50ZXIsIEhlYWRpbmcsIEJveCwgR3JpZCwgR3JpZEl0ZW0sIEZsZXggfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0JztcbmltcG9ydCB7aXNNb2JpbGV9IGZyb20gJ3JlYWN0LWRldmljZS1kZXRlY3QnO1xuXG5cbmNvbnN0IEluZGV4ID0gKCkgPT4ge1xuICBpZiAoIWlzTW9iaWxlKSB7XG4gICAgcmV0dXJuIChcbiAgPEJveCBoPVwiMTAwdmhcIiB3PVwiMTAwdndcIj5cbiAgPEdyaWQgY29sdW1ucz17M30gIHJvd3M9ezF9IGdhcD17MH0+XG4gICAgPEdyaWRJdGVtIGNvbFN0YXJ0PXsxfSByb3dTdGFydD17MX0gYmc9XCJtYWluXCIgaD1cIjEwMHZoXCIgdz1cIjYwdndcIj5cbiAgICAgIDxDZW50ZXIgaD1cIjEwMCVcIiB3PVwiMTAwJVwiICBvdmVyZmxvd1g9XCJhdXRvXCIgd2hpdGVTcGFjZT1cIm5vd3JhcFwiPlxuICAgICAgPEZsZXggc2hyaW5rPXswfSBtbD17XCIxMHZoXCJ9PlxuICAgICAgICA8Qm94IHA9ezE2fT5cbiAgICAgICAgICA8aW1nIHN0eWxlPXt7Ym9yZGVyUmFkaXVzOlwiMzBweFwifX0gc3JjPVwiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXR0YWNobWVudHMvNjkyODYxOTcyNzMxMDAyOTk1LzgxMjM2NDU1MTIyNzQ0MTIxMi9pUGhvbmVfWC1YUy0xMV9Qcm9fMi5wbmdcIj48L2ltZz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3ggcD17MTZ9PlxuICAgICAgICAgIDxpbWcgc3R5bGU9e3tib3JkZXJSYWRpdXM6XCIzMHB4XCJ9fSBzcmM9XCJodHRwczovL2Nkbi5kaXNjb3JkYXBwLmNvbS9hdHRhY2htZW50cy82OTI4NjE5NzI3MzEwMDI5OTUvODEyMzY0NTUyNDU3MDI3NjE0L2lQaG9uZV9YLVhTLTExX1Byb18xLnBuZ1wiPjwvaW1nPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgXG4gICAgICAgIDxCb3ggcD17MTZ9PlxuICAgICAgICAgIDxpbWcgc3R5bGU9e3tib3JkZXJSYWRpdXM6XCIzMHB4XCJ9fSBzcmM9XCJodHRwczovL2Nkbi5kaXNjb3JkYXBwLmNvbS9hdHRhY2htZW50cy82OTI4NjE5NzI3MzEwMDI5OTUvODEyMzY0NTUzNDU5MjA0MTk2L2lQaG9uZV9YLVhTLTExX1Byb18zLnBuZ1wiPjwvaW1nPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvRmxleD5cbiAgICAgIDwvQ2VudGVyPlxuICAgIDwvR3JpZEl0ZW0+XG4gICAgPEdyaWRJdGVtIGNvbFN0YXJ0PXszfSByb3dTdGFydD17MX0gYmc9XCJ3aGl0ZVwiIGg9XCIxMDB2aFwiIHc9XCI0MHZ3XCI+XG4gICAgICA8Q2VudGVyIGg9XCIxMDAlXCIgdz1cIjEwMCVcIiBwPXtcIjIwMHB4XCJ9PlxuICAgICAgICA8SGVhZGluZyBjb2xvcj1cImJsYWNrXCI+dGhlIG5leHQgd2F2ZSBpbiBwZXJzb25hbCBmaW5hbmNlIHRlY2hub2xvZ3k8L0hlYWRpbmc+XG4gICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYS5kaXNjb3JkYXBwLm5ldC9hdHRhY2htZW50cy82OTI4NjE5NzI3MzEwMDI5OTUvODEwMjE2MzEwNDUyNzgxMTA2L2xvZ28ucG5nP3dpZHRoPTIwMCZoZWlnaHQ9MjAwXCI+PC9pbWc+XG4gICAgICA8L0NlbnRlcj5cbiAgICA8L0dyaWRJdGVtPlxuICA8L0dyaWQ+XG4gIDwvQm94PlxuICAgICl9XG4gIGVsc2Uge1xuICAgIHJldHVybiAoXG4gICAgICA8Q2VudGVyIGg9XCIxMDB2aFwiIHc9XCIxMDB2d1wiPlxuICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWEuZGlzY29yZGFwcC5uZXQvYXR0YWNobWVudHMvNjkyODYxOTcyNzMxMDAyOTk1LzgxMDIxNjMxMDQ1Mjc4MTEwNi9sb2dvLnBuZz93aWR0aD0yMDAmaGVpZ2h0PTIwMFwiPjwvaW1nPlxuICAgICAgPC9DZW50ZXI+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4XG4vL2h0dHBzOi8vY2RuLmRpc2NvcmRhcHAuY29tL2F0dGFjaG1lbnRzLzY5Mjg2MTk3MjczMTAwMjk5NS84MTIzNjQ1NTM0NTkyMDQxOTYvaVBob25lX1gtWFMtMTFfUHJvXzMucG5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@chakra-ui/react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAY2hha3JhLXVpL3JlYWN0XCI/M2I2NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJAY2hha3JhLXVpL3JlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGNoYWtyYS11aS9yZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@chakra-ui/react\n");

/***/ }),

/***/ "react-device-detect":
/*!**************************************!*\
  !*** external "react-device-detect" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-device-detect\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kZXZpY2UtZGV0ZWN0XCI/MTcxZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJyZWFjdC1kZXZpY2UtZGV0ZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZGV2aWNlLWRldGVjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-device-detect\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });