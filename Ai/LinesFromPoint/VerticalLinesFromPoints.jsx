/**
 * Copyright Sergey Turulin
 * https://adobescript.ru/script
 * sergey@adobescript.ru
 */

function roundPoint(point) {
  const K = 1000;
  return [
    Math.round(K * point[0]) / K,
    Math.round(K * point[1]) / K,
  ];
}

function radianToDegree(radian) {
  return 180 * radian / Math.PI;
}

function degreeToRadian(degree) {
  return Math.PI * degree / 180;
}

const
    DOC = app.activeDocument,
    DISTANCE = 30;

for (var k = 0; k < selection.length; k++) {
  if ('PathItem' !== selection[0].typename) {
    continue;
  }

  var
      pathItem = selection[k],
      i, point,
      getRight, getLeft,
      anchor, leftDirection, rightDirection,
      dX, dY, points, angle, newAngle, line,
      selectedCount = 0;

  for (i = 0; i < pathItem.pathPoints.length; i++) {
    getLeft = false
    getRight = false
    point = pathItem.pathPoints[i]

    if (PathPointSelection.ANCHORPOINT !== point.selected) {
      continue;
    }

    selectedCount++;
    anchor = roundPoint(pathItem.pathPoints[i].anchor);
    leftDirection = roundPoint(pathItem.pathPoints[i].leftDirection);
    rightDirection = roundPoint(pathItem.pathPoints[i].rightDirection);

    if (leftDirection[0] === anchor[0] && leftDirection[1] === anchor[1]) {
      getRight = true
    } else {
      if (rightDirection[0] === anchor[0] && rightDirection[1] === anchor[1]) {
        getLeft = true
      } else {
        continue
      }
    }

    if (getLeft) {
      dX = anchor[0] - leftDirection[0]
      dY = anchor[1] - leftDirection[1]
    } else {
      dX = anchor[0] - rightDirection[0]
      dY = anchor[1] - rightDirection[1]
    }

    if (0 === dY) {
      angle = 0;
    } else {
      angle = radianToDegree(Math.atan(dY / dX));
    }

    points = [
      [
        anchor[0] + DISTANCE * Math.cos(degreeToRadian(angle + 90)),
        anchor[1] + DISTANCE * Math.sin(degreeToRadian(angle + 90)),
      ],
      [
        anchor[0] + DISTANCE * Math.cos(degreeToRadian(angle - 90)),
        anchor[1] + DISTANCE * Math.sin(degreeToRadian(angle - 90)),
      ],
    ];

    line = DOC.pathItems.add();
    line.setEntirePath(points);
  }
}
