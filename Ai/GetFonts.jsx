/**
 * Скрипт, который открывает все файлы *.ai в папке и находит все использующиеся там шрифты
 * @copyright Sergey Turulin <sergey@adobescript.ru>
 * telegram: @turulin
 * twitter: @STurulin
 */

const russian = 'Привет, русский язык!'
app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS
var sourceFolder, files = [], runScript = false
const
    SLC = 'st_gf_fo',
    folderPath = $.getenv(SLC) || Folder.desktop,
    skipFolders = ['cache', 'vendor', 'node_modules', 'var']

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k
        if (this == null) {
            throw new TypeError('"this" is null or not defined')
        }
        var O = Object(this)
        var len = O.length >>> 0
        if (len === 0) {
            return -1
        }
        var n = +fromIndex || 0
        if (Math.abs(n) === Infinity) {
            n = 0
        }
        if (n >= len) {
            return -1
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k
            }
            k++
        }
        return -1
    }
}

function getAllFiles(folder, fileType, doRecurse) {
    fileType = fileType || '*.ai'
    doRecurse = doRecurse || false

    var fileList = []

    function recurse(folder) {
        var i, files = folder.getFiles(fileType)
        for (i = 0; i < files.length; i++) {
            fileList.push(files[i])
        }

        var folders = folder.getFiles()
        for (i = 0; i < folders.length; i++) {
            if (doRecurse && folders[i] instanceof Folder) {
                var fName = folders[i].name
                // Skip system folders
                if ('.' === fName.substr(0, 1)) {
                    continue
                }
                // Skip files from array skipFolders
                if (skipFolders.indexOf(fName) >= 0) {
                    continue
                }
                recurse(folders[i])
            }
        }
    }

    if (folder != null && folder instanceof Folder) {
        recurse(folder)
    }
    return fileList
}

