
// React internals handle describing UI, finding changes, scheduling work, and updating the DOM — all automatically that is declarative UI , it means only tells what to do and forget about how it is done.

// One-Line Summary

//(1) React describes UI
//(2) Reconciler finds changes
//(3) Fiber manages work
//(4) Scheduler sets priority
//(5) React DOM updates the browser

// Your Components (App Code)
//         ↓
// React Internals (Engine)
//         ↓
// Browser DOM

// Important clarifications

// | Thing            | Role                                                     |
// | ---------------- | -------------------------------------------------------- |
// | **Babel**        | Converts JSX into plain JavaScript (`createElement`)     |
// | **React (core)** | Creates the **Virtual DOM** (React elements)             |
// | **Reconciler**   | Compares old and new Virtual DOM trees (diffing)         |
// | **Fiber**        | Breaks rendering into units of work and manages the tree |
// | **Scheduler**    | Decides **when** and **with what priority** work runs    |
// | **React DOM**    | Applies final changes to the **real browser DOM**        |


// Complete React render pipeline flow

// | Thing        | Role                   |
// | ------------ | ---------------------- |
// | Babel        | JSX → JavaScript       |
// | React (core) | Builds Virtual DOM     |
// | Reconciler   | Finds UI changes       |
// | Fiber        | Manages rendering work |
// | Scheduler    | Prioritizes work       |
// | Commit Phase | Applies DOM updates    |
// | React DOM    | Updates browser DOM    |
// | Event System | Handles browser events |


// Describe UI → Find changes → Schedule work → Commit DOM → Handle events

// Short answer (the fact)

// React does NOT compare the Real DOM with the Virtual DOM.
// React compares the old Fiber tree with the new Fiber tree.



        //   ┌─────────────────────┐
        //   │   Your Code / JSX   │
        //   │  <App /> / createEl │
        //   └─────────┬──────────┘
        //             │
        //             ▼
        //   ┌─────────────────────┐
        //   │    Babel Converts   │
        //   │ JSX → React.createEl│
        //   └─────────┬──────────┘
        //             │
        //             ▼
        //   ┌─────────────────────┐
        //   │      react          │
        //   │  (Core Library)     │
        //   │--------------------│
        //   │ Fiber Architecture  │
        //   │ Reconciler          │
        //   │ Scheduler (Lanes)   │
        //   │ Hooks System        │
        //   │ Context             │
        //   │ Effect Flags        │
        //   │ Concurrent Rendering│
        //   │ Error Boundaries    │
        //   └─────────┬──────────┘
        //             │
        //             ▼
        //   ┌─────────────────────┐
        //   │     react-dom       │
        //   │ (Renderer / Host)  │
        //   │--------------------│
        //   │ Commit Phase        │
        //   │ DOM mutations       │
        //   │ Synthetic Events    │
        //   │ Portals             │
        //   │ Hydration (SSR)     │
        //   │ Layout Effects      │
        //   │ Passive Effects     │
        //   │ DevTools Integration│
        //   └─────────┬──────────┘
        //             │
        //             ▼
        //   ┌─────────────────────┐
        //   │     Browser DOM     │
        //   │ & Browser Paint     │
        //   └─────────────────────┘


// (1) Your code / JSX → developer writes components

//(2) Babel → transpiles JSX into React.createElement()

//(3) React (core) → builds Fiber tree, runs Reconciler, manages hooks & scheduler

//(4) ReactDOM → commits changes to real DOM, handles events, portals, effects, hydration

//(5) Browser → updates and paints pixels



// +++All React Internals+++

// 1. React describes UI

// What happens

// You write JSX

// React turns JSX into React Elements (plain JS objects)

// These elements describe what the UI should look like, not how to build it

// Technique used

// Declarative UI + createElement()

//<button>Click</button>    Becomes: ====>  React.createElement("button", null, "Click")

// Key points

// No DOM manipulation here

// Just a description

// Cheap and fast

// 👉 React builds a Virtual DOM tree

// 2. Reconciler finds changes

// What happens

// React compares old Virtual DOM with new Virtual DOM

// Determines what changed:

// Added node

// Removed node

// Updated node

// Technique used

// Diffing algorithm (Reconciliation)

// Rules React uses:

// Same type → update

// Different type → replace

// Keys → identify list items

// <li key={id} />

// Output

// A list of updates, not DOM changes yet

// 👉 Reconciler answers: “What changed?

// 3. Fiber manages work

// What happens

// Each component becomes a Fiber node

// Rendering work is split into small units

// React can:

// Pause work

// Resume later

// Throw away unfinished work

// Technique used

// Fiber data structure + incremental rendering

// Fiber stores:

// State

// Props

// Effects

// Child & sibling links

// Parent
//  ├─ Child
//  └─ Sibling

// Why Fiber exists

// Before Fiber:

// Rendering was blocking

// With Fiber:

// Rendering is interruptible

// 👉 Fiber answers: “How should work be done?”

// 4. Scheduler sets priority

// What happens

// Not all updates are equally important

// Scheduler decides when to run work

// Technique used

// Priority queues + time slicing

// Priority examples:

// Click input → high priority

// Data fetch → low priority

// Background update → idle

// startTransition(() => {
//   setData(newData);
// });

// Result

// Urgent updates happen first

// UI stays responsive

// 👉 Scheduler answers: “When should work run?”

// 5. React DOM updates the browser

// What happens

// After all decisions are made

// React performs actual DOM mutations

// Technique used

// Commit phase (batched DOM updates)

// Examples:

// appendChild

// removeChild

// setAttribute

// Also runs:

// useLayoutEffect

// Ref updates

// Important rule

// ⚠️ This phase cannot be interrupted

// 👉 React DOM answers: “Apply changes now”

// Full Pipeline (One View)

