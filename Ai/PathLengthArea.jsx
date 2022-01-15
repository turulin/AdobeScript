/**
 * ©Sergey Turulin
 *
 * email: sergey@adobescript.ru
 * telegram: turulin
 * twitter: STurulin
 */
run = function() {
    if (0 === app.documents.length) {
        alert('Надо открыть документ и выбрать 1 линию :)')
        return
    }
    if (1 !== app.activeDocument.selection.length
        || 'PathItem' !== app.activeDocument.selection[0].typename
    ) {
        alert('Надо выбрать 1 линию (PathItem)')
        return
    }

    alert(
        'Выделенная линия: \n' +
        'Длина: ' + Math.round(10 * app.activeDocument.selection[0].length) / 10 + ' пикс.\n' +
        'Площадь: ' + Math.round(10 * app.activeDocument.selection[0].area) / 10 + ' кв. пикс.'
    )
}

run()
