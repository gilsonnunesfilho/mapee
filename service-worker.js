/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","079d286761f1d091dbe8cafc76ce199a"],["bower_components/app-layout/app-drawer/app-drawer.html","39fc02164278d922f06a12a815aff142"],["bower_components/app-layout/app-header-layout/app-header-layout.html","fb94f4326d321cc284ab65273f3563c7"],["bower_components/app-layout/app-header/app-header.html","305ada3409999055fe3e37aa366efacb"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","09bc22bdba053c05f0e478f37a7fcba6"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","1ee969ea308114897fbd8ec30875f38e"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","8851e2bc1d02cb787bb8ec121a8f86dd"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","246c6867873a377de41329abc8ceee4f"],["bower_components/app-layout/app-scroll-effects/effects/material.html","7b79bae72b77d2510655c4d713960a0d"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","768c5ab949acf23970c8b6c439d97bb4"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","6f34677105a5bb5083abaf30d17d9b06"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","1491250febe3721d0b21778a69c34d5e"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","8819a9e809201c5ba3d2d40403ede42a"],["bower_components/app-layout/app-toolbar/app-toolbar.html","cac42c92a39fd9611d080d1362905030"],["bower_components/app-layout/helpers/helpers.html","237274971e65a747a047e2687ff004a7"],["bower_components/app-route/app-location.html","de6787552bb6869105257c287b358164"],["bower_components/app-route/app-route-converter-behavior.html","80ac2fc0afb9dd16ac225ba3713aa0a3"],["bower_components/app-route/app-route.html","68c61fe6f9782538ac88d1375b79a1e2"],["bower_components/app-storage/app-localstorage/app-localstorage-document.html","ca9748a74cb1edfb4aca3b8458cbdd45"],["bower_components/app-storage/app-storage-behavior.html","eefcf6699b2e2351282f7af500a8c2a5"],["bower_components/fluido-expansion-panel/fluido-expansion-icons.html","e5a01ddd1782713ef16abb53cca690d4"],["bower_components/fluido-expansion-panel/fluido-expansion-panel.html","716d56d791bb7d46cb625208af0aa0eb"],["bower_components/fluido-expansion-panel/fluido-expansion-panels.html","9df1608711b2bf37e0d7958cfdb0d2bf"],["bower_components/fluido-paper-login/fluido-paper-login-icons.html","02cf9dd1d39a0bf7a24196e8179ab046"],["bower_components/fluido-paper-login/fluido-paper-login.html","9cecf0e6d31e29238a91fcecf8311eb6"],["bower_components/fluido-stepper/fluido-step-label.html","303277cade4dd5be9be82a8a089d2199"],["bower_components/fluido-stepper/fluido-step.html","6f69ef7c6b7e4de65417663cff19b47d"],["bower_components/fluido-stepper/fluido-stepper-icons.html","fba1a7eca2eb2bc31f8ced28f6ba7341"],["bower_components/fluido-stepper/fluido-stepper.html","925115ce4de01945eb211205042c8b0c"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/google-chart/charts-loader.html","0e92e6ecf626859c15830172bcf15562"],["bower_components/google-chart/google-chart-loader.html","8c2f50850c13b77d4d9d8dfae480d660"],["bower_components/google-chart/google-chart-styles.html","0edde08b4464aaf1d7de498898f50dc6"],["bower_components/google-chart/google-chart.html","f61bbcd638ce3391fe527cb8c6bdbe92"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","3891d462c464862c5706e114e1abe93b"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","de57201642e8aa7eadebad45ca7b35e7"],["bower_components/iron-a11y-keys/iron-a11y-keys.html","6a8c8c2c575dcdd7fc5dfe6c6d9ccf72"],["bower_components/iron-ajax/iron-ajax.html","0e549efa574d0bdda759893a51390e00"],["bower_components/iron-ajax/iron-request.html","d6b6d21e348b7b8294521f998aecf979"],["bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","638755357b2232fec7d98c6d8cdab219"],["bower_components/iron-behaviors/iron-button-state.html","2034e45c1e5117b83033713cda6a0b4f"],["bower_components/iron-behaviors/iron-control-state.html","f164e39ba4d7bf5a51742d5d68c5caee"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","0e28003f171922990b2a8ea1ccb9d130"],["bower_components/iron-collapse/iron-collapse.html","63b719b884fd407b6a7e12d152d99117"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","2c130887355bcec6b7b2ebe193f545ab"],["bower_components/iron-dropdown/iron-dropdown.html","c52449e0659595ee29d557741b24f4f4"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","d017c37e8e343ede515255059b4d78db"],["bower_components/iron-flex-layout/iron-flex-layout.html","40fbf9b980a269b5507022f32f9b413c"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","1856c886fd1b03a96ae6df3db6796e9b"],["bower_components/iron-form/iron-form.html","fd02fe38f72f9e55384a32d9afa961a9"],["bower_components/iron-icon/iron-icon.html","86e2b60880947c0b39494a73411fbc11"],["bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","84a7393de41f8ea5da7a599f480b57f0"],["bower_components/iron-image/iron-image.html","0367b237486a99f74bf5ee140e95b3c8"],["bower_components/iron-input/iron-input.html","3e7fdbda09c92fd9098f9f58c16e1474"],["bower_components/iron-location/iron-location.html","05d23f3722601be47d7eac373c08e8fa"],["bower_components/iron-location/iron-query-params.html","a52b7dc6390134759f584c5f478af50b"],["bower_components/iron-media-query/iron-media-query.html","07eb0b58f4e004bb03453c9b8a673664"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","bb8aada82d13df5b839923fc817484b2"],["bower_components/iron-menu-behavior/iron-menubar-behavior.html","e86b1a7fd638275ca05880ca0f6aa3eb"],["bower_components/iron-meta/iron-meta.html","d3401c6909ebd2a7da37f6bf5fae988b"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","340b583bc8f50cf5817490e60ca60939"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","b2953e8a7e8ab2c347800afdb15e7703"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","442b8454204b83a2e9f8dabe25caab5d"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","5902d04f185d2dc6291e0705a7b24725"],["bower_components/iron-overlay-behavior/iron-scroll-manager.html","3f32900d4e48699ff47afe05bb2f6921"],["bower_components/iron-pages/iron-pages.html","461dc38467532f0a57bf564301bcca78"],["bower_components/iron-range-behavior/iron-range-behavior.html","9f526032f3c5f23f172b1285fc509709"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e8decd555dc3ad8de7532632b13b0ce2"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","995e88fcd3d0a4ce0353c8736fa4763a"],["bower_components/iron-selector/iron-multi-selectable.html","802945ddfc16eb03e8b605fff57cebb9"],["bower_components/iron-selector/iron-selectable.html","b9248a704cc4895f7ecbccff8efd0edf"],["bower_components/iron-selector/iron-selection.html","30b5a0f391d92c70156b1830fb3bd0c6"],["bower_components/iron-selector/iron-selector.html","b16e67c27ef856b12149a467cc5223b0"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","7baac7bb9d9812449b62290a46f070d7"],["bower_components/neon-animation/animations/fade-in-animation.html","749c9d1d5b5f4f27d687fc197309a5c5"],["bower_components/neon-animation/animations/fade-out-animation.html","d68aac80ac6bc94606e236f5eaa405ef"],["bower_components/neon-animation/animations/scale-up-animation.html","26ce23099e9b81ad31d3991d677badb6"],["bower_components/neon-animation/neon-animatable-behavior.html","110532d0bd679a9fffce01d4085f741d"],["bower_components/neon-animation/neon-animation-behavior.html","7851a2111778abe5f869bb6e1584b20b"],["bower_components/neon-animation/neon-animation-runner-behavior.html","0da4f61f6a232924d2871fe580f1f355"],["bower_components/neon-animation/web-animations.html","aa5266664b17a9a7d7ebf0c4e6fcf8c9"],["bower_components/paper-behaviors/paper-button-behavior.html","ba4f655d100442d73343d6e4f60aa358"],["bower_components/paper-behaviors/paper-checked-element-behavior.html","377ef379e22b072ffcd6374c63b90d62"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","3b088afa4531829d1a5b79d3bf5978f1"],["bower_components/paper-behaviors/paper-ripple-behavior.html","574608962bf3eb67383391cf8513d56b"],["bower_components/paper-button/paper-button.html","b0c95dacbbf7e1ce20ea182911dcbd34"],["bower_components/paper-card/paper-card.html","cf118e71bee637199ece0a506f3acd17"],["bower_components/paper-checkbox/paper-checkbox.html","a385c4327361cd67d30fb7ce39fbb959"],["bower_components/paper-chip/paper-chip-icons.html","1724d3620a0bdac57f2a285778daf861"],["bower_components/paper-chip/paper-chip-input.html","117d77ef81513e2439c19fe59568329d"],["bower_components/paper-chip/paper-chip.html","c0f10f25a20dee962301ae15459988ed"],["bower_components/paper-dialog-behavior/paper-dialog-behavior.html","a7a38d677669138125627b5f26c7253f"],["bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","9b40a3ea714603fcb0f20d5117fe6712"],["bower_components/paper-dialog-scrollable/paper-dialog-scrollable.html","d51641cd7577076f32ddd5884cbd26ac"],["bower_components/paper-dialog/paper-dialog.html","dbc40043361685fe33f5a64c5a001d66"],["bower_components/paper-fab/paper-fab.html","626537344874797f4b33056874942b30"],["bower_components/paper-icon-button/paper-icon-button.html","a557e2789045f5c41da9befed2f6350c"],["bower_components/paper-input/paper-input-addon-behavior.html","a74ff1acb61cb7fc451e13d01d64b0ab"],["bower_components/paper-input/paper-input-behavior.html","2477bf1b481a0c0846f045e98cf35ef4"],["bower_components/paper-input/paper-input-char-counter.html","3ae922107097dd92f27ca6833e346694"],["bower_components/paper-input/paper-input-container.html","593db8d4706cb1639b39ee0e2ce3ea3d"],["bower_components/paper-input/paper-input-error.html","bc4f6ffdc9de51776c7240e05dbed3a1"],["bower_components/paper-input/paper-input.html","1e134cadcd3b97b3802d13c2491484ac"],["bower_components/paper-input/paper-textarea.html","b42e09902c63ad9f9fe7eea51a91f27b"],["bower_components/paper-item/paper-icon-item.html","e5a84379c6c88dcda71319862231c1da"],["bower_components/paper-item/paper-item-behavior.html","fe3b93f23bb620f4abcb1fa3b8cb0c48"],["bower_components/paper-item/paper-item-body.html","53903cc740e470a5f0661869d89d2f8f"],["bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["bower_components/paper-item/paper-item.html","bbcea6a06ad2e50f9d46e45adbe58514"],["bower_components/paper-listbox/paper-listbox.html","d33a53b16db2af1e3f40dbcb4116217f"],["bower_components/paper-material/paper-material-shared-styles.html","0880145bd868df7784d5cd49963468f6"],["bower_components/paper-material/paper-material.html","b37f0cb5775746f2443f4c82101fb958"],["bower_components/paper-menu-button/paper-menu-button-animations.html","c0161f8ea66c1c7e2c44f86c0d04d8d9"],["bower_components/paper-menu-button/paper-menu-button.html","df1751466527c251573c47d64c2a88cd"],["bower_components/paper-progress/paper-progress.html","1885e0ba9b8a1cf52c1a903456396346"],["bower_components/paper-ripple/paper-ripple.html","b4cc3ee650f23101e9a4a0be44968a1a"],["bower_components/paper-spinner/paper-spinner-behavior.html","8685ad432fbded77b263aad4a91034e5"],["bower_components/paper-spinner/paper-spinner-lite.html","c627cbd2ad2dc9b5e853f7cd47b104b5"],["bower_components/paper-spinner/paper-spinner-styles.html","f6b2d42a9d2262fafb034ea0f802fc80"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/paper-styles.html","3a86674df8b40032fc42fe95649bbec6"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/paper-tabs/paper-tab.html","a2cf8ad1d440c0907bee5fb668fd9c5a"],["bower_components/paper-tabs/paper-tabs-icons.html","f8e9e4ba00752fc54f1046143ba1be28"],["bower_components/paper-tabs/paper-tabs.html","9336e73b1dbd1bc6b84f88373e5a7969"],["bower_components/paper-tooltip/paper-tooltip.html","2447b1b10516711ef349f826c93ef3ab"],["bower_components/polymer/lib/elements/array-selector.html","841dc72edc195009030cac467dcaccad"],["bower_components/polymer/lib/elements/custom-style.html","08afb86580116b7e4d39d43a39cd1d08"],["bower_components/polymer/lib/elements/dom-bind.html","41004de9dca438cb73383a94fe646d1f"],["bower_components/polymer/lib/elements/dom-if.html","c1fc3b3b3ddd0989b627cb0bfc520cb6"],["bower_components/polymer/lib/elements/dom-module.html","51f4c371c9410959c3feca850c742712"],["bower_components/polymer/lib/elements/dom-repeat.html","8ea3b0cf97eb7232f5f9a561d36115b3"],["bower_components/polymer/lib/legacy/class.html","72a154ebb7232938bdc65e94b13d7508"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","e7484f6997d20c34835a2a40dca84538"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","727424c73ce82a221dd5d55dae8bfb7e"],["bower_components/polymer/lib/legacy/polymer-fn.html","80b9a95b6f9627267b498fae324c8aec"],["bower_components/polymer/lib/legacy/polymer.dom.html","44aedb235eec8a562cb3ad63bb1033ee"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","e259e4210ec65f4c25459720ce7b71b0"],["bower_components/polymer/lib/mixins/dir-mixin.html","db536a9ada8cdc0fb2fc010e59fbc5e5"],["bower_components/polymer/lib/mixins/element-mixin.html","74f03ff188fb981a60dbb6939ded446f"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","11c9f3ad714623f52dea07e6afaa2b30"],["bower_components/polymer/lib/mixins/mutable-data.html","ffea47006398f4c1cb1397631e653252"],["bower_components/polymer/lib/mixins/properties-changed.html","6c22c1fc10f57c2434f4d8ba1751ba1a"],["bower_components/polymer/lib/mixins/properties-mixin.html","b89faebafe8686dffaeb79a3abc83162"],["bower_components/polymer/lib/mixins/property-accessors.html","7287eb3f0383d7e8da9a3b18e569ed7e"],["bower_components/polymer/lib/mixins/property-effects.html","e7475d062b3d144c2777e317e3784d3f"],["bower_components/polymer/lib/mixins/template-stamp.html","30a841e5dc48ec28ae2ec04c071c6205"],["bower_components/polymer/lib/utils/array-splice.html","02e37f7a718cb6724e4c1101fd9fe693"],["bower_components/polymer/lib/utils/async.html","2f5b326d88e8030cd26781095235fd6c"],["bower_components/polymer/lib/utils/boot.html","c1ef9c9390b14a7656c382e85a161e67"],["bower_components/polymer/lib/utils/case-map.html","3348b08018d83d39a4447a6bbaa896af"],["bower_components/polymer/lib/utils/debounce.html","bdb9a2e69ead51e6b8bf27583d040e27"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","0e34b65431c3aca1e492f459f0f64623"],["bower_components/polymer/lib/utils/flush.html","02cf15aa4ad4cc7edc87d6c5724d2c0f"],["bower_components/polymer/lib/utils/gestures.html","fef04957972c4d9ef3932d2dbe1d7bec"],["bower_components/polymer/lib/utils/html-tag.html","95f4ef70c3d2d142f390a98470c194b4"],["bower_components/polymer/lib/utils/import-href.html","d6093e9c471580c1cb35f7686c772fde"],["bower_components/polymer/lib/utils/mixin.html","5ec7b79aa4871070458783ac7c2980a9"],["bower_components/polymer/lib/utils/path.html","279780f8fac6e7f4048f3895f7a05fda"],["bower_components/polymer/lib/utils/render-status.html","c14138dff3da4d203b9bdca9bd93b929"],["bower_components/polymer/lib/utils/resolve-url.html","5bc2e90748b9845386f19a1eee5d1191"],["bower_components/polymer/lib/utils/settings.html","4f688f5909f8493a10a5012176c911cc"],["bower_components/polymer/lib/utils/style-gather.html","e41ec34486e23859ddeacc32e5b5b92d"],["bower_components/polymer/lib/utils/templatize.html","b0ed22d0b8701cad1df97cf7f580e260"],["bower_components/polymer/lib/utils/unresolved.html","50b8ec3ab60b6b40f4cf4fc931027b80"],["bower_components/polymer/polymer-element.html","26c3b3b8ee7b81243474c7d95636d157"],["bower_components/polymer/polymer.html","72d557b84da0412316b422d8325ad25c"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","c1746bf8aa31f4593713a001f1ec7029"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","6f4ac86995d27e6f4ddf03f05f6c2c85"],["bower_components/vaadin-checkbox/vaadin-checkbox.html","0334afb62930db47ddb90da0dd8f49b6"],["bower_components/vaadin-control-state-mixin/vaadin-control-state-mixin.html","b5eaa410bcd5f5c453bd3266f630972d"],["bower_components/vaadin-grid/all-imports.html","9bc224c6e9623604cfe339b6f8d6ab4b"],["bower_components/vaadin-grid/iron-list.html","aa1d43816cbe139f888d6a57dfedd263"],["bower_components/vaadin-grid/vaadin-grid-a11y-mixin.html","b829c2b4e9cecafd3feba7f4a95c436c"],["bower_components/vaadin-grid/vaadin-grid-active-item-mixin.html","aba6fc1d4c93d68dc05f96b76850d6a0"],["bower_components/vaadin-grid/vaadin-grid-array-data-provider-mixin.html","b3eafed5ba4f72e5cce299e2da632e00"],["bower_components/vaadin-grid/vaadin-grid-cell-click-mixin.html","c51a8fa8b96806611334b13f73788844"],["bower_components/vaadin-grid/vaadin-grid-column-group.html","dd9aa81361a527365ccda68b4c37c1d3"],["bower_components/vaadin-grid/vaadin-grid-column-reordering-mixin.html","034fbf808d29b42a60fe729b0472f974"],["bower_components/vaadin-grid/vaadin-grid-column-resizing-mixin.html","9caeb2672067682538521bd4f9cc1290"],["bower_components/vaadin-grid/vaadin-grid-column.html","7b4062cdebc069232c2be1d54af93241"],["bower_components/vaadin-grid/vaadin-grid-data-provider-mixin.html","e9fbd52942859248b71c4457318af30f"],["bower_components/vaadin-grid/vaadin-grid-dynamic-columns-mixin.html","7088278c00611f1a8416bbb14821793a"],["bower_components/vaadin-grid/vaadin-grid-filter-mixin.html","f0afb29de7b5f9e7b43f0eccdd08cbe4"],["bower_components/vaadin-grid/vaadin-grid-filter.html","ba4b7c505c01264db7919843dbc7aa25"],["bower_components/vaadin-grid/vaadin-grid-keyboard-navigation-mixin.html","bc66eedea3d78c57baf8b85a02130980"],["bower_components/vaadin-grid/vaadin-grid-outer-scroller.html","203b7c89d1e7b6f083156cea052b5d84"],["bower_components/vaadin-grid/vaadin-grid-row-details-mixin.html","34e47dd7757f5a10e32f3be300c3fef3"],["bower_components/vaadin-grid/vaadin-grid-scroll-mixin.html","3375d040e284eecad3e12beffcbea8b9"],["bower_components/vaadin-grid/vaadin-grid-scroller.html","a8284af4a6c6046a5bad2052413ce66d"],["bower_components/vaadin-grid/vaadin-grid-selection-column.html","659ad744df26ff8f4dab37d5d5e6828a"],["bower_components/vaadin-grid/vaadin-grid-selection-mixin.html","0e539d3cca31bd3437e26fb9dbeb04aa"],["bower_components/vaadin-grid/vaadin-grid-sort-mixin.html","cc27a2b45c1aeb3baa29c1f834ec2707"],["bower_components/vaadin-grid/vaadin-grid-sorter.html","c58c8cd0e894e171cd796ee43c3fedaf"],["bower_components/vaadin-grid/vaadin-grid-styles.html","8e653d533f2d9cfbafb6d35df9b33001"],["bower_components/vaadin-grid/vaadin-grid-templatizer.html","fed572c8f5f483247d1c89125e75e6ba"],["bower_components/vaadin-grid/vaadin-grid-tree-toggle.html","a254f865f235e77226c84931fbe942b8"],["bower_components/vaadin-grid/vaadin-grid.html","269cb34b517fca5b718890f729bf7dcc"],["bower_components/vaadin-text-field/vaadin-form-element-mixin.html","6835f657b10fddb65fe50b3fb86dc2f2"],["bower_components/vaadin-text-field/vaadin-text-field-mixin.html","41eb484b4d909b37e27f743c700d9f47"],["bower_components/vaadin-text-field/vaadin-text-field.html","56b94331a0ce3b519fac86da5fe8d15e"],["bower_components/vaadin-themable-mixin/vaadin-themable-mixin.html","edc41b958d3a312c4f694f563d3dec75"],["bower_components/web-animations-js/web-animations-next-lite.min.js","6579d2914a8920d46d8cc74a3cff3dec"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","a5043c1d0dd16d84558ee6cc2276212e"],["bower_components/webcomponentsjs/gulpfile.js","1aac641003c7d14b266843d632cbf71f"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","6e70d19aa72bca16779abfadceba8d58"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","874c3be210adb362d08aaf97bbb3f21b"],["bower_components/webcomponentsjs/webcomponents-hi-sd.js","f1db6505f87f7a8660b566a0540e7e5b"],["bower_components/webcomponentsjs/webcomponents-hi.js","c2270cd6fb0b95ed2f87c6b1c143c94f"],["bower_components/webcomponentsjs/webcomponents-lite.js","7354f6c8fce5789ec22b2dbc045f9d52"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","20b8283441ed3da5c6c69c5ea9c208ae"],["index.html","4b38664e230edc2dc5a9aef339a2a3ee"],["manifest.json","9d09217d099fc574de7f18ef889de8ab"],["src/mapee-components/diagnostics-skeleton/diagnostics-skeleton.html","ded7a0ab085586b789750969ae74ac6e"],["src/mapee-components/gut-content/gut-content.html","6fee42415c356a005e26138529d215dd"],["src/mapee-components/next-questions/next-questions.html","fc91ffa4847c1c8491c5f7a3bf5404da"],["src/mapee-components/paper-diagnostic/paper-diagnostic.html","4e68cb080afc6040376f3560a357b7ab"],["src/my-app.html","f4637df34a5892fa4074ac8f305b7761"],["src/my-icons.html","bf6075f4178b73e91020e0dbbe4a065b"],["src/my-page-action-map.html","24a584129be4904f5c9e19303f0408da"],["src/my-page-control-panel.html","dcd7baa71f5977820b72498f7c06a11c"],["src/my-page-diagnostics.html","e3ca5d7da384166c9f6a5c986e95e6b5"],["src/my-page-feedback.html","21ec6f974cf30f10a778481fb37855b7"],["src/my-page-help.html","abad5991d2110c6d5cdba0a50ccf0f2f"],["src/my-page-login.html","c61f60c2ec6bbced65f22e459f74bfe8"],["src/my-page-password-recovery.html","fa0a1907fc8ed65d92ecadf879b4bf7f"],["src/my-page-preload.html","d70c1f43365c8265090f00ba07f9c35b"],["src/my-page-profile.html","30818938fcf3abe304290852ecd4832c"],["src/shared-styles.html","0ce7247a1f7a9a4abee4a7306bc938ed"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function (body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function (kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function (kv) {
        return ignoreUrlParametersMatching.every(function (ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function (kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function (item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function (response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function (event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingRequests) {
        return Promise.all(
          existingRequests.map(function (existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function () {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function (e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