//  → JSX
//  → React.createElement (describe UI)
//  → Virtual DOM
//  → Fiber (split work)
//  → Reconciler (diffing)
//  → Scheduler (prioritize)
//  → Commit Phase
//  → Browser DOM

// | Step       | Role           | Technique                     |
// | ---------- | -------------- | ----------------------------- |
// | React      | Describe UI    | Declarative UI, Virtual DOM   |
// |  Fiber     |  Manage work   |  Fiber data structure         |
// | Reconciler | Find changes   |   Diffing algorithm           |
// | Scheduler  | Set priority   | Time slicing, priority queues |
// | React DOM  | Update browser | Commit phase DOM mutations    |

// One-Line Mental Model

// Describe → Compare → Plan → Schedule → Commit


// React’s internal pipeline, explained like a machine.

// ┌──────────────────────────────────────────────────────────────┐
// │ 1️⃣ JSX (WHAT YOU WRITE)                                     │
// │                                                              │
// │  <App />                                                     │
// │                                                              │
// │  WHAT:                                                       │
// │  - Looks like HTML                                           │
// │                                                              │
// │  WHY:                                                        │
// │  - Easier to read and write UI                               │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Browser cannot understand JSX                             │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │ Compile time (before browser runs code)
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 2️⃣ JSX → JavaScript (BABEL)                                 │
// │                                                              │
// │  React.createElement(...)                                    │
// │                                                              │
// │  WHAT:                                                       │
// │  - JSX converted to plain JS function calls                  │
// │                                                              │
// │  WHY:                                                        │
// │  - Browsers only understand JavaScript                       │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Happens once during build                                 │
// │  - No runtime cost                                           │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │ Runtime
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 3️⃣ REACT ELEMENT (BLUEPRINT OBJECT)                          │
// │                                                              │
// │  {                                                           │
// │    type: App,                                                │
// │    props: {},                                                │
// │    key: null                                                 │
// │  }                                                           │
// │                                                              │
// │  WHAT:                                                       │
// │  - Plain JS object describing UI                             │
// │                                                              │
// │  WHY:                                                        │
// │  - Easy to compare                                           │
// │  - Cheap to create                                           │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Immutable (never changes)                                 │
// │  - Re-created on every render                                │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │ render()
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 4️⃣ FIBER NODE (WORK UNIT)                                   │
// │                                                              │
// │  React Element → Fiber Node                                  │
// │                                                              │
// │  WHAT:                                                       │
// │  - Internal data structure                                   │
// │  - One Fiber per component                                   │
// │                                                              │
// │  WHY:                                                        │
// │  - Track state, effects, and updates                         │
// │  - Pause / resume rendering                                  │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Linked as a tree (child, sibling, parent)                 │
// │  - Stores previous and next state                            │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 5️⃣ UPDATE QUEUE (STATE CHANGES)                             │
// │                                                              │
// │  setState / setCount                                         │
// │                                                              │
// │  WHAT:                                                       │
// │  - Updates are queued, not applied instantly                 │
// │                                                              │
// │  WHY:                                                        │
// │  - Batch multiple updates                                    │
// │  - Avoid unnecessary renders                                 │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Updates are async (usually)                               │
// │  - Batched automatically                                    │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 6️⃣ RECONCILIATION (DECIDE WHAT CHANGED)                     │
// │                                                              │
// │  Old Fiber Tree  vs  New Fiber Tree                          │
// │                                                              │
// │  WHAT:                                                       │
// │  - Compare previous UI description with new one              │
// │                                                              │
// │  WHY:                                                        │
// │  - Change only what is needed                                 │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Uses keys to match elements                               │
// │  - Assumes same type = same component                        │
// │  - Pure calculation (NO DOM changes)                         │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 7️⃣ SCHEDULER (WHEN TO WORK)                                 │
// │                                                              │
// │  Priority-based execution                                    │
// │                                                              │
// │  WHAT:                                                       │
// │  - Controls timing of rendering work                         │
// │                                                              │
// │  WHY:                                                        │
// │  - Keep app responsive                                       │
// │  - Avoid blocking user input                                 │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - User input > state updates > background work              │
// │  - Can pause and resume work                                 │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 8️⃣ RENDER PHASE (BUILD PLAN)                                │
// │                                                              │
// │  "How should UI look?"                                       │
// │                                                              │
// │  WHAT:                                                       │
// │  - Builds a list of effects                                  │
// │                                                              │
// │  WHY:                                                        │
// │  - Separate thinking from doing                              │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Can run multiple times                                    │
// │  - Can be interrupted                                       │
// │  - No DOM mutation                                           │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 9️⃣ COMMIT PHASE (DO THE CHANGES)                            │
// │                                                              │
// │  DOM updates happen here                                     │
// │                                                              │
// │  WHAT:                                                       │
// │  - Apply changes to real DOM                                 │
// │                                                              │
// │  WHY:                                                        │
// │  - Browser needs actual instructions                         │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Runs synchronously                                        │
// │  - Cannot be paused                                         │
// │  - useLayoutEffect runs here                                 │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 🔟 EFFECTS PHASE (AFTER PAINT)                               │
// │                                                              │
// │  useEffect()                                                 │
// │                                                              │
// │  WHAT:                                                       │
// │  - Side effects                                              │
// │                                                              │
// │  WHY:                                                        │
// │  - Fetch data                                                │
// │  - Subscriptions                                             │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Runs after browser paint                                  │
// │  - Does NOT block UI                                         │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 1️⃣1️⃣ RENDERER (PLATFORM-SPECIFIC)                          │
// │                                                              │
// │  ReactDOM / React Native                                     │
// │                                                              │
// │  WHAT:                                                       │
// │  - Converts effects to platform output                       │
// │                                                              │
// │  WHY:                                                        │
// │  - Same React core works everywhere                          │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Web → DOM                                                 │
// │  - Native → Native UI                                       │
// └───────────────┬──────────────────────────────────────────────┘
//                 │
//                 ▼
// ┌──────────────────────────────────────────────────────────────┐
// │ 🎉 FINAL UI                                                  │
// │                                                              │
// │  User sees updated screen                                    │
// │                                                              │
// │  DEFAULT BEHAVIOR:                                           │
// │  - Only changed parts re-render                              │
// │  - Fast and responsive                                      │
// └──────────────────────────────────────────────────────────────┘


