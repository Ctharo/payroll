<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Payroll Calculator</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .main-content {
            display: flex;
            flex-wrap: wrap;
            min-height: 600px;
        }

        .form-section {
            flex: 1;
            min-width: 500px;
            padding: 30px;
            background: #f8f9fa;
        }

        .results-section {
            flex: 1;
            min-width: 500px;
            padding: 30px;
            background: white;
        }

        .section-title {
            font-size: 1.5em;
            color: #2c3e50;
            margin-bottom: 20px;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-row {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
        }

        .form-row .form-group {
            flex: 1;
            margin-bottom: 0;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #34495e;
        }

        input, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .btn {
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            width: 100%;
            margin-top: 10px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
            margin-right: 10px;
            width: auto;
            display: inline-block;
        }

        .pay-stub {
            background: #f8f9fa;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 25px;
            margin-top: 20px;
            font-family: 'Courier New', monospace;
        }

        .pay-stub-header {
            text-align: center;
            border-bottom: 2px solid #34495e;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .pay-stub-title {
            font-size: 1.5em;
            font-weight: bold;
            color: #2c3e50;
        }

        .pay-stub-section {
            margin-bottom: 20px;
        }

        .pay-stub-section h4 {
            color: #34495e;
            margin-bottom: 10px;
            font-size: 1.1em;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 5px;
        }

        .pay-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            padding: 2px 0;
        }

        .pay-row.total {
            font-weight: bold;
            border-top: 1px solid #34495e;
            padding-top: 8px;
            margin-top: 8px;
        }

        .pay-row.net-pay {
            font-size: 1.2em;
            background: #e8f5e8;
            padding: 10px;
            border-radius: 5px;
            border: 2px solid #27ae60;
        }

        .employee-list {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .employee-item {
            background: white;
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 5px;
            border-left: 4px solid #3498db;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .employee-item:hover {
            background: #ecf0f1;
            transform: translateX(5px);
        }

        .employee-item.selected {
            border-left-color: #27ae60;
            background: #e8f5e8;
        }

        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
            background: #f39c12;
            color: white;
            font-weight: 600;
        }

        .alert.success {
            background: #27ae60;
        }

        .alert.error {
            background: #e74c3c;
        }

        @media (max-width: 768px) {
            .main-content {
                flex-direction: column;
            }
            
            .form-section, .results-section {
                min-width: auto;
            }
            
            .form-row {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💼 Simple Payroll Calculator</h1>
            <p>Calculate wages, overtime, holiday pay, and deductions with ease</p>
        </div>

        <div class="main-content">
            <div class="form-section">
                <h2 class="section-title">Employee & Payroll Setup</h2>
                
                <!-- Employee Management -->
                <div class="form-group">
                    <h3>Add New Employee</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="employeeName">Name</label>
                            <input type="text" id="employeeName" placeholder="John Smith">
                        </div>
                        <div class="form-group">
                            <label for="hourlyRate">Hourly Rate ($)</label>
                            <input type="number" id="hourlyRate" step="0.01" placeholder="25.00">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="department">Department</label>
                            <input type="text" id="department" placeholder="Engineering">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-secondary" onclick="addEmployee()">Add Employee</button>
                        </div>
                    </div>
                </div>

                <!-- Employee List -->
                <div class="employee-list">
                    <h4>Select Employee:</h4>
                    <div id="employeeList">
                        <div class="alert">No employees added yet. Add an employee above to get started.</div>
                    </div>
                </div>

                <!-- Payroll Calculation -->
                <div class="form-group">
                    <h3>Hours Worked</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="regularHours">Regular Hours</label>
                            <input type="number" id="regularHours" step="0.5" placeholder="40">
                        </div>
                        <div class="form-group">
                            <label for="overtimeHours">Overtime Hours</label>
                            <input type="number" id="overtimeHours" step="0.5" placeholder="5">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="holidayHours">Holiday Hours</label>
                            <input type="number" id="holidayHours" step="0.5" placeholder="8">
                        </div>
                        <div class="form-group">
                            <label for="premiumHours">Premium Hours</label>
                            <input type="number" id="premiumHours" step="0.5" placeholder="0">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <h3>Deduction Rates (%)</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="federalTax">Federal Tax</label>
                            <input type="number" id="federalTax" step="0.01" placeholder="22" value="22">
                        </div>
                        <div class="form-group">
                            <label for="stateTax">State Tax</label>
                            <input type="number" id="stateTax" step="0.01" placeholder="5" value="5">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="socialSecurity">Social Security</label>
                            <input type="number" id="socialSecurity" step="0.01" placeholder="6.2" value="6.2">
                        </div>
                        <div class="form-group">
                            <label for="medicare">Medicare</label>
                            <input type="number" id="medicare" step="0.01" placeholder="1.45" value="1.45">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="insurance">Insurance ($)</label>
                            <input type="number" id="insurance" step="0.01" placeholder="150" value="150">
                        </div>
                        <div class="form-group">
                            <label for="retirement">Retirement (%)</label>
                            <input type="number" id="retirement" step="0.01" placeholder="6" value="6">
                        </div>
                    </div>
                </div>

                <button class="btn" onclick="calculatePayroll()">Calculate Payroll</button>
            </div>

            <div class="results-section">
                <h2 class="section-title">Payroll Results</h2>
                <div id="results">
                    <div class="alert">
                        Select an employee and enter hours to calculate payroll.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        class PayrollCalculator {
            constructor() {
                this.employees = [];
                this.payPeriods = [];
                this.nextId = 1;
            }

            addEmployee(name, hourlyRate, department = 'General') {
                const employee = {
                    id: this.nextId++,
                    name,
                    hourlyRate,
                    department,
                    dateHired: new Date()
                };
                this.employees.push(employee);
                return employee;
            }

            getEmployee(id) {
                return this.employees.find(emp => emp.id === id);
            }

            calculateRegularPay(hoursWorked, hourlyRate, maxRegularHours = 40) {
                const regularHours = Math.min(hoursWorked, maxRegularHours);
                return regularHours * hourlyRate;
            }

            calculateOvertimePay(hoursWorked, hourlyRate, overtimeThreshold = 40, overtimeMultiplier = 1.5) {
                if (hoursWorked <= overtimeThreshold) return 0;
                const overtimeHours = hoursWorked - overtimeThreshold;
                return overtimeHours * hourlyRate * overtimeMultiplier;
            }

            calculateHolidayPay(holidayHours, hourlyRate, holidayMultiplier = 1.5) {
                return holidayHours * hourlyRate * holidayMultiplier;
            }

            calculatePremiumPay(premiumHours, hourlyRate, premiumRate = 0.5) {
                return premiumHours * hourlyRate * premiumRate;
            }

            calculateDeductions(grossPay, deductionRates = {}) {
                const {
                    federalTax = 0.22,
                    stateTax = 0.05,
                    socialSecurity = 0.062,
                    medicare = 0.0145,
                    insurance = 0,
                    retirement = 0
                } = deductionRates;

                const deductions = {
                    federalTax: grossPay * federalTax,
                    stateTax: grossPay * stateTax,
                    socialSecurity: grossPay * socialSecurity,
                    medicare: grossPay * medicare,
                    insurance: insurance,
                    retirement: grossPay * retirement
                };

                deductions.total = Object.values(deductions).reduce((sum, deduction) => sum + deduction, 0);
                return deductions;
            }

            calculatePayroll(employeeId, payPeriodData) {
                const employee = this.getEmployee(employeeId);
                if (!employee) {
                    throw new Error(`Employee with ID ${employeeId} not found`);
                }

                const {
                    regularHours = 0,
                    overtimeHours = 0,
                    holidayHours = 0,
                    premiumHours = 0,
                    deductionRates = {},
                    payPeriodStart,
                    payPeriodEnd
                } = payPeriodData;

                const regularPay = this.calculateRegularPay(regularHours, employee.hourlyRate);
                const overtimePay = this.calculateOvertimePay(regularHours + overtimeHours, employee.hourlyRate);
                const holidayPay = this.calculateHolidayPay(holidayHours, employee.hourlyRate);
                const premiumPay = this.calculatePremiumPay(premiumHours, employee.hourlyRate);

                const grossPay = regularPay + overtimePay + holidayPay + premiumPay;
                const deductions = this.calculateDeductions(grossPay, deductionRates);
                const netPay = grossPay - deductions.total;

                const payrollRecord = {
                    employeeId: employee.id,
                    employeeName: employee.name,
                    payPeriodStart: payPeriodStart || new Date(),
                    payPeriodEnd: payPeriodEnd || new Date(),
                    hours: {
                        regular: regularHours,
                        overtime: overtimeHours,
                        holiday: holidayHours,
                        premium: premiumHours,
                        total: regularHours + overtimeHours + holidayHours + premiumHours
                    },
                    pay: {
                        hourlyRate: employee.hourlyRate,
                        regular: regularPay,
                        overtime: overtimePay,
                        holiday: holidayPay,
                        premium: premiumPay,
                        gross: grossPay
                    },
                    deductions,
                    netPay,
                    calculatedAt: new Date()
                };

                this.payPeriods.push(payrollRecord);
                return payrollRecord;
            }

            formatCurrency(amount) {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(amount);
            }
        }

        // Initialize payroll calculator
        const payroll = new PayrollCalculator();
        let selectedEmployeeId = null;

        // Add some sample employees
        payroll.addEmployee('John Smith', 25.00, 'Engineering');
        payroll.addEmployee('Jane Doe', 22.50, 'Sales');
        payroll.addEmployee('Mike Johnson', 30.00, 'Management');

        function addEmployee() {
            const name = document.getElementById('employeeName').value;
            const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
            const department = document.getElementById('department').value || 'General';

            if (!name || !hourlyRate || hourlyRate <= 0) {
                showAlert('Please enter valid employee name and hourly rate.', 'error');
                return;
            }

            const employee = payroll.addEmployee(name, hourlyRate, department);
            showAlert(`Employee ${name} added successfully!`, 'success');
            
            // Clear form
            document.getElementById('employeeName').value = '';
            document.getElementById('hourlyRate').value = '';
            document.getElementById('department').value = '';
            
            updateEmployeeList();
        }

        function updateEmployeeList() {
            const employeeList = document.getElementById('employeeList');
            
            if (payroll.employees.length === 0) {
                employeeList.innerHTML = '<div class="alert">No employees added yet. Add an employee above to get started.</div>';
                return;
            }

            employeeList.innerHTML = payroll.employees.map(emp => `
                <div class="employee-item ${selectedEmployeeId === emp.id ? 'selected' : ''}" 
                     onclick="selectEmployee(${emp.id})">
                    <strong>${emp.name}</strong> - ${payroll.formatCurrency(emp.hourlyRate)}/hr - ${emp.department}
                </div>
            `).join('');
        }

        function selectEmployee(employeeId) {
            selectedEmployeeId = employeeId;
            updateEmployeeList();
        }

        function calculatePayroll() {
            if (!selectedEmployeeId) {
                showAlert('Please select an employee first.', 'error');
                return;
            }

            const regularHours = parseFloat(document.getElementById('regularHours').value) || 0;
            const overtimeHours = parseFloat(document.getElementById('overtimeHours').value) || 0;
            const holidayHours = parseFloat(document.getElementById('holidayHours').value) || 0;
            const premiumHours = parseFloat(document.getElementById('premiumHours').value) || 0;

            const deductionRates = {
                federalTax: (parseFloat(document.getElementById('federalTax').value) || 0) / 100,
                stateTax: (parseFloat(document.getElementById('stateTax').value) || 0) / 100,
                socialSecurity: (parseFloat(document.getElementById('socialSecurity').value) || 0) / 100,
                medicare: (parseFloat(document.getElementById('medicare').value) || 0) / 100,
                insurance: parseFloat(document.getElementById('insurance').value) || 0,
                retirement: (parseFloat(document.getElementById('retirement').value) || 0) / 100
            };

            try {
                const payrollRecord = payroll.calculatePayroll(selectedEmployeeId, {
                    regularHours,
                    overtimeHours,
                    holidayHours,
                    premiumHours,
                    deductionRates,
                    payPeriodStart: new Date(),
                    payPeriodEnd: new Date()
                });

                displayPayStub(payrollRecord);
                showAlert('Payroll calculated successfully!', 'success');
            } catch (error) {
                showAlert(`Error: ${error.message}`, 'error');
            }
        }

        function displayPayStub(payrollRecord) {
            const resultsDiv = document.getElementById('results');
            
            resultsDiv.innerHTML = `
                <div class="pay-stub">
                    <div class="pay-stub-header">
                        <div class="pay-stub-title">PAYROLL STUB</div>
                        <div style="margin-top: 10px;">
                            <strong>${payrollRecord.employeeName}</strong> (ID: ${payrollRecord.employeeId})<br>
                            Pay Period: ${payrollRecord.payPeriodStart.toLocaleDateString()} - ${payrollRecord.payPeriodEnd.toLocaleDateString()}<br>
                            Hourly Rate: ${payroll.formatCurrency(payrollRecord.pay.hourlyRate)}
                        </div>
                    </div>

                    <div class="pay-stub-section">
                        <h4>HOURS WORKED</h4>
                        <div class="pay-row">
                            <span>Regular Hours:</span>
                            <span>${payrollRecord.hours.regular}</span>
                        </div>
                        <div class="pay-row">
                            <span>Overtime Hours:</span>
                            <span>${payrollRecord.hours.overtime}</span>
                        </div>
                        <div class="pay-row">
                            <span>Holiday Hours:</span>
                            <span>${payrollRecord.hours.holiday}</span>
                        </div>
                        <div class="pay-row">
                            <span>Premium Hours:</span>
                            <span>${payrollRecord.hours.premium}</span>
                        </div>
                        <div class="pay-row total">
                            <span>Total Hours:</span>
                            <span>${payrollRecord.hours.total}</span>
                        </div>
                    </div>

                    <div class="pay-stub-section">
                        <h4>EARNINGS</h4>
                        <div class="pay-row">
                            <span>Regular Pay:</span>
                            <span>${payroll.formatCurrency(payrollRecord.pay.regular)}</span>
                        </div>
                        <div class="pay-row">
                            <span>Overtime Pay:</span>
                            <span>${payroll.formatCurrency(payrollRecord.pay.overtime)}</span>
                        </div>
                        <div class="pay-row">
                            <span>Holiday Pay:</span>
                            <span>${payroll.formatCurrency(payrollRecord.pay.holiday)}</span>
                        </div>
                        <div class="pay-row">
                            <span>Premium Pay:</span>
                            <span>${payroll.formatCurrency(payrollRecord.pay.premium)}</span>
                        </div>
                        <div class="pay-row total">
                            <span>GROSS PAY:</span>
                            <span>${payroll.formatCurrency(payrollRecord.pay.gross)}</span>
                        </div>
                    </div>

                    <div class="pay-stub-section">
                        <h4>DEDUCTIONS</h4>
                        <div class="pay-row">
                            <span>Federal Tax:</span>
                            <span>${payroll.formatCurrency(payrollRecord.deductions.federalTax)}</span>
                        </div>
                        <div class="pay-row">
                            <span>State Tax:</span>
                            <span>${payroll.formatCurrency(payrollRecord.deductions.stateTax)}</span>
                        </div>
                        <div class="pay-row">
                            <span>Social Security:</span>
                            <span>${payroll.formatCurrency(payrollRecord.deductions.socialSecurity)}</span>
                        </div>
                        <div class="pay-row">
                            <span>Medicare:</span>
                            <span>${payroll.formatCurrency(payrollRecord.deductions.medicare)}</span>
                        </div>
                        <div class="pay-row">
                            <span>Insurance:</span>
                            <span>${payroll.formatCurrency(payrollRecord.deductions.insurance)}</span>
                        </div>
                        <div class="pay-row">
                            <span>Retirement:</span>
                            <span>${payroll.formatCurrency(payrollRecord.deductions.retirement)}</span>
                        </div>
                        <div class="pay-row total">
                            <span>TOTAL DEDUCTIONS:</span>
                            <span>${payroll.formatCurrency(payrollRecord.deductions.total)}</span>
                        </div>
                    </div>

                    <div class="pay-row net-pay">
                        <span><strong>NET PAY:</strong></span>
                        <span><strong>${payroll.formatCurrency(payrollRecord.netPay)}</strong></span>
                    </div>
                </div>
            `;
        }

        function showAlert(message, type = 'info') {
            // Remove existing alerts
            const existingAlerts = document.querySelectorAll('.temp-alert');
            existingAlerts.forEach(alert => alert.remove());

            // Create new alert
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert ${type} temp-alert`;
            alertDiv.textContent = message;
            alertDiv.style.position = 'fixed';
            alertDiv.style.top = '20px';
            alertDiv.style.right = '20px';
            alertDiv.style.zIndex = '1000';
            alertDiv.style.maxWidth = '300px';

            document.body.appendChild(alertDiv);

            // Remove alert after 3 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }

        // Initialize the employee list on page load
        updateEmployeeList();
    </script>
</body>
</html>