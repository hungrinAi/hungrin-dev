module.exports = [
"[project]/.next-internal/server/app/api/insights/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/src/features/insights/data/mock.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockInsights",
    ()=>mockInsights
]);
const mockInsights = {
    customerSegments: [
        {
            name: 'Loyal',
            value: 45
        },
        {
            name: 'Returning',
            value: 30
        },
        {
            name: 'New',
            value: 15
        },
        {
            name: 'VIP',
            value: 10
        }
    ],
    salesTrend: [
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
    ],
    recommendations: [
        {
            id: '1',
            title: 'Burger Bundle Optimization',
            description: "Your 'Burger Bundle' is most popular on Tuesdays. Consider a lunch special.",
            category: 'Sales',
            impact: 'High',
            text: "Your 'Burger Bundle' is most popular on Tuesdays. Consider a lunch special."
        },
        {
            id: '2',
            title: 'Retention Growth',
            description: 'Customer retention is up 15% this month. Keep it up!',
            category: 'Loyalty',
            impact: 'Medium',
            text: 'Customer retention is up 15% this month. Keep it up!'
        },
        {
            id: '3',
            title: 'Happy Hour Detection',
            description: "Slow hours detected between 3 PM – 5 PM. Launch a 'Happy Hour' promo.",
            category: 'Promotion',
            impact: 'High',
            text: "Slow hours detected between 3 PM – 5 PM. Launch a 'Happy Hour' promo."
        }
    ],
    topProducts: [
        {
            name: 'Classic Cheeseburger',
            category: 'Main',
            sales: 142,
            revenue: '1,846',
            growth: '+12%',
            trend: '+12%',
            emoji: '🍔'
        },
        {
            name: 'Spicy Chicken Wings',
            category: 'Sides',
            sales: 98,
            revenue: '882',
            growth: '+8%',
            trend: '+8%',
            emoji: '🍗'
        },
        {
            name: 'Truffle Fries',
            category: 'Sides',
            sales: 85,
            revenue: '425',
            growth: '-2%',
            trend: '-2%',
            emoji: '🍟'
        },
        {
            name: 'Vanilla Milkshake',
            category: 'Drinks',
            sales: 76,
            revenue: '380',
            growth: '+15%',
            trend: '+15%',
            emoji: '🥤'
        }
    ]
};
}),
"[project]/src/app/api/insights/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$insights$2f$data$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/insights/data/mock.ts [app-route] (ecmascript)");
;
;
async function GET() {
    // TODO: replace with real DB/service call
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$insights$2f$data$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockInsights"]);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e5ca6b93._.js.map