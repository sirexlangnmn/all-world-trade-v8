const subCategorySelectpicker = getId('sub-category-select');
const subCategoryManual = getId('sub-category-manual');
const minorSubCategoryManual = getId('minor-sub-category-manual');
const minorSubCategorySelectpicker = getId('minor-sub-category-select');

let globalSubCategoryOptions = [];
let globalOldSubCategorySelected = '';

async function getSubCategoriesToBeEditByTradeCategoryId(value) {
    const tradeCategoryId = value[0].business_major_category;
    const response = await fetch(`${host}/api/get/sub-categories-by-trade-category-id/${tradeCategoryId}`);
    const data = await response.json();
    globalSubCategoryOptions = data;

    const subCategoryId = value[0].business_sub_category;
    const subCategoryString = value[0].business_sub_category_str;

    globalOldSubCategorySelected = subCategoryId;

    // Clear existing options from dropdown
    $(subCategorySelectpicker).empty();

    // Loop through subcategories and add them as options to the dropdown
    data.forEach(({ id, title }) => {
        const option = document.createElement('option');
        option.value = id;
        option.text = title;
        subCategorySelectpicker.appendChild(option);

        // Set the selected attribute of the option that matches the old data
        if (subCategoryId && id == subCategoryId) {
            option.selected = true;
        }
    });

    // Add "Other" option to the dropdown
    const otherOption = document.createElement('option');
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
}

subCategorySelectpicker.addEventListener('change', function () {
    if (subCategorySelectpicker.value === 'other') {
        $(subCategorySelectpicker).selectpicker('hide');
        $(minorSubCategorySelectpicker).selectpicker('hide');
        subCategoryManual.style.display = 'block';
        minorSubCategoryManual.style.display = 'block';
        subCategoryManual.disabled = false;
        minorSubCategoryManual.disabled = false;
    } else {
        $(subCategorySelectpicker).selectpicker('show');
        $(minorSubCategorySelectpicker).selectpicker('show');
        subCategorySelectpicker.style.display = 'block';
        subCategoryManual.style.display = 'none';
        minorSubCategoryManual.style.display = 'none';
        subCategoryManual.disabled = true;
        minorSubCategoryManual.disabled = true;
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
        minorSubCategoryManual.disabled = true;
        subCategoryManual.value = '';
        minorSubCategoryManual.value = '';
        repopulateSubCategoriesToBeEdit(globalSubCategoryOptions, globalOldSubCategorySelected);
    }
};

function repopulateSubCategoriesToBeEdit(globalSubCategoryOptions, globalOldSubCategorySelected) {
    const data = globalSubCategoryOptions;
    const subCategoryId = globalOldSubCategorySelected;

    // Clear existing options from dropdown
    $(subCategorySelectpicker).empty();

    // Loop through subcategories and add them as options to the dropdown
    data.forEach(({ id, title }) => {
        const option = document.createElement('option');
        option.value = id;
        option.text = title;
        subCategorySelectpicker.appendChild(option);

        // Set the selected attribute of the option that matches the old data
        if (subCategoryId && id == subCategoryId) {
            option.selected = true;
        }
    });

    // Add "Other" option to the dropdown
    const otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.text = 'Other';
    subCategorySelectpicker.appendChild(otherOption);

    // Refresh the Bootstrap selectpicker
    $(subCategorySelectpicker).selectpicker('refresh');
}
