/* eslint-disable lingui/no-unlocalized-strings */
import { createId } from "@paralleldrive/cuid2";

export const jsonResumeSchema = () => ({
  basics: {
    name: "John Doe",
    label: "Programmer",
    image: "",
    email: "john@gmail.com",
    phone: "(912) 555-4321",
    url: "https://johndoe.com",
    summary: "A summary of John Doe…",
    location: {
      address: "2712 Broadway St",
      postalCode: "CA 94115",
      city: "San Francisco",
      countryCode: "US",
      region: "California",
    },
    profiles: [
      {
        network: "Twitter",
        username: "john",
        url: "https://twitter.com/john",
      },
    ],
  },
  work: [
    {
      name: "Company",
      position: "President",
      url: "https://company.com",
      startDate: "2013-01-01",
      endDate: "2014-01-01",
      summary: "Description…",
      highlights: ["Started the company"],
    },
  ],
  volunteer: [
    {
      organization: "Organization",
      position: "Volunteer",
      url: "https://organization.com/",
      startDate: "2012-01-01",
      endDate: "2013-01-01",
      summary: "Description…",
      highlights: ["Awarded 'Volunteer of the Month'"],
    },
  ],
  education: [
    {
      institution: "University",
      url: "https://institution.com/",
      area: "Software Development",
      studyType: "Bachelor",
      startDate: "2011-01-01",
      endDate: "2013-01-01",
      score: "4.0",
      courses: ["DB1101 - Basic SQL"],
    },
  ],
  awards: [
    {
      title: "Award",
      date: "2014-11-01",
      awarder: "Company",
      summary: "There is no spoon.",
    },
  ],
  certificates: [
    {
      name: "Certificate",
      date: "2021-11-07",
      issuer: "Company",
      url: "https://certificate.com",
    },
  ],
  publications: [
    {
      name: "Publication",
      publisher: "Company",
      releaseDate: "2014-10-01",
      url: "https://publication.com",
      summary: "Description…",
    },
  ],
  skills: [
    {
      name: "Web Development",
      level: "Master",
      keywords: ["HTML", "CSS", "JavaScript"],
    },
  ],
  languages: [
    {
      language: "English",
      fluency: "Native speaker",
    },
  ],
  interests: [
    {
      name: "Wildlife",
      keywords: ["Ferrets", "Unicorns"],
    },
  ],
  references: [
    {
      name: "Jane Doe",
      reference: "Reference…",
    },
  ],
  projects: [
    {
      name: "Project",
      startDate: "2019-01-01",
      endDate: "2021-01-01",
      description: "Description...",
      highlights: ["Won award at AIHacks 2016"],
      url: "https://project.com/",
    },
  ],
});

