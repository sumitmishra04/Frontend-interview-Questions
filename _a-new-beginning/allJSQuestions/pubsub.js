class Store {
    #subscribers = new Map();
    #nextId = 1;

    constructor() {
        this.onError = null;
    }

    subscribe(cb) {
        if (typeof cb !== 'function') {
            throw new TypeError('subscribe expects a function');
        }

        const id = this.#nextId++;
        this.#subscribers.set(id, cb);

        let removed = false;
        return () => {
            if (removed) return;
            removed = true;
            this.#subscribers.delete(id)
        };
    }

    // --------------------------------------------------
    // SYNC PUBLISH  (Immediate, deterministic)
    // --------------------------------------------------
    syncPublish(...args) {
        const snapshot = Array.from(this.#subscribers.entries());
        for (const [, cb] of snapshot) {
            try {
                cb(...args);
            } catch (err) {
                if (typeof this.onError === 'function') {
                    try {
                        this.onError(err, cb);
                    }
                    catch (e) {
                        console.error('onError threw:', e);
                    }
                } else {
                    console.error('subscriber error:', err);
                }
            }
        }
    }

    // --------------------------------------------------
    // ASYNC PUBLISH (Microtask, non-blocking)
    // --------------------------------------------------
    asyncPublish(...args) {
        const snapshot = Array.from(this.#subscribers.entries());


        queueMicrotask(() => {
            for (const [, cb] of snapshot) {
                try {
                    cb(...args);
                } catch (err) {
                    if (typeof this.onError === 'function') {
                        try { this.onError(err, cb); } catch (e) {
                            console.error('onError threw:', e);
                        }
                    } else {
                        console.error('subscriber error:', err);
                    }
                }
            }
        });
    }

    subscribeAndRunNow(cb, ...invokeArgs) {
        const unsub = this.subscribe(cb);
        try { cb(...invokeArgs); } catch (err) { this._handleError(err, cb); }
        return unsub;
    }
}

/* Demonstration */
const s = new Store();

s.subscribe(() => console.log('A'));
s.subscribe(() => {
    console.log('B (will add D during publish)');
    // subscribe during publish
    s.subscribe(() => console.log('D (added during publish)'));
});
s.subscribe(() => console.log('C'));

s.publish();
// Console:
// A
// B (will add D during publish)
// C
// (D is NOT printed because it was added during the publish snapshot)

console.log('--- next publish ---');
s.publish();
// Console:
// A
// B (will add D during publish)
// C
// D


/** 
const s = new Store();

function greet() { console.log('hello'); }

// subscribe same fn twice
const u1 = s.subscribe(greet);
const u2 = s.subscribe(greet);

s.publish();
// hello
// hello

u1();         // only removes the first subscription
s.publish();
// hello       <- second subscription still present

u2();
s.publish();
// (nothing)
*/

/**
 
const x = new Store();

x.subscribe(msg => console.log('A:', msg));
x.subscribe(msg => console.log('B:', msg));

console.log('--- sync ---');
x.syncPublish('hello');

console.log('--- async ---');
x.asyncPublish('world');

console.log('end');
 */

/**
 const si = new StoreWithImmediate();

si.subscribe(() => console.log('A'));
si.subscribe(() => {
  console.log('B (will add & run D immediately)');
  si.subscribeAndRunNow(() => console.log('D immediate'));
});
si.subscribe(() => console.log('C'));

console.log('syncPublish with immediate-run inside B:');
si.syncPublish();
 */