'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//    Copyright 2017 Jason Yin <jasonyin@outlook.com>
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

var ROOT = 'jy-temporary-drawer';

var cssClasses = exports.cssClasses = {
  ROOT: ROOT,
  OPEN: ROOT + '--open',
  ANIMATING: ROOT + '--animating',
  RIGHT: ROOT + '--right'
};

var strings = exports.strings = {
  DRAWER_SELECTOR: '.' + ROOT + '__drawer',
  OPACITY_VAR_NAME: '--' + ROOT + '-opacity',
  FOCUSABLE_ELEMENTS: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYXdlci90ZW1wb3JhcnkvY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIlJPT1QiLCJjc3NDbGFzc2VzIiwiT1BFTiIsIkFOSU1BVElORyIsIlJJR0hUIiwic3RyaW5ncyIsIkRSQVdFUl9TRUxFQ1RPUiIsIk9QQUNJVFlfVkFSX05BTUUiLCJGT0NVU0FCTEVfRUxFTUVOVFMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsT0FBTyxxQkFBYjs7QUFFTyxJQUFNQyxrQ0FBYTtBQUN4QkQsWUFEd0I7QUFFeEJFLFFBQVNGLElBQVQsV0FGd0I7QUFHeEJHLGFBQWNILElBQWQsZ0JBSHdCO0FBSXhCSSxTQUFVSixJQUFWO0FBSndCLENBQW5COztBQU9BLElBQU1LLDRCQUFVO0FBQ3JCQyx5QkFBcUJOLElBQXJCLGFBRHFCO0FBRXJCTywyQkFBdUJQLElBQXZCLGFBRnFCO0FBR3JCUSxzQkFBb0IsbUdBQ2hCO0FBSmlCLENBQWhCIiwiZmlsZSI6ImRyYXdlci90ZW1wb3JhcnkvY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gICAgQ29weXJpZ2h0IDIwMTcgSmFzb24gWWluIDxqYXNvbnlpbkBvdXRsb29rLmNvbT5cbi8vIFxuLy8gICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vICAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vICAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy8gXG4vLyAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vLyBcbi8vICAgIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vICAgIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vICAgIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gICAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gICAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmNvbnN0IFJPT1QgPSAnanktdGVtcG9yYXJ5LWRyYXdlcic7XG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09ULFxuICBPUEVOOiBgJHtST09UfS0tb3BlbmAsXG4gIEFOSU1BVElORzogYCR7Uk9PVH0tLWFuaW1hdGluZ2AsXG4gIFJJR0hUOiBgJHtST09UfS0tcmlnaHRgLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIERSQVdFUl9TRUxFQ1RPUjogYC4ke1JPT1R9X19kcmF3ZXJgLFxuICBPUEFDSVRZX1ZBUl9OQU1FOiBgLS0ke1JPT1R9LW9wYWNpdHlgLFxuICBGT0NVU0FCTEVfRUxFTUVOVFM6ICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgJyArXG4gICAgICAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCBbdGFiaW5kZXhdLCBbY29udGVudGVkaXRhYmxlXScsXG59O1xuIl19