// eslint-disable-next-line lingui/no-unlocalized-strings, lingui/text-restrictions
export const talentHubSchema = () => ({
  basics: {
    name: "John Doe",
    headline: "Programmer",
    email: "john@gmail.com",
    phone: "(912) 555-4321",
    location: "2712 Broadway St, San Francisco, California, CA 94115, US",
    url: {
      label: "",
      href: "https://johndoe.com",
    },
    customFields: [],
    picture: {
      url: "",
      size: 64,
      aspectRatio: 1,
      borderRadius: 0,
      effects: {
        hidden: false,
        border: false,
        grayscale: false,
      },
    },
  },
  sections: {
    summary: {
      name: "Summary",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "summary",
      content: "A summary of John Doe…",
    },
    experience: {
      name: "Experience",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "experience",
      items: [
        {
          id: createId(),
          visible: true,
          company: "Company",
          position: "President",
          location: "",
          date: "2013-01-01 - 2014-01-01",
          summary: "Description…",
          url: {
            label: "",
            href: "https://company.com",
          },
        },
      ],
    },
    volunteer: {
      name: "Volunteering",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "volunteer",
      items: [
        {
          id: createId(),
          visible: true,
          organization: "Organization",
          position: "Volunteer",
          date: "2012-01-01 - 2013-01-01",
          summary: "Description…",
          location: "",
          url: {
            label: "",
            href: "https://organization.com/",
          },
        },
      ],
    },
    education: {
      name: "Education",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "education",
      items: [
        {
          id: createId(),
          visible: true,
          institution: "University",
          studyType: "Bachelor",
          area: "Software Development",
          score: "4.0",
          date: "2011-01-01 - 2013-01-01",
          summary: "",
          url: {
            label: "",
            href: "https://institution.com/",
          },
        },
      ],
    },
    awards: {
      name: "Awards",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "awards",
      items: [
        {
          id: createId(),
          visible: true,
          title: "Award",
          awarder: "Company",
          date: "2014-11-01",
          summary: "There is no spoon.",
          url: {
            label: "",
            href: "",
          },
        },
      ],
    },
    certifications: {
      name: "Certifications",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "certifications",
      items: [
        {
          id: createId(),
          visible: true,
          name: "Certificate",
          issuer: "Company",
          date: "2021-11-07",
          summary: "",
          url: {
            label: "",
            href: "https://certificate.com",
          },
        },
      ],
    },
    publications: {
      name: "Publications",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "publications",
      items: [
        {
          id: createId(),
          visible: true,
          name: "Publication",
          publisher: "Company",
          date: "2014-10-01",
          summary: "Description…",
          url: {
            label: "",
            href: "https://publication.com",
          },
        },
      ],
    },
    skills: {
      name: "Skills",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "skills",
      items: [
        {
          id: createId(),
          visible: true,
          name: "Web Development",
          description: "",
          level: 1,
          keywords: ["HTML", "CSS", "JavaScript"],
        },
      ],
    },
    languages: {
      name: "Languages",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "languages",
      items: [
        {
          id: createId(),
          visible: true,
          name: "English",
          description: "Native speaker",
          level: 1,
        },
      ],
    },
    interests: {
      name: "Interests",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "interests",
      items: [
        {
          id: createId(),
          visible: true,
          name: "Wildlife",
          keywords: ["Ferrets", "Unicorns"],
        },
      ],
    },
    references: {
      name: "References",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "references",
      items: [
        {
          id: createId(),
          visible: true,
          name: "Jane Doe",
          reference: "Reference…",
          url: {
            label: "",
            href: "",
          },
          summary: "",
          description: "",
        },
      ],
    },
    profiles: {
      name: "Profiles",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "profiles",
      items: [
        {
          id: createId(),
          network: "network",
          username: "doe",
          icon: "",
          url: {
            label: "",
            href: "",
          },
          visible: true,
        },
      ],
    },
    projects: {
      name: "Projects",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "projects",
      items: [
        {
          id: createId(),
          visible: true,
          name: "Project",
          date: "2019-01-01 - 2021-01-01",
          summary: "Description...",
          highlights: ["Won award at AIHacks 2016"],
          url: {
            label: "",
            href: "https://project.com/",
          },
          description: "",
        },
      ],
    },
    custom: {},
  },
  metadata: {
    template: "rhyhorn",
    layout: [
      [
        ["profiles", "summary", "experience", "education", "projects", "volunteer", "references"],
        ["skills", "interests", "certifications", "awards", "publications", "languages"],
      ],
    ],
    css: {
      value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
      visible: false,
    },
    page: {
      margin: 18,
      format: "a4",
      options: {
        breakLine: true,
        pageNumbers: true,
      },
    },
    theme: {
      background: "#ffffff",
      text: "#000000",
      primary: "#dc2626",
    },
    typography: {
      font: {
        family: "IBM Plex Serif",
        subset: "latin",
        variants: ["regular", "italic", "600"],
        size: 14,
      },
      lineHeight: 1.5,
      hideIcons: false,
      underlineLinks: true,
    },
    notes: "",
  },
  workStatus: {
    openToWork: false,
    pricing: null,
    jobType: "REMOTE",
    jobLocation: "",
  },
});

