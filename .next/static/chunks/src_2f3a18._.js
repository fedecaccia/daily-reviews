(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_2f3a18._.js", {

"[project]/src/components/Field.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Field": (()=>Field)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Field = ({ field, onChange, sectionId, date })=>{
    const handleChange = async (value)=>{
        onChange(value);
        // Si no es el campo de notas, actualizar inmediatamente
        if (field.id !== 'notes') {
            try {
                const response = await fetch('/api/update-field', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        date,
                        sectionId,
                        fieldId: field.id,
                        value
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to update field');
                }
            } catch (error) {
                console.error('Error updating field:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
            }
        }
    };
    const handleMinutesChange = (increment)=>{
        const currentValue = Number(field.value);
        const newValue = currentValue + increment;
        // No permitir valores negativos y máximo 240 minutos (4 horas)
        if (newValue >= 0 && newValue <= 240) {
            handleChange(newValue);
        }
    };
    const renderField = ()=>{
        switch(field.type){
            case 'minutes':
                if (field.id === 'fruits') {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    const newValue = Number(field.value) - 1;
                                    if (newValue >= 0) handleChange(newValue);
                                },
                                className: `px-3 py-1 rounded ${Number(field.value) <= 0 ? 'bg-[var(--color-disabled)] cursor-not-allowed' : 'bg-[var(--button-error)] text-white'}`,
                                disabled: Number(field.value) <= 0,
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Field.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-16 text-center text-base",
                                children: [
                                    field.value,
                                    " 🍎"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Field.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    const newValue = Number(field.value) + 1;
                                    if (newValue <= 100) handleChange(newValue);
                                },
                                className: `px-3 py-1 rounded ${Number(field.value) >= 100 ? 'bg-[var(--color-disabled)] cursor-not-allowed' : 'bg-[var(--button-success)] text-white'}`,
                                disabled: Number(field.value) >= 100,
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Field.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Field.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleMinutesChange(-5),
                            className: `px-3 py-1 rounded ${Number(field.value) <= 0 ? 'bg-[var(--color-disabled)] cursor-not-allowed' : 'bg-[var(--button-error)] text-white'}`,
                            disabled: Number(field.value) <= 0,
                            children: "-"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Field.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-16 text-center text-base",
                            children: [
                                field.value,
                                " min"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Field.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleMinutesChange(5),
                            className: `px-3 py-1 rounded ${Number(field.value) >= 240 ? 'bg-[var(--color-disabled)] cursor-not-allowed' : 'bg-[var(--button-success)] text-white'}`,
                            disabled: Number(field.value) >= 240,
                            children: "+"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Field.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Field.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this);
            case 'boolean':
                const isDangerousField = field.id.match(/^(acidity|heavy_food|fast_food)$/);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>handleChange(!field.value),
                        className: `toggle-switch ${field.value ? isDangerousField ? 'active-danger' : 'active' : ''}`,
                        role: "switch",
                        "aria-checked": Boolean(field.value),
                        tabIndex: 0
                    }, void 0, false, {
                        fileName: "[project]/src/components/Field.tsx",
                        lineNumber: 122,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Field.tsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, this);
            case 'text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: field.value,
                    onChange: (e)=>handleChange(e.target.value),
                    className: "w-full p-2 border rounded mt-2 transition-colors duration-200",
                    rows: 4
                }, void 0, false, {
                    fileName: "[project]/src/components/Field.tsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this);
            case 'slider':
                const getSliderColor = (value)=>{
                    // Colores invertidos para el campo de discusiones
                    if (field.id === 'couple_discussions') {
                        switch(value){
                            case 1:
                                return 'var(--color-green-bright)'; // El mismo que nivel 5 de productivity
                            case 2:
                                return 'var(--color-green)'; // El mismo que nivel 4 de productivity
                            case 3:
                                return 'var(--color-yellow)'; // El mismo que nivel 3 de productivity
                            case 4:
                                return 'var(--color-orange)'; // El mismo que nivel 2 de productivity
                            case 5:
                                return 'var(--color-red)'; // El mismo que nivel 1 de productivity
                            default:
                                return 'var(--color-green-bright)';
                        }
                    }
                    // Colores normales para otros sliders
                    switch(value){
                        case 1:
                            return 'var(--color-red)';
                        case 2:
                            return 'var(--color-orange)';
                        case 3:
                            return 'var(--color-yellow)';
                        case 4:
                            return 'var(--color-green)';
                        case 5:
                            return 'var(--color-green-bright)';
                        default:
                            return 'var(--color-red)';
                    }
                };
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "slider-container relative",
                        style: {
                            background: getSliderColor(Number(field.value))
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "slider-track"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Field.tsx",
                                lineNumber: 187,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "1",
                                max: "5",
                                value: field.value,
                                onChange: (e)=>handleChange(Number(e.target.value)),
                                className: "slider-input"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Field.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Field.tsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Field.tsx",
                    lineNumber: 180,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `mb-4 ${field.type === 'text' ? 'block' : 'grid grid-cols-2 gap-4 items-center'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "font-medium",
                children: [
                    field.name,
                    field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Field.tsx",
                        lineNumber: 210,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Field.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            renderField()
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Field.tsx",
        lineNumber: 203,
        columnNumber: 5
    }, this);
};
_c = Field;
var _c;
__turbopack_refresh__.register(_c, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ThemeToggle.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ThemeToggle": (()=>ThemeToggle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
const ThemeToggle = ()=>{
    _s();
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>{
            // Asegurarnos de que inicialmente esté en modo claro
            document.documentElement.setAttribute('data-theme', 'light');
            // Luego verificar las preferencias guardadas
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const shouldBeDark = savedTheme === 'dark' || !savedTheme && prefersDark;
            if (shouldBeDark) {
                setIsDark(true);
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    }["ThemeToggle.useEffect"], []);
    const toggleTheme = ()=>{
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: toggleTheme,
        className: `theme-toggle ${isDark ? 'active' : ''}`,
        role: "switch",
        "aria-checked": isDark,
        tabIndex: 0,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "theme-toggle-icon",
            children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "moon",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                }, void 0, false, {
                    fileName: "[project]/src/components/ThemeToggle.tsx",
                    lineNumber: 41,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ThemeToggle.tsx",
                lineNumber: 40,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "sun",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                }, void 0, false, {
                    fileName: "[project]/src/components/ThemeToggle.tsx",
                    lineNumber: 45,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ThemeToggle.tsx",
                lineNumber: 44,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ThemeToggle.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ThemeToggle.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
};
_s(ThemeToggle, "q9ovQTvwIdpxeVii6kJLTuTYpwE=");
_c = ThemeToggle;
var _c;
__turbopack_refresh__.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/UpdateNotesButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "UpdateNotesButton": (()=>UpdateNotesButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
const UpdateNotesButton = ({ notes, initialNotes, date, onUpdate })=>{
    _s();
    const [isUpdating, setIsUpdating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasChanges, setHasChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSavedNotes, setLastSavedNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialNotes);
    // Detectar cambios en las notas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UpdateNotesButton.useEffect": ()=>{
            const currentNotes = notes || '';
            const savedNotes = lastSavedNotes || '';
            const changed = currentNotes !== savedNotes;
            console.log('Notes state:', {
                current: currentNotes,
                saved: savedNotes,
                initial: initialNotes,
                changed
            });
            setHasChanges(changed);
        }
    }["UpdateNotesButton.useEffect"], [
        notes,
        lastSavedNotes,
        initialNotes
    ]);
    const handleUpdate = async ()=>{
        setIsUpdating(true);
        try {
            const response = await fetch('/api/update-notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date,
                    notes: notes || ''
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update notes');
            }
            setLastSavedNotes(notes);
            onUpdate?.();
        } catch (error) {
            console.error('Update failed:', error);
        } finally{
            setIsUpdating(false);
            setHasChanges(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleUpdate,
        disabled: isUpdating || !hasChanges,
        className: `
        w-full
        px-6 py-2 
        rounded-full 
        ${!hasChanges ? 'bg-[var(--color-disabled)] text-[var(--text-secondary)]' : 'bg-[var(--button-success)] text-white'}
        font-medium 
        shadow-lg 
        hover:opacity-90 
        transition-all
        disabled:opacity-50 
        disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        mt-4
      `,
        children: isUpdating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "animate-spin",
                    children: "⟳"
                }, void 0, false, {
                    fileName: "[project]/src/components/UpdateNotesButton.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Updating..."
                }, void 0, false, {
                    fileName: "[project]/src/components/UpdateNotesButton.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : !hasChanges ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "✓"
                }, void 0, false, {
                    fileName: "[project]/src/components/UpdateNotesButton.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Updated"
                }, void 0, false, {
                    fileName: "[project]/src/components/UpdateNotesButton.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "↑"
                }, void 0, false, {
                    fileName: "[project]/src/components/UpdateNotesButton.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Update"
                }, void 0, false, {
                    fileName: "[project]/src/components/UpdateNotesButton.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/UpdateNotesButton.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
};
_s(UpdateNotesButton, "UNqNRVZSoKvQiIgtWiXm6YfxpnA=");
_c = UpdateNotesButton;
var _c;
__turbopack_refresh__.register(_c, "UpdateNotesButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ThemeToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UpdateNotesButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/UpdateNotesButton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
const initialSections = [
    {
        id: 'workout',
        name: 'Workout',
        fields: [
            {
                id: 'abs',
                name: 'Abs',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'chest',
                name: 'Chest',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'back',
                name: 'Back',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'shoulders',
                name: 'Shoulders',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'biceps',
                name: 'Biceps',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'triceps',
                name: 'Triceps',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'legs',
                name: 'Legs',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'stretching',
                name: 'Stretching',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'aerobic',
                name: 'Aerobic',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            }
        ]
    },
    {
        id: 'relax',
        name: 'Relax',
        fields: [
            {
                id: 'yoga',
                name: 'Yoga',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'meditation',
                name: 'Meditation',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            }
        ]
    },
    {
        id: 'health',
        name: 'Health',
        fields: [
            {
                id: 'sleep_seven',
                name: 'Slept 7+ hours',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'acidity',
                name: 'Acidity',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            }
        ]
    },
    {
        id: 'productivity',
        name: 'Productivity',
        fields: [
            {
                id: 'level',
                name: 'Productivity Level',
                type: 'slider',
                required: true,
                defaultValue: 1,
                value: 1
            },
            {
                id: 'reading',
                name: 'Reading Time',
                type: 'minutes',
                required: true,
                defaultValue: 0,
                value: 0
            }
        ]
    },
    {
        id: 'nutrition',
        name: 'Nutrition',
        fields: [
            {
                id: 'fruits',
                name: 'Fruits',
                type: 'minutes',
                required: true,
                defaultValue: 0,
                value: 0
            },
            {
                id: 'polyphenols',
                name: 'Polyphenols',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'heavy_food',
                name: 'Heavy Food',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'fast_food',
                name: 'Fast Food',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            },
            {
                id: 'yogurt',
                name: 'Yogurt',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            }
        ]
    },
    {
        id: 'life',
        name: 'Life',
        fields: [
            {
                id: 'couple_discussions',
                name: 'Couple Discussions',
                type: 'slider',
                required: true,
                defaultValue: 1,
                value: 1
            },
            {
                id: 'gaming',
                name: 'Gaming',
                type: 'boolean',
                required: true,
                defaultValue: false,
                value: false
            }
        ]
    },
    {
        id: 'notes',
        name: 'Daily Takeaways',
        fields: [
            {
                id: 'notes',
                name: '',
                type: 'text',
                required: false,
                defaultValue: '',
                value: ''
            }
        ]
    }
];
function Home() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('today');
    const [todaySections, setTodaySections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialSections);
    const [yesterdaySections, setYesterdaySections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialSections);
    // Cargar datos desde Google Sheets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const loadInitialData = {
                "Home.useEffect.loadInitialData": async ()=>{
                    try {
                        // Cargar datos de hoy
                        const todayDate = new Date().toISOString().split('T')[0];
                        const todayResponse = await fetch(`/api/load-data?date=${todayDate}`);
                        const todayData = await todayResponse.json();
                        // Cargar datos de ayer
                        const yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
                        const yesterdayResponse = await fetch(`/api/load-data?date=${yesterdayDate}`);
                        const yesterdayData = await yesterdayResponse.json();
                        // Actualizar las secciones con los datos
                        if (todayData) {
                            const updatedTodaySections = initialSections.map({
                                "Home.useEffect.loadInitialData.updatedTodaySections": (section)=>({
                                        ...section,
                                        fields: section.fields.map({
                                            "Home.useEffect.loadInitialData.updatedTodaySections": (field)=>{
                                                const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
                                                return {
                                                    ...field,
                                                    value: todayData[fieldKey] ?? field.defaultValue
                                                };
                                            }
                                        }["Home.useEffect.loadInitialData.updatedTodaySections"])
                                    })
                            }["Home.useEffect.loadInitialData.updatedTodaySections"]);
                            setTodaySections(updatedTodaySections);
                        }
                        if (yesterdayData) {
                            const updatedYesterdaySections = initialSections.map({
                                "Home.useEffect.loadInitialData.updatedYesterdaySections": (section)=>({
                                        ...section,
                                        fields: section.fields.map({
                                            "Home.useEffect.loadInitialData.updatedYesterdaySections": (field)=>{
                                                const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
                                                return {
                                                    ...field,
                                                    value: yesterdayData[fieldKey] ?? field.defaultValue
                                                };
                                            }
                                        }["Home.useEffect.loadInitialData.updatedYesterdaySections"])
                                    })
                            }["Home.useEffect.loadInitialData.updatedYesterdaySections"]);
                            setYesterdaySections(updatedYesterdaySections);
                        }
                    } catch (error) {
                        console.error('Error loading initial data:', error);
                    }
                }
            }["Home.useEffect.loadInitialData"];
            loadInitialData();
        }
    }["Home.useEffect"], []);
    const handleFieldChange = (sectionId, fieldId, value, isYesterday = false)=>{
        const setSections = isYesterday ? setYesterdaySections : setTodaySections;
        const sections = isYesterday ? yesterdaySections : todaySections;
        setSections(sections.map((section)=>section.id === sectionId ? {
                ...section,
                fields: section.fields.map((field)=>field.id === fieldId ? {
                        ...field,
                        value
                    } : field)
            } : section));
    };
    const renderSection = (section, isYesterday = false)=>{
        if (section.id === 'workout') {
            const fields = section.fields;
            const midPoint = Math.ceil(fields.length / 2);
            const leftColumn = fields.slice(0, midPoint);
            const rightColumn = fields.slice(midPoint);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4",
                        children: section.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 319,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-x-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: leftColumn.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        field: field,
                                        onChange: (value)=>handleFieldChange(section.id, field.id, value, isYesterday),
                                        sectionId: section.id,
                                        date: isYesterday ? new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                                    }, field.id, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 321,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: rightColumn.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        field: field,
                                        onChange: (value)=>handleFieldChange(section.id, field.id, value, isYesterday),
                                        sectionId: section.id,
                                        date: isYesterday ? new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                                    }, field.id, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 337,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 320,
                        columnNumber: 11
                    }, this)
                ]
            }, section.id, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 318,
                columnNumber: 9
            }, this);
        }
        if (section.id === 'notes') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4",
                        children: section.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                field: section.fields[0],
                                onChange: (value)=>handleFieldChange(section.id, section.fields[0].id, value, isYesterday),
                                sectionId: section.id,
                                date: isYesterday ? new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                            }, section.fields[0].id, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UpdateNotesButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UpdateNotesButton"], {
                                notes: section.fields[0].value,
                                initialNotes: isYesterday ? yesterdaySections.find((s)=>s.id === 'notes')?.fields[0].value : todaySections.find((s)=>s.id === 'notes')?.fields[0].value,
                                date: isYesterday ? new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                                onUpdate: async ()=>{
                                    const currentDate = isYesterday ? new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                                    const response = await fetch(`/api/load-data?date=${currentDate}`);
                                    const data = await response.json();
                                    if (data) {
                                        const updatedSections = initialSections.map((section)=>({
                                                ...section,
                                                fields: section.fields.map((field)=>{
                                                    const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
                                                    return {
                                                        ...field,
                                                        value: data[fieldKey] ?? field.defaultValue
                                                    };
                                                })
                                            }));
                                        if (isYesterday) {
                                            setYesterdaySections(updatedSections);
                                        } else {
                                            setTodaySections(updatedSections);
                                        }
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this)
                ]
            }, section.id, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 356,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4",
                    children: section.name
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 409,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: Array.isArray(section.fields) && section.fields.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                            field: field,
                            onChange: (value)=>handleFieldChange(section.id, field.id, value, isYesterday),
                            sectionId: section.id,
                            date: isYesterday ? new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                        }, field.id, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 412,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 410,
                    columnNumber: 9
                }, this)
            ]
        }, section.id, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 408,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[var(--background)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 bg-[var(--background)] z-10 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-480 mx-auto px-4 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex space-x-2",
                                children: [
                                    {
                                        id: 'today',
                                        name: 'Today'
                                    },
                                    {
                                        id: 'yesterday',
                                        name: 'Yesterday'
                                    },
                                    {
                                        id: 'stats',
                                        name: 'Stats'
                                    }
                                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab(tab.id),
                                        className: `flex-1 py-2 px-4 rounded transition-colors duration-200 ${activeTab === tab.id ? 'bg-[var(--color-blue)] text-[var(--text-primary)]' : 'bg-[var(--color-disabled)] text-[var(--text-secondary)] hover:bg-opacity-80'}`,
                                        children: tab.name
                                    }, tab.id, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 433,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 452,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 432,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 430,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-container py-6",
                children: [
                    activeTab === 'today' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: Array.isArray(todaySections) && todaySections.map((section)=>renderSection(section))
                    }, void 0, false),
                    activeTab === 'yesterday' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: Array.isArray(yesterdaySections) && yesterdaySections.map((section)=>renderSection(section, true))
                    }, void 0, false),
                    activeTab === 'stats' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center p-4",
                        children: "Stats coming soon..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 469,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 429,
        columnNumber: 5
    }, this);
}
_s(Home, "Gyn3lXE6JaJzFqGqHOzS5Fc0HiA=");
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_2f3a18._.js.map