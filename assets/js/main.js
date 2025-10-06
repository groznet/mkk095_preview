// main.js

// Function to load HTML into a target element
function loadComponent(selector, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            return response.text();
        })
        .then(html => {
            const target = document.querySelector(selector);
            target.innerHTML = html;

            // 🔥 Re-scan Alpine components after content injection
            if (window.Alpine) {
                Alpine.flushAndStopDeferringMutations();
                Alpine.initTree(target);
            }
        })
        .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("#header-wrapper", "components/header.html");
    loadComponent("#footer-wrapper", "components/footer.html");
});


// Loan calculator functionality
document.addEventListener('alpine:init', () => {
    Alpine.data('loanCalculator', () => ({
        activeTab: 'calculator',
        loanAmount: 11000,
        loanDays: 10,
        totalAmount: 11880,
        
        init() {
            this.calculateLoan();
        },
        
        calculateLoan() {
            // Simple interest calculation for demo
            const dailyRate = 0.008; // 0.8% per day
            this.totalAmount = Math.round(this.loanAmount * (1 + dailyRate * this.loanDays));
            this.updateReturnDate();
        },
        
        updateReturnDate() {
            const today = new Date();
            today.setDate(today.getDate() + parseInt(this.loanDays));
            this.returnDate = today.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        },
        
        formatCurrency(amount) {
            return new Intl.NumberFormat('ru-RU').format(amount);
        }
    }));
});
// End: Loan calculator functionality

// FAQ Accordion functionality
document.addEventListener('alpine:init', () => {
    Alpine.data('faqAccordion', () => ({
        openItem: null,
        
        toggle(item) {
            this.openItem = this.openItem === item ? null : item;
        },
        
        // Optional: Auto-close when clicking outside
        init() {
            // Add click outside handler if needed
        }
    }));
});
// End: FAQ Accordion functionality

// Optional: Chat initialization function
function initChat() {
    if (typeof window.initChatWidget === 'function') {
        window.initChatWidget();
    } else {
        // Fallback: redirect to contact page
        window.location.href = '/contacts';
    }
}