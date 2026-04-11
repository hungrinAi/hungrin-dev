module.exports = [
"[project]/.next-internal/server/app/api/dashboard/stats/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/features/dashboard/data/mock.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockDashboardStats",
    ()=>mockDashboardStats
]);
const thisWeekData = [
    {
        name: 'Mon',
        sales: 400
    },
    {
        name: 'Tue',
        sales: 300
    },
    {
        name: 'Wed',
        sales: 600
    },
    {
        name: 'Thu',
        sales: 800
    },
    {
        name: 'Fri',
        sales: 500
    },
    {
        name: 'Sat',
        sales: 900
    },
    {
        name: 'Sun',
        sales: 700
    }
];
const sevenDaysData = [
    {
        name: 'Apr 5',
        sales: 520
    },
    {
        name: 'Apr 6',
        sales: 480
    },
    {
        name: 'Apr 7',
        sales: 710
    },
    {
        name: 'Apr 8',
        sales: 650
    },
    {
        name: 'Apr 9',
        sales: 390
    },
    {
        name: 'Apr 10',
        sales: 870
    },
    {
        name: 'Apr 11',
        sales: 760
    }
];
const thirtyDaysData = [
    {
        name: 'Mar 13',
        sales: 310
    },
    {
        name: 'Mar 15',
        sales: 420
    },
    {
        name: 'Mar 17',
        sales: 380
    },
    {
        name: 'Mar 19',
        sales: 490
    },
    {
        name: 'Mar 21',
        sales: 610
    },
    {
        name: 'Mar 23',
        sales: 540
    },
    {
        name: 'Mar 25',
        sales: 720
    },
    {
        name: 'Mar 27',
        sales: 660
    },
    {
        name: 'Mar 29',
        sales: 580
    },
    {
        name: 'Mar 31',
        sales: 800
    },
    {
        name: 'Apr 2',
        sales: 750
    },
    {
        name: 'Apr 4',
        sales: 690
    },
    {
        name: 'Apr 6',
        sales: 870
    },
    {
        name: 'Apr 8',
        sales: 930
    },
    {
        name: 'Apr 10',
        sales: 760
    }
];
const mockDashboardStats = {
    newOrdersToday: 42,
    weeklyRevenue: 1250,
    weatherEffect: 15,
    totalOrders: 1240,
    salesData: thisWeekData,
    salesDataByPeriod: {
        'This Week': thisWeekData,
        '7 Days': sevenDaysData,
        '30 Days': thirtyDaysData
    },
    promoOfDay: {
        title: 'Burger Bundle!',
        price: 12.99,
        oldPrice: 16.99,
        slotsLeft: 7,
        emoji: '🍔',
        tag: '🔥 Hot'
    },
    aiSuggestions: [
        '+ Suggest A Promo',
        '+ Current offers',
        '+ Get More Customers',
        '+ Create a Post'
    ]
};
}),
"[project]/src/app/api/dashboard/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$data$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/dashboard/data/mock.ts [app-route] (ecmascript)");
;
;
async function GET() {
    // TODO: replace with real DB/service call
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$data$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDashboardStats"]);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fe9b50f2._.js.map