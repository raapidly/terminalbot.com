window.$tb = {};

window.$tb["show"] = function () {

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
        tree: {
            id: "ui-tree", view: "tree", select: true, minHeight: 175, data: [],
            type: {folder: view_functions.tree.folder},
            template: view_functions.tree.template,
        },
        content: {
            id: "ui-content", type: "space", rows: [],
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
                    view_objects.tree,
                    {view: "resizer"},
                    {
                        minHeight: 175,
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
                    {
                        view: "scrollview", scroll: "y",
                        body: view_objects.content,
                    },
                ],
            },
        ],
    });

    /*==============================================================================================================
     ======================================== View Selector
     =============================================================================================================*/

    const ui_tree = $$("ui-tree");
    const ui_content = $$("ui-content");

    const ui_property_form = $$("ui-property-form");
    const ui_property_datablock = $$("ui-property-datablock");
    const ui_property_item = $$("ui-property-item");

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

    context_menu_form.attachTo(ui_tree);
    context_menu_datablock.attachTo(ui_tree);
    context_menu_item.attachTo(ui_tree);

    /*==============================================================================================================
     ======================================== Tree Event
     =============================================================================================================*/

    ui_tree.attachEvent("onBeforeContextMenu", function (id) {
        let item = ui_tree.getItem(id);
        ui_tree.select(item.id);
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
        let item = ui_tree.getItem(id);
        switch (item.$$kind) {
            case "form":
                ui_property_form.setValues(item);
                ui_property_form.show();
                break;
            case "datablock":
                ui_property_datablock.setValues(item);
                ui_property_datablock.show();
                break;
            case "item":
                ui_property_item.setValues(item);
                ui_property_item.show();
                break;
        }
        ui_tree.showItem(item.id);
    });

    /*==============================================================================================================
     ======================================== Context Menu Event
     =============================================================================================================*/

    context_menu_form.attachEvent("onBeforeShow", function () {
        let item = ui_tree.getSelectedItem();
        return item.$$kind === "form";
    });

    context_menu_datablock.attachEvent("onBeforeShow", function () {
        let item = ui_tree.getSelectedItem();
        return item.$$kind === "datablock";
    });

    context_menu_item.attachEvent("onBeforeShow", function () {
        let item = ui_tree.getSelectedItem();
        return item.$$kind === "item";
    });

    context_menu_form.attachEvent("onMenuItemClick", function (id) {
        let item = ui_tree.getSelectedItem();
        switch (id) {
            case "insert-datablock":
                let new_item = {$$kind: "datablock"};
                let new_item_id = ui_tree.add(new_item, -1, item.id);
                ui_tree.open(item.id);
                ui_tree.select(new_item_id);
                break;
            case "triggers":
                webix.message(`"${item.value}" triggers`);
                break;
        }
    });

    context_menu_datablock.attachEvent("onMenuItemClick", function (id) {
        let item = ui_tree.getSelectedItem();
        switch (id) {
            case "insert-item":
                let new_item = {$$kind: "item"};
                let new_item_id = ui_tree.add(new_item, -1, item.id);
                ui_tree.open(item.id);
                ui_tree.select(new_item_id);
                break;
            case "delete":
                webix.confirm({
                    title: "Warning!",
                    type: "confirm-warning",
                    text: "You are about to delete this Data Block. Are you sure?",
                    ok: "Delete",
                }).then(function () {
                    ui_tree.remove(item.id);
                    ui_property_form.hide();
                    ui_property_datablock.hide();
                    ui_property_item.hide();
                    ui_tree.select(item.$parent);
                });
                break;
            case "triggers":
                webix.message(`"${item.value}" triggers`);
                break;
        }
    });

    context_menu_item.attachEvent("onMenuItemClick", function (id) {
        let item = ui_tree.getSelectedItem();
        switch (id) {
            case "delete":
                webix.confirm({
                    title: "Warning!",
                    type: "confirm-warning",
                    text: "You are about to delete this Item. Are you sure?",
                    ok: "Delete",
                }).then(function () {
                    ui_tree.remove(item.id);
                    ui_property_form.hide();
                    ui_property_datablock.hide();
                    ui_property_item.hide();
                    ui_tree.select(item.$parent);
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

    ui_property_form.attachEvent("onAfterEditStop", function () {
        let form_values = ui_property_form.getValues();
        ui_tree.updateItem(form_values.id, form_values);
    });

    ui_property_datablock.attachEvent("onAfterEditStop", function () {
        let form_values = ui_property_datablock.getValues();
        ui_tree.updateItem(form_values.id, form_values);
    });

    ui_property_item.attachEvent("onAfterEditStop", function () {
        let form_values = ui_property_item.getValues();
        ui_tree.updateItem(form_values.id, form_values);
    });

    /*==============================================================================================================
     ======================================== View Constructor TODO: hard code
     =============================================================================================================*/

    let item_id = ui_tree.add({$$kind: "form"});
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

    ui_tree.open(item_id);
    ui_tree.select(item_id);

};