// 🔴 Legacy Rendering — Definition

// Legacy rendering is React’s old rendering model where all rendering work runs synchronously and blocks the browser until it finishes.

// React must finish rendering everything once it starts

// The browser cannot respond to user input during rendering

// No prioritization between updates

// Used by default in React ≤ 17 and with ReactDOM.render()

// In short:

// Legacy rendering does all the work in one go and freezes the UI until it’s done.

// 🟢 Concurrent Rendering — Definition

// Concurrent rendering is React’s modern rendering model where rendering work can be paused, resumed, or abandoned, allowing React to prioritize important updates and keep the UI responsive.

// Rendering work is interruptible

// Updates are priority-based

// React can prepare UI in the background

// Enabled in React 18+ with createRoot()

// In short:

// Concurrent rendering lets React work in small chunks and focus on what matters most to the user.

// ⚖️ One-Line Comparison
// Legacy Rendering    → Finish everything now (blocking)
// Concurrent Rendering→ Do important things first (non-blocking)

// Legacy rendering blocks the main thread until rendering completes, while concurrent rendering allows React to pause, prioritize, and resume rendering to keep the UI responsive.

// ┌─────────────────────┬──────────────┬──────────────────────┐
// │ Feature             │ Legacy       │ Concurrent           │
// ├─────────────────────┼──────────────┼──────────────────────┤
// │ Rendering           │ Blocking     │ Interruptible        │
// │ Scheduling          │ None         │ Priority-based       │
// │ UI Responsiveness   │ Poor         │ Smooth               │
// │ Update Batching     │ Limited      │ Automatic            │
// │ Suspense            │ Limited      │ Full support         │
// │ Transitions         │ ❌ No        │ ✅ Yes              │
// └─────────────────────┴──────────────┴──────────────────────┘

// 🧪 Example: Typing in an Input

// Legacy Rendering
// User types "A"
// → Big render starts
// → Input freezes
// → UI updates after render

// Concurrent Rendering
// User types "A"
// → High priority update
// → Input updates immediately
// → Low priority render continues later

// 🔀 Priority Levels (Simplified)
// HIGH    → User input, clicks, typing
// MEDIUM  → State updates, animations
// LOW     → Data fetching, transitions

// ⚡ Step-by-Step React Render Pipeline With Hooks + Fiber

//example

// Component:
// function Counter() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");
//   useEffect(() => console.log(count), [count]);
//   return <div>{count} - {text}</div>;
// }

// 1️⃣ Render Phase (Build Fiber Tree)

// Fiber Node for Counter created:

// Fiber {
//   type: Counter
//   hooks: []
//   child: null
//   sibling: null
// }

// hookIndex = 0

// Step-by-step:

// | Step | Hook Call      | Fiber Action                  | hookIndex | Notes                         |
// | ---- | -------------- | ----------------------------- | --------- | ----------------------------- |
// | 1    | useState(0)    | Create hook state in hooks[0] | 1         | Hook slot #0                  |
// | 2    | useState("")   | Create hook state in hooks[1] | 2         | Hook slot #1                  |
// | 3    | useEffect(...) | Schedule effect               | 3         | Stored in Fiber’s effect list |
// | 4    | Return JSX     | Build virtual DOM             | 3         | Pure render, no DOM mutation  |

// Why it matters:

// hookIndex ensures state is assigned to the correct slot.

// Pure computation only — no DOM updates yet.

// Concurrent mode can pause here safely.

// 🔢 What Is “Order” in React Hooks?

// Order = the sequence number of hook calls during render

// Example:

// function Component() {
//   useState();      // 1️⃣ first hook
//   useEffect();     // 2️⃣ second hook
//   useMemo();       // 3️⃣ third hook
// }


// This order must be identical on every render.

// 🧩 How React Sees This Internally

// React does something like this:

// hooks = []

// render:
//   hookIndex = 0

//   useState()   → hooks[0]
//   useEffect()  → hooks[1]
//   useMemo()    → hooks[2]


// On the next render, React assumes:

// 1st hook call → hooks[0]
// 2nd hook call → hooks[1]
// 3rd hook call → hooks[2]


// React does not check what hook you called — it just moves to the next slot.

// 2️⃣ Reconciliation (Diff Old vs New Fiber)

// Old Fiber:
// hooks[0] = 0
// hooks[1] = ""
// effect list: []

// New Fiber:
// hooks[0] = 0
// hooks[1] = ""
// effect list: console.log(count)

// What happens:

// Compare new Fiber tree with old Fiber tree.

// Decide which updates are needed.

// No DOM changes yet.

// Assign “update flags” to Fiber nodes:

// Placement

// Update

// Deletion

// PassiveEffect

// Why:

// Minimizes actual DOM mutations.

// Prepares work units for commit.

// 3️⃣ Scheduler / Priority Handling (Concurrent Mode)

// Updates are placed in lanes:

// User input → HIGH priority
// Effect updates → MEDIUM priority
// startTransition → LOW priority

// Scheduler breaks Fiber work into units:
// - Can pause if user types
// - Can resume later
// - Can discard unfinished work


// Fiber internal:

// Keeps track of which units are complete.

// Keeps hookIndex intact across pauses.

