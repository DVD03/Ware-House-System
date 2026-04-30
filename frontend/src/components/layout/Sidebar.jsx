import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, BarChart3, Package, ShoppingCart, Users, Settings,
    FolderTree, Award, UserCircle, Tags, Warehouse, Boxes, Truck,
    ShoppingBag, FileText, Receipt, Wallet, Workflow, Factory, ShieldCheck,
    RotateCcw, Wrench, AlertTriangle, FileMinus, X, Users as UsersIcon, Building2, Clock, Calendar as CalendarIcon, Plane, Calculator, DollarSign,

} from 'lucide-react';

// ── Grouped menu structure ──────────────────────────────────────────────────
const menuGroups = [
    {
        label: 'Overview',
        items: [
            { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        ],
    },
    {
        label: 'Catalog',
        items: [
            { label: 'Products', icon: Package, path: '/products' },
            { label: 'Categories', icon: FolderTree, path: '/categories' },
            { label: 'Brands', icon: Award, path: '/brands' },
        ],
    },
    {
        label: 'Inventory',
        items: [
            { label: 'Warehouses', icon: Warehouse, path: '/warehouses' },
            { label: 'Stock', icon: Boxes, path: '/stock' },
            { label: 'Stock Transfer', icon: Truck, path: '/stock/transfer' },
        ],
    },
    {
        label: 'Customers',
        items: [
            { label: 'Customers', icon: UserCircle, path: '/customers' },
            { label: 'Customer Groups', icon: Tags, path: '/customer-groups' },
            { label: 'Sales Orders', icon: ShoppingCart, path: '/sales-orders' },
            { label: 'POS', icon: ShoppingCart, path: '/pos' },
        ],
    },
    {
        label: 'Procurement',
        items: [
            { label: 'Suppliers', icon: Truck, path: '/suppliers' },
            { label: 'Purchase Orders', icon: ShoppingBag, path: '/purchase-orders' },
            { label: 'Bills', icon: Receipt, path: '/bills' },
        ],
    },
    {
        label: 'Finance',
        items: [
            { label: 'Invoices', icon: FileText, path: '/invoices' },
            { label: 'Payments', icon: Wallet, path: '/payments' },
            { label: 'Credit Notes', icon: FileMinus, path: '/credit-notes' },
        ],
    },
    {
        label: 'Production',
        items: [
            { label: 'BOMs (Recipes)', icon: Workflow, path: '/boms' },
            { label: 'Production', icon: Factory, path: '/production-orders' },
        ],
    },
    {
        label: 'After-Sales',
        items: [
            { label: 'Returns (RMA)', icon: RotateCcw, path: '/returns' },
            { label: 'Supplier Returns', icon: RotateCcw, path: '/supplier-returns' },
            { label: 'Damages', icon: AlertTriangle, path: '/damages' },
            { label: 'Repairs', icon: Wrench, path: '/repairs' },
        ],
    },
    {
        label: 'Administration',
        adminOnly: true,
        items: [
            { label: 'Users', icon: Users, path: '/users', adminOnly: true },
            { label: 'Roles', icon: ShieldCheck, path: '/roles', adminOnly: true },
            { label: 'Settings', icon: Settings, path: '/settings' },
        ],
    },
    {
        label: 'HR',
        items: [
            { label: 'Employees', icon: UsersIcon, path: '/employees' },
            { label: 'Departments', icon: Building2, path: '/departments' },
            { label: 'Designations', icon: Award, path: '/designations' },
            { label: 'Shifts', icon: Clock, path: '/shifts' },
            { label: 'Attendance', icon: CalendarIcon, path: '/attendance' },
            { label: 'Leave Requests', icon: Plane, path: '/leaves' },
            { label: 'Holidays', icon: CalendarIcon, path: '/holidays' },
            { label: 'Salary Structures', icon: Calculator, path: '/salary-structures' },
            { label: 'Payroll', icon: DollarSign, path: '/payroll' },
        ],
    },
    {
        label: 'Reports',
        items: [
            { label: 'Reports', icon: BarChart3, path: '/reports' },
            // { label: 'Sales Summary', icon: BarChart3, path: '/reports/sales-summary' },
            // { label: 'Sales Trend', icon: LineChart, path: '/reports/sales-trend' },
            // { label: 'Stock Movement', icon: ChartLine, path: '/reports/stock-movement' },
            // { label: 'Inventory Valuation', icon: ChartLine, path: '/reports/inventory-valuation' },
            // { label: 'Aged Receivables', icon: ChartLine, path: '/reports/aged-receivables' },
            // { label: 'Aged Payables', icon: ChartLine, path: '/reports/aged-payables' },
        ],
    },
];

export default function Sidebar({ userRole, isOpen, onClose }) {
    const sidebarRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                onClose();
            }
        };

        // Small delay so the toggle button click doesn't immediately close
        const timerId = setTimeout(() => {
            document.addEventListener('mousedown', handleOutsideClick);
        }, 100);

        return () => {
            clearTimeout(timerId);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    // Filter groups/items by role
    const visibleGroups = menuGroups
        .filter((g) => !g.adminOnly || userRole === 'admin')
        .map((g) => ({
            ...g,
            items: g.items.filter((item) => !item.adminOnly || userRole === 'admin'),
        }))
        .filter((g) => g.items.length > 0);

    return (
        <>
            {/* Backdrop overlay (mobile / click-outside layer) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar panel */}
            <aside
                ref={sidebarRef}
                style={{
                    width: isOpen ? '256px' : '0px',
                    minWidth: isOpen ? '256px' : '0px',
                    overflow: 'hidden',
                    transition: 'width 0.25s ease, min-width 0.25s ease',
                    flexShrink: 0,
                }}
                className="h-screen bg-white border-r border-gray-200 flex flex-col z-40 relative"
            >
                {/* Inner wrapper — keeps content at full 256px width even during animation */}
                <div className="w-64 flex flex-col h-full">

                    {/* ── Logo / Brand ── */}
                    <div className="p-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-900 leading-none">Wholesale</h2>
                                <p className="text-xs text-gray-500 mt-0.5">ERP System</p>
                            </div>
                        </div>
                        {/* Close button (visible on all sizes) */}
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                            aria-label="Close sidebar"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* ── Scrollable nav ── */}
                    <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
                        {visibleGroups.map((group) => (
                            <div key={group.label}>
                                {/* Group heading */}
                                <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 select-none">
                                    {group.label}
                                </p>

                                {/* Group items */}
                                <div className="space-y-0.5">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                        ? 'bg-primary-50 text-primary-700'
                                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                    }`
                                                }
                                            >
                                                <Icon size={16} className="flex-shrink-0" />
                                                <span className="truncate">{item.label}</span>
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* ── Footer ── */}
                    <div className="p-4 border-t border-gray-200 flex-shrink-0">
                        <p className="text-xs text-gray-400">v1.0.0 · MVP</p>
                    </div>
                </div>
            </aside>
        </>
    );
}