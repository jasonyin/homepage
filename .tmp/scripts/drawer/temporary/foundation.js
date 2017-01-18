'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../../base');

var _constants = require('./constants');

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

var JYTemporaryDrawerFoundation = function (_JYFoundation) {
  _inherits(JYTemporaryDrawerFoundation, _JYFoundation);

  _createClass(JYTemporaryDrawerFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return _constants.cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return _constants.strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        hasClass: function hasClass() /* className: string */{},
        hasNecessaryDom: function hasNecessaryDom() {
          return (/* boolean */false
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
        setTranslateX: function setTranslateX() /* value: number | null */{},
        updateCssVariable: function updateCssVariable() /* value: string */{},
        getFocusableElements: function getFocusableElements() /* NodeList */{},
        saveElementTabState: function saveElementTabState() /* el: Element */{},
        restoreElementTabState: function restoreElementTabState() /* el: Element */{},
        makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
        isRtl: function isRtl() {
          return (/* boolean */false
          );
        },
        getDrawerWidth: function getDrawerWidth() {
          return (/* number */0
          );
        },
        isDrawer: function isDrawer() {
          return (/* el: Element */ /* boolean */false
          );
        }
      };
    }
  }]);

  function JYTemporaryDrawerFoundation(adapter) {
    _classCallCheck(this, JYTemporaryDrawerFoundation);

    var _this = _possibleConstructorReturn(this, (JYTemporaryDrawerFoundation.__proto__ || Object.getPrototypeOf(JYTemporaryDrawerFoundation)).call(this, Object.assign(JYTemporaryDrawerFoundation.defaultAdapter, adapter)));

    _this.transitionEndHandler_ = function (ev) {
      if (_this.adapter_.isDrawer(ev.target)) {
        _this.adapter_.removeClass(JYTemporaryDrawerFoundation.cssClasses.ANIMATING);
        _this.adapter_.deregisterTransitionEndHandler(_this.transitionEndHandler_);
      }
    };

    _this.inert_ = false;

    _this.componentClickHandler_ = function () {
      return _this.close();
    };
    _this.drawerClickHandler_ = function (evt) {
      return evt.stopPropagation();
    };
    _this.componentTouchStartHandler_ = function (evt) {
      return _this.handleTouchStart_(evt);
    };
    _this.componentTouchMoveHandler_ = function (evt) {
      return _this.handleTouchMove_(evt);
    };
    _this.componentTouchEndHandler_ = function (evt) {
      return _this.handleTouchEnd_(evt);
    };
    _this.documentKeydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        _this.close();
      }
    };
    return _this;
  }

  _createClass(JYTemporaryDrawerFoundation, [{
    key: 'init',
    value: function init() {
      var _JYTemporaryDrawerFou = JYTemporaryDrawerFoundation.cssClasses,
          ROOT = _JYTemporaryDrawerFou.ROOT,
          OPEN = _JYTemporaryDrawerFou.OPEN;


      if (!this.adapter_.hasClass(ROOT)) {
        throw new Error(ROOT + ' class required in root element.');
      }

      if (!this.adapter_.hasNecessaryDom()) {
        throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
      }

      if (this.adapter_.hasClass(OPEN)) {
        this.isOpen_ = true;
      } else {
        this.detabinate_();
        this.isOpen_ = false;
      }

      // Make browser aware of custom property being used in this element.
      // Workaround for certain types of hard-to-reproduce heisenbugs.
      this.adapter_.updateCssVariable(0);

      this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.registerDrawerInteractionHandler('click', this.drawerClickHandler_);
      this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.deregisterDrawerInteractionHandler('click', this.drawerClickHandler_);
      this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
      // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    }
  }, {
    key: 'open',
    value: function open() {
      // Make sure custom property values are cleared before starting.
      this.adapter_.updateCssVariable('');

      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.addClass(JYTemporaryDrawerFoundation.cssClasses.ANIMATING);
      this.adapter_.addClass(JYTemporaryDrawerFoundation.cssClasses.OPEN);
      this.retabinate_();
      this.isOpen_ = true;
    }
  }, {
    key: 'close',
    value: function close() {
      // Make sure custom property values are cleared before making any changes.
      this.adapter_.updateCssVariable('');

      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.addClass(JYTemporaryDrawerFoundation.cssClasses.ANIMATING);
      this.adapter_.removeClass(JYTemporaryDrawerFoundation.cssClasses.OPEN);
      this.detabinate_();
      this.isOpen_ = false;
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isOpen_;
    }

    /**
     *  Render all children of the drawer inert when it's closed.
     */

  }, {
    key: 'detabinate_',
    value: function detabinate_() {
      if (this.inert_) {
        return;
      }

      var elements = this.adapter_.getFocusableElements();
      if (elements) {
        for (var i = 0; i < elements.length; i++) {
          this.adapter_.saveElementTabState(elements[i]);
          this.adapter_.makeElementUntabbable(elements[i]);
        }
      }

      this.inert_ = true;
    }

    /**
     *  Make all children of the drawer tabbable again when it's open.
     */

  }, {
    key: 'retabinate_',
    value: function retabinate_() {
      if (!this.inert_) {
        return;
      }

      var elements = this.adapter_.getFocusableElements();
      if (elements) {
        for (var i = 0; i < elements.length; i++) {
          this.adapter_.restoreElementTabState(elements[i]);
        }
      }

      this.inert_ = false;
    }
  }, {
    key: 'handleTouchStart_',
    value: function handleTouchStart_(evt) {
      if (!this.adapter_.hasClass(JYTemporaryDrawerFoundation.cssClasses.OPEN)) {
        return;
      }
      if (evt.pointerType && evt.pointerType !== 'touch') {
        return;
      }

      this.direction_ = this.adapter_.isRtl() ? -1 : 1;
      this.drawerWidth_ = this.adapter_.getDrawerWidth();
      this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
      this.currentX_ = this.startX_;
      this.touchingSideNav_ = true;

      requestAnimationFrame(this.updateDrawer_.bind(this));
    }
  }, {
    key: 'handleTouchMove_',
    value: function handleTouchMove_(evt) {
      if (evt.pointerType && evt.pointerType !== 'touch') {
        return;
      }

      this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    }
  }, {
    key: 'handleTouchEnd_',
    value: function handleTouchEnd_(evt) {
      if (evt.pointerType && evt.pointerType !== 'touch') {
        return;
      }

      this.touchingSideNav_ = false;
      this.adapter_.setTranslateX(null);
      this.adapter_.updateCssVariable('');

      var newPos = null;
      if (this.direction_ === 1) {
        newPos = Math.min(0, this.currentX_ - this.startX_);
      } else {
        newPos = Math.max(0, this.currentX_ - this.startX_);
      }

      // Did the user close the drawer by more than 50%?
      if (Math.abs(newPos / this.drawerWidth_) >= 0.5) {
        this.close();
      } else {
        // Triggering an open here means we'll get a nice animation back to the fully open state.
        this.open();
      }
    }
  }, {
    key: 'updateDrawer_',
    value: function updateDrawer_() {
      if (!this.touchingSideNav_) {
        return;
      }

      requestAnimationFrame(this.updateDrawer_.bind(this));

      var newPos = null;
      var newOpacity = null;

      if (this.direction_ === 1) {
        newPos = Math.min(0, this.currentX_ - this.startX_);
      } else {
        newPos = Math.max(0, this.currentX_ - this.startX_);
      }

      newOpacity = Math.max(0, 1 + this.direction_ * (newPos / this.drawerWidth_));

      this.adapter_.setTranslateX(newPos);
      this.adapter_.updateCssVariable(newOpacity);
    }
  }]);

  return JYTemporaryDrawerFoundation;
}(_base.JYFoundation);