// 4️⃣ Commit Phase (Apply Changes)

// Fiber walks update flags:

// - DOM mutation:
//     div content updated to "{count} - {text}"
// - Effects:
//     useEffect scheduled to run after paint


// Important:

// DOM changes are synchronous.

// Layout effects (useLayoutEffect) run before paint.

// Passive effects (useEffect) run after paint.

// 5️⃣ Effects Phase

// Fiber effect list:
// - hooks[2] = useEffect(console.log(count))

// Execution order:
// 1. Cleanup (if any from previous render)
// 2. Run new effect
//    → console.log(count)


// Notes:

// Each effect is tied to its Fiber hook slot.

// Cleanup is required to prevent leaks

// 6️⃣ Next Render (State Update)

// setCount(1) called → HIGH priority

// Fiber pipeline repeats:

// 1️⃣ Render phase → Fiber reads hooks[0] → returns current count
// 2️⃣ Fiber reconciles → flags updated
// 3️⃣ Scheduler checks priority → high → commit ASAP
// 4️⃣ Commit phase → update DOM
// 5️⃣ Effects phase → run useEffect


// Hook slots remain stable:

// hooks[0] → count

// hooks[1] → text

// hooks[2] → effect



// <script>
//   /* ============================================================
//      STEP -1: JSX Authoring (Developer Experience)
//      ------------------------------------------------------------
//      - Developer writes JSX syntax
//      - Browser does NOT understand JSX
//      - React does NOT receive JSX directly
//   ============================================================ */

//   /* ============================================================
//      STEP 0: Babel Transpilation (Compile-Time Step)
//      ------------------------------------------------------------
//      INTERNALS:
//      - Babel parses JSX into an AST
//      - JSX is transformed into React.createElement calls
//      - This happens BEFORE React runtime executes
//      - Babel is NOT part of React
//      - Output is plain JavaScript
     
//      Example:
//        <h1>Hello React!</h1>
//      becomes:
//        React.createElement("h1", null, "Hello React!")
//   ============================================================ */

//   /* ============================================================
//      STEP 1: React Element Creation (Virtual DOM node)
//      ------------------------------------------------------------
//      INTERNAL STRUCTURE:
//      {
//        $$typeof: Symbol(react.element),
//        type: "h1",
//        key: null,
//        ref: null,
//        props: { children: "Hello React!" },
//        _owner: null
//      }
//   ============================================================ */

//   const heading = React.createElement(
//     "h1",
//     null,
//     "Hello React!"
//   );

//   /* ============================================================
//      STEP 2: Browser loads React & ReactDOM (via CDN)
//      ------------------------------------------------------------
//      INTERNALS:
//      - Fiber reconciler initialized
//      - Scheduler initialized
//      - DOM host config registered
//      - Event system set up
//   ============================================================ */

//   /* ============================================================
//      STEP 3: Select the root DOM container
//      ------------------------------------------------------------
//      - Real DOM node
//      - Root attachment point
//   ==> const container = document.getElementById("root");
//   ============================================================ */

//   /* ============================================================
//      STEP 4: Create a React Root (React 18+)
//      ------------------------------------------------------------
//      INTERNALS CREATED:
//      - FiberRootNode
//      - HostRoot Fiber
//      - Lane map (priorities)
//      - Root update queue
//      - Concurrent rendering enabled
//   ==> const root = ReactDOM.createRoot(container);  
//   ============================================================ */

//   /* ============================================================
//      STEP 5: Schedule render work
//      ------------------------------------------------------------
//      INTERNAL FLOW:
//      - root.render() creates an Update object
//      - Lane assigned (Sync / Default)
//      - Update enqueued on root
//      - Scheduler notified
//   ==> root.render(heading);
//   ============================================================ */

//   /* ============================================================
//      STEP 6: Scheduler (Task Prioritization)
//      ------------------------------------------------------------
//      INTERNALS:
//      - Lanes determine priority
//      - Time slicing possible
//      - Work may pause/resume
//   ============================================================ */

//   /* ============================================================
//      STEP 7: Render Phase (Reconciliation)
//      ------------------------------------------------------------
//      INTERNAL MECHANICS:
//      - beginWork() creates child fibers
//      - compare against current fibers
//      - Pure, interruptible phase
//      - No DOM mutations
//   ============================================================ */

//   /* ============================================================
//      STEP 8: Fiber Node Structure
//      ------------------------------------------------------------
//      Fiber {
//        tag,
//        type,
//        key,
//        stateNode,
//        return,
//        child,
//        sibling,
//        memoizedProps,
//        pendingProps,
//        lanes,
//        flags
//      }
//   ============================================================ */

//   /* ============================================================
//      STEP 9: Complete Phase
//      ------------------------------------------------------------
//      INTERNALS:
//      - completeWork()
//      - Prepare DOM nodes
//      - Bubble effect flags upward
//      - Finalize effect list
//   ============================================================ */

//   /* ============================================================
//      STEP 10: Commit Phase (Non-interruptible)
//      ------------------------------------------------------------
//      SUB-PHASES:
//      1. Before Mutation
//      2. Mutation (DOM updates)
//      3. Layout (useLayoutEffect)
//   ============================================================ */

//   /* ============================================================
//      STEP 11: DOM Mutation (Host Config)
//      ------------------------------------------------------------
//      INTERNALS:
//      - createInstance()
//      - createTextInstance()
//      - appendInitialChild()
//      - commitPlacement()
//   ============================================================ */

//   /* ============================================================
//      STEP 12: Passive Effects Phase
//      ------------------------------------------------------------
//      INTERNALS:
//      - useEffect callbacks executed
//      - Runs AFTER browser paint
//   ============================================================ */

//   /* ============================================================
//      STEP 13: Browser Paint
//      ------------------------------------------------------------
//      - Layout calculation
//      - Paint
//      - Composite
//      - Pixels shown on screen
//   ============================================================ */

