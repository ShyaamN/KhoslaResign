export type Role = 'student' | 'staff'

export type Signature = {
  id: string
  name: string
  role: Role
  affiliation?: string
  message?: string
  createdAt: string
  demo?: boolean
}

export type ReasonGroup = {
  id: string
  title: string
  intro: string
  items: { text: string; source?: { label: string; href: string } }[]
}

export const ROLE_LABELS: Record<Role, string> = {
  student: 'Current student',
  staff: 'Faculty / staff',
}

export const LETTER_SECTIONS = [
  {
    id: 'record',
    number: '01',
    title: 'The record',
    body: `On May 6, 2024, Chancellor Pradeep K. Khosla ordered California Highway Patrol, the San Diego County Sheriff’s Department, and campus police to clear the Gaza Solidarity Encampment at UC San Diego. Roughly 64 people were arrested. Students and community members reported batons, pepper spray, and people pinned to the ground. Campus exits were barricaded and transit was disrupted. Interim suspensions followed for many of those arrested.

That force-first response became a flashpoint. Associated Students passed a Resolution of No Confidence and called for resignation. Ethnic Studies faculty publicly demanded resignation, amnesty, and the removal of outside police. Hundreds of graduate students signed a condemnation letter. Faculty Association members and more than 170 faculty signed statements condemning a militarized campus response. Large walkouts and marches followed. A Change.org resignation petition gathered thousands of signatures within a day.`,
  },
  {
    id: 'failures',
    number: '02',
    title: 'Failures of leadership',
    body: `The May clearing did not happen in isolation. Under this chancellorship, enrollment surged from roughly 28,000 toward 42,000-plus, with plans approaching 50,000, while affordable housing lagged and campus rents climbed — including graduate housing averages reported around 31%, with some units far higher. Housing debt and financing choices for projects such as Mesa Nueva and Nuevo have been shifted onto student rents. Class sizes grew; instructional resources strained.

Compensation controversies have tracked the same tenure: a 2023 retention raise of roughly $500,000 that brought base pay near $1.14 million placed Khosla among the highest-paid public university leaders while students faced cost pressure, food insecurity, and dining-plan complaints. After the UAW strike, student workers accused the campus of undercutting promised funding and chilling labor rights — including misconduct charges against dozens of organizers after an alumni-event protest that were later dropped.`,
  },
  {
    id: 'demands',
    number: '03',
    title: 'Our demands',
    body: `We ask the UC Board of Regents and campus leadership to act now:

1. Immediate resignation or removal of Chancellor Pradeep K. Khosla.
2. An independent review of the May 6, 2024 police action and related student-conduct process.
3. Amnesty for peaceful protesters where appropriate, and an end to retaliatory discipline.
4. A recommitment to affordable housing, fair labor contracts, and student cost relief.
5. Transparent public accounting of expansion priorities versus student welfare.`,
  },
  {
    id: 'answer',
    number: '04',
    title: 'A public answer',
    body: `Fourteen years of growth and fundraising do not place anyone above accountability to the students, workers, and faculty who make this campus possible. Shared governance means listening before force. Student welfare means housing and food security before skyline ambition. Labor peace means contracts kept in good faith.

We are current UC San Diego students and faculty/staff. We write for ourselves. We demand that the Regents remove Chancellor Khosla — or that he resign — and that UC San Diego rebuild the trust this administration destroyed.`,
  },
] as const

