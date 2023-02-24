let subCategorySelectpicker = getId('sub-category-select');
let subCategoryManual = getId('sub-category-manual');
let minorSubCategoryManual = getId('minor-sub-category-manual');
let minorSubCategorySelectpicker = getId('minor-sub-category-select');

let globalSubCategoryOptions = [];
let globalOldSubCategorySelected = '';

function getSubCategoriesToBeEditByTradeCategoryId(value) {
    async function getSubCategoriesByTradeCategoryId() {
        let tradeCategoryId = value[0].business_major_category;
        let response = await fetch(host + '/api/get/sub-categories-by-trade-category-id/' + tradeCategoryId);
        let data = await response.json();
        globalSubCategoryOptions = data;
        return data;
    }

    getSubCategoriesByTradeCategoryId().then((data) => {
        let subCategoryId = value[0].business_sub_category;
        let subCategoryString = value[0].business_sub_category_str;

        globalOldSubCategorySelected = value[0].business_sub_category;

        // Clear existing options from dropdown
        $(subCategorySelectpicker).empty();

        // Loop through subcategories and add them as options to the dropdown
        for (var i = 0; i < data.length; i++) {
            let option = document.createElement('option');
            option.value = data[i]['id'];
            option.text = data[i]['title'];
            subCategorySelectpicker.appendChild(option);

            // Set the selected attribute of the option that matches the old data
            if (subCategoryId && data[i]['id'] == subCategoryId) {
                option.selected = true;
            }
        }

        // Add "Other" option to the dropdown
        let otherOption = document.createElement('option');
        otherOption.value = 'other';
        otherOption.text = 'Other';
        subCategorySelectpicker.appendChild(otherOption);

        // Refresh the Bootstrap selectpicker
        $(subCategorySelectpicker).selectpicker('refresh');

        // Check if the subcategory string is present and display the corresponding input field
        if (subCategoryString) {
            subCategorySelectpicker.style.display = 'none';
            $(subCategorySelectpicker).selectpicker('hide');
			$(minorSubCategorySelectpicker).selectpicker('hide');
            subCategoryManual.style.display = 'block';
            subCategoryManual.value = subCategoryString;
        }
    });
}

subCategorySelectpicker.addEventListener('change', function () {
    if (subCategorySelectpicker.value === 'other') {
        $(subCategorySelectpicker).selectpicker('hide');
		$(minorSubCategorySelectpicker).selectpicker('hide');
        subCategoryManual.style.display = 'block';
        minorSubCategoryManual.style.display = 'block';
        subCategoryManual.disabled = false;
        minorSubCategoryManual.style.disabled = false;
    } else {
        $(subCategorySelectpicker).selectpicker('show');
		$(minorSubCategorySelectpicker).selectpicker('show');
        subCategorySelectpicker.style.display = 'block';
        subCategoryManual.style.display = 'none';
        minorSubCategoryManual.style.display = 'none';
        subCategoryManual.disabled = true;
        minorSubCategoryManual.style.disabled = true;
        subCategoryManual.value = '';
        minorSubCategoryManual.value = '';
    }
});

subCategoryManual.onblur = function () {
    if (subCategoryManual.value === '') {
        $(subCategorySelectpicker).selectpicker('show');
		$(minorSubCategorySelectpicker).selectpicker('show');
        subCategoryManual.style.display = 'none';
        minorSubCategoryManual.style.display = 'none';
        subCategoryManual.disabled = true;
        minorSubCategoryManual.style.disabled = true;
        subCategoryManual.value = '';
        minorSubCategoryManual.value = '';
        repopulateSubCategoriesToBeEdit(globalSubCategoryOptions, globalOldSubCategorySelected);
    }
};

function repopulateSubCategoriesToBeEdit(globalSubCategoryOptions, globalOldSubCategorySelected) {
    let data = globalSubCategoryOptions;
    let subCategoryId = globalOldSubCategorySelected;

    // Clear existing options from dropdown
    $(subCategorySelectpicker).empty();

    // Loop through subcategories and add them as options to the dropdown
    for (var i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.value = data[i]['id'];
        option.text = data[i]['title'];
        subCategorySelectpicker.appendChild(option);

        // Set the selected attribute of the option that matches the old data
        if (subCategoryId && data[i]['id'] == subCategoryId) {
            option.selected = true;
        }
    }

    // Add "Other" option to the dropdown
    let otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.text = 'Other';
    subCategorySelectpicker.appendChild(otherOption);

    // Refresh the Bootstrap selectpicker
    $(subCategorySelectpicker).selectpicker('refresh');
}