// </script>


// 🧠 Final Unified Mental Model (Latest React)
// JSX
// → Babel (AST → createElement)
// → React Element
// → FiberRoot + HostRoot Fiber
// → Scheduler (lanes)
// → Render Phase (reconciliation)
// → Commit Phase
// → DOM mutation
// → useEffect
// → Browser paint

// 🧠 Explanation

//(1) react → handles the “engine”:

// Fiber, Reconciler, Hooks, Scheduler, Context, and virtual DOM.

// Everything about describing UI and state management lives here.

//(2) react-dom → handles the “renderer / host”:

// Converts Fiber updates into real DOM changes.

// Manages events, hydration, portals, and commit phase.


// 💡 Key Notes

// Fiber, Scheduler, Reconciler → bundled in react, invisible to developers.

// Commit to DOM, layout effects, events → handled by react-dom.

// Hooks and JSX features → exposed via react.

// +----------------------+----------------------------------------------+-------------------------------------------------------------+
// | Library              | Public / Developer Features                  | Internal Features / Responsibilities                       |
// +----------------------+----------------------------------------------+-------------------------------------------------------------+
// | react                | - React.createElement                        | - Fiber architecture (component tree representation)      |
// |                      | - JSX support (via Babel)                     | - Reconciler (diff old vs new virtual DOM)                 |
// |                      | - Functional components                     | - Hooks system (useState, useEffect, useContext, etc.)    |
// |                      | - useState, useEffect, useContext, etc.      | - Update queues for state and props                        |
// |                      | - createContext                              | - Effect flags for commit phase                             |
// |                      | - memo, lazy, Suspense                        | - Scheduler / Lanes (Sync, Default, Transition)           |
// |                      | - Fragment                                   | - Concurrent rendering support                               |
// |                      | - StrictMode                                 | - Error boundaries & lifecycle logic                        |
// +----------------------+----------------------------------------------+-------------------------------------------------------------+
// | react-dom            | - createRoot                                 | - DOM renderer for host environment                         |
// |                      | - render / hydrateRoot                        | - Commit phase execution (DOM mutations)                    |
// |                      | - flushSync                                  | - Synthetic event system (delegation & normalization)       |
// |                      | - findDOMNode (legacy)                        | - Portals support                                           |
// |                      |                                              | - Hydration support (SSR / streaming)                       |
// |                      |                                              | - Effect handling (useLayoutEffect, passive effects)        |
// |                      |                                              | - Fiber host config (DOM node creation & placement)         |
// |                      |                                              | - DevTools integration                                      |
// +----------------------+----------------------------------------------+-------------------------------------------------------------+



                // ┌───────────────┐
                // │   Your Code   │
                // │  JSX / create │
                // │   Element()   │
                // └───────┬───────┘
                //         │
                //         ▼
                // ┌───────────────┐
                // │   Babel       │  (only if JSX used)
                // │ JSX → create  │
                // │ React.createEl│
                // └───────┬───────┘
                //         │
                //         ▼
                // ┌──────────────────────┐
                // │       react          │
                // │ (Core Library)       │
                // │--------------------- │
                // │ Fiber Architecture   │
                // │ Reconciler           │
                // │ Scheduler (Lanes)    │
                // │ Hooks System         │
                // │ Context              │
                // │ Effect Flags         │
                // │ Concurrent Rendering │
                // └─────────┬────────────┘
                //           │
                //           ▼
                // ┌──────────────────────┐
                // │     react-dom        │
                // │ (Renderer Library)   │
                // │--------------------- │
                // │ DOM renderer / host  │
                // │ Commit Phase         │
                // │ Synthetic Events     │
                // │ Portals              │
                // │ Hydration (SSR)      │
                // │ useLayoutEffect      │
                // │ Passive Effects      │
                // └─────────┬────────────┘
                //           │
                //           ▼
                // ┌───────────────┐
                // │   Browser     │
                // │ Real DOM      │
                // │ Browser Paint │
                // └───────────────┘




// 🟢 LEVEL 1 — High-Level Mental Terminal
// ┌──────────────────────────────┐
// │       YOUR REACT CODE        │
// │  JSX + Components + Hooks    │
// └──────────────┬───────────────┘
//                ↓
// ┌──────────────────────────────┐
// │   JSX → createElement()      │
// │   (Compile Time via Babel)   │
// └──────────────┬───────────────┘
//                ↓
// ┌──────────────────────────────┐
// │     React Element Tree       │
// │   (Plain JS Objects)         │
// └──────────────┬───────────────┘
//                ↓
// ┌──────────────────────────────┐
// │        Fiber Tree            │
// │   (State + Effects + Links)  │
// └──────────────┬───────────────┘
//                ↓
// ┌──────────────────────────────┐
// │        Render Phase          │
// │   (Diff + Reconciliation)    │
// └──────────────┬───────────────┘
//                ↓
// ┌──────────────────────────────┐
// │        Commit Phase          │
// │   (DOM Mutation + Effects)   │
// └──────────────┬───────────────┘
//                ↓
// ┌──────────────────────────────┐
// │        Browser DOM           │
// │   (Painted UI)               │
// └──────────────────────────────┘

// 🟢 LEVEL 2 — JSX → Element (Terminal Trace)
// $ JSX detected
// $ Babel compiling...

// <App name="Rohit" />

// ↓ transpiles to ↓

// React.createElement(App, { name: "Rohit" })

// $ createElement() called
// $ Creating ReactElement object

// {
//   $$typeof: Symbol(react.element),
//   type: App,
//   key: null,
//   ref: null,
//   props: { name: "Rohit" }
// }


// 📌 Still NO DOM

// 🟢 LEVEL 3 — Element Tree Creation
// $ Building element tree...

