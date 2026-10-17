import { ProductData } from './types';

const GITHUB = 'https://github.com/OrionArchitekton/orion-phone-oss';
const SECURITY = 'https://github.com/OrionArchitekton/orion-phone-oss/blob/main/SECURITY.md';
const PYPI = 'https://pypi.org/project/orion-phone/';

/**
 * Single source of truth for the orion-phone microsite.
 *
 * All content is GROUNDED in the tool repo as of v0.2.0 (README.md, SECURITY.md, the CLI's
 * command list and its own output lines). The demo's lines are the CLI's real output format
 * ("CODE: message"); the phone and holder names are examples. Public material shows neutral
 * apps only (Settings, Clock).
 */
export const PRODUCT_DATA: ProductData = {
  name: 'orion-phone',
  tagline: 'Give your agent its own phone.',
  credibility:
    'Open source (MIT) · MCP server and CLI · Claude Code, Codex, or any MCP client · Linux and WSL2.',
  canonical: 'https://www.danmercede.com/works/orion-phone/',
  metaDescription:
    'orion-phone runs Android phones for cooperating AI agents through MCP or a CLI: exclusive leases, a locked tier that waits for unlock, and an audit trail on a trusted host.',

  problem: {
    heading: 'The problem',
    body:
      'Agents that share one desktop browser collide when two of them want it at once, and they cannot use apps that exist only on phones. Handing an agent your own phone is worse: everything on it is then within reach.',
  },

  whatItDoes: {
    heading: 'What it does',
    body:
      'orion-phone runs Android phones (emulators) that AI agents drive through an MCP server or a CLI. An agent leases a phone, reads its screen as text, taps, types and opens apps, and every action leaves an audit record with a screenshot. The phones are signed in to the accounts you choose, and a phone in the locked tier does nothing until you unlock it yourself.',
  },

  cta: {
    primaryLabel: 'View on GitHub',
    primaryUrl: GITHUB,
    secondaryLabel: 'Read the security model',
    secondaryUrl: SECURITY,
  },

  quickstart: {
    heading: 'Quickstart',
    intro:
      'Linux with systemd user services and KVM, or Windows through WSL2. Python 3.11+, Java 17+, and Google’s Android command-line tools; setup downloads the rest.',
    blocks: [
      {
        title: 'Install and set up',
        note: 'Read and accept the Android SDK License yourself before setup',
        command: [
          "uv tool install 'orion-phone==0.2.0'",
          'orion-phone init      # the example config: phone a open, phone b locked',
          'orion-phone setup     # SDK packages, phones, systemd user units',
          'orion-phone status a  # exits 0 once the first boot finishes',
        ].join('\n'),
      },
      {
        title: 'Connect Claude Code',
        command: 'claude mcp add --scope user orion-phone -- orion-phone-mcp',
      },
      {
        title: 'Or Codex (~/.codex/config.toml)',
        command: ['[mcp_servers.orion-phone]', 'command = "orion-phone-mcp"'].join('\n'),
      },
      {
        title: 'Or drive a phone from a shell',
        command: [
          'H=--holder=my-agent-session',
          'orion-phone lease a $H',
          'orion-phone ui a $H          # elements with tap centers',
          'orion-phone tap a 540 260 $H',
          'orion-phone release a $H',
        ].join('\n'),
      },
    ],
  },

  // Command surface verified against the CLI's listed commands (v0.2.0).
  commands: [
    {
      name: 'lease',
      description:
        'Take a phone for one agent session. A second agent gets BUSY with the holder’s name and expiry instead of stepping on the first.',
    },
    {
      name: 'ui',
      description:
        'Read the screen as text: its elements, with the center to tap for each.',
    },
    {
      name: 'shot',
      description: 'Take a screenshot of the phone.',
    },
    {
      name: 'tap · type · swipe · key · open',
      description:
        'Act on the phone. Every holder action writes an audit line, and each successful one a screenshot.',
    },
    {
      name: 'release',
      description: 'Give the phone back. A locked phone shuts down when its session is released.',
    },
    {
      name: 'status',
      description:
        'Report each phone healthy only with proof: boot completed and a fresh screenshot that is not blank.',
    },
    {
      name: 'init · setup · install-units',
      description:
        'Write the example config, then install the SDK packages, the phones and their systemd user units.',
    },
  ],

  demo: {
    heading: 'Demo',
    intro:
      'One agent leases a phone and works in the Clock app. A second agent asks for the same phone and is told who holds it. The locked phone waits for its owner.',
    lines: [
      { kind: 'comment', text: '# Agent 1 leases phone a and opens Clock' },
      { kind: 'command', text: 'orion-phone lease a --holder=agent-1' },
      { kind: 'output', text: 'OK: agent-1 holds phone a until 2026-10-14T18:30:00+00:00', tone: 'ok' },
      { kind: 'command', text: 'orion-phone open a com.google.android.deskclock --holder=agent-1' },
      { kind: 'output', text: 'OK: open done on phone a', tone: 'muted' },
      { kind: 'command', text: 'orion-phone ui a --holder=agent-1' },
      { kind: 'output', text: '[26] Button desc="Add alarm" id=fab clickable center=540,1959', tone: 'muted' },
      { kind: 'command', text: 'orion-phone tap a 540 1959 --holder=agent-1' },
      { kind: 'output', text: 'OK: tap done on phone a', tone: 'muted' },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# Agent 2 wants the same phone' },
      { kind: 'command', text: 'orion-phone lease a --holder=agent-2' },
      { kind: 'output', text: 'BUSY: phone a is held by agent-1 until 2026-10-14T18:30:00+00:00', tone: 'fail' },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# The locked phone does nothing until its owner unlocks it' },
      { kind: 'command', text: 'orion-phone lease c --holder=agent-1' },
      { kind: 'output', text: 'NEEDS_OPERATOR: phone c is locked; its owner must unlock it on its screen', tone: 'fail' },
    ],
  },

  differentiators: {
    heading: 'Why it is different',
    points: [
      {
        title: 'A locked tier that waits for unlock',
        body:
          'A locked phone cold-boots for each session. The tool permits holder actions only after observing a secure lock screen and then an unlock. It shuts down on release, lease expiry, or the session cap. Use it on a trusted host: these checks govern cooperative tool callers, not local adb or host access, and they do not identify who supplied the credential. Independent verification of credential-encrypted storage remains open as Q2; see the security model.',
      },
      {
        title: 'One agent per phone',
        body:
          'An agent leases a phone before it acts. Two agents never drive the same phone at once: the second gets BUSY, with the holder and the expiry, and can wait or take another phone.',
      },
      {
        title: 'A record of everything',
        body:
          'Each holder action writes an audit line, and each successful one a screenshot, to a private state directory outside any repository.',
      },
      {
        title: 'Measured, every run listed',
        body:
          'In six measured runs with Claude Code on Claude Opus 5.5, reading two facts in Settings cost $0.20 to $0.38 a run, and creating, checking and deleting an alarm in Clock $0.33 to $0.46. The README lists every run and the method.',
      },
    ],
  },

  links: [
    { label: 'GitHub repository', url: GITHUB, primary: true },
    { label: 'PyPI package', url: PYPI, primary: true },
    { label: 'Security model', url: SECURITY, primary: true },
    { label: 'Dan Mercede', url: 'https://www.danmercede.com' },
  ],

  footerNote: 'Phone tool and site code: MIT. Built by Dan Mercede.',
};