exports.default = JYTemporaryDrawerFoundation;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYXdlci90ZW1wb3JhcnkvZm91bmRhdGlvbi5qcyJdLCJuYW1lcyI6WyJKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJoYXNOZWNlc3NhcnlEb20iLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwiZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyIiwicmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXIiLCJzZXRUcmFuc2xhdGVYIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJnZXRGb2N1c2FibGVFbGVtZW50cyIsInNhdmVFbGVtZW50VGFiU3RhdGUiLCJyZXN0b3JlRWxlbWVudFRhYlN0YXRlIiwibWFrZUVsZW1lbnRVbnRhYmJhYmxlIiwiaXNSdGwiLCJnZXREcmF3ZXJXaWR0aCIsImlzRHJhd2VyIiwiYWRhcHRlciIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRBZGFwdGVyIiwidHJhbnNpdGlvbkVuZEhhbmRsZXJfIiwiZXYiLCJhZGFwdGVyXyIsInRhcmdldCIsImNzc0NsYXNzZXMiLCJBTklNQVRJTkciLCJpbmVydF8iLCJjb21wb25lbnRDbGlja0hhbmRsZXJfIiwiY2xvc2UiLCJkcmF3ZXJDbGlja0hhbmRsZXJfIiwiZXZ0Iiwic3RvcFByb3BhZ2F0aW9uIiwiY29tcG9uZW50VG91Y2hTdGFydEhhbmRsZXJfIiwiaGFuZGxlVG91Y2hTdGFydF8iLCJjb21wb25lbnRUb3VjaE1vdmVIYW5kbGVyXyIsImhhbmRsZVRvdWNoTW92ZV8iLCJjb21wb25lbnRUb3VjaEVuZEhhbmRsZXJfIiwiaGFuZGxlVG91Y2hFbmRfIiwiZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8iLCJrZXkiLCJrZXlDb2RlIiwiUk9PVCIsIk9QRU4iLCJFcnJvciIsImlzT3Blbl8iLCJkZXRhYmluYXRlXyIsInJldGFiaW5hdGVfIiwiZWxlbWVudHMiLCJpIiwibGVuZ3RoIiwicG9pbnRlclR5cGUiLCJkaXJlY3Rpb25fIiwiZHJhd2VyV2lkdGhfIiwic3RhcnRYXyIsInRvdWNoZXMiLCJwYWdlWCIsImN1cnJlbnRYXyIsInRvdWNoaW5nU2lkZU5hdl8iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ1cGRhdGVEcmF3ZXJfIiwiYmluZCIsIm5ld1BvcyIsIk1hdGgiLCJtaW4iLCJtYXgiLCJhYnMiLCJvcGVuIiwibmV3T3BhY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFjQTs7QUFDQTs7Ozs7OytlQWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUtxQkEsMkI7Ozs7O3dCQUNLO0FBQ3RCO0FBQ0Q7Ozt3QkFFb0I7QUFDbkI7QUFDRDs7O3dCQUUyQjtBQUMxQixhQUFPO0FBQ0xDLGtCQUFVLG9CQUFDLHVCQUE0QixDQUFFLENBRHBDO0FBRUxDLHFCQUFhLHVCQUFDLHVCQUE0QixDQUFFLENBRnZDO0FBR0xDLGtCQUFVLG9CQUFDLHVCQUE0QixDQUFFLENBSHBDO0FBSUxDLHlCQUFpQjtBQUFBLGlCQUFNLGNBQWM7QUFBcEI7QUFBQSxTQUpaO0FBS0xDLG9DQUE0QixzQ0FBQyx5Q0FBOEMsQ0FBRSxDQUx4RTtBQU1MQyxzQ0FBOEIsd0NBQUMseUNBQThDLENBQUUsQ0FOMUU7QUFPTEMsMENBQWtDLDRDQUFDLHlDQUE4QyxDQUFFLENBUDlFO0FBUUxDLDRDQUFvQyw4Q0FBQyx5Q0FBOEMsQ0FBRSxDQVJoRjtBQVNMQyxzQ0FBOEIsd0NBQUMsNEJBQWlDLENBQUUsQ0FUN0Q7QUFVTEMsd0NBQWdDLDBDQUFDLDRCQUFpQyxD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QUFTQyxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUtQLFNBQUwsR0FBaUIsS0FBS0gsT0FBbEMsQ0FBVDtBQUNELE9BRkQsTUFFTztBQUNMUSxpQkFBU0MsS0FBS0UsR0FBTCxDQUFTLENBQVQsRUFBWSxLQUFLUixTQUFMLEdBQWlCLEtBQUtILE9BQWxDLENBQVQ7QUFDRDs7QUFFRGMsbUJBQWFMLEtBQUtFLEdBQUwsQ0FBUyxDQUFULEVBQVksSUFBSSxLQUFLYixVQUFMLElBQW1CVSxTQUFTLEtBQUtULFlBQWpDLENBQWhCLENBQWI7O0FBRUEsV0FBSzlCLFFBQUwsQ0FBY2YsYUFBZCxDQUE0QnNELE1BQTVCO0FBQ0EsV0FBS3ZDLFFBQUwsQ0FBY2QsaUJBQWQsQ0FBZ0MyRCxVQUFoQztBQUNEOzs7Ozs7a0JBek9rQnpFLDJCIiwiZmlsZSI6ImRyYXdlci90ZW1wb3JhcnkvZm91bmRhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICAgIENvcHlyaWdodCAyMDE3IEphc29uIFlpbiA8amFzb255aW5Ab3V0bG9vay5jb20+XG4vLyBcbi8vICAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyAgICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyAgICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vIFxuLy8gICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy8gXG4vLyAgICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyAgICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyAgICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vICAgIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vICAgIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQge0pZRm91bmRhdGlvbn0gZnJvbSAnLi4vLi4vYmFzZSc7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSllUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uIGV4dGVuZHMgSllGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaGFzTmVjZXNzYXJ5RG9tOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBzZXRUcmFuc2xhdGVYOiAoLyogdmFsdWU6IG51bWJlciB8IG51bGwgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldEZvY3VzYWJsZUVsZW1lbnRzOiAoKSA9PiAvKiBOb2RlTGlzdCAqLyB7fSxcbiAgICAgIHNhdmVFbGVtZW50VGFiU3RhdGU6ICgvKiBlbDogRWxlbWVudCAqLykgPT4ge30sXG4gICAgICByZXN0b3JlRWxlbWVudFRhYlN0YXRlOiAoLyogZWw6IEVsZW1lbnQgKi8pID0+IHt9LFxuICAgICAgbWFrZUVsZW1lbnRVbnRhYmJhYmxlOiAoLyogZWw6IEVsZW1lbnQgKi8pID0+IHt9LFxuICAgICAgaXNSdGw6ICgpID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBnZXREcmF3ZXJXaWR0aDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBpc0RyYXdlcjogKC8qIGVsOiBFbGVtZW50ICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfID0gKGV2KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc0RyYXdlcihldi50YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoSllUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIodGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluZXJ0XyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfID0gKCkgPT4gdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuZHJhd2VyQ2xpY2tIYW5kbGVyXyA9IChldnQpID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmNvbXBvbmVudFRvdWNoU3RhcnRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlVG91Y2hTdGFydF8oZXZ0KTtcbiAgICB0aGlzLmNvbXBvbmVudFRvdWNoTW92ZUhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUb3VjaE1vdmVfKGV2dCk7XG4gICAgdGhpcy5jb21wb25lbnRUb3VjaEVuZEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUb3VjaEVuZF8oZXZ0KTtcbiAgICB0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC5rZXkgJiYgZXZ0LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZ0LmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCB7Uk9PVCwgT1BFTn0gPSBKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3NlcztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhST09UKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke1JPT1R9IGNsYXNzIHJlcXVpcmVkIGluIHJvb3QgZWxlbWVudC5gKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzTmVjZXNzYXJ5RG9tKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZWQgRE9NIG5vZGVzIG1pc3NpbmcgaW4gJHtST09UfSBjb21wb25lbnQuYCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoT1BFTikpIHtcbiAgICAgIHRoaXMuaXNPcGVuXyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGV0YWJpbmF0ZV8oKTtcbiAgICAgIHRoaXMuaXNPcGVuXyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIE1ha2UgYnJvd3NlciBhd2FyZSBvZiBjdXN0b20gcHJvcGVydHkgYmVpbmcgdXNlZCBpbiB0aGlzIGVsZW1lbnQuXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgY2VydGFpbiB0eXBlcyBvZiBoYXJkLXRvLXJlcHJvZHVjZSBoZWlzZW5idWdzLlxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoMCk7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmRyYXdlckNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmNvbXBvbmVudFRvdWNoU3RhcnRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2htb3ZlJywgdGhpcy5jb21wb25lbnRUb3VjaE1vdmVIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hlbmQnLCB0aGlzLmNvbXBvbmVudFRvdWNoRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5kcmF3ZXJDbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmNvbXBvbmVudFRvdWNoU3RhcnRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCd0b3VjaG1vdmUnLCB0aGlzLmNvbXBvbmVudFRvdWNoTW92ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNoZW5kJywgdGhpcy5jb21wb25lbnRUb3VjaEVuZEhhbmRsZXJfKTtcbiAgICAvLyBEZXJlZ2lzdGVyIHRoZSBkb2N1bWVudCBrZXlkb3duIGhhbmRsZXIganVzdCBpbiBjYXNlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkIHdoaWxlIHRoZSBtZW51IGlzIG9wZW4uXG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcih0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgLy8gTWFrZSBzdXJlIGN1c3RvbSBwcm9wZXJ0eSB2YWx1ZXMgYXJlIGNsZWFyZWQgYmVmb3JlIHN0YXJ0aW5nLlxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoJycpO1xuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyKHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcih0aGlzLmRvY3VtZW50S2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEpZVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElORyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgICB0aGlzLnJldGFiaW5hdGVfKCk7XG4gICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIC8vIE1ha2Ugc3VyZSBjdXN0b20gcHJvcGVydHkgdmFsdWVzIGFyZSBjbGVhcmVkIGJlZm9yZSBtYWtpbmcgYW55IGNoYW5nZXMuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZSgnJyk7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyKHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcih0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoSllUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1BFTik7XG4gICAgdGhpcy5kZXRhYmluYXRlXygpO1xuICAgIHRoaXMuaXNPcGVuXyA9IGZhbHNlO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLmlzT3Blbl87XG4gIH1cblxuICAvKipcbiAgICogIFJlbmRlciBhbGwgY2hpbGRyZW4gb2YgdGhlIGRyYXdlciBpbmVydCB3aGVuIGl0J3MgY2xvc2VkLlxuICAgKi9cbiAgZGV0YWJpbmF0ZV8oKSB7XG4gICAgaWYgKHRoaXMuaW5lcnRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmFkYXB0ZXJfLmdldEZvY3VzYWJsZUVsZW1lbnRzKCk7XG4gICAgaWYgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uc2F2ZUVsZW1lbnRUYWJTdGF0ZShlbGVtZW50c1tpXSk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ubWFrZUVsZW1lbnRVbnRhYmJhYmxlKGVsZW1lbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmluZXJ0XyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogIE1ha2UgYWxsIGNoaWxkcmVuIG9mIHRoZSBkcmF3ZXIgdGFiYmFibGUgYWdhaW4gd2hlbiBpdCdzIG9wZW4uXG4gICAqL1xuICByZXRhYmluYXRlXygpIHtcbiAgICBpZiAoIXRoaXMuaW5lcnRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmFkYXB0ZXJfLmdldEZvY3VzYWJsZUVsZW1lbnRzKCk7XG4gICAgaWYgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVzdG9yZUVsZW1lbnRUYWJTdGF0ZShlbGVtZW50c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbmVydF8gPSBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoU3RhcnRfKGV2dCkge1xuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhKWVRlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXZ0LnBvaW50ZXJUeXBlICYmIGV2dC5wb2ludGVyVHlwZSAhPT0gJ3RvdWNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGlyZWN0aW9uXyA9IHRoaXMuYWRhcHRlcl8uaXNSdGwoKSA/IC0xIDogMTtcbiAgICB0aGlzLmRyYXdlcldpZHRoXyA9IHRoaXMuYWRhcHRlcl8uZ2V0RHJhd2VyV2lkdGgoKTtcbiAgICB0aGlzLnN0YXJ0WF8gPSBldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdLnBhZ2VYIDogZXZ0LnBhZ2VYO1xuICAgIHRoaXMuY3VycmVudFhfID0gdGhpcy5zdGFydFhfO1xuICAgIHRoaXMudG91Y2hpbmdTaWRlTmF2XyA9IHRydWU7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVEcmF3ZXJfLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hNb3ZlXyhldnQpIHtcbiAgICBpZiAoZXZ0LnBvaW50ZXJUeXBlICYmIGV2dC5wb2ludGVyVHlwZSAhPT0gJ3RvdWNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFhfID0gZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoRW5kXyhldnQpIHtcbiAgICBpZiAoZXZ0LnBvaW50ZXJUeXBlICYmIGV2dC5wb2ludGVyVHlwZSAhPT0gJ3RvdWNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudG91Y2hpbmdTaWRlTmF2XyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0VHJhbnNsYXRlWChudWxsKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKCcnKTtcblxuICAgIGxldCBuZXdQb3MgPSBudWxsO1xuICAgIGlmICh0aGlzLmRpcmVjdGlvbl8gPT09IDEpIHtcbiAgICAgIG5ld1BvcyA9IE1hdGgubWluKDAsIHRoaXMuY3VycmVudFhfIC0gdGhpcy5zdGFydFhfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3UG9zID0gTWF0aC5tYXgoMCwgdGhpcy5jdXJyZW50WF8gLSB0aGlzLnN0YXJ0WF8pO1xuICAgIH1cblxuICAgIC8vIERpZCB0aGUgdXNlciBjbG9zZSB0aGUgZHJhd2VyIGJ5IG1vcmUgdGhhbiA1MCU/XG4gICAgaWYgKE1hdGguYWJzKG5ld1BvcyAvIHRoaXMuZHJhd2VyV2lkdGhfKSA+PSAwLjUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJpZ2dlcmluZyBhbiBvcGVuIGhlcmUgbWVhbnMgd2UnbGwgZ2V0IGEgbmljZSBhbmltYXRpb24gYmFjayB0byB0aGUgZnVsbHkgb3BlbiBzdGF0ZS5cbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZURyYXdlcl8oKSB7XG4gICAgaWYgKCF0aGlzLnRvdWNoaW5nU2lkZU5hdl8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVEcmF3ZXJfLmJpbmQodGhpcykpO1xuXG4gICAgbGV0IG5ld1BvcyA9IG51bGw7XG4gICAgbGV0IG5ld09wYWNpdHkgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uXyA9PT0gMSkge1xuICAgICAgbmV3UG9zID0gTWF0aC5taW4oMCwgdGhpcy5jdXJyZW50WF8gLSB0aGlzLnN0YXJ0WF8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdQb3MgPSBNYXRoLm1heCgwLCB0aGlzLmN1cnJlbnRYXyAtIHRoaXMuc3RhcnRYXyk7XG4gICAgfVxuXG4gICAgbmV3T3BhY2l0eSA9IE1hdGgubWF4KDAsIDEgKyB0aGlzLmRpcmVjdGlvbl8gKiAobmV3UG9zIC8gdGhpcy5kcmF3ZXJXaWR0aF8pKTtcblxuICAgIHRoaXMuYWRhcHRlcl8uc2V0VHJhbnNsYXRlWChuZXdQb3MpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUobmV3T3BhY2l0eSk7XG4gIH1cbn1cbiJdfQ==
