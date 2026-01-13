
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





// 🧠 Rules of Hooks Explained With Fiber Internals

// 🔹 Quick Fiber Recap

// Each component has a Fiber node.

// Hooks are stored in a linked list or array on the Fiber node.

// Fiber tracks hook state, memoized values, and effects.

// React matches hooks by call order, not by name.

// Fiber
//  └─ hooks: [hook0, hook1, hook2, ...]

// ✅ RULE 1: Call Hooks Only at the Top Level

// Fiber Reason

// React relies on hookIndex during render.

// hookIndex increments for each hook call:

// hookIndex = 0
// useState() → hooks[0]
// useEffect() → hooks[1]


// If you put hooks in a condition or loop, hookIndex may change across renders:

// 1st render: hookIndex=0 → useState() (runs)
// 2nd render: condition false → useState skipped


// ➡️ Fiber reads hooks[0] expecting useState → gets wrong state → corruption.

// Summary

// Top-level calls = stable hookIndex

// Conditions/loops = unstable hookIndex → broken Fiber state

// ✅ RULE 2: Call Hooks Only From React Functions

// Fiber Reason

// Fiber expects hooks only on components or custom hooks.

// If you call hooks in normal functions, there is no Fiber context.

// React doesn’t know where to store state, which Fiber node owns the hook.

// Internal View
// No Fiber → No hooks array → React cannot store state


// React will throw: “Hooks can only be called inside the body of a function component.”

// ✅ RULE 3: Hook Order Must Be Stable

// Fiber Reason

// Each Fiber node stores hook state in an array/list.

// On each render:

// hookIndex = 0
// currentFiber.hooks[hookIndex++] → returns hook state


// If the order changes, hookIndex will point to the wrong hook:

// useState may be read as useEffect

// useReducer may be read as useMemo

// Fiber state mismatches → runtime bugs

// ✅ RULE 4: Effects Must Clean Up

// Fiber Reason

// Fiber tracks effects in effect list on the Fiber node:

// currentFiber.effectTag → includes useEffect/useLayoutEffect


// During commit:

// Fiber iterates effect list

// Runs cleanup if present

// Runs new effect

// If you don’t clean up:

// Old effect remains in effect list

// Memory leaks, duplicate subscriptions

// Fiber cannot safely reuse slots in next render

// ✅ RULE 5: Render Must Be Pure

// Fiber Reason

// Render phase is interruptible in Concurrent Mode.

// Fiber may pause, discard, or restart render.

// Side effects in render → run multiple times or be partially applied → inconsistent state.

// BAD: fetch inside render → may run twice
// GOOD: fetch inside useEffect → only after commit

// ✅ RULE 6: Declare All Dependencies (useEffect/useMemo)

// Fiber Reason

// Fiber stores effect dependencies for reconciliation:

// effect.deps → list of dependencies


// On update:

// Fiber compares new deps vs old deps

// Decides whether to re-run effect

// Missing deps → Fiber may skip re-running an effect or run stale closure → inconsistent UI

// 🔹 Fiber Hook Lifecycle (Simplified)
// Render Phase:
//   - Fiber walks hooks array
//   - hookIndex increments for each hook call
//   - Builds new Fiber tree
//   - Pure computation only

// Commit Phase:
//   - Fiber commits DOM updates
//   - Runs effect cleanups + effects

// Concurrent Mode:
//   - Render can be paused
//   - Fiber may discard partially built tree


// Stable hook order = Fiber can safely pause/resume

// Impure render = Fiber may discard updates incorrectly

// 🧩 Mental Model
// Fiber sees hooks as numbered slots:
// Slot 0 = hook0
// Slot 1 = hook1
// Slot 2 = hook2
// ...
// Rules of Hooks protect slot consistency


// Call hooks out-of-order → slot mismatch → corrupted Fiber → buggy UI

// 🎯 Interview-Ready Summary

// React hooks rules exist to protect the Fiber’s internal hook state. Fiber stores hooks in a list per component, incremented in call order. Violating the rules (conditional hooks, loops, or non-component calls) breaks the mapping between hook calls and Fiber slots, causing state mismatches and rendering bugs, especially in concurrent mode.


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
//   ============================================================ */

//   const container = document.getElementById("root");

//   /* ============================================================
//      STEP 4: Create a React Root (React 18+)
//      ------------------------------------------------------------
//      INTERNALS CREATED:
//      - FiberRootNode
//      - HostRoot Fiber
//      - Lane map (priorities)
//      - Root update queue
//      - Concurrent rendering enabled
//   ============================================================ */

//   const root = ReactDOM.createRoot(container);

//   /* ============================================================
//      STEP 5: Schedule render work
//      ------------------------------------------------------------
//      INTERNAL FLOW:
//      - root.render() creates an Update object
//      - Lane assigned (Sync / Default)
//      - Update enqueued on root
//      - Scheduler notified
//   ============================================================ */

//   root.render(heading);

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



