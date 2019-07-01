class Textbox {
    constructor(selector, invalidSymbolsRegex){
        this.selector = selector;
        this._invalidSymbols = invalidSymbolsRegex;
        this._elements = $(this.selector);
        $(this.selector).on('input', function () {
            $('*[type=text]').val(this.value);
        });

    }

    get value(){
        return this.elements.val();
    }
    set value(newValue){
        this.elements.val(newValue);
    }

    get elements(){
        return this._elements;
    }

    isValid(){
        return ! this.value.match(this._invalidSymbols);
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input',function(){console.log(textbox.value);});

/*
class Textbox {
        constructor(selector, regex) {
            this.selector = selector;
            this._elements = $(selector);
            this._invalidSymbols = regex;
            this._value = '';

            let that = this;
            $(selector).on('input change', function () {
                let value = $(this).val();
                $(that.selector).val(value);
                that.value = value;
            });
        }

        get elements() { return this._elements }

        get value() { return this._value }
        set value(v) {
            this._value = v;
            $(this.selector).val(v);
        }

        isValid() { return !this._invalidSymbols.test($(this.selector).val()); }
    }
*/