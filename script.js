document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('login-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const loginForm = document.getElementById('login-form');
    const userProfileToggle = document.getElementById('user-profile-toggle');
    const userDropdown = document.getElementById('user-dropdown');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const currentDateElement = document.getElementById('current-date');
    const addRecordButtons = document.querySelectorAll('.add-item-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal .close-btn');

    // --- DOM Elements for New Features ---
    const registerLink = document.getElementById('register-link');
    const registerModal = document.getElementById('register-modal');
    const registerForm = document.getElementById('register-form');

    // --- User Management (Simulated with localStorage) ---
    let users = JSON.parse(localStorage.getItem('users')) || [{ username: 'admin', password: 'admin' }];

    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }
    saveUsers();

    // --- Table Data Initialization (Dummy Data) ---
    let tableData = {
        'penelusuran-aset': [
            { id: 1, tanggal: '2025-06-15', jenisAset: 'Tanah & Bangunan', nilai: '1.500.000.000', namaPerkara: 'Kasus Korupsi X', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
            { id: 2, tanggal: '2025-06-20', jenisAset: 'Kendaraan', nilai: '350.000.000', namaPerkara: 'Kasus Pencucian Uang Y', fileUrl: 'https://www.africau.edu/images/default/sample.pdf' },
            { id: 3, tanggal: '2025-07-01', jenisAset: 'Rekening Bank', nilai: '500.000.000', namaPerkara: 'Kasus Penipuan Z', fileUrl: 'https://www.kejaksaan.go.id/images/logo/logo_v2.png' },
            { id: 4, tanggal: '2025-05-10', jenisAset: 'Tanah & Bangunan', nilai: '2.000.000.000', namaPerkara: 'Kasus Narkoba A', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
            { id: 5, tanggal: '2025-07-05', jenisAset: 'Kendaraan', nilai: '400.000.000', namaPerkara: 'Kasus Penipuan B', fileUrl: 'https://www.africau.edu/images/default/sample.pdf' }
        ],
        'perampasan-aset': [
            { id: 1, tanggal: '2025-05-10', noPutusan: '253 K/Pid.SUS/2012 (2014-03-01)', uraian: 'Rumah Mewah Pondok Indah', nilaiWajar: '8.000.000.000', nilaiTerjual: '7.500.000.000', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
            { id: 2, tanggal: '2025-06-05', noPutusan: '120/Pid.B/2018 (2019-10-20)', uraian: 'Mobil Sport Klasik', nilaiWajar: '1.200.000.000', nilaiTerjual: '1.150.000.000', fileUrl: 'https://www.africau.edu/images/default/sample.pdf' },
            { id: 3, tanggal: '2025-07-02', noPutusan: '300/Pid.T/2021 (2022-01-01)', uraian: 'Apartemen Pusat Kota', nilaiWajar: '4.500.000.000', nilaiTerjual: '4.200.000.000', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
        ],
        'penyelesaian-aset': [
            { id: 1, tanggal: '2025-04-22', noPutusan: '10/Pid.B/2020 (2021-01-15)', uraian: 'Apartemen di Jakarta Pusat', nilaiWajar: '3.000.000.000', nilaiTerjual: '2.900.000.000', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
            { id: 2, tanggal: '2025-05-01', noPutusan: '05/Pid.Sus/2022 (2023-03-10)', uraian: 'Koleksi Jam Tangan Mewah', nilaiWajar: '700.000.000', nilaiTerjual: '680.000.000', fileUrl: 'https://www.africau.edu/images/default/sample.pdf' },
            { id: 3, tanggal: '2025-06-10', noPutusan: '15/Pid.P/2023 (2024-02-20)', uraian: 'Tanah di Pinggir Kota', nilaiWajar: '1.000.000.000', nilaiTerjual: '950.000.000', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
        ],
        'surat-masuk-keluar': [
            { id: 1, nomorSurat: 'SM/001/VII/2025', perihal: 'Permohonan Informasi Aset', asalTujuan: 'KPK', kategori: 'Surat Masuk', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tanggal: '2025-07-01' },
            { id: 2, nomorSurat: 'SK/005/VI/2025', perihal: 'Pemberitahuan Hasil Lelang', asalTujuan: 'PUPR', kategori: 'Surat Keluar', fileUrl: 'https://www.africau.edu/images/default/sample.pdf', tanggal: '2025-06-10' },
            { id: 3, nomorSurat: 'SM/002/VII/2025', perihal: 'Laporan Penelusuran Aset', asalTujuan: 'Kepolisian RI', kategori: 'Surat Masuk', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tanggal: '2025-07-05' },
            { id: 4, nomorSurat: 'SK/001/V/2025', perihal: 'Permintaan Data', asalTujuan: 'Kementerian Keuangan', kategori: 'Surat Keluar', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tanggal: '2025-05-15' }
        ]
    };

    // Function to render data to the table
    function renderTable(sectionId, data) {
        const tableBody = document.getElementById(sectionId).querySelector('tbody');
        tableBody.innerHTML = ''; // Clear table before re-rendering

        data.forEach(item => {
            const row = tableBody.insertRow();
            if (sectionId === 'penelusuran-aset') {
                row.insertCell().textContent = item.tanggal;
                row.insertCell().textContent = item.jenisAset;
                row.insertCell().textContent = item.nilai;
                row.insertCell().textContent = item.namaPerkara;
            } else if (sectionId === 'perampasan-aset' || sectionId === 'penyelesaian-aset') {
                row.insertCell().textContent = item.tanggal;
                row.insertCell().textContent = item.noPutusan;
                row.insertCell().textContent = item.uraian;
                row.insertCell().textContent = item.nilaiWajar;
                row.insertCell().textContent = item.nilaiTerjual;
            } else if (sectionId === 'surat-masuk-keluar') {
                row.insertCell().textContent = item.nomorSurat;
                row.insertCell().textContent = item.perihal;
                row.insertCell().textContent = item.asalTujuan;
                row.insertCell().textContent = item.kategori;
            }

            // Add action buttons (Edit, Delete, and View File)
            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `
                ${item.fileUrl ? `<button class="btn-small view-file-btn" data-file-url="${item.fileUrl}"><i class="fas fa-eye"></i></button>` : ''}
                <button class="btn-small edit-btn" data-id="${item.id}" data-section="${sectionId}"><i class="fas fa-edit"></i></button>
                <button class="btn-small delete-btn" data-id="${item.id}" data-section="${sectionId}"><i class="fas fa-trash"></i></button>
            `;
            // Set data-label for mobile responsiveness
            Array.from(row.cells).forEach((cell, index) => {
                const headerText = tableBody.closest('table').querySelector('thead th:nth-child(' + (index + 1) + ')')?.textContent;
                if (headerText) {
                    cell.setAttribute('data-label', headerText);
                }
            });
        });

        attachTableActionListeners(); // Re-attach event listeners for action buttons
    }

    // Function to update all tables
    function updateAllTables() {
        for (const sectionId in tableData) {
            renderTable(sectionId, tableData[sectionId]);
        }
    }

    // Call on DOM load to populate initial tables
    updateAllTables();

    // --- Login Functionality ---
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check user against the list of users
        const userFound = users.some(user => user.username === username && user.password === password);

        if (userFound) {
            loginPage.style.display = 'none';
            dashboardPage.style.display = 'flex';
            updateCurrentDate();
            initializeCharts();
            initializeMap();
            updateSummaryCards(); // Update summary cards on login
        } else {
            alert('Nama Pengguna atau Kata Sandi salah!');
        }
    });

    // --- Register Link (Open Register Modal) ---
    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginPage.style.display = 'none'; // Hide login page
        registerModal.style.display = 'block'; // Show registration modal
        registerForm.reset(); // Reset registration form
    });

    // --- Register Form Submission ---
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const regUsername = document.getElementById('reg-username').value;
        const regPassword = document.getElementById('reg-password').value;
        const regConfirmPassword = document.getElementById('reg-confirm-password').value;

        if (regPassword !== regConfirmPassword) {
            alert('Konfirmasi kata sandi tidak cocok!');
            return;
        }

        // Check if username already exists
        if (users.some(user => user.username === regUsername)) {
            alert('Nama Pengguna sudah ada. Silakan gunakan nama lain.');
            return;
        }

        // Add new user
        users.push({ username: regUsername, password: regPassword });
        saveUsers(); // Save to localStorage

        alert('Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.');
        registerModal.style.display = 'none'; // Close registration modal
        loginPage.style.display = 'flex'; // Go back to login page
        document.getElementById('username').value = regUsername; // Pre-fill username
        document.getElementById('password').value = ''; // Clear password field
    });


    // --- User Profile Dropdown Toggle ---
    if (userProfileToggle) {
        userProfileToggle.addEventListener('click', function() {
            userDropdown.classList.toggle('show');
            userProfileToggle.classList.toggle('open');
        });
    }

    // Close dropdown if clicked outside
    window.addEventListener('click', function(event) {
        if (!userProfileToggle.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.remove('show');
            userProfileToggle.classList.remove('open');
        }
    });

    // --- Sidebar Navigation ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            contentSections.forEach(section => section.style.display = 'none');

            const targetId = this.dataset.target;
            document.getElementById(targetId).style.display = 'block';

            if (targetId === 'main-dashboard') {
                initializeMap(); // Re-initialize map to ensure it renders correctly
                initializeCharts(); // Re-initialize charts
            }
        });
    });

    // --- Logout Functionality ---
    const logoutBtns = document.querySelectorAll('#logout-btn-sidebar, #logout-btn-dropdown');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const confirmLogout = confirm('Apakah Anda yakin ingin keluar?');
            if (confirmLogout) {
                loginPage.style.display = 'flex';
                dashboardPage.style.display = 'none';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                // Hide dropdown after logout
                userDropdown.classList.remove('show');
                userProfileToggle.classList.remove('open');
                // Reset navigation to main dashboard
                navLinks.forEach(nav => nav.classList.remove('active'));
                document.querySelector('.nav-link[data-target="main-dashboard"]').classList.add('active');
                contentSections.forEach(section => section.style.display = 'none');
                document.getElementById('main-dashboard').style.display = 'block';
            }
        });
    });

    // --- Date Display on Dashboard ---
    function updateCurrentDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('id-ID', options);
    }

    // --- Update Summary Cards ---
    function updateSummaryCards() {
        const totalPenelusuran = tableData['penelusuran-aset'].length;
        const totalPenyelesaian = tableData['penyelesaian-aset'].length;
        const totalSurat = tableData['surat-masuk-keluar'].length;

        // Calculate total asset value obtained (from confiscation & settlement)
        let totalNilaiDiperoleh = 0;
        tableData['perampasan-aset'].forEach(item => {
            const nilai = parseFloat(item.nilaiTerjual.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(nilai)) totalNilaiDiperoleh += nilai;
        });
        tableData['penyelesaian-aset'].forEach(item => {
            const nilai = parseFloat(item.nilaiTerjual.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(nilai)) totalNilaiDiperoleh += nilai;
        });

        document.getElementById('total-penelusuran').textContent = `${totalPenelusuran} Aset`;
        document.getElementById('total-penyelesaian').textContent = `${totalPenyelesaian} Kasus`;
        document.getElementById('total-nilai-diperoleh').textContent = `Rp ${totalNilaiDiperoleh.toLocaleString('id-ID')}`;
        document.getElementById('total-surat').textContent = `${totalSurat} Surat`;
    }

    // --- Modal Functionality ---
    addRecordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            document.getElementById(modalId).style.display = 'block';
            document.getElementById(modalId).querySelector('form').reset();
            const submitBtn = document.getElementById(modalId).querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.textContent = 'Simpan';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            if (this.closest('.modal').id === 'register-modal') {
                loginPage.style.display = 'flex';
            }
        });
    });

    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
                if (modal.id === 'register-modal') {
                    loginPage.style.display = 'flex';
                }
            }
        });
    });

    // --- Handle Form Submissions (Add Data) ---
    modals.forEach(modal => {
        const form = modal.querySelector('form');
        const modalId = modal.id;

        if (form && modalId !== 'register-modal') {
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                const isEditMode = form.dataset.editId;
                const newRecord = isEditMode ? tableData[modalId.replace('-modal', '')].find(item => item.id == isEditMode) : {};

                const inputs = form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    const label = input.previousElementSibling?.textContent.replace(':', '').trim();
                    let value = input.value;

                    if (input.type === 'file') {
                        if (input.files.length > 0) {
                            newRecord.fileUrl = `file_upload/${input.files[0].name}`;
                        } else if (!isEditMode) {
                            newRecord.fileUrl = '';
                        }
                        return;
                    }

                    if (modalId === 'penelusuran-modal') {
                        if (label === 'Tanggal Penelusuran') newRecord.tanggal = value;
                        else if (label === 'Jenis Aset') newRecord.jenisAset = value;
                        else if (label === 'Nilai Aset (Rp)') newRecord.nilai = parseFloat(value).toLocaleString('id-ID');
                        else if (label === 'Nama Perkara') newRecord.namaPerkara = value;
                    } else if (modalId === 'perampasan-modal') {
                        if (label === 'Tanggal Perampasan') newRecord.tanggal = value;
                        else if (label === 'No. Putusan & Tgl Perkara') newRecord.noPutusan = value;
                        else if (label === 'Uraian Barang Bukti') newRecord.uraian = value;
                        else if (label === 'Nilai Wajar (Rp)') newRecord.nilaiWajar = parseFloat(value).toLocaleString('id-ID');
                        else if (label === 'Nilai Laku Terjual (Rp)') newRecord.nilaiTerjual = parseFloat(value).toLocaleString('id-ID');
                    } else if (modalId === 'penyelesaian-modal') {
                        if (label === 'Tanggal Penyelesaian') newRecord.tanggal = value;
                        else if (label === 'No. Putusan & Tgl Perkara') newRecord.noPutusan = value;
                        else if (label === 'Uraian Barang Bukti') newRecord.uraian = value;
                        else if (label === 'Nilai Wajar (Rp)') newRecord.nilaiWajar = parseFloat(value).toLocaleString('id-ID');
                        else if (label === 'Nilai Laku Terjual (Rp)') newRecord.nilaiTerjual = parseFloat(value).toLocaleString('id-ID');
                    } else if (modalId === 'surat-modal') {
                        if (label === 'Nomor Surat') newRecord.nomorSurat = value;
                        else if (label === 'Perihal Surat') newRecord.perihal = value;
                        else if (label === 'Asal Surat') newRecord.asal = value;
                        else if (label === 'Tujuan Surat') newRecord.tujuan = value;
                        else if (label === 'Kategori Surat') newRecord.kategori = value;
                        newRecord.tanggal = new Date().toISOString().slice(0, 10); // Automatically set today's date for new surat
                    }
                });

                if (modalId === 'surat-modal') {
                    newRecord.asalTujuan = `${newRecord.asal || ''}${newRecord.asal && newRecord.tujuan ? '/' : ''}${newRecord.tujuan || ''}`;
                    delete newRecord.asal;
                    delete newRecord.tujuan;
                }

                const currentTableId = modalId.replace('-modal', '');

                if (!isEditMode) {
                    newRecord.id = tableData[currentTableId].length > 0 ? Math.max(...tableData[currentTableId].map(item => item.id)) + 1 : 1;
                    tableData[currentTableId].push(newRecord);
                    alert('Data berhasil ditambahkan!');
                } else {
                    alert('Data berhasil diperbarui!');
                    delete form.dataset.editId;
                }

                renderTable(currentTableId, tableData[currentTableId]);
                updateSummaryCards();
                initializeCharts(); // Re-initialize charts to reflect new data

                form.reset();
                modal.style.display = 'none';
            });
        }
    });

    // --- Handle Edit & Delete Actions, and View File ---
    function attachTableActionListeners() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.onclick = function() {
                const id = parseInt(this.dataset.id);
                const sectionId = this.dataset.section;
                const record = tableData[sectionId].find(item => item.id === id);

                if (record) {
                    const modalId = sectionId + '-modal';
                    const form = document.getElementById(modalId).querySelector('form');

                    form.dataset.editId = id;

                    for (const key in record) {
                        const input = form.querySelector(`[name="${key}"]`);
                        if (input) {
                            input.value = record[key];
                        } else {
                            if (sectionId === 'penelusuran-aset') {
                                if (key === 'tanggal') form.querySelector('input[type="date"]').value = record[key];
                                else if (key === 'jenisAset') form.querySelector('select:nth-of-type(1)').value = record[key];
                                else if (key === 'nilai') form.querySelector('input[type="number"]').value = parseFloat(record[key].replace(/\./g, ''));
                                else if (key === 'namaPerkara') form.querySelector('select:nth-of-type(2)').value = record[key];
                            } else if (sectionId === 'perampasan-aset' || sectionId === 'penyelesaian-aset') {
                                if (key === 'tanggal') form.querySelector('input[type="date"]').value = record[key];
                                else if (key === 'noPutusan') form.querySelector('input[type="text"]').value = record[key];
                                else if (key === 'uraian') form.querySelector('textarea').value = record[key];
                                else if (key === 'nilaiWajar') form.querySelector('input[type="number"]:nth-of-type(1)').value = parseFloat(record[key].replace(/\./g, ''));
                                else if (key === 'nilaiTerjual') form.querySelector('input[type="number"]:nth-of-type(2)').value = parseFloat(record[key].replace(/\./g, ''));
                            } else if (sectionId === 'surat-masuk-keluar') {
                                if (key === 'nomorSurat') form.querySelector('input[type="text"]:nth-of-type(1)').value = record[key];
                                else if (key === 'perihal') form.querySelector('input[type="text"]:nth-of-type(2)').value = record[key];
                                if (key === 'asalTujuan') {
                                    const parts = record[key].split('/');
                                    // Try to split, if not possible, put everything in "Asal Surat"
                                    if (form.querySelector('label:nth-of-type(3)')?.textContent.includes('Asal Surat')) {
                                        form.querySelector('input[type="text"]:nth-of-type(3)').value = parts[0] || '';
                                        form.querySelector('input[type="text"]:nth-of-type(4)').value = parts[1] || '';
                                    } else {
                                        form.querySelector('input[type="text"]:nth-of-type(3)').value = record[key];
                                    }
                                }
                                else if (key === 'kategori') form.querySelector('select').value = record[key];
                            }
                        }
                    }

                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.textContent = 'Perbarui';

                    document.getElementById(modalId).style.display = 'block';
                } else {
                    alert('Data tidak ditemukan!');
                }
            };
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = function() {
                const id = parseInt(this.dataset.id);
                const sectionId = this.dataset.section;
                if (confirm(`Apakah Anda yakin ingin menghapus item ID ${id} dari ${sectionId}?`)) {
                    tableData[sectionId] = tableData[sectionId].filter(item => item.id !== id);
                    renderTable(sectionId, tableData[sectionId]);
                    updateSummaryCards();
                    initializeCharts(); // Re-initialize charts after delete
                    alert('Item berhasil dihapus!');
                }
            };
        });

        document.querySelectorAll('.view-file-btn').forEach(button => {
            button.onclick = function() {
                const fileUrl = this.dataset.fileUrl;
                if (fileUrl) {
                    window.open(fileUrl, '_blank');
                } else {
                    alert('Tidak ada berkas yang tersedia untuk item ini.');
                }
            };
        });
    }

    // --- Dashboard Charts (Chart.js) ---
    // Declare chart instances outside the function to allow destruction
    let lineChartInstance, barChartInstance, penelusuranTrendChartInstance, perampasanTrendChartInstance, penyelesaianTrendChartInstance, suratTrendChartInstance;

    function initializeCharts() {
        // Destroy existing chart instances to prevent duplicates if function is called multiple times
        if (lineChartInstance) lineChartInstance.destroy();
        if (barChartInstance) barChartInstance.destroy();
        if (penelusuranTrendChartInstance) penelusuranTrendChartInstance.destroy();
        if (perampasanTrendChartInstance) perampasanTrendChartInstance.destroy();
        if (penyelesaianTrendChartInstance) penyelesaianTrendChartInstance.destroy();
        if (suratTrendChartInstance) suratTrendChartInstance.destroy();


        // Data for "Nilai Aset per Bulan" (existing)
        const monthlyValues = {};
        tableData['penelusuran-aset'].forEach(item => {
            const month = item.tanggal.substring(0, 7);
            const value = parseFloat(item.nilai.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(value)) {
                monthlyValues[month] = (monthlyValues[month] || 0) + value;
            }
        });
        tableData['perampasan-aset'].forEach(item => {
            const month = item.tanggal.substring(0, 7);
            const value = parseFloat(item.nilaiTerjual.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(value)) {
                monthlyValues[month] = (monthlyValues[month] || 0) + value;
            }
        });
        tableData['penyelesaian-aset'].forEach(item => {
            const month = item.tanggal.substring(0, 7);
            const value = parseFloat(item.nilaiTerjual.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(value)) {
                monthlyValues[month] = (monthlyValues[month] || 0) + value;
            }
        });

        const sortedMonths = Object.keys(monthlyValues).sort();
        const lineChartLabels = sortedMonths.map(month => {
            const [year, mon] = month.split('-');
            return new Date(year, parseInt(mon) - 1).toLocaleString('id-ID', { month: 'short', year: 'numeric' });
        });
        const lineChartDataValues = sortedMonths.map(month => monthlyValues[month] / 1000000000); // In Billion Rp

        // Data for "Jumlah Aset per Jenis" (existing)
        const assetTypeCounts = {};
        tableData['penelusuran-aset'].forEach(item => {
            assetTypeCounts[item.jenisAset] = (assetTypeCounts[item.jenisAset] || 0) + 1;
        });

        const barChartLabels = Object.keys(assetTypeCounts);
        const barChartDataValues = Object.values(assetTypeCounts);

        // --- NEW: Data for Trend Charts ---

        // Helper function to get monthly counts for a given table and date key
        function getMonthlyCounts(data, dateKey) {
            const counts = {};
            data.forEach(item => {
                if (item[dateKey]) { // Ensure dateKey exists
                    const month = item[dateKey].substring(0, 7);
                    counts[month] = (counts[month] || 0) + 1;
                }
            });
            return counts;
        }

        const penelusuranCounts = getMonthlyCounts(tableData['penelusuran-aset'], 'tanggal');
        const perampasanCounts = getMonthlyCounts(tableData['perampasan-aset'], 'tanggal');
        const penyelesaianCounts = getMonthlyCounts(tableData['penyelesaian-aset'], 'tanggal');
        const suratCounts = getMonthlyCounts(tableData['surat-masuk-keluar'], 'tanggal'); // Use 'tanggal' field for surat

        // Get all unique sorted months across all data for consistent labels
        const allMonthsSet = new Set();
        Object.keys(penelusuranCounts).forEach(month => allMonthsSet.add(month));
        Object.keys(perampasanCounts).forEach(month => allMonthsSet.add(month));
        Object.keys(penyelesaianCounts).forEach(month => allMonthsSet.add(month));
        Object.keys(suratCounts).forEach(month => allMonthsSet.add(month));
        const allMonths = Array.from(allMonthsSet).sort();

        const trendLabels = allMonths.map(month => {
            const [year, mon] = month.split('-');
            return new Date(year, parseInt(mon) - 1).toLocaleString('id-ID', { month: 'short', year: 'numeric' });
        });

        const getTrendData = (countsMap, allMonths) => allMonths.map(month => countsMap[month] || 0);

        const penelusuranTrendData = getTrendData(penelusuranCounts, allMonths);
        const perampasanTrendData = getTrendData(perampasanCounts, allMonths);
        const penyelesaianTrendData = getTrendData(penyelesaianCounts, allMonths);
        const suratTrendData = getTrendData(suratCounts, allMonths);


        // --- Chart Configurations (Existing Charts) ---
        const lineChartConfig = {
            labels: lineChartLabels,
            datasets: [{
                label: 'Nilai Aset (Miliar Rp)',
                data: lineChartDataValues,
                borderColor: '#283593',
                backgroundColor: 'rgba(40, 53, 147, 0.2)',
                fill: true,
                tension: 0.3
            }]
        };

        const barChartConfig = {
            labels: barChartLabels,
            datasets: [{
                label: 'Jumlah Aset',
                data: barChartDataValues,
                backgroundColor: [
                    '#1a237e',
                    '#283593',
                    '#ffab40',
                    '#e8eaf6'
                ],
                borderColor: [
                    '#1a237e',
                    '#283593',
                    '#ffab40',
                    '#e8eaf6'
                ],
                borderWidth: 1
            }]
        };

        // --- NEW: Trend Chart Configurations ---
        const createTrendChartConfig = (label, data, color) => ({
            labels: trendLabels,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: `${color}40`,
                fill: true,
                tension: 0.3
            }]
        });

        const penelusuranTrendConfig = createTrendChartConfig('Jumlah Penelusuran', penelusuranTrendData, '#1a237e');
        const perampasanTrendConfig = createTrendChartConfig('Jumlah Perampasan', perampasanTrendData, '#283593');
        const penyelesaianTrendConfig = createTrendChartConfig('Jumlah Penyelesaian', penyelesaianTrendData, '#ffab40');
        const suratTrendConfig = createTrendChartConfig('Jumlah Surat', suratTrendData, '#e8eaf6');


        // --- Render Charts (Existing) ---
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        lineChartInstance = new Chart(lineCtx, {
            type: 'line',
            data: lineChartConfig,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Nilai (Miliar Rp)' }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': Rp ' + context.parsed.y.toLocaleString('id-ID') + ' Miliar';
                            }
                        }
                    }
                }
            }
        });

        const barCtx = document.getElementById('barChart').getContext('2d');
        barChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: barChartConfig,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Jumlah Aset' }
                    }
                }
            }
        });

        // --- NEW: Render Trend Charts ---
        const penelusuranTrendCtx = document.getElementById('penelusuranTrendChart').getContext('2d');
        penelusuranTrendChartInstance = new Chart(penelusuranTrendCtx, {
            type: 'line',
            data: penelusuranTrendConfig,
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Jumlah Item' } } } }
        });

        const perampasanTrendCtx = document.getElementById('perampasanTrendChart').getContext('2d');
        perampasanTrendChartInstance = new Chart(perampasanTrendCtx, {
            type: 'line',
            data: perampasanTrendConfig,
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Jumlah Item' } } } }
        });

        const penyelesaianTrendCtx = document.getElementById('penyelesaianTrendChart').getContext('2d');
        penyelesaianTrendChartInstance = new Chart(penyelesaianTrendCtx, {
            type: 'line',
            data: penyelesaianTrendConfig,
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Jumlah Item' } } } }
        });

        const suratTrendCtx = document.getElementById('suratTrendChart').getContext('2d');
        suratTrendChartInstance = new Chart(suratTrendCtx, {
            type: 'line',
            data: suratTrendConfig,
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Jumlah Item' } } } }
        });
    }

    // --- Leaflet Map Initialization ---
    let map;
    function initializeMap() {
        if (map) {
            map.remove();
        }
        // Set view to Jayapura, Papua, Indonesia with appropriate zoom
        map = L.map('map').setView([-2.5746, 140.6631], 10); // Centered on Jayapura

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const assetLocations = [
            { lat: -2.5746, lng: 140.6631, name: 'Aset Jayapura (Tanah)', value: 'Rp 10 M' },
            { lat: -2.5300, lng: 140.7000, name: 'Aset Sentani (Kendaraan)', value: 'Rp 500 Jt' },
            { lat: -2.6000, lng: 140.6500, name: 'Aset Abepura (Bangunan)', value: 'Rp 3 M' },
            { lat: -3.535, lng: 134.887, name: 'Aset Manokwari (Rekening)', value: 'Rp 5 M' }, // Outside Jayapura but in Papua
            { lat: -4.3315, lng: 135.4965, name: 'Aset Timika (Mesin)', value: 'Rp 12 M' }  // Outside Jayapura but in Papua
        ];

        assetLocations.forEach(asset => {
            L.marker([asset.lat, asset.lng])
                .addTo(map)
                .bindPopup(`<b>${asset.name}</b><br>Nilai: ${asset.value}`);
        });

        setTimeout(() => {
            if (map) map.invalidateSize();
        }, 100);
    }

    // --- Table Search and Filter Functionality ---
    document.querySelectorAll('.search-bar').forEach(searchBar => {
        searchBar.addEventListener('keyup', function() {
            const query = this.value.toLowerCase();
            const sectionId = this.closest('.content-section').id;
            const filteredData = tableData[sectionId].filter(item => {
                return Object.values(item).some(val =>
                    String(val).toLowerCase().includes(query)
                );
            });
            renderTable(sectionId, filteredData);
        });
    });

    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            const filterValue = this.value.toLowerCase();
            const sectionId = this.closest('.content-section').id;
            const originalData = tableData[sectionId];
            let filteredData = originalData;

            if (filterValue !== '') {
                filteredData = originalData.filter(item => {
                    if (sectionId === 'penelusuran-aset' && item.jenisAset) {
                        return item.jenisAset.toLowerCase().includes(filterValue);
                    } else if (sectionId === 'perampasan-aset' && item.status) {
                        return item.status.toLowerCase().includes(filterValue);
                    } else if (sectionId === 'penyelesaian-aset' && item.hasil) {
                        return item.hasil.toLowerCase().includes(filterValue);
                    } else if (sectionId === 'surat-masuk-keluar' && item.kategori) {
                        return item.kategori.toLowerCase().includes(filterValue);
                    }
                    return false;
                });
            }
            renderTable(sectionId, filteredData);
        });
    });

    // --- Excel Download Functionality ---
    document.querySelectorAll('.btn:has(.fa-download)').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.closest('.content-section').id;
            const dataToDownload = tableData[sectionId];
            if (dataToDownload.length === 0) {
                alert('Tidak ada data untuk diunduh!');
                return;
            }

            const cleanData = dataToDownload.map(item => {
                const { fileUrl, id, asal, tujuan, ...rest } = item;
                if (sectionId === 'surat-masuk-keluar') {
                    // For surat, explicitly map combined asalTujuan for export
                    return { ...rest, 'Asal/Tujuan': item.asalTujuan };
                }
                return rest;
            });

            const ws = XLSX.utils.json_to_sheet(cleanData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Data Aset");
            XLSX.writeFile(wb, `${sectionId}_${new Date().toISOString().slice(0,10)}.xlsx`);
            alert('Data berhasil diunduh!');
        });
    });

    // --- Excel Upload Functionality ---
    document.querySelectorAll('.btn:has(.fa-upload)').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.closest('.content-section').id;
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.xlsx, .xls';

            fileInput.onchange = e => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function(e) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (json.length === 0) {
                        alert('File Excel kosong atau tidak valid.');
                        return;
                    }

                    const headers = json[0];
                    const importedRows = json.slice(1).map(row => {
                        const newRow = {};
                        headers.forEach((header, index) => {
                            let key = '';
                            const cleanHeader = header.trim();
                            if (sectionId === 'penelusuran-aset') {
                                if (cleanHeader.includes('Tanggal Penelusuran')) key = 'tanggal';
                                else if (cleanHeader.includes('Jenis Aset')) key = 'jenisAset';
                                else if (cleanHeader.includes('Nilai Aset')) key = 'nilai';
                                else if (cleanHeader.includes('Nama Perkara')) key = 'namaPerkara';
                            } else if (sectionId === 'perampasan-aset' || sectionId === 'penyelesaian-aset') {
                                if (cleanHeader.includes('Tanggal')) key = 'tanggal';
                                else if (cleanHeader.includes('No. Putusan & Tgl Perkara')) key = 'noPutusan';
                                else if (cleanHeader.includes('Uraian Barang Bukti')) key = 'uraian';
                                else if (cleanHeader.includes('Nilai Wajar')) key = 'nilaiWajar';
                                else if (cleanHeader.includes('Nilai Laku Terjual')) key = 'nilaiTerjual';
                            } else if (sectionId === 'surat-masuk-keluar') {
                                if (cleanHeader.includes('Nomor Surat')) key = 'nomorSurat';
                                else if (cleanHeader.includes('Perihal Surat')) key = 'perihal';
                                else if (cleanHeader.includes('Asal/Tujuan')) {
                                    key = 'asalTujuan';
                                    // If importing combined 'Asal/Tujuan', split it for form pre-fill later
                                    const parts = String(row[index]).split('/');
                                    newRow.asal = parts[0] || '';
                                    newRow.tujuan = parts[1] || '';
                                } else if (cleanHeader.includes('Kategori')) key = 'kategori';
                                else if (cleanHeader.includes('Tanggal')) key = 'tanggal'; // Ensure tanggal is also mapped for surat
                            }
                            if (key && key !== 'asal' && key !== 'tujuan') { // Avoid duplicating asal/tujuan if already handled by asalTujuan
                                newRow[key] = row[index];
                            }
                        });
                        newRow.id = tableData[sectionId].length > 0 ? Math.max(...tableData[sectionId].map(item => item.id)) + 1 : 1;
                        if (!newRow.fileUrl) newRow.fileUrl = '';
                        return newRow;
                    });

                    tableData[sectionId] = tableData[sectionId].concat(importedRows);
                    renderTable(sectionId, tableData[sectionId]);
                    updateSummaryCards();
                    initializeCharts(); // Re-initialize charts after upload
                    alert(`${importedRows.length} data berhasil diunggah dan ditambahkan!`);
                };
                reader.readAsArrayBuffer(file);
            };
            fileInput.click();
        });
    });

    // --- Initializations on page load ---
    document.getElementById('main-dashboard').style.display = 'block';
    updateCurrentDate();
    initializeCharts();
    initializeMap();
    updateSummaryCards();
});