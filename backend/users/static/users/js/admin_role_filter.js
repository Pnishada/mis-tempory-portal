document.addEventListener('DOMContentLoaded', function () {
    const systemSelect = document.querySelector('#id_system_type');
    const roleSelect = document.querySelector('#id_role');

    if (!systemSelect || !roleSelect) return;

    // Define which roles belong to which system
    const rolesBySystem = {
        'CBT': ['admin', 'district_manager', 'training_officer', 'data_entry', 'instructor'],
        'NTT': ['ntt_admin', 'ntt_data_entry']
    };

    function updateRoleOptions() {
        const selectedSystem = systemSelect.value;
        const allowedRoles = rolesBySystem[selectedSystem] || [];

        // Show/Hide options
        Array.from(roleSelect.options).forEach(option => {
            if (option.value === '') return; // Skip placeholder

            if (allowedRoles.includes(option.value)) {
                option.style.display = 'block';
                option.disabled = false;
            } else {
                option.style.display = 'none';
                option.disabled = true;

                // If the currently selected option is now disabled, unselect it
                if (roleSelect.value === option.value) {
                    roleSelect.value = '';
                }
            }
        });

        // Improve UI for systems where `style.display='none'` might not work (e.g. some browsers/OS)
        // by removing them from DOM temporarily or just rely on 'disabled' + hidden
    }

    // Initial update
    updateRoleOptions();

    // Listen for changes
    systemSelect.addEventListener('change', updateRoleOptions);
});
