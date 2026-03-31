export type ArticleBlock =
  | {
      type: 'paragraph'
      content: string
    }
  | {
      type: 'quote'
      content: string
    }
  | {
      type: 'list'
      title?: string
      items: string[]
    }

export interface BlogPost {
  slug: string
  date: string
  category: string
  title: string
  excerpt: string
  image: string
  author: {
    name: string
    role: string
    avatar: string
  }
  intro: string
  sections: Array<{
    id: string
    label: string
    heading: string
    body: ArticleBlock[]
  }>
}

function createPlaceholderSvg(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" role="img" aria-label="${label}">
      <rect width="1200" height="1200" fill="#e5e5e5" />
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const ARCHDESK_LOGO = createPlaceholderSvg(
  'Industrial project placeholder image'
)

export const CONSTRUCTION_IMG = createPlaceholderSvg(
  'Construction software partnership placeholder image'
)

export const AVATAR_IMG = createPlaceholderSvg('Equipra Team avatar placeholder image')

export const blogPosts: BlogPost[] = [
  {
    slug: 'electrical-installation-portugal',
    date: '2026-03-15',
    category: 'Company News',
    title: 'Equipra Begins Electrical Installation Works in Portugal',
    excerpt:
      'Equipra has commenced electrical installation works as part of the Sines Industrial Complex expansion in Portugal, reinforcing its role in large-scale international industrial projects.',
    image: ARCHDESK_LOGO,
    author: {
      name: 'Equipra Team',
      role: 'Company News',
      avatar: AVATAR_IMG,
    },
    intro:
      'Equipra has begun electrical installation works in Portugal as a subcontractor within the expansion project of the Sines Industrial Complex, operated by Repsol. The project involves the expansion of production capacity at the Sines site, including the development of new industrial units focused on advanced polymer materials.',
    sections: [
      {
        id: 'project-overview',
        label: 'Project Overview',
        heading: 'Project Overview',
        body: [
          {
            type: 'paragraph',
            content:
              "This investment forms part of Repsol's broader industrial development program in Portugal, aimed at strengthening operational efficiency and technological capabilities. The project encompasses the development of new industrial units focused on advanced polymer materials at the Sines site.",
          },
          {
            type: 'quote',
            content:
              "Participation in this project reflects Equipra's continued involvement in international industrial developments, where precision, execution discipline, and adherence to project timelines remain key priorities.",
          },
        ],
      },
      {
        id: 'scope-of-electrical-works',
        label: 'Scope of Electrical Works',
        heading: 'Scope of Electrical Works',
        body: [
          {
            type: 'paragraph',
            content:
              'Within the scope of its engagement, Equipra is responsible for executing electrical installation works across the Sines expansion site.',
          },
          {
            type: 'list',
            title: 'Work Scope',
            items: [
              'Installation of cable trays and cable routing systems',
              'Power and distribution equipment installation',
              'Electrical system connections',
              'Ensuring compliance with technical specifications and site safety standards',
            ],
          },
        ],
      },
      {
        id: 'coordination-and-compliance',
        label: 'Coordination and Compliance',
        heading: 'Coordination and Compliance',
        body: [
          {
            type: 'list',
            items: [
              'All works carried out in coordination with the general contractor',
              'Collaboration with other project stakeholders',
              'Adherence to local regulations and established safety procedures',
              'Compliance with technical specifications and site safety standards',
            ],
          },
        ],
      },
      {
        id: 'international-project-delivery',
        label: 'International Project Delivery',
        heading: 'International Project Delivery',
        body: [
          {
            type: 'list',
            items: [
              'Precision and execution discipline as key priorities',
              'Strict adherence to project timelines',
              'Continued involvement in international industrial developments',
              'Supporting the expansion of production capacity at major industrial sites',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'archdesk-partnership',
    date: '2026-03-10',
    category: 'Partnerships',
    title: 'Equipra Partners with Archdesk for Construction Software Integration',
    excerpt:
      'Equipra has formalised a collaboration with Archdesk to integrate construction management software into its internal operations, advancing digital project coordination and process standardisation.',
    image: CONSTRUCTION_IMG,
    author: {
      name: 'Equipra Team',
      role: 'Partnerships',
      avatar: AVATAR_IMG,
    },
    intro:
      'Equipra has formalised a collaboration with Archdesk to integrate construction management software into its internal operations, supporting stronger digital coordination, standardised reporting, and more connected project delivery.',
    sections: [
      {
        id: 'partnership-overview',
        label: 'Partnership Overview',
        heading: 'Partnership Overview',
        body: [
          {
            type: 'paragraph',
            content:
              'As internal operations scale, software consistency becomes increasingly important across planning, field communication, and document control. This partnership is intended to strengthen those foundations.',
          },
        ],
      },
      {
        id: 'integration-focus',
        label: 'Integration Focus',
        heading: 'Integration Focus',
        body: [
          {
            type: 'list',
            items: [
              'Improved project data visibility across teams',
              'More consistent internal workflows and approvals',
              'Better alignment between site execution and office coordination',
              'Clearer operational reporting structures',
            ],
          },
        ],
      },
      {
        id: 'digital-standardisation',
        label: 'Digital Standardisation',
        heading: 'Digital Standardisation',
        body: [
          {
            type: 'quote',
            content:
              "Digital project coordination is a practical requirement for modern industrial operations, and this move supports Equipra's wider process standardisation goals.",
          },
        ],
      },
    ],
  },
  {
    slug: 'iso-45001-renewal',
    date: '2026-02-22',
    category: 'Certifications',
    title: 'Equipra Renews ISO 45001 Certification for Occupational Safety',
    excerpt:
      'Equipra has successfully renewed its ISO 45001 certification, reaffirming its commitment to maintaining the highest occupational health and safety management standards across all operations.',
    image: ARCHDESK_LOGO,
    author: {
      name: 'Equipra Team',
      role: 'Certifications',
      avatar: AVATAR_IMG,
    },
    intro:
      'Equipra has successfully renewed its ISO 45001 certification, reaffirming its commitment to maintaining high occupational health and safety standards across project environments and internal operations.',
    sections: [
      {
        id: 'safety-framework',
        label: 'Safety Framework',
        heading: 'Safety Framework',
        body: [
          {
            type: 'paragraph',
            content:
              'The renewal confirms that Equipra continues to operate within a structured occupational health and safety management framework built around prevention, supervision, and continuous improvement.',
          },
        ],
      },
      {
        id: 'what-it-supports',
        label: 'What It Supports',
        heading: 'What It Supports',
        body: [
          {
            type: 'list',
            items: [
              'Risk assessment and hazard prevention processes',
              'Clear operating procedures across work environments',
              'Training and awareness for safe execution',
              'Ongoing review of health and safety controls',
            ],
          },
        ],
      },
      {
        id: 'operational-impact',
        label: 'Operational Impact',
        heading: 'Operational Impact',
        body: [
          {
            type: 'quote',
            content:
              'Maintaining ISO 45001 supports operational consistency and helps ensure workplace safety remains embedded in every stage of project delivery.',
          },
        ],
      },
    ],
  },
  {
    slug: 'scaling-european-markets',
    date: '2026-02-05',
    category: 'Industry Insights',
    title: 'Scaling Industrial Services Across European Markets',
    excerpt:
      'An overview of how Equipra is expanding its industrial service capabilities across regulated European sectors, leveraging cross-border expertise and certified operational standards.',
    image: ARCHDESK_LOGO,
    author: {
      name: 'Equipra Team',
      role: 'Industry Insights',
      avatar: AVATAR_IMG,
    },
    intro:
      'Expanding industrial services across European markets requires operational adaptability, regulatory awareness, and delivery systems that stay consistent across borders and sectors.',
    sections: [
      {
        id: 'market-expansion',
        label: 'Market Expansion',
        heading: 'Market Expansion',
        body: [
          {
            type: 'paragraph',
            content:
              'As projects become more geographically distributed, execution models must adapt to different site requirements, stakeholder expectations, and compliance environments.',
          },
        ],
      },
      {
        id: 'key-capabilities',
        label: 'Key Capabilities',
        heading: 'Key Capabilities',
        body: [
          {
            type: 'list',
            items: [
              'Cross-border coordination experience',
              'Certified standards supporting regulated industrial sectors',
              'Flexible deployment of specialised teams',
              'Repeatable delivery systems across multiple markets',
            ],
          },
        ],
      },
      {
        id: 'strategic-outlook',
        label: 'Strategic Outlook',
        heading: 'Strategic Outlook',
        body: [
          {
            type: 'quote',
            content:
              'Sustainable expansion depends on combining technical expertise with disciplined operational systems that clients can rely on across countries and project types.',
          },
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