function dialogEnd(result) {
    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select):
    {"activeId":2,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"EditText","parentId":0,"style":{"enabled":true,"varName":"textResult","creationProps":{"noecho":false,"readonly":false,"multiline":true,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"EditText","justify":"left","preferredSize":[300,0],"alignment":"center","helpTip":null}},"item-2":{"id":2,"type":"Button","parentId":0,"style":{"enabled":true,"varName":"buttonOk","text":"Ok","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,1,2],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
    */

// DIALOG
// ======
    var dialog = new Window('dialog')
    dialog.text = 'Шрифты в файлах'
    dialog.orientation = 'column'
    dialog.alignChildren = ['center', 'top']
    dialog.spacing = 10
    dialog.margins = 16

    var textResult = dialog.add('edittext {properties: {name: "textResult", multiline: true}}')
    textResult.text = result
    textResult.preferredSize.width = 300
    textResult.alignment = ['center', 'top']

    var buttonOk = dialog.add('button', undefined, undefined, {name: 'buttonOk'})
    buttonOk.text = 'Ok'

    dialog.show()
}

function run(sourceFolder) {
    $.setenv(SLC, sourceFolder)
    if (0 === files.length) {
        alert('Файлы не найдены.')
        return
    }

    var file, doc, docFonts, frames, ranges, range, fontStyle,
        docsFonts = []
    for (var i = 0; i < files.length; i++) {
        file = files[i]
        doc = app.open(file)
        docFonts = {
            doc: doc.name,
            fonts: {},
        }
        frames = doc.textFrames
        for (var j = 0; j < frames.length; j++) {
            ranges = frames[j].textRanges
            for (var k = 0; k < ranges.length; k++) {
                range = ranges[k]
                fontStyle =
                    'font: ' + range.characterAttributes.textFont.family + ', ' +
                    'style: ' + range.characterAttributes.textFont.style
                if (!docFonts.fonts[fontStyle]) {
                    docFonts.fonts[fontStyle] = fontStyle
                }
            }
        }
        docsFonts.push(docFonts)
        doc.close()
    }

    var message = '', countInDoc
    for (i = 0; i < docsFonts.length; i++) {
        docFonts = docsFonts[i]
        countInDoc = 0
        for (font in docFonts.fonts) {
            if (0 === countInDoc) {
                message += '\n' + docFonts.doc + '\n'
            }
            message += '\t' + font + '\n'
            countInDoc++
        }
    }

    if ('' === message) {
        alert('Шрифты не найдены.')
        return
    }

    dialogEnd(message)
}

function dialogStart() {
    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select):
    {"activeId":11,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":false,"borderless":false,"resizeable":false},"text":"getFonts — Найти все шрифты в файлах","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"properties","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Настроечки","preferredSize":[450,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-2":{"id":2,"type":"Group","parentId":1,"style":{"enabled":true,"varName":"groupFolderPath","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-3":{"id":3,"type":"StaticText","parentId":2,"style":{"enabled":true,"varName":"labelFolderPath","creationProps":{"truncate":"none","multiline":true,"scrolling":false},"softWrap":true,"text":"Папочка:","justify":"left","preferredSize":[80,48],"alignment":"top","helpTip":null}},"item-4":{"id":4,"type":"StaticText","parentId":2,"style":{"enabled":true,"varName":"ValueFolderPath","creationProps":{"truncate":"none","multiline":true,"scrolling":false},"softWrap":true,"text":"~/Desktop","justify":"left","preferredSize":[310,48],"alignment":"top","helpTip":null}},"item-5":{"id":5,"type":"Button","parentId":12,"style":{"enabled":true,"varName":"buttonFolderPath","text":"Выбрать папочку...","justify":"center","preferredSize":[160,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"groupButtons","preferredSize":[470,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-8":{"id":8,"type":"Checkbox","parentId":12,"style":{"enabled":true,"varName":"isRecursive","text":"Искать во вложенных папочках тоже","preferredSize":[280,0],"alignment":null,"helpTip":null,"checked":true}},"item-9":{"id":9,"type":"Group","parentId":6,"style":{"enabled":true,"varName":"buttons","preferredSize":[460,0],"margins":0,"orientation":"row","spacing":220,"alignChildren":["left","center"],"alignment":null}},"item-10":{"id":10,"type":"Button","parentId":9,"style":{"enabled":true,"varName":"buttonCancel","text":"Отмена","justify":"center","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-11":{"id":11,"type":"Button","parentId":9,"style":{"enabled":false,"varName":"buttonFind","text":"Найти в папках","justify":"center","preferredSize":[150,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"Group","parentId":1,"style":{"enabled":true,"varName":"groupSelectFolderPath","preferredSize":[450,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-14":{"id":14,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":"message","creationProps":{"truncate":"none","multiline":true,"scrolling":false},"softWrap":false,"text":"Этот скрипт будет открывать по очереди все ai-файлы и искать в них шрифты. Это может занять какое-то время. Настоятельно рекомендую не кликать в другие окна во время открытия файлов, потому что Иллюстратор очень капризный. Если скрипт вылетает, попробуйте уменьшить количество файлов.","justify":"left","preferredSize":[470,80],"alignment":null,"helpTip":null}}},"order":[0,1,2,3,4,12,8,5,14,6,9,10,11],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
    */

// DIALOG
// ======
    var dialog = new Window("dialog", undefined, undefined, {closeButton: false});
    dialog.text = "getFonts — Найти все шрифты в файлах";
    dialog.orientation = "column";
    dialog.alignChildren = ["center","top"];
    dialog.spacing = 10;
    dialog.margins = 16;

// PROPERTIES
// ==========
    var properties = dialog.add("panel", undefined, undefined, {name: "properties"});
    properties.text = "Настроечки";
    properties.preferredSize.width = 450;
    properties.orientation = "column";
    properties.alignChildren = ["left","top"];
    properties.spacing = 10;
    properties.margins = 10;

// GROUPFOLDERPATH
// ===============
    var groupFolderPath = properties.add("group", undefined, {name: "groupFolderPath"});
    groupFolderPath.orientation = "row";
    groupFolderPath.alignChildren = ["left","center"];
    groupFolderPath.spacing = 10;
    groupFolderPath.margins = 0;

    var labelFolderPath = groupFolderPath.add("statictext", undefined, undefined, {name: "labelFolderPath", multiline: true});
    labelFolderPath.text = "Папочка:";
    labelFolderPath.preferredSize.width = 80;
    labelFolderPath.preferredSize.height = 48;
    labelFolderPath.alignment = ["left","top"];

    var ValueFolderPath = groupFolderPath.add("statictext", undefined, undefined, {name: "ValueFolderPath", multiline: true});
    ValueFolderPath.text = "~/Desktop";
    ValueFolderPath.preferredSize.width = 310;
    ValueFolderPath.preferredSize.height = 48;
    ValueFolderPath.alignment = ["left","top"];

// GROUPSELECTFOLDERPATH
// =====================
    var groupSelectFolderPath = properties.add("group", undefined, {name: "groupSelectFolderPath"});
    groupSelectFolderPath.preferredSize.width = 450;
    groupSelectFolderPath.orientation = "row";
    groupSelectFolderPath.alignChildren = ["left","center"];
    groupSelectFolderPath.spacing = 10;
    groupSelectFolderPath.margins = 0;

    var isRecursive = groupSelectFolderPath.add("checkbox", undefined, undefined, {name: "isRecursive"});
    isRecursive.text = "Искать во вложенных папочках тоже";
    isRecursive.value = true;
    isRecursive.preferredSize.width = 280;

    var buttonFolderPath = groupSelectFolderPath.add("button", undefined, undefined, {name: "buttonFolderPath"});
    buttonFolderPath.text = "Выбрать папочку...";
    buttonFolderPath.preferredSize.width = 160;

// DIALOG
// ======
    var message = dialog.add("statictext", undefined, undefined, {name: "message", multiline: true});
    message.text = "Скрипт будет открывать по очереди все ai-файлы и искать шрифты. Это может занять какое-то время. Настоятельно рекомендую не кликать в другие окна во время открытия файлов, потому что Иллюстратор очень капризный. Если скрипт вылетает, попробуйте уменьшить количество файлов. Если найдёте ошибки, пишите sergey@adobescript.ru";
    message.preferredSize.width = 470;
    message.preferredSize.height = 80;

// GROUPBUTTONS
// ============
    var groupButtons = dialog.add("group", undefined, {name: "groupButtons"});
    groupButtons.preferredSize.width = 470;
    groupButtons.orientation = "row";
    groupButtons.alignChildren = ["left","center"];
    groupButtons.spacing = 10;
    groupButtons.margins = 0;

// BUTTONS
// =======
    var buttons = groupButtons.add("group", undefined, {name: "buttons"});
    buttons.preferredSize.width = 460;
    buttons.orientation = "row";
    buttons.alignChildren = ["left","center"];
    buttons.spacing = 220;
    buttons.margins = 0;

    var buttonCancel = buttons.add("button", undefined, undefined, {name: "buttonCancel"});
    buttonCancel.text = "Отмена";
    buttonCancel.preferredSize.width = 100;

    var buttonFind = buttons.add("button", undefined, undefined, {name: "buttonFind"});
    buttonFind.enabled = false;
    buttonFind.text = "Найти в папках";
    buttonFind.preferredSize.width = 150;

    isRecursive.onClick = function() {
        setCount()
    }

    buttonFolderPath.onClick = function() {
        const folder = new Folder(ValueFolderPath.text)
        const newSourceFolder = folder.selectDlg('Select the folder with Illustrator files')
        if (null !== newSourceFolder) {
            ValueFolderPath.text = newSourceFolder
            setCount()
        }
    }

    function setCount() {
        sourceFolder = new Folder(ValueFolderPath.text)
        files = getAllFiles(sourceFolder, null, isRecursive.value)
        buttonFind.text = 'Найти в файлах: ' + files.length
        buttonFind.enabled = files.length > 0
    }

    ValueFolderPath.text = decodeURI(folderPath)

    buttonFind.onClick = function() {
        runScript = true
        dialog.close()
    }

    buttonCancel.onClick = function() {
        dialog.close()
    }

    setCount()
    dialog.show()
}

dialogStart()
if (true === runScript) {
    run(sourceFolder)
}
