/**
 * Happy New Year 2021!
 * ©Sergey Turulin
 *
 * email: sergey@adobescript.ru
 * telegram: turulin
 * twitter: STurulin
 */

/**
 * Options
 */
const
    SIZE = {
      WIDTH: 612,
      HEIGHT: 792,
    },
    TREE = {
      STEM: {
        TOP: 0.25,
        BOTTOM: 0.2,
        WIDTH: 0.2,
      },
      NEEDLES: {
        WIDTH: 0.7,
        COUNT: 5,
        BOTTOM: 0.3,
        BRANCH: {
          WIDTH: 0.2,
          HEIGHT: 0.1,
        },
      },
    },
    STAR = {
      RADIUS: 25,
      K_INNER_RADIUS: 0.32,
    },
    TEXT = {
      HAPPY: {
        SIZE: 24,
        CONTENTS: 'Со Старым Новым 2021 годом!',
      },
      COPYRIGHT: {
        SIZE: 8,
        CONTENTS: 'Design: Sergey Turulin, 2021',
      }
    },
    FIGURES = {
      COUNT: 200,
      MINIMUM_SIZE: 5,
      TO_SIZE: 14,
    },
    COLOR = {
      STEM: new CMYKColor(),
      NEEDLES: [
        new CMYKColor(),
        new CMYKColor(),
        new CMYKColor(),
        new CMYKColor(),
        new CMYKColor(),
      ],
      STAR: new CMYKColor(),
      TEXT: new CMYKColor(),
      BLACK: new CMYKColor(),
    };

COLOR.STEM.cyan = 40;
COLOR.STEM.magenta = 70;
COLOR.STEM.yellow = 100;
COLOR.STEM.black = 60;

COLOR.NEEDLES[0].cyan = 90;
COLOR.NEEDLES[0].magenta = 30;
COLOR.NEEDLES[0].yellow = 100;
COLOR.NEEDLES[0].black = 25;

COLOR.NEEDLES[1].cyan = 24;
COLOR.NEEDLES[1].magenta = 0;
COLOR.NEEDLES[1].yellow = 90;
COLOR.NEEDLES[1].black = 0;

COLOR.NEEDLES[2].cyan = 90;
COLOR.NEEDLES[2].magenta = 70;
COLOR.NEEDLES[2].yellow = 0;
COLOR.NEEDLES[2].black = 0;

COLOR.NEEDLES[3].cyan = 0;
COLOR.NEEDLES[3].magenta = 92;
COLOR.NEEDLES[3].yellow = 61;
COLOR.NEEDLES[3].black = 0;

COLOR.NEEDLES[4].cyan = 38;
COLOR.NEEDLES[4].magenta = 78;
COLOR.NEEDLES[4].yellow = 0;
COLOR.NEEDLES[4].black = 0;

COLOR.STAR.cyan = 0;
COLOR.STAR.magenta = 90;
COLOR.STAR.yellow = 100;
COLOR.STAR.black = 0;

COLOR.TEXT.cyan = 0;
COLOR.TEXT.magenta = 100;
COLOR.TEXT.yellow = 100;
COLOR.TEXT.black = 0;

COLOR.BLACK.cyan = 0;
COLOR.BLACK.magenta = 0;
COLOR.BLACK.yellow = 0;
COLOR.BLACK.black = 100;

var
    vTreeStemWidth,
    vTreeStemTop,
    vTreeStemBottom,
    vTreeNeedlesWidth,
    vTreeNeedlesCount,
    vTreeNeedlesColor = 0,
    vTreeBranchHeight,
    vTreeBranchWidth,
    vFiguresCount,
    vFiguresWidth,
    vFiguresColor
;

/**
 * End of options
 */

