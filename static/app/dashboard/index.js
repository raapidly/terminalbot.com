window.$tb = {};

window.$tb["show"] = function () {

    /*==============================================================================================================
     ======================================== Validators
     =============================================================================================================*/

    const validator = {
        validate_properties: function (properties, validators) {
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

    const ui_functions = {
        tree: {
            folder: function (component) {
                let icon_class = "webix_icon mdi ";
                switch (component.$$kind) {
                    case "form":
                        icon_class += "mdi-application-outline";
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
                        if (validator.validate_properties(component, validator_property.form))
                            return `${icon_common_1} ${icon_common_2} ${component.$$name}`;
                        return `${icon_common_1} ${icon_common_2_error} ${component.$$name}`;
                    case "datablock":
                        if (validator.validate_properties(component, validator_property.datablock))
                            return `${icon_common_1} ${icon_common_2} ${component.$$name}`;
                        return `${icon_common_1} ${icon_common_2_error} ${component.$$name}`;
                    case "item":
                        if (validator.validate_properties(component, validator_property.item))
                            return `${icon_common_1} ${icon_common_2} ${component.$$name}`;
                        return `${icon_common_1} ${icon_common_2_error} ${component.$$name}`;
                }
            },
        },
    };
    const ui_objects = {
        tree: {
            id: "ui-tree", view: "tree", select: true, minHeight: 175, data: [],
            type: {folder: ui_functions.tree.folder},
            template: ui_functions.tree.template,
        },
    };

    /*==============================================================================================================
     ======================================== View Factory
     =============================================================================================================*/

    webix.ui({
        type: "space",
        cols: [
            {
                type: "wide", width: 250, minWidth: 250, maxWidth: 450,
                rows: [
                    ui_objects.tree,
                    {view: "resizer"},
                    {
                        minHeight: 175,
                        rows: [
                            {
                                id: "property-form", view: "property", hidden: true,
                                elements: [
                                    {type: "label", label: "General"},
                                    {label: "#", id: "id"},
                                    {type: "text", label: "name", id: "$$name"},
                                ],
                            },
                            {
                                id: "property-datablock", view: "property", hidden: true,
                                elements: [
                                    {type: "label", label: "General"},
                                    {label: "#", id: "id"},
                                    {type: "text", label: "name", id: "$$name"},
                                    {
                                        type: "combo", label: "type", id: "$$type", options: [
                                            {id: "form", value: "Form"},
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "property-item", view: "property", hidden: true,
                                elements: [
                                    {type: "label", label: "General"},
                                    {label: "#", id: "id"},
                                    {type: "text", label: "name", id: "$$name"},
                                    {type: "text", label: "label", id: "$$label"},
                                    {
                                        type: "combo", label: "type", id: "$$type", options: [
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
                        ],
                    },
                ],
            },
            {view: "resizer"},
            {
                type: "wide",
                rows: [
                    {
                        view: "scrollview", scroll: "y",
                        body: {
                            id: "content", type: "space", rows: [],
                        },
                    },
                ],
            },
        ],
    });

    /*==============================================================================================================
     ======================================== View Selector
     =============================================================================================================*/

    const tree = $$("ui-tree");
    const content = $$("content");
    const property_form = $$("property-form");
    const property_datablock = $$("property-datablock");
    const property_item = $$("property-item");
    const context_menu_form = webix.ui({
        view: "contextmenu", width: 200,
        data: [
            {
                id: "insert", value: "Insert", data: [
                    {id: "insert-datablock", value: "Data Block"},
                ],
            },
            {$template: "Separator"},
            {id: "triggers", value: "Triggers"},
        ],
    });
    const context_menu_datablock = webix.ui({
        view: "contextmenu", width: 200,
        data: [
            {
                id: "insert", value: "Insert", data: [
                    {id: "insert-item", value: "Item"},
                ],
            },
            {id: "delete", value: "Delete"},
            {$template: "Separator"},
            {id: "triggers", value: "Triggers"},
        ],
    });
    const context_menu_item = webix.ui({
        view: "contextmenu", width: 200,
        data: [
            {id: "delete", value: "Delete"},
            {$template: "Separator"},
            {id: "triggers", value: "Triggers"},
        ],
    });

    /*==============================================================================================================
     ======================================== View Binding
     =============================================================================================================*/

    context_menu_form.attachTo(tree);
    context_menu_datablock.attachTo(tree);
    context_menu_item.attachTo(tree);

    /*==============================================================================================================
     ======================================== Tree Event
     =============================================================================================================*/

    tree.attachEvent("onBeforeContextMenu", function (id) {
        let item = tree.getItem(id);
        tree.select(item.id);
    });

    tree.attachEvent("onBeforeSelect", function () {
        property_form.editStop();
        property_datablock.editStop();
        property_item.editStop();
        property_form.hide();
        property_datablock.hide();
        property_item.hide();
        property_form.clear();
        property_datablock.clear();
        property_item.clear();
    });

    tree.attachEvent("onAfterSelect", function (id) {
        let item = tree.getItem(id);
        switch (item.$$kind) {
            case "form":
                property_form.setValues(item);
                property_form.show();
                break;
            case "datablock":
                property_datablock.setValues(item);
                property_datablock.show();
                break;
            case "item":
                property_item.setValues(item);
                property_item.show();
                break;
        }
        tree.showItem(item.id);
    });

    /*==============================================================================================================
     ======================================== Context Menu Event
     =============================================================================================================*/

    context_menu_form.attachEvent("onBeforeShow", function () {
        let item = tree.getSelectedItem();
        return item.$$kind === "form";
    });

    context_menu_datablock.attachEvent("onBeforeShow", function () {
        let item = tree.getSelectedItem();
        return item.$$kind === "datablock";
    });

    context_menu_item.attachEvent("onBeforeShow", function () {
        let item = tree.getSelectedItem();
        return item.$$kind === "item";
    });

    context_menu_form.attachEvent("onMenuItemClick", function (id) {
        let item = tree.getSelectedItem();
        switch (id) {
            case "insert-datablock":
                let new_item = {$$kind: "datablock"};
                let new_item_id = tree.add(new_item, -1, item.id);
                tree.open(item.id);
                tree.select(new_item_id);
                break;
            case "triggers":
                webix.message(`"${item.value}" triggers`);
                break;
        }
    });

    context_menu_datablock.attachEvent("onMenuItemClick", function (id) {
        let item = tree.getSelectedItem();
        switch (id) {
            case "insert-item":
                let new_item = {$$kind: "item"};
                let new_item_id = tree.add(new_item, -1, item.id);
                tree.open(item.id);
                tree.select(new_item_id);
                break;
            case "delete":
                webix.confirm({
                    title: "Warning!",
                    type: "confirm-warning",
                    text: "You are about to delete this Data Block. Are you sure?",
                    ok: "Delete",
                }).then(function () {
                    tree.remove(item.id);
                    property_form.hide();
                    property_datablock.hide();
                    property_item.hide();
                    tree.select(item.$parent);
                });
                break;
            case "triggers":
                webix.message(`"${item.value}" triggers`);
                break;
        }
    });

    context_menu_item.attachEvent("onMenuItemClick", function (id) {
        let item = tree.getSelectedItem();
        switch (id) {
            case "delete":
                webix.confirm({
                    title: "Warning!",
                    type: "confirm-warning",
                    text: "You are about to delete this Item. Are you sure?",
                    ok: "Delete",
                }).then(function () {
                    tree.remove(item.id);
                    property_form.hide();
                    property_datablock.hide();
                    property_item.hide();
                    tree.select(item.$parent);
                });
                break;
            case "triggers":
                webix.message(`"${item.value}" triggers`);
                break;
        }
    });

    /*==============================================================================================================
     ======================================== Property Event
     =============================================================================================================*/

    property_form.attachEvent("onAfterEditStop", function () {
        let form_values = property_form.getValues();
        tree.updateItem(form_values.id, form_values);
    });

    property_datablock.attachEvent("onAfterEditStop", function () {
        let form_values = property_datablock.getValues();
        tree.updateItem(form_values.id, form_values);
    });

    property_item.attachEvent("onAfterEditStop", function () {
        let form_values = property_item.getValues();
        tree.updateItem(form_values.id, form_values);
    });

    /*==============================================================================================================
     ======================================== View Constructor TODO: hard code
     =============================================================================================================*/

    let item_id = tree.add({$$kind: "form"});
    content.addView({
        minHeight: 500,
        rows: [
            {view: "template", type: "header", template: "Master"},
            {view: "scrollview", scroll: "auto", body: {}},
        ],
    });
    content.addView({
        minHeight: 500,
        rows: [
            {view: "template", type: "header", template: "Detail"},
            {view: "scrollview", scroll: "auto", body: {}},
        ],
    });

    tree.open(item_id);
    tree.select(item_id);

};