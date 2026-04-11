(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/contexts/NotificationsContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationsProvider",
    ()=>NotificationsProvider,
    "useNotifications",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const NotificationsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const SEED_NOTIFICATIONS = [
    {
        id: 'seed-1',
        title: 'Campaign going live soon',
        message: '"Summer Burger Fest" starts in 2 hours on Uber Eats & Deliveroo.',
        type: 'info',
        time: '5 min ago',
        read: false
    },
    {
        id: 'seed-2',
        title: 'New order received',
        message: 'Order #1042 from Sarah M. — £18.99 via Deliveroo.',
        type: 'success',
        time: '12 min ago',
        read: false
    },
    {
        id: 'seed-3',
        title: 'AI promo suggestion',
        message: 'Your Tuesday traffic is low. Launch a mid-week deal?',
        type: 'info',
        time: '1 hr ago',
        read: true
    },
    {
        id: 'seed-4',
        title: 'Weekly report ready',
        message: 'Your week 14 performance summary is now available.',
        type: 'info',
        time: '3 hrs ago',
        read: true
    }
];
function NotificationsProvider(param) {
    let { children } = param;
    _s();
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SEED_NOTIFICATIONS);
    const addNotification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[addNotification]": (n)=>{
            const newNotif = {
                ...n,
                id: Date.now().toString(),
                time: 'Just now',
                read: false
            };
            setNotifications({
                "NotificationsProvider.useCallback[addNotification]": (prev)=>[
                        newNotif,
                        ...prev.slice(0, 19)
                    ]
            }["NotificationsProvider.useCallback[addNotification]"]);
        }
    }["NotificationsProvider.useCallback[addNotification]"], []);
    const markRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[markRead]": (id)=>{
            setNotifications({
                "NotificationsProvider.useCallback[markRead]": (prev)=>prev.map({
                        "NotificationsProvider.useCallback[markRead]": (n)=>n.id === id ? {
                                ...n,
                                read: true
                            } : n
                    }["NotificationsProvider.useCallback[markRead]"])
            }["NotificationsProvider.useCallback[markRead]"]);
        }
    }["NotificationsProvider.useCallback[markRead]"], []);
    const markAllRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[markAllRead]": ()=>{
            setNotifications({
                "NotificationsProvider.useCallback[markAllRead]": (prev)=>prev.map({
                        "NotificationsProvider.useCallback[markAllRead]": (n)=>({
                                ...n,
                                read: true
                            })
                    }["NotificationsProvider.useCallback[markAllRead]"])
            }["NotificationsProvider.useCallback[markAllRead]"]);
        }
    }["NotificationsProvider.useCallback[markAllRead]"], []);
    const clearAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[clearAll]": ()=>{
            setNotifications([]);
        }
    }["NotificationsProvider.useCallback[clearAll]"], []);
    const unreadCount = notifications.filter((n)=>!n.read).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationsContext.Provider, {
        value: {
            notifications,
            addNotification,
            markRead,
            markAllRead,
            clearAll,
            unreadCount
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/NotificationsContext.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(NotificationsProvider, "f7PrPMJt07JsY45heFoh3Cj0agE=");
_c = NotificationsProvider;
function useNotifications() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(NotificationsContext);
    if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
    return ctx;
}
_s1(useNotifications, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "NotificationsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$NotificationsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/NotificationsContext.tsx [app-client] (ecmascript)");
'use client';
;
;
function Providers(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$NotificationsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationsProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e842e570._.js.map