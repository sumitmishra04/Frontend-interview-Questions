import React, {
    useState,
    useEffect,
    useMemo,
    createContext,
    useContext,
} from 'react';

const TabContext = createContext();
const useActiveIdForTabStore = () => {
    const [activeTab, setActiveTab] = useState(null);
    return useMemo(
        () => ({ activeTab, setActiveTab }),
        [activeTab, setActiveTab]
    );
};

const TabProvider = ({ children }) => {
    const store = useActiveIdForTabStore();
    return <TabContext.Provider value={store}>{children}</TabContext.Provider>;
};

const useTabStore = () => {
    return useContext(TabContext);
};

const Tab = ({ label, id, defaultActive }) => {
    const { activeTab, setActiveTab } = useTabStore();

    useEffect(() => {
        if (defaultActive) {
            setActiveTab(id);
        }
    }, [defaultActive, id]);

    const isActive = activeTab === id;
    const className = isActive ? 'active' : '';

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
            const idx = tabs.findIndex((t) => t.id === `tab-${id}`);
            const next = tabs[idx + 1];
            if (next) {
                next.focus();
                next.click();
            }
            return;
        }
        if (e.key === 'ArrowLeft') {
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
            const idx = tabs.findIndex((t) => t.id === `tab-${id}`);
            const next = tabs[idx - 1];
            if (next) {
                next.focus();
                next.click();
            }
            return;
        }
    };

    return (
        <button
            id={`tab-${id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${id}`}
            className={className}
            onClick={() => setActiveTab(id)}
            data-tab-id={id}
            onKeyDown={handleKeyDown}
        >
            {label}
        </button>
    );
};

const TabPanel = ({ tabId, children, unmountOnHide = true }) => {
    const { activeTab } = useTabStore();
    const isActive = activeTab === tabId;

    if (unmountOnHide && !isActive) {
        return null;
    }

    // when not unmounting, keep in DOM but hide visually and for screen readers
    return (
        <div
            id={`panel-${tabId}`}
            role="tabpanel"
            aria-labelledby={`tab-${tabId}`}
            hidden={!isActive}
            aria-hidden={!isActive}
            style={!isActive ? { display: 'none' } : undefined}
        >
            {children}
        </div>
    );
};

export { useTabStore, Tab, TabPanel, TabProvider };

import React, { lazy, Suspense } from 'react';
const TestComponent = lazy(() => delayForDemo(() => import('./Test')));
// import { useTabStore, Tab, TabPanel, TabProvider } from './Tabs.jsx';
import './style.css';

export default function App() {
    return (
        <TabProvider>
            <div>
                <Tab id="tab1" label="Home"></Tab>
                <Tab id="tab2" label="About" defaultActive></Tab>
            </div>
            <div>
                <TabPanel tabId="tab1">This is home section</TabPanel>
                <TabPanel tabId="tab2">
                    <Suspense fallback={<div>Loading...</div>}>
                        <TestComponent />
                    </Suspense>
                </TabPanel>
            </div>
        </TabProvider>
    );
}
const delayForDemo = (importPromiseFn, ms = 1000) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            importPromiseFn().then(resolve, reject);
        }, ms);
    });
