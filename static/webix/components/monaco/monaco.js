webix.protoUI({
    name: "monaco-editor",
    defaults: {language: "javascript"},
    $init: function () {
        this._waitEditor = webix.promise.defer();
        this.$ready.push(this._render_editor);
    },
    _render_editor: function () {
        let cdn = this.config.cdn;
        webix.require(cdn + "/vs/loader.js").then(
            webix.bind(function () {
                require.config({paths: {vs: cdn + "/vs/"}});
                window.MonacoEnvironment = {
                    getWorkerUrl: function () {
                        return "data:text/javascript;charset=utf-8," +
                            encodeURIComponent(
                                "self.MonacoEnvironment = { baseUrl: '" + cdn + "' };" +
                                "importScripts('" + cdn + "/vs/base/worker/workerMain.js');"
                            );
                    },
                };
                this._render_when_ready();
            }, this)
        );
    },
    _render_when_ready: function () {
        require(["vs/editor/editor.main"], webix.bind(function () {
            let config = webix.copy(this.config);
            this._editor = monaco.editor.create(this.$view, config);
            this._waitEditor.resolve(this._editor);
        }, this));
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
    getEditor: function (waitEditor) {
        if (waitEditor) {
            return this._waitEditor;
        } else {
            return this._editor;
        }
    }
}, webix.ui.view);