function draw() {

  /**
   * Variables
   */
  var
      treeStart = [
        SIZE.WIDTH / 2,
        SIZE.HEIGHT * (1 - vTreeStemTop),
      ],
      treeWidth = SIZE.WIDTH * vTreeStemWidth,
      treeHeight = SIZE.HEIGHT * (1 - vTreeStemBottom - vTreeStemTop),
      needlesWidth = SIZE.WIDTH * vTreeNeedlesWidth,
      needlesHeight = treeHeight * (1 - TREE.NEEDLES.BOTTOM),
      needlesCorner = [
        treeStart[0] - needlesWidth / 2,
        treeStart[1] - needlesHeight,
      ],
      needlesBranchX = vTreeBranchWidth * needlesWidth,
      needlesBranchY = vTreeBranchHeight * needlesHeight;

  /**
   * Stem
   */
  const pathStem = [
    treeStart,
    [
      treeStart[0] - treeWidth / 2,
      SIZE.HEIGHT * TREE.STEM.BOTTOM,
    ],
    [
      SIZE.WIDTH / 2 + (SIZE.WIDTH * vTreeStemWidth / 2),
      SIZE.HEIGHT * TREE.STEM.BOTTOM,
    ],
  ];
  const STEM = DOC.pathItems.add();
  STEM.setEntirePath(pathStem);
  STEM.closed = true;
  STEM.filled = true;
  STEM.stroked = false;
  STEM.fillColor = COLOR.STEM;

  /**
   * Needles
   */
  var i, k, needlesFront = [], needlesReverse = [],
      needlesPartX = treeStart[0] - needlesCorner[0],
      needlesPartY = treeStart[1] - needlesCorner[1];
  for (i = 1; i <= vTreeNeedlesCount; i++) {
    k = i / vTreeNeedlesCount;
    needlesFront.push(
        [
          treeStart[0] - (k * needlesPartX) - k * needlesBranchX,
          treeStart[1] - (k * needlesPartY) - k * needlesBranchY,
        ],
    );
    if (i !== vTreeNeedlesCount) {
      needlesFront.push(
          [
            treeStart[0] - (k * needlesPartX) + k * needlesBranchX,
            treeStart[1] - (k * needlesPartY) + k * needlesBranchY,
          ],
      );
    }
    needlesReverse.push(
        [
          treeStart[0] + (k * needlesPartX) + k * needlesBranchX,
          treeStart[1] - (k * needlesPartY) - k * needlesBranchY,
        ],
    );
    if (i !== vTreeNeedlesCount) {
      needlesReverse.push(
          [
            treeStart[0] + (k * needlesPartX) - k * needlesBranchX,
            treeStart[1] - (k * needlesPartY) + k * needlesBranchY,
          ],
      );
    }
  }
  var pathNeedles = [
    treeStart,
  ].concat(needlesFront).concat(needlesReverse.reverse());
  const NEEDLES = DOC.pathItems.add();
  NEEDLES.setEntirePath(pathNeedles);
  NEEDLES.closed = true;
  NEEDLES.filled = true;
  NEEDLES.stroked = false;
  NEEDLES.fillColor = COLOR.NEEDLES[vTreeNeedlesColor];

  /**
   * Figures
   */
  var color, random, randomFigureY, figureX, figureY, figureSize, figure;
  for (i = 0; i < vFiguresCount; i++) {
    random = Math.random()
    if (random > 0.3) {
      random *= Math.random()
    }
    figureSize = FIGURES.MINIMUM_SIZE + vFiguresWidth * Math.random()
    randomFigureY = Math.random()
    figureY = -10 + (needlesHeight * randomFigureY) + (treeStart[1] - needlesHeight)
    figureX = treeStart[0] - ((1 -randomFigureY) * needlesWidth / 2) + ((1 -randomFigureY) * needlesWidth * Math.random())
    if (random < 0.5) {
      figure = DOC.pathItems.ellipse(figureY, figureX, figureSize, figureSize)
    } else {
      figure = DOC.pathItems.star(figureX, figureY, figureSize, figureSize * STAR.K_INNER_RADIUS)
    }
    color = new CMYKColor()
    color.cyan = (random < 0.8 ? vFiguresColor * Math.random() : 0)
    color.magenta = ((random > 0.4 && random < 0.6) ? vFiguresColor * Math.random() : 0)
    color.yellow = (random > 0.3 ? vFiguresColor * Math.random() : 0)
    color.black = 0
    figure.filled = true;
    figure.stroked = false;
    figure.fillColor = color;
  }

  /**
   * Star
   */
  const STAR_PATH = DOC.pathItems.star(treeStart[0], treeStart[1], STAR.RADIUS, STAR.RADIUS * STAR.K_INNER_RADIUS);
  STAR_PATH.closed = true;
  STAR_PATH.filled = true;
  STAR_PATH.stroked = false;
  STAR_PATH.fillColor = COLOR.STAR;

  /**
   * Font
   */
  var textFont = app.textFonts.getByName('MyriadPro-Regular');
  try {
    textFont = app.textFonts.getByName('Roboto-Regular');
    textFont = app.textFonts.getByName('RobotoMono-Regular');
  } catch (e) {
  }

  /**
   * Text 2021
   */
  const TEXT_2021 = DOC.textFrames.add();
  TEXT_2021.contents = TEXT.HAPPY.CONTENTS;
  TEXT_2021.left = SIZE.WIDTH / 2;
  TEXT_2021.top = SIZE.HEIGHT * TREE.STEM.BOTTOM / 2;

  for (i = 0; i < TEXT_2021.textRanges.length; i++) {
    TEXT_2021.textRanges[i].characterAttributes.textFont = textFont;
    TEXT_2021.textRanges[i].characterAttributes.fillColor = COLOR.TEXT;
    TEXT_2021.textRanges[i].characterAttributes.size = TEXT.HAPPY.SIZE;
    TEXT_2021.textRanges[i].paragraphAttributes.justification = Justification.CENTER;
  }

  /**
   * Text Copyright
   */
  const TEXT_COPYRIGHT = DOC.textFrames.add();
  TEXT_COPYRIGHT.contents = TEXT.COPYRIGHT.CONTENTS;
  TEXT_COPYRIGHT.left = SIZE.WIDTH / 2;
  TEXT_COPYRIGHT.top = 5 + (TEXT.COPYRIGHT.SIZE * 2);

  for (i = 0; i < TEXT_COPYRIGHT.textRanges.length; i++) {
    TEXT_COPYRIGHT.textRanges[i].characterAttributes.textFont = textFont;
    TEXT_COPYRIGHT.textRanges[i].characterAttributes.fillColor = COLOR.BLACK;
    TEXT_COPYRIGHT.textRanges[i].characterAttributes.size = TEXT.COPYRIGHT.SIZE;
    TEXT_COPYRIGHT.textRanges[i].paragraphAttributes.justification = Justification.CENTER;
  }
}

