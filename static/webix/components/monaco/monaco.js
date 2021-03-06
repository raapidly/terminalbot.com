// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

webix.protoUI({

    name: "monaco-editor",

    $init: function (config) {
        config.cdn = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min";
        this.$ready.push(() => {
            webix.require([
                this.config.cdn + "/vs/loader.js",
            ]).then(webix.bind(() => {
                require.config({paths: {vs: this.config.cdn + "/vs"}});
                require(["vs/editor/editor.main"], webix.bind(() => {
                    this.$editor = monaco.editor.create(this.$view, webix.copy(this.config));
                    this.callEvent("onAfterLoad");
                    this.$editor.layout();
                }, this));
            }, this));
        });
    },
    $setSize: function (width, height) {
        let base_view = webix.ui.view;
        if (base_view.prototype.$setSize.call(this, width, height) && this.$editor) {
            this.$editor.layout();
        }
    },

    setValue: function (value) {
        if (this.$editor) {
            this.$editor.setValue(value);
        }
        this.config.value = value;
    },
    getValue: function () {
        if (this.$editor) {
            return this.$editor.getValue();
        }
        return this.config.value;
    },

}, webix.ui.proto);