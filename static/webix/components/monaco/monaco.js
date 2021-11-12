// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols,JSUnresolvedFunction

webix.protoUI({

    name: "monaco-editor",

    $init: function (config) {
        config.cdn = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min";
        this.$on = {
            onBeforeLoad: function () {
            },
            onAfterLoad: function () {
            },
        };
        this.$ready.push(() => {
            this.$on.onBeforeLoad();
            webix.require([
                this.config.cdn + "/vs/loader.js",
            ]).then(webix.bind(() => {
                require.config({paths: {vs: this.config.cdn + "/vs"}});
                require(["vs/editor/editor.main"], webix.bind(() => {
                    this.$editor = monaco.editor.create(this.$view, webix.copy(this.config));
                    this.$on.onAfterLoad();
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

    attachEvent: function (name, callback) {
        this.$on[name] = callback;
    }

}, webix.ui.view);