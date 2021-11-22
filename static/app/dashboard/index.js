let show = function () {

    /*==============================================================================================================
     ======================================== Validator Initialization
     =============================================================================================================*/

    const validator = {
        is_valid_properties: function (properties, validators) {
            for (let validator_key in validators) {
                let validate_property = validators[validator_key];
                let property_value = properties[validator_key];
                if (validate_property(property_value) === false)
                    return false;
            }
            return true;
        },
    };
    const validator_basic = {
        is_empty: function (value) {
            if (value === undefined) {
                return true;
            } else if (/^\s*$/.test(value)) {
                return true;
            }
            return false;
        },
    };
    const validator_property = {
        form: {
            $$name: function (value) {
                let valid_regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                if (validator_basic.is_empty(value)) {
                    return false;
                } else if (!valid_regex.test(value)) {
                    return false;
                }
                return true;
            },
        },
        datablock: {
            $$name: function (value) {
                let valid_regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                if (validator_basic.is_empty(value)) {
                    return false;
                } else if (!valid_regex.test(value)) {
                    return false;
                }
                return true;
            },
            $$type: function (value) {
                let allowed_values = ["form"];
                if (validator_basic.is_empty(value)) {
                    return false;
                } else if (!allowed_values.includes(value)) {
                    return false;
                }
                return true;
            },
        },
        item: {
            $$name: function (value) {
                let valid_regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                if (validator_basic.is_empty(value)) {
                    return false;
                } else if (!valid_regex.test(value)) {
                    return false;
                }
                return true;
            },
            $$label: function (value) {
                let valid_regex = /^.*$/;
                if (validator_basic.is_empty(value)) {
                    return false;
                } else if (!valid_regex.test(value)) {
                    return false;
                }
                return true;
            },
            $$type: function (value) {
                let allowed_values = ["text", "numeric", "date", "datetime", "time", "checkbox"];
                if (validator_basic.is_empty(value)) {
                    return false;
                } else if (!allowed_values.includes(value)) {
                    return false;
                }
                return true;
            },
        },
    };

    /*==============================================================================================================
     ======================================== View Initialization
     =============================================================================================================*/

    const view_functions = {
        tree: {
            folder: function (component) {
                let icon_class = "webix_icon mdi ";
                switch (component.$$kind) {
                    case "form":
                        icon_class += "mdi-notebook-outline";
                        return `<span class="${icon_class}"></span>`;
                    case "datablock":
                        icon_class += "mdi-database-outline";
                        return `<span class="${icon_class}"></span>`;
                    case "item":
                        icon_class += "mdi-form-textbox";
                        return `<span class="${icon_class}"></span>`;
                }
            },
            template: function (component, common) {
                let icon_common_1 = common.icon(component, common);
                let icon_common_2 = common.folder(component, common);
                let icon_common_2_error = `<span class="custom_icon_error">${common.folder(component, common)}</span>`;
                if (component.$$name === undefined)
                    component.$$name = "";
                switch (component.$$kind) {
                    case "form":
                        if (validator.is_valid_properties(component, validator_property.form))
                            return `${icon_common_1} ${icon_common_2} ${component.$$name}`;
                        return `${icon_common_1} ${icon_common_2_error} ${component.$$name}`;
                    case "datablock":
                        if (validator.is_valid_properties(component, validator_property.datablock))
                            return `${icon_common_1} ${icon_common_2} ${component.$$name}`;
                        return `${icon_common_1} ${icon_common_2_error} ${component.$$name}`;
                    case "item":
                        if (validator.is_valid_properties(component, validator_property.item))
                            return `${icon_common_1} ${icon_common_2} ${component.$$name}`;
                        return `${icon_common_1} ${icon_common_2_error} ${component.$$name}`;
                }
            },
        },
    };
    const view_objects = {
        toolbar: {
            id: "ui-toolbar", view: "toolbar", padding: 7.5,
            cols: [
                {
                    name: "dashboard", view: "icon", icon: "mdi mdi-monitor-dashboard",
                    tooltip: "Dashboard", borderless: false,
                },
                {
                    name: "save", view: "icon", icon: "mdi mdi-content-save-all-outline",
                    tooltip: "Save", borderless: false,
                },
                {
                    name: "new", view: "icon", icon: "mdi mdi-notebook-plus-outline",
                    tooltip: "New", borderless: false,
                },
                {
                    name: "open", view: "icon", icon: "mdi mdi-folder-open-outline",
                    tooltip: "Open", borderless: false,
                },
                {},
                {
                    name: "preview", view: "icon", icon: "mdi mdi-monitor-eye",
                    tooltip: "Preview", borderless: false,
                },
                {
                    name: "source-code", view: "icon", icon: "mdi mdi-application-braces-outline",
                    tooltip: "Source Code", borderless: false,
                },
            ],
        },
        tree: {
            id: "ui-tree", view: "tree", select: true, minHeight: 175, data: [],
            type: {folder: view_functions.tree.folder},
            template: view_functions.tree.template,
        },
        context_form: {
            id: "ui-context-form", view: "contextmenu", width: 200,
            data: [
                {
                    id: "insert", value: "Insert",
                    data: [
                        {id: "insert-datablock", value: "Data Block"},
                    ],
                },
                {$template: "Separator"},
                {id: "triggers", value: "Triggers"},
            ],
        },
        context_datablock: {
            id: "ui-context-datablock", view: "contextmenu", width: 200,
            data: [
                {
                    id: "insert", value: "Insert",
                    data: [
                        {id: "insert-item", value: "Item"},
                    ],
                },
                {id: "delete", value: "Delete"},
                {$template: "Separator"},
                {id: "triggers", value: "Triggers"},
            ],
        },
        context_item: {
            id: "ui-context-item", view: "contextmenu", width: 200,
            data: [
                {id: "delete", value: "Delete"},
                {$template: "Separator"},
                {id: "triggers", value: "Triggers"},
            ],
        },
        property_form: {
            id: "ui-property-form", view: "property", hidden: true,
            elements: [
                {type: "label", label: "General"},
                {id: "id", label: "#"},
                {id: "$$name", type: "text", label: "name"},
            ],
        },
        property_datablock: {
            id: "ui-property-datablock", view: "property", hidden: true,
            elements: [
                {type: "label", label: "General"},
                {id: "id", label: "#"},
                {id: "$$name", type: "text", label: "name"},
                {
                    id: "$$type", type: "combo", label: "type",
                    options: [
                        {id: "form", value: "Form"},
                    ],
                },
            ],
        },
        property_item: {
            id: "ui-property-item", view: "property", hidden: true,
            elements: [
                {type: "label", label: "General"},
                {id: "id", label: "#"},
                {id: "$$name", type: "text", label: "name"},
                {id: "$$label", type: "text", label: "label"},
                {
                    id: "$$type", type: "combo", label: "type",
                    options: [
                        {id: "text", value: "Text"},
                        {id: "numeric", value: "Numeric"},
                        {id: "date", value: "Date"},
                        {id: "datetime", value: "Date & Time"},
                        {id: "time", value: "Time"},
                        {id: "checkbox", value: "Checkbox"},
                    ],
                },
            ],
        },
        content: {
            id: "ui-content", type: "space", rows: [],
        },
    };
    const view_utilities = {
        generate_source_code: function () {
            let space = 2;
            let [value] = ui_tree.serialize();
            let replacer = [
                "id", "$$kind",
                ...Object.keys(validator_property.form),
                ...Object.keys(validator_property.datablock),
                ...Object.keys(validator_property.item),
                "data",
            ];
            return JSON.stringify(value, replacer, space);
        },
    };

    /*==============================================================================================================
     ======================================== View Factory
     =============================================================================================================*/

    webix.ui({
        id: "ui-master", type: "space",
        rows: [
            view_objects.toolbar,
            {
                type: "wide",
                cols: [
                    {
                        id: "ui-resizer", type: "wide",
                        width: 250, minWidth: 250, maxWidth: 450,
                        rows: [
                            view_objects.tree,
                            {view: "resizer"},
                            {
                                id: "ui-resizer", minHeight: 175,
                                rows: [
                                    view_objects.property_form,
                                    view_objects.property_datablock,
                                    view_objects.property_item,
                                ],
                            },
                        ],
                    },
                    {view: "resizer"},
                    {
                        type: "wide",
                        rows: [
                            {view: "scrollview", scroll: "y", body: view_objects.content},
                        ],
                    },
                ],
            }
        ],
    });
    webix.ui(view_objects.context_form);
    webix.ui(view_objects.context_datablock);
    webix.ui(view_objects.context_item);

    /*==============================================================================================================
     ======================================== View Selector
     =============================================================================================================*/

    const ui_master = $$("ui-master");
    const [ui_resizer_1, ui_resizer_2] = ui_master.queryView({id: "ui-resizer"}, "all");
    const ui_toolbar = $$("ui-toolbar");
    const ui_toolbar_dashboard = ui_toolbar.queryView({name: "dashboard"});
    const ui_toolbar_save = ui_toolbar.queryView({name: "save"});
    const ui_toolbar_new = ui_toolbar.queryView({name: "new"});
    const ui_toolbar_open = ui_toolbar.queryView({name: "open"});
    const ui_toolbar_source_code = ui_toolbar.queryView({name: "source-code"});
    const ui_tree = $$("ui-tree");
    const ui_context_form = $$("ui-context-form");
    const ui_context_datablock = $$("ui-context-datablock");
    const ui_context_item = $$("ui-context-item");
    const ui_property_form = $$("ui-property-form");
    const ui_property_datablock = $$("ui-property-datablock");
    const ui_property_item = $$("ui-property-item");
    const ui_content = $$("ui-content");

    /*==============================================================================================================
     ======================================== View Binding
     =============================================================================================================*/

    webix.extend(ui_master, webix.ProgressBar);
    ui_context_form.attachTo(ui_tree);
    ui_context_datablock.attachTo(ui_tree);
    ui_context_item.attachTo(ui_tree);

    /*==============================================================================================================
     ======================================== Toolbar Event
     =============================================================================================================*/

    ui_toolbar_dashboard.attachEvent("onItemClick", function () {
    });
    ui_toolbar_save.attachEvent("onItemClick", function () {
    });
    ui_toolbar_new.attachEvent("onItemClick", function () {
    });
    ui_toolbar_open.attachEvent("onItemClick", function () {
    });
    ui_toolbar_source_code.attachEvent("onItemClick", function () {

        ui_master.disable();
        ui_master.showProgress();

        webix.require({
            "/static/webix/components/monaco/monaco.js": true,
        }).then(function () {

            const ui_window = webix.ui({
                view: "window", position: "center",
                minWidth: 600, minHeight: 400,
                head: {
                    view: "toolbar",
                    cols: [
                        {width: 5},
                        {view: "label", label: "Source Code"},
                        {name: "close", view: "icon", icon: "mdi mdi-close", tooltip: "Close"},
                    ],
                },
                body: {view: "monaco-editor", language: "json", readOnly: true},
            });
            const ui_window_close = ui_window.queryView({name: "close"});
            const ui_window_editor = ui_window.queryView({view: "monaco-editor"});

            ui_window.attachEvent("onShow", function () {
                ui_master.hideProgress();
            });
            ui_window.attachEvent("onHide", function () {
                ui_master.enable();
                ui_master.hideProgress();
                ui_window.destructor();
            });
            ui_window_close.attachEvent("onItemClick", function () {
                ui_window.hide();
            });
            ui_window_editor.attachEvent("onAfterLoad", function () {
                let source_code = view_utilities.generate_source_code();
                ui_window.show();
                ui_window_editor.setValue(source_code);
            });

        });

    });

    /*==============================================================================================================
     ======================================== Tree Event
     =============================================================================================================*/

    ui_tree.attachEvent("onBeforeContextMenu", function (id) {
        let component = ui_tree.getItem(id);
        ui_tree.select(component.id);
    });
    ui_tree.attachEvent("onBeforeSelect", function () {
        ui_property_form.editStop();
        ui_property_datablock.editStop();
        ui_property_item.editStop();
        ui_property_form.hide();
        ui_property_datablock.hide();
        ui_property_item.hide();
        ui_property_form.clear();
        ui_property_datablock.clear();
        ui_property_item.clear();
    });
    ui_tree.attachEvent("onAfterSelect", function (id) {
        let component = ui_tree.getItem(id);
        switch (component.$$kind) {
            case "form":
                ui_property_form.setValues(component);
                ui_property_form.show();
                break;
            case "datablock":
                ui_property_datablock.setValues(component);
                ui_property_datablock.show();
                break;
            case "item":
                ui_property_item.setValues(component);
                ui_property_item.show();
                break;
        }
        ui_tree.showItem(component.id);
    });

    /*==============================================================================================================
     ======================================== Context Menu Event
     =============================================================================================================*/

    ui_context_form.attachEvent("onBeforeShow", function () {
        let component = ui_tree.getSelectedItem();
        return component.$$kind === "form";
    });
    ui_context_datablock.attachEvent("onBeforeShow", function () {
        let component = ui_tree.getSelectedItem();
        return component.$$kind === "datablock";
    });
    ui_context_item.attachEvent("onBeforeShow", function () {
        let component = ui_tree.getSelectedItem();
        return component.$$kind === "item";
    });
    ui_context_form.attachEvent("onMenuItemClick", function (id) {
        let component = ui_tree.getSelectedItem();
        switch (id) {
            case "insert-datablock":
                let new_component = {$$kind: "datablock"};
                let new_component_id = ui_tree.add(new_component, -1, component.id);
                ui_tree.open(component.id);
                ui_tree.select(new_component_id);
                break;
            case "triggers":
                break;
        }
    });
    ui_context_datablock.attachEvent("onMenuItemClick", function (id) {
        let component = ui_tree.getSelectedItem();
        switch (id) {
            case "insert-item":
                let new_component = {$$kind: "item"};
                let new_component_id = ui_tree.add(new_component, -1, component.id);
                ui_tree.open(component.id);
                ui_tree.select(new_component_id);
                break;
            case "delete":
                webix.confirm({
                    title: "Warning!",
                    type: "confirm-warning",
                    text: "You are about to delete this Data Block. Are you sure?",
                    ok: "Delete",
                }).then(function () {
                    ui_tree.remove(component.id);
                    ui_property_form.hide();
                    ui_property_datablock.hide();
                    ui_property_item.hide();
                    ui_tree.select(component.$parent);
                });
                break;
            case "triggers":
                break;
        }
    });
    ui_context_item.attachEvent("onMenuItemClick", function (id) {
        let component = ui_tree.getSelectedItem();
        switch (id) {
            case "delete":
                webix.confirm({
                    title: "Warning!",
                    type: "confirm-warning",
                    text: "You are about to delete this Item. Are you sure?",
                    ok: "Delete",
                }).then(function () {
                    ui_tree.remove(component.id);
                    ui_property_form.hide();
                    ui_property_datablock.hide();
                    ui_property_item.hide();
                    ui_tree.select(component.$parent);
                });
                break;
            case "triggers":
                break;
        }
    });

    /*==============================================================================================================
     ======================================== Property Event
     =============================================================================================================*/

    ui_property_form.attachEvent("onAfterEditStop", function () {
        let values = ui_property_form.getValues();
        ui_tree.updateItem(values.id, values);
    });
    ui_property_datablock.attachEvent("onAfterEditStop", function () {
        let values = ui_property_datablock.getValues();
        ui_tree.updateItem(values.id, values);
    });
    ui_property_item.attachEvent("onAfterEditStop", function () {
        let values = ui_property_item.getValues();
        ui_tree.updateItem(values.id, values);
    });

    /*==============================================================================================================
     ======================================== State Constructor
     =============================================================================================================*/

    const state_resizer = webix.storage.local.get("state_resizer");
    if (state_resizer !== null) {
        ui_tree.define("height", state_resizer.height);
        ui_resizer_1.define("width", state_resizer.width);
        ui_tree.resize();
        ui_resizer_1.resize();
    }
    ui_resizer_1.attachEvent("onViewResize", function () {
        webix.storage.local.put("state_resizer", {
            width: ui_resizer_1.$width,
            height: ui_tree.$height,
        });
    });
    ui_resizer_2.attachEvent("onViewResize", function () {
        webix.storage.local.put("state_resizer", {
            width: ui_resizer_1.$width,
            height: ui_tree.$height,
        });
    });

    /*==============================================================================================================
     ======================================== View Constructor TODO: hard code
     =============================================================================================================*/

    let item_id = ui_tree.add({$$kind: "form"});
    ui_tree.open(item_id);
    ui_tree.select(item_id);

    ui_content.addView({
        minHeight: 500,
        rows: [
            {view: "template", type: "header", template: "Master"},
            {view: "scrollview", scroll: "auto", body: {}},
        ],
    });
    ui_content.addView({
        minHeight: 500,
        rows: [
            {view: "template", type: "header", template: "Detail"},
            {view: "scrollview", scroll: "auto", body: {}},
        ],
    });

};

window.$tb = {show: show};