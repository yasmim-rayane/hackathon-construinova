// ======================================
// HUB - Dashboard Charts with Chart.js
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    // Category Chart (Bar Chart)
    createCategoryChart();
    
    // ODS Chart (Doughnut Chart)
    createODSChart();
    
    // Trend Chart (Line Chart)
    createTrendChart();
}

// ======================================
// Category Bar Chart
// ======================================
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Infraestrutura',
                'Saneamento',
                'Iluminação',
                'Transporte',
                'Lixo/Coleta',
                'Meio Ambiente',
                'Segurança',
                'Outros'
            ],
            datasets: [{
                label: 'Número de Reclamações',
                data: [842, 714, 458, 324, 287, 156, 98, 669],
                backgroundColor: [
                    'rgba(0, 119, 182, 0.8)',    // ocean-blue
                    'rgba(0, 180, 216, 0.8)',    // aqua-green
                    'rgba(144, 224, 239, 0.8)',  // turquoise
                    'rgba(245, 230, 202, 0.8)',  // sand
                    'rgba(0, 119, 182, 0.6)',
                    'rgba(0, 180, 216, 0.6)',
                    'rgba(144, 224, 239, 0.6)',
                    'rgba(46, 46, 46, 0.6)',
                ],
                borderColor: [
                    'rgba(0, 119, 182, 1)',
                    'rgba(0, 180, 216, 1)',
                    'rgba(144, 224, 239, 1)',
                    'rgba(245, 230, 202, 1)',
                    'rgba(0, 119, 182, 1)',
                    'rgba(0, 180, 216, 1)',
                    'rgba(144, 224, 239, 1)',
                    'rgba(46, 46, 46, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// ======================================
// ODS Doughnut Chart
// ======================================
function createODSChart() {
    const ctx = document.getElementById('odsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'ODS 11 - Cidades Sustentáveis',
                'ODS 6 - Água e Saneamento',
                'ODS 7 - Energia Limpa',
                'ODS 9 - Infraestrutura',
                'ODS 14 - Vida na Água',
                'Outros ODS'
            ],
            datasets: [{
                label: 'Reclamações por ODS',
                data: [892, 714, 458, 324, 98, 62],
                backgroundColor: [
                    'rgba(0, 119, 182, 0.8)',
                    'rgba(0, 180, 216, 0.8)',
                    'rgba(144, 224, 239, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: [
                    'rgba(0, 119, 182, 1)',
                    'rgba(0, 180, 216, 1)',
                    'rgba(144, 224, 239, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 11
                        },
                        padding: 10
                    }
                },
                title: {
                    display: false
                }
            }
        }
    });
}

// ======================================
// Trend Line Chart
// ======================================
function createTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                'Jul', 'Ago', 'Set', 'Out'
            ],
            datasets: [
                {
                    label: 'Reclamações Recebidas',
                    data: [180, 195, 220, 245, 268, 290, 285, 275, 260, 230],
                    borderColor: 'rgba(0, 119, 182, 1)',
                    backgroundColor: 'rgba(0, 119, 182, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                },
                {
                    label: 'Reclamações Resolvidas',
                    data: [120, 145, 170, 188, 205, 225, 240, 248, 235, 210],
                    borderColor: 'rgba(0, 180, 216, 1)',
                    backgroundColor: 'rgba(0, 180, 216, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12
                        },
                        padding: 15
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// ======================================
// Simulate Real-time Data Update
// ======================================
function simulateDataUpdate() {
    // This function can be called to update charts with new data
    // For demo purposes, it's commented out
    
    /*
    setInterval(() => {
        // Update stats
        const totalComplaints = document.querySelector('.total-complaints');
        if (totalComplaints) {
            const current = parseInt(totalComplaints.textContent.replace(/,/g, ''));
            totalComplaints.textContent = (current + Math.floor(Math.random() * 5)).toLocaleString();
        }
    }, 30000); // Update every 30 seconds
    */
}

// ======================================
// Export Functions (for future use)
// ======================================
function exportChartData(chartId, format = 'csv') {
    // Future implementation for exporting chart data
    console.log(`Exporting ${chartId} data as ${format}`);
    alert('Recurso de exportação em desenvolvimento');
}

// ======================================
// Filter Data by City (for future implementation)
// ======================================
function filterByCity(cityName) {
    console.log(`Filtering data for city: ${cityName}`);
    // This would update all charts based on selected city
}

// ======================================
// Filter Data by Date Range
// ======================================
function filterByDateRange(startDate, endDate) {
    console.log(`Filtering data from ${startDate} to ${endDate}`);
    // This would update all charts based on date range
}
