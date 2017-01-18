'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JYTemporaryDrawer = exports.JYTemporaryDrawerFoundation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../../base');

var _foundation = require('./foundation');

var _foundation2 = _interopRequireDefault(_foundation);

var _util = require('../util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //    Copyright 2017 Jason Yin <jasonyin@outlook.com>
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

exports.JYTemporaryDrawerFoundation = _foundation2.default;

var JYTemporaryDrawer = exports.JYTemporaryDrawer = function (_JYComponent) {
  _inherits(JYTemporaryDrawer, _JYComponent);

  function JYTemporaryDrawer() {
    _classCallCheck(this, JYTemporaryDrawer);

    return _possibleConstructorReturn(this, (JYTemporaryDrawer.__proto__ || Object.getPrototypeOf(JYTemporaryDrawer)).apply(this, arguments));
  }

  _createClass(JYTemporaryDrawer, [{
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      var _JYTemporaryDrawerFou = _foundation2.default.strings,
          FOCUSABLE_ELEMENTS = _JYTemporaryDrawerFou.FOCUSABLE_ELEMENTS,
          OPACITY_VAR_NAME = _JYTemporaryDrawerFou.OPACITY_VAR_NAME;


      return new _foundation2.default({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        hasClass: function hasClass(className) {
          return _this2.root_.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return Boolean(_this2.drawer);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          return _this2.root_.addEventListener(util.remapEvent(evt), handler, util.applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          return _this2.root_.removeEventListener(util.remapEvent(evt), handler, util.applyPassive());
        },
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
          return _this2.drawer.addEventListener(util.remapEvent(evt), handler);
        },
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
          return _this2.drawer.removeEventListener(util.remapEvent(evt), handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          return _this2.drawer.addEventListener('transitionend', handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          return _this2.drawer.removeEventListener('transitionend', handler);
        },
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
          return document.addEventListener('keydown', handler);
        },
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
          return document.removeEventListener('keydown', handler);
        },
        getDrawerWidth: function getDrawerWidth() {
          return _this2.drawer.offsetWidth;
        },
        setTranslateX: function setTranslateX(value) {
          return _this2.drawer.style.setProperty(util.getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
        },
        updateCssVariable: function updateCssVariable(value) {
          if (util.supportsCssCustomProperties()) {
            _this2.root_.style.setProperty(OPACITY_VAR_NAME, value);
          }
        },
        getFocusableElements: function getFocusableElements() {
          return _this2.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
        },
        saveElementTabState: function saveElementTabState(el) {
          return util.saveElementTabState(el);
        },
        restoreElementTabState: function restoreElementTabState(el) {
          return util.restoreElementTabState(el);
        },
        makeElementUntabbable: function makeElementUntabbable(el) {
          return el.setAttribute('tabindex', -1);
        },
        isRtl: function isRtl() {
          return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
        },
        isDrawer: function isDrawer(el) {
          return el === _this2.drawer;
        }
      });
    }
  }, {
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }

    /* Return the drawer element inside the component. */

  }, {
    key: 'drawer',
    get: function get() {
      return this.root_.querySelector(_foundation2.default.strings.DRAWER_SELECTOR);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new JYTemporaryDrawer(root);
    }
  }]);

  return JYTemporaryDrawer;
}(_base.JYComponent);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYXdlci90ZW1wb3JhcnkvaW5kZXguanMiXSwibmFtZXMiOlsidXRpbCIsIkpZVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbiIsIkpZVGVtcG9yYXJ5RHJhd2VyIiwic3RyaW5ncyIsIkZPQ1VTQUJMRV9FTEVNRU5UUyIsIk9QQUNJVFlfVkFSX05BTUUiLCJhZGRDbGFzcyIsImNsYXNzTmFtZSIsInJvb3RfIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmUiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiaGFzTmVjZXNzYXJ5RG9tIiwiQm9vbGVhbiIsImRyYXdlciIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZXZ0IiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1hcEV2ZW50IiwiYXBwbHlQYXNzaXZlIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwiZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyIiwiZG9jdW1lbnQiLCJkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlciIsImdldERyYXdlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzZXRUcmFuc2xhdGVYIiwidmFsdWUiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJzdXBwb3J0c0Nzc0N1c3RvbVByb3BlcnRpZXMiLCJnZXRGb2N1c2FibGVFbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzYXZlRWxlbWVudFRhYlN0YXRlIiwiZWwiLCJyZXN0b3JlRWxlbWVudFRhYlN0YXRlIiwibWFrZUVsZW1lbnRVbnRhYmJhYmxlIiwic2V0QXR0cmlidXRlIiwiaXNSdGwiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsImlzRHJhd2VyIiwiZm91bmRhdGlvbl8iLCJpc09wZW4iLCJvcGVuIiwiY2xvc2UiLCJxdWVyeVNlbGVjdG9yIiwiRFJBV0VSX1NFTEVDVE9SIiwicm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBY0E7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsSTs7Ozs7Ozs7OzsrZUFoQlo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O1FBTVFDLDJCOztJQUVLQyxpQixXQUFBQSxpQjs7Ozs7Ozs7Ozs7MkNBc0JZO0FBQUE7O0FBQUEsa0NBQzBCLHFCQUE0QkMsT0FEdEQ7QUFBQSxVQUNkQyxrQkFEYyx5QkFDZEEsa0JBRGM7QUFBQSxVQUNNQyxnQkFETix5QkFDTUEsZ0JBRE47OztBQUdyQixhQUFPLHlCQUFnQztBQUNyQ0Msa0JBQVUsa0JBQUNDLFNBQUQ7QUFBQSxpQkFBZSxPQUFLQyxLQUFMLENBQVdDLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCSCxTQUF6QixDQUFmO0FBQUEsU0FEMkI7QUFFckNJLHFCQUFhLHFCQUFDSixTQUFEO0FBQUEsaUJBQWUsT0FBS0MsS0FBTCxDQUFXQyxTQUFYLENBQXFCRyxNQUFyQixDQUE0QkwsU0FBNUIsQ0FBZjtBQUFBLFNBRndCO0FBR3JDTSxrQkFBVSxrQkFBQ04sU0FBRDtBQUFBLGlCQUFlLE9BQUtDLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQkssUUFBckIsQ0FBOEJQLFNBQTlCLENBQWY7QUFBQSxTQUgyQjtBQUlyQ1EseUJBQWlCO0FBQUEsaUJBQU1DLFFBQVEsT0FBS0MsTUFBYixDQUFOO0FBQUEsU0FKb0I7QUFLckNDLG9DQUE0QixvQ0FBQ0MsR0FBRCxFQUFNQyxPQUFOO0FBQUEsaUJBQ3hCLE9BQUtaLEtBQUwsQ0FBV2EsZ0JBQVgsQ0FB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QjtBQUFBO0FBOUIyQixPQUFoQyxDQUFQO0FBZ0NEOzs7d0JBcERVO0FBQ1QsYUFBTyxLQUFLb0MsV0FBTCxDQUFpQkMsTUFBakIsRUFBUDtBQUNELEs7c0JBRVFsQixLLEVBQU87QUFDZCxVQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFLaUIsV0FBTCxDQUFpQkUsSUFBakI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLRixXQUFMLENBQWlCRyxLQUFqQjtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7d0JBQ2E7QUFDWCxhQUFPLEtBQUtoRCxLQUFMLENBQVdpRCxhQUFYLENBQXlCLHFCQUE0QnRELE9BQTVCLENBQW9DdUQsZUFBN0QsQ0FBUDtBQUNEOzs7NkJBbkJlQyxJLEVBQU07QUFDcEIsYUFBTyxJQUFJekQsaUJBQUosQ0FBc0J5RCxJQUF0QixDQUFQO0FBQ0QiLCJmaWxlIjoiZHJhd2VyL3RlbXBvcmFyeS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICAgIENvcHlyaWdodCAyMDE3IEphc29uIFlpbiA8amFzb255aW5Ab3V0bG9vay5jb20+XG4vLyBcbi8vICAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyAgICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyAgICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vIFxuLy8gICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy8gXG4vLyAgICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyAgICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyAgICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vICAgIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vICAgIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQge0pZQ29tcG9uZW50fSBmcm9tICcuLi8uLi9iYXNlJztcbmltcG9ydCBKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCB7SllUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9ufTtcblxuZXhwb3J0IGNsYXNzIEpZVGVtcG9yYXJ5RHJhd2VyIGV4dGVuZHMgSllDb21wb25lbnQge1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgSllUZW1wb3JhcnlEcmF3ZXIocm9vdCk7XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uXy5pc09wZW4oKTtcbiAgfVxuXG4gIHNldCBvcGVuKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb25fLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uXy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qIFJldHVybiB0aGUgZHJhd2VyIGVsZW1lbnQgaW5zaWRlIHRoZSBjb21wb25lbnQuICovXG4gIGdldCBkcmF3ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uc3RyaW5ncy5EUkFXRVJfU0VMRUNUT1IpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgY29uc3Qge0ZPQ1VTQUJMRV9FTEVNRU5UUywgT1BBQ0lUWV9WQVJfTkFNRX0gPSBKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHJldHVybiBuZXcgSllUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgaGFzTmVjZXNzYXJ5RG9tOiAoKSA9PiBCb29sZWFuKHRoaXMuZHJhd2VyKSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PlxuICAgICAgICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcih1dGlsLnJlbWFwRXZlbnQoZXZ0KSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PlxuICAgICAgICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcih1dGlsLnJlbWFwRXZlbnQoZXZ0KSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT5cbiAgICAgICAgICB0aGlzLmRyYXdlci5hZGRFdmVudExpc3RlbmVyKHV0aWwucmVtYXBFdmVudChldnQpLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgICAgdGhpcy5kcmF3ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih1dGlsLnJlbWFwRXZlbnQoZXZ0KSwgaGFuZGxlciksXG4gICAgICByZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoaGFuZGxlcikgPT4gdGhpcy5kcmF3ZXIuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoaGFuZGxlcikgPT4gdGhpcy5kcmF3ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpLFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoaGFuZGxlcikgPT4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6IChoYW5kbGVyKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlciksXG4gICAgICBnZXREcmF3ZXJXaWR0aDogKCkgPT4gdGhpcy5kcmF3ZXIub2Zmc2V0V2lkdGgsXG4gICAgICBzZXRUcmFuc2xhdGVYOiAodmFsdWUpID0+IHRoaXMuZHJhd2VyLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgIHV0aWwuZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKCksIHZhbHVlID09PSBudWxsID8gbnVsbCA6IGB0cmFuc2xhdGVYKCR7dmFsdWV9cHgpYCksXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh1dGlsLnN1cHBvcnRzQ3NzQ3VzdG9tUHJvcGVydGllcygpKSB7XG4gICAgICAgICAgdGhpcy5yb290Xy5zdHlsZS5zZXRQcm9wZXJ0eShPUEFDSVRZX1ZBUl9OQU1FLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRGb2N1c2FibGVFbGVtZW50czogKCkgPT4gdGhpcy5kcmF3ZXIucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFMpLFxuICAgICAgc2F2ZUVsZW1lbnRUYWJTdGF0ZTogKGVsKSA9PiB1dGlsLnNhdmVFbGVtZW50VGFiU3RhdGUoZWwpLFxuICAgICAgcmVzdG9yZUVsZW1lbnRUYWJTdGF0ZTogKGVsKSA9PiB1dGlsLnJlc3RvcmVFbGVtZW50VGFiU3RhdGUoZWwpLFxuICAgICAgbWFrZUVsZW1lbnRVbnRhYmJhYmxlOiAoZWwpID0+IGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSksXG4gICAgICBpc1J0bDogKCkgPT4gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnJvb3RfKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcsXG4gICAgICBpc0RyYXdlcjogKGVsKSA9PiBlbCA9PT0gdGhpcy5kcmF3ZXIsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