// App (element)
//  └── h1 (element)
//      └── "Hello Rohit"

// $ Element tree ready
// $ Handing off to reconciler...

// 🟢 LEVEL 4 — Fiber Tree Creation (CORE ENGINE)
// $ Creating Fiber Nodes...
// $ Attaching state & hooks...
// $ Linking parent / child / sibling...

// FiberRoot
//  └── AppFiber
//      └── h1Fiber
//          └── textFiber("hello")


// Each fiber internally:

// fiber = {
//   type,             // Component or DOM tag
//   key,
//   stateNode,        // DOM node or component instance
//   child,
//   sibling,
//   return,           // parent
//   memoizedState,    // hooks state
//   updateQueue,
//   flags,            // side-effects
//   lanes             // priority
// }


// 🟢 LEVEL 5 — Render Phase (Calculation Only)
// $ ===== RENDER PHASE START =====
// $ Render is interruptible
// $ No DOM allowed

// Step-by-step traversal
// → Visiting Fiber: App
// → Executing function App()
// → Running hooks
// → Returned JSX

// → Visiting Fiber: h1
// → Comparing with previous fiber
// → Marking UPDATE flag

// $ Fiber flags set:
//   • Placement
//   • Update
//   • Deletion

// $ ===== RENDER PHASE END =====


// 📌 UI NOT updated yet

// 🟢 LEVEL 6 — Scheduler & Priority (Advanced)
// $ Scheduling update...
// $ Priority Lane: USER_INPUT
// $ Time slicing enabled

// $ Yielding control to browser...
// $ Resuming work...


// 📌 React can pause / resume / restart

// 🟢 LEVEL 7 — Commit Phase (DOM Mutation)
// $ ===== COMMIT PHASE START =====
// $ This phase is NOT interruptible

// 1️⃣ Before Mutation
// $ getSnapshotBeforeUpdate()

// 2️⃣ Mutation Phase
// $ Creating DOM nodes
// $ Updating attributes
// $ Removing old nodes

// DOM OP:
//   <h1>Hello Rohit</h1>

// 3️⃣ Layout Effects
// $ Running useLayoutEffect()

// 4️⃣ Browser Paint
// $ Browser painting pixels...

// 5️⃣ Passive Effects
// $ Running useEffect()

// $ ===== COMMIT PHASE END =====

// 🟢 LEVEL 8 — State Update Terminal Flow
// User clicks button
// ↓
// setCount(1)
// ↓
// Create update object
// ↓
// Push into hook queue
// ↓
// Mark fiber dirty
// ↓
// Schedule render
// ↓
// Repeat render → commit

// 🟢 LEVEL 9 — Concurrent Rendering (Hidden Reality)
// $ Starting render...
// $ New high priority update arrived!
// $ Aborting current render
// $ Restarting with latest state


// 📌 Render may run multiple times

// 🟢 LEVEL 10 — Strict Mode (DEV Only)
// $ StrictMode enabled
// $ Double invoking render()
// $ Double invoking effects()
// $ Checking purity...


// 📌 Helps catch bugs early

// 🟢 LEVEL 11 — Full One-Screen Master Diagram 🧠
// JSX
//  ↓
// createElement()
//  ↓
// React Element (Object)
//  ↓
// Fiber Node (State + Hooks)
//  ↓
// Work-In-Progress Fiber Tree
//  ↓
// Render Phase (Diff + Flags)
//  ↓
// Scheduler (Priority + Time Slice)
//  ↓
// Commit Phase
//    ├─ DOM Mutation
//    ├─ useLayoutEffect
//    ├─ Browser Paint
//    └─ useEffect
//  ↓
// Updated UI

// 🏆 FINAL MENTAL MODEL (REMEMBER THIS)
// Render = THINKING
// Commit = DOING


// React:

// Thinks a lot

// Touches DOM very little

// Re-thinks often

// Commits once



// 1️⃣ Complete React Render Pipeline (One View)
// JSX
//  ↓
// createElement
//  ↓
// Element Tree
//  ↓
// Fiber Tree
//  ↓
// Render Phase
//  ↓
// Scheduler
//  ↓
// Commit Phase
//  ↓
// DOM + Effects


// ___________________________________🖥️ Fiber Node — Internal Data Structure___________________________________


// 1️⃣ Fiber Node Concept

// Fiber = unit of work in React
// Each component / DOM node = one Fiber

// Fiber is a plain JS object, stored in a linked tree (parent, child, sibling).

// Fiber Lifecycle Connections

// FiberRootNode
//  ├─ current → points to current committed tree
//  └─ workInProgress → points to tree being built



// fiber = {
//   type,              // Component type (function, class, or DOM tag)
//   key,               // Key for list reconciliation
//   ref,               // Ref object (if any)
//   stateNode,         // DOM node or class instance
//   return,            // Parent fiber
//   child,             // First child fiber
//   sibling,           // Next sibling fiber
//   index,             // Child index in parent
//   memoizedProps,     // Last rendered props
//   pendingProps,      // New props to render
//   memoizedState,     // Last rendered state/hooks
//   updateQueue,       // Queue of pending state updates
//   effectTag,         // Flags (Placement / Update / Deletion)
//   nextEffect,        // Next fiber with side effect
//   firstEffect,       // First child effect
//   lastEffect,        // Last child effect
//   lanes,             // Priority lanes for scheduler
//   childLanes,        // Aggregated lanes of children
//   alternate          // Link to fiber of previous render (current ↔ workInProgress)
//   index: 0
// }

// 🖥️ Default Fiber Structure (Template)

// Every Fiber in React has a standard set of fields. Here’s the default structure:

