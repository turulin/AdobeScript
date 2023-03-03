/**
 * Рисование линий между центрами всех выделенных объектов
 * Drawing lines between the centers of all selected objects
 * ©Sergey Turulin
 * email: sergey@adobescript.ru
 * telegram: @adobescript
 * twitter: @adobescript
 */

/**
 * Настройки скрипта: можно менять
 */

// Имя слоя, в который будут создаваться линии
const LAYER_NAME = 'lineBetweenObjects'

// Имя графического стиля, который будет применяться, если он найден
const GRAPHIC_STYLE_NAME = 'lineBetweenObjects'

// Максимальное число линий
const LIMIT = 500

// Максимальное расстояние в пунктах между объектами
const LENGTH_MAXIMUM = 1000

/** Конец настроек скрипта */


/** Дисклеймер */
const MESSAGE = '\n----------\nСкрипт рисует в слой «' + LAYER_NAME.toString() + '» линии между выделенными объектами, '
    + 'расстояние между которыми меньше ' + LENGTH_MAXIMUM + ' пунктов, '
    + ((!isNaN(LIMIT) && LIMIT > 0) ? ' (максимум ' + LIMIT + ' шт.)' : '') + ', '
    + (GRAPHIC_STYLE_NAME ? '; и применяет к ним графический стиль «' + GRAPHIC_STYLE_NAME + '», если он есть' : '')
    + '.\nИмя слоя и стиля, максимум линий и расстояние можно поменять в скрипте, открыв его в текстовом редакторе.'

function run() {
    if (0 === app.documents.length) {
        alert('Скрипт можно запустить только в открытом документе' + MESSAGE)

        return
    }

    const DOCUMENT = app.activeDocument
    if (0 === DOCUMENT.selection.length) {
        alert('Нужно выделить объекты' + MESSAGE)

        return
    }

    var layer, newLayer = false, graphicStyle = null
    try {
        layer = DOCUMENT.layers.getByName(LAYER_NAME.toString())
    } catch (e) {
        layer = DOCUMENT.layers.add()
        layer.name = LAYER_NAME
        newLayer = true
    }
    try {
        graphicStyle = DOCUMENT.graphicStyles.getByName(GRAPHIC_STYLE_NAME.toString())
    } catch (e) {
    }

    var count = 0, stop1, stop2, point1, point2, pathItem, length
    for (var i = 0; i < DOCUMENT.selection.length; i++) {
        stop1 = DOCUMENT.selection[i]
        point1 = [stop1.left + (stop1.width / 2), stop1.top - (stop1.height / 2)]
        for (var j = i + 1; j < DOCUMENT.selection.length; j++) {
            stop2 = DOCUMENT.selection[j]
            point2 = [stop2.left + (stop2.width / 2), stop2.top - (stop2.height / 2)]

            // Проверим расстояние между объектами
            length = Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2))
            if (length > LENGTH_MAXIMUM) {
                continue
            }

            count++
            pathItem = layer.pathItems.add()
            pathItem.setEntirePath([point1, point2])
            if (null !== graphicStyle) {
                graphicStyle.applyTo(pathItem)
            }

            if (count >= LIMIT) {
                return
            }
        }
    }

    redraw()
    alert('На слое «' + LAYER_NAME + '»' + (newLayer ? ' (создан)' : '') + ' нарисовано линий: ' + count + MESSAGE)
}

try {
    run()
} catch (e) {
    alert('Ошибка: ' + e.message + MESSAGE)
}