export const REASON_GROUPS: ReasonGroup[] = [
  {
    id: 'protest',
    title: 'Protest & free speech',
    intro: 'The May 2024 encampment clearing and the campus response that followed.',
    items: [
      {
        text: 'Ordered CHP, San Diego County Sheriff, and UCPD to clear the Gaza Solidarity Encampment (May 6, 2024).',
        source: {
          label: 'KPBS',
          href: 'https://www.kpbs.org/news/education/2024/05/06/uc-san-diego-pro-palestinian-encampment-cleared-by-police',
        },
      },
      { text: 'Roughly 64 arrests of students and community members.' },
      { text: 'Reports of batons, pepper spray, and students pinned or kneeled on.' },
      { text: 'Campus exits barricaded; transit disrupted during the clearing.' },
      { text: 'Interim suspensions issued after arrests.' },
      { text: 'Critics say he skipped meaningful negotiation with encampment organizers.' },
      {
        text: 'Associated Students passed a Resolution of No Confidence and called for resignation.',
        source: {
          label: 'UCSD Guardian',
          href: 'https://ucsdguardian.org/',
        },
      },
      { text: 'Ethnic Studies faculty publicly demanded resignation, amnesty, and removal of outside police.' },
      { text: 'Hundreds of graduate students signed a condemnation letter.' },
      { text: 'Large walkouts and marches calling for resignation and divestment.' },
      { text: 'A Change.org resignation petition gathered thousands of signatures within a day.' },
      { text: 'Faculty Association and ~170+ faculty signed statements condemning the militarized response.' },
    ],
  },
  {
    id: 'pay',
    title: 'Pay & priorities',
    intro: 'Executive compensation while students absorb rising costs.',
    items: [
      {
        text: '2023 retention raise of ~$500k bringing base pay to ~$1.14M.',
        source: {
          label: 'Voice of San Diego',
          href: 'https://voiceofsandiego.org/',
        },
      },
      { text: 'Among the highest-paid public university leaders while students face cost pressure.' },
      { text: 'Optics of a donor-funded raise amid graduate-worker and staff struggles.' },
      { text: 'Long history of compensation controversies dating to appointment (2012 salary bump vs rising fees).' },
    ],
  },
  {
    id: 'growth',
    title: 'Growth vs student welfare',
    intro: 'Expansion celebrated externally while housing and instruction lag.',
    items: [
      { text: 'Led multi-billion-dollar campus expansion ($6.5B–$8.5B scale cited in coverage).' },
      { text: 'Enrollment surged (~28k → ~42k+) with plans toward ~50k.' },
      { text: 'Affordable housing shortages for undergrads and grads.' },
      { text: 'Steep campus housing rent hikes (grad housing averages ~31%; some units up to ~85%).' },
      { text: 'Housing debt / financing choices shifted onto student rents (Mesa Nueva / Nuevo).' },
      { text: 'Larger class sizes and strained instructional resources.' },
      { text: 'Worsening student-to-faculty ratios and instructional spend-per-student concerns.' },
      { text: 'Construction-first growth narrative over day-to-day student experience.' },
    ],
  },
  {
    id: 'labor',
    title: 'Labor & retaliation claims',
    intro: 'Contract implementation disputes and alleged chilling of organizing.',
    items: [
      { text: 'Post–UAW strike claims that UCSD under-appointed GSRs and undercut promised funding.' },
      { text: '“Khosla’s Public Trial” rally accusing bad-faith contract implementation.' },
      { text: 'Misconduct charges against dozens of student workers after an alumni-event protest (later dropped).' },
      { text: 'Arrests and alleged retaliation against organizers; union called it a chill on labor rights.' },
      { text: 'Alleged assault narrative around an alumni event disputed by workers with video accounts.' },
      { text: 'Faculty and teaching-staff frustration after strikes while admin pay rose.' },
    ],
  },
  {
    id: 'campus',
    title: 'Campus life & cost',
    intro: 'Tuition, dining, and food insecurity under the growth era.',
    items: [
      { text: 'Rising tuition and fees burden on low-income students during expansion.' },
      { text: 'HDH dining plan lock-in and price complaints under his tenure’s growth era.' },
      { text: 'Food insecurity rates cited by students (~half reporting low/very low food security in surveys referenced by campus press).' },
      { text: 'Commercial food-hall style development (e.g. Theatre District) vs student dining needs.' },
      { text: 'Perception that private development and donor priorities outrank student basics.' },
    ],
  },
  {
    id: 'trust',
    title: 'Trust & governance',
    intro: 'Shared governance eroded; constituencies feel unheard.',
    items: [
      { text: 'Lost trust after a force-first protest response — trust needed for negotiation, destroyed.' },
      { text: 'Shared-governance critiques from faculty after May 2024.' },
      { text: 'Oct 2023 campus statement after the Hamas attack criticized by SJP and allied groups as one-sided and harmful to Palestinian and Muslim students.' },
      { text: 'Pattern: growth and fundraising praised externally while campus constituencies feel ignored.' },
      { text: 'Symbol of an administration that polices dissent harder than it listens.' },
    ],
  },
]

/** Small seeded demo set — clearly marked. Confirmed signatures come from the API. */
export const DEMO_SIGNATURES: Signature[] = [
  {
    id: 'demo-1',
    name: 'A. Rivera',
    role: 'student',
    affiliation: 'UC San Diego · Revelle',
    message: 'Housing costs and the May 6 response made this clear for me.',
    createdAt: '2024-05-10T18:00:00.000Z',
    demo: true,
  },
  {
    id: 'demo-2',
    name: 'Dr. M. Chen',
    role: 'staff',
    affiliation: 'Academic Senate member (signing personally)',
    message: 'Shared governance means nothing if force replaces dialogue.',
    createdAt: '2024-05-15T09:15:00.000Z',
    demo: true,
  },
  {
    id: 'demo-3',
    name: 'Priya N.',
    role: 'student',
    affiliation: 'Graduate student',
    message: 'Resign. Review the clearing. Fix housing and labor.',
    createdAt: '2024-05-20T16:45:00.000Z',
    demo: true,
  },
]