// const FiberNode = {
//   // 1️⃣ Identification
//   type: null,             // Component type: function/class/string (host component)
//   key: null,              // Optional key for reconciliation
//   elementType: null,      // Original element type (may differ from type with memo, forwardRef)
//   stateNode: null,        // Actual DOM node (host fiber) or component instance (class fiber)
  
//   // 2️⃣ Tree structure
//   return: null,           // Parent fiber
//   child: null,            // First child fiber
//   sibling: null,          // Next sibling fiber
//   index: 0,               // Position among siblings

//   // 3️⃣ Props & State
//   pendingProps: null,     // New props for next render
//   memoizedProps: null,    // Last rendered props
//   memoizedState: null,    // Hook state (linked list of hooks)
//   updateQueue: null,      // Queue of pending updates (setState / useReducer)
  
//   // 4️⃣ Effect tracking
//   effectTag: NoFlags,     // What needs to be done in commit phase (Placement / Update / Deletion / Passive)
//   nextEffect: null,       // Next fiber in effect list
//   firstEffect: null,      // First child in effect list
//   lastEffect: null,       // Last child in effect list
  
//   // 5️⃣ Scheduling
//   lanes: NoLane,          // Priority of this fiber update
//   childLanes: NoLane,     // Aggregate lanes of children
  
//   // 6️⃣ Double buffering (alternate fiber)
//   alternate: null,        // Reference to alternate fiber for current ↔ workInProgress
  
//   // 7️⃣ Debug & other internal
//   _debugID: 0,            // DEV only, optional for profiling
//   _debugSource: null,     // JSX source info
//   _debugOwner: null,      // Fiber that created this one
// };


// Example Code

// function App() {
//   return <h1>Hello Rohit</h1>;
// }

// 1️⃣ Fiber Tree — Visual
// FiberRootNode
//  └─ AppFiber (FunctionComponent <App>)
//       └─ H1Fiber (HostComponent <h1>)


// FiberRootNode → Root of all fibers (container div in DOM)

// AppFiber → Function component <App>

// H1Fiber → Host component <h1> (actual DOM node)

// 2️⃣ Fiber Structure — Step by Step
// 🔹 FiberRootNode
// FiberRootNode = {
//   current: AppFiber,         // Committed tree
//   workInProgress: AppFiber,  // Tree being built during render
//   containerInfo: rootDiv,    // Actual DOM container
//   pendingLanes: NoLane       // Pending updates
// }


// Role: Entry point of the React app, manages current vs workInProgress fibers.

// 🔹 AppFiber — Function Component <App>
// AppFiber = {
//   type: App,                  // Function component
//   key: null,
//   stateNode: null,            // Function component → null
//   return: FiberRootNode,      // Parent fiber
//   child: H1Fiber,             // First child fiber
//   sibling: null,              // No sibling
//   pendingProps: {},           // Props passed to App
//   memoizedProps: {},          // Last rendered props
//   memoizedState: null,        // Hooks linked list (none in this example)
//   updateQueue: null,          // setState updates (none)
//   effectTag: Placement,       // Needs to be placed in DOM
//   nextEffect: H1Fiber,        // Next fiber in effect list
//   firstEffect: H1Fiber,       // First effect in subtree
//   lastEffect: H1Fiber,        // Last effect in subtree
//   lanes: SyncLane,            // Scheduler priority
//   childLanes: NoLane,         // Aggregate child lanes
//   alternate: null             // Alternate fiber (for concurrency)
// }


// Role:

// Runs component function <App>

// Creates child fiber for <h1>

// Part of effect list for DOM placement

// 🔹 H1Fiber — Host Component <h1>
// H1Fiber = {
//   type: 'h1',                 // Host component → renders actual DOM node
//   key: null,
//   stateNode: h1DOMNode,       // <h1> DOM node
//   return: AppFiber,           // Parent fiber
//   child: null,                // No children (text node is primitive)
//   sibling: null,              // No sibling
//   pendingProps: { children: 'Hello Rohit' }, // New render props
//   memoizedProps: { children: 'Hello Rohit' }, // Last rendered props
//   memoizedState: null,        // No hooks
//   updateQueue: null,          // No updates
//   effectTag: Placement,       // Place this DOM node
//   nextEffect: null,           // End of effect list
//   firstEffect: null,
//   lastEffect: null,
//   lanes: SyncLane,            // Priority lane
//   childLanes: NoLane,
//   alternate: null
// }


// Role:

// Leaf fiber → renders actual <h1> DOM node

// Stores DOM reference in stateNode

// Part of effect list to commit placement in DOM

// 🖥️ Combined Nested Fiber Tree — <App> + <h1>

// FiberRootNode
//  ├─ current → AppFiber (committed tree)
//  └─ workInProgress → building tree
//       └─ AppFiber (FunctionComponent <App>)
//            ├─ type: App
//            ├─ key: null
//            ├─ stateNode: null             // Function component → null
//            ├─ return: FiberRootNode
//            ├─ child: H1Fiber(Starts here)
//            ├─ sibling: null
//            ├─ pendingProps: {}
//            ├─ memoizedProps: {}
//            ├─ memoizedState: null
//            ├─ updateQueue: null
//            ├─ effectTag: Placement         // Needs to commit
//            ├─ nextEffect: H1Fiber
//            ├─ firstEffect: H1Fiber
//            ├─ lastEffect: H1Fiber
//            ├─ lanes: SyncLane
//            ├─ childLanes: NoLane
//            └─ alternate: null

