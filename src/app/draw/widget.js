'use strict';
/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */
class Widget {
    constructor(DataProvider, draw = false,sizeX=false,sizeY=false) {
        this.pixelSize=[];
        this._scheduledResize = false;
        this.data = DataProvider;
        this.drawCommnads = draw;

        this._draw = false;
        if (draw && this.drawCommnads.drawtype) {
            this.drawType = this.drawCommnads.drawtype.toUpperCase();
        } else {
            this.drawType = false;
        }
        // проверка результат с ошибкой или это текстовая строка
        this.error = this.data.error;
        this.text = this.data.text;
        this.name = "Widget";

        this.element = false;
        this.init = false;


        if (_.isNumber(sizeX)) {
            this.sizeX = sizeX;
        }
        if (_.isNumber(sizeY)) {
            this.sizeY = sizeY;
        }


        this.type = false;
        // Адовый костылище, поскольку в конструктор должны передаваться
        // dependency injecton, а не данные для работы класса. Поэтому я не могу
        // передать в конструктор сервис и дергаю его по рабоче - крестьянски.
        this.isDark = angular.element('*[ng-app]').injector().get("ThemeService").isDark();
    }

    onDrag() {
        // console.info("On widget Draw",this);
    }

    onResize() {
        // console.info("On widget Resize",this);
    }

    scheduledResize(size) {
        console.info("scheduledResize(size)",size);
        if (size)
        {
            this.pixelSize=size;
        }

        if (this._scheduledResize) {
            return;
        }

        // console.info("Add scheduledResize :",this.sizeX,this.sizeY);
        // отложенный ресайз , если много изменений
        this._scheduledResize = true;
        let th = this;
        setTimeout(function () {
            th._scheduledResize = false;
            th.onResize();
        }, 900);
    }

    toString() {
        return '(' + this.name + ', ' + this.y + ')';
    }
}
// export { Widget };
