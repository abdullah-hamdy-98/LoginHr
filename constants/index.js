export const sidebarLinks = [
    {
        svgURL: "/svg/dashboard.svg",
        route: "/",
        label: "Dashboard",
    },
    {
        svgURL: "/svg/employees.svg",
        route: "",
        label: "Employee Files",
        dowenarrow: "/svg/arrow_dowen.svg",
        files: { label: 'Files', route: '/empFiles' },
        inquiry: { label: 'Inquiry', route: '/empInquiry' }
    },
    {
        svgURL: "/svg/transaction.svg",
        route: "",
        label: "Transactions",
        dowenarrow: "/svg/arrow_dowen.svg",
        files: { label: 'Create', route: '/create' },
        inquiry: { label: 'Inquiry', route: '/inquiry' }
    },
    {
        svgURL: "/svg/settings.svg",
        route: "/",
        label: "Settings",
    }
];
