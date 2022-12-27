/**
 * Get path's length and area
 *
 * @copyright Sergey Turulin
 * site: adobescript.ru На русском
 * site: adobescript.com In English
 * email: sergey@adobescript.ru
 * telegram: https://t.me/adobescript Канал про автоматизацию дизайна на русском
 * telegram: https://t.me/adobescripts About Design Automation in English
 * telegram: https://t.me/turulin Personal telegram
 * twitter: https://twitter.com/adobescript Twitter
 *
 * @version 1.1
 */

var roundAbs = function(value, factor) {
    factor = factor || 3
    return Math.abs(Math.round(Math.pow(10, factor) * value) / Math.pow(10, factor))
}

var dialog = function() {
    var
        needUndo = false,
        finishDraw = false,
        isFirstCalculation = true,
        areaColor = new CMYKColor()

    areaColor.cyan = 0
    areaColor.magenta = 100
    areaColor.yellow = 0
    areaColor.black = 0

    const UNIT = {
        'mm': {
            name: 'мм',
            unit: RulerUnits.Millimeters,
        },
        'cm': {
            name: 'см',
            unit: RulerUnits.Centimeters,
        },'m': {
            name: 'м',
            unit: RulerUnits.Meters,
        },
        'pt': {
            name: 'пункты',
            unit: RulerUnits.Points,
        },
        'px': {
            name: 'пикселы',
            unit: RulerUnits.Pixels,
        },
        'in': {
            name: 'дюймы',
            unit: RulerUnits.Inches,
        },
    }

    function showValues() {
        const unit = 'pt'

        var sourceLine = LINE
        var sourceArea = AREA
        if (radioScale2.value) {
            sourceLine = AREA
            sourceArea = LINE
        }

        sourceArea.fillColor = areaColor

        var valueUnit = getKeyOfObjectByPropertyName(UNIT, 'name', dropdownUnit.selection.toString())

        var lineScale = 1
        // Scale from the line
        if (2 === COUNT) {
            const lineUnit = getKeyOfObjectByPropertyName(UNIT, 'name', dropdownLineUnit.selection.toString())
            if (isFirstCalculation) {
                const lineUnitValue = new UnitValue(sourceLine.length, 'pt')
                textLine.text = roundAbs(lineUnitValue.as(lineUnit)).toString()
            }

            const lineScaleUnit = new UnitValue(parseFloat(textLine.text), lineUnit)
            lineScale = lineScaleUnit.as('pt') / sourceLine.length
        }

        // Scale
        var scale = parseFloat(textScale.text.replace(',', '.'))
        if (isNaN(scale)) {
            scale = 1
        }

        // Length
        const length = new UnitValue(sourceArea.length, unit)
        textLength.text = roundAbs(lineScale * scale * length.as(valueUnit))

        // Area
        textArea.enabled = sourceArea.closed
        if (sourceArea.closed) {
        } else {
            textArea.text = ''
        }
        const areaK = new UnitValue(1, unit)
        textArea.text = roundAbs(sourceArea.area * Math.pow(areaK.as(valueUnit), 2) * Math.pow(lineScale * scale, 2))

        isFirstCalculation = false
    }

    function getKeyOfObjectByPropertyName(object, propertyName, value) {
        for (var key in object) {
            if (value === object[key][propertyName]) {
                return key
            }
        }
    }

    function draw() {
        showValues()
    }

    function startAction() {
        try {
            draw()
        } catch (e) {
            alert(e.message)
        }
        if (false === finishDraw) {
            needUndo = true
            redraw()
        }
    }

    function previewStart() {
        if (true === needUndo) {
            appUnDo()
            needUndo = false
        } else {
            needUndo = true
        }

        startAction()
    }

    function appUnDo() {
        app.undo()
    }

    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select):
    {"activeId":26,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"dialogPathLengthArea","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Длина и площадь формы","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-2":{"id":2,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"groupButton","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-3":{"id":3,"type":"Panel","parentId":0,"style":{"enabled":false,"varName":"panelScale","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Взять длину с линии","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-4":{"id":4,"type":"Button","parentId":2,"style":{"enabled":true,"varName":"buttonCancel","text":"Готово","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"StaticText","parentId":8,"style":{"enabled":true,"varName":"labelScale","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Масштаб","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"EditText","parentId":8,"style":{"enabled":true,"varName":"textScale","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"1","justify":"left","preferredSize":[120,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Group","parentId":9,"style":{"enabled":true,"varName":"groupScale","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"panelValue","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Результат","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-10":{"id":10,"type":"Group","parentId":9,"style":{"enabled":true,"varName":"groupLength","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-11":{"id":11,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":"labelLength","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Длина","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"EditText","parentId":10,"style":{"enabled":true,"varName":"textLength","creationProps":{"noecho":false,"readonly":true,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[120,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Group","parentId":9,"style":{"enabled":true,"varName":"groupArea","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-14":{"id":14,"type":"StaticText","parentId":13,"style":{"enabled":true,"varName":"labelArea","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Площадь","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"EditText","parentId":13,"style":{"enabled":true,"varName":"textArea","creationProps":{"noecho":false,"readonly":true,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[120,0],"alignment":null,"helpTip":null}},"item-16":{"id":16,"type":"RadioButton","parentId":18,"style":{"enabled":true,"varName":"radioScale2","text":"Линия 2","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-17":{"id":17,"type":"RadioButton","parentId":18,"style":{"enabled":true,"varName":"radioScale1","text":"Линия 1","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-18":{"id":18,"type":"Group","parentId":3,"style":{"enabled":true,"varName":"groupLineScale","preferredSize":[170,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-19":{"id":19,"type":"EditText","parentId":20,"style":{"enabled":true,"varName":"textLine","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[120,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"Group","parentId":18,"style":{"enabled":true,"varName":"groupLine","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-21":{"id":21,"type":"StaticText","parentId":20,"style":{"enabled":true,"varName":"staticLine","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Длина линии","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-22":{"id":22,"type":"Group","parentId":9,"style":{"enabled":true,"varName":"groupUnit","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-23":{"id":23,"type":"StaticText","parentId":22,"style":{"enabled":true,"varName":"labelUnit","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Посчитать в","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-24":{"id":24,"type":"DropDownList","parentId":22,"style":{"enabled":true,"varName":"dropdownUnit","text":"DropDownList","listItems":"","preferredSize":[120,0],"alignment":null,"selection":0,"helpTip":null}},"item-25":{"id":25,"type":"Group","parentId":18,"style":{"enabled":true,"varName":"groupLineUnit","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-26":{"id":26,"type":"StaticText","parentId":25,"style":{"enabled":true,"varName":"labelLineUnit","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Длина линии в","justify":"left","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-27":{"id":27,"type":"DropDownList","parentId":25,"style":{"enabled":true,"varName":"dropdownLineUnit","text":"DropDownList","listItems":"","preferredSize":[120,0],"alignment":null,"selection":0,"helpTip":null}}},"order":[0,3,18,17,16,20,21,19,25,26,27,9,8,6,7,22,23,24,10,11,12,13,14,15,2,4],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
    */

// DIALOGPATHLENGTHAREA
// ====================
    var dialogPathLengthArea = new Window('dialog')
    dialogPathLengthArea.text = 'Длина и площадь формы'
    dialogPathLengthArea.orientation = 'column'
    dialogPathLengthArea.alignChildren = ['center', 'top']
    dialogPathLengthArea.spacing = 10
    dialogPathLengthArea.margins = 16

// PANELSCALE
// ==========
    var panelScale = dialogPathLengthArea.add('panel', undefined, undefined, {name: 'panelScale'})
    panelScale.enabled = false
    panelScale.text = 'Взять длину с линии'
    panelScale.orientation = 'column'
    panelScale.alignChildren = ['left', 'top']
    panelScale.spacing = 10
    panelScale.margins = 10

// GROUPLINESCALE
// ==============
    var groupLineScale = panelScale.add('group', undefined, {name: 'groupLineScale'})
    groupLineScale.preferredSize.width = 170
    groupLineScale.orientation = 'column'
    groupLineScale.alignChildren = ['left', 'center']
    groupLineScale.spacing = 10
    groupLineScale.margins = 0

    var radioScale1 = groupLineScale.add('radiobutton', undefined, undefined, {name: 'radioScale1'})
    radioScale1.text = 'Линия 1'
    radioScale1.value = true

    var radioScale2 = groupLineScale.add('radiobutton', undefined, undefined, {name: 'radioScale2'})
    radioScale2.text = 'Линия 2'

// GROUPLINE
// =========
    var groupLine = groupLineScale.add('group', undefined, {name: 'groupLine'})
    groupLine.orientation = 'row'
    groupLine.alignChildren = ['left', 'center']
    groupLine.spacing = 10
    groupLine.margins = 0

    var staticLine = groupLine.add('statictext', undefined, undefined, {name: 'staticLine'})
    staticLine.text = 'Длина линии'
    staticLine.preferredSize.width = 100

    var textLine = groupLine.add('edittext {properties: {name: "textLine"}}')
    textLine.preferredSize.width = 120

// GROUPLINEUNIT
// =============
    var groupLineUnit = groupLineScale.add('group', undefined, {name: 'groupLineUnit'})
    groupLineUnit.orientation = 'row'
    groupLineUnit.alignChildren = ['left', 'center']
    groupLineUnit.spacing = 10
    groupLineUnit.margins = 0

    var labelLineUnit = groupLineUnit.add('statictext', undefined, undefined, {name: 'labelLineUnit'})
    labelLineUnit.text = 'Длина линии в'
    labelLineUnit.preferredSize.width = 100

    var dropdownLineUnit = groupLineUnit.add('dropdownlist', undefined, undefined, {name: 'dropdownLineUnit'})
    dropdownLineUnit.selection = 0
    dropdownLineUnit.preferredSize.width = 120

// PANELVALUE
// ==========
    var panelValue = dialogPathLengthArea.add('panel', undefined, undefined, {name: 'panelValue'})
    panelValue.text = 'Результат'
    panelValue.orientation = 'column'
    panelValue.alignChildren = ['left', 'top']
    panelValue.spacing = 10
    panelValue.margins = 10

// GROUPSCALE
// ==========
    var groupScale = panelValue.add('group', undefined, {name: 'groupScale'})
    groupScale.orientation = 'row'
    groupScale.alignChildren = ['left', 'center']
    groupScale.spacing = 10
    groupScale.margins = 0

    var labelScale = groupScale.add('statictext', undefined, undefined, {name: 'labelScale'})
    labelScale.text = 'Масштаб'
    labelScale.preferredSize.width = 100

    var textScale = groupScale.add('edittext {properties: {name: "textScale"}}')
    textScale.text = '1'
    textScale.preferredSize.width = 120

// GROUPUNIT
// =========
    var groupUnit = panelValue.add('group', undefined, {name: 'groupUnit'})
    groupUnit.orientation = 'row'
    groupUnit.alignChildren = ['left', 'center']
    groupUnit.spacing = 10
    groupUnit.margins = 0

    var labelUnit = groupUnit.add('statictext', undefined, undefined, {name: 'labelUnit'})
    labelUnit.text = 'Посчитать в'
    labelUnit.preferredSize.width = 100

    var dropdownUnit = groupUnit.add('dropdownlist', undefined, undefined, {name: 'dropdownUnit'})
    dropdownUnit.selection = 0
    dropdownUnit.preferredSize.width = 120

// GROUPLENGTH
// ===========
    var groupLength = panelValue.add('group', undefined, {name: 'groupLength'})
    groupLength.orientation = 'row'
    groupLength.alignChildren = ['left', 'center']
    groupLength.spacing = 10
    groupLength.margins = 0

    var labelLength = groupLength.add('statictext', undefined, undefined, {name: 'labelLength'})
    labelLength.text = 'Длина'
    labelLength.preferredSize.width = 100

    var textLength = groupLength.add('edittext {properties: {name: "textLength", readonly: true}}')
    textLength.preferredSize.width = 120

// GROUPAREA
// =========
    var groupArea = panelValue.add('group', undefined, {name: 'groupArea'})
    groupArea.orientation = 'row'
    groupArea.alignChildren = ['left', 'center']
    groupArea.spacing = 10
    groupArea.margins = 0

    var labelArea = groupArea.add('statictext', undefined, undefined, {name: 'labelArea'})
    labelArea.text = 'Площадь'
    labelArea.preferredSize.width = 100

    var textArea = groupArea.add('edittext {properties: {name: "textArea", readonly: true}}')
    textArea.preferredSize.width = 120

// GROUPBUTTON
// ===========
    var groupButton = dialogPathLengthArea.add('group', undefined, {name: 'groupButton'})
    groupButton.orientation = 'row'
    groupButton.alignChildren = ['left', 'center']
    groupButton.spacing = 10
    groupButton.margins = 0

    var buttonCancel = groupButton.add('button', undefined, undefined, {name: 'buttonCancel'})
    buttonCancel.text = 'Готово'

    // End of ScriptUI

    alert(DOC.rulerUnits)
    for (var key in UNIT) {
        if (!UNIT.hasOwnProperty(key)) {
            continue
        }

        dropdownLineUnit.add('item', UNIT[key].name)
        dropdownUnit.add('item', UNIT[key].name)
        if (UNIT[key].unit === DOC.rulerUnits) {
            dropdownLineUnit.selection = dropdownUnit.items.length - 1
            dropdownUnit.selection = dropdownUnit.items.length - 1
        }
    }
    if (null === dropdownLineUnit.selection) {
        dropdownLineUnit.selection = 0
    }
    if (null === dropdownUnit.selection) {
        dropdownUnit.selection = 0
    }
    dropdownLineUnit.onChange = function() {
        showValues()
    }
    dropdownUnit.onChange = function() {
        showValues()
    }

    if (2 === COUNT) {
        panelScale.enabled = true
    }

    radioScale1.onClick = function() {
        isFirstCalculation = true
        previewStart()
    }
    radioScale2.onClick = function() {
        isFirstCalculation = true
        previewStart()
    }

    textLine.onChanging = function() {
        showValues()
    }

    textScale.onChanging = function() {
        showValues()
    }

    dialogPathLengthArea.onShow = function() {
        previewStart()
    }

    buttonCancel.onClick = function() {
        dialogPathLengthArea.close()
    }

    dialogPathLengthArea.onClose = function() {
        if (true === needUndo) {
            appUnDo()
            redraw()
        }

        return true
    }

    dialogPathLengthArea.show()
}

var run = function() {
    const ERROR_MESSAGE = 'Надо открыть документ и выбрать одну форму или одну форму и одну линию для масштаба\n:)'

    if (0 === app.documents.length
        || app.activeDocument.selection.length < 1
        || app.activeDocument.selection.length > 2
    ) {
        alert(ERROR_MESSAGE)
        return
    }

    DOC = app.activeDocument
    COUNT = DOC.selection.length
    if (1 === COUNT) {
        if ('PathItem' !== DOC.selection[0].typename) {
            alert(ERROR_MESSAGE)
            return
        }

        AREA = DOC.selection[0]
    }

    if (2 === COUNT) {
        if ('PathItem' !== DOC.selection[0].typename || 'PathItem' !== DOC.selection[1].typename) {
            alert(ERROR_MESSAGE)
            return
        }

        AREA = DOC.selection[0]
        LINE = DOC.selection[1]
        if (LINE.closed) {
            LINE = DOC.selection[0]
            AREA = DOC.selection[1]
        }
    }

    dialog()
}

var DOC, COUNT, AREA, LINE
run()
