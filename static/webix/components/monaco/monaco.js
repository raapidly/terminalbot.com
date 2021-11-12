// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

webix.protoUI({

    name: "monaco-editor",

    $init: function (config) {
        config.cdn = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min";
        this._editor_promise = webix.promise.defer();
        this.$ready.push(function () {
            webix.require([
                this.config.cdn + "/vs/loader.js",
            ]).then(webix.bind(function () {
                require.config({paths: {vs: this.config.cdn + "/vs"}});
                require(["vs/editor/editor.main"], webix.bind(function () {
                    this._editor = monaco.editor.create(this.$view, webix.copy(this.config));
                    this._editor_promise.resolve(this._editor);
                }, this));
            }, this));
        });
    },
    $setSize: function (width, height) {
        let base_view = webix.ui.view;
        if (base_view.prototype.$setSize.call(this, width, height) && this._editor) {
            this._editor.layout();
        }
    },

    setValue: function (value) {
        if (!value && value !== 0) {
            value = "";
        }
        this.config.value = value;
        if (this._editor) {
            this._editor.setValue(value);
        }
    },
    getValue: function () {
        if (this._editor) {
            return this._editor.getValue();
        } else {
            this.config.value;
        }
    },
    getEditor: function (wait_editor) {
        if (wait_editor) {
            return this._editor_promise;
        } else {
            return this._editor;
        }
    },
}, webix.ui.view);