export const talentHubV3Schema = () => ({
  public: false,
  basics: {
    name: "John Doe",
    email: "john@gmail.com",
    phone: "(912) 555-4321",
    headline: "Programmer",
    summary: "A summary of John Doe…",
    website: "https://johndoe.com",
    location: {
      address: "2712 Broadway St",
      postalCode: "CA 94115",
      city: "San Francisco",
      country: "US",
      region: "California",
    },
    profiles: [
      {
        network: "Twitter",
        username: "john",
        url: "https://twitter.com/john",
      },
    ],
    photo: {
      visible: false,
      url: "",
      filters: {
        shape: null,
        size: 128,
        border: false,
        grayscale: false,
      },
    },
  },
  sections: {
    work: {
      id: "work",
      name: "Work Experience",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "Company",
          position: "President",
          url: "https://company.com",
          date: { start: "2013-01-01", end: "2014-01-01" },
          summary: "Description…",
        },
      ],
    },
    volunteer: {
      id: "volunteer",
      name: "Volunteer",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          organization: "Organization",
          position: "Volunteer",
          url: "https://organization.com/",
          date: { start: "2012-01-01", end: "2013-01-01" },
          summary: "Description…",
        },
      ],
    },
    education: {
      id: "education",
      name: "Education",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          institution: "University",
          url: "https://institution.com/",
          area: "Software Development",
          degree: "Bachelor",
          date: { start: "2011-01-01", end: "2013-01-01" },
          score: "4.0",
          courses: ["DB1101 - Basic SQL"],
        },
      ],
    },
    awards: {
      id: "awards",
      name: "Awards",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          title: "Award",
          date: "2014-11-01",
          awarder: "Company",
          summary: "There is no spoon.",
        },
      ],
    },
    certifications: {
      id: "certifications",
      name: "Certifications",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "Certificate",
          date: "2021-11-07",
          issuer: "Company",
          url: "https://certificate.com",
        },
      ],
    },
    publications: {
      id: "publications",
      name: "Publications",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "Publication",
          publisher: "Company",
          date: "2014-10-01",
          url: "https://publication.com",
          summary: "Description…",
        },
      ],
    },
    skills: {
      id: "skills",
      name: "Skills",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "Web Development",
          level: "Master",
          levelNum: 5,
          keywords: ["HTML", "CSS", "JavaScript"],
        },
      ],
    },
    languages: {
      id: "languages",
      name: "Languages",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "English",
          level: "Native speaker",
          levelNum: 5,
        },
      ],
    },
    interests: {
      id: "interests",
      name: "Interests",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "Wildlife",
          keywords: ["Ferrets", "Unicorns"],
        },
      ],
    },
    references: {
      id: "references",
      name: "References",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "Jane Doe",
          summary: "Reference…",
        },
      ],
    },
    projects: {
      id: "projects",
      name: "Projects",
      type: "work",
      columns: 1,
      visible: true,
      items: [
        {
          id: createId(),
          name: "Project",
          url: "https://project.com/",
          date: { start: "2019-01-01", end: "2021-01-01" },
          description: "Description...",
        },
      ],
    },
  },
  metadata: {
    template: "rhyhorn",
    layout: [
      [
        ["profiles", "summary", "experience", "education", "projects", "volunteer", "references"],
        ["skills", "interests", "certifications", "awards", "publications", "languages"],
      ],
    ],
    css: {
      value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
      visible: false,
    },
    page: {
      margin: 18,
      format: "a4",
      options: {
        breakLine: true,
        pageNumbers: true,
      },
    },
    theme: {
      background: "#ffffff",
      text: "#000000",
      primary: "#dc2626",
    },
    typography: {
      font: {
        family: "IBM Plex Serif",
        subset: "latin",
        variants: ["regular", "italic", "600"],
        size: 14,
      },
      lineHeight: 1.5,
      hideIcons: false,
      underlineLinks: true,
    },
    notes: "",
  },
  workStatus: {
    openToWork: false,
    pricing: 0,
    jobType: "REMOTE",
    jobLocation: "",
  },
});
