const SAMPLE_FEATURES = {
    show_dialog_box: true,
    enable_new_pricing: true,
    pie_chart: [{ userRoles: ['admin'] }], // show pie chart to admins
    data_table: [
        { percentageOfUsers: 0.1, userRoles: ['user'] }, // 10% rollout for 'user' role
        { userRoles: ['admin', 'tester'] }, // admins & testers always see
    ],
};

const Cache = {
    featureFlags: {},
    timeStamp: null
};

// TTL in milliseconds (10 seconds)
const MAX_CACHE_TTL = 10 * 1000;

let fetchInstance = null;

function fetchAllFeatures() {
    console.log('call to [BE]');
    return new Promise((resolve) => {
        setTimeout(() => resolve(SAMPLE_FEATURES), 100);
    });
}

function isCacheFresh() {
    return Cache.timeStamp && (Cache.timeStamp + MAX_CACHE_TTL) > Date.now();
}

function getValue(featureFlags, featureName, defaultValue) {
    return Object.prototype.hasOwnProperty.call(featureFlags, featureName)
        ? featureFlags[featureName]
        : defaultValue;
}

/**
 * Evaluate a non-boolean feature value against a context.
 * - If value is primitive (boolean/string/number) => return as is.
 * - If value is an array of rule objects => return first matching rule's "result":
 *     - rule may be plain (presence indicates enabled) or may include additional keys.
 * - Supported rule keys (simple, common):
 *     - userRoles: array -> context.userRole must be one of them
 *     - percentageOfUsers: number in [0,1] -> context.roll (0..1) must be <= this
 *
 * Context example: { userRole: 'admin', roll: 0.07, userId: 'abc' }
 */
function evaluateFeatureValue(rawValue, context = {}) {
    // primitives (boolean, number, string, object that's not rule-array) -> return directly
    // if (rawValue == null || typeof rawValue !== 'object' || Array.isArray(rawValue) === false && !Array.isArray(rawValue)) {
    //     return rawValue;
    // }

    if (typeof rawValue === 'boolean') {
        return rawValue;
    }

    // // If it's not an array, return it raw (could be an object config)
    // if (!Array.isArray(rawValue)) {
    //     return rawValue;
    // }

    // rawValue is an array — treat it as list of rules
    for (const rule of rawValue) {
        if (Object.keys(rule).length === 0) {
            return true;
        }
        // If rule has userRoles, check match
        if (rule.userRoles) {
            const role = context.userRole;
            if (!role) {
                // no role in context -> this rule can't match
                continue;
            }
            if (Array.isArray(rule.userRoles) && rule.userRoles.includes(role)) {
                return rule.result !== undefined ? rule.result : true;
            } else {
                // role doesn't match -> continue
                continue;
            }
        }

        // If rule has percentageOfUsers, check roll in context (expects 0..1)
        if (typeof rule.percentageOfUsers === 'number') {
            const roll = typeof context.roll === 'number' ? context.roll : Math.random();
            if (roll <= rule.percentageOfUsers) {
                // optional userRoles + percentage combined
                if (rule.userRoles) {
                    const role = context.userRole;
                    if (role && rule.userRoles.includes(role)) {
                        return rule.result !== undefined ? rule.result : true;
                    } else {
                        continue;
                    }
                }
                return rule.result !== undefined ? rule.result : true;
            }
            continue;
        }

        // If rule matches nothing specific, consider it a fallback "on"

    }

    // no rules matched => disabled / default
    return false;
}

/**
 * getFeatureState(name, defaultValue, context)
 * - defaultValue is used when flag missing or on fetch error.
 * - context is optional and passed to evaluator for rule arrays.
 * Returns Promise resolving to evaluated feature value (boolean or non-boolean).
 */
function getEvaluatedValue(defaultValue) {
    return fetchInstance.then((flags) => {
        const raw = getValue(flags, featureName, defaultValue);
        return evaluateFeatureValue(raw, context);
    }).catch(() => defaultValue);
}

function getFeatureState(featureName, defaultValue, context = {}) {
    const hasData = Object.keys(Cache.featureFlags).length > 0;
    if (isCacheFresh() && hasData) {
        console.log('Returning from [CACHE]', featureName);
        const raw = getValue(Cache.featureFlags, featureName, defaultValue);
        return Promise.resolve(evaluateFeatureValue(raw, context));
    }

    if (fetchInstance && typeof fetchInstance.then === 'function') {
        return getEvaluatedValue(defaultValue)
    }

    fetchInstance = fetchAllFeatures()
        .then((flags) => {
            Cache.featureFlags = flags || {};
            Cache.timeStamp = Date.now();
            return Cache.featureFlags;
        })
        .catch((err) => {
            return defaultValue
        })
        .finally(() => {
            fetchInstance = null;
        });

    return getEvaluatedValue(defaultValue)
}

/* ------------- Examples ------------- */

// simple boolean
getFeatureState('show_dialog_box', false).then((val) => {
    console.log('show_dialog_box ->', val); // true
});

// missing flag -> default
getFeatureState('non_existent', 'not-found').then((val) => {
    console.log('non_existent ->', val); // 'not-found'
});

// rule: pie_chart: [{ userRoles: ['admin'] }]
getFeatureState('pie_chart', false, { userRole: 'admin' }).then((val) => {
    console.log('pie_chart for admin ->', val); // true (first rule matches)
});
getFeatureState('pie_chart', false, { userRole: 'user' }).then((val) => {
    console.log('pie_chart for user ->', val); // false
});

// complex rules: data_table has two rules
// 1) { percentageOfUsers: 0.1, userRoles: ['user'] }  // 10% of 'user' role
// 2) { userRoles: ['admin', 'tester'] }               // admins/testers always see
// Example: admin should see
getFeatureState('data_table', false, { userRole: 'admin' }).then((val) => {
    console.log('data_table admin ->', val); // true
});
// Example: user with roll 0.05 (<= 0.1) should see
getFeatureState('data_table', false, { userRole: 'user', roll: 0.05 }).then((val) => {
    console.log('data_table user roll 0.05 ->', val); // true (10% rollout matched)
    // Example: user with roll 0.5 won't see
    getFeatureState('data_table', false, { userRole: 'user', roll: 0.5 }).then((val) => {
        console.log('data_table user roll 0.5 ->', val); // false
    });
});
