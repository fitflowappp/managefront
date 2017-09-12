/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnDragStart
 * 
 */

'use strict';

/**
 * A `dragstart` event has begun within the text editor component.
 */

function editOnDragStart() {
  this._internalDrag = true;
  this.setMode('drag');
}

module.exports = editOnDragStart;
//# sourceMappingURL=editOnDragStart.js.map
