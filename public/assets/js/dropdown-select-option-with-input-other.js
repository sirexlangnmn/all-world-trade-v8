  // Sample data for sub category and minor sub category selectpickers
  const subCategories = ['Category A', 'Category B', 'Category C'];
  const minorSubCategories = {
    'Category A': ['Minor A1', 'Minor A2', 'Minor A3'],
    'Category B': ['Minor B1', 'Minor B2', 'Minor B3'],
    'Category C': ['Minor C1', 'Minor C2', 'Minor C3']
  };

  // Populate sub category selectpicker with sample data
  const subCategorySelect = $('#sub-category');
  subCategorySelect.append('<option value="">Select Sub Category</option>');
  const subCategorySet = new Set();
  subCategories.forEach(category => {
    if (!subCategorySet.has(category)) {
      subCategorySet.add(category);
      subCategorySelect.append(`<option value="${category}">${category}</option>`);
    }
  });
  subCategorySelect.selectpicker('refresh');

  // Handle sub category selectpicker change event
  subCategorySelect.on('change', function() {
    const selectedCategory = $(this).val();
    if (selectedCategory === 'Other') {
      // Hide selectpickers and show input fields
      $('#minor-sub-category').hide();
      $(this).hide();
      $('#input-fields').show();
    } else {
      // Populate minor sub category selectpicker with options for selected sub category
      const minorSubCategorySelect = $('#minor-sub-category');
      minorSubCategorySelect.empty();
      minorSubCategorySelect.append('<option value="">Select Minor Sub Category</option>');
      minorSubCategories[selectedCategory].forEach(minorCategory => {
        minorSubCategorySelect.append(`<option value="${minorCategory}">${minorCategory}</option>`);
      });
      minorSubCategorySelect.selectpicker('refresh');
      $('#minor-sub-category').show();
      $('#input-fields').hide();
    }
  });