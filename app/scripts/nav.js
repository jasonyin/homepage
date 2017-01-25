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

function highLightNavItem(containerId, selectedElementSelector, highLightCssClass, target) {
  let containerElement = document.getElementById(containerId);
  let selectedElement = containerElement.querySelector(selectedElementSelector);

  if (selectedElement) {
    selectedElement.classList.remove(highLightCssClass);
  }

  target.classList.add(highLightCssClass);

  if (drawer && drawer.open) {
    drawer.open = !drawer.open;
  }
};

export function onJyNavDrawerLinkClick(target) {
  // highlight the selected nav link
  highLightNavItem("jy-id-drawer", ".jy-list-item.jy-temporary-drawer--selected", "jy-temporary-drawer--selected", target);
  highLightNavItem("jy-id-head-navigation", ".jy-c-navigation__link__selected", "jy-c-navigation__link__selected", target);

  switch(target.id.split('-').slice(-1).pop()) {
    case "blogs":
      require.ensure([], function(require){
        require("../templates/blogs").renderBlogs();
      });
      break;

    default:
      jy.main.renderHome();
      break;
  }

  return true;
}