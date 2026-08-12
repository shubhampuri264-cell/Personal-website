import type { Project } from './types'

const GH = 'https://github.com/shubhampuri264-cell'

/**
 * Five `featured` projects get a full poster. The remaining four render as a
 * compact list, because nine equal-weight posters dilutes the strong ones.
 *
 * Every featured project carries a `caseStudy`. The bullets say what was built;
 * the case study says what was tried and thrown away first, which is the part
 * that distinguishes an engineer from a feature list. Each one is collapsed by
 * default, so the cost to a reader who does not want it is a single line.
 */
export const projects: Project[] = [
  {
    slug: 'agon',
    kind: 'project',
    tier: 'featured',
    title: 'Agon',
    subtitle: 'Fitness app with an XP loop',
    dates: { start: '2026-04', end: null, display: '2026 – Present' },
    bounty: { value: '12+', unit: 'beta testers' },
    summary:
      'A React Native fitness app that works with no signal, turns a photo of your food into a nutrition breakdown, and wraps the whole thing in an XP and quest loop with an avatar that evolves as you train.',
    bullets: [
      'Built logging offline-first: writes land on-device and reconcile with the server when signal returns, so a session in a basement gym is never lost.',
      'Put a confirm-and-edit step between the meal-scan model and the database, so the user approves every inferred item and a wrong guess never silently becomes their nutrition history.',
      'Reprioritised the backlog off beta-tester feedback instead of the original plan, shipping what they actually got stuck on first.',
      'Made the retention loop and the revenue loop the same system: XP, quests and an avatar that evolves with training, with cosmetics as the paid unlock.',
    ],
    tech: ['React Native', 'Expo', 'FastAPI', 'PostgreSQL', 'Groq', 'RevenueCat', 'Claude Code'],
    links: [
      { kind: 'github', label: 'View Source', href: `${GH}/Agon`, external: true },
      { kind: 'demo', label: 'Watch Demo', href: '2zBenlABcxA', portrait: true },
    ],
    media: { youtubeId: '2zBenlABcxA' },
    featured: true,
    rank: 1,
    status: 'in-progress',
    caseStudy: {
      problem:
        'Fitness apps lose people in week two. Logging a workout is a chore with no payoff, and the payoff people actually want, visible physical progress, arrives months after the habit has already died. The gap between effort and reward is where the user goes.',
      constraint:
        'A gym is close to the worst connectivity environment you can design for. Basements, thick walls, dead spots. Anything that needs a round trip to save fails in exactly the place it is used. And an AI meal scanner that guesses wrong is worse than no scanner at all, because it quietly corrupts the one dataset the user is trusting.',
      attempts: [
        'First pass wrote straight to the API and showed a spinner. Fine at my desk, useless in a basement gym. The first honest test killed the design.',
        'Second pass queued failed writes and retried them. Better, but the UI still treated the server as the source of truth, so the screen could disagree with a set the user had just finished.',
        'Third pass inverted it. On-device storage became the source of truth and the server became a replica it reconciles with, so the UI never waits on the network and there is no state where the app shows something the user did not do.',
        'The meal scanner shipped auto-saving at first. One wrong item silently poisons the history, so I added a confirm-and-edit step even though it costs a tap on every scan. An unverified guess in the database is a worse outcome than a slower flow.',
      ],
      shipped:
        'Offline-first workout and meal logging, a photo-to-nutrition scanner with a mandatory confirm step, and an XP, quest and avatar-evolution loop where the retention mechanic and the paid unlock are deliberately the same system. In beta with 12+ testers, whose feedback rather than the original plan has driven the backlog since.',
      next:
        'Reconciliation is last-write-wins. That is correct for one person on one phone and wrong the moment an account is on two devices, so a per-field merge is the next real piece of work. I would also have started the beta two months earlier. Nearly everything worth changing came from watching twelve people use it, not from planning it.',
    },
  },
  {
    slug: 'cs-career-navigator',
    kind: 'project',
    tier: 'featured',
    title: 'CS Career Navigator',
    subtitle: 'Personalized career path tool',
    dates: { start: '2025-06', end: '2025-12', display: '2025' },
    bounty: { value: '21+', unit: 'active users' },
    summary:
      'An AI-powered career assessment that gives CS students a personalized path in a single session.',
    bullets: [
      'Iterated the recommendation engine on direct user feedback, improving suggestion relevance by 40%.',
      'Owned product, backend and UX alone: the scoping calls, the schema and the deployed service were all the same person.',
      'Built on a FastAPI REST backend with Supabase persistence.',
    ],
    tech: ['Python', 'FastAPI', 'Supabase', 'REST API', 'Gemini API'],
    links: [
      { kind: 'github', label: 'View Source', href: `${GH}/CareerNavigator`, external: true },
      {
        kind: 'live',
        label: 'Live Demo',
        href: 'https://career-navigator-one.vercel.app',
        external: true,
      },
      { kind: 'demo', label: 'Watch Demo', href: 'e4RTvzfrFVk' },
    ],
    media: { youtubeId: 'e4RTvzfrFVk' },
    featured: true,
    rank: 2,
    status: 'shipped',
    caseStudy: {
      problem:
        'Career advice for CS students is either generic enough to be useless, or it sits behind a counselor with a two week waiting list. Telling somebody to learn data structures is not wrong, it is just not addressed to them. Nobody was answering the actual question, which is what this specific person should do next given what they already know.',
      constraint:
        'Students will not fill out a long form on a stranger website, and they will not come back a second time to finish it. Whatever the tool gives them has to arrive in one sitting, built from whatever they were willing to type in the first five minutes.',
      attempts: [
        'First version handed the student answers straight to the model and asked it for a career path. The output read well and was worthless. Everybody got a variation of the same four paths, because the model was pattern matching on the shape of the questionnaire rather than on the person filling it in.',
        'Second version scored the answers into a profile in code first, then used the model to explain and expand that profile. Grounding generation in something computed is what finally made two different students get two different answers.',
        'Third round came from real users. I tagged every case where somebody disagreed with their own result, looked for what those cases had in common, and reweighted the scoring against them. Relevance improved 40% by user rating.',
      ],
      shipped:
        'A single-session assessment on a FastAPI REST backend with Supabase persistence, live and used by 21+ people. Product scoping, schema, backend, UX and deploy were all mine.',
      next:
        'That 40% comes from users rating their own results, which is the weakest evidence I could have collected. A rating measures whether somebody liked the answer, not whether the answer was right. If I rebuilt it I would instrument whether people actually acted on the path they were given, and accept a worse looking number in exchange for a real one.',
    },
  },
  {
    slug: 'salon-booking-platform',
    kind: 'project',
    tier: 'featured',
    title: 'Salon Booking Platform',
    subtitle: 'Production web app for a real business',
    dates: { start: '2025-01', end: '2025-08', display: '2025' },
    bounty: { value: 'LIVE', unit: 'running in production' },
    summary:
      'A booking platform built from scratch for a salon owner with no technical background, and now the system that runs the business.',
    bullets: [
      'Translated a non-technical owner’s requirements into scoped features, then owned architecture through deployment solo.',
      'Built an admin dashboard for service and stylist management on a typed Node/Supabase backend, so the owner changes prices and hours without calling me.',
    ],
    tech: ['TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'REST API', 'Vercel'],
    links: [
      { kind: 'github', label: 'View Source', href: `${GH}/SalonWebsite`, external: true },
      { kind: 'live', label: 'Live Demo', href: 'https://icon-studio-nu.vercel.app', external: true },
      { kind: 'demo', label: 'Watch Demo', href: 'nKB7OJ09o9g' },
    ],
    media: { youtubeId: 'nKB7OJ09o9g' },
    featured: true,
    rank: 3,
    status: 'shipped',
    caseStudy: {
      problem:
        'The owner was running bookings on phone calls and a paper diary. Double bookings happened, no-shows left no record, and every schedule change meant somebody had to be reached. The thing being wasted was not money, it was her time, in fifteen minute pieces all day.',
      constraint:
        'She has no technical background and no interest in acquiring one. If the system needed me in the loop to change a price or add a stylist, it would fail the first week I got busy with something else. Whatever I built had to be fully operable by somebody who was never going to read documentation.',
      attempts: [
        'First cut was a booking form writing straight to the database, with the service list hardcoded. It worked on day one and made me the bottleneck for every price change she wanted after that.',
        'So I pulled services, stylists, hours and pricing out into data and built an admin UI over the top. That roughly doubled the build, and it is the only reason the system still runs without me in it.',
        'Requirements turned out to be the harder half. She described her business, not software, so asking her to specify features produced nothing usable. I switched to building small pieces and showing them to her instead. Almost every correction that mattered came from her reacting to something real on a screen.',
      ],
      shipped:
        'A booking platform in production, currently running a real business. Admin dashboard for services, stylists and availability on a typed Node and Supabase backend, deployed on Vercel, with the owner running day to day operations herself.',
      next:
        'There is no automated reminder flow, so no-shows are recorded rather than prevented. It is the one feature she asked for that I cut to ship on time, and it is the first thing I would add. Cutting it was the right call for the deadline and it is still the biggest gap in the product.',
    },
  },
  {
    slug: 'malware-detection-app',
    kind: 'project',
    tier: 'featured',
    title: 'AI Malware Detection',
    subtitle: 'On-device Android threat scanner',
    dates: { start: '2024-09', end: '2025-03', display: '2024 – 2025' },
    bounty: { value: '0', unit: 'bytes leave the device' },
    summary:
      'A mobile app that scans Android apps for malware with a neural network running entirely on-device, with no internet connection and no data leaving the phone.',
    bullets: [
      'Ran the classifier through TensorFlow Lite so inference happens on mid-range Android hardware instead of a server, which is what makes the privacy claim structural rather than a policy.',
      'Designed a cloud pipeline that pushes model updates without an app-store release, so detection keeps up with new threats between versions.',
      'Shipped cross-platform from a single React Native codebase.',
    ],
    tech: ['React Native', 'TensorFlow Lite', 'Firebase', 'Python'],
    links: [
      { kind: 'github', label: 'View Source', href: `${GH}/Malware-Detection-App`, external: true },
      { kind: 'demo', label: 'Watch Demo', href: 'YyQnsWTmYIE' },
    ],
    media: { youtubeId: 'YyQnsWTmYIE' },
    featured: true,
    rank: 4,
    status: 'shipped',
    caseStudy: {
      problem:
        'A malware scanner has to read what is on your phone. The standard design uploads that to a server, which means the app asking you to trust it is also the app with the most access to you. For the people who most need a scanner, that is exactly the wrong trade to ask them to make.',
      constraint:
        'If nothing leaves the device, inference has to run on the device, on hardware nobody picked for machine learning. And a model shipped inside an app binary is frozen on release day, while the threats it is meant to catch are not.',
      attempts: [
        'First version called a server for classification. It was accurate, it was fast, and it defeated its own reason for existing, because the privacy story was a promise in a policy rather than a property of the system.',
        'Moving the classifier on-device through TensorFlow Lite made the claim structural. Nothing can leak because nothing is sent. The bill for that was slower inference and a much tighter accuracy budget on mid-range phones.',
        'A frozen model was the hole left in it, so I built a cloud pipeline that pushes model updates on their own, with no app-store release and nothing for the user to do. Detection stays current while the scanning itself stays entirely local.',
      ],
      shipped:
        'An Android scanner running a neural network fully on-device, requiring no connection, with over-the-air model updates. Built cross-platform from a single React Native codebase.',
      next:
        'On-device inference is capped by whatever model fits, so the accuracy ceiling is genuinely lower than a server-side model would give. A tiered design would recover that honestly: local by default, with an optional cloud second opinion the user explicitly asks for on a single suspicious app, so the private path stays the default rather than the fallback.',
    },
  },
  {
    slug: 'code-review-agent',
    kind: 'project',
    tier: 'featured',
    title: 'Code Review & Testing Agent',
    subtitle: 'Autonomous test generation for any repo',
    dates: { start: '2026-01', end: null, display: '2026' },
    bounty: { value: 'AUTO', unit: 'test → fix → PR loop' },
    summary:
      'A LangGraph agent that generates and runs unit tests for any GitHub repository in an isolated Docker sandbox, fixes its own failures, then opens a pull request with the results.',
    bullets: [
      'Closed the loop on failure: the agent reads its own traceback, patches the test, and re-runs until coverage clears the threshold or it gives up explicitly rather than silently.',
      'Used tree-sitter for AST-aware generation, so tests target real function signatures across languages instead of pattern-matching source text.',
      'Ran every generated suite in a throwaway Docker container, so untrusted repository code never touches the host.',
    ],
    tech: ['Python', 'LangGraph', 'tree-sitter', 'GitHub API', 'Docker'],
    links: [
      {
        kind: 'github',
        label: 'View Source',
        href: `${GH}/Autonomous-Code-Review-Testing-Agent`,
        external: true,
      },
    ],
    featured: true,
    rank: 5,
    status: 'in-progress',
    caseStudy: {
      problem:
        'Test coverage is the work everybody agrees is worth doing and nobody does. The tests that would have mattered get written after an incident, which is the one moment they are too late to help. The bottleneck is not skill, it is that writing them is boring and always loses to shipping.',
      constraint:
        'Generating and running tests against arbitrary GitHub repositories means executing untrusted code on whatever machine the agent runs on. And a generator that produces tests which merely pass is worse than producing nothing, because a green suite gets read as evidence that the code works.',
      attempts: [
        'First version handed the model a source file as text and asked for tests. It confidently wrote tests for functions that did not exist, because it was reading the file as prose rather than as code.',
        'tree-sitter fixed that. Parsing to an AST first means generation targets real function names, real signatures and real arities, and the same approach carries across languages instead of needing a new set of regexes per language.',
        'One-shot generation still produced suites that failed on the first run, so I closed the loop. The agent reads its own traceback, patches the test, and runs again, until coverage clears the threshold or it stops and says it could not. Failing loudly is worth more than a partial result presented as a complete one.',
        'All of it runs inside a throwaway Docker container that is destroyed whatever the outcome, so untrusted repository code never gets near the host.',
      ],
      shipped:
        'An agent that takes a repository, generates AST-aware tests, runs them sandboxed, fixes its own failures, and opens a pull request with the result.',
      next:
        'Coverage is the wrong target and I knew it while building against it. It counts lines executed, not behaviour verified, so the agent can clear the threshold with tests that assert almost nothing. Mutation testing is the metric that would actually catch that, since it asks whether a test fails when the code is broken. That is what I would build against next.',
    },
  },

  /* ---- compact list ---------------------------------------------------- */

  {
    slug: 'mental-health-web-app',
    kind: 'project',
    tier: 'more',
    title: 'Mental Health Web App',
    subtitle: 'Bilingual crisis support platform',
    dates: { start: '2026-03', end: '2026-03', display: '2026' },
    bounty: { value: 'TOP 4', unit: 'of 83 hackathon teams' },
    summary:
      'A bilingual AI mental health companion with anonymous peer support, built for stigma-free early detection.',
    bullets: [],
    tech: ['React', 'JavaScript', 'Supabase', 'Gemini API'],
    links: [
      { kind: 'github', label: 'View Source', href: `${GH}/Mental-Health-Web-App`, external: true },
    ],
    featured: false,
    status: 'shipped',
  },
  {
    slug: 'local-hangout-event-app',
    kind: 'project',
    tier: 'more',
    title: 'Local Hangout & Event App',
    subtitle: 'Real-time social event discovery',
    dates: { start: '2025-02', end: '2025-06', display: '2025' },
    bounty: { value: 'LIVE', unit: 'realtime event sync' },
    summary:
      'A React Native platform for discovering local events, with geolocation safety tracking and built-in chat.',
    bullets: [],
    tech: ['React Native', 'TypeScript', 'Supabase', 'SQL'],
    links: [
      { kind: 'github', label: 'View Source', href: `${GH}/Local-Hangout-Event`, external: true },
    ],
    featured: false,
    status: 'shipped',
  },
  {
    slug: 'facial-recognition',
    kind: 'project',
    tier: 'more',
    title: 'Facial Recognition Attendance',
    subtitle: 'Computer vision attendance pipeline',
    dates: { start: '2024-10', end: '2024-11', display: '2024' },
    bounty: { value: '99%', unit: 'match accuracy' },
    summary:
      'Real-time face encoding and matching extended into an automated attendance pipeline with identity verification.',
    bullets: [],
    tech: ['Python', 'OpenCV', 'Face Recognition'],
    links: [
      {
        kind: 'github',
        label: 'View Source',
        href: `${GH}/Facial-Recognition-software`,
        external: true,
      },
    ],
    featured: false,
    status: 'shipped',
  },
  {
    slug: 'distributed-risk-engine',
    kind: 'project',
    tier: 'more',
    title: 'Distributed Risk Engine',
    subtitle: 'Financial risk metrics at scale',
    dates: { start: '2025-09', end: '2025-11', display: '2025' },
    bounty: { value: 'N-node', unit: 'distributed compute' },
    summary:
      'A distributed system for calculating financial risk metrics behind a FastAPI service and an interactive dashboard.',
    bullets: [],
    tech: ['Python', 'FastAPI', 'JavaScript', 'HTML/CSS'],
    links: [
      {
        kind: 'github',
        label: 'View Source',
        href: `${GH}/Distributed-Risk-Engine`,
        external: true,
      },
    ],
    featured: false,
    status: 'archived',
  },
]
