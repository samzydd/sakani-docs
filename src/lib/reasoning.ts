/**
 * The "why" behind each component, for people and for AI agents.
 *
 * Props tables say what a component takes; this says why it behaves the way
 * it does and where it is the wrong choice. Every entry is drawn from the
 * component's own source comments or its docs page -- if a behaviour isn't
 * documented there, it isn't claimed here. Keyed by the docs slug (the last
 * path segment). Rendered at the foot of each page by <WhyDont>, and included
 * in /llms-full.txt, so the site and the agent index share one source.
 */
export interface Reasoning {
  /** Why it is built / behaves this way. */
  why: string[];
  /** When it is the wrong choice, and what to use instead. */
  dont: string[];
}

export const reasoning: Record<string, Reasoning> = {
  button: {
    why: [
      "Five variants mirror the Figma set one-to-one, so a designer's choice maps to a prop with no translation.",
      "Hover, focus-visible and disabled are CSS states, not props: they are visual in Figma and semantic in code, and a prop would let them drift from the real interaction.",
      "A single filled primary marks the one action a view most wants. Two filled buttons compete, and neither reads as primary.",
    ],
    dont: [
      "Don't use it for navigation. A link goes somewhere, a button does something, and mixing them breaks keyboard and assistive-tech expectations. Use Link.",
      "Don't hand-style a <button> to look like one. You will miss hover, press, focus and loading behaviour, and every future improvement.",
      "Don't use it icon-only without a label. Use IconButton, which requires an aria-label.",
    ],
  },
  "icon-button": {
    why: [
      "It mirrors Button's variant colour logic in a square, so toolbars stay consistent with the rest of the system.",
      "aria-label is required because a glyph alone is unusable with a screen reader.",
    ],
    dont: [
      "Don't use it for an action whose icon isn't universally obvious. A labelled Button is clearer.",
      "Don't omit the aria-label to save space. Use a Tooltip for the sighted hint instead.",
    ],
  },
  badge: {
    why: [
      "Six colours by two emphasis levels cover status, category and count without a size axis: it is a label, not a control.",
      "Badges are borderless, matching Figma, so they sit on any surface without competing with it.",
    ],
    dont: [
      "Don't make it clickable. For an interactive filter use FilterChip.",
      "Don't use colour alone to carry meaning. Pair it with a word.",
    ],
  },
  link: {
    why: ["Links are for navigation and inline references. Keeping them distinct from Button keeps keyboard and screen-reader semantics honest."],
    dont: ["Don't use Link for a page-level call to action. Use Button.", "Don't use Button to navigate."],
  },
  card: {
    why: [
      "It is a container surface for one unit of content, optionally with actions. Hover is a CSS state; the one-, two- and three-button layouts come from the actions slots.",
    ],
    dont: ["Don't wrap everything in a Card as a layout shortcut. Nested cards add borders and weight without meaning."],
  },
  avatar: {
    why: [
      "The type is inferred from props: src gives an image, initials gives initials, otherwise an icon. There is no type prop to keep in sync.",
      "Image avatars get a 1px subtle ring, so photos with light edges don't bleed into the surface.",
    ],
    dont: [
      "Don't default to initials when you have a real photo. Initials are the fallback.",
      "Don't leave alt empty on a meaningful image. It is how the person is identified to assistive tech.",
    ],
  },
  alert: {
    why: [
      "It is an inline status message that belongs to the page or a section and stays until resolved, with a matching default icon per colour.",
      "It is announced to assistive tech as a live region, so important changes aren't silent.",
    ],
    dont: [
      "Don't use it for a transient confirmation. Use Toast.",
      "Don't use danger for something the user did not get wrong, such as a declined request. Use neutral, and say what can be done instead.",
    ],
  },
  accordion: {
    why: ["It offers content that is worth having but not worth showing all at once. Single or multiple items can be open."],
    dont: ["Don't hide content people need to compare or read in sequence. Show it, or use Tabs."],
  },
  divider: {
    why: ["A labelled divider (such as \"or\") makes alternatives in a form explicit without adding another container."],
    dont: ["Don't use dividers to prop up a weak layout. Use spacing first; add a rule only where grouping needs one."],
  },
  kbd: {
    why: ["It renders a real <kbd> element, so shortcuts are semantically marked as keys rather than styled text."],
    dont: ["Don't show shortcuts that aren't wired up. A hint that does nothing erodes trust."],
  },
  input: {
    why: [
      "It has a built-in visible label, because a placeholder is not a label and disappears as soon as someone types.",
      "Focus uses a stronger border rather than an accent ring; error uses the danger border and is unaffected by focus, so the problem stays visible while editing.",
    ],
    dont: [
      "Don't use it for a choice from a fixed list. Use Select, or Combobox for long lists.",
      "Don't drop the label to save space. Use size sm or an icon, and keep the label.",
    ],
  },
  textarea: {
    why: ["It matches Input's states exactly (focus, error, disabled), so a form mixing both feels like one system."],
    dont: ["Don't use it for short single-line values. Use Input."],
  },
  select: {
    why: [
      "It is a custom listbox, not a native <select>: the native one opens an operating-system dropdown that can't be styled, so the open state never matched the design.",
      "It is fully keyboard operable: Enter or Space opens, arrows move, Home and End jump, Escape closes.",
    ],
    dont: ["Don't use it for long or searchable lists. Use Combobox.", "Don't use it for two or three options. Radio or SegmentedControl is faster."],
  },
  combobox: {
    why: [
      "It filters as you type and supports single or multiple selection with chips, because searching a long list is a different task from picking from a short one.",
    ],
    dont: ["Don't use it for a handful of options. Select or Radio is lighter."],
  },
  checkbox: {
    why: ["It has an indeterminate state for \"some of the children are selected\", which a plain boolean cannot express."],
    dont: ["Don't use it for an immediate on/off that takes effect now. Use Switch.", "Don't use it for choosing exactly one. Use Radio."],
  },
  radio: {
    why: ["Radios sharing a name form a group where exactly one is chosen, and the browser provides the arrow-key behaviour."],
    dont: ["Don't use a single Radio on its own. Use Checkbox or Switch.", "Don't use radios for more than a handful of options. Use Select."],
  },
  switch: {
    why: ["A switch means the change applies immediately; that is the contract that separates it from a checkbox, which is applied on submit."],
    dont: ["Don't use it in a form that has a Save button. The state would look applied when it isn't. Use Checkbox."],
  },
  slider: {
    why: ["It is a real range input, so keyboard and assistive-tech behaviour are native; the filled track is driven by a CSS variable."],
    dont: ["Don't use it when people need an exact number. Pair it with an Input, or use an Input alone."],
  },
  "segmented-control": {
    why: ["It switches between two to six views or modes of the same content, with a single selected segment always visible."],
    dont: ["Don't use it to move between pages. Use Tabs or navigation.", "Don't use it for more than six segments."],
  },
  "file-upload": {
    why: ["Click to choose and drag-and-drop both work, with a list of selected files each removable, so people can correct a mistake before sending."],
    dont: ["Don't use it for a single profile photo. Use AvatarUpload."],
  },
  "avatar-upload": {
    why: [
      "Filled or empty is derived from whether src is set. With no src it shows the picked file itself; with src it is controlled and the parent owns what's shown.",
      "The picked file is always handed back through onFileSelect, because the component previews but does not upload.",
    ],
    dont: ["Don't expect it to upload. You own the network call.", "Don't use it for general files. Use FileUpload."],
  },
  label: {
    why: ["It wraps a native <label>, so htmlFor wiring and click-to-focus work correctly."],
    dont: ["Don't use it as a heading or caption. It exists to name a form control."],
  },
  sidebar: {
    why: [
      "The container is 248px expanded and 64px collapsed with no fill or border of its own. It composes with the standalone parts rather than owning their content.",
    ],
    dont: ["Don't build navigation from scratch beside it. Compose SidebarItem, SidebarGroupLabel and the rest."],
  },
  "top-bar": {
    why: ["Its type (search, breadcrumb, tabs, minimal, chat) changes the left region while the right-hand actions stay in the same place, so the bar feels stable across screens."],
    dont: ["Don't place page-level actions here that belong in the page content."],
  },
  menu: {
    why: ["It is a presentational surface that mirrors the Combobox panel. Positioning is left to the caller, so it works with any anchoring approach."],
    dont: ["Don't expect it to position itself or open on click. Pair it with Popover."],
  },
  breadcrumb: {
    why: ["The last item is treated as the current page and is not a link, so the trail never links back to where you already are."],
    dont: ["Don't use it as the only navigation. It shows where you are, not everything you can reach.", "Don't use it for a flat page with no hierarchy."],
  },
  pagination: {
    why: ["Long ranges collapse with ellipses, and the numbers between come in fixed blocks, so the highlight moves instead of the layout jumping."],
    dont: ["Don't use it for an infinite feed. Load more, or scroll, fits that better."],
  },
  stepper: {
    why: [
      "Completed, current and upcoming map one-to-one to the circle states. Moving between steps animates: the connector fills toward the next step and that circle activates as the bar arrives, so progress reads as continuous rather than a snap.",
    ],
    dont: ["Don't use it for a process with no fixed order. Use Tabs.", "Don't use it past about six steps."],
  },
  popover: {
    why: ["It opens on click and closes on an outside click or Escape, which is the contract people expect from an anchored panel."],
    dont: ["Don't put essential information in one. Use Tooltip for hover hints and inline content for anything required."],
  },
  "filter-chip": {
    why: ["Its three types (default, active, add) show unset, applied and add-another clearly, so the state of a toolbar is readable at a glance."],
    dont: ["Don't use it as a status label. Use Badge."],
  },
  modal: {
    why: [
      "Destructive is a real prop, because it governs three things at once: the icon wrap, its colour and the confirm button's colour. Guessing it from an icon would conflate a custom icon with a genuinely destructive action.",
      "It portals to the document body, locks scroll, traps focus and returns it on close. Escape and backdrop click can each be disabled.",
    ],
    dont: [
      "Don't use a modal for anything people may want to refer back to the page for. Use a Popover or inline content.",
      "Don't stack modals.",
    ],
  },
  notifications: {
    why: ["Read toggles the weight, background and unread dot as styling only, so there is no internal state to manage."],
    dont: ["Don't use it for transient confirmations. Use Toast."],
  },
  "activity-feed": {
    why: [
      "Description accepts rich content because which words are emphasised differs per item and follows no rule that could be derived from a plain string.",
    ],
    dont: ["Don't use it for data people need to compare across rows. Use Table."],
  },
  "progress-steps": {
    why: ["Completed is derived from state rather than a content prop, because people think in \"is this step done?\", not in which glyph renders.",
      "In the vertical layout a title with no description is centred on the number circle; with a description the pair stays top-aligned and reads as one block. The horizontal layout is left-aligned: the label starts at the circle's left edge.",
    ],
    dont: ["Don't use it as a form wizard that needs navigation between steps. Use Stepper."],
  },
  "code-snippet": {
    why: ["The header row appears whenever a filename is passed, so there is no separate variant to keep in sync.", "Highlighting is a small built-in tokenizer for two token classes, which avoids a heavy dependency."],
    dont: ["Don't expect full-language highlighting. Use a dedicated highlighter for that."],
  },
  tags: {
    why: ["Passing onRemove turns every tag removable at once, matching how the design treats the whole list."],
    dont: ["Don't use Tags for status. Use Badge. Don't use them as filters people toggle. Use FilterChip."],
  },
  toast: {
    why: ["It is presentational only, so queueing and positioning are the app's job and it fits any notification system."],
    dont: ["Don't use a toast for anything people must act on. It disappears.", "Don't expect it to queue or position itself."],
  },
  tooltip: {
    why: ["It is pure CSS on hover and focus, so keyboard users get it too, and it adds a caret in eight pointer positions."],
    dont: [
      "Don't put essential information in a tooltip. Touch users never see hover.",
      "Don't put interactive content in one. Use Popover.",
    ],
  },
  progress: {
    why: ["Pass a value for known completion; omit it for an indeterminate bar. The two modes answer different questions."],
    dont: ["Don't show a fake percentage when you don't know the progress. Leave it indeterminate."],
  },
  spinner: {
    why: ["It inherits the text colour, so it works on any background, including inside a button."],
    dont: ["Don't use it for first-load of a list or card. Use Skeleton, which shows the shape of what's coming."],
  },
  skeleton: {
    why: ["A skeleton keeps the layout stable and tells people what content is arriving, which a spinner can't."],
    dont: ["Don't use it for an action with no visible content, such as saving. Use Spinner."],
  },
  "empty-state": {
    why: [
      "There are three types because they are three different situations needing different actions: no-data (create something), no-results (relax the filter), error (retry).",
      "The component is announced as a status, so a list going empty isn't silent.",
    ],
    dont: ["Don't ship the default copy where you can be specific. Say what is missing and what to do.", "Don't use one type for all three situations."],
  },
  table: {
    why: ["Rows are 44px with subtle dividers for dense, comparable data. Selection uses a lightly shadowed checkbox rather than a heavy outline, so a table of many rows stays calm."],
    dont: ["Don't use a table for layout, or for a handful of items. Use List items or Cards."],
  },
  tabs: {
    why: ["Tabs switch between peer panels in one place; the active tab has a 2px underline so the current one reads without colour alone."],
    dont: ["Don't use them for steps in a sequence. Use Stepper.", "Don't switch views of the same content. SegmentedControl is lighter."],
  },
  "stat-card": {
    why: ["One headline metric with its trend, so a dashboard can be scanned in a second."],
    dont: ["Don't cram several metrics into one. Use several cards, or a Table."],
  },
  "list-item": {
    why: ["Leading and trailing slots let one row serve menus, lists and settings without a new component per case."],
    dont: ["Don't use it for tabular data. Use Table."],
  },
  "board-card": {
    why: [
      "Dragging is a look, not a behaviour: state=\"dragging\" styles a lifted card and implements nothing, which keeps dnd-kit or react-dnd a drop-in choice rather than a fight.",
      "Loading is handled by the caller passing Skeleton-filled cards, so a column's loading shape matches the cards it will hold.",
    ],
    dont: ["Don't expect drag-and-drop. Wire it yourself.", "Don't expect the loading column to draw its own skeletons."],
  },
  chat: {
    why: ["Received, sent and system messages differ in alignment, colour and metadata so each speaker is identifiable without reading names."],
    dont: ["Don't use bubbles for non-conversational content. Use Card or ListItem."],
  },
  calendar: {
    why: ["Every day carries a full-date aria-label, so a grid of numbers is still understandable to a screen reader.", "In range mode, clicking before the start swaps the endpoints, so people can't build an invalid range."],
    dont: ["Don't use it when a typed date is faster. Pair it with an Input."],
  },
  "team-cards": {
    why: [
      "ProfileCard is compact by default and switches to a centred layout when a bio or social links are passed, so the extra content has room.",
      "Social links require a label, because a row of unlabelled glyphs is unusable with a screen reader.",
    ],
    dont: ["Don't leave out the photo. Both cards are designed around a real portrait."],
  },
  "product-card": {
    why: ["A sale badge and struck-through price appear whenever a compare-at price is given, so the discount is derived from data rather than set by hand."],
    dont: ["Don't set a compare-at price that is not a real previous price."],
  },
  "star-rating": {
    why: ["The numeric label is independent of the stars, so a compact row can show stars alone while the stars still convey the rating."],
    dont: ["Don't show stars without an accessible text value when the rating matters."],
  },
  /* ---- Application, marketing, e-commerce ---- */
  finance: {
    why: [
      "Balance takes a pre-formatted string because a headline figure is often abbreviated (\"$2.44M\") in ways no formatter should guess. The list components take raw numbers plus a formatAmount callback, so every row in a list is formatted identically.",
      "In Transactions the sign of amount picks income or expense styling, so there is no separate type flag that could contradict the number.",
    ],
    dont: ["Don't pass absolute values with a separate income/expense flag to Transactions. Pass signed numbers.", "Don't pass a raw number to Balance and expect abbreviation. Format it first."],
  },
  "section-heading": {
    why: [
      "titleAs changes only which tag renders. The title always looks like a section heading, so you can set the tag to keep the page's heading levels nesting correctly without changing the look.",
      "FirstPageHeading is the bigger, once-per-page version. Its CTAs and avatar stack are opt-in by presence rather than by toggle.",
    ],
    dont: ["Don't pick titleAs by how big you want it to look. A section inside an h2 should use h3.", "Don't use FirstPageHeading more than once per page."],
  },
  "rich-text": {
    why: ["These exist to render article bodies from a CMS or MDX pipeline at a consistent measure and rhythm."],
    dont: ["Don't use them for headings that are part of the page's own furniture. Use SectionHeading."],
  },
  "blog-listing": {
    why: [
      "Dates and read times are strings. Neither card parses a Date or counts words, because \"11 mins read\" versus \"~10 min\" is an editorial choice made upstream, where the locale is known.",
      "The horizontal featured card measures its own container, not the viewport, and stacks when there isn't room (under about 640px) instead of squeezing the text.",
    ],
    dont: ["Don't pass a Date object or expect a read time to be computed. Format both first.", "Don't size the featured card with viewport media queries. It already responds to its container."],
  },
  "marketing-elements": {
    why: [
      "Metric's value is a string so \"21.3K\" and \"99.98%\" render exactly as written; trend is a signed number and drives the chip's direction and colour.",
      "Marquee's gap has no default on purpose. Logo strips and text strips want very different spacing, so it is better to state it than inherit a wrong guess.",
    ],
    dont: ["Don't rely on a Marquee gap default. There isn't one."],
  },
  "mobile-navigation": {
    why: ["Uncontrolled works for a static page. In a client-routed app the menu can't know a link changed the route, so you control open and close it on route change."],
    dont: [
      "Don't leave it uncontrolled in a client-routed app. It will stay open over the page it just navigated to.",
      "Don't use it as the app sidebar. This is marketing-site navigation; for an application shell use Sidebar and TopBarMobile.",
    ],
  },
  "product-options": {
    why: [
      "ColorSwatch and SizeSelector take available rather than expecting you to filter the list. A greyed-out XL tells someone the size exists and is sold out; omitting it leaves them wondering whether you stock it.",
      "StockStatus wording and colour come from the number, so the three states can't drift out of sync with the inventory count.",
    ],
    dont: ["Don't remove sold-out options from the list. Mark them unavailable.", "Don't set stock wording separately from the count that drives it."],
  },
  "product-gallery": {
    why: ["Uncontrolled is fine for a plain gallery. Pass activeIndex when something else should move it, such as picking a colour swatch jumping to that variant's photo."],
    dont: ["Don't leave it uncontrolled if other inputs on the page need to change the image."],
  },
  cart: {
    why: [
      "CartItem renders one line and reports quantity changes; it never sums anything. Subtotals, tax, shipping and discounts stay in your own state, the only place they can be computed consistently with the server.",
      "CheckoutSteps, like Stepper, is driven by a single index, so no combination of flags can contradict itself.",
    ],
    dont: ["Don't expect CartItem to compute totals. If you want a block that does, use ShoppingCartBlock.", "Don't drive CheckoutSteps with per-step flags."],
  },

  /* ---- Charts ---- */
  "line-chart": {
    why: [
      "A single series is drawn in chart/2, not chart/1. It looks like an off-by-one but is deliberate: Figma's default line is chart/2 and the second line added by multiple is chart/1, so the two-series case matches the design file.",
      "step is the honest choice for values that hold and jump, such as a plan tier or headcount, where a smooth curve would imply readings that never happened.",
      "Point markers suit charts where individual readings matter, which is usually true with six points and rarely with sixty.",
    ],
    dont: ["Don't use a smooth curve for values that jump. Use step.", "Don't show markers on a dense series. They turn into noise."],
  },
  "area-chart": {
    why: ["The fill implies the area under the curve means something, such as a total accumulating."],
    dont: ["Don't use it to compare the shape of several series. Overlapping fills turn to mud; an unfilled Line Chart stays readable.", "Don't use a smooth curve for values that hold and jump. Use step."],
  },
  "bar-chart": {
    why: [
      "Grouped compares series against each other; stacked compares each series against the total.",
      "active keeps one bar emphasised at rest, for a chart that exists to make a point about one period.",
    ],
    dont: ["Don't stack when the segments need comparing. Stacking makes the first series easy to read and every one above it hard, so put the series people care about most at the bottom."],
  },
  "pie-chart": {
    why: [
      "It covers both pie and donut; the donut variants are the same data with a hole. Use the dedicated Donut Chart when the centre figure is the point.",
      "No variant puts an angular gap between slices, because Figma's always touch. The separator is a thin stroke on the shared edge, which is why pie-no-separator is its own variant rather than a spacing prop.",
      "label-list writes the category name inside each slice, so it needs slices big enough to hold the text.",
    ],
    dont: ["Don't use label-list with many small slices. The text won't fit.", "Don't use a pie for more than a few slices. See Bar Chart."],
  },
  "donut-chart": {
    why: ["The centre is the donut's advantage over a pie: it can state the total the slices divide up."],
    dont: ["Don't leave the centre empty. Without it you have a pie with a hole in it.", "Don't use more than five or six slices. Group the tail into \"Other\", or use a Bar Chart."],
  },
  "radial-chart": {
    why: [
      "max is what makes a ring mean \"800 out of 1,000\" rather than \"800, bigger than the other one\". On the gauge arcs, whatever is left over is drawn as track.",
      "The gauge arcs stack rows along a single 240° band, so they take two or three rows, not five.",
    ],
    dont: ["Don't omit max for a quota or target. Leave it off only when rings are meant to be compared with each other.", "Don't put five rows on a gauge arc."],
  },
  "radar-chart": {
    why: [
      "The shape only means something if every spoke is measured the same way, so all axes must share a scale. Spoke order matters too, because rearranging the spokes changes the shape without changing the data.",
      "A second shape is derived from the data: any row carrying value2 gets one, rather than the variant switching it on.",
    ],
    dont: ["Don't mix units across spokes. The enclosed area becomes meaningless even though it still looks like a chart.", "Don't reorder spokes casually."],
  },
  "funnel-chart": {
    why: ["A funnel claims everyone at each stage also passed the previous one, so the narrowing shape only makes sense for nested stages."],
    dont: ["Don't use it for stages that are merely sequential, where people can skip one or enter halfway. The shape asserts something untrue; use a Bar Chart."],
  },
  "heatmap-chart": {
    why: [
      "A heatmap is for finding where something concentrates. It is deliberately bad at exact values, because nobody reads a precise number off a shade.",
      "data is row-major, data[row][col]. Rows shorter than colLabels leave gaps.",
    ],
    dont: ["Don't use it when the specific figures matter more than the pattern. Use a Table.", "Don't leave entries out of sparse data. Pad with zeroes."],
  },

  /* ---- Blocks ---- */
  "crm-dashboard": {
    why: ["It is the flagship example of what the system is for: a real application shell where the sidebar, filters, table, avatars and badges are all live components, not a screenshot."],
    dont: ["Don't treat it as a configurable component. Copy the source in and swap the sample leads for your own data."],
  },
  "liquid-glass-dashboard": {
    why: [
      "It is built in three layers, in order, because glass needs something colourful and detailed behind it to bend. The photograph is not bundled; which photo is your call.",
      "The active sidebar item has its own lens that only moves when you click another item, while a second, softer lens follows hover and focus and never changes what is active.",
      "In dark mode the overlay gains a scrim so light labels stay readable over the bright parts of the photo.",
    ],
    dont: ["Don't expect refraction outside Chromium. Safari and Firefox get the frosted fallback with the same rim and depth.", "Don't put it over a flat colour. There is nothing to bend."],
  },
  "data-table": {
    why: ["It ships a state prop (default, filtered, bulk, loading, empty, error) so every state of a real table is designed, not just the happy path."],
    dont: ["Don't treat it as configurable. Copy the source in and swap the columns and rows."],
  },
  "kanban-board": {
    why: ["Its state prop (default, loading, empty-column, dragging) shows each state a board passes through, including a lifted card."],
    dont: ["Don't expect working drag-and-drop. Copy the source and wire your own."],
  },
  "app-shell": {
    why: [
      "These sit inside an application layout rather than replacing it. Sidebar and TopBar handle the navigation around them.",
      "In AppHeaderBlock the last action renders as primary and the rest as secondary, so the common case needs no variant at all.",
    ],
    dont: ["Don't use them as a replacement for Sidebar and TopBar.", "Don't set action variants unless you want to break the last-is-primary order."],
  },
  panels: {
    why: [
      "The two modal blocks are controlled, so nothing renders until you pass open. They reuse Modal's portal and focus trap rather than reimplementing them.",
      "The file upload panel selects files and reports them back, like the FileUpload it wraps.",
    ],
    dont: ["Don't expect the modal blocks to manage their own open state.", "Don't expect the upload panel to send files. That is your app's job."],
  },
  authentication: {
    why: [
      "These blocks hold their own form state and validation so they drop into a route and demo immediately, but they never talk to an auth provider. Everything real happens in the callbacks you pass.",
      "initialStatus covers the states an auth screen actually passes through, including skeleton for the gap before your provider has initialised.",
    ],
    dont: ["Don't expect them to authenticate anyone. Wire onSubmit, onResend and onVerify.", "Don't treat initialStatus as live state. The block manages status itself afterwards."],
  },
  "marketing-sections": {
    why: [
      "They are whole page sections meant to be stacked into a landing page, and the blocks most worth copying rather than configuring: marketing layouts diverge fast, and a prop for every variation would be worse than editing the file.",
      "Each carries its Figma frame width as a fixed width, so they don't reflow into a narrower container. The previews scale them to fit rather than cropping.",
    ],
    dont: ["Don't expect them to reflow in a narrow container. Give them room or scale them.", "Don't add props for every variation. Edit the file."],
  },
  "content-sections": {
    why: [
      "Where the marketing sections are mostly layout, these are data-driven: each takes an array and renders the matching component per entry, so they map onto whatever a CMS returns.",
      "One testimonial renders the large single-quote style; two or more switch to the grid, so the layout follows the data.",
      "Item types extend the underlying component's props, so anything you can pass the component you can pass through the block.",
    ],
    dont: ["Don't set defaultOpen on a FAQ long enough that an open item hides the rest."],
  },
  ecommerce: {
    why: [
      "Money arrives as raw numbers and is formatted through formatPrice, so one override changes every figure on the screen.",
      "showFilterBar is a real prop rather than inferred from the product count, because only you know which lists are curated.",
      "Passing estimatedDelivery to OrderConfirmationBlock is what adds the delivery row and Track order button.",
    ],
    dont: ["Don't pre-format prices. Pass numbers.", "Don't offer sorting on a short curated collection."],
  },
  "pricing-table": {
    why: ["It shows two or three plans with one highlighted as recommended. Blocks are composition examples, meant to be copied and edited."],
    dont: ["Don't treat it as a configurable component. Copy the source to restyle a card or add a fourth plan."],
  },
  billing: {
    why: [
      "The four blocks are self-contained, so adopt the pieces you need.",
      "Plan status changes more than the badge: the usage row only renders for active, because a past-due or cancelling plan wants attention on the problem rather than on seat counts.",
      "The payment blocks render card UI only and never handle a card number in a way that puts you in PCI scope.",
    ],
    dont: ["Don't post raw card fields to your own server. Wire the form to your payment provider's tokenisation (Stripe Elements or equivalent)."],
  },
  "billing-address": {
    why: ["It carries a small real state machine (idle, invalid, server-error, loading) so the form actually works in the preview, including validation of an incomplete postal code."],
    dont: ["Don't expect it to save anywhere. Wire onSave to your real endpoint."],
  },
};