function showWindow() {

  var needUndo = false;
  var closeDoc = false;
  var finishDraw = false;

  function startAction() {

    vTreeStemWidth = TREE.STEM.WIDTH * sliderTreeStem.value / 100 + 0.05;
    vTreeStemTop = TREE.STEM.TOP * sliderTreeTop.value / 100 + 0.05;
    vTreeStemBottom = TREE.STEM.BOTTOM * sliderTreeBottom.value / 100;
    vTreeNeedlesWidth = 0.1 + TREE.NEEDLES.WIDTH * sliderTreeWidth.value / 100;
    if (vTreeNeedlesWidth < vTreeStemWidth + 0.1) {
      vTreeNeedlesWidth = vTreeStemWidth + 0.1;
    }
    vTreeNeedlesCount =
        1 + Math.floor(3 * TREE.NEEDLES.COUNT * sliderTreeCount.value / 100);
    vTreeBranchHeight =
        TREE.NEEDLES.BRANCH.HEIGHT * sliderTreeBranchHeight.value / 100;
    vTreeBranchWidth =
        TREE.NEEDLES.BRANCH.WIDTH * sliderTreeBranchWidth.value / 100;
    vFiguresCount = FIGURES.COUNT * sliderFiguresCount.value / 100;
    vFiguresWidth = FIGURES.TO_SIZE * sliderFiguresWidth.value / 100;
    vFiguresColor = sliderFiguresColor.value;

    draw();
    if (false === finishDraw) {
      needUndo = true;
      redraw();
    }
  }

  function previewStart() {
    if (true) {
      if (true === needUndo) {
        appUnDo();
        needUndo = false;
      } else {
        needUndo = true;
      }

      startAction();
    }
  }

  function appUnDo() {
    app.undo();
    redraw();
  }

  /*
  Code for Import https://scriptui.joonas.me — (Triple click to select):
  {"activeId":44,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Новогодняя ёлка","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"panelTree","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Ёлка","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-2":{"id":2,"type":"Slider","parentId":3,"style":{"enabled":true,"varName":"sliderTreeBottom","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-3":{"id":3,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-4":{"id":4,"type":"StaticText","parentId":3,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Снизу","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-6":{"id":6,"type":"StaticText","parentId":5,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Сверху","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Slider","parentId":5,"style":{"enabled":true,"varName":"sliderTreeTop","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":30,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"Button","parentId":8,"style":{"enabled":true,"varName":"buttonDraw","text":"Нарисовать","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"Button","parentId":8,"style":{"enabled":true,"varName":"buttonCancel","text":"Отмена","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-11":{"id":11,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":"preview","text":"Превью","preferredSize":[100,0],"alignment":"left","helpTip":null,"checked":true}},"item-12":{"id":12,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-13":{"id":13,"type":"StaticText","parentId":12,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Ширина","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-14":{"id":14,"type":"Slider","parentId":12,"style":{"enabled":true,"varName":"sliderTreeWidth","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-16":{"id":16,"type":"StaticText","parentId":15,"style":{"enabled":true,"varName":"","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Веток","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"Slider","parentId":15,"style":{"enabled":true,"varName":"sliderTreeCount","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-18":{"id":18,"type":"Group","parentId":24,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-19":{"id":19,"type":"StaticText","parentId":18,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Высота","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"Slider","parentId":18,"style":{"enabled":true,"varName":"sliderTreeBranchHeight","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-21":{"id":21,"type":"Group","parentId":24,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-22":{"id":22,"type":"StaticText","parentId":21,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Ширина","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-23":{"id":23,"type":"Slider","parentId":21,"style":{"enabled":true,"varName":"sliderTreeBranchWidth","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-24":{"id":24,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Ветки","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-25":{"id":25,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Ствол","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-26":{"id":26,"type":"Group","parentId":25,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-27":{"id":27,"type":"StaticText","parentId":26,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Ширина","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-28":{"id":28,"type":"Slider","parentId":26,"style":{"enabled":true,"varName":"sliderTreeStem","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-29":{"id":29,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Игрушки","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-30":{"id":30,"type":"Group","parentId":29,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-31":{"id":31,"type":"StaticText","parentId":30,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Количество","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-32":{"id":32,"type":"Slider","parentId":30,"style":{"enabled":true,"varName":"sliderFiguresCount","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-33":{"id":33,"type":"Group","parentId":29,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-34":{"id":34,"type":"StaticText","parentId":33,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Размер","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-35":{"id":35,"type":"Slider","parentId":33,"style":{"enabled":true,"varName":"sliderFiguresWidth","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-36":{"id":36,"type":"Group","parentId":41,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-37":{"id":37,"type":"RadioButton","parentId":36,"style":{"enabled":true,"varName":"treeColor1","text":"зелёная","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-38":{"id":38,"type":"RadioButton","parentId":36,"style":{"enabled":true,"varName":"treeColor2","text":"жёлтая","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-39":{"id":39,"type":"RadioButton","parentId":36,"style":{"enabled":true,"varName":"treeColor3","text":"синяя","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-40":{"id":40,"type":"RadioButton","parentId":36,"style":{"enabled":true,"varName":"treeColor4","text":"красная","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-41":{"id":41,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-42":{"id":42,"type":"StaticText","parentId":41,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Цвет","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-43":{"id":43,"type":"RadioButton","parentId":36,"style":{"enabled":true,"varName":"treeColor5","text":"розовая","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-44":{"id":44,"type":"Group","parentId":29,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-45":{"id":45,"type":"StaticText","parentId":44,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Цвет","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-46":{"id":46,"type":"Slider","parentId":44,"style":{"enabled":true,"varName":"sliderFiguresColor","preferredSize":[100,0],"alignment":null,"helpTip":null}}},"order":[0,25,26,27,28,1,5,6,7,3,4,2,12,13,14,15,16,17,41,42,36,37,38,39,40,43,24,18,19,20,21,22,23,29,30,31,32,33,34,35,44,45,46,11,8,10,9],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
  */

// DIALOG
// ======
  var dialog = new Window("dialog");
  dialog.text = "Новогодняя ёлка";
  dialog.orientation = "column";
  dialog.alignChildren = ["center","top"];
  dialog.spacing = 10;
  dialog.margins = 16;

// PANEL1
// ======
  var panel1 = dialog.add("panel", undefined, undefined, {name: "panel1"});
  panel1.text = "Ствол";
  panel1.orientation = "column";
  panel1.alignChildren = ["left","top"];
  panel1.spacing = 10;
  panel1.margins = 10;

// GROUP1
// ======
  var group1 = panel1.add("group", undefined, {name: "group1"});
  group1.orientation = "row";
  group1.alignChildren = ["left","center"];
  group1.spacing = 10;
  group1.margins = 0;

  var statictext1 = group1.add("statictext", undefined, undefined, {name: "statictext1"});
  statictext1.text = "Ширина";
  statictext1.preferredSize.width = 100;

  var sliderTreeStem = group1.add("slider", undefined, undefined, undefined, undefined, {name: "sliderTreeStem"});
  sliderTreeStem.minvalue = 0;
  sliderTreeStem.maxvalue = 100;
  sliderTreeStem.value = 50;
  sliderTreeStem.preferredSize.width = 100;

// PANELTREE
// =========
  var panelTree = dialog.add("panel", undefined, undefined, {name: "panelTree"});
  panelTree.text = "Ёлка";
  panelTree.orientation = "column";
  panelTree.alignChildren = ["left","top"];
  panelTree.spacing = 10;
  panelTree.margins = 10;

// GROUP2
// ======
  var group2 = panelTree.add("group", undefined, {name: "group2"});
  group2.orientation = "row";
  group2.alignChildren = ["left","center"];
  group2.spacing = 10;
  group2.margins = 0;

  var statictext2 = group2.add("statictext", undefined, undefined, {name: "statictext2"});
  statictext2.text = "Сверху";
  statictext2.preferredSize.width = 100;

  var sliderTreeTop = group2.add("slider", undefined, undefined, undefined, undefined, {name: "sliderTreeTop"});
  sliderTreeTop.minvalue = 0;
  sliderTreeTop.maxvalue = 100;
  sliderTreeTop.value = 50;
  sliderTreeTop.preferredSize.width = 100;

// GROUP3
// ======
  var group3 = panelTree.add("group", undefined, {name: "group3"});
  group3.orientation = "row";
  group3.alignChildren = ["left","center"];
  group3.spacing = 10;
  group3.margins = 0;

  var statictext3 = group3.add("statictext", undefined, undefined, {name: "statictext3"});
  statictext3.text = "Снизу";
  statictext3.preferredSize.width = 100;

  var sliderTreeBottom = group3.add("slider", undefined, undefined, undefined, undefined, {name: "sliderTreeBottom"});
  sliderTreeBottom.minvalue = 0;
  sliderTreeBottom.maxvalue = 100;
  sliderTreeBottom.value = 50;
  sliderTreeBottom.preferredSize.width = 100;

// GROUP4
// ======
  var group4 = panelTree.add("group", undefined, {name: "group4"});
  group4.orientation = "row";
  group4.alignChildren = ["left","center"];
  group4.spacing = 10;
  group4.margins = 0;

  var statictext4 = group4.add("statictext", undefined, undefined, {name: "statictext4"});
  statictext4.text = "Ширина";
  statictext4.preferredSize.width = 100;

  var sliderTreeWidth = group4.add("slider", undefined, undefined, undefined, undefined, {name: "sliderTreeWidth"});
  sliderTreeWidth.minvalue = 0;
  sliderTreeWidth.maxvalue = 100;
  sliderTreeWidth.value = 50;
  sliderTreeWidth.preferredSize.width = 100;

// GROUP5
// ======
  var group5 = panelTree.add("group", undefined, {name: "group5"});
  group5.orientation = "row";
  group5.alignChildren = ["left","center"];
  group5.spacing = 10;
  group5.margins = 0;

  var statictext5 = group5.add("statictext", undefined, undefined, {name: "statictext5"});
  statictext5.text = "Веток";
  statictext5.preferredSize.width = 100;

  var sliderTreeCount = group5.add("slider", undefined, undefined, undefined, undefined, {name: "sliderTreeCount"});
  sliderTreeCount.minvalue = 0;
  sliderTreeCount.maxvalue = 100;
  sliderTreeCount.value = 50;
  sliderTreeCount.preferredSize.width = 100;

// GROUP6
// ======
  var group6 = panelTree.add("group", undefined, {name: "group6"});
  group6.orientation = "row";
  group6.alignChildren = ["left","top"];
  group6.spacing = 10;
  group6.margins = 0;

  var statictext6 = group6.add("statictext", undefined, undefined, {name: "statictext6"});
  statictext6.text = "Цвет";
  statictext6.preferredSize.width = 100;

// GROUP7
// ======
  var group7 = group6.add("group", undefined, {name: "group7"});
  group7.orientation = "column";
  group7.alignChildren = ["left","center"];
  group7.spacing = 10;
  group7.margins = 0;

  var treeColor1 = group7.add("radiobutton", undefined, undefined, {name: "treeColor1"});
  treeColor1.text = "зелёная";
  treeColor1.value = true;

  var treeColor2 = group7.add("radiobutton", undefined, undefined, {name: "treeColor2"});
  treeColor2.text = "жёлтая";

  var treeColor3 = group7.add("radiobutton", undefined, undefined, {name: "treeColor3"});
  treeColor3.text = "синяя";

  var treeColor4 = group7.add("radiobutton", undefined, undefined, {name: "treeColor4"});
  treeColor4.text = "красная";

  var treeColor5 = group7.add("radiobutton", undefined, undefined, {name: "treeColor5"});
  treeColor5.text = "розовая";

// PANEL2
// ======
  var panel2 = dialog.add("panel", undefined, undefined, {name: "panel2"});
  panel2.text = "Ветки";
  panel2.orientation = "column";
  panel2.alignChildren = ["left","top"];
  panel2.spacing = 10;
  panel2.margins = 10;

// GROUP8
// ======
  var group8 = panel2.add("group", undefined, {name: "group8"});
  group8.orientation = "row";
  group8.alignChildren = ["left","center"];
  group8.spacing = 10;
  group8.margins = 0;

  var statictext7 = group8.add("statictext", undefined, undefined, {name: "statictext7"});
  statictext7.text = "Высота";
  statictext7.preferredSize.width = 100;

  var sliderTreeBranchHeight = group8.add("slider", undefined, undefined, undefined, undefined, {name: "sliderTreeBranchHeight"});
  sliderTreeBranchHeight.minvalue = 0;
  sliderTreeBranchHeight.maxvalue = 100;
  sliderTreeBranchHeight.value = 50;
  sliderTreeBranchHeight.preferredSize.width = 100;

// GROUP9
// ======
  var group9 = panel2.add("group", undefined, {name: "group9"});
  group9.orientation = "row";
  group9.alignChildren = ["left","center"];
  group9.spacing = 10;
  group9.margins = 0;

  var statictext8 = group9.add("statictext", undefined, undefined, {name: "statictext8"});
  statictext8.text = "Ширина";
  statictext8.preferredSize.width = 100;

  var sliderTreeBranchWidth = group9.add("slider", undefined, undefined, undefined, undefined, {name: "sliderTreeBranchWidth"});
  sliderTreeBranchWidth.minvalue = 0;
  sliderTreeBranchWidth.maxvalue = 100;
  sliderTreeBranchWidth.value = 50;
  sliderTreeBranchWidth.preferredSize.width = 100;

// PANEL3
// ======
  var panel3 = dialog.add("panel", undefined, undefined, {name: "panel3"});
  panel3.text = "Игрушки";
  panel3.orientation = "column";
  panel3.alignChildren = ["left","top"];
  panel3.spacing = 10;
  panel3.margins = 10;

// GROUP10
// =======
  var group10 = panel3.add("group", undefined, {name: "group10"});
  group10.orientation = "row";
  group10.alignChildren = ["left","center"];
  group10.spacing = 10;
  group10.margins = 0;

  var statictext9 = group10.add("statictext", undefined, undefined, {name: "statictext9"});
  statictext9.text = "Количество";
  statictext9.preferredSize.width = 100;

  var sliderFiguresCount = group10.add("slider", undefined, undefined, undefined, undefined, {name: "sliderFiguresCount"});
  sliderFiguresCount.minvalue = 0;
  sliderFiguresCount.maxvalue = 100;
  sliderFiguresCount.value = 50;
  sliderFiguresCount.preferredSize.width = 100;

// GROUP11
// =======
  var group11 = panel3.add("group", undefined, {name: "group11"});
  group11.orientation = "row";
  group11.alignChildren = ["left","center"];
  group11.spacing = 10;
  group11.margins = 0;

  var statictext10 = group11.add("statictext", undefined, undefined, {name: "statictext10"});
  statictext10.text = "Размер";
  statictext10.preferredSize.width = 100;

  var sliderFiguresWidth = group11.add("slider", undefined, undefined, undefined, undefined, {name: "sliderFiguresWidth"});
  sliderFiguresWidth.minvalue = 0;
  sliderFiguresWidth.maxvalue = 100;
  sliderFiguresWidth.value = 50;
  sliderFiguresWidth.preferredSize.width = 100;

// GROUP12
// =======
  var group12 = panel3.add("group", undefined, {name: "group12"});
  group12.orientation = "row";
  group12.alignChildren = ["left","center"];
  group12.spacing = 10;
  group12.margins = 0;

  var statictext11 = group12.add("statictext", undefined, undefined, {name: "statictext11"});
  statictext11.text = "Цвет";
  statictext11.preferredSize.width = 100;

  var sliderFiguresColor = group12.add("slider", undefined, undefined, undefined, undefined, {name: "sliderFiguresColor"});
  sliderFiguresColor.minvalue = 0;
  sliderFiguresColor.maxvalue = 100;
  sliderFiguresColor.value = 50;
  sliderFiguresColor.preferredSize.width = 100;

// DIALOG
// ======
//   var preview = dialog.add("checkbox", undefined, undefined, {name: "preview"});
//   preview.text = "Превью";
//   preview.value = true;
//   preview.preferredSize.width = 100;
//   preview.alignment = ["left","top"];

// GROUP13
// =======
  var group13 = dialog.add("group", undefined, {name: "group13"});
  group13.orientation = "row";
  group13.alignChildren = ["left","center"];
  group13.spacing = 30;
  group13.margins = 0;

  var buttonCancel = group13.add("button", undefined, undefined, {name: "buttonCancel"});
  buttonCancel.text = "Отмена";

  var buttonDraw = group13.add("button", undefined, undefined, {name: "buttonDraw"});
  buttonDraw.text = "Готово";

  sliderTreeStem.onChange = function() {
    previewStart();
  };

  sliderTreeTop.onChange = function() {
    previewStart();
  };

  sliderTreeBottom.onChange = function() {
    previewStart();
  };

  sliderTreeWidth.onChange = function() {
    previewStart();
  };

  sliderTreeCount.onChange = function() {
    previewStart();
  };

  treeColor1.onClick = function() {
    if ( 0 !== vTreeNeedlesColor) {
      vTreeNeedlesColor = 0
      previewStart();
    }
  }

  treeColor2.onClick = function() {
    if ( 1 !== vTreeNeedlesColor) {
      vTreeNeedlesColor = 1
      previewStart();
    }
  }

  treeColor3.onClick = function() {
    if ( 2 !== vTreeNeedlesColor) {
      vTreeNeedlesColor = 2
      previewStart();
    }
  }

  treeColor4.onClick = function() {
    if ( 3 !== vTreeNeedlesColor) {
      vTreeNeedlesColor = 3
      previewStart();
    }
  }

  treeColor5.onClick = function() {
    if ( 4 !== vTreeNeedlesColor) {
      vTreeNeedlesColor = 4
      previewStart();
    }
  }

  sliderTreeBranchHeight.onChange = function() {
    previewStart();
  };

  sliderTreeBranchWidth.onChange = function() {
    previewStart();
  };

  sliderFiguresCount.onChange = function() {
    previewStart();
  };

  sliderFiguresWidth.onChange = function() {
    previewStart();
  };

  sliderFiguresColor.onChange = function() {
    previewStart();
  };

  buttonCancel.onClick = function() {
    closeDoc = true;
    dialog.close();
  };

  buttonDraw.onClick = function() {
    closeDoc = false;
    needUndo = true;
    finishDraw = true;
    dialog.close();
  };

  dialog.onShow = function() {
    closeDoc = true;
    previewStart();
  };

  dialog.onClose = function() {
    if (true === needUndo) {
      needUndo = false;
    }
    if (closeDoc) {
      DOC.close(SaveOptions.DONOTSAVECHANGES);
    }
    return true;
  };

  dialog.show();
}

/**
 * Artboard
 */
const DOC = app.documents.add(
    DocumentColorSpace.CMYK,
    SIZE.WIDTH,
    SIZE.HEIGHT,
    1,
);
ARTBOARD = DOC.artboards[0];
ARTBOARD.artboardRect = [
  0, SIZE.HEIGHT, SIZE.WIDTH, 0,
];

showWindow();