//            └─ H1Fiber (HostComponent <h1>)
//                 ├─ type: 'h1'
//                 ├─ key: null
//                 ├─ stateNode: h1DOMNode       // Actual <h1> DOM
//                 ├─ return: AppFiber
//                 ├─ child: null                // Text primitive, no child fiber
//                 ├─ sibling: null
//                 ├─ pendingProps: { children: 'Hello Rohit' }
//                 ├─ memoizedProps: { children: 'Hello Rohit' }
//                 ├─ memoizedState: null
//                 ├─ updateQueue: null
//                 ├─ effectTag: Placement
//                 ├─ nextEffect: null            // End of effect list
//                 ├─ firstEffect: null
//                 ├─ lastEffect: null
//                 ├─ lanes: SyncLane
//                 ├─ childLanes: NoLane
//                 └─ alternate: null

// 🔹 Mental Mapping (Side-by-Side)

// [Old Fiber]                      [Work-in-Progress Fiber]
// AppFiber                          AppFiber (wip)
//   └─ child → H1Fiber                └─ child → H1Fiber (wip)
//        └─ stateNode <h1 DOM>           └─ stateNode <h1 DOM> (reused)
//        └─ props: 'Hello Rohit'         └─ pendingProps: 'Hello World'
//        └─ effectTag: NoFlags           └─ effectTag: Update

// _______________________________________🖥️🔥 MEGA FULL-WIDTH REACT TERMINAL PIPELINE

// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                                  YOUR CODE                                    │
// │                        <App /> + <Header /> + <Button />                      │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                            Babel / JSX compile                                 │
// │   <App /> → React.createElement(App, props)                                    │
// │   Returns immutable ReactElement objects { type, props, key, ref }            │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                          React Element Tree                                    │
// │ Immutable, plain JS objects: { type, props, key, ref }                         │
// │ Cheap to compare, no side effects                                             │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                                Fiber Tree                                      │
// │ Mutable, linked tree: child / sibling / return                                 │
// │ Double buffering: current ↔ workInProgress                                     │
// │ Each Fiber = unit of work with state/hooks/effects                             │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                            Fiber Node Example                                  │
// │ AppFiber                                                                         │
// │ ├─ type: FunctionComponent                                                      │
// │ ├─ memoizedProps: {…}                                                          │
// │ ├─ pendingProps: {…}                                                           │
// │ ├─ memoizedState → hook1 → hook2                                               │
// │ ├─ updateQueue: [setState(1)]                                                  │
// │ ├─ effectTag: Update                                                            │
// │ ├─ lanes: InputLane                                                             │
// │ ├─ child → HeaderFiber                                                          │
// │ ├─ sibling → FooterFiber                                                        │
// │ ├─ return → FiberRootNode                                                       │
// │ └─ alternate → currentFiber                                                     │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                               Hooks Internal                                  │
// │ AppFiber.memoizedState                                                           │
// │ ├─ hook1: useState                                                              │
// │ │   memoizedState: 0                                                            │
// │ │   queue: pending updates                                                      │
// │ │   next → hook2                                                                │
// │ ├─ hook2: useEffect                                                             │
// │ │   create: fetchData()                                                         │
// │ │   destroy: cleanupFn                                                          │
// │ │   deps: [url]                                                                │
// │ │   next → null                                                                │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                               Render Phase                                     │
// │ Think Phase: Diff & Reconcile                                                  │
// │ 1. Traverse Fiber Tree                                                          │
// │ 2. Execute component function                                                  │
// │ 3. Execute hooks in order                                                      │
// │ 4. Compute next children / diff                                               │
// │ 5. Compare with memoizedProps/state                                           │
// │ 6. Set effectTag flags                                                         │
// │ 7. Build effect list (firstEffect → lastEffect)                                │
// │ 8. Scheduler yields if time runs out (concurrent rendering)                    │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                           Scheduler / Lanes                                    │
// │ Priority lanes: Sync / Input / Default / Idle                                   │
// │ Time-slicing & yield control                                                   │
// │ High-priority updates may interrupt low-priority ones                          │
// │ Example:                                                                       │
// │ setCount() → InputLane                                                          │
// │ fetchData() → DefaultLane                                                       │
// │ startTransition() → IdleLane                                                   │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                           Effect List / Flags                                   │
// │ Only fibers with effectTag ≠ NoFlags                                           │
// │ firstEffect → HeaderFiber → AppFiber → ButtonFiber → lastEffect                │
// │ EffectTag examples: Placement, Update, Deletion, Passive, Ref, Snapshot       │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                              Commit Phase                                      │
// │ Do Phase: Atomic / Blocking Phase                                             │
// │ 1. Before Mutation: getSnapshotBeforeUpdate                                   │
// │ 2. Mutation Phase: DOM insertion / update / deletion                          │
// │    Example: <h1>Hello Rohit</h1> created                                      │
// │ 3. Layout Effects: useLayoutEffect()                                          │
// │    Runs synchronously before paint                                            │
// │ 4. Browser Paint: pixels rendered                                             │
// │ 5. Passive Effects: useEffect()                                               │
// │    Runs asynchronously after paint                                            │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                              DOM / UI Updated                                  │
// │ UI fully rendered & interactive                                               │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                           Re-render / Update Queue                             │
// │ setState() / props / context triggers                                          │
// │ Fiber marked dirty → schedule render                                           │
// │ High-priority interrupts lower-priority work                                   │
// │ Fiber double buffer: current ↔ workInProgress                                  │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                         Strict Mode (DEV Only)                                  │
// │ Double render of functions & effects                                           │
// │ Detect impure render / memory leaks                                            │
// │ Concurrent / interrupted render may run multiple times                         │
// └──────────────────────────────────────────────────────────────────────────────┘
//                                        ↓
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                             Hidden / Weird Internals                            │
// │ - Render may be discarded                                                      │
// │ - Effects run only after commit                                                 │
// │ - useMemo / useCallback caches references only                                  │
// │ - Context updates re-render all consumers                                      │
// │ - DOM updates batched                                                          │
// │ - Scheduler yields to browser to prevent jank                                  │
// └──────────────────────────────────────────────────────────────────────────────┘


