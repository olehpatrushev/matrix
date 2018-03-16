var filter = filter || {};
(function () {
    'use strict';

    filter.canvasHolder = document.getElementById('canvasHolder');
    filter.canvasContext = filter.canvasHolder.getContext('2d');
    filter.redrawTimeOut = 50;
    filter.matrix = {};
    filter.matrixCount = 500;
    filter.lettersPalitra = {};
    filter.updateCanvasDimensionsTimeout = null;
    filter.letters = (function () {
        var result = [];
        for (var i = 0; i <= 255; i++) {
            result.push(String.fromCharCode(i));
        }
        return result;
    })();

    filter.reset = function () {
        filter.matrix = {};
    };
    filter.updateCanvasDimensions = function () {
        this.canvasHolder.width = this.canvasHolder.offsetWidth;
        this.canvasHolder.height = this.canvasHolder.offsetHeight;
    };
    filter.getRandomLetter = function () {
        return filter.letters[Math.floor(Math.random() * 255)];
    };
    filter.drawBackGround = function () {
        this.canvasContext.save();
        this.canvasContext.globalCompositeOperation = 'darken';
        this.canvasContext.globalAlpha = 0.1;
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.fillRect(0, 0, this.canvasHolder.offsetWidth, this.canvasHolder.offsetHeight);
        this.canvasContext.restore();
    };
    filter.drawLetters = function () {
        var tm;

        this.canvasContext.fillStyle = 'white';
        this.canvasContext.globalCompositeOperation = 'source-over';
        this.canvasContext.shadowOffsetX = 0;
        this.canvasContext.shadowOffsetY = 0;
        this.canvasContext.strokeStyle = 'white';

        for (var i = 0; i < this.matrixCount; i++) {
            tm = this.matrix[i];
            if (!tm) {
                tm = this.matrix[i] = {};
                tm.size = 5 + Math.floor(Math.random() * 10);
                tm.y = 0;
                tm.x = Math.floor(Math.random() * this.canvasHolder.offsetWidth) - tm.size;
                if (tm.x < 0) {
                    tm.x = 0;
                }
                tm.posibility = Math.random();
            }

            this.canvasContext.shadowBlur = tm.size;
            this.canvasContext.shadowColor = 'rgba(0, 128, 0, ' + tm.size / 10 + ')';

            if (Math.random() > tm.posibility) {
                continue; //just randomize it
            }

            if (tm.y + tm.size > this.canvasHolder.offsetHeight) {
                delete this.matrix[i];
                continue;
            }

            tm.y += tm.size;

            this.canvasContext.font = 'bold ' + tm.size + 'px sans-serif';
            if (Math.random() < 0.03) {
                this.canvasContext.fillText(this.getRandomLetter(), tm.x, tm.y); //draw one more
            }
            if (Math.random() < 0.3) {
                this.canvasContext.fillText(this.getRandomLetter(), tm.x, tm.y); //draw second letter
            }
            this.canvasContext.fillText(this.getRandomLetter(), tm.x, tm.y);
        }
    };
    filter.draw = function () {
        var me = this;
        this.drawBackGround();
        this.drawLetters();
        setTimeout(function () {
            me.draw();
        }, this.redrawTimeOut);
    };
})();