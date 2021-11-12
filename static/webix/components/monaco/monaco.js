// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

webix.protoUI({

    name: "monaco-editor",

    $init: function (config) {
        config.cdn = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min";
        this.$ready.push(function () {
            webix.require([
                this.config.cdn + "/vs/loader.js",
            ]).then(webix.bind(function () {
                require.config({paths: {vs: this.config.cdn + "/vs"}});
                require(["vs/editor/editor.main"], webix.bind(function () {
                    this.$editor = monaco.editor.create(this.$view, webix.copy(this.config));
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

}, webix.ui.view);